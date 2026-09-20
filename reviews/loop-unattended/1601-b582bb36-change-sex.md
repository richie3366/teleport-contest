# Review 1601 — b582bb36 — polyself.c change_sex whole-body port (D-2642)

**Metadata:** SHA `b582bb36`, `polyself.c` `change_sex`, D-2642.
JS: `js/polyself.js` (restart) + `js/botl.js` (+23: new live
`max_rank_sz` export); PL_CSIZ added to an existing const import,
max_rank_sz via a new IN-SCC edge (runtime-only, no TDZ read).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: restart in C order — sexless-form first flip,
mfemale, live max_rank_sz, pl_character rename with roles.js
truncate shape, umonnum restore, amorous flip + set_uasmon with the
`#if 0` swap kept as a disabled comment exactly like C. Diff
delivers all of it. Promise matches deliverable.

## Inventory

- `change_sex` (polyself.js:792, sync) — restarted.
- `max_rank_sz` (`js/botl.js:1139`, sync per `sym.mjs`) — new
  C-home export (C had no JS symbol anywhere).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C loci `polyself.c:272–303` (32 L) + `botl.c:401–415` max_rank_sz
(15 L), both read here. Arm-by-arm confirm (no RNG either side):

- `:281–284` first flip with the is_male/is_female/is_neuter
  disjunction + the `:273–280` comment rationale carried over ✓.
- `:285–286` poly'd mfemale flip ✓ (was already present; kept).
- `:287` max_rank_sz() ✓ (C calls it "superfluous" — ported
  anyway, exact).
- `:288–291` pl_character rename ✓ with two adaptations, both
  sound: `slice(0, PL_CSIZ−1)` ⇔ Strcpy into `[PL_CSIZ]`
  (PL_CSIZ=32 both sides — global.h:402 vs const.js:969,
  verified); the `name.m != null` guard names the unreachable
  null (every role has `name.m`; C would deref) instead of
  crashing — kept and named, out-of-scope-proof.
- `:292–293` umonnum restore ✓; `:294–301` amorous second flip +
  set_uasmon() ✓; `:296–300` stays a disabled comment, exactly the
  C `#if 0` state — correctly NOT ported ✓.
- `max_rank_sz` vs C: 9-slot loop, m-then-f, `.length` ⇔ strlen
  (ASCII titles — stated in the comment), writes
  `game.gm.mrank_sz` ✓. Role resolution (`game.urole`, find-by-mnum
  fallback, title||rank normalize) is the documented shape
  adaptation; primary path verified (roles.js carries 9-entry
  `{m,f}` title arrays). One doc nit, not behavior: the D-log says
  "rank_of fallback shape" but the code falls back to a
  name-based single entry, never calling rank_of — the in-code
  comment is accurate, the D-log wording is loose.
- Callee closure: Upolyd / is_male trio / set_uasmon /
  PM_AMOROUS_DEMON (all in-module, verified present) +
  max_rank_sz (new live export) — every callee live, none new
  named. Caller closure as documented: do_wear.js:2607 (C
  do_wear.c:1008), eat.js:3013 (C eat.c:2372), polyself.js:987
  newlevels (C :362) — all three call sites confirmed present.

## Hallucinations / overclaim

The D-log's `/tmp/change_sex_probe.mjs → PROBE-OK 14/14` is
scratch evidence (uncommitted, not re-runnable here) — cited as
D-log due diligence, not as corpus proof; the audit does not rely
on it. `--can: IN-SCC` framing for the botl edge is consistent
with the existing 98-module SCC. No dispatch-vs-stub overclaim.

## Density

32-line C function + 15-line helper, two modules, ~64 JS
insertions. Right-sized (one function family).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify change_sex --base
  b582bb36~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Full arm closure, helper C-exact, callers wired, disabled
code kept disabled.

Verdict: **ACCEPT**
