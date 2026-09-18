# Review 1419 — 78b9ec99 — mon_wield_item whole-body completion (D-2460)

Metadata: SHA `78b9ec99`, `js/weapon.js` only (restart of
`mon_wield_item` in C order). Coverage gap (0 blocked), not a corpus
fix. D-log: D-2460.

## Intent vs deliverable

Promise: port the three live arms left as a free switch (mwelded
refuse-wield, weld-on-wield, autoreturn tether) plus the default
`impossible`, the `setmnotwielded` release, and the final `owornmask`
assignment. Diff ships all six fixes, with C comments ported verbatim.
No second subsystem.

## Inventory

- Restarted: `mon_wield_item` (exported, correct — C is global).
- No new/removed helpers; no clone→import re-point (`sym.mjs` has
  nothing to check on deletions).
- Extended existing edges only: `impossible` (display.js), `the`/`Yname2`/
  `makeplural`/`is_plural` (objnam.js), `bimanual` (wield.js),
  `mhis` (mondata.js, sync). `bimanual` correctly joins the existing
  wield.js edge — `sym.mjs` shows 9 local clones elsewhere, and this
  commit adds none.
- `mon_has_shield` = `which_armor(mon, W_ARMS)` (`js/mon.js:413`) is a
  pre-existing equivalence, cited in the jsdoc.

## C ↔ JS fidelity

C `weapon.c:800–934` vs JS, arm by arm:

- Head/switch (`:806–840`): exclaim init + comment, NO_WEAPON_WANTED
  early-0, all five NEED_ arms with the KMH / 2-axes / prefer-pick
  comments verbatim, `exclaim = false` placement exact — exact.
- Default (`:841–844`): old code wrongly reset `weapon_check`; new code
  `await impossible('weapon_check %d for %s?', ...)` + bare `return 0`
  with `mon_nam` (lowercase, per C) — exact, including the printf-style
  format the codebase's `impossible` honors.
- Same-otyp early-0 (`:849–853`) — exact.
- Refuse arm (`:854–879`): "Still..." comment verbatim; `welded_buf`
  `otense-are + mhis + hand` composition exact; PICK_AXE
  `Since %s weapon%s %s,` + `cannot wield that` split exact; else
  `tries to wield` via `pline_mon` + `Yname2 ... !` exact;
  `bknown = 1` inside `canseemon`, `NO_WEAPON_WANTED` + return 1 —
  exact. `plur` is the pre-existing file-local C-cited helper.
- Release (`:880–882`): `mon.mw = obj` + `setmnotwielded(mon, mw_tmp)`
  in C order. `setmnotwielded` is sync (`js/weapon.js:103`); the
  `if (sm) await sm` wrapper is harmless.
- Wield pline + tether (`:884–890`): `wields %s%c` with `!`/`.` exact;
  `arw && arw.tethered` (= C `!= 0`) → `secures the tether` via
  `pline_mon` + `the(xname)` — exact.
- Weld toggle (`:891–906`): `|= W_WEP` → test → `&= ~W_WEP`, with the
  3.6.3 comment verbatim; `Tobjnam weld + themselves/itself + s_suffix
  hand!` + `bknown = 1` inside `canseemon` — exact.
- Artifact-light arm (`:918–928`): pre-existing + the invisible-monst
  comment verbatim — untouched, correct.
- Final (`:929–934`): `obj.owornmask = W_WEP` assignment (was `|=`,
  the real fix) + `return 1`; fallthrough `NEED_WEAPON` + `return 0` —
  exact. No RNG in C outside the pre-existing select_* callees; none
  added.

## Hallucinations / overclaim

None. "0 blocked" framed as coverage; "Named: none new in-body" is
accurate (caller defers live with their owners).

## Density

One C function restart, one module: right-sized.

## Verification

- `hidden-proxy verify mon_wield_item --base 78b9ec99~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); no RNG-tagged
  reach, fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
