// ABOUTME: Verifies built SEO and AIO artifacts in dist/ after a full Astro production build.
// ABOUTME: Checks llms.txt, llms-full.txt, rss.xml, robots.txt, JSON-LD, and discovery links.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

function extractJsonLd(html) {
	const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
	return match ? JSON.parse(match[1]) : null;
}

test('built output exposes robots.txt, llms.txt, llms-full.txt, and rss.xml', () => {
	for (const path of ['dist/robots.txt', 'dist/llms.txt', 'dist/llms-full.txt', 'dist/rss.xml']) {
		assert.ok(existsSync(path), `${path} missing; run pnpm build before e2e checks`);
	}

	const robots = readFileSync('dist/robots.txt', 'utf8');
	assert.match(robots, /Sitemap:\s*https:\/\/kotowari-modoki\.github\.io\/experimental-commons\/sitemap-index\.xml/);

	const llms = readFileSync('dist/llms.txt', 'utf8');
	assert.match(llms, /^# experimental-commons\n/);
	assert.match(llms, /\/experimental-commons\/ai\/agents\/agent-authored-site\//);
	assert.doesNotMatch(llms, /\/404\//);

	const llmsFull = readFileSync('dist/llms-full.txt', 'utf8');
	assert.match(llmsFull, /# experimental-commons — Full Corpus/);
	assert.ok(llmsFull.length > llms.length, 'llms-full.txt should include full article bodies');

	const rss = readFileSync('dist/rss.xml', 'utf8');
	assert.match(rss, /<rss version="2\.0"/);
	assert.match(rss, /<item>/);
});

test('home, article, tag, and 404 pages render expected JSON-LD, robots, and discovery links', () => {
	const homeHtml = readFileSync('dist/index.html', 'utf8');
	const homeJsonLd = extractJsonLd(homeHtml);
	assert.ok(homeJsonLd?.['@graph']?.some((node) => node['@type'] === 'WebSite'));
	assert.match(homeHtml, /<meta property="og:type" content="website"/);
	assert.match(homeHtml, /<link rel="alternate" type="text\/plain" title="LLMs\.txt"/);
	assert.match(homeHtml, /<link rel="alternate" type="application\/rss\+xml"/);

	const articleHtml = readFileSync('dist/ai/agents/agent-authored-site/index.html', 'utf8');
	const articleJsonLd = extractJsonLd(articleHtml);
	assert.ok(articleJsonLd?.['@graph']?.some((node) => node['@type'] === 'Article'));
	assert.ok(articleJsonLd?.['@graph']?.some((node) => node['@type'] === 'BreadcrumbList'));
	assert.match(articleHtml, /<meta property="article:published_time" content="\d{4}-\d{2}-\d{2}"/);
	assert.match(articleHtml, /<meta property="article:tag" content="/);

	const notFoundHtml = readFileSync('dist/404.html', 'utf8');
	assert.equal(extractJsonLd(notFoundHtml), null);
	assert.match(notFoundHtml, /<meta name="robots" content="noindex, nofollow"/);
	assert.doesNotMatch(notFoundHtml, /<meta name="robots" content="index, follow"/);

	const tagHtml = readFileSync('dist/tags/ai-agents/index.html', 'utf8');
	const tagJsonLd = extractJsonLd(tagHtml);
	assert.ok(tagJsonLd?.['@graph']?.some((node) => node['@type'] === 'CollectionPage'));
	assert.ok(tagJsonLd?.['@graph']?.some((node) => node['@type'] === 'BreadcrumbList'));
	assert.match(tagHtml, /<meta name="robots" content="index, follow"/);

	// Single-article thin tag archives should stay crawlable but not indexed.
	const thinTagHtml = readFileSync('dist/tags/cooking/index.html', 'utf8');
	assert.match(thinTagHtml, /<meta name="robots" content="noindex, follow"/);

	// Per-article clean Markdown endpoints and alternate links for AI agents.
	assert.ok(existsSync('dist/ai/agents/agent-authored-site.md'));
	const md = readFileSync('dist/ai/agents/agent-authored-site.md', 'utf8');
	assert.match(md, /^# AI Agentが執筆するサイトです/);
	assert.match(articleHtml, /<link rel="alternate" type="text\/markdown" title="Markdown"/);
});
