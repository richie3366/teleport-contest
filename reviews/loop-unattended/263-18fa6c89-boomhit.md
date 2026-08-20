# Review 263 — 18fa6c89 — zap.c boomhit 10-step curve (D-1301)

## Metadata
- Full / short hash: `18fa6c892d76fb731d7694785b362f03ab543ab2` / `18fa6c89`
- Parent: `376a5a0d` (D-1300). This file audits **this SHA only**. Archive row **Addressed:** D-1301 `18fa6c89` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 19:36:23 +0200
- D-id: **D-1301**
- Stats: 9 files, +287 / −43 — `js/dothrow.js` +211 / −~20.
- Claims to close: Open `dothrow.c` boomhit (named from D-1282 / reviews **244** / **245** / **254** / **255** / **259**). Not steed. `reviews/loop-2026-08-15/` has no unpaid boomhit Must-fix.
- JS / map: `dothrow.js` `boomhit` / throwit caller / `endmultishot`; `c-js-map/turns.md`. `m_respond` / Soundeffect / `sho_obj_return_to_u` named. Lives in `dothrow.js` (C is `zap.c`; throwit-only caller, avoid zap↔dothrow cycle).
- Prior reviews this SHA claims to close: **244** named boomhit as flag-clear then linear `bhit`; **259** named it after steed potionhit.

## Intent vs deliverable

Git subject promises: “Match C zap.c boomhit so a thrown boomerang flies a 10-step curve that can return to the hero's hand, instead of traveling as a linear dart.”

C `boomhit` (`zap.c:4148–4233`): `nhits=max(1,spe+1)`; `counterclockwise=URIGHTY`; `bhitpos=u`; `xytodir`; 10-step loop: `DIR_CLAMP`; toggle boom glyph; step `xdir/ydir`; OOB backup+break; `m_at` then `m_respond` then `nhits--<0` return mon else `throwit_mon_hit`; `!ZAP_POS||closed_door` backup+break; `u_at` catch `!(Fumbling||rn2(20)>=ACURR(DEX))` else `thitu(10+spe, Maybe_Half_Phys(dmgval), &obj, "boomerang")`+`endmultishot(TRUE)`; sink `Klonk!`+`wake_nearto(...,20)`; `ct%5!=0` then `DIR_LEFT`/`DIR_RIGHT`. Caller `throwit` (`dothrow.c:1601–1611`): `BOOMERANG && !Underwater`; air/lev `hurtle(-dx,-dy,1)` then boomhit; clear `returning_missile`; `mon==&youmonst` → `exercise(A_DEX)` + `return_throw_to_inv`.

Old JS: named omit after D-1282; cleared AutoReturn then reused linear `bhit`.

The diff **does** the 10-step curve, catch/self-hit/`endmultishot`, sink, `!ZAP_POS` backup, throwit hurtle+boomhit+catch, and `throw_obj` `m_shot` so a self-hit stops the volley. It does **not** port `m_respond` (shrieker/Medusa/Erinys), Soundeffect, `snuff_candle`/`hot_pursuit` inside `throwit_mon_hit`, or `sho_obj_return_to_u`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `boomhit` | C `zap.c:4148–4233`, **new** | in `dothrow.js` (placement, not a stub) |
| throwit boomhit arm | C `:1601–1611`, **wired** | `!u.uinwater` ≡ C `Underwater` |
| `endmultishot` | C `:590–601`, **new** | ordin 1st/2nd/3rd; `m_shot.n=i` |
| `ordin` | C `hacklib.c:625–631`, **clone** | teen exception |
| `DIR_LEFT`/`RIGHT`/`CLAMP` | C `hack.h:658–662`, **clone** | `% N_DIRS` (8) |
| `URIGHTY` | C `you.h:564`, **clone** | `uhandedness==RIGHT_HANDED` |
| `Deaf_boom` | C `youprop.h` `Deaf`, **clone** | H\|E\|`uroleplay.deaf` (Klonk) |
| `Levitation_boom` | C `Levitation`, **clone** | (H\|E\|sticky `u.Levitation`) && !B |
| `closed_door_boom` | C `closed_door`, **clone** | CLOSED\|LOCKED |
| `throwit_mon_hit` | C `:1482–1506`, **clone** | live `thitmonst`; snuff/hot_pursuit named |
| `thitu` / `dmgval` / `wake_nearto` | C, **imported live** | `maybe_half_phys` live |
| `return_throw_to_inv` | C `:1855`, **pre-existing** | D-1282 |
| `tmp_at` / `nh_delay_output` | C display, **imported live** | glyph objects stand in for `S_boomleft/right` |
| `m_respond` | C `mon.c:4122–4131`, **named omit** | inside the promised loop |
| `sho_obj_return_to_u` | C `:1442`, **named omit** | display RNG; AutoReturn already cleared |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` on an import line is a const name, not DIAG. Rule #2 clean. **New gameplay RNG:** catch `rn2(20)` vs DEX; self-hit `dmgval` dice; `endmultishot` is pline-only. `m_respond` would add shriek/aggravate RNG — named skip.

## C ↔ JS fidelity

Pinned C loop (`zap.c:4174–4229`) and `nhits-- < 0` (compare **old** value, then decrement). JS:

```
            const oldHits = nhits;
            nhits = oldHits - 1;
            if (oldHits < 0) {
                tmp_at(DISP_END, 0);
                return mtmp;
            } else if ((await throwit_mon_hit(obj, mtmp)) || !game.thrownobj) {
                break;
            }
