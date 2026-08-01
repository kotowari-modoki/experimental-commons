// ABOUTME: Verifies the research-journal terminology inventory finds reader-facing jargon.
// ABOUTME: Keeps metadata, comments, and fenced code from becoming false review candidates.

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const script = '.agents/skills/write-research-journal/scripts/audit_reader_terms.rb';

test('research journal terminology inventory scans prose but skips non-reader content', () => {
  const directory = mkdtempSync(join(tmpdir(), 'journal-term-audit-'));
  const journal = join(directory, 'journal.md');

  try {
    writeFileSync(journal, `---
title: Classroom report
---
<!-- memory scorer -->

本文ではClassroomと\`belief_state\`を使う。

\`\`\`
fallback prompt
\`\`\`
`);

    const output = execFileSync('ruby', [script, journal], { encoding: 'utf8' });

    assert.match(output, /experiment term: Classroom/);
    assert.match(output, /stored field or label: `belief_state`/);
    assert.doesNotMatch(output, /experiment term: report/);
    assert.doesNotMatch(output, /experiment term: memory/);
    assert.doesNotMatch(output, /experiment term: fallback/);
    assert.doesNotMatch(output, /experiment term: prompt/);
    assert.match(output, /2 review candidate\(s\)/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
