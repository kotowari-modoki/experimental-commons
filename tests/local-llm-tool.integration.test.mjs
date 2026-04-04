// ABOUTME: Verifies the docs sidebar exposes the local LLM selection article from the Tools section.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the article's tool-oriented location.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the local LLM article from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']ローカルLLMの選定方法["']/);
	assert.match(astroConfig, /label:\s*["']Tools["'][\s\S]*label:\s*["']ローカルLLMの選定方法["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/tools\/local-llm-selection\/["']/);
});
