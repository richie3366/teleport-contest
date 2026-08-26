# Review 510 — 34013957 — detect.c map_monst / monster_detect long-worm mndx (D-1549)

## Metadata
- Full / short hash: `34013957b4d6743352906382b6ec5d41bbc62236` / `34013957`
- Parent: `729daadf` (audit D-1540–D-1548). This file audits **this SHA only** (first of nine `js/` commits since review **509**). Archive **Addressed:** D-1549 `34013957`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 11:40:52 +0200
- D-id: **D-1549**
- Stats: `js/detect.js` +17 / −7 (one JS file). Band 150–350 (js/ insertions **17**).
- Claims to close: Must-fix review **506** (`mtmp.data === mons(PM_LONG_WORM)` never true). Not `detect_wsegs` body. `reviews/loop-2026-08-15/` has no unpaid map_monst Must-fix.
- JS / map: `js/detect.js` `mtmp_is_long_worm` / `map_monst` / `monster_detect`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **506** QUALITY-RISK item 1 (identity gate). Review **509** trap `monkilled` is the **next** SHA.

## Intent vs deliverable

Git subject promises: long-worm detection compares `mndx`/`mnum`, not `mons()` pointer identity, so `detect_wsegs` actually runs.

Pinned C `detect.c` `map_monst` `:121–134`. Callers `monster_detect` `:834` TRUE; `do_vicinity_map` `:1531` FALSE. Extra class gate `monster_detect` `:831–833`. Callee `worm.c` `detect_wsegs` `:502–519` (D-1545, live body).

```121:134:nethack-c/upstream/src/detect.c
staticfn void
map_monst(struct monst *mtmp, boolean showtail)
{
    int glyph = (monsym(mtmp->data) == ' ')
                ? detected_mon_to_glyph(mtmp, newsym_rn2)
                : mtmp->mtame
                  ? pet_to_glyph(mtmp, newsym_rn2)
                  : mon_to_glyph(mtmp, newsym_rn2);
    show_glyph(mtmp->mx, mtmp->my, glyph);
    if (showtail && mtmp->data == &mons[PM_LONG_WORM])
        detect_wsegs(mtmp, 0);
}
```

```831:834:nethack-c/upstream/src/detect.c
            if (!mclass || mtmp->data->mlet == mclass
                || (mtmp->data == &mons[PM_LONG_WORM]
                    && mclass == S_WORM_TAIL))
                map_monst(mtmp, TRUE);
```

Old JS (D-1545): `if (showtail && mtmp.data === mons(PM_LONG_WORM))`. `mons()` allocates a **new** object (`monsters.js:198–223`); `makemon` stores the spawn-time `data` (`mnum: ptr.mndx`). Pointer identity never held. `detect_wsegs` was live and unreachable.

The diff **does** add `mtmp_is_long_worm` (`data.mndx ?? mnum` vs `PM_LONG_WORM`), wire both gates, drop the unused `mons` import, and export `map_monst`. It **does not** port head `pet_to_glyph` / `detected_mon_to_glyph`, cursed wake, blessed WIN_MAP, `howmonseen`, cutworm. Named. Vicinity still `map_monst(..., false)`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mtmp_is_long_worm` | C `:132` / `:832` identity, **LIVE this SHA** | not a C function name; JS stand-in for `&mons[PM_LONG_WORM]` |
| `map_monst` showtail | C `:132–133`, **LIVE this SHA** | gate now reachable |
| `monster_detect` S_WORM_TAIL | C `:832–833`, **LIVE this SHA** | same helper |
| `do_vicinity_map` FALSE | C `:1531`, **LIVE** | unchanged |
| `detect_wsegs` | C `:502`, **LIVE** | D-1545 body; this SHA only reaches it |
| `mons` import | **deleted** from detect.js | was the broken identity |
| head pet/detected glyphs | C `:124–129`, **OMIT named** | still `mon_glyph` |
| cursed-otmp wake | C `:836–839`, **OMIT named** | |
| `howmonseen` / cutworm | C, **OMIT named** | |

`node scripts/csym.mjs map_monst --sig` → `detect.c:121-134`. `--callers map_monst`: proto `:28`; `monster_detect` `:834`; `do_vicinity_map` `:1531`. `--callers monster_detect`: `detect.c:1347`; `fountain.c:353`; `potion.c:948`. `detect_wsegs --sig` → `worm.c:502-519`.

`node scripts/sym.mjs map_monst mtmp_is_long_worm detect_wsegs mons PM_LONG_WORM monster_detect do_vicinity_map`:

```
map_monst        js/detect.js:1107   sync
mtmp_is_long_worm NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/detect.js:1097
             => Do NOT write clone #2.
