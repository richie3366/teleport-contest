# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1474 zap.c zap_steed WAN_STRIKING/SPE_FORCE_BOLT via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT
via bhitm (named). Not INVIS.
**C locus:** `zap.c` `zap_steed` `:3122–3123` (bhitm group
`:3115–3134`); callee `bhitm` `:189–217` Boing / `d(2,12)` /
miss; caller `weffects` `:3437–3439`.
**Change:** WAN_STRIKING/SPE_FORCE_BOLT arm `await bhitm(steed, obj)`
so a downward striking wand or force bolt while riding hits the
steed instead of skipping `zap_steed`. Disclose learns (SPBOOK
skips `makeknown`). Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps striking while riding down).
**Verified:** private canary **24**/24; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK
(named). Not OPENING.
**Blocked:** none.

## 2026-08-25 — D-1473 zap.c zap_steed WAN_MAKE_INVISIBLE via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_MAKE_INVISIBLE via
bhitm (named). Not POLY.
**C locus:** `zap.c` `zap_steed` `:3117` (bhitm group
`:3115–3134`); callee `bhitm` `:348–368` `mon_set_minvis` /
knowninvisible; caller `weffects` `:3437–3439`.
**Change:** WAN_MAKE_INVISIBLE arm `await bhitm(steed, obj)`
so a downward make-invisible wand while riding hits the
steed instead of skipping `zap_steed`. Disclose learns.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps make-invisible while riding down).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed`
WAN_STRIKING/SPE_FORCE_BOLT via bhitm (named). Not INVIS.
**Blocked:** none.

## 2026-08-25 — D-1472 potion.c potionhit remaining otyp switch

**Objective:** Open `potion.c` `potionhit` (named from D-1457).
Not mixtype.
**C locus:** `potion.c` `potionhit` `:1623–1928`; hero
`:1683–1705` OIL/POLY/ACID; mon switch `:1730–1896`; unpaid
`:1913–1926`. Callees `explode_oil` / `bhitm` POT_POLY /
`mon_set_minvis` / `sleep_monst` / `mcureblindness` /
`mon_adjust_speed`.
**Change:** live remaining otyp switch + shop unpaid so a
thrown potion hitting a monster heals/sickens/confuses/…
instead of only POT_WATER. Hero oil explode + poly
`!Unchanging && !Antimagic`. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session throws a non-water potion at a monster).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_MAKE_INVISIBLE via
bhitm (named). Not POLY.
**Blocked:** none.

## 2026-08-25 — D-1471 zap.c zap_steed WAN/SPE_POLYMORPH via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_POLYMORPH/
SPE_POLYMORPH via bhitm (named). Not CANCEL.
**C locus:** `zap.c` `zap_steed` `:3120–3133` (bhitm group
`:3115–3134`); callee `bhitm` `:263–334` resist/`rn2(25)`/
`newcham`; caller `weffects` `:3437–3439`.
**Change:** WAN/SPE_POLYMORPH arm `await bhitm(steed, obj)`
so a downward polymorph while riding hits the steed
instead of skipping `zap_steed`. Disclose learns (SPBOOK
skips `makeknown`). Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps poly while riding down).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potionhit` (named from D-1457).
Not mixtype.
**Blocked:** none.

## 2026-08-25 — D-1470 zap.c zap_steed WAN/SPE_CANCELLATION via bhitm

**Objective:** Open `zap.c` `zap_steed` WAN_CANCELLATION/
SPE_CANCELLATION via bhitm (named). Not OPENING.
**C locus:** `zap.c` `zap_steed` `:3118–3133` (bhitm group
`:3115–3134`); callee `bhitm` `:335–340` `cancel_monst`
invent=FALSE; caller `weffects` `:3437–3439`.
**Change:** WAN/SPE_CANCELLATION arm `await bhitm(steed, obj)`
so a downward cancel while riding hits the steed (`mcan`)
instead of skipping `zap_steed`. Saddle stays. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps cancel while riding down).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_POLYMORPH/SPE_POLYMORPH
via bhitm (named). Not CANCEL.
**Blocked:** none.

## 2026-08-25 — D-1469 spell.c SPE_HEALING/SPE_EXTRA_HEALING directional weffects

**Objective:** Open `spell.c` `spelleffects` SPE_HEALING/SPE_EXTRA_HEALING
directional weffects (named). Not TELE.
**C locus:** `spell.c` `spelleffects` `:1475–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:433–473`;
`zap_steed` `:3127–3133`; `mon.c` `healmon`; `muse.c`
`mcureblindness`.
**Change:** Skilled bless then `wand_duplicate_weffects` so a
directional heal `bhit`s via live `healmon` instead of skipping
weffects. `zap_steed` via bhitm. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts healing at a monster).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed`
WAN_CANCELLATION/SPE_CANCELLATION via bhitm (named). Not OPENING.
**Blocked:** none.
