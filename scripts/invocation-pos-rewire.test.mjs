// `hack.c` invocation_pos mklev.js + apply.js clone removal: the local
// clones (js/mklev.js `invocation_pos_mk`, 1 site in occupied();
// js/apply.js `invocation_pos_apply`, 2 sites in use_bell() and
// use_candelabrum()) are deleted for the live export
// (js/hack.js:3434, C `:982–986` Invocation_lev && (x,y)==svi.inv_pos).
// Evolved from the D-3349 Invocation_lev rewire test: the apply→dungeon
// edge D-3349 added served only the deleted apply clone body, so it is
// dropped; the mklev→dungeon edge stays (makemaz + hellfill sites).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

describe('invocation_pos clone census (mklev + apply rewire)', () => {
    it('no local clones remain; both modules resolve the live export', () => {
        const mk = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const ap = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(!mk.match(/^function invocation_pos_mk\(/m),
            'local clone still defined in js/mklev.js');
        assert.ok(!ap.match(/^function invocation_pos_apply\(/m),
            'local clone still defined in js/apply.js');
        assert.ok(mk.match(/in_rooms, invocation_pos \} from '\.\/hack\.js';/),
            'js/mklev.js must import invocation_pos from hack.js');
        assert.ok(ap.match(/check_capacity, invocation_pos \} from '\.\/hack\.js';/),
            'js/apply.js must import invocation_pos from hack.js');
    });

    it('mklev occupied() site calls the live export (C mklev.c:1810)', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        assert.ok(src.match(/\|\| invocation_pos\(x, y\)\);/),
            'occupied() call missing in js/mklev.js');
    });

    it('apply sites call the live export (C apply.c:1209 use_bell, :1361 candelabrum)', () => {
        const src = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(src.match(/&& invocation_pos\(u\.ux, u\.uy\)/),
            'use_bell call missing in js/apply.js');
        assert.ok(src.match(/if \(!invocation_pos\(u\.ux \| 0, u\.uy \| 0\)/),
            'use_candelabrum call missing in js/apply.js');
    });

    it('apply no longer imports Invocation_lev; mklev keeps its edge', () => {
        const ap = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        const mk = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        assert.ok(!ap.match(/Invocation_lev/),
            'stale Invocation_lev reference in js/apply.js (served only the deleted clone)');
        assert.ok(mk.match(/Is_branchlev, Invocation_lev,/),
            'js/mklev.js must keep Invocation_lev in its dungeon.js import');
        assert.ok(mk.match(/if \(Invocation_lev\(g\.u\?\.uz\)\)/),
            'load_hellfill VS/stair call missing in js/mklev.js');
    });

    it('census: only the canonical exports define invocation_pos / Invocation_lev', () => {
        const dir = new URL('../js/', import.meta.url);
        const defsPos = [];
        const defsLev = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function invocation_pos\(/m)) defsPos.push(`js/${f}`);
            if (src.match(/^(export )?function Invocation_lev\(/m)) defsLev.push(`js/${f}`);
        }
        assert.deepEqual(defsPos.sort(), ['js/hack.js']);
        assert.deepEqual(defsLev.sort(), ['js/dungeon.js']);
    });
});
