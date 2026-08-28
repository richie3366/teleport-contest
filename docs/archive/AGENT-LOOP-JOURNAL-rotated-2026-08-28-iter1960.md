# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
