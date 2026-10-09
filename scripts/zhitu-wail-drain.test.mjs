// `zap.c` zhitu tail losehp wail drain (C zap.c:4588 → hack.c:4289–4291).
// C runs maybe_wail inline inside losehp; JS losehp is sync and defers
// via game._needs_maybe_wail, so zhitu must drain it before returning
// (oil pattern: D-3608/D-3611). Missing drain dropped the low-HP wail
// on every ray that hit the hero (scen-chain-Monk-95415 s361 fire bolt:
// C «wailing of the Banshee» vs JS missing; scen-sweep-Barbarian-95305
// s894 lightning: JS wail one screen late via potionhit's drain).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { ubreatheu } from '../js/zap.js';
import { initRng } from '../js/rng.js';
import { reset_display_messages } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';
import { ROOM } from '../js/const.js';

const AD_MAGM = 1; // monattk.h: breath-MM arm (dtyp 20 → ZT_BREATH MM)

// Fire/MM breath through exported ubreatheu (C zap.c:3021, the smallest
// zhitu caller: no zap_hit gate, plain d(nd,6) damage). damn=1 keeps
// d(1,6)≤6 non-fatal on 11 HP while uhp*10<uhpmax stays true.
function setup(seed) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(seed);
    for (let i = 0; i < 20; ++i) pushKey(' ');
    game.u = {
        ux: 5, uy: 5, uhp: 11, uhpmax: 209,
        umonnum: 5, umonster: 5,
    };
    game.youmonst = { data: { name: 'human' } };
    game.level = {
        at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, lit: 1 }),
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game.invent = [];
    game.moves = 1000;
    game.wailmsg = 0;
    game.flags = {};
    game.iflags = { window_inited: true };
}

describe('zhitu tail drains the low-HP wail (zap.c:4588)', () => {
    it('breath-MM hit on a low-HP hero emits the wail inline', { timeout: 15000 }, async () => {
        setup(11);
        await ubreatheu({ adtyp: AD_MAGM, damn: 1 });
        // Damage landed, hero alive: the losehp ran non-fatally.
        assert.ok((game.u.uhp | 0) < 11 && (game.u.uhp | 0) >= 1);
        assert.equal(!!game.program_state?.gameover, false);
        // C maybe_wail ran: flag drained, wail stamped this move.
        assert.equal(game._needs_maybe_wail, false);
        assert.equal(game.wailmsg | 0, game.moves | 0);
    });
});
