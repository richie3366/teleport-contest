#!/usr/bin/env node
/**
 * finish-iteration.mjs — every mechanical stamp of a port iteration, from
 * ONE hand-written source: the newest `## D-NNNN — title` entry at the top
 * of docs/DIVERGENCE-LOG.md (its Status / Symptom / C locus / Fix / JS /
 * Verify / Named omissions / Next bullets).
 *
 *   node scripts/finish-iteration.mjs            # stamps + cap check
 *   node scripts/finish-iteration.mjs --commit   # …then commit + push
 *   node scripts/finish-iteration.mjs --dry-run  # print what would change
 *
 * Generates / updates (never invents a D-id; refuses if the top entry's id
 * is already in the index AND nothing else changed):
 *   docs/DIVERGENCE-INDEX.md   one row for D-NNNN (if missing)
 *   docs/AGENT-LOOP-JOURNAL.md one crumb at the top (if missing)
 *   docs/CURRENT.md            the `recent` block between markers,
 *                              plus every `D-0845…D-NNNN`-style range
 *   docs/NOTES.md              the landmarks block between markers (≤15)
 *   docs/LOOP-QUEUE.md         the row naming this D-id is checked off,
 *                              its review (if cited) stamped Addressed,
 *                              then archive-loop-queue-done.mjs
 *   previous `**Addressed:** D-NNNN` lines missing a short hash get it
 *   from git log; then check-hot-docs.mjs --fix.
 *
 * With --commit the message is the entry title + Symptom + Fix + Verify
 * (or the file passed with --message <path>), and it pushes origin HEAD.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (k) => args.includes(`--${k}`);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DRY = flag('dry-run');
const P = (rel) => join(root, rel);
const read = (rel) => readFileSync(P(rel), 'utf8');
function write(rel, text) {
  if (DRY) { console.log(`[dry-run] would write ${rel}`); return; }
  writeFileSync(P(rel), text);
}
function gitOut(a) {
  /* A failed or truncated read must not read as "nothing changed": that would
     commit a subset, or exit 0 having committed nothing at all. */
  const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.error || r.status) {
    console.error(`git ${a.join(' ')} failed: ${r.error?.message || (r.stderr || '').trim()}`);
    process.exit(r.status || 1);
  }
  return r.stdout || '';
}
function git(a) { return gitOut(a).trim(); }
/* Paths to stage. `--porcelain -z` gives NUL-terminated records with no
   quoting, and a rename/copy adds its origin path as the next field. Never
   trim the whole blob first: an unstaged record opens with a space
   (` M docs/x.md`), so trimming slid every path on the first line one byte
   left (`ocs/x.md`) and the `git add` died on the pathspec. */
function statusPaths() {
  const f = gitOut(['status', '--porcelain', '-z']).split('\0');
  const out = [];
  for (let i = 0; i < f.length; i++) {
    const rec = f[i];
    if (rec.length < 4) continue; // '' tail, or too short to hold `XY p`
    out.push(rec.slice(3));
    /* A rename/copy is already staged on both sides; its origin path is in
       neither the index nor the worktree, so consume the field and drop it —
       `git add` would fail the pathspec on it. */
    if (/[RC]/.test(rec.slice(0, 2))) i++;
  }
  return out.filter((p) => p && p !== 'STOP_AGENT_LOOP.md');
}
function run(rel, a = []) {
  const r = spawnSync(process.execPath, [P(rel), ...a], { cwd: root, stdio: 'inherit' });
  if (r.status) process.exit(r.status ?? 1);
}
const today = new Date().toISOString().slice(0, 10);

/* ---------- 1. parse the top D-log entry ---------- */
const log = read('docs/DIVERGENCE-LOG.md');
const m = /^## (D-\d{4}) — (.+)$/m.exec(log);
if (!m) { console.error('no `## D-NNNN — title` entry at the top of DIVERGENCE-LOG.md'); process.exit(1); }
const id = m[1], title = m[2].trim();
const entryStart = m.index;
const next = log.indexOf('\n## D-', entryStart + 1);
const entry = log.slice(entryStart, next < 0 ? undefined : next);
const bullet = (name) => {
  const r = new RegExp(`^- \\*\\*${name}:\\*\\*\\s*([\\s\\S]*?)(?=^- \\*\\*|\\n\\n|$)`, 'm');
  const x = r.exec(entry);
  return x ? x[1].replace(/\s*\n\s*/g, ' ').trim() : '';
};
const S = { status: bullet('Status'), symptom: bullet('Symptom'), c: bullet('C locus'), fix: bullet('Fix'),
  js: bullet('JS'), verify: bullet('Verify'), named: bullet('Named omissions'), next: bullet('Next') };
