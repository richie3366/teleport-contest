import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { domove } from '../js/cmd.js';
import { mons, monsterNames } from '../js/monsters.js';
import {
    HWALL, CORR, DOOR, D_ISOPEN, IN_SIGHT, COULD_SEE,
} from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: hack.c test_move — the generic rock bump `:1049–1072`
// ("It's %s." via back_to_glyph) runs BEFORE the diagonal-out-of-
// doorway check `:1229–1235`. JS domove's inline (cmd.js) checked the
// doorway arm first, so a diagonal run from an intact doorway into a
// wall printed "You can't move diagonally out of an intact doorway."
// where C prints "It's a wall."
// (scen-chain-Archeologist-582618 step 286: hero on an open DOOR,
// SW target HWALL, both sides' states identical.)
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

const HX = 59;
const HY = 5;
const TX = 58;
const TY = 6;

function setup({ heroTyp, heroDoormask, targetTyp }) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(582618);
    if (!game.objects) { init_objects(); initRng(582618); }
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, ux0: HX, uy0: HY,
        uz: { dnum: 0, dlevel: 1 }, uz0: { dnum: 0, dlevel: 1 },
        dx: 0, dy: 0, uswallow: 0, ustuck: 0, uinwater: 0,
        utrap: 0, utraptype: 0, uwep: null, uball: null,
        ualign: { type: 1, record: 0, abuse: 0 }, uconduct: {},
        Stunned: 0, Confusion: 0, Fumbling: 0,
        HLevitation: 0, ELevitation: 0, BLevitation: 0, BFlying: 0,
        umonnum: PM_HUMAN, ulevel: 1, uexp: 0,
    };
    game.youmonst = { mx: HX, my: HY, data: mons(PM_HUMAN) };
    const cells = new Map();
    const mkcell = () => ({
        typ: CORR, lit: 1, waslit: 1, seenv: 0xff, flags: 0,
        roomno: 0, wall_info: 0, doormask: 0, horizontal: 0,
    });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, mkcell());
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    game.level.at(HX, HY).typ = heroTyp;
    game.level.at(HX, HY).doormask = heroDoormask;
    game.level.at(TX, TY).typ = targetTyp;
    const viz = [];
    for (let y = HY - 2; y <= HY + 2; y++) {
        viz[y] = [];
        for (let x = HX - 2; x <= HX + 2; x++) viz[y][x] = IN_SIGHT | COULD_SEE;
    }
    game.viz_array = viz;
    game.moves = 100;
    game.invent = [];
    game.fmon = [];
    game.context = {};
    game.flags = { mention_walls: true, verbose: true };
    game._objects_at = new Map();
    game._level_monsters = new Map();
    resetInputState();
    pushKeys('   ');
}

const messages = () => {
    const seen = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
        seen.push(m);
    }
    return seen.join('\n');
};

describe('domove checks the wall bump before the doorway arms (hack.c:1049 before :1229)', () => {
    it('doorway hero bumping a wall diagonally reads the wall (582618@286)', async () => {
        setup({ heroTyp: DOOR, heroDoormask: D_ISOPEN, targetTyp: HWALL });
        await domove(-1, 1);
        const text = messages();
        assert.match(text, /It's a wall\./);
        assert.ok(!/diagonally out of an intact doorway/.test(text),
            `doorway arm must not fire for a wall target: ${JSON.stringify(text)}`);
    });

    it('doorway hero moving diagonally onto floor keeps the doorway ban (control)', async () => {
        setup({ heroTyp: DOOR, heroDoormask: D_ISOPEN, targetTyp: CORR });
        await domove(-1, 1);
        const text = messages();
        assert.match(text, /can't move diagonally out of an intact doorway\./);
    });

    it('non-doorway hero bumping a wall diagonally reads the wall (control)', async () => {
        setup({ heroTyp: CORR, heroDoormask: 0, targetTyp: HWALL });
        await domove(-1, 1);
        const text = messages();
        assert.match(text, /It's a wall\./);
    });
});
