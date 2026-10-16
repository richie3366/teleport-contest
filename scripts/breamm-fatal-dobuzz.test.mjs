import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { breamm } from '../js/mthrowu.js';
import { mons, monsterNames } from '../js/monsters.js';
import { M_ATTK_HIT, ROOM } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: mthrowu.c breamm `:1093–1150` — dobuzz `:1122–1127` may kill
// the hero via losehp → done(DIED), and done() never returns: C never
// reaches the `:1132` mspec gate, the AD_SLEE bump, or the pet-hunger
// arm on the fatal path. JS done() returns, so breamm must check
// program_state.gameover after dobuzz and return M_ATTK_HIT without
// further draws (file-local losehp idiom, cf thitu mthrowu.js:1321).
// Missing the check voided one RNG draw per fatal breath:
// scen-chain-Tourist-50550074 seg7 ends
// breamm-gate rn2(3)@mthrowu.c:1117, dobuzz rn2(7), zap_hit rn2(20),
// can_make_bones rn2(1) — then C seg8 o_init while JS drew one more
// rn2(3) from breamm(mthrowu.js:520), shifting the whole tail (the
// scorer attributes the shift to randomize_gem_colors o_init.c:89).
const AD_FIRE = 2; // monattk.h (module-local in mondata.js/zap.js)
const PM_DRAGON = (() => {
    const d = monsterNames.indexOf('PM_RED_DRAGON');
    return d >= 0 ? d : monsterNames.indexOf('PM_GNOME');
})();
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(PM_DRAGON >= 0 && PM_HUMAN >= 0);

function setup() {
    resetGame();
    reset_display_messages();
    resetInputState();
    pushKeys(Array(10).fill('\n'));
    initRng(16);
    enableRngLog(); // core draws are unlogged unless enabled (rng.js)
    // Seed 16 breathes all the way: lineup rn2(2), gate rn2(3)=1,
    // dobuzz range, :520 rn2(3)=0 → mspec_used = 8+rn2(18) set.
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.flags = { verbose: false };
    // Hero stands off the (mux,muy) mark so linedup takes the
    // clear_path arm (couldsee needs real vision); the beam from
    // (5,8) toward (5,5) never touches (6,6), so dobuzz is harmless.
    game.u = { ux: 6, uy: 6, uhp: 100, uhpmax: 100 };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.fmon = [];
    game.moves = 10;
    game.viz_array = [];
    game.bhitpos = { x: 6, y: 6 };
    game._tbx = 0;
    game._tby = 0; // beam range 1: dobuzz draws but hits nothing
    game.level = { at: () => ({ typ: ROOM }), traps: [] };
    const mtmp = {
        mx: 5, my: 8, mux: 5, muy: 5,
        data: mons(PM_DRAGON),
        mcan: 0, mspec_used: 0, mtame: 0,
        seen_resistance: 0, minvent: [],
        mcansee: 1, mblinded: 0, mcanmove: 1, msleeping: 0,
    };
    return { mtmp, mattk: { adtyp: AD_FIRE, damn: 1 } };
}

describe('breamm fatal-dobuzz continuation', () => {
    it('breathes normally when the hero lives (control)', async () => {
        const { mtmp, mattk } = setup();
        const n0 = getRngLog().length;
        const ret = await breamm(mtmp, mattk, game.youmonst);
        const draws = getRngLog().length - n0;
        assert.equal(ret, M_ATTK_HIT);
        assert.ok(draws > 1, `control breath draws past dobuzz (got ${draws})`);
        assert.ok(mtmp.mspec_used, 'control breath sets mspec_used');
    });

    it('returns HIT with no post-dobuzz draws when the hero is dead', async () => {
        const { mtmp, mattk } = setup();
        game.program_state = { ...(game.program_state ?? {}), gameover: true };
        const n0 = getRngLog().length;
        const ret = await breamm(mtmp, mattk, game.youmonst);
        const fatalDraws = getRngLog().length - n0;
        assert.equal(ret, M_ATTK_HIT);
        assert.ok(!mtmp.mspec_used, 'fatal breath sets no mspec_used');

        const c = setup();
        const c0 = getRngLog().length;
        await breamm(c.mtmp, mattk, game.youmonst);
        const controlDraws = getRngLog().length - c0;
        assert.ok(
            fatalDraws < controlDraws,
            `fatal draws (${fatalDraws}) < control draws (${controlDraws})`,
        );
    });
});
