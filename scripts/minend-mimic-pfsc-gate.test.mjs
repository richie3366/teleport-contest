import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");
const { M_AP_TYPE, M_AP_NOTHING, PROT_FROM_SHAPE_CHANGERS } = await import("../js/const.js");

// D-3788: C sp_lev.c:2002-2006 refuses des MONSTER appear_as while the hero
// has Protection_from_shape_changers. scen-sweep-Wizard-95314 wears a wished
// ring of protection from shape changers (donned step 260, still worn); its
// Mines End stone mimics (load_minend_1 placeMimicAs) must stay undisguised.
// C-dumped: monB id=344 m_ap_type=0 at moves=125; JS set m_ap_type=2 at birth
// (moves=124), so restrap never drew and step 646 diverged (C rn2(3)=0 in
// restrap vs JS mcalcmove). Pre-fix: all 4 mimics M_AP_OBJECT (red).
// Step/key alignment: step N replays moves[N-1] (step 0 is the header), so
// slice(0,645) stops after step 645, immediately before step 646's 's'.
async function replayTo(nkeys) {
    const recipe = JSON.parse(readFileSync(
        new URL("../hidden-corpus/recipes/scen-sweep-Wizard-95314.recipe.json", import.meta.url),
    ));
    const seg = recipe.segments[0];
    const storage = new Map();
    await runSegment({
        seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
        moves: (seg.moves || "").slice(0, nkeys),
        storage: {
            getItem: (k) => (storage.has(k) ? storage.get(k) : null),
            setItem: (k, v) => storage.set(k, String(v)),
            removeItem: (k) => storage.delete(k),
            get length() { return storage.size; },
            key: (i) => [...storage.keys()][i] ?? null,
        },
    });
    return gstate.game;
}

describe("create_monster appear_as PfSC gate (D-3788)", () => {
    it("95314 @645: protected hero leaves minend stone mimics undisguised", { timeout: 180000 }, async () => {
        const game = await replayTo(645);
        const u = game.u || {};
        const prot = u.uprops?.[PROT_FROM_SHAPE_CHANGERS];
        assert.ok(
            ((prot?.intrinsic | 0) || (prot?.extrinsic | 0)),
            "premise: hero has Protection_from_shape_changers (worn ring)",
        );
        const mimics = (game.fmon || []).filter((m) => m.data?.mlet === "S_MIMIC");
        assert.equal(mimics.length, 4, "four minend stone mimics on the level");
        for (const m of mimics) {
            assert.equal(
                M_AP_TYPE(m), M_AP_NOTHING,
                `mimic id=${m.m_id} undisguised under protection (C ap=0)`,
            );
        }
    });
});
