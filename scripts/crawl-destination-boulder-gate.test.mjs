import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { crawl_destination } from '../js/hack.js';
import { objectNames } from '../js/objects.js';
import { M2_ROCKTHROW } from '../js/monsters.js';
import { AIR } from '../js/const.js';

// C ref: hack.c crawl_destination `:4082–4084` — the gate is the live
// `goodpos(x, y, &youmonst, 0)`, whose boulder arm (teleport.c:86+,
// `sobj_at(BOULDER) && !throws_rocks(mdat) → FALSE`) rejects boulder
// squares for a non-rock-throwing hero. JS inlined a typ+monster
// approximation that dropped the boulder arm, so drown's crawl check
// (trap.c:4965) accepted a boulder cell C rejects: scen-worldtour-Monk
// 587316 step 340 crawled out ("Pheew!") where C prints "You drown."
// Hero (10,10), orthogonal AIR target (11,10) — orthogonal returns
// straight past the gate, so only the gate varies.

const BOULDER = objectNames.indexOf('BOULDER');
assert.ok(BOULDER >= 0);

function setup({ boulder = false, rockthrower = false } = {}) {
    resetGame();
    game.u = { ux: 10, uy: 10, umonnum: 0 };
    game.youmonst = {
        mx: 10, my: 10,
        data: { mlet: 'S_HUMAN', mflags2: rockthrower ? M2_ROCKTHROW : 0 },
    };
    const cells = new Map();
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) {
                cells.set(k, {
                    typ: AIR, lit: 0, flags: 0, glyph: 0, roomno: 0,
                    wall_info: 0, drawbridgemask: 0, horizontal: false,
                    doormask: 0,
                });
            }
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game._objects_at = new Map();
    if (boulder) {
        game._objects_at.set('11,10', {
            otyp: BOULDER, oclass: 0, spe: 0, owt: 6000,
            oartifact: 0, ox: 11, oy: 10, nexthere: null, nobj: null,
        });
    }
}

describe('crawl_destination goodpos gate (hack.c:4082–4084, teleport.c boulder arm)', () => {
    beforeEach(() => resetGame());

    it('boulder on target: false (C rejects, JS crawled — 587316 s340)', async () => {
        setup({ boulder: true });
        assert.equal(await crawl_destination(11, 10), false);
    });

    it('clear control: true', async () => {
        setup({ boulder: false });
        assert.equal(await crawl_destination(11, 10), true);
    });

    it('rock-throwing form keeps the C exception: true', async () => {
        setup({ boulder: true, rockthrower: true });
        assert.equal(await crawl_destination(11, 10), true);
    });
});
