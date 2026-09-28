# Review 2008 — d599cea95 — find_branch_room whole port

Metadata: SHA `d599cea95`, D-3048, js/mklev.js only (+20/−~8).

## Intent vs deliverable

Subject promises "`find_branch_room` whole port (mazexy arm + impossible)".
Diff actually restarts `find_branch_room` in C order plus re-points its
sole caller `place_branch` to C's `(void)` return-discarding use. Matches
promise. Single function, no import changes.

## Inventory

- `find_branch_room` (restarted, file-local) — C mklev.c:1659–1673.
- `place_branch` caller hunk (re-pointed, return now unused) — C :1708–1712.

## C ↔ JS fidelity

`find_branch_room` vs C `:1659–1673` (csym range cited): `croom = 0`
→ `let croom = null` ✓ (return unused by the only caller, so null-vs-0
unobservable); `svn.nroom == 0 → mazexy(mp)` ✓ — `svn` is
`instance_globals_saved_n` (decl.c:1042), and `game.level?.nroom | 0` is
the file's established analogue (js/mklev.js:772, 1203, 1897) ✓;
else `generate_stairs_find_room()` :1667 ✓ with the :1668 assert as a
comment (null iff nroom==0, unreachable on this arm — legitimate);
`!somexyspace → impossible("Can't place branch!")` :1669–1670 ✓;
`return croom` :1672 ✓. No RNG in C, none in JS. Branch order exact.

Caller: C :1710 `(void) find_branch_room(&m)` then unconditional
`x = m.x; y = m.y` (:1710–1712). JS now discards the return ✓ but keeps
the pre-existing `mp.x > 0` guard around the assignment. On the
somexyspace-false path C assigns an untouched local `coord m` while JS
keeps x=0 — strictly safer, guard predates this SHA, impossible-arm only.
Observation, not a C-wrong.

Callee closure: `mazexy` LIVE (exported js/mklev.js:32522, sync) ✓;
`generate_stairs_find_room` CLONE (local js/mklev.js:32127 — same-file,
pre-existing, not introduced here); `somexyspace` CLONE (locals in
mklev.js:32095 + teleport.js:952 — pre-existing drift, untouched by this
SHA); `impossible` LIVE (js/display.js:8479, ASYNC, called bare-sync —
matches file convention: 6 of 8 mklev.js call sites do the same, e.g.
:816, :1237). No STUB in a live arm. `sym.mjs` also reports
`find_branch_room` itself as file-local, not exported — correct: C
declares it `staticfn` (:1660). The D-log's word "export" is loose
wording only.

Ledger: `find_branch_room` ported, no named omits — every arm ported,
every callee live-or-clone, sole C caller wired. Holds.

## Hallucinations / overclaim

None material. "Every callee live" in the D-log overstates two same-file
local clones as live, but both clones predate this SHA and the map names
the closure; the dispatch claim ("mazexy arm + impossible") is accurate.

## Density

One whole staticfn + its caller re-point, ~20 insertions. Small but the
closure holds nothing more Open (single-purpose staticfn). OK per §2b
(closure complete, not padded).

## Verification

D-log cites verify.mjs → PASS + vacuous hidden note + REACH smoke 24/24
+ green/strict/cohort + full 44/44. Re-measured:
`hidden-proxy.mjs verify find_branch_room --base d599cea95~1 --reach-all`
→ 0 blocked at baseline and now (vacuous, as the D-log states — coverage
row, expected, not presented as a PASS); smoke 24/24 PASS → REACH-OK, no
regressions. Diff grep: no FORCE/DIAG/RNG-log reads. Rule #2 clean
(repo-wide `imports.mjs --rulecheck`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
