import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { create_levelfile } from "../js/files.js";
import { game } from "../js/gstate.js";
import { LFILE_EXISTS, NHF_LEVELFILE, WRITING } from "../js/const.js";

// C ref: files.c create_levelfile `:621–670` — write side of the
// level-file pair (open_levelfile `:673–716` is the read side, D-2472).
// The VFS stash slot is always creatable, so the handle is viable and
// LFILE_EXISTS is set; the creat-failure errbuf arm never fires.
describe("create_levelfile (files.c:621-670)", () => {
  let saved;
  beforeEach(() => {
    saved = { lock: game.lock, level_info: game.level_info };
    game.lock = "testlock";
    game.level_info = [];
  });
  afterEach(() => {
    game.lock = saved.lock;
    game.level_info = saved.level_info;
  });

  it("clears errbuf, renames lock, sets LFILE_EXISTS, returns WRITING handle", () => {
    const err = { s: "dirty" };
    const h = create_levelfile(3, err);
    assert.equal(err.s, "");
    assert.equal(game.lock, "testlock.3");
    assert.ok(h);
    assert.equal(h.mode, WRITING);
    assert.equal(h.structlevel, true);
    assert.equal(h.fieldlevel, false);
    assert.equal(h.addinfo, false);
    assert.equal(h.style.binary, true);
    assert.equal(h.ftype, NHF_LEVELFILE);
    assert.equal(h.fnidx, 1);
    assert.equal(h.fd, 3);
    assert.equal(h.fpdef, null);
    assert.ok(((game.level_info[3].flags | 0) & LFILE_EXISTS) !== 0);
  });

  it("restrips an old level suffix and tolerates null errbuf", () => {
    game.lock = "testlock.7";
    const h = create_levelfile(2, null);
    assert.equal(game.lock, "testlock.2");
    assert.ok(h);
    assert.ok(((game.level_info[2].flags | 0) & LFILE_EXISTS) !== 0);
  });

  it("re-creating an existing level keeps the flag and stays viable", () => {
    create_levelfile(1, null);
    game.level_info[1].extra = "stash-kept";
    const h = create_levelfile(1, null);
    assert.ok(h);
    assert.ok(((game.level_info[1].flags | 0) & LFILE_EXISTS) !== 0);
    assert.equal(game.level_info[1].extra, "stash-kept");
  });
});
