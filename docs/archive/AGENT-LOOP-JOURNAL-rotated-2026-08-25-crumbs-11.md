# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1479 zap.c zap_steed WAN_SPEED_MONSTER via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_SPEED_MONSTER
via bhitm (named). Not SLOW.
**C locus:** `zap.c` `zap_steed` `:3126` (bhitm group
`:3115–3134`). Caller `weffects` `:3437–3439`. Callee
`bhitm` `:233–242` already D-1422.
**Change:** WAN_SPEED_MONSTER arm `await bhitm(steed, obj)` +
`steedhit = true` instead of skipping `zap_steed`. Disclose
learns even when MR resists. `helpful_gesture` keeps the
steed tame. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` SPE_CURE_SICKNESS via
bhitm (named). Not SPEED.
**Blocked:** none.

## 2026-08-25 — D-1478 zap.c zap_steed WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER
via bhitm (named). Not STRIKING.
**C locus:** `zap.c` `zap_steed` `:3124–3125` (bhitm group
`:3115–3134`). Caller `weffects` `:3437–3439`. Callee `bhitm`
`:218–232` already D-1424.
**Change:** WAN/SPE_SLOW arm `await bhitm(steed, obj)` +
`steedhit = true` instead of skipping `zap_steed`. Disclose
learns (SPBOOK skips `makeknown`) even when MR resists.
Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_SPEED_MONSTER via
bhitm (named). Not SLOW.
**Blocked:** none.

## 2026-08-25 — D-1477 potion.c potionbreathe remaining otyps

**Objective:** Open `potion.c` `potionbreathe` remaining otyps
(named). Not potionhit.
**C locus:** `potion.c` `potionbreathe` `:1931–2118`.
**Change:** Port remaining vapor switch (towel / restore-gain
ABASE++ / heal FALLTHROUGH / sickness / hallu / conf
`make_confused` / speed HFast / blindness `make_blinded` /
gremlin split / acid+poly CON / trycall !kn / in_use).
Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER
via bhitm (named). Not STRIKING.
**Blocked:** none.

## 2026-08-25 — D-1476 zap.c zap_map engraving/cancel trap

**Objective:** Open `zap.c` `zap_map` engraving/cancel trap
(named). Not probing.
**C locus:** `zap.c` `zap_map` `:3628–3800`; `maybe_explode_trap`
`:3594–3623`; callee `engrave.c` `rloc_engr` `:1666–1681`.
**Change:** Port down-zap engraving switch + cancel trap
(`del_engr` / poly `random_engraving` / tele `rloc_engr` /
STONE+striking wipe; portal shield; magical explode). Rule #2:
no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **35**/35; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `potion.c` `potionbreathe` remaining otyps
(named). Not potionhit.
**Blocked:** none.

## 2026-08-25 — review D-1467–D-1475 (audit #1860)

**Objective:** audit — C-fidelity reviews **428–436** of JS SHAs
`1003ab88` / `3b4c39e2` / `245c783d` / `444e2080` /
`36a4e811` / `71a0a3d5` / `e6a44782` / `dfd88d1b` /
`a3a2d65a` plus full `sessions` score. Continue-unfinished
from leftover **428**.
**C locus:** `zap.c` `bhito` `:2393–2403`; `spell.c`
`:1470–1514`; `zap.c` `bhitm` healmon `:433–473`;
`zap_steed` `:3115–3134`; `potion.c` `potionhit`
`:1623–1928`; `bhit`/`doorlock` `:4056–4074` /
`lock.c` `:1135–1192`.
**Change:** no `js/` edits. **428–436** ACCEPT-WITH-DEBT.
Must-fix empty. Filled archive D-1475 `a3a2d65a`. Rule #2:
no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `40+0.32/turn` (R² 0.845).
**Verified:** full `sessions` at HEAD `a3a2d65a`; public-unhit
of the new arms. Next Open: `zap_map` engraving/cancel trap.
**Next:** Open `zap.c` `zap_map` engraving/cancel trap
(named). Not probing.
**Blocked:** none.

## 2026-08-25 — D-1475 zap.c bhit doorlock WAN_LOCKING/SPE_WIZARD_LOCK

**Objective:** Open `zap.c` `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK
(named). Not OPENING.
**C locus:** `zap.c` `bhit` `:4056–4074`; callee `lock.c`
`doorlock` `:1135–1192` (SDOOR `:1127–1130`).
**Change:** Port `doorlock` LOCKING/WIZARD_LOCK (Rogue hide,
obstructed, trap-in-doorway, lock-shut) and wire `bhit` on
`IS_DOOR|SDOOR`. SDOOR LOCKING stays a no-op. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps locking at a door).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_map` engraving/cancel trap
(named). Not probing.
**Blocked:** none.
