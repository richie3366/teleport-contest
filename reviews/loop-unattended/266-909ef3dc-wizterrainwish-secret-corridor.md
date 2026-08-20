# Review 266 — 909ef3dc — objnam.c wizterrainwish secret corridor (D-1304)

## Metadata
- Full / short hash: `909ef3dce696cec67d2d4f88b093e1900069438c` / `909ef3dc`
- Parent: `2b1a575c` (D-1303). This file audits **this SHA only**. Archive row **Addressed:** D-1304 `909ef3dc` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 20:17:48 +0200
- D-id: **D-1304**
- Stats: 10 files, +97 / −41 — `js/readobjnam.js` +19 / −4; `js/zap.js` comment only.
- Claims to close: Open `objnam.c` wizterrainwish secret corridor (named from D-1290 / review **252**). Not door/wall. `reviews/loop-2026-08-15/` has no unpaid terrain-wish Must-fix.
- JS / map: `readobjnam.js` `wizterrainwish`; comment `zap.js` `makewish`; `c-js-map/turns.md`. Drawbridge under / lava `pooleffects` / water-fire chain / melting ice / `looted` preparse named.
- Prior reviews this SHA claims to close: **252** named the secret-corridor arm (`:3836–3845`) after door/wall.

## Intent vs deliverable

Git subject promises: “Match C objnam.c wizterrainwish so a wizard secret-corridor wish turns CORR into SCORR, instead of skipping that arm.”

C `wizterrainwish` (`objnam.c:3836–3845`): after wall (`:3822–3835`), before room/floor/ground (`:3846`). `!BSTRCMPI(bp, p-15, "secret corridor")`; `lev->typ == CORR` → `SCORR` + `"Secret corridor."` + `madeterrain`; else `"Secret corridor requires corridor location."` + `badterrain`. Comment: neither CORR nor SCORR uses `flags`/`horizontal`. Dispatch still D-1279 `readobjnam_wish` → this function. Postamble `if (madeterrain) { … switch_terrain(); }` (`:3872–3910`); `madeterrain || badterrain` → `&hands_obj`.

Old JS: furniture + trap loop + door/wall (D-1279/D-1289/D-1290); secret corridor named miss.

The diff **does** the arm in that slot, CORR→SCORR, both plines, and `madeterrain`/`badterrain`. It does **not** pull drawbridge under, lava `pooleffects`, water/fire_damage_chain, melting ice, or `looted`/`disturbed` preparse. Named. `js/zap.js` is comment-only.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| secret-corridor arm | C `:3836–3845`, **new** | after wall, before room |
| `bstrcmpi_end` | C `BSTRCMPI(bp, p-n, suff)`, **pre-existing clone** | case-insensitive suffix |
| `CORR` / `SCORR` | C `rm.h` 24 / 15, **imported live** | JS `const.js` same values |
| `pline` success/fail | C `:3840` / `:3843`, **imported live** | |
| `switch_terrain` | C `:3910`, **imported live** | leftover BLev on SCORR (IS_OBSTRUCTED) |
| `readobjnam_wish` | C `:4978`, **pre-existing** | wizard && !wizkit && !oclass |
| drawbridge under | C later arms, **named omit** | |
| lava `pooleffects` | C later, **named omit** | |
| `looted`/`disturbed` preparse | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** on this arm (string match + typ assign + pline). Leftover BLev is D-1279 `switch_terrain`, not a new burn.

## C ↔ JS fidelity

Pinned C (`objnam.c:3836–3845`):

```
    } else if (!BSTRCMPI(bp, p - 15, "secret corridor")) {
        if (lev->typ == CORR) {
            lev->typ = SCORR;
            /* neither CORR nor SCORR uses 'flags' or 'horizontal' */
            pline("Secret corridor.");
            madeterrain = TRUE;
        } else {
            pline("Secret corridor requires corridor location.");
            badterrain = TRUE;
        }
```

