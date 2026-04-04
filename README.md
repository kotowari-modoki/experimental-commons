# experimental-commons

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

まだ本になっていない知識を、実験しながら公開するデジタルガーデンです。
完成度より鮮度と誠実さを優先し、未整理の仮説や運用知見も「未完成であること」を明示して公開します。

## このリポジトリが扱うもの

- AIエージェント運用、設計、観察メモ
- デザイン、アート、文化、人文、計算にまたがる実験知
- あとで本や論考になるかもしれない断片

Astro + Starlight で構築し、GitHub Pages で公開します。
ライセンスは [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) です。詳細は [`reference/license-cc-by-4-0.md`](src/content/docs/reference/license-cc-by-4-0.md) を参照してください。

## 現在のドキュメント構成

```text
README.md                               # リポジトリ向けの開発・運用ガイド
astro.config.mjs                        # Starlight のサイト設定とサイドバー
src/content.config.ts                   # docs frontmatter のスキーマ
src/content/docs/index.mdx              # 公開サイトのトップページ
src/content/docs/guides/contributing.md # 執筆・更新フロー
src/content/docs/reference/content-schema.md
                                        # frontmatter と公開ルールの参照
```

`src/content/docs/` 配下の `.md` / `.mdx` はそのまま公開ページになります。

## セットアップ

```bash
pnpm install
pnpm dev
pnpm test
```

ローカル確認は `http://localhost:4321/experimental-commons` を使います。

## 執筆ルール

すべての公開コンテンツは、少なくとも次の frontmatter を持ちます。

```yaml
---
title: タイトル
description: 1〜2文の説明
date: 2026-03-28
status: seed
tags:
  - ai
  - agents
---
```

`status` の意味:

- `seed`: 断片的なメモ。仮説や観察が中心
- `growing`: 実験中の整理されたノート
- `evergreen`: ある程度安定した知見

本文では次を守ります。

- 不確かなことは不確かと書く
- 一次情報源へのリンクを付ける
- 実験途中であることを隠さない
- 余計に断定しない

## 開発フロー

このリポジトリではタスク管理に `bd` を使います。

```bash
bd ready --json
bd create "READMEを整理する" -t task -p 2 --json
bd update <issue-id> --claim --json
bd close <issue-id> --reason "Completed" --json
```

ドキュメント変更時の最低限の確認:

```bash
pnpm build
```

## どこを読めばよいか

- 執筆の進め方: `src/content/docs/guides/contributing.md`
- frontmatter の意味と公開基準: `src/content/docs/reference/content-schema.md`
- サイト構成の変更: `astro.config.mjs`

## 参考リンク

- [Starlight documentation](https://starlight.astro.build/)
- [Astro documentation](https://docs.astro.build/)
- [Diataxis](https://diataxis.fr/)
- [beads](https://github.com/steveyegge/beads)
