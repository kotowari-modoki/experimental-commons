// ABOUTME: Verifies the Kojiki/Nihon Shoki history page keeps its chronology in Mermaid source form.
// ABOUTME: Protects the authoring format expected by the Astro Mermaid pipeline.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(
	new URL('../src/content/docs/history/kojiki-nihon-shoki-history.mdx', import.meta.url),
	'utf8',
);

test('history page contains a Mermaid code fence', () => {
	assert.match(page, /```mermaid/);
	assert.match(page, /flowchart LR/);
});

test('history page lists milestones in chronological order', () => {
	const milestones = [
		'672 壬申の乱',
		'天武天皇が帝紀・本辞の再整理を志向',
		'712 古事記成立',
		'720 日本書紀成立',
		'721以後 日本書紀講筵',
		'中世 日本書紀が神書化',
		'近世 本居宣長『古事記伝』',
	];

	let previousIndex = -1;
	for (const milestone of milestones) {
		const index = page.indexOf(milestone);
		assert.notEqual(index, -1, `missing milestone: ${milestone}`);
		assert.ok(index > previousIndex, `out of order milestone: ${milestone}`);
		previousIndex = index;
	}
});
