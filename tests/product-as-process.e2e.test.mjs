// ABOUTME: Checks the product-as-process article includes diagrams and reader-oriented synthesis.
// ABOUTME: Acts as a lightweight end-to-end contract for the published article experience.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/product-as-process-in-ai-era.md', root);

test('product-as-process article includes explanatory diagrams and practical synthesis', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /従来のSaaS/);
	assert.match(content, /プロセス的なサービス/);
	assert.match(content, /AIを抑制するのではなく/);
	assert.match(content, /作った瞬間から次のコストが発生します/);
});
