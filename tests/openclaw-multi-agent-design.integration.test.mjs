// ABOUTME: Verifies the docs sidebar exposes the OpenClaw multi-agent design page to readers.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the new article slug.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the OpenClaw multi-agent design guide from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']OpenClaw を multi-agent で設計するときのリサーチ["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/agents\/openclaw-multi-agent-design\/["']/);
});
