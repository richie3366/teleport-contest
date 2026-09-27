# Review 1874 — a4cc08e9a — mk_tt_object, tt_oname, classmon (D-2915)

- SHA: `a4cc08e9a` (coverage; `mkobj.c` `mk_tt_object`, callees in `topten.c`)
- Files: `js/mkobj.js` (export), `js/topten.js` (`classmon`, `get_rnd_toptenentry`, `tt_oname`), clones deleted in `js/dig.js`, `js/mklev.js`, `js/makemon.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (deleted clones and the symbols they were re-pointed at):

```
mk_tt_object     js/mkobj.js:2561   sync
get_rnd_toptenentry js/topten.js:560   sync
classmon         js/topten.js:535   sync
tt_oname         js/topten.js:593   sync
set_corpsenm     NOT FOUND in js/** (no export, no local function/const).
```

`set_corpsenm` is `export function` at `js/mkobj.js:2038`, indented, so the `^export` scan misses it. `topten.js` imports that binding. `imports.mjs --can` for `mkobj.js` → `tt_oname`, `topten.js` → `set_corpsenm`, and `makemon.js` → `classmon` / `get_rnd_toptenentry`: ALREADY (static edges present). `impossible` is async; `classmon` does not await it (named).

## Intent vs deliverable

Subject promises one `mk_tt_object` in C order, the two `rnd(10)`+`rn1` clones deleted, and `tt_oname` / `get_rnd_toptenentry` / `classmon` as `topten.js` exports. The diff does that. `tt_doppel` keeps its body and calls the exports.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mk_tt_object` | export `mkobj.js:2561` | `mkobj.c:2225–2248` |
| `tt_oname` | export `topten.js:593` | `topten.c:1421–1441` |
| `get_rnd_toptenentry` | export `topten.js:560` | `topten.c:1380–1414` |
| `classmon` | export `topten.js:535` | `topten.c:1355–1375` |
| deleted `dig.js` / `mklev.js` clones | removed | were not the C body |
| `tt_doppel` | existing local; callees re-pointed | `topten.c:1444–1464` |

## C ↔ JS fidelity

`csym` `mk_tt_object` is `mkobj.c:2225–2248`. No RNG inside the function itself. `initialize_it` is false only for `STATUE`. `mksobj_at(..., FALSE)`. If `tt_oname` returns null, `rn1(PM_WIZARD - PM_ARCHEOLOGIST + 1, PM_ARCHEOLOGIST)` then `set_corpsenm`. The `tt_oname` result is only the null test; the function returns the original `otmp`. JS does that. A null `otmp` still rolls `rn1` and then hits `set_corpsenm`'s existing null return (C would fault). Callers that test the pointer (`dig_up_grave`, cocknest) still do.

`tt_oname`: null object returns before RNG. Null entry returns null and leaves `corpsenm` alone. Otherwise `set_corpsenm(classmon(plrole))`, `spe` from `plgend[0]` `'F'` / `'M'` (`CORPSTAT_FEMALE` / `CORPSTAT_MALE`), then `oname(..., ONAME_NO_FLAGS)`. Only caller is `mkobj.c:2240`.

`classmon`: scan while `roles[i].name.m`, `strncmp` of `ROLESZ` (3). `mnum == NON_PM` returns `PM_HUMAN`. Exact `"E"` returns `PM_RANGER`. Else `impossible("What weird role is this? (%s)", plch)` and `PM_HUMAN_MUMMY` (`monsterNames` index 192). Callers: `tt_oname` and `tt_doppel` (`topten.c:1433`, `:1456`).

`get_rnd_toptenentry`: `rnd(tt_oname_maxrank)` (unset or `< 1` uses 10, `sys.c:70`), then read until `points == 0`. `rank > 1` rewinds once and retries at rank 1. Still zero points returns null. One `rnd`. The `!rfile` arm (`impossible`, null, no `rnd`, `:1389–1391`) is the named omit: a missing VFS record is treated as the empty file. Callers: `tt_oname` and `tt_doppel` (`:1428`, `:1446`).

`tt_doppel` still does `rn2(13) ? get_rnd_toptenentry() : null`, then `rn1` the same role span, else gender, `classmon`, and `canseemon` → `christen_monst`.

Wired call sites match the C guards: `dig.c:1063` → `js/dig.js:1953`; `mkmaze.c:660` and `:672` → `js/mklev.js:2521` and `:2533`; `mkroom.c:385` (`!rn2(5)` MORGUE) → `:27919`; `mkroom.c:404` (`!rn2(3)` COCKNEST) → `:27932`. `extern.h:1689` only declares it.

## Hallucinations / overclaim

The subject says no arm of `mk_tt_object`, `tt_oname`, or `classmon` is omitted. Those three bodies match the ranges above. The `!rfile` omit is named on `get_rnd_toptenentry`, not sold as shipped. `classmon` not awaiting `impossible` is named. Not a dispatch-with-stub.

## Density

One C function plus the three callees that the thin clones had skipped. No stub arm. The deleted locals were the partials.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mk_tt_object --base a4cc08e9a~1 --reach-all`.

```
verify mk_tt_object: baseline a4cc08e9a~1 (scoreboard at e379902e8, 2026-09-27T00:34:27.103Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mk_tt_object: no corpus session is blocked on it at a4cc08e9a~1 — a vacuous verify is NOT a corpus PASS. …
smoke mk_tt_object: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line.

## Actionable C-wrongs

None. Statue init, the null `tt_oname` test, the `rn1` role span, gender `spe`, and `classmon`'s role / `"E"` / mummy arms match `mkobj.c:2234–2247` and `topten.c:1358–1440`.

Verdict: **ACCEPT**
