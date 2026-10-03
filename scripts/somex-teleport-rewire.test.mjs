// `mkroom.c` somex teleport.js clone removal: the local clone
// (js/teleport.js:939-then, `|0`-coerced rn1) is deleted for the live
// export (js/mklev.js:32977, `rn1(hx-lx+1, lx)`). C `mkroom.c:666–669`
// is `rn1(croom->hx - croom->lx + 1, croom->lx)`; both JS bodies are
// that formula, so the rewire is behavior-identical at the two
// teleport-somexy sites. The js/dog.js:876 clone stays for its own row.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { somex } from '../js/mklev.js';
import { initRng } from '../js/rng.js';

describe('live somex matches C mkroom.c:666-669', () => {
    it('returns within [lx, hx] over repeated draws', () => {
        initRng(3335);
        const croom = { lx: 2, hx: 5 };
        for (let i = 0; i < 50; i++) {
            const x = somex(croom);
            assert.ok(Number.isInteger(x), `somex must return an int, got ${x}`);
            assert.ok(x >= 2 && x <= 5, `somex out of range: ${x}`);
        }
    });

    it('degenerate room (lx == hx) returns lx', () => {
        initRng(3336);
        assert.equal(somex({ lx: 7, hx: 7 }), 7);
    });
});

describe('somex clone census (teleport rewire)', () => {
    it('no local somex remains in teleport.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/teleport.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function somex\(/m),
            'local clone still defined in js/teleport.js');
        assert.ok(src.match(/\{\s*somex\s*\} from '\.\/mklev\.js'/),
            'js/teleport.js must import somex from mklev.js');
    });

    it('census: only the canonical export and the dog.js row define somex', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function somex\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/dog.js', 'js/mklev.js']);
    });
});
