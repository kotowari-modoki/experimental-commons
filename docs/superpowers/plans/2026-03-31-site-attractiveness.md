# Site Attractiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 「AIが書いたデジタルガーデン」らしさを際立てる4施策（status emoji バッジ・AI執筆ラベル・関連記事コンポーネント・タグ一覧ページ）を実装する。

**Architecture:** 既存の `page-metadata.js` / `PageTitle.astro` を最小拡張しビジュアル施策を追加。`RelatedPages.astro` を新規作成して MDX ページに埋め込み、`src/pages/tags/[tag].astro` で Astro 動的ルーティングによりタグ別一覧を生成する。

**Tech Stack:** Astro 6, Starlight 0.38, Node.js `node:test`（テストランナー）, pnpm

---

## ファイルマップ

| アクション | ファイル | 責務 |
|---|---|---|
| 修正 | `src/components/page-metadata.js` | status emoji と author ラベルの生成ロジック |
| 修正 | `src/components/PageTitle.astro` | AI draft バッジのスタイル追加 |
| 修正 | `src/content.config.ts` | `author` フィールドをスキーマに追加 |
| 修正 | `src/content/docs/reference/content-schema.md` | `author` フィールドのドキュメント |
| 新規 | `src/components/RelatedPages.astro` | タグ一致による関連記事リスト |
| 新規 | `src/pages/tags/[tag].astro` | タグ別ページ一覧の動的生成 |
| 新規 | `tests/status-emoji.unit.test.mjs` | emoji マッピングの単体テスト |
| 新規 | `tests/author-label.unit.test.mjs` | author ラベルの単体テスト |
| 新規 | `tests/related-pages.integration.test.mjs` | RelatedPages コンポーネントの統合テスト |
| 新規 | `tests/tag-pages.integration.test.mjs` | タグページファイル構造の統合テスト |

---

## Task 1: status に emoji を追加する

**Files:**
- Modify: `src/components/page-metadata.js`
- Create: `tests/status-emoji.unit.test.mjs`

- [ ] **Step 1: テストを書く**

`tests/status-emoji.unit.test.mjs` を作成:

```js
// ABOUTME: Verifies the status emoji mapping for the page metadata status badge.
// ABOUTME: Ensures each status value maps to the correct emoji prefix.
import test from 'node:test';
import assert from 'node:assert/strict';

import { getStatusEmoji, getPageMetadata } from '../src/components/page-metadata.js';

test('getStatusEmoji returns emoji for each status value', () => {
  assert.equal(getStatusEmoji('seed'), '🌱');
  assert.equal(getStatusEmoji('growing'), '🌿');
  assert.equal(getStatusEmoji('evergreen'), '🌳');
});

test('getStatusEmoji returns empty string for unknown status', () => {
  assert.equal(getStatusEmoji(undefined), '');
  assert.equal(getStatusEmoji(''), '');
});

test('getPageMetadata includes emoji in status value', () => {
  const metadata = getPageMetadata({
    status: 'seed',
    date: new Date('2026-03-31T00:00:00.000Z'),
  });

  const statusItem = metadata.find((m) => m.label === 'status');
  assert.equal(statusItem.value, '🌱 seed');
});

test('getPageMetadata includes emoji for growing status', () => {
  const metadata = getPageMetadata({ status: 'growing' });
  const statusItem = metadata.find((m) => m.label === 'status');
  assert.equal(statusItem.value, '🌿 growing');
});

test('getPageMetadata includes emoji for evergreen status', () => {
  const metadata = getPageMetadata({ status: 'evergreen' });
  const statusItem = metadata.find((m) => m.label === 'status');
  assert.equal(statusItem.value, '🌳 evergreen');
});
```

- [ ] **Step 2: テストが失敗することを確認**

```bash
node --test tests/status-emoji.unit.test.mjs
```

期待: `getStatusEmoji is not a function` などのエラーで FAIL

- [ ] **Step 3: `page-metadata.js` に `getStatusEmoji` を追加し、`getPageMetadata` を更新**

`src/components/page-metadata.js` の全体を次の内容に置き換える:

