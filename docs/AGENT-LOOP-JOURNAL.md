# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — review D-1558–D-1566 (audit #1960)

**Objective:** C-fidelity review of nine `js/` SHAs since **518**;
cadence score. No `js/` edits.
**C locus:** artifact SEARCH/REGEN/XRAY; pickinv `&ctmp`;
`finish_splitting`; stash ALLOWCNT; `howmonseen`; `do_repeat`
CQ_REPEAT; `set_mimic_sym` Protection/fruit/Plan-B;
`place_monster` 2D; `rndmonst_adj` rogue/elem.
**JS locus:** reviews **519–527** (`599494b3`…`72735008`).
**Change:** ACCEPT-WITH-DEBT 519–527. No QUALITY-RISK. Must-fix
empty. Next Open `'r'` reversed. Filled archive D-1566 `%h`.
**Score:** **44**/44 Scr **11,405** RNG **792,838**
`38+0.31/turn` (R² 0.847) at `72735008`.
**Verified:** cadence `__RESULTS_JSON__`; `check-hot-docs --review 519-527`.
**Next:** Open `pickup.c` `'r'` reversed put-in then take-out. Not stash.
**Blocked:** none.
## 2026-08-28 — D-1566 makemon.c rndmonst_adj rogue/elem filters

**Objective:** Open `rndmonst_adj` rogue/elem filters. Not mkclass.
**C locus:** `makemon.c` `rndmonst_adj` `:1673–1686`; callees
`wrong_elem_type` `:55–75`, `is_home_elemental` `:32–50`.
**JS locus:** `js/makemon.js` (quest+Inhell live; upper/elem deferred).
**Change:** `upper=Is_rogue_level` `monsym_isupper`; `elemlevel`
`wrong_elem_type` (home elemental / swim / MR_FIRE / air).
newmonhp ×3 / grow_up / ndemon mkclass named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **21**/21; green+strict seed8000/0900;
cohort **7**/7 + seed0013-rogue + strict.
**Next:** Open `'r'` reversed put-in then take-out. Not stash.
**Blocked:** none.
## 2026-08-28 — D-1565 makemon.c clone_mon place_monster 2D grid

**Objective:** Open `clone_mon` `place_monster` 2D grid. Not HP split.
**C locus:** `steed.c` `place_monster` `:897–932`; caller
`makemon.c` `clone_mon` `:898` after HP split.
**JS locus:** `clone_mon` fmon+worm scan; mhitm mx/my clone;
`_level_monsters` worm-only.
**Change:** live `place_monster`/`remove_monster` in steed.js;
`clone_mon` writes the grid; gulpmm import; `level_mon_at`
(stale mx/my ignored). `cutworm` / makemon `place_monster`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `rndmonst_adj` rogue/elem. Not mkclass.
**Blocked:** none.
## 2026-08-28 — D-1564 makemon.c set_mimic_sym Protection / made_fruit / Plan-B

**Objective:** Open `set_mimic_sym` Protection early-out (+ consecutive
same-fn `made_fruit` + Plan-B). Not DELPHI. Not block_point.
**C locus:** `makemon.c` `set_mimic_sym` `:2401–2402` youprop H||E;
`:2516–2545` Plan-B + `flags.made_fruit`. Callee `can_be_hatched`.
**JS locus:** `js/makemon.js` (`!mtmp` only after D-1557).
**Change:** uprops early-out (no third named clone); `made_fruit`;
nocorpse/hatch/tin Plan-B. `place_monster` 2D named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **26**/26; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `clone_mon` `place_monster` 2D. Not HP split.
**Blocked:** none.
## 2026-08-28 — D-1563 cmd.c do_repeat / getobj CQ_REPEAT

**Objective:** Open getobj CQ_REPEAT / `in_doagain`. Not canned CMDQ_INT.
**C locus:** `invent.c` `getobj` `:2049–2054`; `cmd.c` `do_repeat`
`:1637–1660`; `cmdq_pop` `:409–420`; rhack `:3732–3740`.
**JS locus:** `getobj_apply_count` (record named); rhack canned-only
pop; Ctrl-A unknown.
**Change:** REPEAT INT+KEY record; `do_repeat`; `cmdq_pop` in_doagain;
Ctrl-A / `#repeat`. PREFIXCMD / movement / `cmdq_shift` named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **39**/39; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open Protection_from_shape_changers. Not DELPHI.
**Blocked:** none.
## 2026-08-28 — D-1562 vision.c howmonseen

**Objective:** Open `howmonseen`. Not worm_known.
**C locus:** `vision.c` `howmonseen` `:2151–2186`; callers
`apply.c` `use_mirror` `:1108`; `pager.c` `look_at_monster`
`:485–554`.
**JS locus:** `js/vision.js` (missing); apply NORMAL stub;
pager no monbuf.
**Change:** live bitmask + use_mirror SEENMON + look `[seen:]`.
cutworm / xray IN_SIGHT named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1950).
**Verified:** canary **11**/11; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `in_doagain`. Not canned CMDQ_INT.
**Blocked:** none.
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
