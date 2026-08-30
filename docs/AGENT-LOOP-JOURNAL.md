# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-30 — audit #2110 reviews 654–668 + cadence

**Objective:** C-fidelity review of fifteen `js/` SHAs since **653**
(`605f0f2e`…`7b26f699`, D-1693…D-1707) plus full `sessions`.
**C locus:** knox/drawbridge; savetrapchn; savelev lights; serLevel;
other ledgers; RANGE_GLOBAL; getlev place; doset perminv; wizmgender;
buy_container; shk_names_obj; dopay getpos; bill_box_content; yn
addcmdq; recalc_mapseen flags.
**Change:** reviews **654–668**. **656** QUALITY-RISK Must-fix
`light.c` `mx > 0` + `update_mlstmv` skip dead/offmap. Rest
ACCEPT-WITH-DEBT. No `js/` edits. Filled archive D-1707 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.32/turn` (R² 0.861) at `7b26f699`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `light.c` `save_light_sources` LS_MONSTER `mx > 0`.
**Blocked:** none.
## 2026-08-30 — D-1707 dungeon.c recalc_mapseen Blind/oracle/valley/sanctum

**Objective:** Open `dungeon.c` recalc_mapseen Blind bigroom / oracle /
valley / sanctum. Not knox/drawbridge.
**C locus:** `dungeon.c` `recalc_mapseen` `:3115–3238`;
`Invocation_lev` `:2016–2021`; `dungeon.h` Is_valley/Is_sanctum.
**JS locus:** `js/dungeon.js` `recalc_mapseen` + `Invocation_lev`;
`Is_valley`/`Is_sanctum` `js/const.js`.
**Change:** Blind retain/`forgot` wipe; `orig_rtype` DELPHI; naltar
valley+msanctum; invoc tseen vs sanctum gateway. Named sokosolved /
quest flags / DRAWBRIDGE_UP lastseentyp / yyyymmddhhmmss.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 21/21; green+strict;
cohort 7/7 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `dungeon.c` cemetery yyyymmddhhmmss when[]. Not
cemetery JSON.
**Blocked:** none.
## 2026-08-30 — D-1706 cmd.c yn_function addcmdq

**Objective:** Open `getline.c` yn_function addcmdq. Not Traditional itemize.
**C locus:** `cmd.c` `yn_function` `:5470–5583`; `cmdq_pop` /
`cmdq_add_key` / `cmdq_clear`; windowport `tty_yn_function`.
**JS locus:** `js/getline.js` `yn_function` wrapping `tty_yn_function`.
**Change:** default TRUE pop KEY + CQ_REPEAT record; FALSE at getobj /
paranoid_ynq / askchain. Named `yn_function_menu` / getdir yn.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `dungeon.c` recalc_mapseen Blind bigroom / oracle /
valley / sanctum. Not knox/drawbridge.
**Blocked:** none.
## 2026-08-30 — D-1705 shk.c bill_box_content

**Objective:** Open `shk.c` bill_box_content. Not contained_cost.
**C locus:** `shk.c` `bill_box_content` `:3386–3407`; caller
`addtobill` `:3526–3534`; `picked_container` `:3084–3100`.
**JS locus:** `js/shk.js` `bill_box_content` + `addtobill`.
**Change:** live `contained_cost` then bill nested contents;
SchroedingersBox/coin skip; `record_price_quote`; list-price
contents speech. Named dummy→billobjs / FullyUsedUp /
`remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `getline.c` yn_function addcmdq. Not Traditional itemize.
**Blocked:** none.
## 2026-08-30 — D-1704 shk.c dopay multi-shk getpos

**Objective:** Open `shk.c` dopay multi-shk getpos. Not shk_names_obj.
**C locus:** `shk.c` `dopay` `:1814–1856`; callees `getpos` / `m_at` /
`cansee` / `canspotmon` / `m_next2u`.
**JS locus:** `js/shk.js` `dopay`.
**Change:** seensk>1 live getpos pay-whom (ESC cancel; self / unseen /
empty / !isshk / too-far). No silent resident stub.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `shk.c` bill_box_content. Not contained_cost.
**Blocked:** none.
## 2026-08-30 — D-1703 shk.c shk_names_obj makeknown

**Objective:** Open `shk.c` shk_names_obj makeknown. Not buy_container.
**C locus:** `shk.c` `shk_names_obj` `:3412–3445`; callers
`dopayobj` `:2290`, `buy_container` `:2404`, `sellobj` `:4068`/`:4182`.
**JS locus:** `js/shk.js` `shk_names_obj`.
**Change:** live `objects()[otyp]` before `oc_magic`; makeknown
blank/mail + ordinary saleable gear; `highc`/`plur(amt)`.
FIRST_OBJECT skip stays on observe_object.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 9/9 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `shk.c` dopay multi-shk getpos. Not shk_names_obj.
**Blocked:** none.
## 2026-08-30 — D-1702 shk.c buy_container named-container pay

