# Review 2605 — 98020c173 — D-3736 park resolved, 4-writer set (D-3737)

Metadata. SHA `98020c173` (2026-10-09), D-3737, parent `b8a250bbe`
(D-3736 no-js park). js diff: `js/options.js` +20/−33 (menu
nav/unknown keys), `js/mon.js` +7/−0 (migrant redraw),
`js/wizcmds.js` +8/−0 (hallu uprops), `js/cmd.js` +12/−3 (blind
feel_location ×3 + import). Ledger: `mon_leaving_level` ported,
`wiz_map` ported, `domove_core` partial bumped; **no menu-arm
ledger entry** (see Debt). Closes the D-3736 park (falsifier
claimed fired).

## Intent vs deliverable

Promise (subject + D-log): resolve the D-3736 park on head probe
scen-sweep-Caveman-95341 @276 (arrival-map screen, core RNG matched
through 31888/45831). The park's "game-RNG regression" (31888 →
11569) is re-read as a positional-count artifact (first core
divergence moved 344 → 349), dissolving the load-bearing-channel
premise; the separated fix ships 4 writers: (1) page/stay/unknown
menu keys re-prompt without dismissing; (2) the migrant is
MON_OFFMAP only for its leaving newsym, then restored; (3) wiz_map
saves+clears the CONFUSION/HALLUC uprops intrinsics; (4) domove
calls feel_location on the three Blind test_move arms. Claimed:
95341 FULL PASS; level_tele 1 + 0 + 6; REACH-OK ×5; full score
999/1113 (was 989), 0 PASS→FAIL, this commit's FAIL→PASS = 95341 +
95430 + 95434 + 95437.

Diff actually adds exactly those 4 changes. Promise and diff match.

## Inventory

Changed JS functions (4):

- `select_menu_pick_one` — `js/options.js:9934–9985` (nav/unknown
  `continue` before dismiss; finishing logic restructured).
  C: `wintty.c` process_menu_window `:1407–1413` (page repaint,
  no docrt) + `:1622–1648` (page keys stay modal) + destroy →
  `erase_menu_or_text :966–980` (one docrt on finish).
- `mon_leaving_level` — `js/mon.js:2145–2158` (temp MON_OFFMAP).
  C: `mon.c:2696–2730` (`csym`-adjacent; grid clear + `newsym`
  of the empty cell at `:2718–2726`).
- `wiz_map` — `js/wizcmds.js:634–676` (uprops save/clear/restore).
  C: `wizcmds.c:180–193` (`HConfusion = HHallucination = 0`).
- `domove` — `js/cmd.js:6669–6740` (3 feel_location arms + import).
  C: `hack.c` test_move `:1012–1013`, `:1076–1077`, `:1144–1145`.

## C ↔ JS fidelity

**Menu keys.** C `:1620–1629` (verified by read): `' '`/
MENU_NEXT_PAGE advance unless on the last page, where only `' '`
finishes (`'>'` stays). C `:1630–1647`: PREV/FIRST/LAST reset
`page_start` (stay modal). C `:1407–1413`: page repaint clears the
screen (`term_clear_screen` fullscreen), no docrt. JS: space on
non-last and `'>'` advance-or-stay (`if (!lastPage) currPage++;
continue`); `'<'`/`'^'`/`'|'` adjust + `continue`; unknown keys
(`!finishing && !hit && !ghit`) `continue` — all before
`dismiss_nhw_menu`, so no docrt on nav, matching C's nav-zero
display RNG (corroborated by the quoted display-stream counts:
0 draws on the page key, 23 on the pick, 3 on the following ^F).
Finishing keys (ESC/CR/LF/last-page space) still dismiss exactly
once, then pick-selected-or-cancel — the ESC-deselect arm
(`:1604–1611`, JS cite `:1604–1631` covers it) and last-page-space
semantics preserved from the old code. Loop `continue` repaints via
the loop head (`paint_corner_nhw_menu` + `flush_screen`) — no
docrt. No RNG in these arms either side. One nit (pre-existing,
not queueable): C FIRST/LAST skip the repaint when the page does
not change; JS repaints unconditionally — same as the old code, no
session evidence, display-only.

**Migrant redraw.** C removes the mon from the grid
(`remove_monster`) then `newsym`s the empty cell. JS `m_at`
(`mon.js:1725–1739`, verified) falls through to a `game.fmon` scan
that skips only MON_OFFMAP mons — and `relmon` unlinks the migrant
only after `mon_leaving_level` returns — so without the temp flag
the leaving newsym sees the migrant. Setting MON_OFFMAP for the
redraw alone and restoring it reproduces C's empty-cell read while
respecting D-3279 (a lasting flag strands the migrant on arrival;
the restore is in the same hunk). `MON_OFFMAP` already imported
(`mon.js:27`). No RNG. C-adaptation, correct.

**wiz_map.** C `:180–193` (verified): saves and zeroes
`HConfusion`/`HHallucination`, maps, restores. `youprop.h:83,116`
(verified): both ARE `u.uprops[].intrinsic`. JS `Hallucination()`
(`display.js:1259–1261`, verified) reads `(u.HHallucination|0) ||
(uprops[HALLUC].intrinsic|0)` — so clearing flats alone left the
map hallucinated. The fix saves+clears+restores both intrinsic
slots. C-exact, symmetric save/restore. `CONFUSION`/`HALLUC`
already in scope (`wizcmds.js:14–15`).

