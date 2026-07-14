# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-14 17:17 — D-0277 bones ghostly peace_minded

- Objective: seed0030 seg9 @16683 (CURRENT primary D-0276 follow-on).
- C locus: `restore.c` `getlev` ghostly `peace_minded`/`set_malign`;
  `bones.c` `savebones` pet untame.
- Change: DIAG showed peaceful dwarf vs C track/`mdig_tunnel`. JS kept
  Elara peaceful flags; Hermione must re-evaluate. `try_load_bones`
  ghostly reset + export `peace_minded`; savebones clears `mtame`.
- Verification: seg9 **16683→16836**; green+strict PASS; 19-session
  PASS cohort + strict lengths.
- Next: @16836 C `rn2(7) @ disturb` vs JS `rn2(3)`.

## 2026-07-14 17:20 — D-0276 bones mtrack serialize/restore

- Objective: seed0030 seg9 @16635 (CURRENT primary D-0275 follow-on).
- C locus: `save.c` `savemon` / `restore.c` `restmon` (`mtrack` in
  `struct monst`); `monmove.c:1963` track skip.
- Change: `js/bones.js` persist `mtrack[4]` on write/load. Prior omit
  forced zeros; live Elara mons had tracks → C `rn2(8)` vs JS fleeck.
- Verification: seg9 **16635→16683**; green+strict PASS; 17-session
  PASS cohort + strict lengths; flat **48192**/105529.
- Next: @16683 C `rn2(32)` track (cnt=8) vs JS `rn2(10)`; C `mdig_tunnel`.

## 2026-07-14 17:15 — D-0275 done_object_cleanup thrownobj

- Objective: seed0030 seg9 @16630 (CURRENT primary D-0274 follow-on).
- C locus: `end.c` `done_object_cleanup`/`really_done`; `mthrowu.c`
  fatal `thitu` skips `drop_throw`.
- Change: place limbo `_thrownobj`/`_kickedobj` onto map before bones.
  Killing arrow was `OBJ_FREE` → omitted from VFS (48 vs 49).
- Verification: bones **49**; seg9 **16630→16635**; green+strict PASS;
  19-session PASS cohort + strict lengths.
- Next: post-bones `m_move` `rn2(8)` vs `rn2(5)` @16635.

## 2026-07-14 17:05 — D-0274 getbones VFS load (partial)

- Objective: seed0030 seg9 @16582 (CURRENT primary D-0274).
- C locus: `bones.c` getbones/savebones; `restore.c` rest*chn ghostly
  `next_ident`; `files.c` set_bonesfile_name.
- Change: `js/bones.js` VFS JSON write/load + next_ident remap;
  wire `savebones`/`getbones`. Elara `bonM0.1` loads for Hermione.
- Verification: seg9 **16582→16630**; green+strict PASS; 17-session
  PASS cohort; seed0030 flat **48199**/105529 Scr **85**/1953.
- Next: find missing bones entity (JS 48 vs C 49 next_ident).

## 2026-07-14 16:48 — D-0273 corpse_chance AT_BOOM / mon_explodes

- Objective: seed0030 seg9 @12414 (CURRENT primary D-0273).
- C locus: `mon.c` `corpse_chance` AT_BOOM; `explode.c` `mon_explodes` /
  `explode` PHYS; `zap.c` `destroy_items`/`resist`.
- Change: new `js/explode.js`; AT_BOOM arm in `corpse_chance`
  (uhitm/mhitm/trap). Gas spore kill matches boom RNG through exercise.
- Verification: seg9 **12414→16582**; green+strict PASS; 17-session
  PASS cohort; flat **48156**/105529.
- Next: D-0274 — `getbones` load → `next_ident` @16582.

## 2026-07-14 16:42 — D-0272 find_roll_to_hit Luck bonus

- Objective: seed0030 seg9 @12411 (CURRENT primary D-0272).
- C locus: `uhitm.c` `find_roll_to_hit` Luck term; full-moon
  `change_luck(1)` already in `moveloop_preamble`.
- Change: DIAG showed Healer/scalpel vs gas spore `tmp=15==dieroll`;
  ported Luck bonus in `js/uhitm.js`. Falsified: missing post-hit
  exercise / gas-spore path — miss before damage.
- Verification: seg9 **12411→12414**; green+strict PASS; 17-session PASS
  cohort; seed0030 flat **48141**/105529 Scr **85**/1953.
- Next: D-0273 — `corpse_chance` AT_BOOM / `mon_explodes` @12414.

