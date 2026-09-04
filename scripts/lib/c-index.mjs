/**
 * Shared pinned-C index for operator tooling (port-coverage, hidden-proxy,
 * brief). Read-only. Not imported from scored js/.
 *
 *   const idx = loadCIndex();
 *   idx.fns.get('newuhs')            → { name, file, start, end, body, lines }
 *   idx.ownerOfLine('eat.c', 3400)   → 'newuhs'
 *   idx.matchMessage('You are beginning to feel hungry.') → [{fn,file,line,text}]
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const C_DIRS = ['nethack-c/upstream/src', 'nethack-c/upstream/win/tty'].map((d) => join(root, d));

let cached = null;

export function loadCIndex() {
  if (cached) return cached;
  const fns = new Map();
  const byFile = new Map(); // file -> [{name,start,end}]
  const literals = [];
  const files = C_DIRS.flatMap((d) => readdirSync(d).filter((x) => x.endsWith('.c')).sort().map((x) => [x, join(d, x)]));
  for (const [f, abs] of files) {
    const lines = readFileSync(abs, 'utf8').split('\n');
    const spans = [];
    for (let i = 0; i < lines.length; i++) {
      const m = /^([A-Za-z_][\w]*)\s*\(/.exec(lines[i]);
      if (!m) continue;
      let j = i;
      while (j < lines.length && !lines[j].includes('{') && j - i < 8) j++;
      if (j >= lines.length || !lines[j].trim().startsWith('{')) continue;
      let end = j;
      for (let k = j + 1; k < lines.length; k++) {
        if (/^\}/.test(lines[k])) { end = k; break; }
      }
      const name = m[1];
      const rec = {
        name, file: f, start: i + 1, end: end + 1,
        body: lines.slice(j, end + 1).join('\n'), lines: end - j + 1,
      };
      if (!fns.has(name)) fns.set(name, rec);
      spans.push({ name, start: i + 1, end: end + 1 });
      for (let k = j; k <= end; k++) {
        for (const lm of lines[k].matchAll(/"((?:[^"\\]|\\.){4,})"/g)) {
          literals.push({ text: lm[1], fn: name, file: f, line: k + 1 });
        }
      }
    }
    byFile.set(f, spans);
  }
  // literal → regex; printf conversions become wildcards
  const compiled = literals.map((l) => {
    let t = l.text.replace(/\\"/g, '"').replace(/\\n/g, ' ');
    t = t.replace(/%[-+ #0]*\d*(?:\.\d+)?l?[sdcuxXi]/g, ' ');
    const parts = t.split(' ').filter(Boolean)
      .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return {
      ...l,
      re: new RegExp(parts.join('.*'), 'i'),
      fixed: parts.reduce((a, s) => a + s.length, 0),
    };
  });
  cached = {
    fns,
    literals,
    ownerOfLine(file, line) {
      const spans = byFile.get(file) || [];
      for (const s of spans) if (line >= s.start && line <= s.end) return s.name;
      return null;
    },
    /** Best C literals matching a rendered message, most specific first. */
    matchMessage(msg, limit = 3) {
      const m = String(msg || '').replace(/--More--\s*$/, '').trim();
      if (m.length < 6) return [];
      const hits = [];
      for (const l of compiled) {
        if (l.fixed < 6) continue;
        if (l.re.test(m)) hits.push(l);
      }
      hits.sort((a, b) => b.fixed - a.fixed);
      const out = [];
      const seen = new Set();
      for (const h of hits) {
        const key = `${h.fn}@${h.file}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ fn: h.fn, file: h.file, line: h.line, text: h.text });
        if (out.length >= limit) break;
      }
      return out;
    },
  };
  return cached;
}

/** Parse a recorder RNG entry "rn2(4)=1 @ fn(file.c:123)" → {call,fn,file,line}. */
export function parseCRng(entry) {
  const s = String(entry || '');
  const m = /^(\S+)\s*@\s*([A-Za-z_]\w*)\(([^:)]+):(\d+)\)/.exec(s);
  if (!m) return { call: s.replace(/\s*@.*$/, ''), fn: null, file: null, line: 0 };
  return { call: m[1], fn: m[2], file: m[3], line: +m[4] };
}
