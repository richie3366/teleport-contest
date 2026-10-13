import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { hurtle } from '../js/dothrow.js';
import { OBJ_FLOOR, OBJ_INVENT } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: dothrow.c hurtle `:1090–1093` — `Punished && !carried(uball)`
// tug-returns with no movement; Punished ≡ (uball != 0) (youprop.h:77),
// carried ≡ where == OBJ_INVENT (obj.h:332).
// The JS guard read the sticky `u.Punished` flat (zero writers anywhere
// in js/ — dead undefined; D-3724 family), so a punished hero with the
// ball on the ground was hurled instead of feeling the tug.
// scen-worldtour-Wizard-587307 s365: C queues the tug behind the
// knockback message (--More--); JS moved (58,3)->(60,1) with no tug.
// Off-map step (ux=1, dx=-1): the non-tug path stops at hurtle_step's
// isok gate ("spirits") with no level staging.

function setupU(hero) {
    resetGame();
    resetInputState();
    pushKeys([' ', ' ', ' ', ' ']);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = { ux: 1, uy: 5, utrap: 0, ustuck: 0, EWwalking: 0, ...hero };
    baseline = seenMessages().length;
}

function seenMessages() {
    const seen = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) seen.push(m);
    return seen;
}

// The message ring outlives clear_nhwindow_message: only messages
// appended after setup belong to this subtest.
let baseline = 0;
function freshMessages() {
    return seenMessages().slice(baseline).join('\n');
}

describe('hurtle punished tug guard (dothrow.c:1090-1093, youprop.h:77)', () => {
    let savedIflags;
    beforeEach(() => { savedIflags = game.iflags; });
    afterEach(() => { game.iflags = savedIflags; resetGame(); });

    it('ball on floor: tug message, no movement', async () => {
        setupU({ uball: { where: OBJ_FLOOR, ox: 1, oy: 5 } });
        await hurtle(-1, 0, 2, false);
        assert.match(freshMessages(), /tug from the iron ball/);
        assert.equal(game.u.ux, 1);
        assert.equal(game.u.uy, 5);
    });

    it('unpunished control: no tug (off-map spirits arm stages soundly)', async () => {
        setupU({});
        await hurtle(-1, 0, 2, false);
        const seen = freshMessages();
        assert.doesNotMatch(seen, /tug from the iron ball/);
        assert.match(seen, /spirits holding you back/);
    });

    it('carried ball control: no tug (C moves; carried != blocking)', async () => {
        setupU({ uball: { where: OBJ_INVENT, ox: 0, oy: 0 } });
        await hurtle(-1, 0, 2, false);
        assert.doesNotMatch(freshMessages(), /tug from the iron ball/);
    });

    it('dead u.Punished flat alone (no uball): no tug — live uball rules', async () => {
        setupU({ Punished: 1 });
        await hurtle(-1, 0, 2, false);
        assert.doesNotMatch(freshMessages(), /tug from the iron ball/);
    });
});
