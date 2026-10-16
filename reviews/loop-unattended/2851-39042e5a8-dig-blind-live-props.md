# Review 2851 — 39042e5a8 — dig.js Blind() takes the live-props house shape

## Metadata

- SHA: `39042e5a8f0589fb4e5d2d72cfcd3a0e036ac483` (D-4007)
- Cliff writer: unattributed reserve row
  scen-sweep-Barbarian-50750065, 351→492 (board-blind replay)
- js/ diff: `js/dig.js` +9/-1 (Blind predicate + comment);
  new `scripts/zap-dig-blind-wall-glow.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: the blindfold-wearing hero (EBlinded set since step
57) misread as seeing because dig.js `Blind()` read the
sticky `u.Blind || u.ublind` mirrors — so `zap_dig`'s
maze_dig wall/tree/rock arms and the `dighole` grave arms
printed where C stays silent. Take the D-0716 house shape
verbatim (uroleplay.blind birth gate + live H/E minus B, cf.
shk.js/do_wear.js); no new edge, no re-sync (dig only reads).

Diff actually: the predicate + comment. Promise == diff.

## Inventory

- `Blind` (`js/dig.js:222-233`, C `youprop.h:102` macro):
  sticky mirrors → live props. Heals 5 in-file call sites.

## C ↔ JS fidelity

- C `#define Blind ((HBlinded || EBlinded) && !BBlinded)`
  (`youprop.h:102` read; H/E/B ≡ uprops[BLINDED]
  intrinsic/extrinsic/blocked, `:87-90`) ✓ — JS is
  character-identical to the reviewed precedents
  (`shk.js:6022-6026`, `do_wear.js:2097-2101`, both read),
  including the D-0716 `uroleplay.blind` birth gate
  (review 2840 accepted the shape; replication keeps
  dig.js import-frozen per the D-3995 precedent).
- C maze arms (`dig.c:1688-1709` read): `else if (!Blind)`
  before "wall glows then fades" / "tree shudders but is
  unharmed" / "rock glows then fades" ✓ — JS `:1528/:1537/:
  1546` (read) is the same `else if (!Blind())` with the
  same three literals in the same wall/tree/stone order.
  Dighole `:2042/:2060` (read) both gate on `!Blind()`.
- Mechanism measured, not inferred: EBlinded=524288 at every
  step 57-350 (D-log prefix probes) with the predicate
  reading seeing; geom-probe @351 shows 0 differing map
  cells (terrain ruled out); and the comment's "u.ublind
  only ever false" checks out — the sole write in `js/` is
  `u.ublind = false` (`do.js:3813`).
- Named (1) correctly scopes the class: other sticky-Blind
  readers (ball/detect/allmain/cmd/apply) ship only with
  session evidence per the D-3995 rule — no drive-by sweep.

Diff grep clean; Rule #2 iteration-wide clean (review 2844).
No symbol deleted/re-pointed (in-file predicate, no
cross-module wiring — correct, since C's macro expands at
each site).

## Hallucinations / overclaim

None. The D-log discloses its own board-blindness (reserve
row, `show` fails, `verify zap_dig,dighole` vacuous) and
rests movement on the direct replay + test instead.

## Density

Unattributed-row writer with measured movement 351→492
(141 steps) into a named next owner (digactualhole map
divergence — shipped as D-4008, the very next SHA). Ledger:
`zap_dig ported` +D-4007 and `dighole ported` +D-4007, notes
preserved. Committed test re-run green (1/1).

## Verification

- `verify zap_dig --base 39042e5a8~1 --no-reach` (this
  review): **0 blocked — vacuous**, exactly as disclosed.
- Movement corroboration (this review, HEAD code): frozen
  runner on the cached session now stands at **Screen
  828/1568** — both step 351 (this SHA's fix) and step 492
  (D-4008's start) are behind it, so the 351→492 transit is
  confirmed behaviorally; review 2852's re-measure pins the
  492 handoff from D-4007's own baseline.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
