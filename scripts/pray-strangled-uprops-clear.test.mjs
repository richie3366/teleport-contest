import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: pray.c fix_worst_trouble TROUBLE_STRANGLED `:387–396` —
// `Strangled = 0` zeroes the one C field
// (`u.uprops[STRANGLED].intrinsic`, youprop.h:110). JS keeps two stores
// for that value: the flats (`u.Strangled`/`u.HStrangled`/`u.EStrangled`)
// and `u.uprops[STRANGLED].intrinsic`, which wiz_intrinsic writes
// uprops-only (do.js danger_uprops). The cure cleared the flats but not
// the uprops mirror, so _statusLine2 (display.js, reads both) kept
// `Strngl` and the timeout loop re-synced the flat from uprops every
// tick: scen-sweep-Priest-587210 step 550 shows C `... Satiated` where
// JS showed `... Satiated Strngl` despite both printing "You can breathe
// again.". Pre-fix: row 23 contains `Strngl`.
function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

function rowText(grid, row) {
    return grid[row].map((c) => c.ch).join("").replace(/\s+$/, "");
}

describe("fix_worst_trouble TROUBLE_STRANGLED clears the uprops mirror (pray.c:387-396)", () => {
    it("sweep-Priest-587210 step 550 status line drops Strngl like C", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Priest-587210.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 550),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 550, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[550]);
        const row23 = rowText(grid, 23);
        assert.ok(row23.includes("Satiated"), `row 23 lost Satiated: ${row23}`);
        assert.ok(!row23.includes("Strngl"),
            `row 23 still shows Strngl after the prayer cure: ${row23}`);
    });
});
