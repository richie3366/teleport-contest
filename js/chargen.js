// chargen.js — Map parsed nethackrc identity into live game fields.
// C ref: u_init.c, role.c (roles[], races[], aligns), options.c role/race parsing.

import { findRole, findRoleByAbbr, findRace, findAlign, coerceChargenIdentity } from './roles.js';
import { permonstHuman } from './mondata.js';
import { A_CURRENT, A_ORIGINAL } from './const.js';

/**
 * Apply role, race, gender, and alignment from `parseNethackrc` output.
 * Defaults match the previous hardcoded seed8000 tourist stub when fields are absent.
 * @param {import('./gstate.js').game} g
 * @param {ReturnType<typeof import('./options.js').parseNethackrc>} opts
 */
export function applyIdentityFromNethackrc(g, opts) {
    let role = null;
    if (typeof opts.role === 'string' && opts.role.trim()) {
        role = findRole(opts.role) || findRoleByAbbr(opts.role);
    }
    if (!role) role = findRole('Tourist');

    let race = null;
    if (typeof opts.race === 'string' && opts.race.trim()) {
        race = findRace(opts.race);
    }
    if (!race) race = findRace('human');

    let female = true;
    if (typeof opts.gender === 'string' && opts.gender.trim()) {
        const gnd = opts.gender.toLowerCase();
        female = gnd.startsWith('f') || gnd === 'female';
    }

    let alignType = 0;
    if (typeof opts.align === 'string' && opts.align.trim()) {
        const a = findAlign(opts.align);
        if (a) alignType = a.value;
    }

    ({ race, alignType, female } = coerceChargenIdentity(role, race, alignType, female));

    g.flags = g.flags || {};
    g.flags.female = female;

    g.u = g.u || {};
    g.u.ualign = g.u.ualign || { type: 0, record: 0 };
    g.u.ualign.type = alignType;
    /* C: attrib.c newhp — u.ualign.record = gu.urole.initrecord (after u cleared; chargen sets early) */
    g.u.ualign.record = role.initrecord ?? 0;
    /* C: u_init.c u_init_role — u.ualignbase[A_CURRENT] = u.ualignbase[A_ORIGINAL] = u.ualign.type */
    g.u.ualignbase = g.u.ualignbase || [];
    g.u.ualignbase[A_CURRENT] = alignType;
    g.u.ualignbase[A_ORIGINAL] = alignType;

    g.urole = {
        abbr: role.abbr,
        name: { m: role.name.m, f: role.name.f },
        rank: { m: role.rank.m, f: role.rank.f },
        mnum: role.mnum,
        attrbase: [...role.attrbase],
        attrdist: [...role.attrdist],
        hpadv: { ...role.hpadv },
        enadv: { ...role.enadv },
        initrecord: role.initrecord ?? 0,
    };

    g.urace = {
        name: race.name,
        adj: race.adj,
        mnum: race.mnum,
        attrmin: [...race.attrmin],
        attrmax: [...race.attrmax],
        hpadv: { ...race.hpadv },
        enadv: { ...race.enadv },
        permonst: race.permonst ?? permonstHuman,
    };

    g.youmonst = g.youmonst || {};
    g.youmonst.data = race.permonst ?? permonstHuman;
}