```js
// ABOUTME: Formats page frontmatter metadata for the article header in Starlight.
// ABOUTME: Keeps status emoji, author label, and date rendering logic small, predictable, and testable.

const STATUS_EMOJI = {
  seed: '🌱',
  growing: '🌿',
  evergreen: '🌳',
};

/**
 * @param {string | undefined} status
 * @returns {string}
 */
export function getStatusEmoji(status) {
  return STATUS_EMOJI[status] ?? '';
}

/**
 * @param {Date | undefined} value
 * @returns {string | null}
 */
export function formatPageDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return null;
  }

  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, '0');
  const day = String(value.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * @param {{ status?: string; date?: Date; author?: string }} data
 * @returns {Array<{ label: string; value: string }>}
 */
export function getPageMetadata(data) {
  const metadata = [];

  if (data.status) {
    const emoji = getStatusEmoji(data.status);
    metadata.push({ label: 'status', value: `${emoji} ${data.status}` });
  }

  const formattedDate = formatPageDate(data.date);
  if (formattedDate) {
    metadata.push({ label: 'date', value: formattedDate });
  }

  return metadata;
}
```

- [ ] **Step 4: テストが通ることを確認**

```bash
node --test tests/status-emoji.unit.test.mjs
```

期待: 5 tests pass

- [ ] **Step 5: 既存テストが壊れていないことを確認**

```bash
node --test tests/page-metadata.unit.test.mjs
```

期待: FAIL（`getPageMetadata` の status 値が `'seed'` → `'🌱 seed'` に変わったため）

- [ ] **Step 6: 既存テストを現在の仕様に合わせて更新**

`tests/page-metadata.unit.test.mjs` の該当アサーションを修正:

```js
test('getPageMetadata returns visible status and date items', () => {
  const metadata = getPageMetadata({
    status: 'seed',
    date: new Date('2026-03-28T00:00:00.000Z'),
  });

  assert.deepEqual(metadata, [
    { label: 'status', value: '🌱 seed' },
    { label: 'date', value: '2026-03-28' },
  ]);
});
```

- [ ] **Step 7: 全テストが通ることを確認**

```bash
node --test tests/page-metadata.unit.test.mjs tests/status-emoji.unit.test.mjs
```

期待: 8 tests pass

- [ ] **Step 8: コミット**

```bash
git add src/components/page-metadata.js tests/status-emoji.unit.test.mjs tests/page-metadata.unit.test.mjs
git commit -m "feat: add emoji prefix to status badge in page metadata"
```

---

## Task 2: author フィールドをスキーマに追加し AI ラベルを表示する

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/components/page-metadata.js`
- Create: `tests/author-label.unit.test.mjs`

- [ ] **Step 1: テストを書く**

`tests/author-label.unit.test.mjs` を作成:

```js
// ABOUTME: Verifies that the author field is included in page metadata output.
// ABOUTME: Ensures AI-authored pages get a visible label in the article header.
import test from 'node:test';
import assert from 'node:assert/strict';

import { getPageMetadata } from '../src/components/page-metadata.js';

test('getPageMetadata includes AI draft label when author is ai', () => {
  const metadata = getPageMetadata({ author: 'ai' });
  const authorItem = metadata.find((m) => m.label === 'author');
  assert.ok(authorItem, 'author item should exist');
  assert.equal(authorItem.value, '🤖 AI draft');
});

test('getPageMetadata omits author label when author is not set', () => {
  const metadata = getPageMetadata({ status: 'seed' });
  const authorItem = metadata.find((m) => m.label === 'author');
  assert.equal(authorItem, undefined);
});