## 2026-07-14 16:45 — D-0271 make_corpse undead before G_NOCORPSE

- Objective: seed0030 seg9 @10811 (CURRENT primary D-0271).
- C locus: `mon.c` `make_corpse` zombie/mummy/vampire arms before
  `default_1` `G_NOCORPSE`; `undead_to_corpse` + `mkcorpstat` +
  `TAINT_AGE+1`.
- Change: DIAG showed `PM_KOBOLD_ZOMBIE` early-return on geno
  `G_NOCORPSE`; ported undead specials in `js/mhitm.js` `make_corpse`;
  `trap.js` shares export. Named omit: dragon/unicorn/worm/golem arms.
- Verification: seg9 **10811→12411**; green+strict PASS; 17-session PASS
  cohort; seed0030 flat **48092**/105529 Scr **85**/1953.
- Next: D-0272 — diagnose seg9 @12411 C `exercise` vs JS `rn2(3)`.

## 2026-07-14 16:35 — D-0268/69/70 Invis rn2(11) + SCORR vision

- Objective: seed0030 seg9 @10461 (CURRENT primary D-0268).
- C locus: `monmove.c` `m_move` Invis `rn2(11)`; `detect.c` SCORR
  `unblock_point`; `mkobj.c` boulder `place_object`/`remove_object`.
- Change: ported Invis appr gate (D-0268); SCORR/SDOOR uncover →
  `recalc_block_point` not `vision_recalc(1)` (D-0269); boulder
  place/extract vision (D-0270). Falsified: Invis gate alone —
  `couldsee` false from stale `viz_clear` after SCORR→CORR.
- Verification: seg9 **10461→10811**; green+strict PASS; 19-session PASS
  cohort; full **19/44** Scr **1563** RNG **182673**.
- Next: D-0271 — diagnose seg9 @10811 C `next_ident` vs JS `rn2(5)`.

## 2026-07-14 16:25 — docs hot-pack restructure (CURRENT.md)

- Objective: cut per-iteration doc tokens (human-approved Sol plan).
- Change: add `CURRENT.md`; archive PROGRESS/journal bulk; split
  `DIVERGENCE-INDEX.md` + `c-js-map/*.md`; slim NOTES; update playbook/
  prompt/rules/runbook; add `scripts/check-hot-docs.mjs`.
- Verification: `node scripts/check-hot-docs.mjs` PASS (~4.7k tok hot sum).
- Next: loop agents follow `CURRENT.md` primary (D-0268); do not re-expand
  archive into the hot pack.

## 2026-07-14 16:15 — D-0267 m_move set_apparxy before shk

- Objective: seed0030 seg9 @8943 (PROGRESS primary; NOTES post-Invis
  set_apparxy).
- C locus: `monmove.c` `m_move` — `set_apparxy` after meating, before
  mtame / shk|gd|priest.
- Change: reorder `js/monmove.js` `m_move` to call `set_apparxy` before
  specials. Falsified mux/perceives theory — actor was peaceful
  shopkeeper returning from `shk_move` before apparxy.
- Verification: seg9 **8943→10461**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182691**.
- Next: D-0268 — port `m_move` Invis `rn2(11)` should_see → `appr=0`
  @10461.

## 2026-07-14 15:35 — D-0265 hitval oc_hitbon

- Objective: seed0030 seg9 @8352 (PROGRESS primary; NOTES hitum/exercise).
- C locus: `weapon.c` `hitval` — weapon/weptool `spe` + always
  `objects[otyp].oc_hitbon`; `uhitm.c` `find_roll_to_hit`.
- Change: `js/uhitm.js` `hitval` adds extracted `a_ac` as `oc_hitbon`
  (dagger family +2). Blessed/spear/trident/pick/artifact deferred.
- Falsified: incomplete post-hit `hmon`/`dmgval` — matched `rnd(20)=13`;
  JS missed solely from missing +2 to-hit.
- Verification: seg9 **8352→8918**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182547**; seed0030
  **47960**/105529.
- Next: diagnose seg9 @8918 hero `trapeffect_magic_trap`/`domagictrap`
  (D-0266).


- Objective: seed0030 seg9 @8281 (PROGRESS primary; NOTES post-gem fleeck).
- C locus: `monmove.c` `dochug` HTH wield when `dist2(mux,muy)<=8` +
  `weapon_check==NEED_WEAPON`; `weapon.c` `select_hwep`/`mon_wield_item`.
- Change: `js/weapon.js` `select_hwep` + NEED_HTH arm; `js/monmove.js`
  pre-move wield gate + `Conflict` in `want_move`.
