// search.js — Trap / secret-door search (#search).
// C ref: detect.c dosearch(), dosearch0(int), find_trap(), mfind0(), cvt_sdoor_to_door();
//       trap.c activate_statue_trap() (stubbed until animate_statue exists).
//
// Neighbor iteration and rnl/rn2 usage follow upstream; fund (artifact search,
// lenses) is stubbed until inventory and objects are wired.

import { game } from './gstate.js';
import { rn2, rnl } from './rng.js';
import { pline, newsym } from './display.js';
import { vision_recalc } from './vision.js';
import {
    isok,
    u_at,
    SDOOR,
    SCORR,
    DOOR,
    CORR,
    D_CLOSED,
    D_LOCKED,
    STATUE_TRAP,
    ARROW_TRAP,
    DART_TRAP,
    ROCKTRAP,
    SQKY_BOARD,
    BEAR_TRAP,
    LANDMINE,
    ROLLING_BOULDER_TRAP,
    SLP_GAS_TRAP,
    RUST_TRAP,
    FIRE_TRAP,
    PIT,
    SPIKED_PIT,
    HOLE,
    TRAPDOOR,
    TELEP_TRAP,
    LEVEL_TELEP,
    MAGIC_PORTAL,
    WEB,
    MAGIC_TRAP,
    ANTI_MAGIC,
    POLY_TRAP,
    VIBRATING_SQUARE,
    TRAPPED_DOOR,
    TRAPPED_CHEST,
} from './const.js';

/** C: Luck-derived search bonus (artifact SPFX_SEARCH, lenses) — stub 0 for now. */
function fundSearchBonus() {
    let fund = 0;
    // TODO: uwep artifact spec_ability(SPFX_SEARCH) → uwep->spe
    // TODO: ublindf->otyp === LENSES && !Blind → fund += 2
    if (fund > 5) fund = 5;
    return fund;
}

function blindHero() {
    return !!(game.u?.ublind);
}

function visibleRegionAt(x, y) {
    void x;
    void y;
    // TODO: vision.c visible_region_at — affects feel_location when not Blind
    return false;
}

function mAt(x, y) {
    return game.level?.monsters?.find((m) => m.mx === x && m.my === y) ?? null;
}

/** C: mfind0 — reveal hidden monster; returns -1 (continue loop), 0, or >0 (early exit). */
async function mfind0(mtmp, viaWarning) {
    void mtmp;
    void viaWarning;
    // TODO: detect.c mfind0 (seemimic, mundetected, newsym, You find …)
    return 0;
}

function tAt(x, y) {
    const traps = game.level?.traps;
    if (!traps?.length) return null;
    return traps.find((t) => t.tx === x && t.ty === y) ?? null;
}

function delTrap(trap) {
    const traps = game.level?.traps;
    if (!traps) return;
    const i = traps.indexOf(trap);
    if (i >= 0) traps.splice(i, 1);
}

/** C: rm.c cvt_sdoor_to_door — secret door → normal door. */
function cvtSdoorToDoor(lev) {
    let newmask = lev.doormask ?? 0;
    if (!(newmask & D_LOCKED)) newmask |= D_CLOSED;
    lev.typ = DOOR;
    lev.doormask = newmask;
}

function trapTypName(ttyp) {
    const names = {
        [ARROW_TRAP]: 'arrow trap',
        [DART_TRAP]: 'dart trap',
        [ROCKTRAP]: 'rock trap',
        [SQKY_BOARD]: 'squeaky board',
        [BEAR_TRAP]: 'bear trap',
        [LANDMINE]: 'land mine',
        [ROLLING_BOULDER_TRAP]: 'rolling boulder trap',
        [SLP_GAS_TRAP]: 'gas trap',
        [RUST_TRAP]: 'rust trap',
        [FIRE_TRAP]: 'fire trap',
        [PIT]: 'pit',
        [SPIKED_PIT]: 'spiked pit',
        [HOLE]: 'hole',
        [TRAPDOOR]: 'trap door',
        [TELEP_TRAP]: 'teleportation trap',
        [LEVEL_TELEP]: 'level teleporter',
        [MAGIC_PORTAL]: 'magic portal',
        [WEB]: 'web',
        [STATUE_TRAP]: 'statue trap',
        [MAGIC_TRAP]: 'magic trap',
        [ANTI_MAGIC]: 'anti-magic field',
        [POLY_TRAP]: 'polymorph trap',
        [VIBRATING_SQUARE]: 'vibrating square',
        [TRAPPED_DOOR]: 'trapped door',
        [TRAPPED_CHEST]: 'trapped chest',
    };
    return names[ttyp] || 'trap';
}

/** C: detect.c find_trap — mark seen, message. */
async function findTrap(trap) {
    trap.tseen = true;
    const name = trapTypName(trap.ttyp);
    const article = /^[aeiou]/i.test(name) ? 'an' : 'a';
    await pline(`You find ${article} ${name}.`);
    newsym(trap.tx, trap.ty);
}

/** C: trap.c activate_statue_trap — deltrap + animate; stub returns null (no monster). */
async function activateStatueTrap(trap, x, y) {
    delTrap(trap);
    newsym(x, y);
    vision_recalc(1);
    // TODO: trap.c animate_statue, sobj_at(STATUE), fail_reason / unique checks
    return null;
}

function feelLocation(x, y) {
    void x;
    void y;
    // TODO: detect.c feel_location (memory, out_of_sight, …)
    newsym(x, y);
}

/**
 * C: dosearch() — wrapper; cmd.c #search.
 */
export async function dosearch() {
    await dosearch0(0);
}

/**
 * C: dosearch0(int aflag) — eight-neighbor search; aflag≠0 for auto-search.
 * @param {number} aflag
 */
export async function dosearch0(aflag) {
    const u = game.u;
    const lvl = game.level;
    if (!u || !lvl) return;

    if (u.uswallow) {
        if (!aflag) await pline('What are you looking for? The exit?');
        return;
    }

    const fund = fundSearchBonus();
    const Blind = blindHero();
    let reported = false;

    for (let x = u.ux - 1; x < u.ux + 2; x++) {
        for (let y = u.uy - 1; y < u.uy + 2; y++) {
            if (!isok(x, y)) continue;
            if (u_at(x, y)) continue;

            if (!aflag && (Blind || visibleRegionAt(x, y))) feelLocation(x, y);

            const loc = lvl.at(x, y);
            if (!loc) continue;

            if (loc.typ === SDOOR) {
                if (rnl(7 - fund)) continue;
                cvtSdoorToDoor(loc);
                vision_recalc(1);
                newsym(x, y);
                await pline('You find a hidden door.');
                reported = true;
            } else if (loc.typ === SCORR) {
                if (rnl(7 - fund)) continue;
                loc.typ = CORR;
                vision_recalc(1);
                newsym(x, y);
                await pline('You find a hidden passage.');
                reported = true;
            } else {
                const mtmp = mAt(x, y);
                if (mtmp && !aflag) {
                    const mfres = await mfind0(mtmp, 0);
                    if (mfres === -1) continue;
                    if (mfres > 0) return;
                }

                if (!aflag && !mtmp && !Blind) {
                    /* C: unmap_invisible(x, y); */
                }

                const trap = tAt(x, y);
                if (trap && !trap.tseen && !rnl(8)) {
                    if (trap.ttyp === STATUE_TRAP) {
                        await activateStatueTrap(trap, x, y);
                        reported = true;
                        return;
                    }
                    await findTrap(trap);
                    reported = true;
                }
            }
        }
    }

    if (!reported) await pline('You find no traps or secret doors.');
}
