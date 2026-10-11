# Review 2660 — 22d838e30 — u_catch live Blind/Fumbling gates (D-3796)

Metadata. SHA `22d838e30` (2026-10-10), D-3796, parent
`f317b5f7a`. js diff: `js/mthrowu.js` +9/−2 — catch
gates read live `Blind()`/`Fumbling()` instead of
sticky flats + `Fumbling` import name + C-cited
comment. Works cliffs row-2 bottlename (95345 →
PASS).

## Intent vs deliverable

Promise: 95345@962 — blindfolded hero (EBlinded,
worn blindfold): C's `!Blind` fails first and skips
the catch `rn2`, while JS read sticky `u.Blind`
(synced only in make_blinded — never set by a worn
blindfold) and drew an extra `rn2(87)`; `u.Fumbling`
has zero writers anywhere, so that gate always
passed. Diff rewires exactly the two gates. Promise
and diff match.

## Inventory

Changed JS (1 writer):

- u_catch_thrown_obj — `js/mthrowu.js` module-local
  (C `staticfn`, single caller C `:695` → JS
  `:1291` pre-wired). C: `mthrowu.c:532–550`
  (csym range).

## C ↔ JS fidelity

**C-exact.** C `:538–541` reads `!Blind &&
!Confusion && !Stunned && !Fumbling` with Blind =
`(HBlinded||EBlinded)&&!BBlinded` (youprop.h),
Fumbling = `HF||EF`, Confusion/Stunned H-only —
all verified in pinned C. Live `Blind()`
(`js/invent.js:371`) implements the exact union
plus roleplay-blind (C-exact per u_init.c:1027);
live `Fumbling()` (`js/attrib.js:1143`) the exact
HF||EF union. This audit confirmed `u.Fumbling`
has zero writers in `js/` (dead gate, as claimed)
and that the fix imports the exports rather than
adding clones (the 30 pre-existing local `Blind`
twins are untouched debt elsewhere). Confusion/
Stunned staying flats is justified in the D-entry
by a writer audit (every writer syncs with H; C
reads H-only) — a reasoned keep, falsifiable by
any future catch divergence, not a silent stub.

## Hallucinations / overclaim

None. Diff grep: zero code hits. The geom-probe
(0 cells differ) + exactly-one-extra-draw census
is the right evidence for a pure gate bug.

## Density

Cliff-phase §2b: one row-2 writer, behavior-only
gate fix, no signature change. Row-1 randomize
falsifier re-verified unfired live. The other
sticky-`u.Blind` readers are listed as future
cliffs, not swept.

## Verification

D-log Verify: focused 0/1 → 1/1; bottlename 1
PASS; reach 31/31 + smoke 24/24; gates PASS.

Re-measured by this audit (`verify
bottlename,Fumbling --base 22d838e30~1 --reach-all`,
re-run on HEAD code):

```text
verify bottlename: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Priest-95345: PASS
reach bottlename: 31 PASS, 0 regressed → REACH-OK
smoke Fumbling: 24 PASS, 0 regressed → REACH-OK (writer, vacuous as logged)
```

Matches the D-log exactly. Committed scoreboard:
1043 → 1044 (+95345), 0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
