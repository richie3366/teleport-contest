# Rotated from AGENT-LOOP-JOURNAL.md after D-1055 / #1328

## 2026-08-16 02:25 — #1328 D-1055 dosit water/pool/gremlin sit

**Objective:** Open queue — `sit.c` `dosit` water / pool / gremlin
sit (after trap, before sink). Not furniture.
**C locus:** `sit.c` `dosit` ~430 early pool/gremlin goto; ~505
Underwater/waterlevel; ~511 `in_water`; `potion.c` `split_mon`;
`mhitu.c` `cloneu`.
**Change:** early `is_pool&&!Underwater` and gremlin fountain/pool
skip OBJ_AT/trap; muddy-bottom / no-cushions; `in_water` sit +
hero `split_mon`/`cloneu` + fountain `dryup`; else `rn2(10)`
`water_damage(uarm)` twice (C second call is `uarm`). Locals in
`sit.js` (eat←potion / zap←mhitu cycles). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** private node pool skip-picnic, underwater mud,
gremlin fountain multiply 20→10, eel-pool in_water,
eel-underwater having-fun; green+strict PASS; cohort **6**/6
(seed1500/1800/0060/0102/0360/2200). Path thin.
**Next:** Open `dosit` sink/altar/grave/stairs/ladder messages.
**Blocked:** none.

## 2026-08-16 02:08 — #1327 D-1054 restore cobj OBJ_CONTAINED

**Objective:** Must-fix — `get_obj_location` flags `0` must not
accept CONTAINED when C hatch passes `0` (D-1036 risk 4).
**C locus:** `zap.c` `get_obj_location`; `timeout.c` `hatch_egg`
flags `0`; `restore.c` `restobjchn` cobj/`ocontainer`.
**Change:** `timeout.js` switch already matched C. `deserObjChain`
stamped nested `cobj` with parent FLOOR/INVENT/MINVENT; recurse
`OBJ_CONTAINED`. Save buried list `OBJ_BURIED`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** private node flags=0 null + save/restore
`where=CONTAINED`; green+strict PASS; restore/bones/hatch cohort
**7**/7. Path thin (live `goto_level` keeps `where`).
**Next:** Open `dosit` water/pool/gremlin sit (Must-fix empty).
**Blocked:** none.

## 2026-08-15 23:35 — review D-1046 / D-1047 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3371ddf0` D-1046, `2ca2ccd7` D-1047)
against pinned C, not the journal.
**C locus:** `apply.c` `light_cocktail` / `doapply` `POT_OIL`;
`invent.c` `consume_obj_charge`; `shk.c` `cost_per_charge` /
`check_unpaid_usage` / `check_unpaid`; `pickup.c` tip restore-spe.
**Change:** reviews 07 ACCEPT (`*optr` snuff-merge + split/hold;
shop `check_unpaid` inside cocktail still named) and 08 ACCEPT
(invent `check_unpaid` then `spe--`; `cost_per_charge` arms +
usage-fee `rn2`; tip restore-spe). No new Must-fix. No `js/`
edits. Filled Addressed hash `2ca2ccd7`. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** C read of `apply.c:1702–1765` / `4349–4351` /
`4421–4423`, `invent.c:1336–1346`, `shk.c:5626–5742`,
`pickup.c:4021–4031`; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix Vlad `HConfusion` only (D-1033 risk 2).
**Blocked:** none.

## 2026-08-15 23:10 — #1316 D-1047 consume_obj_charge unpaid/shop

**Objective:** Must-fix D-1023 risk 3 — `consume_obj_charge` unpaid
shop path (not `spe--` only).
**C locus:** `invent.c` `consume_obj_charge` (~1336); `shk.c`
`check_unpaid` / `check_unpaid_usage` / `cost_per_charge` (~5627);
`pickup.c` tip `check_unpaid_usage(box, TRUE)` (~4024).
**Change:** One invent `consume_obj_charge` (`check_unpaid` then
`spe--`). shk `cost_per_charge` + usage-fee debit/verbalize.
Apply/detect/music/mkobj stubs gone. Tip restores spe then altusage.
SetVoice / perm_invent redraw named. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; apply cohort **9**/9
(seed0361 Scr **366**/366). Private node **9**/9 (paid skip; unpaid
wand debit; MAGIC_LAMP oil cost; BoT altusage; Usage-fee verbalize).
Path **unhit**.
**Next:** Must-fix Vlad `HConfusion` only (D-1033 risk 2).
**Blocked:** none.

