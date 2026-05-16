// destroy_items.js — Hero + monster inventory destruction by fire (zap.c subset).
// C ref: zap.c destroy_items(), destroyable(), maybe_destroy_item() — AD_FIRE only;
// inventory_resistance_check / u_adtyp_resistance_obj / deferred stacks / potionbreathe /
// Ring_gone / setnotworn / glob of slime — TODO or stubbed. **`ignite_items`** → **`ignite_items.js`**.

import { game } from './gstate.js';
import { rn2, rnd } from './rng.js';
import { pline } from './display.js';
import { nh5HeroObjectClass, removeObjFromHeroInvent } from './water_damage.js';
import { NH5_POTION_CLASS, NH5_SCROLL_CLASS, NH5_SPBOOK_CLASS } from './nh5_objclass.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';
import { updateInventory } from './invent.js';
import { losehp } from './mthrowu.js';
import { exercise } from './attrib.js';
import { A_STR, KILLED_BY, KILLED_BY_AN } from './const.js';
import { raceptr, fireResistant } from './mondata.js';

/** C: monattk.h AD_FIRE */
export const AD_FIRE = 2;

/** C: zap.c DMG_DESTROY_SCALE / MAX_ITEMS_DESTROYED */
const DMG_DESTROY_SCALE = 5;
const MAX_ITEMS_DESTROYED = 20;

/** @see water_damage.js — NH5 scroll / spellbook / potion blocks */
const OTYP_POT_OIL = 320;
const OTYP_SCR_FIRE = 338; /* objects.h SCROLL order to SCR_FIRE */
const OTYP_SPE_BOOK_OF_THE_DEAD = 409;
const OTYP_SPE_FIREBALL = 368;

/** C: zap.c destroy_strings[dindx][0 singular verb, 1 plural, 2 killer] — AD_FIRE rows */
const DS_BOIL_POTION = 1;
const DS_BOIL_OIL = 2;
const DS_BURN_SCROLL = 3;
const DS_BURN_SPELLBOOK = 4;

const DESTROY_STRINGS = [
    ['freezes and shatters', 'freeze and shatter', 'shattered potion'],
    ['boils and explodes', 'boil and explode', 'boiling potion'],
    ['ignites and explodes', 'ignite and explode', 'exploding potion'],
    ['catches fire and burns', 'catch fire and burn', 'burning scroll'],
    ['catches fire and burns', '', 'burning book'],
];

/**
 * C: zap.c destroyable(obj, AD_FIRE) — oclass via NH5; SCR_FIRE / SPE_FIREBALL immune.
 * @param {{ otyp?: number, oclass?: number, quan?: number, in_use?: number, oartifact?: number }} obj
 */
function destroyableHeroFire(obj) {
    if (!obj) return false;
    if (obj.oartifact | 0) return false;
    const quan = obj.quan ?? 1;
    if ((obj.in_use | 0) && quan <= 1) return false;
    const t = obj.otyp | 0;
    if (t === OTYP_SCR_FIRE || t === OTYP_SPE_FIREBALL) return false;
    const oc = nh5HeroObjectClass(obj);
    return oc === NH5_POTION_CLASS || oc === NH5_SCROLL_CLASS || oc === NH5_SPBOOK_CLASS;
}

function objShortPhrase(obj) {
    const row = OC_SKILL_ROW_BY_OTYP.get(obj.otyp | 0);
    if (row) return row.name.toLowerCase().replace(/_/g, ' ');
    return 'item';
}

/**
 * C: zap.c maybe_destroy_item(carrier, obj, AD_FIRE) — hero subset (no potionbreathe,
 * no worn-ring removal, no inventory_resistance_check RNG when extrinsic stub is 0).
 * @param {typeof game} g
 * @param {{ otyp?: number, oclass?: number, quan?: number, in_use?: number, dknown?: number }} obj
 * @returns {Promise<number>} extra damage (C dmg_out); hero lava ignores return value
 */
