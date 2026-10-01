# Review 2158 — acf56d4dd — checkfile fruit alias + findtravelpath TEST_MOVE

SHA `acf56d4dd`, D-3198; 2026-10-01; js +113/−38 across `js/cmd.js`,
`js/pager.js` (stat total +143/−77). Two-function coverage cluster
(checkfile + findtravelpath); also retires queue-head readobjnam as
STALE-SPLIT. Closes no prior review.

## Metadata

- Subject: "`pager.c` checkfile fruit-alt aliasing + `hack.c`
  findtravelpath TEST_MOVE retirement (D-3198)."
- Promises: (a) checkfile fruit match aliases dbase like C's shared
  `newstr` buffer; (b) findtravelpath adjacent/VALID/no-guess arms move
  off `blocksMove`/`boulder_at` stand-ins onto live `crawl_destination`
  + `test_move` TEST_MOVE, `end_running(FALSE)`, run=8-on-fail,
  `found:` zero+nomul.

## Intent vs deliverable

Promise vs diff: kept. `js/pager.js` aliases `alt = dbase =
'slime mold'` in both `checkfile` and `ia_checkfile`, deletes
`checkfile_alt_for` (both callers inlined), fixes the review-1410 cite.
`js/cmd.js` rewrites the adjacent arm (travel1 + Chebyshev-1 incl self
+ awaited live `crawl_destination` + `end_running(false)` + awaited
live `test_move` TEST_MOVE, TRAVEL-only dx/dy/nomul/travelcc, run=8 on
TEST_MOVE failure with fallthrough into the BFS), routes VALID through
the shared envelope, rewrites the no-guess arm (sgn first, live
TEST_MOVE, mark-on-success, `found:` zero+nomul on failure), and gives
both dest==hero exits zero+nomul. No DIAG/FORCE/seed logic (the one
diff grep hit is the message's own "No DIAG/FORCE/seed logic" line).

## Inventory — checkfile

Changed: `checkfile` alt block (`js/pager.js:922–932`), `ia_checkfile`
alt block (`:980–991`), cite comment (`:862`). Deleted:
`checkfile_alt_for` (local, 2 in-file callers). No new imports; no
symbol re-pointed (fruit/makesingular/lookup helpers pre-existing).

```text
checkfile_alt_for NOT FOUND in js/** (no export, no local function/const).
```

## C ↔ JS fidelity — checkfile

C `pager.c:829–1129` (csym range). C `:981–982`: `if (!alt &&
fruit_from_name(dbase_str, TRUE, 0)) alt = strcpy(newstr,
obj_descr[SLIME_MOLD].oc_name)` — `newstr` is the same buffer
`dbase_str` points into (offset by prefix stripping), so offset-0
yields `alt == dbase_str` content and the pass loop (`:994`,
`!strcmp(alt, dbase_str) ? 0 : 1`) runs a single pass; offset>0 runs
pass 1 (alt found, `More info about "slime mold"?`) then pass 0 over
clobbered garbage that misses (the `user_typed_name && !pass1found`
pline cannot fire since pass 1 found). JS single pass on
`alt == dbase == 'slime mold'` is C-observable-exact in both cases
(question text identical; dedup arm unreachable on a miss). `else if
(!alt) alt = makesingular(dbase_str)` (`:990–991`) is the else branch
✓. `ia_checkfile` queries collapse `[alt, base]` → `[base]` ✓.

Cite drift (comment-only, not a C-wrong): D-log/message/JS comments
cite the fruit arm as `:990–992`, singular as `:995–996`, pass loop as
`:998`; pinned C reads `:981–982`, `:990–991`, `:994`. The `:971–975`
fix in this same commit is verified correct. Verdict: ACCEPT.

## Inventory — findtravelpath

Changed: `findtravelpath_travel` (new `mode` param, `js/cmd.js:4485–
4535`), `findtravelpath_guess` head + no-guess (`:4566–4585`,
`:4643–4662`), `is_valid_travelpt` VALID routing (`:4695–4704`),
`dotravel` doc; import gains `crawl_destination` (existing hack.js
edge). Deleted: none (stand-in calls removed, helpers live elsewhere).

```text
crawl_destination js/hack.js:2352   ASYNC — await required
test_move        js/hack.js:443   ASYNC — await required
```

Both awaited at every new call site ✓. No clone kept; no `--can`
needed (static edge into the existing hack.js import).

## C ↔ JS fidelity — findtravelpath

C `hack.c:1265–1523` (csym range). Adjacent `:1271–1288`: condition
`(TRAVEL||VALID) && travel1 && next2u && crawl_destination` mirrored
in order; `next2u ≡ distu ≤ 2` (`you.h:558`) ≡ Chebyshev-1 incl self
(squared distances 0/1/2 exactly) ✓; `end_running(FALSE)` (`:1276`)
fixed from `true` ✓; live TEST_MOVE with TRAVEL-only
dx/dy/nomul/travelcc ✓; run=8 on failure under TRAVEL only (`:1287`)
with fallthrough into the BFS ✓ (no early return, like C).
Dest==hero: C skips the `:1289` envelope and falls to `found:` (`:1518`
zero+nomul+FALSE); JS zeroes + `nomul(0)` + NOPATH ✓. VALID ends swap
(`:1301–1310`, BFS hero→dest) preserved via the routed call ✓.
No-guess (`:1481–1489`): sgn dx/dy set before the probe (`:1483`),
TEST_MOVE → setpoint+TRUE, else `goto found` — JS matches arm for arm,
including dropping the invented avoids/diag chain (now inside live
test_move, whose omits stay on test_move's own row) ✓.
Callers: `:1540` is_valid_travelpt (JS keeps C's u_at→TRUE and
stone-unseen→FALSE early arms + save/restore, now with dx/dy/travelcc
restore the VALID success arm requires) ✓; `:2725–2726` domove
TRAVEL/then-GUESS (JS `continue_run` + `dotravel_target`, shape
unchanged) ✓. D-log's "sole travel1=1 writer" corroborated by grep
(`js/cmd.js:4732`, post already-here intercept); getpos describe runs
travel1=0 so the adjacent arm skips exactly like C ✓. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gate/hardcoded
coords in code. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`: "no bare/node specifiers or fs calls").

## Hallucinations / overclaim

None material. "C-exact"/"C-observable-exact" hold for both arms
(branch order verified above). "Single pass when equal" is the
offset-0 case and the offset>0 equivalence is argued correctly
(clobbered-garbage miss ≡ skipped pass). Only drift: the `:990–992` /
`:995–996` / `:998` cites are ~4–9 lines stale against pinned C (code
unaffected).

## Density

Two whole C functions, 151 js insertions, per-function Ledger (both
`split` with js homes) and Verify lines present in D-3198. Shape note:
the cluster spans two unrelated C files (pager.c + hack.c, no
caller/callee edge) rather than head + same-file companions — a
growth-rule miss, but both functions are whole and C-exact with zero
rework outstanding, so there is no C-wrong family to queue; recorded
here, not as Must-fix.

- Ledger: checkfile split — ACCEPT.
- Ledger: findtravelpath split — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify checkfile: baseline acf56d4dd~1 (scoreboard at 139f221a9) — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke checkfile: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
verify findtravelpath: baseline acf56d4dd~1 — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke findtravelpath: no RNG-tagged reach; fixed smoke spread (24 run, 10.6s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (no corpus session blocked, smoke 24/24 both, green
2/2, strict ×2, cohort 7/7, full 44/44 forced). No REGRESSED session;
no vacuous-PASS overclaim — the D-log states vacuity plainly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
