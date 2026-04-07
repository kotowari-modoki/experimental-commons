// ABOUTME: Verifies the OpenClaw multi-agent design article ships required metadata and core design guidance.
// ABOUTME: Protects the page contract around trust boundaries, routing, and model policy language.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/openclaw-multi-agent-design.md', root);

test('OpenClaw multi-agent design article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('OpenClaw multi-agent design article includes trust boundary and model policy guidance', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /multi-agent/);
	assert.match(content, /2 Agent/);
	assert.match(content, /trust boundary/);
	assert.match(content, /primary \/ fallback/);
	assert.match(content, /channel \/ thread/);
	assert.match(content, /SubAgent/);
});
