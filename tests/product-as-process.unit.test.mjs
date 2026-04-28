// ABOUTME: Verifies the AI-era product-as-process article has required metadata and source grounding.
// ABOUTME: Protects the page contract around process, selection cost, and operating-cost guidance.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/product-as-process-in-ai-era.md', root);

test('product-as-process article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('product-as-process article covers the requested core arguments', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /プロダクトはプロセス/);
	assert.match(content, /conviction collapse/);
	assert.match(content, /開発プロセスがプロダクトの中核になる/);
	assert.match(content, /サービス自体がプロセス的になる/);
	assert.match(content, /No と言う難易度/);
	assert.match(content, /選ぶコスト/);
	assert.match(content, /運用コスト/);
	assert.match(content, /生成は広く、採用は狭く、運用は厳しく/);
});

test('product-as-process article links the three requested sources', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /https:\/\/www\.oreilly\.com\/radar\/conviction-collapse-and-the-end-of-software-as-we-know-it\//);
	assert.match(content, /https:\/\/www\.danshapiro\.com\/blog\/2026\/01\/the-five-levels-from-spicy-autocomplete-to-the-software-factory\//);
	assert.match(content, /https:\/\/github\.com\/harperreed\/harper\.blog\/blob\/45adb7537d98270261ffa476bf27cc28b2ae079f\/content\/post\/2026-04-14-when-code-stops-being-the-bottleneck\/index\.md/);
});
