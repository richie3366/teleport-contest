# Review 1667 — c3da9d13 — `dbridge.c` create_drawbridge restart (D-2708)

Metadata: commit `c3da9d13`, D-2708, `js/mklev.js` only (+61/−21: body restart + three call-site FALSE-arm wirings). Pops the head Open-coverage row (PARTIAL: C 48 L / JS 29 L). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body restart in C order — impossible arm + wall_info assign. Diff actually does that plus wires C `sp_lev.c:5758`'s `impossible("Cannot create drawbridge.")` FALSE-arm at all three in-file des-loader call sites (`load_val_goal` ×3, `load_castle` ×1). Promise matches deliverable, plus the caller wiring.

## Inventory

Changed JS: file-local `create_drawbridge` restarted (`js/mklev.js:19034` at this SHA; now `:19656` per sym — C has the one definition, correct placement, not drift); four `if (!create_drawbridge(…)) impossible(…)` guards added at existing call sites. No imports touched (`impossible`, consts already in scope). No deleted/re-pointed symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (no symbol deleted or re-pointed — body-only restart + new calls to a live export):

```text
create_drawbridge NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:19656
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
impossible       js/display.js:8055   ASYNC — await required
```

(Tool's generic "CLONE" label again means "local"; C has exactly one `create_drawbridge` and this is its port at the des-loader home module.) Callees: `IS_WALL` macro live, `impossible` LIVE. No STUB in any arm. `impossible` is async but all four touched contexts are sync loaders — fire-and-forget without await is the pre-existing in-file precedent (e.g. former `js/mklev.js:1086` `impossible('Cannot create drawbridge.')`, `:1370` unknown-room-type). The call still executes synchronously through the guard/format up to the first await; only pline delivery floats. Documented compromise, not a stub — disclosed here, not queued.

## C ↔ JS fidelity

C locus: `create_drawbridge` `dbridge.c:234–283` (csym, 50 L — whole body read) + callers (csym `--callers`: sole C caller `sp_lev.c:5758`). RNG: none either side. Branch walk, in C order:

- `lava` pre-read with the "assume initialized map" comment ✓.
- NORTH/SOUTH/EAST arms ✓; `default:` now calls `impossible("bad direction in create_drawbridge")` then `/*FALLTHRU*/` to WEST — exact, fixing the old `case DB_WEST: default:` merge that dropped the call ✓.
- `!IS_WALL → FALSE` ✓; open arm (DOWN + DOOR/D_NODOOR) ✓; closed arm (UP + DBWALL + `wall_info = W_NONDIGGABLE` **plain assign**, fixing the old `|=` — verified against C `:270`) ✓.
- `horizontal` pair, `drawbridgemask = dir` + `if (lava) |= DB_LAVA` two-step in C order (same value as the old single expression) ✓; `return TRUE` ✓.
- Callers: C `:5758` has no same-named JS binding (des ships as hardcoded loaders — named); its three runtime equivalents (`load_val_goal` DB_SOUTH ×1 + DB_NORTH ×2, `load_castle` DB_EAST ×1) now all carry the FALSE→impossible arm with C's exact message ✓. `db_open == -1 → !rn2(2)` and percent(75) open/else-random state selection preserved at those sites ✓.

## Hallucinations / overclaim

None. D-log names the OOB-guard and Lua-binding omissions in the map.

## Density

Breadth phase: one 50 L C function + its four call-site arms, one module. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base c3da9d13~1 --reach-all`):

```text
verify create_drawbridge: baseline c3da9d13~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify create_drawbridge: no corpus session is blocked on it at c3da9d13~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke create_drawbridge: no RNG-tagged reach; fixed smoke spread (24 run, 3.4s): 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
