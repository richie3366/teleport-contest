// chargen.js — Map parsed nethackrc identity into live game fields.
// C ref: u_init.c, role.c (roles[], races[], aligns, plnamesuffix, str2role/race/gend/align), options.c role/race parsing.

import {
    findRole,
    findRoleByAbbr,
    findRace,
    findAlign,
    coerceChargenIdentity,
    roles,
    races,
    aligns,
    str2roleIndexLikeC,
    str2raceIndexLikeC,
    str2gendIndexLikeC,
    str2alignIndexLikeC,
    STR2_RANDOM,
    randraceLikeC,
    randgendLikeC,
    randalignLikeC,
} from './roles.js';
import { randroleFilteredLikeC } from './chargen_rigid.js';
import { permonstHuman } from './mondata.js';
import { A_CURRENT, A_ORIGINAL } from './const.js';

/**
 * C **`role.c`** **`plnamesuffix`** — strip **`name-role-race-gender-align`** tokens after first **`-`**;
 * commas in the base name → spaces (**`strNsubst`**). Skips C **`sysopt.genericusers`** (not modeled).
 * Mutates **`opts.name`**, **`opts.role`**, **`opts.race`**, **`opts.gender`**, **`opts.align`** like C **`flags.init*`** overwrites.
 * Call only after **`initRng`** when tokens may be **`random`** (**`randrole_filtered`** / **`randrace`** / …).
 * @param {ReturnType<typeof import('./options.js').parseNethackrc>} opts
 */
export function applyPlnameSuffixToOptsLikeC(opts) {
    const raw = typeof opts.name === 'string' ? opts.name : '';
    if (!raw) return;

    const dash = raw.indexOf('-');
    if (dash < 0) {
        opts.name = raw.replace(/,/g, ' ');
        return;
    }

    const base = raw.slice(0, dash).replace(/,/g, ' ');
    const tail = raw.slice(dash + 1);
    const tokens = tail.split('-').map((x) => x.trim()).filter(Boolean);
    opts.name = base;

    function roleIdxFromOpts() {
        if (typeof opts.role === 'string' && opts.role.trim()) {
            const r = findRole(opts.role) || findRoleByAbbr(opts.role);
            if (r) return roles.indexOf(r);
        }
        return roles.indexOf(/** @type {typeof roles[0]} */ (findRole('Tourist')));
    }

    function raceIdxFromOpts() {
        if (typeof opts.race === 'string' && opts.race.trim()) {
            const r = findRace(opts.race);
            if (r) return races.indexOf(r);
        }
        return races.indexOf(/** @type {typeof races[0]} */ (findRace('human')));
    }

    let ri = roleIdxFromOpts();
    let rai = raceIdxFromOpts();

    for (const tok of tokens) {
        const sr = str2roleIndexLikeC(tok);
        if (sr === STR2_RANDOM) {
            ri = randroleFilteredLikeC();
            opts.role = roles[ri].name.m;
            opts.explicitRoleInRc = true;
            continue;
        }
        if (sr >= 0) {
            ri = sr;
            opts.role = roles[ri].name.m;
            opts.explicitRoleInRc = true;
            continue;
        }

        const sra = str2raceIndexLikeC(tok);
        if (sra === STR2_RANDOM) {
            rai = randraceLikeC(ri);
            opts.race = races[rai].name;
            opts.explicitRaceInRc = true;
            continue;
        }
        if (sra >= 0) {
            rai = sra;
            opts.race = races[rai].name;
            opts.explicitRaceInRc = true;
            continue;
        }

        const sg = str2gendIndexLikeC(tok);
        if (sg === STR2_RANDOM) {
            const gix = randgendLikeC(ri, rai);
            opts.gender = gix === 1 ? 'female' : 'male';
            opts.explicitGenderInRc = true;
            continue;
        }
        if (sg >= 0) {
            opts.gender = sg === 1 ? 'female' : 'male';
            opts.explicitGenderInRc = true;
            continue;
        }

        const sa = str2alignIndexLikeC(tok);
        if (sa === STR2_RANDOM) {
            const ai = randalignLikeC(ri, rai);
            opts.align = aligns[ai].name;
            opts.explicitAlignInRc = true;
            continue;
        }
        if (sa >= 0) {
            opts.align = aligns[sa].name;
            opts.explicitAlignInRc = true;
        }
    }

    opts.name = base.replace(/,/g, ' ');
}

/**
 * Apply role, race, gender, and alignment from `parseNethackrc` output.
 * Defaults match the previous hardcoded seed8000 tourist stub when fields are absent.
 * @param {import('./gstate.js').game} g
 * @param {ReturnType<typeof import('./options.js').parseNethackrc>} opts
 */
export function applyIdentityFromNethackrc(g, opts) {
    applyPlnameSuffixToOptsLikeC(opts);
    g.plname = opts.name && String(opts.name).trim() ? String(opts.name).trim() : (g.plname || 'Hero');

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
        const gnd = opts.gender.toLowerCase().trim();
        /* C: options.c / role.c — rc gender tokens (male/female, m/f, mal/fem abbreviations) */
        if (gnd.startsWith('f') || gnd === 'female' || gnd === 'fem') female = true;
        else if (gnd.startsWith('m') || gnd === 'male' || gnd === 'mal') female = false;
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
        /* C: gu.urole — welcome() / rigid checks use ROLE_GENDMASK via allows.gender */
        allows: {
            align: [...role.allows.align],
            races: [...role.allows.races],
            gender: role.allows.gender,
        },
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
