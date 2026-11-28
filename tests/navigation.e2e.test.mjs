// ABOUTME: Verifies built navigation usability features across articles and tag directories.
// ABOUTME: Checks breadcrumbs, clickable tags, automatic related pages, and the /tags/ index.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('tag directory page is built with filter input and links to individual tag pages', () => {
	assert.ok(existsSync('dist/tags/index.html'), 'dist/tags/index.html missing; run pnpm build first');
	const html = readFileSync('dist/tags/index.html', 'utf8');
	assert.match(html, /id="tag-filter"/);
	assert.match(html, /href="\/experimental-commons\/tags\/ai-agents\/"/);

	const tagDetail = readFileSync('dist/tags/ai-agents/index.html', 'utf8');
	assert.match(tagDetail, /href="\/experimental-commons\/tags\/"/);
});

test('articles render breadcrumbs, clickable tags, and automatic related pages without duplicates', () => {
	const articleHtml = readFileSync('dist/ai/agents/agent-authored-site/index.html', 'utf8');
	assert.match(articleHtml, /aria-label="Breadcrumb"/);
	assert.match(articleHtml, /href="\/experimental-commons\/topics\/ai-agents\/"/);
	assert.match(articleHtml, /data-copy-markdown="\/experimental-commons\/ai\/agents\/agent-authored-site\.md"/);
	assert.match(articleHtml, /aria-label="Tags"/);
	assert.match(articleHtml, /href="\/experimental-commons\/tags\/editorial-policy\/"/);
	assert.match(articleHtml, /aria-label="Related pages"/);

	assert.ok(existsSync('dist/topics/ai-agents/index.html'), 'topic landing page should be built');
	const topicHtml = readFileSync('dist/topics/ai-agents/index.html', 'utf8');
	assert.match(topicHtml, /<h1[^>]*>AI &amp; Agents<\/h1>/);

	const journalHtml = readFileSync(
		'dist/research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12/index.html',
		'utf8',
	);
	assert.match(
		journalHtml,
		/href="\/experimental-commons\/research\/conspiracy-family-transmission\/"/,
	);

	// Previously manual RelatedPages MDX articles should now render the section only once via Footer.
	const wakaHtml = readFileSync('dist/books/three-major-waka-anthologies/index.html', 'utf8');
	const relatedCount = (wakaHtml.match(/aria-label="Related pages"/g) ?? []).length;
	assert.equal(relatedCount, 1, 'Related pages should appear exactly once');
});
