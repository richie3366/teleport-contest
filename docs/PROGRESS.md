# Progress log

## Setup complete — 2026-07-12

### Docs

| Doc | Purpose |
|-----|---------|
| `CONSTITUTION.md` | Non-negotiable rules (also mirrored in `.cursor/rules/`) |
| `PORTING-RUNBOOK.md` | Operational iteration protocol and verification gates |
| `PROGRESS.md` | Baseline score + next mile |
| `NOTES.md` | Live scratchpad: hypotheses, dead ends, landmarks (not history) |
| `C-JS-MAP.md` | Structural coverage and explicit omissions |
| `DIVERGENCE-LOG.md` | Evidence-backed root causes and rejected hypotheses |
| `PORTING-STRATEGY.md` | Longer approach map |
| `GROK-PLAYBOOK.md` | Loop-agent priority, anti-patterns, verification |
| `AUDIT-ROADMAP.md` | Consolidated audit priorities (human/supervisor) |

Cursor always-on rules: `.cursor/rules/teleport-constitution.mdc`,
`.cursor/rules/agent-notes.mdc`.
JS editing rule: `.cursor/rules/js-port.mdc` (`js/**`).

### Initial baseline (historical, `8b71735`)

| Metric | Value |
|--------|------:|
| Sessions passing | **0 / 44** |
| Screens matched | **15 / 11,405** (0.13%) |
| RNG calls matched | **25,429 / 792,838** (3.21%) |
| Speed label | `9+0.06/turn` (R² 0.984) |
| Commit | `8b71735` |

### Current public score — 2026-07-13

Measured with `node frozen/ps_test_runner.mjs sessions` (direct runner; no
frozen-file overlay):

| Metric | Value |
|--------|------:|
| Sessions passing | **5 / 44** |
| Screens matched | **290 / 11,405** (2.54%) |
| Positional RNG calls matched | **85,042 / 792,838** (10.73%) |
| Speed label | `16+0.09/turn` (R² 0.912) |
| Working-tree base | `8b71735` + committed port (see `main`) |
| Role-init throws | **0 / 44** (`u_init_role: role not ported`) |

The RNG aggregate can decrease while the port improves if a former fake path
is replaced or more sessions execute farther. Use first divergence, screens,
shared blockers, and semantic coverage together—not one vanity metric.

**Best sessions today:**

| Session | RNG | Screen |
|---------|----:|-------:|
| `seed8000-tourist-starter` | **3130 / 3130** | **23 / 23** |
| `seed0900-tourist-explore-actions` | **2983 / 2983** | **84 / 84** |
| `seed1500-rogue-explore-move` | **2768 / 2768** | **40 / 40** |
| `seed1800-tourist-eat-throw` | **2458 / 2458** | **26 / 26** |
| `seed0060-orc-rogue-kick-search` | **3626 / 3626** | **41 / 41** |
| `seed1150-caveman-explore-move` | **2942 / 3137** | **22 / 51** |
| `seed0700-samurai-explore-descend` | **2769 / 3230** | 1 / 51 |
| `seed0103-knight-ride-pony` | **2344 / 2640** | 1 / 60 |
| `seed0200-monk-north-search` | **1545 / 3822** | 0 / 40 |
| `seed0101-ranger-quiver-throw-travel-engrave` | **2304 / 2371** | 3 / 27 |
| `seed0016-healer-newmoon-eat-zap` | **2538 / 3656** | **5 / 36** |
| `seed0017-samurai-altar-pray` | **2788 / 3465** | 1 / 67 |
| `seed0107-samurai-twoweapon-enhance` | **2681 / 2902** | 0 / 98 |
| `seed0104-knight-ride-combat` | **2401 / 3223** | 1 / 43 |
| `seed0106-priest-extcmd-sweep` | **2576 / 4194** | 1 / 267 |
| `seed2200-wizard-quaff-zap-read` | **2772 / 3018** | 1 / 230 |
| `seed0361-archeologist-tour` | **2942 / 53865** | 0 / 366 |
| `seed0373-barbarian-quest-tour` | **2582 / 35386** | 0 / 124 |
| `seed0105-valk-chat-lamp-ration` | **987 / 2499** | 0 / 30 |
| `seed0102-ranger-name-cancel` | **1285 / 4485** | 1 / 25 |
| `seed0015-valk-level2-pit-dog-wait` | **364 / 8563** | 1 / 44 |
| `seed0013-rogue-friday13-combat` | **521 / 4838** | 1 / 59 |
| `seed0030-ten-diverse-deaths` | **6658 / 105529** | **35 / 1953** |

