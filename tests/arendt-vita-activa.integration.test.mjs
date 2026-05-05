// ABOUTME: Verifies the Arendt vita activa article is discoverable from Starlight sidebar navigation.
// ABOUTME: Keeps the reader-facing title and slug wired into the documentation site.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the Arendt vita activa article from the Notes sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']アーレントの労働・仕事・活動を仕事で考える["']/);
	assert.match(astroConfig, /link:\s*["']\/philosophy\/arendt-vita-activa-in-work\/["']/);
});
