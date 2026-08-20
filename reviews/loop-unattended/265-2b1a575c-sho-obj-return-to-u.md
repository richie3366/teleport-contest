# Review 265 — 2b1a575c — dothrow.c sho_obj_return_to_u (D-1303)

## Metadata
- Full / short hash: `2b1a575cca5bdc9859334c83e344fa138120761d` / `2b1a575c`
- Parent: `ef16a473` (review **264**). This file audits **this SHA only**. Archive row **Addressed:** D-1303 `2b1a575c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 20:11:50 +0200
- D-id: **D-1303**
- Stats: 9 files, +143 / −27 — `js/dothrow.js` +61 / −~6.
- Claims to close: Open `dothrow.c` sho_obj_return_to_u (named from D-1282 / reviews **244** / **263** / **264**). Not boomhit. `reviews/loop-2026-08-15/` has no unpaid FLASH-walk Must-fix.
- JS / map: `dothrow.js` `sho_obj_return_to_u` / `throwit_returning_missile` / `autoreturn_weapon`; `c-js-map/turns.md`. Tethered DISP_TETHER / BACKTRACK; leader `!next2u` / `finish_quest` named.
- Prior reviews this SHA claims to close: **244** named the display walk (`rn2_on_display_rng` only) after returning_missile; **263** named it after boomhit (AutoReturn already cleared on that path).

## Intent vs deliverable

Git subject promises: “Match C dothrow.c sho_obj_return_to_u so a returning Mjollnir flashes back along the throw vector, instead of snapping to the hero's hand with no return flight.”

C `sho_obj_return_to_u` (`dothrow.c:1440–1456`): if `(u.dx || u.dy)` and `gb.bhitpos` is not the hero cell, start at `bhitpos - dir`, `tmp_at(DISP_FLASH, obj_to_glyph(obj, rn2_on_display_rng))`, walk `while (isok && not @)` with `tmp_at(x,y)` + `nh_delay_output()`, then `tmp_at(DISP_END, 0)`. Caller throwit (`:1710–1715`) after `rn2(100)` success: tethered `tmp_at(DISP_END, BACKTRACK)` else this FLASH walk. `tethered_weapon` is `autoreturn_weapon(obj)->tethered && (wep_mask & W_WEP)` (`weapon.c:514–529`; `arwep[]` is AKLYS only, boomerang row commented out). Second caller thitmonst leader `!next2u` (`:2141–2142`) named.

Old JS: named omit after D-1282; `throwit_returning_missile` skipped the walk (comment: display RNG / tmp_at).

The diff **does** the FLASH walk, syncs `game.bhitpos` from the fly stop cell, and `autoreturn_weapon` so wielded aklys skips FLASH. It does **not** port outbound DISP_TETHER, BACKTRACK cleanup, leader toss, or `isqrt` tether range. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `sho_obj_return_to_u` | C `:1440–1456`, **new** | exported |
| throwit return display | C `:1712–1715`, **wired** | after `!rn2(100)` fail arm |
| `autoreturn_weapon` | C `weapon.c:520–529`, **clone** | AKLYS `{tethered:1}` only |
| `tmp_at` DISP_FLASH/END | C `display.c`, **imported live** | `DISP_FLASH=-4` matches `display.h:230` |
| `obj_glyph` | C `obj_to_glyph(..., rn2_on_display_rng)`, **imported live** | Hallu burns display stream |
| `nh_delay_output` | C `:1451`, **imported live** | contest `animationFrame` |
| `isok` | C `hack.h`, **imported live** | |
| tethered BACKTRACK | C `:1713`, **named omit** | empty `if` |
| outbound DISP_TETHER | C `:1578`, **named omit** | |
| leader `sho_obj` | C `:2141–2142`, **named omit** | `finish_quest` still omitted |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG.** Hallu `obj_glyph` is the display ISAAC stream, same as C’s `rn2_on_display_rng` callback.

## C ↔ JS fidelity

Pinned C (`dothrow.c:1444–1456`):

```
    if ((u.dx || u.dy) && (gb.bhitpos.x != u.ux || gb.bhitpos.y != u.uy)) {
        int x = gb.bhitpos.x - u.dx, y = gb.bhitpos.y - u.dy;
        tmp_at(DISP_FLASH, obj_to_glyph(obj, rn2_on_display_rng));
        while (isok(x,y) && (x != u.ux || y != u.uy)) {
            tmp_at(x, y);
            nh_delay_output();
            x -= u.dx;
            y -= u.dy;
        }
        tmp_at(DISP_END, 0);
    }
