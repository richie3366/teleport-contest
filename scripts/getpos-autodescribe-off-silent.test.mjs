import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c getpos `:914–920` (movecmd arm: truncate_to_map + nxtc,
// never describes) + `:865–866`/`:889–890` (loop-top auto_describe is the
// loop's only describe path, gated on iflags.autodescribe && !msg_given).
// With the option off (here: '#' inside the #name getpos @567 turned it
// off, never back on), cursor moves stay silent and the caller's prompt
// persists. scen-sweep-Rogue-578133 ';'@1426 + 'k'@1427: C keeps the `;`
// pick prompt on the moved cursor; JS's describeAt fallback (no C
// counterpart: C getpos takes (ccp, force, goal)) invented lookat's
// "remembered, unseen, creature" for the 'I' square.
const ID = "scen-sweep-Rogue-578133";
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

describe("getpos moves silent with autodescribe off (getpos.c:914-920,865-866)", () => {
    it(`${ID}: post-'k' topline keeps the pick prompt`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        // Anchor: steps[i].key === moves[i-1]; steps[0] is the launch screen.
        assert.equal(seg.moves[1425], ";", "moves[1425] is ';' (farlook)");
        assert.equal(seg.moves[1426], "k", "moves[1426] is 'k' (cursor up)");
        assert.equal(seg.steps[1427].key, "k", "C steps[1427] is the 'k' step");
        assert.equal(
            String(seg.steps[1427].screen).split("\n")[0],
            "Pick a monster, object or location.",
            "C post-'k' topline keeps the prompt (silent move)",
        );
        assert.deepEqual(seg.steps[1427].cursor, [32, 9, 1], "C post-'k' cursor");
        // Through the 'k' key; the run ends awaiting ';' inside getpos.
        const prefix = seg.moves.slice(0, 1427);
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: prefix,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        const cursors = g.getCursors?.() || [];
        assert.ok(screens.length >= 2, `only ${screens.length} screens captured`);
        const lastRow0 = String(screens[screens.length - 1]).split("\n")[0];
        assert.equal(
            lastRow0,
            "Pick a monster, object or location.",
            "post-'k' topline keeps the prompt (no describe with option off)",
        );
        assert.deepEqual(
            cursors[cursors.length - 1]?.slice(0, 2), [32, 9],
            "post-'k' cursor moved up (control)",
        );
    });
});
