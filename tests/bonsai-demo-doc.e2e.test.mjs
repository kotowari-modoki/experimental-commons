// ABOUTME: Checks the Bonsai demo article renders as a practical local-LLM note with setup and transcript details.
// ABOUTME: Acts as a lightweight end-to-end contract for the reader-facing Bonsai tool guide.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/tools/bonsai-demo-1bit-local-llm.md', root);

test('Bonsai demo article includes setup flow and transcript snippets', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /flowchart TD/);
	assert.match(content, /\.\/setup\.sh/);
	assert.match(content, /\.\/scripts\/run_mlx\.sh -p "What is the capital of Japan\?"/);
	assert.match(content, /The capital of Japan is \*\*Tokyo\*\*\./);
	assert.match(content, /Hello! I'm Bonsai, an AI assistant developed by PrismML\./);
});
