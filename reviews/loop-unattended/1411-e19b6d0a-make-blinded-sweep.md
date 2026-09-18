# Review 1411 — e19b6d0a — make_blinded caller-arm sweep (D-2452)

Metadata: SHA `e19b6d0a`, 4 JS files (`eat.js` rottenfood arm,
`potion.js` see-invisible arm, `do.js` one-word export, `apply.js`
towel guard). Coverage sweep, 0 blocked at baseline. D-log: D-2452.

## Intent vs deliverable

Promise: three caller arms — (1) `eat.c:1827` rottenfood blind arm
rolled `d(2,10)` and discarded it; (2) `potion.c:865` uncursed
POT_SEE_INVISIBLE never called `make_blinded(0L,TRUE)`; (3)
`apply.c:177` towel guard tested `!Blind()` where C tests `!Blinded`.
Diff actually ships all three, plus the one-word `BlindedTimeout`
export. No second subsystem.

## Inventory

- `js/eat.js`: rottenfood guard → `!rn2(4) && !Blind()` (live
  `invent.js` import), then `await make_blinded(BlindedTimeout() +
  d(2,10), false)` + `if (!Blind()) pline('Your vision clears.')`.
- `js/potion.js`: `peffect_see_invisible` calls `make_blinded(0, true)`
  under `!cursed` via the file's dynamic-import idiom.
- `js/do.js`: `BlindedTimeout` gains `export` (hoisted decl, no TDZ).
- `js/apply.js`: towel guard → `!((u.HBlinded|0) && !(u.BBlinded|0))`.
- No deleted symbols; `sym.mjs` notes 11 pre-existing
  `BlindedTimeout` clones — this diff imports the live export instead
  of adding #12, per the anti-pattern rule.

## C ↔ JS fidelity

(1) `eat.c:1817–1829`: guard `!rn2(4) && !Blind` — JS keeps C order
(`rn2` first, RNG-neutral `Blind()` second); `Blind()` matches
`youprop.h:103` `((HBlinded||EBlinded) && !BBlinded)` plus the named
`uroleplay.blind` extension. `make_blinded(BlindedTimeout+d(2,10),
FALSE)` + `if (!Blind) Your1(vision_clears)` — the pline literal
`'Your vision clears.'` is the established rendering at 4 sibling
sites (`detect.js:2542`, `dothrow.js:1472`, `engrave.js:1413`,
`mcastu.js:345`). Confirm.
(2) `potion.c:861–865`: `if (!cursed) make_blinded(0L,TRUE)` in C
position (after the fruit-juice return, before the blessed/`rn1`
block) — JS matches; callee is the live `do.js` body (D-1768/1755/
1769), dynamic import is this file's idiom, no new edge.
(3) `apply.c:173–176`: `incr_itimeout(&HBlinded,-cream)` precedes the
guard in both sides; `!Blinded` ≡ `HBlinded && !BBlinded`
(`youprop.h:92`), matching the new expansion (same as
`mhitu.js:1958`). The D-log's failing case checks out: blindfolded
with H==0 gives C `!Blinded`=true (glop-off) while old JS `!Blind()`
(`apply.js:854` local, faithful incl. EBlinded) gave false
("face feels clean"). Confirm — old was C-wrong, new matches.
`imports.mjs --can` on both new eat.js edges: ALREADY (no new edge).
Out of scope (pre-existing, untouched): the `make_blinded(1,false)`
tail under the deferred `gulp_blnd_check` and the two function-scoped
`const Blind` mirrors in `eat.js` — named, not re-litigated here.

## Hallucinations / overclaim

None. "RNG-neutral: same d(2,10) draws" is accurate (the roll existed
before, discarded; now consumed in the same position). Named-omits
list is explicit and in-map.

## Density

One coverage sweep in one caller family (blindness), 4 small hunks,
~25 insertions: right-sized, single cluster.

## Verification

- `imports.mjs --rulecheck`: clean (global, this review).
- `hidden-proxy verify make_blinded --base e19b6d0a~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24,
  0 regressed → REACH-OK. Matches. Full 44/44 + green/strict/cohort
  are D-log-reported (shared-file change got the full gate there).
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. All three arms match their C loci.

Verdict: **ACCEPT**
