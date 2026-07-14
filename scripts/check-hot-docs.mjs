#!/usr/bin/env node
/**
 * Budget check for hot docs loaded every loop iteration.
 * Soft-fail (exit 1) if CURRENT/NOTES/playbook exceed caps.
 * Does not open archive / full divergence bodies.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const approxTok = (bytes) => Math.ceil(bytes / 4);

const caps = {
  'docs/CURRENT.md': { maxLines: 160, maxBytes: 8_000 },
  'docs/NOTES.md': { maxLines: 110, maxBytes: 6_000 },
  'docs/GROK-PLAYBOOK.md': { maxBytes: 14_000 },
  'scripts/agent-port-loop.prompt.md': { maxBytes: 6_000 },
  'docs/PROGRESS.md': { maxBytes: 1_500 },
  'docs/C-JS-MAP.md': { maxBytes: 3_000 }, // index only
};

const hotSumMaxBytes = 40_000; // playbook + CURRENT + NOTES + prompt + map index

let failed = false;
let hotSum = 0;

console.log('Hot-doc budget check\n');

for (const [rel, cap] of Object.entries(caps)) {
  const path = join(root, rel);
  if (!existsSync(path)) {
    console.log(`FAIL  missing ${rel}`);
    failed = true;
    continue;
  }
  const text = readFileSync(path, 'utf8');
  const bytes = Buffer.byteLength(text);
  const lines = text.split(/\n/).length;
  hotSum += bytes;
  const tok = approxTok(bytes);
  const problems = [];
  if (cap.maxBytes != null && bytes > cap.maxBytes) {
    problems.push(`${bytes} B > ${cap.maxBytes} B`);
  }
  if (cap.maxLines != null && lines > cap.maxLines) {
    problems.push(`${lines} lines > ${cap.maxLines}`);
  }
  const status = problems.length ? 'FAIL' : 'ok  ';
  if (problems.length) failed = true;
  console.log(
    `${status}  ~${String(tok).padStart(5)} tok  ${String(lines).padStart(4)} L  ${String(bytes).padStart(6)} B  ${rel}` +
      (problems.length ? `  (${problems.join('; ')})` : ''),
  );
}

console.log(`\nHot sum (listed files): ${hotSum} B (~${approxTok(hotSum)} tok); cap ${hotSumMaxBytes} B`);
if (hotSum > hotSumMaxBytes) {
  console.log('FAIL  hot sum over budget');
  failed = true;
}

console.log(`
Do not count by default: docs/archive/**, DIVERGENCE-LOG bodies,
full journal history, PORTING-STRATEGY.md.
Open DIVERGENCE-INDEX + one entry; one c-js-map/*.md section.
`);

process.exit(failed ? 1 : 0);
