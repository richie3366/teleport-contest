# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — D-1759 trap.c trapname Hallu / trap_to_glyph no Hallu

**Objective:** Open `display.h` random_trap_to_glyph. Not explode
`map_invisible`.
**C locus:** `trap.c` `trapname` `:7098–7155`; `display.h`
`trap_to_glyph` `:630` (no Hallu); `display.c` `see_traps` `:1610`.
**JS locus:** `js/trap.js` `trapname`; `js/display.js` `trap_to_glyph` /
`see_traps`.
**Change:** Hallu names via display rng + 62 `halu_trapnames` + role/rank
`" trap"`; `trap_to_glyph` stays cmap; `see_traps` `disp_kind==='trap'`;
detect clone retired. Did not invent 3.6 glyph hallu.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.h:random_trap_to_glyph`; node
canary (keep/halu/real/role; peek 52 `"booby trap"`); green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict (seed0383). Rule #2 clean.
**Next:** Open `explode.c` map_invisible !canspotmon.
**Blocked:** none.
## 2026-09-03 — D-1758 mhitu.c hero_Deaf youprop.h:125

**Objective:** Must-fix `mhitu.c` doseduce/mayberem `hero_Deaf`.
Not Open `display.h` random_trap_to_glyph.
**C locus:** `youprop.h:125` Deaf; `mhitu.c` `mayberem` `:2322`;
`doseduce` Deaf arms; `hitmsg` `:40`.
**JS locus:** `js/mhitu.js` `hero_Deaf`.
**Change:** local matches invent/do/monmove (`HDeaf||EDeaf||uroleplay.deaf`);
hitmsg/You_hear/sedu/ston. Named `noit_mhim` Hallu.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `mhitu.c:doseduce`; node 21/21
(EDeaf/roleplay/HDeaf first rng `rn2(35)` not `rn2(20)`); green+strict
seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `display.h` random_trap_to_glyph.
**Blocked:** none.
## 2026-09-03 — audit #2170 reviews 710–718 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **709**
(`d17e4f35`…`2d66f69e`, D-1749…D-1757) plus full `sessions`.
**C locus:** display.c `feel_location`; mhitu.c `doseduce`; dokick.c
`ghitm`; sounds.c `set_voice`; detect.c `sense_trap`; end.c
`keepdogs(TRUE)`; potion.c `toggle_blindness`; invent.c `delobj_core`;
worn.c `setworn`.
**Change:** reviews **710–718**. **711 QUALITY-RISK** (`hero_Deaf`
drops EDeaf/`uroleplay.deaf`) prepended Must-fix. Rest
ACCEPT-WITH-DEBT. No `js/` edits. Filled archive D-1748 / D-1757 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `42+0.31/turn` (R² 0.846) at `2d66f69e`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `mhitu.c` doseduce `hero_Deaf`.
**Blocked:** none.
## 2026-09-03 — D-1757 worn.c setworn oc_oprop / w_blocks / weapon gate

**Objective:** Open `worn.c` setworn oc_oprop (named). Not possibly_unwield.
**C locus:** `worn.c` `setworn` `:72–145`; `w_blocks` `:38–44`;
`mondata.c` `cvt_prop_to_mseenres`; `wield.c` `setuwep` `:99–135`.
**JS locus:** `js/do_wear.js` `setworn`; `js/worn.js` `w_blocks`;
`js/wield.js` `setuwep`; `js/mondata.js`.
**Change:** worn[] walk + SWAPWEP/QUIVER skip + weapon-class conferral
+ `w_blocks` blocked flats; `setuwep` calls `setworn`. `cancel_doff` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `worn.c:setworn`; node 32/32;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.h` random_trap_to_glyph.
**Blocked:** none.
## 2026-09-03 — D-1756 invent.c delobj / delobj_core extract then obfree

**Objective:** Open `mkobj.c` delobj extract (named). Not dealloc_obj.
**C locus:** `invent.c` `delobj` `:1429–1433` / `delobj_core`
`:1436–1462`; `mkobj.c` `extract_nobj` / `container_weight`;
`zap.c` revive floor `delobj_core(,TRUE)`.
**JS locus:** `js/mkobj.js` `delobj`/`delobj_core`; `js/zap.js` revive.
**Change:** live `obj_resists` then extract + floor maybe_unhide/newsym
+ `obfree`; Rider force; nested `container_weight`. zap
`delete_contents` clone named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `mkobj.c:delobj`; node 18/18;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `worn.c` setworn oc_oprop.
**Blocked:** none.
## 2026-09-03 — D-1755 potion.c toggle_blindness Sting_effects(-1)

