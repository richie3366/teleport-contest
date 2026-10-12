# Review 2721 — d6748550a — dosearch nomul(0) (D-3860)

Metadata: SHA `d6748550a`, D-3860, cliffs-head
`botl.c` do_statusline2 writer (dosearch0 find
paths called thin nomul_clear). JS: `js/detect.js`
(3 swaps + clone deletion). Test:
`scripts/dosearch0-find-nomul.test.mjs` (new).

## Intent vs deliverable

Promise: Knight-578142@308 — run-stop trap find
showed stale T:39 where C paints T:40 because the
find arms cleared multi silently instead of C's
nomul(0) (botl + end_running time_botl); swap all
3 sites to live nomul(0), delete the clone;
session FULL PASS. Diff actually does that. Match.

## Inventory

- SDOOR arm (detect.js:497): `nomul_clear()` →
  `nomul(0)`. C: dosearch0 detect.c `:2015–2093`
  (read): `nomul(0)` after exercise at the SDOOR
  site (`:2048`).
- SCORR arm (detect.js:510): same swap. C:
  `nomul(0)` at the SCORR site (`:2058`).
- Trap arm (detect.js:532): same swap. C:
  `nomul(0)` at the trap site (`:2080`).
- nomul_clear deleted (was detect.js:324–331:
  multi=0 + dead `_repeat_search=false` +
  context clears). `sym.mjs nomul` → the live
  hack.js:1675 export; no clone remains.
- Import pre-exists (detect.js:106: nomul in the
  hack.js import line) — no new edge.

## C ↔ JS fidelity

Branch-by-branch confirm. C's nomul
(hack.c `:4160–4173`, read): `multi<nval`
guard → `botl |= (multi>=0)` → uinvulnerable/
usleep clear → multi=nval → reason clear at 0
→ `end_running(TRUE)` → `cmdq_clear(CANNED)`.
JS nomul (hack.js:1675, read) matches every
line: guard, botl, uinvuln, usleep, multi,
reason+nomovemsg null, end_running(true),
canned clear. The deleted clone dropped
botl/end_running/cmdq — exactly the painted-clock
delta. `_repeat_search=true` has zero hits in
js/ (grep) — the flag was dead, deletion safe.
No RNG touched (nomul draws none).

## Hallucinations / overclaim

None — the D-log if anything underclaims (see
Verification: 2 PASS, not 1). No DIAG/FORCE/
seed in the js hunk.

## Density

Cliff-phase: do_statusline2 head; writer is the
find-path run-stop gap, painter untouched.
Ledger: detect.c dosearch0 row + D-3860.
Reached: probe FULL PASS (plus one).

## Verification

Rule #2 clean (iteration-wide). Re-measure
(mine): `verify do_statusline2 --base
d6748550a~1 --reach-all` → `2 session(s)
blocked on it (2 at baseline, 0 in the working
scoreboard)`, Knight-578142 PASS **and**
Rogue-578101 PASS, `2 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`; smoke 24/24
REACH-OK. Zero regressed. The D-log's "1 FULL
PASS" names only the probe; the second PASS is
additional movement on the same owner — claim
true, conservative.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
