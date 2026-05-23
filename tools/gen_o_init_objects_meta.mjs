#!/usr/bin/env node
/**
 * Generate js/o_init_objects_meta.js from upstream objects.h (OBJECTS_INIT + ENUM).
 * C ref: o_init.c init_objects, shuffle, obj_shuffle_range.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const includeDir = join(root, 'nethack-c/upstream/include');

function runCpp(define) {
    return execSync(
        `cd "${includeDir}" && printf '%s\\n' '${define}' '#include "objects.h"' | cpp -I. -I.. 2>/dev/null`,
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
}

const enumNames = runCpp('#define OBJECTS_ENUM').match(/\b[A-Z][A-Z0-9_]+\b/g) || [];
/** @type {Record<string, number>} */
const ENUM_OTYP = Object.fromEntries(enumNames.map((n, i) => [n, i]));

const cpp = runCpp('#define OBJECTS_INIT');
const cleaned = cpp.replace(/^#[^\n]*\n/gm, '');
const parts = cleaned.split('{ 0, 0, (char *) 0,');
const classRe =
    /\b(ILLOBJ|WEAPON|ARMOR|RING|AMULET|TOOL|FOOD|POTION|SCROLL|SPBOOK|WAND|COIN|GEM|ROCK|BALL|CHAIN|VENOM)_CLASS\b/;

const clsNum = {
    ILLOBJ: 1,
    WEAPON: 2,
    ARMOR: 3,
    RING: 4,
    AMULET: 5,
    TOOL: 6,
    FOOD: 7,
    POTION: 8,
    SCROLL: 9,
    SPBOOK: 10,
    WAND: 11,
    COIN: 12,
    GEM: 13,
    ROCK: 14,
    BALL: 15,
    CHAIN: 16,
    VENOM: 17,
};

/** @type {{ otyp: number, ocls: number, nmkn: number, mgc: number, uniq: number, armSub: number }[]} */
const objs = [];
const armSubRe = /\b(ARM_[A-Z]+)\b/;
for (let i = 1; i < parts.length; i++) {
    const block = parts[i];
    const m = block.match(classRe);
    if (!m) continue;
    const pre = block.slice(0, block.indexOf(m[0]));
    const nums = pre
        .replace(/\s+/g, ' ')
        .split(',')
        .map((x) => x.trim())
        .filter((x) => /^-?\d+$/.test(x))
        .map((x) => parseInt(x, 10));
    if (nums.length < 7) continue;
    const armM = block.match(armSubRe);
    const armSub = armM ? { ARM_SUIT: 0, ARM_SHIELD: 1, ARM_HELM: 2, ARM_GLOVES: 3, ARM_BOOTS: 4, ARM_CLOAK: 5, ARM_SHIRT: 6 }[armM[1]] ?? -1 : -1;
    objs.push({
        otyp: i - 1,
        ocls: clsNum[m[1]],
        nmkn: nums[0] | 0,
        mgc: nums[4] | 0,
        uniq: nums[6] | 0,
        armSub,
    });
}

const MAXOCLASSES = ENUM_OTYP.LAST_GENERIC + 1;
/** C: NUM_OBJECTS — last real otyp; fencepost at objects[NUM_OBJECTS] is ILLOBJ terminator. */
const FENCEPOST_OTYP = objs.length - 1;
const NUM_OBJECTS = FENCEPOST_OTYP;
const bases = Array(MAXOCLASSES + 1).fill(0);
let first = MAXOCLASSES;
while (first < NUM_OBJECTS) {
    const oclass = objs[first].ocls;
    let last = first + 1;
    while (last < NUM_OBJECTS && objs[last].ocls === oclass) last++;
    bases[oclass] = first;
    first = last;
}
bases[MAXOCLASSES] = NUM_OBJECTS;
for (let last = MAXOCLASSES - 1; last >= 0; last--) {
    if (!bases[last]) bases[last] = bases[last + 1];
}

const descrCpp = runCpp('#define OBJECTS_DESCR_INIT');
const descrCleaned = descrCpp.replace(/^#[^\n]*\n/gm, '');
const descrBlocks = descrCleaned.match(/\{[^}]+\}/g) || [];
if (descrBlocks.length !== objs.length) {
    throw new Error(`OBJECTS_DESCR_INIT count ${descrBlocks.length} != ${objs.length}`);
}
/** C: OBJ_DESCR — obj_descr[i].oc_descr (second field of OBJ(name, desc)). */
function descrBlockHasDescr(block) {
    const inner = block.slice(1, -1);
    const comma = inner.indexOf(',');
    if (comma < 0) return false;
    const descPart = inner.slice(comma + 1).trim();
    return !descPart.includes('(char *) 0');
}
const hasDescr = descrBlocks.map(descrBlockHasDescr);

const nmkn = objs.map((o) => o.nmkn);
const mgc = objs.map((o) => o.mgc);
const uniq = objs.map((o) => o.uniq);
const ocls = objs.map((o) => o.ocls);

/** C onames indices: use cpp enum when objects[enum] has the expected class. */
function compactOtyp(sn, expectClass) {
    const idx = ENUM_OTYP[sn];
    if (idx !== undefined && (ocls[idx] | 0) === expectClass) return idx;
    throw new Error(`no compact index for ${sn} (enum ${idx}, class ${ocls[idx]})`);
}

/** Magic boots shuffle range (SPEED_BOOTS .. LEVITATION_BOOTS) from objects[] layout. */
function magicBootRange() {
    const ringBase = bases[4] | 0;
    let hi = ringBase - 1;
    let lo = hi;
    while (lo > (bases[3] | 0) && !(mgc[lo] | 0)) lo--;
    while (lo > (bases[3] | 0) && (mgc[lo - 1] | 0) && !(nmkn[lo - 1] | 0)) lo--;
    return { lo, hi };
}

/** Magic gauntlets (LEATHER_GLOVES .. GAUNTLETS_OF_DEXTERITY) — last magic glove index. */
function magicGauntletHi() {
    const bootLo = magicBootRange().lo;
    for (let i = bootLo - 1; i >= (bases[3] | 0); i--) {
        if ((ocls[i] | 0) === clsNum.ARMOR && (mgc[i] | 0) && !(nmkn[i] | 0)) return i;
    }
    return compactOtyp('GAUNTLETS_OF_DEXTERITY', clsNum.ARMOR);
}

const boots = magicBootRange();
const gauntletHi = magicGauntletHi();

/** C: HELMET .. HELM_OF_TELEPATHY — generic helmet through last magic helm (ARM_HELM). */
function helmShuffleBounds() {
    const helms = objs.filter((o) => o.armSub === 2);
    if (!helms.length) throw new Error('no ARM_HELM objects');
    const hi = helms[helms.length - 1].otyp;
    let lo = hi;
    while (lo > helms[0].otyp && (objs[lo].mgc | 0)) lo--;
    return { lo, hi };
}

const helms = helmShuffleBounds();

function armorSubBounds(armSub) {
    const slice = objs.filter((o) => o.armSub === armSub);
    if (!slice.length) throw new Error(`no ARM sub ${armSub}`);
    const hi = slice[slice.length - 1].otyp;
    let lo = hi;
    while (lo > slice[0].otyp && (objs[lo].mgc | 0)) lo--;
    return { lo, hi };
}

const gloves = armorSubBounds(3);
const cloaks = armorSubBounds(5);

/** Last potion before scroll class (C: POT_WATER - 1 as objects[] index). */
const potWater = (bases[clsNum.SCROLL] | 0) - 1;

const outPath = join(root, 'js/o_init_objects_meta.js');
const body = `// Auto-generated by tools/gen_o_init_objects_meta.mjs — do not edit by hand.
// C ref: o_init.c init_objects / shuffle / obj_shuffle_range; objects.h OBJECTS_INIT.

/** C: objclass.h — last generic display slot + 1. */
export const O_INIT_MAXOCLASSES = ${MAXOCLASSES};

/** C: init_objects / shuffle loops use \`i < NUM_OBJECTS\` (fencepost excluded). */
export const O_INIT_NUM_OBJECTS = ${NUM_OBJECTS};

/** \`objects[]\` / \`obj_descr[]\` slot count including fencepost. */
export const O_INIT_ARRAY_LEN = ${objs.length};

/** C: svb.bases[oclass] — first \`objects[]\` index per class (from init_objects). */
export const O_INIT_OCLASS_BASES = Object.freeze(${JSON.stringify(bases)});

/** C: objects[].oc_name_known (BITS nmkn). */
export const O_INIT_OC_NAME_KNOWN = Object.freeze(${JSON.stringify(nmkn)});

/** C: OBJ_DESCR(objects[i]) — non-null obj_descr[i].oc_descr at init (oc_descr_idx == i). */
export const O_INIT_OC_HAS_DESCR = Object.freeze(${JSON.stringify(hasDescr.map((h) => (h ? 1 : 0)))});

/** C: objects[].oc_magic (BITS mgc). */
export const O_INIT_OC_MAGIC = Object.freeze(${JSON.stringify(mgc)});

/** C: objects[].oc_unique (BITS uniq). */
export const O_INIT_OC_UNIQUE = Object.freeze(${JSON.stringify(uniq)});

/** C: objects[].oc_class per otyp. */
export const O_INIT_OC_CLASS = Object.freeze(${JSON.stringify(ocls)});

/** C: object constants as compact objects[] indices (onames; enum when it matches objects[]). */
export const O_INIT_OTYP = Object.freeze(${JSON.stringify({
    TURQUOISE: compactOtyp('TURQUOISE', clsNum.GEM),
    AQUAMARINE: compactOtyp('AQUAMARINE', clsNum.GEM),
    SAPPHIRE: compactOtyp('SAPPHIRE', clsNum.GEM),
    DIAMOND: compactOtyp('DIAMOND', clsNum.GEM),
    EMERALD: compactOtyp('EMERALD', clsNum.GEM),
    FLUORITE: compactOtyp('FLUORITE', clsNum.GEM),
    POT_WATER: potWater,
    HELMET: helms.lo,
    LEATHER_GLOVES: gloves.lo,
    CLOAK_OF_PROTECTION: cloaks.lo,
    SPEED_BOOTS: boots.lo,
    HELM_OF_TELEPATHY: helms.hi,
    GAUNTLETS_OF_DEXTERITY: gauntletHi,
    CLOAK_OF_DISPLACEMENT: cloaks.hi,
    LEVITATION_BOOTS: boots.hi,
    WAN_NOTHING: compactOtyp('WAN_NOTHING', clsNum.WAND),
})});
`;
writeFileSync(outPath, body, 'utf8');
console.log(`Wrote ${outPath} (${NUM_OBJECTS} objects, MAXOCLASSES=${MAXOCLASSES})`);
