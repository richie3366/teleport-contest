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

## 2026-07-14 17:39 — D-0281 `#quit` done2

- Objective: seed0030 seg8 trailing JS after C end (CURRENT primary).
- C locus: `end.c` `done2` / extcmdlist `quit` GENERALCMD.
- Change: DIAG — `#quit` AC-only → unknown; `y` vi-moved. Ported
  `done2` + EXT_CMDS `quit` (ParanoidQuit getlin / goodbye deferred).
- Verification: seg8 **FULL** 3476; positional **105529**/105529 Scr
  85/1953; green+strict PASS; 19-session PASS cohort + strict.
- Next: seed0030 Scr 85/1953 (RNG full); or seed0013 Scr 57/59.

## 2026-07-14 17:34 — D-0280 dodrink ECMD_TIME

- Objective: seed0030 seg5 trailing JS after C end (CURRENT primary).
- C locus: `potion.c` `dodrink` → `ECMD_CANCEL`; cmd only on `ECMD_TIME`.
- Change: DIAG — quaff cancel left `move=1` because `ECMD_CANCEL` is
  truthy. `rhack` `q` now uses `(drinkRes & ECMD_TIME)`.
- Verification: seg5 **FULL** 8397; segs 0–7 FULL; positional
  **88957**/105529; green+strict PASS; 19-session PASS cohort + strict.
- Next: seg8 trailing after `#quit` (3505 vs 3476); or seg9 @16582.

## 2026-07-14 17:29 — D-0279 no_bones_level

- Objective: seed0030 seg4 trailing `rn2(1)` after knockback (CURRENT primary).
- C locus: `bones.c` `no_bones_level` / `can_make_bones`; `getbones` gate.
- Change: DIAG showed `can_make_bones` depth rn2 on Mines-stair Dlvl2;
  C skips via `Is_branchlev && dlevel>1`. Ported `no_bones_level` +
  portal scan; wired into `can_make_bones` and `getbones`.
- Verification: seg4 **FULL** 8031; positional **55489**/105529; green+
  strict PASS; 17-session PASS cohort + strict lengths.
- Next: seg5 trailing JS after C end; or seg9 @16582 getbones open.

## 2026-07-14 17:22 — D-0278 dochug disturb

- Objective: seed0030 seg9 @16836 (CURRENT primary D-0277 follow-on).
- C locus: `monmove.c` `disturb` / `dochug` `msleeping && !disturb`.
- Change: JS early-returned on `msleeping`; ported `disturb` (couldsee /
  mdistu / Stealth / ettin / nymph|jabber|lep / Aggravate|dog|human /
  `rn2(7)`+mimic) and wired into `dochug`. `wake_msg` deferred.
- Verification: seg9 **16836→17104**/17104; green+strict PASS; 17-session
  PASS cohort + strict lengths; seed0030 **48194**/105529 Scr 85/1953.
- Next: seg4 trailing JS `rn2(1)` after C `mhitm_knockback` `rn2(6)`.

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