async function maybeDestroyItemHeroFire(g, obj) {
    const u = g.u;
    if (!u) return 0;

    const t = obj.otyp | 0;
    if (t === OTYP_SPE_BOOK_OF_THE_DEAD) {
        const blind = !!(u.ublind | 0) || (u.timed?.blind ?? 0) > 0;
        if (!blind) {
            await pline(
                'The Book of the Dead glows a strange dark red, but remains intact.',
            );
        }
        return 0;
    }

    const origQuan = obj.quan ?? 1;
    let quan = Math.max(1, origQuan);
    if (obj.in_use | 0) quan -= 1;

    const fireRes = !!(u.Fire_resistance | 0);
    let dindx = 0;
    let dmg = 0;
    const oc = nh5HeroObjectClass(obj);

    if (oc === NH5_POTION_CLASS) {
        dindx = t === OTYP_POT_OIL ? DS_BOIL_OIL : DS_BOIL_POTION;
        dmg = rnd(6);
    } else if (oc === NH5_SCROLL_CLASS) {
        dindx = DS_BURN_SCROLL;
        dmg = 1;
    } else if (oc === NH5_SPBOOK_CLASS) {
        dindx = DS_BURN_SPELLBOOK;
        dmg = 1;
    } else {
        return 0;
    }

    const xresist =
        oc !== NH5_POTION_CLASS && fireRes;

    let cnt = 0;
    for (let i = 0; i < quan; i++) if (!rn2(3)) cnt++;
    if (!cnt) return 0;

    const str = DESTROY_STRINGS[dindx];
    const verbIdx = cnt > 1 ? 1 : 0;
    const verb = str[verbIdx] || str[0];
    let mult = '';
    if (cnt === 1 && quan === 1) mult = 'Your ';
    else if (cnt === 1) mult = 'One of your ';
    else if (cnt < quan) mult = 'Some of your ';
    else if (quan === 2) mult = 'Both of your ';
    else mult = 'All of your ';
    const base = objShortPhrase(obj);
    const noun = cnt === 1 && quan === 1 ? base : `${base}s`;
    await pline(`${mult}${noun} ${verb}!`);

    const newQuan = origQuan - cnt;
    if (newQuan <= 0) removeObjFromHeroInvent(g, obj);
    else obj.quan = newQuan;
    if (g.iflags?.perm_invent) updateInventory();

    if (dmg && !xresist) {
        const how = str[2];
        const one = cnt === 1;
        const killer = one ? how : `${how}s`;
        losehp(dmg, killer, one ? KILLED_BY_AN : KILLED_BY);
        exercise(A_STR, false);
    }
    return dmg;
}

/**
 * C: zap.c **`m_useup`**-style — remove **`obj`** from **`mtmp.minvent`** or decrement **`quan`**.
 * @param {object} mtmp
 * @param {object} obj
 */
function removeObjFromMonInvent(mtmp, obj) {
    if (!mtmp || !obj) return;
    if (mtmp.minvent === obj) {
        mtmp.minvent = obj.nobj ?? null;
        return;
    }
    let p = mtmp.minvent;
    while (p?.nobj) {
        if (p.nobj === obj) {
            p.nobj = obj.nobj;
            return;
        }
        p = p.nobj;
    }
}

/**
 * C: zap.c **`maybe_destroy_item(mon, obj, AD_FIRE)`** — monster carrier (**`!u_carry`**).
 * @param {typeof game} g
 * @param {object} mtmp
 * @param {object} obj
 * @param {boolean} visMon — C **`canseemon(carrier)`**
 * @returns {Promise<number>} damage to apply later (**`xtradmg`** sum)
 */
async function maybeDestroyItemMonFire(g, mtmp, obj, visMon) {
    const u = g.u;
    if (!u || !obj) return 0;

    const t = obj.otyp | 0;
    if (t === OTYP_SPE_BOOK_OF_THE_DEAD) {
        const blind = !!(u.ublind | 0) || (u.timed?.blind ?? 0) > 0;
        if (visMon && !blind) {
            await pline(
                'The Book of the Dead glows a strange dark red, but remains intact.',
            );
        }
        return 0;
    }

    const origQuan = obj.quan ?? 1;
    let quan = Math.max(1, origQuan);
    if (obj.in_use | 0) quan -= 1;

    const fireResMon = fireResistant(raceptr(mtmp));
    let dindx = 0;
    let dmg = 0;
    const oc = nh5HeroObjectClass(obj);

    if (oc === NH5_POTION_CLASS) {
        dindx = t === OTYP_POT_OIL ? DS_BOIL_OIL : DS_BOIL_POTION;
        dmg = rnd(6);
    } else if (oc === NH5_SCROLL_CLASS) {
        dindx = DS_BURN_SCROLL;
        dmg = 1;
    } else if (oc === NH5_SPBOOK_CLASS) {
        dindx = DS_BURN_SPELLBOOK;
        dmg = 1;
    } else {
        return 0;
    }

    const xresist = oc !== NH5_POTION_CLASS && fireResMon;

    let cnt = 0;
    for (let i = 0; i < quan; i++) if (!rn2(3)) cnt++;
    if (!cnt) return 0;

    const str = DESTROY_STRINGS[dindx];
    const verbIdx = cnt > 1 ? 1 : 0;
    const verb = str[verbIdx] || str[0];
    let mult = '';
    if (visMon) {
        const n = mtmp?.monnam || mtmp?.data?.mname || 'monster';
        if (cnt === 1 && quan === 1) mult = `${n}'s `;
        else if (cnt === 1) mult = `One of ${n}'s `;
        else if (cnt < quan) mult = `Some of ${n}'s `;
        else if (quan === 2) mult = `Both of ${n}'s `;
        else mult = `All of ${n}'s `;
        const base = objShortPhrase(obj);
        const noun = cnt === 1 && quan === 1 ? base : `${base}s`;
        await pline(`${mult}${noun} ${verb}!`);
    }

    const newQuan = origQuan - cnt;
    if (newQuan <= 0) removeObjFromMonInvent(mtmp, obj);
    else obj.quan = newQuan;

    if (dmg && !xresist) return dmg;
    return 0;
}

