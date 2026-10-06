// `monmove.c` max_mon_load MZ_HUMAN: js/monmove.js carried a local
// `const MZ_HUMAN = 3` (MZ_LARGE) while C monflag.h:180 defines
// MZ_HUMAN ≡ MZ_MEDIUM (2) — every other js/ home agrees. Corpseless
// monsters (cwt 0, e.g. wraith) computed 333 instead of 500, so can_carry
// refused a 357-load large box and m_search_items never retargeted the
// wraith (scen-tour-Healer-92055 step 104; D-3560 named the writer). D-3561.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { max_mon_load } from '../js/monmove.js';
import { mons, MZ_MEDIUM } from '../js/monsters.js';
import { monsterNames } from '../js/generated/monsters_data.js';

const PM_WRAITH = monsterNames.indexOf('PM_WRAITH');

describe('max_mon_load MZ_HUMAN (monflag.h:180)', () => {
    it('wraith capacity is 500 (C: 1000*2/2, weak-halved)', () => {
        assert.equal(MZ_MEDIUM, 2);
        const w = mons(PM_WRAITH);
        assert.equal(w.cwt, 0);
        assert.equal(w.msize, MZ_MEDIUM);
        assert.equal(max_mon_load({ data: w, minvent: null }), 500);
    });

    it('census: every js/ MZ_HUMAN initializer is MZ_MEDIUM (2), never 3', () => {
        const dir = new URL('../js/', import.meta.url);
        const bad = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            for (const m of src.matchAll(/const MZ_HUMAN = ([^;]+);/g)) {
                const init = m[1].trim();
                if (init !== 'MZ_MEDIUM' && init !== '2') bad.push(`js/${f}: ${init}`);
            }
        }
        assert.deepEqual(bad, []);
    });
});
