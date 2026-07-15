// vault.js — Vault occupancy and guard summoning.
// C ref: vault.c — vault_occupied, findgd, newegd, find_guard_dest, invault.
// Named omissions: migrating_mons findgd park; gd_move body; vault_summon_gd;
// uleftvault; wallify_vault / clear_fcorr; Croesus mon_wield; fracture_rock
// boulder shatter; reset_faint; SetVoice; spot_stop_timers; xy_set_wall_state;
// hidden_gold container walk; mimic_obj_name; full Deaf/Blind message variants
// that need noit_mhis.

import { game } from './gstate.js';
import { rn2 } from './rng.js';
import { makemon, set_malign, newegd } from './makemon.js';
import { pline, newsym, canspotmon, map_invisible, verbalize } from './display.js';
import { getlin } from './getline.js';
import { Monnam, noit_Monnam } from './do_name.js';
import { adjalign } from './attrib.js';
import { nomul } from './hack.js';
import { makeplural } from './objnam.js';
import { recalc_block_point } from './vision.js';
import { COIN_CLASS } from './objects.js';
import {
    VAULT, VAULT_GUARD_TIME, ROOMOFFSET, COLNO, ROWNO,
    ROOM, CORR, STONE, HWALL, VWALL, DOOR, D_NODOOR,
    TLCORNER, TRCORNER, BLCORNER, BRCORNER,
    MM_EGD, MM_NOMSG, IS_WALL, M_AP_OBJECT, M_AP_TYPE, EGD,
    A_LAWFUL,
} from './const.js';
import { monsterNames, mons, pmnames } from './monsters.js';
import { objectNames } from './generated/objects_data.js';

const PM_GUARD = monsterNames.indexOf('PM_GUARD');
const GOLD_PIECE = objectNames.indexOf('GOLD_PIECE');

/** C ref: invent.c money_cnt — invent is a JS array. */
function money_cnt(invent) {
    let sum = 0;
    for (const o of invent || []) {
        if (o.oclass === COIN_CLASS) sum += o.quan || 0;
    }
    return sum;
}

/** C: hidden_gold — container walk deferred → 0. */
function hidden_gold(_confiscate) {
    return 0;
}

function Blind() {
    const u = game.u || {};
    return !!(u.Blind || u.ublind || ((u.HBlinded | 0) || (u.EBlinded | 0)) && !(u.BBlinded | 0));
}

function Deaf() {
    const u = game.u || {};
    return !!((u.HDeaf | 0) || (u.EDeaf | 0) || u.uroleplay?.deaf || u.Deaf);
}

function mungspaces(s) {
    return String(s || '').trim().replace(/\s+/g, ' ');
}

function strcmpi(a, b) {
    return String(a || '').toLowerCase() === String(b || '').toLowerCase();
}

function strncmpi(a, b, n) {
    return String(a || '').slice(0, n).toLowerCase()
        === String(b || '').slice(0, n).toLowerCase();
}

function guard_pmname(guard) {
    const mndx = guard?.mnum ?? PM_GUARD;
    const gender = guard?.female ? 1 : 0;
    const names = pmnames[mndx];
    if (names && names[gender]) {
        return String(names[gender]).toLowerCase();
    }
    return 'guard';
}

function mhe(mtmp) {
    if (!canspotmon(mtmp)) return 'it';
    return mtmp.female ? 'she' : 'he';
}

/**
 * Remove guard from fmon (full mongone deferred).
 * C ref: mon.c mongone — subset for invault early exits.
 */
function mongone_guard(mtmp) {
    if (!mtmp) return;
    const list = game.fmon || [];
    const i = list.indexOf(mtmp);
    if (i >= 0) list.splice(i, 1);
    mtmp.mx = 0;
    mtmp.my = 0;
    mtmp.isgd = 0;
}

/**
 * C ref: vault.c vault_occupied — first urooms entry whose rtype is VAULT.
 * Returns room char code, or 0.
 */
