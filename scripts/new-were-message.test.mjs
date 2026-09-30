import { it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { new_were } from '../js/were.js';
import { normal_shape } from '../js/mon.js';
import { mons, NON_PM } from '../js/monsters.js';
import { monsterNames } from '../js/generated/monsters_data.js';
import { IN_SIGHT, M_AP_OBJECT, M_AP_NOTHING, MSGTYP_STOP } from '../js/const.js';
import { reset_display_messages } from '../js/display.js';
import { msgtype_add, msgtype_free } from '../js/options.js';
import { pushKey, resetInputState } from '../js/input.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';

// C were.c:114–137 blocks in pline before form/HP/armor/scared-tail work;
// mon.c:4446–4461 must also leave the mimic disguise intact at that read.
// Hold the real nhgetch capture hook, then dismiss the real MSGTYPE stop.
for (const viaNormalShape of [false, true]) {
    it(`${viaNormalShape ? 'normal_shape' : 'new_were'} waits before mutation`,
        { timeout: 3000 }, async () => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(123);
        enableRngLog();
        game.u = { ux: 0, uy: 0 };
        game.iflags = { window_inited: true };
        game.context = { mon_moving: true };
        game.viz_array = [[], [0, IN_SIGHT]];
        const human = monsterNames.indexOf('PM_HUMAN_WEREWOLF');
        const beast = monsterNames.indexOf('PM_WEREWOLF');
        const before = mons(viaNormalShape ? beast : human);
        const mon = {
            data: before, mnum: before.mndx, cham: NON_PM,
            mx: 1, my: 1, mux: 0, muy: 0, mhp: 4, mhpmax: 20,
            msleeping: 1, mfrozen: 3, mcanmove: 0, movement: 12,
            mpeaceful: false, minvent: null, mcansee: 1,
            m_ap_type: viaNormalShape ? M_AP_OBJECT : M_AP_NOTHING,
            mappearance: 0, meating: 0,
        };
        let atInput, dismiss;
        const entered = new Promise(resolve => { atInput = resolve; });
        const held = new Promise(resolve => { dismiss = resolve; });
        game._preNhgetchHook = async () => { atInput(); await held; };
        assert.ok(msgtype_add(MSGTYP_STOP, 'changes into'));
        pushKey(' ');
        let finished = false;
        const action = (viaNormalShape ? normal_shape(mon) : new_were(mon))
            .then(() => { finished = true; });
        try {
            await entered;
            // Allow any fire-and-forget physics to run while input is held.
            await new Promise(resolve => setImmediate(resolve));
            assert.match(game._pending_message, /changes into.*--More--$/);
            assert.equal(finished, false);
            assert.equal(mon.data, before);
            assert.equal(mon.mhp, 4);
            assert.equal(mon.msleeping, 1);
            assert.equal(mon.mfrozen, 3);
            assert.equal(mon.mcanmove, 0);
            assert.equal(mon.movement, 12);
            assert.equal(mon.m_ap_type, viaNormalShape ? M_AP_OBJECT : M_AP_NOTHING);
            assert.equal(getRngLog().length, 0);
        } finally {
            dismiss();
            await action;
            game._preNhgetchHook = null;
            msgtype_free();
            resetInputState();
        }
        assert.equal(mon.mnum, viaNormalShape ? human : beast);
        assert.equal(mon.mhp, 8);
        assert.equal(mon.mfrozen, 0);
        assert.equal(mon.mcanmove, 1);
        assert.equal(mon.m_ap_type, M_AP_NOTHING);
        // Auditory scaring at <0,0> applies to both forms; its flee-duration
        // draw must occur only after the transformation input is dismissed.
        assert.equal(getRngLog().some(line => line.startsWith('rn2(9)')), true);
    });
}
