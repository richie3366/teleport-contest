#!/usr/bin/env node
/**
 * Regenerate ARMOR_CLASS_MKOBJ_OC_PROB_ROWS in js/mkobj_mklev_oc_prob_data.js.
 * C ref: o_init.c svb.bases[ARMOR_CLASS]..bases[RING_CLASS]-1; mkobj.c mkobj walk.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const includeDir = join(root, 'nethack-c/upstream/include');
const dataPath = join(root, 'js/mkobj_mklev_oc_prob_data.js');

const cpp = execSync(
    `cd "${includeDir}" && printf '%s\\n' '#define OBJECTS_INIT' '#include "objects.h"' | cpp -I. -I.. 2>/dev/null`,
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
const cleaned = cpp.replace(/^#[^\n]*\n/gm, '');
const parts = cleaned.split('{ 0, 0, (char *) 0,');
const re =
    /\b(ILLOBJ|WEAPON|ARMOR|RING|AMULET|TOOL|FOOD|POTION|SCROLL|SPBOOK|WAND|COIN|GEM|ROCK|BALL|CHAIN|VENOM)_CLASS\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*(-?\d+)\s*,\s*(\d+)\s*,\s*([^,]+)\s*,/;

/** @type {Map<number, number>} */
const probByOtyp = new Map();
for (let i = 1; i < parts.length; i++) {
    const m = parts[i].match(re);
    if (!m || m[1] !== 'ARMOR') continue;
    probByOtyp.set(i - 1, parseInt(m[4], 10));
}

const armorOtyps = [...probByOtyp.keys()].sort((a, b) => a - b);
/** C: o_init.c — bases[ARMOR_CLASS] ends on the last contiguous ARMOR block (NH5: otyp 89). */
let lo = armorOtyps[0] | 0;
let hi = armorOtyps[armorOtyps.length - 1] | 0;
for (let i = 1; i < armorOtyps.length; i++) {
    if ((armorOtyps[i] | 0) - (armorOtyps[i - 1] | 0) > 1) lo = armorOtyps[i] | 0;
}
const rows = [];
for (let otyp = lo; otyp <= hi; otyp++) {
    rows.push([otyp, probByOtyp.get(otyp) ?? 0]);
}
let tot = 0;
for (const [, p] of rows) tot += p | 0;
if (tot !== 1000) {
    throw new Error(`ARMOR_CLASS oc_prob sum ${tot}, expected 1000`);
}

const src = readFileSync(dataPath, 'utf8');
const block = `export const ARMOR_CLASS_MKOBJ_OC_PROB_ROWS = Object.freeze(${JSON.stringify(rows)});`;
const next = src.replace(
    /export const ARMOR_CLASS_MKOBJ_OC_PROB_ROWS = Object\.freeze\(\[[\s\S]*?\]\);/,
    block,
);
if (next === src) throw new Error('ARMOR_CLASS_MKOBJ_OC_PROB_ROWS not found in mkobj_mklev_oc_prob_data.js');
writeFileSync(dataPath, next, 'utf8');
console.log(`Updated ${dataPath}: otyp ${lo}..${hi}, ${rows.length} rows, sum ${tot}`);
