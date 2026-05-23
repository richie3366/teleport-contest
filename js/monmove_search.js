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
