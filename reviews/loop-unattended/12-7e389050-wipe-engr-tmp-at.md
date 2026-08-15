# Review 12 — 7e389050 — u_wipe_engr + S_goodpos tmp_at (D-1051)

## Metadata
- Full / short hash: `7e38905091502920d59bee3877f0b5b30e5e3e8e` / `7e389050`
- Parent: `4e55ff2f` (D-1050)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 01:11:39 +0200
- D-id: **D-1051**
- Stats: 14 files, +191 / −83 — `js/apply.js` +91 / −28, `js/engrave.js` +25 / −8
- Claims to close: D-1022 **risk 7** (`u_wipe_engr_apply` no-op; `display_*_positions` empty). Stamped **Addressed:** D-1051 on that review **without** the short hash (chicken-egg). This review commit fills `7e389050`.
- JS / map: `engrave.js` export + apply pole/grapple/jump hilite; `c-js-map/turns.md` / `absent.md` / `debt.md`. Cadence still **#1320** **44**/44.

## Intent vs deliverable

Git subject promises: “Match C u_wipe_engr and apply tmp_at S_goodpos so pole/grapple/jump hilite and floor wipe are not no-ops.”

D-1022 risk 7: C `use_pole` ends with `u_wipe_engr(2)` (`apply.c:3561`); C `use_grapple` `tohit == 2 || !rn2(2)` then `u_wipe_engr(rnd(2))` (`apply.c:3809–3810`). JS called `u_wipe_engr_apply` which did nothing, with a seed-reasoning comment. C `display_polearm_positions` / `display_grapple_positions` / `display_jump_positions` paint `tmp_at(DISP_BEAM, cmap_to_glyph(S_goodpos))`. JS callbacks were empty while `getpos_sethilite` still registered them.

The diff **does** export real `u_wipe_engr` → `can_reach_floor(TRUE)` + `wipe_engr_at(u.ux,u.uy,cnt,FALSE)`, wire apply callers, and fill the three hilite loops on existing `display.js` `tmp_at`.

