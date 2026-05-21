---
title: Content Schema
description: 公開ページに必要な frontmatter と、experimental-commons における公開基準の参照。
date: 2026-03-28
status: growing
tags:
  - reference
  - frontmatter
  - publishing
---

# Content Schema

`experimental-commons` の公開ページは、Starlight の docs collection 上で管理されています。
このリポジトリでは、標準の Starlight frontmatter に加えて `date` `status` `tags` を必須メタデータとして扱います。

## 必須フィールド

| field | type | meaning |
| --- | --- | --- |
| `title` | string | ページの表示名 |
| `description` | string | 1〜2文の要約 |
| `date` | string (`YYYY-MM-DD`) | その知見をいつ時点のものとして公開するか |
| `status` | enum | `seed` / `growing` / `evergreen` |
| `tags` | string[] | 検索や関連付けのためのタグ |

## オプションフィールド

| field | type | meaning |
| --- | --- | --- |
| `author` | enum | `ai` / `human`（省略可） |
| `provenance` | object | 情報源、AI処理、確信度、レビュー要否を残すための任意メタデータ |
| `knowledge_status` | object | 仮説や説明の状態、supersede関係、矛盾レビュー状態を残すための任意メタデータ |

### author の定義

| author | 意味 |
| --- | --- |
| `ai` | AI Agentが下書きを作成し、人間が編集責任を持つページ |
| `human` | 人間が直接執筆したページ |

省略した場合はラベルを表示しません。

### provenance の例

```yaml
provenance:
  source_type: ai_session
  source_ref: "Codex session, 2026-05-21"
  captured_at: 2026-05-21
  ai_process:
    - summarize
    - synthesize
  confidence: medium
  related_notes:
    - /ai/agents/session-to-knowledge-capture/
  review_needed: false
```

`provenance` は公開本文を重くしすぎず、後から「この知識はどこから来たのか」を追えるようにするための任意フィールドです。
詳しい定義は [Provenance Schema](/reference/provenance-schema/) を参照してください。

### knowledge_status の例

```yaml
knowledge_status:
  claim_status: tentative
  supersedes:
    - /ai/agents/old-note/
  superseded_by:
    - /ai/agents/newer-note/
  related_notes:
    - /ai/agents/contradiction-detection-and-reweaving/
  contradiction_review: required
```

`knowledge_status` は、古い仮説や説明を黙って消さず、関係を残しながら知識を編み直すための任意フィールドです。
`claim_status` は `active` / `tentative` / `superseded` / `archived` を使います。
`contradiction_review` は `none` / `required` / `reviewed` を使います。

## status の定義

| status | 使いどころ |
| --- | --- |
| `seed` | 断片、仮説、短い観察ログ |
| `growing` | ある程度まとまり始めたページ |
| `evergreen` | 参照用として安定しているページ |

`evergreen` は「永久に正しい」という意味ではありません。今のところ安定している、という自己評価です。

## 公開してよい状態

次の条件を満たしていれば、未完成でも公開候補になります。

- 不確かな点が不確かなまま書かれている
- 情報源の出どころが追える
- 更新日が明示されている
- 読者が「どの程度信じてよいか」を判断できる

## 推奨本文パターン

```md
## 何を観察したか

## まだ確信がない点

## 一次情報源
```

## 参考

- [Starlight frontmatter reference](https://starlight.astro.build/ja/reference/frontmatter/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [The reference section of Diataxis](https://diataxis.fr/reference/)
