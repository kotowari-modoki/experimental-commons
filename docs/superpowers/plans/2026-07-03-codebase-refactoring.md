# manabi-commons リファクタリング実行計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 記事追加のたびに増殖するテスト負債を汎用テストに置き換え、`public/` 直置きのソースを Astro 管理下へ移し、CI にテストゲートを追加して、以後「記事を書くだけならコード変更ゼロ」の状態にする。

**Architecture:** Astro 6 + Starlight 0.40 の静的ドキュメントサイト。コンテンツは `src/content/docs/` の Markdown、インタラクティブ部品は `src/components/` + `src/scripts/`、ページ読み上げ(TTS)は現在 `public/` 直置き。テストは Vitest(unit)+ Playwright(E2E)。

**Tech Stack:** Astro 6.4 / Starlight 0.40 / pnpm / Vitest 2 / Playwright / GitHub Actions (GitHub Pages デプロイ)

## 事前調査で特定した「無駄」の実体

1. **記事ごとのハードコード・テスト(最大の負債、増殖中)**
   - `src/content/docs/**/*.test.ts` 3本:記事本文の見出し文字列や frontmatter を `toContain` で丸写し検証。記事を1文字直すとテストが壊れ、記事を足すとテストが増える。
   - `tests/physical-education.spec.ts`, `tests/school-guide-*.spec.ts` 3本:同じことを E2E でも重複検証。
2. **`public/page-tts-core.js`(293行)がソースコードなのに `public/` 直置き**。バンドル・型チェック対象外で、テストが `../../public/` へ相対 import している。
3. **CI がテストを一切実行しない**。`deploy.yml` は build + deploy のみ。unit 6ファイル + E2E 6ファイルが存在するのに PR ゲートがない。
4. **テンプレート由来のごみ**:`package.json` の `"name": ""`、`astro.config.mjs` のコメントアウトされた logo ブロック、`deploy.yml` の Astro テンプレートのチュートリアルコメント。
5. **型チェックの仕組みがない**:`astro check` 未導入。

**無駄ではないと判断したもの(変更しない):**
- `hyakunin-isshu.md` と `hyakunin-isshu-complete.md` — 概説と全首一覧で相互リンク済みの意図的な分割。
- `src/content/docs/test/*.mdx` — `draft: true` の E2E フィクスチャ。本番ビルドには含まれず、dev サーバー上の E2E が依存している。現状維持。
- `docs/*.md` 5本 — 見出しを精査した結果、テンプレート/執筆ガイド/ポリシー/開発ガイドで役割分担できており統合不要。
- コンテンツ Markdown 全体への Prettier 適用 — 30本超の日本語記事に差分ノイズを撒くため、意図的に見送る。

## Global Constraints

- パッケージマネージャは `pnpm@9.0.0`(`packageManager` フィールド準拠)。
- ベースパスは `/manabi-commons`(GitHub Pages のサブパス)。E2E の URL は必ずこのプレフィックス付き。
- 各タスク完了時に `pnpm test:unit` と `pnpm test:e2e` が green であること。
- コンテンツ(`src/content/docs/**/*.md(x)`)の本文は一切変更しない。
- コミットは Conventional Commits 形式。`--no-verify` 禁止、GPG 署名なし。
- main へ直接 push しない。ブランチ `refactor/test-strategy` で作業し PR を作る。

---

## Phase 0: セーフティネット(CI テストゲート)

リファクタリングを始める前に、現状のテストが CI で回る状態を作る。以降の全フェーズはこの CI が green であることを確認しながら進める。

### Task 1: CI ワークフロー追加

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces: PR / main push で `pnpm test:unit` → Playwright E2E → `pnpm build` を実行するワークフロー。以降のタスクはこの CI を回帰検知に使う。

- [ ] **Step 1: 作業ブランチを切る**

```bash
git checkout -b refactor/test-strategy
```

- [ ] **Step 2: ローカルで現状のテストが通ることを確認(ベースライン)**

Run: `pnpm test:unit && pnpm test:e2e`
Expected: unit 6ファイル・E2E 6ファイルすべて PASS。失敗する場合はリファクタリング前に原因を直すこと(このプラン外の事前修正として扱う)。

- [ ] **Step 3: ci.yml を作成**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - run: pnpm build
```

補足: `pnpm/action-setup@v4` は `package.json` の `packageManager` フィールドから pnpm のバージョンを自動検出する。`with: version:` は書かない。

- [ ] **Step 4: コミットして PR を作り、CI が green になることを確認**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: run unit tests, e2e tests, and build on pull requests"
git push -u origin refactor/test-strategy
gh pr create --title "refactor: replace per-article tests with generic smoke tests" --draft --body "WIP: see docs/superpowers/plans/2026-07-03-codebase-refactoring.md"
gh pr checks --watch
```

