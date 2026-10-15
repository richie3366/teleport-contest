import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c domove_core `:2780-2781` — `u.ux0 = u.ux; u.uy0 = u.uy;`
// runs AFTER the early-return gates (carrying_too_much, air_turbulence,
// impaired_movement, water_turbulence, move_out_of_bounds,
// avoid_running_into_trap_or_liquid, escape_from_sticky_mon, the run
// gate), just before bhitpos `:2782-2783`. JS wrote ux0/uy0 at domove
// top, so a failed/spent move clobbered the previous-turn position that
// C keeps — and every ux0 reader (thrwmu URETREATING, displacer-beast
// mux gate, trap conjoined_pits) computed from the wrong square. This
// test replays the thrwmu cliff probe and pins the acceptance: JS must
// draw the C retreat-gate `rn2(6)=2 @ thrwmu(mthrowu.c:1258)` at the
// same strict-prefix position (index 16744; the frozen runner reports
// 17094/18310 because it realigns and counts later matches, but the
// first divergence is at strict index 16744), not skip to monshoot.
const ID = "scen-shop-Priest-50159010";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];

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

describe("domove ux0/uy0 written after the early-return gates (hack.c:2780-2781)", () => {
    it(`${ID}: matched RNG prefix past the thrwmu gate draw`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const gotDraws = (g.getRngLog?.() || []).map(strip);
        const wantDraws = [];
        for (const st of seg.steps) for (const d of (st.rng || [])) wantDraws.push(strip(d));
        let prefix = 0;
        while (prefix < gotDraws.length && prefix < wantDraws.length
            && gotDraws[prefix] === wantDraws[prefix]) prefix++;
        assert.ok(prefix > 16744, `matched RNG prefix ${prefix} <= 16744 (C gate draw rn2(6)=2 not reached)`);
    });
});
