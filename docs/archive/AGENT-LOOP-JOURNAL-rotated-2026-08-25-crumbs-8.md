# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
