// chargen_rigid.js — C role.c pick_* + rigid_role_checks.
// C ref: role.c — ok_role, ok_race, ok_gend, ok_align, pick_role, pick_race,
// pick_gend, pick_align, rigid_role_checks. Tty **`gr.rfilter`** substring UI
// lives in **`chargen_tty.js`** (role list only); predicates here stay rfilter-free.

import { rn2 } from './rng.js';
import { roles, races, aligns, genders } from './roles.js';

export const ROLE_NONE = -1;
export const ROLE_RANDOM = -2;
export const PICK_RANDOM = 0;
export const PICK_RIGID = 1;

/** @typedef {{ initrole: number, initrace: number, initgend: number, initalign: number }} ChargenFlags */

function indexOkRole(ri) {
    return ri >= 0 && ri < roles.length;
}
function indexOkRace(rai) {
    return rai >= 0 && rai < races.length;
}
function indexOkAlign(ai) {
    return ai >= 0 && ai < aligns.length;
}
function indexOkGend(gi) {
    return gi >= 0 && gi < genders.length;
}

/** C ok_role — simplified: uses roles[].allows vs races[genders[aligns]]. */
export function okRoleJs(ri, rai, gi, ai) {
    if (!indexOkRole(ri)) return false;
    const role = roles[ri];
    if (indexOkRace(rai)) {
        const rn = races[rai].name;
        if (!role.allows.races.includes(rn)) return false;
    }
    if (gi >= 0 && gi < genders.length) {
        const gv = genders[gi].value;
        if (role.allows.gender === 'female' && gv !== 1) return false;
        if (role.allows.gender === 'male' && gv !== 0) return false;
    }
    if (ai >= 0 && ai < aligns.length) {
        const av = aligns[ai].value;
        if (!role.allows.align.includes(av)) return false;
    }
    return true;
}

export function okRaceJs(ri, rai, gi, ai) {
    if (rai === ROLE_RANDOM) {
        for (let i = 0; i < races.length; i++) {
            if (okRaceJs(ri, i, gi, ai)) return true;
        }
        return false;
    }
    if (!indexOkRace(rai)) return false;
    const race = races[rai];
    if (indexOkRole(ri)) {
        const role = roles[ri];
        if (!role.allows.races.includes(race.name)) return false;
    }
    if (indexOkGend(gi)) {
        const gv = genders[gi].value;
        if (race.name === 'human' || race.name === 'elf' || race.name === 'dwarf' || race.name === 'gnome' || race.name === 'orc') {
            /* C uses genders[].allow bitmasks; JS table: all playable races allow both unless role restricts */
            if (indexOkRole(ri)) {
                const role = roles[ri];
                if (role.allows.gender === 'female' && gv !== 1) return false;
                if (role.allows.gender === 'male' && gv !== 0) return false;
            }
        }
    }
    if (indexOkAlign(ai)) {
        const av = aligns[ai].value;
        if (indexOkRole(ri)) {
            if (!roles[ri].allows.align.includes(av)) return false;
        }
        /* race vs align: orc chaotic-only in C — aligns with roles.js Rogue/orc */
        if (race.name === 'orc' && av !== -1) return false;
    }
    return true;
}

export function okGendJs(ri, rai, gi, ai) {
    if (gi === ROLE_RANDOM) {
        for (let i = 0; i < genders.length; i++) {
            if (okGendJs(ri, rai, i, ai)) return true;
        }
        return false;
    }
    if (!indexOkGend(gi)) return false;
    const gv = genders[gi].value;
    if (indexOkRole(ri)) {
        const role = roles[ri];
        if (role.allows.gender === 'female' && gv !== 1) return false;
        if (role.allows.gender === 'male' && gv !== 0) return false;
    }
    if (indexOkRace(rai)) {
        const race = races[rai];
        if (race.name === 'orc' && indexOkAlign(ai) && aligns[ai].value !== -1) return false;
    }
    if (indexOkAlign(ai)) {
        const av = aligns[ai].value;
        if (indexOkRole(ri) && !roles[ri].allows.align.includes(av)) return false;
    }
    return true;
}

export function okAlignJs(ri, rai, gi, ai) {
    if (ai === ROLE_RANDOM) {
        for (let j = 0; j < aligns.length; j++) {
            if (okAlignJs(ri, rai, gi, j)) return true;
        }
        return false;
    }
    if (!indexOkAlign(ai)) return false;
    const av = aligns[ai].value;
    if (indexOkRole(ri) && !roles[ri].allows.align.includes(av)) return false;
    if (indexOkRace(rai)) {
        const race = races[rai];
        if (race.name === 'orc' && av !== -1) return false;
    }
    return true;
}

