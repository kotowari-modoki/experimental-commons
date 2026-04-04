// ABOUTME: Checks the local LLM selection article renders as a practical tool guide with decision steps.
// ABOUTME: Acts as a lightweight end-to-end contract for the moved reader-facing article.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/tools/local-llm-selection.md', root);

test('local LLM selection article includes decision flow and runner setup guidance', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /flowchart TD/);
	assert.match(content, /brew install ollama/);
	assert.match(content, /Apple Siliconのメタル加速に対応/);
	assert.match(content, /クラウドAPIとの使い分け/);
});
