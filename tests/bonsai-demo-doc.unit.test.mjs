// ABOUTME: Verifies the Bonsai demo article ships required metadata and preserves key local-LLM observations.
// ABOUTME: Protects the documentation contract for the Bonsai 1-bit MLX write-up.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/tools/bonsai-demo-1bit-local-llm.md', root);

test('Bonsai demo article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('Bonsai demo article includes model facts and observed runtime notes', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /1\.28 GB/);
	assert.match(content, /65,536 tokens/);
	assert.match(content, /Peak memory: 1\.306 GB/);
	assert.match(content, /Peak memory: 1\.286 GB/);
	assert.match(content, /\/v1\/chat\/completions/);
	assert.match(content, /basic security checks/);
});
