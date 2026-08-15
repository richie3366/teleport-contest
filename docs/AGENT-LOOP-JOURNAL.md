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
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-16 00:05 — #1319 D-1049 take_gold remove_worn_item

**Objective:** Must-fix D-1034 risk 3 — `take_gold` must
`remove_worn_item` like C `sit.c`.
**C locus:** `sit.c` `take_gold` (~14); `steal.c` `remove_worn_item`
(~213) W_WEAPONS → `uwepgone`/`uswapwepgone`/`uqwepgone`.
**Change:** `remove_worn_item(otmp, false)` then splice+`delobj`.
Helper: `!owornmask` return + W_WEAPONS `*gone`. sit cannot import
`steal.js` (hack→eat cycle). Armor `*_off`/`unpunish`/`setnotworn`
named. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; sit cohort **4**/4 (seed0106 Scr
**267**/267; seed0107 **98**/98; seed0108 **303**/303; seed4500
**1814**/1814). Private node **20**/20 (quiver/wield/swap clear;
sword uwep kept). Path **unhit**.
**Next:** Must-fix `pickup_object` telekinesis (D-1022 risk 6).
**Blocked:** none.

## 2026-08-15 23:54 — #1318 D-1048 Vlad case 10 HConfusion only

**Objective:** Must-fix D-1033 risk 2 — Vlad special case 10 sets
`HConfusion` only; JS must not also force flat `u.Confusion`.
**C locus:** `sit.c` `special_throne_effect` case 10 (~310);
`read.c` `seffect_remove_curse` `Confusion != 0` (~1495);
`youprop.h` `#define Confusion HConfusion`.
**Change:** save/set/restore `HConfusion` only. `seffect_remove_curse`
reads `!!(u.HConfusion|0)` (not flat/`EConfusion`). Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; sit cohort **3**/3 (seed0106 Scr
**267**/267; seed0107 **98**/98; seed4500 **1814**/1814) + seed0108
**303**/303. Private node **12**/12 (no flat write; restore;
leftover flat/EConfusion unconfused). Path **unhit**.
**Next:** Must-fix `take_gold` `remove_worn_item` (D-1034 risk 3).
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

## 2026-08-15 22:01 — #1312 D-1044 special_obj_hits_leader urole.questarti

**Objective:** Must-fix review 02 item 3 — `special_obj_hits_leader`
uses C `is_quest_artifact` (`urole.questarti`), not `u.questarti`.
**C locus:** `questpgr.c` `is_quest_artifact` (~67–70);
`dothrow.c` `special_obj_hits_leader` (~1969–1972); caller
`thitmonst` skips APPLIED.
**Change:** local `is_quest_artifact` compares `oartifact` to
`game.urole.questarti` (`want!==0` for sparse JS urole). Unique /
fake / `leader_m_id` unchanged. Catch/`finish_quest` still deferred.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`.
**Blocked:** none.

## 2026-08-15 21:48 — review D-1042 / D-1043 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`19e907f5` D-1042, `d3fac215` D-1043)
against pinned C, not the journal.
**C locus:** `worn.c` `find_mac`; `hack.h` `ARM_BONUS`; `dothrow.c`
`should_mulch_missile`; `rnd.c` `rnl`.
**Change:** reviews 03 ACCEPT (`find_mac` minvent walk / guarding −2 /
`AC_MAX`; stub gone) and 04 ACCEPT (hero blessed save `!rnl(4)`;
monster `rn2(3)` unchanged). No new Must-fix. No `js/` edits.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** C read of `worn.c:717–735`, `hack.h:1526–1528`,
`dothrow.c:1976–2002`, `rnd.c:112–151`, `questpgr.c:67–70`; JS hunks
grepped FORCE/fs/seed.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:44 — archive checked LOOP-QUEUE items

**Objective:** live queue must not accumulate `- [x]` rows.
**C locus:** n/a (queue hygiene).
**Change:** `scripts/archive-loop-queue-done.mjs` moves checked lines
to `docs/archive/LOOP-QUEUE-DONE.md` in the same commit as the fix;
supervisor runs it if leftover `[x]` remain. Drained D-1040–D-1043.
**Score:** unchanged (cadence still **#1310**).
**Verified:** helper no-op on unchecked-only queue; `bash -n` loop script.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:42 — Addressed HASH in the next real commit

**Objective:** stop stamp-only SHAs (`da0fabe3`…`9c087297`) and hash
chicken-egg spinning.
**C locus:** n/a (git hygiene).
**Change:** stamp `**Addressed:** D-NNNN` in the fix commit; fill the
short hash in the **next** commit that already has work (port / review /
cadence). No amend, no hash prediction, no stamp-only follow-up.
**Score:** unchanged (cadence still **#1310**).
**Verified:** n/a.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti` (and
backfill any missing hash in that same SHA).
**Blocked:** none.

