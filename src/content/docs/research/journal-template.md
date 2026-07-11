---
title: 論文開発日誌テンプレート
description: 論文開発中の問い、実験、観察、判断、未確定事項、次の検証を一貫した形式で残すためのテンプレート。
date: 2026-07-11
status: growing
tags:
  - research
  - paper
  - development-journal
  - template
author: ai
provenance:
  source_type: ai_session
  source_ref: "Codex session: 2026-07-11"
  ai_process:
    - synthesize
    - structure
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: active
  contradiction_review: none
---

<!--
ABOUTME: 論文開発中の実験や判断を一貫した形式で残すための公開テンプレート。
ABOUTME: provenanceとappend-only運用を含む、日誌作成時の最小項目を示す。
-->

# 論文開発日誌テンプレート

研究状態が変化したときに、次のパスへ日誌を追加します。

```text
src/content/docs/research/<project>/journal/YYYY-MM-DD-short-title.md
```

ファイル名の `short-title` は、日誌の内容が分かる短いkebab-caseにします。
作成後はプロジェクトの `index.md` にリンクを追加します。

## frontmatterと本文

```md
---
title: 日誌の内容が分かるタイトル
description: 今回の問い、実験、または判断を1〜2文で要約する。
date: YYYY-MM-DD
status: seed
tags:
  - research
  - paper
  - development-journal
  - <project-tag>
author: ai
provenance:
  source_type: personal_experience
  source_ref:
    - <repository-url>
    - <issue-commit-paper-or-data-url>
  ai_process:
    - structure
  confidence: low
  review_needed: true
knowledge_status:
  claim_status: tentative
  contradiction_review: none
---

<!--
ABOUTME: 今回の研究作業で検証した問いと観察結果を記録する。
ABOUTME: 判断の根拠、未確定事項、次の検証を後から追跡できるようにする。
-->

# 日誌の内容が分かるタイトル

## 今回の問い

何を確かめたかったのかを書く。

## やったこと

実験、実装、読書、分析など、実際に行ったことを書く。

## 観察・結果

観察した事実を書く。解釈や期待とできるだけ分ける。

## 現時点での解釈

結果から何が言えそうかを書く。断定できないものは「仮説」「要検証」と明示する。

## まだ不確かなこと

不足している証拠、代替説明、再現できていない点を書く。

## 決めたこと

今回の結果を受けて決めたことと、その理由を書く。何も決めていなければ、その旨を書く。

## 次の検証

次に行う最小の検証を書く。

## 関連資料

- Repository:
- Issue:
- Commit:
- Paper:
- Dataset:
- Previous journal:
```

## provenanceの選び方

- AIが下書きを作り、人間が編集責任を持つ場合は `author: ai`
- 人間が直接執筆した場合は `author: human`
- 自分で行った実験や観察が中心なら `personal_experience`
- AIとの対話から抽出した記録なら `ai_session`
- 論文を読んだ記録なら `paper`
- Web上の複数資料を調査した記録なら `web_research`

AIが要約や構造化を行った場合は、実際に行った処理を `ai_process` に残します。
AIを使っていない場合は `ai_process` を省略できます。

## 過去の判断を更新するとき

以前の仮説や判断を変更する場合は、古い日誌を現在の結論に合わせて書き換えるのではなく、新しい日誌を追加します。
置き換える対象が明確なら `supersedes` を指定し、古い日誌側には必要に応じて `superseded_by` を追加します。

```yaml
knowledge_status:
  claim_status: active
  supersedes:
    - /research/<project>/journal/<old-entry>/
  contradiction_review: reviewed
```
