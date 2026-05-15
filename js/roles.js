// roles.js — Role, race, gender, alignment data.
// C ref: role.c — roles[], races[], aligns[] (NetHack 5.0.0).
//
// `rank` is the XL 1 title (first row in role.c for each role).

import { permonstHuman } from './mondata.js';

/** @typedef {{ name: { m: string, f: string }, rank: { m: string, f: string }, mnum: number, abbr: string }} RoleRow */

/** @type {RoleRow[]} */
export const roles = [
    { abbr: 'Arc', name: { m: 'Archeologist', f: 'Archeologist' }, rank: { m: 'Digger', f: 'Digger' }, mnum: 0 },
    { abbr: 'Bar', name: { m: 'Barbarian', f: 'Barbarian' }, rank: { m: 'Plunderer', f: 'Plunderess' }, mnum: 1 },
    { abbr: 'Cav', name: { m: 'Caveman', f: 'Cavewoman' }, rank: { m: 'Troglodyte', f: 'Troglodyte' }, mnum: 2 },
    { abbr: 'Hea', name: { m: 'Healer', f: 'Healer' }, rank: { m: 'Rhizotomist', f: 'Rhizotomist' }, mnum: 3 },
    { abbr: 'Kni', name: { m: 'Knight', f: 'Knight' }, rank: { m: 'Gallant', f: 'Gallant' }, mnum: 4 },
    { abbr: 'Mon', name: { m: 'Monk', f: 'Monk' }, rank: { m: 'Candidate', f: 'Candidate' }, mnum: 5 },
    { abbr: 'Pri', name: { m: 'Priest', f: 'Priestess' }, rank: { m: 'Aspirant', f: 'Aspirant' }, mnum: 6 },
    { abbr: 'Ran', name: { m: 'Ranger', f: 'Ranger' }, rank: { m: 'Tenderfoot', f: 'Tenderfoot' }, mnum: 7 },
    { abbr: 'Rog', name: { m: 'Rogue', f: 'Rogue' }, rank: { m: 'Footpad', f: 'Footpad' }, mnum: 8 },
    { abbr: 'Sam', name: { m: 'Samurai', f: 'Samurai' }, rank: { m: 'Hatamoto', f: 'Hatamoto' }, mnum: 9 },
    { abbr: 'Tou', name: { m: 'Tourist', f: 'Tourist' }, rank: { m: 'Rambler', f: 'Rambler' }, mnum: 10 },
    { abbr: 'Val', name: { m: 'Valkyrie', f: 'Valkyrie' }, rank: { m: 'Stripling', f: 'Stripling' }, mnum: 11 },
    { abbr: 'Wiz', name: { m: 'Wizard', f: 'Wizard' }, rank: { m: 'Evoker', f: 'Evoker' }, mnum: 12 },
];

/** @type {{ name: string, adj: string, mnum: number, filecode?: string, permonst?: import('./mondata.js').Permonst }[]} */
export const races = [
    { name: 'human', adj: 'human', mnum: 0, filecode: 'Hum', permonst: permonstHuman },
    { name: 'elf', adj: 'elven', mnum: 1, filecode: 'Elf', permonst: permonstHuman },
    { name: 'dwarf', adj: 'dwarven', mnum: 2, filecode: 'Dwa', permonst: permonstHuman },
    { name: 'gnome', adj: 'gnomish', mnum: 3, filecode: 'Gno', permonst: permonstHuman },
    { name: 'orc', adj: 'orcish', mnum: 4, filecode: 'Orc', permonst: permonstHuman },
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
