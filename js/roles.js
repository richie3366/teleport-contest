// roles.js — Role, race, gender, alignment data.
// C ref: role.c — roles[], races[], aligns[] (NetHack 5.0.0); randrace(), randalign(),
//       randgend(), validgend(); role_init() repair vs coerceChargenIdentity.
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
    { name: 'lawful', value: 1 },
    { name: 'neutral', value: 0 },
    { name: 'chaotic', value: -1 },
];

/** C: hack.c genders[] — welcome() uses genders[currentgend].adj when the role has no name.f pointer in C. */
export const genders = [
    { name: 'male', value: 0, adj: 'male' },
    { name: 'female', value: 1, adj: 'female' },
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

/** C: **`role.c`** **`roles[rolenum].allow & races[i].allow & ROLE_RACEMASK`** — JS uses **`allows.races`**. */
function roleRaceMaskOkLikeC(role, raceRow) {
    return role.allows.races.includes(raceRow.name);
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
        const av = aligns[i].value;
        if (!role.allows.align.includes(av)) continue;
        if (race.name === 'orc' && av !== -1) continue;
        n++;
    }
    let pick = 0;
    if (n) pick = rn2(n);
    for (let i = 0; i < aligns.length; i++) {
        const av = aligns[i].value;
        if (!role.allows.align.includes(av)) continue;
        if (race.name === 'orc' && av !== -1) continue;
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
 * Invalid race → **`randrace`**; **`validgend`** flip + **`randgend`** tail; invalid alignment → **`randalign`**
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
    if (!a.races.includes(r.name)) {
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
    const alignLegal =
        a.align.includes(al) && !(r.name === 'orc' && al !== -1);
    if (!alignLegal) {
        al =
            ri >= 0 && rai >= 0
                ? aligns[randalignLikeC(ri, rai)].value
                : a.align[0];
    }

    return { race: r, alignType: al, female: f };
}
