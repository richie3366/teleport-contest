// `hacklib.c` upstart 9-clone removal complete (mthrowu/read D-3356 +
// trap/pickup/apply/do_name/monmove/readobjnam D-3358 + potion
// `upstart_pot` D-3360 → live js/hacklib.js export, C `:113–119`
// highc-first-char). Every edge already existed statically — each file's
// hacklib.js import only gains the name, the local toUpperCase clone is
// replaced by a live-export marker, and the call sites keep their name
// (now resolving to the live export); potion's rename-clone site is
// renamed to the live name.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const js = (f) => readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
const REWIRED = ['mthrowu.js', 'read.js', 'trap.js', 'pickup.js', 'apply.js',
    'do_name.js', 'monmove.js', 'readobjnam.js'];

describe('upstart clone census (8-file rewire complete)', () => {
    it('no same-named clones remain in the 8 rewired files (potion rename-clone gone too)', () => {
        for (const f of REWIRED) {
            assert.ok(!js(f).match(/^function upstart\(/m),
                `local upstart clone still defined in js/${f}`);
            assert.ok(js(f).match(/live export from '\.\/hacklib\.js' \(clone removed/),
                `live-export marker missing in js/${f}`);
        }
        assert.ok(!js('potion.js').match(/^function upstart_pot\(/m),
            'local upstart_pot clone still defined in js/potion.js');
        assert.ok(js('potion.js').match(/live export from '\.\/hacklib\.js' \(clone removed/),
            'live-export marker missing in js/potion.js');
    });

    it('the 8 files import the live export (edges already existed)', () => {
        assert.ok(js('mthrowu.js').match(/distmin, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/mthrowu.js must import upstart from hacklib.js');
        assert.ok(js('read.js').match(/upwords, digit, upstart \} from '\.\/hacklib\.js';/),
            'js/read.js must import upstart from hacklib.js');
        assert.ok(js('trap.js').match(/ordin, strsubst, upstart \} from '\.\/hacklib\.js';/),
            'js/trap.js must import upstart from hacklib.js');
        assert.ok(js('pickup.js').match(/highc, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/pickup.js must import upstart from hacklib.js');
        assert.ok(js('apply.js').match(/isqrt, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/apply.js must import upstart from hacklib.js');
        assert.ok(js('do_name.js').match(/mungspaces, upstart \} from '\.\/hacklib\.js';/),
            'js/do_name.js must import upstart from hacklib.js');
        assert.ok(js('monmove.js').match(/distmin, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/monmove.js must import upstart from hacklib.js');
        assert.ok(js('readobjnam.js').match(/copynchars, upstart \} from '\.\/hacklib\.js';/),
            'js/readobjnam.js must import upstart from hacklib.js');
        assert.ok(js('potion.js').match(/depth, strstri, dist2, upstart \} from '\.\/hacklib\.js';/),
            'js/potion.js must import upstart from hacklib.js');
    });

    it('call sites still call by name (now the live export)', () => {
        assert.ok(js('mthrowu.js').match(/const subj = upstart\(onm\);/),
            'thitu wide-miss call missing in js/mthrowu.js (C mthrowu.c:113)');
        assert.ok(js('read.js').match(/`\$\{upstart\(nam\)\} are already nonexistent\.`/),
            'genocide-nonexistent call missing in js/read.js (C read.c:2783)');
        assert.ok(js('trap.js').match(/upstart\(statuename\)/),
            'animate_statue call missing in js/trap.js (C trap.c:834)');
        assert.ok(js('trap.js').match(/return upstart\(yname\(obj\)\);/),
            'yname call missing in js/trap.js');
        assert.ok(js('trap.js').match(/upstart\(x_monnam\(u\.usteed, steed_article, 'poor', SUPPRESS_SADDLE, false\)\)/),
            'steed-pit call missing in js/trap.js (C trap.c:1909)');
        assert.ok(js('pickup.js').match(/return upstart\(ysimple_name\(obj\)\);/),
            'ysimple_name call missing in js/pickup.js');
        assert.ok(js('pickup.js').match(/upstart\(dfeature\)/),
            'dfeature call missing in js/pickup.js (C pickup.c:405)');
        assert.ok(js('pickup.js').match(/upstart\(theArt\(xname\(cobj\)\)\)/),
            'theArt-locked call missing in js/pickup.js');
        assert.ok(js('pickup.js').match(/upstart\(thesimpleoname\(box\)\)\} is locked/),
            'thesimpleoname-locked call missing in js/pickup.js (C pickup.c:3979)');
        assert.ok(js('pickup.js').match(/upstart\(thesimpleoname\(box\)\)\} is empty/),
            'thesimpleoname-empty call missing in js/pickup.js (C pickup.c:4049)');
        assert.ok(js('apply.js').match(/upstart\(mhe\(mtmp\)\)/),
            'mhe-takes-it call missing in js/apply.js (C apply.c:1160)');
        assert.ok(js('apply.js').match(/buf = upstart\(shiftbuf\);/),
            'shift call missing in js/apply.js (C apply.c:650)');
        assert.ok(js('apply.js').match(/buf = upstart\(appearbuf\);/),
            'appear call missing in js/apply.js (C apply.c:662)');
        assert.ok(js('apply.js').match(/buf = upstart\(disappearbuf\);/),
            'disappear call missing in js/apply.js (C apply.c:678)');
        assert.ok(js('do_name.js').match(/upstart\(shown\)/),
            'naming-refusal calls missing in js/do_name.js (C do_name.c:166/:182/:191)');
        assert.ok(js('do_name.js').match(/upstart\(mhe\(mtmp\)\)/),
            'already-called call missing in js/do_name.js (C do_name.c:185)');
        assert.ok(js('do_name.js').match(/upstart\(monnambuf\)/),
            'no-names calls missing in js/do_name.js (C do_name.c:267/:278)');
        assert.ok(js('do_name.js').match(/upstart\(orcname\)/),
            'orc-name calls missing in js/do_name.js (C do_name.c:1575/:1579)');
        assert.ok(js('do_name.js').match(/upstart\(gang\)/),
            'gang call missing in js/do_name.js (C do_name.c:1575)');
        assert.equal((js('do_name.js').match(/upstart\(/g) || []).length, 9,
            'js/do_name.js must hold exactly the 9 rewired upstart calls');
        assert.ok(js('monmove.js').match(/upstart\(mbuf\)/),
            'web-spin call missing in js/monmove.js (C monmove.c:1286)');
        assert.ok(js('monmove.js').match(/upstart\(y_monnam\(mtmp\)\)/),
            'door-ooze call missing in js/monmove.js');
        assert.ok(js('readobjnam.js').match(/upstart\(ice_descr\(x, y\)\)/),
            'ice-descr call missing in js/readobjnam.js (C objnam.c:3684)');
        assert.ok(js('readobjnam.js').match(/upstart\(an\(dbuf\)\)/),
            'door-terrain call missing in js/readobjnam.js (C objnam.c:3815)');
        assert.ok(js('readobjnam.js').match(/upstart\(dbuf\)\} requires door/),
            'door-terrain call missing in js/readobjnam.js (C objnam.c:3819)');
        assert.ok(js('potion.js').match(/const buf = upstart\(s_suffix\(mnam\)\);/),
            'saddle-dip call missing in js/potion.js (C potion.c:1713)');
    });

    it('census: canonical definer live; no rename-clone remains', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        const variants = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function upstart\(/m)) defs.push(`js/${f}`);
            const vm = src.match(/^function [A-Za-z_]*upstart[A-Za-z_]*\(/m);
            if (vm && !src.match(/^export function upstart\(/m)) variants.push(`js/${f}:${vm[0]}`);
            if (src.match(/^export function upstart\(/m)) variants.push(`js/${f}:export function upstart(`);
        }
        assert.deepEqual(defs.sort(), ['js/hacklib.js']);
        assert.deepEqual(variants.sort(),
            ['js/hacklib.js:export function upstart(']);
    });
});