```

matches the post-decrement. Returning `mtmp` without hitting when exhausted, then throwit's `if (hitmon) thitmonst` is C `:1695` `throwit_mon_hit(obj, mon)` — one hit, not a double hit (boomhit already-hit path `break`s and returns NULL). Catch: `Fumbling() || rn2(20) >= acurr(A_DEX)` then `thitu`+`endmultishot(true)` else return `youmonst`. `Fumbling` is live `attrib.js` (H\|E). DIR macros and `ct%5!=0` turn match C. Sink uses `IS_SINK` then `Deaf_boom` / `wake_nearto(...,20)`.

Throwit caller: `BOOMERANG && !u.uinwater`; `Is_airlevel || Levitation_boom` hurtle; boomhit; clear AutoReturn; `is_youmonst_ptr` → DEX + `return_throw_to_inv`. C `Underwater` is `u.uinwater`. `Levitation_boom` adds sticky `u.Levitation` beside H/E && !B — extra OR vs `youprop.h`; public-unhit; do not Must-fix a one-line Blind-style clone (review **259**).

`throwit_mon_hit` always returns false after `thitmonst` (C same except shk-already-holds → TRUE). snuff_candle / hot_pursuit named. Glyph toggle uses `{ch,color}` objects, not `S_boomleft+S_boomright-boom` integers — display only.

This is **not** “Match C boomhit dispatch, callee is a stub.” The curve runs. Do **not** stamp “Match C `m_respond`.” Do **not** stamp “Match C `sho_obj_return_to_u`.” Placement in `dothrow.js` is not a C-wrong of the loop.

## Hallucinations / overclaim

Subject + D-1301 say a boomerang flies a 10-step curve that can return to the hero's hand. **The loop + catch + throwit arm are the hunk.** Stamping **Addressed:** D-1301 is fair. Do **not** stamp “Match C `m_respond` shrieker/Medusa/Erinys.” Do **not** stamp “Match C Soundeffect `se_boomerang_klonk`.” Do **not** stamp “Match C `snuff_candle`.” Do **not** stamp “Match C `sho_obj_return_to_u`.” Do not stamp “Match C `Levitation` ≡ no sticky `u.Levitation`.”

## Density

One C function plus the throwit caller and `endmultishot` that self-hit needs. ~211 JS lines (helpers included). At the high end of §2b, not “finish zap.c.” Did not glue `sho_obj_return_to_u`. Right size.

## Branch-by-branch confirm

1. 10 steps, turn every step except `ct%5==0`. Match `:4228–4229`.
2. URIGHTY counterclockwise (`DIR_LEFT`); lefty clockwise (`DIR_RIGHT`). Match `:4153`.
3. Catch: `!Fumbling && rn2(20)<DEX` → youmonst, `return_throw_to_inv`. Match `:4202–4215` + `:1606–1610`.
4. Fumble/low DEX: `thitu` + `endmultishot` + land later. Match.
5. `nhits` exhausted: return mon; throwit `thitmonst` once. Match `:4189–4191` + `:1695`.
6. Hit consumes obj: break, return NULL, no second hit. Match `:4192–4194`.
7. STONE / closed door: backup one step, break. Match `:4196–4200`.
8. Sink: Klonk if !Deaf; `wake_nearto` 20. Match `:4219–4224`.
9. `m_respond` still skipped. Named. **Public-unhit** unless a session throws a boomerang.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **32**/32; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws a boomerang. Cadence this audit: full `sessions` at HEAD `1a7839f7` **44**/44. I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. The 10-step curve, `nhits--`, catch/self-hit, sink, and throwit caller match C `zap.c:4148–4233` / `dothrow.c:1601–1611`.

Named omits (map, not Must-fix):

1. `m_respond` shrieker / Medusa / Erinys inside the loop
2. Soundeffect; `snuff_candle`; shk `hot_pursuit`
3. `sho_obj_return_to_u` (AutoReturn already cleared on this path)
4. sticky `u.Levitation` extra in `Levitation_boom` (idle if H/E hold)

Do not Must-fix “boomhit lives in `dothrow.js`.” Do not Must-fix “boom glyphs are `{ch,color}`.” Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was throw_gold swallow (now D-1302).

## Callers / RNG ledger

C: throwit only. JS same. Catch consumes `rn2(20)`; C `m_respond` RNG is skipped. Public fortress is not evidence a boomerang curved back to `@`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: thrown boomerangs now fly C's 10-step curve with catch/self-hit/sink; `m_respond` and `sho_obj_return_to_u` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1301 `18fa6c89`.
