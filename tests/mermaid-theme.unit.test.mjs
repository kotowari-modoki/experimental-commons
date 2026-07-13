// ABOUTME: Verifies Mermaid diagrams use Starlight theme tokens for readable light and dark modes.
// ABOUTME: Prevents Mermaid's inline light-theme colors from overriding site contrast.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('Mermaid diagrams override inline colors with Starlight theme tokens', async () => {
	const css = await readFile(new URL('src/styles/custom.css', root), 'utf8');

	assert.match(css, /pre\.mermaid/);
	assert.match(css, /background(?:-color)?:\s*var\(--sl-color-bg-nav\)/);
	assert.match(css, /fill:\s*var\(--sl-color-bg-inline-code\)\s*!important/);
	assert.match(css, /stroke:\s*var\(--sl-color-accent-high\)\s*!important/);
	assert.match(css, /color:\s*var\(--sl-color-text\)\s*!important/);
	assert.match(css, /stroke:\s*var\(--sl-color-gray-2\)\s*!important/);
	assert.match(css, /\.edgeLabel \.label/);
	assert.match(css, /\.edgeLabel foreignObject/);
});
