#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const options = { contentDir: path.join(repoRoot, 'content'), changedFrom: null, checkLinks: false };

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--content-dir') options.contentDir = path.resolve(args[++i]);
  else if (args[i] === '--changed-from') options.changedFrom = args[++i];
  else if (args[i] === '--check-links') options.checkLinks = true;
  else if (args[i] === '--help') {
    console.log('Usage: node scripts/audit-archive.mjs [--content-dir DIR] [--changed-from REF] [--check-links]');
    process.exit(0);
  } else {
    console.error(`Unknown argument: ${args[i]}`);
    process.exit(2);
  }
}

let files;
if (options.changedFrom) {
  const changed = execFileSync('git', ['diff', '--name-only', `${options.changedFrom}...HEAD`, '--', 'content/'], { cwd: repoRoot, encoding: 'utf8' })
    .trim().split('\n').filter((name) => name.endsWith('.json'));
  files = changed.map((name) => path.join(repoRoot, name));
} else {
  files = (await readdir(options.contentDir)).filter((name) => name.endsWith('.json')).sort().map((name) => path.join(options.contentDir, name));
}

if (files.length === 0) {
  console.log('Archive audit: no content JSON files selected.');
  process.exit(0);
}

const errors = [];
const entries = [];
const sourceUrls = new Set();
for (const file of files) {
  let item;
  try {
    item = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(repoRoot, file)}: invalid JSON (${error.message})`);
    continue;
  }

  const label = path.relative(repoRoot, file);
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    errors.push(`${label}: record must be a JSON object`);
    continue;
  }
  if (typeof item.title !== 'string' || item.title.trim() === '') errors.push(`${label}: missing title`);
  if (typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || Number.isNaN(Date.parse(`${item.date}T00:00:00Z`)) || new Date(`${item.date}T00:00:00Z`).toISOString().slice(0, 10) !== item.date) {
    errors.push(`${label}: date must be a real YYYY-MM-DD date`);
  }

  const hasCredit = ['host', 'guest', 'publisher', 'quoteBy'].some((key) => typeof item[key] === 'string' && item[key].trim() !== '')
    || (Array.isArray(item.brands) && item.brands.some((brand) => typeof brand === 'string' && brand.trim() !== ''));
  if (!hasCredit) errors.push(`${label}: missing host, guest, publisher, quoteBy, or brand credit`);

  if (!Array.isArray(item.links) || item.links.length === 0) {
    errors.push(`${label}: needs at least one source link`);
  } else {
    let hasValidLink = false;
    for (const link of item.links) {
      try {
        const url = new URL(link.url);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
          hasValidLink = true;
          sourceUrls.add(url.href);
        }
      } catch {
        // Report below when no usable URL remains.
      }
    }
    if (!hasValidLink) errors.push(`${label}: needs at least one valid HTTP(S) source URL`);
  }
  entries.push({ label, item });
}

console.log(`Archive audit: ${entries.length}/${files.length} JSON files parsed; ${sourceUrls.size} distinct source URLs.`);
if (options.checkLinks) {
  const statuses = new Map();
  const queue = [...sourceUrls];
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
        if (response.status !== 200) {
          await response.body?.cancel();
          response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
        }
        statuses.set(url, { status: response.status, finalUrl: response.url });
        await response.body?.cancel();
      } catch (error) {
        statuses.set(url, { status: 'unreachable', detail: error.message });
      }
    }
  });
  await Promise.all(workers);

  const counts = new Map();
  for (const result of statuses.values()) counts.set(result.status, (counts.get(result.status) ?? 0) + 1);
  console.log(`Source URL responses: ${[...counts].map(([status, count]) => `${status}=${count}`).join(', ')}`);
  let no200 = 0;
  for (const { label, item } of entries) {
    const links = Array.isArray(item.links) ? item.links : [];
    if (!links.some((link) => statuses.get(link?.url)?.status === 200)) {
      no200 += 1;
      const codes = links.map((link) => `${statuses.get(link?.url)?.status ?? 'invalid'} ${link?.url ?? '(missing URL)'}`).join('; ');
      console.log(`No source link verified with HTTP 200: ${label}: ${codes}`);
    }
  }
  console.log(`Entries with at least one source link verified HTTP 200: ${entries.length - no200}/${entries.length}. Non-200 responses are evidence to review, not automatic permission to replace or remove a link.`);
}

if (errors.length) {
  console.error(`Archive metadata errors (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Archive metadata audit passed.');
}
