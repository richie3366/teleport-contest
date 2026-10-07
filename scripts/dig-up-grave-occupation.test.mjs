// dig_up_grave risen zombie/mummy stops the digging occupation.
// C dig.c:1027–1093 + makemon.c:1502–1504: the makemon in-body
// dochugw(mtmp, FALSE) runs outside the MM_NOMSG guard, so a risen
// threat stops a digging hero ("You stop digging.") even though no
// appear-Norep prints. JS defers that in-body work to the caller's
// makemon_appear_msg (D-0559/D-0928); dig_up_grave never called it,
// so the occupation silently survived the tomb (scen-dig-Tourist-94355
// step 39, scen-dig-Archeologist-94215 step 61).
// Pre-fix: occupation stays set on the zombie/mummy cases below.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { dig_up_grave } from '../js/dig.js';
import {
    GRAVE, ROOM, ROWNO, COLNO, COULD_SEE, IN_SIGHT,
} from '../js/const.js';
import { reset_display_messages } from '../js/display.js';
import { objects_globals_init } from '../js/objects.js';

// Headless notes: the grave cell needs flags 0 (not emptygrave) so the
// rn2(5) case roll runs; viz_array carries COULD_SEE|IN_SIGHT around the
// hero so the risen monster is a spottable threat (dochugw's
// canspotmon + couldsee gates); objects data so corpse/minvent mksobj
// works. Seeds pin which rn2(5) case rolls (2 → zombie, 16 → mummy,
// 1 → unoccupied).
function setupGrave(seed) {
    resetGame();
    objects_globals_init();
    reset_display_messages();
    initRng(seed);
    game.iflags = { window_inited: true };
    const cells = {};
    const cell = (x, y) => {
        const k = x + ',' + y;
        if (!cells[k]) {
            cells[k] = {
                typ: (x === 5 && y === 5) ? GRAVE : ROOM,
                flags: 0, horizontal: 0, doormask: 0, seenv: 0x1ff,
                wall_info: 0, altarmask: 0, drawbridgemask: 0, lit: 1,
            };
        }
        return cells[k];
    };
    game.level = {
        at: (x, y) => cell(x, y),
        flags: { rndmongen: true }, objects: {}, monsters: {},
    };
    game.viz_array = Array.from({ length: ROWNO }, () => new Array(COLNO).fill(0));
    for (let y = 3; y <= 7; y++) {
        for (let x = 3; x <= 7; x++) game.viz_array[y][x] = COULD_SEE | IN_SIGHT;
    }
    game.u = { ux: 5, uy: 5, ualign: { type: 0, record: 0 } };
    game.fmon = [];
    game.mvitals = [];
    game.occupation = function dig() { return 1; };
    game.occtxt = 'digging';
}

describe('dig_up_grave risen threat stops digging', () => {
    beforeEach(() => { setupGrave(2); });

    it('zombie case stops the occupation with "You stop digging."', async () => {
        await dig_up_grave(null);
        assert.equal(game.fmon.length, 1, 'zombie rose');
        assert.equal(game.occupation, null, 'digging occupation stopped');
        assert.match(game._pending_message ?? '', /You stop digging\./);
    });

    it('mummy case stops the occupation with "You stop digging."', async () => {
        setupGrave(16);
        await dig_up_grave(null);
        assert.equal(game.fmon.length, 1, 'mummy rose');
        assert.match(game._pending_message ?? '', /disturbed a tomb!/);
        assert.equal(game.occupation, null, 'digging occupation stopped');
        assert.match(game._pending_message ?? '', /You stop digging\./);
    });

    it('unoccupied grave leaves the occupation alone', async () => {
        setupGrave(1);
        await dig_up_grave(null);
        assert.equal(game.fmon.length, 0, 'nothing rose');
        assert.equal(typeof game.occupation, 'function', 'still digging');
    });
});