/**
 * C: zap.c destroy_items(mon, AD_FIRE, dmg_in) — no bypass / defer (**`u_carry`** false).
 * @param {typeof game} g
 * @param {object} mtmp
 * @param {number} dmgIn
 * @param {boolean} visMon — C **`canseemon(mon)`** for destroy plines
 * @returns {Promise<number>}
 */
export async function destroyItemsMonFire(g, mtmp, dmgIn, visMon) {
    const dmg0 = dmgIn | 0;
    let limit = Math.trunc(dmg0 / DMG_DESTROY_SCALE);
    if (dmg0 % DMG_DESTROY_SCALE > rn2(DMG_DESTROY_SCALE)) limit++;
    if (limit > MAX_ITEMS_DESTROYED) limit = MAX_ITEMS_DESTROYED;
    if (limit < 1) return 0;

    const chain = mtmp?.minvent;
    if (!chain) return 0;

    /** @type {Array<{ ref: object | null, deferred: boolean } | undefined>} */
    const slots = [];
    let eligStacks = 0;

    for (let o = chain; o; o = o.nobj) {
        if (!destroyableHeroFire(o)) continue;
        const i = eligStacks < limit ? eligStacks : rn2(eligStacks);
        eligStacks++;
        if (i < 0 || i >= limit) continue;
        slots[i] = { ref: o, deferred: false };
    }
    if (eligStacks > limit) eligStacks = limit;

    let dmgOut = 0;
    for (let i = 0; i < eligStacks; i++) {
        const slot = slots[i];
        const o = slot?.ref;
        if (o && !slot.deferred) dmgOut += await maybeDestroyItemMonFire(g, mtmp, o, visMon);
    }
    return dmgOut;
}

/**
 * C: zap.c destroy_items(&gy.youmonst, AD_FIRE, dmg_in) — bypass/deferred paths omitted;
 * second-pass verification uses object identity (no **`o_id`** yet).
 * @param {typeof game} [g]
 * @param {number} dmgIn — e.g. **`trap.c`** **`lava_effects`** **`d(6,6)`** roll
 * @returns {Promise<number>} summed extra damage from destroyed potions (C return value)
 */
export async function destroyItemsYoumonstFire(g = game, dmgIn) {
    const dmg0 = dmgIn | 0;
    let limit = Math.trunc(dmg0 / DMG_DESTROY_SCALE);
    if (dmg0 % DMG_DESTROY_SCALE > rn2(DMG_DESTROY_SCALE)) limit++;
    if (limit > MAX_ITEMS_DESTROYED) limit = MAX_ITEMS_DESTROYED;
    if (limit < 1) return 0;

    const chain = g.invent;
    if (!chain) return 0;

    /** @type {Array<{ ref: object | null, deferred: boolean } | undefined>} */
    const slots = [];
    let eligStacks = 0;

    for (let o = chain; o; o = o.nobj) {
        if (!destroyableHeroFire(o)) continue;
        const i = eligStacks < limit ? eligStacks : rn2(eligStacks);
        eligStacks++;
        if (i < 0 || i >= limit) continue;
        slots[i] = { ref: o, deferred: false };
    }
    if (eligStacks > limit) eligStacks = limit;

    let dmgOut = 0;
    for (let i = 0; i < eligStacks; i++) {
        const slot = slots[i];
        const o = slot?.ref;
        if (o && !slot.deferred) dmgOut += await maybeDestroyItemHeroFire(g, o);
    }
    return dmgOut;
}
