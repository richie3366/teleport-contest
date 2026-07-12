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

### Current public score — 2026-07-12

Measured with `node frozen/ps_test_runner.mjs sessions` (direct runner; no
frozen-file overlay):

| Metric | Value |
|--------|------:|
| Sessions passing | **4 / 44** |
| Screens matched | **179 / 11,405** (1.57%) |
| Positional RNG calls matched | **27,765 / 792,838** (3.50%) |
| Speed label | `14+0.02/turn` (R² 0.07) |
| Working-tree base | `8b71735` + committed port (see `main`) |
| Role-init throws | **29 / 44** (`u_init_role: role not ported`) |

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
| `seed0060-orc-rogue-kick-search` | **3064 / 3626** | 0 / 41 |
| `seed0013-rogue-friday13-combat` | **519 / 4838** | 1 / 59 |

seed8000 + seed0900 + seed1500 + seed1800 pass end-to-end. seed0060 clears
empty-space `#kick` (D-0031); first mismatch is C `distfleeck` `rn2(5)` @
2997 vs JS `rn2(4)`. seed0013 still breaks earlier in Lua/`sp_lev` map.

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

#### Primary foundation frontier — mklev corridor west of pet (seed0060 @ 2997)

**Code status:** empty-space `#kick` / `kick_dumb` cleared (D-0031).
Four public sessions pass end-to-end. D-0032 diagnosed: mismatch is not
`distfleeck` arity.

- **Bounded unit:** why JS has `CORR` along y=12 west of pet (`.....f@`)
  while C’s screen shows wall (`######f@`) at game `(22,12)`. That extra
  tile makes adjacent `appr=0` dog_move `mfndpos` cnt 4 vs C 3 → JS
  `rn2(4)` vs C post-move `distfleeck` `rn2(5)`.
- **C:** `mklev.c` `makecorridors` / `join` / `dig_corridor` (and any
  door/room attachment that should leave stone west of the alcove).
- **JS:** `js/mklev.js` same functions; dump/compare typ at `(18..24,12)`
  after levelgen vs C screen at kick turn.
- **Named omissions:** dokick monster/object/closed-door/SDOOR/furniture;
  `martial()`; wake/engraving side effects; `losehp`/`set_wounded_legs`
  bodies; other roles still throw; `dog_goal` gettrack/FARAWAY;
  `throw_gold`; eat getobj single-shot; Blind/`look_here`; trap glyphs;
  full `wall_angle`; `ini_inv_mkobj_filter`; `u_init_carry_attr_boost`;
  mfndpos `bad_rock` squeeze / boulder `ALLOW_ROCK`; …
- **Cohort:** green gate + seed1500 + seed1800 (must stay PASS) + strict
  lengths.
- **Alternate shared peel:** next unported role, or seed0013 Lua/`sp_lev`
  map.

Focused command:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0060-orc-rogue-kick-search.session.json
node scripts/rng-diff.mjs \
  sessions/seed0060-orc-rogue-kick-search.session.json
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

Next work is selected from the active objectives above using
`PORTING-RUNBOOK.md`, not by extending this historical list.

Historical root causes are in `DIVERGENCE-LOG.md`; loop chronology belongs in
`AGENT-LOOP-JOURNAL.md`. This file deliberately keeps only the compact
milestone list above.

### Religions banned (see Constitution)

Sparse boundary frames; test-alignment queues; new fastforward lists;
prebaked levels as the production Lua path.
