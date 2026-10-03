// `invent.c` useupf zap.js clone removal: the local clone
// (js/zap.js:879-then, split+delobj subset without the at_u/hideunder
// arms) is deleted for the live export (js/invent.js:4869, C
// `:4762–4783` minus the async shop-bill arms). C `zap.c:4636`
// `useupf(obj, delquan)` in burn_floor_objects is the sole rewired site.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

describe('useupf clone census (zap rewire)', () => {
    it('no local useupf remains in zap.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/zap.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function useupf\(/m),
            'local clone still defined in js/zap.js');
        assert.ok(src.match(/useupf,\n    inventory_resistance_check,\n\} from '\.\/invent\.js'/),
            'js/zap.js must import useupf from invent.js');
    });

    it('burn_floor_objects still calls useupf(obj, delquan) (C zap.c:4636)', () => {
        const src = readFileSync(new URL('../js/zap.js', import.meta.url), 'utf8');
        assert.ok(src.match(/\/\/ C zap\.c:4636 useupf\(obj, delquan\)/),
            'C-cite comment missing at the burn_floor_objects site');
        assert.ok(src.match(/^\s*useupf\(obj, delquan\);/m),
            'useupf(obj, delquan) call missing in js/zap.js');
    });

    it('census: only the canonical export defines useupf', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function useupf\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/invent.js']);
    });
});
