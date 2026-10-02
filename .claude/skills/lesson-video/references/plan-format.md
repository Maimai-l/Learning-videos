# Lesson plan format

The lesson plan is the only file passed from prep to the video. Its reader is the model that makes the video, not a person and not the model that wrote it. That model already knows the subject. What it needs from the plan is what to teach, what to leave out, the reasoning the textbook uses to make it understood, which question to work, and how marks are awarded.

One plan per chapter, in Markdown, named `lesson_plan_<syllabus>_ch<chapter>.md`. It is written to `lessons/<syllabus>_ch<chapter>/` in the repository.

## Frontmatter

```yaml
---
syllabus: 9618            # course code
chapter: 5
title: System software
answer_language: en       # language the student must answer in during the exam
concepts:
  - id: C1
    name: "Operating system: purpose and management tasks"
    marks: 14             # past-paper marks for this concept
    parts: [purpose and task names, what each task does]   # order of sub-topics
  - id: C2
    ...
---
```

## Each concept

A level-2 heading `## <id> <name>`, followed by the sections below in this order. Leave out a section that has no content.

- **Prerequisites**: what the student is assumed to know already when this concept is taught.
- **Knowledge**: what things are. Definitions, facts, properties, advantages and disadvantages. Unordered.
- **Method**: steps that happen or are carried out in a fixed order: how a process runs, or how a type of question is solved. Examples: how to multiply two matrices; the steps of summing a series by the method of differences; how a hard disk drive reads data; how a compiler operates.
- **Reasoning**: why the Knowledge holds or the Method works, as the textbook explains it. It is for understanding and is not what the student writes in the exam.
- **Question**: the one question the video works for this concept, written as `**<question id> [marks]** <question text>`, followed by its mark scheme verbatim (for a textbook exercise without one, its final answer).

Knowledge, Method, the question and its mark scheme are written in `answer_language`. Mathematics is written in LaTeX (`$...$`), not in Unicode symbols. Prerequisites and `parts` are written in the user's language.

## Example of one concept

```markdown
## C5 Partial compilation and interpretation

Prerequisites: C4.

Knowledge
- Intermediate code (bytecode, p-code): low-level code that is machine independent, produced by a compiler.
- Reasons for partial compilation: partially compiled programs can be used on different platforms as they are interpreted when run; code is optimised for the CPU as machine code is generated at run time; source code does not need recompiling.

Method
- Source code → the compiler checks it and translates it into bytecode → the bytecode is distributed → on each computer an interpreter (virtual machine) translates and executes the bytecode.

Reasoning
- The bytecode contains no instructions for any particular CPU, so the same file is valid everywhere; only the interpreter on each platform is specific to that CPU.

Question

**w22_12 1(b)(ii) [2]** Explain why high-level language programs might be partially compiled and partially interpreted.
- Partially compiled programs can be used on different platforms as they are interpreted when run
- Code is optimised for the CPU as machine code is generated at run time
Max 2.
```
