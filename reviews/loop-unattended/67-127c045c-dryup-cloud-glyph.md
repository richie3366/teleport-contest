# Review 67 — 127c045c — `dryup` cansee cloud-glyph skip (D-1106)

## Metadata
- Full / short hash: `127c045c5cab33829620ef4e0896c370aa3e73ed` / `127c045c`
- Parent: `b4930cb9` (D-1105). This file audits **this SHA only**. This review commit fills D-1108 archive hash `62b93acb` (chicken-egg on that fix SHA). Filled D-1105 hash was already `b4930cb9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 21:04:53 +0200
- D-id: **D-1106**
- Stats: 10 files, +132 / −52 — `js/fountain.js` +29 / −6 (`glyph_at_cmap_is_s_cloud` + `cansee && !skip` gate).
- Claims to close: Open queue `fountain.c` `dryup` cansee cloud-glyph skip of dryup pline (named). Not angry_guards. Stamped **Addressed:** D-1106 `127c045c` on the archive row (filled by D-1107). Review **65** named omit 2. `reviews/loop-2026-08-15/` has no open cloud-glyph Must-fix.
- JS / map: `fountain.js` `dryup`. `c-js-map/data.md` fountain row. Map already names newsym `show_region` / full `mon_overrides_region`.
- Prior reviews this SHA claims to close: **65** item 2 (cloud-glyph skip).

## Intent vs deliverable

Git subject promises: “Match C fountain.c so dryup stays silent when a fog cloud covers the fountain.”

Old JS `if (cansee(x, y)) pline('The fountain dries up!')` with a deferred-cloud comment. C `fountain.c:223–227` reads **gbuf** `glyph_at`, then skips only when that glyph is cmap `S_cloud` (fog/steam). Poison `S_poisoncloud` still plines. A monster glyph or remembered I is `!glyph_is_cmap`, so C still plines.

The diff **does** skip when a live visible region is tagged `'S_cloud'`, and it **does** still pline for poison, `m_at`, and remembered I.

It does **not** port `display.c` `glyph_at` / integer cmap glyphs. The helper is an analog. It does **not** make `newsym` paint `show_region`. Named in the D-log and map. It does **not** pull Excalibur or `wash_hands`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dryup` cansee pline | C body, **retouched** | `fountain.c:223–227` |
| `glyph_at` | C callee, **stand-in** | JS has no gbuf int; `glyph_at_cmap_is_s_cloud` |
| `glyph_is_cmap` / `glyph_to_cmap` | C macros, **stand-in** | analog via region tag + live `m_at` / I |
| `visible_region_at` | C callee, **imported** | `region.js` ≡ `region.c` first visible cover |
| `glyph_is_invisible` | C predicate, **imported** | `display.js` remembered I |
| `m_at` | C callee, **imported** | live monster, not gbuf mon glyph |
| `cansee` | C callee, **imported** | `vision.js`; pre-existing dryup gate |
| `make_gas_cloud` glyph tag | C `cmap_to_glyph`, **pre-existing** | damage? `'S_poisoncloud'` : `'S_cloud'` |
| newsym `show_region` | C display, **named omit** | JS newsym still defers that paint |
| `mon_overrides_region` | C display, **named omit** | full `_mon_visible` / distu / M_AP |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** (the skip is a predicate; outer `rn2(3)` is the pre-existing dryup gate).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded coordinates. `'S_cloud'` is the established JS region tag (`region.js` `make_gas_cloud`), not a seed name. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Predicate C actually writes

C `fountain.c:223–227`:

```
if (cansee(x, y)) {
    int glyph = glyph_at(x, y);
    if (!glyph_is_cmap(glyph) || glyph_to_cmap(glyph) != S_cloud)
        pline_The("fountain dries up!");
}
```

Skip IFF `cansee` **and** gbuf is cmap **and** that cmap is `S_cloud`. `glyph_at` (`display.c:2478–2483`) returns `gg.gbuf[y][x].glyphinfo.glyph` — last painted cell, not live `levl[][]`.

JS `726–728`:

```
if (cansee(x, y) && !glyph_at_cmap_is_s_cloud(x, y)) {
    await pline('The fountain dries up!');
}
```

`pline('The fountain dries up!')` ≡ C `pline_The("fountain dries up!")`. Gate order: wizard `'n'` still returns **before** this, town first-use still returns **before** this, ROOM/`newsym`/`angry_guards` still **after**. Match for slot.

### The helper is a clone, not `glyph_at`

JS `137–144`:

```
if (!loc) return false;
if (m_at(x, y)) return false;
if (glyph_is_invisible(loc)) return false;
const reg = visible_region_at(x, y);
return !!reg && reg.glyph === 'S_cloud';
```

Walk vs C:

| Situation | C gbuf | JS analog | Match? |
|-----------|--------|-----------|--------|
| fog/steam region, no mon, no I | `show_region` paints `S_cloud` | live `visible_region_at` `'S_cloud'` | **fog case they claimed** |
| poison cloud | `S_poisoncloud` ≠ `S_cloud` → pline | tag `'S_poisoncloud'` → not skip → pline | **yes** |
| remembered I | `!glyph_is_cmap` → pline | `glyph_is_invisible` → not skip → pline | **yes** |
| shown monster | mon glyph `!cmap` → pline | live `m_at` → not skip → pline | **yes when shown** |
| live `m_at` **not** in gbuf (unseen / `!_mon_visible`) | gbuf may still be `S_cloud` → **skip** | `m_at` → **pline** | **diverges** |
| visible `S_cloud` region, JS newsym never painted gbuf | C skip only if last flush painted it | JS skips from live region anyway | analog; display still named |

