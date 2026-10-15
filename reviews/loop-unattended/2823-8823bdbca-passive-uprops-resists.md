# Review 2823 — 8823bdbca — passive() resist unions + Blind gate read uprops

- SHA: `8823bdbca` (D-3978)
- Files: `js/uhitm.js` (+39/−~12), focused test `scripts/passive-acid-uprops-resist.test.mjs`
- Method: cliff writer (≤10 functions: `passive` only); full Method on it.
- Cites: C ranges from direct reads (`csym.mjs passive` finds no definition —
  K&R signature at `uhitm.c:5864`; callers via `csym.mjs --callers passive`,
  16 refs incl. `uhitm.c:715,789,810`, `dokick.c:116…282`).

## Intent vs deliverable

Promise (subject): the five resist unions in `passive()` plus the `:5908`
Blind gate read dead flats and missed smock-conferred acid resistance;
Archeologist-50456018 s250 → PASS, Monk-50456005 1378→1453.
Diff actually adds: five widened OR-unions (flats OR uprops
intrinsic/extrinsic) in `passive`, one rewritten Blind gate
(`(H||E)&&!B` over flats+uprops incl. `blocked`), six const imports
(`ACID_RES/COLD_RES/FIRE_RES/SHOCK_RES/STONE_RES/BLINDED`, same edge).
No new function, no deleted symbol, no signature change. Promise and
diff agree.

## Inventory

- `passive` — `js/uhitm.js:3253` (export async; `sym.mjs`: single def,
  no clones) vs C `nethack-c/upstream/src/uhitm.c:5864–5872` (def),
  AD_ACID arm `:5906–5933`, Blind gate `:5908`, resist gate `:5914`.
  Status: repaired reads; body otherwise untouched (ledger-ported D-3924).

## C ↔ JS fidelity

C macros verified exact: `Fire/Cold/Shock/Acid/Stone_resistance ≡
uprops[PROP].intrinsic || .extrinsic` (`youprop.h:28–30,32–34,44–46,59–65`;
subject's `:26-32,42-44,59-61` cite is loose but the macros are right);
`Blind ≡ (HBlinded||EBlinded)&&!BBlinded` (`youprop.h:103`, with
H/E/B ≡ intrinsic/extrinsic/blocked at `:87–90`).

- Resists: JS `flat || Hflat || Eflat || intrinsic || extrinsic` per prop.
  C has single storage (uprops only), so the OR is a superset — but the
  flats have real writers (`eat.js:1720` `HAcid_resistance`,
  `polyself.js:815` `propset_fromform`), and the union matches the
  established `hitmu`/`sit`/`potion` precedent (D-1089 idiom). No stale-flat
  writer found that C would deny; accepted as the codebase's dual-read
  shape, not trace tailoring.
- Blind gate: JS `((HBlinded||EBlinded)&&!BBlinded) || !verbose` with
  H/E/B = flat OR uprops slot reads. C `:5908` is `if (Blind ||
  !flags.verbose)`. Exact, including the `blocked` term C's comment
  (`youprop.h:98–102`) calls out.
- Branch order / RNG call-for-call: `:5907` `rn2(2)` splash gate,
  `:5908` message branch, `:5914` `!Acid_resistance` damage gate,
  `:5920` `rn2(30)` corrode, `:5923` weapon/kick arm, `:5932`
  `exercise(A_STR)` — all untouched; the change adds zero RNG draws
  (pure predicate reads). The ship-time RNG slice (d(1,8)=6 tmp,
  rn2(2)=1, rn2(30)=0, exercise, rn2(3)=0) is consistent with C order.
- Sibling check: `Free_action`/`Antimagic` unions were already
  uprops-clean as claimed (diff context lines).

Helper classification: no helpers added; `BLINDED`/resist consts are
C-macro imports (LIVE). Nothing deleted or re-pointed → `sym.mjs`
re-point check N/A. Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed
names/`fastforward`/coordinates. `imports.mjs --rulecheck`: Rule #2
clean across scored `js/`.

## Hallucinations / overclaim

None material. "Six reads" = 5 resists + Blind ✓. "13 keep own writers"
corroborated: my re-measure still shows Knight-50362021@210 and
Ranger-49956043@397 at the same steps, Knight-50255055@738 on the
`statuslines:6` row. Minor: youprop cite ranges are approximate
(actual `:28–30` etc.); behavior cites are exact.

## Density

Cliff writer for the `do_statusline2` head: one cause (status HP via a
wrong resist read), writer ported, `Ledger:` entry updated (no new
omissions), focused test added (real recipe, asserts HP 18(18) +
extrinsic present + splash message — no seed logic). Not a batch; ≤10
functions got the whole Method. No second C file, no re-port of a parked
symptom.

## Verification

Ship-time: `verify passive: 0 PASS, 1 moved, 0 no-movement`
(Monk 1378→trapeffect_fire_trap@1453); `verify do_statusline2: 1 PASS
(Archeologist full 385), 13 unchanged`; reach 80/80 + smoke 24/24;
green/strict/cohort green.
Re-measure (`verify passive,do_statusline2 --base 8823bdbca~1 --reach-all`
on HEAD `e9d602604`):

- `verify passive: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Monk 1378→1453 exact); `reach: 322 PASS, 0 regressed → REACH-OK`.
- `verify do_statusline2: 4 PASS, 0 moved, 11 unchanged, 1 worse` — the 4
  PASS are the claimed Archeologist plus 3 later-SHA fixes on HEAD code
  (Ranger-50050043 D-3979, Wizard-50050007 D-3982, Valkyrie-610117
  D-3983), i.e. the expected superset. The 1 "worse"
  (Tourist-610081 "now undefined") was a worker flake under parallel
  load: direct replay on HEAD runs clean (RNG 45982/46038, screens
  1734/1752, error null) and a single-session rescore shows
  `distfleeck@1734` — exactly where D-3980 left it (944→1734). No port
  regression; no Must-fix.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
