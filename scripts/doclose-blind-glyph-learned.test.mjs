import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { doclose } from '../js/lock.js';
import { mons, monsterNames } from '../js/monsters.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';
import { ensure_lastseentyp, recalc_mapseen } from '../js/dungeon.js';
import { dungeonProto } from '../js/generated/dungeon_data.js';
import { ROOM } from '../js/const.js';

// C ref: lock.c doclose `:997–1005` — Blind: feel_location + mapseen;
// LEARNED (ECMD_TIME) when the memory glyph OR lastseentyp changes.
// JS ported only the lastseentyp half (D-2286: cells didn't model glyph);
// remembered_glyph.glyph is now the lev->glyph model, so the glyph half
// is live. Session shape (scen-sweep-Priest-95345 step 848): blind hero
// closes west at a ROOM cell whose type is remembered (lastseentyp ROOM)
// but whose glyph was never mapped — C charges the turn (79 monster
// draws), JS drew nothing.
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_HUMAN >= 0);

function setup() {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(95345);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (kick-nondoor precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    // 'h' answers getdir west; trailing blanks cover any --More--.
    pushKeys(['h', ' ', ' ', ' ', ' ', ' ']);
    game.u = {
        ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
        HBlinded: 1,
    };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.flags = { verbose: true };
    game.moves = 0;
    game.fmon = [];
    game.invent = [];
    // recalc_mapseen resolves branch dungeons by name (dungeon_branch);
    // seed the real dungeon names from the generated table.
    game.dungeons = dungeonProto.map((e) => ({
        dname: e.name, num_dunlevs: 40, ledger_start: 0,
        depth_start: 1, dunlev_ureached: 1,
    }));
    game.n_dgns = dungeonProto.length;
    // dungeon_branch walks the branch chain (child end2); derive it from
    // the generated table the way init_dungeons/insert_branch would.
    const dnumOf = new Map(dungeonProto.map((e, i) => [e.name, i]));
    game.branches = [];
    dungeonProto.forEach((e, i) => {
        for (const b of e.branches || []) {
            if (dnumOf.has(b.name)) {
                game.branches.push({
                    end1: { dnum: i, dlevel: 1 },
                    end2: { dnum: dnumOf.get(b.name), dlevel: 1 },
                });
            }
        }
    });
    // The felt cell (4,5): ROOM, type remembered, glyph unmapped.
    const feltLoc = { typ: ROOM, doormask: 0, seenv: 0, waslit: 0 };
    const floorLoc = { typ: ROOM, doormask: 0, seenv: 0, waslit: 0 };
    game.level = {
        flags: { hero_memory: true },
        rooms: [],
        traps: [],
        at: (x, y) => ((x === 4 && y === 5) ? feltLoc : floorLoc),
    };
    // Existing level: the mapseen node is present, so the recalc inside
    // update_mapseen_for won't re-run C init_mapseen's lastseentyp memset.
    recalc_mapseen();
    ensure_lastseentyp()[4][5] = ROOM;
    return { feltLoc };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('doclose Blind learned-glyph arm (lock.c:997-1005)', () => {
    it('blind close at remembered-but-unmapped cell costs a turn (glyph half)', async () => {
        const { feltLoc } = setup();
        const tookTurn = await doclose();
        assert.deepEqual(messages(), ['You feel no door there.']);
        assert.notEqual(feltLoc.remembered_glyph?.glyph, undefined);
        assert.equal(tookTurn, true);
    });
});