seed8000 + seed0900 + seed1500 + seed1800 + seed0060 pass end-to-end.
`choose_trapnote`/`hole_destination` (D-0054), `SPBOOK_no_NOVEL`
(D-0055), and roles `initrecord` (D-0056) clear shared peels. seed0700
next `rndmonst_adj` @ 1888; seed0103 next `next_ident`/`trquan` @ 2337.
Wizard seed2200 next `exercise` @ 2724; Healer seed0016 next
`next_ident` @ 2493; Caveman seed1150 next `dog_move` @ 2915;
Barbarian seed0373 next `newhp` @ 2512; seed0030 next `rnl`/`doopen`
@ 6305. Priest seed0501 still `wipeout_text`. seed0015/0200 next
`lspo_map`. seed0101 next `next_ident`; seed0102 next `rndmonst_adj`.
seed0013 still breaks earlier in Lua/`sp_lev`. Archeologist seed0361
next `rndmonst_adj` @ 1432.

### Green gate

Every shared-code iteration must preserve:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact scored-output lengths.

### Active objectives

**Iteration priority:** work the **primary foundation** slice below unless it is
complete or blocked on a prerequisite you document with a falsifier. The
seed1800 deep canary (`D-0006`) is **parked** — do not implement pet-movement
fixes until C state/candidate capture exists (`GROK-PLAYBOOK.md` §2).

#### Primary foundation frontier — shared mklev / moveloop peels

**Code status:** `choose_trapnote`/`hole_destination` (D-0054) +
`mkobj(SPBOOK_no_NOVEL)` (D-0055) + roles `initrecord` (D-0056)
**ported**. Five public sessions still pass end-to-end. **0/44**
throw at `u_init_role`.

- **Bounded unit:** seed0700 `rndmonst_adj` / seed0103
  `next_ident`/`trquan` / seed2200 `exercise` / seed0016 `next_ident` /
  seed1150 `dog_move` / seed0373 `newhp` / seed0030 `rnl`/`doopen` /
  seed0501/0105 `wipeout_text` / seed0015/0200 `lspo_map` / seed0101
  `next_ident` / seed0102 `rndmonst_adj` / seed0361 `rndmonst_adj`.
- **Prefer:** highest-leverage shared mklev/moveloop peel over polishing
  one late path. `rndmonst_adj` weight arity (likely `align_shift`)
  hits seed0700/0102/0361.
- **Named omissions:** Wizard/Priest/Healer `initialspell`; Knight/
  Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/Caveman
  `skill_init`; display-path Japanese names; full `role_init` beyond
  pantheon/SPE_LIGHT/nemesis gender; `make_corpse` after
  `corpse_chance`; dokick monster/object/closed-door/SDOOR/furniture;
  `martial()`; wake/engraving; `set_wounded_legs` body; `showdamage`/
  death `done`; Upolyd eel `regen_hp` loss; `regen_pw`/Teleport/Poly
  once-per-turn; `dog_goal` gettrack/FARAWAY; `throw_gold`; eat getobj
  single-shot; Blind/`look_here`; trap glyphs; hallucination/
  `see_objects`; `u_init_carry_attr_boost`; mfndpos `bad_rock` squeeze;
  Sokoban push-avoid; `donull` `cmd_safety_prevention`; dog_move
  `mtrack` skip; `makemon` Sokoban `throws_rocks`; `m_initinv` body;
  `set_malign`; telepathy/`Detect_monsters`/`MATCH_WARN_OF_MON` in
  `newsym`; full `set_uasmon`/uprops; full `weapon_insight` enhance/
  P_SKILL/odd P_NAME; shop `costly_spot` autopickup; `obj_typename`
  armor pair-of/set-of + GemStone; MLET_CH beyond early subset;
  `align_shift`/`temperature_shift`; `peace_minded` MS_*/race_*/minion
  arms; …
