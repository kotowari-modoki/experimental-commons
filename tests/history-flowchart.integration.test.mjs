// ABOUTME: Confirms the Astro config wires rehype-mermaid into Markdown rendering.
// ABOUTME: Protects the site-level contract needed for Mermaid diagrams to render in Starlight.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config imports and registers rehype-mermaid', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /import rehypeMermaid from ["']rehype-mermaid["']/);
	assert.match(astroConfig, /rehypePlugins:\s*\[\s*\[\s*rehypeMermaid,\s*\{\s*strategy:\s*["']pre-mermaid["']/s);
});
