# Review 707 — df2bec69 — display.c see_monsters MON_STILL_ARRIVING skip (D-1746)

## Metadata
- Full / short hash: `df2bec6965c3ee720fe9bfc4e60a50562fd13b70` / `df2bec69`
- Parent: `20426583` (D-1745). This file audits **this SHA only** (seventh of nine `js/` commits since review **700**). Archive **Addressed:** D-1746 `df2bec69`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:59:17 +0200
- D-id: **D-1746**
- Stats: `js/display.js` +5/−2; `js/dog.js` +8; `js/const.js` +1. Total `js/` insertions **14** <250. Band **150–350**.
- Claims to close: Open `see_monsters` MON_STILL_ARRIVING after D-1745 / review **706** (dark DETECTED live; arriving fmon still `newsym`). Not `show_mon_or_warn`. Not pet glyphs. `reviews/loop-2026-08-15/` has no unpaid arriving Must-fix.
- JS / map: `display.js` `see_monsters`; `const.js` flag; `dog.js` With_you/After_you. `c-js-map/turns.md`.
- Prior: **698** / **706** named `:1508–1509`.

## Intent vs deliverable

Git subject promises: `MON_STILL_ARRIVING` fmon are skipped (no `newsym`/`see_wsegs`/Sting count) instead of refreshing every live `mx` cell after D-1745.

`node scripts/csym.mjs see_monsters` → `display.c:1486–1529`. `--callers see_monsters` includes `allmain.c:94`. `mon_arrive` `dog.c:419–623`. `MON_STILL_ARRIVING` `monst.h:67` `0x100`. Set `:430`; With_you clear `:479`; After_you clear `:622`; usteed return `:546` leaves the bit.

```1506:1514:nethack-c/upstream/src/display.c
    for (mon = fmon; mon; mon = mon->nmon) {
        if (DEADMONSTER(mon))
            continue;
        if ((mon->mstate & MON_STILL_ARRIVING) != 0)
            continue;
        newsym(mon->mx, mon->my);
        if (mon->wormno)
            see_wsegs(mon);
```

Parent: DEADMONSTER + `!mx` only; flag missing; `mon_arrive` clones never set it. The diff **does** export `0x100`, `continue` before `newsym`, set at the start of With_you/After_you, clear after place, and leave the bit on usteed return. It **does not** port Wiz_arrive / `failed_arrivals`. Named. Extra JS `!mx` continue is **kept** (C still `newsym(0,my)` for a non-arriving mx-0). Pre-existing, not this skip.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `see_monsters` skip | LIVE repaired | C `:1508–1509` |
| `MON_STILL_ARRIVING` | LIVE const | `0x100` |
| `mon_arrive_with_you` set/clear | LIVE local | C `:430`/`:479`; usteed leaves bit |
| `mon_arrive_after_you` set/clear | LIVE local | C `:430`/`:622` |
| `newsym` / `see_wsegs` / Sting count | LIVE | skipped while arriving |
| `!mx` continue | leftover extra | not C; kept |
| Wiz_arrive / failed_arrivals | OMIT named | |
| `show_mon_or_warn` / pet glyphs | OMIT named | later D-1747/D-1748 |
| make_blinded `Sting_effects(-1)` | OMIT named | |

`node scripts/sym.mjs`:

```
see_monsters     js/display.js:3959   sync
MON_STILL_ARRIVING js/const.js:1531   sync   export const
see_wsegs        js/worm.js:422   sync
mon_arrive_with_you  NOT EXPORTED — 1 LOCAL  js/dog.js:573
mon_arrive_after_you NOT EXPORTED — 1 LOCAL  js/dog.js:789
```

`--can display.js const.js MON_STILL_ARRIVING`: ALREADY. `--can dog.js const.js MON_STILL_ARRIVING`: ALREADY. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. Do **not** add `mon_arrive` #3.

## C ↔ JS fidelity

**Skip (`:1508–1509`).** After `DEADMONSTER`, before `newsym`. Arriving monsters do not refresh cells, worm tails, or increment `new_warn_obj_cnt` (Sting). JS `mhp<=0` then `mstate & 0x100` continue (then leftover `!mx`). **Match the arriving continue.** No RNG in the skip.

**DEADMONSTER vs JS.** C `DEADMONSTER(mon)` is `mhp < 1`. JS `(mon.mhp != null && mon.mhp <= 0)` — same for live mons; a missing `mhp` does not skip. Pre-existing, not this SHA.

