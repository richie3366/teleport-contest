# Review 2443 — 984d8c718 — distfleeck whole (scared arms + monflee)

**Metadata.** SHA `984d8c718` (2026-10-06, D-3559). Type: **cliff**: owner
port of the cliffs head `monmove.c distfleeck` (6 blocked). `js/`
insertions: 46 (`js/monmove.js`: 1 import, distfleeck async-whole, 3 call
sites awaited). HEAD monmove.js differs from at-SHA only by D-3561's
2-line MZ constant change (below the reviewed function), so HEAD reads hold.

## Intent vs deliverable

Promise: C body whole in C order as async — seescary gate, unconditional
onscary, short-circuit scared condition, monflee with `rnd(rn2(7)?10:100)`;
Knight-94018 125→143; 5 unchanged bounded by the park's positional proof.

Diff actually adds: exactly that, plus the `in_your_sanctuary` priest.js
import and 3 `await`s. No other JS touched. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `distfleeck` | ported | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:1165) | monmove.c:532–567 (`csym.mjs`) |

## C ↔ JS fidelity

Walked C monmove.c:532–567 call-for-call against the JS: `rn2(5)`
bravegremlin first (always drawn) ✓; inrange `dist2 ≤ BOLT_LIM²`, nearby
`inrange && monnear(mux,muy)` ✓; seescary gate `!mcansee || (Invis &&
!perceives(data))` → mux/muy else hero square ✓; unconditional
`onscary` ✓; scared condition `nearby && (sawscary ||
(flees_light && !bravegremlin) || (!mpeaceful &&
in_your_sanctuary(mtmp,0,0)))` with C short-circuit order ✓;
`monflee(mtmp, rnd(rn2(7) ? 10 : 100), TRUE, TRUE)` — JS evaluates
`rn2(7)` before `rnd`, matching C argument-evaluation order for the
observable draw sequence ✓. C is staticfn-void with out-params; the
`{inrange, nearby, scared}` 1/0 shape is the pre-existing JS convention,
unchanged. Callers: C dochug :791/:834/:915 → JS :2729/:2769/:2842, all
awaited ✓; repo-wide grep shows no other `distfleeck(` callers, so the
sync→async flip is safe ✓.

Callee classification (all verified, none stubbed): `onscary` LIVE
(mon.js:360, imported from './mon.js' :116) ✓; `monflee` LIVE same-file
async (:1105, awaited) ✓; `in_your_sanctuary` LIVE (priest.js:457,
signature `(mon,x=0,y=0)` matches the C call) via a new monmove→priest
edge — priest.js has **zero** static monmove imports, so no new cycle and
no TDZ (sessions run) ✓; `flees_light` in-file clone is the **correct**
homing (C macro is monmove.c-local, `#define` :450 / `#undef` :569) and
matches the macro arm-for-arm (gremlin + lamplit-artifact uwep/uarm +
mcansee && couldsee) ✓; `perceives` reuses the file's pre-existing local
(:739) — byte-identical to the live export (mon.js:265) and to C
mondata.h:81 (`mflags1 & M1_SEE_INVIS`), so no divergence and no new clone
(the 6-clone `sym.mjs` debt predates this SHA) ✓. Named: none — true.

## Hallucinations / overclaim

None. The parked-SYMPTOM tag is explicitly litigated, not ignored: the
park proved no-movement only for :538-diverging sessions, while the first
probe diverges at :564 after a matched :538 — and the old body had the
:559–564 arms openly missing (`scared = 0`, ledger omit), i.e. never
"proved faithful". For Knight-94018 the divergence names distfleeck's own
missing arm: owner and writer coincide. The movement below confirms it.

## Density

Cliff §10.18: distfleeck confirmed as the head row at the parent (6
blocked, first probe Knight-94018). One cliff, one function, own `Ledger:`
entry ✓. First probe moved strictly later (125→yn_function@143); the other
probes/sessions diverge AT :538 where JS draws a different die or nothing
(JS never invokes distfleeck there — a call-pattern divergence no body
change can move, since every ported line executes strictly after :538),
with the W2 `[measure]` row and per-session writers named as follow-ups.
Function whole, Named: none. SHA verdict ACCEPT.

## Verification

- Added-code grep (`^+.*FORCE|DIAG|getRngLog|fastforward`): clean.
- Rule #2: clean this iteration (see 2439). Required `sym.mjs` output for
  re-pointed/deleted symbols: n/a — no clone was deleted or re-pointed
  (all callee resolutions pasted above).
- Re-measure (mine, `--base 984d8c718~1 --reach-all`, HEAD code):
  `verify distfleeck`: **0 PASS, 2 moved past, 4 unchanged, 0 worse →
  PROGRESS** — Knight-94018 →yn_function@143 exactly as claimed; Hea-92055
  →distfleeck@141 is the later D-3561's movement (attributed there, not
  here); the other 4 still at their :538 steps; `reach`: **723/723 PASS, 0
  regressed → REACH-OK**. No REGRESSED, no vacuity.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
