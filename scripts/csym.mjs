#!/usr/bin/env node
/**
 * Pinned-C symbol locator. One call replaces grep → read → widen-read when
 * an iteration needs "the C function, its body, and who calls it".
 *
 *   node scripts/csym.mjs detect_wsegs           # file:line-range + full body
 *   node scripts/csym.mjs detect_wsegs --sig     # signature + range only
 *   node scripts/csym.mjs --callers detect_wsegs # every call site in pinned C
 *   node scripts/csym.mjs worm_known monkilled   # several at once
 *   node scripts/csym.mjs --macro canseemon      # #define bodies (include/)
 *
 * Indexes nethack-c/upstream/{src,include,win,util,sys}. NetHack style is
 * `type\nname(args)\n{`, so definitions are found by a col-0 `name(` line
 * whose following non-blank line opens a brace. Deterministic, read-only.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cRoot = join(root, 'nethack-c/upstream');
const DIRS = ['src', 'include', 'win/tty', 'util', 'sys/unix'];

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(c|h)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const files = DIRS.flatMap((d) => walk(join(cRoot, d)));
const argv = process.argv.slice(2);
const sigOnly = argv.includes('--sig');
const wantCallers = argv.includes('--callers');
const wantMacro = argv.includes('--macro');
const names = argv.filter((a) => !a.startsWith('--'));

if (!names.length) {
  console.log('usage: node scripts/csym.mjs <c_function> [more…] [--sig|--callers|--macro]');
  process.exit(2);
}

const DEF = (n) => new RegExp(`^${n}\\s*\\(`);

function defs(name) {
  const out = [];
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!DEF(name).test(lines[i])) continue;
      // next non-blank line must open a body (NetHack puts `{` on its own line)
      let j = i;
      while (j < lines.length && !lines[j].includes('{') && j - i < 6) j++;
      if (j >= lines.length || !lines[j].trim().startsWith('{')) continue;
      // walk to the matching close brace at column 0
      let end = j;
      for (let k = j + 1; k < lines.length; k++) {
        if (lines[k] === '}' || /^\}/.test(lines[k])) { end = k; break; }
      }
      // return type sits on the preceding line(s)
      let start = i;
      while (start > 0 && lines[start - 1].trim() && !/[;}]\s*$/.test(lines[start - 1])
             && !lines[start - 1].trim().startsWith('*') && !lines[start - 1].trim().startsWith('/')) start--;
      out.push({ file: relative(root, f), start: start + 1, end: end + 1, lines: lines.slice(start, end + 1) });
    }
  }
  return out;
}

function macros(name) {
  const out = [];
  const re = new RegExp(`^#\\s*define\\s+${name}\\b`);
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!re.test(lines[i])) continue;
      let end = i;
      while (end < lines.length && lines[end].trimEnd().endsWith('\\')) end++;
      out.push({ file: relative(root, f), start: i + 1, end: end + 1, lines: lines.slice(i, end + 1) });
    }
  }
  return out;
}

function callers(name) {
  const re = new RegExp(`\\b${name}\\s*\\(`);
  const out = [];
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!re.test(lines[i])) continue;
      if (DEF(name).test(lines[i])) continue;           // the definition itself
      if (/^\s*(static\s+)?[\w*\s]+\b/.test(lines[i]) && /\);\s*$/.test(lines[i]) && /^\s*\w[\w\s*]*\b\w+\s*\(/.test(lines[i]) && lines[i].includes(';') && !lines[i].includes('=') && /^[A-Za-z_]/.test(lines[i]) && lines[i].trim().endsWith(');') && !/\bif\b|\breturn\b|\bwhile\b/.test(lines[i]) && /^\s*(extern|static)?\s*[\w*]+\s+\w+\(/.test(lines[i]) && f.endsWith('.h')) continue; // prototype
      out.push(`${relative(root, f)}:${i + 1}  ${lines[i].trim().slice(0, 110)}`);
    }
  }
  return out;
}

for (const name of names) {
  if (wantCallers) {
    const cs = callers(name);
    console.log(`=== ${name} — ${cs.length} reference(s) in pinned C ===`);
    for (const c of cs) console.log('  ' + c);
    continue;
  }
  const found = wantMacro ? macros(name) : [...defs(name), ...macros(name)];
  if (!found.length) {
    console.log(`=== ${name} — no definition found in pinned C ===`);
    console.log('  try --macro, or --callers to see references; the name may be a field or enum.');
    continue;
  }
  for (const d of found) {
    console.log(`=== ${name} — ${d.file}:${d.start}-${d.end} (${d.end - d.start + 1} lines) ===`);
    if (sigOnly) console.log(d.lines.slice(0, 3).join('\n'));
    else console.log(d.lines.join('\n'));
    console.log('');
  }
}
