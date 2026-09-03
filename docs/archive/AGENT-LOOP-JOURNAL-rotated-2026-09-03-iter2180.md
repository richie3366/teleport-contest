# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-03 — audit #2180 reviews 719–727 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **718**
(`0b5f451a`…`bb71f9ff`, D-1758…D-1766) plus full `sessions`.
**C locus:** youprop.h `Deaf`; trap.c `trapname`; explode.c
`map_invisible`; sounds.c `sound_speak`/`maybe_gasp`/`beg`;
teleport.c `level_tele`; display.h `GLYPH_*_OFF` / detect.c
`map_monst`; do_wear.c `cancel_doff`.
**Change:** reviews **719–727**. **726 QUALITY-RISK** (stale
`loc.disp_glyph` / `see_traps`) prepended Must-fix. Rest
ACCEPT-WITH-DEBT. No `js/` edits. Filled archive D-1766 `%h`.
**Score:** **40**/44, Scr **10,422**/11,405, RNG **702,843**/792,838
(88.6%). Speed `41+0.32/turn` (R² 0.857) at `bb71f9ff`. Break at
D-1765 (seed0006/0014/0030/4500).
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `display.c` `show_glyph` always overwrite gbuf.
**Blocked:** none.

## 2026-09-03 — D-1766 do_wear.c cancel_doff

**Objective:** Open `do_wear.c` cancel_doff (named). Not setworn oc_oprop.
**C locus:** `do_wear.c` `cancel_doff` `:1643–1659`; `doffing` `:1600–1640`;
callers `worn.c` `setworn` `:110` / `setnotworn` `:164`.
**JS locus:** `js/do_wear.js` `cancel_doff`/`setworn`/`doffing`;
`js/do.js` `setnotworn`.
**Change:** C `cancel_doff` (I_SPECIAL skip `cancel_don`, always clear
slotmask); `setworn`/`setnotworn` callers; `doffing` accessory/wep
`takeoff.what`. Did not add setnotworn `monstunseesu_prop` /
`update_inventory`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `do_wear.c:cancel_doff`; node canary
(I_SPECIAL / donning / idle / amulet / callers); green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `potion.c` make_blinded Unaware talk=FALSE.
**Blocked:** none.

## 2026-09-03 — D-1765 display.h GLYPH_*_OFF / map_monst

**Objective:** Open `display.h` integer GLYPH_*_OFF / map_monst. Not
pet_to_glyph.
**C locus:** `display.h` `:497–546`; `detect.c` `map_monst` `:121–134`.
**JS locus:** `js/display.js`; `js/detect.js` `map_monst`.
**Change:** C glyph offset enum + integer `*_to_glyph` / `glyph_is_*`;
`map_monst` monsym/`mtame` ternary; `loc.disp_glyph`. Did not wire
`ridden_mon_to_glyph` usteed or `map_glyphinfo`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `detect.c:map_monst`; node canary
(offsets; ghost detect vs pet/wild); green+strict seed8000/0900;
CURRENT cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `do_wear.c` cancel_doff.
**Blocked:** none.

## 2026-09-03 — D-1764 teleport.c heaven u_left_shop / escape

**Objective:** Open `teleport.c` heaven u_left_shop caller. Not SetVoice.
**C locus:** `teleport.c` `level_tele` `:1321–1385`; `do.c`
`goto_level` `:1517–1519`; callee `u_left_shop`.
**JS locus:** `js/teleport.js` `level_tele`; `js/do.js` `goto_level`.
**Change:** C heaven envelope (`u_left_shop`+in_mklev, Cloud 9,
fly/lev/plummet, `done(DIED)`, dlevel 0); buried ball before
`next_to_u`; `ledger_no<=0` `done(ESCAPED)`. Did not port
`lev_by_name` / Nowhere yn / branch clamp.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `teleport.c:level_tele`; node canary
(ushops0 Cloud 9 Levitation; Flying `-3`; wizard `-10` survive;
`goto_level` dlevel 0 → ESCAPED); green+strict seed8000/0900;
CURRENT cohort **7**/7 + seed0373 + strict. Rule #2 clean.
**Next:** Open `display.h` integer GLYPH_*_OFF / map_monst.
**Blocked:** none.

## 2026-09-03 — D-1763 sounds.c beg

**Objective:** Open `sounds.c` beg. Not maybe_gasp.
**C locus:** `sounds.c` `beg` `:518–542`; caller `dog_hunger` `:383`
(not wired).
**JS locus:** `js/sounds.js` `beg`.
**Change:** C body; diet/helpless gate; animal `domonnoise`;
humanoid I-glyph+SetVoice+verbalize; middle famished. Did not port
`dog_hunger`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:beg`; node canary
(helpless/diet/unseen middle/Deaf animal/humanoid); green+strict
seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `teleport.c` heaven u_left_shop.
**Blocked:** none.

## 2026-09-03 — D-1762 sounds.c maybe_gasp

**Objective:** Open `sounds.c` maybe_gasp. Not sound_speak.
**C locus:** `sounds.c` `maybe_gasp` `:545–610`; caller
`peacefuls_respond` `:4188` (not wired).
**JS locus:** `js/sounds.js` `maybe_gasp`.
**Change:** C body + remaining `MS_*` for the switch; mndx vs
`urole.guardnum`; live `p_coaligned`. Did not port `beg` or
`peacefuls_respond`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:maybe_gasp`; node canary
(`rn2(5)` / null arms); green+strict seed8000/0900; CURRENT cohort
**7**/7 + strict. Rule #2 clean.
**Next:** Open `sounds.c` beg.
**Blocked:** none.
