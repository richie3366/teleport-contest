# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-28 — D-1599 invent.c SORTLOOT_PETRIFY

**Objective:** Open `invent.c` SORTLOOT_PETRIFY (named). Not
inuse_only.
**C locus:** `invent.c` `sortloot` `:611–620` filter override;
`will_feel_cockatrice` `:4333–4340`; `feel_cockatrice`
`:4342–4361`; `look_here` feel arms; `pickup.c` `query_objlist`
FEEL abort `look_here(0)`.
**JS locus:** named omit after D-1589 (`sortloot` drop-filter;
look_here cockatrice deferred).
**Change:** live PETRIFY keep `touch_petrifies` CORPSE past
filterfunc; feel helpers; look_here skip/single/multi; pickup
`,` menu abort. eat/doloot/pray/engulfer named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open perm_invent InvInUse. Not SORTLOOT_PETRIFY.
**Blocked:** none.
## 2026-08-28 — D-1598 mextra.h has_mcorpsenm

**Objective:** Open `makemon.c` `has_mcorpsenm` (named). Not
set_mimic_sym. Not show_transient_light.
**C locus:** `mextra.h` `has_mcorpsenm` `:234`; `makemon.c`
`newmcorpsenm`/`freemcorpsenm` `:2368–2383`; callers seemimic,
copy_mextra, zap bhitm, wormgone, display, pager, apply.
**JS locus:** named omit after D-1525/D-1574 (pager clone;
display `!= null`; seemimic deferred).
**Change:** live helper + alloc/free; stale `NON_PM`; wired
callers. object_detect / `altarmask_at` / `clear_bypasses`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open SORTLOOT_PETRIFY. Not has_mcorpsenm.
**Blocked:** none.
## 2026-08-28 — D-1597 light.c show_transient_light

**Objective:** Open `makemon.c` `show_transient_light` (named). Not
ndemon. Not create_mplayers. (C is `light.c`.)
**C locus:** `light.c` `show_transient_light` `:255–324`;
`transient_light_cleanup` `:327–357`; callers zap `bhit`, apply
`do_blinding_ray`, minion `msummon`.
**JS locus:** named omit after D-1575 (`light.js` camera deferred).
**Change:** live camera range 0 + thrown lamplit `mtemplit` +
cleanup `discard_flashes`; wired three callers. Worm tails named.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `has_mcorpsenm`. Not show_transient_light.
**Blocked:** none.
## 2026-08-28 — D-1596 mplayer.c create_mplayers

**Objective:** Open `mplayer.c` `create_mplayers` (named). Not
mk_mplayer. Not has_edog.
**C locus:** `mplayer.c` `create_mplayers` `:326–353`; caller
`do.c` `final_level` `:2049` / `goto_level` `:1885`.
**JS locus:** named omit after D-1584; `goto_level` skipped Astral
`final_level` (always `resurrect` on newdungeon+amulet).
**Change:** live class/`goodpos`/tryct/`mk_mplayer`; Astral
`madeNew` `rn1(4,3), TRUE`; else-if `resurrect`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **9**/9; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `show_transient_light`. Not create_mplayers.
**Blocked:** none.
## 2026-08-28 — D-1595 dog.c tamedog initedog has_edog vs !mtame

**Objective:** Open `dog.c` tamedog `initedog` has_edog vs `!mtame`.
Not FULL_MOON. Not ustuck.
**C locus:** `dog.c` `tamedog` `:1253–1259`; `newedog` `:22–32`;
`initedog` `EDOG`; `makemon.c` MM_EDOG `:1245–1246`.
**JS locus:** `initedog(mtmp, !(mtmp.mtame))` + `mtmp.edog={}`.
**Change:** live `newedog`; `!has_edog` → `initedog(TRUE)` else
FALSE; MM_EDOG; `copy_mextra`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `create_mplayers`. Not has_edog.
**Blocked:** none.
## 2026-08-28 — D-1594 mon.c normal_shape await newcham NC_SHOW_MSG

**Objective:** Must-fix **547** — `normal_shape` await
`newcham(..., NC_SHOW_MSG)`. Not has_edog.
**C locus:** `mon.c` `normal_shape` `:4438–4443`; callers `rescham` /
`restore_cham` / zap `cancel_monst` `:3199`.
**JS locus:** dropped Promise after D-1586 (`js/mon.js:902`).
**Change:** async `normal_shape`/`rescham`/`restore_cham`; await
SHOW_MSG before `cham=NON_PM` and before clay-golem pline. Rule #2:
no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open tamedog `initedog` has_edog. Not `normal_shape`.
**Blocked:** none.
