import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { nhl_gamestate } from '../js/do.js';
import { setuwep } from '../js/wield.js';
import { W_WEP, OBJ_INVENT, P_POLEARMS, P_NONE } from '../js/const.js';
import { WEAPON_CLASS } from '../js/generated/objects_data.js';
import { objectNames } from '../js/objects.js';

const WAR_HAMMER = objectNames.indexOf('WAR_HAMMER');
const HALBERD = objectNames.indexOf('HALBERD');

// C ref: nhlua.c nhl_gamestate restore `:1744–1753` — the stash is
// re-added via addinv_nomerge and re-worn via worn.c setworn, which
// never touches gu.unweapon. JS routed W_WEP through setuwep, which
// recomputes unweapon (FALSE for an ordinary weapon), so a TRUE armed
// between save and restore (pole wield, throw unwield) was lost and
// the next melee skipped C's "begin bashing monsters" reminder
// (scen-worldtour-Barbarian-49955016 step 594, Rogue-578132 step 984:
// C prints it, JS did not; RNG matched fully on both).

function mkobj(otyp, extra = {}) {
    return {
        otyp, quan: 1, oclass: WEAPON_CLASS, owornmask: 0,
        where: OBJ_INVENT, o_id: 1000 + otyp, invlet: 'a',
        spe: 0, cursed: 0, blessed: 0, ...extra,
    };
}

function setupWielded(otyp) {
    const weapon = mkobj(otyp, { owornmask: W_WEP });
    game.u = { ux: 10, uy: 10, uwep: weapon, uswapwep: null, uquiver: null };
    game.invent = [weapon];
    game.gu = { unweapon: false }; // C decl.c init FALSE
    game.moves = 27;
    game.disco = [];
    game.mvitals = [];
    game.spl_book = [];
    game.objects = [];
    game.objects[WAR_HAMMER] = { oc_skill: P_NONE, oc_oprop: 0 };
    game.objects[HALBERD] = { oc_skill: P_POLEARMS, oc_oprop: 0 };
    game.flags = {};
    game.iflags = {};
    game.disp = {};
    return weapon;
}

describe('nhl_gamestate restore re-wears via setworn (nhlua.c:1749-1750)', () => {
    let saved;
    beforeEach(() => {
        saved = {};
        for (const k of ['u', 'invent', 'gu', 'moves', 'disco', 'mvitals',
            'spl_book', 'objects', 'flags', 'iflags', 'disp', 'gmst_stored',
            'gmst_moves', 'gmst_invent', 'gmst_ubak', 'gmst_disco',
            'gmst_mvitals', 'gmst_spl_book', '_lastinvnr']) {
            saved[k] = game[k];
        }
    });
    afterEach(() => {
        for (const k of Object.keys(saved)) game[k] = saved[k];
    });

    it('preserves unweapon TRUE armed between save and restore', async () => {
        const hammer = setupWielded(WAR_HAMMER);
        await nhl_gamestate(false); // stash: invent emptied, wield cleared
        assert.equal(game.invent.length, 0);
        assert.equal(game.u.uwep, null);
        // Interlude: wield a pole (C setuwep: pole && !usteed → TRUE).
        const pole = mkobj(HALBERD);
        const shine = setuwep(pole);
        if (shine) await shine;
        assert.equal(game.gu.unweapon, true);
        await nhl_gamestate(true); // restore: hammer re-added + re-worn
        assert.equal(game.u.uwep, hammer);
        assert.ok((hammer.owornmask | 0) & W_WEP);
        assert.equal(game.gu.unweapon, true); // C setworn never recomputes
        assert.equal(game.moves, 27);
    });

    it('leaves unweapon FALSE alone across a quiet round-trip', async () => {
        const hammer = setupWielded(WAR_HAMMER);
        await nhl_gamestate(false);
        await nhl_gamestate(true);
        assert.equal(game.u.uwep, hammer);
        assert.equal(game.gu.unweapon, false);
    });

    it('restore without a stash reports impossible, save twice likewise', async () => {
        setupWielded(WAR_HAMMER);
        game.gmst_stored = false;
        await nhl_gamestate(true); // C :1795-1799 arm, must not throw
        await nhl_gamestate(false);
        assert.equal(game.gmst_stored, true);
        await nhl_gamestate(false); // already stored: impossible, no-op
        assert.equal(game.gmst_stored, true);
    });
});
