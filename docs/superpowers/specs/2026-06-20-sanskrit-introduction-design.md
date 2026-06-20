# Sanskrit Introduction Design

## Goal

Create a Japanese beginner-facing page that gives readers a first map of Sanskrit before they begin formal study.

## Scope

The page will be a single introductory guide at `src/content/docs/guides/sanskrit-introduction.md`.
It will cover:

- key terms such as `Sanskrit`, `Vedic Sanskrit`, `Classical Sanskrit`, `sandhi`, `vibhakti`, `dhatu`, and `IAST`
- the role of Devanagari as an important modern script, while explaining that Sanskrit has used multiple regional scripts
- the smallest useful grammar model: inflection, gender, number, case, verbal roots, sandhi, and compounds
- background on Buddhist transmission into Chinese
- background on English, Greek, and Latin through Indo-European comparison, avoiding the false claim that Sanskrit directly caused English
- a short learning order and primary or near-primary references

## Placement

The guide belongs under `src/content/docs/guides/` because it is an entry point for learning.
It should be added to the `Culture & History` sidebar group because the page is more language-history and culture oriented than operational.

## Editorial Stance

Use `status: seed` because this is a compact map, not a full course or philological reference.
Use provenance metadata with `source_type: web_research`, `ai_process` entries for `synthesize`, `structure`, and `fact_check`, `confidence: medium`, and `review_needed: true`.

Avoid overclaiming. Especially:

- Chinese: describe influence mainly through Buddhist translation vocabulary and Buddhist Chinese register.
- English/Greek/Latin: describe Sanskrit as a comparative relative in Indo-European studies, not as a direct ancestor of English.
- Devanagari: describe it as a major modern print/study script, not the only or original script of Sanskrit.

## Verification

Add a unit-style content test for the new page and an integration-style sidebar test.
Run the targeted tests first, then the full `pnpm test` suite and `pnpm build`.
