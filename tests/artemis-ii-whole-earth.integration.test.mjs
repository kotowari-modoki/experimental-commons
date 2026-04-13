// ABOUTME: Verifies the docs sidebar exposes the Artemis II and Whole Earth article from Notes.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the history article slug.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the Artemis II article from the Notes sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']Artemis II と Whole Earth のまなざし["']/);
	assert.match(astroConfig, /label:\s*["']Notes["'][\s\S]*label:\s*["']Artemis II と Whole Earth のまなざし["']/);
	assert.match(astroConfig, /link:\s*["']\/history\/artemis-ii-whole-earth\/["']/);
});
