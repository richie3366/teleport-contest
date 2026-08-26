# Review 490 — 72c1fcdd — worm.c see_wsegs + display.c is_worm_tail (D-1529)

## Metadata
- Full / short hash: `72c1fcdd9bd25ad4ef58b48859343529e7696dc4` / `72c1fcdd`
- Parent: `aa4d11f5` (D-1528). This file audits **this SHA only** (eighth of nine `js/` commits since review **482**). Archive **Addressed:** D-1529 `72c1fcdd`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 05:10:29 +0200
- D-id: **D-1529**
- Stats: 13 files, +193 / −62 — `js/display.js` +70 / −17, `js/worm.js` +21 / −2, `js/monmove.js` +8 / −2, `js/worn.js` +7 / −2. Band 150–350 (js/ insertions **106**).
- Claims to close: Open `worm.c` `see_wsegs` (named from D-1528 / D-1491). Not `detect_wsegs`. `reviews/loop-2026-08-15/` has no unpaid worm-tail Must-fix.
- JS / map: `worm.js` `see_wsegs`; `display.js` `newsym` / `mon_at_display` / `see_monsters`; `worn.js` `mon_set_minvis`; `monmove.js` postmov. `c-js-map/data.md` + `turns.md`.
- Prior reviews this SHA claims to close: **489** named `see_wsegs`.

## Intent vs deliverable

Git subject promises: long-worm body cells refresh as `PM_LONG_WORM_TAIL` (`~`) except the dummy head, and minvis hides those tails.

Pinned C `worm.c` `see_wsegs` `:487–495`:

```487:495:nethack-c/upstream/src/worm.c
see_wsegs(struct monst *worm)
{
    struct wseg *curr = wtails[worm->wormno];
    while (curr != wheads[worm->wormno]) {
        newsym(curr->wx, curr->wy);
        curr = curr->nseg;
    }
}
```

Callers: `display.c` `see_monsters` `:1511–1512`; `worn.c` `mon_set_minvis` `:482–483`; `monmove.c` postmov `:1683–1686`. Callee `display.c` `#define is_worm_tail(mon)` `:500` (inside `newsym`: `x != mx \|\| y != my`). `display_monster` `:599–618` uses `what_mon(PM_LONG_WORM_TAIL, rn2_on_display_rng)`. Occupancy: `place_worm_seg` puts the **head** pointer on every `level.monsters[x][y]` seg cell, so `m_at` at a body cell is the worm, not a second monster.

Old JS: `worm_move` live (D-1491); `see_monsters` skipped `see_wsegs`; `mon_at_display` walked `fmon` heads only; `newsym` painted the head `w` (or floor) wherever it looked.

The diff **does** port `see_wsegs`, wire the three callers, occupy via `_level_monsters` in `mon_at_display`, add `is_worm_tail(mon,x,y)`, paint `worm_tail_glyph` (`~` / Hallu `rn2_on_display_rng`), skip telepathy/MATCH_WARN/Detect/warning on tails as C does. It **does not** port `detect_wsegs`, `worm_known`, cutworm/wormgone/save, muse.js `mon_set_minvis` clone, `feel_location` tail overlay, Detect_monsters **cansee** arm, or `MON_STILL_ARRIVING`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `see_wsegs` | C `:487–495`, **LIVE this SHA** | skips dummy `wheads` |
| `is_worm_tail` | C `:500` macro, **CLONE this file** | C `#undef` at `:1101` |
| `worm_tail_glyph` | C `display_monster` `:599–618`, **CLONE** | mlet; pet/detected ids named |
| `mon_at_display` | C `m_at` / `level.monsters`, **LIVE** | `_level_monsters` first |
| `place_worm_seg` | C `rm.h`, **LIVE D-1491** | stores head ptr |
| `see_monsters` | C `:1511–1512`, **LIVE** | `if (wormno) see_wsegs` |
| `mon_set_minvis` | C `:474–484`, **LIVE** | muse.js clone **OMIT named** |
| postmov minvis | C `:1683–1686`, **LIVE** | |
| `detect_wsegs` | C `:502–519`, **OMIT named** | `sym` NOT FOUND |
| `worm_known` | C, **OMIT named** | NOT FOUND |

`node scripts/sym.mjs see_wsegs is_worm_tail worm_tail_glyph see_monsters mon_set_minvis detect_wsegs worm_known place_worm_seg mon_at_display`:

```
see_wsegs        js/worm.js:246   sync
is_worm_tail     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:260
worm_tail_glyph  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:268
see_monsters     js/display.js:2990   sync
mon_set_minvis   js/worn.js:337   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/muse.js:859
detect_wsegs     NOT FOUND in js/**
worm_known       NOT FOUND in js/**
place_worm_seg   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/worm.js:28
mon_at_display   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:243
```

This SHA does **not** delete a symbol. `is_worm_tail` is a C macro local to `newsym`, not a second export. `mon_set_minvis` muse clone was already named; this SHA did not add clone #2. `see_wsegs` is one export.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **Display RNG only:** Hallu `rn2_on_display_rng` in `worm_tail_glyph` (C `what_mon` / `newsym_rn2`). **No core `rn2`.** **Public-unhit** until a live long worm is on-screen. Inherited seed0367 FAIL is D-1526.

## C ↔ JS fidelity

`see_wsegs`. Walk `wtails[wormno]` via `nseg` until `wheads[wormno]` (dummy at the head). `newsym` each body cell. JS `:246–255`: `if (!wnum) return` (C callers already gate `wormno`); `curr && curr !== head`. Dummy not `newsym`’d (head already refreshed by the caller’s `newsym(mx,my)`). Empty worm: `curr === head`, loop skips. **Match `:491–494`.**

