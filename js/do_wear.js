// do_wear.js — Wear / take-off (partial).
// C ref: do_wear.c — dotakeoff, armor_or_accessory_off, armoroff, *_off.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, pline } from './display.js';
import { doname } from './objnam.js';
import { find_ac } from './u_init.js';
import { change_luck } from './attrib.js';
import {
    W_ARM, W_ARMC, W_ARMH, W_ARMS, W_ARMG, W_ARMF, W_ARMU, W_ARMOR,
    W_RING, W_AMUL, W_TOOL,
} from './const.js';
import { objectNames } from './objects.js';
import { PM_ARCHEOLOGIST } from './monsters.js';

const FEDORA = objectNames.indexOf('FEDORA');

const W_ACCESSORY = W_RING | W_AMUL | W_TOOL;

let Narmorpieces = 0;
let Naccessories = 0;

/** C ref: do_wear.c off_msg */
async function off_msg(otmp) {
    if (game.flags?.verbose !== false) {
        await pline(`You were wearing ${doname(otmp)}.`);
    }
}

/** C ref: do_wear.c cursed — message + bknown when stuck */
function cursed_check(otmp) {
    if (!otmp) return false;
    if (otmp.cursed) {
        const plural = (otmp.quan || 1) > 1;
        // sync message; pline is async but callers await armor path separately
        game._cursed_takeoff_msg = plural
            ? "You can't.  They are cursed."
            : "You can't.  It is cursed.";
        otmp.bknown = 1;
        return true;
    }
    return false;
}

/**
 * C ref: do_wear.c count_worn_stuff
 * @returns {object|null} default single piece when count is 1
 */
function count_worn_stuff(accessorizing) {
    const u = game.u || {};
    Narmorpieces = 0;
    Naccessories = 0;
    let otmp = null;

    const moreArmor = (x) => {
        if (x) {
            Narmorpieces++;
            otmp = x;
        }
    };
    moreArmor(u.uarmh);
    moreArmor(u.uarms);
    moreArmor(u.uarmg);
    moreArmor(u.uarmf);
    // outermost body layer only
    if (u.uarmc) moreArmor(u.uarmc);
    else if (u.uarm) moreArmor(u.uarm);
    else if (u.uarmu) moreArmor(u.uarmu);

    let armorDefault = accessorizing ? null : otmp;

    otmp = null;
    const moreAcc = (x) => {
        if (x) {
            Naccessories++;
            otmp = x;
        }
    };
    moreAcc(u.uleft);
    moreAcc(u.uright);
    moreAcc(u.uamul);
    moreAcc(u.ublindf);

    return accessorizing ? otmp : armorDefault;
}

/** Clear a worn slot (C setworn(NULL, mask) subset). */
function clear_worn(mask) {
    const u = game.u || (game.u = {});
    const clearOne = (slot, bit) => {
        if (!(mask & bit)) return;
        const obj = u[slot];
        if (obj) obj.owornmask = (obj.owornmask || 0) & ~bit;
        u[slot] = null;
    };
    clearOne('uarm', W_ARM);
    clearOne('uarmc', W_ARMC);
    clearOne('uarmh', W_ARMH);
    clearOne('uarms', W_ARMS);
    clearOne('uarmg', W_ARMG);
    clearOne('uarmf', W_ARMF);
    clearOne('uarmu', W_ARMU);
    clearOne('uleft', W_RING); // left/right distinguished by pointer; both use W_RING in mask
    clearOne('uright', W_RING);
    clearOne('uamul', W_AMUL);
    clearOne('ublindf', W_TOOL);
}

/** C ref: do_wear.c Armor_off — suit; dragon/arti deferred */
function Armor_off() {
    clear_worn(W_ARM);
    return 0;
}

/** C ref: do_wear.c Helmet_off — fedora luck; other magic helms deferred */
function Helmet_off() {
    const u = game.u || {};
    const helm = u.uarmh;
    if (helm && helm.otyp === FEDORA && game.urole?.mnum === PM_ARCHEOLOGIST) {
        change_luck(-1);
    }
    clear_worn(W_ARMH);
    return 0;
}

function Cloak_off() {
    clear_worn(W_ARMC);
    return 0;
}
function Shield_off() {
    clear_worn(W_ARMS);
    return 0;
}
function Gloves_off() {
    clear_worn(W_ARMG);
    return 0;
}
function Boots_off() {
    clear_worn(W_ARMF);
    return 0;
}
function Shirt_off() {
    clear_worn(W_ARMU);
    return 0;
}

