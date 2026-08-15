#!/usr/bin/env node
/**
 * Move `- [x]` rows out of docs/LOOP-QUEUE.md into
 * docs/archive/LOOP-QUEUE-DONE.md (newest date first).
 * Idempotent: no checked rows → exit 0, no writes.
 * Live queue stays unchecked-only so it cannot accumulate done work.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const queuePath = join(root, 'docs/LOOP-QUEUE.md');
const donePath = join(root, 'docs/archive/LOOP-QUEUE-DONE.md');

const HEADER = `# Loop queue done

Append-only archive of checked \`LOOP-QUEUE.md\` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

`;

function extractChecked(text) {
  const kept = [];
  const done = [];
  for (const line of text.split('\n')) {
    if (/^- \[x\]/.test(line)) done.push(line.replace(/\s+$/, ''));
    else kept.push(line);
  }
  let out = kept.join('\n').replace(/\n{3,}/g, '\n\n');
  if (!out.endsWith('\n')) out += '\n';
  return { kept: out, done };
}

function insertDone(archive, items, today) {
  const block = `${items.join('\n')}\n`;
  const heading = `## ${today}`;
  const idx = archive.indexOf(heading);
  if (idx !== -1) {
    let after = archive.slice(idx + heading.length);
    after = after.replace(/^\n*/, '\n\n');
    return `${archive.slice(0, idx)}${heading}\n\n${block}${after}`;
  }
  const firstH2 = archive.search(/^## /m);
  if (firstH2 === -1) {
    return `${archive.trimEnd()}\n\n${heading}\n\n${block}`;
  }
  return `${archive.slice(0, firstH2)}${heading}\n\n${block}\n${archive.slice(firstH2)}`;
}

const { kept, done } = extractChecked(readFileSync(queuePath, 'utf8'));
if (!done.length) process.exit(0);

const today = new Date().toISOString().slice(0, 10);
mkdirSync(dirname(donePath), { recursive: true });
const prev = existsSync(donePath) ? readFileSync(donePath, 'utf8') : HEADER;
writeFileSync(queuePath, kept);
writeFileSync(donePath, insertDone(prev, done, today));
console.log(`archived ${done.length} checked item(s) → docs/archive/LOOP-QUEUE-DONE.md`);
