// `objnam.c` the_unique_pm clone removal: eat.js (:2741) local clone is
// deleted for the live export (js/objnam.js:2784). C `objnam.c:1120-1140`
// is the G_UNIQ "the Name" article gate with three pointer-compare
// exceptions (High Priest / long worm tail false, Wizard of Yendor
// true). The eat clone compared `ptr === mons(PM_*)`, but `mons()`
// (monsters.js:227) builds a fresh object per call, so all three arms
// were dead (always-false): a High Priest corpse printed "The …" where
// C prints "This …" (eatcorpse :2000-2004 taste line; tin which=2 at
// eat.js:3833 rides the same clone). The canonical export compares
// `(ptr.mndx|0)`.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { the_unique_pm } from '../js/objnam.js';
import { mons, monsterNames } from '../js/monsters.js';

const pm = (name) => mons(monsterNames.indexOf(name));

describe('live the_unique_pm article gate (objnam.c:1120-1140)', () => {
    it('High Priest is not unique (eat clone said unique -> "The …")', () => {
        assert.equal(the_unique_pm(pm('PM_HIGH_CLERIC')), false);
    });

    it('long worm tail is not unique', () => {
        assert.equal(the_unique_pm(pm('PM_LONG_WORM_TAIL')), false);
    });

    it('Wizard of Yendor is forced unique', () => {
        assert.equal(the_unique_pm(pm('PM_WIZARD_OF_YENDOR')), true);
    });

    it('plain G_UNIQ non-pname monster is unique', () => {
        assert.equal(the_unique_pm(pm('PM_ORACLE')), true);
    });

    it('personal-name monster is not unique', () => {
        assert.equal(the_unique_pm(pm('PM_DEATH')), false);
    });

    it('common monster is not unique', () => {
        assert.equal(the_unique_pm(pm('PM_GRID_BUG')), false);
    });
});

describe('the_unique_pm clone census (eat rewire)', () => {
    it('no local the_unique_pm remains in eat.js', () => {
        const src = readFileSync(new URL('../js/eat.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function the_unique_pm\(/m),
            'local clone still defined in js/eat.js');
        assert.ok(src.match(/import \{[^}]*the_unique_pm[^}]*\} from '\.\/objnam\.js'/),
            'js/eat.js must import the_unique_pm from objnam.js');
    });

    it('census: only the canonical export defines the_unique_pm', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function the_unique_pm\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/objnam.js']);
    });
});
