// `mondata.c` attacktype 4-clone removal (makemon/muse/polyself/trap →
// live js/mondata.js:79 export, C `:54–57` fordmg AD_ANY scan) + dmgtype
// 2-clone removal (engrave/eat → live js/monsters.js:565 export, C
// `:712–715` AT_ANY scan). All 6 edges already existed statically —
// each file's mondata.js / monsters.js import only gains the name, the
// same-named local scan is replaced by a live-export marker, and every
// call site keeps its name (now resolving to the live export).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const js = (f) => readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');

describe('attacktype/dmgtype clone census (6-file rewire)', () => {
    it('no same-named clones remain in the 6 rewired files', () => {
        for (const f of ['makemon.js', 'muse.js', 'polyself.js', 'trap.js']) {
            assert.ok(!js(f).match(/^function attacktype\(/m),
                `local attacktype clone still defined in js/${f}`);
        }
        for (const f of ['engrave.js', 'eat.js']) {
            assert.ok(!js(f).match(/^function dmgtype\(/m),
                `local dmgtype clone still defined in js/${f}`);
        }
    });

    it('the 6 files import the live exports (edges already existed)', () => {
        assert.ok(js('makemon.js').match(/monsndx, attacktype \} from '\.\/mondata\.js';/),
            'js/makemon.js must import attacktype from mondata.js');
        assert.ok(js('muse.js').match(/^\s+attacktype,\n\} from '\.\/mondata\.js';/m),
            'js/muse.js must import attacktype from mondata.js');
        assert.ok(js('polyself.js').match(/set_mon_data, attacktype \} from '\.\/mondata\.js';/),
            'js/polyself.js must import attacktype from mondata.js');
        assert.ok(js('trap.js').match(/resists_magm, attacktype \} from '\.\/mondata\.js';/),
            'js/trap.js must import attacktype from mondata.js');
        assert.ok(js('engrave.js').match(/nohands, verysmall, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/engrave.js must import dmgtype from monsters.js');
        assert.ok(js('eat.js').match(/is_were, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/eat.js must import dmgtype from monsters.js');
    });

    it('attacktype call sites still call by name (now the live export)', () => {
        assert.ok(js('makemon.js').match(/if \(!attacktype\(mdat, AT_ENGL\)\) \{/),
            'newcham_ustuck call missing in js/makemon.js');
        assert.ok(js('makemon.js').match(/obj_sheds_light\(otmp\) && attacktype\(mtmp\.data, AT_ENGL\)/),
            'mpickobj call missing in js/makemon.js');
        assert.ok(js('makemon.js').match(/is_animal\(pm\) \|\| attacktype\(pm, AT_EXPL\)/),
            'rnd_offensive_item call missing in js/makemon.js');
        assert.ok(js('muse.js').match(/!attacktype\(ptr, AT_GAZE\)/),
            'searches_for_item call missing in js/muse.js');
        assert.ok(js('muse.js').match(/!attacktype\(data, AT_GAZE\)/),
            'find_offensive call missing in js/muse.js');
        assert.ok(js('muse.js').match(/!attacktype\(mtmp\.data, AT_GAZE\) \|\| mtmp\.mcan/),
            'find_misc call missing in js/muse.js');
        assert.ok(js('polyself.js').match(/return attacktype\(ptr, AT_BREA\);/),
            'can_breathe call missing in js/polyself.js');
        assert.ok(js('polyself.js').match(/attacktype\(mptr, AT_CLAW\)/),
            'mbodypart call missing in js/polyself.js');
        assert.ok(js('polyself.js').match(/if \(attacktype\(uptr, AT_SPIT\)\) \{/),
            'polymon call missing in js/polyself.js');
        assert.ok(js('polyself.js').match(/else if \(attacktype\(uptr, AT_GAZE\)\) \{/),
            'domonability call missing in js/polyself.js');
        assert.ok(js('trap.js').match(/!attacktype\(pm, AT_MAGC\)/),
            'immune_to_trap call missing in js/trap.js');
        assert.ok(js('trap.js').match(/attacktype\(mptr, AT_MAGC\)/),
            'trapeffect_anti_magic call missing in js/trap.js');
    });

    it('dmgtype call sites still call by name (now the live export)', () => {
        assert.ok(js('engrave.js').match(/return !!\(dmgtype\(ptr, AD_STCK\)/),
            'sticks STCK call missing in js/engrave.js');
        assert.ok(js('engrave.js').match(/\(dmgtype\(ptr, AD_WRAP\) && !attacktype\(ptr, AT_ENGL\)\)/),
            'sticks WRAP call missing in js/engrave.js');
        assert.ok(js('eat.js').match(/\|\| dmgtype\(ptr, AD_POLY\);/),
            'polyfood call missing in js/eat.js');
        assert.ok(js('eat.js').match(/if \(dmgtype\(ptr, AD_STUN\) \|\| dmgtype\(ptr, AD_HALU\)/),
            'cpostfx call missing in js/eat.js');
    });

    it('census: canonical definers live; no same-named def in the 6 files', () => {
        const dir = new URL('../js/', import.meta.url);
        const atkDefs = [];
        const dmgDefs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function attacktype\(/m)) atkDefs.push(`js/${f}`);
            if (src.match(/^(export )?function dmgtype\(/m)) dmgDefs.push(`js/${f}`);
        }
        assert.deepEqual(atkDefs.sort(), ['js/mondata.js']);
        // mhitm/mhitu/monmove dmgtype clones stay (queued follow-up rows).
        assert.deepEqual(dmgDefs.sort(),
            ['js/mhitm.js', 'js/mhitu.js', 'js/monmove.js', 'js/monsters.js']);
    });
});
