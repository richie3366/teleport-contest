# Review 284 — 843343cc — objnam.c doname W_WEP !mrg_to_wielded + AKLYS tethered (D-1322)

## Metadata
- Full / short hash: `843343ccf3a2c502520bbcf956fb92d7e02fb79d` / `843343cc`
- Parent: `758ab9b1` (reviews **281–283**). JS parent `b7a0c3c7` (D-1321). This file audits **this SHA only**. Archive **Addressed:** D-1322 `843343cc` already has the short hash (filled by D-1323).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 00:37:02 +0200
- D-id: **D-1322**
- Stats: 10 files, +105 / −38 — `js/objnam.js` +18 / −~10.
- Claims to close: Must-fix review **283** — W_WEP `!mrg_to_wielded` + AKLYS `"tethered to"` on the if D-1321 rewrote. Not warn_obj. `reviews/loop-2026-08-15/` has no unpaid W_WEP-tether Must-fix.
- JS / map: `objnam.js` `doname`; `c-js-map/turns.md`. warn_obj / `artifact_light` `)` rewrite still named.
- Prior reviews this SHA claims to close: **283** QUALITY-RISK (same if / same ConcatF2).

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so merging into the wielded weapon skips the W_WEP suffix and a wielded aklys shows tethered to, instead of the clone that dropped both.”

C `doname_base` (`objnam.c:1561–1595`):

```
    if ((obj->owornmask & W_WEP) && !gm.mrg_to_wielded) {
        boolean twoweap_primary = (obj == uwep && u.twoweap),
                tethered = (obj->otyp == AKLYS);
        if ((quan != 1 || (WEAPON ? ammo||missile : !is_weptool)) && !twoweap_primary)
            Concat " (wielded)";
        else ConcatF2 " (%s %s)",
            tethered ? "tethered to"
            : twoweap_primary ? "wielded in"
              : "weapon in",
            hand_s; /* body_part(HAND) ± makeplural / URIGHTY */
        /* warn_obj / artifact_light overwrite closing paren :1599–1609 */
    }
```

`pickup.c:1881–1886` sets `gm.mrg_to_wielded` around `pickup_prinv` when `uwep==obj` after merge. Callers: invent `prinv` / `xprname` → `doname`. `xname` stays bare.

Old JS (D-1321): `owornmask & W_WEP` only; 2-arm how-string. `game.mrg_to_wielded` already set/cleared in `pickup.js:616–618` (review **11**). `body_part(HAND)` live.

The diff **does** restore `!game.mrg_to_wielded` on that if, `const tethered = (obj.otyp|0)===AKLYS`, and the 3-arm how-string with `"tethered to"` first. It does **not** port warn_obj / `artifact_light` paren rewrite. Named. It does **not** touch `zap.c` bhit (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| W_WEP `if` guard | C `:1561`, **wired** | `(owornmask & W_WEP) && !game.mrg_to_wielded` |
| `tethered = otyp==AKLYS` | C `:1563`, **wired** | `AKLYS` from `objectNames` |
| ConcatF2 how | C `:1591–1595`, **wired** | 3-arm; tethered first |
| `game.mrg_to_wielded` | C `pickup.c:1881`, **pre-existing live** | around `pickup_prinv` |
| `body_part(HAND)` / `doname_hand` | C `:1578`, **pre-existing live** | D-1321 |
| `twoweap_primary` / bimanual / URIGHTY | C `:1562/:1581–1587`, **unchanged** | |
| warn_obj / `artifact_light` | C `:1599–1609`, **named omit** | sibling after Concat; not rewritten |
| `xname` | C, **unchanged** | still no hand / tether phrasing |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Pinned C `:1561` conjunct is now JS `if ((obj.owornmask & W_WEP) && !game.mrg_to_wielded)`. Unset flag is falsy, so the suffix still shows — same as C `gm.mrg_to_wielded` default 0. While `pickup_prinv` → `prinv` → `xprname` → `doname` runs, the flag is true and JS omits `(wielded)` / `(weapon in …)` / `(tethered to …)`. That is the live path review **283** kept.

How-string is the same ternary, same arm order. Wielded aklys (`quan==1`, not ammo) takes the else arm: C `(tethered to right hand)` (or poly `paw`); JS the same Concat. Twoweap primary on a non-aklys stays `"wielded in"`. Twoweap + aklys takes the first arm (`"tethered to"`), not `"wielded in"` — C does that too.

`AKLYS` is a real `objectNames` index, not a seed-shaped stand-in. `body_part` / RING / SWAPWEP were D-1321 and this SHA does not regress them.

This is **not** “Match C W_WEP `doname` including Sting glow.” It **is** Match C `:1561` + `:1591–1595` on the rewritten if. Callee is not a stub.

## Hallucinations / overclaim

Subject + D-1322 say merge-to-uwep skips the suffix and a wielded aklys shows `tethered to` instead of the clone that dropped both. **Those two restorations are the hunk.** Stamping **Addressed:** D-1322 is fair and **closes review 283**. Do **not** stamp “Match C warn_obj glow.” Do **not** stamp “Match C `zap.c` `bhit` `THROWN_TETHERED_WEAPON`.” Do **not** treat fortress PASS as an inventory `aklys (tethered to right hand)` line.

## Density

One C W_WEP envelope (the two drops review **283** named). ~15 executable JS lines. Did not glue warn_obj or zap bhit. Right size (§2b). Filling a Must-fix on the same if is not a one-bullet waste.

## Branch-by-branch confirm

1. Pickup merge into `uwep` (`mrg_to_wielded`): C no W_WEP suffix; JS now omits. Match `:1561` + `pickup.c:1881–1883`.
2. Wielded AKLYS, quan 1, not twoweap: `"tethered to"` + `body_part(HAND)`. Match `:1563` + `:1592`.
3. Twoweap primary, not aklys: `"wielded in"`. Match how-arm 2 of 3.
4. Twoweap + aklys: `"tethered to"` wins. Match C ternary order.
5. Stack / ammo / missile ` (wielded)` when `!twoweap_primary`. Match `:1571–1576`.
6. Bimanual `makeplural(body_part(HAND))`. Unchanged; still live.
7. SWAPWEP / RING. Unchanged this SHA.
8. warn_obj / `artifact_light` closing paren. Still omitted. Named `:1599–1609`.
9. **Public-unhit** unless a session `doname`s a wielded aklys or merge-to-uwep `prinv`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode `"tethered to right hand"` for one seed. Plain ESM.

## Verification

Journal: private canary **21**/21; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on aklys phrasing / merge-prinv. Cadence this audit: full `sessions` at HEAD `2cdf2b1f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS does not exercise the restored guard.

## Actionable C-wrongs

None for Must-fix. The rewritten `if` now matches C `:1561–1595`. Review **283**’s Keep’d family is shipped.

Named omits (map, not Must-fix):

1. warn_obj / `artifact_light` closing-paren rewrite (`:1599–1609`)
2. `zap.c` bhit `THROWN_TETHERED_WEAPON` / `isqrt` — next SHA (D-1323)

Do not Must-fix “export `AKLYS`.” Do not Must-fix RING using `doname_hand` (D-1321). Do not Must-fix `xname` of a wielded aklys.

## Callers / RNG ledger

C: every `doname` of a wielded object; pickup merge `prinv`. JS: same. No RNG. Public fortress is not evidence `tethered to` or a merge without `(wielded)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: the W_WEP `if` again skips on live `mrg_to_wielded` and an aklys uses `"tethered to"`; warn_obj glow stays named.
- Must-fix stays empty for this SHA; review **283** is closed by D-1322 `843343cc`.
