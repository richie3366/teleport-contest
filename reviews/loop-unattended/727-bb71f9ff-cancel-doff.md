# Review 727 — bb71f9ff — do_wear.c cancel_doff / doffing accessory takeoff.what (D-1766)

## Metadata
- Full / short hash: `bb71f9ff03a29ed0b1ef9e5de334ba14f4cf2e0f` / `bb71f9ff`
- Parent: `3b34b789` (D-1765). This file audits **this SHA only** (ninth of nine `js/` commits since review **718**). Archive **Addressed:** D-1766 (hash filled this audit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 06:02:13 +0200
- D-id: **D-1766**
- Stats: `js/do_wear.js` +49/−13; `js/do.js` +4/−1. Total `js/` insertions **53** <250. Band **150–350** (id >454 → 200-floor).
- Claims to close: Open `cancel_doff` after D-1765 / D-1757 named omit. Not setnotworn `monstunseesu_prop`. `reviews/loop-2026-08-15/` has no unpaid doff Must-fix.
- JS / map: `do_wear.js` `cancel_doff`/`doffing`/`setworn`; `do.js` `setnotworn`. `c-js-map/turns.md`.
- Prior: D-1757 named `cancel_doff`. Review **718** ACCEPT-WITH-DEBT.

## Intent vs deliverable

Git subject promises: Match C `do_wear.c` `cancel_doff` so I_SPECIAL skips `cancel_don` and `takeoff.mask` drops the slot, with `setworn`/`setnotworn` callers and `doffing` accessory `takeoff.what`, instead of omitting the helper after D-1765.

`node scripts/csym.mjs cancel_doff` → `do_wear.c:1643–1659`. `--callers cancel_doff`: comments; `do_takeoff` I_SPECIAL `:2830` / clear `:2893`; `worn.c` `setworn` `:110`; `setnotworn` `:164`. `doffing` `:1600–1640`. `donning` `:1572–1597` (calls `doffing` first). `cancel_don` `:1662–1684`.

```1643:1659:nethack-c/upstream/src/do_wear.c
void
cancel_doff(struct obj *obj, long slotmask)
{
    if (!(svc.context.takeoff.mask & I_SPECIAL) && donning(obj))
        cancel_don(); /* applies to doffing too */
    svc.context.takeoff.mask &= ~slotmask;
}
```

Parent: named omit at `setworn` oobj; `setnotworn` skipped the helper; `doffing` armor-only (`W_ARM`…); `do_takeoff` already set/cleared I_SPECIAL. The diff **does** port `cancel_doff`, call it from `setworn` after old-item props (before slot assign) and from `setnotworn` before clearing the slot, and add amulet/ring/blindf/wep/swap/quiver `takeoff.what` arms (armor compares switched to `WORN_*` aliases of the same `W_*` bits). It **does not** add setnotworn `monstunseesu_prop` / `update_inventory`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `cancel_doff` | LIVE new | `:1643–1659`; I_SPECIAL skip + mask clear |
| `cancel_don` | CLONE local | already `do_wear.js:2483`; do **not** write #2 |
| `donning` | CLONE local | already; `doffing` first then `*_on` |
| `doffing` | CLONE repaired | was armor-only; now full `:1600–1640` |
| `setworn` caller `:110` | LIVE repaired | after oc_oprop/`w_blocks`/artifact |
| `setnotworn` caller `:164` | LIVE repaired | before slot null |
| `do_takeoff` I_SPECIAL `:2830`/`:2893` | LIVE already | parent |
| `takeoff_info` | CLONE local | `svc.context.takeoff` stand-in |
| `monstunseesu_prop` / `update_inventory` on setnotworn | OMIT named | C `:170`/`:182` |
| `WORN_ARMOR`…`WORN_BLINDF` | LIVE const | `= W_ARM` / `W_AMUL` / … |

`node scripts/sym.mjs`:

```
cancel_doff      js/do_wear.js:2471   sync
cancel_don       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:2483
             => Do NOT write clone #2.
donning          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:2530
             => Do NOT write clone #2.
doffing          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:2505
             => Do NOT write clone #2.
setworn          js/do_wear.js:497   sync
setnotworn       js/do.js:439   sync
takeoff_info     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_wear.js:1362
I_SPECIAL        js/const.js:2605   sync   export const
WORN_ARMOR       js/const.js:2962   sync   export const
WORN_AMUL        js/const.js:2968   sync   export const
LEFT_RING        js/const.js:2957   sync   export const
```

`--can do.js do_wear.js cancel_doff`: **ALREADY** (static import). FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No RNG in this helper (`rn2`/`rnd` none).

## C ↔ JS fidelity

**`cancel_doff` (`:1656–1658`).** Gate: `!(takeoff.mask & I_SPECIAL) && donning(obj)` then `cancel_don()`; always `takeoff.mask &= ~slotmask`. JS `takeoff_info()` the same (`| 0` / `& ~slotmask`). `donning` already returns true when `doffing` (C `:1579–1580`), so accessory `takeoff.what` now feeds this gate. **Match.**

**`do_takeoff` I_SPECIAL (`:2830` / `:2893`).** Set at entry, clear before return, so `Armor_off` → `setworn(NULL)` → `cancel_doff` does **not** `cancel_don` mid-'A'. JS `:1395` / `:1452` already. LIVE. **Match.**

**`setworn` (`worn.c:89–111`).** After twoweap, owornmask clear, oc_oprop, `monstunseesu_prop`, `w_blocks`, artifact; **then** `cancel_doff(oobj, wp->w_mask)`; then `*(wp->w_obj) = obj`. JS the same order (`confer_oc_oprop` / `monstunseesu_prop` / `apply_w_blocks` / artifact then `cancel_doff(oobj, wmask)`). Skin `W_ARM|I_SPECIAL` arm unchanged. **Match the caller.**

**`setnotworn` (`worn.c:160–166`).** On matching slot: `cancel_doff` then null the pointer. JS `:448` then `:449`. **Match the new call.** Remaining C `:170` `monstunseesu_prop` and `:182` `update_inventory` still omitted (setworn already has both from D-1757). Named.

**`doffing` (`:1608–1637`).** Armor: `afternmv == *_off || what == WORN_*`. 1-turn items: `what` only (no afternmv). JS now the full chain. `WORN_ARMOR === W_ARM` etc. — armor behavior unchanged from parent `W_ARM` compares; accessories newly LIVE. **Match.**

**`cancel_don` / `donning`.** Unchanged clones; `donning` still `doffing` first then `*_on`. C accessories have no `*_on` afternmv. **Match the shipped callees.** Do not add clone #2.

## Hallucinations / overclaim

Subject / D-log “Match C `cancel_doff`” is true for the helper and both callers. “not a public FAIL” is true **for this SHA vs parent**: bisect of the four cadence FAILs pins **D-1765**, and this SHA keeps the same RNG prefixes. Journal “fortress held” is still wrong as a suite claim (parent already 40/44) — that is not a C-wrong in `cancel_doff`. `stop_donning` comment still says accessory `takeoff.what` named; the `doffing` body no longer omits those arms (comment drift only).

## Density

§2b: one C helper + the two C callers + the `doffing` arms `donning`/`cancel_doff` need. +53. Did **not** glue Cloak_off mummy or `inaccessible_equipment`. Did **not** invent a FAIL peel for the parent fortress break.

## Verification

D-log: save-oracle skip (untagged `do_wear.c:cancel_doff`); node canary (I_SPECIAL skip, donning `cancel_don`, idle mask-only, amulet arm, setworn/setnotworn callers); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Accessory 'A' continuation **public-unhit** beyond the canary. Admit that. Cadence at this SHA is **40/44** (inherited from D-1765, not caused here).

## Actionable C-wrongs

None for Must-fix (`cancel_doff` / callers / `doffing` match C; remaining named). Named: setnotworn `monstunseesu_prop` / `update_inventory`; Cloak_off mummy/invis/alchemy; Boots_off SPEED/water/levitation; `inaccessible_equipment`. Do **not** write `cancel_don` #2. Do **not** write `doffing` #2. Do **not** skip I_SPECIAL in `do_takeoff`. Do **not** “fix” D-1765 gbuf in a wear iter.

Verdict: **ACCEPT-WITH-DEBT**
