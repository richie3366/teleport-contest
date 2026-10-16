# Review 2877 — 47ef59f73 — test_move/domove Stun dual-flat reads (D-4036)

- SHA: `47ef59f73` (cliff, 2 sites, 1 C function family: `test_move`)
- D-entry: D-4036; Ledger: hack.c (test_move; behavior-only reader fix)
- `js/` diff: `js/cmd.js` +8/−2 (domove inline gate + Ouch arm),
  `js/hack.js` +6/−3 (test_move autoopen gate + Ouch arm); test
  `scripts/door-arm-hstun.test.mjs` (new, 3 tests)

## Intent vs deliverable

Promise: mcalcmove-head writer — hero HStun-stunned via FROMFORM
(`u.HStun` set, legacy `u.Stunned` mirror unset); the door-arm gates
read the mirror only, so JS auto-opened where C bumps ("Ouch"); read
both flats in all four predicates. Diff actually changes exactly those
four predicates (two per file) plus C-cite comments. No new imports, no
helpers, no clones. Promise = diff.

## Inventory

- `domove` door prologue (js/cmd.js:≈6891–6915): changed — 2 predicates.
- `test_move` door arms (js/hack.js:545–575): changed — 2 predicates.
  C: `nethack-c/upstream/src/hack.c:989–1255` (range per
  `node scripts/csym.mjs test_move`).

## C ↔ JS fidelity

C gate (`hack.c:1100–1102`, verified in pinned source):
`flags.autoopen && !svc.context.run && !Confusion && !Stunned &&
!Fumbling`; Ouch arm (`:1113–1114`): `Blind || Stunned ||
ACURR(A_DEX) < 10 || Fumbling`. Macros (`youprop.h:80–84`, verified):
`HStun ≡ u.uprops[STUNNED].intrinsic`, `Stunned ≡ HStun`;
`HConfusion ≡ intrinsic`, `Confusion ≡ HConfusion` — C reads single
storage; there is no legacy mirror in C. The JS union
`(u.HStun | 0) || u.Stunned` / `(u.HConfusion | 0) || u.Confusion` is
the D-3772 house read idiom for desynced dual flats: here HStun was set
and the mirror unset, so the union restores exactly C's TRUE. The union
adds no new wrongness class in the reverse direction (mirror set, H
clear reads the same as the pre-fix mirror-only code). Predicate order
and the surrounding arms (doopen_indir call, door_opened/move writes,
usteed/Ouch branches) are untouched. Both copies fixed (hack.js live
`test_move` + cmd.js inline clone) — consistent, no divergent clone
left. No RNG in these arms either side. No symbol deleted or
re-pointed; nothing to `sym.mjs`.

## Hallucinations / overclaim

None. The divergence attribution (JS trailing `confdir` :816 as the
extra rn2(8)) is presented as a consequence of the wrong gate, and the
lock.js:816 latent is explicitly Named as (2) with the post-fix
unreachability argument rather than claimed fixed. The direct
`verify test_move` unchanged rows (Knight-610057, Samurai-620029) are
disclosed as separate lower cliffs, not swept.

## Density

Cliff-phase: mcalcmove-head writer, one C locus, both JS copies in one
commit, `Ledger` updated. Named omits (1)–(3) are real deferrals with
owners (ooze/Underwater arms → Knight row; lock.js cross-file audit;
D-3772 mirror sync), not movement laundering. Not a no-op: `js/` +
3-test file + PASS.

## Verification

- Re-measure (this review):
  `hidden-proxy.mjs verify mcalcmove --base 47ef59f73~1 --no-reach` →
  `verify mcalcmove: 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (Barbarian-50055006 PASS) — exact match, non-vacuous (1
  blocked at baseline).
- Focused test re-run: `# pass 3, # fail 0`.
- D-log Verify bullet: syntax 2 files, rule2, REACH-OK 80/80 + smoke
  24/24, green + strict ×2, cohort 7/7, auto full 44/44 (shared file) —
  shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); diff has no
  imports at all, no FORCE/DIAG/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
