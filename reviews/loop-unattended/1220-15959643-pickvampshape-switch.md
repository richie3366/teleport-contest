# Review 1220 — 15959643 — pickvampshape switch + vision_recalc (D-2254)

Metadata: SHA `15959643` (D-2254). Queue row `mon.c`
decide_to_shapeshift, 4 sessions in traces (not as owner).
js/ +19/−10 (makemon.js +16/−8, mon.js +3/−2).

## Intent vs deliverable

Subject promises `pickvampshape` C switch with Vlad
`mon_has_special` stay, plus `m_calcdistress` mmove==0
`vision_recalc`. Diff is that rewrite + one import. Promise
kept. `decide_to_shapeshift` itself is untouched (already C).

## Inventory

Changed: `pickvampshape` (makemon.js local — C `staticfn`, one
copy); `m_calcdistress` mmove==0 arm. `sym.mjs`:

```text
pickvampshape    NOT EXPORTED — 1 LOCAL in makemon.js:1026
mon_has_special  js/muse.js:1359   sync
vision_recalc    js/vision.js:908   sync
```

`--can` makemon→muse / mon→vision ALREADY. Callee closure —
all LIVE: `mon_has_special` (muse.js ≡ wizard.c:116–129 /
`any_quest_artifact` obj.h:271 `oartifact >= ART_ORB_OF_DETECTION`),
`rn2`, `is_pool_or_lava_at`, `Is_rogue_level`, `vision_recalc`
(clears `vision_full_recalc` at vision.js:911 like C).

## C ↔ JS fidelity

- `pickvampshape` vs `mon.c:4940–4979`: `mndx = cham`,
  `wolfchance = 10`, `uppercase_only = Is_rogue_level`. Switch
  FALLTHROUGH: `PM_VLAD` → `mon_has_special` break (mndx stays
  cham, no `rn2` before geno) else `wolfchance = 3` →
  `PM_VAMPIRE_LEADER` `!rn2(wolfchance) && !uppercase_only &&
  !is_pool_or_lava` → WOLF, break → `PM_VAMPIRE` fog `!rn2(4) &&
  !uppercase_only` else bat. Geno `G_GENOD` or already-alt
  `(data.mndx !== cham) && !rn2(4)` → return cham. The already-alt
  test is mndx, not `mons()` pointer identity. C.
- `m_calcdistress` vs `:1186–1191`: `mmove==0` →
  `if (game.vision_full_recalc) vision_recalc(0)` then
  `minliquid`. C.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS (trace reach, not
blocks). "Match C" is the switch + two-line vision check, not a
stubbed dispatch.

## Density

+19 for a 3-line Vlad arm + 2-line vision check; D-log names
that the C is that small. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify decide_to_shapeshift: baseline 15959643~1 — 0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner, matching the D-log. Green 2/2 +
strict ×2 + cohort 7/7 + full 44/44 pasted. Diff grep: no
FORCE/DIAG/seed/coordinates. Rule #2 clean (re-run here,
repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
