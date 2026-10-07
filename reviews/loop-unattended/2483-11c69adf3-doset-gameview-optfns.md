# Review 2483 — 11c69adf3 — doset gameview optfns (D-3602)

**Metadata.** SHA `11c69adf3` (2026-10-07, D-3602). Type: **cliff**:
writer fix for the cliffs head `files.c paniclog` (1 corpus
block; region heuristic on an identical-topline options screen —
paniclog itself is by-design filesystem, untouched). The writer
is the doset gameview value chain. `js/` insertions: 17
(`js/options.js` +17/−3) + new test.

## Intent vs deliverable

Promise: route the 6 remaining hardcoded gameview literals
(windowtype/msghistory/pettype/cat/dog/horsename) through their
live same-module optfns via `doset_compopt_get_val`, retiring
D-3580 omission (3); Valkyrie-94311 moves past paniclog.

Diff actually adds: 6 `roleOptfn` chain arms + comments. Promise
matches diff. No symbols deleted or re-pointed; no new imports.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | doset gameview pass (6 value arms) | partial (trav_debug + wc2 stand) | [options.js](/home/debian/dev/teleport-contest/js/options.js:11084) | options.c:8757–8975 pass :8871–8880 → doset_add_menu :9027–9044, optfns :868–871/:2542–2544/:3237–3243/:4982–4984 |

Helpers: 6 C callees, all live same-module imports of nothing
(same file): optfn_windowtype/catname/dogname/horsename/
msghistory/pettype — LIVE, bodies pre-existing.

## C ↔ JS fidelity

**C chain confirmed.** doset gameview pass calls
`doset_add_menu(…, (pass==set_gameview)?0:indexoffset)` (:8875,
read) ✓; `doset_add_menu` inits `value="unknown"` (:9027,
read), runs `(*optfn)(idx, get_val, FALSE, buf2, empty_optstr)`
(:9038–9041, read), keeps buf2 iff `optn_ok && buf2[0]` (:9043,
read) ✓. get_val arms: pettype preferred_pet spelling
(:3237–3243, read) ✓, windowtype `windowprocs.name` (:4982–
4984, read) ✓, petname name-or-none (:868–871, read) ✓,
msghistory `%u iflags.msg_history` (:2542–2544, read) ✓.
`csym doset` → options.c:8757–8975 ✓.

**JS now calls get_val for all 12 compounds.** The 6 new arms
mirror the 6 pre-wired rows through the same helper ✓. Spot
bodies: pettype get_val spells c/d/h/n→cat/dog/horse/none else
random with OPTN_OK (js/options.js:3386–3393, read) ✓; petname
family is sync and returns name or `(none)`/`none` (:7550–
7566, read) ✓. All 12 routed optfns are sync `function`s, so
`shown` is a string, never a promise ✓. The missing `"unknown"`
fallback in the gameview loop is unreachable (every routed
optfn returns OPTN_OK + non-empty on get_val); the compounds
block below already applies `|| 'unknown'` where C needs it ✓.
`name`'s live `game.plname` read is pre-existing D-3580 scope,
unchanged here.

Ledger hygiene (not a C-wrong): the doset row kept
`status: partial` but lost its whole `omit` key — D-3602 retired
only omission (3) while its own D-log says (1) trav_debug and
(2) wc2 "stand", and the row's note still cites "remaining
omit". Next port iter: one `ledger.mjs set doset` restoring the
(1)+(2) omit text inside its real iteration. Ledger text is
never a Must-fix row, so this stays an observation.

## Hallucinations / overclaim

None. "12 via optfn, name via live field" counts correctly
(13 rows, soundlib included). The paniclog by-design claim
(files.c:2801–2833 filesystem append) is consistent with the
untouched-owner treatment.

## Density

Cliff §10.18: parent queue head is paniclog (Valkyrie-94311,
pettype `[horse]` vs `[random]` — re-read from
`11c69adf3~1:docs/LOOP-QUEUE.md`) ✓. One cliff, own `Ledger:`
touch (D-3602 on doset), probe moved past. Per-function verdict
ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (chain arms + cites).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `pettype-gameview.test.mjs`: PASS now.
- Re-measure (mine): `verify paniclog --base 11c69adf3~1
  --reach-all` → **0 PASS, 1 moved past, 0 unchanged, 0
  worse** (Valkyrie-94311 33→mlevel_tele_trap@92 on the working
  tree — D-3603/D-3604 moved it past the D-log's @43 landing;
  cumulative, same direction) + smoke 24/24 REACH-OK. No
  REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
