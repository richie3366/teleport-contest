// roles.js — Role, race, gender, alignment data.
// C ref: role.c — roles[], races[], aligns[] (NetHack 5.0.0); validrole/validrace,
//       validgend/validalign, randrace/randalign/randgend; role_init() vs coerceChargenIdentity.
//
// `rank` is the XL 1 title (first row in role.c for each role).
// `allows` mirrors each role's final selfmask (lawful/neutral/chaotic,
// races, gender): see `roles[]` entries in role.c.

import { permonstHuman } from './mondata.js';
import { STR18 } from './const.js';
import { rn2 } from './rng.js';

/** Alignment as u.ualign.type: A_LAWFUL=1, A_NEUTRAL=0, A_CHAOTIC=-1 */

/**
 * @typedef {{ infix: number, inrnd: number, lofix: number, lornd: number, hifix: number, hirnd: number }} RoleAdvance
 */

/**
 * @typedef {{
 *   abbr: string,
 *   name: { m: string, f: string },
 *   rank: { m: string, f: string },
 *   mnum: number,
 *   allows: { align: number[], races: string[], gender: 'any' | 'female' | 'male' },
 *   attrbase: number[],
 *   attrdist: number[],
 *   hpadv: RoleAdvance,
 *   enadv: RoleAdvance,
 *   initrecord: number,
 * }} RoleRow
 */

