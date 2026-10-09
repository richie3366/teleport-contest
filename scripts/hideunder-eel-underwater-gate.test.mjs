import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { hideunder } from '../js/mon.js';
import { POOL, COULD_SEE } from '../js/const.js';

// C ref: mon.c hideunder `:4746–4747` — the S_EEL arm hides only in
// `is_pool && !Is_waterlevel && (!Underwater || !couldsee)`, with
// Underwater ≡ u.uinwater (youprop.h:279). JS read the sticky
// `u.Underwater` flat (zero writers anywhere in js/ — dead false) instead
// of the live bit, so a submerged hero with clear LOS watched the eel
// hide where C keeps it detected. D-3400 idiom: read `(u.uinwater | 0)`.
// The monmove.js postmov clone already reads the live bit; this pins the
// canonical mon.js export. Callers stay wired (name/signature unchanged).
// in_mklev staging: seeit is 0 and newsym is suppressed, so the its
// assert the detection predicate only (the You_see message stays a named
// omission on this export — the monmove.js clone shows it).

const EX = 10, EY = 10;

function setup({ uinwater = 0, Underwater = undefined, couldsee = true } = {}) {
    game.u = {
        ux: 12, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater, ustuck: null, utrap: 0, uundetected: 0,
        ...(Underwater === undefined ? {} : { Underwater }),
    };
    game.youmonst = { mx: 12, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = { at: () => ({ typ: POOL, lit: 1 }), traps: [] };
    game.viz_array = [];
    game.viz_array[EY] = [];
    game.viz_array[EY][EX] = couldsee ? COULD_SEE : 0;
    game.in_mklev = 1;
    game.water_level = undefined;
}

function eel() {
    return {
        mx: EX, my: EY, data: { mlet: 'S_EEL' },
        mtrapped: 0, mtame: 0, mundetected: 0, m_id: 7,
    };
}

describe('hideunder S_EEL arm reads live uinwater (mon.c:4746-4747, youprop.h:279)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            viz: game.viz_array, mklev: game.in_mklev,
            water: game.water_level,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.viz_array = saved.viz;
        game.in_mklev = saved.mklev;
        game.water_level = saved.water;
    });

    it('submerged hero + clear LOS: eel stays detected', () => {
        setup({ uinwater: 1, couldsee: true });
        const m = eel();
        assert.equal(hideunder(m), false);
        assert.equal(m.mundetected, 0);
    });

    it('surface control: eel in pool hides', () => {
        setup({ uinwater: 0, couldsee: true });
        const m = eel();
        assert.equal(hideunder(m), true);
        assert.equal(m.mundetected, 1);
    });

    it('dead u.Underwater flat alone does not expose (live bit rules)', () => {
        setup({ uinwater: 0, Underwater: 1, couldsee: true });
        const m = eel();
        assert.equal(hideunder(m), true);
        assert.equal(m.mundetected, 1);
    });

    it('submerged hero + blocked LOS: eel still hides (!couldsee arm)', () => {
        setup({ uinwater: 1, couldsee: false });
        const m = eel();
        assert.equal(hideunder(m), true);
        assert.equal(m.mundetected, 1);
    });
});
