// decor.js — Terrain feature narration at the hero’s square.
// C ref: pickup.c describe_decor(), invent.c dfeature_at(), stairs.c stairway_at / stairs_description()

import { game } from './gstate.js';
import { pline } from './display.js';
import {
    STONE,
    ICE,
    IS_FOUNTAIN,
    IS_SINK,
    IS_ALTAR,
    IS_POOL,
    IS_LAVA,
    IS_FURNITURE,
} from './const.js';

/** C: levl[x][y].typ as rm.h terrain. */
export function levlTypAt(x, y) {
    return game.level?.at(x, y)?.typ ?? STONE;
}

/** C: stairs.c stairway_at — contest map stores upstair / dnstair coordinates only. */
export function stairwayAt(x, y) {
    const L = game.level;
    if (!L) return null;
    if (L.upstair && L.upstair.x === x && L.upstair.y === y) {
        return { up: true, isladder: false, u_traversed: !!game.u?.u_traversed_upstairs };
    }
    if (L.dnstair && L.dnstair.x === x && L.dnstair.y === y) {
        return { up: false, isladder: false, u_traversed: false };
    }
    return null;
}

function an(phrase) {
    if (!phrase) return phrase;
    const t = phrase.trim();
    if (!t) return phrase;
    const article = /^[aeiou]/i.test(t) ? 'an' : 'a';
    return `${article} ${phrase}`;
}

function upstart(s) {
    if (!s || typeof s !== 'string') return s;
    return s[0].toUpperCase() + s.slice(1);
}

/**
 * C: invent.c dfeature_at(x, y, buf) — strings worth mentioning (subset).
 * @returns {string|null}
 */
export function dfeatureAt(x, y) {
    const t = levlTypAt(x, y);
    if (IS_FOUNTAIN(t)) return 'fountain';
    if (IS_SINK(t)) return 'sink';
    if (IS_ALTAR(t)) return 'altar';
    if (IS_POOL(t)) return 'pool of water';
    if (IS_LAVA(t)) return 'molten lava';
    const st = stairwayAt(x, y);
    if (st) {
        const kind = st.isladder ? 'ladder' : 'staircase';
        return `${kind} ${st.up ? 'up' : 'down'}`;
    }
    return null;
}

/**
 * C: pickup.c describe_decor() — pline notable dungeon feature; updates iflags.prev_decor.
 * @returns {Promise<boolean>} C `res` (whether something was described this call)
 */
export async function describeDecor() {
    const g = game;
    const u = g.u;
    if (!u) return false;

    const ltyp = levlTypAt(u.ux, u.uy);
    const prev = g.iflags?.prev_decor ?? STONE;
    const dfeature = dfeatureAt(u.ux, u.uy);
    let res = true;

    if (ltyp === prev && !IS_FURNITURE(ltyp)) {
        res = false;
    } else if (dfeature && !u.ublind) {
        let d = dfeature;
        const waterhere = d === 'pool of water';
        if (waterhere) {
            /* C: waterbody_name(u.ux, u.uy) — pool vs moat; stub keeps "pool of water" */
        }
        if (d !== 'swamp' && ltyp !== ICE) d = an(d);

        const verbose = !!g.flags?.verbose;
        const out = verbose ? `There is ${d} here.` : `${upstart(d)}.`;
        /* C: ICE + mention_decor uses Norep; contest stub uses pline */
        await pline(out);
    } else if (!u.underwater) {
        /* C: back_on_ground when leaving pool/lava/ice — port with iflags.last_msg when needed */
    }

    g.iflags = g.iflags || {};
    /* C: pickup.c:424 — prev_decor tracks surface for next describe_decor */
    g.iflags.prev_decor = g.flags?.mention_decor ? ltyp : STONE;
    return res;
}