**Objective:** Open `potion.c` make_blinded Sting_effects(-1) (named).
Not see_monsters MON_STILL_ARRIVING.
**C locus:** `potion.c` `toggle_blindness` `:334–364`; `make_blinded`
`:260–331`; `artifact.c` `Sting_effects` `-1`.
**JS locus:** `js/do.js` `toggle_blindness`/`make_blinded`;
`js/do_wear.js` Blindf_on/off; clones retired.
**Change:** Stinging `see_monsters` then `Sting_effects(-1)`; Hallu
talk; Eyes vismsg/itch/`strange_feeling`. Unaware/`set_bc` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `potion.c:make_blinded`; node 13/13;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `mkobj.c` delobj extract.
**Blocked:** none.
## 2026-09-03 — D-1754 end.c companion pet HP / Schroedinger d()

**Objective:** Open `end.c` companion pet HP score (named). Not
get_valuables.
**C locus:** `end.c` `really_done` `:1293–1295` `keepdogs(TRUE)`;
`:1453–1476` mydogs `mtame` `mhp` + live-cat `d(adj_lev,8)`; `dog.c`
keepdogs `:799–809` pets_only wakeup; `makemon.c` `adj_lev`.
**JS locus:** `js/end.js` `score_escape_companions`; `js/dog.js`;
exported `adj_lev`.
**Change:** persist `game.Schroedingers_cat`; death `keepdogs(true)`
(dynamic import); pets_only untrap/wake; two-line "You and NAME".
DUMPLOG named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `end.c:really_done`; node 15/15;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `potion.c` make_blinded Sting_effects(-1).
**Blocked:** none.
## 2026-09-03 — D-1753 detect.c sense_trap / display_trap_map

**Objective:** Open `detect.c` sense_trap (named). Not monster_detect.
**C locus:** `detect.c` `sense_trap` `:864–897`; `detect_obj_traps`
`:904–953`; `display_trap_map` `:955–1003`; `trap_detect` `:1010–1088`;
`findone` `:1674`/`:1683`. `display.h` `random_object`/`random_monster`.
**JS locus:** `js/detect.js`; `js/display.js` `random_object`;
`js/hack.js` `closed_door` export.
**Change:** Hallu/cursed fake GOLD/`random_object(rn2)` quan +
`corpsenm`; `display_trap_map` unconstrain/reconstrain; chests/doors/
`strange_feeling`; findone trap/door/chest. flash/`foundone` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `detect.c:sense_trap`; node 13/13;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `end.c` companion pet HP score.
**Blocked:** none.
## 2026-09-03 — D-1752 sounds.c set_voice / sndprocs.h SetVoice

**Objective:** Open `sounds.c` set_voice / SetVoice (named). Not
doseduce.
**C locus:** `sounds.c` `set_voice` `:2160–2182`; `sndprocs.h`
`SetVoice` empty without SND_LIB; `voice_moreinfo`; shk direct
`set_voice`; live verbalize sites.
**JS locus:** `js/sounds.js` `set_voice` + `domonnoise`;
`js/sndprocs.js` `SetVoice`; `js/mhitu.js`; `js/dokick.js`;
`js/shk.js`.
**Change:** empty macros matching contest compile; wire C call
sites; Death `voice_death` after ucase. `sound_speak` named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:set_voice`; node 11/11;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `detect.c` sense_trap.
**Blocked:** none.

**Objective:** Open `dokick.c` hidden_gold(TRUE) kick (named). Not vault
hidden_gold.
**C locus:** `dokick.c` `ghitm` `:294–407` `:361`; `throw_gold` `:2712`;
`vault.c` `hidden_gold`; `zap.c` `miss`.
**JS locus:** `js/dokick.js` `ghitm`; `js/dothrow.js` `throw_gold`;
`js/mthrowu.js` `miss`.
**Change:** retire non-recursive `hidden_gold_kick`; vault helper +
export `ghitm`; `throw_gold` dz/bhit/ghitm/ship/floor. SetVoice named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `dokick.c:hidden_gold`; node 21/21;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `sounds.c` set_voice / SetVoice.
**Blocked:** none.
## 2026-09-03 — D-1750 mhitu.c doseduce / mayberem / ld() AD_SSEX

**Objective:** Open `mhitu.c` doseduce (named). Not getyear.
**C locus:** `mhitu.c` `doseduce` `:1984–2305` / `mayberem` `:2308–2352`
/ `ld()` `:25`; `mhitm_ad_ssex` mhitu arm; `sounds.c` MS_SEDUCE.
**JS locus:** `js/mhitu.js` `doseduce`; `js/sounds.js`; extractor YES.
**Change:** port seduction envelope; SYSOPT default on; expand
`SEDUCTION_ATTACKS_YES` so AMOROUS_DEMON has AD_SSEX. SetVoice named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `mhitu.c:doseduce`; node 21/21;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `dokick.c` hidden_gold(TRUE) kick.
**Blocked:** none.
