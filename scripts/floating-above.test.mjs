import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { floating_above, sink_backs_up } from '../js/fountain.js';
import { reset_display_messages } from '../js/display.js';
import { resetInputState } from '../js/input.js';
import { initRng } from '../js/rng.js';
import { ROOM, SINK, S_LRING, TT_INFLOOR, TT_LAVA, TT_PIT } from '../js/const.js';

// C ref: fountain.c floating_above `:21–32` — dip/drink/dodown while
// levitating. Default arm prints "floating high above the %s"; the
// :25–30 arm (utrap && utraptype INFLOOR/LAVA, only reachable via dodown)
// overrides with "trapped in the %s" + surface(u.ux,u.uy).
describe('floating_above utrap arm (fountain.c:21-32)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(77);
        game.u = { ux: 5, uy: 5, utrap: 0, utraptype: 0 };
        game.iflags = { window_inited: true };
        game.level = { at: () => ({ typ: ROOM }) };
    });

    it('default arm: floating high above the %s', { timeout: 5000 }, async () => {
        await floating_above('fountain');
        assert.match(game._pending_message,
            /You are floating high above the fountain\./);
    });

    it('utrap+INFLOOR: trapped in the surface', { timeout: 5000 }, async () => {
        game.u.utrap = 1;
        game.u.utraptype = TT_INFLOOR;
        await floating_above('stairs');
        assert.match(game._pending_message,
            /You are trapped in the floor\./);
    });

    it('utrap+LAVA: trapped arm fires (|| gate)', { timeout: 5000 }, async () => {
        game.u.utrap = 1;
        game.u.utraptype = TT_LAVA;
        await floating_above('stairs');
        assert.match(game._pending_message,
            /You are trapped in the floor\./);
    });

    it('utrap+PIT: default arm (gate is INFLOOR||LAVA only)', { timeout: 5000 }, async () => {
        game.u.utrap = 1;
        game.u.utraptype = TT_PIT;
        await floating_above('stairs');
        assert.match(game._pending_message,
            /You are floating high above the stairs\./);
    });
});

// C ref: fountain.c sink_backs_up `:804–826` — Blind+Deaf arm splashes
// "in the %s" with body_part(FACE) (poly forms, not humanoid "face").
// S_LRING preset skips the mkobj ring arm (not under test here).
describe('sink_backs_up FACE arm (fountain.c:804-826)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(78);
        game.u = { ux: 5, uy: 5, Blind: 1, Deaf: 1 };
        game.iflags = { window_inited: true };
        game.level = { at: () => ({ typ: SINK, looted: S_LRING }) };
    });

    it('humanoid: splashes you in the face', { timeout: 5000 }, async () => {
        await sink_backs_up(5, 5);
        assert.match(game._pending_message,
            /Something splashes you in the face\./);
    });

    it('jelly polyform: splashes you in the front', { timeout: 5000 }, async () => {
        game.youmonst = { data: { mlet: 'S_JELLY', mndx: 9999 } };
        await sink_backs_up(5, 5);
        assert.match(game._pending_message,
            /Something splashes you in the front\./);
    });
});
