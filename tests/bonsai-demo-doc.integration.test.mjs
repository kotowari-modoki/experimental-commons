// ABOUTME: Verifies the docs sidebar exposes the Bonsai demo article from the Tools section.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the Bonsai local-LLM article.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the Bonsai demo article from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']Bonsai-demo 1-bit量子化モデル["']/);
	assert.match(astroConfig, /label:\s*["']Tools["'][\s\S]*label:\s*["']Bonsai-demo 1-bit量子化モデル["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/tools\/bonsai-demo-1bit-local-llm\/["']/);
});
