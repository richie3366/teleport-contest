import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { enexto_gpflags } from '../js/teleport.js';
import { mons, monsterNames } from '../js/monsters.js';
import { initRng } from '../js/rng.js';
import {
    MM_ASYNCGROUP, GP_ALLOW_XY, GP_ALLOW_U, GP_CHECKSCARY, GP_AVOID_MONPOS,
    STONE, ROOM,
} from '../js/const.js';

// C ref: hack.h:1162-1175 — MM_ and GP_ share one word ("if more MM_ flag
// masks are added, skip or renumber the GP_ one(s)"). D-4014 coined the
// JS-only MM_ASYNCGROUP on GP_ALLOW_XY's bit, so m_initgrp_async's
// enexto_gpflags(mm, ..., mmflags) (js/makemon.js:3330, C makemon.c:131
// passthrough) ran flagged member placement with allow_xx_yy=TRUE: when
// both candy sweeps fail, JS takes the origin square (js/teleport.js:613-615)
// where C returns FALSE (member skipped). The bit moves to 0x02000000, the
// next free bit in the shared word.

const OX = 40, OY = 10;
const bugPtr = () => mons(monsterNames.indexOf('PM_GRID_BUG'));

// Crowded level: every cell STONE (inaccessible — both sweeps fail) except
// the group origin, which is open ROOM. Hero parks in a corner, off-origin.
function setup() {
    resetGame();
    initRng(9182);
    game.u = { ux: 1, uy: 0, uz: { dnum: 0, dlevel: 1 } };
    game.youmonst = { mx: 1, my: 0, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: (x, y) => ({ typ: (x === OX && y === OY) ? ROOM : STONE }),
        flags: {}, traps: [], rooms: [],
    };
    game.fmon = [];
    game._level_monsters = new Map();
    game._objects_at = new Map();
}

describe('MM_ASYNCGROUP shares no bit with the GP_ word (hack.h:1162-1175)', () => {
    beforeEach(() => setup());

    it('flag bit intersects no GP_ reader bit', () => {
        const gpWord = GP_ALLOW_XY | GP_ALLOW_U | GP_CHECKSCARY | GP_AVOID_MONPOS;
        assert.equal(MM_ASYNCGROUP & gpWord, 0,
            'MM_ASYNCGROUP collides with a GP_ bit (C: skip or renumber the GP_ one(s))');
    });

    it('flagged member placement fails crowded (both sweeps fail → skipped, origin not taken)', () => {
        // Exact call shape of js/makemon.js:3330 with a flagged primary.
        const cc = { x: -1, y: -1 };
        const ok = enexto_gpflags(cc, OX, OY, bugPtr(), MM_ASYNCGROUP);
        assert.equal(ok, false,
            'flagged enexto took a square on a crowded level (C returns FALSE — member skipped)');
    });

    it('control: GP_ALLOW_XY still takes the origin on the same map', () => {
        const cc = { x: -1, y: -1 };
        const ok = enexto_gpflags(cc, OX, OY, bugPtr(), GP_ALLOW_XY);
        assert.equal(ok, true, 'origin should be placeable (map/hero setup broken?)');
        assert.equal(cc.x, OX);
        assert.equal(cc.y, OY);
    });
});
