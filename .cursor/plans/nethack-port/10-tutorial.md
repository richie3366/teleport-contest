# Satellite plan: Tutorial (`tut-1` / `tut-2`)

Parent: [`docs/plans/tutorial-port-gate.md`](../../../docs/plans/tutorial-port-gate.md) — **do not start this checklist until all MD-1 … MD-7 are satisfied.**

## Status

- **Scaffolding:** [`tutorial_branch.js`](../../js/tutorial_branch.js), [`tutorial_prompt.js`](../../js/tutorial_prompt.js), [`moveloop_preamble.js`](../../js/moveloop_preamble.js) `maybeDoTutorialLikeC`.
- **Blocked:** nhcore `tutorial()`, `savelev` lifecycle, `tut-*.lua` in Fengari — see gate doc.

---

## Exit criteria (Lane E complete)

- [ ] `maybe_do_tutorial` → `tut-1` with C-faithful RNG (core + Lua) on a locator segment
- [ ] Play through `tut-2` and exit via magic portal to `u.ucamefrom`
- [ ] `free_tutorial` / `gmst_*` on leave; no re-entry (`tutorial_reentry_blocked`)
- [ ] Status line shows `Tutorial:` depth while `In_tutorial`
- [ ] `npm run score` — no regressions on `seed0077` / `seed8000` (and any session that skips tutorial)

---

## Checklist (after gate open)

### Enter tutorial

- [ ] `ask_do_tutorial` — rc `OPTIONS=tutorial` fast path + TTY menu (mostly done; verify ESC/`n`/`y` RNG)
- [ ] `schedule_goto` / `deferred_goto` → full `goto_level` with MD-2 save/free
- [ ] `tutorial(TRUE)` — nhcore enter (`nhlua.c`)
- [ ] `mklev` loads **`tut-1.lua`** (not generic maze)
- [ ] `vision_recalc` + `docrt` after arrival (wired; re-verify screens)

### `tut-1` gameplay

- [ ] `nh.eckey` strings on engravings match C keymap
- [ ] `nh.parse_config` newbie-friendly options
- [ ] Doors, traps, secret, dark corridor — des + command parity as inputs arrive
- [ ] Wear / wield / pickup / curse / scroll slices tied to real invent

### `tut-2` + leave

- [ ] Load **`tut-2.lua`**
- [ ] Magic portal between tutorial levels and final exit
- [ ] `tutorial(FALSE)` + `leaving_tutorial` + `free_tutorial`
- [ ] `cant_go_back` level discard (tutorial branch only)
- [ ] Clear `leaving_tutorial` at moveloop tail ([`moveloop_turn_advance.js`](../../js/moveloop_turn_advance.js))

### Long tail (during Lane E, not gate blockers)

- [ ] `dokick` / `dothrow` vs `leaving_tutorial` beyond [`shop.js`](../../js/shop.js)
- [ ] `end.c` abandon-tutorial `y_n` if session quits from tutorial
- [ ] `dungeon.c` mapseen tutorial filter (`interesting_level`)

---

## C reference quick map

| Topic | C |
|-------|---|
| Offer tutorial | `allmain.c` `maybe_do_tutorial`, `options.c` `ask_do_tutorial` |
| Level change | `do.c` `goto_level` |
| Lua enter/leave | `nhlua.c` `tutorial`, `free_tutorial` |
| Level scripts | `dat/tut-1.lua`, `dat/tut-2.lua` |
| Branch id | `dungeon.c` `tutorial_dnum`, `dungeon.h` `In_tutorial` |

---

## Cross-links

- Gate: [`docs/plans/tutorial-port-gate.md`](../../../docs/plans/tutorial-port-gate.md)
- NHL des: [`nhl-port-notes.md`](../../reports/nhl-port-notes.md)
- Save (full): [`08-save-bones-persistence.md`](./08-save-bones-persistence.md) — MD-2 is in-memory only
- Handoff: [`c-to-js-port-current.md`](../../reports/c-to-js-port-current.md)
