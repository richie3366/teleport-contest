// `mondata.c` resists_blnd live-export rewire: the canonical export is
// js/mondata.js (C `:247–272`, audited whole D-3445); the deleted
// subsets are js/mhitu.js:663-then + js/muse.js:504-then
// (resists_blnd_you: Blind/Unaware only, no arti/expl/catchall) and the
// js/detect.js:289-then + js/trap.js:4967-then clones (D-3447), plus
// the js/zap.js:4607-then resists_blnd_you subset and the
// js/engrave.js:1780-then inline `!(Blind()||u.Unaware)` gate (D-3449).
// Rewired sites (C `resists_blnd(&gy.youmonst)`): mhitu.c:1624 explmu
// not_affected + mhitu.c:1794 hitmu gaze, muse.c:1568 MUSE_CAMERA pick
// + muse.c:1947 MUSE_CAMERA use, detect.c:1230 throne-blind case 3,
// trap.c:4328 domagictrap flash, zap.c:3062 flashburn,
// engrave.c:1248 doblind.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Out-of-cluster subsets with their own queued rows; shrink this list.
const KNOWN_REMAINING_YOU = [];

function jsSrc(f) {
    return readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
}

describe('resists_blnd live export + 4-file rewire', () => {
    it('no local clone remains; each file imports the live export', () => {
        for (const f of ['detect.js', 'trap.js']) {
            const src = jsSrc(f);
            assert.ok(!src.match(/^function resists_blnd\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/resists_blnd[\s\S]{0,80}?from '\.\/mondata\.js'/),
                `js/${f} must import resists_blnd from mondata.js`);
        }
        for (const f of ['mhitu.js', 'muse.js', 'zap.js']) {
            const src = jsSrc(f);
            assert.ok(!src.match(/^function resists_blnd_you\(/m),
                `local subset still defined in js/${f}`);
            assert.ok(src.match(/resists_blnd[\s\S]{0,80}?from '\.\/mondata\.js'/),
                `js/${f} must import resists_blnd from mondata.js`);
        }
        assert.ok(jsSrc('engrave.js').match(/resists_blnd[\s\S]{0,80}?from '\.\/mondata\.js'/),
            'js/engrave.js must import resists_blnd from mondata.js');
        assert.ok(jsSrc('mondata.js').match(/^export function resists_blnd\(/m),
            'live export missing in js/mondata.js');
    });

    it('every rewired site calls the live export on game.youmonst', () => {
        for (const f of ['mhitu.js', 'muse.js', 'detect.js', 'trap.js', 'zap.js', 'engrave.js']) {
            assert.ok(jsSrc(f).match(/resists_blnd\(game\.youmonst\)/),
                `resists_blnd(game.youmonst) call missing in js/${f}`);
        }
        assert.ok(!jsSrc('mhitu.js').match(/resists_blnd_you\(/)
            && !jsSrc('muse.js').match(/resists_blnd_you\(/)
            && !jsSrc('zap.js').match(/resists_blnd_you\(/),
            'stale resists_blnd_you call remains in mhitu.js/muse.js/zap.js');
    });

    it('census: canonical export plus only the known remaining subset', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        const youDefs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function resists_blnd\(/m)) defs.push(`js/${f}`);
            if (src.match(/^function resists_blnd_you\(/m)) youDefs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/mondata.js']);
        assert.deepEqual(youDefs.sort(),
            KNOWN_REMAINING_YOU.map((f) => `js/${f}`).sort());
    });
});
