# Preparing several chapters in parallel

One agent per chapter, no communication between agents. Each agent follows `prep.md` for its chapter. What the chapters share is settled before the work is split and handed to every agent as one short file, `course_<syllabus>.md`.

## The shared file

Made once per course, before any chapter is prepared. Everything in it is a decision that two agents working alone would make differently.

- Chapter list: number, title, textbook pages.
- Concepts of every chapter: id and name only, no content. This fixes the granularity and gives chapter agents something to refer to in Prerequisites.
- Where each past-paper question part belongs, by chapter and concept, when a question spans chapters. Parts that belong to one chapter need no entry.
- Notation and terms, where the textbook and mark schemes differ or where several forms are in use.
- `answer_language`, and any convention about answers that holds for the whole course (for example what a command word requires).

Twenty to sixty lines. Whoever makes it reads the whole textbook's contents page, the syllabus, and skims the questions; that is all it needs.

## What a chapter agent does differently

- Takes the concept list for its chapter from the shared file instead of deciding it. It may split or merge only by telling the user why in its delivery message; the shared file is then corrected before other chapters use it.
- Writes Prerequisites as references to concept ids of earlier chapters (`Prerequisites: Ch3 C2`), so that no agent has to describe another chapter's content.
- Counts a question part only if the shared file assigns it to this chapter, or if it is not listed there and clearly belongs here.

## After the agents finish

The user checks that every prerequisite reference points to a concept that exists, which can be done with a script over the plans in `lessons/`, and, from the agents' replies, that every question part was counted by exactly one agent. These are the only cross-chapter checks needed.
