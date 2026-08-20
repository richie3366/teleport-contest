# Review 280 — ccdc8670 — objnam.c doname TOOL W_TOOL|W_SADDLE worn (D-1318)

## Metadata
- Full / short hash: `ccdc8670fa8b6044ddbdffaae90768f810990e28` / `ccdc8670`
- Parent: `9b1b4ba4` (D-1317). This file audits **this SHA only**. Archive **Addressed:** D-1318 lacked the short hash; this review commit fills `ccdc8670`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 23:32:36 +0200
- D-id: **D-1318**
- Stats: 9 files, +100 / −38 — `js/objnam.js` +24 / −7.
- Claims to close: Open `objnam.c` doname TOOL W_TOOL|W_SADDLE worn (named from D-1308). Not candle. `reviews/loop-2026-08-15/` has no unpaid worn-tool Must-fix.
- JS / map: `objnam.js` `doname`; `c-js-map/turns.md`. LEASH / POT_OIL `(lit)` named.
- Prior reviews this SHA claims to close: **270** named W_TOOL worn after candle; **279** named it as the next Open.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a worn blindfold, towel, lenses, or saddle shows (being worn), instead of a bare tool name.”

C `doname_base` TOOL (`objnam.c:1427–1429`) is the **first** TOOL arm: `owornmask & (W_TOOL | W_SADDLE)` Concat `" (being worn)"` then **`break`** — skips leash (`:1431–1445`), candelabrum (`:1447–1454`), lamp/candle (`:1455–1478`), and `oc_charged` goto charges (`:1480–1481`). Comment `/* blindfold */`. `W_TOOL` is eyewear (`prop.h:121`, `WORN_BLINDF`); `W_SADDLE` is monster saddles (`:125`). Switch class is `is_weptool(obj) ? WEAPON_CLASS : obj->oclass` (`:1382`) so pickaxe/aklys do **not** take this arm (they get WEAPON `+spe` / wield phrasing). After the switch, W_WEP / SWAPWEP / QUIVER / unpaid still apply. `xname` stays bare.

Old JS: candelabrum D-1317; lamp/candle D-1308; worn omit.

