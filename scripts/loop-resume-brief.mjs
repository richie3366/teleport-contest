#!/usr/bin/env node
/**
 * loop-resume-brief.mjs — one-call resume brief for a continue-unfinished
 * iteration, generated from the previous attempt's stream-json `.raw`.
 *
 *   node scripts/loop-resume-brief.mjs <iter-NNNN-*.raw> [--max-lines 220]
 *                                     [--edit-lines 40] [--tail 25]
 *
 * Prints, in order:
 *   1. header — iteration, model, tool calls, wall clock, how it ended
 *   2. narrative — every assistant text, with its minute:second stamp
 *   3. reads — every C / JS / doc / harness range the agent opened (deduped)
 *   4. edits — every edit hunk it made (+/- lines only)
 *   5. shell — every command, with the output tail of the ones that carry
 *      evidence (verify / runner / worker / rng-diff / git) and of the last 3
 *   6. exit — the final error text (quota, resource_exhausted, timeout)
 *
 * The supervisor embeds this in `next-iter.context.md` when it arms
 * continue-unfinished. A continuing agent reads it instead of paging the
 * raw stream or re-deriving the previous attempt from `git diff`.
 * The human extract (`iter-NNNN-*.log`) only carries `[tool] started /
 * completed` markers, which is why this exists.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parseRawText } from './loop-raw.mjs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] != null ? Number(args[i + 1]) : d; };
if (!file) {
    console.error('usage: node scripts/loop-resume-brief.mjs <iter-NNNN-*.raw> [--max-lines N] [--edit-lines N] [--tail N]');
    process.exit(2);
}
const MAX_LINES = val('max-lines', 220);
const EDIT_LINES = val('edit-lines', 40);
const TAIL = val('tail', 25);
const EVIDENCE = /verify\.mjs|ps_test_runner|hidden-worker|hidden-proxy|rng-diff|strict-output-check|save-oracle|node --check|git (status|diff|log|show)|finish-iteration|check-hot-docs/;

const text = readFileSync(file, 'utf8');
const { events, stray } = parseRawText(text);
const t0 = events.find((e) => e.timestamp_ms)?.timestamp_ms ?? 0;
let tLast = t0;
for (const e of events) if (e.timestamp_ms > tLast) tLast = e.timestamp_ms;
const stamp = (t) => { const s = Math.max(0, Math.round(((t ?? tLast) - t0) / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
const rel = (p) => (p || '').replace(/^.*?\/(nethack-c|js|docs|scripts|frozen|sessions|hidden-corpus|private-sessions|\.cache|\.agent-port-loop-logs)\//, '$1/');
const clip = (s, n) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

/* ---- collect tool calls ---- */
const calls = [];
const byId = new Map();
for (const e of events) {
    if (e.type !== 'tool_call') continue;
    const tc = e.tool_call || {};
    const id = tc.toolCallId || e.call_id;
    const kindKey = Object.keys(tc).find((k) => k.endsWith('ToolCall'));
    if (e.subtype === 'started') {
        const rec = { id, kind: (kindKey || '?').replace(/ToolCall$/, ''), args: tc[kindKey]?.args || {}, t: e.timestamp_ms, result: null };
        byId.set(id, rec); calls.push(rec);
    } else if (e.subtype === 'completed') {
        const rec = byId.get(id); if (!rec) continue;
        rec.result = tc[kindKey]?.result ?? null;
        rec.tEnd = e.timestamp_ms;
    }
}
const init = events.find((e) => e.type === 'system' && e.subtype === 'init' && e.model) || events.find((e) => e.type === 'system' && e.subtype === 'init') || {};
const resultEv = events.find((e) => e.type === 'result');
const asstById = new Map();
for (const e of events) {
    if (e.type !== 'assistant') continue;
    const id = e.model_call_id || 'asst';
    const text = (e.message?.content || []).map((c) => c.text || '').join(' ');
    if (e.subtype === 'delta') {
        const prev = asstById.get(id) || { t: e.timestamp_ms, text: '' };
        prev.text += text;
        if (prev.t == null) prev.t = e.timestamp_ms;
        asstById.set(id, prev);
    } else {
        asstById.set(id, { t: e.timestamp_ms, text });
    }
}
const assistant = [...asstById.values()];
const wallMs = tLast - t0;

