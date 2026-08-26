# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1551 invent.c getobj canned CMDQ_INT

**Objective:** Open `invent.c` canned CMDQ_INT. Not ALLOWCNT.
**C locus:** `invent.c` `getobj` `:1778–1830`; `cmd.c` `cmdq_add_int`.
**JS locus:** `js/invent.js` `getobj_from_cmdq`.
**Change:** INT then KEY splits; !ALLOWCNT/second INT clears canned.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **32**/32; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open Eyes `is_plural`. Not `splev_create_monster`.
**Blocked:** none.
## 2026-08-26 — D-1550 trap.js monkilled worm_known sight

**Objective:** Must-fix review **509** `mon.c` `monkilled`
trap.js clone. Not howmonseen.
**C locus:** `mon.c` `monkilled` `:3384–3385`.
**JS locus:** `js/trap.js` `monkilled`.
**Change:** `wormno ? worm_known : cansee(head)` like `mhitm.js`.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open CMDQ_INT. Not Eyes `is_plural`.
**Blocked:** none.
## 2026-08-26 — D-1549 detect.c map_monst long-worm mndx

**Objective:** Must-fix review **506** `map_monst` /
`monster_detect` identity. Not detect_wsegs body.
**C locus:** `detect.c` `map_monst` `:132`; `monster_detect`
`:832–833`.
**JS locus:** `js/detect.js` `mtmp_is_long_worm` / `map_monst`.
**Change:** Compare `data.mndx ?? mnum` to `PM_LONG_WORM`
(`mons()` allocates). `detect_wsegs` now reachable. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Must-fix 509 trap `monkilled`. Not Open CMDQ_INT.
**Blocked:** none.
## 2026-08-26 — review D-1540–D-1548 (audit #1940)

**Objective:** C-fidelity review of nine `js/` SHAs since **500**;
cadence score. No `js/` edits.
**C locus:** `shk.c` `make_happy_shk`; `restore.c` `ghostfruit`;
themerms Light source; `set_mimic_sym` furnsyms; `that_is_a_mimic`;
`worm.c` `detect_wsegs` / `worm_known`; `dog.c` `tamedog`
`wake_nearto`; `pager.c` lookat fakeobj.
**JS locus:** reviews **501–509** (`53f71db1`…`9b53440e`).
**Change:** ACCEPT-WITH-DEBT 501–505, 507–508. QUALITY-RISK **506**
(`data === mons()` never holds). QUALITY-RISK **509** (trap
`monkilled` still `cansee(head)`). Must-fix prepended.
**Score:** **44**/44 Scr **11,405** RNG **792,838**
`39+0.32/turn` (R² 0.851) at `9b53440e`.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 501-509`.
**Next:** Must-fix 506 mndx/mnum. Then 509 trap `monkilled`.
**Blocked:** none.
## 2026-08-26 — D-1548 worm.c worm_known + _canseemon

**Objective:** Open `worm.c` `worm_known` (named). Not detect_wsegs.
**C locus:** `worm.c` `worm_known` `:877–893`; callers
`display.h` `_canseemon` `:117–120`; `mon.c` `monkilled` `:3384`.
**JS locus:** `js/worm.js` `worm_known`; `js/display.js`
`canseemon`; `js/mhitm.js` `monkilled`.
**Change:** Any wseg `cansee` (incl. dummy at head). `_canseemon`
uses it instead of head `cansee`/`infrared` when `wormno`.
`monkilled` same ternary. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **28**/28; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0012).
**Next:** Open `invent.c` canned CMDQ_INT. Not ALLOWCNT.
**Blocked:** none.
## 2026-08-26 — D-1547 pager.c lookat getpos fakeobj

**Objective:** Open `pager.c` getpos fakeobj (named). Not
that_is_a_mimic.
**C locus:** `pager.c` `lookat` `:716–717`; `look_at_object`
`:380–399`; `object_from_map` `:284–377`; caller `getpos.c`
`auto_describe`; producer `display.c` `map_object`.
**JS locus:** `js/display.js` `glyph_to_obj_at` / `map_object`;
`js/getpos.js` `auto_describe_text`; `js/pager.js` `brief_at`.
**Change:** Stored otyp on map_object; getpos/brief_at call
`look_at_object` when `glyph_to_obj_at` ≥ 0. Displayed monster
glyph returns −1 (gbuf). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **26**/26; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0012).
**Next:** Open `worm.c` `worm_known`. Not detect_wsegs.
**Blocked:** none.
## 2026-08-26 — D-1546 dog.c tamedog wake_nearto(mx,my,1)

**Objective:** Open `dog.c` `tamedog` `wake_nearto` (named). Not
is_covetous.
**C locus:** `dog.c` `tamedog` `:1159–1161`; callee `mon.c`
`wake_nearto_core` `:4374–4398`.
**JS locus:** `js/dog.js` `tamedog` (live `js/mon.js`
`wake_nearto`).
**Change:** Await `wake_nearto(mx,my,1)` when `msleeping` (wake_msg
+ STRAT_WAITMASK + disturb; distance==1 = mtmp cell). Not local
`msleeping=0`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `pager.c` getpos fakeobj. Not that_is_a_mimic.
**Blocked:** none.
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
