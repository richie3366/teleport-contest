# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
