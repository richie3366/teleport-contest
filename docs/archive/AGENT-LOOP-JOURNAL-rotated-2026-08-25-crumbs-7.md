# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1458 spell.c SPE_TURN_UNDEAD IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**C locus:** `spell.c` `spelleffects` `:1468–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:243–262`;
`zapyourself` `:2903–2907`.
**Change:** Wire SPE_TURN_UNDEAD through `wand_duplicate_weffects`
→ IMMEDIATE `bhit`. `bhitm` applies Knight `dbldam` then SPE
`spell_damage_bonus`. POLY named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts turn undead).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE
wand-duplicate (named). Not CANCELLATION.
**Blocked:** none.

## 2026-08-25 — D-1457 potion.c mixtype / potion_dip mix

**Objective:** Open `potion.c` remaining mix alchemy (named from
D-1439). Not peffects.
**C locus:** `potion.c` `mixtype` `:2120–2209`; `potion_dip`
`:2441–2594`; `dodip` getobj `:2365–2371`; callees
`dip_potion_explosion` / `hold_potion` / `H2Opotion_dip`.
**Change:** Wire `dodip` potion getobj → `potion_dip`. Port
`mixtype` + potion-potion mix (Klein/hands/H2O/poly gate).
Unicorn/poison/oil named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session #dips two potions).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**Blocked:** none.

## 2026-08-25 — D-1456 zap.c zap_updown WAN_STRIKING/SPE_FORCE_BOLT

**Objective:** Open `zap.c` `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT
(named). Not OPENING.
**C locus:** `zap.c` `zap_updown` `:3290–3354` + epilogue
`:3382–3408`; callees `dbridge.c` `destroy_drawbridge`;
`do_wear.c` `hard_helmet`; `trap.c` `dotrap`.
**Change:** STRIKING/FORCE_BOLT arm (destroy drawbridge /
ceiling rock no-disclose / trapdoor→HOLE). LOCKING named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps striking/force-bolt up/down).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` remaining mix alchemy (named from
D-1439). Not peffects.
**Blocked:** none.

## 2026-08-25 — D-1455 zap.c zap_steed WAN_TELEPORTATION

**Objective:** Open `zap.c` `zap_steed` WAN_TELEPORTATION
(named). Not probing.
**C locus:** `zap.c` `zap_steed` `:3104–3113`; caller
`weffects` `:3437–3439`; sibling `zapyourself` `:2876–2882`;
callee `teleport.c` `tele`/`scrolltele`/`teleds`.
**Change:** mounted down WAN/SPE_TELEPORT `tele()` together
then same learnwand criteria on post-`teleds` ux0 (not
`u_teleport_mon`). Disclose still learns. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps teleport while riding down).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT
(named). Not OPENING.
**Blocked:** none.

## 2026-08-25 — D-1454 zap.c zap_updown WAN_OPENING/SPE_KNOCK

**Objective:** Open `zap.c` `zap_updown` WAN_OPENING/SPE_KNOCK
(named). Not probing.
**C locus:** `zap.c` `zap_updown` `:3263–3288` + epilogue
`:3382–3408`; callees `dbridge.c` `is_db_wall` /
`open_drawbridge`; `trap.c` openholding/openfalling;
`quest.c` `ok_to_quest`.
**Change:** OPENING/KNOCK arm (portcullis / quest ripple /
down traps) then down `bhitpile`+`zap_map` / up hideunder.
STRIKING named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps opening/knock up/down).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_TELEPORTATION
(named). Not probing.
**Blocked:** none.

## 2026-08-25 — D-1453 zap.c bhito SPE_DRAIN_LIFE drain_item

**Objective:** Open `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item`
(named). Not probing.
**C locus:** `zap.c` `drain_item` `:1382–1455`; `bhito`
`:2318–2320`; callees `artifact.c` `defends` `:636–683` /
`defends_when_carried` `:687–694`.
**Change:** extract defn/cary; port `defends`/`defends_when_carried`;
port `drain_item` (defends then `obj_resists(10,90)` then `spe--`
+ ABON); `bhito` SPE_DRAIN arm. AD_ENCH callers named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session drains a floor object).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_OPENING/SPE_KNOCK
(named). Not probing.
**Blocked:** none.
