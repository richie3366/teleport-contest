import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c test_move :1042–1048 MRKR — autodig when moving into
// obstructed rock while wielding a pick-axe (use_pick_axe2 sets the dig
// occupation). scen-sweep-Wizard-578213 step 482: the hero wielding the
// pick-axe bumps VWALL at (2,17); C prints "You start digging." JS
// bumped silently (mention_walls false) — domove never called
// use_pick_axe2 for rock (D-3819 tunnels precedent).
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

describe("domove autodig rock bump (hack.c test_move :1042-1048)", () => {
    it("wielded pick starts digging into rock, not a silent bump", { timeout: 180000 }, async () => {
        const path = new URL("../.cache/hidden/sessions/scen-sweep-Wizard-578213.session.json", import.meta.url);
        assert.ok(existsSync(path), "missing session; record it with hidden-proxy record");
        const sess = JSON.parse(readFileSync(path, "utf8"));
        const seg = sess.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: (seg.moves || "").slice(0, 482),
            storage: sharedStorage(),
        });
        const { game } = await import("../js/gstate.js");
        const { getmsghistory } = await import("../js/display.js");
        const seen = [];
        for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
            seen.push(m?.text ?? String(m));
        }
        assert.ok(seen.some((t) => t.includes("You start digging.")),
            `no start-digging message; last: ${JSON.stringify(seen.slice(-3))}`);
        assert.deepEqual([game.context.digging.pos.x, game.context.digging.pos.y], [2, 17]);
        assert.deepEqual([game.u.ux, game.u.uy], [3, 17]);
    });
});
