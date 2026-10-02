# lesson-video 使用说明

本文件给人看，模型读取的是 `SKILL.md` 和 `references/`。下文的 `<skill>` 指本技能文件夹的路径：放在仓库中时为 `.claude/skills/lesson-video`。

## 文件

| 文件 | 内容 | 来源 |
|---|---|---|
| `SKILL.md` | 入口：两部分（素材、视频）、为何分开会话、文件索引 | 新写 |
| `references/prep.md` | 生成课程计划的步骤 | lesson 技能的 prep，改为视频用：目标分理解与准确输出、保留推理、去掉配图与课时 |
| `references/plan-format.md` | 课程计划格式 | lesson 技能，增加 Reasoning，去掉课时与配图字段 |
| `references/parallel-prep.md`、`problems-prep.md` | 多章并行、材料缺失时的处理 | lesson 技能 |
| `references/video.md` | 视频：要求、四个阶段、工具接口、检查方法 | 新写 |
| `references/script.md` | 脚本阶段：两个目标、内容来源、语言 | 新写 |
| `scripts/` | 配音、公式、渲染、检查工具，环境脚本 | `render.mjs`、`layout-check.mjs` 改编自 iArt（MIT） |
| `assets/example/` | 接口示例（从 1 加到 100） | 新写 |
| `assets/style/` | 风格参考材料，放入截图即生效 | 你提供 |

输出位置：课程计划在仓库根目录的 `lessons/`，视频在 `videos/`，首次使用时自动创建。

## 配置云端环境（一次）

在 claude.ai/code 中新建云端环境：

1. Network access：Trusted。
2. Environment variables：`BASH_DEFAULT_TIMEOUT_MS=600000` 和 `BASH_MAX_TIMEOUT_MS=600000`。Team 或 Enterprise 套餐另加 `GEMINI_API_KEY=...`。
3. Setup script：粘贴 `scripts/cloud-setup.sh` 的内容。
4. Pro 或 Max 套餐：保存后编辑环境，在 API credentials 中添加 `generativelanguage.googleapis.com`，Header 名称 `x-goog-api-key`，清空前缀，值为密钥。

检查环境：

```
运行 bash <skill>/scripts/selftest.sh --tts，把输出贴给我，并查看 /tmp/lesson-video-selftest/out/sheet.jpg。
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

各阶段需要审阅的文件：`SCRIPT_REVIEW.md`、`narration.wav`、`STORYBOARD.md`、`final.mp4`，都在视频文件夹中，可从会话分支下载。

## Windows 本机做最终渲染

需要 Node.js 18 以上、Google Chrome、ffmpeg，以及本技能文件夹（把 `lesson-video.skill` 按 zip 解压到任意位置，下文 `<skill>` 即该路径）。拉取会话分支后在仓库根目录执行：

```
npm ci --prefix <skill>/scripts
node <skill>/scripts/render.mjs videos/<视频名>/index.html videos/<视频名>/final.mp4 --audio videos/<视频名>/narration.wav
```

## 说明

- TTS 默认模型为 `gemini-3.8-flash-tts`。若报 HTTP 400 或 404，在视频的 `script.json` 中把 `meta.model` 改为 `gemini-3.1-flash-tts-preview`。
- 云端 VM 没有 GPU，WebGL 以软件方式渲染；迭代时只渲染需要查看的帧，完整渲染只在最后做一次。
- 修改 `scripts/cloud-setup.sh` 后需重新粘贴到环境设置中。
