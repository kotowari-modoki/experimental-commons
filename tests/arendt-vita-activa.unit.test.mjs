// ABOUTME: Verifies the Arendt vita activa article has required metadata and source grounding.
// ABOUTME: Protects the distinction between labor, work, action, and non-conclusive plurality.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/philosophy/arendt-vita-activa-in-work.md', root);

test('arendt vita activa article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('arendt vita activa article explains the three categories with source terms', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /labor/);
	assert.match(content, /work/);
	assert.match(content, /action/);
	assert.match(content, /労働/);
	assert.match(content, /仕事/);
	assert.match(content, /活動/);
	assert.doesNotMatch(content, /記憶はどこまで正しいか/);
	assert.doesNotMatch(content, /検証結果/);
});

test('arendt vita activa article links primary and scholarly sources', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /https:\/\/press\.uchicago\.edu\/ucp\/books\/book\/chicago\/H\/bo29137972\.html/);
	assert.match(content, /https:\/\/www\.chikumashobo\.co\.jp\/product\/9784480081568/);
	assert.match(content, /https:\/\/plato\.stanford\.edu\/entries\/arendt\/index\.html/);
	assert.match(content, /https:\/\/iep\.utm\.edu\/hannah-arendt\//);
});
