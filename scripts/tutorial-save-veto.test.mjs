import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c rhack `:3689–3694` — every key command runs
// can_do_extcmd(tlist) before ef_funct; FALSE skips the command with no
// pline (C: "can_do_extcmd() already gave a message") and the ECMD_OK
// tail still applies. can_do_extcmd `:467–476` runs the NHCB_CMD_BEFORE
// lua veto, which dat/nhlib.lua tutorial_cmd_before (`:187–193`)
// refuses for "save" (blacklist `:183–185`; registered by
// tutorial_enter on tut-1). So `S` in the tutorial is a silent no-op:
// C clears the stale topline and never prompts "Really save?".
// JS's rhack `S` arm called dosave() directly, bypassing the gate.
const CASES = [
    ["scen-tutorial-Healer-94319", 78],
    ["scen-tutorial-Caveman-94119", 146],
    ["scen-tutorial-Monk-94139", 161],
];

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

async function replayTopline(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const storage = sharedStorage();
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s || "");
    }
    const recTop = String(sess.segments[0].steps[step].screen).split("\n")[0];
    const jsTop = String(screens[step]).split("\n")[0];
    return { recTop, jsTop };
}

describe("rhack S arm runs can_do_extcmd: tutorial save veto (cmd.c:3689-3694)", () => {
    for (const [id, step] of CASES) {
        it(`${id}: step ${step} stays silent, no Really-save prompt`, { timeout: 300000 }, async () => {
            const { recTop, jsTop } = await replayTopline(id, step);
            assert.equal(recTop, "", "recorded C vetoes save in the tutorial (empty topline)");
            assert.equal(jsTop, recTop, "JS must veto S in the tutorial like C (no Really-save prompt)");
        });
    }
});

// C ref: cmd.c rhack `:3691–3693` — the can_do_extcmd veto path runs
// reset_cmd_vars(TRUE) BEFORE the shared `:3814–3816` ECMD_OK tail, so
// C's REPEAT is empty after a vetoed S (the `:3732–3737` add is
// post-gate). C do_repeat `:1643–1646` then prints Norep. JS adds
// REPEAT pre-gate (js/cmd.js rhack_repeat_command 'S'→dosave); without
// the veto-path clear a tutorial S then ^A silently re-vetoes instead
// of printing C's "no command available to repeat".
describe("rhack S veto clears REPEAT: tutorial S then ^A is Norep (cmd.c:3691-3693)", () => {
    it("scen-tutorial-Healer-94319: S then ^A prints C do_repeat :1646 Norep", { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL("../.cache/hidden/sessions/scen-tutorial-Healer-94319.session.json", import.meta.url),
        ));
        const seg = sess.segments[0];
        // Recorded tail is `S` (moves idx 77) + 4 ESCs; replay only
        // through the vetoed S, then ^A instead of the ESCs.
        assert.equal(seg.moves[77], "S", "recorded S position");
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 78) + "\x01",
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        const lastTop = String(screens[screens.length - 1]).split("\n")[0];
        assert.equal(lastTop, "There is no command available to repeat.");
    });
});
