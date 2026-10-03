// `stairs.c` On_stairs dogmove.js + apply.js clone removal: the local
// clones (js/dogmove.js same-named `On_stairs`, 1 site in the dog-apport
// arm; js/apply.js `On_stairs_apply`, 2 sites in use_bell() and
// use_candelabrum()) are deleted for the live export
// (js/hack.js:3409, C `:148–151` stairway_at != NULL game.stairs walk).
// The dogmove→const STAIRS edge served only the deleted clone body, so it
// is dropped; the apply→mklev stairway_at edge stays (use_trap arm).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

describe('On_stairs clone census (dogmove + apply rewire)', () => {
    it('no local clones remain; both modules resolve the live export', () => {
        const dg = readFileSync(new URL('../js/dogmove.js', import.meta.url), 'utf8');
        const ap = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(!dg.match(/^function On_stairs\(/m),
            'local clone still defined in js/dogmove.js');
        assert.ok(!ap.match(/^function On_stairs_apply\(/m),
            'local clone still defined in js/apply.js');
        assert.ok(dg.match(/stop_occupation, On_stairs \} from '\.\/hack\.js';/),
            'js/dogmove.js must import On_stairs from hack.js');
        assert.ok(ap.match(/invocation_pos, On_stairs \} from '\.\/hack\.js';/),
            'js/apply.js must import On_stairs from hack.js');
    });

    it('dogmove apport arm calls the live export (C dogmove.c:583)', () => {
        const src = readFileSync(new URL('../js/dogmove.js', import.meta.url), 'utf8');
        assert.ok(src.match(/if \(On_stairs\(game\.u\.ux, game\.u\.uy\)\) \{/),
            'dog-apport call missing in js/dogmove.js');
    });

    it('apply sites call the live export (C apply.c:1210 use_bell, :1361 candelabrum)', () => {
        const src = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(src.match(/&& !On_stairs\(u\.ux, u\.uy\);/),
            'use_bell call missing in js/apply.js');
        assert.ok(src.match(/\|\| On_stairs\(u\.ux \| 0, u\.uy \| 0\)\) \{/),
            'use_candelabrum call missing in js/apply.js');
    });

    it('dogmove drops STAIRS; apply keeps its stairway_at edge', () => {
        const dg = readFileSync(new URL('../js/dogmove.js', import.meta.url), 'utf8');
        const ap = readFileSync(new URL('../js/apply.js', import.meta.url), 'utf8');
        assert.ok(!dg.match(/ROOM, STAIRS,/),
            'stale STAIRS in the const.js import of js/dogmove.js (served only the deleted clone)');
        assert.ok(!dg.match(/loc\.typ === STAIRS/),
            'clone typ-scan remnant in js/dogmove.js (the IS_ROOM doc comment may still name STAIRS)');
        assert.ok(ap.match(/import \{ stairway_at, morguemon \} from '\.\/mklev\.js';/),
            'js/apply.js must keep stairway_at in its mklev.js import');
        assert.ok(ap.match(/else if \(stairway_at\(ux, uy\)\) \{/),
            'use_trap stairway_at arm missing in js/apply.js');
    });

    it('census: only the canonical export defines On_stairs', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function On_stairs\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/hack.js']);
    });
});
