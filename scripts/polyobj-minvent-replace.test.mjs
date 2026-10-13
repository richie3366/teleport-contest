import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const { objectNames } = await import("../js/generated/objects_data.js");
const { W_ARMF } = await import("../js/const.js");

// C ref: zap.c poly_obj `:1900–1903` + mkobj.c replace_object `:641–680`.
// poly_obj swaps the new object into the old one's chain via
// replace_object for EVERY location — including OBJ_MINVENT (C
// `:665–669`: otmp takes obj's minvent slot, then delobj(obj)).
// The JS port only replaced floor/invent and left minvent/contained
// otmp orphaned ("place as free"), so a monster polymorphed item was
// silently deleted instead of transformed.
//
// Manifestation (D-3916): scen-sweep-Samurai-587214, the tame dwarf's
// mintrap poly-trap step turns its worn IRON_SHOES into KICKING_BOOTS
// (trap.c `:2496–2515`, silent, no RNG). Pre-fix JS deleted the boots,
// so find_misc later saw no iron shoes and burned the dwarf on
// MUSE_POLY_TRAP (rn2(330) vs C's dochug rn2(3) at step 1045).
// This test pins the post-step-1033 minvent: kicking boots, worn.
function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => m.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("poly_obj replaces minvent items in place (zap.c:1702-1989)", () => {
    it("Samurai-587214 dwarf keeps worn boots as KICKING_BOOTS after step 1033", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Samurai-587214.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // Step 0 has the empty key; every later key is one char, so the
        // first 1033 moves-chars are exactly steps 0..1033 (state at the
        // start of step 1034, after the mintrap poly-trap turn).
        await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 1033),
            storage: freshStorage(),
        });
        // NOTE: gstate must be imported after runSegment (live state).
        const { game } = await import("../js/gstate.js");
        const KICKING_BOOTS = objectNames.indexOf("KICKING_BOOTS");
        const IRON_SHOES = objectNames.indexOf("IRON_SHOES");
        const dwarf = (game.fmon || []).find((m) => (m.mnum | 0) === 44 && m.mtame);
        assert.ok(dwarf, "tame dwarf (mnum 44) is on the level");
        const inv = [];
        for (let o = dwarf.minvent; o; o = o.nobj) inv.push(o);
        const boots = inv.find((o) => (o.otyp | 0) === KICKING_BOOTS);
        assert.ok(boots, "iron shoes polymorphed into kicking boots in minvent (not deleted)");
        assert.ok((boots.owornmask | 0) & W_ARMF, "kicking boots re-worn (W_ARMF)");
        assert.ok(!inv.some((o) => (o.otyp | 0) === IRON_SHOES), "old iron shoes replaced, not duplicated");
    });
});