## 2026-08-15 22:40 — #1315 D-1046 light_cocktail struct obj **

**Objective:** Must-fix D-1023 risk 4 — `light_cocktail` takes/updates
`struct obj **` like C `apply.c`.
**C locus:** `apply.c` `light_cocktail` (~1703–1765); `doapply`
`POT_OIL` `light_cocktail(&obj)` (~4349).
**Change:** JS `{ obj }` box. Snuff+`!owornmask` `*optr = addinv`;
light path `*optr = obj` after split/hold. Swallow/uw/worn-snuff
leave `*optr`. `doapply` `let obj` + `&obj`. Rule #2: no fs.
**Score:** cadence **#1315** **44**/44 Scr **11405**/11405 RNG
**100%** speed `33+0.27/turn` (R² 0.868). Next @**#1320**.
**Verified:** green+strict PASS; apply cohort **9**/9
(seed0361 Scr **366**/366). Private node **13**/13 (snuff-merge
survivor; split child). Path **unhit**.
**Next:** Must-fix `consume_obj_charge` unpaid/shop (D-1023 risk 3).
**Blocked:** none.

## 2026-08-15 22:20 — review D-1044 / D-1045 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`d9febc3c` D-1044, `e8884a53` D-1045)
against pinned C, not the journal.
**C locus:** `questpgr.c` `is_quest_artifact`; `dothrow.c`
`special_obj_hits_leader`; `objnam.c` `yname`; `shk.c` `shk_your`;
`do_name.c` `a_monnam`/`Amonnam`; `polyself.c` `mbodypart`.
**Change:** reviews 05 ACCEPT (leader predicate reads
`urole.questarti`; catch body still named) and 06 ACCEPT (whip
uses real `yname`/`Amonnam`/`mbodypart`; `shk_owns`/`surface`
named). No new Must-fix. No `js/` edits. Filled Addressed hashes
`d9febc3c` / `e8884a53`. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** C read of `questpgr.c:67–70`, `dothrow.c:1969–1972`,
`objnam.c:2358–2374`, `shk.c:5862–5874`, `do_name.c:1152–1164`,
`polyself.c:1972–2146`, `apply.c` whipattack; JS hunks grepped
FORCE/fs/seed.
**Next:** Must-fix `light_cocktail` `struct obj **` (D-1023 risk 4).
**Blocked:** none.

## 2026-08-15 22:16 — #1313 D-1045 whip yname/Amonnam/mbodypart

**Objective:** Must-fix D-1022 risk 5 — whip/pole/grapple names use
real `yname` / `Amonnam` / `mbodypart`, not apply clones.
**C locus:** `objnam.c` `yname`; `shk.c` `shk_your`/`mon_owns`;
`do_name.c` `a_monnam`/`Amonnam`; `polyself.c` `mbodypart`;
`apply.c` `use_whip` wrap/yank/snatch/reveal/HAND.
**Change:** export C `yname` (cxname + shk_your; `set_y_monnam`
late-bind). `Amonnam` = highc(a_monnam ARTICLE_A). `mbodypart`
tables + mndx specials. Apply deletes clones. `shk_owns` deferred.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** green+strict PASS; apply/combat cohort **9**/9
(seed0361 Scr **366**/366). Private node **21**/21 (`An orc` ≠
`The orc`; dog HAND `paw`; minvent possessive). Path **unhit**.
**Next:** Must-fix `light_cocktail` `struct obj **` (D-1023 risk 4).
**Blocked:** none.
