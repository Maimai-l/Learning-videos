#!/usr/bin/env python3
"""tts.py: narration audio and the timeline for one teaching video. Python standard library only.

Usage (DIR is the video's folder, e.g. videos/9709_ch3_C2)
  python tts.py DIR review                 write DIR/SCRIPT_REVIEW.md from DIR/script.json
  python tts.py DIR all                    synthesize changed segments, then build the timeline
  python tts.py DIR all --only S03,S07     regenerate these segments even if cached
  python tts.py DIR timeline               rebuild the timeline from existing audio
  python tts.py DIR all --dry-run          silent placeholder audio of estimated length (no API call)

Writes DIR/audio/<id>.wav (cached per segment), DIR/narration.wav, DIR/timeline.json, DIR/timeline.js.

API key: GEMINI_API_KEY is sent as x-goog-api-key if set; otherwise the request goes without a key, which works
when the cloud environment attaches it (API credential for generativelanguage.googleapis.com).
Model and voice come from script.json "meta"; TTS_MODEL / TTS_VOICE override them.
"""
import base64, hashlib, json, os, re, struct, sys, time, urllib.error, urllib.request, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO = SCRIPT = AUDIO = None      # set from the command line: the video's folder
API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
DEFAULT_MODEL = "gemini-3.8-flash-tts"
DEFAULT_VOICE = "Charon"
LEAD_IN, TAIL = 0.6, 1.5          # silence before the first segment and after the last one
DEFAULT_PAUSE = 0.5               # silence after a segment when it sets no "pause"


def rel(p):
    return os.path.relpath(p, os.getcwd())


def die(msg):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(1)


def load_script():
    if not os.path.exists(SCRIPT):
        die(f"{SCRIPT} not found")
    with open(SCRIPT, encoding="utf-8") as f:
        s = json.load(f)
    segs = s.get("segments") or die("script.json has no segments")
    ids = [g.get("id") for g in segs]
    if None in ids or len(set(ids)) != len(ids):
        die("every segment needs a unique id")
    for g in segs:
        if not str(g.get("say", "")).strip():
            die(f"segment {g['id']} has no 'say' text")
    return s


def settings(s):
    m = s.get("meta", {})
    return {
        "model": os.environ.get("TTS_MODEL") or m.get("model") or DEFAULT_MODEL,
        "voice": os.environ.get("TTS_VOICE") or m.get("voice") or DEFAULT_VOICE,
        "style": m.get("style", "").strip(),
        "rate": float(m.get("chars_per_second", 4.5)),   # expected speaking rate, for the sanity check
    }


def prompt_for(cfg, seg):
    style = (seg.get("style") or cfg["style"] or "Clear, calm teacher explaining to one student.").strip()
    # A clear preamble and a labelled transcript: without them the model may refuse (PROHIBITED_CONTENT)
    # or read the directions aloud (documented limitation of Gemini TTS).
    return ("Synthesize speech for the transcript below. Read only the text under TRANSCRIPT; "
            "do not read these instructions or the notes aloud.\n\n"
            f"### DIRECTOR'S NOTES\n{style}\n\n#### TRANSCRIPT\n{seg['say'].strip()}\n")


def seg_hash(cfg, seg):
    key = json.dumps([cfg["model"], cfg["voice"], prompt_for(cfg, seg)], ensure_ascii=False)
    return hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]


def write_wav(path, pcm, rate):
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm)


def wav_info(path):
    with wave.open(path, "rb") as w:
        return w.getframerate(), w.getnframes() / w.getframerate()


def spoken_chars(text):
    # count CJK characters as 1, latin words as ~1.5, ignore punctuation and spaces
    cjk = len(re.findall(r"[\u3400-\u9fff]", text))
    words = len(re.findall(r"[A-Za-z0-9]+", text))
    return cjk + 1.5 * words


