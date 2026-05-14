// ABOUTME: Verifies the fail-fast and accelerationism article is discoverable from Starlight navigation.
// ABOUTME: Keeps Astro sidebar wiring aligned with the article title and slug.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the fail-fast accelerationism article from the Notes sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']fail-fast と加速度主義はどちらが先か["']/);
	assert.match(astroConfig, /link:\s*["']\/philosophy\/fail-fast-accelerationism-agile\/["']/);
});