It does **not** wire `allmain` / `dokick` / `uhitm` / `dothrow` / `dig` wipe callers. D-log names allmain/dokick/uhitm; **dothrow.c:138** and **dig.c:1335** are the same family and were not listed. Getpos default hilite stays Normal (paint on `$` SHOWVALID) — that is also C (`getpos.c:36–38`, `955–958`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `u_wipe_engr` | C function, new export | `engrave.c:264–268`; not a clone |
| `wipe_engr_at` | imported C callee | already in `engrave.js` (D-0134) |
| `can_reach_floor` | imported C callee, **subset** | swallow / Levitation / unskilled steed / Flying; hugs / ceiling_hider / MZ_HUGE / pit-teeter named omit |
| `display_polearm_positions` | C function, was no-op | `apply.c:3334–3352` |
| `display_grapple_positions` | C function, was no-op | `apply.c:3707–3725` |
| `display_jump_positions` | C function, was no-op | `apply.c:1967–1984` |
| `tmp_at` | imported C callee | `display.js:1694`; `DISP_BEAM=-1`, `DISP_END=-7` match `display.h:227,233` |
| `cmap_to_glyph_goodpos` | **stand-in** for `cmap_to_glyph(S_goodpos)` | `{ ch: '$', color: HI_ZAP }` ≡ `defsym.h:207` PCHAR 87 |
| `get_valid_polearm_position` | pre-existing C callee | `apply.c:3321–3330`; used by the pole loop |
| `can_grapple_location` | pre-existing C callee | `apply.c:3701–3704` |
| `get_valid_jump_position` | pre-existing C callee | `apply.c:1959–1963` via JS sync subset |
| `u_wipe_engr_apply` | **deleted no-op** | the D-1022 false helper |
| allmain / dokick / uhitm / dothrow / dig callers | named no-op | still comments / `rnd(3)` burn without wipe |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Apply’s `J_DIAG` is jump trajectory (pre-existing). Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### `u_wipe_engr` — call-for-call, no RNG in the wrapper

C `engrave.c:264–268`:

```
void u_wipe_engr(int cnt)
{
    if (can_reach_floor(TRUE))
        wipe_engr_at(u.ux, u.uy, cnt, FALSE);
}
```

JS `engrave.js:292–297`: `if (can_reach_floor(true)) wipe_engr_at(u.ux|0, u.uy|0, cnt, false)`. Same predicate, same magical FALSE.

**No `rn2`/`rnd` in `u_wipe_engr` itself.** RNG lives in `wipe_engr_at` (`engrave.c:271–289`): HEADSTONE/`nowipeout` return; BURN needs ice or `magical && !rn2(2)`; non-DUST/blood `cnt = rn2(1+50/(cnt+1)) ? 0 : 1`; then `wipeout_text`. JS `engrave.js:267–286` already matches that envelope (D-0134). Dust Elbereth: full `cnt`, **no extra RNG**. The old apply comment “no RNG when no engraving” was true for the missing call, false as soon as dust exists — C erases it. This SHA makes that true.

`wipeout_text(..., cnt, 0)`: the third argument is the seed. `0` means the unseeded path (D-0134). Magical FALSE so BURN on non-ice still returns before that `rn2`. Pole `u_wipe_engr(2)` on a MARK/ENGRAVE inscription **does** consume `rn2(1+50/3)` once. Grapple may consume `rn2(2)` + `rnd(2)` + that erosion `rn2`. Public traces have no engraving under the hero when those commands would run. Private 7/7 claimed “no extra RNG” for the no-engraving case. Match.

### Apply callers — same guards, same arguments

C `use_pole` (`apply.c:3561`): always `u_wipe_engr(2)` before `return freehit ? ECMD_OK : ECMD_TIME`. Comment: “same as for melee or throwing.” JS `apply.js:4167`: `u_wipe_engr(2)` then the same return. Constant 2: no wrapper RNG. The comment is why `dothrow.c:138` / `uhitm.c:553` exist; this SHA exported the shared function and wired **apply** only.

C `use_grapple` (`apply.c:3809–3810`): **before** the tohit switch, `if (tohit == 2 || !rn2(2)) u_wipe_engr(rnd(2))`. JS `apply.js:4264`: same predicate, `u_wipe_engr(rnd(2))`. RNG order: `rn2(2)` then maybe `rnd(2)`, then the switch. Match. `rnd(2)` is 1 or 2; dust wipes that many characters.

### `can_reach_floor(TRUE)` subset — live now that wipe is wired

C `engrave.c:187–213`: swallow OR (ustuck hugs + !sticks) OR (Levitation && !air/water) → FALSE; unskilled steed → FALSE; undetected ceiling_hider → FALSE; Flying OR msize≥HUGE → TRUE; `check_pit` + teeter/shaft → FALSE; else TRUE.

JS `engrave.js:225–244`: swallow, Levitation, unskilled steed, Flying early-true; hugs / ceiling_hider / MZ_HUGE / pit-teeter **named omit** (pit present is not a block). Pre-existing subset. Wiring `u_wipe_engr` means a pole swing while teetering on a seen pit **will** wipe in JS and **will not** in C. Thin, already named on `can_reach_floor`. Map, not a new Must-fix — do not treat the wrapper as lying about `can_reach_floor(TRUE)` when the callee is the documented subset.

Levitation skip: both FALSE. Private 7/7 claimed levitation skip. Match for that arm.

### `display_*_positions` — loops vs C, then `tmp_at`

C pole (`apply.c:3338–3351`): `on_off` → `tmp_at(DISP_BEAM, cmap_to_glyph(S_goodpos))`; `dx,dy ∈ [-3,3]`; `tmp_at(x,y)` if `get_valid_polearm_position`; else `tmp_at(DISP_END, 0)`.

JS `apply.js:4009–4023`: same −3..3, same `get_valid_polearm_position` (distu in `[gp.polearm_range_min, max]` and `cansee || (couldsee && glyph_is_poleable)` — D-1040). Hero cell is dist 0, outside min 4, so no explicit `u_at` skip. Match.

C grapple (`apply.c:3711–3724`): −3..3; `can_grapple_location && !u_at`. JS `4182–4197`: same, `u_at_xy`. `can_grapple_location` is `isok && cansee && distu <= grapple_range()` (`apply.c:3701–3704`; JS `4178–4179`). Match.

C jump (`apply.c:1971–1983`): −4..4; `get_valid_jump_position && !u_at`. JS `5746–5762`: same. `get_valid_jump_position` still uses the pre-existing sync subset of `is_valid_jump_pos` (no pline). Not this SHA’s predicate. The **loop and paint** are new.

`tmp_at(DISP_BEAM, glyph)` then `tmp_at(x,y)` then `tmp_at(DISP_END, 0)`: JS `display.js:1694–1778` already implements BEAM accumulate + `show_glyph_cell` + END `newsym` restore. `DISP_BEAM=-1`, `DISP_END=-7` match C. This is a **C callee**, not a new clone.

BEAM step (`display.js:1751–1757`): skip if `!cansee(x,y)` unless DISP_ALL; cap `TMP_AT_MAX_GLYPHS`; push `{x,y}`; paint `g.ch`/`g.color`. C `tmp_at` likewise does not show beam glyphs the hero cannot see. Pole valid cells already require `cansee || (couldsee && poleable)`, so the extra cansee gate can drop a remembered-but-unseen poleable cell that `get_valid_polearm_position` accepted. C `tmp_at` has the same cansee filter on DISP_BEAM. Not a JS invention.

END restores saved cells via `newsym`. If `flush_screen(1)` (getpos refresh / full docrt) runs while BEAM is open, gbuf can overwrite `$` before END. D-log names that. Default getpos never opens BEAM, so public traces never hit it.

### `cmap_to_glyph_goodpos` — stand-in, not a no-op glyph

C `defsym.h:205–207`: `PCHAR(87, '$', S_goodpos, "valid position", HI_ZAP)`. JS `{ ch: '$', color: HI_ZAP, dec: false }` with `HI_ZAP = CLR_BRIGHT_BLUE` (`const.js:2455`). That is the JS encoding `tmp_at` already expects (`glyphObj` `{ch,color,dec}`). Full `cmap_to_glyph` / `showsyms[]` remap named in D-log. If a player remaps S_goodpos, C would follow showsyms and JS would still paint `$`. Unhit. Named.

### Getpos: default Normal, paint on `$` — C does this too

C `getpos_hilite_state` defaults `HiliteNormalMap` (`getpos.c:36–38`). `getpos_hilitefunc(TRUE)` runs when SHOWVALID toggles into `HiliteGoodposSymbol` (`getpos.c:87–89`, `955–958`). JS `getpos_toggle_hilite_state` (`getpos.js:113–124`) already calls `hilitefunc(true)` on that state. Previously the callback was empty, so `$` did nothing. Now `$` paints `$`/HI_ZAP on valid cells. **That is the C-wrong this SHA closed.**

JS `getpos_sethilite` still has a stale comment “Hilite glyph painting … deferred” (`getpos.js:130–131`). This SHA did not edit `getpos.js`. Comment debt, not a remaining no-op: the apply callbacks are live when getpos invokes them.

D-log: “flush_screen(1) may still overwrite gbuf between `$` and the next getpos frame.” Named. `getpos_sethilite` still `force_getvalid_newsyms` so cursor/getvalid dirty path matches the pre-D-1051 getpos port.

### Other C callers still stubbed

| C locus | JS now |
|---------|--------|
| `allmain.c:361` `!rn2(40+ACURR(DEX)*3)` then `u_wipe_engr(rnd(3))` | `allmain.js:862–865`: same `rn2`, then **`rnd(3)` with no wipe** (keeps the argument RNG when there is no engraving) |
| `dokick.c:1384` `u_wipe_engr(2)` | comment only (`dokick.js:1425`) |
| `uhitm.c:553` `u_wipe_engr(3)` | comment only (`uhitm.js:1542`) |
| `dothrow.c:138` `u_wipe_engr(2)` | **not mentioned** in D-log; no JS call |
| `dig.c:1335` `u_wipe_engr(3)` | **not mentioned**; no JS call |

Named omit for apply-adjacent melee/throw/kick/EOT. `rnd(3)` burn without wipe is trace-aligned **only** when `wipe_engr_at` would no-op (no engraving). With a live dust engraving, C EOT would erase and JS would not — extra C RNG on non-dust. Public unhit. Map, not Must-fix from D-1022 risk 7 (that risk was apply’s false helpers).

Dothrow/dig belong in the same named-omit sentence as dokick/uhitm: C wipe after a throw or a downward dig is the same wrapper this SHA exported. Leaving the export unused there is honest deferral, not a remaining apply no-op. A later cluster can call `u_wipe_engr` from those files without re-porting the body.

## Hallucinations / overclaim

“Match C u_wipe_engr and apply tmp_at S_goodpos so pole/grapple/jump hilite and floor wipe are not no-ops” is **true for the apply wrappers and for the three display loops.** This is **not** “Match C dispatch, callee is a stub.” `u_wipe_engr` is the real function; `wipe_engr_at` and `tmp_at` are real callees. The glyph argument is a one-cmap stand-in that matches `defsym.h`, not an empty callback.

It is **not** “Match C every `u_wipe_engr` site” or “getpos paints goodpos before the first key.” C itself paints on `$`, not at getpos entry. Stamping D-1022 risk 7 **Addressed** is fair for apply. Fill hash `7e389050` in this commit.

Cadence **#1320** 44/44 does not prove a pole getpos `$` or a dust cell under a halberd swing. Journal admits public **unhit**. Private 7/7 (dust wipe; headstone; levitation skip; nowipeout; no extra RNG; tmp_at `$`) is the right falsifier.

## Density (§2b)

One Must-fix: stop calling wipe/hilite as if they were C. Sibling `display_*` loops + the one-line `u_wipe_engr` wrapper. ~90 lines apply + ~12 lines engrave. Right size. Not “finish engrave.c.” Other callers left named on purpose.

## Verification

Journal: green+strict PASS; apply/jump cohort **6**/6 (seed0361 Scr **366**/366; seed4500 **1814**/1814; seed2200 **230**/230; seed0012 **308**/308). Private node **7**/7. Path **unhit**. Fortress unchanged (cadence still **#1320**). Adequate: fortress plus private wipe/hilite checks. Public traces do not apply a polearm or press `$` during getpos.

This review iter did not re-run sessions (not a cadence slot; Must-fix remains open so cadence stays score-only at **#1325**). C read + JS hunk grep is the audit; the port iter’s green+cohort is the runtime evidence.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1022 risk 7 (apply no-op wipe / empty hilite callbacks) is actually closed.

Named omits (map, not queue): allmain/dokick/uhitm wipe; also dothrow/dig (same C family, missed in D-log’s deferred list); `can_reach_floor` pit-teeter/hugs/huge; full `cmap_to_glyph`/showsyms; getpos default Normal (C); `flush_screen(1)` gbuf overwrite; stale `getpos_sethilite` “painting deferred” comment.

Do not restore `u_wipe_engr_apply` or empty `display_*_positions`. Do not pop tut-1 while Must-fix is open. Remaining Must-fix is cursed-lamp `make_glib` `HGlib|EGlib` (D-1023 `use_lamp`), then `cry_sound` `msound`, `get_obj_location` flags.

The `$`/HI_ZAP stand-in is classified as a cmap clone, not a C-wrong: it matches this pin’s `defsym.h` PCHAR until showsyms exists.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: apply now calls real `engrave.c:264–268` wipe and the three C `tmp_at(DISP_BEAM, S_goodpos)` loops; getpos still paints only on `$` like C, and melee/EOT wipe sites stay stubbed.
