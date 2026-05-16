// water_damage.js — Hero inventory wetting (trap.c water_damage / water_damage_chain subset).
// C ref: trap.c water_damage(), water_damage_chain() — acid_ctx / grease / towel / containers /
// splash_lit / rust erode_obj / pot_acid full text not ported; luck gate + scroll / spellbook /
// potion dilute + acid destroy match early drown() chain.

import { game } from './gstate.js';
import { rn2 } from './rng.js';
import { pline } from './display.js';
import { updateInventory } from './invent.js';
import { NH5_POTION_CLASS, NH5_SCROLL_CLASS, NH5_SPBOOK_CLASS } from './nh5_objclass.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';

/** @see include/objects.h `objects_nums` (NetHack 5.0) — potions block then scrolls then spellbooks. */
const OTYP_POT_GAIN_ABILITY = 296;
const OTYP_POT_WATER = 321;
const OTYP_POT_ACID = 319;
const OTYP_SCR_BLANK_PAPER = 365;
const OTYP_SPE_DIG = 366;
const OTYP_SPE_BLANK_PAPER = 407;
const OTYP_SPE_NOVEL = 408;
const OTYP_SPE_BOOK_OF_THE_DEAD = 409;

/**
 * C: you.h Luck + LUCKADD (subset).
 * @param {typeof game} g
 */
function heroLuck(g) {
    const u = g.u;
    return (u?.LUCKADD ?? 0) + (u?.uluck ?? 0);
}

/**
 * NH5 object class, or inferred from **`otyp`** range when **`oclass`** unset.
 * @param {{ otyp?: number, oclass?: number }} obj
 */
function nh5ObjectClass(obj) {
    if (obj.oclass != null && obj.oclass !== undefined) return obj.oclass | 0;
    const row = OC_SKILL_ROW_BY_OTYP.get(obj.otyp | 0);
    if (row) return row.oclass;
    const t = obj.otyp | 0;
    if (t >= OTYP_POT_GAIN_ABILITY && t <= OTYP_POT_WATER) return NH5_POTION_CLASS;
    if (t > OTYP_POT_WATER && t <= OTYP_SCR_BLANK_PAPER) return NH5_SCROLL_CLASS;
    if (t >= OTYP_SPE_DIG && t <= OTYP_SPE_BOOK_OF_THE_DEAD) return NH5_SPBOOK_CLASS;
    return -1;
}

/**
 * Remove one node from **`g.invent`** singly-linked list (**`nobj`**).
 * @param {typeof game} g
 * @param {{ nobj?: unknown }} victim
 */
function removeObjFromHeroInvent(g, victim) {
    let prev = /** @type {{ nobj?: unknown } | null} */ (null);
    for (let o = g.invent; o; o = o.nobj) {
        if (o === victim) {
            if (prev) prev.nobj = o.nobj;
            else g.invent = o.nobj;
            return;
        }
        prev = o;
    }
}

/**
 * C: trap.c pot_acid_damage() — minimal: explode message + **`delobj`** (**remove** from invent).
 * @param {typeof game} g
 * @param {{ quan?: number, dknown?: number }} obj
 */
async function potAcidDamageMinimal(g, obj) {
    const one = (obj.quan ?? 1) <= 1;
    await pline(`${one ? 'A' : 'Some'} potion${one ? '' : 's'} explode${one ? 's' : ''}!`);
    removeObjFromHeroInvent(g, obj);
    if (g.iflags?.perm_invent) updateInventory();
}

/**
 * C: trap.c water_damage() — scroll / spellbook / potion slices + luck protection.
 * @param {typeof game} g
 * @param {{ otyp?: number, oclass?: number, quan?: number, dknown?: number, odiluted?: number, spestudied?: number, blessed?: number, cursed?: number, greased?: number }} obj
 * @param {boolean} force
 */
export async function waterDamageOne(obj, force, g = game) {
    if (!obj) return;

    const oclass = nh5ObjectClass(obj);
    const t = obj.otyp | 0;
    const inInvent = true;

    if (!force && heroLuck(g) + 5 > rn2(20)) return;

    if (oclass === NH5_SCROLL_CLASS) {
        if (t === OTYP_SCR_BLANK_PAPER) return;
        const q = obj.quan ?? 1;
        await pline(q > 1 ? 'Your scrolls fade.' : 'Your scroll fades.');
        obj.otyp = OTYP_SCR_BLANK_PAPER;
        obj.dknown = 0;
        obj.spe = 0;
        if (inInvent && g.iflags?.perm_invent) updateInventory();
        return;
    }

    if (oclass === NH5_SPBOOK_CLASS) {
        if (t === OTYP_SPE_BLANK_PAPER) return;
        if (t === OTYP_SPE_BOOK_OF_THE_DEAD) {
            await pline('Steam rises from the Book of the Dead.');
            return;
        }
        const old = t;
        const q = obj.quan ?? 1;
        await pline(q > 1 ? 'Your spellbooks fade.' : 'Your spellbook fades.');
        obj.otyp = OTYP_SPE_BLANK_PAPER;
        obj.dknown = 0;
        if ((obj.spestudied | 0) > 0 && old !== OTYP_SPE_NOVEL) obj.spestudied = rn2(obj.spestudied | 1);
        if (inInvent && g.iflags?.perm_invent) updateInventory();
        return;
    }

    if (oclass === NH5_POTION_CLASS) {
        if (t === OTYP_POT_WATER) return;
        if (t === OTYP_POT_ACID) {
            await potAcidDamageMinimal(g, obj);
            return;
        }
        if ((obj.odiluted | 0) > 0) {
            await pline('Your potion dilutes further.');
            obj.otyp = OTYP_POT_WATER;
            obj.dknown = 0;
            obj.blessed = 0;
            obj.cursed = 0;
            obj.odiluted = 0;
        } else {
            await pline('Your potion dilutes.');
            obj.odiluted = (obj.odiluted | 0) + 1;
        }
        if (inInvent && g.iflags?.perm_invent) updateInventory();
    }
}

/**
 * C: trap.c water_damage_chain(obj, here) — walk **`nobj`** or **`nexthere`**.
 * @param {unknown} obj chain head
 * @param {boolean} here floor pile (**`nexthere`**) vs hero invent (**`nobj`**)
 * @param {typeof game} [g]
 */
export async function waterDamageChain(obj, here, g = game) {
    for (let o = obj; o; ) {
        const next = here ? o.nexthere : o.nobj;
        await waterDamageOne(o, false, g);
        o = next;
    }
}

/** C: `water_damage_chain(gi.invent, FALSE)` after pool / certain traps. */
export async function waterDamageChainHeroInventory(g = game) {
    if (!g.invent) return;
    await waterDamageChain(g.invent, false, g);
}
