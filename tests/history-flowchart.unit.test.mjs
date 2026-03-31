// ABOUTME: Verifies the Kojiki/Nihon Shoki history page stores its timeline as ordered milestones.
// ABOUTME: Keeps the chronology readable even when Mermaid rendering is unavailable.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(
	new URL('../src/content/docs/history/kojiki-nihon-shoki-history.md', import.meta.url),
	'utf8',
);

test('history page contains a dedicated timeline wrapper', () => {
	assert.match(page, /class="history-flowchart"/);
	assert.doesNotMatch(page, /```mermaid/);
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
