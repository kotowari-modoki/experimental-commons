// ABOUTME: Checks the OpenClaw multi-agent design article renders with diagrams and primary sources.
// ABOUTME: Acts as a lightweight end-to-end contract for the published reader experience.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/openclaw-multi-agent-design.md', root);

test('OpenClaw multi-agent design article includes a structural diagram and primary sources', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /https:\/\/docs\.openclaw\.ai\/start\/setup/);
	assert.match(content, /https:\/\/docs\.openclaw\.ai\/cli/);
	assert.match(content, /https:\/\/discord\.com\/developers\/docs\/intro/);
	assert.match(content, /https:\/\/openai\.com\/codex\//);
});
