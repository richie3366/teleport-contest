#!/usr/bin/env node
/**
 * One-shot: reflow c-js-map tables so each entry is a heading plus
 * wrapped evidence (Read/StrReplace-able). Does not drop evidence text.
 *
 *   node scripts/reflow-c-js-map.mjs docs/c-js-map/turns.md docs/c-js-map/data.md
 *   node scripts/reflow-c-js-map.mjs          # self-test only (always runs)
 */
import { readFileSync, writeFileSync } from 'node:fs';

const WIDTH = 100;

function parseRow(line) {
  if (!line.startsWith('|')) return null;
  const trimmed = line.replace(/\s+$/, '');
  const compact = trimmed.replace(/\s/g, '');
  if (/^\|[-|:]+\|?$/.test(compact)) return { kind: 'sep' };
  const inner = trimmed.endsWith('|') ? trimmed.slice(1, -1) : trimmed.slice(1);
  const parts = [];
  let start = 0;
  for (let i = 0; i < 3; i++) {
    const idx = inner.indexOf(' | ', start);
    if (idx === -1) return null;
    parts.push(inner.slice(start, idx).trim());
    start = idx + 3;
  }
  parts.push(inner.slice(start).trim());
  const [c, js, status, evidence] = parts;
  if (/^C source$/i.test(c) || /^JS$/i.test(js)) return { kind: 'header' };
  return { kind: 'row', c, js, status, evidence };
}

/** Insert newlines only — join('') must equal the original evidence. */
function wrapAt(text, width) {
  if (text.length <= width) return [text];
  const lines = [];
  let rest = text;
  const min = Math.floor(width * 0.4);
  while (rest.length > width) {
    const window = rest.slice(0, width);
    let cut = -1;
    for (const sep of ['; ', ' + ', ' ']) {
      const idx = window.lastIndexOf(sep);
      if (idx >= min) {
        cut = idx + sep.length;
        break;
      }
    }
    if (cut < 0) {
      let best = -1;
      for (const ch of ['/', '`', '+', '(', ')', ',', '—', '|']) {
        const idx = window.lastIndexOf(ch);
        if (idx > best) best = idx;
      }
      cut = best >= min ? best + 1 : width;
    }
    lines.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }
  if (rest) lines.push(rest);
  return lines;
}

