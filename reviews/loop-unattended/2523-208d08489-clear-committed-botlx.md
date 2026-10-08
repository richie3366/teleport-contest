# Review 2523 — 208d08489 — clear_committed_status preserves botlx (D-3644)

- SHA: `208d08489` (2026-10-08) — cliffs-head `do_statusline1` writer
- D-entry: D-3644; Ledger: `select_menu` by-design (D-3644 appended)
- js diff: `js/display.js` +12/−4 (comment + drop one line),
  `js/invent.js` +5/−6 (drop redundant force-restore); new
  `scripts/select-pickone-botlx.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: post-select `clear_committed_status()` zeroed botlx after docrt
had set it, so the post-select bot() saw updated=0/botlx=false, sent
neither RESET nor FLUSH, and the fallback repainted status text PLAIN
(hitpointbar brackets without the full-HP inverse). Preserving botlx moves
Barbarian-94251 151→169 plus a Tourist-94111 bonus PASS.

Diff actually adds: the `game.flags.botlx = false;` line deleted from
`clear_committed_status`, the compensating force-restore in invent.js
deleted, both comments rewritten with C cites. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `clear_committed_status` (js/display.js:6844) | one line dropped | windows.c:1855–1865 (`select_menu`), display.c:1767, botl.c:1670–1673 |
| `dismiss_nhw_menu` (js/invent.js:3116) | force-restore line dropped, comment kept | same |

## C ↔ JS fidelity

`csym.mjs select_menu` → `windows.c:1855–1865`: the whole function only
scopes `gb.bot_disabled` around `win_select_menu` and restores it — it
clears no flags. Cites spot-checked in pinned C:

- `display.c:1767` — docrt post_map: `disp.botlx = TRUE` ("caller needs to
  call bot() to actually redraw status").
- `botl.c:255–256` — `bot()` early-returns while disabled, flags preserved.
- `botl.c:1670–1673` — `disp.botlx` → `status_update(BL_RESET, …)`.

So C's post-select postcondition is exactly (suppressed-paint,
botlx-preserved): the disabled bot() skips, then pline's flush
(`pline.c:274`) services the pending botlx after select returns and fires
BL_RESET. The old JS violated this at 5 of 6 dismiss sites: invent.js:3116
already knew the wipe must not eat botlx (it restored it), the five
`options.js` sites (9770/9780/9792/9805/9828 — confirmed via `git grep` at
this SHA) had no restore. Deleting the clear + the redundant restore unites
all six paths on C's postcondition.

RNG: none drawn on this path either side (RNG 5110/5110 matched at the
divergence — pure screen/attr writer). Branch order: the wipe still sets
suppression + clears botl/time_botl first; only the botlx clear is gone, so
no reordering.

Helper classification: `clear_committed_status` is a **JS-side
suppression helper** implementing C's disabled-bot() skip; the fix removes
a divergence from C rather than adding a clone. No symbols deleted or
re-pointed (`sym.mjs` → single def `js/display.js:6846`); no re-point check
applies.

Committed test `select-pickone-botlx.test.mjs` pins step-149 bar-on,
step-151 inverse + exact bar text — C-recorded paint. Ran green here (1/1).

Named omissions (both disclosed, neither a C-wrong on this evidence):
(1) botl/time_botl still cleared — pre-existing; EVAL's blstats compare
re-catches value changes next bot() round; (2) weapon.js:1195's direct
bot() kept though C weapon.c calls none — repaint lands one call earlier
with identical pixels since skill_advance changes no botl value. No session
evidence against either; the full-44 gate passed at ship.

## Hallucinations / overclaim

None. D-log correctly frames this as a writer port ("do_statusline1 paints
statusline1 only and is untouched here"), names the painter chain as
faithful since D-3588, and discloses the vacuous `select_menu` leg ("note
select_menu (0 blocked)"). The Archeologist-94051 non-move is triaged with
a different-writer call, not hidden.

## Density

Cliff phase: owner `botl.c` do_statusline1 was the parked-MISATTRIBUTED
cliffs head; deliverable is the writer behavior (dismiss-path botlx
postcondition), shipped whole across all six sites with measurement (env
trace: FLUSH→disabled-skip→EVAL updated=0→fallback PLAIN repaint).
Ledger entry present. No bundled file, no symptom re-port. Movement +
REACH-OK in the Verify bullet (re-measured below). Not a no-op.

## Verification

Rule #2: iteration-wide `imports.mjs --rulecheck` → clean. Diff grep:
only the commit message's "No DIAG/FORCE/seed gates" self-statement — no
production trace logic.

Re-measure (this audit):
`hidden-proxy.mjs verify do_statusline1,select_menu --base 208d08489~1
--reach-all` →

- `verify do_statusline1: 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Barbarian-94251: PASS) + REACH-OK (smoke 24/24)
- `verify select_menu: no corpus session is blocked` (vacuous, disclosed)
  + REACH-OK (smoke 24/24)

Stronger than the ship-time claim (151→169): the re-run executes current
HEAD code, so D-3645/D-3646's later moves of the same session compose to
PASS. No REGRESSED, no WORSE. Movement claim true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
