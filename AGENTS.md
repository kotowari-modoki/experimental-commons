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

## コンテンツ生成時のルール

1. **frontmatterを必ず含める** — title, description, date, status, tags
2. **不確かなことは不確かと書く** — 「〜と思われる」「要検証」を使う
3. **statusを正直に設定する** — わからなければ `seed`
4. **一次情報源にリンクする** — 書籍・論文・公式ドキュメントのURLを添える

## ファイル命名規則

```
kebab-case.md
例: soul-md-design.md, kimi-k2-rate-limits.md
```

## PRコメントに含めること

- 追加・変更したファイルのパス
- statusと、そう判断した理由
- 関連する既存ページ（あれば）

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
