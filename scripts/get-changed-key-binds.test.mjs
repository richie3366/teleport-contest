import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { strbuf_init } from "../js/options.js";
import { get_changed_key_binds } from "../js/cmd.js";

// C refs: cmd.c get_changed_key_binds `:2235–2287` (D-campaign 4/7).
// Pins the #saveoptions key-binds writer headless: no RNG, no display,
// no filesystem on either path. game.Cmd.binds is module state (RC BIND=
// overlay via parsebindings) — saved/restored per test.
describe("saveoptions key-binds writer port (cmd.c)", () => {
  let savedCmd;
  beforeEach(() => {
    savedCmd = game.Cmd;
  });
  afterEach(() => {
    game.Cmd = savedCmd;
  });

  const freshBuf = () => {
    const sbuf = {};
    strbuf_init(sbuf);
    return sbuf;
  };

  it("empty overlay emits nothing (C :2248–2281, defaults cover all extcmd keys)", () => {
    game.Cmd = {};
    const sbuf = freshBuf();
    get_changed_key_binds(sbuf);
    assert.equal(sbuf.str, null);
  });

  it("same-key user rebind is silent (C :2251 cmd->key == bind->key)", () => {
    game.Cmd = { binds: new Map([[90, "cast"]]) }; // cast default key is Z (90)
    const sbuf = freshBuf();
    get_changed_key_binds(sbuf);
    assert.equal(sbuf.str, null);
  });

  it("diff-key rebind emits BIND=key:cmd (C :2258 plain arm)", () => {
    game.Cmd = { binds: new Map([[116, "cast"]]) }; // t -> cast
    const sbuf = freshBuf();
    get_changed_key_binds(sbuf);
    assert.equal(sbuf.str, "BIND=t:cast\n");
  });

  it("unbound default key emits BIND=key:nothing (C :2273–2275)", () => {
    game.Cmd = { binds: new Map([[99, null]]) }; // c (close) unbound
    const sbuf = freshBuf();
    get_changed_key_binds(sbuf);
    assert.equal(sbuf.str, "BIND=c:nothing\n");
  });

  it("userbind loop precedes unbound-defaults loop (C :2248 before :2269)", () => {
    game.Cmd = { binds: new Map([[90, "cast"], [116, "cast"], [99, null]]) };
    const sbuf = freshBuf();
    get_changed_key_binds(sbuf);
    assert.equal(sbuf.str, "BIND=t:cast\nBIND=c:nothing\n");
  });

  it("null sbuf (display arm) does not throw (C :2282–2285 named omission)", () => {
    game.Cmd = { binds: new Map([[116, "cast"]]) };
    assert.equal(get_changed_key_binds(null), undefined);
  });
});
