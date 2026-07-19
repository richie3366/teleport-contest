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

## 2026-07-19 10:10 — #851 minend-2 Wine Cellar (D-0755)
- Objective: seed0360 @43248 C minend-2 (`makemaz` `rnd(3)=2`) vs JS `rn2(79)`.
- C locus: `dat/minend-2.lua` / `mkmaze.c` `makemaz` (`minend` `rndlevs=3`).
- Change: `load_minend_2` + dispatch (solidfill map, percent terrain,
  region_islev tele, wine-cellar engravings/potions, treasure+prize,
  wallify/flip/lregions/fixup). degrade-default engravings (not nowipeout).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **43248→52601**; RNG **43267→52639**; Scr **207→238**.
- Next: @52601 C `soko4-1` (`makemaz` `rnd(2)=1`) vs JS `rn2(79)`.

## 2026-07-19 10:06 — #850 minetn-5 + public score (D-0754)
- Objective: #850 full `sessions` score + seed0360 @41777 nhlib shuffle.
- C locus: `dat/minetn-5.lua` / `mkmaze.c` `makemaz` (`rnd(7)=5` → minetn-5).
- Change: `load_minetn_5` + dispatch. Falsified “next Gehennom special”
  after sanctum — C goes to Mine Town-5.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41777→43248**; RNG **41794→43267**; Scr 207. Full suite **37/44**;
  Scr **8212**/11405; RNG **573869**/792838 (72.38%); speed `37+0.20/turn`.
- Next: @43248 C minend-2 (`rnd(3)=2`) vs JS `rn2(79)`.

## 2026-07-19 10:00 — #849 maybe_generate stronghold rate (D-0753)
- Objective: seed0360 @41768 C maybe_generate_rnd_mon rn2(50) vs JS rn2(70).
- C locus: `allmain.c` `maybe_generate_rnd_mon` udemigod?25 :
  depth>stronghold?50 : 70.
- Change: `js/allmain.js` port full rate ternary via `depth()` +
  `game.stronghold_level` + `uevent.udemigod` (was always 70).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41768→41777**; RNG **41793→41794**; Scr 207.
- Next: @41777 C nhlib.lua shuffle rn2(3) vs JS rn2(79)
  (post getbones/makemaz; C splev_initlev).

## 2026-07-19 09:58 — #848 sanctum region_islev absolute (D-0752)
- Objective: seed0360 @41671 C place_lregion rn2(26) vs JS rn2(23).
- C locus: `dat/sanctum.lua` teleport_region region_islev=1;
  `sp_lev.c` `levregion_add` skips get_location when in_islev.
- Change: `load_sanctum` tele inarea absolute {54,1,79,18} (not mx+).
  Root was map-relative offset with xstart=3 → span 23 vs C 26.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41671→41768**; RNG **41693→41793**; Scr 207.
- Next: @41768 C maybe_generate_rnd_mon rn2(50) vs JS rn2(70)
  (depth > stronghold_level).

## 2026-07-19 09:55 — #847 hell temperature + temperature_shift (D-0751)
- Objective: seed0360 @38557 C rndmonst_adj rn2(7) vs JS rn2(4).
- C locus: `mklev.c`/`sp_lev.c` temperature=In_hell?1:0; `makemon.c`
  `temperature_shift` + `pm_resistance` MR_FIRE/COLD.
- Change: clear_level_structures hellish→hot; real temperature_shift.
  Sanctum has no lua temperate (unlike valley).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **38557→41671**; RNG **38600→41693**; Scr 207.
- Next: @41671 C place_lregion rn2(26) vs JS rn2(23).

## 2026-07-19 09:52 — #846 sanctum load + peace_minded is_minion (D-0750)
- Objective: seed0360 @37668 C nhlib shuffle vs JS rn2(79).
- C locus: `dat/sanctum.lua` via `load_special`; `makemon.c` `peace_minded` `is_minion`.
- Change: `load_sanctum` + dispatch; `peace_minded` minion → `record>=0` (no rn2).
  Falsified “post-asmodeus” — next miss after valley is sanctum.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **37668→38557**; RNG **37686→38600**; Scr 207.
- Next: @38557 C rndmonst_adj rn2(7) vs JS rn2(4) (morgue fill_zoo).

