// `dungeon.c` Is_branchlev C-locus port + has_ceiling/on_level clone removals:
// end.js Is_branchlev+on_level clones and mklev.js is_branchlev() deleted for
// the live export (js/dungeon.js); dothrow/mon/potion/trap has_ceiling clones
// (+ trap has_ceiling_trap) and quest/dig/do/potion/end on_level clones
// rewired to the live dungeon.js exports (D-3330 adds dokick.js).
// C: dungeon.c:1464–1473
// (branches scan, end1-before-end2), :1689–1698 (endgame non-earth has no
// ceiling), :1439–1443 (dnum+dlevel equality, NONNULLARG12).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { Is_branchlev, has_ceiling, on_level } from '../js/dungeon.js';
import { initRng } from '../js/rng.js';

describe('live Is_branchlev branches scan (dungeon.c:1464-1473)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3329);
        game.branches = [];
    });

    it('returns the first branch matching end1 or end2, end1 first', { timeout: 5000 }, () => {
        const b1 = { end1: { dnum: 0, dlevel: 3 }, end2: { dnum: 2, dlevel: 1 } };
        const b2 = { end1: { dnum: 0, dlevel: 9 }, end2: { dnum: 3, dlevel: 1 } };
        game.branches.push(b1, b2);
        assert.equal(Is_branchlev({ dnum: 0, dlevel: 3 }), b1);
        assert.equal(Is_branchlev({ dnum: 2, dlevel: 1 }), b1);
        assert.equal(Is_branchlev({ dnum: 3, dlevel: 1 }), b2);
        assert.equal(Is_branchlev({ dnum: 0, dlevel: 4 }), null);
    });

    it('null on an empty chain', { timeout: 5000 }, () => {
        assert.equal(Is_branchlev({ dnum: 0, dlevel: 1 }), null);
    });
});

describe('live has_ceiling gate (dungeon.c:1689-1698)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3329);
        game.astral_level = { dnum: 7, dlevel: 1 };
        game.earth_level = { dnum: 7, dlevel: 1 };
    });

    it('false only on endgame non-earth levels', { timeout: 5000 }, () => {
        assert.equal(has_ceiling({ dnum: 0, dlevel: 1 }), true);
        assert.equal(has_ceiling({ dnum: 7, dlevel: 3 }), false);
        assert.equal(has_ceiling({ dnum: 7, dlevel: 1 }), true);
    });
});

describe('live on_level equality (dungeon.c:1439-1443)', () => {
    it('compares dnum+dlevel with |0 folding', { timeout: 5000 }, () => {
        assert.equal(on_level({ dnum: 1, dlevel: 5 }, { dnum: 1, dlevel: 5 }), true);
        assert.equal(on_level({ dnum: 1, dlevel: 5 }, { dnum: 1, dlevel: 6 }), false);
        assert.equal(on_level({ dnum: 1, dlevel: 5 }, { dnum: 2, dlevel: 5 }), false);
    });
});

describe('Is_branchlev/has_ceiling/on_level clone census', () => {
    it('no local Is_branchlev/is_branchlev/has_ceiling clones in rewired files; all import live', () => {
        for (const f of ['end.js', 'mklev.js']) {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function [Ii]s_branchlev\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/import \{[^}]*Is_branchlev[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import Is_branchlev from dungeon.js`);
        }
        for (const f of ['dothrow.js', 'mon.js', 'potion.js', 'trap.js']) {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function has_ceiling(_trap)?\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/import \{[^}]*has_ceiling[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import has_ceiling from dungeon.js`);
        }
        for (const f of ['quest.js', 'dig.js', 'do.js', 'potion.js', 'dokick.js']) {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function on_level\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/import \{[^}]*on_level[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import on_level from dungeon.js`);
        }
        // end.js: sole on_level site was inside the deleted Is_branchlev
        // clone, so only the Is_branchlev import (asserted above) remains.
        const endSrc = readFileSync(new URL('../js/end.js', import.meta.url), 'utf8');
        assert.ok(!endSrc.match(/^function on_level\(/m),
            'local on_level clone still defined in js/end.js');
    });

    it('census: dungeon.js is the sole definer of Is_branchlev/has_ceiling', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            for (const m of src.matchAll(/^(export )?function (Is_branchlev|has_ceiling)\(/gm)) {
                defs.push(`js/${f}:${m[2]}`);
            }
            assert.ok(!src.match(/^function (is_branchlev|has_ceiling_trap)\(/m),
                `renamed clone still defined in js/${f}`);
        }
        assert.deepEqual(defs.sort(),
            ['js/dungeon.js:Is_branchlev', 'js/dungeon.js:has_ceiling']);
    });
});
