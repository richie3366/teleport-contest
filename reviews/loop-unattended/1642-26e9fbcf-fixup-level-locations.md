# Review 1642 — 26e9fbcf — `dungeon.c` fixup_level_locations whole-body port (D-2683)

Metadata: commit `26e9fbcf`, D-2683, js/dungeon.js +
scripts/fixup-level-locations.test.mjs (new, committed). No prior review
claimed closed.

## Intent vs deliverable

Subject promises: whole-body `fixup_level_locations` with C-order cites,
live-callee wiring, headless pin. Diff actually adds: restarted body
(+ per-arm `:line` cites), staticfn→export, 2 canonical-callee
re-points, 123 L committed test. Matches the promise; no extras.

## Inventory

Changed JS: `fixup_level_locations` (restarted + exported,
js/dungeon.js:961).

## C ↔ JS fidelity

C locus: `dungeon.c:1121–1182` (csym; D-log `:1122–1182`, decl-line
off-by-one only). Sole caller `:1313` init_dungeons (csym --callers;
D-log wires it — unchanged call site below, now hits the full body).

Branch-by-branch confirm: sentinel-ended table walk; find_level +
assign_level; `!strncmp(x-)` quest stamp
`Sprintf(proto,"%s%s",filecode,&name[1])` → `code + lev_name.slice(1)`
('Tou' default documented as dead-on-live-path — allmain sets role
first; acceptable glue); Knox pointer-compare → field-name compare
(the only faithful rendering — JS has no addresses) with the
floating-entrance branch scan, `end1.dnum = n_dgns`,
`insert_branch(br,TRUE)`; five hardwired dnums; dummy depth_start
shift. Confirm throughout.

Table-entry audit (the real risk on a table-driven port): C
`level_map[]` `:706–737` has 26 entries + `""` sentinel; JS
`LEVEL_MAP` (js/dungeon.js:178) has the same 26 in the same order, and
X_START/X_LOCATE/X_GOAL verified as `"x-strt"/"x-loca"/"x-goal"`
(dungeon.c:12–14). Entry-for-entry confirmed.

Re-pointed callees (`sym.mjs` pasted in-session): `on_level`
(js/dungeon.js:1269, canonical dnum+dlevel compare — replaces an
inline equivalent, behavior-identical); `dunlevs_in_dungeon`
(js/dungeon.js:705, C body `:1331–1335` is exactly the num_dunlevs
lookup — the re-point makes JS *more* C-faithful, not less);
`insert_branch` (js/dungeon.js:244). All same-file — no import edge,
no TDZ question. C `staticfn` → export justified by the headless pin
(D-2416 precedent cited in-code).

No RNG. Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide).

## Hallucinations / overclaim

None. The `:1179` dummy-strip TODO is correctly named as C-open (C
never implemented it either) rather than silently dropped. Pre-existing
`assign_level`/`dname_to_dnum` clones elsewhere named as omits, not
Must-fix — correct scoping.

## Density

Breadth-phase whole-function port (C 62 L), ~70 JS lines + committed
test — right-sized, one C function.

## Verification

D-log: new test 6/6 pre- and post-restart, syntax, rule2, hidden
0-blocked, reach smoke 24/24, green/strict/cohort → VERIFY: PASS.
Re-ran test at HEAD: 6 pass, 0 fail (observed this session). Re-ran
`hidden-proxy.mjs verify fixup_level_locations --base 26e9fbcf~1
--reach-all`: "0 blocked (0 at baseline…)" — queue cited 0, vacuous
note properly stated — plus "24 PASS, 0 regressed → REACH-OK".
No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
