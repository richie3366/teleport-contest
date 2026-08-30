# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
