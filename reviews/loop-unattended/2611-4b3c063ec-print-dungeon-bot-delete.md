# Review 2611 — 4b3c063ec — print_dungeon deletes post-menu bot() (D-3743)

Metadata. SHA `4b3c063ec` (2026-10-09), D-3743, parent `6dba482a5`.
js diff: `js/dungeon.js` +14/−10 in `print_dungeon` (delete the
eager `bot()` + stale comment, replace with the C guard/no-op
cite; doc comment updated). Ledger: `print_dungeon` ported
(D-3743 appended). Works its HEAD's cliffs head (`botl.c`
do_statusline2, 8 blocked — verified in the parent queue; the
row's region-heuristic note says to port the writer, which this
does).

## Intent vs deliverable

Promise (subject + D-log): 3 probes show status row 23 `T:` as
C N vs JS leave-time moves (53 vs 96, 334 vs 337, 17 vs 146)
while `game.moves` is correct — the D-0568 post-menu `bot()`
painted pre-restore moves and consumed botlx, so the Resetting
pline's flush found no flag. Delete it; the preserved botlx
drives the repaint at the next pline. Claimed: do_statusline2 0
PASS + 4 moved + 4 unchanged (different writers) + 0 worse,
REACH-OK, 44/44 incl. D-0568's seed0373.

Diff actually deletes exactly that call + import. Promise and
diff match. No behavior added anywhere.

## Inventory

Changed JS function (1):

- `print_dungeon` — `js/dungeon.js:3601–~3615` (bymenu tail).
  C: `dungeon.c` print_dungeon `:2289–2438` (`csym` range;
  bymenu tail = end_menu → select_menu → destroy_nhwindow →
  return, no bot()); `windows.c` select_menu `:1859–1863`
  (bot_disabled guard, verified); `wintty.c`
  tty_select_menu `:2792–2795` (display + dismiss inside the
  guard, verified at `win/tty/wintty.c`); tty_destroy
  `:2018–2019` (`if (cw->active)` — no second dismiss, no-op
  for the inactive menu, verified); `display.c` docrt `:1769`
  (`disp.botlx = TRUE`, "caller needs to call bot()",
  verified); `botl.c` bot `:255/:277` (bot_disabled early
  return, verified).

## C ↔ JS fidelity

**The C chain holds end to end** (every cite re-read, none
trusted): print_dungeon never calls bot(); select_menu wraps
the tty call in bot_disabled=TRUE/restore; the tty dismiss
runs inside that guard, so its docrt sets botlx while any
bot() is suppressed; destroy finds the window inactive and
does nothing further; the flag survives to the next pline's
flush (vpline.c:274 → bot()). The deleted JS call ran *outside*
any guard — painting pre-restore moves and clearing the flag —
which is precisely backwards from C. Deletion is the faithful
port; there is no replacement code to audit.

**JS flag path.** `flags.botlx` is set-not-cleared on the
dismiss path (`js/display.js:6554`, `:8013`, verified) and the
module already documents the select_menu preservation
(`:6934–6940`, citing the same windows.c guard) — this hunk
removes the one call that contradicted it. The removed
`await import('./display.js')` was local to the hunk; the
static import (`dungeon.js:159`) and other dynamic imports are
untouched; no remaining `bot()` call in dungeon.js (only the
new cite comments). D-0568's seed0373 session repaints via the
flag at its own prinv pline — still PASS per the claimed full
44/44 (this audit's overlay re-runs it).

**Callers.** Both C call sites pre-wired and unchanged
(teleport.c:1228 level_tele → js/teleport.js:2316;
wizcmds.c:221 → js/wizcmds.js:697); signature kept. No symbol
deleted or re-pointed (a dynamic-import *use* removed, no
binding changed), so no `sym.mjs` paste required.

**Named omissions:** none new.

## Hallucinations / overclaim

None. "Status paint is stale, not the state" was probed
in-process (`game.moves` correct at capture). Diff grep hits
are commit-message prose only (seed0373 session id, no control
flow). Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is do_statusline2 (8 blocked, RNG
lost 73166, region-heuristic owner); this commit ports the
writer the differing value (`T:` moves) names — a deletion,
which is the whole fix — and moves 4 sessions including all 3
probes. The 4 unchanged carry different toplines (different
writers, itemized in the re-measure). One cliff, one C locus,
no bundling. Correct gates (green/strict/cohort + full 44/44
incl. the ^V users and seed0373).

## Verification

D-log Verify (`verify.mjs --fn print_dungeon,do_statusline2`):
print_dungeon note (writer, none blocked — honest);
do_statusline2 0 PASS + 4 moved + 4 unchanged + 0 worse →
PROGRESS; REACH-OK both (smoke 24/24); green/strict/cohort
PASS; full 44/44.

Re-measured by this audit (`verify
print_dungeon,do_statusline2 --base 4b3c063ec~1 --reach-all`):

```text
verify do_statusline2: 0 PASS, 4 moved past (1 still do_statusline2 at a later step), 4 unchanged, 0 worse → PROGRESS
smoke do_statusline2: ... 24 PASS, 0 regressed → REACH-OK
```

All 4 moved land exactly as claimed (95303 → distfleeck@237,
95334 → level_tele@569, 95240 → level_tele@488, 95221 →
do_statusline2@388 +206); the 4 unchanged show the claimed
distinct toplines. No vacuous check (row cited 8; all 8
itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
