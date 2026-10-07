import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { initRng, rn2, rn2_on_display_rng, reseed_random } from '../js/rng.js';

// C refs: mklev.c mklev `:1577–1593` (reseed pairs `:1579–1580` / `:1591–1592`)
// + rnd.c reseed_random `:289–294` (live `:293` guard over has_strong_rngseed;
// arm names init_random ← sys_random_seed: OS entropy, no scored analogue).
//
// The scored deterministic build never sets has_strong_rngseed (decl.c:84
// FALSE; sole C setter is the DEV_RANDOM fopen arm in sys/unix unixmain.c:824;
// the recorder leaves it FALSE under NETHACK_SEED), so the four mklev call
// sites must run without consuming either RNG stream.
function drawBoth(n) {
    const core = [], disp = [];
    for (let i = 0; i < n; i++) core.push(rn2(100));
    for (let i = 0; i < n; i++) disp.push(rn2_on_display_rng(100));
    return { core, disp };
}

describe('mklev reseed guards (rnd.c:289-294; mklev.c:1579-1580/1591-1592)', () => {
    beforeEach(() => {
        resetGame();
        delete game.has_strong_rngseed;
        initRng(1234);
    });
    afterEach(() => {
        delete game.has_strong_rngseed;
    });

    it('reseed_random consumes no RNG on either stream when the flag is unset', () => {
        const plain = drawBoth(20);
        initRng(1234);
        reseed_random(rn2);
        reseed_random(rn2_on_display_rng);
        reseed_random(rn2);
        reseed_random(rn2_on_display_rng);
        assert.deepEqual(drawBoth(20), plain);
    });

    it('flag-set arm is a safe named omit: no throw, no RNG consumed', () => {
        game.has_strong_rngseed = true;
        const plain = drawBoth(20);
        initRng(1234);
        game.has_strong_rngseed = true;
        assert.doesNotThrow(() => reseed_random(rn2));
        assert.doesNotThrow(() => reseed_random(rn2_on_display_rng));
        assert.deepEqual(drawBoth(20), plain);
    });

    it('mklev wires the four reseed calls in C order', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const mklevBody = src.match(/export async function mklev\(\) \{([\s\S]*?)\n\}/)[1];
        const order = [
            'reseed_random(rn2); // C :1579',
            'reseed_random(rn2_on_display_rng); // C :1580',
            'init_mapseen(',
            'if (await getbones()) return; // C :1583–1584',
            'g.in_mklev = true; // C :1586',
            'await makelevel(); // C :1587',
            'level_finalize_topology(); // C :1589',
            'reseed_random(rn2); // C :1591',
            'reseed_random(rn2_on_display_rng); // C :1592',
        ];
        let at = -1;
        for (const pin of order) {
            const next = mklevBody.indexOf(pin, at + 1);
            assert.ok(next > at, `mklev body must carry ${pin} in C order`);
            at = next;
        }
    });

    it('goto_level reload arm wires the do.c:1709-1710 pair before getlev', () => {
        const src = readFileSync(new URL('../js/do.js', import.meta.url), 'utf8');
        const gate = src.indexOf("await pline('Cannot continue this game.');");
        const r1 = src.indexOf('reseed_random(rn2); // C do.c:1709');
        const r2 = src.indexOf('reseed_random(rn2_on_display_rng); // C do.c:1710');
        const getlev = src.indexOf('// C: getlev — restore in-memory stash', gate);
        assert.ok(gate > 0 && r1 > gate && r2 > r1 && getlev > r2,
            'do.c:1709-1710 pair must sit between the tricked gate and getlev');
    });
});