## 2026-07-19 09:45 — #845 score + rnd_misc_item nonliving (D-0749)
- Objective: mandatory full score (#845÷5) + seed0360 @35405 primary.
- C locus: `muse.c` `rnd_misc_item` — `!rn2(40) && !nonliving && !vampshifter`.
- Change: JS life-saving amulet gate now matches C (was `!rn2(40)` alone).
- Verification: green+strict PASS; cohort 16/16; seed0360 prefix
  **35405→37668**; RNG **35443→37686**. Full suite **37/44**; Scr **8212**;
  RNG **568288** (71.68%); speed `39+0.20/turn`. Δ vs #835: Scr+7, RNG+28971.
- Next: @37668 C nhlib shuffle vs JS rn2(79).

## 2026-07-19 09:42 — #844 mkclass_aligned Inhell hellish (D-0748)
- Objective: seed0360 @31374 C mkclass_aligned rn2(2) vs JS rn2(9).
- C locus: `makemon.c` `mkclass_aligned` — `gehennom = Inhell != 0`.
- Change: `gehennom` from dungeon `flags.hellish` (not `dnum===GEHENNOM`);
  valley hellish dnum=1 so C/JS hell-mask now agree.
- Verification: green+strict PASS; cohort 37/37; seed0360 prefix
  **31374→35405**; RNG **31408→35443**; Scr **204→207**.
- Next: @35405 C rnd_misc_item rn2(3) vs JS rnd(2).

## 2026-07-19 09:39 — #843 valley + Inhell G_NOHELL (D-0747)
- Objective: seed0360 @22925 valley vs rn2(79) (CURRENT primary).
- C locus: `dat/valley.lua` / `sp_lev.c` load_special /
  `remove_boundary_syms`; `makemon.c` uncommon/`rndmonst_adj` Inhell.
- Change: `load_valley` + boundary CROSSWALL→ROOM; hellish-flag
  `uncommon` + `G_NOHELL` skip in `rndmonst_adj` (not GEHENNOM=5).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **22925→31374**; RNG **22948→31408**; Scr **201→204**.
- Next: @31374 C mkclass_aligned rn2(2) vs JS rn2(9).

## 2026-07-19 09:27 — #836 castle load_special (D-0746)
- Objective: seed0360 @8708 castle vs rn2(79) (CURRENT primary).
- C locus: `dat/castle.lua` / `sp_lev.c` load_special / `mkmaze.c` walkfrom;
  `dbridge.c` create_drawbridge; `mkroom.c` squadmon.
- Change: `load_castle` + mazegrid/mazewalk/fill_empty_maze/drawbridge;
  throne `\\` escape; `squadmon` + barracks fill_zoo; add_doors_to_room.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **8708→22925**; RNG **8728→22948**; Scr **200→201**.
- Next: @22925 C valley.lua vs JS rn2(79) after getbones.

## 2026-07-19 09:10 — #835 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: none in `js/`. Documented Score in CURRENT.md from
  `__RESULTS_JSON__`: **37/44** PASS; Scr **8205**/11405; RNG
  **539317**/792838 (68.02%); speed `36+0.18/turn`. Δ vs #830:
  Scr **+23**, RNG **+5627** (D-0744/D-0745 seed0360 3098→8728).
- Verification: green+strict PASS; full sessions run complete.
- Next: seed0360 @8708 castle.lua vs JS rn2(79) after getbones.

## 2026-07-19 09:10 — #834 oracle load_special (D-0745)
- Objective: seed0360 @3037 nhlib shuffle vs rn2(79) (CURRENT primary).
- C locus: `dat/oracle.lua` / `sp_lev.c` `load_special` / `mkmaze.c` `makemaz`.
- Change: `load_oracle` + DELPHI roomtype + statue montype helpers.
  Was missing special → place_lregion; not minend.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **3037→8708**; RNG **3186→8728**; Scr **187→200**.
- Next: @8708 C castle.lua vs JS rn2(79) after getbones.

## 2026-07-19 08:55 — #833 Boots_on SPEED_BOOTS (D-0744)
- Objective: seed0360 @3006 exercise rn2(19) vs rn2(5) (CURRENT primary).
- C locus: `do_wear.c` `Boots_on` SPEED_BOOTS → `makeknown` → `exercise`.
- Change: port SPEED_BOOTS makeknown + You_feel; was deferred (only
  FUMBLE_BOOTS). Not EOT exerchk — dressing finish after --More--.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **3006→3037**; RNG **3120→3186**; Scr **181→187**.
- Next: @3037 C nhlib.lua shuffle vs JS rn2(79) after ^V/getbones.

## 2026-07-19 06:47 — #832 mattackm AT_WEAP wield (D-0743)

- Objective: seed0360 @2995 pet return-attack (CURRENT primary).
- C locus: `mhitm.c` `mattackm` AT_WEAP → `mon_wield_item`; `weapon.c`.
- Change: AT_WEAP need-weapon/`!MON_WEP` → wield; nonzero → `M_ATTK_MISS`
  (no `rnd(20)`). Root was goblin first-wield on return attack (topline
  "wields a crude dagger"); #831 mlstmv/onscary gate theory falsified.
- Verification: green+strict PASS; cohort 35/35; prefix **2995→3006**;
  RNG **3098→3120**; Scr **177→181**.
- Next: @3006 C `exercise` `rn2(19)` vs JS `rn2(5)`; or D-0731/D-0708.
