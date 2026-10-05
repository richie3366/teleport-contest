// C ref: do_name.c oname :403–404 calls untwoweapon() (wield.c:905–914:
// You("can no longer...") + set_twoweap(FALSE) + update_inventory())
// when the newly artifactized obj is the wielded secondary. JS oname
// stays sync (18 callers incl. sync level-gen) and inlines
// set_twoweap+update_inventory; the You() it cannot await is emitted by
// the two async callers that can pass uswapwep — do_oname (do_name.c:367,
// C prints nothing after) and dipfountain (fountain.c:431, before
// discover_artifact :433) — through wield.js's shared string, gated on
// the twoweap flip C's arm performs. Every other oname caller passes a
// fresh mksobj/split, monster gear, level-def/mail/wish loot, or uwep
// (caller census in the D-entry).
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { game } from '../js/gstate.js';
import { oname } from '../js/do_name.js';
import { artifacts_globals_init } from '../js/artifact.js';
import { objectNames } from '../js/objects.js';
import { can_no_longer_twoweap } from '../js/wield.js';
import { ONAME_KNOW_ARTI } from '../js/const.js';

const ELVEN_DAGGER = objectNames.indexOf('ELVEN_DAGGER');
const MSG = 'await pline(`You ${can_no_longer_twoweap}.`);';

describe('oname untwoweapon arm', () => {
    let saveU, saveArtiexist, saveArtidisco;
    beforeEach(() => {
        saveU = game.u;
        saveArtiexist = game.artiexist;
        saveArtidisco = game.artidisco;
        artifacts_globals_init();
    });
    afterEach(() => {
        game.u = saveU;
        game.artiexist = saveArtiexist;
        game.artidisco = saveArtidisco;
    });

    function stage(twoweap, wielded) {
        const obj = { otyp: ELVEN_DAGGER, oartifact: 0, quan: 1, spe: 0, age: 0 };
        game.u = { twoweap, uswapwep: wielded ? obj : null, uwep: null };
        return obj;
    }

    it('naming the wielded secondary an artifact name clears twoweap (C :403–404)', () => {
        const obj = stage(true, true);
        oname(obj, 'Sting', ONAME_KNOW_ARTI);
        assert.ok(obj.oartifact, 'Sting must be created');
        assert.equal(game.u.twoweap, false);
    });

    it('no flip when twoweap is off (C untwoweapon internal gate)', () => {
        const obj = stage(false, true);
        oname(obj, 'Sting', ONAME_KNOW_ARTI);
        assert.ok(obj.oartifact);
        assert.equal(game.u.twoweap, false);
    });

    it('no flip when naming a non-secondary object', () => {
        const obj = stage(true, false);
        oname(obj, 'Sting', ONAME_KNOW_ARTI);
        assert.ok(obj.oartifact);
        assert.equal(game.u.twoweap, true);
    });

    it('shared message string is the exact C text (drift guard)', () => {
        assert.equal(can_no_longer_twoweap, 'can no longer wield two weapons at once');
    });

    it('untwoweapon and both callers emit the shared string in C order', () => {
        const wield = readFileSync(new URL('../js/wield.js', import.meta.url), 'utf8');
        assert.ok(wield.includes('export const can_no_longer_twoweap = '), 'string exported');
        assert.ok(wield.includes(MSG), 'untwoweapon uses the shared string');
        for (const [file, fn, call, after] of [
            ['../js/do_name.js', 'async function do_oname(', 'oname(obj, buf, ONAME_VIA_NAMING | ONAME_KNOW_ARTI);', null],
            ['../js/fountain.js', 'export async function dipfountain(', 'obj = oname(', 'discover_artifact(ART_EXCALIBUR)'],
        ]) {
            const src = readFileSync(new URL(file, import.meta.url), 'utf8');
            const body = src.slice(src.indexOf(fn));
            assert.ok(body.includes('was_twoweap'), `${file}: twoweap snapshot present`);
            assert.ok(body.indexOf('was_twoweap') < body.indexOf(call),
                `${file}: snapshot before oname()`);
            const msgAt = body.indexOf(MSG);
            assert.ok(msgAt > body.indexOf(call), `${file}: message after oname()`);
            if (after) {
                assert.ok(msgAt < body.indexOf(after), `${file}: message before ${after} (C order)`);
            }
        }
    });
});
