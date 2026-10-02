// `do_name.c` a_monnam clone removals: trap.js (:247) and hack.js (:300)
// local clones are deleted for the live export (js/do_name.js:1221).
// C `do_name.c:1151–1156` is x_monnam(ARTICLE_A, SUPPRESS_SADDLE when
// named): an/a selection via just_an, hallu/invisible arms, saddle
// suppression for named monsters. The trap clone prefixed naive `a `
// (wrong before vowels); the hack clone derived the name from the
// internal PM_ tag. Spotted fixtures see Detect_monsters so
// canspotmon holds without a vision grid.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { a_monnam } from '../js/do_name.js';
import { W_SADDLE } from '../js/const.js';
import { initRng } from '../js/rng.js';

function spotted(name, extra = {}) {
    game.u = { ux: 5, uy: 5, HDetect_monsters: 1 };
    return {
        mx: 6, my: 5, mhp: 4,
        data: { name },
        ...extra,
    };
}

describe('live a_monnam ARTICLE_A (do_name.c:1151-1156)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3322);
    });

    it('vowel-initial name takes "an" (trap clone gave "a eel")', { timeout: 5000 }, () => {
        assert.equal(a_monnam(spotted('eel')), 'an eel');
    });

    it('consonant-initial name takes "a"', { timeout: 5000 }, () => {
        assert.equal(a_monnam(spotted('sewer rat')), 'a sewer rat');
    });

    it('named + saddled suppresses the saddle (SUPPRESS_SADDLE)', { timeout: 5000 }, () => {
        const s = a_monnam(spotted('pony', {
            mextra: { mgivenname: 'Silver' },
            misc_worn_check: W_SADDLE,
        }));
        assert.equal(s, 'Silver');
    });
});

describe('a_monnam clone census (trap/hack rewires)', () => {
    it('no local a_monnam remains in trap.js or hack.js', () => {
        for (const f of ['trap.js', 'hack.js']) {
            const src = readFileSync(new URL(`../js/${f}`, import.meta.url), 'utf8');
            assert.ok(!src.match(/^function a_monnam\(/m),
                `local clone still defined in js/${f}`);
            assert.ok(src.match(/a_monnam[^}]*from '\.\/do_name\.js'/) || src.match(/from '\.\/do_name\.js'/),
                `js/${f} must import from do_name.js`);
        }
    });

    it('census: only the canonical export + the known music.js clone define a_monnam', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function a_monnam\(/m)) defs.push(`js/${f}`);
        }
        // js/music.js:266 is the third clone (C music.c:124 site) — not
        // queued this iteration; its rewire updates this census.
        assert.deepEqual(defs.sort(), ['js/do_name.js', 'js/music.js']);
    });
});