const first = (t, n = 1) => t.split(/(?<=[.!?])\s+(?=[A-Z`*])/).slice(0, n).join(' ');
const statusWord = /parked|deferred/i.test(S.status) ? 'parked' : /open|todo/i.test(S.status) ? 'open' : 'fixed';
console.log(`finish ${id} — ${title}`);

/* ---------- 2. DIVERGENCE-INDEX row ---------- */
{
  const idxp = 'docs/DIVERGENCE-INDEX.md';
  let s = read(idxp);
  if (!s.includes(`| ${id} |`)) {
    const cl = (S.c.match(/`[^`]+`(?:\s+`[^`]+`)?/) || [S.c.slice(0, 60)])[0].replace(/`/g, '');
    const area = `${cl} — ${title}`.slice(0, 110);
    const body = [first(S.symptom, 2), S.fix && `fix: ${first(S.fix, 2)}`, S.verify && `verify: ${first(S.verify, 1)}`,
      S.named && `named: ${first(S.named, 2)}`].filter(Boolean).join('; ').replace(/\|/g, '\\|').slice(0, 900);
    const row = `| ${id} | ${statusWord} | ${area.replace(/\|/g, '\\|')} | ${body} |\n`;
    const anchor = '|---|---|---|---|\n';
    if (!s.includes(anchor)) { console.error('index header anchor missing'); process.exit(1); }
    s = s.replace(anchor, anchor + row);
    write(idxp, s);
    console.log(`  index row added`);
  } else console.log('  index row present');
}

/* ---------- 3. journal crumb ---------- */
{
  const jp = 'docs/AGENT-LOOP-JOURNAL.md';
  let s = read(jp);
  if (!s.includes(`— ${id} `) && !s.includes(`— ${id}\n`)) {
    const anchor = '`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).\n';
    const crumb = `## ${today} — ${id} ${title}\n\n**C locus:** ${S.c}\n**JS:** ${S.js}\n**Change:** ${first(S.fix, 3)}\n**Verify:** ${first(S.verify, 3)}\n${S.named ? `**Named:** ${first(S.named, 2)}\n` : ''}**Next:** ${S.next || '(see LOOP-QUEUE)'}\n`;
    if (!s.includes(anchor)) { console.error('journal anchor missing'); process.exit(1); }
    write(jp, s.replace(anchor, anchor + crumb));
    console.log('  journal crumb added');
  } else console.log('  journal crumb present');
}

/* ---------- 4. CURRENT recent block + ranges ---------- */
{
  const cp = 'docs/CURRENT.md';
  let s = read(cp);
  const B = '<!-- recent:begin -->', E = '<!-- recent:end -->';
  const line = `**${id}** ${S.c.replace(/\s*—.*$/, '').slice(0, 90)} — ${first(S.fix, 1).slice(0, 220)}`;
  if (!s.includes(B)) {
    /* first run: convert the "**Keep:** D-XXXX…D-YYYY (index). Recent:" paragraph */
    const km = /\*\*Keep:\*\* D-\d{4}…D-\d{4} \(index\)\. Recent: \*\*/.exec(s);
    if (km) {
      const paraEnd = s.indexOf('\n\n', km.index);
      const head = s.slice(0, km.index);
      const tail = s.slice(paraEnd);
      s = `${head}${B}\n${line}\n${E}${tail}`;
    } else {
      s += `\n${B}\n${line}\n${E}\n`;
    }
  } else {
    const a = s.indexOf(B) + B.length, b = s.indexOf(E);
    const lines = s.slice(a, b).split('\n').filter((l) => l.startsWith('**D-'));
    if (!lines.some((l) => l.startsWith(`**${id}**`))) lines.unshift(line);
    s = s.slice(0, a) + '\n' + lines.slice(0, 8).join('\n') + '\n' + s.slice(b);
  }
  s = s.replace(/(D-\d{4})…D-\d{4}/g, (_, lo) => `${lo}…${id}`);
  write(cp, s);
  console.log('  CURRENT recent block + ranges updated');
}

/* ---------- 5. NOTES landmarks block ---------- */
{
  const np = 'docs/NOTES.md';
  let s = read(np);
  const B = '<!-- landmarks:begin -->', E = '<!-- landmarks:end -->';
  const line = `- ${id}: ${first(S.fix, 1).slice(0, 150)}${S.named ? ` Named: ${first(S.named, 1).slice(0, 90)}` : ''}`;
  if (!s.includes(B)) {
    const h = s.indexOf('## Landmarks');
    if (h >= 0) {
      const bodyStart = s.indexOf('\n', h) + 1;
      const rest = s.slice(bodyStart);
      const endRel = rest.search(/\n## /);
      const body = endRel < 0 ? rest : rest.slice(0, endRel);
      const after = endRel < 0 ? '' : rest.slice(endRel);
      const items = body.split('\n').filter((l) => l.startsWith('- '));
      s = `${s.slice(0, bodyStart)}\n${B}\n${[line, ...items].slice(0, 15).join('\n')}\n${E}\n${after}`;
    }
  } else {
    const a = s.indexOf(B) + B.length, b = s.indexOf(E);
    const items = s.slice(a, b).split('\n').filter((l) => l.startsWith('- '));
    if (!items.some((l) => l.startsWith(`- ${id}:`))) items.unshift(line);
    s = s.slice(0, a) + '\n' + items.slice(0, 15).join('\n') + '\n' + s.slice(b);
  }
  s = s.replace(/(D-\d{4})…D-\d{4}/g, (_, lo) => `${lo}…${id}`);
  write(np, s);
  console.log('  NOTES landmarks updated');
}

/* ---------- 6. queue row check-off + review stamp ---------- */
{
  const qp = 'docs/LOOP-QUEUE.md';
  let s = read(qp);
  const rows = s.split('\n');
  let touched = false;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!r.startsWith('- [ ]')) continue;
    if (!r.includes(`**Addressed:** ${id}`) && !r.includes(id)) continue;
    rows[i] = r.replace('- [ ]', '- [x]') + (r.includes('**Addressed:**') ? '' : ` **Addressed:** ${id}`);
    const src = /Source:\s*(reviews\/[^\s]+\.md)/.exec(r);
    if (src && existsSync(P(src[1]))) {
      let rv = read(src[1]);
      if (!rv.includes(`**Addressed:** ${id}`)) {
        rv = rv.replace(/\n## Intent vs deliverable\n/, `\n**Addressed:** ${id}\n\n## Intent vs deliverable\n`);
        if (!rv.includes(`**Addressed:** ${id}`)) rv += `\n**Addressed:** ${id}\n`;
        write(src[1], rv);
        console.log(`  review stamped: ${src[1]}`);
      }
    }
    touched = true;
  }
  if (touched) { write(qp, rows.join('\n')); console.log('  queue row checked off'); }
  else console.log('  no unchecked queue row names this D-id (mark it `- [x]` yourself if one should)');
}

/* ---------- 7. backfill missing short hashes ---------- */
{
  const files = ['docs/archive/LOOP-QUEUE-DONE.md', ...readdirSync(P('reviews/loop-unattended')).map((f) => `reviews/loop-unattended/${f}`)];
  const logLines = git(['log', '--format=%h %s', '-400']).split('\n');
  let n = 0;
  for (const f of files) {
    if (!existsSync(P(f))) continue;
    let s = read(f);
    const before = s;
    s = s.replace(/\*\*Addressed:\*\* (D-\d{4})(?![ `])/g, (whole, did) => {
      if (did === id) return whole; // this iteration's own commit does not exist yet
      const hit = logLines.find((l) => l.includes(`(${did})`));
      if (!hit) return whole;
      n++;
      return `${whole} \`${hit.split(' ')[0]}\``;
    });
    if (s !== before) write(f, s);
  }
  if (n) console.log(`  backfilled ${n} short hash(es)`);
}

/* ---------- 8. archive + caps ---------- */
if (!DRY) {
  run('scripts/archive-loop-queue-done.mjs');
  run('scripts/check-hot-docs.mjs', ['--fix']);
}

/* ---------- 9. commit + push ---------- */
if (flag('commit') && !DRY) {
  const msgFile = val('message', null);
  const msg = msgFile ? readFileSync(msgFile, 'utf8')
    : `${title} (${id}).\n\n${S.symptom}\n\n${S.fix}\n\n${S.verify ? `Verify: ${S.verify}\n\n` : ''}${S.named ? `Named: ${S.named}\n\n` : ''}Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\n`;
  const paths = statusPaths();
  if (!paths.length) { console.log('nothing to commit'); process.exit(0); }
  const added = spawnSync('git', ['add', '--', ...paths], { cwd: root, stdio: 'inherit' });
  if (added.status) { console.error(`git add failed on ${paths.length} path(s); nothing committed`); process.exit(added.status); }
  const r = spawnSync('git', ['commit', '-q', '-F', '-'], { cwd: root, input: msg, stdio: ['pipe', 'inherit', 'inherit'] });
  if (r.status) process.exit(r.status);
  console.log(git(['log', '--oneline', '-1']));
  const p = spawnSync('git', ['push', 'origin', 'HEAD'], { cwd: root, stdio: 'inherit' });
  if (p.status) process.exit(p.status);
}
