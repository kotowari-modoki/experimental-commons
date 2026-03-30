// ABOUTME: Checks the rendered page-title template exposes status and date labels to readers.
// ABOUTME: Acts as a lightweight end-to-end contract for the article header markup.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('PageTitle markup includes visible status and date fields', async () => {
	const component = await readFile(new URL('src/components/PageTitle.astro', root), 'utf8');

	assert.match(component, /class="page-meta"/);
	assert.match(component, /class="page-meta-label">\{item\.label\}/);
	assert.match(component, /class="page-meta-value">\{item\.value\}/);
	assert.match(component, /aria-label="Page metadata"/);
});
