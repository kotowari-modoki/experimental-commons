// ABOUTME: Verifies the Tailscale server sharing guide ships required metadata and core examples.
// ABOUTME: Protects the documentation contract for Tailscale ACL and SSH guidance.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/guides/tailscale-server-sharing.md', root);

test('Tailscale server sharing article has required frontmatter', async () => {
        const content = await readFile(articlePath, 'utf8');

        assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
        assert.match(content, /\ndescription:\s.+\n/);
        assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
        assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
        assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
        assert.match(content, /\nauthor:\s(?:ai|human)\n/);
});

test('Tailscale server sharing article includes core Tailscale commands and configuration', async () => {
        const content = await readFile(articlePath, 'utf8');

        assert.match(content, /tailscale up --ssh --advertise-tags=tag:server/);
        assert.match(content, /tailscale set --shields-up=true/);
        assert.match(content, /"tagOwners":/);
        assert.match(content, /"ssh":/);
        assert.match(content, /PasswordAuthentication no/);
        assert.match(content, /PermitRootLogin no/);
});

test('Tailscale server sharing article includes the network diagram', async () => {
        const content = await readFile(articlePath, 'utf8');

        assert.match(content, /全体構成/);
        assert.match(content, /各メンバーのPC/);
        assert.match(content, /Tailscaleプライベートネットワーク/);
        assert.match(content, /サーバー用PC/);
});

test('astro config links the tailscale guide from the Tools sidebar', async () => {
        const configPath = new URL('astro.config.mjs', root);
        const content = await readFile(configPath, 'utf8');

        assert.match(content, /Tailscale でサーバーをチーム共有する標準設定/);
        assert.match(content, /\/guides\/tailscale-server-sharing\//);
});

test('Tailscale server sharing article includes Tailscale SSH details', async () => {
        const content = await readFile(articlePath, 'utf8');

        assert.match(content, /Tailscale SSH は、SSH 鍵の管理/);
        assert.match(content, /ID ベースの認可/);
        assert.match(content, /ACL との統合/);
        assert.match(content, /tailscale ssh developer@server-name/);
});
