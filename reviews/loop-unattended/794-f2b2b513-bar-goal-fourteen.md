# Review 794 — f2b2b513 — dat/Bar-goal.lua fourteen empty des.object (D-1824)

## Metadata
- Full / short hash: `f2b2b5134284185bb63432e0998e8c1ae9684e9a` / `f2b2b513`
- Parent: `eeda442c` (audit 784–793). Must-fix from review **789** QUALITY-RISK.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 21:15:24 +0200
- D-id: **D-1824**
- Stats: `js/mklev.js` +2/−2. `js/` insertions **2** ≤250. Band **80–350**. Must-fix stays one item (§2b).
- Claims to close: review **789** — fourteen `des.object()` after the Heart, not Wiz-goal’s 15. Not traps / monsters / Heart.
- JS / map: `js/mklev.js` `load_bar_goal` loop bound only. Archive **Addressed:** D-1824 `f2b2b513`. Review 789 already stamped.

## Intent vs deliverable

Git subject promises: `load_bar_goal` looped 15 extra `splev_create_object` / `mkobj_at`; loop bound 14 matching lua `:44–57`.

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `--callers makemaz`: `mklev.c:1270/1272/1274/1285/1289`. `create_object` `sp_lev.c:2192–2440`; `--callers create_object`: `sp_lev.c:3735` (`lspo_object`). Empty `des.object()` is `!c` → `mkobj_at(RANDOM_CLASS, x, y, !named)` (`:2209–2210`).

Pinned `dat/Bar-goal.lua:44–57` is fourteen bare `des.object()` after the named Heart (`:43`). The diff **does** change only the loop bound `15` → `14` and the comment. Heart, six traps, Thoth Amon / ogre / O / rock troll / T counts unchanged.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_bar_goal` | LIVE repaired | bound only; no new helpers |
| `splev_create_object` | LIVE unchanged | empty `create_object` path |
| `create_object` (named Heart) | LIVE unchanged | luckstone + bless + name |
| `barGoalDoor` | CLONE unchanged | `sel_set_door`; not this peel |
| humidity `get_location` | OMIT named | already on the map from D-1819 |
| `spo_end_moninvent` / `G_UNIQ` | OMIT named | same |

`node scripts/sym.mjs` (no clone→import; bound only):

```
load_bar_goal    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:7276
             => Do NOT write clone #2.
splev_create_object NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:14237
             => Do NOT write clone #2.
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2: `node scripts/imports.mjs --rulecheck` → clean.

## C ↔ JS fidelity

**Count.** lua `:44–57` = 14. HEAD `load_bar_goal` `:7368–7369` `for (let i = 0; i < 14; i++) splev_create_object(null)`. Parent was `< 15`. **Match the lua arity.**

**Empty-object RNG.** C `create_object` `:2209–2210` `mkobj_at(RANDOM_CLASS, …, !named)` with `named` false. JS `splev_create_object` `:14237–14241` `get_location_random` then `mkobj_at(RANDOM_CLASS, pos.x, pos.y, true)`. One `mkobj_at` per empty `des.object()`. Fourteen calls, not fifteen. No extra `rn2`/`rnd` in this peel.

**Out of envelope.** Heart `create_object` named (`:7357–7366`), traps ×6, monster counts, `sp_amask_to_amask(AM_SPLEV_NONCO)`, `wallify_map` bounds — not touched. Review 789 already walked those against C.

**Callee closure.** One Must-fix arithmetic. Empty-object arm stays LIVE (`splev_create_object` → `mkobj_at`). No STUB in the shipped loop.

## Hallucinations / overclaim

Subject / D-log “fourteen” matches the lua. Do **not** stamp humidity / `m_dowear` / `G_UNIQ` as shipped. Public 44/44 does not walk Bar-goal and does not prove the count; the lua listing does.

## Density

§2b: Must-fix one item, alone. +2 JS. Correct size for a loop-bound C-wrong.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base f2b2b513~1` → `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)` / `no corpus session is blocked on it at f2b2b513~1`. The Must-fix row cited a **count**, not N corpus blocks — vacuous-as-corpus is expected; the falsifier is lua `:44–57` vs the loop. D-log green + cohort + full 44/44. Cadence this iter: 44/44.

## Actionable C-wrongs

None. Review 789 item 1 is shipped. Remaining named omits stay on `c-js-map/data.md`.

Verdict: **ACCEPT**
