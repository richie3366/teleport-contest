import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: restore.c getlev `:1111` elapsed + `:1144` restore_timers ghostly
// (timeout.c `:2722–2723` timeout += elapsed) + `:1299`
// relink_timers(ghostly). scen-chain-Archeologist-578126 seg8 loads a
// bones level whose blob carries the previous life's ROT_CORPSE timer for
// the pet corpse on the pit at map (40,17); C rots it during the turn
// ending at global step 1070, repainting the cell from corpse `%` to pit
// `^`. JS dropped the blob's timers on the bones path (getlev_bones named
// omission), so the corpse never rotted and row 18 kept `%` where C
// shows `^` (queue row `dokick.c` ghitm, region-heuristic owner).
const ID = "scen-chain-Archeologist-578126";
const SEG8_MOVES = 254; // global step 1070 == seg8 local step 254

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

function stripAnsi(s) {
    return String(s)
        .replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
        .replace(/[\u000e\u000f]/g, "");
}

describe("bones load installs ROT_CORPSE timers (restore.c getlev ghostly)", () => {
    it(`${ID}: step 1070 shows the rotted-away pit like recorded C`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const storage = sharedStorage();
        let seg8screens = [];
        for (let si = 0; si < sess.segments.length; si++) {
            const seg = sess.segments[si];
            const moves = si < 8 ? seg.moves : seg.moves.slice(0, SEG8_MOVES);
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves, storage,
            });
            if (si === 8) seg8screens = g.getScreens?.() || [];
        }
        assert.equal(seg8screens.length, SEG8_MOVES + 1, "seg8 replay reaches step 1070");
        const last = String(seg8screens[seg8screens.length - 1]);
        const row18 = stripAnsi(last.split("\n")[18]);
        assert.equal(row18, "··*{·······^@%#", "map (40,17) must show the pit after the bones corpse rots");
    });
});
