import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { breamm } from '../js/mthrowu.js';
import { mons, monsterNames } from '../js/monsters.js';
import { COULD_SEE, IN_SIGHT, M_ATTK_MISS } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: mthrowu.c breamm `:1093–1150` — the mcan arm (`:1099–1108`)
// gates the cough message on plain `!Deaf` (`:1100`),
// Deaf ≡ youprop.h:125 (HDeaf || EDeaf || uroleplay.deaf), with NO
// acoustics arm: the spotted pline prints with acoustics off
// (`:1102`), unspotted silence comes from inside the live You_hear
// (`:1105`). JS read raw `u.Deaf` (zero writers) plus an invented
// `|| acoustics === false`, so a macro-deaf hero heard the cough and
// an acoustics-off hero never saw the spotted pline. Live reader:
// hero_Deaf (js/monmove.js, D-3572 pattern; its extra `|| u.Deaf` is
// dead code — zero writers — so the gate is exactly the C macro).

const PM_GNOME = monsterNames.indexOf('PM_GNOME');
assert.ok(PM_GNOME >= 0);

function setup({ hero = {}, flags = {}, spotted = true } = {}) {
    resetGame();
    reset_display_messages();
    initRng(3712);
    clear_nhwindow_message();
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        ...hero,
    };
    game.youmonst = { data: mons(monsterNames.indexOf('PM_HUMAN')) };
    game.flags = { verbose: true, acoustics: true, ...flags };
    game.fmon = [];
    game.moves = 0;
    const mx = 28;
    // cansee(head) via viz IN_SIGHT (vision.js cansee) for
    // canseemon; COULD_SEE for couldsee in linedup so the mcan
    // arm's enclosing m_lined_up passes on the hero line.
    const viz = [];
    viz[10] = [];
    viz[10][mx] = IN_SIGHT | COULD_SEE;
    game.viz_array = viz;
    return {
        mx, my: 10, mux: 30, muy: 10,
        mcan: 1, mcanmove: 1, mcansee: 1, msleeping: 0,
        mblinded: 0, minvis: spotted ? 0 : 1, mundetected: 0,
        mtame: 0, mpeaceful: 0,
        data: mons(PM_GNOME),
    };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('breamm mcan arm reads the Deaf macro, no acoustics arm (mthrowu.c:1100)', () => {
    it('spotted: non-deaf hero sees the cough pline (C :1102)', async () => {
        const mtmp = setup();
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), ['The gnome coughs.']);
    });

    it('spotted EDeaf: silent (youprop.h:125)', async () => {
        const mtmp = setup({ hero: { EDeaf: 1 } });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), []);
    });

    it('spotted HDeaf: silent (youprop.h:125)', async () => {
        const mtmp = setup({ hero: { HDeaf: 1 } });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), []);
    });

    it('spotted roleplay-deaf: silent (youprop.h:125)', async () => {
        const mtmp = setup({ hero: { uroleplay: { deaf: 1 } } });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), []);
    });

    it('spotted acoustics-off: pline still prints (C has no acoustics arm)', async () => {
        const mtmp = setup({ flags: { acoustics: false } });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), ['The gnome coughs.']);
    });

    it('unspotted: non-deaf hero hears via live You_hear (C :1105)', async () => {
        const mtmp = setup({ spotted: false });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), ['You hear a cough.']);
    });

    it('unspotted acoustics-off: silent inside You_hear (C :1105)', async () => {
        const mtmp = setup({ spotted: false, flags: { acoustics: false } });
        const ret = await breamm(mtmp, null, game.u);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), []);
    });
});
