# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-29 — D-1610 dog.c initedog ogoal -1 / first-pet livelog

**Objective:** Open `dog.c` `initedog` ogoal `-1` (named). Not has_edog.
**C locus:** `dog.c` `initedog` `:63–87`; consumer `dog_goal` `:617`.
**JS locus:** `js/dog.js` `initedog`; export `js/do_name.js` `mon_pmname`.
**Change:** everything-arm `ogoal` `-1,-1`; livelog when `!pets &&
in_moveloop` then `pets++`. `dog_goal` still tests truthiness.
`free_edog` / restore `newedog` named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open getline ^P `tty_doprev_message`. Not command ^P.
**Blocked:** none.

## 2026-08-29 — D-1609 apply.c m_unleash / mon.c m_detach

**Objective:** Open `mon.c` `m_unleash` (named). Not newcham.
**C locus:** `apply.c` `m_unleash` `:725–742`; caller `mon.c`
`m_detach` `:2741–2742`.
**JS locus:** `js/apply.js` `m_unleash` + `js/mhitm.js` `mondead`
+ trap/uhitm clones + `js/dogmove.js` ALLOW_U.
**Change:** `pline_mon` + `update_inventory`; m_detach FALSE;
ALLOW_U then explmm slack after mondead. SetVoice no-op.
newcham mleashed named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `initedog` ogoal `-1`. Not has_edog.
**Blocked:** none.

## 2026-08-29 — D-1608 minion.c gain_guardian_angel

**Objective:** Open `minion.c` `gain_guardian_angel` (named).
Not create_mplayers.
**C locus:** `minion.c` `:497–565`; `lose_guardian_angel` `:467–494`;
caller `do.c` `final_level` `:2052`.
**JS locus:** `js/minion.js` + `js/do.js` `goto_level`; export
`Hear_again` / `mk_roamer`.
**Change:** Conflict hostiles / fervent named angel; pets
conduct gate; no tamedog. SetVoice no-op. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `m_unleash`. Not newcham.
**Blocked:** none.

## 2026-08-29 — D-1607 makemon.c mongets mplayer-sword spe

**Objective:** Open `makemon.c` mongets mplayer-sword spe (named).
Not show_transient_light.
**C locus:** `makemon.c` `mongets` `:2180–2230`.
**JS locus:** `js/makemon.js` `mongets` + `js/objects.js` `is_sword`.
**Change:** mplayer-sword `spe=3+rn2(4)` plus same-function demon /
lminion / candelabrum / Bell / Book arms. One `is_sword`.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `gain_guardian_angel`. Not create_mplayers.
**Blocked:** none.

## 2026-08-29 — D-1606 mplayer.c mplayer_talk

**Objective:** Open `mplayer.c` `mplayer_talk` (named). Not
create_mplayers.
**C locus:** `mplayer.c` `:355–377`; caller `sounds.c` MS_HUMANOID
`:1026–1031`.
**JS locus:** `js/mplayer.js` `mplayer_talk` + `js/sounds.js`
`domonnoise`.
**Change:** hostile endgame `is_mplayer` `#chat` verbalize + one
`rn2(3)`. SetVoice no-op. Peaceful / "threatens you." named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open mplayer-sword spe. Not show_transient_light.
**Blocked:** none.

## 2026-08-29 — D-1605 cmd.c #seeall EXT_CMDS

**Objective:** Open `cmd.c` `#seeall` EXT_CMDS (named). Not doprinuse.
**C locus:** `cmd.c` `:1848–1849` `"seeall"` `doprinuse`;
`doextcmd` `:505–514`; `accept_menu_prefix` `:3507–3512`.
**JS locus:** `js/getline.js` EXT_CMDS / `doextcmd`.
**Change:** typed `#seeall` runner; flag `accept_menu_prefix`;
`can_do_extcmd`; sibling see* live dopr*. `*` key unchanged.
`doextlist` / BIND= named. Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mplayer_talk`. Not create_mplayers.
**Blocked:** none.
