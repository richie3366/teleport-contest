import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    glyph_is_piletop_generic_obj, glyph_is_normal_generic_obj,
    glyph_is_generic_object, glyph_is_normal_object,
    glyph_is_normal_piletop_obj, glyph_to_obj,
    GLYPH_OBJ_OFF, GLYPH_OBJ_PILETOP_OFF,
} from '../js/display.js';
import {
    objectNames, FIRST_OBJECT, NUM_OBJECTS, POTION_CLASS,
} from '../js/objects.js';

// C ref: display.h `:839–856` — generic glyphs are the class slots
// (OFF, OFF+FIRST_OBJECT-1) in each obj bank (FIRST_OBJECT=18:
// slots 1..17); a piletop otyp glyph is NORMAL, never generic.
// JS glyph_is_piletop_generic_obj covered the whole PILETOP bank
// (OFF..OFF+NUM_OBJECTS), so map_object's observe gate
// (display.c:340) observed every nearby piletop — e.g. the mondead
// treasure-drop smock in scen-chain-Priest-95401, which C never
// discos (extra "  apron" line in the discoveries menu).
// Companion: glyph_is_normal_object carries C's third disjunct
// (the normal-piletop arm), so glyph_is_object / glyph_to_obj / the
// pager showsym arm keep full both-bank coverage.

const SMOCK = objectNames.indexOf('ALCHEMY_SMOCK');
const PILE_SMOCK = SMOCK + GLYPH_OBJ_PILETOP_OFF;
const PILE_POTION = POTION_CLASS + GLYPH_OBJ_PILETOP_OFF;
const OBJ_SMOCK = SMOCK + GLYPH_OBJ_OFF;
const OBJ_POTION = POTION_CLASS + GLYPH_OBJ_OFF;

describe('piletop generic/normal glyph predicates (display.h:839-856)', () => {
    it('sanity: table numbering matches C (FIRST_OBJECT=18, smock=144)', () => {
        assert.equal(FIRST_OBJECT, 18);
        assert.equal(SMOCK, 144);
        assert.ok(NUM_OBJECTS > SMOCK);
    });

    it('piletop otyp glyph is NOT generic (the 95401 smock shape)', () => {
        assert.equal(glyph_is_piletop_generic_obj(PILE_SMOCK), false);
        assert.equal(glyph_is_generic_object(PILE_SMOCK), false);
    });

    it('piletop otyp glyph IS normal + normal-piletop, peels to otyp', () => {
        assert.equal(glyph_is_normal_piletop_obj(PILE_SMOCK), true);
        assert.equal(glyph_is_normal_object(PILE_SMOCK), true);
        assert.equal(glyph_to_obj(PILE_SMOCK), SMOCK);
    });

    it('piletop class slot (potion) IS generic, peels to class', () => {
        assert.equal(glyph_is_piletop_generic_obj(PILE_POTION), true);
        assert.equal(glyph_is_generic_object(PILE_POTION), true);
        assert.equal(glyph_to_obj(PILE_POTION), POTION_CLASS);
    });

    it('piletop OFF itself (mimic-zero shape): not generic, peels to 0', () => {
        assert.equal(glyph_is_piletop_generic_obj(GLYPH_OBJ_PILETOP_OFF), false);
        assert.equal(glyph_is_normal_piletop_obj(GLYPH_OBJ_PILETOP_OFF), true);
        assert.equal(glyph_to_obj(GLYPH_OBJ_PILETOP_OFF), 0);
    });

    it('OBJ bank unchanged: otyp normal, class slot generic, peels exact', () => {
        assert.equal(glyph_is_normal_generic_obj(OBJ_SMOCK), false);
        assert.equal(glyph_is_normal_object(OBJ_SMOCK), true);
        assert.equal(glyph_to_obj(OBJ_SMOCK), SMOCK);
        assert.equal(glyph_is_normal_generic_obj(OBJ_POTION), true);
        assert.equal(glyph_is_generic_object(OBJ_POTION), true);
        assert.equal(glyph_to_obj(OBJ_POTION), POTION_CLASS);
    });

    it('OBJ generic slots stay inside normal_object (documented JS superset of C arms 1+2; outcome-neutral: glyph_is_object ORs generic, glyph_to_obj peels identically)', () => {
        assert.equal(glyph_is_normal_object(OBJ_POTION), true);
        assert.equal(glyph_to_obj(GLYPH_OBJ_OFF + FIRST_OBJECT - 1), FIRST_OBJECT - 1);
    });
});