test('getPageMetadata omits author label when author is human', () => {
  const metadata = getPageMetadata({ author: 'human' });
  const authorItem = metadata.find((m) => m.label === 'author');
  assert.equal(authorItem, undefined);
});
```

- [ ] **Step 2: テストが失敗することを確認**

```bash
node --test tests/author-label.unit.test.mjs
```

期待: `author is ai` のテストが FAIL（`authorItem` が undefined）

- [ ] **Step 3: `getPageMetadata` に author ロジックを追加**

`src/components/page-metadata.js` の `getPageMetadata` 関数を次のように修正（status と date の間に author を追加）:

```js
export function getPageMetadata(data) {
  const metadata = [];

  if (data.status) {
    const emoji = getStatusEmoji(data.status);
    metadata.push({ label: 'status', value: `${emoji} ${data.status}` });
  }

  if (data.author === 'ai') {
    metadata.push({ label: 'author', value: '🤖 AI draft' });
  }

  const formattedDate = formatPageDate(data.date);
  if (formattedDate) {
    metadata.push({ label: 'date', value: formattedDate });
  }

  return metadata;
}
```

- [ ] **Step 4: テストが通ることを確認**

```bash
node --test tests/author-label.unit.test.mjs
```

期待: 3 tests pass

- [ ] **Step 5: `content.config.ts` に `author` フィールドを追加**

`src/content.config.ts` を次の内容に修正:

```ts
// ABOUTME: Defines the docs collection schema used by the published knowledge garden.
// ABOUTME: Extends Starlight frontmatter so content metadata matches this repository's rules.
import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        date: z.coerce.date(),
        status: z.enum(['seed', 'growing', 'evergreen']),
        tags: z.array(z.string()).default([]),
        author: z.enum(['ai', 'human']).optional(),
      }),
    }),
  }),
};
```

- [ ] **Step 6: ビルドが通ることを確認**

```bash
pnpm build
```

期待: エラーなし

- [ ] **Step 7: 全テストが通ることを確認**

```bash
node --test tests/page-metadata.unit.test.mjs tests/status-emoji.unit.test.mjs tests/author-label.unit.test.mjs
```

期待: 11 tests pass

- [ ] **Step 8: コミット**

```bash
git add src/components/page-metadata.js src/content.config.ts tests/author-label.unit.test.mjs
git commit -m "feat: add author field to schema and show AI draft label in page header"
```

---

## Task 3: RelatedPages コンポーネントを作成する

**Files:**
- Create: `src/components/RelatedPages.astro`
- Create: `tests/related-pages.integration.test.mjs`

- [ ] **Step 1: 統合テストを書く**

`tests/related-pages.integration.test.mjs` を作成:

```js
// ABOUTME: Verifies the RelatedPages component file structure and API contract.
// ABOUTME: Ensures the component uses getCollection and renders related page links.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('RelatedPages.astro file exists', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.ok(content.length > 0);
});

test('RelatedPages.astro uses getCollection to fetch docs', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /getCollection\(['"]docs['"]\)/);
});

test('RelatedPages.astro accepts currentSlug and tags props', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /currentSlug/);
  assert.match(content, /tags/);
});

test('RelatedPages.astro renders nothing when tags is empty', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /tags\.length/);
});
```

- [ ] **Step 2: テストが失敗することを確認**

```bash
node --test tests/related-pages.integration.test.mjs
```

期待: `RelatedPages.astro file exists` が FAIL（ファイルが存在しないため）

- [ ] **Step 3: `RelatedPages.astro` を作成**

`src/components/RelatedPages.astro` を作成:

```astro
---
// ABOUTME: Displays a list of related pages that share at least one tag with the current page.
// ABOUTME: Shows at most 3 related entries to keep the section compact and scannable.
import { getCollection } from 'astro:content';

interface Props {
  currentSlug: string;
  tags: string[];
}

const { currentSlug, tags } = Astro.props;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const related =
  tags.length === 0
    ? []
    : (await getCollection('docs'))
        .filter(
          (entry) =>
            entry.id !== currentSlug &&
            entry.data.tags.some((t) => tags.includes(t)),
        )
        .slice(0, 3);
---

