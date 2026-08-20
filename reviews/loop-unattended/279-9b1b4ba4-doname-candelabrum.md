# Review 279 — 9b1b4ba4 — objnam.c doname CANDELABRUM (n of 7) (D-1317)

## Metadata
- Full / short hash: `9b1b4ba40ceb8a872d39a45f7af62e6eb575a885` / `9b1b4ba4`
- Parent: `75c08164` (D-1316). This file audits **this SHA only**. Archive **Addressed:** D-1317 `9b1b4ba4` already has the short hash (filled by D-1318).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 23:25:34 +0200
- D-id: **D-1317**
- Stats: 9 files, +104 / −34 — `js/objnam.js` +20 / −4.
- Claims to close: Open `objnam.c` doname CANDELABRUM (n of 7) (named from D-1308). Not candle. `reviews/loop-2026-08-15/` has no unpaid candelabrum Must-fix.
- JS / map: `objnam.js` `doname`; `c-js-map/turns.md`. LEASH / W_TOOL worn / POT_OIL `(lit)` named (worn shipped next SHA).
- Prior reviews this SHA claims to close: **270** named candelabrum after candle `(lit)`; **257** landmark still listed it.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so the Candelabrum of Invocation shows (n of 7 candles attached or lit), instead of a bare unique name.”

C `doname_base` TOOL (`objnam.c:1447–1454`) after worn/leash, before lamp/candle: `otyp == CANDELABRUM_OF_INVOCATION`; `Sprintf(suffix, "%s%s", plur(obj->spe), !lamplit ? " attached" : ", lit")`; `ConcatF2(" (%d of 7 candle%s)", obj->spe, suffix)`; **`break`** before lamp `(lit)` and `oc_charged` → `charges`. `plur(x)` is `((x)==1)?"":"s"` (`hack.h:1520`). Unique xname `"the Candelabrum of Invocation"` is pre-existing (`the_unique_obj` / `oc_unique`). Callers: invent `doname` / `prinv`. `xname` does **not** take this arm.

Old JS: lamp/candle D-1308; candelabrum fell through (could take TOOL charges if `known && oc_charged`).

The diff **does** the n-of-7 suffix, skip lamp `(lit)`, skip charges. It does **not** port LEASH attached, W_TOOL `(being worn)` (D-1318), or POT_OIL `(lit)`. Named. `xname` stays bare.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| doname TOOL CANDELABRUM | C `:1447–1454`, **wired** | suffix + break before lamp/charges |
| `plur(spe)` | C `hack.h:1520`, **inlined** | `spe===1 ? '' : 's'` — same macro, not a diverging clone |
| `the_unique_obj` / pretty_base | C xname, **pre-existing** | `"the Candelabrum of Invocation"` |
| `isCandelabrum` | C `otyp == CANDELABRUM_…`, **wired** | `objectNames[otyp]` |
| lamp/candle `(lit)` | C `:1455–1478`, **pre-existing** | gated off this otyp (`Is_candle` is tallow/wax only) |
| TOOL charges skip | C `break` before `:1480`, **wired** | `!isCandelabrum` |
| LEASH / W_TOOL worn / POT_OIL | C sibling arms, **named omit** | worn is D-1318 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`doname` is a formatter).

## C ↔ JS fidelity

Pinned C (`objnam.c:1447–1454`):

```
        if (obj->otyp == CANDELABRUM_OF_INVOCATION) {
            char suffix[20];
            Sprintf(suffix, "%s%s", plur(obj->spe),
                    !obj->lamplit ? " attached" : ", lit");
            ConcatF2(bp, 0, " (%d of 7 candle%s)", obj->spe, suffix);
            break;
        }
```

Format examples: spe=1 unlit `" (1 of 7 candle attached)"`; spe=7 lit `" (7 of 7 candles, lit)"`; spe=0 unlit `" (0 of 7 candles attached)"` (`plur(0)` is `"s"`). JS `spe===1 ? '' : 's'` plus `lamplit ? ', lit' : ' attached'` concatenates the same four strings. C puts the suffix on **bp** after prefix+xname / named / containing; JS appends after those same Concat sites. Match.

