import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { close_drawbridge } from '../js/dbridge.js';
import { objectNames, WEAPON_CLASS } from '../js/objects.js';
import { ROOM, DRAWBRIDGE_DOWN, DRAWBRIDGE_UP, DBWALL, DB_SOUTH } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';

// C ref: dbridge.c close_drawbridge `:775–834` — the crush arm (`:815`)
// gates Soundeffect + You_hear("smashing and crushing.") on
// `OBJ_AT(x, y) && !Deaf`, Deaf ≡ youprop.h:125
// (HDeaf || EDeaf || uroleplay.deaf), with NO acoustics arm. JS read raw
// `game.u?.Deaf` (zero writers, stuck false) plus an invented
// `|| acoustics === false`. The emit is live You_hear (js/hack.js:193,
// D-2941), whose inner gate silences Deaf-aware heroes and acoustics-off
// heroes alike — so the observable delta is the macro-deaf + Unaware
// hero: pre-fix JS dreams the crush audibly
// ("You dream that you hear smashing and crushing.") where C stays
// silent; the acoustics-off pin proves the silence moved inside You_hear.
// Live reader: local hero_Deaf (js/dbridge.js:363, D-1967; its extra
// `|| u.Deaf` is dead code — zero writers — so the gate is exactly C).
// Bridge at (10,10) DB_SOUTH (wall (10,11)), hero at (30,10), no
// viz_array (cansee false → chains-rattling else arm `:788–791`).

const DAGGER = objectNames.indexOf('DAGGER');
assert.ok(DAGGER >= 0);

function setup({ hero = {}, multi = 0, flags = {}, withObj = true } = {}) {
    reset_display_messages();
    clear_nhwindow_message();
    resetInputState();
    // Two-You_hear paths page via --More--; one spare dismiss keystroke
    // (new-were-message.test.mjs precedent). Single-message paths ignore it.
    pushKey(' ');
    initRng(3714);
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        ...hero,
    };
    game.youmonst = { mx: 30, my: 10, data: { mlet: 'S_HUMAN' } };
    const cells = new Map();
    const mkcell = (typ, extra = {}) => ({
        typ, lit: 0, flags: 0, glyph: 0, roomno: 0, wall_info: 0,
        drawbridgemask: 0, horizontal: false, doormask: 0, ...extra,
    });
    cells.set('10,10', mkcell(DRAWBRIDGE_DOWN, { drawbridgemask: DB_SOUTH }));
    cells.set('10,11', mkcell(ROOM));
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, mkcell(ROOM));
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    game.viz_array = undefined;
    game.fmon = [];
    game.moves = 100;
    game.multi = multi;
    game.flags = { verbose: true, acoustics: true, ...flags };
    game._objects_at = new Map();
    if (withObj) {
        // Legacy unset-where floor obj: delallobj→delobj takes the
        // tolerant obj_extract_self unlink path (mkobj.js), no map newsym.
        game._objects_at.set('10,10', {
            otyp: DAGGER, oclass: WEAPON_CLASS, spe: 0, owt: 10,
            oartifact: 0, ox: 10, oy: 10, nexthere: null, nobj: null,
        });
    }
    game.occupants = undefined;
    game.killer = undefined;
    return cells;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('close_drawbridge crush reads OBJ_AT + the Deaf macro (dbridge.c:815)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves, multi: game.multi,
            flags: game.flags, iflags: game.iflags,
            viz_array: game.viz_array, _objects_at: game._objects_at,
            occupants: game.occupants, killer: game.killer,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.fmon = saved.fmon;
        game.moves = saved.moves;
        game.multi = saved.multi;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        game.viz_array = saved.viz_array;
        game._objects_at = saved._objects_at;
        game.occupants = saved.occupants;
        game.killer = saved.killer;
    });

    it('non-deaf control: chains + crush heard, bridge raised (C :788–815)', async () => {
        const cells = setup();
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), [
            'You hear chains rattling and gears turning.',
            'You hear smashing and crushing.',
        ]);
        assert.equal(cells.get('10,10').typ, DRAWBRIDGE_UP);
        assert.equal(cells.get('10,11').typ, DBWALL);
    });

    it('no-object control: chains only, bridge still raised (OBJ_AT conjunct)', async () => {
        const cells = setup({ withObj: false });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), ['You hear chains rattling and gears turning.']);
        assert.equal(cells.get('10,10').typ, DRAWBRIDGE_UP);
    });

    it('EDeaf + Unaware: chains dream only, no crush dream (C skips :815)', async () => {
        setup({ hero: { EDeaf: 1, usleep: 1 }, multi: -1 });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), ['You dream that you hear chains rattling and gears turning.']);
    });

    it('HDeaf + Unaware: chains dream only, no crush dream (C skips :815)', async () => {
        setup({ hero: { HDeaf: 1, usleep: 1 }, multi: -1 });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), ['You dream that you hear chains rattling and gears turning.']);
    });

    it('roleplay-deaf + Unaware: chains dream only, no crush dream (C skips :815)', async () => {
        setup({ hero: { uroleplay: { deaf: 1 }, usleep: 1 }, multi: -1 });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), ['You dream that you hear chains rattling and gears turning.']);
    });

    it('EDeaf aware: silent via You_hear inner gate (no delta)', async () => {
        setup({ hero: { EDeaf: 1 } });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), []);
    });

    it('acoustics-off: silent inside You_hear (C has no acoustics arm)', async () => {
        setup({ flags: { acoustics: false } });
        await close_drawbridge(10, 10);
        assert.deepEqual(messages(), []);
    });
});
