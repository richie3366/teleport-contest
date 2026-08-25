# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-25 — D-1452 spell.c SPE_WIZARD_LOCK IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**C locus:** `spell.c` `spelleffects` `:1466–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_WIZARD_LOCK through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1434;
bhitm already D-1425. TURN named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts wizard lock).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item`
(named). Not probing.
**Blocked:** none.
## 2026-08-25 — D-1451 spell.c SPE_SLOW_MONSTER IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE
wand-duplicate (named). Not LOCK.
**C locus:** `spell.c` `spelleffects` `:1465–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_SLOW_MONSTER through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1433;
bhitm already D-1424. LOCK named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts slow monster).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE
wand-duplicate (named). Not POLYMORPH.
**Blocked:** none.
## 2026-08-25 — D-1450 spell.c SPE_KNOCK IMMEDIATE wand-duplicate

**Objective:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**C locus:** `spell.c` `spelleffects` `:1464–1514`; callee
`zap.c` `weffects` `:3440–3451` IMMEDIATE `bhit`/`bhitm`.
**Change:** route SPE_KNOCK through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-0981.
SLOW/LOCK named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts knock).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE
wand-duplicate (named). Not LOCK.
**Blocked:** none.
## 2026-08-25 — review D-1441–D-1449 (audit #1820)

**Objective:** audit — C-fidelity reviews **401–409** of JS SHAs
`b8ef02c3` / `892be171` / `4a0aa5cc` / `ae0cf7f4` /
`7628b03e` / `ed218e86` / `4dde6eeb` / `20f59004` /
`70c2b8e6` plus full `sessions` score.
**C locus:** `spell.c` `spelleffects` `:1457–1514`;
`uhitm.c` `mhitm_ad_phys` `:4182–4189` / `:3104–3118` /
`:1260–1280`; `zap.c` `zap_steed` `:3099–3103`;
`zap_updown` `:3236–3262`; `bhito` `:2222–2274`;
`zapyourself` `:2817–2823`.
**Change:** no `js/` edits. **401–409** ACCEPT-WITH-DEBT.
Filled archive D-1449 `70c2b8e6`. Must-fix empty. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `36+0.30/turn` (R² 0.857).
**Verified:** full `sessions` at HEAD `70c2b8e6`; public-unhit
on dig-cast / rustm / steed-probe / updown-probe / bhito-probe /
self-drain / poison leftover / missile-cast / finger-cast.
**Next:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**Blocked:** none.
## 2026-08-25 — D-1449 spell.c SPE_FINGER_OF_DEATH RAY wand-duplicate

**Objective:** Open `spell.c` SPE_FINGER_OF_DEATH wand-duplicate
RAY (named from D-1440). Not MAGIC_MISSILE.
**C locus:** `spell.c` `spelleffects` `:1472–1514`; callee
`zap.c` `weffects` `:3461–3462` `ubuzz` BZ_U_SPELL nd=ulevel/2+1.
**Change:** route SPE_FINGER_OF_DEATH through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-0156.
IMMEDIATE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts finger of death).
**Verified:** private canary **25**/25; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `weffects` SPE_KNOCK IMMEDIATE
wand-duplicate (named from D-1427). Not SLOW.
**Blocked:** none.
## 2026-08-25 — D-1448 spell.c SPE_MAGIC_MISSILE RAY wand-duplicate

**Objective:** Open `spell.c` SPE_MAGIC_MISSILE wand-duplicate
RAY (named from D-1440). Not FINGER.
**C locus:** `spell.c` `spelleffects` `:1463–1514`; callee
`zap.c` `weffects` `:3461–3462` `ubuzz` BZ_U_SPELL nd=ulevel/2+1.
**Change:** route SPE_MAGIC_MISSILE through `wand_duplicate_weffects`
(`physical_damage` false). Self-dir zapyourself already D-1364.
FINGER / IMMEDIATE named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit until a
session casts magic missile).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` SPE_FINGER_OF_DEATH wand-duplicate
RAY (named from D-1440). Not MAGIC_MISSILE.
**Blocked:** none.
## 2026-08-25 — D-1447 uhitm.c mhitm_ad_phys poison leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` poison leftover
(named from D-1415). Not rustm.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4184–4189`; callee
`mhitm_really_poison` `:3104–3118`.
**Change:** after rustm, poisoned/Grimtooth wep `!rn2(4)` →
vis poisoned pline, resist skip or `rn1(10,6)` + deadly.
mhitu `poisoned()` / AD_DRST 1/8 / worm-shrieker named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session has mon-vs-mon poisoned wep).
**Verified:** private canary **14**/14; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` SPE_MAGIC_MISSILE wand-duplicate
RAY (named from D-1440). Not FINGER.
**Blocked:** none.
## 2026-08-25 — D-1446 zap.c zapyourself SPE_DRAIN_LIFE

