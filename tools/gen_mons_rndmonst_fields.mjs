#!/usr/bin/env node
/**
 * Regenerate MONS_MLEVEL + MONS_RNDMONST_DIFFICULTY in js/mons_rndmonst_ini_inv_data.js
 * from nethack-c/upstream/include/monsters.h (MON blocks, NH 5.0 order).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const monstersH = join(root, 'nethack-c/upstream/include/monsters.h');
const monflagH = join(root, 'nethack-c/upstream/include/monflag.h');
const dataPath = join(root, 'js/mons_rndmonst_ini_inv_data.js');

/** @type {Record<string, number>} */
const M2_BITS = {};
for (const m of readFileSync(monflagH, 'utf8').matchAll(/#define (M2_[A-Z0-9_]+)\s+(0x[0-9a-f]+)L?/gi)) {
    M2_BITS[m[1]] = parseInt(m[2], 16);
}

const text = readFileSync(monstersH, 'utf8');
/** @type {string[]} */
const blocks = [];
for (const m of text.matchAll(/\bMON\s*\(/g)) {
    let depth = 0;
    let i = m.index + m[0].length - 1;
    while (i < text.length) {
        if (text[i] === '(') depth++;
        else if (text[i] === ')') {
            depth--;
            if (depth === 0) {
                blocks.push(text.slice(m.index, i + 1));
                break;
            }
        }
        i++;
    }
}

/** Real `MON(NAM(...` blocks only — skip `#define MON(...)` template lines at top of monsters.h. */
const monBlocks = blocks.slice(2);

/** @type {number[]} */
const mlevel = [];
/** @type {number[]} */
const mmove = [];
/** @type {number[]} */
const difficulty = [];
/** @type {number[]} */
const genoPlanB = [];
/** @type {number[]} */
const mflags2 = [];
/** @type {number[]} */
const mflags3 = [];

/** @param {string} block */
function parseMflags2(block) {
    let f = 0;
    for (const tok of block.matchAll(/\b(M2_[A-Z0-9_]+)\b/g)) {
        const bit = M2_BITS[tok[1]];
        if (bit !== undefined) f |= bit;
    }
    return f;
}

/** @param {string} block */
function parseMflags3(block) {
    let f = 0;
    if (block.includes('M3_WANTSAMUL')) f |= 0x0001;
    if (block.includes('M3_WANTSBELL')) f |= 0x0002;
    if (block.includes('M3_WANTSBOOK')) f |= 0x0004;
    if (block.includes('M3_WANTSCAND')) f |= 0x0008;
    if (block.includes('M3_WANTSARTI')) f |= 0x0010;
    if (block.includes('M3_WAITFORU')) f |= 0x0040;
    if (block.includes('M3_CLOSE')) f |= 0x0080;
    if (block.includes('M3_INFRAVISION')) f |= 0x0100;
    if (block.includes('M3_INFRAVISIBLE')) f |= 0x0200;
    if (block.includes('M3_DISPLACES')) f |= 0x0400;
    return f;
}

/** @param {string} block */
function parseGenoPlanB(block) {
    let geno = 0;
    const genoLine = block.match(/LVL\([^)]+\),\s*\(([^)]+)\)/);
    const genoSpec = genoLine ? genoLine[1] : '';
    if (genoSpec.includes('G_NOGEN')) geno |= 0x200;
    if (genoSpec.includes('G_UNIQ')) geno |= 0x1000;
    if (genoSpec.includes('G_HELL')) geno |= 0x400;
    const m =
        genoSpec.match(/G_[A-Z_]+\s*\|\s*(\d+)/)
        || genoSpec.match(/G_GENO\s*\|\s*(\d+)/);
    if (m) geno |= parseInt(m[1], 10);
    return geno;
}

for (const block of monBlocks) {
    const lvlM = block.match(/LVL\(\s*(\d+)\s*,\s*(\d+)/);
    mlevel.push(lvlM ? parseInt(lvlM[1], 10) : 0);
    mmove.push(lvlM ? parseInt(lvlM[2], 10) : 12);
    const diffM = block.match(
        /(\d+)\s*,\s*[A-Z][A-Z0-9_]+\s*,\s*[A-Z][A-Z0-9_]+\s*\)\s*$/m,
    );
    difficulty.push(diffM ? parseInt(diffM[1], 10) : 0);
    genoPlanB.push(parseGenoPlanB(block));
    mflags2.push(parseMflags2(block));
    mflags3.push(parseMflags3(block));
}

const dataJs = readFileSync(dataPath, 'utf8');
const fmt = (arr) => `Object.freeze([${arr.join(', ')}])`;

function replaceArray(src, name, values) {
    const re = new RegExp(
        `export const ${name} = \\/\\*\\* @type \\{readonly number\\[\\]\\} \\*\\/ \\(Object\\.freeze\\(\\[[\\s\\S]*?\\]\\)\\);`,
    );
    if (!re.test(src)) throw new Error(`export const ${name} not found`);
    return src.replace(
        re,
        `export const ${name} = /** @type {readonly number[]} */ (${fmt(values)});`,
    );
}

let out = replaceArray(dataJs, 'MONS_MLEVEL', mlevel);
out = replaceArray(out, 'MONS_MMOVE', mmove);
out = replaceArray(out, 'MONS_MFLAGS2', mflags2);
if (!/export const MONS_MFLAGS3/.test(out)) {
    out = out.replace(
        /export const MONS_MMOVE = .*?;\n/,
        (m) => `${m}\nexport const MONS_MFLAGS3 = /** @type {readonly number[]} */ (${fmt(mflags3)});\n`,
    );
} else {
    out = replaceArray(out, 'MONS_MFLAGS3', mflags3);
}
const updateAll = process.argv.includes('--all');
const updateGeno = updateAll || process.argv.includes('--geno');
if (updateAll) {
    out = replaceArray(out, 'MONS_RNDMONST_DIFFICULTY', difficulty);
    out = replaceArray(out, 'MONS_GENO_PLAN_B', genoPlanB);
} else if (updateGeno) {
    out = replaceArray(out, 'MONS_GENO_PLAN_B', genoPlanB);
}
writeFileSync(dataPath, out);
console.log(
    `Updated ${blocks.length} monsters: MONS_MLEVEL, MONS_MMOVE, MONS_MFLAGS2`
        + (updateAll ? ', MONS_RNDMONST_DIFFICULTY, MONS_GENO_PLAN_B' : '')
        + (updateGeno && !updateAll ? ', MONS_GENO_PLAN_B' : '')
        + (!updateAll && !updateGeno ? ' (pass --geno or --all for rndmonst tables)' : ''),
);
