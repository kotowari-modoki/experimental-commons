---
title: Contributing Guide
description: experimental-commons にページを追加・更新するときの最小フロー。
date: 2026-03-28
status: growing
tags:
  - contributing
  - workflow
  - docs
---

# Contributing Guide

このリポジトリは「完成した知識の保管庫」ではなく、「実験中の知識の公開面」です。
そのため、うまく書き切れていないページでも、前提と不確かさが明示されていれば公開対象になります。

## 追加・更新の基本フロー

1. `src/content/docs/` 配下に `.md` または `.mdx` を作る
2. frontmatter に `title` `description` `date` `status` `tags` を入れる
3. 本文で不確かな点をぼかさず書く
4. できるだけ一次情報源へリンクする
5. `npm run build` で公開サイトとして破綻していないか確認する

## frontmatter の最小例

```yaml
---
title: soul-md-design
description: SOUL.md を設計するときの観察メモ。
date: 2026-03-28
status: seed
tags:
  - ai
  - agents
  - design
---
```

## status の使い分け

- `seed`: 断片メモ。観察や仮説が中心
- `growing`: 複数の観察を整理している途中
- `evergreen`: しばらく参照に耐えると判断したページ

迷ったら `seed` か `growing` に寄せます。完成したふりをしないほうが、このリポジトリの方針に合います。

## 書き方の基準

- 断定しすぎない
- 「要検証」「と思われる」をためらわない
- コードブロック、Mermaid、リンクを使って構造を見せる
- 既存ページと関係があるなら本文中で相互リンクする

## カテゴリの考え方

このサイトでは、ディレクトリ構成とサイドバー上のカテゴリを完全には一致させていません。
保管場所よりも、読者が何をしに来たかで辿れることを優先しています。

- `Start Here`: このサイトの前提、参加方法、執筆フロー
- `Publishing`: frontmatter、ライセンス、公開基準
- `Tools`: ツールのセットアップ、運用メモ、実践的な手引き
- `Notes`: 読書メモ、講義メモ、理論入門、比較メモ、実験途中の観察

迷ったときは「読者が最初に知りたいことは何か」で決めます。
たとえば、書籍についてのページでも、使い方の手引きなら `Notes` ではなく実践カテゴリに寄せる余地があります。

## 開発者向けメモ

- サイドバー構成は `astro.config.mjs` で管理する
- frontmatter の型は `src/content.config.ts` で管理する
- 公開トップは `src/content/docs/index.mdx`

## 参考

- [Starlight documentation](https://starlight.astro.build/)
- [Astro documentation](https://docs.astro.build/)
- [The guide section of Diataxis](https://diataxis.fr/how-to-guides/)
