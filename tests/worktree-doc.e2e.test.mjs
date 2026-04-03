// ABOUTME: Checks the worktree operations article renders with structural aids and primary sources.
// ABOUTME: Acts as a lightweight end-to-end contract for the published reader experience.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/git-worktree-with-codex.md', root);

test('worktree operations article includes diagrams and primary sources for the covered CLIs', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /```mermaid/);
	assert.match(content, /```text/);
	assert.match(content, /https:\/\/git-scm\.com\/docs\/git-worktree/);
	assert.match(content, /https:\/\/developers\.openai\.com\/codex\/cli/);
	assert.match(content, /https:\/\/developers\.openai\.com\/codex\/app\/worktrees/);
	assert.match(content, /https:\/\/geminicli\.com\/docs\/cli\/git-worktrees\//);
	assert.match(content, /https:\/\/docs\.github\.com\/en\/copilot\/how-tos\/copilot-cli\/cli-getting-started/);
	assert.match(content, /https:\/\/code\.claude\.com\/docs\/en\/quickstart/);
	assert.match(content, /https:\/\/code\.claude\.com\/docs\/ja\/common-workflows/);
});
