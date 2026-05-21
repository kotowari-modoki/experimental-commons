// ABOUTME: Verifies the MMORPG history article keeps its core chronology and provenance fields.
// ABOUTME: Protects the research note from losing required sources and uncertainty markers.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(
	new URL('../src/content/docs/history/mmorpg-history-from-mud.md', import.meta.url),
	'utf8',
);

test('MMORPG history page contains required frontmatter and provenance', () => {
	assert.match(page, /^---\n/);
	assert.match(page, /title: MMORPG の歴史/);
	assert.match(page, /status: seed/);
	assert.match(page, /source_type: web_research/);
	assert.match(page, /ai_process:/);
	assert.match(page, /review_needed: true/);
});

test('MMORPG history page covers the requested works and roots', () => {
	const requiredTerms = [
		'MUD',
		'Ultima Online',
		'World of Warcraft',
		'Ragnarok Online',
		'FINAL FANTASY XI',
		'FINAL FANTASY XIV',
		'ドラゴンクエストX',
		'Lineage',
	];

	for (const term of requiredTerms) {
		assert.match(page, new RegExp(term), `missing term: ${term}`);
	}
});

test('MMORPG history page lists milestones in chronological order', () => {
	const milestones = [
		'1978: MUD1',
		'1986: Habitat',
		'1996: Meridian 59',
		'1997: Ultima Online',
		'1998: Lineage',
		'1999: EverQuest',
		'2002: FINAL FANTASY XI',
		'2002: Ragnarok Online',
		'2004: World of Warcraft',
		'2012: ドラゴンクエストX',
		'2013: FINAL FANTASY XIV: 新生エオルゼア',
	];

	let previousIndex = -1;
	for (const milestone of milestones) {
		const index = page.indexOf(milestone);
		assert.notEqual(index, -1, `missing milestone: ${milestone}`);
		assert.ok(index > previousIndex, `out of order milestone: ${milestone}`);
		previousIndex = index;
	}
});

test('MMORPG history page cites primary or near-primary sources', () => {
	const sourceUrls = [
		'https://mud.co.uk/muse/muse/backgrnd.htm',
		'https://web.stanford.edu/class/history34q/readings/Virtual_Worlds/LucasfilmHabitat.html',
		'https://www.meridian59.com/game-info/history/history-of-meridian/',
		'https://uo.com/2012/09/28/press-around-the-anniversary/',
		'https://kr.ncsoft.com/en/whatWeCreate/lineage.do?category=MMO&game=L1',
		'https://we-are-vanadiel.finalfantasyxi.com/history/?id=6&lang=en&year=2002',
		'https://jp.finalfantasyxiv.com/lodestone/topics/detail/cd83d833536cee6cb843112e33869ef25cf07a55',
		'https://hiroba.dqx.jp/sc/topics/detail/3c59dc048e8850243be8079a5c74d079/',
		'https://investor.activisionblizzard.com/news-releases/news-release-details/world-warcraftr-subscriber-base-reaches-12-million-worldwide',
	];

	for (const sourceUrl of sourceUrls) {
		assert.match(page, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing source: ${sourceUrl}`);
	}
});
