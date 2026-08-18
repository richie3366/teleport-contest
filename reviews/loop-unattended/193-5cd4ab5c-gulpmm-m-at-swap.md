# Review 193 — 5cd4ab5c — mhitm.c gulpmm `m_at` swap + AT_ENGL (D-1231)

## Metadata
- Full / short hash: `5cd4ab5cee9ed2e762041b95c3297cab79406863` / `5cd4ab5c`
- Parent: `a3c04dd7` (D-1230). This file audits **this SHA only**. Archive row **Addressed:** D-1231 `5cd4ab5c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 22:02:18 +0200
- D-id: **D-1231**
- Stats: 10 files, +365 / −32 — `js/mhitm.js` +279 / −6; `js/mon.js` `m_at` +4.
- Claims to close: Open `mhitm.c` gulpmm `m_at` swap (named from D-1211 / D-1223 / review **173** / **185**). Not passivemm. `reviews/loop-2026-08-15/` has no unpaid gulpmm Must-fix.
- JS / map: `mhitm.js` gulpmm + AT_ENGL + swap in `mdamagem_monkilled`; `mon.js` `m_at` skips `MON_OFFMAP`. `c-js-map/data.md`. snuff_lit / `!goodpos` return-home / AD_DGST eat still named.
- Prior reviews this SHA claims to close: **173** gulpmm swap named; **185** item 1 (`mhitm.c:1075–1080`).

## Intent vs deliverable

Git subject promises: “Match C mhitm.c gulpmm m_at swap so a mon-vs-mon engulf re-places the defender before monkilled, instead of leaving the aggressor as the map occupant.”

C after `mdef->mhp < 1` (`mhitm.c:1075–1080`): if `m_at(mdef)==magr` (gulpmm left magr on the cell), `remove_monster`; `mhp=1`; `place_monster(mdef)`; `mhp=0`; then troll_baned/zombify/`monkilled`. `gulpmm` (`:849–967`) occupancy: defender off the **grid** (still in `fmon` at mx,my); magr onto defender cell; `mdamagem`; then both-dead / def-dead / agr-dead / both-alive restore. Dispatch: `mattackm` AT_ENGL (`:510–536`).

Old JS: AT_ENGL fell through to default miss; helper named the swap as omit.

The diff **does** gulpmm occupancy, the swap before the existing D-1223 wrap, AT_ENGL shade/usteed/`distmin`/`engulfing_u`/`failed_grab`, and `m_at` skipping `MON_OFFMAP`. It does **not** pull snuff_lit, `!goodpos` inhospitable dest return-home, or AD_DGST `mhitm_ad_dgst` / post-`monkilled` eat. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mdamagem` swap | C `:1075–1080`, **wired** | before live troll_baned/zombify |
| `gulpmm` | C `:849–967`, **new** | occupancy + restore |
| `engulf_target` | C `:807–844`, **clone** | mon-vs-mon; youmonst Passes_walls in gulpmu |
| `engulf_blocked` | C bars/door/tree, **clone** | whirly ptr: magr on def cell, mdef on agr cell |
| `failed_grab` | C `:597–639`, **clone** | no RNG; `some_mon_nam` tail named |
| `remove_monster` / `place_monster` | C `rm.h` / `steed.c:898–932`, **clone** | `MON_OFFMAP` stand-in for empty grid |
| `m_at` skip OFFMAP | JS occupancy, **new** | C grid is empty; mx/my unchanged |
| `digests` / `enfolds` | C `mondata.h:71–74`, **clone** | AT_ENGL+AD_DGST / AD_WRAP |
| `s_suffix_mm` / `closed_door_mm` | C callees, **clone** | avoid import cycles |
| `mattackm` AT_ENGL | C `:510–536`, **wired** | `rnd(20+i)` same as C |
| `mdamagem` / `monkilled` | C callee, **already live** | PHYS+POLY; AD_DGST eat named |
| `minliquid` / `mintrap` | C after def-died, **imported** | |
| `snuff_lit` minvent | C `:868–871`, **named omit** | no RNG in C `snuff_lit` |
| `!goodpos` return-home | C `:932–938`, **named omit** | |
| AD_DGST eat | C `mhitm_ad_dgst` + `:1096+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. New RNG: AT_ENGL `rnd(20+i)` in C order (same as other `mattackm` melee).

## C ↔ JS fidelity

Pinned C occupancy (`mhitm.c:899–905` + `:1075–1080`):

```
    remove_monster(dx, dy);
    remove_monster(ax, ay);
    place_monster(magr, dx, dy);
        if (m_at(mdef->mx, mdef->my) == magr) { /* see gulpmm() */
            remove_monster(mdef->mx, mdef->my);
            mdef->mhp = 1;
            place_monster(mdef, mdef->mx, mdef->my);
            mdef->mhp = 0;
        }
