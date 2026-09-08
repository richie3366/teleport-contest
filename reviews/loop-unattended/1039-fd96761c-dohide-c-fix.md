# Review 1039 — fd96761c — polyself.c dohide + domonability truthy-'\0' (D-2069)

## Metadata

- SHA: `fd96761c` — `polyself.c dohide never ported AND domonability 'let c = '\0'' is truthy in JS, so #monster as a hider always fell to "purely reflexive" (queue owner m_move, writer dohide) (D-2069).`
- JS diff: `js/polyself.js` +211/−8 (dohide + youhiding + Flying/plur locals, `c` fix, hide-arm wiring, import extensions).
- Docs: D-2069 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1039.

## Intent vs deliverable

Subject promises two coupled fixes: (1) port `dohide`/`youhiding` so
`#monster` as a hider hides instead of falling to the reflexive tail;
(2) `let c = '\0'` (truthy length-1 string in JS) skipped every
c-gated arm — the no-answer state must be falsy `0` like C's `'\0'`.
Diff actually adds both, plus wiring `might_hide → dohide()`. Promise
== diff.

## Inventory

- New exports: `dohide` (js/polyself.js:1617, async), `youhiding`
  (async). New file-local CLONEs: `Flying()` (eat.js idiom),
  `plur()` (end.js idiom).
- Changed: `domonability` (`c` init + hide-arm target + omission
  comment); header omission list shrinks correctly.
- No deleted symbols (no `sym.mjs` re-point check owed); `sym.mjs
  dohide` → single `js/polyself.js:1617 ASYNC`, no clones.
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `dohide` (`polyself.c:1776–1874`, via `csym.mjs`), branch-by-branch:
ustuck/utrap refuse with the nested `You_cant` reason ternary ✓ (JS
keeps the exact nesting — trapped/swallowed/engulfed/being-held/
holding — composed as `You can't hide while you're ${why}.`, the
`You_cant` expansion); reveal (`uundetected=0`, `m_ap_type=NOTHING`,
`newsym`) ✓; eel-out-of-water (fountain `pline_The` vs `There` +
`hliquid`) ✓; hides_under pile (`otop` null → `There`; CORPSE +
`touch_petrifies` walk with `ct += quan`; all-'trice +
`!Stone_resistance` → `cxname`/`an`/`plur` + `instapetrify(kbuf)`,
life-saved falls to `uundetected=0` + `ECMD_TIME`) ✓;
`on_ceiling && !has_ceiling` ✓; floor-hider on Air/Water ✓; C's own
furniture TODO kept as a comment ✓; already-hiding →
`youhiding(FALSE,1)` ✓; mimic set (`M_AP_OBJECT`/`STRANGE_OBJECT`,
dialog still deferred per C's own comment) vs `uundetected=1` +
`newsym` + `youhiding(FALSE,0)` + `ECMD_TIME` ✓. Zero RNG on both
sides. `M_AP_TYPE(you)` for `U_AP_TYPE` rides the D-2066 mask fix.

C `youhiding` (`insight.c:2021–2077`, via `csym.mjs`): mimic detail
(object `an(simple_typename(mappearance))` / furniture `something` /
monster `someone` / unexpected fallthrough) ✓; eel `in the
waterbody` (pool-only, else bare `hiding`) ✓; hides_under
`underneath ansimpleoname` (null-safe) ✓; clinger-or-Flying `on the
ceiling` ✓; pit (`in a [spiked ]pit` via live `t_at`) vs `surface`
— JS flattens C's nested `else { if (utrap...) }` into `else if`,
semantically identical ✓; `via_enlghtmt → you_are` arm is a named
omission (JS enlightenment never calls youhiding; `return` documented
in the header) ✓; FALSE arm `You("are %s %s.")` ✓.

`Flying()` is token-identical to eat.js:1094–1103 (verified by direct
read) — CLONE, verified. `plur` matches the end.js:378 idiom.
`Stone_resistance` (C `youprop.h:65`: intrinsic||extrinsic) gains a
harmless `u.Stone_resistance` flat disjunct, same accommodation as
D-2067. `humanoid`/`FLYING`/`IS_FOUNTAIN`/`is_hider`/`hides_under`/
`webmaker`/`newsym` are all pre-existing imports (verified in-file).

Callee closure, all LIVE, zero new module edges (`--can` on all five
new-name edges → ALREADY): `sticks` (engrave), `ceiling`/`t_at`/
`instapetrify` (trap), `has_ceiling` (dungeon), `digests` (mhitu),
`waterbody_name` (hack), `hliquid` (do_name),
`is_clinger`/`touch_petrifies` (monsters), `objects_at` (mkobj),
`cxname`/`ansimpleoname`/`simple_typename` (objnam). No STUB in a
live arm. Named omits (`youhiding` TRUE arm, `dogaze`/`dospinweb`,
`pet_ranged_attk`) stay queued/listed, not silently dropped.

## Hallucinations / overclaim

None. «Hoisted-function SAFE per `--can`» re-verified (all ALREADY —
stronger than claimed: not even new edges). The `/tmp` replay-driver
topline check is outside-the-repo scratch per the rules, correctly
not committed.

## Density

211 insertions for two full C functions + a one-line truthiness fix +
wiring in one module, one locus family. At the §2b ceiling but every
line is the named envelope (no glued subsystem). Acceptable.

## Verification

D-log Verify bullet: `verify --fn m_move` → Wizard-92076 94 →
`rehumanize`@100 (strictly later owner), Caveman-92202@103 unchanged
(parked cnt/mtrack writer) + green/strict/cohort. Re-measured myself:
`hidden-proxy.mjs verify m_move --base fd96761c~1` → `0 PASS, 1 moved
past, 1 unchanged, 0 worse → PROGRESS` with both rows identical to
the claim. No WORSE, no vacuous check (2 sessions at baseline, both
named).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