/**
 * C ref: do_wear.c armoroff — delay-0 path only (oc_delay not extracted yet).
 * Returns 1 on success (ECMD_TIME caller), 0 if cursed/blocked.
 */
async function armoroff(otmp) {
    if (cursed_check(otmp)) {
        await pline(game._cursed_takeoff_msg || "You can't.  It is cursed.");
        return 0;
    }
    // Delay occupation path deferred — fedora/leather jacket are delay 0.
    const u = game.u || {};
    if (otmp === u.uarm) Armor_off();
    else if (otmp === u.uarmc) Cloak_off();
    else if (otmp === u.uarmh) Helmet_off();
    else if (otmp === u.uarms) Shield_off();
    else if (otmp === u.uarmg) Gloves_off();
    else if (otmp === u.uarmf) Boots_off();
    else if (otmp === u.uarmu) Shirt_off();
    else {
        // unknown armor slot
        otmp.owornmask = (otmp.owornmask || 0) & ~W_ARMOR;
    }
    await off_msg(otmp);
    find_ac();
    return 1;
}

/**
 * C ref: do_wear.c armor_or_accessory_off — armor path; accessories partial.
 * @returns {number} 0 = no time, 1 = took time
 */
async function armor_or_accessory_off(obj) {
    const u = game.u || {};
    const worn = (obj.owornmask || 0) & (W_ARMOR | W_ACCESSORY);
    if (!worn) {
        await pline('You are not wearing that.');
        return 0;
    }
    // Layering: suit under cloak, shirt under suit/cloak
    if (
        (obj === u.uarm && u.uarmc)
        || (obj === u.uarmu && (u.uarmc || u.uarm))
    ) {
        const parts = [];
        if (u.uarmc) parts.push('cloak');
        if (obj === u.uarmu && u.uarm) parts.push('suit');
        await pline(
            `You can't take that off without taking off your ${parts.join(' and ')} first.`,
        );
        return 0;
    }

    if ((obj.owornmask || 0) & W_ARMOR) {
        return armoroff(obj);
    }

    // Accessory path (rings/amulet/eyewear) — cursed gate + clear slot
    if (cursed_check(obj)) {
        await pline(game._cursed_takeoff_msg || "You can't.  It is cursed.");
        return 0;
    }
    if (obj === u.uleft || obj === u.uright) {
        await off_msg(obj);
        if (obj === u.uleft) {
            obj.owornmask = (obj.owornmask || 0) & ~W_RING;
            u.uleft = null;
        } else {
            obj.owornmask = (obj.owornmask || 0) & ~W_RING;
            u.uright = null;
        }
        return 1;
    }
    if (obj === u.uamul) {
        obj.owornmask = (obj.owornmask || 0) & ~W_AMUL;
        u.uamul = null;
        await off_msg(obj);
        return 1;
    }
    if (obj === u.ublindf) {
        obj.owornmask = (obj.owornmask || 0) & ~W_TOOL;
        u.ublindf = null;
        await off_msg(obj);
        return 1;
    }
    return 0;
}

function takeoff_lets() {
    const inv = game.invent || [];
    const lets = [];
    for (const o of inv) {
        if (!o?.invlet) continue;
        if ((o.owornmask || 0) & (W_ARMOR | W_ACCESSORY)) lets.push(o.invlet);
    }
    lets.sort();
    if (!lets.length) return '';
    if (lets.length <= 5) return lets.join('');
    return lets.join('');
}

/** C ref: invent.c getobj("take off", takeoff_ok, …) */
async function getobj_takeoff() {
    const lets = takeoff_lets();
    const query = lets
        ? `What do you want to take off? [${lets} or ?*]`
        : 'What do you want to take off? [*]';
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
        await pline("You don't have that object.");
        return null;
    }
    if (!((otmp.owornmask || 0) & (W_ARMOR | W_ACCESSORY))) {
        await pline('You are not wearing that.');
        return null;
    }
    return otmp;
}

/**
 * C ref: do_wear.c dotakeoff — 'T' command.
 * @returns {number} 0 = no turn, 1 = took time
 */
export async function dotakeoff() {
    let otmp = count_worn_stuff(false);
    if (!Narmorpieces && !Naccessories) {
        await pline('Not wearing any armor or accessories.');
        return 0;
    }
    const paranoid = !!(game.flags?.paranoid_confirm?.remove
        || game.flags?.paranoid_remove);
    if (Narmorpieces !== 1 || paranoid) {
        otmp = await getobj_takeoff();
    }
    if (!otmp) return 0;
    return armor_or_accessory_off(otmp);
}
