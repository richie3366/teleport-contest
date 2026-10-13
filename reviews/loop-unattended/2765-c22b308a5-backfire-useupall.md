# Review 2765 — c22b308a5 — backfire useupall after survived fatal losehp

- SHA: `c22b308a5` (D-3912)
- Scope: `js/zap.js` +9/−2, 1 test, ledger `zap.c.jsonl` (backfire ported)
- Method: cliff commit (1 function family); full Method per function + re-measure

## Intent vs deliverable

Promise (subject + D-log): cliffs-head `invent.c` getobj (Knight-587209
s79) is symptom-only; the writer is `zap.c` backfire, which skipped
`useupall` after a survived fatal losehp (wizard Die?-decline), so the
exploded wand survived and the second `z` re-prompted. Probe claimed to
move 79 → mhitm_ad_curs@561.

Diff actually adds: in `js/zap.js` backfire, after
`finish_losehp_done()` return only while `gameover` is still true,
otherwise `useupall(otmp)`; doc comment corrected to the end.c
survive-return. Plus `scripts/backfire-survived-useupall.test.mjs`
(pins C toplines s73–s79). No other JS function touched.

## Inventory

- `backfire` (js/zap.js:7353, local — matches C `staticfn`):
  C zap.c:2604–2614 (`csym` range). Changed: survived-fatal arm.
- No helpers added, deleted, or re-pointed (clone→import: none, so the
  `sym.mjs` paste requirement is vacuous; callee check below).

## C ↔ JS fidelity

C `backfire` (zap.c:2604–2614, via `csym backfire`): `in_use=TRUE`
(:2608) → pline explode (:2609) → `dmg = d(spe+2,6)` (:2610) →
`losehp(Maybe_Half_Phys(dmg),…)` (:2611) → `useupall(otmp)` (:2613,
unconditional). Sole caller dozap :2648 (`--callers` + :2640–2655 read).

JS (js/zap.js:7353–7369) walks it call-for-call: `in_use=true`, awaited
explode pline, `d(spe+2,6)` (single RNG draw, same position), `losehp(
maybe_half_phys(dmg),…)`. Fatal path: `finish_losehp_done()`, then
`if (gameover) return; useupall(otmp); return`. Non-fatal path:
`finish_maybe_wail()` + `useupall` (pre-existing D-3795 shape).

Survive-return confirmed in pinned C: end.c done :1019–1126 sets
`survive=TRUE` on wizard Die?-decline (:1112–1118, savelife) and
`return`s at :1119–1123; only a true gameover falls into noreturn
`really_done`. So "C done() is noreturn" (the old comment) was false on
exactly this path, and falling through to `useupall` is C-exact. Wail:
hack.c losehp :4284–4290 puts `maybe_wail()` only in the non-fatal
`else` (:4289–4290), so no wail drain on the survived-fatal path is
correct. Caller tail (js/zap.js:7397–7402) matches C :2648–2652:
backfire → gameover→return → `exercise(A_STR)` → return ECMD_TIME,
skipping `update_inventory` since useupall→freeinv did it — and on the
declined-death path C likewise skips it. Callee `useupall`: LIVE
(`sym.mjs`: `js/invent.js:5066 sync`, already imported at zap.js:239 —
no new edge). RNG: one `d()` draw both sides, same order. Prints: all
four C effects present on every path.

## Hallucinations / overclaim

None. "backfire now whole vs C :2604–2614" is accurate — every line of
the 11-line body has its JS counterpart, and the sole C caller was
already wired. The D-log does not claim getobj itself was touched.

## Density

Cliff-phase: getobj was the Open — cliffs head at the parent
(9a3eefb99 block: 1 block, RNG lost 73299, Knight-587209 s79 — verified
in the parent tree, not just the D-log). Owner-vs-writer discipline
kept: getobj stands (D-3804 whole, D-3859 read once per tag), the port
is the writer. One cliff, one C file, code + ledger + test + verify in
one handoff. `Ledger: backfire ported` present. Not a no-op (js/ +9/−2
with movement), not unreached work (probe session moved).

## Verification

Re-measured myself (`verify getobj,backfire --base c22b308a5~1
--reach-all`):

- `verify getobj: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Knight-587209: moved → mhitm_ad_curs at step 561, was 79)
- `smoke getobj: 24 PASS, 0 regressed → REACH-OK`; `smoke backfire: 24
  PASS, 0 regressed → REACH-OK` (backfire itself blocks no session —
  named as the writer, not overclaimed as an owner verify)
- Zero `worse`/REGRESSED rows. Matches the D-log Verify bullet exactly.

Grep of the js/ hunk: no FORCE/DIAG/getRngLog/fastforward/seed logic
(the two grep hits are the session id and the "No DIAG/FORCE" sentence
in the commit message prose, not code). `imports.mjs --rulecheck` over
scored `js/`: "Rule #2 clean". No seed/step/coordinate reads. New test
asserts C toplines, not trace-shaped production.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