```

C `remove_monster` clears `level.monsters[][]` only (`rm.h:526–534`); it does **not** set `MON_OFFMAP`. JS heads live on `fmon` mx/my (`_level_monsters` is worm segs). Local `remove_monster` ORs `MON_OFFMAP`; `place_monster` sets `MON_FLOOR` + mx/my. `m_at` skips that bit. After gulpmm, magr is FLOOR at dest; mdef is OFFMAP at dest. After the swap, magr is OFFMAP; gulpmm def-died arm re-`place_monster`s magr when `m_at !== magr` (C `:939–941` without the goodpos redirect). **Stand-in, not a stub that no-ops `monkilled`.** Corpse coords follow mdef.mx/my.

AT_ENGL: shade futile; usteed skip; `distmin>1` continue; `engulfing_u` miss; else `tmp > rnd(20+i)` then `failed_grab` / `gulpmm` else `missmm`. JS same order. `_mm_vis` is set at `mattackm` entry like `gv.vis`.

`engulf_target` size/whirly/trap + blocked dest/src: JS passes `magr.data` then `mdef.data` as the whirly ptr — matches C `!is_whirly(magr)` on def cell and `!is_whirly(mdef)` on agr cell. youmonst `Passes_walls` / `u.ux` arms omitted (gulpmm is mon-vs-mon only; hero gulpum is elsewhere). Named.

AD_DGST: C `mhitm_ad_dgst` sets `damage = mdef->mhp` (instant) then post-`monkilled` cham/slime/wraith. JS `mdamagem` still PHYS+POLY dice. **Named omit**, not a Must-fix finish of `mdamagem` (review **185** already said so). snuff_lit has no `rn2`.

## Hallucinations / overclaim

Subject + D-1231 say the swap so `monkilled`/`relmon` sees the defender. **Occupancy + AT_ENGL dispatch + live `mdamagem` are the hunk.** Stamping **Addressed:** D-1231 is fair. Do **not** stamp “Match C `snuff_lit`” or “Match C AD_DGST Burrrrp.” `MON_OFFMAP` is a JS grid stand-in; C does not set that bit at this locus (comment says so).

## Density

C gulpmm + the AT_ENGL case C actually calls + the swap site. ~279 JS lines in one module. Upper bound of §2b; still one caller/callee cluster, not half of `mon.c`. Did not glue passivemm or uhitm troll_baned.

## Branch-by-branch confirm

1. AT_ENGL miss `rnd(20+i)`: `missmm`. Match.
2. Shade: futile pline, no gulpmm. Match.
3. Usteed defender: miss. Match.
4. `distmin>1`: continue. Match.
5. `engulfing_u(magr)`: strike 0. Match.
6. `failed_grab` unsolid/notonhead: no gulpmm. Match (no RNG).
7. Size ≥ MZ_HUGE / bigger non-whirly: `M_ATTK_MISS`. Match.
8. Either trapped: miss. Match.
9. Bars: whirly ptr as C. Match.
10. Occupancy then `mdamagem`: swap if magr is occupant. Match intent.
11. Both alive: restore agr old / def dest. Match.
12. Def died: minliquid/mintrap; skip goodpos home. **Named.**
13. Vampshifter `newcham`: bypass `mdamagem`. `newcham` imported live.
14. Digest eat / snuff_lit: **named.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `MON_OFFMAP` is `monst.h:59`, not a map cell.

## Verification

Journal: private canary **38**/38 (C sites; OFFMAP `m_at`; shade/trap/huge/bars/ghost/usteed/far; both-alive restore; digest-kill magr occupies dest); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless public mon-vs-mon engulf. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. The swap is real; `monkilled` is live. `MON_OFFMAP` is a documented occupancy stand-in, not a silent no-op of the death path.

Named omits (map, not Must-fix):

1. `snuff_lit` minvent unless flaming
2. `!goodpos(…, MM_IGNOREWATER)` return-home
3. AD_DGST `mhitm_ad_dgst` + post-`monkilled` cham/slime/wraith/nurse/`mon_givit`
4. `some_mon_nam` tail wording; youmonst `Passes_walls` in `engulf_target`
5. passivemm shock `monkilled`

Do not Must-fix “import steed.c `place_monster`.” Do not skip the swap before troll_baned.

## Callers / RNG ledger

C `gulpmm` callers: `mattackm` AT_ENGL only. JS same. New `rnd(20+i)` on that case (C). `failed_grab` / occupancy / swap: no RNG. Public fortress is not evidence a purple worm swallowed another mon.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon engulf now occupies like C and re-places the defender before live `monkilled`; snuff_lit, inhospitable return-home, and AD_DGST eat stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1231 `5cd4ab5c`.
