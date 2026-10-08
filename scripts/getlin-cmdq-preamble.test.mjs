import { it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { getlin } from '../js/getline.js';
import { CMDQ_KEY, CMDQ_INT } from '../js/const.js';
import { reset_display_messages, install_tty_wincap2, get_saved_pline } from '../js/display.js';
import { resetInputState, pushKeys } from '../js/input.js';

// C ref: windows.c getlin `:1868–1902`. `:1875–1889` cmdq preamble drains
// CMDQ_KEY bytes into the answer (newline terminates like C's `'\0'`
// store, never appended; a non-KEY node or an empty queue ends the
// drain; every popped node is consumed — C `free`s each) and `:1891–1895`
// echoes `pline("%s %s", query, answer)` + early return without touching
// bot_disabled or in_getlin. `:1897–1901` in_getlin envelope wraps the
// win_getlin prompt loop (set before bot_disabled, cleared after).

function setup() {
    resetGame();
    reset_display_messages();
    resetInputState();
    initRng(4242);
    game.iflags = { window_inited: true };
    game.windowprocs = {};
    install_tty_wincap2();
    game.program_state = {};
    game._preNhgetchHook = null;
}

function keyNode(ch) {
    return { typ: CMDQ_KEY, key: ch };
}

it('KEY bytes drain to newline, echo pline, early return; rest stays queued', async () => {
    setup();
    game._cmdq_canned = [keyNode('f'), keyNode('r'), keyNode('e'),
        keyNode('d'), keyNode('\n'), keyNode('z')];
    const ans = await getlin('What do you want to call?');
    assert.equal(ans, 'fred');
    // Newline consumed like every popped node; the drain stopped there.
    assert.equal(game._cmdq_canned.length, 1);
    assert.equal(game._cmdq_canned[0].key, 'z');
    assert.equal(get_saved_pline(0), 'What do you want to call? fred');
    // C's early path never sets the envelope or bot_disabled.
    assert.ok(!game.program_state.in_getlin);
});

it('non-KEY node ends the drain and is consumed (C free)', async () => {
    setup();
    game._cmdq_canned = [keyNode('a'), { typ: CMDQ_INT, intval: 3 }, keyNode('b')];
    const ans = await getlin('Q?');
    assert.equal(ans, 'a');
    assert.equal(game._cmdq_canned.length, 1);
    assert.equal(game._cmdq_canned[0].key, 'b');
    assert.equal(get_saved_pline(0), 'Q? a');
});

it('empty queue runs the prompt loop inside the in_getlin envelope', async () => {
    setup();
    let saw = null;
    game._preNhgetchHook = async () => {
        if (saw === null) saw = game.program_state.in_getlin;
    };
    pushKeys(['\r']);
    const ans = await getlin('Name?');
    assert.equal(ans, '');
    assert.equal(saw, 1);
    assert.equal(game.program_state.in_getlin, 0);
    game._preNhgetchHook = null;
});
