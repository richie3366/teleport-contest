# Review 1256 — 10178807 — steedintrap dart/arrow/landmine/poly wiring

Metadata: SHA `10178807`, D-2290, queue row `trap.c` steedintrap.
js/: 1 file, +189/−~40 (`js/trap.js` only).

Intent vs deliverable: subject promises dart/arrow `!rn2(2)` gates, a new
`trapeffect_poly_trap`, landmine guard + steed arm, POLY_TRAP selector
case, and a `u_locomotion_verb` helper. Diff delivers all five, nothing
else.

Inventory: changed `trapeffect_dart_trap`/`trapeffect_arrow_trap` hero
arms; new file-local `trapeffect_poly_trap`, `u_locomotion_verb`,
module-level `recursive_mine`; changed `trapeffect_landmine` hero else-arm
+ selector; import-list additions only (no new module edge).

## C ↔ JS fidelity

C loci: dart gate `trap.c:1276–1278`, arrow gate `:1211–1213`,
`trapeffect_poly_trap` `trap.c:2452–2525` (`csym`, 74 lines), landmine
`:2570–2593`, `u_locomotion` `hack.c:1817–1829`.

- Dart/arrow: `u.usteed && !rn2(2) && await steedintrap(trap, otmp)` ahead
  of `thitu`, steed-hit arm an empty block with the otmp-consumed note,
  miss arm under `else` — token-for-token vs C (`; /* nothing */` →
  `else if (thitu…)` → `else place/observe/stack/newsym`). Unmounted JS:
  `u.usteed` (undefined) short-circuits before `rn2(2)` — zero RNG delta,
  as the D-log claims. ✓ (D-log `:1211/:1276` labels are swapped —
  `:1211` is the arrow gate, `:1276` the dart gate — citation nit only.)
- Poly hero: viasitting `trigger` / usteed `lead <x_monnam> onto` /
  locomotion `onto` triple ✓; `seetrap` before the message ✓; iron-shoes
  `deltrap` + `Yname2 warps` + `poly_obj` + `update_inventory` + `prinv`
  ✓; Antimagic/Unchanging `shieldeff` + `You_feel` ✓; else
  `steedintrap(null)` + `deltrap` + `newsym` + feel + `polyself` in C
  order ✓. `Antimagic_prop()` is a pre-existing local CLONE
  (`js/trap.js:1582`, D-1089): `H||E` matches `youprop.h:57`, plus the
  house sticky-flat `|| u.Antimagic` (same shape as `Sleep_resistance`
  beside it) — verified CLONE, not new debt. `polyself`/`poly_obj` are
  ASYNC live exports, both awaited ✓.
- Poly monster: forcible-unwear (`which_armor` → `extract_from_minvent`
  TRUE,TRUE → `mpickobj` fail → `impossible`) ✓; `poly_obj` re-equip +
  `misc_worn_check |= W_ARMF` + `update_mon_extrinsics` TRUE,TRUE ✓;
  `resists_magm` → named-omit `shieldeff_mon` (no live exporter — same
  deferral as mhitm.js:615, named in commit + code) ✓; `resist` NOTELL →
  `newcham(null, NC_SHOW_MSG)` + in_sight `seetrap` ✓.
- Landmine: `recursive_mine` guard, `steed_mid` capture, steedintrap,
  guard reset, `sobj_at(SADDLE)` — all ahead of the wounded-legs lines in
  C order ✓. `keep_saddle_with_steedcorpse` named in commit + code with
  the C citation (`:2591–2592`); it has no map line (only code comments +
  D-log), and the landmine map row (`data.md:1062`) still lists
  `steedintrap` under "omit" although this SHA wires it — two stale-map
  fragments, doc debt, not C-wrongs.
- `u_locomotion_verb`: Levitation→float, Flying→fly, else
  `locomotion(data, def)` — matches C order; `def='step'` is lowercase so
  the capitalize arm provably never fires. ✓ (New file-local over the
  live `monmove.js:1122` import — correct layering, not a clone.)
- RNG: one `rn2(2)` per mounted dart/arrow hit, gated after `u.usteed`
  exactly as C — no other RNG touched.

Hallucinations / overclaim: none, except the swapped `:1211/:1276`
labels (prose only; code cites no lines).

Density: one trapeffect family + three caller gates — §2b right-sized.

Verification: D-log `verify --fn steedintrap` PASS (syntax/rule2/green
2/2/strict/cohort). Re-measured: `hidden-proxy verify steedintrap
--base 10178807~1` → 0 blocked baseline and working — vacuous claim
confirmed, no hidden regression. Diff grep: no banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
