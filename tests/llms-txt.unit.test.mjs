// ABOUTME: Verifies llms.txt and llms-full.txt generation for AI search and agent ingestion.
// ABOUTME: Checks filtering of drafts/system pages, section grouping, and full-text formatting.
import test from 'node:test';
import assert from 'node:assert/strict';

import { buildLlmsFullTxt, buildLlmsTxt } from '../src/lib/llms.js';

const SITE = new URL('https://kotowari-modoki.github.io/');
const BASE = '/experimental-commons';

const SAMPLE_DOCS = [
	{
		id: '',
		data: { title: 'experimental-commons', description: 'Top page', date: new Date('2026-07-11'), status: 'growing', tags: [] },
		body: 'Top body',
	},
	{
		id: '404',
		data: { title: '404', description: 'Not found', date: new Date('2026-03-28'), status: 'seed', tags: [] },
		body: '',
	},
	{
		id: 'research/journal-template',
		data: { title: 'Template', description: 'Template', date: new Date('2026-05-01'), status: 'seed', tags: [] },
		body: 'Template body',
	},
	{
		id: 'ai/agents/draft-note',
		data: { title: 'Secret Draft', description: 'Draft', date: new Date('2026-08-01'), status: 'seed', draft: true, tags: [] },
		body: 'Unpublished draft body',
	},
	{
		id: 'ai/agents/agent-authored-site',
		data: {
			title: 'AI Agentが執筆するサイトです',
			description: '運用方針を説明します。',
			date: new Date('2026-03-29'),
			status: 'growing',
			author: 'ai',
			tags: ['ai-agents'],
			provenance: { source_type: 'personal_experience', confidence: 'high' },
		},
		body: '## 概要\n\nAIが下書きを作ります。',
	},
	{
		id: 'math/iut-theory-intro',
		data: {
			title: 'IUT理論 入門',
			description: '宇宙際タイヒミュラー理論の入門メモ。',
			date: new Date('2026-04-10'),
			status: 'seed',
			tags: ['math'],
		},
		body: '## IUT\n\n入門テキスト。',
	},
];

test('buildLlmsTxt follows llmstxt.org structure and excludes drafts and system pages', () => {
	const output = buildLlmsTxt(SAMPLE_DOCS, SITE, BASE);

	assert.match(output, /^# experimental-commons\n/);
	assert.match(output, /CC BY 4\.0/);
	assert.match(output, /https:\/\/kotowari-modoki\.github\.io\/experimental-commons\/llms-full\.txt/);
	assert.match(output, /https:\/\/kotowari-modoki\.github\.io\/experimental-commons\/ai\/agents\/agent-authored-site\//);
	assert.match(output, /https:\/\/kotowari-modoki\.github\.io\/experimental-commons\/math\/iut-theory-intro\//);
	assert.doesNotMatch(output, /Secret Draft/);
	assert.doesNotMatch(output, /journal-template/);
	assert.doesNotMatch(output, /\/404\//);
});

test('buildLlmsFullTxt includes metadata and markdown body for published articles only', () => {
	const output = buildLlmsFullTxt(SAMPLE_DOCS, SITE, BASE);

	assert.match(output, /# experimental-commons — Full Corpus/);
	assert.match(output, /# IUT理論 入門/);
	assert.match(output, /入門テキスト。/);
	assert.match(output, /# AI Agentが執筆するサイトです/);
	assert.match(output, /AIが下書きを作ります。/);
	assert.match(output, /- Status: growing/);
	assert.match(output, /- Source Type: personal_experience/);
	assert.doesNotMatch(output, /Unpublished draft body/);
	assert.doesNotMatch(output, /Template body/);
});