detect_wsegs     js/worm.js:285   sync
mons             js/monsters.js:198   sync
PM_LONG_WORM     NOT FOUND in js/** (no export, no local function/const).
monster_detect   js/detect.js:1128   ASYNC — await required
do_vicinity_map  js/detect.js:996   ASYNC — await required
```

**Re-point:** `mons` import **deleted** from `detect.js` (still the real export in `monsters.js`). `map_monst` newly **exported** (C is `staticfn` — extra export, not a second clone). `mtmp_is_long_worm` is one local helper; do **not** add clone #2. `PM_LONG_WORM` is `monsterNames.indexOf` at `detect.js:98` (same index as generated `PM_LONG_WORM_TAIL=330` minus one); not an export — `sym.mjs` “NOT FOUND” is the const, not a missing species.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No core RNG** in this SHA (C identity has none).

## C ↔ JS fidelity

Identity. C `&mons[PM_LONG_WORM]` is a static slot. JS `mons(n)` returns a **new** object every call with `mndx: n`. `makemon` stores `data: ptr` and `mnum: ptr.mndx`. `((mtmp.data?.mndx ?? mtmp.mnum) | 0) === PM_LONG_WORM` matches that slot by index. Baby long worm has a different `mndx` — **false**, like C. Dummy tail cells are not `fmon` heads. **Match `:132` and `:832`.**

`map_monst(true)`. Head still `mon_glyph` + `show_glyph_cell` (named vs pet/detected / space-monsym). Then `detect_wsegs(mtmp, false)` ≡ C `detect_wsegs(mtmp, 0)`. **Match the showtail arm.** Body segs skip dummy, `what_mon` once (D-1545). **Callee LIVE.**

`monster_detect`. `!mclass || mlet === mclass || (long-worm && mclass === 'S_WORM_TAIL')`. This port’s `mlet` strings are `'S_WORM'` / `'S_WORM_TAIL'`, not C `'w'` / `'~'`. **Pre-existing D-1545 string convention; the identity half of the extra arm is now LIVE.** Dead-monster / `isgd && !mx` skips **Match `:829–830`.** Cursed wake still commented. **Named.**

Vicinity. `map_monst(mtmp, false)` — no tails. **Match `:1531`.**

Callee closure (showtail arm). LIVE: `mtmp_is_long_worm`, `map_monst`, `detect_wsegs`, `show_glyph_cell`/`mon_glyph`. CLONE: none of a C function. OMIT named: head pet/detected, cursed wake. STUB: **none in the shipped arm.** Combined-arm rule: the arm may ship.

Exporting `map_monst` does not change C order. C `staticfn` vs JS export is not a C-wrong.

## Hallucinations / overclaim

Subject `mndx`/`mnum` so `detect_wsegs` runs: **true** of both production gates. Stamping **Addressed:** D-1549 on **506** is fair for the **identity** Must-fix, not a re-stamp of the `detect_wsegs` **body** (D-1545). Do **not** stamp “Match C `pet_to_glyph`.” Do **not** stamp “Match C cursed wake.” Do **not** stamp “Match C `howmonseen`.” This is **not** “dispatch ported, callee stubbed” — the callee was already LIVE and is now **reached**. Other `data === mons(...)` sites (`zap.js` long-worm still has a **belt-and-suspenders** ptr+mndx test; eat/priest/wizard/potion) are **not this SHA**.

## Density

+17 JS: Must-fix identity only. Did not glue trap `monkilled` (**509** → D-1550). §2b OK for Must-fix.

## Branch-by-branch confirm

1. Long-worm `data.mndx === PM_LONG_WORM`, `showtail` true: `detect_wsegs`. **Match.**
2. Same worm, `mnum` only (`data` missing mndx): fallback. **Match the slot.**
3. `mons(PM_LONG_WORM)` pointer vs stored `data`: inequality; helper still true via mndx. **Match C intent; not C’s `==`.**
4. Baby long worm: helper false; no tails. **Match.**
5. Vicinity FALSE: heads only. **Match.**
6. `mclass === 'S_WORM_TAIL'`: extra map of the head + tails. **Match `:832–834` under this port’s mlet strings.**
7. Head still plain `mon_glyph` (not pet/detected). **Named.**

## Callers / RNG ledger

C: `monster_detect` TRUE; vicinity FALSE; crystal-ball / fountain / potion callers unchanged. JS the same. Public-unhit until a session monster-detects a live long worm. No seed gate. No new `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Dropping `mons` from detect.js is the right cycle-avoidance; identity no longer needs it.

## Verification

D-log canary **21**/21 (C/JS grep; `mons()` ptr inequality; `map_monst(true)` paints body `~`; vicinity FALSE; mndx / mnum fallback; baby not long worm; S_WORM_TAIL class via mndx; no core RNG; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it. Canary that only constructs worms and calls `detect_wsegs` directly would have passed **before** this SHA; the D-log claims `map_monst(true)` paints `~`, which is the production path **506** said was unhit.

## Actionable C-wrongs

None for Must-fix. Named: head `pet_to_glyph` / `detected_mon_to_glyph`; cursed-otmp wake; blessed `display_nhwindow`; `unconstrain_map`; `howmonseen`; cutworm / `redraw_worm`. Other-module `data === mons()` leftover is not this SHA’s family.

Verdict: **ACCEPT-WITH-DEBT**
