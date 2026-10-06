// `monmove.c` m_move can_unlock: C `:1766–1767` ends `|| is_rider(ptr)`
// (Riders unlock without a key) but js/monmove.js carried "is_rider
// deferred", so a Rider smashed a locked door (D_BROKEN + rn2(2)) where C
// unlocks it (scen-tour-Healer-92055 step 141: C «a door unlock and open»
// vs JS «a door crash open»). D-3562.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { is_rider } from '../js/monsters.js';
import { monsterNames } from '../js/generated/monsters_data.js';

const N = (nm) => {
    const i = monsterNames.indexOf(nm);
    assert.ok(i >= 0, `${nm} exists`);
    return i;
};

describe('m_move can_unlock is_rider (monmove.c:1766)', () => {
    it('is_rider true for Death/Famine/Pestilence, false for others', () => {
        for (const nm of ['PM_DEATH', 'PM_FAMINE', 'PM_PESTILENCE']) {
            assert.equal(is_rider({ mndx: N(nm) }), true, nm);
        }
        for (const nm of ['PM_WRAITH', 'PM_FOG_CLOUD']) {
            assert.equal(is_rider({ mndx: N(nm) }), false, nm);
        }
    });

    it('census: m_move can_unlock references is_rider(ptr)', () => {
        const src = readFileSync(new URL('../js/monmove.js', import.meta.url), 'utf8');
        assert.match(src, /can_unlock = .*is_rider\(ptr\)/);
    });
});
