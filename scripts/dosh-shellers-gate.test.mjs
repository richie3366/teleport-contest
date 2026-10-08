import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sys/unix/unixunix.c dosh `:343–365` — SHELL (unixconf.h:322) and
// SYSCF (config.h:232–233) are both defined, so the shellers gate
// (`:348–355`) is live: without a sysconf shellers entry authorizing this
// user, the '!' command rejects with Norep("Unavailable command '!'.")
// (`:352`), NOT the !SHELL text ("'#shell' command not available.",
// cmd.c:5693) which is not compiled into the recorder build. Scored ESM
// has no sysconf (`game.sysopt.shellers` null), so the gate always fires.
const CASES = [
    ["random-seed0200-monk-north-search-68935e35", 29],
    ["random-seed0200-monk-north-search-da8919e4", 31],
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

async function replayTopline(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const storage = sharedStorage();
    const screens = [];
    for (const seg of sess.segments) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage,
        });
        for (const s of (g.getScreens?.() || [])) screens.push(s || "");
    }
    const recTop = String(sess.segments[0].steps[step].screen).split("\n")[0];
    const jsTop = String(screens[step]).split("\n")[0];
    return { recTop, jsTop };
}

describe("unix dosh shellers gate rejects '!' like the recorder (unixunix.c:352)", () => {
    for (const [id, step] of CASES) {
        it(`${id}: step ${step} rejects '!' with C's text`, { timeout: 300000 }, async () => {
            const { recTop, jsTop } = await replayTopline(id, step);
            assert.equal(recTop, "Unavailable command '!'.", "recorded C rejects with the shellers-gate text");
            assert.equal(jsTop, recTop, "JS must print the shellers-gate text, not the !SHELL text");
        });
    }
});
