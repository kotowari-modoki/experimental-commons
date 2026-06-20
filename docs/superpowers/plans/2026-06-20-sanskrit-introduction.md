# Sanskrit Introduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a beginner-facing Japanese guide that teaches the basic map of Sanskrit, including script, grammar, and language-history background.

**Architecture:** This is a content-only feature in the Astro/Starlight docs site. The article lives under `src/content/docs/guides/`, navigation is wired through `astro.config.mjs`, and tests protect required topics and sidebar discoverability.

**Tech Stack:** Astro, Starlight, Markdown, Node.js `node:test`, pnpm.

---

### Task 1: Add Content Contract Tests

**Files:**
- Create: `tests/sanskrit-introduction.unit.test.mjs`
- Create: `tests/sanskrit-introduction.integration.test.mjs`

- [ ] **Step 1: Write the failing unit test**

```js
// ABOUTME: Verifies the Sanskrit introduction keeps required beginner topics and provenance.
// ABOUTME: Protects the page from overstating script history or Indo-European influence.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(
	new URL('../src/content/docs/guides/sanskrit-introduction.md', import.meta.url),
	'utf8',
);

test('Sanskrit introduction contains required frontmatter and provenance', () => {
	assert.match(page, /^---\n/);
	assert.match(page, /title: サンスクリット語入門/);
	assert.match(page, /status: seed/);
	assert.match(page, /source_type: web_research/);
	assert.match(page, /ai_process:/);
	assert.match(page, /review_needed: true/);
});

test('Sanskrit introduction covers beginner learning topics', () => {
	const requiredTerms = [
		'デーヴァナーガリー',
		'IAST',
		'ヴェーダ語',
		'古典サンスクリット語',
		'サンディ',
		'格',
		'数',
		'性',
		'語根',
		'動詞',
		'中国語',
		'英語',
		'ギリシャ語',
		'ラテン語',
		'印欧語族',
	];

	for (const term of requiredTerms) {
		assert.match(page, new RegExp(term), `missing term: ${term}`);
	}
});

test('Sanskrit introduction avoids common influence overclaims', () => {
	assert.match(page, /直接の祖先ではありません/);
	assert.match(page, /唯一の文字ではありません/);
	assert.match(page, /仏典翻訳/);
});

test('Sanskrit introduction cites core references', () => {
	const sourceUrls = [
		'https://www.britannica.com/topic/Sanskrit-language',
		'https://www.britannica.com/topic/Indo-European-languages',
		'https://www.britannica.com/topic/Ashtadhyayi',
		'https://www.unicode.org/charts/PDF/U0900.pdf',
		'https://www.loc.gov/catdir/cpso/romanization/sanskrit.pdf',
		'https://sanskritlibrary.org/',
	];

	for (const sourceUrl of sourceUrls) {
		assert.match(page, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing source: ${sourceUrl}`);
	}
});
```

- [ ] **Step 2: Write the failing sidebar test**

```js
// ABOUTME: Verifies the Sanskrit introduction is discoverable from the Culture & History sidebar.
// ABOUTME: Keeps the beginner language guide wired into the published Starlight navigation.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the Sanskrit introduction from the Culture & History sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']Culture & History["'][\s\S]*label:\s*["']サンスクリット語入門["']/);
	assert.match(astroConfig, /link:\s*["']\/guides\/sanskrit-introduction\/["']/);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test tests/sanskrit-introduction.unit.test.mjs tests/sanskrit-introduction.integration.test.mjs`

Expected: FAIL because `src/content/docs/guides/sanskrit-introduction.md` does not exist and sidebar navigation is not wired yet.

### Task 2: Add Article and Navigation

**Files:**
- Create: `src/content/docs/guides/sanskrit-introduction.md`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Create the Markdown article**

Create a beginner map with frontmatter, provenance, topic sections, cautious influence notes, learning order, and references.

- [ ] **Step 2: Add the sidebar link**

Insert this item in the `Culture & History` sidebar group:

```js
{
  label: "サンスクリット語入門",
  link: "/guides/sanskrit-introduction/",
},
```

- [ ] **Step 3: Run targeted tests**

Run: `pnpm test tests/sanskrit-introduction.unit.test.mjs tests/sanskrit-introduction.integration.test.mjs`

Expected: PASS with pristine output.

### Task 3: Final Verification

**Files:**
- No new files.

- [ ] **Step 1: Run full tests**

Run: `pnpm test`

Expected: all tests pass with pristine output.

- [ ] **Step 2: Run production build**

Run: `pnpm build`

Expected: Astro build succeeds.

- [ ] **Step 3: Review diff**

Run: `git diff --check` and `git diff --stat`

Expected: no whitespace errors; changed files match the planned scope.
