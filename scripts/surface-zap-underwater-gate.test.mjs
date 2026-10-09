import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { surface_zap } from '../js/zap.js';
import { POOL, ROOM } from '../js/const.js';

// C ref: dungeon.c surface `:1750–1788` — the `:1765–1767` pool arm
// returns `(Underwater && !Is_waterlevel(&u.uz)) ? "bottom" :
// hliquid("water")`, with Underwater ≡ u.uinwater (youprop.h:279).
// The zap-local surface_zap clone read the sticky `game.u?.Underwater`
// flat (zero writers anywhere in js/ — dead false), so a submerged hero
// off the water level got "water" where C says "bottom". Fix (D-3400
// idiom): read the live `(game.u?.uinwater | 0)` bit.
// Staging: POOL at (28,10); uz off the staged water level unless noted.

const MX = 28;
const MY = 10;

function setup(hero, waterLevel = { dnum: 1, dlevel: 1 }) {
    resetGame();
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, uswallow: 0,
        ...hero,
    };
    game.water_level = waterLevel;
    const cells = new Map();
    cells.set(`${MX},${MY}`, { typ: POOL, lit: 0, flags: 0 });
    game.level = {
        at: (x, y) => {
            const k = `${x},${y}`;
            if (!cells.has(k)) cells.set(k, { typ: ROOM, lit: 0, flags: 0 });
            return cells.get(k);
        },
        flags: {}, traps: [], rooms: [],
    };
}

describe('surface_zap pool arm reads live uinwater (dungeon.c:1765–1767, youprop.h:279)', () => {
    it('submerged off-waterlevel (uinwater=1): "bottom"', () => {
        setup({ uinwater: 1 });
        assert.equal(surface_zap(MX, MY), 'bottom');
    });

    it('surface control (uinwater=0): hliquid water', () => {
        setup({ uinwater: 0 });
        assert.equal(surface_zap(MX, MY), 'water');
    });

    it('waterlevel control (uinwater=1 on water level): hliquid water', () => {
        setup({ uinwater: 1, uz: { dnum: 1, dlevel: 1 } });
        assert.equal(surface_zap(MX, MY), 'water');
    });

    it('dead u.Underwater flat alone does not say "bottom" (live bit rules)', () => {
        setup({ uinwater: 0, Underwater: 1 });
        assert.equal(surface_zap(MX, MY), 'water');
    });
});
