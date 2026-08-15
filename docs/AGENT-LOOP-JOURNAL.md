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

## 2026-08-15 14:35 — #1291 D-1022 whip/grapple/use_pole

**Objective:** map-driven apply cluster — C `use_whip` / `use_grapple`
/ `use_pole` (CURRENT whip/grapple/`use_pole`).
**C locus:** `apply.c` use_whip/use_pole/use_grapple/doapply;
`obj.h` is_pole; `uhitm.c` force_attack; `steed.c` kick_steed.
**Change:** doapply dispatch; wield+cmdq; whip getdir+confdir;
pole/grapple getpos; Snickersnee is_pole; could_pole_mon.
Rule #2: no fs.
**Score:** last full `sessions` still **#1290** 44/44 (cadence @#1295).
**Verified:** green+strict PASS; apply/combat/ride cohort **18**/18
(seed0361 Scr **366**/366). Private node (partisan/Snickersnee
is_pole; whip/hook not; could_pole_mon false). Path **unhit** by
public traces.
**Next:** apply.js oil / `use_trap` / BAG_OF_TRICKS.
**Blocked:** none.

## 2026-08-15 14:10 — #1290 D-1021 use_royal_jelly

**Objective:** map-driven apply cluster — C `use_royal_jelly` (CURRENT
whip/grapple/jelly/`use_pole`). Cadence full `sessions` @#1290.
**C locus:** `apply.c` `use_royal_jelly`/`jelly_ok`/`dorub`/`doapply`;
`timeout.c` `kill_egg`.
**Change:** split+freeinv; GETOBJ_PROMPT egg; killer→queen; cursed
`kill_egg`; hatch timeout + blessed `spe=2`; obfree not delobj.
Rule #2: no fs.
**Score:** **#1290** full `sessions` **44**/44 Scr **11405**/11405
RNG **100%** speed `31+0.27/turn` (R² 0.876). Next @**#1295**.
**Verified:** green+strict PASS; apply/eat cohort **7**/7
(seed0009 Scr **73**/73). Private node (queen+timer; cursed hatch
stop; stack cancel quan-1). Path **unhit** by public traces.
**Next:** apply.js whip/grapple/`use_pole`.
**Blocked:** none.

## 2026-08-15 13:50 — D-1020 setnotworn pointer-walk + leave-tutorial

**Objective:** C-wrong Keep — D-1015 `setnotworn` used
`setworn(null, owornmask)`; leave-tutorial invent restore absent.
**C locus:** `worn.c` `setnotworn` pointer-equal `worn[]`;
`nhlua.c` `nhl_gamestate(true)` useupall/`addinv_nomerge`/`setworn`;
`do.c` `tutorial(FALSE)`.
**Change:** pointer-walk + confer/w_blocks/artifact; stash prepend +
`_lastinvnr=51`; leave restores invent+re-wear; apply.js shares
export. Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; tutorial/wear cohort **11**/11
(seed0009 Scr **73**/73); private node (stash-flag no-op vs real
slot clears EStealth). Leave path likely **unhit** by public traces.
**Next:** apply.js whip/grapple/jelly/`use_pole`.
**Blocked:** none.

## 2026-08-15 13:35 — D-1019 sellobj BSS sell_response / robbed

**Objective:** C-wrong Keep — D-0994 defaulted `sell_response` to
`'a'` (auto-sell) and subtracted `offer` from `robbed`.
**C locus:** `shk.c` `sellobj`/`sellobj_state`; BSS `'\0'` queries;
`robbed -= (offer<0)` then clear; `nyaq` not stored.
**Change:** BSS `null`; robbed C precedence; nyaq local; credit
`ynaq` default `'y'`. Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; shop/throw cohort **12**/12;
private node (BSS null; robbed 100+gold 50 → 0). Robbed / first-sale
query likely **unhit** by public traces.
**Next:** D-1020 `setnotworn` pointer-walk + leave-tutorial.
**Blocked:** none.