Candelabrum is **not** `Is_candle`, so D-1308 `partly used` does not fire (C lamp arm is `else if` after this `if`). Lit candelabrum must **not** also get lamp `" (lit)"` — C `break`; JS `isLampOrCandle` does not include this otyp. Charges skipped. Weptool remap (`is_weptool ? WEAPON_CLASS : oclass`) leaves the candelabrum in TOOL_CLASS. Match C switch selector.

Unidentified appearance `"a candelabrum"` is xname/`pretty_base`, not this suffix. The suffix still applies by **otyp**, like C, even when the display name is the appearance.

This is **not** “Match C TOOL dispatch, callee is a stub.” `doname` is live. Do not confuse unique xname (pre-existing) with this parenthesized count.

## Hallucinations / overclaim

Subject + D-1317 say the Candelabrum shows `(n of 7 candles attached or lit)` instead of a bare unique name. **The TOOL suffix plus charge skip are the hunk.** Stamping **Addressed:** D-1317 is fair. Do **not** stamp “Match C LEASH attached.” Do **not** stamp “Match C W_TOOL `(being worn)`” on this SHA (next). Do **not** stamp “Match C POT_OIL `(lit)`.” Do **not** stamp “Match C `xname` of the candelabrum.” Do **not** treat fortress PASS as an inventory line with `(7 of 7 candles, lit)`.

## Density

One TOOL `if` plus the charge gate C’s `break` implies. ~15 executable JS lines. Did not glue worn/leash. Right size (§2b). Tiny vs token cost, but it is the whole C arm — not a one-line peel of a larger switch the SHA claimed to finish.

## Branch-by-branch confirm

1. spe=7 unlit: `" (7 of 7 candles attached)"`, no extra `(lit)`, no `(recharged:spe)`. Match `:1451–1454`.
2. spe=1 lit: `" (1 of 7 candle, lit)"`. Match `plur(1)` + `", lit"`.
3. spe=0: `"s"` plural. Match `plur(0)`.
4. Unique prefix `"the "` still from `the_unique_obj`. Pre-existing; suffix appends.
5. Lamp/candle regression: still `partly used` / `(lit)` / skip charges (D-1308). Candelabrum otyp excluded from `isLampOrCandle`.
6. Known charged tools that are not this otyp: still `(N:M)`. Match `:1480–1481` not taken here.
7. **Public-unhit** unless a session `doname`s the invocation candelabrum.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode `" (7 of 7 candles, lit)"` for a recorded inventory. Plain ESM.

## Verification

Journal: private canary **32**/32; green+strict seed8000/0900; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361. **Public-unhit** unless candelabrum `doname`. Cadence this audit: full `sessions` at HEAD `ccdc8670` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. `plur(spe)` + attached/`, lit` + `" (%d of 7 candle%s)"` + skip lamp/charges match C `:1447–1454`. Inlined `plur` is the C macro, not a wrong `makeplural`.

Named omits (map, not Must-fix):

1. `objnam.c` LEASH `leashmon` attached
2. TOOL `W_TOOL|W_SADDLE` `(being worn)` — **this was the next Open; now D-1318**
3. POTION `POT_OIL` `(lit)`

Do not Must-fix “unique `the ` article.” Do not Must-fix `xname` remaining bare. Next Open after this SHA was W_TOOL worn (now D-1318).

## Callers / RNG ledger

C: invent `doname` / `xprname` / farlook. JS: same `doname`. No RNG. Public fortress is not evidence the suffix painted.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: the Candelabrum now shows `(n of 7 candle[s] attached|, lit)` and skips lamp `(lit)` / charges; leash and oil stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1317 `9b1b4ba4` already filled by the next port commit.
