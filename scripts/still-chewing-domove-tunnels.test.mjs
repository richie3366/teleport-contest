import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c test_move :1037–1042 — a tunneling polyform eats
// obstructed rock via still_chewing. scen-sweep-Barbarian-95329 step
// 1164: the poly'd umber hulk bumps HWALL at (50,6); C prints "You
// start chewing a hole in the rock." JS bumped silently
// (mention_walls false) — domove only chewed IRONBARS (D-1270) and
// never called still_chewing for rock.
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

describe("domove tunnels rock chew (hack.c test_move :1037-1042)", () => {
    it("umber hulk starts chewing rock, not a silent bump", { timeout: 180000 }, async () => {
        const path = new URL("../.cache/hidden/sessions/scen-sweep-Barbarian-95329.session.json", import.meta.url);
        assert.ok(existsSync(path), "missing session; record it with hidden-proxy record");
        const sess = JSON.parse(readFileSync(path, "utf8"));
        const seg = sess.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: (seg.moves || "").slice(0, 1164),
            storage: sharedStorage(),
        });
        const { game } = await import("../js/gstate.js");
        const { getmsghistory } = await import("../js/display.js");
        const seen = [];
        for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
            seen.push(m?.text ?? String(m));
        }
        assert.ok(seen.some((t) => t.includes("You start chewing a hole in the rock.")),
            `no chew message; last: ${JSON.stringify(seen.slice(-3))}`);
        assert.equal(game.context?.digging?.chew, true);
        assert.deepEqual([game.context.digging.pos.x, game.context.digging.pos.y], [50, 6]);
        assert.deepEqual([game.u.ux, game.u.uy], [49, 7]);
    });
});