export function vault_occupied(array) {
    const rooms = game.level?.rooms || [];
    const s = array || '';
    for (let i = 0; i < s.length; i++) {
        const ch = s.charCodeAt(i);
        const idx = ch - ROOMOFFSET;
        if (idx >= 0 && idx < rooms.length
            && (rooms[idx]?.rtype | 0) === VAULT) {
            return ch;
        }
    }
    return 0;
}

/**
 * C ref: vault.c findgd — first isgd on fmon for this level.
 * Named omission: migrating_mons park-at-<0,0> arm; mx/gddone heal.
 */
export function findgd() {
    const uz = game.u?.uz;
    for (const mtmp of game.fmon || []) {
        if (!mtmp?.isgd) continue;
        const gdlevel = EGD(mtmp)?.gdlevel;
        if (gdlevel
            && ((gdlevel.dnum | 0) !== (uz?.dnum | 0)
                || (gdlevel.dlevel | 0) !== (uz?.dlevel | 0))) {
            continue;
        }
        return mtmp;
    }
    return null;
}

/**
 * C ref: vault.c find_guard_dest — nearest CORR approachable from hero.
 * Named omission: tele() fallback when no corridor exists.
 */
function find_guard_dest(guard, dest) {
    for (let dd = 2; dd < ROWNO || dd < COLNO; dd++) {
        for (let y = (game.u.uy | 0) - dd; y <= (game.u.uy | 0) + dd; y++) {
            if (y < 0 || y > ROWNO - 1) continue;
            for (let x = (game.u.ux | 0) - dd; x <= (game.u.ux | 0) + dd; x++) {
                if (y !== (game.u.uy | 0) - dd && y !== (game.u.uy | 0) + dd
                    && x !== (game.u.ux | 0) - dd) {
                    x = (game.u.ux | 0) + dd;
                }
                if (x < 1 || x > COLNO - 1) continue;
                if (guard && ((x === (guard.mx | 0) && y === (guard.my | 0))
                    || (guard.isgd && in_fcorridor(guard, x, y)))) {
                    continue;
                }
                const loc = game.level?.at?.(x, y);
                if ((loc?.typ | 0) === CORR) {
                    const lx = (x < game.u.ux) ? x + 1
                        : (x > game.u.ux) ? x - 1 : x;
                    const ly = (y < game.u.uy) ? y + 1
                        : (y > game.u.uy) ? y - 1 : y;
                    const adj = game.level?.at?.(lx, ly);
                    const atyp = adj?.typ | 0;
                    if (atyp !== STONE && atyp !== CORR) continue;
                    dest.x = x;
                    dest.y = y;
                    return true;
                }
            }
        }
    }
    return false;
}

/** C ref: vault.c in_fcorridor — fakecorr occupancy check. */
function in_fcorridor(grd, x, y) {
    const egrd = EGD(grd);
    if (!egrd?.fakecorr) return false;
    const beg = egrd.fcbeg | 0;
    const end = egrd.fcend | 0;
    for (let i = beg; i < end; i++) {
        const fc = egrd.fakecorr[i];
        if (fc && (fc.fx | 0) === (x | 0) && (fc.fy | 0) === (y | 0)) {
            return true;
        }
    }
    return false;
}

/**
 * C ref: vault.c invault — timer + spawn vault guard + name dialogue.
 * Branch envelope: occupancy gate; death-count reluctance; timer;
 * find_guard_dest + wall walk; makemon(PM_GUARD, MM_EGD|MM_NOMSG);
 * appear pline; getlin name; gold demand; fakecorr door breech.
 * Named omissions: see file header.
 */
