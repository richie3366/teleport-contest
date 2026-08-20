# Review 282 — cf309315 — objnam.c doname POTION POT_OIL (lit) (D-1320)

## Metadata
- Full / short hash: `cf3093158f1db85e813ffa2a724453b7f3028709` / `cf309315`
- Parent: `cd867647` (D-1319). This file audits **this SHA only**. Archive **Addressed:** D-1320 `cf309315` already has the short hash (filled by D-1321).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 00:07:55 +0200
- D-id: **D-1320**
- Stats: 9 files, +121 / −112 — `js/objnam.js` +12 / −4.
- Claims to close: Open `objnam.c` doname POTION POT_OIL (lit) (named from D-1308). Not candle. `reviews/loop-2026-08-15/` has no unpaid oil-lit Must-fix.
- JS / map: `objnam.js` `doname`; `c-js-map/turns.md`. W_WEP `body_part(HAND)` named (next SHA).
- Prior reviews this SHA claims to close: **280** named POT_OIL after worn; **270** named it after candle; **281** follow-up.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a lit potion of oil shows (lit), instead of a bare flask name.”

C `doname_base` POTION_CLASS (`objnam.c:1488–1491`) after TOOL charges `goto` / `break`, before RING: `if (obj->otyp == POT_OIL && obj->lamplit) Concat(bp, 0, " (lit)");` then `break`. **No** `known` / `dknown` / `oc_name_known` gate. Unidentified appearance (flask / murky) still gets the suffix. `xname` stays bare. Producer: `timeout.c` `begin_burn` sets `lamplit`; `apply.c` `light_cocktail` `hold_another_object(..., doname(obj))` after light. Post-switch W_WEP / W_QUIVER / unpaid still apply (`:1561+`). `mksobj` `age = MAX_OIL_IN_FLASK` is a producer omit, not this arm.

Old JS: TOOL lamp/candle `(lit)` D-1308 (otyp OIL_LAMP / MAGIC_LAMP / BRASS_LANTERN / `Is_candle` — not POT_OIL); POTION oil omit.

The diff **does** `donameClass === POTION_CLASS && otyp === POT_OIL && lamplit` Concat `" (lit)"` after the TOOL lamp suffix, before ARMOR worn. It does **not** port W_WEP `body_part(HAND)` (next). It does **not** port `mksobj` oil age. Named. `xname` unchanged.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| doname POTION POT_OIL `(lit)` | C `:1488–1491`, **wired** | class arm; then break |
| `POT_OIL` | C `objects.h`, **imported live** | `objectNames.indexOf` |
| `lamplit` | C `obj->lamplit`, **wired** | no known gate |
| TOOL lamp `(lit)` | C `:1476–1477`, **pre-existing** | different otyps; `isLampOrCandle` excludes POT_OIL |
| post-switch W_WEP | C `:1561`, **pre-existing** | oil can be `(lit) (wielded)` |
| `xname` | C, **unchanged** | still no `(lit)` |
| `begin_burn` / `end_burn` | C `timeout.c`, **pre-existing** | sets/clears `lamplit` |
| `mksobj` `MAX_OIL_IN_FLASK` | C `mkobj.c`, **named omit** | producer age, not this suffix |
| W_WEP `body_part(HAND)` | C `:1578`, **named omit** | next SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Pinned C (`objnam.c:1488–1491`):

```
    case POTION_CLASS:
        if (obj->otyp == POT_OIL && obj->lamplit)
            Concat(bp, 0, " (lit)");
        break;
```

JS: `if (donameClass === POTION_CLASS && (obj.otyp|0) === POT_OIL && obj.lamplit) bp += ' (lit)'`. `donameClass` is `is_weptool ? WEAPON_CLASS : oclass` (`:1382`). Oil is not a weptool, so POTION_CLASS. Match.

No `known` conjunct. Blessed / cursed / diluted / named / stack prefixes sit on `prefix` before this Concat on `bp`, same as C. Lit oil then W_WEP still appends after the switch; JS still runs the W_WEP block after this `if`. A wielded lit flask is `"… (lit) (wielded)"` or `"… (lit) (weapon in hand)"` in both.