- **Cohort:** green gate + seed1500 + seed1800 + seed0060 (must stay
  PASS) + strict lengths; Caveman focus seed1150 when on that peel.

Focused survey:

```bash
node frozen/ps_test_runner.mjs sessions 2>&1 | rg 'role not ported|PASS|FAIL' | head -40
```

#### Deep canary frontier — seed1800 pet movement

- seed1800 now **PASS** (RNG 2458/2458, Scr 26/26). D-0006 pet-movement
  state capture remains parked until a recorder exists — do not implement
  from `rng-diff` alone.
- Evidence and rejected hypotheses: `DIVERGENCE-LOG.md` D-0006.

### Structural status

Module status, constitutional debt, and named omissions live in
`C-JS-MAP.md`. This file keeps only measured progress and active objectives.

### Completed foundation miles

1. `scripts/rng-diff`
2. Real `o_init`; removed matching replay burns
3. Real fill/mineralize; removed matching replay burns
4. Tourist `u_init`/attributes and move-loop preamble
5. Basic move loop / monster turns
6. Tourist inventory/look/discovery screens
7. Dungeon topology scaffold and startup pet paths
8. seed0900 pet combat, blocking messages, menus, and screen parity
9. seed1500 Rogue invent/disco/^X screens (D-0024) — session PASS
10. seed1800 getobj throw `$` + missing-letter `--More--` loop (D-0025) —
    Scr 12→24
11. seed1800 legacy corner map + look `:` staircase (D-0026) — session PASS
12. seed0060 orc `u_init_race` / `Xtra_food` + `inv_subs` (D-0027) —
    init cleared; next was `splitobj` @ 2476
13. seed0060 `dog_invent` `splitobj` / `next_ident` (D-0028) — mismatch
    2476→2643; next `relobj` / `dog_has_minvent`
14. seed0060 `relobj` / `mdrop_obj` pet drop (D-0029) — mismatch
    2643→2663; next post-drop `dog_goal` APPORT gate
15. seed0060 `dog_goal` real `couldsee` (D-0030) — mismatch
    2663→2979; next C `exercise` vs JS `distfleeck`
16. seed0060 `#kick` / `kick_dumb` (D-0031) — mismatch 2979→2997;
    next C `distfleeck` `rn2(5)` vs JS `rn2(4)`
17. seed0060 `m_avoid_kicked_loc` (D-0032) — mismatch 2997→3016;
    next C `distfleeck` `rn2(5)` vs JS `rn2(2)`
18. seed0060 `.` / `donull` (D-0033) — mismatch 3016→3105;
    next C `makemon_rnd_goodpos` vs JS stub/`dosounds`
19. seed0060 `makemon(NULL,0,0)` / `makemon_rnd_goodpos` (D-0034) —
    mismatch 3105→3536; next C `regen_hp` vs JS `dosounds`
20. seed0060 `losehp` + `regen_hp` (D-0035) — RNG **3626/3626**; next
    screen idx 0 cells (legacy/botl)
21. seed0060 orc `hpadv` + `mon_glyph` mcolors (D-0036) — Scr **0→5**/41;
    next idx 5 (gold `doname` + death `newsym`)
22. seed0060 gold `doname` + `mondied` `newsym` (D-0037) — Scr **5→6**/41;
    next idx 6+ (drop re-pickup pline / premature wall `┌`)
23. seed0060 cansee invent pline + `wall_angle`/`set_wall_state` +
    downstairs `>` NO_COLOR (D-0038) — Scr **6→37**/41; next idx 22
    (pet `f` vs `#`)
24. seed0060 orc infravision `newsym` + `postmov` newsym (D-0039) —
    Scr **37→38**/41; next idx 33 (disco UI)
25. seed0060 disco `OBJ_DESCR`/`obj_typename` (D-0040) — Scr **38→39**/41;
    next idx 35 (^X enlightenment)
26. seed0060 ^X enlightenment autopickup/limits/`weapon_descr` (D-0041)
    — Scr **39→41**/41; session **PASS**; public **5/44**
27. Wizard `u_init_role` + `ini_inv_mkobj_filter` + Dark One gender
    (D-0042) — role throws **29→20**/44; screens **220→239**; RNG
    **28511→44848**; seed2200 next `choose_trapnote` @ 1283
