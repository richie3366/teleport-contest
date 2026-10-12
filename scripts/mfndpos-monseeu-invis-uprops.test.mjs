import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mon.c mfndpos `monseeu` (mon->mcansee && (!Invis || perceives))
// + youprop.h:198 (`Invis` = (HInvis||EInvis)&&!BInvis, live from uprops).
// JS read the u.Invis flat (synced only by the magic-trap toggle,
// timeout.js D-1999), missing worn-ring extrinsic
// (uprops[INVIS].extrinsic): with an invisible hero, monseeu stayed TRUE,
// so the :2339 NOTONL gate wrongly rejected every candidate in line with
// the hero for unicorns (flag NOTONL set, mon_allowflags mon.c:2123).
// scen-sweep-Caveman-582707 step 723 turn 1: the black unicorn's pass-1
// mfndpos dropped (58,6),(60,6) (cnt 2, moved (59,6)->(59,7)) where C has
// cnt 4 (->(60,6)), so pass 2 drew nothing where C draws
// `rn2(16)=8 @ m_move(monmove.c:1963)` (track-avoid skip) at index 31520.
// This test pins the cliff acceptance: the matched RNG prefix moves
// strictly past the old 31520 divergence.
const ID = "scen-sweep-Caveman-582707";
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

describe("mfndpos monseeu reads live Invis (youprop.h:198, not the flat)", () => {
    it(`${ID}: matched RNG prefix moves past 31520`, { timeout: 300000 }, async () => {
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
        assert.ok(prefix > 31520, `matched RNG prefix ${prefix} did not move past 31520`);
    });
});