The diff **does** Concat `" (being worn)"` and skip candelabrum / lamp `(lit)` / TOOL charges when `toolWorn`. It does **not** port LEASH `leashmon` or POT_OIL `(lit)`. Named. It does **not** skip W_WEP after the TOOL switch — C doesn’t either (`break` exits the `switch`, not `doname_base`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| doname TOOL worn | C `:1427–1429`, **wired** | first TOOL arm |
| `W_TOOL` / `W_SADDLE` | C `prop.h`, **imported live** | `0x00080000` / `0x00100000` |
| `is_weptool` → WEAPON | C `:1382`, **pre-existing** | worn arm never sees weptools |
| candelabrum / lamp skip | C `break`, **wired** | `!toolWorn` on those suffixes |
| TOOL charges skip | C `break` before `:1480`, **wired** | |
| LEASH `leashmon` | C `:1431–1445`, **named omit** | worn would skip it in C too |
| POT_OIL `(lit)` | C POTION `:1488–1490`, **named omit** | not TOOL |
| `xname` | C, **unchanged** | still no `(being worn)` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Pinned C (`objnam.c:1426–1429` + switch selector `:1382`):

```
    switch (is_weptool(obj) ? WEAPON_CLASS : obj->oclass) {
    …
    case TOOL_CLASS:
        if (obj->owornmask & (W_TOOL | W_SADDLE)) { /* blindfold */
            Concat(bp, 0, " (being worn)");
            break;
        }
```

JS `donameClass === TOOL_CLASS && (owornmask & (W_TOOL|W_SADDLE))` then `bp += ' (being worn)'`. Mask bits match `prop.h`. ublindf (blindfold / towel / lenses) is `W_TOOL` (`do.c` worn slot). Monster saddle is `W_SADDLE`. A worn towel does **not** pick up lamp `(lit)` or candle `partly used` in C because those arms are after the break; JS still computes candle `partly used` on **prefix** before the worn suffix because `Is_candle_obj` is tallow/wax — a towel never takes it. Worn lamps/candles as `W_TOOL` do not occur (ublindf otyps are not those). The `!toolWorn` gates on candelabrum / `(lit)` / charges are the C `break`.

C `break` does **not** skip later non-switch suffixes (unpaid, W_WEP). JS still appends those. A hypothetical tool with both `W_TOOL` and `W_WEP` would get both suffixes in C and JS. ublindf is not wielded as `W_WEP` in normal play.

Leash: C worn-first means a worn leash (if `W_TOOL`) would show `(being worn)` and **not** `(attached to %s)`. JS has no leash arm yet; a worn leash would only get `(being worn)` — which is the C worn-first result, not a new C-wrong. Unworn leashed-monster remains a named omit.

This is **not** “Match C `doname` TOOL dispatch.” Sibling arms stay named. The first-arm Concat plus the skips that `break` implies **are** the hunk. `xname` remaining bare is C (`xname` never took this switch).

## Hallucinations / overclaim

Subject + D-1318 say a worn blindfold/towel/lenses/saddle shows `(being worn)` instead of a bare tool name. **The first TOOL arm plus charge/candelabrum/lamp skip are the hunk.** Stamping **Addressed:** D-1318 is fair. Do **not** stamp “Match C LEASH attached.” Do **not** stamp “Match C POT_OIL `(lit)`.” Do **not** stamp “Match C `xname` worn tools.” Do **not** stamp “Match C wet-towel xname.” Do **not** treat fortress PASS as an inventory `a blindfold (being worn)`.

## Density

One C `if` that is the first TOOL arm, plus the three later TOOL suffixes that `break` must suppress. ~20 executable JS lines. Did not glue leash. Right size (§2b). Sequential with D-1317 (sibling TOOL `if`s), not an unrelated subsystem.

## Branch-by-branch confirm

1. Worn blindfold `W_TOOL`: `" (being worn)"`, no charges. Match `:1427–1429`.
2. Worn lenses / towel: same mask. Match.
3. Monster saddle `W_SADDLE`: `" (being worn)"`. Match.
4. Unworn tool: no suffix from this arm. Match.
5. Weptool pickaxe: `donameClass` WEAPON, no TOOL worn suffix; `+spe` / wield phrasing unchanged. Match `:1382`.
6. Worn skips candelabrum n-of-7 and lamp `(lit)`. Match `break` before `:1447` / `:1455`.
7. Armor `W_ARMOR` / amulet `W_AMUL` suffixes unchanged (other cases). Match.
8. Unworn candelabrum n-of-7 still D-1317. Match `isCandelabrum && !toolWorn`.
9. **Public-unhit** unless a session `doname`s ublindf or a saddle.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not special-case Tourist starting towel by seed. Plain ESM.

## Verification

Journal: private canary **27**/27; green+strict seed8000/0900; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361. **Public-unhit** unless worn ublindf/saddle `doname`. Cadence this audit: full `sessions` at HEAD `ccdc8670` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. First TOOL arm Concat `" (being worn)"` and skip of leash/candelabrum/lamp/charges match C `:1427–1429`. Mask constants are live imports. Weptools correctly remapped away.

Named omits (map, not Must-fix):

1. `objnam.c` LEASH `leashmon` `(attached to %s)`
2. POTION `POT_OIL` `(lit)`
3. wet-towel xname / full `mbodypart` (pre-existing doname debt)

Do not Must-fix “`xname` stays bare.” Do not Must-fix W_WEP after TOOL `break` (C continues). Next Open is LEASH attached (named from D-1308). Not candle.

## Callers / RNG ledger

C: invent `doname` / `prinv` / farlook. JS: same. No RNG. Public fortress is not evidence `(being worn)` painted on ublindf.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: worn eyewear and saddles now `doname` `(being worn)` and skip later TOOL arms; leash attached and oil `(lit)` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1318 `ccdc8670`.
