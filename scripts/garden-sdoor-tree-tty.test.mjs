import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { terrain_glyph } from '../js/display.js';
import { SDOOR } from '../js/const.js';
import { CLR_GREEN, NO_COLOR } from '../js/terminal.js';

// C ref: display.c back_to_glyph `:2305` + wall_angle `:3600` — an
// arboreal (garden-hack set_levltyp SDOOR→AIR, mkmaze.c:85; rm.h:224
// aliases the bit to candig) secret door renders as a tree (S_tree)
// before any wall logic, with no seenv gate. The int twin
// (back_to_glyph) and wall_angle both carry the arm; the tty twin
// (terrain_glyph) sent SDOOR straight to wall_glyph, whose table has
// no S_tree entry and fell back to stone blank — so a garden secret
// door painted blank where C paints a green tree (scen-worldtour-
// Wizard-95218 step 345 arrival, cell (15,13): C green `g`, JS blank).
// Staging: bare loc objects through the real terrain_glyph(), no RNG.
function setup({ decgraphics = true } = {}) {
    resetGame();
    game.u = { ux: 1, uy: 0, uz: { dnum: 0, dlevel: 1 } };
    game.dungeons = [{ flags: {} }];
    game.level = { flags: {} };
    game.iflags = { decgraphics };
    game.currentgraphics = 0;
}

function sdoor({ arboreal = 0, seenv = 64 } = {}) {
    return {
        typ: SDOOR, arboreal_sdoor: arboreal, candig: arboreal,
        doormask: 4, flags: 4, horizontal: false, seenv, wall_info: 2,
    };
}

describe('terrain_glyph SDOOR arboreal_sdoor renders tree (display.c:2305/:3600)', () => {
    it('DEC: arboreal secret door paints green meta-g like TREE', () => {
        setup({ decgraphics: true });
        assert.deepEqual(terrain_glyph(sdoor({ arboreal: 1 }), 15, 13),
            { ch: 'g', color: CLR_GREEN, dec: true });
    });

    it('ASCII: arboreal secret door paints green # like TREE', () => {
        setup({ decgraphics: false });
        assert.deepEqual(terrain_glyph(sdoor({ arboreal: 1 }), 15, 13),
            { ch: '#', color: CLR_GREEN, dec: false });
    });

    it('no seenv gate: unseen arboreal secret door still paints tree', () => {
        setup({ decgraphics: true });
        // C returns S_tree unconditionally (no `seenv ?` gate on this arm).
        assert.deepEqual(terrain_glyph(sdoor({ arboreal: 1, seenv: 0 }), 15, 13),
            { ch: 'g', color: CLR_GREEN, dec: true });
    });

    it('control: plain secret door still takes the wall path', () => {
        setup({ decgraphics: true });
        // Unseen → stone blank via wall_glyph (unchanged behavior).
        assert.deepEqual(terrain_glyph(sdoor({ arboreal: 0, seenv: 0 }), 15, 13),
            { ch: ' ', color: NO_COLOR, dec: false });
        // Seen → a wall glyph (not a tree, not blank).
        const seen = terrain_glyph(sdoor({ arboreal: 0, seenv: 64 }), 15, 13);
        assert.notEqual(seen.ch, 'g');
        assert.notEqual(seen.ch, ' ');
    });
});
