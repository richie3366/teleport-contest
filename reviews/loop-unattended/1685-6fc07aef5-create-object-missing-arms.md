# Review 1685 — 6fc07aef5 — `sp_lev.c` create_object missing arms (D-2726)

Metadata: commit `6fc07aef5`, D-2726, `js/mklev.js` only (+183/−26). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises seven arms → live: `:2284` recharged, `:2294` tknown, `:2304–2341` monster/saddle + NULL-container uncreate, `:2356–2389` Medusa, `:2391–2420` achievement, `:2428–2437` buried. The diff delivers all six code regions (monster/saddle + uncreate are one branch). Promise matches deliverable.

## Inventory

Changed JS: `create_object` (`js/mklev.js:20836`, stays sync file-local staticfn clone); new file-local `Is_mineend_level`/`Is_sokoend_level` (dungeon.h macro shape); new consts `LEASH`/`POT_OIL`; extended imports (all join existing edges — see below). No deleted symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (sampled new names + forced-inline callees):

```text
mongone          js/mon.js:3492   ASYNC — await required
remove_object    js/mkobj.js:3312   sync
artifact_exists  js/artifact.js:1302   sync
bury_an_obj      js/dig.js:427   ASYNC — await required
Is_mineend_level NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:20809
```

All arms LIVE or verified CLONE: `remove_object`/`artifact_exists`/`safe_oname`/`obfree`/`makemon`/`propagate`/`o_unleash`/`end_burn`/`is_ice`/`describe_level`/`simpleonames` live; `Is_mineend/sokoend_level` are single clones of C macros (`dungeon.h:136–137` `Lcheck` dnum+dlevel match — no live export to import, correct local shape); the `bury_an_obj` inline and the `mongone` fmon-unlink inline are sync-forced (`bury_an_obj`/`mongone` are both ASYNC-only in JS, this function stays sync for its load-time callers). `--can` on the three sampled new names returns ALREADY — better than the message's "three new edges": no new module edge exists at all. `invent_carrying_monster` is the file-local `let` (`js/mklev.js:20720`, cited `sp_lev.c:198` static). No STUB in any arm.

## C ↔ JS fidelity

C locus read: `create_object — sp_lev.c:2192-2440` (csym range), arms read verbatim. Branch-by-branch:

- `:2284` recharged `% 8` ✓ and `:2294–2295` tknown gate ✓ both verbatim.
- `:2304–2341` CONTENT: widened condition `|| invent_carrying_monster` is C-exact; `!container_idx` no-monstr arm stays on floor ✓; saddle→`put_saddle_on_mon` else `mpickobj` ✓; NULL-container uncreate (`obj_extract_self` + `oartifact`→`artifact_exists(…, safe_oname, FALSE, ONAME_NO_FLAGS)` + `obfree` + `return null`) ✓ verbatim incl. the double-extract shape.
- `:2356–2389` Medusa: `id===STATUE && Is_medusa_level && cn===NON_PM` ✓ (bindings `o.id`/`o.corpsenm??NON_PM` verified); `wastyp=corpsenm` init + `i<1000, wastyp=rndmonnum()` ✓; `makemon` flags ✓; `!resists_ston && !poly_when_stoned` → `propagate(wastyp,TRUE,FALSE)` + break ✓ — the extra `game.mvitals` arg matches C `mondata.c:80–86` (`svm.mvitals` genocide read), more faithful than the mvitals-less call sites; fail path unlinks via the sync fmon idiom (mongone is async) ✓; `set_corpsenm` + minvent→statue + re-unlink ✓.
- `:2391–2420` achievement: mines/soko prize oid+otyp + `nomerge=1` + `prize_warning` impossibles ✓; `describe_level(1|2)` buffer-first adapted to JS return shape ✓; `lua_testing` guard ✓.
- `:2428–2437` buried inline vs `dig.c:1984–2047` read verbatim: uchain-identity guard + `obj_resists(,0,0)` ✓; LEASH/`o_unleash` ✓; lamplit/`end_burn` ✓; `obj_extract_self` ✓; ROCK/BOULDER dealloc ✓ (quan-0/OBJ_FREE on the already-extracted object is the GC-faithful `obfree` — no list holds it); CORPSE no-op + `#if 0` rust skip ✓; `(under_ice?0:250)+rnd(250)` ROT_ORGANIC ✓; `add_to_buried` ✓; dealloc→container-null + `otmp=null` ✓. Named uball omit holds (fresh otmp is never `u.uball`; `unpunish`/`set_utrap`/pline arm inapplicable).
- RNG: draws only inside Medusa/buried arms in C positions; no reorder.

## Hallucinations / overclaim

One conservative-direction imprecision: "three new edges IN-SCC/SAFE" where `--can` says ALREADY on all three sampled — there are no new module edges. No FORCE/DIAG/seed/coordinate logic in code (only hit is the message's own disclaimer).

## Density

Breadth-phase missing-arms completion: 183 insertions, one module, whole-function gap closed to one named omit. Right-sized (ceiling raised, not length — review stays tight).

## Verification

Re-measured per-SHA re-run (`--base 6fc07aef5~1 --reach-all`) — both lines, matching the D-log:

```text
verify create_object: baseline 6fc07aef5~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify create_object: no corpus session is blocked on it at 6fc07aef5~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke create_object: no RNG-tagged reach; fixed smoke spread (24 run, 6.0s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort/full-44 per D-log; Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
