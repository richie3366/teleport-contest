import { it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { polymon } from '../js/polyself.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames } from '../js/objects.js';
import { W_ARM, W_ARMH, ROOM, OBJ_INVENT, OBJ_DELETED, OBJ_FLOOR, I_SPECIAL } from '../js/const.js';
import { reset_display_messages, install_tty_wincap2 } from '../js/display.js';
import { status_initialize } from '../js/botl.js';
import { resetInputState } from '../js/input.js';

// C ref: polyself.c break_armor — the donning/cancel_don sites C runs at
// every armor-removal point. Two shapes, both previously omitted:
// (1) `:1164` unconditional `if (donning(otmp)) cancel_don()` before the
// breakarm-suit destroy sequence — unconditional, unlike cancel_doff's
// I_SPECIAL skip (do_wear.c:1643), so a take-off-all in progress still
// cancels; (2) `:1231` the flimsy-helm `&& !donning(otmp)` condition —
// a helm being donned falls instead of being pierced.

const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
const PM_WOLF = monsterNames.indexOf('PM_WOLF');
const PM_HORNED_DEVIL = monsterNames.indexOf('PM_HORNED_DEVIL');
const PM_BARBARIAN = monsterNames.indexOf('PM_BARBARIAN');
const LEATHER_ARMOR = objectNames.indexOf('LEATHER_ARMOR');
const FEDORA = objectNames.indexOf('FEDORA');
assert.ok(PM_HUMAN >= 0 && PM_WOLF >= 0 && PM_HORNED_DEVIL >= 0);
assert.ok(LEATHER_ARMOR >= 0 && FEDORA >= 0);

function setup({ mntmp, worn, donWhat, donMask, multi }) {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(4242);
    game.objects = [];
    game.objects[FEDORA] = { oc_material: 6 }; // objects.h:454 CLOTH ≤ LEATHER 7
    const armor = { otyp: worn, o_id: 1, quan: 1, owt: 150,
        owornmask: worn === FEDORA ? W_ARMH : W_ARM, where: OBJ_INVENT,
        nobj: null, oartifact: 0, lamplit: 0, spe: 0, cursed: 0, blessed: 0 };
    game.invent = [armor];
    game.u = { ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 },
        umonnum: PM_HUMAN, umonster: PM_HUMAN, ulevel: 10,
        uconduct: {}, acurr: { a: [12, 12, 12, 12, 12, 12] },
        amax: { a: [12, 12, 12, 12, 12, 12] },
        uarm: worn === FEDORA ? null : armor,
        uarmh: worn === FEDORA ? armor : null,
        uarmu: null, uarmc: null, uarmg: null, uarms: null,
        uarmf: null, ublindf: null,
        uwep: null, uswapwep: null, uquiver: null, uamul: null,
        uleft: null, uright: null, ustuck: null, uswallow: 0,
        uundetected: 0, utrap: 0, utraptype: 0, usteed: null,
        uskin: null, Stoned: 0, Slimed: 0, Sick: 0, uinwater: 0 };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.flags = { female: false, verbose: false, botl: false };
    game.iflags = { window_inited: true };
    game.urole = { mnum: PM_BARBARIAN };
    game.context = { takeoff: { what: donWhat, mask: donMask } };
    game.multi = multi;
    game.afternmv = null;
    game.nomovemsg = null;
    game.moves = 0;
    game.fmon = [];
    game.level = {
        at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, seenv: 1 }),
        flags: {}, traps: [], rooms: [],
    };
    game._pending_message = '';
    // C allmain.c:720–724 — tty wincap2 carries the status bits, so
    // status gets a full init before set_uasmon's REASSESS_ONLY.
    game.windowprocs = {};
    install_tty_wincap2();
    status_initialize(false);
    return armor;
}

it('breakarm suit: take-off-all in progress still cancels (polyself.c:1164)', async () => {
    // Wolf is MZ_MEDIUM non-humanoid → breakarm true, suit destroyed.
    // takeoff.what reads as doffing-in-progress through doffing→donning;
    // I_SPECIAL makes cancel_doff skip, so only :1164 can cancel.
    const armor = setup({ mntmp: PM_WOLF, worn: LEATHER_ARMOR,
        donWhat: W_ARM, donMask: I_SPECIAL, multi: 5 });
    await polymon(PM_WOLF);
    assert.equal(game.multi, 0);
    assert.equal(game.context.takeoff.what, 0);
    assert.equal(game.afternmv, null);
    assert.equal(game.u.uarm, null);
    assert.equal(armor.where, OBJ_DELETED);
    assert.ok(!game.invent.includes(armor));
});

it('horned form: helm being donned falls, is not pierced (polyself.c:1231)', async () => {
    const helm = setup({ mntmp: PM_HORNED_DEVIL, worn: FEDORA,
        donWhat: W_ARMH, donMask: 0, multi: 5 });
    await polymon(PM_HORNED_DEVIL);
    assert.equal(game.u.uarmh, null);
    assert.equal(helm.where, OBJ_FLOOR);
});

it('control: suit destroyed but an unrelated multi is untouched', async () => {
    const armor = setup({ mntmp: PM_WOLF, worn: LEATHER_ARMOR,
        donWhat: 0, donMask: 0, multi: 5 });
    await polymon(PM_WOLF);
    assert.equal(game.multi, 5);
    assert.equal(game.u.uarm, null);
    assert.equal(armor.where, OBJ_DELETED);
});
