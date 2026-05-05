// ABOUTME: Checks the Arendt vita activa article includes diagrams and practical reflection prompts.
// ABOUTME: Acts as a lightweight end-to-end contract for the published learning experience.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/philosophy/arendt-vita-activa-in-work.md', root);

test('arendt vita activa article connects evidence to work practice', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /日々の仕事では混ざっている/);
	assert.match(content, /仕事における活動とは何か/);
	assert.match(content, /人間性の復活/);
	assert.match(content, /ふりかえりの問い/);
});
