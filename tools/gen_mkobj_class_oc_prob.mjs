#!/usr/bin/env node
/**
 * Regenerate mkobj class oc_prob rows in js/mkobj_mklev_oc_prob_data.js.
 * C ref: o_init.c svb.bases[] ranges; mkobj.c mkobj() prob walk.
 *
 * Usage: node tools/gen_mkobj_class_oc_prob.mjs GEM [TOOL WEAPON ...]
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const includeDir = join(root, 'nethack-c/upstream/include');
const dataPath = join(root, 'js/mkobj_mklev_oc_prob_data.js');

const CLASSES = process.argv.slice(2);
if (CLASSES.length === 0) {
    console.error('Usage: node tools/gen_mkobj_class_oc_prob.mjs GEM [TOOL WEAPON ...]');
    process.exit(1);
}

const cpp = execSync(
    `cd "${includeDir}" && printf '%s\\n' '#define OBJECTS_INIT' '#include "objects.h"' | cpp -I. -I.. 2>/dev/null`,
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
const cleaned = cpp.replace(/^#[^\n]*\n/gm, '');
const parts = cleaned.split('{ 0, 0, (char *) 0,');
const re =
    /\b(ILLOBJ|WEAPON|ARMOR|RING|AMULET|TOOL|FOOD|POTION|SCROLL|SPBOOK|WAND|COIN|GEM|ROCK|BALL|CHAIN|VENOM)_CLASS\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*(-?\d+)\s*,\s*(\d+)\s*,\s*([^,]+)\s*,/;

/** @type {{ otyp: number, cls: string, prob: number }[]} */
const objs = [];
for (let i = 1; i < parts.length; i++) {
    const m = parts[i].match(re);
    if (!m) continue;
    objs.push({ otyp: i - 1, cls: m[1], prob: parseInt(m[4], 10) });
}

/** @type {Map<string, [number, number]>} */
const ranges = new Map();
let fi = 0;
while (fi < objs.length) {
    const cl = objs[fi].cls;
    let la = fi + 1;
    while (la < objs.length && objs[la].cls === cl) la++;
    ranges.set(cl, [objs[fi].otyp, objs[la - 1].otyp]);
    fi = la;
}

/** C: mkobj.c — walk svb.bases[oclass] .. bases[oclass+1]-1 (contiguous otyp indices). */
function rowsForClass(cls) {
    const range = ranges.get(cls);
    if (!range) throw new Error(`unknown class ${cls}`);
    const [lo, hi] = range;
    /** @type {[number, number][]} */
    const rows = [];
    for (let otyp = lo; otyp <= hi; otyp++) {
        const o = objs.find((x) => x.otyp === otyp);
        rows.push([otyp, o?.prob ?? 0]);
    }
    return rows;
}

let src = readFileSync(dataPath, 'utf8');
for (const cls of CLASSES) {
    const rows = rowsForClass(cls);
    let tot = 0;
    for (const [, p] of rows) tot += p | 0;
    const exportName = `${cls}_CLASS_MKOBJ_OC_PROB_ROWS`;
    const block = `export const ${exportName} = Object.freeze(${JSON.stringify(rows)});`;
    const reBlock = new RegExp(
        `export const ${exportName} = Object\\.freeze\\(\\[[\\s\\S]*?\\]\\);`,
    );
    const next = src.replace(reBlock, block);
    if (next === src) throw new Error(`${exportName} not found in ${dataPath}`);
    src = next;
    console.log(`${exportName}: otyp ${rows[0][0]}..${rows[rows.length - 1][0]}, ${rows.length} rows, sum ${tot}`);
}
writeFileSync(dataPath, src, 'utf8');
