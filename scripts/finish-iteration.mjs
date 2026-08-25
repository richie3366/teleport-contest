#!/usr/bin/env node
/**
 * Mechanical loop-iteration stamps. Does **not** invent D-ids, write
 * D-log / CURRENT / journal prose, or commit.
 *
 *   node scripts/finish-iteration.mjs
 *
 * Runs archive-loop-queue-done.mjs then check-hot-docs.mjs --fix.
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;

function run(rel, args = []) {
  const r = spawnSync(node, [join(root, rel), ...args], {
    cwd: root,
    stdio: 'inherit',
  });
  if (r.status) process.exit(r.status ?? 1);
}

run('scripts/archive-loop-queue-done.mjs');
run('scripts/check-hot-docs.mjs', ['--fix']);
