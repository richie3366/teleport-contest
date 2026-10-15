import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// `cmd.c` phone keypad layout (`number_pad:3`): `ndir_phone_layout[] =
// "41236987><"` (`reset_commands :3347–3350`, selected `:3432–3434`) —
// digit 2 walks north, not south. scen-symset-Monk-50455043 step 97
// presses "2" with the large dog directly south of the hero: C moves
// north (distfleeck/m_move dice), while PC-layout dispatch bump-attacks
// the dog (gethungry rn2(20) + hit dice) — the distfleeck@97 writer.
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

const ID = "scen-symset-Monk-50455043";

function loadSeg() {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
    )).segments[0];
}

describe("phone-layout digit 2 walks north (distfleeck@97 writer)", () => {
    it("step-97 hero pos + RNG slice match C", { timeout: 300000 }, async () => {
        const seg = loadSeg();
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 97),
            storage: sharedStorage(),
        });
        // Mechanism: hero stepped north off (39,7); dog stays south.
        assert.equal(game.u?.ux, 39);
        assert.equal(game.u?.uy, 6);
        assert.equal(game.Cmd?.phone_layout, true);
        // Effect: JS slice head equals C (distfleeck, not gethungry).
        const norm = (e) => String(e).replace(/ @ .*$/, "");
        assert.deepEqual(
            g.getRngSlices()[97].slice(0, 4).map(norm),
            seg.steps[97].rng.slice(0, 4).map(norm),
        );
    });
});
