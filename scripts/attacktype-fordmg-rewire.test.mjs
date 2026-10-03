// `mondata.c` attacktype_fordmg 4-clone removal: the local clones
// (js/apply.js:4559-then, js/eat.js:394-then, js/mon.js:300-then,
// js/region.js:320-then — all without the live |0 param folding) are
// deleted for the live export (js/uhitm.js:609, C `:42–50`). Rewired
// sites: apply.c:2316 unicorn-horn engulf-blind, eat.c:2519 carrot +
// eat.c:3767 vomit-acid, mon.c:350–351 m_poisongas_ok (mon.js +
// region.js local clone).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const CLONE_FILES = ['apply.js', 'eat.js', 'mon.js', 'region.js'];

function jsSrc(f) {
    return readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
}

describe('attacktype_fordmg clone census (4-file rewire)', () => {
    it('no local clone remains; each file imports the live export', () => {
        for (const f of CLONE_FILES) {
            const src = jsSrc(f);
            assert.ok(!src.match(/^function attacktype_fordmg\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/attacktype_fordmg[\s\S]{0,80}?from '\.\/uhitm\.js'/),
                `js/${f} must import attacktype_fordmg from uhitm.js`);
        }
    });

    it('every rewired site still calls the live export (C-cited)', () => {
        assert.ok(jsSrc('apply.js').match(/\/\/ C apply\.c:2316/),
            'C-cite comment missing at the apply.js site');
        assert.ok(jsSrc('eat.js').match(/\/\/ C eat\.c:3767/)
            && jsSrc('eat.js').match(/\/\/ C eat\.c:2519/),
            'C-cite comments missing at the eat.js sites');
        assert.ok(jsSrc('mon.js').match(/\/\/ C mon\.c:350–351/),
            'C-cite comment missing at the mon.js site');
        assert.ok(jsSrc('region.js').match(/\/\/ C mon\.c:350–351/),
            'C-cite comment missing at the region.js site');
        for (const f of CLONE_FILES) {
            assert.ok(jsSrc(f).match(/attacktype_fordmg\(/),
                `attacktype_fordmg call missing in js/${f}`);
        }
    });

    it('census: only the canonical export defines attacktype_fordmg', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function attacktype_fordmg\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/uhitm.js']);
    });
});
