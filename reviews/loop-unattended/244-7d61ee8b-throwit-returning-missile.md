# Review 244 — 7d61ee8b — dothrow.c throwit returning_missile (D-1282)

## Metadata
- Full / short hash: `7d61ee8ba2602dd7ec13b1304cd10060f4e33f3f` / `7d61ee8b`
- Parent: `7a783c86` (D-1281). This file audits **this SHA only**. Archive row **Addressed:** D-1282 lacked the short hash; this review commit fills `7d61ee8b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 14:46:08 +0200
- D-id: **D-1282**
- Stats: 9 files, +356 / −130 — `js/dothrow.js` +267 / −~40.
- Claims to close: Open `dothrow.c` throwit returning_missile (named from D-1274 / review **236**). Not swallowit. `reviews/loop-2026-08-15/` has no unpaid returning_missile Must-fix.
- JS / map: `dothrow.js` `AutoReturn` / `throwit_return` / `throwit` / `throw_obj` / `throw_ok` / `return_throw_to_inv`; `c-js-map/turns.md`. swallowit / slip / stamina / steed / boomhit / `sho_obj_return_to_u` named.
- Prior reviews this SHA claims to close: **236** named omit returning_missile ceiling-return (JS always `toss_up` on `u.dz<0`).

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a wielded aklys or Valkyrie Mjollnir returns to the hero's hand from the ceiling or after flight, instead of always tossing onto the head or landing.”

C: `AutoReturn` (`dothrow.c:30–34`) W_WEP && (AKLYS || (ART_MJOLLNIR && Valk)) || BOOMERANG; `throw_obj` `:250–271` captures `wep_mask` before `freeinv`, `oldslot=nobj`, `remove_worn_item`, `throwit(..., wep_mask, twoweap, oldslot)`, `encumber_msg`; `throwit` `:1564–1599` sets `iflags.returning_missile`, then swallow (named) else `u.dz<0 && returning && !impaired` ceiling `return_throw_to_inv` else `toss_up` / steed potion / `hitfloor`; post-bhit `:1710–1777` `rn2(100)` then `!impaired && rn2(100)` `addinv_before`+`setuwep` else fail-catch `rn2(2)`/`rnd(3)` dropy. `throw_ok` `:325–328` AutoReturn SUGGEST before lone-uwep DOWNPLAY.

Old JS: `throwit(obj)` no wep_mask; `u.dz<0` always `toss_up`.

The diff **does** AutoReturn + throwit_return + wep_mask/oldslot + ceiling-return + post-flight `rn2(100)` block + throw_ok SUGGEST. It does **not** port swallow-before-dz, slip `rn2(7)`, stamina, steed `rn2(6)`, boomhit body, `sho_obj_return_to_u` (display RNG), or objsplit unsplit. Named. Boomerang clears the flag then still uses the pre-existing bhit fly (C `else if` boomhit instead).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `AutoReturn` | C `:30–34`, **new** | `is_art` live; `Role_if` local |
| `throwit_return` | C `:1460–1465`, **new** | every exit after the flag |
| `throwit` wep_mask | C `:1510–1516`, **wired** | now exported |
| ceiling-return | C `:1580–1587`, **wired** | `return_throw_to_inv` |
| post-bhit return | C `:1710–1777`, **wired** | `throwit_returning_missile` |
| `return_throw_to_inv` | C `:1855–1908`, **clone-ish** | live `addinv`/`setuwep`; unsplit named |
| `addinv_before_throw` | C `addinv_before`, **clone** | JS array splice analog |
| `throw_ok` AutoReturn | C `:325–328`, **wired** | before DOWNPLAY |
| `throw_obj` wep_mask | C `:250–271`, **wired** | `remove_worn_item` live |
| `Tobjnam` | C `objnam.c`, **clone** | uses existing `otense` |
| `throw_impaired` | C `:1521–1522`, **clone** | `Fumbling` live; local `Blind()` |
| `Levitation_throw` | C `Levitation`, **clone** | miss `!BLevitation` on fail-catch wording |
| `sho_obj_return_to_u` | C `:1442–1456`, **named omit** | `rn2_on_display_rng` only |
| swallowit / boomhit / slip | C, **named omit** | boomhit: flag-clear guard only |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **Gameplay RNG** matches C polarity: `!rn2(100)` fail-to-return (1%); then `!impaired && rn2(100)` catch; fail-catch `rn2(2)` then maybe `rnd(3)`. `sho_obj_return_to_u` skipped is display-rng, not positional.

## C ↔ JS fidelity

Ceiling (`:1580–1587`): `u.dz<0 && returning_missile && !impaired` → pline hit ceiling + `return_throw_to_inv`; else `toss_up(rn2(5)&&!Underwater)`. JS same, `Underwater` ≡ `u.uinwater` (`youprop.h:279`). Then `throwit_return(TRUE)`. Match. Unwielded/impaired still `toss_up` (D-1274). This is **not** “Match C dispatch, callee is a stub”: `setuwep`/`addinv`/`encumber_msg` are live.

Post-bhit: C `if (rn2(100)) { display; if (!impaired && rn2(100)) catch else fail-catch; throwit_return(TRUE); return; } else { fail pline; land }`. JS `if (!rn2(100)) { fail; return false; }` then catch / fail-catch. Same two `rn2(100)` and the 1% land-at-target path. Catch uses `addinv_before`+`setuwep`+`set_twoweap` like C `:1717–1728`, not `return_throw_to_inv` (C ceiling vs post-bhit differ; JS copies that). Fail-catch `rn2(2)`/`rnd(3)`/`artifact_hit`/`maybe_half_phys`/`losehp` then `ship_object`/`dropy`. `killer_xname` vs `xname` named polish. `u.uswallow` swallowit named.

`AutoReturn` matches the macro (`is_art` ≡ `oartifact==`). `throw_ok` SUGGEST before lone-uwep DOWNPLAY matches `:325–331`. `wep_mask` before `freeinv` matches `:250`. Quan>1 split does not set `oldslot` (C `oldslot=0` until quan==1). Match.

Boomerang: C never reaches the Mjollnir post-bhit block (`else if` boomhit, then `returning_missile=0`). JS clears the flag then flies via existing bhit so AutoReturn cannot steal a boomerang. Named omit of boomhit, not a C-wrong that returns a dart like Mjollnir.

## Hallucinations / overclaim

Subject + D-1282 say wielded aklys / Valk Mjollnir return from ceiling or after flight. **AutoReturn + ceiling + post-bhit `rn2(100)` are the hunk.** Stamping **Addressed:** D-1282 is fair. Do **not** stamp “Match C swallowit.” Do **not** stamp “Match C boomhit / tether / `sho_obj_return_to_u`.” Do **not** stamp “Match C slip `rn2(7)` / stamina / steed `rn2(6)`.” Do not stamp “Match C `unsplitobj`.”

## Density

One returning_missile envelope: macro + throw_ok + throw_obj capture + throwit dz/post-bhit. ~267 JS lines. §2b item-class envelope (aklys/Mjollnir), not “finish throw.” Did not glue swallowit.

## Branch-by-branch confirm

1. Wielded aklys `t`+`<`, not impaired: ceiling pline + `addinv`+`setuwep`. Match `:1580–1587`.
2. Unwielded / impaired up: `toss_up` `rn2(5)`. Match else-if `:1588–1589`.
3. Dart up: no AutoReturn, `toss_up`. Match.
4. Horizontal aklys: `rn2(100)` then `rn2(100)` catch → hand. Match `:1711/:1717`.
5. `!rn2(100)` 1%: “fail to return”, land at target. Match `:1760–1776`.
6. Impaired or second `rn2` fail: drop at feet / hit arm `rn2(2)`/`rnd(3)`. Match `:1729–1756`.
7. Valk + Mjollnir + STR19(25): AutoReturn; throw_ok SUGGEST. Match.
8. Boomerang: flag cleared, no Mjollnir return. boomhit named skip.
9. Swallow / slip / stamina / steed: still skipped. Match the omit.
10. Public Tourist darts. Public-unhit unless a session throws wielded aklys / Valk Mjollnir.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **14**/14 (C AutoReturn/ceiling/post-bhit; JS live; wielded aklys `t`+`<` return; dart toss_up; unwielded/impaired toss_up; horizontal return; boomerang no steal; Valk Mjollnir; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws wielded aklys / Valk Mjollnir. Cadence this audit: full `sessions` at HEAD `7d61ee8b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.844).

