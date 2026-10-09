import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { covers_objects } from '../js/display.js';
import {
    POOL, LAVAPOOL, DRAWBRIDGE_UP, ROOM, DB_LAVA, DB_MOAT,
} from '../js/const.js';

// C ref: display.h covers_objects `:218–220` —
//   `(is_pool(xx, yy) && !Underwater) || LAVAPOOL || LAVAWALL`
// with Underwater ≡ u.uinwater (youprop.h:279), plus the `:222`
// covers_traps alias (JS :2288–2290, delegates — unchanged).
// C truth: a surface hero over pool sees water (covered, paint
// skipped); a submerged hero sees the floor objects/traps (not
// covered). The JS pool arm read the sticky `game.u?.Underwater`
// flat (zero writers anywhere in js/ — dead false), so a submerged
// hero got surface behavior (covered) where C paints the floor.
// Fix (D-3400 idiom): read the live `(game.u?.uinwater | 0)` bit.
// Ship-time equivalence check: C is_pool(x,y) (dbridge.c:46 —
// POOL/MOAT/WATER or is_moat) is NOT the IS_POOL range
// (POOL..DRAWBRIDGE_UP): a raised drawbridge over lava/ice/floor,
// or over moat on the Juiblex level, is IS_POOL-true but
// C-is_pool-false. The arm calls the live is_pool(x, y) export
// (already imported from hack.js — same shape as the C-exact
// covers_objects_detect sibling in js/detect.js:1052–1061).
// Lava-first order kept: pure `||`, no side effects, no RNG.
// Staging: one cell per terrain at fixed coords, no RNG, no
// messages — the predicate pins the gate directly.

const X = 5;

function setup({ hero = {}, cells = {} } = {}) {
    resetGame();
    game.u = { uinwater: 0, ...hero };
    game.level = {
        at: (x, y) => {
            if (x !== X) return { typ: ROOM };
            return cells[y] ?? { typ: ROOM };
        },
    };
}

describe('covers_objects pool arm reads live uinwater + is_pool (display.h:218-220, youprop.h:279)', () => {
    it('surface (uinwater=0) over POOL: covered', () => {
        setup({ hero: { uinwater: 0 }, cells: { 5: { typ: POOL } } });
        assert.equal(covers_objects(X, 5), true);
    });

    it('submerged (uinwater=1) over POOL: not covered (floor painted)', () => {
        setup({ hero: { uinwater: 1 }, cells: { 5: { typ: POOL } } });
        assert.equal(covers_objects(X, 5), false);
    });

    it('dead u.Underwater flat alone still covers (live bit rules)', () => {
        setup({ hero: { uinwater: 0, Underwater: 1 }, cells: { 5: { typ: POOL } } });
        assert.equal(covers_objects(X, 5), true);
    });

    it('submerged over LAVAPOOL: covered (lava arm unconditional)', () => {
        setup({ hero: { uinwater: 1 }, cells: { 5: { typ: LAVAPOOL } } });
        assert.equal(covers_objects(X, 5), true);
    });

    it('surface over raised bridge over lava: not covered (C is_pool, not IS_POOL range)', () => {
        setup({
            hero: { uinwater: 0 },
            cells: { 5: { typ: DRAWBRIDGE_UP, drawbridgemask: DB_LAVA } },
        });
        assert.equal(covers_objects(X, 5), false);
    });

    it('surface over raised bridge over moat: covered (is_moat arm)', () => {
        setup({
            hero: { uinwater: 0 },
            cells: { 5: { typ: DRAWBRIDGE_UP, drawbridgemask: DB_MOAT } },
        });
        assert.equal(covers_objects(X, 5), true);
    });
});