**feel_location ×3.** C `:1011–1013`: `if (IS_OBSTRUCTED ||
IRONBARS) { if (Blind && DO_MOVE) feel_location; ...` — JS places
the call before chew/bars handling with the identical predicate
(+`Blind()`). C `:1076–1077`: closed-door arm, first statement —
JS identical inside `closed_door_at`. C `:1144–1145`: testdiag
`if (Blind) feel_location` before the mention_walls pline — JS
identical, order exact. `feel_location` LIVE
(`sym.mjs`: `js/display.js:5655 sync`); edge ALREADY (same-edge
import-name addition onto the existing display.js import);
`Blind()` already imported (`cmd.js:69`). No symbol deleted or
re-pointed to an import in this diff (new import names only), so no
further `sym.mjs` paste is required; nothing kept is cycle-claimed.

## Hallucinations / overclaim

None material. The "falsifier fired" claim deserves one sentence:
D-3736's falsifier asked for a TEMP-C state-diff NAMING the
load-bearing state, and D-3737 instead dissolves the premise (the
11569 "regression" was positional misattribution) and validates by
outcome (the park's own prescribed shape — nav-dismiss with zero
hallu burns, return-dismiss unchanged — now FULL PASSes with RNG
matched). The [measure] step was superseded, not performed; the
FULL PASS + 0 PASS→FAIL + REACH-OK ×5 is stronger evidence than the
measurement would have been. Honest as written (the dissolution is
stated, not hidden). The "999 (was 989)" line aggregates all ships
since the last full rescore (3+2+1+4=10 across D-3731/3732/3735/
3737; this commit's 4 named) — arithmetic verified, and the audit
overlay below re-runs the full rescore anyway. Diff grep: no
`FORCE`, `DIAG`, `getRngLog`, `fastforward`, or coordinate/seed
conditionals. Rule #2: clean (global re-check this audit).

## Density

Cliff-phase §2b: at the parent commit the generated cliffs head is
`level_tele` — 7/1113, first at step 276, probe list headed by
95341, tagged `parked: DIAGNOSED` (verified via `git show
b8a250bbe:docs/LOOP-QUEUE.md`). This commit works its HEAD's
cliffs head through the writer set the head probe's successive
divergences name, resolving the park. Four C files in one commit is
at the edge of "bundles another C file's work" — held ACCEPTABLE
here because (a) the park named the menu arm and the sibling split,
(b) the other three are successive-divergence writers on the SAME
head probe (standard triage-all, each C-verified above), (c) the
probe FULL PASSes (1265/1265), which jointly proves the set, and
(d) §2b prefers one dense probe-to-PASS iteration over four thin
ones. Not an idiom sweep, not a successor lead, not ledger text.
Full 44/44 + cohort + strict run (shared display/menu-adjacent
paths) — correct gates.

Ledger debt (not a C-wrong, not Must-fix): the D-log `Ledger:`
bullet and the jsonl diff cover only 3 of the 4 loci — the menu arm
(`select_menu_pick_one`, tracked under `tty_display_nhwindow`
partial / `process_menu_window` unknown) got no D-3737 bump. The
next port iter should append it as a drive-by one-liner
(`node scripts/ledger.mjs set tty_display_nhwindow ...` keeping the
standing omit) — never a row, never an iteration.

## Verification

D-log Verify (`verify.mjs --fn
level_tele,select_menu_pick_one,mon_leaving_level,wiz_map,domove`):
`level_tele`: 1 PASS + 0 moved + 6 unchanged + 0 worse → PROGRESS;
REACH-OK ×5; green/strict/cohort/full PASS → VERIFY: PASS.

Re-measured by this audit (same 5 fns, `--base 98020c173~1
--reach-all`; HEAD == this SHA, so current-code re-run is exact):

```text
verify level_tele: 1 PASS, 0 moved past, 6 unchanged, 0 worse → PROGRESS
reach level_tele: 1 baseline-PASS session(s) reach it (1 run): 1 PASS, 0 regressed → REACH-OK
smoke select_menu_pick_one: ... 24 PASS, 0 regressed → REACH-OK
smoke mon_leaving_level: ... 24 PASS, 0 regressed → REACH-OK
smoke wiz_map: ... 24 PASS, 0 regressed → REACH-OK
smoke domove: ... 24 PASS, 0 regressed → REACH-OK
```

95341 PASS confirmed; the 6 unchanged match D-3736's sibling-writer
split (95234 quest-message heat/smoke; 95231/95228 More-vs-none;
95238/95214/95218 identical-topline map diffs). 0 worse, 0
regressed. The 4 writer fns show 0 blocked (writers, not owners —
honest, as in D-3731/3732/3734). No vacuous check (row cited 7;
1 PASS + 6 itemized unchanged).

## Actionable C-wrongs

None.

Verdict: **ACCEPT-WITH-DEBT**
