// ABOUTME: Verifies the local LLM selection article lives with tool-oriented docs and keeps required metadata.
// ABOUTME: Protects the page contract for the moved article after the tools taxonomy change.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/tools/local-llm-selection.md', root);

test('local LLM selection article has required frontmatter in the tools collection path', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('local LLM selection article keeps machine-sizing guidance and local runner examples', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /M4 Max 36GB/);
	assert.match(content, /16GB/);
	assert.match(content, /gpt-oss 20b/);
	assert.match(content, /Gemma 4 26B-A4B/);
	assert.match(content, /ollama run gemma4/);
});
