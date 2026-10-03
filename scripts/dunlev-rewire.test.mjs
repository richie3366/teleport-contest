// `dungeon.c` dunlev / dunlevs_in_dungeon clone removals (D-3342; live at
// js/dungeon.js:1090/:1095):
// the fountain.js + trap.js dunlev clones and the dokick.js +
// fountain.js + teleport.js + trap.js dunlevs_in_dungeon clones are
// deleted for the live exports.
// C dungeon.c:1325–1328 is `return lev->dlevel`; :1332–1335 is
// `return svd.dungeons[lev->dnum].num_dunlevs` (JS `?? 1` folds).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { dunlev, dunlevs_in_dungeon } from '../js/dungeon.js';

describe('live dunlev / dunlevs_in_dungeon (dungeon.c:1325-1335)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('dunlev returns lev.dlevel, 1 when missing', { timeout: 5000 }, () => {
        assert.equal(dunlev({ dnum: 0, dlevel: 4 }), 4);
        assert.equal(dunlev(null), 1);
        assert.equal(dunlev({}), 1);
    });

    it('dunlevs_in_dungeon returns num_dunlevs, 1 when missing', { timeout: 5000 }, () => {
        game.dungeons = [{ num_dunlevs: 7 }];
        assert.equal(dunlevs_in_dungeon({ dnum: 0, dlevel: 1 }), 7);
        game.dungeons = [];
        assert.equal(dunlevs_in_dungeon({ dnum: 0, dlevel: 1 }), 1);
        assert.equal(dunlevs_in_dungeon(null), 1);
    });
});

describe('dunlev clone census (dokick/fountain/teleport/trap rewires)', () => {
    const both = ['fountain.js', 'trap.js'];
    for (const f of both) {
        it(`no local dunlev/dunlevs remains in ${f}; it imports both live exports`, () => {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function dunlev\(/m),
                `local dunlev clone still defined in js/${f}`);
            assert.ok(!src.match(/^function dunlevs_in_dungeon\(/m),
                `local dunlevs_in_dungeon clone still defined in js/${f}`);
            assert.ok(src.match(/import \{[^}]*dunlev[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import dunlev from dungeon.js`);
            assert.ok(src.match(/import \{[^}]*dunlevs_in_dungeon[^}]*\} from '\.\/dungeon\.js'/),
                `js/${f} must import dunlevs_in_dungeon from dungeon.js`);
        });
    }

    it('no local dunlevs remains in dokick.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/dokick.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function dunlevs_in_dungeon\(/m),
            'local dunlevs_in_dungeon clone still defined in js/dokick.js');
        assert.ok(src.match(/import \{[^}]*dunlevs_in_dungeon[^}]*\} from '\.\/dungeon\.js'/),
            'js/dokick.js must import dunlevs_in_dungeon from dungeon.js');
    });

    it('no local dunlevs remains in teleport.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/teleport.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function dunlevs_in_dungeon\(/m),
            'local dunlevs_in_dungeon clone still defined in js/teleport.js');
        assert.ok(src.match(/import \{[^}]*dunlevs_in_dungeon[^}]*\} from '\.\/dungeon\.js'/s),
            'js/teleport.js must import dunlevs_in_dungeon from dungeon.js');
    });

    it('census: the canonical exports are the only dunlev defs', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^function dunlev\(/m)) defs.push(`js/${f}:dunlev`);
            if (src.match(/^export function dunlev\(/m)) defs.push(`js/${f}:dunlev`);
            if (src.match(/^function dunlevs_in_dungeon\(/m)) defs.push(`js/${f}:dunlevs`);
            if (src.match(/^export function dunlevs_in_dungeon\(/m)) defs.push(`js/${f}:dunlevs`);
        }
        assert.deepEqual(defs.sort(), ['js/dungeon.js:dunlev', 'js/dungeon.js:dunlevs']);
    });
});
