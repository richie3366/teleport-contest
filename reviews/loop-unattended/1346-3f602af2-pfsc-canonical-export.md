# Review 1346 — 3f602af2 — lock.c stumble_on_door_mimic PfSC canonical export

- SHA: `3f602af2`, D-2380. JS files: `js/lock.js` (+6/−11) only.
- Prior reviews closed: 1339 (QUALITY-RISK C-wrong 1, the flats-only PfSC clone).

## Intent vs deliverable

Subject promises: retire review-1339 Must-fix by using the canonical
`were.js` PfSC export. Diff actually does exactly that: deletes the local
`Protection_from_shape_changers()` (`js/lock.js:618`), adds
`import { Protection_from_shape_changers } from './were.js'`, and updates the
`stumble_on_door_mimic` doc comment. `stumble_on_door_mimic` body untouched.
Promise matches diff; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `Protection_from_shape_changers` (were.js:57) | C macro port (youprop.h:355–360) | LIVE, sync export, now imported |
| deleted local (lock.js:618) | clone | REMOVED |
| `stumble_on_door_mimic` (lock.js:624) | C callee port (lock.c:758–769) | LIVE, unchanged |

`node scripts/sym.mjs Protection_from_shape_changers` →
`js/were.js:57 sync`, "ALSO 3 LOCAL CLONE(S) in 3 files" (display.js:994,
monmove.js:747, wizard.js:216). The 1339-counted 5th clone (this local) is
gone and no new clone was added. `imports.mjs --can lock.js were.js
Protection_from_shape_changers` → "ALREADY: lock.js already statically
imports were.js. No new edge needed." No new module edge, no TDZ surface.

## C ↔ JS fidelity

C body (`csym.mjs stumble_on_door_mimic` → `lock.c:758–769`, 12 lines):
`m_at` + `is_door_mappear` + `!Protection_from_shape_changers` →
`stumble_onto_mimic`, TRUE/FALSE. C macro (`youprop.h:355–360`) is
`u.uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic || .extrinsic`. The
`were.js:57` export reads flats plus `uprops[].intrinsic/extrinsic`
(`js/were.js:57–64`), a superset that matches C on every C-writable state —
including the ring path review 1339 measured (C `worn.c:96–123` sets
`uprops[p].extrinsic` generically; JS `confer_oc_oprop` has no E-flat mirror
for PfSC). The exact falsifier from 1339 (ring worn, door mimic) now resolves
C FALSE == JS FALSE. Branch order and callers (`lock.c:820`, `:987`,
`trap.c:6026`) unchanged from the 1339 confirm. No RNG either side.

## Hallucinations / overclaim

D-log claims `verify.mjs --no-cohort` pre-change PASS and a hand probe at
`/tmp/probe-pfsc.mjs` (deleted, so unre-runnable) — supplements, not the
basis; the checkable gates (syntax/rule2/green/cohort, all re-runnable) are
stated honestly as 0-blocked vacuous, never a corpus PASS. "No `tests/` dir"
verified true. No hallucination.

## Density

+6/−11 for one review-named residual: below the §2b Open floor, but this is a
Must-fix single item shipped alone per queue rules, not an Open port. Fine.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (this review).
- Diff grep `FORCE|DIAG|getRngLog|fastforward|rn2|seed|coord` → code-clean
  (sole `seed` hit is "seed gates" in the commit message).
- Re-measured: `node scripts/hidden-proxy.mjs verify stumble_on_door_mimic
  --base 3f602af2~1` → "0 session(s) blocked on it (0 at baseline, 0 in the
  working scoreboard)". Row cited 0 blocks → vacuous correctly labeled.
- No seed/step/coordinate reads in the diff. No REJECT-shaped content.

## Actionable C-wrongs

None. The one 1339 C-wrong is fixed as ordered.

Verdict: **ACCEPT**
