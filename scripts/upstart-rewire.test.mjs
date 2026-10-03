// `hacklib.c` upstart 2-clone removal (mthrowu/read → live
// js/hacklib.js:497 export, C `:113–119` highc-first-char). Both edges
// already existed statically — each file's hacklib.js import only gains
// the name, the same-named local toUpperCase clone is replaced by a
// live-export marker, and the call site keeps its name (now resolving
// to the live export). Remaining same-named clones
// (apply/do_name/monmove/pickup/readobjnam/trap) ship as queued rows.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const js = (f) => readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');

describe('upstart clone census (mthrowu + read rewire)', () => {
    it('no same-named clones remain in the 2 rewired files', () => {
        for (const f of ['mthrowu.js', 'read.js']) {
            assert.ok(!js(f).match(/^function upstart\(/m),
                `local upstart clone still defined in js/${f}`);
            assert.ok(js(f).match(/live export from '\.\/hacklib\.js' \(clone removed/),
                `live-export marker missing in js/${f}`);
        }
    });

    it('the 2 files import the live export (edges already existed)', () => {
        assert.ok(js('mthrowu.js').match(/distmin, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/mthrowu.js must import upstart from hacklib.js');
        assert.ok(js('read.js').match(/upwords, digit, upstart \} from '\.\/hacklib\.js';/),
            'js/read.js must import upstart from hacklib.js');
    });

    it('call sites still call by name (now the live export)', () => {
        assert.ok(js('mthrowu.js').match(/const subj = upstart\(onm\);/),
            'thitu wide-miss call missing in js/mthrowu.js (C mthrowu.c:113)');
        assert.ok(js('read.js').match(/`\$\{upstart\(nam\)\} are already nonexistent\.`/),
            'genocide-nonexistent call missing in js/read.js (C read.c:2783)');
    });

    it('census: canonical definer live; 6 queued clones remain', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function upstart\(/m)) defs.push(`js/${f}`);
        }
        // apply/do_name/monmove/pickup/readobjnam/trap clones stay (queued rows).
        assert.deepEqual(defs.sort(),
            ['js/apply.js', 'js/do_name.js', 'js/hacklib.js', 'js/monmove.js',
                'js/pickup.js', 'js/readobjnam.js', 'js/trap.js']);
    });
});
