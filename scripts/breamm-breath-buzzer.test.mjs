import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mthrowu.c breamm `:1122–1126` wraps dobuzz in
// gb.buzzer = mtmp ... gb.buzzer = 0; zap.c zhitu `:4572–4577`
// renders the killer via death_inflicted_by(fltxt, gb.buzzer) +
// "inflicted"→verb ("exhaled" for breath, `:4569`). JS breamm wrote
// game.buzzer while zhitu reads game._buzzer (the muse/mcastu
// channel), so breath deaths lost "exhaled by <mon>": tombstones
// dropped the epitaph row and the end-overview longest line shrank
// (wintty.c:1914 centering). This test replays the two zhitu-blocked
// tombstone sessions and pins C's recorded "exhaled by a red" row
// (red pre-fix: blank epitaph row; green post-fix).
const CASES = [
    ["scen-worldtour-Wizard-49955018", 843],
    ["scen-worldtour-Wizard-51650070", 850],
];

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

function rowText(grid, r) {
    return grid[r].map(renderCell).join("");
}

describe("breamm breath sets the buzzer zhitu reads (mthrowu.c:1122-1126)", () => {
    for (const [ID, STEP] of CASES) {
        it(`${ID}: step-${STEP} tombstone names the exhaler`, { timeout: 300000 }, async () => {
            const SESS = JSON.parse(readFileSync(
                new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
            ));
            const seg = SESS.segments[0];
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves,
                storage: sharedStorage(),
            });
            const screens = g.getScreens?.() || [];
            assert.ok(screens.length > STEP, `screens ${screens.length} <= ${STEP}`);
            const text = rowText(decodeScreen(screens[STEP]), 11);
            assert.ok(
                text.includes("exhaled by a red"),
                `row 11 lacks the exhaler: ${JSON.stringify(text)}`,
            );
        });
    }
});
