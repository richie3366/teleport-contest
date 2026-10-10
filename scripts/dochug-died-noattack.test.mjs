import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `monmove.c` dochug: C's PHASE THREE switch ends
// `case MMOVE_DIED: return 1` (monmove.c:956-957) — a monster whose
// m_move reported DIED (postmov maps trap-moved/killed to DIED) never
// reaches PHASE FOUR. JS fell through and attacked.
//
// scen-worldtour-Ranger-95231 step 609: the warhorse's m_move returns
// DIED both sides (no post-move distfleeck recalc draw either side)
// with the horse alive at (29,6); C ends the turn (empty topline,
// HP 36), JS attacked (kick+bite, HP 36->31) and diverged RNG.
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

async function replayPrefix(id, nkeys) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves.slice(0, nkeys),
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

describe("dochug DIED: no PHASE FOUR attack after m_move reports DIED", () => {
    it("scen-worldtour-Ranger-95231 step 609: empty topline, no warhorse attack", { timeout: 300000 }, async () => {
        const screens = await replayPrefix("scen-worldtour-Ranger-95231", 609);
        assert.ok(screens.length > 609, `only ${screens.length} screens`);
        const row0 = decodeScreen(screens[609])[0].map((c) => c.ch).join("").trimEnd();
        // C recorded topline at step 609 (warhorse moved 30->29, no attack).
        assert.equal(row0, "");
    });

    it("scen-worldtour-Ranger-95231 step 609: HP unharmed (36), not kicked+bitten (31)", { timeout: 300000 }, async () => {
        const screens = await replayPrefix("scen-worldtour-Ranger-95231", 609);
        assert.ok(screens.length > 609, `only ${screens.length} screens`);
        const srow = decodeScreen(screens[609])[23].map((c) => c.ch).join("");
        // C recorded status at step 609; the buggy attack dealt 5 (HP 31).
        assert.match(srow, /HP:36\(90\)/);
    });
});