- Falsified: goblin nearby / track-arity-only (goblin `dist2=8`,
  `wc=NEED_WEAPON`, unwielded ORCISH_DAGGER — C spends turn wielding).
- Verification: seg9 **8281→8352**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182533**; seed0030
  **47946**/105529.
- Next: diagnose seg9 @8352 `exercise` vs `rn2(3)` after `hitum` (D-0265).

## 2026-07-14 10:50 — D-0263 drinkfountain dofindgem

- Objective: seed0030 seg9 @8138 (PROGRESS primary; NOTES fountain gem).
- C locus: `fountain.c` `drinkfountain` case 27 → `dofindgem` →
  `mksobj_at(rnd_class(DILITHIUM_CRYSTAL, LUCKSTONE-1), …, FALSE, FALSE)`.
- Change: `js/fountain.js` port `dofindgem` + FOUNTAIN_LOOTED; drink
  case 27 + dip case 24; export `rnd_class` from `js/mkobj.js`.
- Falsified: none — C fate=27 matched hypothesis (JS hit dryup early).
- Verification: seg9 **8138→8281**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182518**; seed0030
  **47931**/105529.
- Next: diagnose seg9 @8281 `distfleeck` vs `rn2(16)` (D-0264).

## 2026-07-14 10:45 — D-0262 set_mimic_sym shop get_shop_item

- Objective: seed0030 seg9 @7196 (PROGRESS primary; NOTES shop stock).
- C locus: `makemon.c` `set_mimic_sym` `rt >= SHOPBASE` → `get_shop_item`
  after `rn2(10) >= depth(&u.uz)` (not stock_room mkshobj_at alone).
- Change: `js/makemon.js` port shop arm — `get_shop_item`, FODDERSHOP
  jelly/mold, RANDOM_CLASS remap, assign_sym/`mkobj`; use `depth()`.
- Falsified: stock_room eligibility as root (matched through mimic
  `rn2(10)=1`; peel was deferred shop appearance body).
- Verification: seg9 **7196→8138**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182545**; seed0030
  **47958**/105529.
- Next: diagnose seg9 @8138 `drinkfountain`/`rnd_class` (D-0263).

## 2026-07-14 10:32 — D-0261 Ctrl-rush run=3 + await muse pline
- Objective: seed0030 seg8 @3310 (PROGRESS primary; prior peel thought more()/dodrop).
- C locus: `cmd.c` `do_rush_*`→`set_move_cmd(dir,3)`; `hack.c` `lookaround`
  (`run!=1` stops any non-safemon); `muse.c` `mzapwand`/`mbhitm` blocking pline.
- Change: `js/cmd.js` Ctrl-rush `run=3` (capital `run=1`); `js/muse.js` await
  wand/hurl plines; `js/monmove.js` await `use_misc`. Prior `dodrop` kept.
- Falsified: fleeck/mfndpos @3068; more()-only without run-mode; DIAG await-in-more.
- Verification: seg8 RNG FULL; green+strict PASS; 17-session PASS cohort;
  full **19/44** Scr **1563** RNG **182531**; seed0013 RNG full Scr **57**/59.
- Next: diagnose seed0030 seg9 @7196 `get_shop_item` (D-0262).
- C locus: <file:function>
- Result: <verified change | falsified hypothesis | prerequisite>
- Verification: <commands and compact result>
- Next: <one exact first action>
```

---

## 2026-07-14 10:05 — dodrop + D-0261 more desync (seg8 @3310)
- Objective: seed0030 seg8 peel (PROGRESS primary; NOTES @3068 was stale).
- C locus: `do.c` `dodrop`/`drop`/`dropx`/`dropy`/`canletgo`; `topl.c`
  `more`/`xwaitforspace`; `dogmove.c` `dog_goal` APPORT scan.
- Result: **partial** — @3068 fleeck/mfndpos squeeze **falsified** (match
  through 3309). Live @3310 is missing floor katana after C `d`/`a` drop.
  Ported `dodrop`/`dropx` + rhack `'d'`. Peel still open: post-rush
  `more()` discards `d`/`a` (only space/CR dismiss); inject spaces →
  katana on floor but drop must precede dog_goal @3309.
- Verification: green+strict PASS; 17-session PASS cohort; full **19/44**
  Scr **1465** RNG **181571**; seed0030 **47901**/105529.
- Next: compare C vs JS `more()` call sites during seg8 rush (`\r`→`\n`)
  so `d` reaches `dodrop` before dog_goal @3309.

