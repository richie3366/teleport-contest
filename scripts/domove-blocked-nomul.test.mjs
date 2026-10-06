import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c domove_core `:2841-2846` — `!test_move(DO_MOVE)` without
// door_opened ends `move = 0; nomul(0)`. JS domove's blocked arms (rock
// bump, testdiag, squeeze, worm, moverock-fail) set move = 0 but skipped
// nomul(0): a stale mv-replay (multi = COLNO, mv set, run cleared) rebumped
// a wall forever once D-3567 removed the drive cap (scen-ride-Knight-94415
// froze at moves=46/qlen=128/multi=80). This test replays that segment and
// pins the Must-fix acceptance: the drive terminates and scores at least
// the pre-D-3567 matched prefix (6682 RNG / 131 screens).
const ID = "scen-ride-Knight-94415";
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

describe("domove blocked-bump teardown (hack.c:2841-2846)", () => {
    it(`${ID}: drive terminates, matched RNG prefix >= 6682, screens >= 131`, { timeout: 300000 }, async () => {
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
        const screens = (g.getScreens?.() || []).length;
        assert.ok(prefix >= 6682, `matched RNG prefix ${prefix} < 6682`);
        assert.ok(screens >= 131, `screens ${screens} < 131`);
    });
});
