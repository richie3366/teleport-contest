// apply.js — Apply / use tool command.
// C ref: apply.c doapply (LOCK_PICK / key / STETHOSCOPE subset).

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, flush_topl_more, pline } from './display.js';
import { TOOL_CLASS, objectNames } from './objects.js';
import { pick_lock } from './lock.js';
import { ustatusline } from './insight.js';

const LOCK_PICK = objectNames.indexOf('LOCK_PICK');
const SKELETON_KEY = objectNames.indexOf('SKELETON_KEY');
const CREDIT_CARD = objectNames.indexOf('CREDIT_CARD');
const STETHOSCOPE = objectNames.indexOf('STETHOSCOPE');

const DIR_DX = { h: -1, l: 1, j: 0, k: 0, y: -1, u: 1, b: -1, n: 1 };
const DIR_DY = { h: 0, l: 0, j: 1, k: -1, y: -1, u: -1, b: 1, n: 1 };

/** C ref: apply.c apply_ok — TOOL_CLASS SUGGEST subset; other classes deferred. */
function apply_ok(obj) {
    return !!(obj && obj.oclass === TOOL_CLASS);
}

/** Invent-order letters (C getobj; do not alpha-sort). */
function apply_lets() {
    const lets = [];
    for (const o of game.invent || []) {
        if (apply_ok(o) && o.invlet) lets.push(o.invlet);
    }
    return lets.join('');
}

/**
 * C ref: invent.c getobj("use or apply", apply_ok) — loop on missing letter;
 * flush_topl_more before re-prompt so "don't have" gets --More--.
 * Empty SUGGEST set with no DOWNPLAY/hands → early "don't have anything"
 * (C suggested==0 && !forceprompt && !allownone); do not prompt [*].
 */
async function getobj_apply() {
    const lets0 = apply_lets();
    // C: apply_ok(NULL) is GETOBJ_EXCLUDE — no hands; DOWNPLAY (coins/
    // unknown oil) not yet in apply_ok → forceprompt stays false.
    if (!lets0) {
        await pline("You don't have anything to use or apply.");
        return null;
    }

    for (;;) {
        await flush_topl_more();
        const lets = apply_lets();
        if (!lets) {
            await pline("You don't have anything to use or apply.");
            return null;
        }
        const query = `What do you want to use or apply? [${lets} or ?*]`;
        const prompt = `${query} `;
        game._pending_message = prompt;
        await flush_screen(1);
        const disp = game.nhDisplay;
        if (disp?.setCursor) disp.setCursor(prompt.length, 0);

        const key = await nhgetch();
        const ch = String.fromCharCode(key);
        if (key === 27 || ch === ' ' || ch === '\n' || ch === '\r') {
            if (game.flags?.verbose !== false) await pline('Never mind.');
            return null;
        }
        if (ch === '?' || ch === '*') {
            await pline('Never mind.');
            return null;
        }
        const otmp = (game.invent || []).find((o) => o.invlet === ch);
        if (!otmp) {
            // C: You("don't have that object."); continue;
            await pline("You don't have that object.");
            continue;
        }
        if (!apply_ok(otmp)) {
            await pline("Sorry, I don't know how to use that.");
            return null;
        }
        game._pending_message = '';
        return otmp;
    }
}

/**
 * C ref: cmd.c getdir — '.' is self (dx=dy=dz=0, success), not cancel.
 * Used by use_stethoscope; lock.js getdir still treats '.' as cancel.
 */
async function getdir_self_ok(prompt) {
    const msg = prompt || 'In what direction?';
    game._pending_message = `${msg} `;
    await flush_screen(1);
    const disp = game.nhDisplay;
    if (disp?.setCursor) disp.setCursor(game._pending_message.length, 0);
    const key = await nhgetch();
    const ch = String.fromCharCode(key);
    game._pending_message = '';
    if (!game.u) game.u = {};
    if (ch === '.') {
        game.u.dx = game.u.dy = game.u.dz = 0;
        return true;
    }
    if (key === 27 || ch === ' ' || ch === '\n' || ch === '\r') {
        return false;
    }
    if (!(ch in DIR_DX)) return false;
    game.u.dx = DIR_DX[ch];
    game.u.dy = DIR_DY[ch];
    game.u.dz = 0;
    return true;
}

/**
 * C ref: apply.c use_stethoscope — one free use per hero_seq; '.' → ustatusline.
 * Branch envelope: self (dx=dy=0) only. Deferred: swallow/steed/dz/cursed
 * heartbeat rn2(2), adjacent mstatusline/SDOOR/SCORR, confdir, Deaf/nohands.
 * @returns {number} 1 = ECMD_TIME, 0 = ECMD_OK, -1 = ECMD_CANCEL
 */
async function use_stethoscope(_obj) {
    if (!(await getdir_self_ok(null))) return -1; // ECMD_CANCEL

    // C: first use this hero_seq is free; another use costs the turn
    if (!game.context) game.context = {};
    if (game.hero_seq == null) game.hero_seq = (game.moves || 1) << 3;
    const seq = game.hero_seq;
    const tookTime = seq === (game.context.stethoscope_seq ?? 0) ? 1 : 0;
    game.context.stethoscope_seq = seq;

    // confdir deferred (not Confused at starter)
    const dx = game.u.dx | 0;
    const dy = game.u.dy | 0;
    if (!dx && !dy) {
        await ustatusline();
        return tookTime;
    }
    // Adjacent monster / terrain stethoscope deferred
    await pline("You hear a faint typing noise.");
    return 0; // ECMD_OK — match C isok-fail path rather than invent TIME
}

/**
 * C ref: apply.c doapply() — TOOL_CLASS getobj; LOCK_PICK/key/STETHOSCOPE body.
 * Named omissions: full apply_ok (wand/spbook/coin/weapon/potion/
 * food/graystone); nohands/capacity; retouch; most otyp cases.
 * @returns {boolean} true if the command took time (ECMD_TIME)
 */
export async function doapply() {
    const obj = await getobj_apply();
    if (!obj) return false;

    if (obj.otyp === LOCK_PICK || obj.otyp === SKELETON_KEY
        || obj.otyp === CREDIT_CARD) {
        // C: res = (pick_lock(...) != 0) ? ECMD_TIME : ECMD_OK
        const pl = await pick_lock(obj);
        return pl !== 0;
    }

    if (obj.otyp === STETHOSCOPE) {
        const res = await use_stethoscope(obj);
        return res > 0; // ECMD_TIME only
    }

    // Other tools (sack, etc.) deferred
    await pline("Sorry, I don't know how to use that.");
    return false;
}
