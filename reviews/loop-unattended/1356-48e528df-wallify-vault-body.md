# Review 1356 — 48e528df — wallify_vault body (D-2390)

- SHA: `48e528df`, D-2390. JS files: `js/vault.js` only (+140/−13);
  docs + map. No test file (vault-escort path needs live game state;
  sessions are the suite — stated in D-log via green/cohort).
- Prior reviews closed: none (Open queue row `wallify_vault`; 0 blocks).

## Intent vs deliverable

Subject promises the full `wallify_vault` body replacing the stub,
awaited from `gd_move_cleanup`. Diff delivers exactly that — one async
function plus import-line extensions. No unrelated arms.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `wallify_vault` (vault.js:313) | stub → full body, async, file-local | LIVE (C is `staticfn` — local is faithful, not drift) |
| `gd_move_cleanup` | adds `await` | LIVE |
| `m_at` (mon.js:1394) | C callee, newly imported | LIVE, canonical (4 pre-existing locals elsewhere, none added) |
| `obfree` (shk.js:3626) | C callee, newly imported | LIVE |
| `g_at`/`sobj_at` (mkobj.js:3198/2513) | C callees, existing edge | LIVE |
| `t_at`/`deltrap`, `move_gold` | C callees, pre-imported / same-file | LIVE |
| `block_point` (vision.js:403), `You_hear`, `IN_SIGHT/COULD_SEE` | existing edges extended | LIVE |
| `m_into_limbo` | dynamic import (clear_fcorr idiom) | LIVE, no static edge |

Required checks: `sym.mjs wallify_vault → NOT EXPORTED, 1 local`
(correct linkage — the tool's "LOCAL CLONE" wording is a false alarm
here since C has exactly one `staticfn`); `m_at`, `obfree`,
`block_point`, `g_at`, `sobj_at` all resolve to sync exports;
`--can js/vault.js js/mon.js m_at` → ALREADY;
`--can js/vault.js js/shk.js obfree` → ALREADY. Nothing deleted.

## C ↔ JS fidelity

C locus opened with body: `wallify_vault` `vault.c:645–731` (87 lines,
csym range). Walked arm-for-arm:

- Loop nesting (x-outer/y-inner) and the boundary-`continue` ✓. The
  `!egrd`/`!rm`/`!lev` guards are defensive additions, RNG-free.
- Gate short-circuit order
  `(!IS_WALL || g_at || sobj_at(ROCK) || sobj_at(BOULDER)) &&
  !in_fcorridor` ✓ identical.
- Occupant arm: tame-`yelp` → `rloc(RLOC_MSG)` → limbo fallback, same
  order, both awaited ✓.
- `move_gold(gold, EGD(grd).vroom)` + `movedgold` ✓ (recomputed EGD
  field, same value C reads).
- ROCK-then-BOULDER extract + `obfree(null)` re-scan loops ✓;
  `t_at`/`deltrap` ✓; side-ordered corner/HWALL/VWALL typ ✓;
  `wall_info = 0` ✓; `del_engr_at` ✓.
- Viz save/set/restore around `newsym` + `block_point` + `fixed` ✓
  (JS guards a missing viz row; identical when present).
- Tail: `movedgold || fixed` → `in_fcorridor || cansee` whisper with
  `noit_Monnam` vs distant chant, gold pline, walls-restored pline with
  the The-phrase per the read.js/lock.js convention ✓.
- RNG: C body draws no direct `rn2/rnd`; only via `rloc`, preserved in
  position. No RNG delta beyond the previously-stubbed path coming
  alive — which is the point of the port.
- Callee closure: shipped arm (cleanup → wallify) is all-LIVE. Two
  honest deltas, both OMIT with C citations in this commit's map/doc:
  `xy_set_wall_state` deferred (mklev.js-local) and the `gd_move`
  `:913/:920` call sites unwired (JS `gd_move` early-returns on
  `!mpeaceful`, verified `vault.js:902`; note `:913` also fires for
  hostile guards, so the omit covers both). Own rows when a falsifier
  fires.

## Hallucinations / overclaim

None. D-log claims no corpus PASS and names both omits where they
belong (map + JS doc), not buried.

## Density

~140 insertions for an 87-line C body with 10+ callees — in band §2b.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|gx|gy` →
  clean.
- Re-measured: `verify wallify_vault --base 48e528df~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
