# Starlight Starter Kit: Basics

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)


## プロジェクト概要

まだ本になっていない知識を、実験しながら公開するデジタルガーデン。
AIエージェント運用、デザイン、アート、経済学、文化人類学など、
領域を問わず「現在進行形の知」を扱う。

Starlight (Astro) で構築し、GitHub Pages で公開する。
ライセンス: CC BY 4.0

## ファイル構成

```
src/content/docs/
├── index.mdx              # トップページ
├── ai/                    # AI・エージェント・LLM
│   ├── index.md
│   ├── agents/            # エージェント設計・運用
│   └── llm/               # LLMの使いこなし
├── design/                # デザイン・UI/UX
├── art/                   # アートと計算
├── cs/                    # コンピューターサイエンス
├── economics/             # 経済学
├── anthropology/          # 文化人類学
└── education/             # 教育・学び
```

## コンテンツのスタンス

このwikiは「完成した知識」を扱わない。以下を明示することで公開してよい：

- 実験中・未検証であること
- 書いた日付
- 参照した一次情報源

## frontmatter 必須フィールド

```yaml
---
title: タイトル
description: 1〜2文
date: YYYY-MM-DD         # 必須：知識の鮮度を示す
status: seed | growing | evergreen   # 成熟度
tags: [ai, agents, design]
---
```

### statusの意味

| status | 意味 |
|---|---|
| `seed` | 断片的なメモ、まだ構造化されていない |
| `growing` | 書きかけ、実験中 |
| `evergreen` | ある程度安定した知識（ただし更新される） |

## 文体ルール

- 一人称は「私」または省略
- 断定しすぎない（「〜と思う」「〜の可能性がある」を厭わない）
- コードブロック・図・リンクを積極的に使う
- 英語・日本語どちらでも可

## よく使うコマンド

```bash
npm run dev      # ローカル確認
npm run build    # ビルド
npm run preview  # ビルド確認
```

## Codexへの典型的な指示パターン

```
「src/content/docs/ai/agents/soul-md-design.md を作成して。
AIエージェントのSOUL.mdを設計する際の知見をまとめた章。
status: growing, date: 今日の日付。
OpenClawとnanobotの実例を含めて。」
```


```
pnpm create astro@latest -- --template starlight
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
