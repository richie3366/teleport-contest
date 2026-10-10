import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `seffect_enchant_armor` cliff writer (misattributed owner — the message
// "The smoky potion evaporates." is potion.c:1681 potionhit, matched by the
// row literal on read.c:1186's otense "evaporate").
//
// scen-sweep-Caveman-95348 step 694: hero magically asleep (sleep gas,
// multi<0, usleep set) breathes a hurled potion of blindness.
// C potion.c:2072 `!Blind && !Unaware` is silent (youprop.h:399 Unaware =
// multi<0 && (unconscious() || is_fainted())), kn stays 0, the :2111 tail
// runs trycall → "Call a smoky potion:" prompt, and the sleep nomovemsg
// "You wake up." displays after the prompt. JS's local Unaware_pot read
// u.multi/u.Unaware (never written anywhere in js/) so it was always
// false: JS printed "It suddenly gets dark.", kn=1 makeknown skipped the
// prompt, and the wakeup displayed in the same step.
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

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

function row0(screens, n) {
    return decodeScreen(screens[n])[0].map((c) => c.ch).join("").trimEnd();
}

describe("potionbreathe Unaware gate while magically asleep (95348)", () => {
    it("step 694: evaporates + More, no blindness message", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95348");
        assert.ok(screens.length > 694, `only ${screens.length} screens`);
        // C recorded row (hidden-proxy rowDiff): prompt pending behind More.
        assert.equal(row0(screens, 694), "The smoky potion evaporates.--More--");
    });

    it("steps 695-696: docall prompt then wakeup", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95348");
        assert.ok(screens.length > 696, `only ${screens.length} screens`);
        // kn=0 tail → trycall prompt (C g695), wakeup after it (C g696).
        assert.equal(row0(screens, 695), "Call a smoky potion:");
        assert.equal(row0(screens, 696), "You wake up.");
    });
});
