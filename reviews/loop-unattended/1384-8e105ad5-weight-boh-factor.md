# Review 1384 — 8e105ad5 — weight() Bag-of-Holding factor (D-2422)

- SHA: `8e105ad5`, D-2422 (Open row: Caveman-92148 step 245,
  encumbrance Δ37 writer). JS files: `js/mkobj.js` only (BoH
  divisor arms + const + doc).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the three divisor arms in C order (cursed
first, ternary short-circuit, round-up divisions). Diff delivers
three lines plus the module const — nothing else.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| BoH factor arms (`weight`) | new branches | LIVE — C `mkobj.c:1951–1953` |
| `BAG_OF_HOLDING` const | local const | module idiom (`objectNames.indexOf`, cf. `STATUE`) |

No imports, nothing deleted or re-pointed.

## C ↔ JS fidelity

C locus read in pinned source: `mkobj.c:1932–1955` (csym range
for `weight` is `:1887–1976`).

- C `cwt = cursed ? cwt*2 : blessed ? (cwt+3)/4 : (cwt+1)/2`
  ≡ JS `obj.cursed ? cwt*2 : obj.blessed ?
  Math.trunc((cwt+3)/4) : Math.trunc((cwt+1)/2)`. Branch order
  identical (cursed first, short-circuit preserved); C int
  division on non-negative operands ≡ `Math.trunc` (cwt ≥ 0
  as a sum of weights). Measured instance closes exactly:
  15+(50+3)/4 = 28 both sides. ✓
- Gate placement: inside the `Is_container || STATUE` envelope
  after the contents sum, before `return wt + cwt` — C order
  (`:1931–1955`). Non-BoH containers unaffected. ✓
- Named (not charged): STATUE corpsenm/msize/minwt arms
  (`:1919–1931`), HEAVY_IRON_BALL kludge, `impossible()`
  quan<1 silence — all pre-existing. ✓
- RNG-neutral (pure arithmetic). ✓

## Hallucinations / overclaim

None — the notable honesty here is the `FAIL hidden …
NO MOVEMENT` line quoted in full. The D-log does not dress a
same-owner result as movement; it evidences row-level progress
instead (Caveman first-diff row 5 → row 12, rows 0–11 now
matching) and names the next writer (Monk Unchanging arm,
then the row-12 Grimtooth residual). That is §2a-correct
handling of owner-granularity NO MOVEMENT.

## Density

~8 `js/` lines + a 5-case unit test for one measured writer
(Δ37 fully accounted, invent 10/10 identical). Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify one_characteristic --base
  8e105ad5~1` on the working tree → `1 PASS, 0 moved past, 1
  unchanged, 0 worse → PROGRESS` (Monk-92013 → PASS via the
  later D-2423; Caveman-92148 still `one_characteristic`@245).
  Consistent with the D-log's contemporaneous NO MOVEMENT +
  row-level story — movement since is in the claimed
  direction, 0 worse. No D-1831 shape (no PASS was claimed
  for this SHA).
- `node --test scripts/weight-boh.test.mjs` → 5/5 (re-run
  this audit; 1/4 pre-fix per stash, taken as stated).
  Green/cohort per D-log accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
