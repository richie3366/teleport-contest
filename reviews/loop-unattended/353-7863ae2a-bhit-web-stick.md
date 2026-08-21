# Review 353 — 7863ae2a — zap.c bhit WEB stick (D-1393)

## Metadata
- Full / short hash: `7863ae2ab51a5838112d5683fc75f7749b145055` / `7863ae2a`
- Parent: `adfd4533` (D-1392). This file audits **this SHA only** (seventh of nine `js/` commits since review **346**). Archive **Addressed:** D-1393 `7863ae2a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 21:28:50 +0200
- D-id: **D-1393**
- Stats: 9 files, +101 / −32 — `js/zap.js` +22 / −4 (`bhit` WEB arm).
- Claims to close: Open `zap.c` `bhit` WEB stick (named from D-1383 / D-1392). Not M_AP_OBJECT. Review **343**/**352** named `!rn2(3)`. `reviews/loop-2026-08-15/` has no unpaid WEB Must-fix.
- JS / map: `zap.js` `bhit`. `c-js-map/turns.md`. throwit fly / skiprange / shkcatch still named.
- Prior reviews this SHA claims to close: **343** named WEB; **352** left it Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit WEB stick so a thrown or kicked missile can get stuck in an empty web, instead of always flying through.”

C `zap.c` `bhit` `:3926–3938` after `m_at` / `t_at`, **before** skiprange and before D-1383/D-1392:

```
        if (!mtmp && ttmp && (ttmp->ttyp == WEB)
            && (weapon == THROWN_WEAPON || weapon == KICKED_WEAPON)
            && !rn2(3)) {
            if (cansee(x, y)) {
                pline("%s gets stuck in a web!", Yname2(obj));
                ttmp->tseen = TRUE;
                newsym(x, y);
            }
            if (was_returning)
                iflags.returning_missile = (genericptr_t) 0;
            break;
        }
```

`WEB = 18` (`trap.h:77`). `!rn2(3)` is stick on 0 (one in three). Monster on the web: `mtmp` set → this arm skipped; shade/M_AP/stop later. ZAPPED_WAND / FLASHED_LIGHT do not roll. THROWN_TETHERED remaps to THROWN before the loop (`:3863–3866`) so the cord can stick. `break` leaves `bhitpos` on the web. `!cansee`: still break, no tseen/pline. PIT is not WEB — no roll.

C `throwit` uses this `bhit`. JS ordinary `throwit` still inlines fly without WEB. Named.

Old JS: after D-1392, empty WEB always continued.

The diff **does** the same short-circuit with live `t_at` / `WEB` / `rn2` / `cansee` / `Yname2_destroy` / `newsym` / clear `returning_missile` / `break`. It does **not** port throwit fly or skiprange. Named. `finally` already skipped `DISP_END` when returning was cleared (comment now cites D-1393).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WEB stick | C `:3926–3938`, **wired** | `!mtmp && ttyp==WEB && thrown/kicked && !rn2(3)` |
| `t_at` | C trap.c, **imported live** | trap.js |
| `WEB` | C 18, **wired** | const.js |
| `rn2` | C, **imported live** | rng.js |
| `Yname2_destroy` | C `Yname2`, **clone** | highc(`yname`); same file |
| `cansee` / `newsym` | C, **imported live** | |
| returning clear | C `:3936–3937`, **wired** | `was_returning` already captured |
| skiprange rocks | C `:3941–3970`, **named omit** | between WEB and shade in C |
| throwit fly | C via `bhit`, **named omit** | still inlines |
| shkcatch | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(3)` only when `!mtmp && ttyp==WEB && (THROWN||KICKED)`. ZAPPED_WAND/FLASHED_LIGHT/PIT/occupied WEB do **not** burn it. Stick vs fly is 1/3 vs 2/3, not a hardcoded coordinate.

## C ↔ JS fidelity

JS sits after `m_at`/`t_at` and **before** the D-1383/D-1392 `if`. That is C’s order relative to shade/mimic. C still has skiprange **between** WEB and shade; JS has no skiprange arm, so WEB is immediately followed by shade. For a WEB cell `skiprange_start` is irrelevant. Named omit of skiprange, not a WEB C-wrong.

