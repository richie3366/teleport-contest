// discover_scroll.js — Scroll type discovery (invent.c makeknown / discover_object for SCROLL_CLASS).
// C ref: invent.c makeknown(), discover_object(); objnam.c xname scroll branch.

/**
 * C: invent.c makeknown / discover_object — record scroll otyp as fully named for doname / xnameBurnFloor.
 * @param {object} g
 * @param {number} otyp
 */
export function discoverScrollOtyp(g, otyp) {
    if (!g) return;
    if (!(g.scrollDiscovery instanceof Set)) g.scrollDiscovery = new Set();
    g.scrollDiscovery.add(otyp | 0);
}
