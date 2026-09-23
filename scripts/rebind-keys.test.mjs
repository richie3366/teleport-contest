import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { bind_key, count_bind_keys } from "../js/cmd.js";
import { cmdbind_get } from "../js/dokeylist.js";

// C refs: cmd.c bind_key `:2661–2728`, cmdbind_add `:2125–2155`,
// cmdbind_remove `:2157–2177`, count_bind_keys `:2207–2231` (D-2762).
// Pins the rebind-menu writers headless: no RNG, no display, no
// filesystem. game.Cmd.binds is module state — saved/restored per test.
describe("rebind key writers port (cmd.c)", () => {
  let savedCmd;
  beforeEach(() => {
    savedCmd = game.Cmd;
    game.Cmd = { binds: new Map() };
  });
  afterEach(() => {
    game.Cmd = savedCmd;
  });

  it("bind_key binds a command (C :2690–2694)", () => {
    assert.equal(bind_key(116, "cast", true), true);
    assert.equal(game.Cmd.binds.get(116), "cast");
    assert.equal(cmdbind_get(116).txt, "cast");
  });

  it("bind_key matches case-insensitively (C :2690 strcmpi)", () => {
    assert.equal(bind_key(116, "CAST", true), true);
    assert.equal(game.Cmd.binds.get(116), "cast");
  });

  it("bind_key skips INTERNALCMD (C :2692–2693)", () => {
    assert.equal(bind_key(116, "clicklook", true), false);
    assert.equal(game.Cmd.binds.has(116), false);
  });

  it("bind_key unknown command returns FALSE (C :2727)", () => {
    assert.equal(bind_key(116, "nope-not-a-command", true), false);
    assert.equal(game.Cmd.binds.has(116), false);
  });

  it('bind_key "nothing" unbinds via null marker (C :2669–2671)', () => {
    assert.equal(bind_key(99, "nothing", true), true);
    assert.equal(game.Cmd.binds.get(99), null);
    assert.equal(cmdbind_get(99), null); // close default cleared
  });

  it('bind_key "nothing" matches case-insensitively (C :2669 strcmpi)', () => {
    assert.equal(bind_key(99, "NOTHING", true), true);
    assert.equal(game.Cmd.binds.get(99), null);
  });

  it("bind_key CMD_PARAM without param still binds (C :2696–2698, error sunk)", () => {
    assert.equal(bind_key(116, "toggle", true), true);
    assert.equal(game.Cmd.binds.get(116), "toggle");
  });

  it("bind_key CMD_PARAM empty param still binds (C :2703–2704, error sunk)", () => {
    assert.equal(bind_key(116, "toggle()", true), true);
    assert.equal(game.Cmd.binds.get(116), "toggle");
  });

  it("bind_key CMD_PARAM stores the bare name (C :2705–2707 named omission)", () => {
    assert.equal(bind_key(116, "toggle(foo)", true), true);
    assert.equal(game.Cmd.binds.get(116), "toggle");
  });

  it("bind_key non-param command with param still binds (C :2711–2712, error sunk)", () => {
    assert.equal(bind_key(116, "cast(x)", true), true);
    assert.equal(game.Cmd.binds.get(116), "cast");
  });

  it("bind_key key 0 is a silent no-op returning TRUE (C :2130 guard)", () => {
    assert.equal(bind_key(0, "cast", true), true);
    assert.equal(game.Cmd.binds.has(0), false);
  });

  it("cmdbind_add rebinds in place (C :2139–2144, no move-to-front)", () => {
    game.Cmd.binds.set(116, "cast");
    game.Cmd.binds.set(117, "toggle");
    bind_key(116, "close", true);
    assert.equal(game.Cmd.binds.get(116), "close");
    assert.deepEqual([...game.Cmd.binds.keys()], [116, 117]);
  });

  it("cmdbind_remove frees position; re-add appends (C :2164–2173 unlink)", () => {
    game.Cmd.binds.set(116, "cast");
    game.Cmd.binds.set(117, "toggle");
    bind_key(116, "nothing", true);
    bind_key(116, "close", true);
    assert.deepEqual([...game.Cmd.binds.keys()], [117, 116]);
  });

  it("count_bind_keys is 0 on an empty overlay (C :2216–2230)", () => {
    assert.equal(count_bind_keys(), 0);
  });

  it("count_bind_keys counts diff-key rebinds only (C :2219–2220)", () => {
    game.Cmd.binds.set(90, "cast"); // same-key: silent
    game.Cmd.binds.set(116, "cast"); // diff-key: 1
    assert.equal(count_bind_keys(), 1);
  });

  it("count_bind_keys counts unbound defaults (C :2226–2228)", () => {
    game.Cmd.binds.set(99, null); // close unbound
    assert.equal(count_bind_keys(), 1);
  });

  it("count_bind_keys matches get_changed emission count", () => {
    game.Cmd.binds.set(90, "cast");
    game.Cmd.binds.set(116, "cast");
    game.Cmd.binds.set(99, null);
    assert.equal(count_bind_keys(), 2);
  });
});
