import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C end.c panic `:394–480` under the pinned recorder: raw_print
// "\r\nOops..." (NOMUX raw shadow: clear, row 1, cursor (0,2)), then
// wait_synch → getret → xwaitforspace(" "): every other key re-captures
// the same screen; space / return / ESC returns and the CRASHREPORT
// build's NH_abort ends the process with no further capture. Measured on
// the C recorder (seed 95230 rc, moves "  #panic\nyes\nab cd" → 16 steps,
// steps 13–15 "\nOops..." @ [0,2]; the ESC variant likewise ends at 16).
// Pre-fix every C panic site was a bare JS throw: runSegment rejected and
// the judge voided the whole session (D-3733 / D-3767 / D-3768).
const RC_95230 = "OPTIONS=name:Indiana,role:Archeologist,race:dwarf,gender:female,align:neutral\nOPTIONS=!legacy,!splash_screen,!tutorial\nOPTIONS=suppress_alert:3.4.3\nOPTIONS=symset:DECgraphics\nOPTIONS=!autopickup\nOPTIONS=runmode:walk\nOPTIONS=playmode:debug\n";

async function run(moves) {
    const g = await runSegment({
        seed: 95230, datetime: "20001013090000", nethackrc: RC_95230, moves,
        storage: undefined,
    });
    return { screens: g.getScreens(), cursors: g.getCursors() };
}

function rows(screen) {
    return decodeScreen(screen).map((r) => r.map((c) => c.ch).join("").trimEnd());
}

function assertOops(screen, cursor, label) {
    const r = rows(screen);
    assert.equal(r[0], "", `${label}: row 0 blank`);
    assert.equal(r[1], "Oops...", `${label}: row 1`);
    for (let i = 2; i < 24; i++) assert.equal(r[i], "", `${label}: row ${i} blank`);
    assert.deepEqual(cursor.slice(0, 2), [0, 2], `${label}: cursor`);
}

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
    });
    return { seg, screens: g.getScreens(), cursors: g.getCursors() };
}

describe("panic: Oops raw print + getret wait (end.c:394–480)", () => {
    it("#panic yes: Oops screen, other keys re-capture, space ends", { timeout: 60000 }, async () => {
        const { screens, cursors } = await run("  #panic\nyes\nab cd");
        assert.equal(screens.length, 16, "C stops capturing at the space");
        for (const i of [13, 14, 15]) assertOops(screens[i], cursors[i], `step ${i}`);
    });

    it("#panic yes: ESC dismisses getret too", { timeout: 60000 }, async () => {
        const { screens, cursors } = await run("  #panic\nyes\nab\u001bcd");
        assert.equal(screens.length, 16);
        assertOops(screens[15], cursors[15], "step 15");
    });

    it("panic() latch: NhPanic carries the message; a re-entry aborts", async () => {
        const { panic, NhPanic } = await import("../js/end.js");
        const { game } = await import("../js/gstate.js");
        const saved = game.program_state;
        game.program_state = {};
        try {
            assert.throws(() => panic("level number out of range [ledger_to_dnum(%d)]", -1),
                (e) => e instanceof NhPanic && !e.abort
                    && e.message === "level number out of range [ledger_to_dnum(-1)]");
            assert.throws(() => panic("again"), (e) => e instanceof NhPanic && e.abort);
            assert.equal(game.program_state.panicking, 2);
        } finally {
            game.program_state = saved;
        }
    });

    it("C-crash corpus 95230: replays to the recorded Oops tail", { timeout: 180000 }, async () => {
        const { seg, screens, cursors } = await replay("scen-worldtour-Archeologist-95230");
        assert.equal(screens.length, seg.steps.length);
        for (const i of [278, seg.steps.length - 1]) assertOops(screens[i], cursors[i], `step ${i}`);
    });

    it("C-crash corpus 95244: statue-trap donor square repainted (step 281)", { timeout: 180000 }, async () => {
        // mk_trap_statue's temporary makemon donor lands on the up stairs
        // (34,10); C mon_leaving_level `:2725` newsym repaints '<' there.
        // Pre-fix the clone skipped it and the donor's 'T' stayed painted.
        const { seg, screens, cursors } = await replay("scen-worldtour-Wizard-95244");
        assert.equal(rows(screens[281])[10].slice(32, 46), "│^<··········│");
        assertOops(screens[seg.steps.length - 1], cursors[seg.steps.length - 1], "last step");
    });
});
