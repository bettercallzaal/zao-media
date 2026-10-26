#!/usr/bin/env node

import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
let auditScript = path.join(repoRoot, 'scripts', 'audit-archive.mjs');
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--against' && args[i + 1]) auditScript = path.resolve(args[++i]);
  else {
    console.error('Usage: node scripts/test-audit-archive.mjs [--against SCRIPT]');
    process.exit(2);
  }
}

const testRoot = await mkdtemp(path.join(os.tmpdir(), 'zao-media-audit-delete-'));
const contentDir = path.join(testRoot, 'content');
const scriptsDir = path.join(testRoot, 'scripts');
await mkdir(contentDir, { recursive: true });
await mkdir(scriptsDir, { recursive: true });
await copyFile(auditScript, path.join(scriptsDir, 'audit-archive.mjs'));
await writeFile(path.join(contentDir, 'record.json'), `${JSON.stringify({
  slug: 'audit-control-record',
  class: 'live',
  title: 'Archive deletion control',
  date: '2026-01-02',
  host: 'ZAO Media',
  links: [{ label: 'Source', url: 'https://example.com/archive-control' }],
})}\n`);

execFileSync('git', ['init', '-q'], { cwd: testRoot });
execFileSync('git', ['config', 'user.name', 'Archive Audit Test'], { cwd: testRoot });
execFileSync('git', ['config', 'user.email', 'archive-audit-test@example.invalid'], { cwd: testRoot });
execFileSync('git', ['add', 'content/record.json', 'scripts/audit-archive.mjs'], { cwd: testRoot });
execFileSync('git', ['commit', '-qm', 'base fixture'], { cwd: testRoot });
const base = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: testRoot, encoding: 'utf8' }).trim();
execFileSync('git', ['rm', '-q', '--', 'content/record.json'], { cwd: testRoot });
execFileSync('git', ['commit', '-qm', 'delete fixture record'], { cwd: testRoot });

const result = spawnSync(process.execPath, [path.join(scriptsDir, 'audit-archive.mjs'), '--changed-from', base], {
  cwd: testRoot,
  encoding: 'utf8',
});
const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
assert.equal(result.status, 0, `deleting a content record should not fail the metadata audit:\n${output}`);
assert.match(output, /no content JSON files selected/i);
console.log(`Archive deletion regression passed using ${auditScript}.`);
