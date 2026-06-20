// ABOUTME: Verifies the Sanskrit introduction is discoverable from the Culture & History sidebar.
// ABOUTME: Keeps the beginner language guide wired into the published Starlight navigation.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the Sanskrit introduction from the Culture & History sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']Culture & History["'][\s\S]*label:\s*["']サンスクリット語入門["']/);
	assert.match(astroConfig, /link:\s*["']\/guides\/sanskrit-introduction\/["']/);
});
