import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c nomul `:4161–4173` — clears multi_reason on nval==0 but
// never touches gn.nomovemsg. js/hack.js added a spurious
// `game.nomovemsg = null` to the nval==0 arm, so any nomul(0) between the
// lesshungry fullwarn bite (eat.c:3315 sets "You're finally finished.") and
// the done_eating finale silently ate the stored line: C prints it, JS
// printed "You finish eating ...". Ranger-51257062 trips it via the
// dosearch0 hidden-door find (detect.c:2048 nomul(0)); the sweep Monk and
// Archeologist trip it via mattacku melee (mhitu.c:513 nomul(0)).
// This test replays the Ranger segment and pins C's recorded step-301
// topline (red pre-fix with the board jsTopline, green post-fix).
const ID = "scen-extcmd-Ranger-51257062";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("nomul keeps nomovemsg (hack.c:4161-4173)", () => {
    it(`${ID}: step-301 meal finale matches C (finally finished)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 302, `screens ${screens.length} < 302`);
        // C recorded row 0 @301: «You find a hidden door.  You're finally
        // finished.» — the queued door-find line plus lesshungry's stored
        // nomovemsg, printed by done_eating's nomovemsg arm (eat.c:551-554).
        assert.ok(
            rowText(screens, 301, 0).startsWith(
                "You find a hidden door.  You're finally finished.",
            ),
            `got: ${JSON.stringify(rowText(screens, 301, 0).slice(0, 90))}`,
        );
    });
});
