// body_part_hero.js — Hero body-part strings (polyself.c mbodypart / hack.c body_part subset).
// C ref: polyself.c mbodypart(&gy.youmonst, part); dig.c zap_dig vertical — pline(**`body_part(HEAD)`**);
//        defsym.h MONSYM indices (**`S_*`**); **`shop.js`** **`PM_STALKER`** **153** (**`mons[]`** order in this fork).
//
// Omits **`PM_JELLYFISH`** on **`S_EEL`** (eel class vs jelly **`cerebral area`**) until contest **`mnum`** is wired.

import { raceptr, slithy, humanoidLikeC } from './mondata.js';

/** C: defsym.h MONSYM — subset for **`mbodypart`** HEAD routing. */
const S_BLOB = 2;
const S_COCKATRICE = 3;
const S_EYE = 5;
const S_JELLY = 10;
const S_VORTEX = 22;
const S_LIGHT = 25;
const S_FUNGUS = 32;
const S_DRAGON = 30;
const S_SPIDER = 19;
const S_WORM = 23;
const S_CENTAUR = 29;
const S_UNICORN = 21;
const S_PUDDING = 42;
const S_EEL = 57;
const S_ELEMENTAL = 31;

/** C: **`mons[]`** index — matches **`shop.js`** stalker / **`invisible`** tests in this fork. */
const PM_STALKER = 153;

/**
 * C: polyself.c **`mbodypart(&gy.youmonst, HEAD)`** — most forms **`"head"`**; light **`"beam"`**, sphere **`"body"`**,
 * jelly **`"cerebral area"`**, worm **`"anterior segment"`**, spider **`"cephalothorax"`**, vortex/elemental **`"central core"`**,
 * fungus **`"cap area"`**.
 * @param {import('./gstate.js').game} g
 * @returns {string}
 */
export function mbodypartHeroHeadLikeC(g) {
    const ptr = raceptr(g?.youmonst);
    const ml = ptr.mlet | 0;
    const mn = ptr.mnum | 0;

    if (ml === S_LIGHT) return 'beam';

    if (mn === PM_STALKER) return 'head';

    if (ml === S_EEL) return 'head'; /* C: fish_parts[HEAD]; jellyfish should use jelly_parts (TODO **`PM_JELLYFISH`**) */

    if (ml === S_WORM) return 'anterior segment';
    if (ml === S_SPIDER) return 'cephalothorax';

    if (slithy(ptr)) return 'head'; /* C: snake_parts[HEAD]; dragon uses this only with **`part == HAIR`**. */

    if (ml === S_EYE) return 'body';

    if (ml === S_JELLY || ml === S_BLOB || ml === S_PUDDING) return 'cerebral area';

    if (ml === S_VORTEX || ml === S_ELEMENTAL) return 'central core';

    if (ml === S_FUNGUS) return 'cap area';

    if (humanoidLikeC(ptr)) return 'head';

    if (ml === S_COCKATRICE || ml === S_CENTAUR || ml === S_UNICORN) return 'head';

    return 'head';
}
