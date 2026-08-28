# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-28 — D-1572 timeout.c attach_egg_hatch_timeout / obj_split_timers

**Objective:** Open `attach_egg_hatch_timeout`. Not Plan-B.
**C locus:** `timeout.c` `attach_egg_hatch_timeout` `:980–1005`;
`obj_split_timers` `:2358–2370`; `splitobj` `:498–499`;
`poly_obj` `:1756–1779`; `hatch_egg` remainder/`is_pool(mon)` /
`learn_egg_type`.
**JS locus:** attach live (D-0533); splitobj timers deferred;
poly_obj skipped hero eggs; hatch `is_pool(carrier)`.
**Change:** live `obj_split_timers` + splitobj; poly_obj
hero-egg `kill_egg`/`set_corpsenm` `rn2(NUMMONS)`; hatch
hatchling pool + `update_inventory` + `impossible`. SetVoice
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `newcham` Protection cancel. Not set_mimic_sym
early-out.

## 2026-08-28 — D-1571 vision.c vision_recalc xray IN_SIGHT

**Objective:** Open `vision_recalc` xray IN_SIGHT. Not howmonseen.
**C locus:** `vision.c` `vision_recalc` `:631–668`; `circle_ptr`
`vision.h:62`; setter Eyes D-1558.
**JS locus:** `js/vision.js` after view_from; no xray circle.
**Change:** live `circle_ptr` + `apply_xray_in_sight` (SVALL +
newsym before lights). nv_range / pit / underwater named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `attach_egg_hatch_timeout`. Not Plan-B.

## 2026-08-28 — D-1570 worm.c cutworm / place_wsegs


**Objective:** Open `cutworm`. Not worm_known.
**C locus:** `worm.c` `cutworm` `:372–477`; `place_wsegs` `:614–635`;
callers `known_hitum` `:641–642`, `thitmonst` `:2206–2207`.
**JS locus:** missing; thitmonst `void chopper`.
**Change:** live cutworm + place_wsegs; wire melee/throw; export
`s_suffix`. redraw_worm / wormgone named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `vision_recalc` xray IN_SIGHT. Not howmonseen.

## 2026-08-28 — D-1569 invent.c pickinv hands/xtra_choice

**Objective:** Open pickinv hands/xtra_choice. Not `&ctmp`.
**C locus:** `invent.c` `display_pickinv` `:3056–3417` usextra;
`getobj_hands_txt` `:1718–1736`; getobj `:1976–1988`.
**JS locus:** `display_pickinv_reply` after D-1559; no extra `'-'`.
**Change:** usextra n-bump + n==1 `message_menu` + Miscellaneous
row; `getobj_hands_txt`; live getobj + wield/ready/grease/dip_ok.
force_invmenu redo / mime_action / gacc named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `cutworm`. Not worm_known. Do not skip D-1531…D-1569.

## 2026-08-28 — D-1568 invent.c getobj eat/read/zap/tin NOFLAGS

**Objective:** Open eat/read/zap/tin getobj NOFLAGS. Not ALLOWCNT.
**C locus:** `invent.c` `getobj` `:1751–2089`; eat_ok/tin_ok
NOFLAGS; read_ok GETOBJ_PROMPT; zap_ok NOFLAGS.
**JS locus:** clones after D-1561/D-1563.
**Change:** live `getobj`; eat/read/zap/tinopen callers; eat_ok
+ `getobj_else`. pickinv hands named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict (seed1800 eat, seed2200 zap-read).
**Next:** Open pickinv hands/xtra_choice. Not `&ctmp`.
**Blocked:** none.

## 2026-08-28 — D-1567 pickup.c use_container 'r' reversed

**Objective:** Open `'r'` reversed put-in then take-out. Not stash.
**C locus:** `pickup.c` `use_container` `:3132–3210`; yn_function
`:3097–3115`; `explain_container_prompt` `:2910–2940`.
**JS locus:** `js/pickup.js` (`'r'` ignored after D-1561).
**Change:** `loot_in_first`; put-in then take-out; mbag-null
gate; TRADITIONAL yn `rs` + `'?'` help. traditional_loot /
more_containers `n` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open eat/read/zap/tin NOFLAGS. Not ALLOWCNT.
**Blocked:** none.