TOOL lamp `(lit)` cannot double-fire: `isLampOrCandle` is OIL_LAMP / MAGIC_LAMP / BRASS_LANTERN / `Is_candle` (tallow/wax). POT_OIL is none of those. C lamp arm is an `else if` after candelabrum inside TOOL, never POTION. Match.

C switch order puts AMULET/ARMOR worn **before** POTION; JS flattened ARMOR/AMUL **after** this oil `if`. For `oclass==POTION` those other cases are idle, so the Concat order on an oil flask matches. Pre-existing flattening (D-1318 already had ARMOR after TOOL). Not a new C-wrong on this SHA.

This is **not** “Match C POTION dispatch, callee is a stub.” There is no callee. The arm is a Concat. Do not confuse unique/appearance `xname` (pre-existing flask/potion noun) with this parenthesized suffix.

## Hallucinations / overclaim

Subject + D-1320 say a lit potion of oil shows `(lit)` instead of a bare flask name. **The POTION Concat is the hunk.** Stamping **Addressed:** D-1320 is fair. Do **not** stamp “Match C `xname` of oil.” Do **not** stamp “Match C `mksobj` `MAX_OIL_IN_FLASK`.” Do **not** stamp “Match C `light_cocktail`.” Do **not** stamp “Match C W_WEP `body_part(HAND)`” on this SHA (next). Do **not** treat fortress PASS as an inventory line with `(lit)` on a flask.

## Density

One C class `if`. ~8 executable JS lines plus the `POT_OIL` otyp constant. Did not glue W_WEP poly hands. Right size (§2b). Tiny vs token cost, but it is the whole C arm — not a one-line peel of a larger switch the SHA claimed to finish. Sequential with D-1319.

## Branch-by-branch confirm

1. `otyp==POT_OIL && lamplit`, identified: `" (lit)"` on bp. Match `:1489–1490`.
2. Unidentified / murky / flask appearance: suffix still applies (no dknown gate). Match.
3. Blessed / cursed / diluted / named / `quan>1`: prefixes unchanged; suffix still last class arm. Match.
4. Unlit oil: no `(lit)`. Match.
5. Other potion otyp, even if a stray `lamplit`: no suffix. Match `otyp==POT_OIL`.
6. TOOL oil lamp still D-1308 `(lit)` / charges skip. Match separate arm.
7. Candelabrum / leash / worn tool regression: gated on TOOL, not POTION. Match.
8. Lit oil + W_WEP: `(lit)` then wielded phrasing. Match post-switch.
9. `xname` still bare. Match.
10. **Public-unhit** unless a session `doname`s a lit oil flask.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode `"a flask of oil (lit)"` for a public seed. Plain ESM.

## Verification

Journal: private canary **33**/33; green+strict seed8000/0900; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361. **Public-unhit** unless lit-oil `doname`. Cadence this audit: full `sessions` at HEAD `b7a0c3c7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. `otyp==POT_OIL && lamplit` Concat `" (lit)"` with no known-gate, then post-switch W_WEP, matches C `:1488–1491`. Not a stub dispatch.

Named omits (map, not Must-fix):

1. `mksobj` `MAX_OIL_IN_FLASK` oil age
2. W_WEP `body_part(HAND)` poly — **this was the next Open; now D-1321**
3. wet-towel xname (pre-existing doname debt)

Do not Must-fix “ARMOR suffix after POTION in the flattened JS switch” (idle for oil). Do not Must-fix `xname` remaining bare.

## Callers / RNG ledger

C: invent `doname` / `prinv`; `light_cocktail` hold message. JS: same `doname`. No RNG. Public fortress is not evidence `(lit)` painted on a flask.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: lit oil now `doname`s `(lit)` with no known-gate; W_WEP poly hands stayed named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1320 `cf309315` already filled by the next port commit.
