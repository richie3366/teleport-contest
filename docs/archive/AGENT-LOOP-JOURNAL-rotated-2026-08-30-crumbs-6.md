# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-30 — D-1717 shk.c remote_burglary unpaid steal

**Objective:** Open `shk.c` remote_burglary (named). Not
bill_box_content.
**C locus:** `shk.c` `remote_burglary` `:664–682`; `rob_shop`
`:685–719`; `call_kops` `:509–564`; `makekops` `:5112–5135`;
`addupbill` `:495–507`; `clear_unpaid` `:308–325`; caller
`pickup.c` `pick_obj` `:1936–1939`.
**JS locus:** `js/shk.js` + `js/pickup.js` `pick_obj`.
**Change:** unpaid-from-outside steal runs `rob_shop`/`call_kops`
instead of a deferred empty arm after D-0447 bill. Named:
choose_stairs; `u_left_shop` leave verbalize.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 18/18; green+strict;
focused seed0383/0116; cohort 7/7 + strict.
**Next:** Open `shk.c` get_cost gem glass pseudo-ID.
**Blocked:** none.

## 2026-08-30 — audit #2120 reviews 669–677 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **668**
(`0c0f29fe`…`0c720b98`, D-1708…D-1716) plus full `sessions`.
**C locus:** `save_light_sources` mx>0; `update_mlstmv` skip;
`yyyymmddhhmmss`; `update_lastseentyp`; `oc_merge`; `observe_object`;
FullyUsedUp; itemize ynq; `dopay` mute/Deaf nod.
**Change:** reviews **669–677**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1716 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.32/turn` (R² 0.853) at `0c720b98`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `shk.c` `remote_burglary`.
**Blocked:** none.

## 2026-08-30 — D-1716 shk.c dopay mute/Deaf thank-you nod

**Objective:** Open `shk.c` dopay mute/Deaf thank-you nod (named).
Not getpos.
**C locus:** `shk.c` `dopay` `:2011–2025`; `youprop.h` Deaf;
`muteshk` `msound <= MS_ANIMAL`.
**JS locus:** `js/shk.js` `dopay` (`hero_deaf` / `muteshk`).
**Change:** mute/Deaf else nod + surcharge bang; `paid`
`update_inventory`. Named: SetVoice; `remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 8/8; green+strict;
focused seed0383/0116; cohort 8/8 + strict.
**Next:** Open `shk.c` remote_burglary.
**Blocked:** none.

## 2026-08-30 — D-1715 shk.c pay_billed_items Traditional itemize ynq

**Objective:** Open `shk.c` pay_billed_items traditional itemize ynq
(named). Not FullyUsedUp.
**C locus:** `shk.c` `pay_billed_items` `:2082–2109`; callee
`dopayobj` `:2259–2275` y_n Pay?; `options.c` `:7258` MENU_FULL.
**JS locus:** `js/shk.js` `pay_billed_items` / `dopayobj`.
**Change:** Traditional ynq + `menu_requested` toggle; `dopayobj`
itemize `safe_qbuf`/`upstart(doname)`; unset style stays FULL.
Named: mute/Deaf nod; `remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 17/17; green+strict;
focused seed0383; cohort 9/9 + strict.
**Next:** Open `shk.c` dopay mute/Deaf thank-you nod.
**Blocked:** none.

## 2026-08-30 — D-1714 shk.c FullyUsedUp/PartlyUsedUp

**Objective:** Open `shk.c` FullyUsedUp/PartlyUsedUp (named). Not
bill_box_content.
**C locus:** `shk.c` `make_itemized_bill` `:1543–1663`;
`add_to_billobjs` `:3365–3383`; `add_one_tobill` dummy; 
`sub_one_frombill` residual; `menu_pick_pay_items` headings;
`update_bill` ONBILL; `mkobj.c` `obj_extract_self` ONBILL.
**JS locus:** `js/shk.js`; `js/mkobj.js` `obj_extract_self`.
**Change:** dummy/residual onto `billobjs` `OBJ_ONBILL`; itemize
FullyUsedUp/PartlyUsedUp split; used-up menu headings; pay extract
`OBJ_DELETED`. Named: Traditional itemize ynq.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary residual dummy + ONBILL
extract; green+strict; focused seed0383; cohort 9/9 + strict.
**Next:** Open `shk.c` pay_billed_items traditional itemize ynq.
**Blocked:** none.

## 2026-08-30 — D-1713 o_init.c observe_object FIRST_OBJECT skip

**Objective:** Open `invent.c` observe_object FIRST_OBJECT skip
(named). Not undiscover_object.
**C locus:** `o_init.c` `observe_object` `:441–451`;
`youprop.h` `Hallucination`; callers `invent.c` `:171` / `:1039`
/ `:1217`.
**JS locus:** `js/invent.js` `observe_object`.
**Change:** skip `otyp < FIRST_OBJECT` (generic/STRANGE_OBJECT);
Hallu via `Hallucination()` not sticky `u.Hallucination`;
`discover_object(..., FALSE, TRUE, FALSE)`. Named: useupall/obfree.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary STRANGE/LAST_GENERIC
skip + FIRST_OBJECT / Halluc_resistance sees; green+strict;
focused seed0383; cohort 7/7 + strict.
**Next:** Open `shk.c` FullyUsedUp/PartlyUsedUp.
**Blocked:** none.
