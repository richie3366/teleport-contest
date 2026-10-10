// `zap.c` hit (C zap.c:3555–3568) — buzz hit message names a
// spotted-but-unseen monster (C: verbose && (cansee(bhitpos) ||
// canspotmon || engulfing_u)). The JS buzz path cloned hit() as
// hit_zap (zap.js:1543) reading canseemon instead of canspotmon, so
// a blind telepathic hero heard "hits it" where C names the sensed
// monster (scen-worldtour-Wizard-95229 step 554: C "The bolt of cold
// hits the purple worm!" vs JS "hits it!"). Fix: delete the clone,
// import hit from mthrowu.js (D-1849 pattern).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog } from '../js/rng.js';
import { dobuzz } from '../js/zap.js';
import { ROOM } from '../js/const.js';
import { mons, monsterNames } from '../js/monsters.js';
import {
    canseemon, canspotmon, getmsghistory, reset_display_messages,
} from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';

const PM_PURPLE_WORM = monsterNames.indexOf('PM_PURPLE_WORM');

// type 2 = ZT_WAND(ZT_COLD); bolt starts at (4,6) heading east so it
// crosses (6,6) where the worm waits. sayhit reports the out-of-sight
// hit (C zap.c:4935); the hero at (5,5) is never in the beam.
function setup(seed, heroExtra = {}) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(seed);
    enableRngLog();
    for (let i = 0; i < 20; ++i) pushKey(' ');
    const worm = {
        mx: 6, my: 6, mhp: 200, mhpmax: 200, mcanmove: 1, msleeping: 0,
        mpeaceful: 0, mtame: 0, m_ap_type: 0, mcansee: 1,
        mnum: PM_PURPLE_WORM,
        data: { ...(mons(PM_PURPLE_WORM) || {}), mndx: PM_PURPLE_WORM },
        minvent: null,
    };
    game.u = {
        ux: 5, uy: 5, uhp: 30, uhpmax: 30,
        HBlinded: 1, ETelepat: 1, // blind + helm-of-telepathy ESP
        ...heroExtra,
    };
    game.youmonst = { data: { name: 'human' } };
    game.level = {
        at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, lit: 1 }),
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [worm];
    game.moves = 1000;
    game.flags = {};
    game.iflags = { window_inited: true };
    return worm;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
        out.push(String(m));
    }
    return out;
}

describe('dobuzz hit names a sensed-but-unseen monster (zap.c hit:3561-3564)', () => {
    it('blind telepath: bolt names the purple worm', { timeout: 15000 }, async () => {
        const worm = setup(3);
        // Setup guards: unseen (blind, no viz grid) yet spotted via ESP.
        assert.equal(canseemon(worm), false);
        assert.equal(canspotmon(worm), true);
        await dobuzz(2, 1, 4, 6, 1, 0, true, false, false);
        const out = messages().join('\n');
        assert.match(out, /hits the purple worm[.!]/);
    });

    it('blind without ESP: bolt says "it" (control)', { timeout: 15000 }, async () => {
        const worm = setup(3, { ETelepat: 0 });
        assert.equal(canseemon(worm), false);
        assert.equal(canspotmon(worm), false);
        await dobuzz(2, 1, 4, 6, 1, 0, true, false, false);
        const out = messages().join('\n');
        assert.match(out, /hits it[.!]/);
    });
});