## 2026-08-15 13:24 — D-1018 use_pick_axe cmdq wield re-apply

**Objective:** C-wrong Keep — D-0951 queued `{typ:'ec'}` after
wield; `getobj_apply` ignored CMDQ_KEY; canned boolean TIME
did not set `context.move`.
**C locus:** `dig.c` `use_pick_axe` `cmdq_add_ec(doapply)` +
`cmdq_add_key(invlet)`; `cmd.c` rhack `(res & ECMD_TIME)`;
`invent.c` getobj CMDQ_KEY.
**Change:** queue `doapply` fn + charCode KEY; getobj_apply pops
KEY (SUGGEST|DOWNPLAY); rhack canned TIME/CANCEL bits.
Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; apply/cmdq/dig cohort **15**/15;
private node falsifier (queue shape + canned getobj + TIME bit).
Wield-reapply path likely **unhit** by public traces.
**Next:** D-1019 `sellobj` default `'a'` / `robbed`.
**Blocked:** none.

## 2026-08-15 13:15 — D-1017 cancel_monst invent Array walk

**Objective:** C-wrong Keep — D-0952 self-cancel walked `nobj` on
`game.invent` Array; `cancel_item`/ABON never saw hero items.
**C locus:** `zap.c` `cancel_monst` `gi.invent` nobj loop;
`cancel_item` carried ABON; clay hallu/`s_suffix`/`AD_SPEL`.
**Change:** youdefend iterates `game.invent[]`; minvent stays nobj;
clay dark/light + `s_suffix_zap` + `monkilled(..., AD_SPEL)`.
Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; wizard/zap cohort **18**/18.
Self-cancel path likely **unhit** by public traces.
**Next:** D-1018 `use_pick_axe` cmdq wield re-apply.
**Blocked:** none.

## 2026-08-15 13:02 — D-1016 shopdig um_dist snatch polarity

**Objective:** C-wrong Keep — D-0958 snatch ran when shk was far.
**C locus:** `shk.c` `shopdig` `!um_dist && !helpless && bill`;
`apply.c` `um_dist`; `worn.c` `setnotworn`.
**Change:** skip snatch iff `um_dist || helpless || !bill`; snatch
loop uses exported `do.js` `setnotworn` (extrinsics). Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; shop/dig/wear cohort **9**/9
(seed0116/0060/0361/1800/0009/0014/0360/0103/0104). Snatch path
likely **unhit** by public traces — fortress not a snatch proof.
**Next:** D-1017 `cancel_monst` invent Array vs `nobj`.
**Blocked:** none.

## 2026-07-23 17:13 — D-1015 tutorial setnotworn extrinsics

**Objective:** seed0009 Scr 72/73 (user-reported; was HEAD FAIL).
**C locus:** `nhlua.c` `nhl_gamestate(false)` `setnotworn` +
`worn.c` extrinsic clear.
**Change:** tutorial invent stash via real `setnotworn`→`setworn`
(clear STEALTH `EStealth` from elven cloak) — D-1015.
**Score:** **44**/44 Scr **11405**/11405 RNG **100%** speed
`33+0.27/turn`.
**Verified:** seed0009 PASS; green+strict; cohort 9/9; full
`sessions` 44/44. Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or whip/grapple/
jelly/use_pole; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-07-22 06:55 — #1285 cadence score + D-1014 use_stone

