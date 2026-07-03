# AGENTS.md — experimental-commons

## エージェントへの基本指示

このリポジトリは「実験中の知識の公共財」。
完成度より鮮度・誠実さを優先する。

## コミット時のルール

- AIが commit した場合は、必ず `Co-authored-by` trailer を付ける

## 許可されるタスク

- `src/content/docs/` 以下の `.md` / `.mdx` ファイルの作成・編集
- frontmatterの `date` / `status` の更新
- `astro.config.mjs` のサイドバー設定の更新
- `src/styles/custom.css` のスタイル調整
- Mermaidダイアグラムの作成・更新
- コードブロックの追加・修正

## 禁止されるタスク

- `package.json` の依存関係変更（人間がレビューする）
- GitHub Actions ワークフローの変更
- 外部APIへの呼び出し・データ取得
- センシティブな情報（APIキー・個人情報・社内情報）の記述
- 記事(`src/content/docs/` 配下)ごとの専用テストを追加すること。ページの表示検証は `tests/content-build-output.e2e.test.mjs` が全ページを自動で対象にし、frontmatter の構造は `src/content.config.ts` のスキーマ、`tests/content-frontmatter.integration.test.mjs`、`astro build` が検証する。記事の追加・修正にテストコードの追加は不要。

## コンテンツ生成時のルール

1. **frontmatterを必ず含める** — title, description, date, status, tags
2. **不確かなことは不確かと書く** — 「〜と思われる」「要検証」を使う
3. **statusを正直に設定する** — わからなければ `seed`
4. **一次情報源にリンクする** — 書籍・論文・公式ドキュメントのURLを添える

## Knowledge Provenance Rules

- 新しい知識、仮説、観察、AIエージェント運用知見を追加するときは、可能な範囲で `provenance` を残す
- `source_type` は `personal_experience` / `official_source` / `book` / `paper` / `web_research` / `ai_session` / `manual_note` / `curriculum_guideline` / `other` から選ぶ
- `source_ref` には書籍名、論文URL、公式ドキュメントURL、セッション名、個人メモの参照など、後から追える手がかりを書く
- AIが要約、翻訳、分類、抽出、比較、統合、批評、リライト、fact check、構造化を行った場合は `ai_process` に残す
- `confidence` は `low` / `medium` / `high` で正直に付ける。迷う場合は `medium` 以下に寄せる
- `review_needed` は人間判断、出典確認、矛盾確認が必要なら `true` にする

## Session-to-Knowledge Capture

- ChatGPT / Codex / Claude Code / Web調査 / 個人メモから得た内容は、そのまま貼るのではなく再利用可能な知識単位へ分解する
- 抽出候補は reusable insight、note thesis、hypothesis、decision、open question、factual claims、examples、misconceptions、related notes、suggested tags、suggested internal links、update note とする
- AIセッション由来の内容は `source_type: ai_session` を使い、どの処理を経たかを `ai_process` に残す
- 断定できない観察は「仮説」「要検証」として本文にも明示する

## Contradiction Detection and Reweaving

- 新しい内容が過去ノート、教材、仮説、説明と矛盾しそうな場合、自動で上書きせずレビュー候補にする
- 矛盾の種類は factual conflict、changed assumption、stale information、terminology mismatch、priority conflict、subjective re-evaluation、curriculum mismatch、safety concern、age-level mismatch として扱う
- 提案アクションは keep both、add update note、mark old note as superseded、create comparison note、update index / MOC、add backlink、split overloaded note、merge related notes、ask human for judgment から選ぶ
- 関連ノート、MOC、内部リンクの追加候補があればPRコメントに残す

## Append-only Knowledge Editing

- 既存コンテンツを黙って上書きしない
- 古い情報、古い仮説、古い説明が更新された場合は、削除だけで済ませず `status`、update note、`supersedes`、`superseded_by`、related notes で関係を残す
- 誤りを直す場合も、必要に応じて「何が変わったか」「なぜ変わったか」を本文かPRコメントに残す
- 完成したふりをするより、未完成・不確か・矛盾レビュー中であることを見える形にする

## ファイル命名規則

```
kebab-case.md
例: soul-md-design.md, kimi-k2-rate-limits.md
```

## PRコメントに含めること

- 追加・変更したファイルのパス
- statusと、そう判断した理由
- 関連する既存ページ（あれば）
- source / ai_process / confidence / review_needed
- 矛盾レビュー、reweave、MOC更新、内部リンク追加の候補（あれば）

## エージェント固有の運用ノート（OpenClaw）

このリポジトリ自体がエージェント運用の知見を蓄積する場所でもある。
以下のディレクトリを優先的に更新してよい：

```
src/content/docs/ai/agents/
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **Run quality gates** (if code changed) - Tests, linters, builds
2. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
3. **Clean up** - Clear stashes, prune remote branches
4. **Verify** - All changes committed AND pushed
5. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
