import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { domove } from '../js/cmd.js';
import { mons, monsterNames } from '../js/monsters.js';
import {
    VWALL, CORR, SV2, SV3, SV0, IN_SIGHT, COULD_SEE,
} from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { init_objects } from '../js/o_init.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: hack.c test_move `:1056–1070` (mention_walls) via display.c
// back_to_glyph `:2304–2314` + wall_angle `:3608–3623` (display.c).
// A VWALL whose wall_info mode is 2 (WM_W_RIGHT) and whose seenv holds
// only SV2|SV3 reads as solid stone: C's mode-2 mask
// (SV0|SV1|SV5|SV6|SV7) excludes both bits, so wall_angle returns
// S_stone. JS domove's inline mention_walls_obstructed (cmd.js) used
// `(IS_WALL || SDOOR) && seenv → "wall"` without consulting
// back_to_glyph/wall_angle, printing "It's a wall." where C prints
// "It's solid stone." (scen-chain-Priest-95400 step 1274, C-measured:
// typ=1 seenv=12 wall_info=2 glyph=3929 sym=0; same shape 95423).
// Fix: the inline computes the prose via the live back_to_glyph +
// glyph_to_cmap + S_stone check (the test_move shape).
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

const HX = 59;
const HY = 5;
const WX = 58;
const WY = 5;

function setup({ wallInfo, seenv }) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(95400);
    if (!game.objects) { init_objects(); initRng(95400); }
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
    game.level.at(WX, WY).typ = VWALL;
    game.level.at(WX, WY).wall_info = wallInfo;
    game.level.at(WX, WY).seenv = seenv;
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

describe('domove wall-bump prose via back_to_glyph/wall_angle (hack.c:1056-1070)', () => {
    it('mode-2 vwall seen from SV2|SV3 reads solid stone (95400@1274)', async () => {
        setup({ wallInfo: 2, seenv: SV2 | SV3 });
        await domove(-1, 0);
        const text = messages();
        assert.match(text, /It's solid stone\./);
        assert.ok(!/It's a wall\./.test(text));
    });

    it('mode-0 vwall seen reads a wall (control)', async () => {
        setup({ wallInfo: 0, seenv: SV0 | SV2 | SV3 });
        await domove(-1, 0);
        const text = messages();
        assert.match(text, /It's a wall\./);
        assert.ok(!/solid stone/.test(text));
    });
});
