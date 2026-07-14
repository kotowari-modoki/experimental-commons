---
name: write-research-journal
description: Create and update Japanese research and paper development journals in experimental-commons. Use when the user asks to write a 論文開発日誌 or 研究日誌, turn experiment timelines or work logs into journal entries, record research motivation, decisions, failures, result changes, publication-boundary decisions, or self-review notes, and update the corresponding research index. Do not use for ordinary knowledge articles, general blog posts, or paper drafting.
---

# Write Research Journal

Turn research conversations, work logs, and retrospectives into honest, append-only development journals. Preserve the researcher's voice while separating evidence, interpretation, motivation, limitations, and future work.

## 1. Ground the work in repository artifacts

Before writing, read these files completely when present:

1. Root `AGENTS.md`
2. Root `gotchas.md`
3. `src/content/docs/research/journal-template.md`
4. `src/content/docs/research/index.md`
5. The target project's `index.md`
6. The latest related entries under the target project's `journal/`

Treat those artifacts as authoritative over conversational memory. Read user-provided local sources, but do not expose their path, filename, existence, or inferred public URL unless the user explicitly permits it.

## 2. Classify the journal entry

Choose the smallest entry type that matches the state change:

- **Motivation:** why this theme matters and how lived experience shaped the question
- **Timeline:** what happened across experiment or implementation generations
- **Decision:** why a method, tool, scope, or publication boundary changed
- **Failure or pivot:** what failed, competing explanations, and why the next direction changed
- **Result update:** what new evidence changed an earlier interpretation
- **Self-review:** what the author checked after completion and what remains unresolved
- **Contradiction update:** how a new claim relates to an older note without erasing it

Create separate entries when motivations, experiment results, and later self-review occurred at different times or answer different questions.

## 3. Extract claims before drafting

Separate the input into:

- confirmed facts and dates
- observations from a specific run
- the author's interpretation or value judgment
- hypotheses and competing explanations
- decisions and their reasons
- limitations, missing data, and uncertainty
- privacy or publication boundaries
- open questions and next checks

Do not turn personal experience into general evidence. Use it as research motivation or a source of hypotheses, and label it accordingly. If a subject, beneficiary, or actor is omitted in Japanese, do not infer one when multiple readings remain possible.

## 4. Protect privacy and unpublished work

Default to the least revealing version that preserves the research decision.

- Omit identifying anecdotes, relationships, dates, attributes, and quotations about third parties.
- Do not mention private files or unpublished artifacts merely to prove provenance.
- Do not construct a public URL from a local path.
- Do not expose unpublished results beyond the scope the user explicitly approved.
- State a publication boundary without explaining the private facts behind it.
- Record lost or unavailable data as a limitation; never reconstruct it as if it were original evidence.

When uncertain whether a detail is public, leave it out and mark the omission or ask the user if the omission would materially change the entry.

## 5. Compose the entry

Create the file at:

```text
src/content/docs/research/<project>/journal/YYYY-MM-DD-short-title.md
```

Follow the repository frontmatter schema. Include at least `title`, `description`, `date`, `status`, and `tags`, plus provenance when available.

- Set `author: ai` when AI extracted, structured, synthesized, or rewrote the entry.
- Choose `source_type` from the repository's allowed values.
- List only sources that may safely appear in the public file.
- Record actual AI operations in `ai_process`.
- Use `review_needed: true` when human judgment, source verification, or self-review remains.
- Use `seed`, `growing`, or `evergreen` honestly; project completion and journal maturity are separate.
- Add the two-line `ABOUTME` comment used by surrounding content.

Structure the body for the selected entry type instead of forcing every journal into one outline. Prefer chronological headings for timelines and question-based headings for motivations or decisions.

Write natural Japanese with concrete verbs and varied rhythm. Preserve first-person uncertainty and value judgments when they are part of the research record. Revise mechanical or formulaic phrasing without weakening factual caveats.

Explain unfamiliar experimental constructs, datasets, metrics, or technical choices with a compact concrete example. Keep observations distinct from causal conclusions. State when a result applies only to an LLM-agent environment and not to humans or a broader domain.

## 6. Preserve knowledge history

Append a new dated entry instead of silently rewriting an older journal to match the current conclusion.

- Link to the earlier entry when a claim changes.
- Use update notes, `supersedes`, `superseded_by`, related notes, or contradiction review when appropriate.
- Keep both interpretations when the evidence does not resolve the conflict.
- Run a decision-change sweep across indexes, current-status text, links, frontmatter dates, and related notes so stale state does not remain.

## 7. Update the project index

Update the target project's `index.md` in the same change:

- advance `date`
- add safe provenance for the new entry
- add a short update note when useful
- update the current research stage and last-updated text
- link the new entry newest-first
- preserve future self-review or verification work as explicitly unfinished

Update `src/content/docs/research/index.md` only when the project summary shown there became stale.

## 8. Review from two perspectives

Before validation, inspect the draft twice:

- **Perfectionist:** identify unsupported claims, over-attribution, missing controls, ambiguous actors, privacy leakage, and details a reviewer cannot trace.
- **Pragmatist:** confirm the entry honestly captures the decision, is useful now, and does not wait for an impossible level of completeness.

Prefer an explicit limitation over invented completeness. Do not add rhetorical importance, promotional language, or a generic conclusion merely to make the entry look finished.

## 9. Validate and land the change

Follow root `AGENTS.md` for the final workflow. At minimum:

1. Run `git diff --check`.
2. Do not create article-specific tests when repository policy prohibits them.
3. Run the repository's existing content checks, build, and tests.
4. Use `privacy-check` before committing or publishing.
5. Verify the generated route and index link through the build output or existing generic tests.
6. Commit, pull/rebase, push, and verify remote synchronization when required by repository instructions.

If validation reveals a pre-existing unrelated warning, report it without changing unrelated files.
