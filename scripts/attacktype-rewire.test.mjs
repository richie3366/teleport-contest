// `mondata.c` attacktype live-export port + 4-clone removal: the live
// export is js/mondata.js (C `:54–57`, via the live uhitm.js
// attacktype_fordmg); the deleted clones are js/artifact.js:2849-then
// (|0-folded mattk scan), js/dog.js:164-then, js/wizard.js:65-then
// (raw-=== scans) and the js/eat.js:388-then fordmg wrapper. Rewired
// sites: artifact.c:1342 Mb_hit cancel, dog.c:210 tamedog + dog.c:1277
// tamedog-quiet, wizard.c:650/:674 nasty, eat.c:1311 eye-of-newt.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const CLONE_FILES = ['artifact.js', 'dog.js', 'wizard.js', 'eat.js'];
// Out-of-cluster clones with their own queued rows; shrink this list.
const KNOWN_REMAINING = ['engrave.js', 'makemon.js', 'muse.js', 'polyself.js', 'trap.js'];

function jsSrc(f) {
    return readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
}

describe('attacktype live export + 4-file rewire', () => {
    it('no local clone remains; each file imports the live export', () => {
        for (const f of CLONE_FILES) {
            const src = jsSrc(f);
            assert.ok(!src.match(/^function attacktype\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/attacktype[\s\S]{0,80}?from '\.\/mondata\.js'/),
                `js/${f} must import attacktype from mondata.js`);
        }
        assert.ok(jsSrc('mondata.js').match(/^export function attacktype\(/m),
            'live export missing in js/mondata.js');
    });

    it('every rewired site still calls the live export (C-cited)', () => {
        assert.ok(jsSrc('artifact.js').match(/\/\/ C artifact\.c:1342/),
            'C-cite comment missing at the artifact.js site');
        assert.ok(jsSrc('dog.js').match(/\/\/ C dog\.c:210/)
            && jsSrc('dog.js').match(/\/\/ C dog\.c:1277/),
            'C-cite comments missing at the dog.js sites');
        assert.ok(jsSrc('wizard.js').match(/\/\/ C wizard\.c:650/)
            && jsSrc('wizard.js').match(/\/\/ C wizard\.c:674/),
            'C-cite comments missing at the wizard.js sites');
        assert.ok(jsSrc('eat.js').match(/\/\/ C eat\.c:1311/),
            'C-cite comment missing at the eat.js site');
        for (const f of CLONE_FILES) {
            assert.ok(jsSrc(f).match(/[^_]attacktype\(/),
                `attacktype call missing in js/${f}`);
        }
    });

    it('census: canonical export plus only the known remaining clones', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function attacktype\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/mondata.js',
            ...KNOWN_REMAINING.map((f) => `js/${f}`)].sort());
    });
});