```

JS copies that predicate, the `bhitpos-dir` start (the stop cell itself is **not** flashed), the while, and DISP_END. `obj_glyph` is the live JS `obj_to_glyph` (Hallu `rn2_on_display_rng`; non-Hallu oclass glyph). `tmp_at` FLASH replaces the previous cell via `newsym` (`display.js:2105–2113`), matching C DISP_FLASH. `await nh_delay_output()` is C `nh_delay_output`, not a positional `rn2`.

Caller: C `if (rn2(100)) { tethered BACKTRACK else sho_obj; catch }`. JS `if (!rn2(100)) fail; else { tethered empty else sho_obj; catch }`. Same 1% fail polarity as D-1282. Wielded AKLYS: C BACKTRACK; JS skips FLASH (empty block) — named omit of BACKTRACK, **not** a C-wrong that flashes an aklys. Unwielded AutoReturn (Valk Mjollnir) is not tethered → FLASH walk.

`game.bhitpos` sync from fly locals: C `bhit` left `gb.bhitpos` at the stop cell; JS throwit already used those `x,y` for landing. Adjacent-to-@ or `dx=dy=0` no-op matches C. This is **not** “Match C dispatch, callee is a stub.” `tmp_at` / `obj_glyph` / `nh_delay_output` run.

Do **not** stamp “Match C DISP_TETHER outbound.” Do **not** stamp “Match C BACKTRACK.” Do **not** stamp “Match C leader toss `sho_obj`.”

## Hallucinations / overclaim

Subject + D-1303 say a returning Mjollnir flashes back along the throw vector. **The FLASH walk plus the aklys skip are the hunk.** Stamping **Addressed:** D-1303 is fair. Do **not** stamp “Match C tethered return animation.” Do **not** stamp “Match C `THROWN_TETHERED_WEAPON` / `isqrt` range.” Do **not** stamp “Match C `finish_quest`.” `obj_glyph` is not a glyph stand-in invented this SHA; zap/trap FLASH already used it.

## Density

One C function plus the throwit arm that must not FLASH a wielded aklys, plus the `arwep` lookup that arm needs. ~45 JS lines. Did not glue DISP_TETHER or leader catch. Right size (§2b one function).

## Branch-by-branch confirm

1. Horizontal Valk Mjollnir, stop four cells east of @: start at three, four `nh_delay_output`, DISP_END. Match `:1444–1456`.
2. Diagonal two Chebyshev steps: two delays. Match `x -= dx; y -= dy`.
3. Stop on @: no FLASH. Match the `bhitpos==u` gate.
4. `dx=dy=0`: no FLASH. Match `(u.dx \|\| u.dy)`.
5. `!rn2(100)` fail-to-return: no walk; land. Match `:1760–1776` (pre-existing).
6. Wielded aklys: skip FLASH. C BACKTRACK named.
7. Dart / non-AutoReturn: `returning_missile` false; function not entered. Match.
8. Leader `!next2u`: still skipped. Named.
9. Hallu: `obj_glyph` burns display rng, not positional. Match `obj_to_glyph`.
10. **Public-unhit** unless a session throws wielded Valk Mjollnir (or other non-tethered AutoReturn).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws wielded Valk Mjollnir. Cadence this audit: full `sessions` at HEAD `49dab44b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. The FLASH walk, `bhitpos-dir` start, `obj_glyph` display rng, and aklys skip match C `:1440–1456` / `:1712–1715` / `weapon.c:514–529`.

Named omits (map, not Must-fix):

1. outbound `tmp_at(DISP_TETHER)` / `tmp_at(DISP_END, BACKTRACK)`
2. leader `!next2u` `sho_obj_return_to_u` + `finish_quest`
3. `THROWN_TETHERED_WEAPON` / `isqrt` tether range
4. throwit_mon_hit `snuff_candle` / `hot_pursuit`; `m_respond`

Do not Must-fix “`obj_glyph` name vs `obj_to_glyph`.” Do not Must-fix “`autoreturn_weapon` clone instead of a table walk” (C table is one live row). Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was secret corridor (now D-1304).

## Callers / RNG ledger

C: throwit post-bhit AutoReturn; thitmonst leader named. JS: throwit only. New burns: display-stream only under Hallu. Public fortress is not evidence Mjollnir flashed home.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: returning non-tethered missiles now FLASH back along `-dir` with C’s delay walk; tethered BACKTRACK and leader toss stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1303 `2b1a575c` already filled by a later port commit.
