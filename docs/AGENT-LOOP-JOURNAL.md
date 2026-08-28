# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-28 — D-1573 mon.c newcham Protection cancel / wormgone

**Objective:** Open `newcham` Protection cancel. Not set_mimic_sym
early-out.
**C locus:** `mon.c` `newcham` `:5276–5535`; `worm.c` `wormgone`
`:307–332`; youprop H||E uprops.
**JS locus:** rider/`mbirth_limit` live; cancel deferred.
**Change:** live uncancel + vampire cham; rogue `tryct>15`;
`set_mon_data`; `wormgone`+place_monster; light/`pm_invisible`/
hideunder; long-worm init; `check_gear_next_turn`. NC_SHOW_MSG /
`m_unleash` / ustuck / break-armor / Elbereth named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1960).
**Verified:** canary **23**/23; green+strict seed8000/0900;
cohort **7**/7 + strict; seed0013-rogue / seed0398 / seed4500.
**Next:** Open `unblock_point`/`dig_point`. Not block_point.
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
