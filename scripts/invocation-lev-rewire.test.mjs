// `dungeon.c` Invocation_lev mklev.js + apply.js clone removal: the local
// clones (js/mklev.js `Invocation_lev_mk`, 2 sites; js/apply.js
// `Invocation_lev_apply` with a `lev || game.u?.uz` defaulting arm, sole
// site a no-arg call) are deleted for the live export
// (js/dungeon.js:2392, C `:2017–2021` In_hell && deepest-1).
// mklev sites: invocation_pos_mk + load_hellfill VS/stair gate;
// apply site: invocation_pos_apply (C hack.c invocation_pos).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

describe('Invocation_lev clone census (mklev + apply rewire)', () => {
    it('no local clones remain; both modules resolve the live export', () => {
        const mk = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const ap = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(!mk.match(/^function Invocation_lev_mk\(/m),
            'local clone still defined in js/mklev.js');
        assert.ok(!ap.match(/^function Invocation_lev_apply\(/m),
            'local clone still defined in js/apply.js');
        assert.ok(mk.match(/^[ \t]+on_level, init_dungeons, Is_special, Is_branchlev, Invocation_lev,/m),
            'js/mklev.js must keep Invocation_lev in its dungeon.js import');
        assert.ok(ap.match(/import \{ Invocation_lev \} from '\.\/dungeon\.js';/),
            'js/apply.js must import Invocation_lev from dungeon.js');
    });

    it('mklev sites call Invocation_lev (invocation_pos_mk + hellfill VS/stair)', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        assert.ok(src.match(/if \(!Invocation_lev\(game\.u\?\.uz\)\) return false;/),
            'invocation_pos_mk call missing in js/mklev.js');
        assert.ok(src.match(/if \(Invocation_lev\(g\.u\?\.uz\)\)/),
            'load_hellfill VS/stair call missing in js/mklev.js');
    });

    it('apply site calls Invocation_lev(game.u?.uz) (C hack.c invocation_pos)', () => {
        const src = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(src.match(/C hack\.c invocation_pos — Invocation_lev/),
            'C-cite comment missing at the invocation_pos_apply site');
        assert.ok(src.match(/if \(!Invocation_lev\(game\.u\?\.uz\)\) return false;/),
            'invocation_pos_apply call missing in js/apply.js');
    });

    it('census: only the canonical export defines Invocation_lev', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function Invocation_lev\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/dungeon.js']);
    });
});
