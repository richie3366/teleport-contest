// `mkobj.c` save_mtraits `:2157–2195`: C `*mtmp2 = *mtmp` copies the embedded
// `mtrack[MTSZ]` array BY VALUE into the corpse's omonst snapshot, so the
// saved track survives the dead mon's dealloc. JS shared the array, so
// dealloc_monst's zeromonst (applyZeromonst zeroes slots in place) wiped the
// snapshot and the revived monster lost its history (scen-sweep-Barbarian-
// 582719 s713: C revived ice troll keeps [(21,6),(22,6),(23,5),(24,5)] and
// draws rn2(28)@m_move:1963; JS drew nothing).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { resetGame } from '../js/gstate.js';
import { save_mtraits } from '../js/mkobj.js';
import { OMONST, has_omonst } from '../js/const.js';
import { dealloc_monst } from '../js/mon.js';

const TRACK = [
    { x: 21, y: 6 },
    { x: 22, y: 6 },
    { x: 23, y: 5 },
    { x: 24, y: 5 },
];

describe('save_mtraits snapshots mtrack by value (mkobj.c *mtmp2 = *mtmp)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('omonst track survives dealloc_monst of the dead mon', () => {
        const mon = {
            nmon: null,
            m_id: 1195,
            mnum: 221,
            data: { mndx: 221, mlevel: 7 },
            mx: 20,
            my: 7,
            mhp: 0,
            mhpmax: 54,
            mtrack: TRACK.map((s) => ({ ...s })),
            mextra: null,
            edog: null,
            minvent: null,
            mw: null,
            ispriest: 0,
            mstate: 0,
        };
        const corpse = {};
        save_mtraits(corpse, mon);
        assert.ok(has_omonst(corpse), 'corpse carries omonst');
        assert.deepStrictEqual(OMONST(corpse).mtrack, TRACK);
        dealloc_monst(mon);
        assert.deepStrictEqual(
            OMONST(corpse).mtrack,
            TRACK,
            'C by-value snapshot keeps the track after the mon is deallocated',
        );
    });
});
