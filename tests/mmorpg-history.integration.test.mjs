// ABOUTME: Confirms the MMORPG history article is exposed through the Starlight sidebar.
// ABOUTME: Protects discoverability for the Culture & History navigation section.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('Astro sidebar links to the MMORPG history page', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']MMORPG の歴史["']/);
	assert.match(astroConfig, /link:\s*["']\/history\/mmorpg-history-from-mud\/["']/);
});
