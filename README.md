# lesson-video 使用说明

本文件给人看。工具脚本在仓库根目录的 `scripts/`，风格参考在 `style/`；模型读取的说明（`SKILL.md`、`references/`、`assets/example/`）在 `.claude/skills/lesson-video/`，那是 Claude Code 加载技能的固定位置，平时不需要打开。

## 文件

| 文件 | 内容 | 来源 |
|---|---|---|
| `.claude/skills/lesson-video/SKILL.md` | 入口：两部分（素材、视频）、为何分开会话、文件索引 | 新写 |
| `.claude/skills/lesson-video/references/prep.md` | 生成课程计划的步骤 | lesson 技能的 prep，改为视频用：目标分理解与准确输出、保留推理、去掉配图与课时 |
| `.claude/skills/lesson-video/references/plan-format.md` | 课程计划格式 | lesson 技能，增加 Reasoning，去掉课时与配图字段 |
| `.claude/skills/lesson-video/references/parallel-prep.md`、`problems-prep.md` | 多章并行、材料缺失时的处理 | lesson 技能 |
| `.claude/skills/lesson-video/references/video.md` | 视频：要求、四个阶段、工具接口、检查方法 | 新写 |
| `.claude/skills/lesson-video/references/script.md` | 脚本阶段：两个目标、内容来源、语言 | 新写 |
| `scripts/` | 配音、公式、渲染、检查工具，环境脚本 | `render.mjs`、`layout-check.mjs` 改编自 iArt（MIT） |
| `.claude/skills/lesson-video/assets/example/` | 接口示例（从 1 加到 100） | 新写 |
| `style/` | 风格参考材料，放入截图即生效 | 你提供 |

输出位置：课程计划在仓库根目录的 `lessons/`，视频在 `videos/`，首次使用时自动创建。

## 配置云端环境（一次）

在 claude.ai/code 中新建云端环境：

1. Network access：Trusted。
2. Environment variables：`BASH_DEFAULT_TIMEOUT_MS=600000` 和 `BASH_MAX_TIMEOUT_MS=600000`。Team 或 Enterprise 套餐另加 `GEMINI_API_KEY=...`。
3. Setup script：粘贴 `scripts/cloud-setup.sh` 的内容。
4. Pro 或 Max 套餐：保存后编辑环境，在 API credentials 中添加 `generativelanguage.googleapis.com`，Header 名称 `x-goog-api-key`，清空前缀，值为密钥。

检查环境：

```
运行 bash scripts/selftest.sh --tts，把输出贴给我，并查看 /tmp/lesson-video-selftest/out/sheet.jpg。
```

## 提示词

生成素材（新会话）：

```
使用 lesson-video 技能准备第 3 章。教材：materials/textbook/ch03.pdf；真题：materials/papers/ch03/；评分方案：materials/ms/ch03/。
```

制作视频（另开新会话，每个阶段确认后再发下一条）：

```
使用 lesson-video 技能制作视频。课程计划在 lessons/9709_ch3/，只做概念 C2，旁白用中文，术语用英文。先完成脚本阶段。
```

```
脚本确认，进行配音阶段。
```

```
配音确认，进行分镜阶段。
```

```
分镜确认，进行构建阶段。
```

各阶段需要审阅的文件：`SCRIPT_REVIEW.md`、`narration.mp3`、`STORYBOARD.md`，都在视频文件夹中，可从会话分支下载。构建阶段结束时，会话会报告检查结果（逐场景截图、文字重叠检查、引文核对），然后由你在本机渲染。

## 本机预览与最终渲染

拉取分支后，在仓库根目录执行：

```
python scripts/final.py videos/<视频名>
```

该命令首次运行时安装渲染工具的依赖，从已提交的分段音频重建 `narration.wav`，然后生成 `videos/<视频名>/final.mp4`。需要 Node.js 18 以上、Google Chrome、ffmpeg。只看几帧：在命令后加 `--stills 12.5s,80s`，图片输出到视频文件夹的 `check/`。

不渲染、直接播放：在视频文件夹中执行 `python -m http.server 8000`，用 Chrome 打开 `http://localhost:8000/`，点 play。

## 说明

- TTS 引擎由视频的 `script.json` 中 `meta.model` 决定：`edge-tts`（不需要密钥，`voice` 如 `zh-CN-YunjianNeural`，`rate` 如 `+10%`）或 Gemini 模型（如 `gemini-3.8-flash-tts`，需要有付费额度的密钥）。两者都用同一条命令 `tts.py V all`。
- 云端 VM 没有 GPU，迭代时只渲染需要查看的帧；完整渲染在本机做。
- 修改 `scripts/cloud-setup.sh` 后需重新粘贴到环境设置中。
