// ABOUTME: Verifies shared indexing metadata is configured for Google discovery.
// ABOUTME: Keeps sitemap discovery and crawler directives explicit in Starlight pages.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config declares pages indexable and followable', async () => {
	const config = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(config, /name:\s*["']robots["']/);
	assert.match(config, /content:\s*["']index, follow["']/);
});

test('astro config exposes the absolute sitemap URL', async () => {
	const config = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(
		config,
		/href:\s*["']https:\/\/kotowari-modoki\.github\.io\/experimental-commons\/sitemap-index\.xml["']/,
	);
});
