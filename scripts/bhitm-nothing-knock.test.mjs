import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { bhitm } from '../js/zap.js';
import { WAND_CLASS, SPBOOK_CLASS, objectNames } from '../js/objects.js';
import { MZ_MEDIUM, M1_MINDLESS } from '../js/monsters.js';

const WAN_NOTHING = objectNames.indexOf('WAN_NOTHING');
const SPE_KNOCK = objectNames.indexOf('SPE_KNOCK');

// C ref: zap.c bhitm — two gaps closed (cliffs-head distfleeck writer):
// (1) WAN_NOTHING `:545–547` sets wake = FALSE: a wand of nothing never
// wakes or angers the monster it hits (scen-sweep-Tourist-610081 step
// 1734: the nothing-beam struck a peaceful vault guard; JS fell to
// default with wake TRUE, printed "The guard gets angry!" and the guard
// attacked, forking the RNG stream).
// (2) SPE_KNOCK `:403` sets ret = 1: the beam stops at the monster it
// knocks (bhit `:4027–4033` stops on nonzero fhitm). JS always returned
// 0, so the beam overran to a second monster and drew a second mhurtle
// rnd(2) (scen-zapfest-Valkyrie-50650068 step 545).
// The knock victim here is big (no mhurtle), mindless (wakeup without
// anger), tame-free (abuse_dog no-op) and unseen (no pline), so the
// return value is the only observable; the nothing victim is peaceful
// and must stay that way with zero RNG drawn.
const MX = 10, MY = 10;

describe('bhitm WAN_NOTHING / SPE_KNOCK (zap.c:403,545-551)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            viz_array: game.viz_array, ftrap: game.ftrap, flags: game.flags,
            iflags: game.iflags, context: game.context,
            _bhitpos: game._bhitpos, notonhead: game.notonhead,
        };
    });
    afterEach(() => {
        for (const k of Object.keys(saved)) {
            if (saved[k] === undefined) delete game[k];
            else game[k] = saved[k];
        }
    });

    const setup = () => {
        initRng(4242);
        enableRngLog();
        game.u = { ux: 5, uy: 5 };
        game.viz_array = [];
        game.ftrap = [];
        game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
        game.context = { ...(game.context ?? {}) };
        game._bhitpos = { x: MX, y: MY };
        return {
            data: { mlet: 'S_HUMAN', msize: MZ_MEDIUM, mflags1: M1_MINDLESS },
            mx: MX, my: MY, mhp: 10, mhpmax: 10, m_lev: 5,
            mpeaceful: 1, mtame: 0, msleeping: 0, meating: 0,
            mundetected: 0, minvis: 0, m_ap_type: 0,
        };
    };
    const rngUsed = () => (getRngLog() || []).length;

    it('wand of nothing: returns 0, victim stays peaceful, no RNG', async () => {
        const mon = setup();
        const before = rngUsed();
        const ret = await bhitm(mon, { otyp: WAN_NOTHING, oclass: WAND_CLASS });
        assert.equal(ret, 0);
        assert.equal(mon.mpeaceful, 1);
        assert.equal(rngUsed(), before);
    });

    it('knock: returns 1 so the beam stops at the victim', async () => {
        const mon = setup();
        const ret = await bhitm(mon, { otyp: SPE_KNOCK, oclass: SPBOOK_CLASS });
        assert.equal(ret, 1);
    });
});
