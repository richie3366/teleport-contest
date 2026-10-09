import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { thrwmu } from '../js/mthrowu.js';
import { create_gas_cloud } from '../js/region.js';
import { mons, monsterNames } from '../js/monsters.js';
import { REG_NOT_HEROS, ROOM } from '../js/const.js';

// C ref: allmain.c `:210–216` owns svc.context.mon_moving (TRUE around the
// movemon loop); mthrowu.c never writes it (D-0105's thrwmu try/finally is
// JS-only scaffolding). The finally cleared unconditionally, clobbering the
// outer TRUE after any monster throw — later movemon actions (green-dragon
// breath clouds via zap.c `:5336–5342` ZT_POISON_GAS) then took hero's-fault
// (region.c make_gas_cloud `:1187–1188`), so gas kills ran killed()/xkilled
// ("You kill...", rn2(6) treasure) instead of C's monkilled ("killed by the
// gas cloud", no rn2(6)) — the next_ident cliff on scen-worldtour-Wizard
// 95248@340 (mastodon) / 95229@493 (owlbear). The wrapper now saves and
// restores (quest.c `:428–437` / zap.c melt_ice_away `:5123–5131` pattern).

const GNOME = monsterNames.indexOf('PM_GNOME');
assert.ok(GNOME >= 0);

function setup() {
    initRng(5150);
    game.context = { mon_moving: true }; // inside movemon (allmain :210)
    game.u = { ux: 14, uy: 10, uz: { dnum: 0, dlevel: 1 } };
    game.youmonst = { mx: 14, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1 }),
        traps: [],
        flags: {},
    };
    game.in_mklev = 0;
    game.regions = [];
}

function bareGnome() {
    // No weapon: thrwmu_body returns early at the wield/select_rwep
    // gates — the finally still runs, which is what this covers.
    return {
        m_id: 1, mnum: GNOME, data: mons(GNOME),
        mx: 0, my: 0, mux: 50, muy: 50, mw: null, minvent: null,
        weapon_check: 0, mcanmove: 1, mcansee: 1, msleeping: 0,
        mtame: 0, mpeaceful: 0,
    };
}

describe('thrwmu preserves outer mon_moving (mthrowu, no C wrap)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            context: game.context, u: game.u, youmonst: game.youmonst,
            level: game.level, mklev: game.in_mklev, regions: game.regions,
            seed: game.currentSeed,
        };
    });
    afterEach(() => {
        game.context = saved.context;
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.in_mklev = saved.mklev;
        game.regions = saved.regions;
        game.currentSeed = saved.seed;
    });

    it('outer TRUE survives a throw (save/restore, not finally-false)', async () => {
        setup();
        await thrwmu(bareGnome());
        assert.equal(game.context.mon_moving, true);
    });

    it('breath-shape cloud after the throw is not hero-fault', async () => {
        setup();
        await thrwmu(bareGnome());
        // zap.c:5341 shape: 1x1, damage 8 (green-dragon/iron-golem breath).
        const cloud = await create_gas_cloud(10, 10, 1, 8);
        assert.notEqual((cloud.player_flags | 0) & REG_NOT_HEROS, 0);
    });

    it('control: outside movemon the same cloud is hero-fault', async () => {
        setup();
        game.context.mon_moving = false; // hero phase: C sets the fault
        const cloud = await create_gas_cloud(10, 10, 1, 8);
        assert.equal((cloud.player_flags | 0) & REG_NOT_HEROS, 0);
    });
});
