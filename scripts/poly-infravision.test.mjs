import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { see_with_infrared } from '../js/display.js';
import { mons, infravision, infravisible, M3_INFRAVISIBLE } from '../js/monsters.js';
import { monsterNames, PM_GNOME, PM_HEALER } from '../js/generated/monsters_data.js';
import { COULD_SEE } from '../js/const.js';

// C ref: include/display.h _see_with_infrared (`!Blind && Infravision &&
// infravisible && couldsee`) + polyself.c set_uasmon `:84–85`
// (PROPSET(INFRAVISION, infravision(Upolyd ? mdat : &mons[urace]))):
// the race default applies only while human; poly'd, the HInfravision
// FROMFORM bit is the whole story. scen-sweep-Healer-95346 step 778: a
// gnome Healer poly'd into a baby blue dragon kept seeing a housecat in
// the dark via the stale race fallback (JS `f`), where C shows the red
// Warning `1` (display_warning after see_with_infrared fails).
const PM_BABY_BLUE_DRAGON = monsterNames.indexOf('PM_BABY_BLUE_DRAGON');
const PM_HOUSECAT = monsterNames.indexOf('PM_HOUSECAT');

function setupHero({ umonnum, hInfra }) {
    resetGame();
    game.u = {
        ux: 67, uy: 5, umonnum, umonster: PM_HEALER,
        HBlinded: 0, HInfravision: hInfra, EInfravision: 0,
    };
    game.urace = { mnum: PM_GNOME };
    game.youmonst = { data: mons(umonnum) };
    // Dark but in line of sight: couldsee set, cansee clear.
    game.viz_array = Array.from({ length: 21 }, () => Array(80).fill(0));
    game.viz_array[5][63] = COULD_SEE;
}

function darkCat() {
    const mon = { mx: 63, my: 5, data: mons(PM_HOUSECAT) };
    assert.ok(mon.data && (mon.data.mflags3 & M3_INFRAVISIBLE),
        'fixture: housecat must be infravisible');
    return mon;
}

describe('poly infravision (Upolyd race gate)', () => {
    it('polyed gnome into dragon loses racial infravision', () => {
        assert.ok(infravision(mons(PM_GNOME)), 'fixture: gnome race has infravision');
        assert.ok(!infravision(mons(PM_BABY_BLUE_DRAGON)), 'fixture: dragon form has none');
        setupHero({ umonnum: PM_BABY_BLUE_DRAGON, hInfra: 0 });
        assert.equal(see_with_infrared(darkCat()), false);
    });

    it('human gnome keeps racial infravision without the flat', () => {
        setupHero({ umonnum: PM_HEALER, hInfra: 0 });
        assert.equal(see_with_infrared(darkCat()), true);
    });

    it('HInfravision flat grants infrared while polyed', () => {
        setupHero({ umonnum: PM_BABY_BLUE_DRAGON, hInfra: 1 });
        assert.equal(see_with_infrared(darkCat()), true);
    });

    it('human without race or flat has no infrared', () => {
        setupHero({ umonnum: PM_HEALER, hInfra: 0 });
        game.urace = { mnum: PM_HEALER }; // non-infra race stand-in
        assert.ok(!infravision(mons(PM_HEALER)), 'fixture: healer race stand-in has none');
        assert.equal(see_with_infrared(darkCat()), false);
    });
});
