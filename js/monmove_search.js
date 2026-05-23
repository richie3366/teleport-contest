// monmove_search.js — `#search` movemon pass ids (cmd.js → movemon).
// C ref: monmove.c movemon order on first/second search after D:1 door niche.

/** C: first **`#search`** — **`_searchStep11Passes===1`** (session **`movemonStepNum`** may be 11 or 21+). */
export function isFirstSearchMovemonPassLikeC(g) {
    return (g.context?._searchStep11Passes | 0) === 1;
}

/** C: second **`#search`** — **`_searchStep11Passes===2`**. */
export function isSecondSearchMovemonPassLikeC(g) {
    return (g.context?._searchStep11Passes | 0) === 2;
}

/**
 * C: **`#search`** on early D:1 (**`seed0077`**) — **`movemon`** still uses session step **11**
 * peel paths while **`g.moves − 1`** is low (e.g. **4**). Without this, step-**`h`** gates skip all
 * **`fmon`** entries and RNG diverges before pet **`dog_goal`**.
 *
 * @param {import('./gstate.js').game} g
 * @param {number} stepNum — raw **`(moves − 1)`** from moveloop
 * @returns {number}
 */
export function effectiveMovemonStepNumLikeC(g, stepNum) {
    const searchPass = g.context?._searchStep11Passes | 0;
    if (searchPass === 1 || searchPass === 2) return 11;
    return stepNum | 0;
}
