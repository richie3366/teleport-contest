#!/usr/bin/env node
/**
 * True when an Open/Must-fix `- [ ]` row left the live list and ## Parked
 * gained a line that names the same C file + function. Used so a docs-only
 * park is not an empty-port revert (iter 2278).
 *
 *   node scripts/port-did-park.mjs <before_rev> [queue.md]
 *   exit 0 = park, 1 = not a park
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const QUEUE_REL = 'docs/LOOP-QUEUE.md';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function liveOpenLines(text) {
  const out = [];
  for (const line of text.split('\n')) {
    if (/^## Parked\b/.test(line)) break;
    if (/^- \[ \]/.test(line)) out.push(line);
  }
  return out;
}

export function parkedLines(text) {
  const out = [];
  let inParked = false;
  for (const line of text.split('\n')) {
    if (/^## Parked\b/.test(line)) {
      inParked = true;
      continue;
    }
    if (inParked && /^## /.test(line)) break;
    if (inParked && /^- /.test(line)) out.push(line);
  }
  return out;
}

export function openRowKey(line) {
  const m = line.match(/`([^`]+)`\s+(\S+)/);
  if (!m) return null;
  return { file: m[1], fn: m[2].replace(/[.,;:].*$/, '') };
}

export function didPark(beforeText, afterText) {
  const afterOpen = new Set(liveOpenLines(afterText));
  const removed = liveOpenLines(beforeText).filter((l) => !afterOpen.has(l));
  const beforePark = new Set(parkedLines(beforeText));
  const parkNew = parkedLines(afterText).filter((l) => !beforePark.has(l));
  if (!removed.length || !parkNew.length) return false;
  return removed.some((row) => {
    const k = openRowKey(row);
    if (!k) {
      const hint = row.replace(/^- \[ \]\s*/, '').slice(0, 24);
      return parkNew.some((p) => p.includes(hint));
    }
    return parkNew.some((p) => p.includes(k.file) && p.includes(k.fn));
  });
}

function gitShowQueue(rev) {
  try {
    return execFileSync('git', ['-C', root, 'show', `${rev}:${QUEUE_REL}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    return null;
  }
}

function main(argv) {
  const beforeRev = argv[2];
  if (!beforeRev) {
    console.error(`usage: node scripts/port-did-park.mjs <before_rev> [${QUEUE_REL}]`);
    process.exit(2);
  }
  const queuePath = argv[3] || join(root, QUEUE_REL);
  const before = gitShowQueue(beforeRev);
  if (before == null || !existsSync(queuePath)) process.exit(1);
  process.exit(didPark(before, readFileSync(queuePath, 'utf8')) ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv);
}
