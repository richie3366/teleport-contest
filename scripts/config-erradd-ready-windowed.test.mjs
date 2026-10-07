// config_erradd ready arm goes windowed (batch @9f919260b).
// C cfgfiles.c:1543–1589: the ready arm (`:1577–1589`) plines. Pre-window
// that is raw_print (configMsg sink); windowed — reachable in C via doset
// symset optfns → read_sym_file → the "symbols" frame (options.c:1366,
// :1415, :1932, :3558, :4180 → files.c:2644) — C plines paint visibly.
// JS always took configMsg (invisible in-game; D-3630 named omit). The
// windowed arm returns the display promise (D-3630 !ready-arm precedent)
// so a doset-style caller can await the paint; unlike `:1562` this arm
// has no wait_synch. Pre-fix: the windowed call returns undefined and
// paints nothing.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { config_erradd, config_error_init, config_error_done } from '../js/cfgfiles.js';
import { reset_display_messages } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';
import { initRng } from '../js/rng.js';

describe('config_erradd ready arm (batch @9f919260b)', () => {
    it('windowed: ready arm plines visibly and returns the display promise', async () => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(7);
        game.iflags = { window_inited: true };
        game.u = { ux: 0, uy: 0 };
        config_error_init(false, 'test-src', false);
        try {
            // C `:1579` — the '\n'-prefixed origline pline mores (vpline
            // `:9023`); queue the dismissing key before the paint.
            pushKey(' ');
            const r = config_erradd('Bad value');
            assert.ok(r instanceof Promise,
                'windowed ready arm returns the display promise');
            await r;
            assert.match(game._pending_message ?? '', /\* Bad value\./,
                'C `:1587` error shape painted');
            // Second error: origline already shown → single pline, no more().
            const r2 = config_erradd('Second bad');
            assert.ok(r2 instanceof Promise);
            await r2;
            assert.match(game._pending_message ?? '', /\* Second bad\./);
            assert.equal(config_error_done(), 2,
                'num_errors++ `:1577` stayed sync');
        } finally {
            // Balance the stack if an assertion threw mid-test (no-op
            // once popped: done() on an empty stack returns 0).
            config_error_done();
        }
    });

    it('pre-window: ready arm stays on the sync configMsg sink', () => {
        resetGame();
        reset_display_messages();
        resetInputState();
        game.iflags = {}; // window_inited falsy
        game._pending_message = '';
        config_error_init(false, 'test-src', false);
        try {
            const r = config_erradd('Bad value');
            assert.equal(r, undefined, 'pre-window arm is sync (no promise)');
            assert.equal(game._pending_message ?? '', '',
                'pre-window paints nothing windowed');
            assert.equal(config_error_done(), 1);
        } finally {
            config_error_done();
        }
    });
});