Expected: CI ジョブが PASS。

---

## Phase 1: テスト戦略の刷新(記事別テスト → 汎用スモークテスト)

記事ごとの文字列一致テストを全廃し、「全コンテンツページがレンダリングされ h1 が表示される」ことを機械的に全ページ検証する汎用テストに置き換える。frontmatter の構造検証は既存の `src/content.config.ts` の zod スキーマが担っており、`astro build`(CI で実行済み)が違反を検出する。

### Task 2: コンテンツルート列挙ヘルパー(TDD)

**Files:**
- Create: `tests/helpers/content-routes.ts`
- Create: `tests/helpers/content-routes.test.ts`
- Modify: `vitest.config.ts`(include に `tests/**` を追加)
- Modify: `playwright.config.ts`(`testMatch` を `.spec.ts` に限定し、Playwright が `.test.ts` を拾わないようにする)

**Interfaces:**
- Produces: `contentRoutes(contentDir?: string): string[]` — `src/content/docs/` 配下の `.md`/`.mdx` を列挙し、拡張子を除去、`index` はディレクトリルートに変換、小文字化した URL パスの配列を返す。ルート直下の `index.mdx` は空文字 `''` になる。Task 3 の E2E がこれを consume する。

- [ ] **Step 1: 設定を先に直す(テストが実行されるようにする)**

`vitest.config.ts` の include を変更:

```ts
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
```

`playwright.config.ts` の `testDir: './tests',` の直後に追加:

```ts
  testMatch: '**/*.spec.ts',
```

理由: Playwright のデフォルト testMatch は `.test.ts` も拾うため、`tests/helpers/*.test.ts`(Vitest 用)を Playwright が実行してしまう事故を防ぐ。

- [ ] **Step 2: 失敗するテストを書く**

```ts
// ABOUTME: content-routes.ts のルート列挙ロジックを検証するユニットテストです。
// ABOUTME: 実リポジトリのコンテンツディレクトリを入力として境界条件を確認します。
// tests/helpers/content-routes.test.ts
import { describe, expect, it } from 'vitest';
import { contentRoutes } from './content-routes';

describe('contentRoutes', () => {
  it('collects md/mdx files as extension-less routes', () => {
    const routes = contentRoutes();
    expect(routes).toContain('japanese/hyakunin-isshu');
    expect(routes).toContain('math/sho2-kuku-oboekata');
  });

  it('maps index files to their directory route', () => {
    const routes = contentRoutes();
    expect(routes).toContain('japanese');
    expect(routes).toContain('');
  });

  it('excludes non-content files such as colocated test files', () => {
    const routes = contentRoutes();
    expect(routes.every((r) => !r.includes('.test'))).toBe(true);
  });

  it('returns lowercase routes only', () => {
    const routes = contentRoutes();
    expect(routes.every((r) => r === r.toLowerCase())).toBe(true);
  });
});
```

- [ ] **Step 3: 失敗を確認**

Run: `pnpm test:unit -- tests/helpers/content-routes.test.ts`
Expected: FAIL — `Cannot find module './content-routes'`

- [ ] **Step 4: 実装を書く**

```ts
// ABOUTME: src/content/docs 配下のコンテンツファイルから公開 URL パス一覧を作るヘルパーです。
// ABOUTME: 全ページ共通のスモーク E2E テストがルート列挙に使います。
// tests/helpers/content-routes.ts
import { readdirSync } from 'node:fs';

export function contentRoutes(contentDir = 'src/content/docs'): string[] {
  const entries = readdirSync(contentDir, { recursive: true, encoding: 'utf8' });
  return entries
    .filter((p) => /\.(md|mdx)$/.test(p))
    .map((p) =>
      p
        .replace(/\\/g, '/')
        .replace(/\.(md|mdx)$/, '')
        .replace(/(^|\/)index$/, '')
        .replace(/\/$/, '')
        .toLowerCase(),
    );
}
```

補足: Starlight のルートは「ファイルパスの拡張子抜き・小文字」なのでこの変換で一致する。`index.md` はディレクトリ自身のルートになる。

- [ ] **Step 5: テストが通ることを確認**

Run: `pnpm test:unit -- tests/helpers/content-routes.test.ts`
Expected: 4 tests PASS

