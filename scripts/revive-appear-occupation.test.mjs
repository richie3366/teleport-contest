import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: zap.c revive calls makemon with MM_NOMSG; makemon.c:1472–1507 runs
// the appear Norep (skipped under MM_NOMSG) AND the occupation threat check
// `if (go.occupation) dochugw(mtmp, FALSE)` in-body — so a troll reviving
// next to a searching hero stops the search BEFORE revive_corpse's
// "rises from the dead!" pline. JS's sync makemon defers appear+dochugw to
// makemon_appear_msg, which the revive path never awaited: JS printed
// "rises" first, stopped via nearby a phase late, and the troll attacked
// before the input block (scen-extcmd-Archeologist-51257051 s343 +
// questtour-Barbarian 50350086/50950094, same shape).
// This test replays the smallest probe and pins the C screen order plus the
// pre-fix first RNG divergence (C rn2(8)@confdir at index 2867, step 345's
// stunned fight direction — downstream of the late stop).
const ID = "scen-extcmd-Archeologist-51257051";
const DIVERGE_AT = 2867;
const STEP = 343;
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

function isRngCall(entry) {
    return typeof entry === "string" && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, "").replace(/^\d+\s+/, "").trim();
}

function firstLine(screen) {
    return String(screen ?? "").split("\n")[0];
}

describe("revive awaits makemon in-body appear+dochugw (makemon.c:1472-1507)", () => {
    it(`${ID}: stop-occupation prints before the revive pline`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const game = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        // Screen order at the pre-fix divergence step.
        const screens = game.getScreens?.() || [];
        assert.ok(
            screens.length > STEP,
            `JS emitted ${screens.length} screens, want more than ${STEP}`,
        );
        assert.equal(
            firstLine(screens[STEP]),
            firstLine(seg.steps[STEP].screen),
            `step ${STEP} topline`,
        );
        assert.match(
            firstLine(screens[STEP]),
            /You stop searching\.\s+The troll rises from the dead!/,
        );
        // RNG: pre-fix first mismatch index now matches.
        const cAll = [];
        for (const step of seg.steps || []) {
            for (const line of step.rng || []) {
                if (isRngCall(line)) cAll.push(line);
            }
        }
        const jsAll = (game.getRngLog?.() || [])
            .map((e) => (typeof e === "string" ? e.replace(/^\d+\s+/, "") : String(e)))
            .filter(isRngCall);
        assert.ok(
            jsAll.length > DIVERGE_AT,
            `JS emitted ${jsAll.length} draws, want more than ${DIVERGE_AT}`,
        );
        assert.equal(
            normalizeRng(jsAll[DIVERGE_AT]),
            normalizeRng(cAll[DIVERGE_AT]),
            `draw [${DIVERGE_AT}]: JS ${jsAll[DIVERGE_AT]} vs C ${cAll[DIVERGE_AT]}`,
        );
    });
});
