import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { set_levltyp } from '../js/trap.js';
import { AIR, SDOOR } from '../js/const.js';

// C ref: mkmaze.c set_levltyp `:77–121` — the SDOOR→AIR arboreal hack
// (`:82–87`: secret doors in garden theme rooms stay SDOOR, set
// arboreal_sdoor, return TRUE). js/trap.js:893 read the name `AIR`
// without importing it: ReferenceError voided
// scen-worldtour-Knight-578306 at step 0 (the scorer misattributes
// throw-voids to the first C draw, randomize_gem_colors o_init.c:89).
// D-3833 pattern (KILLED_BY_AN); this pop's writer per its Next.
describe('set_levltyp SDOOR→AIR hack (mkmaze.c:82-87)', () => {
    beforeEach(() => {
        resetGame();
        const cell = { typ: SDOOR, arboreal_sdoor: 0 };
        game.level = { at: (x, y) => (x === 5 && y === 5 ? cell : undefined) };
    });

    it('AIR value matches C (rm.h:91)', () => {
        assert.equal(AIR, 35);
    });

    it('SDOOR→AIR hack runs: no throw, typ stays SDOOR, flag set', () => {
        const ret = set_levltyp(5, 5, AIR); // pre-fix: ReferenceError: AIR is not defined
        assert.equal(ret, true);
        const cell = game.level.at(5, 5);
        assert.equal(cell.typ, SDOOR);
        assert.equal(cell.arboreal_sdoor, 1);
    });
});