Occupancy. C `m_at` reads `level.monsters[x][y]` filled by `place_worm_seg` with the **head**. JS `mon_at_display` now checks `_level_monsters` first (same map `place_worm_seg` writes), skips steed, requires `mhp > 0`. Then the old `fmon` walk. Body cell returns the worm with `mx,my` at the **head**, so `is_worm_tail` is true. **Match C `m_at`.**

`is_worm_tail`. C `:500`: `(mon) && (x != mx \|\| y != my)` using `newsym`’s `x,y`. JS `(mon, x, y)` the same. Head cell false. **Match.** `feel_location` `:908` also uses the macro; JS `feel_location` still unnamed for tails. Named.

`newsym` cansee `see_it`. C `:1013–1015`: `mon_visible \|\| (!worm_tail && (tp_sensemon \|\| MATCH_WARN_OF_MON))`. Then `:1016` `see_it \|\| (!worm_tail && Detect_monsters)`. JS `see_it` matches the first disjunct. **`Detect_monsters` cansee still named** (comment). Warning: C `:1030` `mon_warning && !worm_tail`. JS the same. **Match the tail skips.**

`display_monster` vs `worm_tail_glyph`. C tame → `petnum_to_glyph(PM_LONG_WORM_TAIL)`; DETECTED → `detected_monnum_to_glyph(what_mon(...))`; else `monnum_to_glyph(what_mon(...))`. JS always mlet of `PM_LONG_WORM_TAIL` (`~`) or Hallu `rn2_on_display_rng(NUMMONS)`, plus `mon_map_attr(mtmp)`. **Match the `~` / Hallu display stream.** Pet/detected **integer glyph ids** named (JS has no glyph numbers; attr still pet-tints via `mon_map_attr`).

`!cansee`. C `:1046–1055`: tp/MATCH_WARN/infrared+visible shows tail glyph; Detect and warning **skip** tails. JS `:2818–2838` the same (`!worm_tail` on Detect and warning). Blind telepathy still shows `~`. **Match.**

Callers. `see_monsters`: after `newsym(mx,my)`, `if (wormno) see_wsegs`. **Match `:1511–1512`.** `MON_STILL_ARRIVING` still named. `mon_set_minvis`: `newsym` then `see_wsegs` when `!invis_blkd`. **Match `:481–483`.** postmov after `mpickstuff` if `minvis`: `newsym` + `see_wsegs`. **Match `:1683–1686`.** minvis → `mon_visible` false → tail `newsym` maps terrain, not `~`. **Match “minvis hides those tails.”**

Callee closure. LIVE: `see_wsegs`, `newsym`, `place_worm_seg` occupancy, `see_monsters`, `mon_set_minvis` (worn), postmov. CLONE: `is_worm_tail` (C macro), `worm_tail_glyph` (display_monster tail arm). STUB: none in the wired callers. OMIT named: `detect_wsegs`, muse clone, Detect cansee, `feel_location` tails, `MON_STILL_ARRIVING`. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `~` except dummy, minvis hides tails: **true of `see_wsegs` + `is_worm_tail` + `mon_visible`.** D-log canary dummy no-op / visible `~` vs head `w` / minvis / three callers / Blind tp / Detect skip / Hallu display rng / no core RNG: **true of that canary**. Stamping **Addressed:** D-1529 for **`:487–495` + `:500` + the three callers** is fair. Do **not** stamp “Match C `detect_wsegs`.” Do **not** stamp “Match C Detect_monsters cansee.” Do **not** stamp “Match C `feel_location` tail.” Do **not** stamp “Match C petnum_to_glyph ids.” seed0367 is still D-1526. `see_wsegs` is **not** a stub.

## Density

+106 JS: C function + occupancy + `newsym` tail arms + three callers. Did not glue `getobj` ALLOWCNT (D-1530). §2b acceptable.

## Branch-by-branch confirm

1. No `wormno` / dummy-only: `see_wsegs` no-op. **Match.**
2. Body cell cansee, ordinary vision: `~` not `w`. **Match `:612–615`.**
3. Head cell: `is_worm_tail` false; `mon_glyph` `w`. **Match.**
4. minvis, no See_invisible: tails map as terrain. **Match.**
5. `see_monsters` walks segs. **Match `:1512`.**
6. `mon_set_minvis` hides head + tails. **Match `:482–483`.**
7. postmov minvis after pickup. **Match `:1683–1686`.**
8. Blind `tp_sensemon`: tails still `~`. **Match `:1047–1054`.**
9. Detect_monsters !cansee: skip tails. **Match `:1050`.**
10. Detect_monsters cansee. **Named omit.**
11. `mon_warning` on a tail: skip. **Match `:1030`/`:1055`.**
12. Hallu: `rn2_on_display_rng`. **Match `what_mon` rng class.**
13. muse.js `mon_set_minvis` clone. **Named omit.**
14. **Public-unhit** (no public long worm on-screen).

## Callers / RNG ledger

C: `see_monsters`, `mon_set_minvis`, postmov minvis. JS the same three. Hallu display rng only. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. muse clone left named, not duplicated.

## Verification

D-log: private canary **24**/24; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** until a live long worm is on-screen. Honest for this SHA. Full-suite FAIL remains seed0367 from D-1526.

## Actionable C-wrongs

None at the claimed tail refresh. Remaining **named**: `detect_wsegs`; `worm_known`; cutworm/wormgone/save; muse.js `mon_set_minvis`; `feel_location` `is_worm_tail`; Detect_monsters cansee; `MON_STILL_ARRIVING`; pet/detected glyph ids. Do not Must-fix “paint tails from `fmon` without `_level_monsters`” (C is `m_at`). Do not Must-fix the Pri-strt emin dice (review **487**).

Verdict: **ACCEPT-WITH-DEBT**
