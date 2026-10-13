import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { attrcurse } from '../js/sit.js';
import {
    FAST, STEALTH, TIMEOUT, FROMEXPER, INTRINSIC,
} from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: sit.c attrcurse `:644–762` — strip one random INTRINSIC ability.
// In C every H* gate is u.uprops[*].intrinsic (youprop.h single storage);
// JS keeps both a flat (u.HFast …) and the slot, and every other writer
// dual-writes (set_HFast in potion.js/timeout.js, u_slow_down in mhitu.js,
// the nh_timeout FAST arm). attrcurse wrote the flat only, so the slot
// kept INTRINSIC and the next timeout tick restored the flat from the
// OR (scen-sweep-Knight-587209: stripped at step 557, back at 559, C
// silent vs JS «You feel slower.» again at 561). Every arm OR-reads and
// dual-writes, in C order; the strip still clears INTRINSIC bits only
// (TIMEOUT preserved, C `&= ~INTRINSIC`).
// Seed 7 lands rnd(11) == 8 (FAST arm head); seed 11 lands rnd(11) == 9
// (STEALTH arm head) as the first draw after initRng.

const FLATS = [
    'HFire_resistance', 'HTeleportation', 'HPoison_resistance', 'HTelepat',
    'HCold_resistance', 'HInvis', 'HSee_invisible', 'HFast', 'HStealth',
    'HProtection', 'HAggravate_monster',
];

function setup(seed, flats = {}, slots = {}) {
    reset_display_messages();
    clear_nhwindow_message();
    initRng(seed);
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    const u = { ux: 10, uy: 10 };
    for (const f of FLATS) u[f] = 0;
    Object.assign(u, flats);
    u.uprops = {};
    for (const [idx, intrinsic] of Object.entries(slots)) {
        u.uprops[idx] = { intrinsic, extrinsic: 0, blocked: 0 };
    }
    game.u = u;
    return u;
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('attrcurse strips both mirrors (sit.c:644-762)', () => {
    let saved;
    beforeEach(() => {
        saved = { u: game.u, iflags: game.iflags };
    });
    afterEach(() => {
        game.u = saved.u;
        game.iflags = saved.iflags;
    });

    it('FAST set in both mirrors: strips both, message, ret FAST', async () => {
        const u = setup(7, { HFast: FROMEXPER }, { [FAST]: FROMEXPER });
        const ret = await attrcurse();
        assert.equal(ret, FAST);
        assert.deepEqual(messages(), ['You feel slower.']);
        assert.equal(u.HFast | 0, 0);
        assert.equal((u.uprops[FAST].intrinsic | 0), 0);
    });

    it('FAST slot-only (flat cleared): OR-read strips, message, ret FAST', async () => {
        const u = setup(7, {}, { [FAST]: FROMEXPER });
        const ret = await attrcurse();
        assert.equal(ret, FAST);
        assert.deepEqual(messages(), ['You feel slower.']);
        assert.equal(u.HFast | 0, 0);
        assert.equal((u.uprops[FAST].intrinsic | 0), 0);
    });

    it('no intrinsic anywhere: ret 0, silent', async () => {
        const u = setup(7);
        const ret = await attrcurse();
        assert.equal(ret, 0);
        assert.deepEqual(messages(), []);
        assert.equal(u.HFast | 0, 0);
    });

    it('STEALTH sibling arm: strips both mirrors, message, ret STEALTH', async () => {
        const u = setup(11, { HStealth: FROMEXPER }, { [STEALTH]: FROMEXPER });
        const ret = await attrcurse();
        assert.equal(ret, STEALTH);
        assert.deepEqual(messages(), ['You feel clumsy.']);
        assert.equal(u.HStealth | 0, 0);
        assert.equal((u.uprops[STEALTH].intrinsic | 0), 0);
    });

    it('FAST timed + intrinsic: TIMEOUT preserved in both, INTRINSIC gone', async () => {
        const both = 27 | FROMEXPER;
        const u = setup(7, { HFast: both }, { [FAST]: both });
        const ret = await attrcurse();
        assert.equal(ret, FAST);
        assert.deepEqual(messages(), ['You feel slower.']);
        assert.equal(u.HFast | 0, 27);
        assert.equal((u.uprops[FAST].intrinsic | 0), 27);
        assert.equal((u.HFast | 0) & INTRINSIC, 0);
        assert.equal(((u.uprops[FAST].intrinsic | 0) & INTRINSIC), 0);
        void TIMEOUT;
    });
});