**Objective:** Open `zap.c` `zapyourself` SPE_DRAIN_LIFE
(named). Not bhitm drain.
**C locus:** `zap.c` `zapyourself` `:2817–2823`; caller
`spell.c` `:1500–1508`; callee `exper.c` `losexp`.
**Change:** `!Drain_resistance` (youprop H||E / uprops)
then `learn_it` + `losexp("life drainage")`; damage 0.
bhito `drain_item` / zap_steed drain named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session self-zaps drain life).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `uhitm.c` `mhitm_ad_phys` poison leftover
(named from D-1415). Not rustm.
**Blocked:** none.
## 2026-08-25 — D-1445 zap.c bhito WAN_PROBING

**Objective:** Open `zap.c` `bhito` WAN_PROBING
(named). Not updown.
**C locus:** `zap.c` `bhito` `:2222–2274`; callers
`bhitpile`/`bhit`/`zap_updown` down; callee
`invent.c` `display_cinventory` `:5446–5473`.
**Change:** WAN_PROBING observe + container/statue peek
(empty/Schroedinger/`display_cinventory`) + tin/egg;
learn iff `res`. drain_item / other updown otyps named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session probes a floor object).
**Verified:** private canary **19**/19; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zapyourself` SPE_DRAIN_LIFE
(named). Not bhitm drain.
**Blocked:** none.
## 2026-08-25 — D-1444 zap.c zap_updown WAN_PROBING

**Objective:** Open `zap.c` `zap_updown` WAN_PROBING
(named). Not steed.
**C locus:** `zap.c` `zap_updown` `:3236–3262`; caller
`weffects` `:3440–3446`; callees `zap_map` probing
`:3720–3796`, `invent.c` `display_binventory`
`:5488–5546`, `dungeon.c` `update_mapseen_for`.
**Change:** weffects `u.dz` → `zap_updown` WAN_PROBING
ceiling/beneath + `bhitpile` + `zap_map` + buried
menu; always disclose. Other updown otyps / bhito
probing / force_decor named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session zaps probing up/down unmounted).
**Verified:** private canary **21**/21; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `bhito` WAN_PROBING (named).
Not updown.
**Blocked:** none.
## 2026-08-25 — D-1443 zap.c zap_steed WAN_PROBING

**Objective:** Open `zap.c` `zap_steed` WAN_PROBING
(named). Not zapyourself.
**C locus:** `zap.c` `zap_steed` `:3099–3103`; caller
`weffects` `:3437–3439`; callee `probe_monster` D-1426.
**Change:** weffects mounted-down prefix + WAN_PROBING
`probe_monster(usteed)` + `learnwand`. Teleport / bhitm
routing still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless
a session probes downward while mounted).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_updown` WAN_PROBING (named).
Not steed.
**Blocked:** none.
## 2026-08-25 — D-1442 uhitm.c mhitm_ad_phys rustm leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` rustm leftover
(named from D-1415). Not poison.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4182–4183`; callee
`mhitm.c` `rustm` `:1260–1280` AD_CORR / AD_RUST / AD_FIRE
except steam vortex then `erode_obj` GREASE|VERBOSE.
**Change:** leftover damage after artifact_hit → `rustm(mdef,
mwep)`. Poison / mhitu rustm / worm-shrieker still named.
Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon wep vs rust/corr/fire).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `zap_steed` WAN_PROBING (named). Not
zapyourself.
**Blocked:** none.
