import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mdig_tunnel } from '../js/dig.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { VWALL, ROOM, DOOR, D_NODOOR } from '../js/const.js';

// C ref: dig.c mdig_tunnel `:1468–1471` — the wall arm has NO outer Deaf
// gate; it calls You_hear("crashing rock.") whose inner gates
// (pline.c:441 acoustics + Underwater/Unaware prefixes, D-2941) the old
// `if (!game.u?.Deaf) pline('You hear …')` shape dropped (the raw read was
// sticky-Deaf only, stuck false for HDeaf heroes). D-3702 rewire shape.
// Seed 3716: pile=rnd(12)=12 (no drop) then rn2(5)=0 (arm fires).

function setup({ hero = {}, flags = {}, multi = 0 } = {}) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(3716);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent);
    // vision_inited stays unset so vision_recalc is a no-op.
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    pushKeys([' ', ' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        uinwater: 0, usleep: 0, uhs: 0,
        ...hero,
    };
    game.flags = { verbose: true, ...flags };
    game.multi = multi;
    game.nomovemsg = null;
    game.fmon = [];
    game.moves = 0;
    const wallLoc = { typ: VWALL, doormask: 0, flags: 0, wall_info: 0, seenv: 0, lit: 0, roomno: 0 };
    const roomLoc = { typ: ROOM, doormask: 0, flags: 0, seenv: 0, lit: 0, roomno: 0 };
    game.level = {
        at: (x, y) => ((x === 10 && y === 10) ? wallLoc : roomLoc),
        flags: {}, traps: [], rooms: [],
    };
    return wallLoc;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('mdig_tunnel wall arm emits via live You_hear (dig.c:1468–1471)', () => {
    it('normal hero hears + wall becomes door (C :1468–1482)', async () => {
        const wallLoc = setup();
        const ret = await mdig_tunnel({ mx: 10, my: 10 });
        assert.equal(ret, false);
        assert.deepEqual(messages(), ['You hear crashing rock.']);
        assert.equal(wallLoc.typ, DOOR);
        assert.equal(wallLoc.doormask, D_NODOOR);
    });

    it('HDeaf hero: silent (You_hear inner Deaf arm; raw gate missed this)', async () => {
        setup({ hero: { HDeaf: 1 } });
        await mdig_tunnel({ mx: 10, my: 10 });
        assert.deepEqual(messages(), []);
    });

    it('underwater: barely hears (pline.c:444)', async () => {
        setup({ hero: { uinwater: 1 } });
        await mdig_tunnel({ mx: 10, my: 10 });
        assert.deepEqual(messages(), ['You barely hear crashing rock.']);
    });

    it('unaware: dreams the sound (pline.c:446)', async () => {
        setup({ hero: { usleep: 1 }, multi: -1 });
        await mdig_tunnel({ mx: 10, my: 10 });
        assert.deepEqual(messages(), ['You dream that you hear crashing rock.']);
    });

    it('acoustics off: silent (pline.c:441)', async () => {
        setup({ flags: { acoustics: false } });
        await mdig_tunnel({ mx: 10, my: 10 });
        assert.deepEqual(messages(), []);
    });
});
