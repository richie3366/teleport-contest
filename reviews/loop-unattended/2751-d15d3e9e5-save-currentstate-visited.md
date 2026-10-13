# Review 2751 — d15d3e9e5 — save_currentstate ships savelev VISITED mark

- SHA: `d15d3e9e5aeb999a2e86549ab0b2c397ca79c4d8`
- Subject: D-3894 checkpoint VISITED mark (Healer-582620 s633 → PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3894` (DIVERGENCE-LOG.md:104)

## Intent vs deliverable

Promise: `do.c` save_currentstate never shipped savelev's VISITED mark,
so a discarded-level re-entry skipped the `do.c:1695` impossible; fix
applies the `save.c:493–494` mark in the checkpoint arm, moving
Healer-582620 to PASS. LFILE_EXISTS half deliberately stays named
(checkpoint image is dead data; JS reads the flag as stash-present).

Diff actually adds: `js/do.js` — 8-line VISITED mark block
(`lev` guard, slot create, `| VISITED`) after
`unskip_engravings_for_save()` + comment rewrites; new
`scripts/save-currentstate-visited.test.mjs`. No other `js/` hunks, no
new import edge, no symbol re-points (nothing to `sym.mjs`).

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `save_currentstate` (js/do.js:1605) | do.c:1373–1395 (csym) + save.c:493–494 | changed, one arm |

## C ↔ JS fidelity

C (`do.c:1373–1395`, csym): `in_checkpoint++`, if `ins_chkpt` then
`currentlevel_rewrite` → `savelev(nhfp, ledger_no(&u.uz))` → close, then
`savestateinlock`, `in_checkpoint--`. `save.c:493–494` inside savelev:
`if (lev >= 0 && lev <= maxledgerno()) svl.level_info[lev].flags |= VISITED;`
— verified in pinned C above.

JS: same skeleton (`:1379`, `:1381`, `:1383–1388`, `:1393` cites);
the new block applies exactly the C guard and OR-mark, creating the slot
when absent (JS `level_info` is a sparse array vs C's static table —
equivalent). Order vs the engravings effect (save.c:548) is unobservable
(both are idempotent marks). Branch-by-branch confirm.

Helper classification: no helpers added; `lev` is in scope
(`ledger_no(game.u?.uz)` two lines above). Named omits (LFILE_EXISTS +
checkpoint image, dmonsfree/dobjsfree, update_mlstmv, savestateinlock
body) are each named in the D-entry with a C citation and the ledger
omit was refined in-iteration — named omits, not stubs in a live arm.

Grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed/coords in the
`js/` hunk.

## Hallucinations / overclaim

None. The D-log explicitly discloses `verify save_currentstate` as
vacuous ("0 blocked at baseline — NOT a corpus PASS") and claims movement
only via `goto_level` — the honest pattern. The LFILE non-ship is argued
from C lifecycle (traced), not asserted.

## Density

Cliff phase: owner `goto_level` was the cliffs row-2 (head UNPORTABLE) —
override precedent, real `js/` + movement. `Ledger:` entry present with
refined omit. Whole-function holds (arm-level fix inside an already-whole
port). Not a no-op: `js/` diff + moving session.

## Verification

D-log: `verify goto_level: 1 PASS`, reach 54/54, vacuous
save_currentstate disclosed, green/strict/cohort/full 44/44.
Audit re-measure (`verify goto_level,save_currentstate --base
d15d3e9e5~1 --reach-all`): Healer-582620 PASS;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; reach 54/54
→ REACH-OK; save_currentstate vacuous note re-confirmed. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
