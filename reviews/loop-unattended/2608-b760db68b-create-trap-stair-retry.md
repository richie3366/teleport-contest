# Review 2608 — b760db68b — create_trap stair retry in trap inliners (D-3740)

Metadata. SHA `b760db68b` (2026-10-09), D-3740, parent `f74fa11d9`.
js diff: `js/mklev.js` +126/−17 across 16 loader-local helpers (9
`placeTrapRnd` + 7 fixed `placeTrap`/`placeTrapAt`). Ledger:
`create_trap` ported (D-3740 appended). Works its HEAD's cliffs
head (`sp_lev.c` get_location, 2 blocked: 95303, 95210 — verified
in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): both probes are RNG-first at
sp_lev.c:1233 because C places one more located trap than JS —
C's create_trap retries get_location on STAIRS/LADDER while the
9 hand-port inliners placed unconditionally (JS accepted the
stair cell, `maketrap` nulled, stream shifted by one trap).
Ship C's `:1826–1835` loop in all 9 random bodies and the
collapsed single check in all 7 fixed bodies. Claimed: 0 PASS +
2 moved (95303 157→do_statusline2@230, 95210 168→doname_base@526),
REACH-OK, 44/44.

Diff actually adds exactly those 16 edits with C-cited
comments. Promise and diff match. No new imports/edges.

## Inventory

Changed JS (16 loader-local closures, all in `js/mklev.js`):

- 9× `placeTrapRnd` — wiz_loca :7135, valley :25303, asmodeus
  :25618, juiblex :25993, baalz :26190, orcus :26407, wizard1
  :26797, wizard2 :27091, sanctum :27881 (do/while retry +
  `>100` give-up). C: `sp_lev.c` create_trap `:1811–1846`
  (`csym` range), no-croom arm `:1826–1835`.
- 7× fixed `placeTrap`/`placeTrapAt` — wiz_loca :7127, arc_loca
  :8405, valley :25295, asmodeus :25610, wizard1 :26789,
  wizard3 :27443, sanctum :27873 (single STAIRS/LADDER check).

## C ↔ JS fidelity

**Random bodies — exact.** C: `do { get_location_coord } while
((STAIRS||LADDER) && ++trycnt<=100); if (trycnt>100) return`.
JS: `do { get_location_random(); if (x<0) return; if
(non-stair) break; } while (++trycnt<=100); if (trycnt>100)
return`. Traced call-for-call: first non-stair cell places with
identical draw counts on both sides; 101 consecutive stair hits
give up with no trap on both sides (C draws 101 locations, JS
101). The `break`-vs-while-condition restatement is provably
equivalent. Shape mirrors the canonical `create_trap`
(`js/mklev.js:1498–1528`, verified — same loop, same
`game.level?.at(x,y)?.typ` read). `STAIRS`/`LADDER`/`game`
already in scope (verified imports) — no new edge. The `pos.x<0`
immediate return is the pre-existing JS failure sentinel,
preserved (was: return before place; now: return inside the
loop — same outcome, no trap). `maketrap` + `mktrap_seen_victim`
lines untouched.

**Fixed bodies — exact.** C with fixed `t->coord` re-runs
get_location on the same cell every try; the fixed arm of C
get_location (`:1201–1269`, verified: `*x>=0` → `*x+=mx`
only) draws zero RNG — so C's 100-spin on a stair cell is
101 draw-free retries → give-up with no trap, and immediate
placement otherwise. JS's single check (stair → return, else
place) is outcome-identical with zero draws either way. The
D-log's "100-spin collapses" claim is proven, not assumed.

**Wiring.** C's sole create_trap caller is lspo_trap :4466 (JS
binding → canonical since D-2736, untouched). The 16 inliners
are the hand-port path D-2736 noted; all now match. Missed
copies: the diff's 11 hunks cover exactly the 9+7 bodies the
D-log's caller list names (hunk context lines verified per
loader; the juiblex hunk's context is its ASCII map).

**Measurement.** Writer proof pairs the C step-RNG log (valley
t8's 6+2 tries across the (4,2)/(6,15) exits; baalz t7's 11
tries) against a JS `__NH_RNG_TRACE` replay (t8 took tries 1–6,
then maketrap-null short-circuit; mod-arithmetic confirms
exactly 3 skipped draws) plus temp DIAG (reverted, byte-clean
per git). STAIRS-is-SPACE_POS agreement and the stair placement
are measured both sides. get_location itself not re-ported —
correct under the PRESENCE-ONLY tag.

**Named omissions** (in-map): NO_LOC_WARN double-try, mktrap
hole→ROCKTRAP + pool/lava abort, fixed-path OOB maze-max clamp
(C :1260–1268), WEB spider default — all predate, canonical
ports carry them, no probe reaches them.

## Hallucinations / overclaim

None. The "C places one more located trap" mechanism is
measured, and both probes moving past jointly proves the set.
Diff grep: `DIAG`/`FORCE` appears only in the commit-message
sentence "no DIAG/FORCE/seed gates" — no code use. No symbol
deleted or re-pointed, so no `sym.mjs` paste required. Rule #2:
global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is get_location (2 blocked, RNG
lost 92617); this commit ports the measured writer arm whole
across every inliner copy (leaving one copy unpatched would be
the arm-only-port failure mode — all 16 verified present),
names the surviving gaps, and moves both probes. One cliff, one
C locus, no bundling. Correct gates (green/strict/cohort + auto
full 44/44 on the shared file).

## Verification

D-log Verify (`verify.mjs --fn get_location,create_trap --base
ed16286e1`): get_location 0 PASS + 2 moved + 0 + 0 → PROGRESS;
create_object note (gen-time writer — honest); REACH-OK
(80/80 spread, smoke 24/24); green/strict/cohort PASS; full
44/44. Preflight green.

Re-measured by this audit (`verify get_location --base
b760db68b~1 --reach-all`):

```text
verify get_location: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
reach get_location: 214 baseline-PASS session(s) reach it (214 run): 214 PASS, 0 regressed → REACH-OK
```

95210 → doname_base@526 lands exactly as claimed; 95303 →
distfleeck@237 (past the claimed do_statusline2@230 — D-3743
moved it further, strictly later step + later owner, no
contradiction). Full 214-session reach clean. No vacuous check
(row cited 2; both moved past).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
