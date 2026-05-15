// objnam.js — Object naming for messages (minimal until objnam.c is ported).
// C ref: objnam.c doname(), doname_with_price()

import { game } from './gstate.js';
import { NH5_SPBOOK_CLASS } from './nh5_objclass.js';
import { isSpellbookOtyp, spellbookAppearanceNounPhrase } from './spellbook_discovery_lines.js';

/** C: objects.h GOLD_PIECE (matches mklev.js stub constant). */
const GOLD_PIECE = 466;

/**
 * C: doname(obj) — very small subset for invent.c look_here().
 * Spellbooks: if `otyp` is an NH5 spellbook and `g.objectDiscovery` contains it,
 * name like `a spellbook of force bolt` (C appearance after skill_based_spellbook_id).
 * @param {{ otyp?: number, quan?: number, oclass?: number }} otmp
 * @param {object} [g]
 */
export function doname(otmp, g = game) {
    if (!otmp) return 'nothing';
    const q = otmp.quan ?? 1;
    if (otmp.otyp === GOLD_PIECE) {
        return q === 1 ? 'a gold piece' : `${q} gold pieces`;
    }
    const otyp = otmp.otyp | 0;
    const oc = otmp.oclass | 0;
    const treatAsSpellbook = oc === NH5_SPBOOK_CLASS || isSpellbookOtyp(otyp);
    if (treatAsSpellbook && isSpellbookOtyp(otyp)) {
        const known = g?.objectDiscovery instanceof Set && g.objectDiscovery.has(otyp);
        const phrase = known ? spellbookAppearanceNounPhrase(otyp) : 'spellbook';
        if (!phrase) return q === 1 ? 'a spellbook' : `${q} spellbooks`;
        if (q === 1) return `a ${phrase}`;
        /* plural: spellbook of X → spellbooks of X */
        if (known && phrase.startsWith('spellbook of ')) {
            const tail = phrase.slice('spellbook of '.length);
            return `${q} spellbooks of ${tail}`;
        }
        return `${q} ${phrase}s`;
    }
    return `an object (${otmp.otyp})`;
}
