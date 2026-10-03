// `mon.c` m_in_air canonical export + do/teleport/trap.js rewire: the four
// local clones (js/do.js:560-then flyer/floater subset, js/mon.js:2299-then
// ceiling-gateless, js/teleport.js:209-then flyer/floater subset,
// js/trap.js:1157-then full-body duplicate) are deleted for the canonical
// export (js/mon.js:2300, C `:2130–2136`). All 12 C call sites stay wired.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const js = (f) => readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');

describe('m_in_air clone census (do/teleport/trap rewire)', () => {
    it('no local m_in_air remains outside mon.js; all import the live export', () => {
        for (const f of ['do.js', 'teleport.js', 'trap.js']) {
            const src = js(f);
            assert.ok(!src.match(/^function m_in_air\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/m_in_air \} from '\.\/mon\.js';/),
                `js/${f} must import m_in_air from mon.js`);
        }
    });

    it('canonical export carries the full C body incl the ceiling gate', () => {
        const src = js('mon.js');
        assert.ok(src.match(/^export function m_in_air\(mtmp\) \{/m),
            'canonical export missing in js/mon.js');
        assert.ok(src.match(/is_clinger\(ptr\) && has_ceiling\(game\.u\?\.uz\) && mtmp\.mundetected/),
            'clinger+ceiling+mundetected arm missing (C mon.c:2133-2135)');
    });

    it('all 12 call sites stay wired (1 do + 4 mon + 2 teleport + 5 trap)', () => {
        // mon.js counts the export def + 4 calls; the others count calls only
        // (their mon.js import lines carry no paren).
        const want = { 'do.js': 1, 'mon.js': 5, 'teleport.js': 2, 'trap.js': 5 };
        for (const [f, n] of Object.entries(want)) {
            const hits = (js(f).match(/m_in_air\(/g) || []).length;
            assert.equal(hits, n, `js/${f}: want ${n} m_in_air( hits, got ${hits}`);
        }
    });

    it('census: only the canonical export defines m_in_air', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function m_in_air\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/mon.js']);
    });
});