export function pickAlignJs(ri, rai, gi, pickhow) {
    let cnt = 0;
    for (let ai = 0; ai < aligns.length; ai++) {
        if (okAlignJs(ri, rai, gi, ai)) cnt++;
    }
    if (cnt === 0 || (cnt > 1 && pickhow === PICK_RIGID)) return ROLE_NONE;
    let pick = rn2(cnt);
    for (let ai = 0; ai < aligns.length; ai++) {
        if (!okAlignJs(ri, rai, gi, ai)) continue;
        if (pick === 0) return ai;
        pick--;
    }
    return ROLE_NONE;
}

export function pickRaceJs(ri, gi, ai, pickhow) {
    let cnt = 0;
    for (let rai = 0; rai < races.length; rai++) {
        if (okRaceJs(ri, rai, gi, ai)) cnt++;
    }
    if (cnt === 0 || (cnt > 1 && pickhow === PICK_RIGID)) return ROLE_NONE;
    let pick = rn2(cnt);
    for (let rai = 0; rai < races.length; rai++) {
        if (!okRaceJs(ri, rai, gi, ai)) continue;
        if (pick === 0) return rai;
        pick--;
    }
    return ROLE_NONE;
}

export function pickRoleJs(rai, gi, ai, pickhow) {
    const acc = [];
    for (let ri = 0; ri < roles.length; ri++) {
        if (okRoleJs(ri, rai >= 0 ? rai : ROLE_RANDOM, gi >= 0 ? gi : ROLE_RANDOM, ai >= 0 ? ai : ROLE_RANDOM)
            && okRaceJs(ri, rai >= 0 ? rai : ROLE_RANDOM, gi >= 0 ? gi : ROLE_RANDOM, ai >= 0 ? ai : ROLE_RANDOM)
            && okGendJs(ri, rai >= 0 ? rai : ROLE_RANDOM, gi >= 0 ? gi : ROLE_RANDOM, ai >= 0 ? ai : ROLE_RANDOM)
            && okAlignJs(ri, rai >= 0 ? rai : ROLE_RANDOM, gi >= 0 ? gi : ROLE_RANDOM, ai >= 0 ? ai : ROLE_RANDOM)) {
            acc.push(ri);
        }
    }
    if (acc.length === 0 || (acc.length > 1 && pickhow === PICK_RIGID)) return ROLE_NONE;
    return acc[rn2(acc.length)];
}

export function pickGendJs(ri, rai, ai, pickhow) {
    let cnt = 0;
    for (let gi = 0; gi < genders.length; gi++) {
        if (okGendJs(ri, rai, gi, ai)) cnt++;
    }
    if (cnt === 0 || (cnt > 1 && pickhow === PICK_RIGID)) return ROLE_NONE;
    let pick = rn2(cnt);
    for (let gi = 0; gi < genders.length; gi++) {
        if (!okGendJs(ri, rai, gi, ai)) continue;
        if (pick === 0) return gi;
        pick--;
    }
    return ROLE_NONE;
}

/**
 * C rigid_role_checks() — order matches role.c:1270–1279 when initrole set.
 * @param {ChargenFlags} f
 */
export function rigidRoleChecksJs(f) {
    if (f.initrole === ROLE_RANDOM) {
        f.initrole = pickRoleJs(f.initrace, f.initgend, f.initalign, PICK_RANDOM);
    }
    if (f.initrace === ROLE_RANDOM) {
        const t = pickRaceJs(f.initrole, f.initgend, f.initalign, PICK_RANDOM);
        if (t !== ROLE_NONE) f.initrace = t;
    }
    if (f.initalign === ROLE_RANDOM) {
        const t = pickAlignJs(f.initrole, f.initrace, f.initgend, PICK_RANDOM);
        if (t !== ROLE_NONE) f.initalign = t;
    }
    if (f.initgend === ROLE_RANDOM) {
        const t = pickGendJs(f.initrole, f.initrace, f.initalign, PICK_RANDOM);
        if (t !== ROLE_NONE) f.initgend = t;
    }

    if (f.initrole !== ROLE_NONE) {
        if (f.initrace === ROLE_NONE) {
            const t = pickRaceJs(f.initrole, f.initgend, f.initalign, PICK_RIGID);
            if (t !== ROLE_NONE) f.initrace = t;
        }
        if (f.initalign === ROLE_NONE) {
            const t = pickAlignJs(f.initrole, f.initrace, f.initgend, PICK_RIGID);
            if (t !== ROLE_NONE) f.initalign = t;
        }
        if (f.initgend === ROLE_NONE) {
            const t = pickGendJs(f.initrole, f.initrace, f.initalign, PICK_RIGID);
            if (t !== ROLE_NONE) f.initgend = t;
        }
    }
}
