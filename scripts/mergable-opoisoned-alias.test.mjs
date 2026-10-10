import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { init_objects } from '../js/o_init.js';
import { objectNames, WEAPON_CLASS } from '../js/objects.js';
import { mergable } from '../js/mkobj.js';

// C ref: invent.c mergable + include/obj.h:139
// `#define opoisoned otrapped` — one bit, read as poison on weapons and
// as trap on containers. C's otrapped gate therefore splits a poisoned
// stack from a plain one of the same otyp. JS tracks the two meanings
// as separate fields; the gate must compare both (scen-trek-Samurai-95502
// step 607: C «a poisoned dart / 7 darts» vs JS «8 poisoned darts» after
// a dart-trap miss stacked a poisoned dart onto the plain pile).
const DART = objectNames.indexOf('DART');

function dart(over = {}) {
    return {
        otyp: DART, oclass: WEAPON_CLASS, quan: 1, spe: 0,
        cursed: 0, blessed: 0, unpaid: 0, no_charge: 0, obroken: 0,
        otrapped: 0, lamplit: 0, dknown: 1, bknown: 0, known: 0,
        rknown: 0, oeroded: 0, oeroded2: 0, greased: 0, oerodeproof: 0,
        opoisoned: 0, how_lost: 0, nomerge: 0, globby: 0,
        oartifact: 0, corpsenm: -1, timed: 0, age: 0,
        ...over,
    };
}

describe('mergable opoisoned/otrapped alias (obj.h:139)', () => {
    let saved;
    beforeEach(() => {
        saved = { u: game.u, objects: game.objects };
        initRng(607);
        if (!game.objects) init_objects();
        game.u = { ux: 5, uy: 5 };
    });
    afterEach(() => {
        game.u = saved.u;
        game.objects = saved.objects;
    });

    it('poisoned dart vs plain dart does not merge (C splits)', () => {
        assert.equal(mergable(dart({ opoisoned: 1 }), dart({ quan: 7 })), false);
        assert.equal(mergable(dart({ quan: 7 }), dart({ opoisoned: 1 })), false);
    });

    it('plain vs plain merges (control)', () => {
        assert.equal(mergable(dart(), dart({ quan: 7 })), true);
    });

    it('poisoned vs poisoned merges (control)', () => {
        assert.equal(
            mergable(dart({ opoisoned: 1 }), dart({ opoisoned: 1, quan: 7 })),
            true,
        );
    });
});
