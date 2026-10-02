#!/usr/bin/env python3
"""final.py: render the finished video V/final.mp4 on your own computer, in one command.

Usage, from the repository root (Windows, macOS or Linux):
  python scripts/final.py videos/9618_ch8_C1-C8
  python scripts/final.py videos/9618_ch8_C1-C8 --stills 12.5s,80s   (check frames only)

It installs the render tool's packages the first time (npm ci), rebuilds V/narration.wav from the committed segment
audio if it is missing, then renders. Extra arguments go to render.mjs; without --stills/--sheet/--strip the output
is V/final.mp4 with the narration. Needs Node.js 18+, Google Chrome and ffmpeg on PATH; no API key or network for
the render itself (the first npm ci downloads packages). On Windows and macOS Chrome uses the GPU.
"""
import os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))


def run(cmd, **kw):
    print("> " + " ".join(cmd), flush=True)
    r = subprocess.run(cmd, **kw)
    if r.returncode != 0:
        sys.exit(r.returncode)


def need(tool):
    if not shutil.which(tool):
        sys.exit(f"ERROR: {tool} not found on PATH; install it first")
    return shutil.which(tool)


def main():
    args = sys.argv[1:]
    if not args or not os.path.isfile(os.path.join(args[0], "index.html")):
        sys.exit(__doc__)
    video, rest = os.path.abspath(args[0]), args[1:]
    node, npm = need("node"), need("npm")
    need("ffmpeg")
    if not os.path.isdir(os.path.join(HERE, "node_modules")):
        run([npm, "ci", "--prefix", HERE])
    wav = os.path.join(video, "narration.wav")
    if not os.path.exists(wav):
        run([sys.executable, os.path.join(HERE, "tts.py"), video, "timeline"])
    page = os.path.join(video, "index.html")
    if any(a in rest for a in ("--stills", "--sheet", "--strip")):
        out = os.path.join(video, "check", "frame")
        run([node, os.path.join(HERE, "render.mjs"), page, out] + rest)
    else:
        run([node, os.path.join(HERE, "render.mjs"), page, os.path.join(video, "final.mp4"), "--audio", wav] + rest)


if __name__ == "__main__":
    main()
