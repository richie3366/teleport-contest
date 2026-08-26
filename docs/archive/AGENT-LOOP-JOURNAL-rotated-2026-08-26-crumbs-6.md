# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-26 — D-1545 worm.c detect_wsegs + map_monst showtail

**Objective:** Open `worm.c` `detect_wsegs` (named). Not `see_wsegs`.
**C locus:** `worm.c` `detect_wsegs` `:502–519`; caller
`detect.c` `map_monst` `:132–133`.
**JS locus:** `js/worm.js` `detect_wsegs`; `js/detect.js`
`map_monst`; `js/display.js` `show_wseg_detect_glyph`.
**Change:** `what_mon` once then `show_glyph` body segs (not
`newsym`); `monster_detect` showtail TRUE; vicinity FALSE;
`S_WORM_TAIL` class maps the long worm. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `dog.c` `tamedog` `wake_nearto`. Not is_covetous.
**Blocked:** none.

## 2026-08-26 — D-1544 that_is_a_mimic object_from_map / defsyms

**Objective:** Open `pager.c` `that_is_a_mimic` (named). Not
object_from_map. C function is `uhitm.c` `:6201–6276`.
**C locus:** `uhitm.c` `that_is_a_mimic` `:6201–6276`; callee
`pager.c` `object_from_map` `:284–377` (D-1524).
**JS locus:** `js/uhitm.js` `that_is_a_mimic`; `js/objnam.js`
`otense`.
**Change:** live `object_from_map` (dynamic import), furniture
PCHAR desc, gold `Those gold pieces are`, `MIM_OMIT_WAIT`
strip, masked `M_AP_TYPE`. Not local mksobj. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **18**/18; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `worm.c` `detect_wsegs`. Not `see_wsegs`.
**Blocked:** none.

## 2026-08-26 — D-1543 set_mimic_sym furnsyms real S_*

**Objective:** Open `makemon.c` `set_mimic_sym` furnsyms real
S_* (named). Not door `S_hcdoor`.
**C locus:** `makemon.c` `set_mimic_sym` `:2490–2497`.
**JS locus:** `js/makemon.js` `set_mimic_sym` / `MIMIC_FURNSYMS`.
**Change:** ROLL_FROM furniture uses real cmap S_upstair×2 /
S_dnstair×2 / S_altar / S_grave / S_throne / S_sink, not stub
0..5. Furnsyms altar hits Align2amask. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `pager.c` `that_is_a_mimic`. Not
object_from_map.
**Blocked:** none.

## 2026-08-26 — D-1542 themerms Light source oil lamp fill

**Objective:** Open `themerms.lua` Light source fill oil lamp
(named). Not create_object `o->lit`.
**C locus:** `themerms.lua` `:204–209`; `sp_lev.c`
`l_push_mkroom_table` `:3066`; callee `create_object` `:2425–2426`
(D-1533).
**JS locus:** `js/mklev.js` `themeroom_fill_light_source` /
`THEMEROOM_FILL_BODIES`.
**Change:** unlit themed fill places `l_create_object`
`OIL_LAMP` `lit=true` (begin_burn). Not `mksobj_at`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `makemon.c` `set_mimic_sym` furnsyms. Not
door `S_hcdoor`.
**Blocked:** none.

## 2026-08-26 — D-1541 restore.c ghostfruit spe remap

**Objective:** Open `restore.c` `ghostfruit` (named). Not goodfruit.
**C locus:** `restore.c` `ghostfruit` `:500–511`; `restobjchn`
`:260–261`; `options.c` fruitadd else `:8257–8286`.
**JS locus:** `js/bones.js` `ghostfruit` / `fruitadd_bones` /
`remapObjChainIds`.
**Change:** oldfruit fid→fname then fruitadd else into live
ffruit; restobjchn after next_ident; no candify / no
`current_fruit`. Clone (bones→options cycle). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `themerms.lua` Light source fill. Not `o->lit`.
**Blocked:** none.

## 2026-08-26 — D-1540 make_happy_shk adjalign/home/migrate

**Objective:** Must-fix review **493** — `shk.c` `make_happy_shk`
not pacify+“calms down” only.
**C locus:** `shk.c` `make_happy_shk` `:1395–1435`;
`make_happy_shoppers` `:1438–1445`; `kops_gone`; `pacify_guards`.
**JS locus:** `js/shk.js` `make_happy_shk`; export `mdrop_special_objs`.
**Change:** Non-Rogue `adjalign(sgn)`; `!inhishop` `home_shk` or
migrate+`dismiss_kops`; then shoppers (`kops_gone`/`pacify_guards`).
`pacify_guards` clone (mon→trap/monmove→shk). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `restore.c` `ghostfruit`. Not goodfruit.
**Blocked:** none.
