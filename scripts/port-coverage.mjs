#!/usr/bin/env node
/**
 * Compatibility shim over scripts/ledger.mjs (2026-09-27 process take).
 * The measurement lives in scripts/lib/coverage.mjs; declared status in
 * docs/ledger/. Old instructions keep working:
 *
 *   node scripts/port-coverage.mjs                # top table (ledger summary --top)
 *   node scripts/port-coverage.mjs --limit 30 --md
 *   node scripts/port-coverage.mjs --name eatfood # measured + declared, JSON
 *   node scripts/port-coverage.mjs --rows 12      # coverage rows (ledger rows)
 *
 * The LOOP-QUEUE **Open — coverage** block is generated: do not paste rows,
 * run `node scripts/ledger.mjs rows --write` (finish-iteration does it).
 */
import { load, eligibleRows } from './ledger.mjs';

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

const L = await load();
const one = arg('--name', null);
if (one) {
  const keys = [...L.byKey.keys()].filter((k) => k.endsWith(`:${one}`));
  if (!keys.length) { console.log(`${one}: not a pinned-C function`); process.exit(0); }
  for (const k of keys) console.log(JSON.stringify({ ...L.byKey.get(k), declared: L.ledger.get(k) || null }, null, 2));
  process.exit(0);
}
if (argv.includes('--rows')) {
  const n = parseInt(arg('--rows', '12'), 10) || 12;
  const rows = await eligibleRows({ n, minC: parseInt(arg('--min-c-lines', '8'), 10) });
  for (const x of rows) console.log(x.line);
  console.error(`${rows.length} row(s). The Open — coverage block is generated: run \`node scripts/ledger.mjs rows --write\` instead of pasting.`);
  process.exit(0);
}
const limit = parseInt(arg('--limit', '40'), 10);
const rows = await eligibleRows({ n: limit, minC: 0 });
if (argv.includes('--md')) {
  console.log('| # | C function | C file:line | C code | JS | hops | callers | RNG | msg | score |');
  console.log('|--:|---|---|--:|---|--:|--:|--:|--:|--:|');
  rows.forEach(({ r }, i) => console.log(`| ${i + 1} | \`${r.fn}\` | \`${r.file}:${r.start}\` | ${r.cCode} | ${r.cover}${r.jsCode ? ` ${r.jsCode}L` : ''} | ${r.hops === 9 ? '—' : r.hops} | ${r.calls} | ${r.rng} | ${r.out} | ${r.score.toFixed(1)} |`));
} else {
  rows.forEach(({ r }, i) => console.log(`${String(i + 1).padStart(3)}. ${r.fn.padEnd(24)} ${r.cover.padEnd(8)} c=${String(r.cCode).padStart(4)} js=${String(r.jsCode).padStart(4)}`
    + ` hop=${r.hops === 9 ? '-' : r.hops} calls=${String(r.calls).padStart(3)} rng=${String(r.rng).padStart(3)} msg=${String(r.out).padStart(3)}`
    + ` ${r.file}:${r.start}  ${r.score.toFixed(1)}${r.dead.length ? `\n      missing callees: ${r.dead.slice(0, 8).join(', ')}` : ''}`));
}
console.log(`\n${rows.length} open row(s) shown; ${L.rows.length} C functions ledgered (node scripts/ledger.mjs summary).`);
