#!/usr/bin/env node
/**
 * Move old crumbs out of docs/AGENT-LOOP-JOURNAL.md into docs/archive/.
 * Live file stays at JOURNAL_KEEP dated entries once it exceeds JOURNAL_MAX_LIVE.
 * Idempotent: at or under the cap → no writes.
 *
 *   node scripts/rotate-journal.mjs
 *   node scripts/rotate-journal.mjs --dry-run
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const JOURNAL_REL = 'docs/AGENT-LOOP-JOURNAL.md';
export const JOURNAL_MAX_LIVE = 15;
export const JOURNAL_KEEP = 10;

const ENTRY_RE = /^## \d{4}-\d{2}-\d{2}\b/m;

export function splitJournal(text) {
  const lines = text.split('\n');
  const starts = [];
  for (let i = 0; i < lines.length; i++) {
    if (ENTRY_RE.test(lines[i])) starts.push(i);
  }
  if (!starts.length) {
    return { header: text, entries: [] };
  }
  const header = `${lines.slice(0, starts[0]).join('\n')}`;
  const entries = starts.map((start, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : lines.length;
    let body = lines.slice(start, end).join('\n');
    if (!body.endsWith('\n')) body += '\n';
    return body;
  });
  return { header, entries };
}

export function journalEntryCount(text) {
  return splitJournal(text).entries.length;
}

function archiveRel(root, newestMoved, today) {
  const first = newestMoved.split('\n', 1)[0] || '';
  const iter = first.match(/#(\d{4,})\b/);
  const slug = iter ? `iter${iter[1]}` : 'crumbs';
  const dir = join(root, 'docs/archive');
  let name = `AGENT-LOOP-JOURNAL-rotated-${today}-${slug}.md`;
  let n = 2;
  while (existsSync(join(dir, name))) {
    name = `AGENT-LOOP-JOURNAL-rotated-${today}-${slug}-${n}.md`;
    n += 1;
  }
  return `docs/archive/${name}`;
}

function ensureNl(s) {
  return s.endsWith('\n') ? s : `${s}\n`;
}

/**
 * @returns {{
 *   action: 'none' | 'rotated',
 *   live: number,
 *   moved?: number,
 *   archiveRel?: string,
 *   message: string,
 * }}
 */
export function rotateJournalIfNeeded(root, opts = {}) {
  const maxLive = opts.maxLive ?? JOURNAL_MAX_LIVE;
  const keep = opts.keep ?? JOURNAL_KEEP;
  const dryRun = Boolean(opts.dryRun);
  if (keep >= maxLive) {
    throw new Error(`keep (${keep}) must be < maxLive (${maxLive})`);
  }
  const path = join(root, JOURNAL_REL);
  const text = readFileSync(path, 'utf8');
  const { header, entries } = splitJournal(text);
  const n = entries.length;
  if (n <= maxLive) {
    return {
      action: 'none',
      live: n,
      message: `journal ${n} live (cap ${maxLive}, no rotate)`,
    };
  }
  const liveEntries = entries.slice(0, keep);
  const movedEntries = entries.slice(keep);
  const today = new Date().toISOString().slice(0, 10);
  const rel = archiveRel(root, movedEntries[0], today);
  const archiveBody =
    `# Rotated from AGENT-LOOP-JOURNAL.md (${movedEntries.length} crumbs; live kept ${keep})\n\n` +
    movedEntries.map((e) => e.replace(/\n+$/, '\n')).join('\n');
  const liveBody = ensureNl(header.replace(/\n+$/, '\n')) + liveEntries.join('');
  if (!dryRun) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), ensureNl(archiveBody));
    writeFileSync(path, ensureNl(liveBody));
  }
  const verb = dryRun ? 'would rotate' : 'rotated';
  return {
    action: 'rotated',
    live: keep,
    moved: movedEntries.length,
    archiveRel: rel,
    message: `${verb} ${movedEntries.length} → ${rel} (live ${keep})`,
  };
}

function parseArgs(argv) {
  const opts = { dryRun: false, help: false };
  for (const a of argv) {
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--help' || a === '-h') opts.help = true;
    else if (a.startsWith('-')) {
      console.error(`unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return opts;
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(`Usage: node scripts/rotate-journal.mjs [--dry-run]

Move dated crumbs out of ${JOURNAL_REL} when live count > ${JOURNAL_MAX_LIVE}.
Keeps the newest ${JOURNAL_KEEP}. Idempotent.`);
    process.exit(0);
  }
  const result = rotateJournalIfNeeded(root, opts);
  console.log(result.message);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main();
}
