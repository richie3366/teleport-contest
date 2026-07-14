#!/usr/bin/env node
/**
 * Sum token usage from a Cursor agent stream-json / json raw log.
 * Counts every numeric field on the last `type:result` usage object
 * (input/output/cache read/write — no distinction).
 *
 * Usage: node scripts/extract-agent-usage.mjs <raw-or-jsonl-path>
 * Prints: {"found":bool,"total":number,"breakdown":{...}}
 */
import { readFileSync, existsSync } from 'node:fs';

const path = process.argv[2];
if (!path || !existsSync(path)) {
  process.stdout.write(JSON.stringify({ found: false, total: 0, breakdown: {} }));
  process.exit(0);
}

const raw = readFileSync(path, 'utf8');
let usage = null;

for (const line of raw.split(/\r?\n/)) {
  const s = line.trim();
  if (!s.startsWith('{')) continue;
  let ev;
  try {
    ev = JSON.parse(s);
  } catch {
    continue;
  }
  if (ev?.type === 'result' && ev.usage && typeof ev.usage === 'object') {
    usage = ev.usage;
  }
}

const breakdown = {};
let total = 0;
if (usage) {
  for (const [k, v] of Object.entries(usage)) {
    if (typeof v === 'number' && Number.isFinite(v)) {
      breakdown[k] = v;
      total += v;
    }
  }
}

process.stdout.write(JSON.stringify({ found: usage != null, total, breakdown }));
