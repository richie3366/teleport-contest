import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { drop_upon_death } from '../js/end.js';
import { initRng } from '../js/rng.js';
import { OBJ_FLOOR, ROOM } from '../js/const.js';
import { COIN_CLASS } from '../js/generated/objects_data.js';
import { objectNames, objects_globals_init } from '../js/objects.js';

// C ref: bones.c drop_upon_death `:259–303` + give_to_nearby_mon `:226–255`.
// Both floor arms are place_object ONLY — C never merges the death-drop
// into an existing pile. JS appended stackobj(otmp) on both arms, so a
// hero who died on a mergeable pile saved one fewer bones object and the
// ghostly next_ident remap stream shifted by one (D-3754:
// scen-chain-Wizard-95420 step 864, C 42 remaps vs JS 41).

const GOLD_PIECE = objectNames.indexOf('GOLD_PIECE');
const X = 10, Y = 10;

function mkGold(quan) {
    return {
        otyp: GOLD_PIECE, oclass: COIN_CLASS, quan,
        owornmask: 0, where: OBJ_FLOOR, ox: X, oy: Y,
        nobj: null, nexthere: null, ocontainer: null, ocarry: null,
        cursed: 0, blessed: 0, unpaid: 0, spe: 0, lamplit: 0,
        no_charge: 0, timed: 0, nomerge: 0,
    };
}

function floorChain() {
    const out = [];
    for (let o = game.fobj; o; o = o.nobj) out.push(o);
    return out;
}

function setup(seed) {
    initRng(seed);
    objects_globals_init(); // mergable reads game.objects oc_merge
    game.u = {
        ux: 14, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, ustuck: null, utrap: 0, twoweap: false,
        uhave: {}, ualign: { type: 0, record: 0 },
    };
    game.youmonst = { mx: 14, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1 }),
        traps: [],
        flags: {},
    };
    game.in_mklev = 0;
    game.fmon = [];
    game._level_monsters = new Map();
    const floor = mkGold(50);
    game.fobj = floor;
    game._objects_at = new Map([[`${X},${Y}`, floor]]);
    game.invent = [mkGold(100)];
}

describe('drop_upon_death never merges into floor piles (bones.c:259-303)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            mklev: game.in_mklev, fmon: game.fmon,
            lvlmons: game._level_monsters, invent: game.invent,
            fobj: game.fobj, objectsAt: game._objects_at,
            objects: game.objects, bases: game.bases,
            oclassProb: game.oclass_prob_totals,
            coreCtx: game.coreCtx, dispCtx: game.dispCtx,
            seed: game.currentSeed,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.in_mklev = saved.mklev;
        game.fmon = saved.fmon;
        game._level_monsters = saved.lvlmons;
        game.invent = saved.invent;
        game.fobj = saved.fobj;
        game._objects_at = saved.objectsAt;
        game.objects = saved.objects;
        game.bases = saved.bases;
        game.oclass_prob_totals = saved.oclassProb;
        game.coreCtx = saved.coreCtx;
        game.dispCtx = saved.dispCtx;
        game.currentSeed = saved.seed;
    });

    it('place arm keeps the dropped pile separate (seed 1: rn2(5)=0, rn2(8)=2)', async () => {
        setup(1);
        await drop_upon_death(null, null, X, Y);
        assert.equal(game.invent.length, 0, 'invent not fully dropped');
        const pile = floorChain();
        assert.equal(pile.length, 2, 'death-drop merged into the floor pile (C places only)');
        assert.deepEqual(
            pile.map((o) => o.quan).sort((a, b) => a - b), [50, 100],
        );
    });

    it('nearby-mon fallback keeps the dropped pile separate (seed 7: rn2(8)=0, no mons)', async () => {
        setup(7);
        await drop_upon_death(null, null, X, Y);
        assert.equal(game.invent.length, 0, 'invent not fully dropped');
        const pile = floorChain();
        assert.equal(pile.length, 2, 'nearby-mon fallback merged (C places only)');
        assert.deepEqual(
            pile.map((o) => o.quan).sort((a, b) => a - b), [50, 100],
        );
    });
});