def request_audio(cfg, seg):
    body = {
        "contents": [{"parts": [{"text": prompt_for(cfg, seg)}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": cfg["voice"]}}},
        },
    }
    headers = {"Content-Type": "application/json"}
    if os.environ.get("GEMINI_API_KEY"):
        headers["x-goog-api-key"] = os.environ["GEMINI_API_KEY"]
    req = urllib.request.Request(API.format(model=cfg["model"]), data=json.dumps(body).encode("utf-8"),
                                 headers=headers, method="POST")
    last = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                data = json.load(r)
            for cand in data.get("candidates", []):
                for part in cand.get("content", {}).get("parts", []):
                    inline = part.get("inlineData") or part.get("inline_data")
                    if inline and inline.get("data"):
                        mime = inline.get("mimeType") or inline.get("mime_type") or ""
                        m = re.search(r"rate=(\d+)", mime)
                        return base64.b64decode(inline["data"]), int(m.group(1)) if m else 24000
            reason = json.dumps(data.get("promptFeedback") or [c.get("finishReason") for c in data.get("candidates", [])])
            last = f"no audio in response ({reason})"
        except urllib.error.HTTPError as e:
            msg = e.read().decode("utf-8", "replace")[:400]
            if e.code in (400, 401, 403, 404):
                die(f"{seg['id']}: HTTP {e.code}: {msg}")     # not worth retrying: key, model name or request is wrong
            last = f"HTTP {e.code}: {msg}"
        except (urllib.error.URLError, TimeoutError) as e:
            last = f"network: {e}"
        wait = 2 ** (attempt + 1)
        print(f"  {seg['id']}: attempt {attempt + 1} failed ({last}); retrying in {wait}s")
        time.sleep(wait)
    die(f"{seg['id']}: giving up: {last}")


def synth(s, only=(), dry=False):
    cfg = settings(s)
    os.makedirs(AUDIO, exist_ok=True)
    print(f"model {cfg['model']}, voice {cfg['voice']}" + ("  [dry run: silent placeholders]" if dry else ""))
    warnings = []
    for seg in s["segments"]:
        sid, h = seg["id"], seg_hash(cfg, seg)
        wav, meta = os.path.join(AUDIO, sid + ".wav"), os.path.join(AUDIO, sid + ".json")
        if sid not in only and os.path.exists(wav) and os.path.exists(meta):
            with open(meta, encoding="utf-8") as f:
                if json.load(f).get("hash") == h:
                    continue
        expected = max(0.8, spoken_chars(seg["say"]) / cfg["rate"])
        if dry:
            rate = 24000
            pcm = b"\x00\x00" * int(rate * expected)
        else:
            pcm, rate = request_audio(cfg, seg)
        write_wav(wav, pcm, rate)
        dur = len(pcm) / 2 / rate
        with open(meta, "w", encoding="utf-8") as f:
            json.dump({"hash": h, "seconds": round(dur, 3), "dry_run": dry}, f)
        ratio = dur / expected
        flag = ""
        if not dry and ratio > 2.0:
            flag = "  CHECK: much longer than expected (directions read aloud? repeated text?)"
        elif not dry and ratio < 0.45:
            flag = "  CHECK: much shorter than expected (text skipped?)"
        if flag:
            warnings.append(sid)
        print(f"  {sid}: {dur:5.2f}s (expected ~{expected:4.1f}s){flag}")
    if warnings:
        print("Listen to these segments before going on: " + ", ".join(warnings))


def build_timeline(s, fps=30):
    cfg = settings(s)
    t, rate, out, chunks = LEAD_IN, None, [], []
    for seg in s["segments"]:
        wav = os.path.join(AUDIO, seg["id"] + ".wav")
        if not os.path.exists(wav):
            die(f"missing {wav}: run 'python tts.py all' first")
        r, dur = wav_info(wav)
        if rate is None:
            rate = r
            chunks.append(b"\x00\x00" * int(rate * LEAD_IN))
        elif r != rate:
            die(f"{seg['id']} has sample rate {r}, others {rate}")
        with wave.open(wav, "rb") as w:
            chunks.append(w.readframes(w.getnframes()))
        pause = float(seg.get("pause", DEFAULT_PAUSE))
        chunks.append(b"\x00\x00" * int(rate * pause))
        out.append({"id": seg["id"], "concept": seg.get("concept", ""), "start": round(t, 3),
                    "speech_end": round(t + dur, 3), "end": round(t + dur + pause, 3)})
        t += dur + pause
    chunks.append(b"\x00\x00" * int(rate * TAIL))
    total = round(t + TAIL, 3)
    write_wav(os.path.join(VIDEO, "narration.wav"), b"".join(chunks), rate)
    tl = {"fps": fps, "duration": total, "frames": int(round(total * fps)), "model": cfg["model"],
          "voice": cfg["voice"], "segments": out}
    with open(os.path.join(VIDEO, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump(tl, f, ensure_ascii=False, indent=1)
    with open(os.path.join(VIDEO, "timeline.js"), "w", encoding="utf-8") as f:
        f.write("// generated by tts.py from script.json; do not edit by hand\n")
        f.write("window.TIMELINE = " + json.dumps(tl, ensure_ascii=False) + ";\n")
    print(f"timeline: {len(out)} segments, {total:.1f}s -> {rel(VIDEO)}/timeline.json, timeline.js, narration.wav")


def review(s):
    cfg = settings(s)
    lines = ["# Script review", "", f"Model `{cfg['model']}`, voice `{cfg['voice']}`.", "",
             "| id | concept | narration (say) | on screen (show) | pause |", "|---|---|---|---|---|"]
    esc = lambda x: str(x).replace("|", "\\|").replace("\n", " ")
    for g in s["segments"]:
        lines.append(f"| {g['id']} | {esc(g.get('concept', ''))} | {esc(g['say'])} | {esc(g.get('show', ''))} | {g.get('pause', DEFAULT_PAUSE)} |")
    total = sum(spoken_chars(g["say"]) / cfg["rate"] + float(g.get("pause", DEFAULT_PAUSE)) for g in s["segments"])
    lines += ["", f"Estimated length: {total / 60:.1f} min (at {cfg['rate']} spoken characters per second)."]
    with open(os.path.join(VIDEO, "SCRIPT_REVIEW.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{rel(VIDEO)}/SCRIPT_REVIEW.md: {len(s['segments'])} segments, about {total / 60:.1f} min")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or not os.path.isdir(args[0]):
        die("first argument must be the video folder, e.g. videos/9709_ch3_C2\n" + __doc__)
    VIDEO = os.path.abspath(args[0])
    SCRIPT, AUDIO = os.path.join(VIDEO, "script.json"), os.path.join(VIDEO, "audio")
    cmd = args[1] if len(args) > 1 and not args[1].startswith("--") else "all"
    only = set(args[args.index("--only") + 1].split(",")) if "--only" in args else set()
    s = load_script()
    if cmd == "review":
        review(s)
    elif cmd == "timeline":
        build_timeline(s)
    elif cmd == "all":
        review(s)
        synth(s, only, dry="--dry-run" in args)
        build_timeline(s)
    else:
        die(__doc__)
