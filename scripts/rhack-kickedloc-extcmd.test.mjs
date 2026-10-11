import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c rhack `:3819–3826` — after a command that takes time,
// func != dokick resets gk.kickedloc so pets stop avoiding the
// last-kicked square. JS rhack's `#` branch set context.move but never
// cleared kickedloc: scen-sweep-Rogue-578129 kicks (68,4) at step 131,
// then #dip takes the turn at step 138 while kickedloc stays (68,4),
// so the pet's dog_move skips (68,4) via m_avoid_kicked_loc and draws
// rn2(12) where C (cleared before monmove) evaluates the square and
// draws rn2(2) (dogmove.c:1255, moves=205).
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

describe("rhack # extcmd clears kickedloc on ECMD_TIME (cmd.c :3819-3826)", () => {
    it("timed #dip after a kick resets kickedloc before monmove", { timeout: 180000 }, async () => {
        const path = new URL("../.cache/hidden/sessions/scen-sweep-Rogue-578129.session.json", import.meta.url);
        assert.ok(existsSync(path), "missing session; record it with hidden-proxy record");
        const sess = JSON.parse(readFileSync(path, "utf8"));
        const seg = sess.segments[0];
        // moves[i] feeds step i+1 (step 0 is input-free): through step
        // 138 — kick (68,4) at 130-131, #dip dialog 132-137, dip
        // completes (takes time) at 138.
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: (seg.moves || "").slice(0, 138),
            storage: sharedStorage(),
        });
        const { game } = await import("../js/gstate.js");
        assert.deepEqual(
            [game.kickedloc?.x | 0, game.kickedloc?.y | 0, game.moves | 0],
            [0, 0, 206],
        );
    });
});