- [ ] **Step 6: コミット**

```bash
git add tests/helpers/content-routes.ts tests/helpers/content-routes.test.ts vitest.config.ts playwright.config.ts
git commit -m "test: add content route enumeration helper for smoke tests"
```

### Task 3: 全ページ汎用スモーク E2E

**Files:**
- Create: `tests/content-smoke.spec.ts`

**Interfaces:**
- Consumes: `contentRoutes(): string[]`(Task 2)
- Produces: 全コンテンツページに対する「200 応答 + h1 表示」の E2E。以後、記事を追加しても自動的にテスト対象に入る。

- [ ] **Step 1: スモークテストを書く**

```ts
// ABOUTME: 全コンテンツページが 200 で応答し h1 が表示されることを確認するスモーク E2E です。
// ABOUTME: 記事を追加すると自動的にテスト対象へ含まれるため、記事別テストは不要です。
// tests/content-smoke.spec.ts
import { expect, test } from '@playwright/test';
import { contentRoutes } from './helpers/content-routes';

for (const route of contentRoutes()) {
  test(`renders /${route || '(top)'}`, async ({ page }) => {
    const response = await page.goto(`/manabi-commons/${route}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1').first()).toBeVisible();
  });
}
```

補足: `draft: true` のページ(`test/` 配下)は dev サーバーでは配信されるため対象に含まれてよい。E2E は dev サーバー(`playwright.config.ts` の webServer)に対して走る。

- [ ] **Step 2: 実行して全ページ分のテストが生成・通過することを確認**

Run: `pnpm test:e2e -- tests/content-smoke.spec.ts`
Expected: コンテンツファイル数ぶん(現時点で 30 件超)のテストがすべて PASS。FAIL するページがあればそれは実バグなので、このタスク内で原因を調べて記録し、修正は別コミットに分ける。

- [ ] **Step 3: コミット**

```bash
git add tests/content-smoke.spec.ts
git commit -m "test: add smoke e2e covering every content page"
```

### Task 4: 記事別テストの削除

**Files:**
- Delete: `src/content/docs/physical-education/physical-education-content.test.ts`
- Delete: `src/content/docs/school-guide/kodomo-no-jikan-tsukaikata.test.ts`
- Delete: `src/content/docs/school-guide/machigai-no-uketorikata.test.ts`
- Delete: `tests/physical-education.spec.ts`
- Delete: `tests/school-guide-time-management.spec.ts`
- Delete: `tests/school-guide-correction-feedback.spec.ts`

**Interfaces:**
- Consumes: Task 3 のスモークテストが「ページが壊れていない」検証を肩代わりすること。

削除して残るテストは: 機能ロジックの unit(quiz / animated-step / page-tts)+ 機能 E2E(quiz / animated-step / page-tts)+ 全ページスモーク。これが目指すテスト構成。

- [ ] **Step 1: 6ファイルを削除**

```bash
git rm src/content/docs/physical-education/physical-education-content.test.ts \
       src/content/docs/school-guide/kodomo-no-jikan-tsukaikata.test.ts \
       src/content/docs/school-guide/machigai-no-uketorikata.test.ts \
       tests/physical-education.spec.ts \
       tests/school-guide-time-management.spec.ts \
       tests/school-guide-correction-feedback.spec.ts
