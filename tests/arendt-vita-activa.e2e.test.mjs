// ABOUTME: Checks the Arendt vita activa article includes diagrams and practical reflection prompts.
// ABOUTME: Acts as a lightweight contract for activity, dialogue limits, and plurality.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/philosophy/arendt-vita-activa-in-work.md', root);

test('arendt vita activa article centers action and non-conclusive plurality', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /日々の仕事では混ざっている/);
	assert.match(content, /仕事における活動とは何か/);
	assert.match(content, /人間性の復活/);
	assert.match(content, /対話の限界/);
	assert.match(content, /作品を通じて/);
	assert.match(content, /語らず感じる/);
	assert.match(content, /結論付けない/);
	assert.match(content, /複数性/);
	assert.match(content, /平和/);
	assert.match(content, /断絶/);
	assert.match(content, /ふりかえりの問い/);
});
