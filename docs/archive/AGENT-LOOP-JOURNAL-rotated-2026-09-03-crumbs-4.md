# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-03 — D-1761 sounds.c sound_speak / sndprocs.h SoundSpeak

**Objective:** Open `sounds.c` sound_speak. Not set_voice.
**C locus:** `sounds.c` `sound_speak` `:2184–2220`; Death `:1235`;
`sndprocs.h` `SoundSpeak` `:275`; `pline.c` `putmesg` `:79`.
**JS locus:** `js/sounds.js` `sound_speak`; `js/sndprocs.js` `SoundSpeak`;
`js/display.js` `pline_after_consume`.
**Change:** empty `sound_speak`; Death `tmpbuf=ucase` then pline/SetVoice/
`sound_speak`; empty `SoundSpeak` (does not call `sound_speak`); putmesg
after flush. Did not port SND_SPEECH body or yn `#ifdef`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:sound_speak`; node canary
(no RNG); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `sounds.c` maybe_gasp.
**Blocked:** none.

## 2026-09-03 — D-1760 explode.c map_invisible !canspotmon / You_hear

**Objective:** Open `explode.c` map_invisible !canspotmon. Not
`explosion_to_glyph`.
**C locus:** `explode.c` `explode` `:378–452`; `engulfer_explosion_msg`
`:117–179`; `display.c` `map_invisible` `:377–385`.
**JS locus:** `js/explode.js` `explode`; `js/sndprocs.js` `se_blast`.
**Change:** 3x3 I-glyph when `cansee && !canspotmon`; unseen
You_hear/generic/Boom; engulfer_explosion_msg + seemimic. Did not
touch explosion_to_glyph.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `explode.c:explode`; node 14/14;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `sounds.c` sound_speak.
**Blocked:** none.

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