Guards match `:3928–3930` call-for-call: empty (`!mtmp`), `ttmp`, `ttyp===WEB` (18), thrown or kicked (tether already remapped to THROWN), `!rn2(3)`. `cansee` → pline + `tseen=true` + `newsym`. `Yname2_destroy` is `yname` with first char uppercased — C `Yname2`. Clone, not a fake `"The dart"`. `!cansee`: no pline, still `break`. `was_returning` clears `iflags.returning_missile`. `break` does not walk `bhitpos` back; the missile sits on the web. Match `:3931–3938`.

Occupied WEB: `mtmp` truthy → no `rn2`; later shade (D-1383) or stop on gnome. Match D-log “gnome on web stop” / “shade-on-web D-1383 order.”

Kicked: JS already starts `bhitpos` at `u+dir` and `range--`, then the loop adds `dir` first — first WEB test is `ux+2dx` like C. Not a kicked-start rewrite this SHA.

Hallucination check: “Match C WEB stick” while **`t_at` / `WEB` / `rn2` are live** is not a dispatch-stub lie. Do **not** stamp “Match C throwit fly.” Do **not** stamp “Match C skiprange.” Do **not** stamp “Match C `Yname2` via objnam.js export” (local highc clone).

## Hallucinations / overclaim

Subject says a thrown or kicked missile can get stuck in an empty web instead of always flying through. **True for `bhit` THROWN/KICKED** including tether remap. **False for ordinary `throwit` fly** until that stand-in calls `bhit`. **False for ZAPPED_WAND** (C does not roll). D-log “stick + fly; returning clear; !cansee silent stop; PIT no roll; gnome on web stop” are the right falsifiers. Stamping **Addressed:** D-1393 for `:3926–3938` is fair. Do **not** treat fortress PASS as a dart in a web.

## Density

One `if` family already named from D-1383, in the same `bhit` loop. ~22 lines of JS. Playbook §2b sibling of D-1392. Did not glue `mhitm_ad_phys` (next Open). Did not rewrite throwit.

## Branch-by-branch confirm

1. Empty WEB, thrown, `rn2(3)=0`, cansee: pline, tseen, newsym, break. Match.
2. `rn2(3)≠0`: continue; shade/mimic later. Match.
3. `!cansee`: silent break; returning cleared. Match.
4. Monster on WEB: no roll; gnome stops / shade flies. Match.
5. PIT: ttyp≠WEB; no roll. Match.
6. ZAPPED_WAND / FLASHED_LIGHT: no roll. Match.
7. Kicked: first loop cell `ux+2dx`. Match C.
8. Tether remap: weapon is THROWN; can stick; `finally` skips END if returning cleared. Match.
9. Ordinary throwit: still inline, no WEB. Named.
10. **Public-unhit** until a session throws/kicks over a WEB via `bhit`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `WEB=18` and `!rn2(3)` are C. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; stick + fly; returning clear; !cansee silent stop; PIT no roll; ZAPPED_WAND/FLASHED_LIGHT no roll; gnome on web stop; shade-on-web D-1383 order; kicked ux+2dx; tether remap; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not a web stick.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The `:3926–3938` arm is live `t_at`/`rn2`/`break`. Remaining gaps are named omits.

Named omits (map / already-Open, not Must-fix):

1. throwit THROWN_WEAPON fly still inlines without WEB
2. skiprange rocks (C between WEB and shade)
3. shkcatch pick; map_invisible; FLASHED_LIGHT DISP_BEAM
4. `mhitm_ad_phys` shade_miss (already Open at this SHA; later D-1394)

Do not Must-fix “always stick” (C is `!rn2(3)`). Do not Must-fix “roll for ZAPPED_WAND” (C does not). Do not Must-fix “stick when `mtmp` is set” (C requires `!mtmp`). Do not Must-fix “check WEB at kicked `ux+dx` before the loop” (C’s first loop cell is `ux+2dx`).

## Callers / RNG ledger

C empty thrown/kicked WEB: one `rn2(3)`. JS same. Occupied WEB: zero new dice here. Public fortress never takes this envelope via `bhit`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `bhit` thrown/kicked now `!rn2(3)`-sticks on an empty WEB with C’s tseen/returning/`break`; throwit fly and skiprange stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1393 `7863ae2a` already stamped.
