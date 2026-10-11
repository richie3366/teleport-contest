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

describe("domove autodig tunnels-chain skip (hack.c test_move :1037-1048)", () => {
    // C's obstructed chain is else-if: when the tunnels arm matches
    // (tunnels && !needspick, :1037) but still_chewing returns FALSE
    // (chewed through this move), the :1042 autodig arm is skipped and
    // test_move returns TRUE (:1253). JS fired use_pick_axe2 on the stale
    // destTyp there (review 2702). Scenario: the D-3839 probe position
    // (Wizard-578213@482: pick wielded, autodig on, bumping the (2,17)
    // wall from (3,17)) re-run as a tunnels polyform mid-chew.
    async function chewSetup({ effort }) {
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
        const { mons, monsterNames } = await import("../js/monsters.js");
        const { is_pick } = await import("../js/objects.js");
        assert.ok(is_pick(game.u.uwep), "precondition: pick-axe wielded");
        assert.ok(game.flags?.autodig, "precondition: autodig on");
        assert.deepEqual([game.u.ux, game.u.uy], [3, 17]);
        game.context.run = 0;
        game.context.nopick = 0;
        // Poly into a tunnels&&!needspick form (umber hulk,
        // monsters.h:2275) with a chew in progress at (2,17).
        const PM_UMBER_HULK = monsterNames.indexOf("PM_UMBER_HULK");
        assert.ok(PM_UMBER_HULK > 0);
        game.u.umonnum = PM_UMBER_HULK;
        game.youmonst.data = mons(PM_UMBER_HULK);
        game.context.digging = effort === null ? {}
            : {
                chew: true, pos: { x: 2, y: 17 },
                level: { dnum: game.u.uz.dnum, dlevel: game.u.uz.dlevel },
                effort,
            };
        // The 482-prefix ends with its own "You start digging." topline
        // and getmsghistory re-snapshots the whole live ring: clear the
        // display history so the test reads only the final domove's
        // messages (domove-bump-wall-angle-stone.test.mjs precedent).
        const { reset_display_messages } = await import("../js/display.js");
        reset_display_messages();
        return game;
    }

    async function domoveWest() {
        const { domove } = await import("../js/cmd.js");
        await domove(-1, 0);
        const { getmsghistory } = await import("../js/display.js");
        const seen = [];
        for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
            seen.push(m?.text ?? String(m));
        }
        return seen;
    }

    it("chew-through moves on, no dig occupation (review 2702)", { timeout: 180000 }, async () => {
        const game = await chewSetup({ effort: 1000 });
        const seen = await domoveWest();
        assert.ok(seen.some((t) => t.includes("chew a hole in the wall.")),
            `no chew-through; last: ${JSON.stringify(seen.slice(-3))}`);
        assert.ok(!seen.some((t) => t.includes("You start digging.")),
            `autodig fired on chew-through: ${JSON.stringify(seen.slice(-3))}`);
        assert.ok(!game.context.digging?.chew, "dig occupation started on chew-through");
        assert.deepEqual([game.u.ux, game.u.uy], [2, 17]);
    });

    it("still-chewing tunnels bump stays a chew, not a dig (control)", { timeout: 180000 }, async () => {
        const game = await chewSetup({ effort: null });
        const seen = await domoveWest();
        assert.ok(seen.some((t) => t.includes("start chewing")),
            `no fresh chew; last: ${JSON.stringify(seen.slice(-3))}`);
        assert.ok(!seen.some((t) => t.includes("You start digging.")),
            `autodig fired on tunnels chew: ${JSON.stringify(seen.slice(-3))}`);
        assert.deepEqual([game.u.ux, game.u.uy], [3, 17]);
    });
});
