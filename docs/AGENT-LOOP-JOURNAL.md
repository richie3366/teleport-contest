# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — D-1559 invent.c display_pickinv &ctmp

**Objective:** Open pickinv `&ctmp` menu count. Not CMDQ_INT.
**C locus:** `invent.c` `display_pickinv` `:3171–3172` /
`:3410–3411`; getobj `:1979–1998`; tty menu digits.
**JS locus:** `js/invent.js` (letter-only after D-1551);
ALLOWCNT throw/drop/wield/ready/charge/adjust.
**Change:** `out_cnt` + PICK_ONE count; n==1 `-1`;
`getobj_display_pickinv`. Not stash / finish_splitting.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `finish_splitting` / `unsplitobj`. Not CMDQ_INT.
**Blocked:** none.
## 2026-08-28 — D-1558 artifact.c SEARCH/REGEN/XRAY conferral

**Objective:** Open SEARCH/REGEN/XRAY conferral. Not cspfx. Not
Protection.
**C locus:** `artifact.c` `set_artifact_intrinsic` `:781–786` /
`:812–817` / `:859–866`; `worn.c` `setworn` Eyes W_TOOL.
**JS locus:** `js/artifact.js` (was omit after D-1539); `js/do_wear.js`
`setworn` (was oc_oprop only).
**Change:** ESearching / ERegeneration / `u.xray_range` 3/-1 +
`vision_full_recalc`. Wire `setworn`. Not Protection. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **33**/33; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `display_pickinv` `&ctmp`. Not CMDQ_INT.
**Blocked:** none.
## 2026-08-26 — review D-1549–D-1557 (audit #1950)

**Objective:** C-fidelity review of nine `js/` SHAs since **509**;
cadence score. No `js/` edits.
**C locus:** `detect.c` `map_monst` mndx; trap `monkilled`;
`invent.c` canned CMDQ_INT; Eyes `is_plural`; splev amask;
`mhidden_description`; `namefloorobj`; DELPHI `S_fountain`;
`set_mimic_sym` `does_block`/`block_point`.
**JS locus:** reviews **510–518** (`34013957`…`0f5e4df5`).
**Change:** ACCEPT-WITH-DEBT 510–518. No QUALITY-RISK. Must-fix
empty. D-log “no `m_at`” is occupancy-grid debt, not TDZ
(`imports --can` SAFE).
**Score:** **44**/44 Scr **11,405** RNG **792,838**
`36+0.31/turn` (R² 0.854) at `0f5e4df5`.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 510-518`.
**Next:** Open SEARCH/REGEN/XRAY conferral. Not cspfx.
**Blocked:** none.
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