JS `else if (bstrcmpi_end(bp, 'secret corridor'))` sits after the wall arm and before room/floor/ground. `BSTRCMPI(bp, p-15, …)` is last-15-char compare; `"secret corridor"` is 15 chars; `"a secret corridor"` (17) still matches the suffix (C and JS). No word-boundary guard (unlike wall’s `p[-5]==' '` to reject `swallow`). JS `bstrcmpi_end` likewise has none. `CORR`/`SCORR` values match `rm.h`. Neither side clears `flags`/`horizontal`.

Postamble: JS `if (madeterrain) { … await switch_terrain(); }` then `if (madeterrain || badterrain) return HANDS_OBJ`. Badterrain (ROOM/STONE/already-SCORR/HWALL) does **not** `switch_terrain`, matching C `:3872` vs `:3912–3913`. Success on CORR does, so leftover BLev FROMOUTSIDE on obstructed SCORR is live D-1279, not a named skip of the callee.

`readobjnam` (sync, wizkit/mklev) still does not mutate terrain. C skips `wizterrainwish` when `wizkit_wishing`. Match.

This is **not** “Match C wizterrainwish dispatch, callee is a stub.” `switch_terrain` runs on success. Do **not** stamp “Match C drawbridge under.” Do **not** stamp “Match C lava `pooleffects`.” Do **not** stamp “Match C bare `corridor`” — C `p-15` will not match `"corridor"` alone; JS suffix neither.

## Hallucinations / overclaim

Subject + D-1304 say a wizard secret-corridor wish turns CORR into SCORR. **The one `else if` plus both plines are the hunk.** Stamping **Addressed:** D-1304 is fair. Do **not** stamp “Match C remaining terrain switch.” Do **not** stamp “Match C `set_uinwater` lava teleport.” The `zap.js` hunk is a comment; it does not re-wire `makewish`.

## Density

One remaining `else if` in an already-ported switch. §2b calls sibling switch arms in separate iters “too small”; furniture / traps / door-wall / this arm already split across D-1279/D-1289/D-1290/D-1304. Remaining named arms are **different callees** (drawbridge mask, `pooleffects`), not more copies of this suffix test. ~12 JS lines. Did not glue lava. Acceptable remainder of the wish envelope, not a new cluster.

## Branch-by-branch confirm

1. Wizard, hero on CORR, `secret corridor`: typ SCORR, `"Secret corridor."`, `hands_obj`, `switch_terrain`. Match `:3837–3841` + `:3910`.
2. Same with `a secret corridor` prefix: suffix hits. Match `p-15`.
3. Wizard on ROOM/STONE/SCORR/HWALL: `"… requires corridor location."`, no typ change, no `switch_terrain`. Match `:3842–3844`.
4. Bare `corridor`: miss this arm (may hit other named/live arms). Match C length-15 compare.
5. Secret door still SDOOR (D-1290). Not this arm.
6. Door/wall regression: still the previous `else if`s. Match order.
7. Non-wizard / wizkit: `readobjnam_wish` skip. Match D-1279 gate.
8. Leftover BLev on SCORR: live `switch_terrain`. Match obstructed leftover.
9. Drawbridge / lava / ice melt: still skipped. Named.
10. **Public-unhit** unless a wizard session wishes secret corridor.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **19**/19; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a wizard session wishes secret corridor. Cadence this audit: full `sessions` at HEAD `49dab44b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Slot, suffix, CORR-only mutate, both plines, and madeterrain/badterrain postamble match C `:3836–3845` / `:3872–3913`.

Named omits (map, not Must-fix):

1. drawbridge under (`DB_FLOOR` / `DB_MOAT` / `DB_LAVA`)
2. lava `pooleffects` / water-fire_damage_chain
3. melting ice `spot_stop_timers` extras beyond the live postamble
4. `looted` / `disturbed` preparse

Do not Must-fix “`bstrcmpi_end` clone vs `BSTRCMPI`.” Do not Must-fix leftover BLev (live). Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was `mswings` `pline_mon` (now D-1305).

## Callers / RNG ledger

C: `readobjnam` wizard terrain. JS: `readobjnam_wish` only. This arm adds **no** `rn2`. Public fortress is not evidence a CORR cell became SCORR.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wizard `secret corridor` now turns CORR into SCORR with C’s location pline; drawbridge and lava `pooleffects` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1304 `909ef3dc` already filled by a later port commit.