/* ---- how it ended ---- */
let ending = '';
if (resultEv) ending = resultEv.subtype === 'success' ? 'result: success (agent returned normally)' : `result: ${resultEv.subtype} ${clip(resultEv.result || resultEv.error || '', 200)}`;
const strayTail = stray.slice(-3).map((l) => clip(l, 220));
if (!resultEv && strayTail.length) ending = `no result event; stream ended with: ${strayTail.join(' | ')}`;
if (!ending) ending = 'no result event (killed / timeout)';
const quota = /out of usage|ActionRequiredError|usage limit/i.test(text.slice(-4000)) ? ' — PROVIDER QUOTA, the work itself did not fail' : '';

/* ---- sections ---- */
const header = [
    `# Resume brief — ${path.basename(file)}`,
    `model: ${init.model || '?'} · tool calls: ${calls.length} · wall: ${stamp(t0 + wallMs)} · ended: ${ending}${quota}`,
];

const narrative = ['## Narrative (assistant text, in order)'];
for (const a of assistant) narrative.push(`- [${stamp(a.t)}] ${clip(a.text, 320)}`);
if (assistant.length === 0) narrative.push('- (none)');

/* reads, grouped */
const reads = new Map(); // rel path → Set(ranges)
const greps = [];
for (const c of calls) {
    if (c.kind === 'read') {
        const p = rel(c.args.path || c.args.targetFile || c.args.file || '');
        if (!p) continue;
        const range = c.args.offset != null ? `@${c.args.offset}${c.args.limit != null ? '+' + c.args.limit : ''}` : (c.args.startLine != null ? `@${c.args.startLine}-${c.args.endLine ?? ''}` : 'whole');
        if (!reads.has(p)) reads.set(p, new Set());
        reads.get(p).add(range);
    } else if (c.kind === 'grep') {
        greps.push(`/${clip(c.args.pattern, 60)}/ ${rel(c.args.path || c.args.include || '')}`);
    }
}
const group = (re) => [...reads.entries()].filter(([p]) => re.test(p)).map(([p, r]) => `- ${p} ${[...r].join(' ')}`);
const readsSec = ['## Reads (deduped; re-open only what you will edit)'];
const groups = [['C', /^nethack-c\//], ['JS', /^js\//], ['docs', /^docs\//], ['harness', /^(scripts|frozen)\//]];
let seen = new Set();
for (const [name, re] of groups) {
    const rows = group(re);
    rows.forEach((r) => seen.add(r));
    if (rows.length) readsSec.push(`### ${name} (${rows.length})`, ...rows);
}
const other = [...reads.entries()].map(([p, r]) => `- ${p} ${[...r].join(' ')}`).filter((r) => !seen.has(r));
if (other.length) readsSec.push(`### other (${other.length})`, ...other);
if (greps.length) readsSec.push(`### greps (${greps.length}, unique ${new Set(greps).size})`, ...[...new Set(greps)].map((g) => `- ${g}`));

/* edits */
const editsSec = ['## Edits (chronological; +/- lines only — the diff on disk is authoritative)'];
let editCount = 0;
for (const c of calls) {
    if (!/^(edit|strReplace|write|multiEdit)$/.test(c.kind)) continue;
    editCount++;
    const p = rel(c.args.path || c.args.targetFile || '');
    const ok = c.result?.success;
    const added = ok?.linesAdded, removed = ok?.linesRemoved;
    const head = `### [${stamp(c.t)}] ${c.kind} ${p}${added != null ? ` (+${added} −${removed})` : ''}${c.result?.failure || c.result?.error ? ' — FAILED: ' + clip(c.result.failure?.message || c.result.error || JSON.stringify(c.result.failure), 160) : ''}`;
    editsSec.push(head);
    const diff = ok?.diffString || '';
    if (diff && /^(js|docs)\//.test(p)) {
        const hunk = diff.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
        const shown = hunk.slice(0, EDIT_LINES).map((l) => '    ' + clip(l, 160));
        editsSec.push(...shown);
        if (hunk.length > EDIT_LINES) editsSec.push(`    … (${hunk.length - EDIT_LINES} more lines)`);
    }
}
if (!editCount) editsSec.push('- (no edits — the previous agent died before writing; finish that job from the narrative)');

/* shell */
const shellSec = ['## Shell (every command; output tail for evidence commands and the last 3)'];
const shells = calls.filter((c) => c.kind === 'shell');
shells.forEach((c, i) => {
    const cmd = String(c.args.command || '');
    const first = clip(cmd.split('\n')[0], 150) + (cmd.includes('\n') ? ` (+${cmd.split('\n').length - 1} lines)` : '');
    const r = c.result || {};
    const body = r.success || r.failure || {};
    const exit = body.exitCode ?? (r.success ? 0 : (r.failure ? 1 : '?'));
    const merged = (body.stdout || '') + (body.stderr ? '\n' + body.stderr : '');
    const out = String(body.interleavedOutput ?? merged);
    shellSec.push(`- [${stamp(c.t)}] $ ${first} → exit ${exit}`);
    const evidence = EVIDENCE.test(cmd) || i >= shells.length - 3;
    if (evidence && out.trim()) {
        const lines = out.replace(/\s+$/, '').split('\n');
        const tail = lines.slice(-TAIL).map((l) => '      ' + clip(l, 170));
        if (lines.length > TAIL) shellSec.push(`      … (${lines.length - TAIL} lines above)`);
        shellSec.push(...tail);
    }
});
if (!shells.length) shellSec.push('- (none)');

const exitSec = ['## How it ended', `- ${ending}${quota}`];
if (strayTail.length) exitSec.push(...strayTail.map((l) => `- ${l}`));
if (assistant.length) exitSec.push(`- last assistant text: ${clip(assistant[assistant.length - 1].text, 300)}`);

/* ---- assemble with a total cap. Trim order: reads (the diff on disk
   supersedes them), then edits (same), then the shell list; the output
   tails of evidence commands (the last verify / runner run) go last
   because they are what the continuing agent must not re-derive. ---- */
const sections = [header, narrative, readsSec, editsSec, shellSec, exitSec];
const total = () => sections.reduce((n, s) => n + s.length + 1, 0);
const more = `run \`node scripts/loop-resume-brief.mjs ${path.basename(file)} --max-lines 600\` for all`;
const trim = (sec, keepHead) => {
    if (sec.length <= keepHead + 1) return false;
    const removed = sec.length - keepHead;
    sec.splice(keepHead, removed, `… (${removed} lines omitted; ${more})`);
    return true;
};
if (total() > MAX_LINES) trim(readsSec, 12);
if (total() > MAX_LINES) trim(editsSec, 24);
if (total() > MAX_LINES) {
    // drop command lines (and their tails) from the middle, keeping the first 3 and the last 8 commands
    const cmdIdx = shellSec.map((l, i) => (l.startsWith('- [') ? i : -1)).filter((i) => i >= 0);
    if (cmdIdx.length > 11) {
        const from = cmdIdx[3], to = cmdIdx[cmdIdx.length - 8];
        shellSec.splice(from, to - from, `… (${cmdIdx.length - 11} commands omitted; ${more})`);
    }
}
if (total() > MAX_LINES) {
    // last resort: shorten output tails from the oldest evidence command forward
    for (let i = 0; i < shellSec.length && total() > MAX_LINES; i++) if (shellSec[i].startsWith('      ')) shellSec.splice(i--, 1);
}
console.log(sections.map((s) => s.join('\n')).join('\n\n'));
