// ABOUTME: Verifies the docs sidebar exposes the OpenClaw two-agent design page to readers.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the new article slug.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the OpenClaw two-agent design guide from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']OpenClaw は 2 Agent で設計するとわかりやすい["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/agents\/openclaw-two-agent-design\/["']/);
});
