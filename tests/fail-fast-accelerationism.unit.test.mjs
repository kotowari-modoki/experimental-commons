// ABOUTME: Verifies the fail-fast and accelerationism article has required metadata and evidence grounding.
// ABOUTME: Protects the requested chronology, conceptual distinction, and source links.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/philosophy/fail-fast-accelerationism-agile.md', root);

test('fail-fast accelerationism article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('fail-fast accelerationism article preserves the requested chronology', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /fail-fast の方が先/);
	assert.match(content, /1981 年/);
	assert.match(content, /Jim Gray/);
	assert.match(content, /Agile Manifesto は 2001 年/);
	assert.match(content, /Noys や #ACCELERATE 周辺の整理は 2010 年代/);
	assert.match(content, /加速度主義の思想的源流/);
});

test('fail-fast accelerationism article links core evidence sources', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /https:\/\/jimgray\.azurewebsites\.net\/papers\/thetransactionconcept\.pdf/);
	assert.match(content, /https:\/\/agilemanifesto\.org\/iso\/ja\/manifesto\.html/);
	assert.match(content, /https:\/\/martinfowler\.com\/ieeeSoftware\/failFast\.pdf/);
	assert.match(content, /https:\/\/theleanstartup\.com\/principles/);
	assert.match(content, /https:\/\/www\.paulgraham\.com\/growth\.html/);
	assert.match(content, /https:\/\/www\.sec\.gov\/Archives\/edgar\/data\/1326801\/000119312512034517\/d287954ds1\.htm/);
	assert.match(content, /https:\/\/www\.urbanomic\.com\/book\/accelerate\//);
	assert.match(content, /https:\/\/www\.britannica\.com\/topic\/accelerationism/);
});

test('fail-fast accelerationism article distinguishes startup speed culture from accelerationism', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /Lean Startup やシリコンバレーのスタートアップ文化/);
	assert.match(content, /Startup = Growth/);
	assert.match(content, /Move fast and break things/);
	assert.match(content, /市場学習と成長のための高速化/);
	assert.match(content, /加速度主義とは、対象も射程も違います/);
});

test('fail-fast accelerationism article explains why danger intuitions differ', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /なぜ危険に見えるのか/);
	assert.match(content, /異常検知と非常停止の設計/);
	assert.match(content, /失敗コストを誰が負担するか/);
	assert.match(content, /速度の利益を得る人と、壊れた結果を負担する人がずれる/);
	assert.match(content, /失敗の半径/);
	assert.match(content, /制御不能性/);
});