`visible_region_at` (`region.js:37–43`) is the real C function: first `visible` region covering `(x,y)`, skip `ttl === -2`. `make_gas_cloud` (`region.js:134–140`) tags `damage ? 'S_poisoncloud' : 'S_cloud'` ≡ C `cmap_to_glyph(damage ? S_poisoncloud : S_cloud)`. For an `isyou` dryup the cell is the hero’s; `m_at(u.ux,u.uy)` is almost always null, so the common drink/dip path is the region tag. The `m_at` hole matters for `!isyou` minliquid dry of a monster-occupied fountain under fog — named `_mon_visible` / `mon_overrides_region`.

C’s own comment at `fountain.c:220–222` calls this a glyph hack that should have been `block_point`/`unblock_point`. JS does not invent a second skip: `!cansee` still prints nothing (vision, not glyph). Wizard `'n'` and first-use warn still return **before** the cansee test, so a fog overlay cannot hide a warn that C would show, and cannot print a dryup C aborted. Match for those envelopes.

D-log is honest: “JS has no integer glyphs; `visible_region_at` glyph `'S_cloud'` is C `show_region` (JS newsym still defers that paint).” INDEX row is **less** honest: it writes `glyph_is_cmap(glyph_at)` as if the C callee were imported. The subject’s fog-covers-fountain claim is the analog, not gbuf.

`ttl === -2` regions are skipped by `visible_region_at` (C same: deleted/unlinked). A fog region that expired via `run_regions` is gone from `game.regions`, so JS plines — C gbuf might still show a stale cloud until the next `newsym`, which is the opposite stale from the unseen-monster hole. Both are display-buffer vs live-state. Named `show_region`. Do not Must-fix a gbuf port into this fountain peel.

`glyph_is_invisible` (`display.js:379–381`) is remembered `remembered_glyph.invisible` (the `'I'` marker). C `glyph_is_invisible` is a glyph-class test on gbuf. A remembered I without a live region still plines in both. A remembered I **with** a live `S_cloud` region: C `!cmap` → pline; JS checks I **before** the region and also plines. Match for that overlay.

This clone **diverges** from C on unseen live monsters. That is a clone-vs-C gap. It is **named** on the map (`newsym show_region` / full `mon_overrides_region`). Same treatment as review **63**: named hole in the shipped helper, already documented, not a silent stub. Do not Must-fix a duplicate of that named display debt (would force integer gbuf this iter).

## Hallucinations / overclaim

“Match C so dryup stays silent when a fog cloud covers the fountain” is **true for a visible `'S_cloud'` region with no live `m_at` and no remembered I.** It is **not** true that JS reads `glyph_at` / `glyph_to_cmap`. INDEX “skip iff `glyph_is_cmap(glyph_at)` && `glyph_to_cmap==S_cloud`” overclaims the callee.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” The skip fires. The callee is a **gbuf stand-in** whose fog/poison/I arms match C and whose unseen-monster arm does not. Stamping **Addressed:** D-1106 is fair for the Open fog skip; it is not a close of `glyph_at`.

## Density (§2b)

One Open cluster: the cansee pline conjunct C writes after wizard yn. ~20 executable lines. Playbook “one deferred `if`” is the too-small column (same smell as D-1104). The queue forbade pulling Excalibur into this peel. Density smell, not a shipped C-wrong of the fog skip. Do not Must-fix Excalibur onto this SHA.

## Verification

Journal: private canary **33**/33 (plain pline; fog skip; poison pline; !cansee; off-cell/invisible/ttl-2; mon/I overlay; !isyou; town-warn; wizard `'n'`/`'y'`; warned-town); green+strict seed8000/0900; cohort **15**/15 + strict 0014/0006/2200/0360/4500 + isolated 0009. Path **public-unhit** (public seats are not fog-covered fountains). Cadence **#1410** **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not a fog-dry proof.

C read of `fountain.c:201–238`, `display.c:2478–2483`, `display.h` `glyph_is_cmap`, `region.c` `visible_region_at` / `make_gas_cloud`; JS `fountain.js:129–144` / `705–740`, `region.js:37–43` / `134–140`, `display.js:379–381`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| cansee, no cloud | pline | **same** |
| cansee, fog/steam `S_cloud`, no mon/I | skip | **same** (region analog) |
| cansee, poison cloud | pline | **same** |
| cansee, remembered I | pline | **same** |
| cansee, shown mon | pline | **same** |
| cansee, unseen live `m_at` + fog | skip (gbuf cmap) | **pline** (named) |
| !cansee | no pline | **same** |
| wizard `'n'` | abort before pline | **same** |

## Actionable C-wrongs

None that Must-fix this next iter (would duplicate the named display omit).

Named omits / do-nots (map, not Must-fix):

1. JS `newsym` still does not paint `show_region` into a gbuf the way C `glyph_at` reads. Map already names it.
2. Full `mon_overrides_region` (`_mon_visible` / distu / M_AP) vs live `m_at`. Map already names it.
3. `dipfountain` Excalibur / `wash_hands` were the next Open rows (shipped D-1107 / D-1108).
4. Do not restore always-pline when `cansee`. Do not skip poison / shown mon / I. Do not treat this SHA as a `glyph_at` port.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: fog/steam `S_cloud` now suppresses the dryup pline via a real `visible_region_at` tag, but the helper is still a gbuf analog that can pline when C would stay silent on an unseen live monster.
- Must-fix stays empty for this SHA; the analog hole is already on the fountain map, not a new Keep’d family.
