# Review 1671 — a673b5e4 — `sp_lev.c` lspo_feature whole-body port (D-2712)

Metadata: commit `a673b5e4`, D-2712, `js/mklev.js` +144/−0 (2 tables, `sel_set_feature`, `splev_feature_boolopt`, `l_table_getset_feature_flag`, exported `lspo_feature`; 8 flag consts on the existing const edge). Pops the head Open-coverage row (lspo_feature MISSING). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `lspo_feature` (4-arity dispatch + `sel_set_feature` + feature-flag callees). Diff ships exactly that with per-line C cites. Promise matches deliverable.

## Inventory

New JS: `LSPO_FEATURES/2I` tables; file-local `sel_set_feature`, `splev_feature_boolopt`, `l_table_getset_feature_flag`; exported `lspo_feature`. Nothing deleted or re-pointed.

## Callee closure

Required `sym.mjs` output pasted verbatim (all additions):

```text
lspo_feature     js/mklev.js:1197   sync
```

Remaining callees verified live from prior reviews in this same audit: `splev_opt_index` (D-2710), `get_coord_unpacked` (`mklev.js:20425`), `get_table_xy_or_coord` (`:20440`), `get_location_coord` (`:20176`), `create_des_coder` (`:2047`), `impossible`, `isok`, `IS_FURNITURE`. Flag consts confirmed value-identical C-vs-JS: `T_LOOTED 1`, `TREE_LOOTED 1`, `TREE_SWARM 2`, `F_LOOTED 1`, `F_WARNED 2` (`rm.h:245–257` vs `const.js:1391–1395`), `S_LPUDDING 1`, `S_LDWASHER 2`, `S_LRING 4` (`rm.h:275–277` vs `const.js:1397–1399`). C `rm.h:218 #define looted flags` confirms JS `.looted` is the right cell field. No STUB in any arm; no new module edge.

## C ↔ JS fidelity

C loci (csym, whole bodies read): `lspo_feature` `:4843–4923` (81 L), `sel_set_feature` `:4632–4644`, `l_table_getset_feature_flag` `:4738–4755`, plus `get_table_boolean`/`_opt` re-reads from review 1669's evidence. RNG: none on this path (the `rn2(2)` arm is dead — see below). Branch walk:

- 4-arity dispatch: string-only / string+table / triple / table-form with `?? {}` ≡ `lcheck_param_table` ✓; non-string triple arg-1 throws via index-miss exactly like `luaL_checkoption` ✓; table-form missing `type` throws like C's NULL-default option lookup ✓.
- RANDOM→DRY / explicit→ANY_LOC packing ✓; post-dispatch coder read ✓; STONE `impossible` kept verbatim (unreachable via the 5-entry table, like C) ✓; `sel_set_feature` passes the int where C passes `(genericptr_t)&typ` — same value ✓; post-set `typ` + table-form gate `:4895` ✓; FOUNTAIN/SINK/THRONE/TREE flag arms in C order, POOL default ✓.
- `sel_set_feature`: isok gate (EXTRA_SANITY_CHECKS impossible correctly noted as compiled out upstream), `IS_FURNITURE` guard, typ-only assign ✓ (+ JS-only OOB `!loc` guard, file idiom).
- Flag helper: absent-field skip ≡ `-2` defval ✓; dead `val == −1 → rn2(2)` kept verbatim for C order ✓; set/clear on `.looted` ✓.
- Quirk preserved exactly: the string arm of `get_table_boolean` returns the raw checkoption index, so `"true"→0` is falsy and *clears* the flag — JS `splev_feature_boolopt` returns the raw index too, and deliberately does not reuse `splev_opt_boolean`'s intuitive mapping (disclosed in the D-log). Faithful, quirk included.

## Hallucinations / overclaim

None. D-log discloses the `get_coord` fatal→`{-1,-1}` collapse and the no-rewire decision on the inline expansions.

## Density

Breadth phase: one 81 L C entry + two small staticfns + one getter, one module. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base a673b5e4~1 --reach-all`):

```text
smoke lspo_feature: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
