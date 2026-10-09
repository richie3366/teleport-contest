import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { melt_ice } from '../js/zap.js';
import { ICE, ICED_POOL, POOL, ROOM } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';

// C ref: zap.c melt_ice `:5040–5079` — the `:5059–5060` arm gates
// `vision_recalc(1)` on `Underwater` ≡ u.uinwater (youprop.h:279).
// JS read the sticky `game.u?.Underwater` flat (zero writers anywhere
// in js/ — dead false), so a submerged hero never recalced where C
// does. Fix (D-3400 idiom): read the live `(game.u?.uinwater | 0)` bit.
// Staging: ICE (ICED_POOL) at (28,10), hero at (30,10) so u_at is
// false; viz unset so cansee is false (Norep skipped); no traps,
// objects, boulders or monsters (trap/boulder/minliquid arms skipped).
// vision_inited stays unset so vision_recalc is clear-and-return; the
// preset game.vision_full_recalc = 1 is the gate's verdict (0 = ran).

const MX = 28;
const MY = 10;

function setup(hero) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(5059);
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, uswallow: 0,
        ...hero,
    };
    game.youmonst = { mx: 30, my: 10, data: { mlet: 'S_HUMAN' } };
    const cells = new Map();
    cells.set(`${MX},${MY}`, { typ: ICE, icedpool: ICED_POOL, drawbridgemask: 0 });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, { typ: ROOM, lit: 0, flags: 0 });
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game.moves = 100;
    game.flags = { verbose: true };
    game._objects_at = new Map();
    game.vision_full_recalc = 1;
}

describe('melt_ice Underwater gate reads live uinwater (zap.c:5059–5060, youprop.h:279)', () => {
    it('submerged hero (uinwater=1): vision_recalc runs', async () => {
        setup({ uinwater: 1 });
        await melt_ice(MX, MY, null);
        assert.equal(game.level.at(MX, MY).typ, POOL, 'staging: ice melted to pool');
        assert.equal(game.vision_full_recalc, 0, 'C :5059–5060 recalcs Underwater');
    });

    it('surface control (uinwater=0): no recalc', async () => {
        setup({ uinwater: 0 });
        await melt_ice(MX, MY, null);
        assert.equal(game.level.at(MX, MY).typ, POOL, 'staging: ice melted to pool');
        assert.equal(game.vision_full_recalc, 1, 'surface hero skips the recalc');
    });

    it('dead u.Underwater flat alone does not recalc (live bit rules)', async () => {
        setup({ uinwater: 0, Underwater: 1 });
        await melt_ice(MX, MY, null);
        assert.equal(game.level.at(MX, MY).typ, POOL, 'staging: ice melted to pool');
        assert.equal(game.vision_full_recalc, 1, 'sticky flat must not gate C recalc');
    });
});
