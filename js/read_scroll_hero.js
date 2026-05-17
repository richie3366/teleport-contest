// read_scroll_hero.js — Hero **`r`** read scroll subset until full **`read.c`** **`doread`** / **`seffects`**.
// C ref: read.c **`doread`** (blind+**`dknown`**, confused preamble, blank **`seffect_blank_paper`**),
//        **`learnscroll`** / **`learnscrolltyp`**; invent consume when scroll vanishes (**`useup`**-style).

import { game } from './gstate.js';
import { pline, flush_screen } from './display.js';
import { NH5_SCROLL_CLASS } from './nh5_objclass.js';
import { removeObjFromHeroInvent } from './water_damage.js';
import { observeObjectHeroMinimalLikeC } from './objnam.js';
import { learnscrollHeroLikeC } from './discover_scroll.js';

/** C: **`objects_nums`** **`SCR_BLANK_PAPER`** (**`mkobj_scroll_class_rng_like_c.js`**). */
const OTYP_SCR_BLANK_PAPER = 364;

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
 * C: read.c **`doread`** — single scroll from invent; **`seffects`** deferred (**`nothing_happens`** tail only if unsupported otyp).
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

    if (otyp === OTYP_SCR_BLANK_PAPER) {
        if (blind) await pline("You don't remember there being any magic words on this scroll.");
        else await pline('This scroll seems to be blank.');
        learnscrollHeroLikeC(g, scroll);
        g._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }

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

    learnscrollHeroLikeC(g, scroll);

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

    g.context.move = 1;
    g._retainMessageAfterCommand = true;
    await flush_screen(1);
}
