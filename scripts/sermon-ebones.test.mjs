import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { serMon } from '../js/lev_json.js';
import { restmon } from '../js/restore.js';
import {
    has_ebones, EBONES, has_mgivenname, MGIVENNAME,
} from '../js/const.js';

// C ref: save.c savemon `:871–875` (ebones blob) + restore.c `:362–366`
// (Sfi_ebones) + mextra.h:189 (struct ebones; `mnum` is Role_switch).
// serMon's mextra replacer dropped every object with `mnum != null`
// (live-monst filter), so the ebones data bag never reached the JSON;
// done_in_by (end.c:277–280) then printed "called" for a bones monster
// C calls "of" — e.g. scen-chain-Ranger-95416's seg-0 revenant
// ("green slime of wizard" on the seg-1 Tourist tombstone).

const EBONES_BAG = {
    role: 8,
    race: 3,
    oldalign: { type: 1, record: 5 },
    deathlevel: 1,
    luck: 0,
    mnum: 42, // Role_switch — tripped the old filter (`0 != null`)
    female: 0,
    demigod: 0,
    crowned: 0,
};

function bonesSlime(extra = {}) {
    return {
        mnum: 178,
        mextra: { mgivenname: 'wizard', ebones: { ...EBONES_BAG } },
        minvent: null,
        mw: null,
        ...extra,
    };
}

describe('savemon ebones arm (save.c:871-875)', () => {
    it('serMon keeps the ebones death record incl. its mnum', () => {
        const out = serMon(bonesSlime());
        assert.deepEqual(out.mextra.ebones, EBONES_BAG);
    });

    it('roundtrip: restmon rebuilds has_ebones from the saved JSON', () => {
        const saved = serMon(bonesSlime());
        const back = restmon({ mextra: saved.mextra });
        assert.equal(has_ebones(back), true);
        assert.equal(EBONES(back).mnum, 42);
        assert.equal(EBONES(back).deathlevel, 1);
        assert.deepEqual(EBONES(back).oldalign, { type: 1, record: 5 });
    });

    it('mgivenname string survives both sides (the combat-message half)', () => {
        const saved = serMon(bonesSlime());
        assert.equal(saved.mextra.mgivenname, 'wizard');
        const back = restmon({ mextra: saved.mextra });
        assert.equal(has_mgivenname(back), true);
        assert.equal(MGIVENNAME(back), 'wizard');
    });

    it('live-monst filter still drops mx-bearing nested objects', () => {
        const out = serMon(bonesSlime({
            mextra: {
                mgivenname: 'wizard',
                ebones: { ...EBONES_BAG },
                live_ref: { mx: 1, my: 2, mnum: 5 },
            },
        }));
        assert.equal(out.mextra.live_ref, undefined);
        assert.deepEqual(out.mextra.ebones, EBONES_BAG);
    });

    it('freed bag (ebones: 0) stays absent after restmon (C buflen-0)', () => {
        const saved = serMon(bonesSlime({ mextra: { ebones: 0 } }));
        assert.equal(saved.mextra.ebones, 0);
        const back = restmon({ mextra: saved.mextra });
        assert.equal(has_ebones(back), false);
    });
});
