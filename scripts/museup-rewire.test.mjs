// `mthrowu.c` m_useup zap.js + muse.js clone removals: the local clones
// (manual minvent unlink, NO weight() recompute on the quan>1 arm) are
// deleted for the live export (js/mthrowu.js:184 — C mthrowu.c:1162–1170
// quan>1 decrement + weight() else m_useupall). 20 sites rewired
// (zap.js ×2, muse.js ×18) via already-static mthrowu edges.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resetGame } from '../js/gstate.js';
import { m_useup } from '../js/mthrowu.js';
import { weight } from '../js/mkobj.js';

describe('live m_useup recomputes weight on the quan>1 arm (mthrowu.c:1164-1166)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('decrements quan and refreshes a stale owt (the deleted clones kept it)', () => {
        const mon = { minvent: null };
        const obj = { otyp: 0, oclass: 1, quan: 2, owt: 9999, nobj: null };
        mon.minvent = obj;
        m_useup(mon, obj);
        assert.equal(obj.quan, 1);
        // Live export assigns obj.owt = weight(obj); the clones returned
        // without touching owt, leaving the stale 9999 behind.
        assert.equal(obj.owt, weight(obj));
        assert.notEqual(obj.owt, 9999);
    });

    it('null guards (JS-only; C marks both params NONNULLARG12)', () => {
        m_useup(null, { quan: 2 });
        m_useup({}, null);
    });
});

describe('m_useup clone census (zap + muse rewire)', () => {
    it('no local m_useup remains in zap.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/zap.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function m_useup\(/m),
            'local clone still defined in js/zap.js');
        assert.ok(src.match(/m_useup[^}]*\} from '\.\/mthrowu\.js'/),
            'js/zap.js must import m_useup from mthrowu.js');
    });

    it('no local m_useup remains in muse.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/muse.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function m_useup\(/m),
            'local clone still defined in js/muse.js');
        assert.ok(src.match(/m_useup[^}]*\} from '\.\/mthrowu\.js'/),
            'js/muse.js must import m_useup from mthrowu.js');
    });

    it('census: only the canonical export defines m_useup', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function m_useup\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/mthrowu.js']);
    });
});
