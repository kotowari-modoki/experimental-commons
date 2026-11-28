// ABOUTME: Verifies RSS 2.0 feed generation without external dependencies.
// ABOUTME: Checks reverse-chronological ordering, draft exclusion, and XML escaping.
import test from 'node:test';
import assert from 'node:assert/strict';

import { buildRssXml } from '../src/lib/rss.js';

const SITE = new URL('https://kotowari-modoki.github.io/');
const BASE = '/experimental-commons';

test('buildRssXml generates valid RSS 2.0 items sorted by date descending and escapes XML', () => {
	const xml = buildRssXml(
		[
			{
				id: 'guides/old',
				data: {
					title: 'Old & <Guide>',
					description: 'Desc with "quotes" & <tags>',
					date: new Date('2026-01-10T00:00:00.000Z'),
					status: 'evergreen',
					tags: ['guide'],
				},
			},
			{
				id: 'guides/new',
				data: {
					title: 'New Article',
					description: 'Latest update',
					date: new Date('2026-06-15T00:00:00.000Z'),
					status: 'seed',
					tags: ['ai', 'agents'],
				},
			},
			{
				id: 'guides/draft',
				data: {
					title: 'Hidden Draft',
					description: 'Should not appear',
					date: new Date('2026-09-01T00:00:00.000Z'),
					status: 'seed',
					draft: true,
					tags: [],
				},
			},
			{
				id: '404',
				data: {
					title: '404',
					description: 'Not found',
					date: new Date('2026-09-01T00:00:00.000Z'),
					status: 'seed',
					tags: [],
				},
			},
		],
		SITE,
		BASE,
	);

	assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
	assert.match(xml, /<rss version="2\.0" xmlns:atom="http:\/\/www\.w3\.org\/2005\/Atom">/);
	assert.match(xml, /<title>Old &amp; &lt;Guide&gt;<\/title>/);
	assert.match(xml, /Desc with &quot;quotes&quot; &amp; &lt;tags&gt;/);
	assert.match(xml, /<category>ai<\/category>/);
	assert.doesNotMatch(xml, /Hidden Draft/);
	assert.doesNotMatch(xml, /\/404\//);

	const newIndex = xml.indexOf('New Article');
	const oldIndex = xml.indexOf('Old &amp; &lt;Guide&gt;');
	assert.ok(newIndex > -1 && oldIndex > -1 && newIndex < oldIndex, 'newer item should come first');
});
