# Review 1313 — e2d16801 — magic_negation hero arm (D-2347)

Metadata: SHA `e2d16801`, D-2347, corpus-backed fix (queue owner `mhitm_knockback`, 1 blocked: scen-wish-Priest-92163 step 248 kind=rng). Method: full `js/` hunks read (`mhitm.js` +26, `invent.js` re-point); C `magic_negation mhitu.c:1088-1137` full body (via `csym.mjs`), `EProtection`/`HProtection youprop.h:351-352`; `sym.mjs` on `magic_negation_you` (single def `mhitm.js:2051`, sync — required deleted-clone output below); `imports.mjs --can` invent→mhitm (ALREADY — the "IN-SCC" message is imprecise in the safe direction); flat-mirror writer audit (`u.EProtection` unwritten, `u.HProtection` maintained `eat.js:2586/2811`); added-lines banned grep (0 hits); `--rulecheck` clean (iteration run); `hidden-proxy verify mhitm_knockback --base e2d16801~1` re-run.

## Intent vs deliverable

Subject promises the `magic_negation` hero arm (amulet-of-guarding / extrinsic Protection / intrinsic floor) as exported `magic_negation_you`, retiring the invent.js subset clone. Diff delivers the full arm + the re-point. Promise kept exactly; the queue row's "arm-selection upstream" guess is corrected to the MC-state writer with a coherent causal story (negated FALSE→TRUE skips the poison `rn2(8)`, unshifting the knockback `rn2(3)`).

## Inventory

- `mhitm.js`: `magic_negation_you` local → exported + gotprot/amulet/intrinsic arms; `PROTECTION` joins the existing const import (`W_AMUL`/`objectNames` already imported).
- `invent.js`: 11-line local clone deleted → canonical import; docstring updated.

## C ↔ JS fidelity

Hero arm (`is_you`) verified branch-for-branch vs `:1088-1137`: `gotprot = (EProtection != 0)` rendered as flat-mirror OR uprops-extrinsic (C ≡ uprops per `youprop.h:352`; flat `u.EProtection` has zero writers in `js/`, so the OR ≡ C on all states; `eat.js:746` idiom) ✓; worn-`W_ARMOR` a_can max (`oc_level` mapping pre-existing) with C's own `else if W_AMUL` shape (`via_amul` overwrite, not `||=`) ✓; `is_you || gotprot → continue` correctly compiled out (hero-only function; monster arm stays `magic_negation_mon`, D-1405, dispatched at `:2110-2111`) ✓; `mc += via_amul ? 2 : 1`, cap 3 ✓; `else if (mc < 1)` intrinsic floor (`HProtection ≡ uprops-intrinsic` per `:351`, flat mirror maintained; `ublessed > 0`, `uspellprot`) ✓. Pure read-only scan, no RNG/display either side.

Required deleted-clone output:

```text
magic_negation_you js/mhitm.js:2051   sync
```

Single definition; the invent.js clone is gone, its two enlightenment callers re-pointed (same C function per `insight.c` — correct import, not a new clone).

## Hallucinations / overclaim

None. "Monster clause omitted — hero-only function" is accurate (the C monster clauses are `PM_HIGH_CLERIC`/`PM_ALIGNED_CLERIC`/minion tests, all mon-side).

Companion details confirmed while auditing (no action):
- C `EProtection`/`HProtection` are pure uprops aliases (`youprop.h:351-352`); flat-mirror ORs collapse to C exactly.
- Flat `u.EProtection` has zero writers in `js/` (always falsy, harmless); flat `u.HProtection` is maintained (`eat.js:2586/2811`).
- `via_amul` is overwrite-per-worn-amulet both sides (not `||=`), matching C; single-worn-amulet makes it moot.
- `PROTECTION` joins the existing const import; `W_AMUL`/`objectNames` already imported (`mhitm.js:84/110`).
- Per-function `objectNames.indexOf('AMULET_OF_GUARDING')` is style, not fidelity. Added-lines banned grep: 0 hits.

Session mechanism re-checked end to end:
- `mhitm_mgc_atk_negated` dispatches `magic_negation_you()` for hero defenders (`mhitm.js:2110-2111`) vs `magic_negation_mon` (D-1405) otherwise.
- Gotprot now true → negated FALSE→TRUE → poison `rn2(8)` skipped → knockback `rn2(3)` lands in its C slot — exactly what the re-run PASS shows.

## Density

One C function + clone retirement across two linked files. Good.

## Verification

D-log tail PASS (hidden 1 PASS). Re-measured:

```text
verify mhitm_knockback: baseline e2d16801~1 — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-wish-Priest-92163: PASS
verify mhitm_knockback: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine PROGRESS on the exact session/step the commit claims — not vacuous, no D-1831 gap (verify ran on this SHA's code). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