**Objective:** mandatory full `sessions` score @#1285; map-driven
`use_stone` (CURRENT next apply tools).
**C locus:** `apply.c` `use_stone` / `touchstone_ok`; dorub/doapply
graystone cases.
**Change:** port use_stone + wire dorub/doapply — D-1014.
**Score:** **43**/44 Scr **11404**/11405 RNG **100%** speed
`31+0.27/turn` (seed0009 Scr 72/73 only FAIL).
**Verified:** green+strict PASS; apply cohort **16**/17 (seed0009
pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or whip/grapple/
jelly/use_pole; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-07-22 06:48 — #1284 D-1013 apply blindfold/lenses

**Objective:** map-driven — apply BLINDFOLD/LENSES Blindf_on/off
(CURRENT next apply tools).
**C locus:** `apply.c` doapply cases BLINDFOLD/LENSES; `do_wear.c`
Blindf_on/Blindf_off/cursed.
**Change:** wire doapply eyewear arm + export Blindf_on/cursed_check
— D-1013.
**Verified:** green+strict PASS; apply/shared cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or whip/grapple/
jelly/use_stone; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-07-22 06:42 — #1283 D-1012 in_trouble collapsing+minors

**Objective:** map-driven — pray in_trouble collapsing…cursed_blindfold
+ all minors (CURRENT next cluster).
**C locus:** `pray.c` in_trouble/fix_worst_trouble/stuck_in_wall/
worst_cursed_item/fix_curse_trouble; `do_wear.c` stuck_ring/unchanger;
`potion.c` make_deaf; `dig.c` buried_ball_to_freedom; `artifact.c`
confers_luck.
**Change:** port remaining majors + all minors + helpers — D-1012.
**Verified:** green+strict PASS; pray/shared cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or blindfold-as-tool /
containers; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-07-22 06:31 — #1282 D-1011 in_trouble majors

**Objective:** map-driven — pray in_trouble majors Stoned…Region
(CURRENT next cluster).
**C locus:** `pray.c` in_trouble/fix_worst_trouble; `potion.c`
make_sick; `region.c` region_danger/region_safety; `trap.c`
rescued_from_terrain/back_on_ground.
**Change:** port Stoned/Slimed/Strangled/Lava/Sick/Starving/Region
checks + fix arms; export make_sick; region danger/safety; thin
lava-rescue terrain feedback — D-1011.
**Verified:** green+strict PASS; pray/shared cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or collapsing…
cursed_blindfold + minors; or blindfold-as-tool / containers.
**Blocked:** none.

## 2026-07-22 04:22 — #1281 D-1010 use_crystal_ball

**Objective:** map-driven — apply CRYSTAL_BALL / detect
`use_crystal_ball` (CURRENT next cluster).
**C locus:** `detect.c` use_crystal_ball/level_distance + thin
object_detect/trap_detect/furniture_detect; `drawing.c` def_char_*;
`apply.c`/`artifact.c` wire.
**Change:** port Blind/fail/hallu/uncharged/charged detect envelopes;
wire doapply + arti_invoke — D-1010.
**Verified:** green+strict PASS; apply/detect cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or blindfold-as-tool / containers.
**Blocked:** none.

## 2026-07-22 06:12 — #1280 cadence + D-1009 use_towel

**Objective:** cadence full `sessions` @#1280 + map-driven towel
cluster (CURRENT next apply tools).
**C locus:** `apply.c` use_towel; `weapon.c` wet/dry_a_towel /
finish_towel_change / is_wet_towel; `trap.c` burnarmor wet-towel dry.
**Change:** port use_towel + shared wet/dry helpers; wire doapply
TOWEL; burnarmor dry path (D-1009). Score refresh in CURRENT.
**Verified:** green+strict PASS; apply/trap cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Full sessions **43**/44 Scr
**11404**/11405 RNG **100%** speed `30+0.26/turn`. Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or crystal ball.
**Blocked:** none.

## 2026-07-22 06:04 — #1279 D-1008 use_saddle

**Objective:** map-driven — `use_saddle` apply SADDLE (CURRENT next
cluster after whistle).
**C locus:** `steed.c` use_saddle/can_saddle; `apply.c` doapply SADDLE.
**Change:** port use_saddle chance envelope + petrify/special gates;
tighten can_saddle whirly/unsolid; wire doapply — D-1008.
**Verified:** green+strict PASS; apply/steed cohort **15**/16
(seed0009 Scr 72/73 pre-existing; seed0103/0104 ride PASS). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or crystal ball / towel.
**Blocked:** none.
