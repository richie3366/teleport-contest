# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-28 — D-1561 pickup.c stash getobj ALLOWCNT

**Objective:** Open stash getobj ALLOWCNT. Not CMDQ_INT.
**C locus:** `pickup.c` `use_container` `:3174–3185`; `stash_ok`
`:2956–2969`; `ck_bag` `:2719–2723`; `in_container` early-outs.
**JS locus:** `js/pickup.js` (ignored `'s'` after D-1559/D-1560);
`js/wield.js` `weldmsg`.
**Change:** ALLOWCNT stash getobj + `in_container` refusals/
unwield; refuse → `unsplitobj`. `'r'` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **26**/26; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `howmonseen`. Not worm_known.
**Blocked:** none.

## 2026-08-28 — D-1560 wield.c finish_splitting / unsplitobj

**Objective:** Open finish_splitting / unsplitobj. Not CMDQ_INT.
**C locus:** `wield.c` `finish_splitting` `:345–351`; `dowield` /
`doquiver_core`; `mkobj.c` `unsplitobj` `:554–622` /
`clear_splitobjs` `:625–629`; `invent.c` `freeinv` `:1402–1409`.
**JS locus:** `js/wield.js` (named omit after D-1530); `js/mkobj.js`;
export `freeinv` from `js/invent.js` (C home).
**Change:** getobj child own invlet; welded/already/gold unsplit;
ynq split-one/rest. `Shk_Your` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **52**/52; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open stash getobj ALLOWCNT. Not CMDQ_INT.
**Blocked:** none.

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