## 2026-08-15 21:35 — #1310 D-1043 should_mulch_missile hero rnl(4)

**Objective:** Must-fix review 02 item 2 — `should_mulch_missile`
hero blessed save `!rnl(4)` not `!rn2(4)`.
**C locus:** `dothrow.c` `should_mulch_missile` (~1976–2002);
callers `thitmonst` / `mthrowu.c` `ohitmon`.
**Change:** hero arm uses existing `rnl(4)`; monster path stays
`rn2(3)`. Rule #2: no fs.
**Score:** cadence **#1310** full `sessions` **44**/44 Scr
**11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.874).
Next @**#1315**.
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:30 — #1309 D-1042 find_mac minvent ARM_BONUS

**Objective:** Must-fix review 02 item 1 — `find_mac` walk monster
`minvent` worn `ARM_BONUS` / amulet of guarding (thitmonst tmp).
**C locus:** `worn.c` `find_mac` (~717–735); `hack.h` `ARM_BONUS`.
**Change:** port the walk in `worn.js`; `mhitm.js` import+re-export
(local binding; re-export-only left `find_mac` undefined in mattackm).
Guarding −2 not `spe`/erosion; `AC_MAX` cap after the walk. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/combat/zap cohort **8**/8
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick; seed2200
zap). Private node **11**/11. Path **unhit** by public traces.
**Next:** Must-fix `should_mulch_missile` hero `!rnl(4)`.
**Blocked:** none.

## 2026-08-15 21:20 — #1308 review D-1040 / D-1041

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`12458fe9` D-1040, `eb3469ae` D-1041)
against pinned C, not the journal.
**C locus:** `apply.c` `find_poleable_mon` / `glyph_at`; `dothrow.c`
`thitmonst`; `worn.c` `find_mac`; `uhitm.c` `hmon_hitmon_msg_hit`.
**Change:** reviews 01 ACCEPT-WITH-DEBT (glyph predicates match; gbuf
still a named omit) and 02 QUALITY-RISK (tmp stub `find_mac`; mulch
`rn2` not `rnl`; leader clone `u.questarti`). Must-fix prepended.
No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** C read of `apply.c:3279–3563`, `dothrow.c:1969–2304`,
`worn.c:717–735`, `zap.c:3556–3567`; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix `find_mac` minvent `ARM_BONUS`.
**Blocked:** none.

## 2026-08-15 21:05 — #1307 D-1041 thitmonst weapon hit-vs-miss

**Objective:** Must-fix D-1022 risk 4 — pole `thitmonst` hit-vs-miss
envelope (combat RNG), not always-`tmiss`.
**C locus:** `dothrow.c` `thitmonst` tmp+dieroll WEAPON/weptool/GEM;
`uhitm.c` `hmon_hitmon_msg_hit` thrown/APPLIED + `first_weapon_hit`.
**Change:** C to-hit (Luck/DEX/`distmin`/`omon_adj` `!rn2(10)`);
kicked/ammo/thrown/applied bonuses; hit `hmon`+`exercise`+mulch+
`passive_obj`; miss `tmiss` + APPLIED `wakeup`. Thrown hit pline.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/kick/combat cohort **10**/10
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick). Private
node **10**/10 (AC hit/miss; APPLIED wakeup; frozen `rn2(10)` before
dieroll; pie DEX; armor skip; hook weptool). Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`
(D-1022 risk 5).
**Blocked:** none.

## 2026-08-15 20:50 — #1306 D-1040 pole glyph_at targeting

**Objective:** Must-fix D-1022 risk 3 — `glyph_is_poleable_at` /
`find_poleable_mon` follow C `glyph_at`, not live `m_at`.
**C locus:** `apply.c` find_poleable_mon / get_valid_polearm_position /
use_pole; `display.c` glyph_at; `display.h` glyph_is_monster/statue/
invisible.
**Change:** classify shown layer (monster glyph / I / statue glyph);
skip tame/peaceful only when `glyph_is_monster` && `m_at`; statue/
boulder hit = glyph_at && sobj_at. `map_object` tags statue/boulder
memory. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; apply/combat/display cohort **10**/10
(seed0361 Scr **366**/366; seed0399 Scr **532**/532). Private node
**12**/12 (hidden `m_at`; `I`; tame skip; peaceful `I`; statue not
autotarget). Path **unhit** by public traces.
**Next:** Must-fix pole `thitmonst` hit-vs-miss (D-1022 risk 4).
**Blocked:** none.
