# Review 1094 — a7ae28e5 — mhitm_ad_plys mon→mon arm (D-2128)

Metadata: SHA `a7ae28e5`, `js/mhitm.js` +42/−0 only. Queue row
`uhitm.c` mhitm_ad_plys, scen-poly-Monk-92005 step 78/106, RNG-first
at `uhitm.c:3437`: C `rn2(3)=0 @ mhitm_ad_plys` vs JS `d(3,6)=3 @
passive`. No prior review claimed closed.

## Intent vs deliverable

Subject promises: the mhitm (mon→mon) freeze arm — C draws `!rn2(3)`
first where JS drew knockback dice. Diff actually adds: exported
`mhitm_ad_plys` + AD_PLYS dispatch in `mdamagem`. Promise matches
diff. Special circumstance, handled honestly (see Verification): the
queue row was STALE on arrival — D-2091's uhitm arm had already moved
the session — and the D-log says so up front instead of claiming the
corpus move.

## Inventory

Changed JS: `mhitm_ad_plys` (new), `mdamagem` AD_PLYS dispatch (new).
Callee closure, all LIVE in-module (no new imports, no `--can`
needed):

| Symbol | Status | Evidence |
|---|---|---|
| `mhitm_mgc_atk_negated` | LIVE (`mhitm.js:2009`) | `verbosely=TRUE` matches C |
| `paralyze_monst` | LIVE (`mhitm.js:1658`, sync) | un-awaited call correct |
| `_mm_vis` + `canspotmon` | LIVE convention | same `_mm_vis` use as sibling wrap arm (:654) |
| `Monnam` / `mon_nam` | LIVE, pre-existing | untouched |

No clone, no stub. Arm boundaries respected: the uhitm you-as-agr arm
stays in `damageum_ad_plys` (D-2091), the mhitu you-as-def arm stays
named → open D-2005 (4-session unit, not poached).

## C ↔ JS fidelity

C locus `uhitm.c:3430-3476` (`csym.mjs mhitm_ad_plys`, 47 lines),
mhitm arm `:3464-3475`, read in full:

- Gate `mdef->mcanmove && !rn2(3) &&
  !mhitm_mgc_atk_negated(magr, mdef, TRUE)` — JS reproduces the exact
  short-circuit order, including draw-free `mcanmove` first (so a
  frozen defender draws nothing — confirmed by the probe).
- `gv.vis && canspotmon(mdef)` → plain `pline("%s is frozen by %s.",
  Monnam(mdef), mon_nam(magr))` — JS `_mm_vis && canspotmon` +
  identical template. (C copies Monnam into `buf` first; same string.)
- `paralyze_monst(mdef, rnd(10))` — JS identical; leftover/done
  untouched on `mhm`, as in C (the C mhitm arm never touches `mhm` —
  hence `void mattk; void mhm;` signature parity is honest).
- Dispatch matches `mhitm.c:1015-1119` (`csym.mjs mdamagem`): C runs
  adtyping → knockback (may preempt) → done → damage → HP subtract.
  The AD_PLYS arm copies the AD_PHYS fall-through shape exactly
  (done||!damage → knockback + return hitflags, else shared
  knockback → checks → HP), verified by reading the JS tail.
  `MON_WEP`-vs-`mwep` knockback arg follows the file's pre-existing
  convention, unchanged by this diff.

## Hallucinations / overclaim

None — and credit for the opposite: the entry declares the row STALE
(a pre-change replay probe matched all 13 recorded step-78 C draws
against on-tree JS) and does not credit this change with the corpus
move. The arm-itself proof is a deterministic hand probe of the exact
C draw triple (frozen→no draw; cancelled→`[rn2(3)]`, never
paralyzes; taken→`rn2(3)=0, rn2(10)@mgc, rnd(10)` with `mfrozen==M`,
leftover/done untouched; gate-fail→`[rn2(3)!=0]`), covering every
branch including RNG order. My independent arm-for-arm C walk above
corroborates the probe's expectations.

## Density

42 insertions: one 12-line C arm + dispatch + docs. Right-sized.

## Verification

D-log Verify bullet: hand probe PROBE-PASS (throwaway, deleted) +
`verify.mjs --fn mhitm_ad_plys` → PASS syntax + PASS rule2 + hidden
PROGRESS (with staleness disclosed) + green + strict + cohort + forced
full 44/44 (shared combat file). Re-measured myself:
`hidden-proxy.mjs verify mhitm_ad_plys --base a7ae28e5~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (Monk-92005
moved 78 → `save_dungeon`@101; no WORSE). This is not the
vacuous-check pattern: the bullet never claims this change caused the
move. Grep: no FORCE/DIAG/seed/fastforward/coords. Queue row
archived; map updated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
