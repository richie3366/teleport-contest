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
const dataPath = join(root, 'js/mons_rndmonst_ini_inv_data.js');

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

/** @type {number[]} */
const mlevel = [];
/** @type {number[]} */
const mmove = [];
/** @type {number[]} */
const difficulty = [];
/** @type {number[]} */
const genoPlanB = [];

/** @param {string} block */
function parseGenoPlanB(block) {
    let geno = 0;
    if (block.includes('G_NOGEN')) geno |= 0x200;
    if (block.includes('G_UNIQ')) geno |= 0x1000;
    if (block.includes('G_HELL')) geno |= 0x400;
    const m =
        block.match(/\(G_[A-Z_]+\s*\|\s*(\d+)\)/)
        || block.match(/\(G_GENO\s*\|\s*(\d+)\)/);
    if (m) geno |= parseInt(m[1], 10);
    return geno;
}

for (const block of blocks) {
    const lvlM = block.match(/LVL\(\s*(\d+)\s*,\s*(\d+)/);
    mlevel.push(lvlM ? parseInt(lvlM[1], 10) : 0);
    mmove.push(lvlM ? parseInt(lvlM[2], 10) : 12);
    const diffM = block.match(/,\s*(\d+)\s*,\s*CLR_[A-Z_]+/);
    difficulty.push(diffM ? parseInt(diffM[1], 10) : 0);
    genoPlanB.push(parseGenoPlanB(block));
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
const updateAll = process.argv.includes('--all');
if (updateAll) {
    out = replaceArray(out, 'MONS_RNDMONST_DIFFICULTY', difficulty);
    out = replaceArray(out, 'MONS_GENO_PLAN_B', genoPlanB);
}
writeFileSync(dataPath, out);
console.log(
    `Updated ${blocks.length} monsters: MONS_MLEVEL, MONS_MMOVE`
        + (updateAll ? ', MONS_RNDMONST_DIFFICULTY, MONS_GENO_PLAN_B' : ' (pass --all for rndmonst tables)'),
);
