// ABOUTME: Tests share-card metadata and content-derived image URLs.
// ABOUTME: Covers base paths, Japanese tags, and explicit social-image overrides.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
	createDocImage,
	createTagImage,
	getImageId,
	getImageUrl,
	getImageTags,
	getCollectionImages,
} from '../src/lib/og-image.js';

const entry = {
	id: 'science/example',
	data: {
		title: '光と電磁波の違い',
		description: '実験から考える知識の公共財。',
		status: 'growing',
		date: new Date('2026-10-08T00:00:00Z'),
	},
};

test('cards use article metadata and a stable UTC publication date', () => {
	assert.deepEqual(createDocImage(entry), {
		title: entry.data.title,
		description: entry.data.description,
		section: 'SCIENCE & SYSTEMS',
		status: 'growing',
		date: '2026-10-08',
	});
	assert.equal(createDocImage({ ...entry, id: '' }).section, 'KNOWLEDGE IN PROGRESS');
});

test('image URLs work at the project base and the domain root without title characters in paths', () => {
	const card = createTagImage('AI / 日本語 & <実験>');
	assert.equal(card.title, '#AI / 日本語 & <実験>');
	for (const base of ['/experimental-commons', '/experimental-commons/', '/']) {
		const url = new URL(getImageUrl(card, 'https://example.com/', base));
		assert.equal(url.origin, 'https://example.com');
		assert.equal(url.pathname, `${base.replace(/\/$/, '')}/og/${getImageId(card)}.png`);
	}
});

test('changing rendered content changes the image URL for social caches', () => {
	const card = createDocImage(entry);
	assert.equal(getImageId(card), getImageId({ ...card }));
	for (const key of ['title', 'description', 'section', 'date', 'status']) {
		assert.notEqual(getImageId(card), getImageId({ ...card, [key]: `${card[key]} changed` }));
	}
});

test('production images exclude draft article text while dev can preview it', () => {
	const draft = { id: 'draft', data: { ...entry.data, title: 'Unpublished draft title', draft: true } };
	const docs = [entry, draft];
	assert.deepEqual(getCollectionImages(docs).map(({ title }) => title), [entry.data.title]);
	assert.deepEqual(getCollectionImages(docs, true).map(({ title }) => title), [entry.data.title, draft.data.title]);
});

test('generated images declare PNG dimensions and accessible labels for Open Graph and Twitter', () => {
	const tags = getImageTags(createDocImage(entry), 'https://example.com/', '/garden');
	const values = Object.fromEntries(tags.map(({ attrs }) => [attrs.property ?? attrs.name, attrs.content]));
	assert.match(values['og:image'], /^https:\/\/example\.com\/garden\/og\/[a-f0-9]+\.png$/);
	assert.equal(values['og:image:width'], '1200');
	assert.equal(values['og:image:height'], '630');
	assert.equal(values['og:image:type'], 'image/png');
	assert.equal(values['og:image:alt'], entry.data.title);
	assert.equal(values['twitter:image'], values['og:image']);
	assert.equal(values['twitter:image:alt'], entry.data.title);
});

test('an explicit OG image stays in control and becomes the Twitter fallback', () => {
	const custom = 'https://example.com/custom.jpg';
	const existing = [{ tag: 'meta', attrs: { property: 'og:image', content: custom } }];
	const tags = getImageTags(createDocImage(entry), 'https://example.com/', '/', existing);
	assert.ok(tags.every(({ attrs }) => !attrs.property?.startsWith('og:image')));
	assert.deepEqual(tags, [{ tag: 'meta', attrs: { name: 'twitter:image', content: custom } }]);
});

test('explicit Twitter images and labels are preserved without duplicates', () => {
	const existing = [
		{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://example.com/custom.jpg' } },
		{ tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Custom artwork' } },
		{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Editorial title' } },
	];
	const tags = getImageTags(createDocImage(entry), 'https://example.com/', '/', existing);
	assert.ok(tags.every(({ attrs }) => !attrs.name?.startsWith('twitter:image')));
	assert.ok(tags.every(({ attrs }) => attrs.property !== 'og:image:alt'));
});
