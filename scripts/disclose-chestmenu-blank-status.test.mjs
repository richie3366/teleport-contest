import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: end.c disclose `:636-639` shows the identified inventory
// (display_pickinv PICK_ONE fullscreen: term_clear_screen blanks WIN_STATUS)
// then container_contents `:1663-1671` puts up the chest menu via
// display_nhwindow — NOT select_menu — so wintty.c tty_display_nhwindow
// NHW_MENU `:1907-1946` paints the corner text with no bot() anywhere on
// the path (dmore `:1154-1172` is bare tty writes + xwaitforspace). The
// docrt botlx from the inventory dismiss stays pending until the next
// real bot() (the attributes yn's flush). JS show_nhw_menu_text ran its
// grid-sync flush_screen(1) ungated, so the pending botlx fired bot()
// mid-display and painted status C leaves blank (scen-sweep-Priest-95316
// step 940: C rows 22-23 empty, JS showed the status lines).
const ID = "scen-sweep-Priest-95316";
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

describe("disclose container menu keeps status blank (end.c:1663)", () => {
    it(`${ID}: step-940 chest menu leaves rows 22-23 blank, step-941 repaints`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 941, `screens ${screens.length} <= 941`);
        const rowText = (idx, r) => decodeScreen(screens[idx] || "")[r]
            .map(renderCell).join("").replace(/\s+$/, "");
        // Chest menu itself intact (caption + items + --More-- prompt).
        const cap = rowText(940, 0);
        assert.ok(cap.includes("Contents of the chest:"),
            `step-940 caption: ${JSON.stringify(cap.slice(0, 60))}`);
        // C records only 22 lines at step 940: status rows blank.
        assert.equal(rowText(940, 22), "", "step-940 row 22 blank (no bot on menu-text display path)");
        assert.equal(rowText(940, 23), "", "step-940 row 23 blank (no bot on menu-text display path)");
        // The pending botlx still repaints at the next real bot():
        // step 941 (attributes yn) shows status on both sides.
        const s1 = rowText(941, 22);
        assert.ok(s1.includes("Wizard the Priest"),
            `step-941 row 22 repainted: ${JSON.stringify(s1.slice(0, 60))}`);
    });
});
