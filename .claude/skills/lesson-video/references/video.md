# Video

What the video is for is in `script.md`.

## Requirements

- Content comes only from the lesson plan; what the student must write uses the plan's wording. Do not read the textbook material in the repository.
- Narration is in the student's language; terms on screen are in the plan's `answer_language`.
- What is on screen at each moment is what the narration is talking about at that moment.
- Every formula, number and term on screen is correct and matches the plan.
- The look: if `style/` at the repository root contains reference material, take the look from it. Otherwise choose one and tell the user what you chose.

The plan is in `lessons/<syllabus>_ch<chapter>/`. Read only the plan.

Each video has its own folder, `videos/<syllabus>_ch<chapter>_<concepts>/` (for example `videos/9709_ch3_C2/`); below it is written `V/`. Everything for that video goes in it.

Scope: the concepts the user names. If none are named, ask.

## Stages

Stop after each stage and tell the user what to review. Commit after each stage. Do every step yourself, including pull requests and merges when the user has asked for them; never hand the user commands to run.

1. **Script**: read `script.md`, write `V/script.json`, run `python scripts/tts.py V review`; the user reads `V/SCRIPT_REVIEW.md`.
2. **Audio**: run `python scripts/tts.py V all`, then make `V/narration.mp3` for listening (`ffmpeg -i V/narration.wav -b:a 64k V/narration.mp3`); the user listens to it. You cannot hear it: ask them to listen, especially for terms, numbers and English words.
3. **Storyboard**: write `V/STORYBOARD.md`, in whatever form is clearest, using the times in `V/timeline.json`.
4. **Build**: make the page `V/index.html`, review it (see "Review before handing over"), then render `V/final.mp4` yourself (see "Final render") and send it to the user. The user does not run anything.

A revision goes back to the earliest stage it affects.

## What the tools need

`V/script.json`:

```json
{ "meta": { "source": "...", "concepts": ["C2"], "model": "edge-tts", "voice": "zh-CN-YunjianNeural", "rate": "+10%",
            "chars_per_second": 4.5 },
  "segments": [ { "id": "S01", "concept": "C2", "say": "exactly what is spoken", "show": "note on the picture", "pause": 0.6 } ] }
```

Engines (`meta.model`): `edge-tts` (Microsoft Edge voices, no key, needs `pip install edge-tts`; `voice` an Edge voice, `rate` the speed; underscores in identifiers are spoken as spaces) or a Gemini TTS model such as `gemini-3.8-flash-tts` (needs a key with paid quota; `voice` a Gemini voice, `style` director's notes in English). Use the engine and voice the user has chosen; if none, use `edge-tts` with `zh-CN-YunjianNeural` at `+10%`.

`say` is plain spoken text (no LaTeX: write formulas as they are read). `show` is optional. `pause` is silence after the segment, in seconds. Keep ids stable when editing (insert `S03a`), so unchanged audio is reused. If `tts.py` flags a segment as much longer or shorter than expected, regenerate it with `--only <id>`.

The page (`V/index.html`), for `render.mjs`:

- `window.draw(frame)` draws that frame and depends on nothing but the frame number, so any frame can be rendered alone and in any order.
- `window.FRAMES`, `window.FPS`; `window.ready = false` until anything it loads is ready, then `true`.
- Times tied to speech come from `V/timeline.js` (`window.TIMELINE`), never typed in, because the audio changes when the script changes.
- Everything the page uses is inside `V/` (copy any library file into it), so the page renders without network access on any machine, including the user's own. Fonts too: `python scripts/page_data.py V` writes `V/say.js` (the narration text, for subtitles) and `V/fonts/` (Noto Sans CJK SC and DejaVu Sans Mono cut to the characters the page uses); run it again after changing text.
- The audio element of the live preview loads `V/narration.mp3` (committed); `narration.wav` and `final.mp4` are not committed.
- Any library is allowed, including WebGL ones. On the cloud VM WebGL runs in software, so frames are slower; this matters only for the final render.
- Optional: `node scripts/tex.mjs V` typesets `V/formulas.json` into `V/formulas.js`; `node scripts/layout-check.mjs` reports overlapping text if the page lists its text boxes in `window.LAYOUT`.

`assets/example/` in this skill (`.claude/skills/lesson-video/assets/example/`) is a working example of these interfaces.

## Checking your work

You cannot watch the video. Render the frames you need and look at them:

```bash
node scripts/render.mjs V/index.html /tmp/check/s --stills 12.5s,18.2s     # chosen moments
node scripts/render.mjs V/index.html /tmp/check/sheet.jpg --sheet 1        # one frame per second
node scripts/render.mjs V/index.html /tmp/check/strip.jpg --strip 4.0:4.6  # every frame of a stretch, for motion
```

Render only what you are checking.

## Review before handing over

The build stage is finished only when all of these are done; report what each found:

1. Stills of every scene, at the moment when everything in it is on screen (usually near the end of its last segment), and at the first frame of each section title. Look at each one: text inside its box, nothing overlapping, the right segment's content on screen, keys coloured and underlined as the storyboard says.
2. `node scripts/layout-check.mjs V/index.html --every 0.5` with the page listing its text in `window.LAYOUT`; every collision is fixed or explained (a crossfade between two labels is fine).
3. Every on-screen quotation from the plan is checked against the plan text.
4. No page error: a still at the first frame of every scene (an element that is not visible yet must still return its geometry).

If you cannot view images, say so: the visual check has then not been done.

## Final render

After the review, from the repository root:

```bash
python scripts/final.py V
```

It installs the render tool's packages the first time, rebuilds `V/narration.wav` from the committed segment audio, and writes `V/final.mp4` (on the cloud VM about 30 frames per second; run it in the background). `final.mp4` is not committed (GitHub refuses files over 100 MB): send it to the user as a file. `--stills 12.5s,80s` instead renders only those frames into `V/check/`.
