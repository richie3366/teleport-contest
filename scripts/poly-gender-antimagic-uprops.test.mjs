import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// C ref: polyself.c poly_gender — `if (is_neuter(youmonst.data) ||
// !humanoid(youmonst.data)) return 2;` A local clone in js/mhitm.js
// returned flags.female unconditionally, so a hero polymorphed into a
// non-humanoid (acid blob) read as gender 0/1 instead of 2 (neuter) and
// could_seduce() returned 1 where C returns 0/2 — JS ran full doseduce
// where C skipped to mhitm_knockback (corpus: scen-sweep-Rogue-578129
// step 263, C rn2(3)@knockback vs JS rn2(35)@doseduse). Fix: use the
// whole exported polyself.js poly_gender (import the export, D-1849).
//
// C ref: youprop.h Antimagic/Unchanging — H || E ≡ uprops[].intrinsic
// || .extrinsic. confer_oc_oprop writes worn oprop gear (cloak of MR,
// gray DSM, amulet of unchanging) only to uprops; the EAntimagic /
// EUnchanging flats are never written anywhere in js/. The mhitm.js
// locals read flats only, so a cloak-of-MR hero missed the mon_poly
// Antimagic arm and polyselfed (corpus: scen-worldtour-Wizard-578319
// step 181, C rn2(3)@knockback vs JS rn2(20)@polyself system shock).
// Fix: OR the live uprops slot (sit.js D-1089 / mhitu.js D-3846 idiom).
//
// Behavioral proof (maintained): both probe sessions move under
// `verify mhitm_knockback`. Driving the mid-game states (poly'd hero
// adjacent to a foocubus; cloak-MR hero hit by AD_POLY) needs a
// full-game harness, disproportionate here; the corpus sessions carry
// the behavioral regression, and this file pins the idioms in source
// so a "simplification" fails fast.

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const MHITM = path.join(ROOT, 'js', 'mhitm.js');
const POLYSELF = path.join(ROOT, 'js', 'polyself.js');

function fnBody(src, name) {
    const m = src.match(new RegExp(`^(?:export\\s+)?(?:async\\s+)?function ${name}\\(`, 'm'));
    assert.ok(m && m.index !== undefined, `${name} def missing`);
    const rest = src.slice(m.index + m[0].length);
    const next = rest.search(/^(?:export\s+)?(?:async\s+)?function [A-Za-z_0-9]+\(/m);
    assert.ok(next > 0, `next def must follow ${name}`);
    return rest.slice(0, next);
}

describe('poly_gender: mhitm.js uses the whole export (C polyself.c)', () => {
    it('imports poly_gender from polyself.js (no local clone)', () => {
        const src = readFileSync(MHITM, 'utf8');
        assert.ok(
            /^import \{[^}]*\bpoly_gender\b[^}]*\} from '\.\/polyself\.js';/m.test(src),
            'mhitm.js must import poly_gender from polyself.js',
        );
        assert.ok(
            !/^function poly_gender\(/m.test(src),
            'local thin clone must stay deleted (it omitted the neuter arm)',
        );
    });

    it('the export keeps the is_neuter/non-humanoid → 2 arm', () => {
        const body = fnBody(readFileSync(POLYSELF, 'utf8'), 'poly_gender');
        assert.ok(
            body.includes('if (is_neuter(ptr) || !humanoid(ptr)) return 2;'),
            'export must return 2 for neuter/non-humanoid poly forms',
        );
    });
});

describe('Antimagic/Unchanging: mhitm.js ORs the live uprops slot (C youprop.h)', () => {
    it('Antimagic reads uprops[ANTIMAGIC]', () => {
        const body = fnBody(readFileSync(MHITM, 'utf8'), 'Antimagic');
        assert.ok(
            body.includes('u.uprops?.[ANTIMAGIC]'),
            'Antimagic must OR the uprops slot (confer_oc_oprop never writes the flat)',
        );
    });

    it('Unchanging reads uprops[UNCHANGING]', () => {
        const body = fnBody(readFileSync(MHITM, 'utf8'), 'Unchanging');
        assert.ok(
            body.includes('u.uprops?.[UNCHANGING]'),
            'Unchanging must OR the uprops slot (amulet confers via uprops only)',
        );
    });
});
