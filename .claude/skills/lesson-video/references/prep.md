# Prep stage

When this chapter is one of several being prepared at the same time by separate agents, `parallel-prep.md` applies as well.

The input is the material for one chapter, at the paths the user gives in the repository: the textbook chapter, and the past-paper questions for that chapter with their mark schemes. If available, also the syllabus statements, examiner reports, and the `lesson_report.md` from an earlier lesson. The output is one lesson plan in the format given in `plan-format.md`, from which a teaching video is made.

Scoring in the exam needs two things: understanding the content, and writing it the way the mark scheme requires. The video serves both, so the plan keeps both: what makes each concept understood, and the exact statements and steps that score.

An experienced teacher does not reread the textbook before class. The teacher remembers what this chapter is examined on, how marks are given, where students usually lose marks, and what makes the ideas click. A model does not have that experience, and after reading a whole chapter it tends to cover every part, which produces a shortened textbook rather than a lesson. Prep replaces the missing experience: read everything, decide what to keep, and write the decisions into the plan. The video stage reads only the plan.

## Steps

1. **Read all the material**, including the mark scheme of every question.

2. **Fix the scope.** Use the syllabus statements (or, without them, the learning objectives at the start of the chapter) and the past-paper questions. Leave out any question part that is tagged with this chapter but actually examines another chapter. When questions from different paper variants have the same text and the same mark scheme, merge them into one entry and keep all their ids.

3. **Divide the chapter into concepts.** Start from the textbook sections and adjust by how the questions group: content that is always examined together becomes one concept; content in one section that is examined separately is split. A chapter usually gives 4 to 7 concepts.

4. **Weigh the concepts.** Add up the past-paper marks for each concept and record them; they show how much of the video each concept deserves. In `parts`, write the order of the concept's sub-topics.

5. **Fill in the sections of each concept.**
   - Knowledge and Method: where a mark scheme covers the content, use the mark scheme's wording, because that is the wording that scores. Content that is in the syllabus but has never appeared in a question is written briefly and directly, at whatever length makes it clear. Use the textbook's notation and terms.
   - Method: for calculation subjects, write the derivation or procedure step by step, concrete cases first, general result after. Give only the one method that the textbook and mark schemes use.
   - Keep the textbook's reasoning that explains why a statement or method holds, even when it is not examined: it is what the student understands from. Write it apart from the statements that score, so the two are not confused.
   - Write every item as a complete sentence or a complete sequence of steps that the student can read on its own.
   - Question: only the one question the video works for this concept (step 6), with its mark scheme verbatim. The other questions stay out of the plan; what their mark schemes reward is already in Knowledge and Method. For a textbook calculation question without an answer, solve it with the chapter's method and record the final answer.

6. **Choose the question the video works** for each concept. It should be the simplest case and involve only this concept. Judge simplicity by marks, command word and how many steps the answer needs, not by whether you can solve it; you can solve all of them. When the concept introduces a new method, prefer a question whose answer the student can already get by a method they know (for example, redo a 2×2 case with the new method before a 3×3 case), so the student can check the new method's result.

7. **Remove**: background and history; extension boxes; end-of-chapter summaries; linking text between examples; anything outside the syllabus.

8. **Check.**
   - The plan is shorter than the textbook chapter.
   - The plan contains nothing addressed to yourself or to the user: sources, statistics, reasons for decisions, labels such as "inferred" or "to be confirmed", explanations of the format. The video stage cannot use these and cannot act on them. Anything the user should know is said in the conversation, not written in the plan.
   - Every concept has its question. Every past-paper question part is counted in a concept's marks or left out on purpose.

## When an earlier lesson record is provided

In `lesson_report.md`, notes with cause `student`: if a note points to a missing prerequisite, name it under Prerequisites of the concept that needs it and add a one-line reminder next to the Method step that uses it. If a note points to a mark point from the previous chapter, name it under Prerequisites as well. Notes with cause `teaching` are used to revise the plan of the chapter they came from, for example by replacing the question or adding a missing step to a Method.

## Delivery

Write the plan to `lessons/<syllabus>_ch<chapter>/` and commit. In your reply, state briefly: the past-paper marks per concept; which question parts were left out and why; which textbook content was removed; anything you are unsure about that the user should check. Then remind the user that the video is made in a new session that is given only the plan.

## When something goes wrong

`problems-prep.md` covers these situations: there are no mark schemes; there are no past-paper questions; a question depends on a diagram. Read it only when one of them actually occurs, and read only the matching heading.
