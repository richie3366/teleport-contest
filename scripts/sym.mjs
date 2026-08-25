#!/usr/bin/env node
/**
 * Batch symbol resolver for loop agents. One call answers export / async /
 * file:line / local-clone count. Do not grep `export (async )?function`.
 *
 *   node scripts/sym.mjs Blind body_part untrap sellobj
 *
 * Three states: exported; exported+cloned (import the export); not
 * exported but N local clones (do not write N+1).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsDir = join(root, 'js');

const EXPORT_FN =
  /^export\s+(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
const EXPORT_CONST_FN =
  /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*(async\s+)?(?:function|\()/gm;
const EXPORT_CONST =
  /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=/gm;
const LOCAL_FN =
  /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
const LOCAL_CONST_FN =
  /^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(async\s+)?(?:function|\()/gm;

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function listJsFiles(dir, acc = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) listJsFiles(p, acc);
    else if (ent.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}

function walkJs() {
  const files = listJsFiles(jsDir).sort();
  const exported = new Map();
  const locals = new Map();
  for (const abs of files) {
    const rel = relative(root, abs);
    const text = readFileSync(abs, 'utf8');
    for (const m of text.matchAll(EXPORT_FN)) {
      const name = m[2];
      const async = !!m[1];
      const line = lineAt(text, m.index);
      const list = exported.get(name) || [];
      list.push({ rel, line, async, kind: 'function' });
      exported.set(name, list);
    }
    for (const m of text.matchAll(EXPORT_CONST_FN)) {
      const name = m[1];
      const async = !!m[2];
      const line = lineAt(text, m.index);
      const list = exported.get(name) || [];
      list.push({ rel, line, async, kind: 'const-fn' });
      exported.set(name, list);
    }
    for (const m of text.matchAll(EXPORT_CONST)) {
      const name = m[1];
      if (exported.has(name)) continue;
      const line = lineAt(text, m.index);
      exported.set(name, [{ rel, line, async: false, kind: 'const' }]);
    }
    for (const m of text.matchAll(LOCAL_FN)) {
      const name = m[1];
      const line = lineAt(text, m.index);
      const list = locals.get(name) || [];
      list.push({ rel, line, body: m[0] });
      locals.set(name, list);
    }
    for (const m of text.matchAll(LOCAL_CONST_FN)) {
      const name = m[1];
      const line = lineAt(text, m.index);
      const list = locals.get(name) || [];
      list.push({ rel, line, body: m[0] });
      locals.set(name, list);
    }
  }
  return { exported, locals };
}

function fmtSites(sites, cap = 6) {
  const shown = sites.slice(0, cap).map((s) => `${s.rel}:${s.line}`);
  const more = sites.length > cap ? `  …and ${sites.length - cap} more` : '';
  return shown.join('  ') + more;
}

function report(name, { exported, locals }) {
  const exp = [...(exported.get(name) || [])].sort((a, b) => {
    const ag = a.rel.includes('/generated/') ? 1 : 0;
    const bg = b.rel.includes('/generated/') ? 1 : 0;
    return ag - bg || a.rel.localeCompare(b.rel) || a.line - b.line;
  });
  const loc = (locals.get(name) || []).filter(
    (s) => !exp.some((e) => e.rel === s.rel && e.line === s.line),
  );
  if (exp.length) {
    const lines = [];
    for (let i = 0; i < exp.length; i++) {
      const e = exp[i];
      const asyncNote = e.async ? 'ASYNC — await required' : 'sync';
      const kind = e.kind === 'const' ? '   export const' : '';
      const label = i === 0 ? name.padEnd(16) : ' '.repeat(16);
      lines.push(`${label} ${e.rel}:${e.line}   ${asyncNote}${kind}`);
    }
    if (exp.length > 1) {
      lines.push(
        '             !! multiple exports — import the C-locus one; do NOT add another',
      );
    }
    if (loc.length) {
      lines.push(
        `             !! ALSO ${loc.length} LOCAL CLONE(S) in ${new Set(loc.map((s) => s.rel)).size} files — IMPORT the export; do NOT add another`,
      );
      lines.push(`               ${fmtSites(loc)}`);
    }
    console.log(lines.join('\n'));
    return;
  }
  if (loc.length) {
    const files = new Set(loc.map((s) => s.rel)).size;
    console.log(
      `${name.padEnd(16)} NOT EXPORTED — but ${loc.length} LOCAL CLONE(S) in ${files} file(s):\n` +
        `               ${fmtSites(loc, 8)}\n` +
        `             => Do NOT write clone #${loc.length + 1}. Check pinned C; if C has one\n` +
        `                function, this is clone drift (map debt / Open row).`,
    );
    return;
  }
  console.log(
    `${name.padEnd(16)} NOT FOUND in js/** (no export, no local function/const).\n` +
      `             This index includes js/generated/. Do not add a local clone.`,
  );
}

const names = process.argv.slice(2).filter((a) => !a.startsWith('-'));
if (!names.length) {
  console.error('usage: node scripts/sym.mjs Name1 Name2 …');
  process.exit(2);
}
const idx = walkJs();
for (const n of names) report(n, idx);
