// ABOUTME: Verifies the Sanskrit introduction keeps required beginner topics and provenance.
// ABOUTME: Protects the page from overstating script history or Indo-European influence.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(
	new URL('../src/content/docs/guides/sanskrit-introduction.md', import.meta.url),
	'utf8',
);

test('Sanskrit introduction contains required frontmatter and provenance', () => {
	assert.match(page, /^---\n/);
	assert.match(page, /title: サンスクリット語入門/);
	assert.match(page, /status: seed/);
	assert.match(page, /source_type: web_research/);
	assert.match(page, /ai_process:/);
	assert.match(page, /review_needed: true/);
});

test('Sanskrit introduction covers beginner learning topics', () => {
	const requiredTerms = [
		'デーヴァナーガリー',
		'IAST',
		'ヴェーダ語',
		'古典サンスクリット語',
		'サンディ',
		'格',
		'数',
		'性',
		'語根',
		'動詞',
		'中国語',
		'英語',
		'ギリシャ語',
		'ラテン語',
		'印欧語族',
	];

	for (const term of requiredTerms) {
		assert.match(page, new RegExp(term), `missing term: ${term}`);
	}
});

test('Sanskrit introduction avoids common influence overclaims', () => {
	assert.match(page, /直接の祖先ではありません/);
	assert.match(page, /唯一の文字ではありません/);
	assert.match(page, /仏典翻訳/);
});

test('Sanskrit introduction cites core references', () => {
	const sourceUrls = [
		'https://www.britannica.com/topic/Sanskrit-language',
		'https://www.britannica.com/topic/Indo-European-languages',
		'https://www.britannica.com/topic/Ashtadhyayi',
		'https://www.unicode.org/charts/PDF/U0900.pdf',
		'https://www.loc.gov/catdir/cpso/romanization/sanskrit.pdf',
		'https://sanskritlibrary.org/',
	];

	for (const sourceUrl of sourceUrls) {
		assert.match(page, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing source: ${sourceUrl}`);
	}
});
