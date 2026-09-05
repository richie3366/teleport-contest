# Review 822 — e84fa9d3 — mkmaze.c makemaz Val-strt/loca/goal/fila/filb (D-1852)

## Metadata

- Full / short hash: `e84fa9d3f0de26dea37b553189b2c8603c022f78` / `e84fa9d3`
- Parent: `06749a3c` (loop --muse docs). Map-driven Open: Valkyrie quest 0/5 (`makemaz` blank-`create_maze` fallback).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 11:23:00 +0200
- D-id: **D-1852**
- Stats: `js/mklev.js` +461/−~5. `js/` insertions **461** >250. Band **80–450**.
- Claims to close: Val quest 5/5 loaders from the lua bodies. Does **not** claim corpus movement — "note hidden (no corpus session blocked on makemaz — map-driven row, same as D-1829/D-1830)".
- JS / map: `load_val_strt/loca/goal/fila/filb` / `load_special_proto` (+ `BANDED_MAIL`). `c-js-map/data.md`.

## Intent vs deliverable

Git subject promises: five `load_special` protos from `dat/Val-*.lua` (which exist in pinned upstream). The diff **does** add all five + proto dispatch + the Norn-mail const. Content comes from the lua files, not another fork. No unrelated subsystem.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_val_strt/loca/goal/fila/filb` | LIVE new (locals, 1st each) | lua bodies below |
| `load_special_proto` Val arms | LIVE dispatch | |
| `BANDED_MAIL` const | LIVE | Norn invent |
| `mktrap_seen_victim` / `splev_discard_default_minvent` / `create_drawbridge` / `light_region` / `lspo_replace_terrain_region` / `splev_create_*` / `wallification` / `flip_level_rnd` / `place_lregion` / `fixup_special` | pre-existing locals, reused | single copies; this commit writes no clone #2 |
| humidity `get_location`; `ensure_way_out`; map-drawn ICE icedpool | OMIT named | in this commit |
| flip-lregion remap | OMIT standing | `data.md:696` family row (see below) |

`node scripts/sym.mjs` confirms the Val-touched helpers resolve to their single established copies (`mklev.js:13901`, `:1886`, `:14874`, `:21317`, `:15103`, `lspo_replace_terrain_region` `:22731`). No deleted export. No cycle claim.

FORCE/DIAG/`getRngLog`/`fastforward` in diff: **none**. Hardcoded coords are lua map content (legitimate for content rows). Rule #2: clean.

## C ↔ JS fidelity

**Maps (byte-compared lua vs JS template).** `VAL_STRT_MAP` 20×76 EQUAL; `VAL_GOAL_MAP` 17×35 EQUAL; `VAL_LOCA_MAP` 13×40 equal modulo one row: lua row 7 has 3 trailing spaces, JS drops them — harmless by construction (`mapfrag_fromstr` pads short rows with `' '`, same `chr2typ`, same `wid`).

**Counts vs lua (all match).** strt: 13 pool sets + west/north/random grows, P-ring then L (`Val-strt.lua:21–33` order preserved), stairs/fountain/2 locked doors/Norn+2/Norn-mail/chest/8 warriors/6 fire/10 fixed ants/2 hostile giants/branch {66,17}. loca: 15 objects, 4 fire + 2 random traps, 17 ants + a + H + 7 giants + H in lua order; noflip honored. goal: chance-50 replace_terrain {44,09,46,11} L→. (helper adds origin internally — raw map-relative args correct), off-map up stair (45,10), 2 lava drawbridges, Orb (blessed +5 crystal ball "The Orb of Fate" @17,8) + 14 objects, 2 fixed board + 4 fire + 1 board + 2 random traps, Surtur + 4 ants + 2 a + 10 fixed + 2 random hostile giants + hostile H. fila: 9 obj / 5 ants / a / 1 hostile giant / 7 random traps. filb: 11 obj / 3 ants / a / 3 hostile giants / 5 fire + 2 random. No Bar-goal-style (review 789) count wrong.

**RNG order.** Pool set/grow → terrain → map → region → stairs → doors → invent → traps → monsters follows lua des order in every arm. Goal drawbridges: south `!rn2(2)` evaluated as the call argument at lua-`:42` position, then `percent(75)` open-else-`!rn2(2)` — matches `lspo_drawbridge :5720–5752` (`db_open = !rn2(2)`). `flip_level_rnd(3)` vs C default `allow_flips = 3` (`sp_lev.c:6344`); loca/fila/filb noflip skips like their lua flags.

**Known delta — flip-lregion (map debt, not new).** Val-strt places the branch `place_lregion(mx+66, my+17, …)` post-flip at pre-flip offsets. C stores origin-adjusted regions (`levregion_add` + `get_location`), **flips** them (`sp_lev.c:700–726`), then places (`mkmaze.c:606`). Same shortcut already shipped in Rog-strt/Kni-strt (reviews 799/800 ACCEPT-WITH-DEBT, "named flip-lregion omit") under the standing map row (`data.md:696` "flip_level lregion coord update deferred"). Consistent treatment: family map debt, not a Val Must-fix. Two nits: D-1852's Named bullet doesn't repeat the standing row, and the inline "(absolute; C leaves unflipped)" misstates C (only `SpLev_Map` is left unflipped) — comment-only, not behavioral.

**Callee closure.** Five quest arms, one `makemaz` family. Every callee LIVE or pre-existing local; `Is_special`/humidity/`ensure_way_out` named. No STUB in a live arm.

## Hallucinations / overclaim

None. "Not the lua maps, pool grow/drawbridge RNG order, Norn invent, Orb of Fate, or filler stock" correctly marks those shipped, not omitted. No corpus PASS claimed.

## Density

§2b: one quest family (5 protos, one `makemaz` locus), +461 for ~340 lines of lua content + JS calling convention. Same envelope as Kni/Rog 5/5. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify makemaz --base e84fa9d3~1` → **0 sessions blocked at baseline** — the D-log's "no corpus session blocked" is accurate and explicitly not presented as PASS (the tool itself warns "a vacuous verify is NOT a corpus PASS"). Map-driven row; public gates carry it: D-log cites green 2/2 + strict + cohort 7/7 + full 44/44 (shared file). Cadence re-checks at end of iteration.

## Actionable C-wrongs

None beyond standing map debt (flip-lregion row `data.md:696`, humidity `get_location`, `ensure_way_out` — all already queued/named, not re-filed).

Verdict: **ACCEPT-WITH-DEBT**
