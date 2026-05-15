// roles.js — Role, race, gender, alignment data.
// C ref: role.c — roles[], races[], aligns[] (NetHack 5.0.0).
//
// `rank` is the XL 1 title (first row in role.c for each role).
// `allows` mirrors each role's final selfmask (lawful/neutral/chaotic,
// races, gender): see `roles[]` entries in role.c.

import { permonstHuman } from './mondata.js';
import { STR18 } from './const.js';

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

export const genders = [
    { name: 'male', value: 0 },
    { name: 'female', value: 1 },
];

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

/**
 * C: rigid_role_checks() / role_init() — clamp OPTIONS to a legal triple for this role.
 * @param {RoleRow} role
 * @param {{ name: string, adj: string, mnum: number, filecode?: string, permonst?: import('./mondata.js').Permonst, attrmin: number[], attrmax: number[] }} race
 * @param {number} alignType
 * @param {boolean} female
 */
export function coerceChargenIdentity(role, race, alignType, female) {
    const a = role.allows;
    let r = race;
    if (!a.races.includes(r.name)) r = /** @type {typeof races[0]} */ (findRace(a.races[0]));

    let al = alignType;
    if (!a.align.includes(al)) al = a.align[0];

    let f = female;
    if (a.gender === 'female') f = true;
    else if (a.gender === 'male') f = false;

    return { race: r, alignType: al, female: f };
}