function absorbContinuations(lines, i, evidence) {
  let j = i + 1;
  const extras = [];
  while (j < lines.length) {
    const n = lines[j];
    if (parseRow(n)) break;
    if (/^#{1,3} /.test(n)) break;
    if (/^Production comments/.test(n)) break;
    if (n.trim() === '') {
      let k = j + 1;
      while (k < lines.length && lines[k].trim() === '') k += 1;
      if (k >= lines.length || parseRow(lines[k]) || /^#{1,3} /.test(lines[k])) {
        break;
      }
      extras.push('');
      j += 1;
      continue;
    }
    extras.push(n.replace(/^\s+/, ''));
    j += 1;
  }
  let ev = evidence;
  for (const e of extras) {
    if (!e) {
      ev += ' ';
      continue;
    }
    ev += (ev.endsWith(' ') ? '' : ' ') + e;
  }
  return { evidence: ev, next: j };
}

function emitEntry(row) {
  const cLines = wrapAt(row.c, WIDTH);
  const heading = `### ${cLines[0]}`;
  const cRest = cLines.slice(1).join('\n');
  const jsLines = wrapAt(`JS: ${row.js} — ${row.status}`, WIDTH).join('\n');
  const body = wrapAt(row.evidence, WIDTH).join('\n');
  return `${heading}\n${cRest ? `${cRest}\n` : ''}\n${jsLines}\n\n${body}\n`;
}

function reflow(text) {
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  let rows = 0;
  const originals = [];
  while (i < lines.length) {
    const parsed = parseRow(lines[i]);
    if (!parsed || parsed.kind === 'row') {
      if (parsed && parsed.kind === 'row') {
        const abs = absorbContinuations(lines, i, parsed.evidence);
        const row = { ...parsed, evidence: abs.evidence };
        out.push(emitEntry(row));
        originals.push(row.evidence);
        rows += 1;
        i = abs.next;
        continue;
      }
      out.push(lines[i]);
      i += 1;
      continue;
    }
    // header or sep — consume a table
    if (parsed.kind === 'header') {
      out.push(
        'Each entry is `C → JS — status`, then evidence (one map entry, wrapped).',
      );
      i += 1;
      if (i < lines.length && parseRow(lines[i])?.kind === 'sep') i += 1;
    } else {
      i += 1;
    }
    while (i < lines.length) {
      const row = parseRow(lines[i]);
      if (!row) break;
      if (row.kind === 'sep' || row.kind === 'header') {
        i += 1;
        continue;
      }
      const abs = absorbContinuations(lines, i, row.evidence);
      const full = { ...row, evidence: abs.evidence };
      out.push(emitEntry(full));
      originals.push(full.evidence);
      rows += 1;
      i = abs.next;
    }
  }
  let result = out.join('\n');
  if (!result.endsWith('\n')) result += '\n';
  result = result.replace(/\n{3,}/g, '\n\n');
  return { text: result, rows, originals };
}

function stripWs(s) {
  return String(s).replace(/\s+/g, '');
}

/** Re-parse orig. Do not trust the emit pass's `originals` array. */
function collectRows(text) {
  const lines = text.split('\n');
  const rows = [];
  let i = 0;
  while (i < lines.length) {
    const parsed = parseRow(lines[i]);
    if (parsed?.kind === 'row') {
      const abs = absorbContinuations(lines, i, parsed.evidence);
      rows.push({
        c: parsed.c,
        js: parsed.js,
        status: parsed.status,
        evidence: abs.evidence,
      });
      i = abs.next;
      continue;
    }
    i += 1;
  }
  return rows;
}

function verify(origText, resultText, rows) {
  const expected = collectRows(origText);
  if (expected.length !== rows) {
    return `re-parse ${expected.length} rows vs emit ${rows}`;
  }
  const headingCount = (resultText.match(/^### /gm) || []).length;
  if (headingCount < rows) {
    return `heading count ${headingCount} < parsed rows ${rows}`;
  }
  const outStrip = stripWs(resultText);
  for (let i = 0; i < expected.length; i++) {
    const r = expected[i];
    if (wrapAt(r.evidence, WIDTH).join('') !== r.evidence) {
      return `wrap not lossless row ${i}: ${r.evidence.slice(0, 80)}…`;
    }
    for (const [name, val] of [
      ['c', r.c],
      ['js', r.js],
      ['status', r.status],
      ['evidence', r.evidence],
    ]) {
      if (val && !outStrip.includes(stripWs(val))) {
        return `lost ${name} row ${i}: ${String(val).slice(0, 80)}…`;
      }
    }
  }
  return null;
}

function selfTest() {
  const sample = [
    '# Title',
    '',
    '| C source | JS | Status | Evidence |',
    '|---|---|---|---|',
    '| `src/foo.c` `bar` | `js/foo.js` `bar` | live | ALPHA_EVIDENCE_UNIQUE_TOKEN and more words so a forty-character cut is obvious at the tail XXXX_TAIL_A. |',
    '',
    '| `src/baz.c` `qux` | `js/baz.js` `qux` | named | BETA_EVIDENCE_UNIQUE_TOKEN second row also has a long evidence tail XXXX_TAIL_B. |',
    '',
  ].join('\n');

  const good = reflow(sample);
  const errGood = verify(sample, good.text, good.rows);
  if (errGood) {
    throw new Error(`self-test good rejected: ${errGood}`);
  }
  if (good.rows !== 2) {
    throw new Error(`self-test expected 2 rows, got ${good.rows}`);
  }

  // Known-bad: emit truncated evidence (Opus attack). Re-parse of orig
  // still has the full tails; verify must reject.
  const badRows = collectRows(sample).map((r) => ({
    ...r,
    evidence: r.evidence.slice(0, -40),
  }));
  const badText = `${badRows.map((r) => emitEntry(r)).join('\n')}\n`;
  const errBad = verify(sample, badText, badRows.length);
  if (!errBad) {
    throw new Error('self-test: truncated evidence was accepted');
  }
}

selfTest();

const files = process.argv.slice(2).filter((a) => a !== '--self-test');
if (!files.length) {
  console.log('self-test ok');
  process.exit(0);
}
for (const rel of files) {
  const orig = readFileSync(rel, 'utf8');
  const { text, rows } = reflow(orig);
  const err = verify(orig, text, rows);
  if (err) {
    console.error(`${rel}: ${err}`);
    process.exit(1);
  }
  writeFileSync(rel, text);
  const maxLine = Math.max(...text.split('\n').map((l) => l.length));
  console.log(
    `${rel}: ${rows} entries  ${Buffer.byteLength(orig)} → ${Buffer.byteLength(text)} B  maxline ${maxLine}`,
  );
}
