import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c freeinv_core `:1383` set_artifact_intrinsic(obj, 0, W_ART)
// + artifact.c `:880-885` — freeing an artifact whose invoked property
// toggle is still on re-invokes to turn it off (rnz(100) + float_down).
// JS splits the arm: sync freeinv_core + async revoke_invoked_property,
// awaited by the dropx/zap-poly envelopes (D-2378). Two async
// freeinv-equivalent paths missed the envelope: bones.c drop_upon_death
// (death-drops shift invent without freeinv) and nhlua.c nhl_gamestate
// restore (useupall_gamestate subset). C draws rnz(100) + "You float
// gently ..." where JS drew the next drop/levelgen call (arti_invoke
// cliff row: scen-sweep-Tourist-49956023 s482, scen-wish-Barbarian-49959107
// s203, scen-worldtour-Wizard-50850040 s354).
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

function stripAnsi(s) {
    return String(s)
        .replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
        .replace(/[\u000e\u000f]/g, "");
}

async function replayTo(id, nsteps) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const storage = sharedStorage();
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves.slice(0, nsteps), storage,
    });
    return g.getScreens?.() || [];
}

describe("freed invoked artifacts revoke (artifact.c:880-885 envelopes)", () => {
    it("death-drops revoke: Tourist-49956023 step 482 floats down like C", { timeout: 300000 }, async () => {
        const screens = await replayTo("scen-sweep-Tourist-49956023", 482);
        assert.equal(screens.length, 482 + 1, "replay reaches step 482");
        const text = stripAnsi(String(screens[482]));
        assert.ok(text.includes("You float gently to the headstone"), "step-482 screen must show the revoke float-down");
    });
    it("gamestate restore revokes: Wizard-50850040 step 354 floats down like C", { timeout: 300000 }, async () => {
        const screens = await replayTo("scen-worldtour-Wizard-50850040", 354);
        assert.equal(screens.length, 354 + 1, "replay reaches step 354");
        const text = stripAnsi(String(screens[354]));
        assert.ok(text.includes("You float gently to the floor"), "step-354 screen must show the revoke float-down");
    });
});