**Objective:** Open `shk.c` buy_container. Not cheapest_item.
**C locus:** `shk.c` `buy_container` `:2307–2411`;
`insufficient_funds` `:2454–2481`; `reject_purchase` `:2417–2451`;
`update_bill` `:2169–2211`; `make_itemized_bill` `:1606–1645`;
`objnam.c` `paydoname` `:2330–2354`.
**JS locus:** `js/shk.js`, `js/objnam.js`.
**Change:** Known/UndisclosedContainer coalesce; pay contents then
box; COST_CONTENTS → `contained_cost`; paydoname no_charge rewrite.
No FullyUsedUp / `bill_box_content`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe tagged shop-unpaid template 35/35; green+strict;
cohort 9/9 incl. seed0007 302/302 seed2200 230/230 seed0116 127/127.
**Next:** Open `shk.c` shk_names_obj makeknown. Not buy_container.
**Blocked:** none.
## 2026-08-30 — D-1701 options.c optfn_boolean wizmgender glyph-reset

**Objective:** Open `options.c` wizmgender glyph-reset. Not wizweight.
**C locus:** `options.c` `optfn_boolean` `:5376–5385`;
`reset_needed_visuals` `:8979–9014`; `objnam.c` `:1549–1559`;
`wintty.c` `:3930–3936`.
**JS locus:** `js/options.js`, `js/display.js`, `js/objnam.js`.
**Change:** set_wizonly `&iflags.wizmgender`; after-change both
flags; `reset_needed_visuals` subset `check_gold_symbol`+`docrt`;
MG_FEMALE inverse; doname gender suffix. No full `reset_glyphmap`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; cohort 9/9 incl.
seed0007 302/302 seed2200 230/230.
**Next:** Open `shk.c` buy_container. Not cheapest_item.
**Blocked:** none.
## 2026-08-30 — D-1700 options.c doset CompOpt perminv_mode wc skip

**Objective:** Open `options.c` mO perminv_mode compound row. Not
optfn_perminv_mode.
**C locus:** `options.c` doset `:8865–8877`; doset_add_menu
`:9016–9065`; wc_supported `:9911–9921`; tty_procs.wincap `:98–110`.
**JS locus:** `js/options.js` doset.
**Change:** C-order CompOpt row + live get_val/handler; skip when
!wc_supported (contest tty lacks WC_PERM_INVENT). Ungated insert was
D-1661 seed0007 miss.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; cohort 9/9 incl.
seed0007 302/302.
**Next:** Open `options.c` wizmgender glyph-reset. Not wizweight.
**Blocked:** none.
## 2026-08-30 — save-oracle loop Cluster 6 CURRENT/NOTES

**Objective:** Close save-prefixed oracle take — hot docs. No JS.
**C locus:** n/a (scripts/process).
**JS locus:** n/a.
**Change:** fortress + save-oracle required for tagged Open. B0:
catchup-after-restore 26/30 red; trap-ledger 38/38; shop 35/35 no unpaid.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; ledger rng-diff --all-segments 8472; probe skip/red/fork.
**Next:** map-driven named omissions. Probe tagged restore Open.
**Blocked:** none.
## 2026-08-30 — ledger Cluster 6 B0 table / remaining map notes

**Objective:** Close JSON save/restore ledger take — B0 numbers +
named remainders. No JS.
**C locus:** n/a (docs).
**JS locus:** n/a.
**Change:** CURRENT/NOTES B0: trap-same-floor 17/17; ledger 26/26;
catchup 30/30; shop/trap-ledger unrecorded. Maps already name binary
NHFILE, both relink sites, M2/M6, absolute dst, dropped iflags/worn.
**Score:** fortress held (not a full-suite iter).
**Verified:** Cluster 5 commit `736b74ec` already green.
**Next:** map-driven named omissions. Not shop/trap-ledger until recorded.
**Blocked:** none.
## 2026-08-30 — D-1699 restore.c dorecover getlev place / omoves restamp

**Objective:** JSON save/restore ledger Cluster 5 — getlev place,
dorecover envelope, restlevelfile omoves analogue.
**C locus:** `restore.c` getlev `:1177–1220`; dorecover `:922–949`;
`save.c` savelev `:515–516` `svm.moves` timestamp.
**JS locus:** `js/do.js` `getlev_place_monsters`; `js/save.js`
`restampOtherLedgerOmoves` + async `try_restore_save`; `js/shk.js`
`set_residency`; `js/jsmain.js`.
**Change:** occupancy place + one `restore_cham` per current fmon;
restamp other `omoves` to restore-time moves (C elapsed==0 on `<`);
`run_timers` last; `check_special_room` after welcome.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0105; stairs; trap-same-floor;
cohort. Ledger **26/26**; catchup **30/30**.
**Next:** Cluster 6 B0 table / remaining map notes.
**Blocked:** none.
## 2026-08-30 — D-1698 save.c savegamestate JSON worn/RANGE_GLOBAL relink

**Objective:** JSON save/restore ledger Cluster 4 — worn, drop iflags,
RANGE_GLOBAL timers/lights, restgamestate relink.
**C locus:** `save.c` `savegamestate` `:264–332`; `restore.c`
`restgamestate` `:687–699` / `:725–726`.
**JS locus:** `js/save.js`; `relinkGlobalTimersLights` `js/lev_json.js`.
**Change:** `owornmask`+`setworn`+`setuwep`; strip context pointers;
global timers/lights/`timer_id`; migrating/fruit/quest/`artidisco`.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0105; stairs; trap-same-floor;
cohort. Ledger 25/26 (Cluster 5).
**Next:** Cluster 5 getlev `place_monster`/`restore_cham`.
**Blocked:** none.
