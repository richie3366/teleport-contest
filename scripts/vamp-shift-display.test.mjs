import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import {
    pline,
    clear_nhwindow_message,
    getmsghistory,
    display_nhwindow_message,
} from "../js/display.js";
import { pushKeys, resetInputState, nhgetch } from "../js/input.js";

// D-3845 — wintty.c tty_display_nhwindow NHW_MESSAGE arm (`:1873–1882`),
// as called from monmove.c vamp_shift `:2391`: NEED_MORE blocks at
// more() (the vamp_shift display call is NOT a no-op — C tty ignores
// the blocking flag for the message window), then the topline clears
// to EMPTY; the pre-more text stays in ^P history (C remembers it at
// the next message; JS more()/clear wipe _toplines so the arm flushes
// the ring first). No map flush happens at the block (C more() never
// flushes) — pinned by scen-worldtour-Healer-578136 SEQ 633 (stale map
// + `--More--`), which verify --fn flooreffects covers.
describe("display_nhwindow_message (wintty.c NHW_MESSAGE arm)", () => {
    let savedIflags;
    let savedU;
    beforeEach(() => {
        initRng(632);
        savedIflags = game.iflags;
        savedU = game.u;
        game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
        game.u = { ...(game.u ?? {}), ux: 25, uy: 8 };
        clear_nhwindow_message();
        resetInputState();
    });
    afterEach(() => {
        game.iflags = savedIflags;
        game.u = savedU;
        resetInputState();
    });

    it("NEED_MORE: blocks for exactly one key, clears topline, keeps history", async () => {
        await pline("The vrock bites!");
        pushKeys([" "]);
        await display_nhwindow_message();
        assert.equal(game._pending_message, "");
        const seen = [];
        for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
            seen.push(m);
        }
        assert.ok(seen.some((m) => m.includes("The vrock bites!")));
    });

    it("EMPTY: no block, consumes no key", async () => {
        pushKeys(["Z"]);
        await display_nhwindow_message();
        assert.equal(game._pending_message, "");
        // The pushed key must still be queued (display consumed nothing).
        assert.equal(await nhgetch(), 90); // 'Z'
    });
});
