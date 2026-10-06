import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sys/unix/unixmain.c:263-274 — after a successful dorecover,
// wd_message(), then in discover||wizard mode y_n("Do you want to keep
// the save file?"): 'n' deletes the save, anything else keeps it
// (chmod FCMASK + nh_compress, both without a VFS analogue). C order
// around it: dorecover ends with welcome(FALSE) (restore.c:948), so the
// prompt is issued with the welcome --More-- pending and appears once
// that is dismissed; the moon/friday preamble (moveloop head) runs after
// the answer. restore.c:903-904 deletes the save inside dorecover only
// in normal mode (!wizard && !discover). JS skipped the prompt entirely
// and deleted unconditionally (D-3565); 24 corpus sessions diverged with
// C showing the prompt where JS showed the moon message.

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

function recipe(id) {
    return JSON.parse(readFileSync(
        new URL(`../hidden-corpus/recipes/${id}.recipe.json`, import.meta.url),
    ));
}

async function runSeg(seg, moves, storage) {
    return runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        timezone: seg.timezone,
        nethackrc: seg.nethackrc,
        moves,
        storage,
    });
}

// Storage ground truth: every VFS key except the seeded sysconf
// (js/jsmain.js start provisions 'vfs:sysconf'; storage.js 'vfs:' prefix).
function saveKeys(storage) {
    const out = [];
    for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k !== "vfs:sysconf") out.push(k);
    }
    return out;
}

describe("restore keep-savefile prompt (unixmain.c:266-274, D-3565)", () => {
    it("'y' (Caveman-94206): prompt shown after welcome More, save kept", { timeout: 120000 }, async () => {
        const r = recipe("scen-container-Caveman-94206");
        const storage = freshStorage();
        await runSeg(r.segments[0], r.segments[0].moves, storage);
        assert.deepEqual(saveKeys(storage).length, 1, "seg0 save wrote one save key");
        // seg1 moves ` y #pray...` (Friday 13th): space dismisses the
        // welcome --More--, y answers the prompt, space dismisses the
        // moon --More-- inside the friday pline (C shows the same two
        // Mores); input then runs dry inside moveloop.
        const g1 = await runSeg(r.segments[1], r.segments[1].moves.slice(0, 3), storage);
        const screens = g1.getScreens().join("\n");
        assert.ok(
            screens.includes("Do you want to keep the save file?"),
            "keep-savefile prompt painted on restore",
        );
        assert.deepEqual(saveKeys(storage).length, 1, "'y' keeps the save (unixmain.c:270-273 else arm)");
    });

    it("'n' (Valkyrie-94066): prompt shown, save deleted", { timeout: 120000 }, async () => {
        const r = recipe("scen-container-Valkyrie-94066");
        const storage = freshStorage();
        await runSeg(r.segments[0], r.segments[0].moves, storage);
        assert.deepEqual(saveKeys(storage).length, 1, "seg0 save wrote one save key");
        // seg1 moves ` n ...`: space dismisses More, n declines keeping.
        const g1 = await runSeg(r.segments[1], r.segments[1].moves.slice(0, 2), storage);
        const screens = g1.getScreens().join("\n");
        assert.ok(
            screens.includes("Do you want to keep the save file?"),
            "keep-savefile prompt painted on restore",
        );
        assert.deepEqual(saveKeys(storage).length, 0, "'n' deletes the save (unixmain.c:269 delete_savefile)");
    });
});
