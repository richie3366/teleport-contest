import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { glyph_is_poleable_at } from '../js/apply.js';
import { objectNames } from '../js/objects.js';
import {
    ROWNO, COLNO, IN_SIGHT, POOL, LAVAPOOL, ROOM,
} from '../js/const.js';

// C ref: display.h covers_objects `:218–220` —
//   `(is_pool(xx, yy) && !Underwater) || LAVAPOOL || LAVAWALL`
// with Underwater ≡ u.uinwater (youprop.h:279).
// The polearm display path (apply.js covers_objects_pole :3557–3560,
// via shown_floor_obj_pole :3562–3565 into the statue/boulder
// glyph arms :3609/:3629) clones the macro: a submerged hero's
// polearm probe over pool water sees the floor object (not
// covered); a surface hero sees water (covered, skipped). The JS
// clone read the sticky `game.u?.Underwater` flat (zero writers
// anywhere in js/ — dead false), so a submerged hero got surface
// behavior (covered, floor hidden) where C paints the floor.
// Fix (D-3400 idiom): read the live bit via the file's own
// Underwater_hero() (:1803 — `!!(game.u?.uinwater | 0)`).
// No new export (row: JS export unchanged): the tests pin the
// gate through the exported glyph_is_poleable_at() statue arm —
// no monster, IN_SIGHT set, one STATUE floor object staged.
// Lava arm runs on both sides (is_lava unconditional); pure
// gate, no RNG.

const STATUE = objectNames.indexOf('STATUE');
const X = 5;
const Y = 5;

function setup({ hero = {}, cell = { typ: POOL } } = {}) {
    resetGame();
    game.u = { ux: 1, uy: 1, uinwater: 0, ...hero };
    game.level = {
        at: (x, y) => {
            if (x !== X || y !== Y) return { typ: ROOM };
            return cell;
        },
    };
    game.viz_array = Array.from({ length: ROWNO },
        () => new Array(COLNO).fill(0));
    game.viz_array[Y][X] |= IN_SIGHT;
    game._objects_at = new Map([[`${X},${Y}`, { otyp: STATUE }]]);
}

describe('covers_objects_pole reads live uinwater (display.h:218-220, youprop.h:279)', () => {
    it('surface (uinwater=0) STATUE on POOL: covered, not poleable', () => {
        setup({ hero: { uinwater: 0 }, cell: { typ: POOL } });
        assert.equal(glyph_is_poleable_at(X, Y), false);
    });

    it('submerged (uinwater=1) STATUE on POOL: shown, poleable', () => {
        setup({ hero: { uinwater: 1 }, cell: { typ: POOL } });
        assert.equal(glyph_is_poleable_at(X, Y), true);
    });

    it('dead u.Underwater flat alone still covers (live bit rules)', () => {
        setup({
            hero: { uinwater: 0, Underwater: 1 },
            cell: { typ: POOL },
        });
        assert.equal(glyph_is_poleable_at(X, Y), false);
    });

    it('submerged STATUE on LAVAPOOL: covered (lava arm unconditional)', () => {
        setup({ hero: { uinwater: 1 }, cell: { typ: LAVAPOOL } });
        assert.equal(glyph_is_poleable_at(X, Y), false);
    });

    it('surface STATUE on ROOM: shown, poleable (non-pool control)', () => {
        setup({ hero: { uinwater: 0 }, cell: { typ: ROOM } });
        assert.equal(glyph_is_poleable_at(X, Y), true);
    });
});
