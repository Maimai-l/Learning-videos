# Video

What the video is for is in `script.md`.

## Requirements

- Content comes only from the lesson plan; what the student must write uses the plan's wording. Do not read the textbook material in the repository.
- Narration is in the student's language; terms on screen are in the plan's `answer_language`.
- What is on screen at each moment is what the narration is talking about at that moment.
- Every formula, number and term on screen is correct and matches the plan.
- The look: if `assets/style/` in this skill contains reference material, take the look from it. Otherwise choose one and tell the user what you chose.

The plan is in `lessons/<syllabus>_ch<chapter>/`. Read only the plan.

Each video has its own folder, `videos/<syllabus>_ch<chapter>_<concepts>/` (for example `videos/9709_ch3_C2/`); below it is written `V/`. Everything for that video goes in it.

Scope: the concepts the user names. If none are named, ask.

## Stages

Stop after each stage and tell the user what to review. Commit after each stage.

1. **Script**: read `script.md`, write `V/script.json`, run `python <skill>/scripts/tts.py V review`; the user reads `V/SCRIPT_REVIEW.md`.
2. **Audio**: run `python <skill>/scripts/tts.py V all`; the user listens to `V/narration.wav`. You cannot hear it: ask them to listen, especially for terms, numbers and English words.
3. **Storyboard**: write `V/STORYBOARD.md`, in whatever form is clearest, using the times in `V/timeline.json`.
4. **Build**: make the page `V/index.html`, check it, render `V/final.mp4`.

A revision goes back to the earliest stage it affects.

## What the tools need

`V/script.json`:

```json
{ "meta": { "source": "...", "concepts": ["C2"], "model": "gemini-3.8-flash-tts", "voice": "Charon",
            "style": "director's notes for the voice, in English", "chars_per_second": 4.5 },
  "segments": [ { "id": "S01", "concept": "C2", "say": "exactly what is spoken", "show": "note on the picture", "pause": 0.6 } ] }
```

`say` is plain spoken text (no LaTeX: write formulas as they are read). `show` is optional. `pause` is silence after the segment, in seconds. Keep ids stable when editing (insert `S03a`), so unchanged audio is reused. If `tts.py` flags a segment as much longer or shorter than expected, regenerate it with `--only <id>`.

The page (`V/index.html`), for `render.mjs`:

- `window.draw(frame)` draws that frame and depends on nothing but the frame number, so any frame can be rendered alone and in any order.
- `window.FRAMES`, `window.FPS`; `window.ready = false` until anything it loads is ready, then `true`.
- Times tied to speech come from `V/timeline.js` (`window.TIMELINE`), never typed in, because the audio changes when the script changes.
- Everything the page uses is inside `V/` (copy any library file into it), so the page renders without network access on any machine, including the user's own.
- Any library is allowed, including WebGL ones. On the cloud VM WebGL runs in software, so frames are slower; this matters only for the final render.
- Optional: `node <skill>/scripts/tex.mjs V` typesets `V/formulas.json` into `V/formulas.js`; `node <skill>/scripts/layout-check.mjs` reports overlapping text if the page lists its text boxes in `window.LAYOUT`.

`assets/example/` in this skill is a working example of these interfaces.

## Checking your work

You cannot watch the video. Render the frames you need and look at them:

```bash
node <skill>/scripts/render.mjs V/index.html /tmp/check/s --stills 12.5s,18.2s     # chosen moments
node <skill>/scripts/render.mjs V/index.html /tmp/check/sheet.jpg --sheet 1        # one frame per second
node <skill>/scripts/render.mjs V/index.html /tmp/check/strip.jpg --strip 4.0:4.6  # every frame of a stretch, for motion
```

Render only what you are checking; the full render is done once, at the end:

```bash
node <skill>/scripts/render.mjs V/index.html V/final.mp4 --audio V/narration.wav
```

If you cannot view images, say so: the visual check has then not been done.
