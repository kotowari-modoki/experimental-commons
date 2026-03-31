// ABOUTME: Checks the site ships a Mermaid bootstrap component for client-side rendering.
// ABOUTME: Acts as a lightweight end-to-end contract for the pre-mermaid rendering strategy.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config excludes Mermaid blocks from syntax highlighting', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /syntaxHighlight:\s*\{/);
	assert.match(astroConfig, /type:\s*["']shiki["']/);
	assert.match(astroConfig, /excludeLangs:\s*\[[^\]]*["']mermaid["']/);
});

test('custom head component bootstraps Mermaid on the client', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');
	const headComponent = await readFile(new URL('src/components/Head.astro', root), 'utf8');

	assert.match(astroConfig, /Head:\s*["']\.\/src\/components\/Head\.astro["']/);
	assert.match(headComponent, /import mermaid from ['"]mermaid['"]/);
	assert.match(headComponent, /astro:page-load/);
	assert.match(headComponent, /mermaid\.run/);
});
