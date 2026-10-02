#!/usr/bin/env python3
"""tts_edge.py: narration audio for one teaching video with Microsoft Edge TTS (no API key).

Usage (DIR is the video's folder, e.g. videos/9618_ch8_C1-C8)
  python tools/tts_edge.py DIR                  synthesize changed segments, then build the timeline
  python tools/tts_edge.py DIR --only S03,S07   regenerate these segments even if cached
  python tools/tts_edge.py DIR --no-timeline    synthesize only

Settings come from DIR/script.json "meta": "voice" (e.g. zh-CN-YunyangNeural) and "rate" (e.g. "+10%");
EDGE_VOICE / EDGE_RATE override them. Set "model": "edge-tts" so the review and timeline name the engine.

Writes DIR/audio/<id>.wav and <id>.json in the same format as the skill's tts.py, then runs
`tts.py DIR timeline` to build narration.wav, timeline.json and timeline.js. tts.py is found through
LESSON_VIDEO_TTS, or under ~/.claude/skills. Needs: pip install edge-tts; ffmpeg.
Do not run `tts.py DIR all` on an Edge script: it would resynthesize every segment with Gemini.
"""
import asyncio, glob, hashlib, json, os, subprocess, sys, tempfile

RATE_HZ = 24000
CONCURRENCY = 4
# Trim the silence Edge adds before and after speech, so segment times follow the voice.
TRIM = ("silenceremove=start_periods=1:start_threshold=-50dB,areverse,"
        "silenceremove=start_periods=1:start_threshold=-50dB,areverse")


def die(msg):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(1)


def use_proxy_ca():
    # edge-tts verifies TLS with certifi's bundle; behind a TLS-terminating proxy it needs the proxy's CA.
    ca = os.environ.get("SSL_CERT_FILE")
    if ca and os.path.exists(ca):
        import certifi
        certifi.where = lambda: ca


def seg_hash(voice, rate, text):
    key = json.dumps(["edge-tts", voice, rate, text.strip()], ensure_ascii=False)
    return hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]


def wav_seconds(path):
    import wave
    with wave.open(path, "rb") as w:
        return w.getnframes() / w.getframerate()


async def synth_one(sem, seg, voice, rate, audio_dir):
    import edge_tts
    sid = seg["id"]
    wav, meta = os.path.join(audio_dir, sid + ".wav"), os.path.join(audio_dir, sid + ".json")
    async with sem:
        last = None
        for attempt in range(5):
            try:
                with tempfile.NamedTemporaryFile(suffix=".mp3") as mp3:
                    await edge_tts.Communicate(seg["say"].strip(), voice, rate=rate).save(mp3.name)
                    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3.name, "-af", TRIM,
                                    "-ac", "1", "-ar", str(RATE_HZ), "-c:a", "pcm_s16le", wav], check=True)
                break
            except Exception as e:  # network errors and empty responses are both retried
                last = e
                print(f"  {sid}: attempt {attempt + 1} failed ({e}); retrying")
                await asyncio.sleep(2 ** (attempt + 1))
        else:
            die(f"{sid}: giving up: {last}")
    dur = wav_seconds(wav)
    with open(meta, "w", encoding="utf-8") as f:
        json.dump({"hash": seg_hash(voice, rate, seg["say"]), "seconds": round(dur, 3), "engine": "edge-tts"}, f)
    print(f"  {sid}: {dur:5.2f}s")


async def synth(segs, voice, rate, audio_dir, only):
    todo = []
    for seg in segs:
        wav, meta = os.path.join(audio_dir, seg["id"] + ".wav"), os.path.join(audio_dir, seg["id"] + ".json")
        if seg["id"] not in only and os.path.exists(wav) and os.path.exists(meta):
            with open(meta, encoding="utf-8") as f:
                if json.load(f).get("hash") == seg_hash(voice, rate, seg["say"]):
                    continue
        todo.append(seg)
    print(f"voice {voice}, rate {rate}: {len(todo)} of {len(segs)} segments to synthesize")
    sem = asyncio.Semaphore(CONCURRENCY)
    await asyncio.gather(*(synth_one(sem, s, voice, rate, audio_dir) for s in todo))


def find_tts():
    p = os.environ.get("LESSON_VIDEO_TTS")
    if p:
        return p
    hits = sorted(glob.glob(os.path.expanduser("~/.claude/skills/**/lesson-video/scripts/tts.py"), recursive=True))
    return hits[0] if hits else None


def main():
    args = sys.argv[1:]
    if not args or not os.path.isdir(args[0]):
        die("first argument must be the video folder\n" + __doc__)
    video = os.path.abspath(args[0])
    with open(os.path.join(video, "script.json"), encoding="utf-8") as f:
        script = json.load(f)
    m = script.get("meta", {})
    voice = os.environ.get("EDGE_VOICE") or m.get("voice") or "zh-CN-YunyangNeural"
    rate = os.environ.get("EDGE_RATE") or m.get("rate") or "+0%"
    only = set(args[args.index("--only") + 1].split(",")) if "--only" in args else set()
    audio_dir = os.path.join(video, "audio")
    os.makedirs(audio_dir, exist_ok=True)
    use_proxy_ca()
    asyncio.run(synth(script["segments"], voice, rate, audio_dir, only))
    if "--no-timeline" in args:
        return
    tts = find_tts()
    if not tts:
        die("tts.py not found: set LESSON_VIDEO_TTS, then run `python <tts.py> DIR timeline`")
    subprocess.run([sys.executable, tts, video, "review"], check=True)
    subprocess.run([sys.executable, tts, video, "timeline"], check=True)


if __name__ == "__main__":
    main()
