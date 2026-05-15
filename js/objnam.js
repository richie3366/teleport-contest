// objnam.js — Object naming for messages (minimal until objnam.c is ported).
// C ref: objnam.c doname(), doname_with_price()

/** C: objects.h GOLD_PIECE (matches mklev.js stub constant). */
const GOLD_PIECE = 466;

/**
 * C: doname(obj) — very small subset for invent.c look_here().
 * @param {{ otyp?: number, quan?: number }} otmp
 */
export function doname(otmp) {
    if (!otmp) return 'nothing';
    const q = otmp.quan ?? 1;
    if (otmp.otyp === GOLD_PIECE) {
        return q === 1 ? 'a gold piece' : `${q} gold pieces`;
    }
    return `an object (${otmp.otyp})`;
}
