# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1557 makemon.c set_mimic_sym block_point

**Objective:** Open `block_point`. Not DELPHI. Not Protection.
**C locus:** `makemon.c` `set_mimic_sym` `:2548–2549`;
`vision.c` `does_block` / `block_point` / `fill_point`.
**JS locus:** `js/makemon.js` tail; `js/vision.js` (was omit /
`_blocks`).
**Change:** Export `does_block`; port `fill_point`/`block_point`.
Not `recalc` (would unblock). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **29**/29; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open SEARCH/REGEN/XRAY conferral. Not cspfx.
**Blocked:** none.
## 2026-08-26 — D-1556 makemon.c set_mimic_sym DELPHI S_fountain

**Objective:** Open DELPHI `S_fountain`. Not furnsyms. Not
`block_point`.
**C locus:** `makemon.c` `set_mimic_sym` `:2450–2456`.
**JS locus:** `js/makemon.js` `set_mimic_sym` (was `appear=0`).
**Change:** Local `S_fountain=37`; DELPHI furniture uses it.
No new RNG. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `block_point`. Not DELPHI.
**Blocked:** none.
## 2026-08-26 — D-1555 do_name.c namefloorobj

**Objective:** Open `namefloorobj`. Not that_is_a_mimic.
**C locus:** `do_name.c` `namefloorobj` `:678–757` + `call_ok`.
**JS locus:** `js/do_name.js` `namefloorobj` (was Esc stub).
**Change:** getpos + vobj_at / object_from_map + Hallu unames +
call_ok/docall. iactions imports call_ok. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open DELPHI `S_fountain`. Not furnsyms.
**Blocked:** none.
## 2026-08-26 — D-1554 pager.c mhidden_description

**Objective:** Open `mhidden_description`. Not `namefloorobj`.
**C locus:** `pager.c` `mhidden_description` `:184–280`.
**JS locus:** `js/pager.js` `mhidden_description` + callers.
**Change:** Mimic/hider/region suffix; look/appear/probe/flash
wired. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `namefloorobj`. Not that_is_a_mimic.
**Blocked:** none.
## 2026-08-26 — D-1553 splev_create_monster amask dispatch

**Objective:** Open `splev_create_monster` RANDOM-only. Not mk_roamer.
**C locus:** `sp_lev.c` `sp_amask_to_amask` / `create_monster`.
**JS locus:** `js/mklev.js` `splev_create_monster`.
**Change:** Non-RANDOM → mk_roamer; RANDOM still makemon.
Room clones wrappers. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **22**/22; seed0367 FULL; green+strict
seed8000/0900; cohort **7**/7 + priest 0501/0106 + seed0360.
**Next:** Open `mhidden_description`. Not `namefloorobj`.
**Blocked:** none.
## 2026-08-26 — D-1552 obj.h is_plural Eyes + artidisco

**Objective:** Open Eyes `is_plural`. Not #altdip.
**C locus:** `obj.h` `is_plural`; `artifact.c` `undiscovered_artifact`.
**JS locus:** `js/objnam.js` `is_plural`/`otense`; `js/artifact.js`.
**Change:** Discovered Eyes are plural; identify writes artidisco.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1940).
**Verified:** canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `splev_create_monster` RANDOM-only. Not
`mhidden_description`.
**Blocked:** none.
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
