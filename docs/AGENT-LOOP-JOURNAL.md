# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-29 — D-1604 zap.c bhit !Blind youprop

**Objective:** Must-fix **558** zap `bhit` `show_transient_light`
`!Blind` = youprop `(H||E)&&!B`, not sticky `u.Blind||u.ublind`.
Not `#seeall`.
**C locus:** `youprop.h:103`; `zap.c` `bhit` `:3901–3917`.
**JS locus:** `js/zap.js` `Blind` / `bhit`.
**Change:** existing Blind clone matches apply.js. No Blind #29
in light.js. Apply camera Blind unchanged. Worm tails named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `#seeall`. Not doprinuse.
**Blocked:** none.
## 2026-08-29 — D-1603 allmain.c beyond_savefile_load

**Objective:** Must-fix **561** `beyond_savefile_load=1` so D-1600
InvInUse `sync_perminvent` can run. Not `#seeall`.
**C locus:** `allmain.c` `moveloop_preamble` `:71` / `:107–110`;
`restore.c` `dorecover` `:942`.
**JS locus:** `js/allmain.js` `moveloop_preamble`; `js/save.js`
`try_restore_save`.
**Change:** set the field where C does; restore preamble still does
not. Default Off no-op. tty WIN_INVEN create / `#perminv` named.
Rule #2: no fs.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **10**/10 + restore 0013 + strict.
**Next:** Must-fix **558** zap Blind. Not Open `#seeall`.
**Blocked:** none.
## 2026-08-28 — review D-1594–D-1602 (audit #2000)

**Objective:** C-fidelity review of nine `js/` SHAs since **554**;
cadence score. No `js/` edits.
**C locus:** `normal_shape` await; tamedog `has_edog`; `create_mplayers`;
`show_transient_light`; `has_mcorpsenm`; SORTLOOT_PETRIFY;
perm_invent InvInUse; `tty_doprev_message`; `ggetobj` takeoff/identify.
**JS locus:** reviews **555–563** (`dc1d6d94`…`b9710bcf`).
**Change:** ACCEPT-WITH-DEBT 555–557, 559–560, 562–563.
**QUALITY-RISK 558** (`9244ce75`): zap `bhit` sticky `u.Blind`.
**QUALITY-RISK 561** (`fb87326a`): `beyond_savefile_load` never set
(`allmain.c:71`). Must-fix prepended (561 first). Filled archive
D-1602 `%h` `b9710bcf`.
**Score:** **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838
`38+0.30/turn` (R² 0.856) at `b9710bcf`. seed4500 PASS.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 555-563`.
**Next:** Must-fix 561 `beyond_savefile_load`. Not `#seeall`.
**Blocked:** none.
## 2026-08-28 — D-1602 invent.c ggetobj takeoff/identify askchain

**Objective:** Open `pickup.c` ggetobj takeoff/identify askchain
(named). Not traditional_loot.
**C locus:** `invent.c` `ggetobj` `:2199–2369`; `askchain`
`:2376–2541` takeoff/ident; `identify_pack` TRADITIONAL;
`do_wear.c` `doddoremarm`/`select_off`.
**JS locus:** named omit after D-1581 (loot `askchain` live;
takeoff/identify still menu-only).
**Change:** live Traditional `ggetobj` + askchain filters;
`identify_pack` / `A` `select_off`. `take_off` / `menu_remarm`
/ drop named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `#seeall`. Not ggetobj takeoff.
**Blocked:** none.
## 2026-08-28 — D-1601 topl.c tty_doprev_message

**Objective:** Open `topl.c` `tty_doprev_message` (named). Not
putmsghistory.
**C locus:** `topl.c` `tty_doprev_message` `:19–119`;
`redotoplin` `:121–141`; `cmd.c` `doprev_message` `:163–168`;
`options.c` TTY `'s'` + `optfn_msg_window`.
**JS locus:** named omit after D-1588 (ring live; ^P unknown).
**Change:** live single/full/combo/reversed walk + cmd ^P /
`#prevmsg`. getline/yn `inread` named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open ggetobj takeoff. Not `tty_doprev_message`.
**Blocked:** none.
## 2026-08-28 — D-1600 invent.c perm_invent InvInUse

**Objective:** Open `invent.c` perm_invent InvInUse (named). Not
inuse_only.
**C locus:** `invent.c` `prepare_perminvent` `:5548–5562`;
`display_pickinv` `:3108–3113` WIN_INVEN `InvInUse` /
`InvShowGold`; `:3277–3280` `"In use"`; `sync_perminvent`
`:5653–5656` `display_inventory(NULL,FALSE)`; `wintype.h`
InvInUse=8.
**JS locus:** named omit after D-1589 (`sync_perminvent`
early-return; inuse only via `sortloot=='i'`).
**Change:** live invmode filter; default Off still no-op.
tty paint / InvSparse / `#perminv` named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `tty_doprev_message`. Not putmsghistory.
**Blocked:** none.
