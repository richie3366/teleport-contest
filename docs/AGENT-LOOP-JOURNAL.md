# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-25 — D-1468 spell.c SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate

**Objective:** Open `spell.c` `spelleffects` SPE_TELEPORT_AWAY
IMMEDIATE wand-duplicate weffects (named). Not STONE.
**C locus:** `spell.c` `spelleffects` `:1470–1514`; callee
`zap.c` `weffects` `:3440–3451`; `bhitm` `:341–347`;
`zapyourself` `:2876–2882`; `bhito` `:2321–2328`.
**Change:** Route SPE_TELEPORT_AWAY through
`wand_duplicate_weffects` so a directional cast `bhit`s via
live `u_teleport_mon` / `rloco` instead of skipping weffects.
HEALING stays named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts teleport-away at a monster).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects`
SPE_HEALING/SPE_EXTRA_HEALING directional weffects (named).
Not TELE.
**Blocked:** none.
## 2026-08-25 — D-1467 zap.c bhito boxlock WAN_OPENING/WAN_LOCKING

**Objective:** Open `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING
(named). Not doorlock.
**C locus:** `zap.c` `bhito` `:2393–2403`; callee `lock.c`
`boxlock` `:1056–1098`; callers `bhitpile`/`bhit`/`zap_updown`.
**Change:** Wire floor-box WAN_OPENING/SPE_KNOCK/WAN_LOCKING/
SPE_WIZARD_LOCK through live `boxlock` so Klunk/Klick learns
the wand (SPBOOK skips makeknown). uchain / poly-arm named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps opening/locking at a floor box).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_TELEPORT_AWAY
IMMEDIATE wand-duplicate weffects (named). Not STONE.
**Blocked:** none.
## 2026-08-25 — review D-1459–D-1466 (audit #1850)

**Objective:** audit — C-fidelity reviews **419–427** of JS SHAs
`7634fd61` / `f071b0ad` / `e4d98eb1` / `2173fc2d` /
`849d7532` / `99a31c84` / `89aab16d` / `a52401a6` /
`3605a281` plus full `sessions` score.
**C locus:** `spell.c` `spelleffects` `:1469–1514`;
`zap.c` `stone_to_flesh_obj` `:1991–2112`; `bhit`/`doorlock`
`:4056–4074` / `lock.c` `:1103–1272`; `zap_steed` `:3115–3134`;
`zap_updown` `:3290–3377`.
**Change:** no `js/` edits. **419–422** / **424–427**
ACCEPT-WITH-DEBT; **423** ACCEPT (comment strip). Filled
archive D-1466 `3605a281`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `37+0.30/turn` (R² 0.852).
**Verified:** full `sessions` at HEAD `3605a281`; public-unhit
of the new arms. Next Open: `bhito` boxlock.
**Next:** Open `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING
(named). Not doorlock.
**Blocked:** none.
## 2026-08-25 — D-1466 zap.c zap_updown SPE_STONE_TO_FLESH

**Objective:** Open `zap.c` `zap_updown` WAN_STONE_TO_FLESH
(named). Not LOCKING. C has no WAN_STONE_TO_FLESH; spell-only.
**C locus:** `zap.c` `zap_updown` `:3355–3377` + epilogue
`:3382–3408`; caller `weffects` `:3445–3446`.
**Change:** Port SPE_STONE_TO_FLESH flavor (air/water/Underwater/
qstart-up nothing; up Blood face; down !OBJ_AT + !ENGRAVE
pool/boil or nothing) then shared bhitpile+zap_map. Disclose
stays false. zap_map engraving named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts stone-to-flesh up or down).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING
(named). Not doorlock.
**Blocked:** none.
## 2026-08-25 — D-1465 zap.c zap_updown WAN_LOCKING/SPE_WIZARD_LOCK

**Objective:** Open `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK
(named). Not STRIKING.
**C locus:** `zap.c` `zap_updown` `:3295–3354` + epilogue
`:3382–3408`; callees `dbridge.c` `close_drawbridge`,
`trap.c` `closeholdingtrap` `:6210–6247`; caller `weffects`
`:3445–3446`.
**Change:** Port `!striking` FALLTHROUGH arms so up/down locking
closes a drawbridge, snaps a holding trap, or turns a hole into
a trapdoor and discloses. STONE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session zaps locking up or down).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_STONE_TO_FLESH
(named). Not LOCKING.
**Blocked:** none.
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
