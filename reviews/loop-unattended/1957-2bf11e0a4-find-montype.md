# Review 1957 — 2bf11e0a4 — find_montype whole-body port (D-2997)

Metadata: SHA `2bf11e0a4`, D-2997, `sp_lev.c` find_montype under the
`find_montype_gender` wrapper. Stat: `js/mklev.js` only (+1 import
name NUMMONS, +19 new function, wrapper −13/+6). No prior review
file for this SHA on disk.

## Intent vs deliverable

Subject promises: "`sp_lev.c` find_montype whole-body port under
find_montype_gender (D-2997)." The body adds the motive: the
wrapper inlined the core with a lower-bound-only guard, so an
index ≥ NUMMONS fell through to `mons(i)` → null → `is_male`
throw, and lacked C's int-return + nullable out-param shape.

Diff actually adds: file-local `find_montype(s, mgender)` at
`js/mklev.js:28899` and the wrapper rewritten to delegate through
a `{ mgender }` box. Promise and diff match; no other `js/` change.

## Inventory

- `find_montype` (NEW, file-local, sync, `js/mklev.js:28899`):
  whole C staticfn port, C order, per-arm `:line` cites.
- `find_montype_gender` (CHANGED, `js/mklev.js:28917`): inline
  clone deleted, now delegates (same `{mndx, female}` contract).
- Import: NUMMONS added on the existing mklev→monsters edge (the
  export predates this SHA at `js/monsters.js`; this diff does not
  touch that file).

## C ↔ JS fidelity

C locus per `node scripts/csym.mjs find_montype`:
`nethack-c/upstream/src/sp_lev.c:3142–3164` (23 lines, staticfn).
Callers per `--callers`: `sp_lev.c:3173` (get_table_montype) and
`:3254/:3269/:3285` (lspo_monster string arms), plus the `:116`
forward decl. JS in C order:

NEUTRAL seed `:3148` → `genderVar={gender:NEUTRAL}`; `i =
name_to_monplus(s,null,&mgend)` `:3150` with NULL remainder →
same call; range `LOW_PM..NUMMONS` `:3151` → `i>=LOW_PM &&
i<NUMMONS` (this is the fix — the old inline had no upper
bound); fixed-sex short-circuit `:3152–3153` →
`is_male||is_female` then `is_female?FEMALE:MALE`; else name
gender or `rn2(2)` `:3154–3156` → identical ternary with one
`rn2(2)` in the same fall-through position (call-for-call exact;
no other RNG on either side); out-param `:3157–3158` → nullable
holder write; failure `:3161–3163` → holder NEUTRAL + NON_PM.
`L UNUSED` dropped — no JS analog, correct.

Callee closure: `name_to_monplus` LIVE (`js/mondata.js:737`,
ledger-PARTIAL D-2577 — used as-is, gaps tracked under its own
row, disclosed); `rn2` LIVE; `mons`/`is_male`/`is_female` LIVE;
LOW_PM/NUMMONS/NON_PM/MALE/FEMALE/NEUTRAL consts live.
`sym.mjs` (the diff deletes an unnamed inline, not a symbol, and
re-points intra-file rather than local→import, so no re-point
output is owed; new-function status for the record):

```text
find_montype     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:28899
```

"Clone" is the tool's word for any file-local; C has exactly one
staticfn and JS exactly one file-local — the canonical port, not
drift. Same for the wrapper at `:28917`.

Callers: the ~50 `find_montype_gender` call sites (lspo_monster
string-arm counterparts) now execute `find_montype`
spot-checked `:5201/:6310/:8739` — all guard
`mndx<0||mndx===NON_PM` before reading `female`, so the kept
failure `female: 0` (≠ NEUTRAL=2) is unobservable as claimed.
The `get_table_montype` counterpart (`:22301–22307`) still calls
`name_to_monplus` directly with its own check+throw — disclosed
in the D-log as "Not extracted ... by the D-2645 replay design"
(C `:3166–3179` throws "Unknown monster id" on NON_PM; JS throws
the same message on the same range). A named non-wiring with a
design pointer, not a silent miss; rerouting the table-arm replay
through the new `rn2(2)` burn would itself move RNG streams.

Diff grep (`FORCE|DIAG|getRngLog|fastforward|seed\d{4}|TODO`):
no hits. Rule #2: re-verified clean under 1956 on the same tree
(`imports.mjs --rulecheck`); this diff adds no import edge, so no
`--can` check is owed.

## Hallucinations / overclaim

None. "Every arm ported, every callee live, both C callers' JS
counterparts execute it" holds for the string-arm family; the one
counterpart that does not (table arm) is named with its line
range and design reason in the same entry. No dispatch-over-stub.

## Density

Single whole C function, one file, callee closure live-or-named,
`Ledger: find_montype ported` with per-function Verify lines.
The ≤10 / same-file / no-Must-fix-bundle rules are trivially
met. No new test file follows the D-2990 file-local-staticfn
precedent (no exported seam); REACH + full 44/44 is the evidence.

- `find_montype`: whole body, callers named-or-wired → density OK.

## Verification

D-log: `verify.mjs --fn find_montype` → PASS (syntax 1 file;
rule2; hidden note no corpus session blocked; reach 7/7
REACH-OK; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on
the shared file). Re-measured here:

```text
verify find_montype: baseline 2bf11e0a4~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach find_montype: 7 baseline-PASS session(s) reach it (7 run, 3.1s): 7 PASS, 0 regressed → REACH-OK
```

Both summary lines cited; the 7/7 reach reproduces exactly. The
queue row was coverage MISSING, so "no corpus session blocked"
is the honest vacuous note, not a "PASS hidden" overclaim. No
REGRESSED session. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
