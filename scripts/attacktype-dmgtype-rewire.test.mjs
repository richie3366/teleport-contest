// `mondata.c` attacktype 4-clone removal (makemon/muse/polyself/trap →
// live js/mondata.js:79 export, C `:54–57` fordmg AD_ANY scan) + dmgtype
// 2-clone removal (engrave/eat → live js/monsters.js:565 export, C
// `:712–715` AT_ANY scan). All 6 edges already existed statically —
// each file's mondata.js / monsters.js import only gains the name, the
// same-named local scan is replaced by a live-export marker, and every
// call site keeps its name (now resolving to the live export).
// D-3357 extends the census: dmgtype clones in mhitm/mhitu/monmove +
// dmgtype_zap in zap rewired to the monsters.js export, attacktype_mm
// in mhitm rewired to the mondata.js export, and canonical
// dmgtype_fromattack ported at js/mondata.js (mhitm/mhitu clones
// removed; mondata.js + polyself.js import it from mondata.js).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const js = (f) => readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');

describe('attacktype/dmgtype clone census (rewire + D-3357 fromattack canonical)', () => {
    it('no same-named clones remain in the 6 rewired files', () => {
        for (const f of ['makemon.js', 'muse.js', 'polyself.js', 'trap.js']) {
            assert.ok(!js(f).match(/^function attacktype\(/m),
                `local attacktype clone still defined in js/${f}`);
        }
        for (const f of ['engrave.js', 'eat.js']) {
            assert.ok(!js(f).match(/^function dmgtype\(/m),
                `local dmgtype clone still defined in js/${f}`);
        }
        for (const f of ['mhitm.js', 'mhitu.js', 'monmove.js']) {
            assert.ok(!js(f).match(/^function dmgtype\(/m),
                `local dmgtype clone still defined in js/${f}`);
            assert.ok(!js(f).match(/^function dmgtype_fromattack\(/m),
                `local dmgtype_fromattack clone still defined in js/${f}`);
        }
        assert.ok(!js('mhitm.js').match(/^function attacktype_mm\(/m),
            'local attacktype_mm clone still defined in js/mhitm.js');
        assert.ok(!js('zap.js').match(/^function dmgtype_zap\(/m),
            'local dmgtype_zap clone still defined in js/zap.js');
    });

    it('the 6 files import the live exports (edges already existed)', () => {
        assert.ok(js('makemon.js').match(/monsndx, attacktype \} from '\.\/mondata\.js';/),
            'js/makemon.js must import attacktype from mondata.js');
        assert.ok(js('muse.js').match(/^\s+attacktype,\n\} from '\.\/mondata\.js';/m),
            'js/muse.js must import attacktype from mondata.js');
        assert.ok(js('polyself.js').match(/set_mon_data, attacktype, dmgtype_fromattack \} from '\.\/mondata\.js';/),
            'js/polyself.js must import attacktype + dmgtype_fromattack from mondata.js');
        assert.ok(js('trap.js').match(/resists_magm, attacktype \} from '\.\/mondata\.js';/),
            'js/trap.js must import attacktype from mondata.js');
        assert.ok(js('engrave.js').match(/nohands, verysmall, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/engrave.js must import dmgtype from monsters.js');
        assert.ok(js('eat.js').match(/is_were, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/eat.js must import dmgtype from monsters.js');
    });

    it('D-3357 files import the live exports (edges already existed)', () => {
        assert.ok(js('mhitm.js').match(/Resists_Elem, attacktype, dmgtype_fromattack \} from '\.\/mondata\.js';/),
            'js/mhitm.js must import attacktype + dmgtype_fromattack from mondata.js');
        assert.ok(js('mhitm.js').match(/is_undead, is_were, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/mhitm.js must import dmgtype from monsters.js');
        assert.ok(js('mhitu.js').match(/get_atkdam_type, dmgtype_fromattack,\n\} from '\.\/mondata\.js';/),
            'js/mhitu.js must import dmgtype_fromattack from mondata.js');
        assert.ok(js('mhitu.js').match(/MR_FIRE, MR_COLD, MR_ELEC, MR_ACID, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/mhitu.js must import dmgtype from monsters.js');
        assert.ok(js('monmove.js').match(/resists_ston, is_rider, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/monmove.js must import dmgtype from monsters.js');
        assert.ok(js('zap.js').match(/vegetarian, carnivorous, NUMMONS, dmgtype,\n\} from '\.\/monsters\.js';/),
            'js/zap.js must import dmgtype from monsters.js');
        assert.ok(!js('mondata.js').match(/dmgtype_fromattack, AT_EXPL/),
            'js/mondata.js must not import dmgtype_fromattack from mhitm.js anymore');
        assert.ok(!js('polyself.js').match(/AD_COLD, dmgtype_fromattack,/),
            'js/polyself.js must not import dmgtype_fromattack from mhitm.js anymore');
        assert.ok(js('mondata.js').match(/^export function dmgtype_fromattack\(ptr, dtyp, atyp\) \{$/m),
            'canonical dmgtype_fromattack export missing in js/mondata.js');
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
        // D-3357: mhitm/mhitu/monmove dmgtype clones rewired to monsters.js.
        assert.deepEqual(dmgDefs.sort(), ['js/monsters.js']);
    });

    it('D-3357 call sites resolve to the live exports', () => {
        assert.ok(js('mhitm.js').match(/if \(dmgtype\(ptr, 1 \/\* AD_MAGM \*\/\)\) return true;/),
            'resists_magm MAGM call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/if \(dmgtype\(mdef\.data, AD_CORR\)\) \{/),
            'rustm CORR call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/: dmgtype\(pagr, AD_SSEX\) \? AD_SSEX/),
            'could_seduce SSEX call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/if \(attacktype\(pa, AT_ENGL\) \|\| attacktype\(pa, AT_HUGS\)/),
            'sticks ENGL call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/attacktype\(game\.mswallower\.data, AT_ENGL\)/),
            'mswallower call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/if \(attacktype\(mtmp\.data, AT_EXPL\)/),
            'reconstitutes EXPL call missing in js/mhitm.js');
        assert.ok(js('mhitm.js').match(/return dmgtype_fromattack\(ptr, AD_BLND, AT_EXPL\)/),
            'resists_blnd_mm call missing in js/mhitm.js');
        assert.ok(js('mhitu.js').match(/return dmgtype\(ptr, AD_STCK\)/),
            'sticks STCK call missing in js/mhitu.js');
        assert.ok(js('mhitu.js').match(/if \(dmgtype\(youdat, AD_SEDU\) \|\| dmgtype\(youdat, AD_SSEX\)\) \{/),
            'seduce call missing in js/mhitu.js');
        assert.ok(js('mhitu.js').match(/return dmgtype_fromattack\(ptr, AD_BLND, AT_EXPL\)/),
            'resists_blnd_you call missing in js/mhitu.js');
        assert.ok(js('monmove.js').match(/&& \(dmgtype\(ptr, AD_RUST\) \|\| dmgtype\(ptr, AD_CORR\)/),
            'rust/corr call missing in js/monmove.js');
        assert.ok(js('zap.js').match(/if \(!dmgtype\(mtmp2\.data, AD_SEDU\)/),
            'revive SEDU call missing in js/zap.js');
        assert.ok(js('mondata.js').match(/if \(dmgtype_fromattack\(ptr, AD_BLND, AT_EXPL\)/),
            'resists_blnd call missing in js/mondata.js');
        assert.ok(js('polyself.js').match(/!!dmgtype_fromattack\(mdat, AD_BLND, AT_EXPL\)/),
            'ugolemeffects call missing in js/polyself.js');
    });

    it('census: dmgtype_fromattack canonical definer is mondata.js', () => {
        const dir = new URL('../js/', import.meta.url);
        const fromDefs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function dmgtype_fromattack\(/m)) fromDefs.push(`js/${f}`);
            assert.ok(!src.match(/^function attacktype_mm\(/m), `attacktype_mm clone in js/${f}`);
            assert.ok(!src.match(/^function dmgtype_zap\(/m), `dmgtype_zap clone in js/${f}`);
        }
        assert.deepEqual(fromDefs.sort(), ['js/mondata.js']);
        assert.ok(js('mondata.js').match(/^const AT_ANY = -1;/m),
            'AT_ANY wildcard const missing in js/mondata.js');
    });
});
