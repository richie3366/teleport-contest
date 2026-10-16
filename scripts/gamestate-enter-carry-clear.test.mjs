import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: nhlua.c nhl_gamestate store `:1772–1794` — tutorial_enter stashes
// invent via setnotworn(otmp) + freeinv(otmp) per item, THEN snapshots u.
// C freeinv → freeinv_core (invent.c:1356–1399) clears carry intrinsics:
// uhave bits + set_artifact_intrinsic(obj, 0, W_ART). The Longbow of Diana
// (cspfx SPFX_ESP, artilist.h) confers ETelepat&W_ART while carried, so the
// stash snapshot has ETelepat=0 and the leave restore memcpy keeps 0
// (temp-C: SEQ 400 ET=0x0 range=-1; SEQ 420 ET=0x0).
// JS tutorial_enter_gamestate (do.js) shifted invent by hand with a
// freeinv_core omit, so the stash kept W_ART ESP and the Oracle showed as
// telepathy-sensed at scen-worldtour-Barbarian-50458507 step 419.
// D-4025.

const ID = "scen-worldtour-Barbarian-50458507";
const W_ART = 0x00001000;
const TELEPAT = 30;

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

async function stateAt(n) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const gstate = await import("../js/gstate.js");
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: seg.moves.slice(0, n),
    storage: sharedStorage(),
  });
  const st = gstate.game;
  return {
    screens: game.getScreens().length,
    liveET: (st.u?.ETelepat | 0),
    liveUpEx: (st.u?.uprops?.[TELEPAT]?.extrinsic | 0),
    range: st.u?.unblind_telepat_range,
    stashET: st.gmst_ubak ? (st.gmst_ubak.ETelepat | 0) : null,
    stashUpEx: st.gmst_ubak ? (st.gmst_ubak.uprops?.[TELEPAT]?.extrinsic | 0) : null,
    stored: !!st.gmst_stored,
    invent: (st.invent || []).length,
  };
}

describe("nhl_gamestate enter clears carry intrinsics (freeinv)", () => {
  it(`${ID}: carried Longbow confers ESP pre-entry, enter strips it`, { timeout: 300000 }, async () => {
    const pre = await stateAt(398);
    assert.ok(pre.screens > 398, `prefix 398 replays, got ${pre.screens} screens`);
    assert.ok((pre.liveET & W_ART) !== 0,
      `pre-entry ETelepat has W_ART (carried Longbow cspfx ESP), got ${pre.liveET}`);
    assert.equal(pre.liveUpEx & W_ART, W_ART, `pre-entry uprops mirror, got ${pre.liveUpEx}`);

    const post = await stateAt(399);
    assert.ok(post.screens > 399, `prefix 399 replays, got ${post.screens} screens`);
    assert.equal(post.invent, 0, `tutorial entry stashes whole invent, got ${post.invent}`);
    assert.equal(post.liveET & W_ART, 0,
      `post-entry live ETelepat cleared (C SEQ 400 ET=0x0), got ${post.liveET}`);
    assert.equal(post.liveUpEx & W_ART, 0,
      `post-entry live uprops cleared, got ${post.liveUpEx}`);
    assert.equal(post.range, -1, `post-entry telepat range reset, got ${post.range}`);
    assert.equal(post.stashET & W_ART, 0,
      `stash snapshot taken post-strip (C memcpy order), got ${post.stashET}`);
  });

  it(`${ID}: leave restore keeps ETelepat 0 (memcpy clobber)`, { timeout: 300000 }, async () => {
    const post = await stateAt(409);
    assert.ok(post.screens > 409, `prefix 409 replays, got ${post.screens} screens`);
    assert.equal(post.stored, false, `tutorial left, stash released`);
    assert.ok(post.invent > 0, `inventory restored, got ${post.invent} items`);
    assert.equal(post.liveET & W_ART, 0,
      `post-leave ETelepat stays 0 (C SEQ 420 ET=0x0), got ${post.liveET}`);
    assert.equal(post.range, -1, `post-leave range stays -1, got ${post.range}`);
  });
});
