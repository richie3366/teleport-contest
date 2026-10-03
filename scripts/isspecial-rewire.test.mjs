// `dungeon.c` Is_special end.js/quest.js clone removals: the local clones
// (js/end.js:616-then, js/quest.js:61-then — sp_levchn scans over each
// file's own on_level) are deleted for the live export (js/dungeon.js:2871).
// C `dungeon.c:1448–1457` scans svs.sp_levchn for on_level(lev, dlevel).
// The two call sites are C bones.c:25 (no_bones_level boneid gate) and C
// quest.c:94 (onquest special-level gate). At the time each file kept its
// own on_level clone (end.js Is_branchlev, quest.js Is_qstart / Is_qlocate /
// Is_nemesis / Not_firsttime); D-3329 deleted both for the live export.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { Is_special } from '../js/dungeon.js';
import { initRng } from '../js/rng.js';

describe('live Is_special sp_levchn scan (dungeon.c:1448-1457)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3328);
        game.sp_levchn = [];
    });

    it('returns the matching s_level, null on no match', { timeout: 5000 }, () => {
        const s = { dlevel: { dnum: 1, dlevel: 5 }, boneid: 0 };
        game.sp_levchn.push(s, { dlevel: { dnum: 1, dlevel: 6 }, boneid: 1 });
        assert.equal(Is_special({ dnum: 1, dlevel: 5 }), s);
        assert.equal(Is_special({ dnum: 1, dlevel: 7 }), null);
    });

    it('null on an empty chain', { timeout: 5000 }, () => {
        assert.equal(Is_special({ dnum: 0, dlevel: 1 }), null);
    });
});

describe('Is_special clone census (end/quest rewires)', () => {
    it('no local Is_special remains in end.js or quest.js; both import the live export', () => {
        for (const f of ['end.js', 'quest.js']) {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function Is_special\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/import \{[^}]*Is_special[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import Is_special from dungeon.js`);
        }
    });

    it('census: only the canonical export defines Is_special', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function Is_special\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/dungeon.js']);
    });
});
