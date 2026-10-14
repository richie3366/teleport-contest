import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { decl_globals_init } from '../js/decl.js';
import { status_version } from '../js/botl.js';

// C ref: sys/unix/unixmain.c main `:66` early_init (decl zeroing) then
// `:100` gh.hname = argv[0]; version.c status_version `:99-104` takes
// nh_basename(gh.hname) when versinfo asks for VI_NAME (flag.h:100).
// VERS_GAME_NAME is nowhere defined, so the basename arm is the compiled
// path. Every corpus recording shows the name "nethack" (basename of the
// recorder's argv[0]); C version.c:497 uses the same "nethack" fallback
// when hname is unset. JS left game.gh = {} so the ported showname arm
// (botl.js status_version) always took the shouldn't-happen disable path:
// scen-options-Valkyrie-50355010 step 101 pains row 23 C «nethack 5.0.0»
// vs JS «5.0.0» with versinfo=3 (VI_NUMBER|VI_NAME, topline "'versinfo'
// changed to 3.").
describe('gh.hname init feeds status_version VI_NAME (unixmain.c:100)', () => {
    it('decl init establishes hname=nethack', () => {
        resetGame();
        decl_globals_init();
        assert.equal(game.gh.hname, 'nethack');
    });

    it('versinfo=3 shows game name plus number (both indent shapes)', () => {
        resetGame();
        decl_globals_init();
        game.flags.versinfo = 3; // VI_NUMBER|VI_NAME, flag.h:99-100
        // do_statusline2 call shape (botl.c, indent TRUE).
        assert.ok(status_version(256, true).startsWith(' nethack '));
        // tty status-field call shape (indent FALSE, botl.js BL_VERS).
        assert.ok(status_version(80, false).startsWith('nethack '));
    });

    it('versinfo=1 stays number-only (no name)', () => {
        resetGame();
        decl_globals_init();
        game.flags.versinfo = 1; // VI_NUMBER
        assert.ok(!status_version(256, true).includes('nethack'));
        assert.ok(!status_version(80, false).includes('nethack'));
    });
});
