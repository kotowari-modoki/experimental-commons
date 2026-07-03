// ABOUTME: Checks every docs entry carries the metadata required by repository policy.
// ABOUTME: Replaces article-specific frontmatter tests with one collection-wide contract.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { contentFiles, contentPath } from './helpers/content-routes.mjs';

function frontmatterFor(file) {
	const content = readFileSync(contentPath(file), 'utf8');
	const match = /^---\n(?<frontmatter>[\s\S]*?)\n---/.exec(content);

	assert.ok(match?.groups?.frontmatter, `${file} must start with frontmatter`);
	return match.groups.frontmatter;
}

test('all content files include required repository frontmatter', () => {
	for (const file of contentFiles()) {
		const frontmatter = frontmatterFor(file);

		assert.match(frontmatter, /^title:/m, `${file} missing title`);
		assert.match(frontmatter, /^description:/m, `${file} missing description`);
		assert.match(frontmatter, /^date:/m, `${file} missing date`);
		assert.match(frontmatter, /^status: (seed|growing|evergreen)$/m, `${file} missing valid status`);
		assert.match(frontmatter, /^tags:/m, `${file} missing tags`);
	}
});

test('content provenance uses the repository schema when present', () => {
	for (const file of contentFiles()) {
		const frontmatter = frontmatterFor(file);

		if (!/^provenance:/m.test(frontmatter)) continue;

		assert.match(frontmatter, /^\s+source_type:/m, `${file} provenance missing source_type`);
		assert.match(frontmatter, /^\s+ai_process:/m, `${file} provenance missing ai_process`);
		assert.match(frontmatter, /^\s+confidence: (low|medium|high)$/m, `${file} provenance missing confidence`);
	}
});