28. Priest `u_init_role` + pantheon `randrole` + `Skill_P` + shield
    (D-0043) — role throws **20→17**/44; screens **239→240**; RNG
    **44848→50470**; seed0501 next `wipeout_text` @ 1153
29. Knight `u_init_role` + knows_class + helm/gloves + HJumping
    (D-0044) — role throws **17→13**/44; screens **240→243**; RNG
    **50470→58004**; seed0103 next `mkclass_aligned` @ 1185
30. Samurai `u_init_role` + Japanese discovery + ammo quiver
    (D-0045) — role throws **13→10**/44; screens **243→245**; RNG
    **58004→65208**; seed0700 next `mkclass_aligned` @ 1718
31. Healer `u_init_role` + gold `rn1` + Lamp + `POT_FULL_HEALING`
    (D-0046) — role throws **10→8**/44; screens **245→251**; RNG
    **65208→67533**; seed0016 next `hole_destination` @ 1341;
    seed0030 next `choose_trapnote` @ 5127
32. Valkyrie `u_init_role` + Lamp + weapon/armor `knows_class`
    (D-0047) — role throws **8→6**/44; screens **251→252**; RNG
    **67533→68885**; seed0015 next `lspo_map` @ 337; seed0105 next
    `wipeout_text` @ 974
33. Ranger `u_init_role` + launcher/ammo/spear `knows_class`
    (D-0048) — role throws **6→4**/44; screens **252→256**; RNG
    **68885→72474**; seed0101 next `next_ident` @ 2293; seed0102 next
    `rndmonst_adj` @ 1281
34. Monk `u_init_role` + spellbook RNG + armor `knows_class`
    (D-0049) — role throws **4→3**/44; screens **256**; RNG
    **72474→74019**; seed0200 next `lspo_map` @ 377
35. Archeologist `u_init_role` + tin opener/lamp/marker + SACK/
    TOUCHSTONE knows (D-0050) — role throws **3→2**/44; screens
    **256**; RNG **74019→76497**; seed0361 next `hole_destination` @
    1280
36. Barbarian `u_init_role` + kit RNG + Lamp + weapon/armor
    `knows_class` (D-0051) — role throws **2→1**/44; screens **256**;
    RNG **76497→78774**; seed0373 next `choose_trapnote` @ 1327
37. Caveman `u_init_role` + `Cave_man[]` + FLINT/ROCK quiver +
    graystone quan (D-0052) — role throws **1→0**/44; screens
    **256→278**; RNG **78774→81711**; seed1150 next GEM `rnd_class`
    sum @ 1118
38. `mkclass`/`mkclass_aligned` + Wizard `LVL(..., A_NONE)` extractor
    (D-0053) — screens **278→279**; RNG **81711→82967**; seed0700
    prefix **1718→1888** (`rndmonst_adj`); seed0103 **1185→2337**
    (`next_ident`/`trquan`)
39. `maketrap` `choose_trapnote` + `hole_destination` (D-0054) —
    screens **279→290**; RNG **82967→85043**; seed2200 prefix
    **1283→2724**; seed0016 **1341→2493**; seed0361 **1280→1432**
40. `mkobj(SPBOOK_no_NOVEL)` → `rnd_class`…`SPE_BLANK_PAPER` (D-0055)
    — clears misread “GEM 999”; seed1150 prefix **1118→2301**;
    seed0030 **5127→6305**; seed0373 **1327→2512**
41. roles[] `initrecord` Caveman/Valkyrie/Rogue match C (D-0056) —
    seed1150 prefix **2301→2915** (`dog_move`); positional
    **2941→2942**; Rogue seed0013 **519→521**; aggregate RNG
    **85043→85042** (Valkyrie fake record retired)

Next work is selected from the active objectives above using
`PORTING-RUNBOOK.md`, not by extending this historical list.

Historical root causes are in `DIVERGENCE-LOG.md`; loop chronology belongs in
`AGENT-LOOP-JOURNAL.md`. This file deliberately keeps only the compact
milestone list above.

### Religions banned (see Constitution)

Sparse boundary frames; test-alignment queues; new fastforward lists;
prebaked levels as the production Lua path.
