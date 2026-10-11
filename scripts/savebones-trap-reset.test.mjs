import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: bones.c savebones `:552–555` — every trap on a bones level loses
// its maker and only holes stay seen (tseen = unhideable_trap).
// scen-chain-Archeologist-578126: an earlier life finds the D0.1 pit at
// (40,17) (tseen=1), dies, and leaves bones; the next life (seg8) must
// search it unseen (C draws rnl(8)@dosearch0:2079 at global step 824).
// JS walked game.ftrap as a C node chain, but live traps sit in
// game.level.traps (fresh levels leave game.ftrap null; restores leave
// it an array aliasing level.traps), so the reset never ran and the
// bones file kept tseen:true (D-3851).
function sharedStorage() {
    const mem = new Map();
    return {
        mem,
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("savebones trap reset (bones.c :552-555)", () => {
    it("bones traps lose tseen (only holes stay seen)", { timeout: 180000 }, async () => {
        const path = new URL("../.cache/hidden/sessions/scen-chain-Archeologist-578126.session.json", import.meta.url);
        assert.ok(existsSync(path), "missing session; record it with hidden-proxy record");
        const sess = JSON.parse(readFileSync(path, "utf8"));
        const storage = sharedStorage();
        for (let i = 0; i < 8; i++) {
            const seg = sess.segments[i];
            await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves || "",
                storage,
            });
        }
        const raw = storage.mem.get("vfs:bones/bonD0.1");
        assert.ok(raw, "expected a D0.1 bones file after the chain deaths");
        const bones = JSON.parse(raw);
        assert.ok(Array.isArray(bones.traps) && bones.traps.length > 0, "bones carry traps");
        for (const t of bones.traps) {
            assert.equal(t.madeby_u | 0, 0, `trap (${t.tx},${t.ty}) keeps a maker`);
            assert.equal(!!t.tseen, (t.ttyp | 0) === 13, // HOLE stays seen
                `trap (${t.tx},${t.ty}) ttyp=${t.ttyp} tseen=${t.tseen}`);
        }
    });
});
