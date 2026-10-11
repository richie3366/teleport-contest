import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { objects_globals_init, objectNames } from '../js/objects.js';
import { confer_oc_oprop } from '../js/do_wear.js';
import { mon_warning, warning_of } from '../js/display.js';
import { Searching } from '../js/attrib.js';
import { WARNING, SEARCHING, W_RINGR, FROMEXPER } from '../js/const.js';

// C ref: youprop.h `:163–165` Warning ≡ (uprops[WARNING].intrinsic ||
// .extrinsic) and `:175–177` Searching ≡ (uprops[SEARCHING].intrinsic ||
// .extrinsic). confer_oc_oprop writes a worn ring's bit to the slot only
// and never mirrors EWarning / ESearching, so the flats-only readers
// (display.js mon_warning, attrib.js Searching) dropped both rings — same
// class as the Flying clone (flying-uprops-union.test.mjs). Caught live by
// scen-worldtour-Wizard-95210: step 526 (`Ps` ring of warning — C paints
// warning digits 1/3/3/5, JS none) and step 965 (attributes: C «You had
// automatic searching because of your ring of searching.», JS no line).
// Searching also gates the moveloop autosearch (allmain.c:342).
const RIN_WARNING = objectNames.indexOf('RIN_WARNING');
const RIN_SEARCHING = objectNames.indexOf('RIN_SEARCHING');

describe('Warning / Searching uprops union (youprop.h)', () => {
    beforeEach(() => {
        resetGame();
        objects_globals_init();
        game.u = { ux: 10, uy: 10, uprops: {} };
        game.context = { warnlevel: 1 };
    });

    it('worn ring of warning: hostile m_lev 12 at dist2 4 warns as 3', () => {
        const bat = { mx: 12, my: 10, m_lev: 12, mpeaceful: 0 };
        assert.equal(mon_warning(bat), false);
        confer_oc_oprop({ otyp: RIN_WARNING }, W_RINGR, true);
        assert.equal(game.u.uprops[WARNING].extrinsic, W_RINGR);
        assert.equal(game.u.EWarning, undefined); // slot only, no flat mirror
        assert.equal(mon_warning(bat), true);
        assert.equal(warning_of(bat), 3);
        confer_oc_oprop({ otyp: RIN_WARNING }, W_RINGR, false);
        assert.equal(mon_warning(bat), false);
    });

    it('ring of warning keeps the peaceful / range / warnlevel gates', () => {
        confer_oc_oprop({ otyp: RIN_WARNING }, W_RINGR, true);
        assert.equal(mon_warning({ mx: 12, my: 10, m_lev: 12, mpeaceful: 1 }), false);
        assert.equal(mon_warning({ mx: 20, my: 10, m_lev: 12, mpeaceful: 0 }), false);
        assert.equal(mon_warning({ mx: 12, my: 10, m_lev: 3, mpeaceful: 0 }), false);
    });

    it('experience HWarning flat still warns (adjabil writes the flat)', () => {
        game.u.HWarning = FROMEXPER;
        assert.equal(mon_warning({ mx: 12, my: 10, m_lev: 8, mpeaceful: 0 }), true);
    });

    it('worn ring of searching: Searching() true, off again on removal', () => {
        assert.equal(Searching(), false);
        confer_oc_oprop({ otyp: RIN_SEARCHING }, W_RINGR, true);
        assert.equal(game.u.uprops[SEARCHING].extrinsic, W_RINGR);
        assert.equal(Searching(), true);
        confer_oc_oprop({ otyp: RIN_SEARCHING }, W_RINGR, false);
        assert.equal(Searching(), false);
    });

    it('flat HSearching / ESearching (adjabil, artifact) still search', () => {
        game.u.HSearching = FROMEXPER;
        assert.equal(Searching(), true);
        game.u.HSearching = 0;
        game.u.ESearching = 1;
        assert.equal(Searching(), true);
    });
});
