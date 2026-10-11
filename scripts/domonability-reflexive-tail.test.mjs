import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { domonability } from '../js/polyself.js';
import { monsterNames, mons } from '../js/monsters.js';
import { ROOM } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory } from '../js/display.js';

// C ref: cmd.c domonability `:890–949` — the Upolyd "purely reflexive" /
// normal-form arms (`:943–947`) are members of the else-if chain, reached
// only when no earlier arm matched. The gremlin (`:923–933`) and shrieker
// (`:937–942`) arms have no return: they fall to the bare `return
// ECMD_OK` (`:948`). JS restructured the tail as a shared `tail()`
// called after the chain, so #monster as a shrieker printed "You
// shriek." PLUS the reflexive line (scen-sweep-Barbarian-95329 step
// 1075: C «You shriek.» vs JS «You shriek. Any special ability …»).
// Drives the exported domonability with real permonst rows; message
// capture mirrors fprefx-stale-egg.test.mjs.
const PM_SHRIEKER = monsterNames.indexOf('PM_SHRIEKER');
const PM_GREMLIN = monsterNames.indexOf('PM_GREMLIN');
const PM_GRID_BUG = monsterNames.indexOf('PM_GRID_BUG');
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');

const messages = () => {
    const seen = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
        seen.push(m);
    }
    return seen.join('\n');
};

function setup(mndx, umonster) {
    initRng(99);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 },
        umonnum: mndx, umonster, uburied: 0, usteed: null,
    };
    game.youmonst = {
        mx: 10, my: 10, mux: 10, muy: 10, mhp: 100, mhpmax: 100,
        m_lev: 1, mcanmove: 1, mcansee: 1, msleeping: 0, mstun: 0,
        mconf: 0, mundetected: 0, m_ap_type: 0,
        mappearance: 0, mtame: 0, mpeaceful: 0, mflee: 0,
        mtrapped: 0, mblinded: 0, minvis: 0, mleashed: 0,
        mcan: 0, minvent: null, mw: null, mstrategy: 0,
        meating: 0, mtrack: [], mfrozen: 0, m_id: 4243,
        data: mons(mndx),
    };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 0 }),
        flags: {}, traps: [], rooms: [], objects: [],
    };
    game.fmon = [];
    game.flags = {};
    // The getmsghistory ring is append-only across subtests; slice off
    // this subtest's suffix after domonability.
    return messages().length;
}

describe('domonability fall-through arms print no tail (cmd.c:923–948)', () => {
    let saved;
    beforeEach(() => {
        assert.ok(PM_SHRIEKER > 0 && PM_GREMLIN > 0
            && PM_GRID_BUG > 0 && PM_HUMAN > 0, 'mndx must exist');
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, flags: game.flags, iflags: game.iflags,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.fmon = saved.fmon;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
    });

    it('poly shrieker #monster: exactly "You shriek." (probe 95329)', async () => {
        const base = setup(PM_SHRIEKER, PM_HUMAN);
        await domonability();
        const text = messages().slice(base);
        assert.match(text, /You shriek\./);
        assert.ok(!/purely reflexive/.test(text), `no reflexive tail, got: ${text}`);
    });

    it('poly gremlin #monster on dry land: exactly "no fountain here"', async () => {
        const base = setup(PM_GREMLIN, PM_HUMAN);
        await domonability();
        const text = messages().slice(base);
        assert.match(text, /no fountain here/);
        assert.ok(!/purely reflexive/.test(text), `no reflexive tail, got: ${text}`);
    });

    it('poly form with no ability still prints the reflexive line (control)', async () => {
        const base = setup(PM_GRID_BUG, PM_HUMAN);
        await domonability();
        const text = messages().slice(base);
        assert.match(text, /purely reflexive/);
    });

    it('normal form still prints the no-ability line (control)', async () => {
        const base = setup(PM_HUMAN, PM_HUMAN);
        await domonability();
        const text = messages().slice(base);
        assert.match(text, /don't have a special ability/);
    });
});
