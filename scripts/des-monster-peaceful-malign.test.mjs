import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c create_monster `:2125–2129` (`mtmp->female = m->female;
// if (m->peaceful > BOOL_RANDOM) { mtmp->mpeaceful = m->peaceful;
// set_malign(mtmp); }`). Six loader-local des-monster helpers overrode
// mpeaceful without the set_malign re-run, leaving birth malign stale.
// scen-worldtour-Wizard-587319: the wiz_strt des bat (peaceful=0) was
// born peaceful (malign −9) and stayed −9, so its xkilled
// adjalign(malign) put record at −11 where C re-ran set_malign (+3 → +1)
// and peace_minded drew rn2(17) instead of rn2(5).
const ID = "scen-worldtour-Wizard-587319";
const KILL_STEP = 347; // "You kill the bat!"

describe("des-monster peaceful override re-runs set_malign (sp_lev.c:2128-2129)", () => {
    it(`${ID}: record is +1 after the des-bat kill, not −11`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const seg = sess.segments[0];
        const mem = new Map();
        const storage = {
            getItem: (k) => (mem.has(k) ? mem.get(k) : null),
            setItem: (k, v) => mem.set(k, String(v)),
            removeItem: (k) => mem.delete(k),
            get length() { return mem.size; },
            key: (i) => [...mem.keys()][i] ?? null,
        };
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, KILL_STEP + 1),
            storage,
        });
        assert.equal(
            game.u?.ualign?.record | 0, 1,
            "record after the des-bat kill must match C (+1 via re-run malign +3)",
        );
    });
});
