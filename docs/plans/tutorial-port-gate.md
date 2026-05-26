# Tutorial port gate (`tut-1` / `maybe_do_tutorial`)

**Purpose:** Define **mandatory dependencies** for the NetHack tutorial branch. Until every item in [§ Mandatory dependencies](#mandatory-dependencies) is satisfied, tutorial work stays **out of the top “next step”** in [`c-to-js-port-current.md`](../../.cursor/reports/c-to-js-port-current.md). When **all** are satisfied, agents **must** treat **Lane E — Tutorial** as the **primary** lane until the tutorial vertical slice in [`.cursor/plans/nethack-port/10-tutorial.md`](../../.cursor/plans/nethack-port/10-tutorial.md) reaches its exit criteria.

**C anchors:** `allmain.c` `maybe_do_tutorial`, `options.c` `ask_do_tutorial`, `do.c` `goto_level`, `save.c` `savelev`, `nhlua.c` `tutorial` / `free_tutorial`, `dat/tut-1.lua`, `dat/tut-2.lua`.

**Already ported (scaffolding — not “done”):**

| Piece | JS |
|-------|-----|
| `tut-1` on `sp_levchn` | [`dungeon_proto.js`](../../js/dungeon_proto.js) + [`dungeon_init.js`](../../js/dungeon_init.js) |
| `find_level("tut-1")` | [`sp_levchn.js`](../../js/sp_levchn.js) |
| `maybe_do_tutorial` prompt + `schedule_goto` | [`moveloop_preamble.js`](../../js/moveloop_preamble.js), [`tutorial_prompt.js`](../../js/tutorial_prompt.js) |
| `In_tutorial` / `leaving_tutorial` hooks | [`tutorial_branch.js`](../../js/tutorial_branch.js) (Lua **`tutorial()`** still stub) |
| Shop/invent defer on exit | [`shop.js`](../../js/shop.js), [`invent.js`](../../js/invent.js) |

---

## Gate status (update each session)

Copy this table into handoff when you check or uncheck an item.

| ID | Dependency | Status |
|----|------------|--------|
| **MD-1** | [`game.invent` + `ini_inv` / `mkobj`](#md-1-inventory--mkobj) | ☐ |
| **MD-2** | [`goto_level` in-memory level lifecycle](#md-2-goto_level-level-savefree) | ☐ |
| **MD-3** | [Lua RNG context for des / nhlib](#md-3-lua-rng-context) | ☐ |
| **MD-4** | [`tut-1.lua` des bindings](#md-4-tut-1lua-des-bindings) | ☐ |
| **MD-5** | [`tut-1.lua` `nh.*` bindings](#md-5-tut-1lua-nh-bindings) | ☐ |
| **MD-6** | [`tutorial()` / `free_tutorial()` / `gmst_*`](#md-6-nhcore-tutorial--free_tutorial) | ☐ |
| **MD-7** | [`tut-2.lua` + portal exit level](#md-7-tut-2-and-exit) | ☐ |

**Gate open:** all **MD-1 … MD-7** checked → switch to **Lane E** (see [§ When the gate opens](#when-the-gate-opens)).

---

## Mandatory dependencies

### MD-1: Inventory + mkobj

**Why:** `tut-1.lua` places armor, weapons, scrolls, and expects wear/wield/pickup parity; C `tutorial()` / nhcore may sequester real invent.

**Done when:**

- [`ini_inv`](../../js/u_init_link_rogue_invent.js) / [`mkobj`](../../js/mkobj.js) (or equivalent) drive **`game.invent`** with NH5 **`otyp`** alignment per [`c-to-js-port-remaining.md`](../../.cursor/reports/c-to-js-port-remaining.md) §5 item 2.
- Tutorial-relevant object ops used on `tut-1` (wear, wield, pickup, curse, container) call the same C-ordered paths as the main game, not ad-hoc stubs.

**C:** `u_init.c` `ini_inv`, `mkobj.c`, `invent.c`.

---

### MD-2: `goto_level` level save/free

**Why:** Entering the tutorial runs full `goto_level`; C saves the leaving level via `currentlevel_rewrite()` + `savelev()` then `mklev()` when the destination has no `LFILE_EXISTS` (`do.c` ~1597–1700). Leaving the tutorial sets `cant_go_back` / `leaving_tutorial` and frees tutorial levels (`do.c` ~1640–1663).

**Done when:**

- [`goto_level_hero.js`](../../js/goto_level_hero.js) implements the **in-memory** level transition slice (not full on-disk `save.c` — judge `storage.js` stays frozen): save/free current `g.level`, run `mklev()` for unseen destination, assign `u.uz`, with `gotoLevelTutorialBranchHookLikeC` **before** save as in C.
- `leaving_tutorial` path discards tutorial branch levels like C (`cant_go_back` + theme cleanup), not only flag + shop skips.

**C:** `do.c` `goto_level`, `save.c` `savelev` / `savelev_core` (semantic port to JS level objects).

**Not required for this gate:** multi-segment `save.c` / bones / `restore.c` ([`08-save-bones-persistence.md`](../../.cursor/plans/nethack-port/08-save-bones-persistence.md) full checklist).

---

### MD-3: Lua RNG context

**Why:** `tut-1.lua` uses `percent()`, `shuffle()`, and des selection RNG; recorder tags **Lua** draws separately from core.

**Done when:**

- [`nhl_rng.js`](../../js/nhl_rng.js) (or successor) provides a **Lua ISAAC** stream matching the patched recorder ([`nethack-c/patches/004-rng-log-lua-context.patch`](../../nethack-c/patches/004-rng-log-lua-context.patch)).
- `runLuaProtofileLikeC` for tutorial protofiles logs/consumes **Lua** context, not aliased core `rn2` (except documented nhlib pre-`init_dungeons` shims).

**C:** `nhlua.c` `nhl_init`, nhlib `nh.rn2`.

---

### MD-4: `tut-1.lua` des bindings

**Why:** [`nhl_lua.js`](../../js/nhl_lua.js) currently allows only **`minetn-1`**; `tut-1` will not load until allowlisted and bound.

**Done when** Fengari can execute `dat/tut-1.lua` through `load_lua` / `makemaz` with C-faithful JS implementations for at least:

| `des.*` / helper | Notes |
|----------------|--------|
| `level_init`, `level_flags`, `map` | solidfill + mazelevel flags |
| `region`, `teleport_region`, `non_diggable` | lit/unlit regions |
| `door`, `trap`, `object`, `monster`, `engraving` | tutorial rooms |
| `percent`, `shuffle` | nhlib / global helpers used in script |

Track per-binding slices in [`nhl-port-notes.md`](../../.cursor/reports/nhl-port-notes.md); extend allowlist in `nhl_lua.js` for **`tut-1`** (and shared helpers).

**Verify:** one recorded segment or harness that runs `mklev` for `tut-1` without falling back to generic maze.

---

### MD-5: `tut-1.lua` `nh.*` bindings

**Why:** Tutorial text uses key names from the player’s keymap.

**Done when:**

- `nh.eckey` (C `nhl_get_cmd_key`) returns strings matching C for tutorial commands (`movewest`, `pickup`, `wear`, …).
- `nh.parse_config` applies `OPTIONS=mention_walls` (and siblings) as C does for the tutorial newbie-friendly set.

**C:** `nhlua.c` `nhl_get_cmd_key`, config parse hooks.

---

### MD-6: nhcore `tutorial()` / `free_tutorial()`

**Why:** Branch change calls `tutorial(TRUE|FALSE)` → `l_nhcore_call(NHCORE_ENTER_TUTORIAL | NHCORE_LEAVE_TUTORIAL)`; exit frees sequestered invent and backups (`gmst_invent`, `gmst_ubak`, `gmst_disco`, `gmst_mvitals`).

**Done when:**

- [`tutorial_branch.js`](../../js/tutorial_branch.js) **`tutorialLuaHookStubLikeC`** replaced with real nhcore entry (minimal Lua core or faithful JS equivalent of nhcore side effects).
- **`free_tutorial()`** runs on leave and on quit-from-tutorial paths C hits (`save.c` calls `free_tutorial` when needed).
- `tutorial_reentry_blocked` / `nhcore_call_available` match C after first exit.

**C:** `nhlua.c` ~1809–1846.

---

### MD-7: `tut-2` and exit

**Why:** Tutorial spans two special levels; magic portal links them and returns to main dungeon.

**Done when:**

- `tut-2.lua` loads under the same gate as MD-4/MD-5 (allowlist + bindings).
- Portal / `goto_level` from tutorial back to `ucamefrom` matches C (`maybe_do_tutorial` sets `u.ucamefrom`; leaving sets `leaving_tutorial` and `up = FALSE` for re-entry at level 1).

**C:** `tut-2.lua`, `do.c` leaving-tutorial block.

---

## Explicit non-blockers (do not delay the gate)

These may be sliced **during** Lane E but must **not** keep tutorial deferred:

| Item | Rationale |
|------|-----------|
| Full **`monmove.js`** harness peel | Orthogonal; tutorial has its own monsters |
| **Lane A** chargen for all 11 rc-without-identity sessions | Tutorial can be vertical-sliced with OPTIONS-fixed identity sessions first |
| Full **trap/zap/shop** long tail | Only tutorial-exercised traps/commands need parity when gate opens |
| **`LIVELOGFILE`** / full livelog | Optional unless a session compares lines |
| **`dokick` / `dothrow`** beyond existing **`shop.js`** `leaving_tutorial` skips | Add when tutorial input reaches those commands |
| Full **`save.c`** multi-segment / bones | MD-2 is in-memory level lifecycle only |

---

## When the gate opens

1. Check **all MD-1 … MD-7** in the [gate status](#gate-status-update-each-session) table.
2. In [`c-to-js-port-current.md`](../../.cursor/reports/c-to-js-port-current.md):
   - Set **Lane E — Tutorial** as **step 1** under “Next steps”.
   - Move moveloop/trap long tail below Lane E until tutorial exit criteria met.
3. Execute slices from [`.cursor/plans/nethack-port/10-tutorial.md`](../../.cursor/plans/nethack-port/10-tutorial.md) in order.
4. Run **`npm run score`** after any slice touching tutorial RNG or screens (regression only).

**Lane E exit (tutorial “done” for handoff):** Player can accept tutorial at newgame, complete `tut-1` → `tut-2`, leave via portal to prior branch, with RNG+log parity on at least one locator session that exercises the path (or a dedicated tool segment once added). Then tutorial drops back to maintenance and long-tail items return to deferred backlog.

---

## Suggested Lane E slice order (after gate open)

1. MD-2 remainder wired into `applyGotoLevelDirectHeroLikeC` + `deferred_goto`.
2. MD-4 + MD-5: load `tut-1` only; `maybe_do_tutorial` → first tutorial level RNG/screens.
3. MD-6: enter/leave nhcore + `free_tutorial`.
4. MD-7: `tut-2` + exit portal.
5. Tutorial moveloop commands (kick, search, untrap, glance, …) as sessions diverge.
6. Peel `leaving_tutorial` stubs in favor of real C behavior per call site.

---

## Agent workflow hook

At the start of each port session:

1. Read [`c-to-js-port-current.md`](../../.cursor/reports/c-to-js-port-current.md).
2. If **any MD-* is unchecked**, work **Lanes A–D** only when the current slice advances an MD-* item; otherwise follow current next steps.
3. If **all MD-* are checked**, **Lane E** overrides other lanes until tutorial exit criteria above are met.

See also [`.cursor/prompts/continue-nethack-port.md`](../../.cursor/prompts/continue-nethack-port.md).
