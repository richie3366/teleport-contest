import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c display_pickinv `:3181–3184` + `:3207` + the `:3262–3343`
// nextclass loop — the inventory menu iterates sortloot() order, not
// invent order: sortflags = (sortloot=='f') ? SORTLOOT_LOOT : SORTLOOT_INVLET
// (+ SORTLOOT_PACK when sortpack), one pass per inv_order class with a
// header on the first listed item. JS listed game.invent order grouped by
// class, so sortloot:full sessions showed the wrong within-class order
// (e.g. trap-Valkyrie-94361 step 24: JS `a - spear` first where C sorts
// `b - dagger` first by loot_xname; quest-Ranger-94236 step 296: C sorts
// arrows < bow < darts < dagger by loot_classify weapon subclass).
// This test pins the sortloot:full order on the recorded `i` screens.
function loadSession(id) {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
}

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

async function replayScreens(sess) {
    // Multi-segment sessions share one VFS (save/restore across
    // segments), like ps_test_runner; screens concatenate in order.
    const storage = sharedStorage();
    const out = [];
    for (const seg of sess.segments || []) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves, storage,
        });
        out.push(...(g.getScreens?.() || []));
    }
    return out;
}

function inventScreens(screens) {
    return screens.filter((s) => s.includes("Weapons") && s.includes("(end)"));
}

describe("display_pickinv sortloot:full order (invent.c:3181+3207+3262)", () => {
    it("trap-Valkyrie-94361: dagger sorts before spear (loot_xname)", { timeout: 120000 }, async () => {
        const screens = inventScreens(await replayScreens(loadSession("scen-trap-Valkyrie-94361")));
        assert.ok(screens.length >= 1, "no inventory screen replayed");
        for (const s of screens) {
            const dagger = "b - a blessed +0 dagger (alternate weapon; not wielded)";
            const spear = "a - a +1 spear (weapon in right hand)";
            assert.ok(s.includes(dagger), "dagger row missing");
            assert.ok(s.includes(spear), "spear row missing");
            assert.ok(s.indexOf(dagger) < s.indexOf(spear),
                "invent order leaked: spear listed before dagger");
        }
    });

    it("quest-Ranger-94236: arrows < bow < darts < dagger (subclass)", { timeout: 180000 }, async () => {
        const screens = inventScreens(await replayScreens(loadSession("scen-quest-Ranger-94236")));
        assert.ok(screens.length >= 1, "no inventory screen replayed");
        const rows = [
            "c - 52 +2 orcish arrows",
            "d - 33 +0 orcish arrows",
            "b - a +1 orcish bow (alternate weapon; not wielded)",
            "i - 19 +0 darts (at the ready)",
            "a - a +1 orcish dagger",
        ];
        for (const s of screens) {
            const pos = rows.map((r) => {
                assert.ok(s.includes(r), `row missing: ${r}`);
                return s.indexOf(r);
            });
            for (let i = 1; i < pos.length; i++) {
                assert.ok(pos[i - 1] < pos[i],
                    `subclass order broken: ${rows[i - 1]} not before ${rows[i]}`);
            }
        }
    });
});
