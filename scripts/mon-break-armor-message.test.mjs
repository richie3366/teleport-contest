import { it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { mon_break_armor } from '../js/worn.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames } from '../js/objects.js';
import { IN_SIGHT, MSGTYP_STOP, OBJ_MINVENT, OBJ_FREE, OBJ_FLOOR,
    W_ARM, W_ARMC, W_ARMU, W_ARMG, W_ARMS, W_ARMH, W_ARMF, W_SADDLE,
    FAST, MFAST } from '../js/const.js';
import { reset_display_messages } from '../js/display.js';
import { msgtype_add, msgtype_free } from '../js/options.js';
import { pushKey, resetInputState } from '../js/input.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';

function setup(species, pieces = [], visible = true) {
    resetGame();
    reset_display_messages();
    resetInputState();
    msgtype_free();
    initRng(123);
    enableRngLog();
    game.u = { ux: 0, uy: 0 };
    game.iflags = { window_inited: true };
    game.context = { mon_moving: true };
    game.viz_array = [[], [0, visible ? IN_SIGHT : 0]];
    game.objects = [];
    const data = mons(monsterNames.indexOf(species));
    assert.ok(data);
    const mon = { data, mnum: data.mndx, mx: 1, my: 1, mhp: 20, mhpmax: 20,
        mcansee: 1, minvent: null, misc_worn_check: 0, mspeed: 0, permspeed: 0 };
    for (const [type, slot, artifact = 0] of pieces.toReversed()) {
        const obj = { otyp: objectNames.indexOf(type), o_id: slot, quan: 1,
            owornmask: slot, where: OBJ_MINVENT, ocarry: mon, oartifact: artifact,
            nobj: mon.minvent, owt: 10 };
        assert.ok(obj.otyp >= 0);
        mon.minvent = obj;
        mon.misc_worn_check |= slot;
    }
    return mon;
}

async function holdMessage(pattern, start, inspect) {
    let entered, release;
    const atInput = new Promise(resolve => { entered = resolve; });
    const held = new Promise(resolve => { release = resolve; });
    game._preNhgetchHook = async () => { entered(); await held; };
    assert.ok(msgtype_add(MSGTYP_STOP, pattern));
    for (let i = 0; i < 20; ++i) pushKey(' ');
    let finished = false;
    const action = Promise.resolve(start()).then(() => { finished = true; });
    try {
        await Promise.race([atInput, action.then(() => {
            throw new Error(`action completed without stopping at ${pattern}`);
        })]);
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(finished, false);
        assert.match(game._pending_message, /--More--$/);
        inspect();
    } finally {
        release();
        await action;
        game._preNhgetchHook = null;
        msgtype_free();
        resetInputState();
    }
}

// Expectations come from C worn.c:1196–1310: the target and every later
// piece remain worn at the actual message input; mutation follows dismissal.
const arms = [
    ['break suit', 'PM_OGRE', 'LEATHER_ARMOR', W_ARM, 0, 'breaks out', true, false],
    ['unseen suit', 'PM_OGRE', 'LEATHER_ARMOR', W_ARM, 0, 'cracking sound', false, false],
    ['artifact cloak', 'PM_OGRE', 'CLOAK_OF_PROTECTION', W_ARMC, 1, 'falls off', true, true],
    ['tear cloak', 'PM_OGRE', 'CLOAK_OF_PROTECTION', W_ARMC, 0, 'tears apart', true, false],
    ['tear shirt', 'PM_OGRE', 'HAWAIIAN_SHIRT', W_ARMU, 0, 'rips to shreds', true, false],
    ['slip suit', 'PM_FOG_CLOUD', 'LEATHER_ARMOR', W_ARM, 0, 'armor falls', true, true],
    ['whirly cloak', 'PM_FOG_CLOUD', 'CLOAK_OF_PROTECTION', W_ARMC, 0, 'unsupported', true, true],
    ['whirly shirt', 'PM_FOG_CLOUD', 'HAWAIIAN_SHIRT', W_ARMU, 0, 'seeps right through', true, true],
    ['small cloak', 'PM_KITTEN', 'CLOAK_OF_PROTECTION', W_ARMC, 0, 'shrinks out', true, true],
    ['small shirt', 'PM_KITTEN', 'HAWAIIAN_SHIRT', W_ARMU, 0, 'much too small', true, true],
    ['gloves', 'PM_WOLF', 'LEATHER_GLOVES', W_ARMG, 0, 'drops', true, true],
    ['shield', 'PM_WOLF', 'SMALL_SHIELD', W_ARMS, 0, 'no longer hold', true, true],
    ['horns helmet', 'PM_HORNED_DEVIL', 'HELMET', W_ARMH, 0, 'helmet falls', true, true],
    ['slithy boots', 'PM_SNAKE', 'LOW_BOOTS', W_ARMF, 0, 'boots', true, true],
];
for (const [label, species, type, slot, artifact, pattern, visible, dropped] of arms) {
    it(`mon_break_armor waits before ${label} mutation`, { timeout: 3000 }, async () => {
        const mon = setup(species, [[type, slot, artifact]], visible);
        const obj = mon.minvent;
        await holdMessage(pattern, () => mon_break_armor(mon, true), () => {
            assert.equal(mon.minvent, obj);
            assert.equal(obj.where, OBJ_MINVENT);
            assert.equal(obj.owornmask, slot);
            assert.equal(mon.misc_worn_check, slot);
            assert.equal(obj.bypass, undefined);
            assert.equal(getRngLog().length, 0);
        });
        assert.equal(mon.minvent, null);
        assert.equal(obj.owornmask, 0);
        assert.equal(obj.where, dropped ? OBJ_FLOOR : OBJ_FREE);
        assert.equal(mon.misc_worn_check & slot, 0);
        if (dropped) assert.equal(obj.bypass, 1);
    });
}

it('saddle placement precedes its message (worn.c:1315–1317)', async () => {
    const mon = setup('PM_FOG_CLOUD', [['SADDLE', W_SADDLE]]);
    const obj = mon.minvent;
    await holdMessage('saddle falls', () => mon_break_armor(mon, true), () => {
        assert.equal(mon.minvent, null);
        assert.equal(obj.where, OBJ_FLOOR);
        assert.equal(obj.bypass, 1);
    });
});

it('speed-boot extraction waits before gear flags and placement', async () => {
    const mon = setup('PM_WOLF', [['SPEED_BOOTS', W_ARMF]]);
    const boots = mon.minvent;
    game.objects[boots.otyp] = { oc_oprop: FAST };
    mon.mspeed = MFAST;
    await holdMessage('moving.*slower', () => mon_break_armor(mon, true), () => {
        // C :1402–1406 unlinks/clears owornmask, then the speed pline
        // waits; :1408–1413 flags and :1046 placement are still pending.
        assert.equal(mon.minvent, null);
        assert.equal(boots.where, OBJ_FREE);
        assert.equal(boots.owornmask, 0);
        assert.equal(mon.misc_worn_check & W_ARMF, W_ARMF);
        assert.equal(boots.bypass, undefined);
    });
    assert.equal(boots.where, OBJ_FLOOR);
    assert.equal(boots.bypass, 1);
    assert.equal(mon.misc_worn_check & W_ARMF, 0);
});

it('silent dragon merge consumes armor synchronously', () => {
    const mon = setup('PM_GRAY_DRAGON', [['GRAY_DRAGON_SCALES', W_ARM]]);
    assert.equal(mon_break_armor(mon, false), undefined);
    assert.equal(mon.minvent, null);
    assert.equal(getRngLog().length, 0);
});

it('riding warning waits before petrification RNG and dismount', { timeout: 3000 }, async () => {
    const mon = setup('PM_COCKATRICE');
    game.u.usteed = mon;
    const interruptedInput = new Error('test interrupts held input');
    let entered, release;
    const atInput = new Promise(resolve => { entered = resolve; });
    const held = new Promise(resolve => { release = resolve; });
    game._preNhgetchHook = async () => {
        entered();
        await held;
        throw interruptedInput;
    };
    msgtype_add(MSGTYP_STOP, 'can no longer ride');
    pushKey(' ');
    const action = Promise.resolve(mon_break_armor(mon, false)).catch(error => error);
    try {
        await atInput;
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(game.u.usteed, mon);
        assert.equal(getRngLog().length, 0); // C rnl(3) follows You(), not its start.
        assert.match(game._pending_message, /can no longer ride.*--More--$/);
    } finally {
        release();
        assert.equal(await action, interruptedInput);
        game._preNhgetchHook = null;
        msgtype_free();
        resetInputState();
    }
});

it('later armor waits retain later inventory while earlier armor is consumed', async () => {
    const mon = setup('PM_OGRE', [
        ['LEATHER_ARMOR', W_ARM], ['CLOAK_OF_PROTECTION', W_ARMC],
        ['HAWAIIAN_SHIRT', W_ARMU],
    ]);
    const suit = mon.minvent, cloak = suit.nobj, shirt = cloak.nobj;
    await holdMessage('tears apart', () => mon_break_armor(mon, false), () => {
        assert.equal(suit.where, OBJ_FREE);
        assert.equal(mon.minvent, cloak);
        assert.equal(cloak.where, OBJ_MINVENT);
        assert.equal(shirt.where, OBJ_MINVENT);
        assert.equal(shirt.owornmask, W_ARMU);
    });
    assert.equal(mon.minvent, null);
});

it('steed saddle extraction waits for dismount before placing it', { timeout: 3000 }, async () => {
    const mon = setup('PM_FOG_CLOUD', [['SADDLE', W_SADDLE]]);
    const saddle = mon.minvent;
    game.u.usteed = mon;
    const interruptedInput = new Error('test interrupts held dismount');
    let entered, release;
    const atInput = new Promise(resolve => { entered = resolve; });
    const held = new Promise(resolve => { release = resolve; });
    game._preNhgetchHook = async () => { entered(); await held; throw interruptedInput; };
    msgtype_add(MSGTYP_STOP, 'fall off');
    pushKey(' ');
    const action = Promise.resolve(mon_break_armor(mon, true)).catch(error => error);
    try {
        await Promise.race([atInput, action.then(error => { throw error; })]);
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(saddle.where, OBJ_FREE);
        assert.equal(saddle.bypass, undefined);
        assert.equal(mon.misc_worn_check & W_SADDLE, W_SADDLE);
        assert.equal(game.fobj, undefined);
        assert.match(game._pending_message, /fall off.*--More--$/);
    } finally {
        release();
        assert.equal(await action, interruptedInput);
        game._preNhgetchHook = null;
        msgtype_free();
        resetInputState();
    }
});
