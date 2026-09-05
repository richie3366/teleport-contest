# Review 826 — 3ca95421 — sp_lev.c lspo_replace_terrain bigrm-2 ice on darkness:grow() (D-1856)

## Metadata

- Full / short hash: `3ca954212685f8ccbdcb011437debdfbac323f0d` / `3ca95421`
- Parent: `5983e72d` (D-1855). Map-driven Open: 1 corpus blocked at `lspo_replace_terrain` (deferred ice arm; named omit in `data.md`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 11:46:08 +0200
- D-id: **D-1856**
- Stats: `js/mklev.js` +22/−2. `js/` insertions **22** — call-site-only; the callee helper predates (D-1821).
- Claims to close: the deferred `selection:grow` ice arm; restores ~900 downstream RNG calls. Claims 1 moved past (→ `dog_invent`).
- JS / map: `load_bigrm_2` darkness arms. `c-js-map/data.md` (omit retired).

## Intent vs deliverable

Git subject promises: build the darkness selection per choice arm, `selection_grow` (default all, like lua `:grow()`), then the existing `lspo_replace_terrain_sel(sel, ROOM, ICE, 100)`. The diff **does** exactly that. Nothing else.

C locus: `dat/bigrm-2.lua:32–54` (choice arms, unlit, percent-25 replace) + `sp_lev.c:5050–5143` selection arm.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| darkness per-choice arms | LIVE new call site | lua numbers verbatim (below) |
| `lspo_replace_terrain_sel` | pre-existing local (D-1821) | reused, not re-ported |
| `selection_fillrect` / `selection_or` / `selection_grow` | pre-existing locals | grow defaults `'all'` (`:21908–21922`) ≡ lua `:grow()` |
| noflip / `ensure_way_out` / solidify / premap | OMIT standing | in this commit ("none new") |

No deleted/re-pointed symbol. No cycle claim. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Arms.** lua choice 0: `(01,07,22,09)|(24,01,50,05)|(24,11,50,16)|(52,07,73,09)`; 1: `(24,01,50,16)`; 2: `(01,01,22,16)|(52,01,73,16)`; 3: nil → skip. JS arms use identical numbers; the local `unlit()` helper adds origin internally, so `unlit(1,7,22,9)` ≡ `selection_fillrect(xstart+1, …)` — "mirroring the unlit rects" verified cell-for-cell, not just claimed. `choice = lua_random2(0,3)` ≡ `math.random(0,3)`; `choice===3` falls out of the guard ≡ `darkness ~= nil` ✓. Order choice → unlit → percent(25) → replace → stairs matches lua `:34–56`.

**RNG.** `sp_lev.c:5125–5136`: x-outer y-inner over bounds, fromtyp match then `rn2(100) < chance` per cell — drawn even at chance 100. The D-1821 helper already ports that loop; this commit only supplies the missing selection. Selection construction burns no RNG, so the restored keystream is exactly the per-cell `rn2(100)`s — the falsifier's mechanism (C `rn2(100)=13` vs JS `rn2(75)=13` stair draw; geom-probe 50 differing cells; 17500 vs 16584 over 34 steps). The prior `percent(25)` was already burned in position. **Match.**

**Callee closure.** One call site; callee LIVE. No STUB in a live arm.

## Hallucinations / overclaim

None. "0 PASS, 1 moved past" is stated as PROGRESS, and the moved-to owner (`dog_invent` @34) is queued Open in the same commit rather than claimed. "~900 downstream RNG calls" is the D-log's measured delta (17500 vs 16584), not a rounded boast.

## Density

§2b: a deferred arm whose helper already existed — +22/−2 is the complete fix. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify lspo_replace_terrain --base 3ca95421~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (`tour-Barbarian-70011-d3-6-10-11-12` → `dog_invent` step 34, was 32). Exactly the D-log claim; the single baseline-blocked session accounted. D-log also cites green/strict/cohort/full 44/44; cadence re-checks at end of iteration.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
