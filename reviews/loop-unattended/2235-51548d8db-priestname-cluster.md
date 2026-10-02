# Review 2235 — 51548d8db — priestname + mon_aligntyp + restpriest + bogon

Metadata: SHA `51548d8db88af8f071e05717b01407a7dc803831` (D-3274,
2026-10-02). `js/priest.js` + `js/do_name.js` + `js/insight.js`
+ `js/objnam.js` + `js/artifact.js` + `js/pray.js`
(+259/−135). 4-function cluster: priestname, mon_aligntyp,
bogon_is_pname, restpriest — one Inventory + one fidelity
block per function below.

Intent vs deliverable: subject promises the four canonical
exports with caller rewiring, including the missing Hallu
tail. The diff delivers all four, deletes all targeted
clones, hoists HALU_GODS to module scope. Delivers what it
promises.

Inventory:

- `priestname` (`js/priest.js:180`): canonical export (C
  home); do_name.js clone deleted; x_monnam imports it.
  Keeps the clone's order/shape; gains the halu_gname Hallu
  tail as a sync mirror; m_next2u replaces the distmin
  inline (`dx²+dy²≤2` ≡ distmin≤1 on the 3×3 ✓).
- `mon_aligntyp` (`js/priest.js:155`): canonical export;
  insight.js clone + do_name.js `mon_aligntyp_nam` deleted;
  artifact.js re-pointed; teleport.js:358 clone KEPT
  (disclosed D-1110).
- `bogon_is_pname` (`js/do_name.js:299`): local → export
  (C home); objnam.js duplicate deleted for the import.
- `restpriest` (`js/priest.js:781`): new
  export; no live JS caller (C caller restore.c:449 is
  binary save, by-design).
- `HALU_GODS` (`js/pray.js:2780`): function-local table →
  module scope (identical 14 entries); live halu_gname
  reads the shared table.
- `sym.mjs` (required): priestname priest.js:180 sync,
  single ✓; mon_aligntyp priest.js:155 sync + 1 kept local
  (teleport.js:358) ✓; bogon_is_pname do_name.js:299 sync,
  single ✓. Outputs pasted as required.

**C ↔ JS fidelity — `priestname`** (full re-walk, JS :180
vs C priest.c:301–367): rndmonnam/mono_pmname what ✓;
!ispriest&&!isminion early return ✓; poohbah/priestess/priest
✓; article block (YOUR/A+high→THE; THE/Angel/just_an) ✓;
minvis a→an ✓; renegade an→a ✓; high/grand vs guardian
(strcmpi ≡ toLowerCase) ✓; ' of ' six-way gate (incl.
m_next2u/gameover) ✓ — all exact.
- Hallu reader: `do_name_Hallucination()` ≡ C's
  `(HHallucination && !Halluc_resistance)` (youprop.h:120):
  the sticky is wizard-only (wizcmds save/restore), flats
  match, and JS x_monnam replicates C do_name.c:886–901's
  save/set-EHalluc_resistance/restore around the call
  (verified in-hunk) — so the suppression window behaves
  as in C ✓. Sync body ⇒ no state change between the
  entry read and the tail branch ✓.
- Non-Hallu tail: C `halu_gname()` returns
  `align_gname(algn)` (pray.c:2584) reading global urole —
  JS `align_gname(game.urole, algn)` ✓ (JS align_gname
  re-verified whole: Moloch arms, default-impossible,
  '_' strip ✓).
- Hallu tail (CLONE, verified here): draw-for-draw
  identical to live pray.js halu_gname — role loop
  `rn2_on_display_rng(roles.length)` ≡ C
  `randrole(TRUE)`=`rn2_on_display_rng(SIZE(roles)-1)`
  (role.c:718; no-terminator length identity holds) ✓;
  rn2(9) slot arms ✓; HALU_GODS slot ✓; Moloch ✓; `void
  impossible` vs await (unreachable; cited precedent) ✓;
  '_' strip ✓; Paranoia fallback ✓. Shared table ⇒ cannot
  drift ✓. The old clone's missing-display-draw bug is
  fixed, on the display stream (scored RNG untouched) ✓.

**C ↔ JS fidelity — `mon_aligntyp`** (JS :155 vs C
priest.c:279–289): nested ternary + A_NONE passthrough +
sign map exact ✓ (`?? 0` only guards corrupt nulls where
C would crash). All 5 C callers accounted: artifact.c:933
→artifact.js:1549 ✓, insight.c:3277→insight.js:1681 ✓,
priest.c:364 in-body ✓, priest.c:372 p_coaligned (Open
row @faf4b9296 ✓), monst.h:282 is_lminion → teleport
kept clone (body C-identical on valid input; null-EPRI
fallback differs only where C crashes — faithful
redundant debt, and `--can teleport.js priest.js
mon_aligntyp` now reads SAFE, so the D-1110 rationale is
stale; unqueued cleanup, not a C-wrong).

**C ↔ JS fidelity — `bogon_is_pname`** (JS :299 vs C
do_name.c:1414–1420): `!!code && '-+='.includes(code)` ≡
strchr("-+=",code) exactly ✓. All 3 C callers wired
(do_name.c:955 same-file, priest.c:323 import,
rumors.c:890 rewired import) ✓; :1362 is a comment ✓.

**C ↔ JS fidelity — `restpriest`** (JS :781 vs C
priest.c:932–939): dlevel/ghostly gates + assign_level
exact ✓ (sync callee do.js:1389 ✓; guards JS-null-safe).
No live JS caller — correct (binary restore by-design).

Hallucinations / overclaim: none. "Whole C body live" ×4
verified by re-walk. The /tmp 15/15 probe is cited but
was re-proven here by direct body comparison instead.

Density: 4 whole functions, priest.c + callee bogon
(do_name.c) — §10.17 compliant. Per-function Ledger (all
four `ported`) + one `--fn a,b,c,d` Verify line ✓.

Verification: D-log Verify shows PASS + 4 vacuous notes +
4 smoke REACH-OK + green/strict/cohort + full 44/44.
Re-measured (`hidden-proxy.mjs verify <4 fns> --base
51548d8db~1 --reach-all`): all four vacuous (0 blocked —
coverage rows, notes honest) + smoke 24/24 PASS →
REACH-OK each. Zero regressed. The do_name↔priest import
cycle is empirically safe (tree loads; call-time hoisted
use). Banned-pattern grep: clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none. (Debt note, unqueued:
teleport.js:358 mon_aligntyp clone is now importable per
`--can` SAFE — D-1110 rationale stale.)

Verdict: **ACCEPT**