export async function invault() {
    const u = game.u;
    if (!u) return;

    let vaultroom = vault_occupied(u.urooms) | 0;
    if (!vaultroom) {
        u.uinvault = 0;
        return;
    }

    const vgdeathcount = game.mvitals?.[PM_GUARD]?.died | 0;
    if (vgdeathcount < 2
        || (vgdeathcount < 50 && !rn2(vgdeathcount * vgdeathcount))) {
        u.uinvault = (u.uinvault | 0) + 1;
    }
    if ((u.uinvault | 0) < VAULT_GUARD_TIME
        || ((u.uinvault | 0) % (VAULT_GUARD_TIME / 2)) !== 0) {
        return;
    }

    let guard = findgd();
    if (guard) return;

    const dest = { x: 0, y: 0 };
    if (!find_guard_dest(null, dest)) return;
    const gdx = dest.x | 0;
    const gdy = dest.y | 0;
    vaultroom -= ROOMOFFSET;

    let x = u.ux | 0;
    let y = u.uy | 0;
    const typAt = (cx, cy) => game.level?.at?.(cx, cy)?.typ | 0;

    if (typAt(x, y) !== ROOM) {
        if (typAt(x + 1, y) === ROOM) x += 1;
        else if (typAt(x, y + 1) === ROOM) y += 1;
        else if (typAt(x - 1, y) === ROOM) x -= 1;
        else if (typAt(x, y - 1) === ROOM) y -= 1;
        else if (typAt(x + 1, y + 1) === ROOM) { x += 1; y += 1; }
        else if (typAt(x - 1, y - 1) === ROOM) { x -= 1; y -= 1; }
        else if (typAt(x + 1, y - 1) === ROOM) { x += 1; y -= 1; }
        else if (typAt(x - 1, y + 1) === ROOM) { x -= 1; y += 1; }
    }
    while (typAt(x, y) === ROOM) {
        const dx = (gdx > x) ? 1 : (gdx < x) ? -1 : 0;
        const dy = (gdy > y) ? 1 : (gdy < y) ? -1 : 0;
        if (Math.abs(gdx - x) >= Math.abs(gdy - y)) x += dx;
        else y += dy;
    }
    if (u.ux === x && u.uy === y) {
        if (typAt(x + 1, y) === HWALL || typAt(x + 1, y) === DOOR) x += 1;
        else if (typAt(x - 1, y) === HWALL || typAt(x - 1, y) === DOOR) x -= 1;
        else if (typAt(x, y + 1) === VWALL || typAt(x, y + 1) === DOOR) y += 1;
        else if (typAt(x, y - 1) === VWALL || typAt(x, y - 1) === DOOR) y -= 1;
        else return;
    }

    guard = makemon(mons(PM_GUARD), x, y, MM_EGD | MM_NOMSG);
    if (!guard) return;

    guard.isgd = 1;
    guard.mpeaceful = 1;
    set_malign(guard);
    const egd = EGD(guard) || newegd(guard);
    egd.gddone = 0;
    egd.ogx = x;
    egd.ogy = y;
    egd.gdlevel = {
        dnum: u.uz?.dnum | 0,
        dlevel: u.uz?.dlevel | 0,
    };
    egd.vroom = vaultroom;
    egd.warncnt = 0;

    u.uinvault = (u.uinvault | 0) + 1;

    // boulder shatter / reset_faint deferred (no RNG when absent)

    const spotted = canspotmon(guard);
    if (spotted) {
        await pline(
            `Suddenly one of the Vault's ${makeplural(guard_pmname(guard))} enters!`,
        );
        newsym(guard.mx, guard.my);
    } else {
        await pline('Someone else has entered the Vault.');
        map_invisible(guard.mx, guard.my);
    }

    if (u.uswallow) {
        if (!Deaf()) await verbalize("What's going on here?");
        if (!spotted) await pline('The other presence vanishes.');
        mongone_guard(guard);
        return;
    }
    if (M_AP_TYPE(game.youmonst) === M_AP_OBJECT || u.uundetected) {
        if (M_AP_TYPE(game.youmonst) === M_AP_OBJECT
            && (game.youmonst?.mappearance | 0) !== GOLD_PIECE
            && !Deaf()) {
            await verbalize('Hey!  Who left that object in here?');
        }
        await pline(`Puzzled, ${mhe(guard)} turns around and leaves.`);
        mongone_guard(guard);
        return;
    }
    // Strangled / is_silent / multi<0 — leave and return
    if (u.Strangled || (game.multi | 0) < 0) {
        if (Deaf()) {
            await pline(`${noit_Monnam(guard)} huffs and turns to leave.`);
        } else {
            await verbalize("I'll be back when you're ready to speak to me!");
        }
        mongone_guard(guard);
        return;
    }

    if (typeof game.occupation === 'function') game.occupation = null;
    if ((game.multi | 0) > 0) {
        nomul(0);
    }

    let buf = '';
    let trycount = 5;
    do {
        buf = await getlin(
            Deaf()
                ? 'You are required to supply your name. -'
                : '"Hello stranger, who are you?" -',
        );
        if (buf === '\x1b') buf = '';
        buf = mungspaces(buf);
    } while (!buf && --trycount > 0);

    const plname = game.plname || '';
    if ((u.ualign?.type | 0) === A_LAWFUL
        && !strncmpi(buf, plname, plname.length)) {
        adjalign(-1);
    }

    if (strcmpi(buf, 'Croesus') || strcmpi(buf, 'Kroisos')
        || strcmpi(buf, 'Creosote')) {
        // Croesus alive → leave; dead → angry (mon_wield deferred)
        mongone_guard(guard);
        return;
    }

    if (Deaf()) {
        await pline(
            `${noit_Monnam(guard)} doesn't ${Blind() ? '' : 'appear to '}recognize you.`,
        );
    } else {
        await verbalize("I don't know you.");
    }

    const umoney = money_cnt(game.invent);
    if (!umoney && !hidden_gold(true)) {
        if (Deaf()) {
            await pline(
                `${noit_Monnam(guard)} stomps${Blind() ? '' : ' and beckons'}.`,
            );
        } else {
            await verbalize('Please follow me.');
        }
    } else {
        if (!umoney) {
            if (!Deaf()) await verbalize('You have hidden gold.');
        }
        if (Deaf()) {
            if (!Blind()) {
                await pline(
                    `${noit_Monnam(guard)} holds out his palm and beckons with his other hand.`,
                );
            }
        } else {
            await verbalize(
                'Most likely all your gold was stolen from this vault.',
            );
            await verbalize('Please drop that gold and follow me.');
        }
        egd.dropgoldcnt = (egd.dropgoldcnt | 0) + 1;
    }

    egd.gdx = gdx;
    egd.gdy = gdy;
    egd.fcbeg = 0;
    if (!egd.fakecorr) egd.fakecorr = [];
    egd.fakecorr[0] = {
        fx: x,
        fy: y,
        ftyp: 0,
        flags: 0,
    };

    let typ = typAt(x, y);
    const loc = game.level?.at?.(x, y);
    if (!IS_WALL(typ) && loc) {
        const rooms = game.level.rooms || [];
        const vlt = egd.vroom | 0;
        const room = rooms[vlt];
        if (room) {
            const lowx = room.lx | 0;
            const hix = room.hx | 0;
            const lowy = room.ly | 0;
            const hiy = room.hy | 0;
            if (x === lowx - 1 && y === lowy - 1) typ = TLCORNER;
            else if (x === hix + 1 && y === lowy - 1) typ = TRCORNER;
            else if (x === lowx - 1 && y === hiy + 1) typ = BLCORNER;
            else if (x === hix + 1 && y === hiy + 1) typ = BRCORNER;
            else if (y === lowy - 1 || y === hiy + 1) typ = HWALL;
            else if (x === lowx - 1 || x === hix + 1) typ = VWALL;
            loc.typ = typ;
            loc.wall_info = 0;
            // xy_set_wall_state deferred
        }
    }
    egd.fakecorr[0].ftyp = typ;
    egd.fakecorr[0].flags = loc?.flags | 0;
    if (loc) {
        loc.typ = DOOR;
        loc.doormask = D_NODOOR;
    }
    recalc_block_point(x, y);
    egd.fcend = 1;
    egd.warncnt = 1;
}