**Producer (`:430`).** C `mtmp->mstate |= MON_STILL_ARRIVING` then prepend `fmon`. JS both clones OR the bit then `fmon.unshift`. **Match the set.** `STRAT_ARRIVE` / clear `MON_MIGRATING|MON_LIMBO` are pre-existing in the clones.

**With_you (`:546–479`).** C `if (mtmp == u.usteed) return` **without** clearing. JS `if (mtmp === u.usteed) return` after the set, before the clear. **Match.** Else `rloc_to`/`mnexto` then `&= ~MON_STILL_ARRIVING`. JS `rloc_to`/`enexto` then clear. **Match the clear.**

**After_you (`:622`).** C clears after `mnearto`/`rloc` / `relmon` fail. JS clears after the After_you place (`rloc`). Failed_arrivals / Wiz_arrive still named — a fail path may clear in JS while C `relmon` still holds the bit until losedogs. Named.

**Sting (`:1516–1524`).** C increments `new_warn_obj_cnt` only for non-arriving Warn_of_mon, then `Sting_effects` if the count changed. Arriving fmon never increment. JS the same because the continue is before the increment. **Match.**

**Hero newsym (`:1526–1528`).** `if (!u.usteed) newsym(u.ux,u.uy)`. Unchanged. **Match.** Steed/ustuck `meverseen` before the loop (`:1499–1502`) also unchanged.

**Callee closure (`see_monsters` arriving arm).** LIVE: `MON_STILL_ARRIVING`, `newsym`, `see_wsegs`. The skip is a `continue`, not a stubbed callee. OMIT named: Wiz_arrive; `show_mon_or_warn`; pet glyphs; `Sting_effects(-1)`. STUB: **none**. Reviews **698**/**706** named omit is now LIVE.

**`defer_see_monsters` (`:1492–1493`).** C returns before the loop. JS `if (game.defer_see_monsters) return` unchanged. Arriving skip never runs while deferred. **Match.**

**With_you `rn2` (`dog.c:475`).** C `!rn2(mtame?10:peaceful?5:2)` then `rloc_to` else `mnexto`. JS the same (`dog.js:583–590`) then clear (`:592`). Pre-existing place rng; this SHA only wraps the bit around it. Do **not** treat that `rn2` as new display rng.

**After_you clear.** JS `dog.js:904` after place. C `:622` after `mnearto`/`rloc`/`relmon`. Same bit. Wiz_arrive still named.

## Hallucinations / overclaim

Subject “arriving fmon skipped, no newsym/see_wsegs/Sting count”: **true**. D-log usteed leaves the bit: **true**. Do **not** stamp “Match C `!mx` skip” — C does not. Do **not** stamp “Match C Wiz_arrive / failed_arrivals.” Do **not** stamp “Match C `show_mon_or_warn`.” Journal “fortress held” is not an in-flight arrival screen proof. Public `see_monsters` during `MON_STILL_ARRIVING` is **thin**; canary was node 14/14 + seed0013 restore. Admit public-unhit for the in-flight window.

**Const.** `monst.h:67` `0x100`. JS `const.js` same value. Do **not** reuse `MON_MIGRATING` as a stand-in (node canary `|MON_MIGRATING` still newsyms).

## Density

§2b: C `see_monsters` continue + the `mon_arrive` set/clear that makes the flag real. +14. C skip is two lines; the producers are the same family. Did not glue I-glyph / pet glyphs. Did **not** reopen D-1745.

## Verification

D-log: save-oracle skip (untagged `display.c:see_monsters`); node 14/14 (0x100; arriving skip; live+hero newsym; dead; `|MON_MIGRATING`; mx0; usteed meverseen no cell; defer; Sting count; cleared flag newsyms); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict; seed0013-friday13-restore PASS+strict. Rule #2 clean. In-flight arrival **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the skip and With_you/After_you set/clear match C; Wiz_arrive is named). Named: extra `!mx` continue; Wiz_arrive / failed_arrivals; `show_mon_or_warn`; pet/detected glyphs; make_blinded `Sting_effects(-1)`; `feel_location` `is_worm_tail`. Do **not** add `MON_STILL_ARRIVING` #2. Do **not** clear the bit on usteed return. Do **not** `newsym` arriving fmon. Do **not** re-port D-1745.

Verdict: **ACCEPT-WITH-DEBT**
