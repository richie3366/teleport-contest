# Review 1817 — d2761e4d9 — status_initialize (D-2858)

- SHA: `d2761e4d9` (coverage; `botl.c` `status_initialize`)
- Files: `js/botl.js` (+214), `js/options.js`, `js/polyself.js`, `js/allmain.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `status_initialize` in C order: a second full init calls `impossible` and continues; reassess panics when `blinit` is false; the nested enable `?:`; `BL_TITLE` + `wc2_hitpointbar` uses `"%-30.30s"`; then `update_all`, `disp.botlx`, and `flags.botlx`. `init_blstats` no longer sets `blinit`. `tty_status_init` / `genl_status_init` and the doset / polymorph / `new_status_window` callers come with it. The diff is that function plus those helpers and the four call sites.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `status_initialize` | sync export `botl.js:342` | `botl.c:1682–1720` |
| `tty_status_init` | sync `botl.js:315` | `wintty.c:4336–4361` |
| `genl_status_init` | sync `botl.js:280` | `windows.c:892–906` |
| `genl_status_finish` | sync `botl.js:293` | `windows.c:909–919` |
| `genl_status_enablefield` | sync `botl.js:300` | `windows.c:922–931` |
| `new_status_window` | sync `botl.js:392` | `wintty.c:491–507` |
| `init_blstats` | existing; `blinit` write removed | `botl.c:1759–1788` |

`sym.mjs`: `status_initialize` `botl.js:342` sync; `tty_status_init` `:315` sync; `genl_status_init` `:280` sync; `new_status_window` `:392` sync; `init_blstats` `:168` sync. Nothing deleted. `hitpointbar` doset now writes `iflags.wc2_hitpointbar` (the C address).

## C ↔ JS fidelity

`csym` body is `botl.c:1682–1720`. Callers: `allmain.c:721`, `options.c:5350` and `:5389`, `polyself.c:123`, `wintty.c:505`.

Full init: if `gb.blinit`, `impossible("2nd status_initialize with full init.")` and continue. `init_blstats()`, `tty_status_init()`, `blinit = TRUE`. Reassess with `!blinit` throws `"status 'reassess' before init"` (C `panic`, does not return). The enable bit is the same nested `?:` (`BL_SCORE` `showscore`, `BL_TIME` `time`, `BL_EXP` `showexp && !Upolyd`, `BL_XP` `!Upolyd`, `BL_HD` `Upolyd`, `BL_VERS` `showvers`, `BL_WEAPON` `weaponstatus`, `BL_ARMOR` `armorstatus`, `BL_TERRAIN` `terrainstatus`, else true). `BL_TITLE` with `wc2_hitpointbar` uses `"%-30.30s"`. Then `gu.update_all` and `disp.botlx`. JS also sets `flags.botlx` because `bot()` reads that store (`botl.js:983`). No RNG.

`tty_status_init` picks `twolineorder` unless `StatusRows() == 3`, zeros NOW/BEFORE (`idx = BL_FLUSH`, `NO_COLOR`, `ATR_NONE`, `x`/`y` 0, flags false) keeping `lth`, clears condition bits and the hp-bar pair, then `genl_status_init`. Rows 0–1 of `twolineorder` and all three `threelineorder` rows match `wintty.c:4278–4298`. The unused third row of `twolineorder` (`wintty.c:4285–4287`) is `BL_FLUSH` plus 15 pads; C zero-fills the last three slots to `BL_TITLE`. JS has 16 pads and two `BL_TITLE`. `render_status` does not read `ttyFieldorder` (named).

`genl_status_init` empties `status_vals`, clears active and fmt, sets `WIN_STATUS` to 11. It does not call `display_nhwindow(WIN_STATUS, FALSE)` (`windows.c:905`). Named. `new_status_window` drops the window to `WIN_ERR`, finishes, inits, then reassesses. It does not call `tty_clear_nhwindow` / `tty_destroy_nhwindow`. Named. Its C callers `winch_handler` (`wintty.c:431`) and `tty_preference_update` (`wintty.c:602`) have no JS site.

`allmain.c:720–724`, `options.c:5331–5351`, `options.c:5386–5390`, and `polyself.c:121–124` are behind `VIA_WINDOWPORT()`. JS uses the same test on `windowprocs.wincap2`. That word stays unset, so the scored boot stays on `create_nhwindow(NHW_STATUS)` and the reassess calls do not run. `tty_procs` would set `WC2_HILITE_STATUS|WC2_FLUSH_STATUS` (`wintty.c:116`). Named. `init_blstats` was not called from anywhere else before this commit, so moving `blinit` into the gated function does not clear a flag the scored boot used to set.

Doset: `terrainstatus` calls `classify_terrain` then the `wc2_supported` gate; a miss returns without reassess (C `return optn_ok` at `:5341`). Supported terrain/weapon/armor and showscore/showvers/showexp/time reassess once and set `flags.botl` for `disp.botl`. `hitpointbar` reassesses and `mark_opt_need_redraw` only when the gate is true. `weaponstatus` / `armorstatus` doset still write `iflags` while this function reads `flags`. Named, and the call does not run while `wincap2` is unset.

## Hallucinations / overclaim

The subject does not say the scored boot now calls `status_initialize`. It says the else arm stays until `wincap2` is set. That matches `allmain.js:204–208`. "Match C" is the function body and the caller predicates, not a live window-port boot.

## Density

The 39-line C function, the tty/genl helpers it calls, and the five C call sites. Under the 200-line floor because the C body is that small; the extra lines are the field-order tables and the enable helpers.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify status_initialize --base d2761e4d9~1 --reach-all`.

```
verify status_initialize: baseline d2761e4d9~1 (scoreboard at 2c0c6d7ee) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke status_initialize: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None. The unread third row of `twolineorder` is one pad off C's zero-fill and is not a live arm.

Verdict: **ACCEPT**
