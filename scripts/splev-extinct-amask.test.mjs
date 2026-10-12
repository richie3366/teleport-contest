// `sp_lev.c` create_monster amask-before-extinct order (:1943 vs :1949–1953):
// C computes amask = sp_amask_to_amask (induced_align burn for RANDOM) BEFORE
// the G_UNIQ-extinct early return. JS returned first, so an extinct unique
// with default align (astral Pestilence, scen-sweep-Barbarian-582708 s385)
// skipped the induced_align draw C emits.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { splev_create_monster } from '../js/mklev.js';
import { G_EXTINCT } from '../js/const.js';
import { monsterNames } from '../js/monsters.js';

const PM_PESTILENCE = monsterNames.indexOf('PM_PESTILENCE');

describe('splev_create_monster extinct-unique amask burn (sp_lev.c:1943 before :1950)', () => {
    beforeEach(() => {
        resetGame();
        initRng(582708);
        enableRngLog();
        game.u = { uz: { dnum: 0, dlevel: 1 } };
    });

    it('extinct Pestilence returns null but still burns find_montype + induced_align', () => {
        assert.ok(PM_PESTILENCE >= 0, 'PM_PESTILENCE resolves');
        game.mvitals = [];
        game.mvitals[PM_PESTILENCE] = { mvflags: G_EXTINCT };
        const mtmp = splev_create_monster('Pestilence', 0, {});
        assert.equal(mtmp, null);
        const log = getRngLog();
        assert.equal(log.length, 2, `expected gender+amask draws, got ${JSON.stringify(log)}`);
        assert.ok(log[0].startsWith('rn2(2)='), `gender draw first: ${log[0]}`);
        assert.ok(log[1].startsWith('rn2(3)='), `induced_align draw second: ${log[1]}`);
    });
});