/** @type {RoleRow[]} */
export const roles = [
    { abbr: 'Arc', name: { m: 'Archeologist', f: 'Archeologist' }, rank: { m: 'Digger', f: 'Digger' }, mnum: 0,
      allows: { align: [1, 0], races: ['human', 'dwarf', 'gnome'], gender: 'any' },
      attrbase: [7, 10, 10, 7, 7, 7], attrdist: [20, 20, 20, 10, 20, 10],
      hpadv: { infix: 11, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 10 },
    { abbr: 'Bar', name: { m: 'Barbarian', f: 'Barbarian' }, rank: { m: 'Plunderer', f: 'Plunderess' }, mnum: 1,
      allows: { align: [0, -1], races: ['human', 'orc'], gender: 'any' },
      attrbase: [16, 7, 7, 15, 16, 6], attrdist: [30, 6, 7, 20, 30, 7],
      hpadv: { infix: 14, inrnd: 0, lofix: 0, lornd: 10, hifix: 2, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 14 },
    { abbr: 'Cav', name: { m: 'Caveman', f: 'Cavewoman' }, rank: { m: 'Troglodyte', f: 'Troglodyte' }, mnum: 2,
      allows: { align: [1, 0], races: ['human', 'dwarf', 'gnome'], gender: 'any' },
      attrbase: [10, 7, 7, 7, 8, 6], attrdist: [30, 6, 7, 20, 30, 7],
      hpadv: { infix: 14, inrnd: 0, lofix: 0, lornd: 8, hifix: 2, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 0 },
    { abbr: 'Hea', name: { m: 'Healer', f: 'Healer' }, rank: { m: 'Rhizotomist', f: 'Rhizotomist' }, mnum: 3,
      allows: { align: [0], races: ['human', 'gnome'], gender: 'any' },
      attrbase: [7, 7, 13, 7, 11, 16], attrdist: [15, 20, 20, 15, 25, 5],
      hpadv: { infix: 11, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 4, lofix: 0, lornd: 1, hifix: 0, hirnd: 2 },
      initrecord: 10 },
    { abbr: 'Kni', name: { m: 'Knight', f: 'Knight' }, rank: { m: 'Gallant', f: 'Gallant' }, mnum: 4,
      allows: { align: [1], races: ['human'], gender: 'any' },
      attrbase: [13, 7, 14, 8, 10, 17], attrdist: [30, 15, 15, 10, 20, 10],
      hpadv: { infix: 14, inrnd: 0, lofix: 0, lornd: 8, hifix: 2, hirnd: 0 },
      enadv: { infix: 1, inrnd: 4, lofix: 0, lornd: 1, hifix: 0, hirnd: 2 },
      initrecord: 8 },
    { abbr: 'Mon', name: { m: 'Monk', f: 'Monk' }, rank: { m: 'Candidate', f: 'Candidate' }, mnum: 5,
      allows: { align: [1, 0, -1], races: ['human'], gender: 'any' },
      attrbase: [10, 7, 8, 8, 7, 7], attrdist: [25, 10, 20, 20, 15, 10],
      hpadv: { infix: 12, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 2, inrnd: 2, lofix: 0, lornd: 2, hifix: 0, hirnd: 2 },
      initrecord: 8 },
    { abbr: 'Pri', name: { m: 'Priest', f: 'Priestess' }, rank: { m: 'Aspirant', f: 'Aspirant' }, mnum: 6,
      allows: { align: [1, 0, -1], races: ['human', 'elf'], gender: 'any' },
      attrbase: [7, 7, 10, 7, 7, 7], attrdist: [15, 10, 30, 15, 20, 10],
      hpadv: { infix: 12, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 4, inrnd: 3, lofix: 0, lornd: 2, hifix: 0, hirnd: 2 },
      initrecord: 0 },
    { abbr: 'Ran', name: { m: 'Ranger', f: 'Ranger' }, rank: { m: 'Tenderfoot', f: 'Tenderfoot' }, mnum: 7,
      allows: { align: [0, -1], races: ['human', 'elf', 'gnome', 'orc'], gender: 'any' },
      attrbase: [13, 13, 13, 9, 13, 7], attrdist: [30, 10, 10, 20, 20, 10],
      hpadv: { infix: 13, inrnd: 0, lofix: 0, lornd: 6, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 9 },
    { abbr: 'Rog', name: { m: 'Rogue', f: 'Rogue' }, rank: { m: 'Footpad', f: 'Footpad' }, mnum: 8,
      allows: { align: [-1], races: ['human', 'orc'], gender: 'any' },
      attrbase: [7, 7, 7, 10, 7, 6], attrdist: [20, 10, 10, 30, 20, 10],
      hpadv: { infix: 10, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 10 },
    { abbr: 'Sam', name: { m: 'Samurai', f: 'Samurai' }, rank: { m: 'Hatamoto', f: 'Hatamoto' }, mnum: 9,
      allows: { align: [1], races: ['human'], gender: 'any' },
      attrbase: [10, 8, 7, 10, 17, 6], attrdist: [30, 10, 8, 30, 14, 8],
      hpadv: { infix: 13, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 10 },
    { abbr: 'Tou', name: { m: 'Tourist', f: 'Tourist' }, rank: { m: 'Rambler', f: 'Rambler' }, mnum: 10,
      allows: { align: [0], races: ['human'], gender: 'any' },
      attrbase: [7, 10, 6, 7, 7, 10], attrdist: [15, 10, 10, 15, 30, 20],
      hpadv: { infix: 8, inrnd: 0, lofix: 0, lornd: 8, hifix: 0, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 0 },
    { abbr: 'Val', name: { m: 'Valkyrie', f: 'Valkyrie' }, rank: { m: 'Stripling', f: 'Stripling' }, mnum: 11,
      allows: { align: [1, 0], races: ['human', 'dwarf'], gender: 'female' },
      attrbase: [10, 7, 7, 7, 10, 7], attrdist: [30, 6, 7, 20, 30, 7],
      hpadv: { infix: 14, inrnd: 0, lofix: 0, lornd: 8, hifix: 2, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 1 },
      initrecord: 0 },
    { abbr: 'Wiz', name: { m: 'Wizard', f: 'Wizard' }, rank: { m: 'Evoker', f: 'Evoker' }, mnum: 12,
      allows: { align: [0, -1], races: ['human', 'elf', 'gnome', 'orc'], gender: 'any' },
      attrbase: [7, 10, 7, 7, 7, 7], attrdist: [10, 30, 10, 20, 20, 10],
      hpadv: { infix: 10, inrnd: 0, lofix: 0, lornd: 8, hifix: 1, hirnd: 0 },
      enadv: { infix: 4, inrnd: 3, lofix: 0, lornd: 2, hifix: 0, hirnd: 3 },
      initrecord: 0 },
];

/** @type {{ name: string, adj: string, mnum: number, filecode?: string, permonst?: import('./mondata.js').Permonst, attrmin: number[], attrmax: number[], hpadv: RoleAdvance, enadv: RoleAdvance }[]} */
export const races = [
    { name: 'human', adj: 'human', mnum: 0, filecode: 'Hum', permonst: permonstHuman,
      attrmin: [3, 3, 3, 3, 3, 3], attrmax: [STR18(100), 18, 18, 18, 18, 18],
      hpadv: { infix: 2, inrnd: 0, lofix: 0, lornd: 2, hifix: 1, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 2, lornd: 0, hifix: 2, hirnd: 0 } },
    { name: 'elf', adj: 'elven', mnum: 1, filecode: 'Elf', permonst: permonstHuman,
      attrmin: [3, 3, 3, 3, 3, 3], attrmax: [18, 20, 20, 18, 16, 18],
      hpadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 1, hirnd: 0 },
      enadv: { infix: 2, inrnd: 0, lofix: 3, lornd: 0, hifix: 3, hirnd: 0 } },
    { name: 'dwarf', adj: 'dwarven', mnum: 2, filecode: 'Dwa', permonst: permonstHuman,
      attrmin: [3, 3, 3, 3, 3, 3], attrmax: [STR18(100), 16, 16, 20, 20, 16],
      hpadv: { infix: 4, inrnd: 0, lofix: 0, lornd: 3, hifix: 2, hirnd: 0 },
      enadv: { infix: 0, inrnd: 0, lofix: 0, lornd: 0, hifix: 0, hirnd: 0 } },
    { name: 'gnome', adj: 'gnomish', mnum: 3, filecode: 'Gno', permonst: permonstHuman,
      attrmin: [3, 3, 3, 3, 3, 3], attrmax: [STR18(50), 19, 18, 18, 18, 18],
      hpadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 0 },
      enadv: { infix: 2, inrnd: 0, lofix: 2, lornd: 0, hifix: 2, hirnd: 0 } },
    { name: 'orc', adj: 'orcish', mnum: 4, filecode: 'Orc', permonst: permonstHuman,
      attrmin: [3, 3, 3, 3, 3, 3], attrmax: [STR18(50), 16, 16, 18, 18, 16],
      hpadv: { infix: 1, inrnd: 0, lofix: 0, lornd: 1, hifix: 0, hirnd: 0 },
      enadv: { infix: 1, inrnd: 0, lofix: 1, lornd: 0, hifix: 1, hirnd: 0 } },
];

export const aligns = [
    { name: 'lawful', value: 1, adj: 'lawful', filecode: 'Law', plPrefix: ['law'] },
    { name: 'neutral', value: 0, adj: 'neutral', filecode: 'Neu', plPrefix: ['balance', 'neu'] },
    { name: 'chaotic', value: -1, adj: 'chaotic', filecode: 'Cha', plPrefix: ['chaos', 'cha'] },
];

/** C: hack.c genders[] — welcome() uses genders[currentgend].adj when the role has no name.f pointer in C. */
export const genders = [
    { name: 'male', value: 0, adj: 'male', filecode: 'Mal' },
    { name: 'female', value: 1, adj: 'female', filecode: 'Fem' },
];

/**
 * C: role.c roles[].name — welcome() in allmain.c gates genders[].adj on !gu.urole.name.f.
 * Only Cave and Priest use a non-NULL second hero title (Cavewoman, Priestess).
 * @param {RoleRow | null | undefined} role
 */
export function roleHasFemaleRoleNameLikeC(role) {
    const a = role?.abbr;
    return a === 'Cav' || a === 'Pri';
}

export function findRole(name) {
    if (!name) return null;
    const lc = name.toLowerCase();
    return roles.find((r) => r.name.m.toLowerCase() === lc || r.name.f.toLowerCase() === lc);
}

export function findRoleByAbbr(abbr) {
    if (!abbr) return null;
    const lc = abbr.trim().toLowerCase();
    return roles.find((r) => r.abbr.toLowerCase() === lc);
}

export function findRace(name) {
    if (!name) return null;
    const lc = name.toLowerCase();
    return races.find((r) =>
        r.name.toLowerCase() === lc
        || r.adj.toLowerCase() === lc
        || (r.filecode && r.filecode.toLowerCase() === lc));
}

/**
 * @param {string} name — "lawful", "neutral", "chaotic", or common abbreviations.
 */
export function findAlign(name) {
    if (!name) return null;
    const lc = name.toLowerCase().trim();
    if (lc.startsWith('law') || lc === 'l') return aligns.find((a) => a.name === 'lawful');
    if (lc.startsWith('cha') || lc === 'c') return aligns.find((a) => a.name === 'chaotic');
    if (lc.startsWith('neu') || lc === 'n') return aligns.find((a) => a.name === 'neutral');
    return aligns.find((a) => a.name === lc);
}

/** C **`role.c`** **`str2*`** sentinel: no match. */
export const STR2_NONE = -1;
/** C **`ROLE_RANDOM`** / **`randomstr`** branch in **`str2role`** / **`str2race`** / … */
export const STR2_RANDOM = -2;

/**
 * C **`role.c`** **`role_selection_prolog`** — local **`r`/`c`/`gend`/`a`** tightening for recap text:
 * human-only role → human race; invalid race for role → **`STR2_RANDOM`**; forced gender; single allowed align;
 * orc → chaotic (**`aligns[]`** index). Mutates **`f`** — call only when **`initrole`** is set **and** all four
 * facets are valid indices (confirm / **`applyChargenFlagsToGame`**), not mid-hub with **`ROLE_NONE`** races.
 * @param {{ initrole: number, initrace: number, initgend: number, initalign: number }} f
 */
export function coerceChargenIndicesForRoleSelectionPrologLikeC(f) {
    const r = f.initrole;
    if (r < 0 || r >= roles.length) return;
    const role = roles[r];
    const allowedRaces = role.allows.races;
    if (allowedRaces.length === 1 && allowedRaces[0] === 'human') {
        f.initrace = races.findIndex((x) => x.name === 'human');
    } else if (f.initrace >= 0 && f.initrace < races.length
        && !allowedRaces.includes(races[f.initrace].name)) {
        f.initrace = STR2_RANDOM;
    }
    if (role.allows.gender === 'male') f.initgend = 0;
    else if (role.allows.gender === 'female') f.initgend = 1;
    const ra = role.allows.align;
    if (ra.length === 1) {
        const ai = aligns.findIndex((a) => a.value === ra[0]);
        if (ai >= 0) f.initalign = ai;
    }
    if (f.initrace >= 0 && f.initrace < races.length && races[f.initrace].name === 'orc') {
        const ai = aligns.findIndex((a) => a.value === -1);
        if (ai >= 0) f.initalign = ai;
    }
}

/**
 * C **`role.c`** **`strncmpi(str, nm, len)`** with **`len == Strlen(str)`** — prefix of **`nm`** equals **`str`** (case-insensitive).
 * @param {string} str
 * @param {string} nm
 */
function strPrefixMatchNhLikeC(str, nm) {
    const n = str.length;
    if (!n || !nm) return false;
    if (n > nm.length) return false;
    return nm.slice(0, n).toLowerCase() === str.toLowerCase();
}

function str2RandomTokenLikeC(str) {
    const t = str.trim();
    const len = t.length;
    if (!len) return false;
    if (len === 1 && (t === '*' || t === '@')) return true;
    return strPrefixMatchNhLikeC(t, 'random');
}

/**
 * C **`role.c`** **`str2role`** — male/female name prefix, **`filecode`** (**`abbr`** in JS); **`*`/`@`/`random`**.
 * @param {string} str
 * @returns {number} role index **`0..roles.length-1`**, **`STR2_NONE`**, or **`STR2_RANDOM`**
 */
export function str2roleIndexLikeC(str) {
    if (!str || !str.trim()) return STR2_NONE;
    const t = str.trim();
    if (str2RandomTokenLikeC(t)) return STR2_RANDOM;
    for (let i = 0; i < roles.length; i++) {
        const r = roles[i];
        if (strPrefixMatchNhLikeC(t, r.name.m)) return i;
        if (r.name.f && strPrefixMatchNhLikeC(t, r.name.f)) return i;
        if (t.toLowerCase() === r.abbr.toLowerCase()) return i;
    }
    return STR2_NONE;
}

/**
 * C **`role.c`** **`str2race`** — noun/adj prefix, **`filecode`** exact (case-insensitive).
 * @param {string} str
 * @returns {number} race index, **`STR2_NONE`**, or **`STR2_RANDOM`**
 */
export function str2raceIndexLikeC(str) {
    if (!str || !str.trim()) return STR2_NONE;
    const t = str.trim();
    if (str2RandomTokenLikeC(t)) return STR2_RANDOM;
    for (let i = 0; i < races.length; i++) {
        const r = races[i];
        if (strPrefixMatchNhLikeC(t, r.name)) return i;
        if (strPrefixMatchNhLikeC(t, r.adj)) return i;
        if (r.filecode && t.toLowerCase() === r.filecode.toLowerCase()) return i;
    }
    return STR2_NONE;
}

/**
 * C **`role.c`** **`str2gend`** — adjective prefix, **`filecode`** exact.
 * @param {string} str
 * @returns {number} **`0`** male, **`1`** female, **`STR2_NONE`**, or **`STR2_RANDOM`**
 */
export function str2gendIndexLikeC(str) {
    if (!str || !str.trim()) return STR2_NONE;
    const t = str.trim();
    if (str2RandomTokenLikeC(t)) return STR2_RANDOM;
    for (let i = 0; i < genders.length; i++) {
        const g = genders[i];
        if (strPrefixMatchNhLikeC(t, g.adj)) return i;
        if (g.filecode && t.toLowerCase() === g.filecode.toLowerCase()) return i;
    }
    return STR2_NONE;
}

/**
 * C **`role.c`** **`str2align`** — **`aligns[i].adj`** prefix + **`filecode`**; skips C-only unaligned row.
 * @param {string} str
 * @returns {number} **`aligns`** index **`0..aligns.length-1`**, **`STR2_NONE`**, or **`STR2_RANDOM`**
 */
export function str2alignIndexLikeC(str) {
    if (!str || !str.trim()) return STR2_NONE;
    const t = str.trim();
    if (str2RandomTokenLikeC(t)) return STR2_RANDOM;
    for (let i = 0; i < aligns.length; i++) {
        const a = aligns[i];
        if (a.filecode && t.toLowerCase() === a.filecode.toLowerCase()) return i;
        if (a.adj && strPrefixMatchNhLikeC(t, a.adj)) return i;
        const prefs = a.plPrefix;
        if (prefs) {
            for (const p of prefs) {
                if (strPrefixMatchNhLikeC(t, p)) return i;
            }
        }
    }
    return STR2_NONE;
}

/** C: **`role.c`** **`roles[rolenum].allow & races[i].allow & ROLE_RACEMASK`** — JS uses **`allows.races`**. */
function roleRaceMaskOkLikeC(role, raceRow) {
    return role.allows.races.includes(raceRow.name);
}

/**
 * C: **`role.c`** **`validrole(int rolenum)`** — **`IndexOkT(rolenum, roles)`**.
 * @param {number} rolenum
 * @returns {boolean}
 */
export function validroleLikeC(rolenum) {
    const ri = rolenum | 0;
    return ri >= 0 && ri < roles.length;
}

/**
 * C: **`role.c`** **`validrace(int rolenum, int racenum)`** — role **`ROLE_RACEMASK`** ∩ race (**`allows.races`** in JS).
 * @param {number} rolenum
 * @param {number} racenum
 * @returns {boolean}
 */
export function validraceLikeC(rolenum, racenum) {
    const rai = racenum | 0;
    if (!validroleLikeC(rolenum)) return false;
    if (rai < 0 || rai >= races.length) return false;
    return roleRaceMaskOkLikeC(roles[rolenum | 0], races[rai]);
}

/**
 * C: **`role.c`** **`randrace(int rolenum)`** — count permitted races in **`races[]`** order, then **`rn2(n*100)/100`**.
 * @param {number} rolenum
 * @returns {number} race index **`0..races.length-1`**
 */
export function randraceLikeC(rolenum) {
    const ri = rolenum | 0;
    const role = roles[ri];
    if (!role) return rn2(races.length);

    let n = 0;
    for (let i = 0; i < races.length; i++) {
        if (roleRaceMaskOkLikeC(role, races[i])) n++;
    }
    let pick = 0;
    if (n) pick = (rn2(n * 100) / 100) | 0;
    for (let i = 0; i < races.length; i++) {
        if (!roleRaceMaskOkLikeC(role, races[i])) continue;
        if (pick) pick--;
        else return i;
    }
    return rn2(races.length);
}

/**
 * C: **`role.c`** **`validalign(int rolenum, int racenum, int alignnum)`** — **`alignnum`** is **`aligns[]`** index (**`ROLE_ALIGNS`**).
 * Assumes valid role/race pair (**`validraceLikeC`**).
 * @param {number} rolenum
 * @param {number} racenum
 * @param {number} alignnum
 * @returns {boolean}
 */
export function validalignLikeC(rolenum, racenum, alignnum) {
    if (!validraceLikeC(rolenum, racenum)) return false;
    const ai = alignnum | 0;
    if (ai < 0 || ai >= aligns.length) return false;
    const race = races[racenum | 0];
    const av = aligns[ai].value;
    const role = roles[rolenum | 0];
    if (!role.allows.align.includes(av)) return false;
    if (race.name === 'orc' && av !== -1) return false;
    return true;
}

/**
 * C: **`role.c`** **`randalign(int rolenum, int racenum)`** — bitmask intersection; JS uses **`allows.align`** + orc chaotic-only.
 * @param {number} rolenum
 * @param {number} racenum
 * @returns {number} align index **`0..aligns.length-1`**
 */
export function randalignLikeC(rolenum, racenum) {
    const role = roles[rolenum | 0];
    const race = races[racenum | 0];
    if (!role || !race) return rn2(aligns.length);

    let n = 0;
    for (let i = 0; i < aligns.length; i++) {
        if (validalignLikeC(rolenum | 0, racenum | 0, i)) n++;
    }
    let pick = 0;
    if (n) pick = rn2(n);
    for (let i = 0; i < aligns.length; i++) {
        if (!validalignLikeC(rolenum | 0, racenum | 0, i)) continue;
        if (pick) pick--;
        else return i;
    }
    return rn2(aligns.length);
}

/**
 * C: **`role.c`** **`validgend(int rolenum, int racenum, int gendnum)`** — **`gendnum`** 0 male, 1 female.
 * JS uses **`roles[].allows.gender`**; playable **`races[]`** mirror NH5 **both** genders when role is **`any`**.
 * @param {number} rolenum
 * @param {number} racenum
 * @param {number} gendnum
 * @returns {boolean}
 */
export function validgendLikeC(rolenum, racenum, gendnum) {
    const gi = gendnum | 0;
    if (gi < 0 || gi > 1) return false;
    const role = roles[rolenum | 0];
    const race = races[racenum | 0];
    if (!role || !race) return false;
    const ag = role.allows.gender;
    if (ag === 'female' && gi !== 1) return false;
    if (ag === 'male' && gi !== 0) return false;
    return true;
}

/**
 * C: **`role.c`** **`randgend(int rolenum, int racenum)`** — count valid genders, **`rn2(n)`**, walk 0..**`ROLE_GENDERS-1`**.
 * @param {number} rolenum
 * @param {number} racenum
 * @returns {number} **`0`** male, **`1`** female
 */
export function randgendLikeC(rolenum, racenum) {
    const role = roles[rolenum | 0];
    const race = races[racenum | 0];
    if (!role || !race) return rn2(2);

    let n = 0;
    if (validgendLikeC(rolenum, racenum, 0)) n++;
    if (validgendLikeC(rolenum, racenum, 1)) n++;
    let pick = 0;
    if (n) pick = rn2(n);
    for (let gi = 0; gi < 2; gi++) {
        if (!validgendLikeC(rolenum, racenum, gi)) continue;
        if (pick) pick--;
        else return gi;
    }
    return rn2(2);
}

/**
 * C: rigid_role_checks() / role_init() — clamp OPTIONS to a legal triple for this role.
 * Invalid race → **`validrace`** / **`randrace`**; **`validgend`** flip + **`randgend`** tail; invalid alignment → **`validalign`** / **`randalign`**
 * (**`role_init`** order: race, gender, align).
 * @param {RoleRow} role
 * @param {{ name: string, adj: string, mnum: number, filecode?: string, permonst?: import('./mondata.js').Permonst, attrmin: number[], attrmax: number[] }} race
 * @param {number} alignType
 * @param {boolean} female
 */
export function coerceChargenIdentity(role, race, alignType, female) {
    const a = role.allows;
    const ri = roles.indexOf(role);

    let r = race;
    const raiInit = races.indexOf(r);
    if (ri < 0 || raiInit < 0 || !validraceLikeC(ri, raiInit)) {
        r =
            ri >= 0
                ? races[randraceLikeC(ri)]
                : /** @type {typeof races[0]} */ (findRace(a.races[0]));
    }

    const rai = races.indexOf(r);
    let f = female;
    /* C: **`role_init`** **`flags.pantheon == -1`** — **`validgend`**(…, **`flags.female`**) then flip **`flags.female`**. */
    if (ri >= 0 && rai >= 0) {
        const g0 = f ? 1 : 0;
        if (!validgendLikeC(ri, rai, g0)) f = !f;
    }
    if (a.gender === 'female') f = true;
    else if (a.gender === 'male') f = false;
    /* C: **`!validgend`**(…, **`initgend`**) → **`initgend = flags.female`** — use **`randgend`** if still invalid. */
    if (ri >= 0 && rai >= 0) {
        const g1 = f ? 1 : 0;
        if (!validgendLikeC(ri, rai, g1)) f = randgendLikeC(ri, rai) === 1;
    }

    let al = alignType;
    const aiUse = aligns.findIndex((x) => x.value === al);
    const alignLegal = ri >= 0 && rai >= 0 && aiUse >= 0 && validalignLikeC(ri, rai, aiUse);
    if (!alignLegal) {
        al =
            ri >= 0 && rai >= 0
                ? aligns[randalignLikeC(ri, rai)].value
                : a.align[0];
    }

    return { race: r, alignType: al, female: f };
}
