// ABOUTME: Verifies JSON-LD structured data and article Open Graph metadata generation.
// ABOUTME: Ensures safe script serialization, accurate schema types, and citation extraction.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
	buildDocJsonLd,
	buildTagJsonLd,
	getArticleMetaTags,
	serializeJsonLd,
} from '../src/lib/structured-data.js';

const SITE = new URL('https://kotowari-modoki.github.io/');
const BASE = '/experimental-commons';

test('buildDocJsonLd emits WebSite and Organization graph for the home page', () => {
	const jsonLd = buildDocJsonLd({
		entry: {
			id: '',
			data: {
				title: 'experimental-commons',
				description: '完成前の知識を公開するサイト。',
				date: new Date('2026-07-11T00:00:00.000Z'),
				status: 'growing',
				tags: ['docs'],
			},
		},
		url: 'https://kotowari-modoki.github.io/experimental-commons/',
		site: SITE,
		base: BASE,
	});

	assert.equal(jsonLd['@context'], 'https://schema.org');
	assert.ok(Array.isArray(jsonLd['@graph']));
	const website = jsonLd['@graph'].find((node) => node['@type'] === 'WebSite');
	const org = jsonLd['@graph'].find((node) => node['@type'] === 'Organization');
	assert.equal(website.name, 'experimental-commons');
	assert.equal(website.url, 'https://kotowari-modoki.github.io/experimental-commons/');
	assert.equal(website.license, 'https://creativecommons.org/licenses/by/4.0/');
	assert.deepEqual(org.sameAs, ['https://github.com/kotowari-modoki/experimental-commons']);
});

test('buildDocJsonLd returns null for the 404 page', () => {
	const jsonLd = buildDocJsonLd({
		entry: {
			id: '404',
			data: { title: '404', date: new Date('2026-03-28T00:00:00.000Z'), status: 'seed' },
		},
		url: 'https://kotowari-modoki.github.io/experimental-commons/404/',
		site: SITE,
		base: BASE,
	});

	assert.equal(jsonLd, null);
});

test('buildDocJsonLd emits Article, citations, and BreadcrumbList for content pages', () => {
	const jsonLd = buildDocJsonLd({
		entry: {
			id: 'ai/agents/agent-authored-site',
			data: {
				title: 'AI Agentが執筆するサイトです',
				description: '運用方針の説明。',
				date: new Date('2026-03-29T00:00:00.000Z'),
				status: 'growing',
				author: 'ai',
				tags: ['ai-agents', 'editorial-policy'],
				provenance: {
					source_type: 'official_source',
					source_ref: [
						'https://example.com/spec',
						'internal memo without url',
						'Reference: https://arxiv.org/abs/2601.00001',
					],
				},
			},
		},
		url: 'https://kotowari-modoki.github.io/experimental-commons/ai/agents/agent-authored-site/',
		site: SITE,
		base: BASE,
		imageUrl: 'https://kotowari-modoki.github.io/experimental-commons/og/test.png',
	});

	const article = jsonLd['@graph'].find((node) => node['@type'] === 'Article');
	const breadcrumb = jsonLd['@graph'].find((node) => node['@type'] === 'BreadcrumbList');

	assert.equal(article.headline, 'AI Agentが執筆するサイトです');
	assert.equal(article.datePublished, '2026-03-29');
	assert.equal(article.dateModified, '2026-03-29');
	assert.equal(article.image, 'https://kotowari-modoki.github.io/experimental-commons/og/test.png');
	assert.deepEqual(article.keywords, ['ai-agents', 'editorial-policy']);
	assert.deepEqual(article.citation, [
		'https://example.com/spec',
		'https://arxiv.org/abs/2601.00001',
	]);
	assert.match(article.author.name, /AI/i);

	assert.equal(breadcrumb.itemListElement.length, 3);
	assert.equal(breadcrumb.itemListElement[0].name, 'experimental-commons');
	assert.equal(breadcrumb.itemListElement[1].name, 'AI & Agents');
	assert.equal(breadcrumb.itemListElement[2].name, 'AI Agentが執筆するサイトです');
});

test('buildTagJsonLd emits CollectionPage and BreadcrumbList for tag index pages', () => {
	const jsonLd = buildTagJsonLd({
		tag: 'ai-agents',
		entries: [
			{ id: 'ai/agents/a', data: { title: 'Article A' } },
			{ id: 'ai/agents/b', data: { title: 'Article B' } },
		],
		url: 'https://kotowari-modoki.github.io/experimental-commons/tags/ai-agents/',
		site: SITE,
		base: BASE,
	});

	const page = jsonLd['@graph'].find((node) => node['@type'] === 'CollectionPage');
	const breadcrumb = jsonLd['@graph'].find((node) => node['@type'] === 'BreadcrumbList');

	assert.equal(page.name, '#ai-agents');
	assert.equal(page.mainEntity.numberOfItems, 2);
	assert.equal(
		page.mainEntity.itemListElement[0].url,
		'https://kotowari-modoki.github.io/experimental-commons/ai/agents/a/',
	);
	assert.equal(breadcrumb.itemListElement.length, 2);
	assert.equal(breadcrumb.itemListElement[1].name, '#ai-agents');
});

test('getArticleMetaTags emits article:published_time and article:tag for articles only', () => {
	assert.deepEqual(
		getArticleMetaTags({ id: '', data: { date: new Date('2026-07-11'), tags: ['docs'] } }),
		[],
	);
	assert.deepEqual(
		getArticleMetaTags({ id: '404', data: { date: new Date('2026-03-28'), tags: ['site'] } }),
		[],
	);

	const tags = getArticleMetaTags({
		id: 'math/iut-theory-intro',
		data: {
			date: new Date('2026-04-01T00:00:00.000Z'),
			tags: ['math', 'abc-conjecture'],
		},
	});

	assert.deepEqual(tags, [
		{ property: 'article:published_time', content: '2026-04-01' },
		{ property: 'article:tag', content: 'math' },
		{ property: 'article:tag', content: 'abc-conjecture' },
	]);
});

test('serializeJsonLd escapes closing script characters safely', () => {
	const serialized = serializeJsonLd({ text: '</script><script>alert(1)</script>' });
	assert.ok(!serialized.includes('</script>'));
	assert.equal(JSON.parse(serialized).text, '</script><script>alert(1)</script>');
});