## Actionable C-wrongs

None for Must-fix. Ceiling and post-bhit `rn2(100)` match C call-for-call; catch/fail-catch callees are live `addinv`/`setuwep`/`losehp`, not stubs. Swallow/boomhit/slip are named later arms.

Named omits (map, not Must-fix):

1. `u.uswallow` before `u.dz` / fail-path `swallowit` (next Open)
2. slip `rn2(7)`; stamina drop; steed potion `rn2(6)`
3. boomhit body; `sho_obj_return_to_u` / tethered `tmp_at`; objsplit unsplit
4. `killer_xname`; `throw_impaired` local `Blind()` vs `(H\|\|E)&&!B`

Do not Must-fix “boomerang flag-clear without boomhit.” Do not Must-fix “post-bhit uses `addinv`+`setuwep` not `return_throw_to_inv`” (that is C). Do not pull swallowit this SHA.

## Callers / RNG ledger

C: `throw_obj` volley. JS: same. New positional RNG only on AutoReturn paths (`rn2(100)` ×2, fail-catch `rn2(2)`/`rnd(3)`). Display rng in `sho_obj_return_to_u` named skip. Public fortress is not evidence an aklys returned from the ceiling.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wielded aklys/Valk Mjollnir now return from ceiling and after flight via live `addinv`/`setuwep`; swallowit / boomhit / slip stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1282 `7d61ee8b`.
