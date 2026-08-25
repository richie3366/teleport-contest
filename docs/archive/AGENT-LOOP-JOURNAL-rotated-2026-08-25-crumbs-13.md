# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-25 — D-1495 trap.c untrap door force + has_magic_key

**Objective:** Must-fix `artifact.c` `invoke_untrap` vs stub
`untrap` (`void force`; door/floor always 0). Source: review
**449**.
**C locus:** `trap.c` `untrap` `:5865–5868` / `:6051–6095`;
`artifact.c` `is_magic_key` / `has_magic_key`; caller
`invoke_untrap` `:1838–1845`.
**Change:** Door D_TRAPPED find/disarm uses `force` (skips
find `rn2`/fail `rnd`). `has_magic_key`→force for `#untrap`.
Floor disarm_*/box/squeaky/pit named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Key invoke).
**Verified:** private canary **15**/15; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` poison-coat / healing
unpoison (named). Not unicorn mix.
**Blocked:** none.

## 2026-08-25 — D-1494 artifact.c invoke_healing Blinded 0/1

**Objective:** Must-fix `artifact.c` `invoke_healing` first
`You_feel("better.")` gate uses C `Blinded` 0/1 vs `ucreamed`.
Not ENERGY. Source: review **449**.
**C locus:** `artifact.c` `invoke_healing` `:1787`;
`youprop.h` `:92` `Blinded` / `:93` `BlindedTimeout`.
**Change:** `Blinded()` is `((H&&!B)?1:0)` at the first gate;
keep `BlindedTimeout` for the second `You_feel` and
`make_blinded`. UNTRAP stub still named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Staff invoke).
**Verified:** private canary **10**/10; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Must-fix `artifact.c` `invoke_untrap` vs stub
`untrap`. Not ENERGY.
**Blocked:** none.

## 2026-08-25 — review D-1485–D-1493 (audit #1880)

**Objective:** audit — C-fidelity reviews **446–454** of JS SHAs
`e98c0be8` / `9f784a5c` / `8d41bd04` / `00d5d4d6` /
`83fa138f` / `69080895` / `f26e11aa` / `b303c111` /
`8669b5b8` plus full `sessions` score.
**C locus:** `zap.c` `zap_updown` `:3378–3389` / `zap_map`
`:3685–3717`; `potion.c` `potion_dip` unicorn; `objnam.c`
`the()`; `artifact.c` `arti_invoke` `:2149–2228`;
`mklev.c` minetn-1; `worm.c` `:189–297`; `mkobj.c`
`add_to_minv` `:2648–2665`; `allmain.c` `:453–468`.
**Change:** no `js/` edits. **449** QUALITY-RISK (Must-fix:
`invoke_healing` Blinded 0/1; `invoke_untrap` stub callee).
**446** ACCEPT; **447–448**, **450–454** ACCEPT-WITH-DEBT.
Filled archive D-1493 `8669b5b8`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
(100%) speed `39+0.30/turn` (R² 0.84).
**Verified:** full `sessions` at HEAD `8669b5b8`; public-unhit
of the new arms.
**Next:** Must-fix `artifact.c` `invoke_healing` first
`You_feel` gate = C `Blinded` 0/1 vs `ucreamed`. Not ENERGY.
**Blocked:** none.

## 2026-08-25 — D-1493 allmain.c see_monsters Hallu / Warn_of_mon

**Objective:** Open `allmain.c` `see_monsters` Hallu / Warn_of_mon
(named). Not DETECT_MONSTERS timeout.
**C locus:** `allmain.c` `:453–468`; callee `display.c`
`see_monsters` `:1513–1524`; `artifact.c` `Sting_effects`
`:2466–2501`.
**Change:** Once-per-input uses C `Hallucination` (H &&
!resist) then objects/traps; else Unblind_telepat|
Warning|Warn_of_mon. Callee counts warntype.obj then
Sting_effects. `any_visible_region` / worm segs /
MATCH_WARN / SPFX_WARN conferral named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit Sting count).
**Verified:** private canary **43**/43; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `potion.c` `potion_dip` poison-coat /
healing unpoison (named). Not unicorn mix.
**Blocked:** none.

## 2026-08-25 — D-1492 mkobj.c add_to_minv merge

**Objective:** Open `makemon.c` `add_to_minv` merge (named).
Not stolen_booty.
**C locus:** `mkobj.c` `add_to_minv` `:2648–2665`; callee
`invent.c` `merged`.
**Change:** Walk minvent and merge, else prepend
`OBJ_MINVENT`. Live in `mkobj.js`; re-export
`makemon.js`. mergable unpaid/erosion/oname / gnome
`begin_burn` / dog leftovers named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit merge).
**Verified:** private canary **30**/30; green+strict
seed8000/0900; cohort **7**/7 + strict
1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `allmain.c` `see_monsters` Hallu /
Warn_of_mon (named). Not DETECT_MONSTERS timeout.
**Blocked:** none.

## 2026-08-25 — D-1491 worm.c worm_move / shrink / nomove

**Objective:** Open `worm.c` `worm_move` (named). Not initworm.
**C locus:** `worm.c` `worm_move` `:189–277`; `shrink_worm`
`:170–186`; `worm_nomove` `:280–297`; caller `monmove.c`
`m_move` `:2054–2071`.
**Change:** After place, occupy old dummy and grow or shrink
the tail; failed move shrinks + HP floor 1. cutworm /
wormgone / save/rest / `worm_known` / see_wsegs / muse·mhitu
callers named. Rule #2: no fs.
**Score:** fortress unchanged (public-unhit movement).
**Verified:** private canary **27**/27; green+strict
seed8000/0900; focused seed0373 FULL; cohort **7**/7 +
strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `makemon.c` `add_to_minv` merge (named).
Not stolen_booty.
**Blocked:** none.
