# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-25 — D-1485 zap.c zap_updown default break

**Objective:** Must-fix `zap.c` `zap_updown` `default` `break`
into down `bhitpile`+`zap_map` (C `:3378–3389`). Not probing.
Not lateral `bhit`. Source: review **437**.
**C locus:** `zap.c` `zap_updown` `:3378–3389`. Caller
`weffects` `:3445–3446`. Callee `zap_map` already D-1476.
**Change:** JS `default: return false` → `break` so unmounted
down POLY/cancel/invis/tele hit D-1476 arms. Riding-down still
`zap_steed`. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` unicorn/amethyst mix
(named). Not mixtype.
**Blocked:** none.
## 2026-08-25 — review D-1476–D-1484 (audit #1870)

**Objective:** audit — C-fidelity reviews **437–445** of JS SHAs
`747e6616` / `c3f67016` / `713e0441` / `7c918806` /
`a65834a1` / `4642b8b1` / `f0cb5942` / `49826707` /
`dba2c79a` plus full `sessions` score.
**C locus:** `zap.c` `zap_map` `:3594–3800` / `zap_updown`
`:3378–3389`; `potion.c` `potionbreathe` `:1931–2118`;
`zap_steed` `:3115–3134`; `bhito` `:2181–2204`;
`bhit`/`doorlock` `:4056–4074` / `lock.c` `:1201–1253`;
`muse.c` `mbhit` `:1785–1802`.
**Change:** no `js/` edits. **437** QUALITY-RISK (Must-fix:
`zap_updown` `default` `break` into down `bhitpile`+`zap_map`).
**438–445** ACCEPT-WITH-DEBT. Filled archive D-1484 `dba2c79a`.
Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `38+0.31/turn` (R² 0.853).
**Verified:** full `sessions` at HEAD `dba2c79a`; public-unhit
of the new arms.
**Next:** Must-fix `zap.c` `zap_updown` `default` `break` into
down `bhitpile`+`zap_map` (C `:3378–3389`). Not probing.
**Blocked:** none.
## 2026-08-25 — D-1484 muse.c mbhit doorlock

**Objective:** Open `muse.c` `mbhit` doorlock (named). Not hero
`bhit`.
**C locus:** `muse.c` `mbhit` `:1785–1802`. Callee `lock.c`
`doorlock` already live (D-1462/D-1475/D-1482).
**Change:** Wire `IS_DOOR||SDOOR` WAN_OPENING/LOCKING/STRIKING
`doorlock`; zap_oseen `makeknown`; shop D_BROKEN `add_damage(0)`.
Drawbridge still named (else-if gate). Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` unicorn/amethyst mix
(named). Not mixtype.
**Blocked:** none.
## 2026-08-25 — D-1483 zap.c bhito poly-arm boxlock reset_pick

**Objective:** Open `zap.c` `bhito` poly-arm boxlock `reset_pick`
(named). Not uchain.
**C locus:** `zap.c` `bhito` `:2202–2204`. Callee `lock.c`
`boxlock` POLY `:1089–1095` already live.
**Change:** After `obj_unpolyable`, `Is_box` → `(void) boxlock`
so a chest being picked `reset_pick`s before shudder/poly.
POLY returns false (res stays 1). Unpolyable skips.
Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `muse.c` `mbhit` doorlock (named). Not hero
`bhit`.
**Blocked:** none.
## 2026-08-25 — D-1482 zap.c bhit doorlock WAN_STRIKING/SPE_FORCE_BOLT

**Objective:** Open `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT
(named). Not LOCKING.
**C locus:** `zap.c` `bhit` `:4056–4074`, `:4129–4130`. Callee
`lock.c` `doorlock` `:1201–1253` (SDOOR `:1117–1126`).
**Change:** Port STRIKING/FORCE smash (`D_BROKEN`) and trapped
explode (`D_NODOOR`); SDOOR appear then continue; `bhit`
learnwand also if WAN_STRIKING && !Deaf; shop D_BROKEN
`add_damage` + `pay_for_damage("destroy")`. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `bhito` poly-arm boxlock `reset_pick`
(named). Not uchain.
**Blocked:** none.
## 2026-08-25 — D-1481 zap.c bhito uchain unpunish WAN_OPENING

**Objective:** Open `zap.c` `bhito` uchain unpunish WAN_OPENING
(named). Not boxlock.
**C locus:** `zap.c` `bhito` `:2181–2188`. Callee `read.c`
`unpunish` `:3066–3077` already live.
**Change:** Split `uball || uchain` early-return: uball `res=0`;
uchain WAN_OPENING/SPE_KNOCK `learn_it`+`unpunish()`; else
`res=0`; both skip the otyp switch. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT
(named). Not LOCKING.
**Blocked:** none.
## 2026-08-25 — D-1480 zap.c zap_steed SPE_CURE_SICKNESS via bhitm

**Objective:** Open `zap.c` `zap_steed` SPE_CURE_SICKNESS
via bhitm (named). Not SPEED.
**C locus:** `zap.c` `zap_steed` `:3116` (bhitm group
`:3115–3134`). Caller `weffects` `:3437–3439` (`oc_dir !=
NODIR`). Callee `bhitm` has no arm (`:548–550` impossible).
`objects.h` SPE_CURE_SICKNESS is NODIR; self-cast is D-1398.
**Change:** SPE_CURE_SICKNESS arm `await bhitm(steed, obj)` +
`steedhit = true` instead of skipping `zap_steed`. Do not
invent a `bhitm` cure arm. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/
0007/2200/0383.
**Next:** Open `zap.c` `bhito` uchain unpunish WAN_OPENING
(named). Not boxlock.
**Blocked:** none.
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
