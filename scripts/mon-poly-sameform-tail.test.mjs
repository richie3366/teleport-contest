import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// C ref: mhitm.c mon_poly tail — `if (mdef->data != oldform && ...)` over
// canonical mons[] pointers, so an unchanged form is the identical pointer
// and no rnd(2) burns for mspec_used. JS mons() builds a fresh object per
// call, and set_uasmon/newcham reinstall data even when the form index is
// unchanged (same-form polyself: 335→335 with a new object), so a JS
// reference comparison fires spuriously, drawing rnd(2) where C draws
// nothing (corpus: scen-sweep-Knight-95317 step 256 + scen-worldtour-Wizard
// 95233 step 275, C rn2(3)@mhitm_knockback vs JS rnd(2)@mon_poly, one-draw
// shift cascading for thousands of draws). Fix: compare the stored form
// index — the zap.js lightdamage / pm_to_cham mndx idiom.
//
// Behavioral proof (maintained): both probe sessions are full PASS once the
// spurious draw is gone (`verify mhitm_knockback: 2 PASS`). Driving a
// same-form polyself in a unit harness needs full-game state (newman form
// selection + u/level/invent state), disproportionate for the comparison;
// the corpus sessions carry the behavioral regression, and this file pins
// the comparison idiom in source so a "simplification" back to reference
// comparison fails fast.

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'js', 'mhitm.js');

function fnBody(src, name) {
    const m = src.match(new RegExp(`^(?:export\\s+)?(?:async\\s+)?function ${name}\\(`, 'm'));
    assert.ok(m && m.index !== undefined, `${name} def missing in js/mhitm.js`);
    const rest = src.slice(m.index + m[0].length);
    const next = rest.search(/^(?:export\s+)?(?:async\s+)?function [A-Za-z_0-9]+\(/m);
    assert.ok(next > 0, `next def must follow ${name} in js/mhitm.js`);
    return rest.slice(0, next);
}

describe('mon_poly tail compares form index, not object identity (mhitm.c)', () => {
    it('captures the entry form index (oldMndx)', () => {
        const body = fnBody(readFileSync(SRC, 'utf8'), 'mon_poly');
        assert.ok(
            body.includes('const oldMndx = oldform?.mndx ?? mdef?.mnum ?? NON_PM;'),
            'entry must capture oldMndx with the mnum fallback',
        );
    });

    it('gates mspec_used rnd(2) on newMndx !== oldMndx', () => {
        const body = fnBody(readFileSync(SRC, 'utf8'), 'mon_poly');
        assert.ok(
            body.includes('const newMndx = mdef?.data?.mndx ?? mdef?.mnum ?? NON_PM;'),
            'tail must read the current form index with the mnum fallback',
        );
        assert.ok(
            body.includes('if (newMndx !== oldMndx && magr && !is_youmonst(magr)) {'),
            'tail must gate on form-index change, magr non-null non-hero',
        );
    });

    it('no permonst reference comparison remains in the tail', () => {
        const body = fnBody(readFileSync(SRC, 'utf8'), 'mon_poly');
        assert.ok(
            !body.includes('data !== oldform'),
            'reference compare is wrong: mons() is a fresh object per call',
        );
    });
});
