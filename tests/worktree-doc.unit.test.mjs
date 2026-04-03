// ABOUTME: Verifies the worktree operations article ships required metadata and core examples.
// ABOUTME: Protects the page contract for Git worktree and multi-CLI guidance.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/ai/agents/git-worktree-with-codex.md', root);

test('worktree operations article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('worktree operations article includes git and multi-CLI examples', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /git worktree add/);
	assert.match(content, /git worktree list --porcelain/);
	assert.match(content, /codex -C /);
	assert.match(content, /codex exec -C /);
	assert.match(content, /gemini --worktree/);
	assert.match(content, /copilot/);
	assert.match(content, /claude --worktree/);
});

test('worktree operations article includes a directory structure diagram', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /ディレクトリ構造/);
	assert.match(content, /~\/\.codex\/worktrees/);
	assert.match(content, /~\/\.claude\//);
	assert.match(content, /~\/\.gemini\//);
	assert.match(content, /~\/\.copilot\//);
});
