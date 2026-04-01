# サイト魅力化設計書: 「AIが書いたデジタルガーデン」らしさを際立てる

Date: 2026-03-31
Status: approved

## 概要

experimental-commons を「AIが書いたデジタルガーデン」というコンセプトが一目で伝わるサイトにする。
ビジュアル（status バッジ・AI執筆ラベル）と回遊体験（タグ一覧・関連記事）の両面を、最小コンポーネントで同時に実現する。

## ゴール

- 訪問者が「このサイトは何者か」を最初のページで直感的に理解できる
- ページ間のつながりを通じて「庭を歩く感覚」を生む
- 既存コンテンツへの破壊的変更なし、`pnpm build` が常に通る状態を維持する

## アプローチ

Starlight の仕組みと既存 frontmatter（`status` / `tags`）を最大限活用し、追加するコンポーネントを最小限に抑える。

## 施策一覧

### 1. status バッジ（ビジュアル）

**変更ファイル:** `src/components/PageTitle.astro`

各ページの title 直下に `status` の値をバッジ表示する。

| status | 表示 | 意味 |
|--------|------|------|
| `seed` | 🌱 seed | 断片・仮説 |
| `growing` | 🌿 growing | 整理中 |
| `evergreen` | 🌳 evergreen | 安定した知見 |

- `Astro.props.entry.data.status` から値を取得
- Galaxy テーマの CSS 変数を使い、`custom.css` への追記は最小限
- status が未設定の場合は表示しない（後方互換）

### 2. AI執筆ラベル（ビジュアル）

**変更ファイル:** `src/components/PageTitle.astro`、frontmatter 規約

frontmatter に `author: ai` を追加したページに「AI draft」注記を表示する。

- フィールドは任意。既存ページへの遡及更新は不要
- `content-schema.md` に `author` フィールドの説明を追記する

### 3. タグ一覧ページ（回遊体験）

**新規ファイル:** `src/pages/tags/[tag].astro`

各 frontmatter の `tags` を集約し、タグ別のページ一覧を表示する。

- Astro の `getStaticPaths()` + `getCollection('docs')` で動的生成
- URL: `/experimental-commons/tags/{tag名}`
- サイドバーには追加しない（タグはページ内リンクで発見する）

### 4. 関連記事リンク（回遊体験）

**新規ファイル:** `src/components/RelatedPages.astro`

各ページ末尾に「同じタグのページ」を最大3件表示する。

- `getCollection('docs')` でタグが1件以上一致するページを取得
- 自分自身は除外
- タグが設定されていないページでは非表示

## 実装順序

1. `PageTitle.astro` に status バッジを追加（最小変更・即効果）
2. `PageTitle.astro` に AI執筆ラベルを追加
3. `RelatedPages.astro` を作成し、数ページに手動で埋め込んで動作確認
4. `[tag].astro` でタグ一覧ページを生成
5. 全 Notes ページに `RelatedPages` を適用

## 対象外（スコープ外）

- 知識グラフの可視化（D3.js 等）: 将来の発展施策
- 全文検索の追加
- frontmatter の一括自動補完

## 成功基準

- `pnpm build` がエラーなく通る
- status バッジが全 Notes ページで正しく表示される
- タグ一覧ページが存在する全タグについて生成される
- 関連記事が各ページで最大3件表示される
