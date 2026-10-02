---
name: "lesson-video"
description: Turn a textbook chapter with its past-paper questions and mark schemes into a lesson plan (prep), and turn a lesson plan into a narrated, animated teaching video (video). Use this skill whenever the user wants to prepare a chapter, make or revise a lesson plan, or script, voice, storyboard, build, render or revise a teaching or explainer video from lesson material, even if they only say "make a video for C2" or "prepare chapter 3".
---

# Lesson video

The work has two parts, always in separate sessions:

1. **Prep**: read all the material for one chapter, decide what to keep, and write a lesson plan to `lessons/<syllabus>_ch<chapter>/`. Read `references/prep.md`.
2. **Video**: from the lesson plan only, make a narrated video in `videos/<syllabus>_ch<chapter>_<concepts>/`. Read `references/video.md`.

They are separate because, when a whole chapter and all its past-paper questions are in context, a model tends to cover every part of them, and the result turns into a restatement of the textbook. A long context also makes requirements less reliably followed. The lesson plan is the selection of what matters, and it is the only thing passed from prep to video. A video session never reads the textbook, past papers or mark-scheme files, even though they are in the repository; the plan already contains what it needs.

Which part applies: material for a chapter and a request to prepare it → prep. A lesson plan in `lessons/` and a request for a video → video. If a session is asked to do both, do the prep, then tell the user to start a new session for the video.

Every stage ends with a stop: say what the user should review, commit, and wait.

## Files

- `references/prep.md`: building the lesson plan.
- `references/plan-format.md`: fields and sections of a lesson plan.
- `references/parallel-prep.md`: several chapters prepared at once by separate agents (read only then).
- `references/problems-prep.md`: no mark schemes, no past-paper questions, or a question that depends on a diagram (read only then).
- `references/video.md`: requirements, stages, tool interfaces and checking for the video.
- `references/script.md`: what the narration is for (read at the script stage).
- `scripts/`: the tools (`tts.py` audio, `page_data.py` subtitles text and fonts, `render.mjs` frames and video, `layout-check.mjs`, `tex.mjs`, `final.py` the user's one-command final render). Below, `<skill>` stands for the absolute path of this skill's folder (the folder containing this SKILL.md; in this repository `.claude/skills/lesson-video`); run the tools from the repository root, for example `node <skill>/scripts/render.mjs ...`. Before the first use in a session, if `<skill>/scripts/node_modules` is missing, run `npm ci --prefix <skill>/scripts`; if the skill folder is read-only, copy the whole skill folder to `/tmp/lesson-video/` first and use that path.
- `assets/example/`: a small working video page, for the interfaces in `video.md`.
- `assets/style/`: the user's reference material for the look of the videos.
