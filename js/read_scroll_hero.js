// read_scroll_hero.js — Hero **`r`** read scroll subset until full **`read.c`** **`doread`** / **`seffects`**.
// C ref: read.c **`doread`** (**`gk.known=FALSE`**, blind+**`dknown`**, non-blank disappear/confused plines,
//        **`!seffects(scroll)`** tail: **`learnscroll`**/**`trycall`** if **`!oc_name_known`**, **`useup`**
//        unless **`SCR_BLANK_PAPER`**),
//        **`seffects`** (**`exercise`** when **`oc_magic`**, **`switch(otyp)`** — blank wired, other cases stub),
//        **`learnscroll`** / **`learnscrolltyp`**.

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { A_WIS } from './const.js';
import { exercise } from './attrib.js';
import { SCROLL_CLASS_MKOBJ_OC_PROB_ROWS } from './mkobj_scroll_class_rng_like_c.js';
import { NH5_SCROLL_CLASS } from './nh5_objclass.js';
import { removeObjFromHeroInvent } from './water_damage.js';
import { observeObjectHeroMinimalLikeC } from './objnam.js';
import { learnscrollHeroLikeC } from './discover_scroll.js';

/** C: **`objects_nums`** **`SCR_BLANK_PAPER`** — **`SCROLL(..., mgc, ...)`** with **`mgc`** **0** (**`objects.h`**). */
const OTYP_SCR_BLANK_PAPER = 364;

/**
 * C: **`objects[otyp].oc_magic`** — **`SCROLL`** macro **`mgc`**; false for blank paper (and otyps outside scroll table).
 * @param {number} otyp
 */
export function scrollOtypHasOcMagicLikeC(otyp) {
    const t = otyp | 0;
    if (t === OTYP_SCR_BLANK_PAPER) return false;
    for (let i = 0; i < SCROLL_CLASS_MKOBJ_OC_PROB_ROWS.length; i++) {
        if ((SCROLL_CLASS_MKOBJ_OC_PROB_ROWS[i][0] | 0) === t) return true;
    }
    return false;
}

/**
 * C: read.c **`seffects`** — return **1** if scroll was **`useup`**'d inside (**`sobj`** null), else **0**.
 * Per-**`otyp`** effects mostly TODO; non-blank scrolls set **`gk.known`** so **`doread`** tail matches **`learnscroll`** until real **`seffect_*`** ports.
 * @param {import('./gstate.js').game} g
 * @param {{ otyp?: number, oclass?: number, dknown?: number }} scroll
 * @param {boolean} blind
 * @returns {Promise<number>}
 */
export async function seffectsHeroReadScrollLikeC(g, scroll, blind) {
    const otyp = scroll.otyp | 0;
    if (scrollOtypHasOcMagicLikeC(otyp)) exercise(A_WIS, true);

    switch (otyp) {
        case OTYP_SCR_BLANK_PAPER: {
            /* C: **`seffect_blank_paper`** — plines; **`gk.known = TRUE`** */
            if (blind) await pline("You don't remember there being any magic words on this scroll.");
            else await pline('This scroll seems to be blank.');
            g._readScrollGkKnown = true;
            return 0;
        }
        default: {
            const ocl = scroll.oclass | 0;
            if (ocl === NH5_SCROLL_CLASS && otyp !== OTYP_SCR_BLANK_PAPER) {
                /* C: most **`seffect_*`** set **`gk.known`**; stub keeps prior always-learn on read until wired */
                g._readScrollGkKnown = true;
            } else {
                g._readScrollGkKnown = false;
            }
            return 0;
        }
    }
}

/** @param {import('./gstate.js').game} g */
function heroBlindForReadLikeC(g) {
    const u = g?.u;
    if (!u) return false;
    return (
        !!(u.Blind | 0) ||
        !!(u.ublind | 0) ||
        (u.timed?.blind ?? 0) > 0 ||
        (u.timed?.blinded ?? 0) > 0
    );
}

/** @param {import('./gstate.js').game} g */
function heroConfusedForReadLikeC(g) {
    const u = g?.u;
    if (!u) return false;
    return !!(u.Confusion | 0) || (u.timed?.confusion ?? 0) > 0;
}

/**
 * C: **`getobj`** not ported — first carried **`SCROLL_CLASS`** object (**`invent`** chain order).
 * @param {import('./gstate.js').game} g
 */
export function firstCarriedScrollForReadLikeC(g) {
    for (let o = g.invent; o; o = o.nobj) {
        if ((o.oclass | 0) === NH5_SCROLL_CLASS) return o;
    }
    return null;
}

/**
 * C: read.c **`doread`** — first invent scroll; **`seffects`** **`switch(otyp)`** (blank + stub default).
 * @param {import('./gstate.js').game} [g]
 */
export async function doReadHeroScrollCmdLikeC(g = game) {
    g.context.move = 0;
    const scroll = firstCarriedScrollForReadLikeC(g);
    if (!scroll) {
        await pline('You have nothing to read.');
        g._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }

    const blind = heroBlindForReadLikeC(g);
    if (blind && !(scroll.dknown | 0)) {
        await pline('Being blind, you cannot read the formula on the scroll.');
        g._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }

    const otyp = scroll.otyp | 0;
    const confused = heroConfusedForReadLikeC(g);

    observeObjectHeroMinimalLikeC(g, scroll);

    /* C: **`gk.known = FALSE`** at **`doread`** entry — carried on **`g`** for tail */
    g._readScrollGkKnown = false;

    /* C: read.c **`doread`** — **`if (otyp != SCR_BLANK_PAPER)`** disappear + confused plines before **`seffects`** */
    if (otyp !== OTYP_SCR_BLANK_PAPER) {
        const silently = false; /* C: **`can_chant`** — not ported */
        if (blind) {
            await pline(
                'As you %s the formula on it, the scroll disappears.',
                silently ? 'cogitate' : 'pronounce',
            );
        } else {
            await pline('As you read the scroll, it disappears.');
        }
        if (confused) {
            const u = g.u;
            if ((u?.Hallucination | 0) || (u?.timed?.hallucination ?? 0) > 0) {
                await pline('Being so trippy, you screw up...');
            } else {
                await pline('Being confused, you %s the magic words...', silently ? 'misunderstand' : 'mispronounce');
            }
        }
    }

    /* C: **`seffects`** returns **1** if **`useup`** already ran inside (**`sobj`** null) */
    const scrollUseupInside = await seffectsHeroReadScrollLikeC(g, scroll, blind);

    /* C: **`if (!seffects(scroll))`** */
    if (!scrollUseupInside) {
        const t = scroll.otyp | 0;
        const alreadyKnown = g.scrollDiscovery instanceof Set && g.scrollDiscovery.has(t);
        if (!alreadyKnown) {
            if (g._readScrollGkKnown) {
                learnscrollHeroLikeC(g, scroll);
            }
            /* C: else **`trycall(scroll)`** — not ported */
        }
        if (t !== OTYP_SCR_BLANK_PAPER) {
            const q = scroll.quan | 0;
            if (q > 1) {
                scroll.quan = q - 1;
                if (scroll.owt != null) {
                    const per = Math.max(1, Math.trunc((scroll.owt | 0) / q));
                    scroll.owt = per * (scroll.quan | 0);
                }
            } else {
                removeObjFromHeroInvent(g, scroll);
            }
        }
    }

    g.context.move = 1;
    g._retainMessageAfterCommand = true;
    await flush_screen(1);
}
