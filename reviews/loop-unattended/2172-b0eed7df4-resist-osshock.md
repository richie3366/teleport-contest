# Review 2172 — b0eed7df4 — resist dlev+TELL + do_osshock hoist

SHA `b0eed7df4`, D-3212; 2026-10-01; `js/zap.js` (export + hoist),
`js/mhitm.js`, `js/music.js`, `js/pray.js`. Two-function same-C-file
cluster (zap.c). Closes no prior review.

## Metadata

- Subject: "`zap.c` ×2: resist clone dlev+TELL completion,
  do_osshock stale hoist (D-3212)".
- Promises: mplayer dlev arm in all 3 edited clones; TELL
  shieldeff_mon at both async TELL sites; shieldeff_mon export with
  C-exact body; do_osshock byte-identical hoist; names on existing
  edges only.

## Intent vs deliverable

Kept for both. Diff adds the dlev ternary to resist_poly/music/
pray, fires the TELL shield at the mon_poly and turn-undead sites,
exports shieldeff_mon, and dedents do_osshock to column 0. No other
JS; no new module edges (is_mplayer/shieldeff_mon join live edges —
mhitm already imported is_mplayer, verified at mhitm.js:111).

## Inventory — resist (3 clones + export)

Changed in place: `resist_poly` (mhitm.js:582), `resist`
(music.js:167), `resist` (pray.js:2852); `shieldeff_mon` local →
export (zap.js:3851); two call sites gain the shield (mhitm.js:634,
pray.js:2896). Re-pointed symbol output (required — local → import
at two files):

```text
shieldeff_mon   js/zap.js:3851   ASYNC — await required (awaited ✓ at both new sites)
is_mplayer      js/monsters.js (pre-existing edge in all 3 files ✓)
```

All LIVE, no clones, no STUBs. Full census confirms the D-log's
"five incarnations": canonical zap.js:1854 (async) + resist_poly +
music + pray + explode.js:225.

## C ↔ JS fidelity — resist

C `zap.c:6099–6158` (csym range): RING Conflict early return;
alev table; `dlev = is_mplayer(data) ? ulevel : 1` when dlev<1;
`rn2(100+alev-dlev) < mr`; resisted → tell-gated shieldeff_mon +
`(damage+1)/2`; damage application + kill. Per incarnation:

- The 3 edited clones: dlev ternary character-exact vs C ✓.
  TELL shield placement is equivalent, not a gap: C fires it inside
  resist() on (resisted && tell); each clone's TELL-passing callers
  were enumerated — resist_poly: sole caller mhitm.js:634 (TELL,
  shield added ✓); music: both callers pass (TOOL, 0, NOTELL)
  (:231, :431 — shield inapplicable ✓, alev=10 ✓, damage=0 ✓);
  pray: :2896 TELL (shield added ✓), :2922 NOTELL ✓, damage=0
  both ✓, `'\0'` → default alev=ulevel ✓. RING early-return
  inapplicable to all three (fixed/non-RING oclass at every
  caller) ✓; damage params ignored but every caller passes 0 ✓.
- Canonical zap.js:1854 (read whole): early return, full alev
  table, dlev, tell→shieldeff, halve, mhp/kill — whole ✓.
- Explode clone (read whole): full table + early return + dlev
  (pre-existing); tell/HP deferred with the sole caller passing
  (olet, 0, false) (:655) ✓ complete.

`shieldeff_mon` body (read whole): shieldeff + `cansee → pline_mon
"%s resists!"` ≡ C mon.c:6060–6063 ✓ exact. RNG: dlev change moves
only the mplayer dlev<1 draw (C-faithful); 57 reaching sessions
still PASS. Verdict: ACCEPT.

## Inventory + fidelity — do_osshock

Moved: `js/zap.js:5012`, now resolvable by sym/ledger (local,
same-module callers unaffected). No body change: parent-vs-current
diff after de-indent is EMPTY (byte-identical modulo the 2-space
indent) ✓. Stronger than claimed: the parent already had it at
module top level (after obj_shudders' col-0 closing brace) —
merely indented — so "zero closure vars" holds trivially; the move
is a pure dedent with no name-resolution change. C locus
`zap.c:1637–1674` cited, unchanged. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
gates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Body whole in all five incarnations" verified per
incarnation above (each deferral is caller-pinned, not
hand-waved). Caller-side omits (mbhitm STRIKING, potionhit arms)
are named with C cites and own rows.

## Density

Two whole C functions of one C file (zap.c), ~60 js insertions, no
Must-fix bundled. Per-function Ledger and Verify lines present.

- Ledger: resist split (5 incarnations) — ACCEPT.
- Ledger: do_osshock ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
reach resist: 57 baseline-PASS session(s) reach it (57 run, 50.0s): 57 PASS, 0 regressed → REACH-OK
smoke do_osshock: no RNG-tagged reach; fixed smoke spread (24 run, 12.6s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log per-function lines (57/57; smoke 24/24 with
vacuity stated). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
