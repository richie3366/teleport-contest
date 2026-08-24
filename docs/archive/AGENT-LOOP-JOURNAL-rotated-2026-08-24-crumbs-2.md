# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-24 — D-1420 spell.c SPE_RESTORE_ABILITY peffects

**Objective:** Open `spell.c` `spelleffects` SPE_RESTORE_ABILITY
peffects (named from D-1408). Not INVISIBILITY.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_restore_ability` `:646–693`; `apply.c`
`unfixable_trouble_count` `:4431–4469`.
**Change:** skilled bless then `peffects`; Wow/Ulch; ABASE=AMAX
+ AEXE max 0; potion `pluslvl`; spell skips levels. INVIS still
named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts restore ability).
**Verified:** private canary **41**/41; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_INVISIBILITY
peffects (named from D-1408). Not amulet drain.
**Blocked:** none.

## 2026-08-24 — D-1419 spell.c SPE_LEVITATION peffects

**Objective:** Open `spell.c` `spelleffects` SPE_LEVITATION
peffects (named from D-1408). Not RESTORE_ABILITY.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_levitation` `:1165–1221`; `timeout.c` `:794–803`.
**Change:** skilled bless then `peffects`; `float_up` +
timeout/I_SPECIAL; cursed ceiling/`doup`; expiry
`float_down`. RESTORE still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts levitation).
**Verified:** private canary **24**/24; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_RESTORE_ABILITY
peffects (named from D-1408). Not INVISIBILITY.
**Blocked:** none.

## 2026-08-22 — D-1418 spell.c SPE_DETECT_MONSTERS peffects

**Objective:** Open `spell.c` `spelleffects` SPE_DETECT_MONSTERS
peffects (named from D-1408). Not LEVITATION.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_monster_detection` `:914–952`; callee `detect.c`
`monster_detect` `:798–862`; `timeout.c` `:932–934`.
**Change:** skilled bless then `peffects`; blessed timeout +
lonely; empty `strange_feeling` threatened; expiry
`see_monsters`. LEVITATION still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts detect monsters).
**Verified:** private canary **22**/22; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_LEVITATION
peffects (named from D-1408). Not RESTORE_ABILITY.
**Blocked:** none.

## 2026-08-22 — D-1417 spell.c SPE_DETECT_TREASURE peffects

**Objective:** Open `spell.c` `spelleffects` SPE_DETECT_TREASURE
peffects (named from D-1408). Not DETECT_MONSTERS.
**C locus:** `spell.c` `spelleffects` `:1534–1546`; `potion.c`
`peffect_object_detection` `:954–961`; callee `detect.c`
`object_detect` `:603–788`.
**Change:** skilled bless then `peffects`; object_detect
do_dknown invent+floor; empty `strange_feeling` return 1.
DETECT_MONSTERS still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session casts detect treasure).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_DETECT_MONSTERS
peffects (named from D-1408). Not LEVITATION.
**Blocked:** none.

## 2026-08-22 — D-1416 zap.c backfire

**Objective:** Open `zap.c` `backfire` (named). Not zapyourself.
**C locus:** `zap.c` `backfire` `:2605–2614`; caller `dozap`
`:2647–2652`; callee `invent.c` `useupall` `:1312–1317`.
**Change:** cursed `!rn2(100)` now explodes via `The(xname)`,
`d(spe+2,6)`, `losehp` exploding wand, `useupall`, then
exercise STR. Dust spe<0 still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session zaps a cursed wand that rolls `rn2(100)==0`).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `spell.c` `spelleffects` SPE_DETECT_TREASURE
peffects (named from D-1408). Not DETECT_MONSTERS.
**Blocked:** none.

## 2026-08-22 — D-1415 uhitm.c mhitm_ad_phys artifact_hit leftover

**Objective:** Open `uhitm.c` `mhitm_ad_phys` artifact_hit leftover
(named from D-1403). Not rustm.
**C locus:** `uhitm.c` `mhitm_ad_phys` `:4158–4180`; caller
`mhitm.c` `hitmm` `:698–701`; callee `artifact.c` `artifact_hit`
D-0613.
**Change:** mwep artifact now `artifact_hit` after dmgval;
hitmm skips default hits; delayed `gv.vis` hits iff false;
DEADMONSTER `grow_up` done. rustm / poison / worm-shrieker
still named. Rule #2: no fs.
**Score:** fortress 44/44 unchanged (public-unhit unless a
session has mon-vs-mon artifact wep).
**Verified:** private canary **16**/16; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `zap.c` `backfire` (named). Not zapyourself.
**Blocked:** none.
