// `worn.c` bypass_obj (`:1118–1123`) + which_armor (`:1006–1036`)
// live-export rewire (D-3449, resists-blnd-rewire precedent): the
// canonical exports are js/worn.js:714 + js/worn.js:472; the deleted
// clones are the js/zap.js:3060-then bypass_obj clone (dead null guard
// vs C NONNULLARG1) and the js/sit.js:214-then which_armor clone
// (minvent-array iteration vs C nobj-chain scan + youmonst slot
// table). Rewired sites: zap.c:285 polyspot nobj loop + zap.c:2065
// stone-to-flesh cobj loop (bypass_obj); sit.c:624 usteed saddle
// (which_armor).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Out-of-cluster clones with their own queued rows; shrink this list.
const KNOWN_REMAINING_ARMOR = ['js/trap.js'];
const KNOWN_REMAINING_WRAPPERS = ['js/mklev.js', 'js/steed.js', 'js/weapon.js'];

function jsSrc(f) {
    return readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
}

function importsFrom(src, name, mod) {
    return new RegExp(`import \\{[^}]*${name}[^}]*\\} from '\\./${mod}\\.js'`)
        .test(src);
}

describe('worn live exports + zap/sit rewire', () => {
    it('no bypass_obj clone remains; zap imports the live export', () => {
        const src = jsSrc('zap.js');
        assert.ok(!src.match(/^function bypass_obj\(/m),
            'local clone still defined in js/zap.js');
        assert.ok(importsFrom(src, 'bypass_obj', 'worn'),
            'js/zap.js must import bypass_obj from worn.js');
        assert.ok(jsSrc('worn.js').match(/^export function bypass_obj\(/m),
            'live export missing in js/worn.js');
    });

    it('no which_armor clone remains in sit; sit imports the live export', () => {
        const src = jsSrc('sit.js');
        assert.ok(!src.match(/^function which_armor\(/m),
            'local clone still defined in js/sit.js');
        assert.ok(importsFrom(src, 'which_armor', 'worn'),
            'js/sit.js must import which_armor from worn.js');
        assert.ok(jsSrc('worn.js').match(/^export function which_armor\(/m),
            'live export missing in js/worn.js');
    });

    it('census: canonical exports plus only the known remaining clones', () => {
        const dir = new URL('../js/', import.meta.url);
        const bypassDefs = [];
        const armorDefs = [];
        const wrapperDefs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function bypass_obj\(/m)) bypassDefs.push(`js/${f}`);
            if (src.match(/^(export )?function which_armor\(/m)) armorDefs.push(`js/${f}`);
            if (src.match(/^function which_armor_(magr|saddle|local)\(/m)) wrapperDefs.push(`js/${f}`);
        }
        assert.deepEqual(bypassDefs.sort(), ['js/worn.js']);
        assert.deepEqual(armorDefs.sort(), ['js/trap.js', 'js/worn.js'].sort());
        assert.deepEqual(wrapperDefs.sort(), KNOWN_REMAINING_WRAPPERS.sort());
        assert.deepEqual(
            armorDefs.filter((d) => d !== 'js/worn.js').sort(),
            KNOWN_REMAINING_ARMOR.sort());
    });
});
