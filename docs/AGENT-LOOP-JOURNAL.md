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

## 2026-07-14 18:40 — D-0291 topten + record VFS + terminate capture

- Objective: seed0030 Scr 161/1953 (CURRENT primary); first miss @78.
- C locus: `topten.c` `topten`/`outheader`/`outentry`; `end.c` → `nh_terminate`
  contest input-boundary capture (no nhgetch after raw_print panel).
- Change: port `js/topten.js` (!toptenwin raw panel + VFS `record`); wire
  after RIP; `game._captureInputBoundary` for final frame (D-0291).
- Verification: Scr@78 match; Scr **161→818**; miss **78→818**; RNG full;
  green+strict; 17-session PASS.
- Next: Scr@818 seg5 cell diff; or seg7 159 vs 172 steps.

## 2026-07-14 18:24 — D-0290 RIP endwin trailing blank `--More--`

- Objective: seed0030 Scr 120/1953 (CURRENT primary); first miss @76.
- C locus: `end.c` `really_done` final empty `dump_forward_putstr`;
  `wintty.c` `process_text_window` page-break at rows-1.
- Change: append trailing `''` in `show_death_rip_and_summary` so 24
  lines force blank page-2 `--More--` (D-0290).
- Verification: Scr@76–77 blank more match; prefix miss **76→78**;
  Scr **120→161**; RNG full; green+strict; 19-session PASS cohort.
- Next: Scr@78 `topten()` score list; or seed0013.

## 2026-07-14 18:18 — D-0288/89 disclose + RIP death summary

- Objective: seed0030 Scr 116/1953 (CURRENT primary); first miss @75.
- C locus: `options.c`/`end.c` disclose; `rip.c` `genl_outrip`;
  `do.c` Tourist `more_experienced` on new level.
- Change: parse `disclose:-i…` → skip invent yn (D-0288); RIP+Aloha
  NHW_TEXT + score; Tourist goto XP for 124 points (D-0289).
- Verification: Scr@75 match; prefix miss **75→76**; Scr **116→120**;
  RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@76 topten/endwin `--More--`; or seed0013.

## 2026-07-14 18:12 — D-0286/87 mswings + botl HP clamp

- Objective: seed0030 Scr 103/1953 (CURRENT primary); first miss @62.
- C locus: `mhitu.c` `mswings`/`mswings_verb`/`hitval`; `botl.c` hp<0→0.
- Change: AT_WEAP melee calls `hitval` + `mswings` before hit/miss
  (D-0286); status line clamps negative HP for display (D-0287).
- Verification: Scr@62 topline+HP match; prefix miss **62→75**;
  Scr **103→116**; RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@75 death `--More--` vs invent-identify yn; or seed0013.

## 2026-07-14 18:03 — D-0284/85 tmp_at flash + potion xname

- Objective: seed0030 Scr 100/1953 (CURRENT primary); first miss @50.
- C locus: `mthrowu.c` `m_throw` `tmp_at(DISP_FLASH)`; `objnam.c`
  potion xname `oc_name_known` / descr.
- Change: port DISP_FLASH `tmp_at` + await `potionhit` plines so prior
  flight `!` survives crash `--More--` (D-0284); potion `xname` uses
  shuffled descr when !nn (not `obj.known`) (D-0285).
- Verification: Scr@50–51 match; prefix miss **50→62**; Scr **100→103**;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@62 gnome bow-swing pline; or seed0013.

## 2026-07-14 17:55 — D-0283 botl depth + Mines walls

- Objective: seed0030 Scr 87/1953 (CURRENT primary); first miss @46.
- C locus: `botl.c` `describe_level` `depth(&u.uz)`; `display.c`
  `wall_color(mines_walls)`.
- Change: botl `Dlvl` via `depth()` (not `dunlev`); Mines walls
  `CLR_BROWN` when `In_mines`. DIAG confirmed second `>` is Mines
  branch stairs (`dnum:2,dlevel:1`), not wrong goto.
- Verification: Scr@46–49 match; prefix **46→50**; Scr 87→100;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@50 C `!` vs JS `·` (6,33); or seed0013.

## 2026-07-14 17:45 — D-0282 topl wrap + redotoplin more

- Objective: seed0030 Scr 85/1953 (CURRENT primary); first miss @24.
- C locus: `engrave.c` `read_engr_at` BUFSZ maxelen; `topl.c`
  `update_topl` / `redotoplin`.
- Change: maxelen via BUFSZ+sizeof; `pline` inserts wrap `\n` and
  calls `more()` when multi-line (space no longer becomes a command).
- Verification: Scr@23–25 match; prefix miss **24→46**; Scr 85→87;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- Next: Scr@46 wall color / botl HP after descend; or seed0013.

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

