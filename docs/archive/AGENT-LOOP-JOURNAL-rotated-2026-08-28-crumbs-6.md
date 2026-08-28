# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-28 — D-1583 vision.c nv_range circle

**Objective:** Open `vision.c` `nv_range` circle (named).
Not unblock_point.
**C locus:** `vision.c` `vision_recalc` `:670–700`;
`u_init_misc` nv_range=1; `circle_ptr`.
**JS locus:** 3×3 lighting-loop stand-in after D-1571.
**Change:** `apply_nv_range_in_sight` after xray; drop 3×3.
Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mk_mplayer`. Not nv_range.
**Blocked:** none.

## 2026-08-28 — D-1582 cmd.c PREFIXCMD / cmdq_shift

**Objective:** Open `cmd.c` PREFIXCMD / `cmdq_shift` (named).
Not do_repeat.
**C locus:** `cmd.c` PREFIXCMD `:3762–3774`; `cmdq_shift`
`:354–370`; doextcmd `:3753–3760`.
**JS locus:** named omit after D-1563/D-1186; g/G returned;
REPEAT replace; no shift.
**Change:** `got_prefix_input` loop; REPEAT append; ext_tlist
shift. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open nv_range circle. Not PREFIXCMD.
**Blocked:** none.

## 2026-08-28 — D-1581 pickup.c traditional_loot / invent.c askchain

**Objective:** Open `pickup.c` traditional_loot askchain (named).
Not `'r'` reversed.
**C locus:** `pickup.c` `traditional_loot` `:3229–3261`;
`query_classes` `:140–262`; `invent.c` `askchain` `:2376–2541`.
**JS locus:** named omit after D-1567; MENU_FULL `menu_loot_*`.
**Change:** live query_classes + askchain; TRADITIONAL take-out /
put-in; INVLET sortloot; yn `#`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open PREFIXCMD / `cmdq_shift`. Not nv_range.
**Blocked:** none.

## 2026-08-28 — D-1580 invent.c gacc / BALL `'0'`

**Objective:** Open `invent.c` gacc / `'0'` ball class (named).
Not mime_action.
**C locus:** `invent.c` `display_pickinv` `:3323–3325`;
`let_to_name` `:4799–4839`; `drawing.c` `def_oc_syms`;
`wintty.c` `process_menu_window` gacc collect + `'0'` vs count.
**JS locus:** named omit after D-1579; digits always counted.
**Change:** live `def_oc_syms` + collect/take gacc; getobj
want_reply stays gacc 0. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open traditional_loot askchain. Not `'r'` reversed.
**Blocked:** none.

## 2026-08-28 — D-1579 invent.c mime_action

**Objective:** Open `invent.c` mime_action (named). Not force_invmenu.
**C locus:** `invent.c` `mime_action` `:1677–1706`; `getobj`
`:1946–1949`; `hacklib.c` `ing_suffix` `:362–396`.
**JS locus:** named omit after D-1578; typed `'-'` returned null.
**Change:** live mime + getobj/getobj_adjust typed hands; canonical
`ing_suffix` (clones retired). Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **20**/20; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open gacc / `'0'` ball class. Not traditional_loot.
**Blocked:** none.

## 2026-08-28 — D-1578 invent.c force_invmenu `*`/`?` redo

**Objective:** Open `invent.c` force_invmenu `*`/`?` redo (named).
Not hands/xtra.
**C locus:** `invent.c` `getobj` `:1923–2001`; `display_pickinv`
`:3345–3366`.
**JS locus:** named omit after D-1569; n==1 already skipped
message_menu when force.
**Change:** Special `*`/`?` rows + query; getobj auto `?`/`*`
oneloop; redo_menu in `getobj_display_pickinv`. Rule #2: no fs.
**Score:** fortress **44**/44 (not remeasured; port iter).
**Verified:** canary **21**/21; green+strict seed8000/0900; cohort
**7**/7 + strict.
**Next:** Open mime_action. Not gacc.
**Blocked:** none.
