# Review 855 — b344cc6f — mkmaze.c makemaz Hea quest 5/5 (D-1885)

Metadata: SHA `b344cc6f`, D-1885. Files: `js/mklev.js` (+504/−1: 5
loaders + 5 dispatch arms + `';'` class entry + `WAN_LIGHTNING`
const). Next index 855.

Intent vs deliverable: subject promises Hea-strt/-loca/-goal/-fila/-filb
(Healer 0/5 → 5/5; 388 lua lines) plus deletion of the wiz-goal and
val-strt live rows as stale duplicates of archived D-1818/D-1852. The
diff delivers exactly that; no new module edges. Queue surgery
verified against the archive: `Wiz-goal` **Addressed:** D-1818 `2c339c26`
`2c339c26` and `Val-strt…` **Addressed:** D-1852 `e84fa9d3` — the
deleted live rows were genuine stale duplicates, correctly removed.

Inventory: new file-local `load_hea_strt/loca/goal/fila/filb`
(dispatch-called in the same file — no clone question);
`';': 'S_EEL'` class-map entry; `WAN_LIGHTNING` const. Callees all
pre-existing LIVE (`splev_*`, `lspo_replace_terrain_region`,
`light_region`, `mkstairs`, `l_create_object`, `wallification`,
`flip_level_rnd`, `place_lregion`, `fixup_special`, `priestini`).
`load_hea_strt` is file-local by design like every other quest loader.

**C ↔ JS fidelity** (checked lua-by-lua against `dat/Hea-*.lua`):

- Maps byte-identical for all three mapped levels (20/10/12 lines —
  re-measured with node; the only delta is a trailing `\n` the shared
  `mapfrag_fromstr` explicitly drops).
- Flags exact per lua `level_flags`/`level_init` lines: strt
  solidfill-STONE + mazelevel/noteleport/hardfloor; loca
  solidfill-STONE + mazelevel/hardfloor (no noteleport) + mines
  fg="." bg="P" smoothed/joined/lit/unwalled; goal solidfill-POOL +
  mazelevel only, mines unsmoothed; fila/filb mazelevel/noflip (flip
  correctly skipped).
- Strt: replace_terrain(1,1,74,18,POOL,ROOM,10) immediately after the
  map per lua order; whole-map lit; down stair (37,9); neutral
  non-shrine altar (plain ALTAR, no priestini — lua `type="altar"`);
  12 doors in lua coords/order (6 locked + 6 closed, verified
  one-by-one); Hippocrates + silver dagger spe 5 (lua inventory fn) +
  chest + 8 attendants; whole-map nondiggable; 6 traps; siege in lua
  order (10 rats, eel, shark, `;`, 5×D peaceful=0, 5×S peaceful=0 —
  `splev_create_monster('D', 0)` form matches the `peaceful=0` key).
- Loca: temple rect (12,3,20,6) with chaos shrine + priestini +
  has_temple; 4 doors; stairs (4,4)/(20,6); rect nondiggable
  (11,2,21,7); 15 objects; 6 traps; monsters in lua order (8 rats, r,
  5 eels, 2 electric, kraken, 2 sharks, 2×`;`, 5×D, 9×S).
- Goal: Staff of Aesculapius (blessed +0 quarterstaff, artifact name)
  + wand of lightning at (20,6) + 14 random; 6 traps; hostile Cyclops
  at (20,6) + 3 rats + 2 r + 6 eels + 2 electric + 2 sharks + `;` +
  5 D + 10 S.
- Fila/filb: stairs → objects (8/11) → traps (4/4) → monsters in lua
  order (fila 1 rat/2 r/2 eels/1 electric/4 D/3 S; filb 2 rats/2 r/
  5 eels/2 electric/4 D/3 S).
- `';'` cite correct (`defsym.h:362` MONSYM eel, `sp_lev.c:1936`
  `def_char_to_monclass`); `WAN_LIGHTNING` const added.

Two observations, neither a C-wrong. (a) Loca temple sets
`needfill = FILL_LVFLAGS` where lua `filled=1` means FILL_NORMAL
(`lspo_region` assigns the raw value, `sp_lev.c:5600`; const.js
FILL_NORMAL=1/LVFLAGS=2) — provably moot: C `fill_special_room`
(`sp_lev.c:2749–2796`, mirrored line-for-line in JS) has no TEMPLE
case under FILL_NORMAL and sets `has_temple` under either value, and
`fill_ordinary_room` only applies to OROOM/THEMEROOM. (b) The strt
branch levregion is placed post-flip at pre-flip coords while C
`flip_level` flips lua-placed lregions (`sp_lev.c:700–725`) — but this
is the shared Sam-strt idiom across ~15 ACCEPTed quest loaders
(reviews 822/828), unmeasured, with zero corpus sessions reaching
quest-home arrival; an open measurement question, not a Keep'd
C-wrong. (D-1890 later names it explicitly as a carried omit.)

Hallucinations / overclaim: none — the D-log labels hidden verify
"vacuous" explicitly and ships on public gates, exactly what the
proxy itself instructs for 0-block content rows.

Density: 504 insertions for one quest family (5 small loaders, one C
locus family) — at the ceiling but coherent, matching sibling
quest-set commits.

Verification: D-log `verify.mjs --fn makemaz` → PASS (syntax, rule2,
green 2/2, strict, cohort 7/7, full 44/44 auto on the shared file).
Re-measured myself: `hidden-proxy.mjs verify makemaz --base
b344cc6f~1` → `0 session(s) blocked on it (0 at baseline…)` →
vacuous, shipped on public gates per the proxy instruction. No
FORCE/DIAG/seed/coordinate in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
