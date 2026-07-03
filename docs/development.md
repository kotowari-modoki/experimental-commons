<!--
ABOUTME: experimental-commons の開発時に守るテストと運用の注意点。
ABOUTME: README より細かい判断基準を置き、記事追加時のテスト負債を防ぐ。
-->

# Development Notes

## 現状の注意点

- テストは「機能ロジックの unit + 配線/メタデータの integration + ビルド済み出力の e2e」の3層構成です。
- 記事別のテストファイルは作らないでください。過去にあった本文文字列固定のテストは 2026-07 のリファクタリングで撤去し、`tests/content-routes.unit.test.mjs`、`tests/content-frontmatter.integration.test.mjs`、`tests/content-build-output.e2e.test.mjs` に集約しました。
- 記事本文の変更で必要な確認は、原則として `pnpm check`、`pnpm test`、`pnpm build` です。