```

- [ ] **Step 2: 全テストが green のままであることを確認**

Run: `pnpm test:unit && pnpm test:e2e`
Expected: すべて PASS。unit は `src/scripts/*.test.ts` 4本 + `tests/helpers/*.test.ts` 1本、E2E は `quiz` / `animated-step` / `page-tts` / `content-smoke` の 4 spec。

- [ ] **Step 3: コミット**

```bash
git commit -m "test: remove per-article tests superseded by content smoke suite"
```

---

## Phase 2: page-tts を `public/` から `src/` へ移動

`public/page-tts-core.js`(293行)は配信アセットではなくソースコード。`src/scripts/` へ移し、Starlight の Head コンポーネントオーバーライド経由で Astro にバンドルさせる。これで型チェック・バンドル最適化の対象になり、テストの `../../public/` import も解消する。

### Task 5: TTS スクリプトの移設と Head オーバーライド

**Files:**
- Move: `public/page-tts-core.js` → `src/scripts/page-tts-core.js`(内容は無変更)
- Move: `public/page-tts.js` → `src/scripts/page-tts-boot.js`(import パスのみ変更)
- Create: `src/components/overrides/Head.astro`
- Modify: `astro.config.mjs`(head の script エントリ削除、components オーバーライド追加)
- Modify: `src/scripts/page-tts-core.test.ts`(import パス変更)
- Modify: `src/scripts/page-tts-mount.test.ts`(import パス変更)

**Interfaces:**
- Consumes: `mountPageTts(document, window)` ほか `page-tts-core.js` の既存 export(シグネチャ変更なし)。
- Produces: 全ページの `<head>` で page-tts がバンドル済みスクリプトとして読み込まれる構成。`tests/page-tts.spec.ts` が回帰検証を担う。

- [ ] **Step 1: ファイルを移動し、boot の import パスを直す**

```bash
git mv public/page-tts-core.js src/scripts/page-tts-core.js
git mv public/page-tts.js src/scripts/page-tts-boot.js
```

`src/scripts/page-tts-boot.js` の import 行を変更:

```js
import { mountPageTts } from './page-tts-core.js';
```

(移動前は `./page-tts-core.js` のままでも同ディレクトリなので実際は無変更で動く。確認だけすること。)

- [ ] **Step 2: unit テストの import パスを直す**

`src/scripts/page-tts-core.test.ts`:

```ts
} from './page-tts-core.js';
```

`src/scripts/page-tts-mount.test.ts`:

```ts
import { mountPageTts } from './page-tts-core.js';
```

(いずれも `'../../public/page-tts-core.js'` からの変更。)

- [ ] **Step 3: unit テストが通ることを確認**

Run: `pnpm test:unit`
Expected: PASS(page-tts-core / page-tts-mount 含む)

- [ ] **Step 4: Head オーバーライドを作成**

```astro
---
// ABOUTME: Starlight の Head をオーバーライドし、ページ読み上げスクリプトを全ページに注入します。
// ABOUTME: public 直置きだった page-tts を Astro のバンドル対象へ載せ替えるための部品です。
import Default from '@astrojs/starlight/components/Head.astro';
---

<Default><slot /></Default>
<script>
  import '../../scripts/page-tts-boot.js';
</script>
```

Path: `src/components/overrides/Head.astro`

- [ ] **Step 5: astro.config.mjs を更新**

`starlight({ ... })` 内に追加:

```js
      components: {
        Head: "./src/components/overrides/Head.astro",
      },
```

`head:` 配列から以下のエントリを**削除**(google-site-verification の meta は残す):

```js
        {
          tag: "script",
          attrs: {
            type: "module",
            src: "/manabi-commons/page-tts.js",
          },
        },
```

- [ ] **Step 6: E2E で読み上げ UI の動作を確認**

Run: `pnpm test:e2e -- tests/page-tts.spec.ts`
Expected: PASS(読み上げボタンの表示・開始・停止が従来どおり動く)

FAIL した場合: Astro の `<script>` はモジュールとしてバンドルされ `astro:page-load` イベントも `page-tts-boot.js` 内で購読済みのはず。まず dev サーバーのページソースでバンドル済み script タグの有無を確認し、次にブラウザコンソールのエラーを確認する。2回試して直らなければ立ち止まり、アプローチを再検討する(systematic-debugging)。

- [ ] **Step 7: 全テスト + ビルドを確認してコミット**

Run: `pnpm test:unit && pnpm test:e2e && pnpm build`
Expected: すべて PASS、ビルド成功。

```bash
git add -A
git commit -m "refactor: move page-tts source from public/ into src with Head override"
```

---

## Phase 3: 設定・テンプレートごみの掃除

### Task 6: メタデータ修正と型チェック導入

**Files:**
- Modify: `package.json`(name 設定、check スクリプト追加、devDeps 追加)
- Modify: `astro.config.mjs`(コメントアウトされた logo ブロック削除)
- Modify: `.github/workflows/deploy.yml`(テンプレートのチュートリアルコメント削除)
- Modify: `.github/workflows/ci.yml`(check ステップ追加)

**Interfaces:**
- Produces: `pnpm check` = `astro check`(TS/astro ファイルの型チェック)。CI で実行される。

- [ ] **Step 1: package.json を修正**

`"name": ""` を変更:

```json
  "name": "manabi-commons",
```

scripts に追加:

```json
    "check": "astro check",
```

devDependencies を追加:

```bash
pnpm add -D @astrojs/check typescript
```

- [ ] **Step 2: 型チェックを実行**

Run: `pnpm check`
Expected: エラー 0。既存コードで型エラーが出た場合は、このタスク内で最小修正する(振る舞いを変えない範囲。変えないと直らない場合は立ち止まって報告)。

- [ ] **Step 3: astro.config.mjs のデッドコードを削除**

以下の 4 行を削除:

```js
      // logo: {
      //   src: "./public/logo.svg",
      // },
      //
```

- [ ] **Step 4: deploy.yml のテンプレートコメントを削除**

`withastro/action@v5` ステップの下にある `# with:` 〜 `# PUBLIC_POKEAPI...` のコメントブロック(約 8 行)と、冒頭 `on:` 前後の日本語チュートリアルコメント 3 行を削除する。ワークフローの実動作(トリガー、permissions、build/deploy ジョブ)は一切変えない。

- [ ] **Step 5: ci.yml に check ステップを追加**

`- run: pnpm test:unit` の直前に追加:

```yaml
      - run: pnpm check
```

- [ ] **Step 6: 検証してコミット**

Run: `pnpm check && pnpm test:unit && pnpm build`
Expected: すべて成功。

```bash
git add package.json pnpm-lock.yaml astro.config.mjs .github/workflows/deploy.yml .github/workflows/ci.yml
git commit -m "chore: fix package metadata, add astro check, remove template comments"
```

---

## Phase 4: 再発防止(ドキュメントとルールの更新)

無駄の最大源は「記事を足すたびに記事専用テストを書く」パターンだった(コミット履歴上、複数の AI エージェント PR がこのパターンを踏襲)。ルールを明文化しないと再発する。

### Task 7: テスト方針の明文化

**Files:**
- Modify: `AGENTS.md`(禁止事項に記事別テスト追加を明記)
- Modify: `README.md`(「テストの実行」セクションの記述更新)
- Modify: `docs/development.md`(「現状の注意点」にテスト方針を追記)

**Interfaces:**
- Consumes: Task 3 の `tests/content-smoke.spec.ts` の存在(ドキュメントから参照する)。

- [ ] **Step 1: AGENTS.md の「禁止されるタスク」セクションに追記**

既存の禁止項目リストの末尾に追加:

```markdown
- 記事(`src/content/docs/` 配下)ごとの専用テストを追加すること。ページの表示検証は `tests/content-smoke.spec.ts` が全ページを自動で対象にし、frontmatter の構造は `src/content.config.ts` のスキーマと `astro build` が検証する。記事の追加・修正にテストコードの追加は不要。
```

- [ ] **Step 2: README.md の「テストの実行」セクションを更新**

テスト構成の説明を現状に合わせて書き換える:

```markdown
## テストの実行

- `pnpm test:unit` — Vitest。`src/scripts/` のロジックと `tests/helpers/` のテスト補助を検証します。
- `pnpm test:e2e` — Playwright。インタラクティブ機能(Quiz / AnimatedStep / 読み上げ)と、全コンテンツページの表示スモークテスト(`tests/content-smoke.spec.ts`)を実行します。
- `pnpm check` — `astro check` による型チェック。
- 記事を追加してもテストコードの追加は不要です。スモークテストが新しいページを自動で検証対象に含めます。
```

(既存セクションの見出しはそのまま、本文を置き換える。前後の文脈と齟齬が出ないよう周辺も読んで調整すること。)

- [ ] **Step 3: docs/development.md の「現状の注意点」に追記**

```markdown
- テストは「機能ロジックの unit + 機能 E2E + 全ページスモーク」の3層構成です。記事別のテストファイルは作らないでください(過去にあったものは 2026-07 のリファクタリングで撤去済み)。
```

- [ ] **Step 4: コミットし、PR を仕上げる**

```bash
git add AGENTS.md README.md docs/development.md
git commit -m "docs: codify test strategy to prevent per-article test sprawl"
git push
gh pr ready
gh pr checks --watch
```

Expected: CI green。PR 本文をこのプランへのリンク付きで整えてレビュー依頼。

---

## Self-Review 結果

- **カバレッジ**: 調査で特定した無駄 5 点すべてにタスクが対応(1→Phase 1、2→Phase 2、3→Phase 0、4・5→Phase 3)。「変更しない」判断 4 点は理由付きで明記。
- **型整合**: `contentRoutes(): string[]` は Task 2 定義・Task 3 消費で一致。`mountPageTts(document, window)` は既存シグネチャを変更しない。
- **順序依存**: Phase 0 の CI が以降の回帰検知の前提。Task 4(削除)は Task 3(代替)の後。Task 2 の playwright `testMatch` 変更は Task 2 の `.test.ts` 追加と同時でなければ Playwright が誤実行するため、同一タスクに束ねた。
