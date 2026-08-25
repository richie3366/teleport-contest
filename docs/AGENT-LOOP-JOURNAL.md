# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-25 — D-1464 zap.c zap_steed SPE_DRAIN_LIFE via bhitm

**Objective:** Open `zap.c` `zap_steed` SPE_DRAIN_LIFE via
bhitm (named). Not OPENING.
**C locus:** `zap.c` `zap_steed` `:3129` (bhitm group
`:3115–3134`); callee `bhitm` `:521–544` (D-1436); caller
`weffects` `:3437–3439`.
**Change:** Route riding-down SPE_DRAIN_LIFE through `bhitm`
so the mount can lose a level; disclose still XP (SPBOOK
skips makeknown). Cancel/poly named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps drain-life while riding down).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK
(named). Not STRIKING.
**Blocked:** none.
## 2026-08-25 — D-1463 zap.c zap_steed WAN_OPENING/SPE_KNOCK via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK
via bhitm (named). Not teleport.
**C locus:** `zap.c` `zap_steed` `:3115–3134`; callee
`bhitm` `:383–432` (D-0981 saddle/`mhurtle`); caller
`weffects` `:3437–3439`.
**Change:** Route riding-down OPENING/KNOCK through `bhitm`
so a saddle can fall off and knock can stun; disclose still
learns. Drain/cancel/poly named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps opening/knock while riding down).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` SPE_DRAIN_LIFE via
bhitm (named). Not OPENING.
**Blocked:** none.
## 2026-08-25 — D-1462 zap.c bhit doorlock WAN_OPENING/SPE_KNOCK

**Objective:** Open `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK
(named). Not boxlock.
**C locus:** `zap.c` `bhit` `:4056–4074`; callee `lock.c`
`doorlock` `:1103–1272` (`:1113–1125` SDOOR, `:1193–1200`
unlock, `:1267–1271` picking_at).
**Change:** Port `doorlock` OPENING/KNOCK; wire `bhit` on
`IS_DOOR|SDOOR` (JS had `typ===STONE`). LOCKING/STRIKING /
boxlock / zap_steed OPENING named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps a locked/secret door).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK via
bhitm (named). Not teleport.
**Blocked:** none.
## 2026-08-25 — D-1461 spell.c SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE
wand-duplicate (named). Not mix.
**C locus:** `spell.c` `spelleffects` `:1478–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:490–520`;
`zapyourself` `:2966–3003`; `bhito` `:2412–2414`;
`stone_to_flesh_obj` `:1991–2112`; `poly_obj` `:1728–1736`.
**Change:** Wire SPE_STONE through `wand_duplicate_weffects`
→ IMMEDIATE `bhit`. Port `stone_to_flesh_obj` + `poly_obj`
`mksobj(id)` invent splice. TELE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts stone to flesh).
**Verified:** private canary **17**/17; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK
(named). Not boxlock.
**Blocked:** none.
## 2026-08-25 — D-1460 spell.c SPE_CANCELLATION IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE
wand-duplicate (named). Not STONE.
**C locus:** `spell.c` `spelleffects` `:1471–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:335–340`;
`zapyourself` `:2812–2815`; `cancel_monst` `:3149–3215`.
**Change:** Wire SPE_CANCELLATION through `wand_duplicate_weffects`
→ IMMEDIATE `bhit`. Callees already live (`cancel_monst`;
self-dir invent cancel). STONE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts cancellation).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE
wand-duplicate (named). Not mix.
**Blocked:** none.
## 2026-08-25 — D-1459 spell.c SPE_POLYMORPH IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE
wand-duplicate (named). Not CANCELLATION.
**C locus:** `spell.c` `spelleffects` `:1469–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:263–334`;
`zapyourself` `:2804–2810`.
**Change:** Wire SPE_POLYMORPH through `wand_duplicate_weffects`
→ IMMEDIATE `bhit`. Callees already live (resist/newcham;
self-dir !Unchanging polyself D-0156). CANCEL named. Rule #2:
no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts polymorph).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE
wand-duplicate (named). Not STONE.
**Blocked:** none.
## 2026-08-25 — review D-1450–D-1458 (audit #1840)

**Objective:** audit — C-fidelity reviews **410–418** of JS SHAs
`de69d3f9` / `5c8b73c5` / `41c16bfe` / `291aea0a` /
`68635edb` / `ad3eca95` / `91e3e8a8` / `c2736f3e` /
`01edf8b9` plus full `sessions` score.
**C locus:** `spell.c` `spelleffects` `:1457–1514`;
`zap.c` `bhito`/`drain_item` `:2318–2320` / `:1382–1455`;
`zap_updown` `:3263–3354`; `zap_steed` `:3104–3113`;
`potion.c` `mixtype`/`potion_dip` `:2120–2209` / `:2503–2593`;
`bhitm` TURN `:243–262`.
**Change:** no `js/` edits. **410–418** ACCEPT-WITH-DEBT.
Filled archive D-1458 `01edf8b9`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.843).
**Verified:** full `sessions` at HEAD `01edf8b9`; public-unhit
on knock/slow/lock/turn-cast / drain_item / updown-opening /
steed-tele / updown-striking / mixtype-dip.
**Next:** Open `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE
wand-duplicate (named). Not CANCELLATION.
**Blocked:** none.
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
