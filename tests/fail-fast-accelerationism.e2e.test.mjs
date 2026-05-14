// ABOUTME: Checks the fail-fast and accelerationism article includes diagrams and practical synthesis.
// ABOUTME: Acts as a lightweight end-to-end contract for the published article experience.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/philosophy/fail-fast-accelerationism-agile.md', root);

test('fail-fast accelerationism article includes explanatory structure and practical synthesis', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /年表で見る/);
	assert.match(content, /直接の関係はあるのか/);
	assert.match(content, /実務での分け方/);
	assert.match(content, /制御された実験/);
	assert.match(content, /制御可能性も含めて問う加速の思想/);
});
