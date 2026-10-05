// `allmain.c` regen_hp Upolyd mh<1 arm: C allmain.c:632-634 calls
// rehumanize() ("shouldn't happen" guard); the JS port left an empty
// if-branch ("rehumanize deferred"). regen_hp is module-local (C
// staticfn), so this test pins the wiring statically: the live export
// must exist and allmain.js must import and await it in that arm.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rehumanize } from '../js/polyself.js';

const src = readFileSync(new URL('../js/allmain.js', import.meta.url), 'utf8');

describe('regen_hp mh<1 rehumanize arm (allmain.c:632-634)', () => {
    it('live rehumanize export exists (async, no-arg)', () => {
        assert.equal(typeof rehumanize, 'function');
        assert.equal(rehumanize.constructor.name, 'AsyncFunction');
        assert.equal(rehumanize.length, 0);
    });

    it('allmain.js imports rehumanize from polyself.js (edge exists, D-2349 safe)', () => {
        assert.ok(
            src.match(/import \{[^}]*\brehumanize\b[^}]*\} from '\.\/polyself\.js'/),
            'js/allmain.js must import rehumanize from ./polyself.js',
        );
    });

    it('mh<1 arm awaits rehumanize() instead of the deferred stub', () => {
        const body = src.slice(src.indexOf('async function regen_hp('));
        assert.ok(body.length > 0, 'regen_hp body not found');
        assert.ok(!body.match(/rehumanize deferred/),
            'deferred stub still present in regen_hp');
        assert.ok(body.match(/if \(\(u\.mh \|\| 0\) < 1\) \{[^}]*?await rehumanize\(\);/),
            'mh<1 arm must be `await rehumanize();` (C :632-634)');
    });
});
