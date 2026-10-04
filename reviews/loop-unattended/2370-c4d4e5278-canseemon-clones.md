# Review 2370 — c4d4e5278 — canseemon clones → live exports (D-3424)

- SHA: `c4d4e5278` — "Must-fix review 2355: canseemon divergent clones → live display.js exports (5 files) (D-3424)."
- D-entry: D-3424. Diff: js/dig.js, monmove.js, mthrowu.js, muse.js,
  trap.js (+~15/−~85); ledger display.c; journal + index + queue-archive.
- Scope: Must-fix for review 2355 item 2 (canseemon + canspotmon).

## Intent vs deliverable

Promise: delete all 6 locals (5 canseemon + 1 canspotmon); rewire all
65 call expressions to the live display.js exports; no new module
edges; review-prescribed ledger note verbatim.

Diff actually does: 6 deletions with pointer comments; import
extensions in dig/mthrowu/muse/trap; 8 renamed lines in monmove (9
calls — seenflgs carries 2); 2 comment refreshes. Counts verified at
SHA: dig 5 (lines :826/:880/:975/:1124/:1131, exactly as listed),
monmove renames :1116/:1590/:1727/:1743/:1758/:1776/:2125/:2158,
mthrowu 10, muse 14, trap 27 = 65. Promise == deliverable.

Required `sym.mjs` on deleted symbols:

```text
canseemon        js/display.js:1097   sync
canspotmon       js/display.js:1408   sync
```

Single live home each; grep confirms zero `function canseemon` /
`function canspotmon` locals remain in any of the 5 files. The
deleted dig/monmove bodies (visible in the diff) were exactly the
divergence review 2355 described: no see_with_infrared arm, `!minvis`
instead of mon_visible, canspotmon without sensemon. The
mthrowu/muse/trap bodies were textually exact dupes of the live
export — zero behavior change on those 51 sites.

## Inventory

```text
canseemon  | ported | js/display.js:1097 | C display.c:201-204 + display.h:117-120
canspotmon | (live, pre-ported) | js/display.js:1408 | C display.h:129
```

Ledger entry present with the review-prescribed note verbatim
("audited: whole vs C; clones retired"); Left open none (true).

## C ↔ JS fidelity

Live bodies re-verified arm-for-arm (not trusted from the D-log):
- `mon_visible` (display.js:1085): null guard + `(minvis &&
  !See_invisible)` reject + mundetected reject ≡ the compiled `#else`
  branch of _mon_visible (display.h:93-99; the `#if 0` mburied arm
  above is not compiled).
- `canseemon` (display.js:1097): null guard (preserves the deleted
  locals' `!mtmp` behavior — no call site can newly throw) +
  `wormno ? worm_known : (cansee || see_with_infrared)` +
  mon_visible ≡ _canseemon (display.h:117-120). All callees live
  single homes (sensemon :1238, see_with_infrared :1565, worm_known
  worm.js:556).
- `canspotmon` (display.js:1408): `canseemon || sensemon` ≡ :129.
- Edge safety: dig/mthrowu/muse/trap extended existing display.js
  import lines (visible in the diff); monmove's
  display_canseemon/display_canspotmon aliases pre-existed at the
  parent (:82/:84, already used at :1185/:1210) — this SHA unifies
  the remaining mixed usage. Hoisted exports, runtime-only calls.
- Intended behavior change (the fix itself): dig's 5 + monmove's 9
  sites gain the infrared/See_invisible/mundetected/sensemon arms;
  the dropped `!mtmp.mx` guard has no C counterpart (and off-map
  mons still read false via cansee/infrared in practice).

## Hallucinations / overclaim

None. "No new module edge — all 5 files already import from
display.js" verified (4 extended lines + 1 pre-existing alias
import). "65 call expressions" counted exactly. "Divergent" vs
"exact dupe" classification matches the deleted text. Closes review
2355 item 2 in full (all 6 prescribed deletions + the verbatim
ledger note; `**Addressed:** D-3424` stamp present).

## Density

One-item Must-fix, ships alone. Per-function verdicts: canseemon
ACCEPT; canspotmon ACCEPT. Ledger entry + Verify line present.

## Verification

- Re-measured both fns (`--base c4d4e5278~1 --reach-all`): 0 blocked
  (vacuous, as D-logged — review-cited, not corpus-cited) + smoke
  24/24 PASS → REACH-OK ×2. 0 regressed. Claims hold.
- `imports.mjs --rulecheck`: Rule #2 clean (this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