{
  related.length > 0 && (
    <aside class="related-pages" aria-label="Related pages">
      <h2>関連ページ</h2>
      <ul>
        {related.map((entry) => (
          <li>
            <a href={`${base}/${entry.id}/`}>
              {entry.data.title}
              {entry.data.status && (
                <span class="related-status">{entry.data.status}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

<style>
  .related-pages {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--sl-color-gray-5);
  }

  .related-pages h2 {
    font-size: 1rem;
    color: var(--sl-color-gray-3);
    margin-bottom: 0.75rem;
  }

  .related-pages ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .related-pages a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--sl-color-white);
    text-decoration: none;
  }

  .related-pages a:hover {
    text-decoration: underline;
  }

  .related-status {
    font-size: 0.75rem;
    color: var(--sl-color-gray-3);
  }
</style>
```

- [ ] **Step 4: テストが通ることを確認**

```bash
node --test tests/related-pages.integration.test.mjs
```

期待: 4 tests pass

- [ ] **Step 5: コミット**

```bash
git add src/components/RelatedPages.astro tests/related-pages.integration.test.mjs
git commit -m "feat: add RelatedPages component for tag-based navigation"
```

---

## Task 4: 既存の 2 ページを MDX に変換して RelatedPages を埋め込む

**Files:**
- Modify: `src/content/docs/history/kojiki-nihon-shoki-history.md` → `.mdx`
- Modify: `src/content/docs/books/three-major-waka-anthologies.md` → `.mdx`
- Modify: `astro.config.mjs` のサイドバーリンク（拡張子なしのためそのまま）

> Note: Starlight は `.md` と `.mdx` どちらも同じルートで扱う。ファイル名変更のみでサイドバーリンクの変更は不要。

- [ ] **Step 1: `kojiki-nihon-shoki-history.md` を `.mdx` にリネームし、RelatedPages を追加**

元のファイルを削除して `.mdx` として再作成:

```bash
mv src/content/docs/history/kojiki-nihon-shoki-history.md src/content/docs/history/kojiki-nihon-shoki-history.mdx
```

`src/content/docs/history/kojiki-nihon-shoki-history.mdx` の末尾（本文の最後の行より後）に以下を追加:

```mdx
import RelatedPages from '../../../components/RelatedPages.astro';

<RelatedPages currentSlug="history/kojiki-nihon-shoki-history" tags={frontmatter.tags} />
```

> Note: Starlight MDX では `frontmatter.tags` が使えない。`Astro.props` のかわりに props から直接渡す必要がある。代わりに固定値で埋め込む:

```mdx
import RelatedPages from '../../../components/RelatedPages.astro';

<RelatedPages currentSlug="history/kojiki-nihon-shoki-history" tags={["history", "japan", "classics", "mythology", "historiography"]} />
```

- [ ] **Step 2: `three-major-waka-anthologies.md` を `.mdx` にリネームし RelatedPages を追加**

```bash
mv src/content/docs/books/three-major-waka-anthologies.md src/content/docs/books/three-major-waka-anthologies.mdx
```

`src/content/docs/books/three-major-waka-anthologies.mdx` の末尾に追加（frontmatter の tags を確認して使用）:

```mdx
import RelatedPages from '../../../components/RelatedPages.astro';

<RelatedPages currentSlug="books/three-major-waka-anthologies" tags={["japanese-literature", "waka", "poetry", "classics", "heian", "medieval-japan"]} />
```

- [ ] **Step 3: ビルドが通ることを確認**

```bash
pnpm build
```

期待: エラーなし。`dist/experimental-commons/history/kojiki-nihon-shoki-history/index.html` が存在すること

- [ ] **Step 4: コミット**

```bash
git add src/content/docs/history/kojiki-nihon-shoki-history.mdx src/content/docs/books/three-major-waka-anthologies.mdx
git rm src/content/docs/history/kojiki-nihon-shoki-history.md src/content/docs/books/three-major-waka-anthologies.md 2>/dev/null || true
git commit -m "feat: embed RelatedPages in kojiki and waka anthology pages"
```

---

## Task 5: タグ一覧ページを作成する

**Files:**
- Create: `src/pages/tags/[tag].astro`
- Create: `tests/tag-pages.integration.test.mjs`

- [ ] **Step 1: 統合テストを書く**

`tests/tag-pages.integration.test.mjs` を作成:

```js
// ABOUTME: Verifies the tag index page file exists and uses correct Astro patterns.
// ABOUTME: Ensures static path generation and collection filtering are wired correctly.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('tag page file exists', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.ok(content.length > 0);
});

test('tag page uses getStaticPaths', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /getStaticPaths/);
});

