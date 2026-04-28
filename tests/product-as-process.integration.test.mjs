// ABOUTME: Verifies the product-as-process article is discoverable from Starlight sidebar navigation.
// ABOUTME: Keeps Astro navigation wiring aligned with the article slug and reader-facing title.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the product-as-process article from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']AI時代のプロダクトはプロセスになる["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/agents\/product-as-process-in-ai-era\/["']/);
});
