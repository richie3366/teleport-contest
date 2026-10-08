import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: detect.c mfind0 `:1984–1987` — the via_warning danger-sense arm
// ends with `display_nhwindow(WIN_MESSAGE, FALSE)`, which pages --More--
// (wintty.c:1873–1884, toplin NEED_MORE → more()) BEFORE mundetected is
// cleared and newsym runs. In scen-quest-Healer-94396 C's step-64 screen
// shows the danger-sense topline over the pre-reveal map (warning digit
// `1` at the hidden piranha cell); only the step-65 screen (after the ack,
// "You find a piranha.") shows `;`. JS omitted the flush, so its step-64
// capture already showed the post-newsym `;` (D-3656). This test replays
// that segment and pins C's step-64/65 toplines and piranha row.
const ID = "scen-quest-Healer-94396";
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

describe("mfind0 via_warning message flush (detect.c:1987)", () => {
    it(`${ID}: step-64 danger-sense page keeps the warning digit`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 66, `screens ${screens.length} < 66`);
        assert.equal(
            rowText(screens, 64, 0),
            "Your danger sense causes you to take a second look close by.--More--",
        );
        assert.equal(
            rowText(screens, 64, 18),
            // renderCell draws water `~` as `·` (scoreboard rowDiff form).
            "  ```S·········```D···1#```·d····················D··````··`````········``··`·`",
        );
        assert.equal(
            rowText(screens, 65, 0),
            "You find a piranha.  The combat suddenly awakens you.",
        );
        assert.equal(
            rowText(screens, 65, 18),
            "  ```S·········```D···;#```·d····················D··````··`````········``··`·`",
        );
    });
});