test('tag page uses getCollection for docs', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /getCollection\(['"]docs['"]\)/);
});

test('tag page renders entry links', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /entry\.id/);
  assert.match(content, /entry\.data\.title/);
});
```

- [ ] **Step 2: テストが失敗することを確認**

```bash
node --test tests/tag-pages.integration.test.mjs
```

期待: `tag page file exists` で FAIL

- [ ] **Step 3: `src/pages/tags/[tag].astro` を作成**

```bash
mkdir -p src/pages/tags
```

`src/pages/tags/[tag].astro` を作成:

```astro
---
// ABOUTME: Generates a static page for each tag listing all docs entries with that tag.
// ABOUTME: Provides entry points for tag-based browsing of the knowledge garden.
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  const tagSet = new Set(docs.flatMap((entry) => entry.data.tags));

  return Array.from(tagSet).map((tag) => ({
    params: { tag },
    props: {
      tag,
      entries: docs.filter((entry) => entry.data.tags.includes(tag)),
    },
  }));
}

const { tag, entries } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>#{tag} — experimental-commons</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        max-width: 48rem;
        margin: 2rem auto;
        padding: 0 1rem;
        background: #0d0e14;
        color: #e4e7eb;
      }
      h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
      ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
      a { color: #e4e7eb; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .status { font-size: 0.8rem; color: #9ca3af; margin-left: 0.5rem; }
      .back { display: inline-block; margin-bottom: 2rem; color: #9ca3af; font-size: 0.875rem; }
    </style>
  </head>
  <body>
    <a class="back" href={`${base}/`}>← experimental-commons</a>
    <h1>#{tag}</h1>
    <ul>
      {entries.map((entry) => (
        <li>
          <a href={`${base}/${entry.id}/`}>
            {entry.data.title}
            <span class="status">{entry.data.status}</span>
          </a>
        </li>
      ))}
    </ul>
  </body>
</html>
```

- [ ] **Step 4: テストが通ることを確認**

```bash
node --test tests/tag-pages.integration.test.mjs
```

期待: 4 tests pass

- [ ] **Step 5: ビルドが通ることを確認**

```bash
pnpm build
```

期待: エラーなし。`dist/experimental-commons/tags/` 配下に各タグのページが生成されること

- [ ] **Step 6: コミット**

```bash
git add src/pages/tags/[tag].astro tests/tag-pages.integration.test.mjs
git commit -m "feat: add tag index pages for browsing by topic"
```

---

## Task 6: content-schema.md に author フィールドを追記する

**Files:**
- Modify: `src/content/docs/reference/content-schema.md`

- [ ] **Step 1: `content-schema.md` の「必須フィールド」テーブルに `author` 行を追加**

`src/content/docs/reference/content-schema.md` の必須フィールドテーブルの下、「## status の定義」の直前に以下のセクションを追加:

```md
## オプションフィールド

| field | type | meaning |
| --- | --- | --- |
| `author` | enum | `ai` / `human`（省略可） |

### author の定義

| author | 意味 |
| --- | --- |
| `ai` | AI Agentが下書きを作成し、人間が編集責任を持つページ |
| `human` | 人間が直接執筆したページ |

省略した場合はラベルを表示しません。
```

- [ ] **Step 2: ビルドが通ることを確認**

```bash
pnpm build
```

期待: エラーなし

- [ ] **Step 3: コミット**

```bash
git add src/content/docs/reference/content-schema.md
git commit -m "docs: document optional author field in content schema"
```

---

## Task 7: 全テストとビルドの最終確認

- [ ] **Step 1: 全テストを一括実行**

```bash
node --test tests/*.test.mjs
```

期待: 全テスト pass、fail 0

- [ ] **Step 2: ビルドを実行**

```bash
pnpm build
```

期待: エラーなし

- [ ] **Step 3: 生成物を確認**

```bash
ls dist/experimental-commons/tags/
```

期待: `ai/`, `history/`, `reference/` などタグ名のディレクトリが存在すること

