import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { throwit_returning_missile } from '../js/dothrow.js';
import { objects_globals_init, objectNames, WEAPON_CLASS } from '../js/objects.js';
import { W_WEP, W_QUIVER, OBJ_FREE, OBJ_INVENT, LOST_THROWN } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: dothrow.c throwit `:1710–1728` — a caught returning missile is
// restored with plain `addinv_before(obj, oldslot)` (`:1719`), which
// MERGES a split-off single back into its stack (quiver-preferred,
// invent.c addinv_core0 `:1101–1114`; other_obj is NULL for the split
// path so the `:1087` reinsert does not apply). The merged stack is
// then unquivered (`:1723–1724`) and wielded (`:1725`). The nomerge
// form is only for return_throw_to_inv (C `:1885–1887`).
// JS (js/dothrow.js) routed `:1719` through the nomerge throw helper,
// so a boomerang caught while swallowed (or underwater — both skip
// the boomhit arm) stayed a separate single and got wielded alone:
// scen-worldtour-Wizard-50250032 step 308 C «...with your boomerangs.»
// vs JS «...with your boomerang.» (JS uwep quan 1, parent q4 unmerged).
// Staging: quivered q4 boomerang stack + a free LOST_THROWN single
// (the split child), another weapon wielded; returning_missile set,
// not impaired. initRng(1) opens rn2(100)=45,54 so the C `:1711` and
// `:1717` gates both pass and the «returns to your hand!» arm runs —
// asserted as a precondition so RNG staging can never pass vacuously.

const HX = 10;
const HY = 10;
const BOOMERANG = objectNames.indexOf('BOOMERANG');
const LONG_SWORD = objectNames.indexOf('LONG_SWORD');
assert.ok(BOOMERANG >= 0 && LONG_SWORD >= 0);

function mkobj(otyp, extra = {}) {
    return {
        otyp, oclass: WEAPON_CLASS, quan: 1, where: OBJ_FREE,
        o_id: 5000 + otyp, invlet: 0, owornmask: 0,
        spe: 0, cursed: 0, blessed: 0, bknown: 0, dknown: 0,
        unpaid: 0, no_charge: 0, oerodeproof: 0,
        oeroded: 0, oeroded2: 0, greased: 0, lamplit: 0,
        globby: 0, oartifact: 0, otrapped: 0, oraz: 0,
        owt: 10, ox: HX, oy: HY, how_lost: 0, nomerge: 0,
        nobj: null, nexthere: null, cobj: null,
        ...extra,
    };
}

function setup() {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(1);
    objects_globals_init();
    const sword = mkobj(LONG_SWORD, {
        o_id: 6101, where: OBJ_INVENT, invlet: 'a', owornmask: W_WEP, owt: 40,
    });
    // Session-exact ID: the wished stack is dknown=1 (probed at step 274:
    // known=0 dknown=1 bknown=0); the split child inherits it. C merges
    // only on dknown match (invent.c mergable `:4425`, unconditional),
    // and the `:1718` Tobjnam observes (xname_flags `:638`) so a dknown=0
    // child would flip to 1 and refuse — staging 0 here would be unfaithful.
    const parent = mkobj(BOOMERANG, {
        o_id: 6102, quan: 4, where: OBJ_INVENT, invlet: 'r',
        owornmask: W_QUIVER, owt: 40, dknown: 1,
    });
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: HX, uy: HY, uz: { dnum: 0, dlevel: 1 },
        dx: 1, dy: 0, dz: 0,
        uinwater: 0, uswallow: 0,
        uhp: 20, uhpmax: 20, mh: 0, mhmax: 0,
        uwep: sword, uswapwep: null, uquiver: parent,
        uball: null, uchain: null, usteed: null,
        utrap: 0, utraptype: 0, ushops: '',
        twoweap: false,
    };
    game.invent = [sword, parent];
    game.gu = { unweapon: false };
    game.moves = 100;
    game.flags = { verbose: true };
    game.disp = {};
    game.fmon = [];
    const child = mkobj(BOOMERANG, {
        o_id: 6103, quan: 1, where: OBJ_FREE, how_lost: LOST_THROWN, owt: 10,
        dknown: 1,
    });
    game.iflags.returning_missile = child;
    return { sword, parent, child };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

function boomStacks() {
    return (game.invent || []).filter((o) => o && o.otyp === BOOMERANG);
}

describe('throwit returning catch merges the split single (dothrow.c:1719)', () => {
    it('caught single rejoins the quiver stack, merged stack wielded', async () => {
        const { parent, child } = setup();
        const handled = await throwit_returning_missile(
            child, W_QUIVER, false, null, HX, HY, false, false,
        );
        assert.equal(handled, true);
        const ms = messages();
        assert.ok(ms.some((m) => m.includes('returns to your hand!')),
            'C :1717 catch arm must run (RNG staging)');
        const stacks = boomStacks();
        assert.equal(stacks.length, 1, 'single merges into the quiver stack');
        assert.equal(stacks[0].quan, 5);
        assert.equal(stacks[0], parent, 'quiver parent survives the merge');
        assert.equal(game.u.uquiver, null, 'C :1723-1724 unquivers before wield');
        assert.equal(game.u.uwep, parent, 'C :1725 wields the merged stack');
        assert.ok((parent.owornmask | 0) & W_WEP);
        assert.equal(game.gu.unweapon, true, 'wielded weptool arms the bashing reminder');
    });
});
