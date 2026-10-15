import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";
import { monsterNames } from "../js/monsters.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: restore.c getlev ghostly (`mtmp->mpeaceful =
// (is_unicorn(mtmp->data) && sgn(u.ualign.type) == sgn(maligntyp))) ? 1
// : peace_minded(mtmp->data)`) + mondata.h:149 (`is_unicorn(ptr) =
// mlet S_UNICORN && likes_gems`). JS tested mlet alone, so a restored
// pony/horse (S_UNICORN, no jewels) shortcut to peaceful without the
// peace_minded call — missing its rn2 draws. scen-chain-Knight-50456514
// seg1 loads bones with the ex-pet pony: C draws rn2(26)=18,rn2(2)=0
// (hostile), JS drew nothing and ran into enexto next.
const ID = "scen-chain-Knight-50456514";
const PONY = monsterNames.indexOf("PM_PONY");

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

describe("bones ghostly peace uses is_unicorn, not mlet (restore.c getlev)", () => {
    it(`${ID}: restored pony is hostile like C (peace_minded consulted)`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        assert.ok(PONY >= 0, "PM_PONY in monsterNames");
        const storage = sharedStorage();
        // seg0: Knight life (writes the bones). seg1 prefix: answer
        // "Get bones?" (restore runs) and stop at "Unlink bones?".
        for (let si = 0; si <= 1; si++) {
            const seg = sess.segments[si];
            const moves = si === 0 ? seg.moves : seg.moves.slice(0, 12);
            await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves, storage,
            });
        }
        const fmon = game.fmon || [];
        const pony = fmon.find((m) => (m.data?.mndx ?? m.mnum) === PONY);
        assert.ok(pony, "bones pony restored to fmon");
        assert.equal(
            pony.mpeaceful | 0, 0,
            "pony mpeaceful must be hostile (C peace_minded rn2(26)=18,rn2(2)=0), not shortcut-peaceful",
        );
    });
});
