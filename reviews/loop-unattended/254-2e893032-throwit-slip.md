# Review 254 — 2e893032 — dothrow.c throwit cursed/greased slip (D-1292)

## Metadata
- Full / short hash: `2e89303224e8d2e973920371bd24000a982a0d00` / `2e893032`
- Parent: `c6fa1420` (D-1291). This file audits **this SHA only**. Archive row **Addressed:** D-1292 `2e893032` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 17:23:49 +0200
- D-id: **D-1292**
- Stats: 9 files, +99 / −30 — `js/dothrow.js` +26 / −3.
- Claims to close: Open `dothrow.c` throwit slip (named from D-1283 / reviews **244** / **245**). Not stamina. `reviews/loop-2026-08-15/` has no unpaid slip Must-fix.
- JS / map: `dothrow.js` `throwit`; `c-js-map/turns.md`. stamina / steed potion / boomhit / `sho_obj_return_to_u` named.
- Prior reviews this SHA claims to close: **245** named omit `!rn2(7)` slip before `thrownobj`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a cursed or greased throw can slip or misfire (!rn2(7)) and reroll dx/dy, instead of always flying the chosen direction.”

C `throwit` (`dothrow.c:1525–1547`) **before** stamina / `gt.thrownobj`: `gn.notonhead = FALSE`; if `(cursed||greased) && (dx||dy) && !rn2(7)`: `ammo_and_launcher(obj,uwep)` → `Tobjnam` misfire; else greased/`throwing_weapon` → slip; else `slipok=FALSE`. On slipok: `dx=rn2(3)-1`, `dy=rn2(3)-1`, both 0 → `dz=1`, `impaired=TRUE`. `throwing_weapon` `:1430–1438`: missile/spear / (blade && !sword && PIERCE) / WAR_HAMMER / AKLYS. `Tobjnam` (`objnam.c:2290–2298`): `The(xname)` + `otense`. Caller `throw_obj` `:269–270` `freeinv` then `throwit`. Vertical-only (`!dx && !dy`) never enters the `if`.

Old JS: named omit after D-1283; `throwit` set `thrownobj` then swallow/dz/bhit on the getdir vector. Never consumed `rn2(7)`.

The diff **does** `notonhead` reset, the cursed/greased `!rn2(7)` block, misfire vs slip vs `slipok` false, dx/dy reroll, `dz=1` at 0,0, and `impaired=true`. It does **not** port stamina, steed `rn2(6)`, boomhit body, or `sho_obj_return_to_u`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `notonhead = false` | C `:1525`, **wired** | `game.notonhead` |
| slip `if` | C `:1526–1547`, **new** | before thrownobj |
| `ammo_and_launcher` | C `obj.h:244`, **imported live** | `wield.js`; `u.uwep` ≡ `uwep` |
| `throwing_weapon` | C `:1430–1438`, **local clone** | matches `is_missile`/`is_spear`/`is_blade`/`is_sword` + hammer/aklys |
| `is_spear`/`is_blade`/`is_sword` | C `obj.h:213–234`, **local clones** | skill ranges match macros |
| `Tobjnam` | C `objnam.c:2290`, **local clone** | `The(xname)` + `otense`; matches |
| `throw_impaired` | C `:1521–1522`, **pre-existing clone** | slip sets `true` |
| `rn2` | C, **imported live** | `rn2(7)` then maybe two `rn2(3)` |
| stamina / steed / boomhit | C after this, **named omit** | stamina is D-1293 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(7)` then, on slipok, `rn2(3)` twice.

## C ↔ JS fidelity

Pinned C (`dothrow.c:1526–1546`):

```
    if ((obj->cursed || obj->greased) && (u.dx || u.dy) && !rn2(7)) {
        boolean slipok = TRUE;
        if (ammo_and_launcher(obj, uwep)) {
            pline("%s!", Tobjnam(obj, "misfire"));
        } else {
            if (obj->greased || throwing_weapon(obj))
                pline("%s as you throw it!", Tobjnam(obj, "slip"));
            else
                slipok = FALSE;
        }
        if (slipok) {
            u.dx = rn2(3) - 1;
            u.dy = rn2(3) - 1;
            if (!u.dx && !u.dy)
                u.dz = 1;
            impaired = TRUE;
        }
    }
```

JS copies the guard, the misfire-first arm, then `else if (greased || throwing_weapon)` else `slipok=false` — same as C’s nested `else`. `PIERCE` is `1` (`objclass.h:79`). `WAR_HAMMER` / `AKLYS` are `objectNames` indices. Uncursed ungreased never calls `rn2(7)`. Down/up-only (`dz` without dx/dy) never enters. Cursed long sword: not ammo, not greased, `throwing_weapon` false (`is_sword`) → `slipok` false, no `rn2(3)`. Cursed dart without launcher: slip (missile). Arrow+bow: misfire. Greased sword: slip. 0,0 reroll forces `dz=1` (hitfloor), and `impaired=true` so AutoReturn will not return to hand (D-1282 ceiling gate is `returning && !impaired`).

This is **not** “Match C dispatch, callee is a stub.” `ammo_and_launcher` is live; `throwing_weapon` / `Tobjnam` clones match the cited C, not diverging stand-ins. `throw_obj` still `freeinv`s before `throwit`.

At **this** SHA stamina is still absent (named). Slip-to-feet (`dx=dy=0`,`dz=1`) would skip C stamina anyway (`dz<1` is false).

## Hallucinations / overclaim

Subject + D-1292 say a cursed or greased horizontal throw can slip/misfire and reroll dx/dy. **The `if` + clones + `notonhead` are the hunk.** Stamping **Addressed:** D-1292 is fair. Do **not** stamp “Match C stamina.” Do **not** stamp “Match C steed potionhit `rn2(6)`.” Do **not** stamp “Match C boomhit / `sho_obj_return_to_u`.” Do not Must-fix “`throwing_weapon` is a local clone” — it matches `:1430–1438`.

## Density

One C `if` at the named site plus the helper that arm already required. ~20 JS lines. Did not glue stamina. Right size.

## Branch-by-branch confirm

1. Uncursed east dart: no `rn2(7)`. Match guard.
2. Cursed dart, `rn2(7)≠0`: no slip. Match `!rn2(7)`.
3. Cursed dart, `rn2(7)==0`: `"The dart slips as you throw it!"` + two `rn2(3)`. Match missile arm.
4. 0,0 reroll: `dz=1`, later hitfloor. Match `:1543–1544`.
5. Cursed sword: `slipok` false; vector unchanged. Match else.
6. Greased sword: slip. Match greased.
7. Arrow + bow: `"The arrow misfires!"`. Match ammo+launcher.
8. Slipped aklys: `impaired=true` → no ceiling return-to-hand. Match D-1282 gate.
9. `t`+`<` / `>` only: `(dx||dy)` false; no slip. Match.
10. Stamina / steed / boomhit still skipped. Named. Public-unhit unless a session throws cursed/greased horizontally.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `!rn2(7)` is C’s dice, not a trace index.

## Verification

Journal: private canary **13**/13; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws cursed/greased horizontally. Cadence this audit: full `sessions` at HEAD `c37bd683` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Guard, misfire/slip/`slipok`, RNG order, `dz=1`, and `impaired` match C `:1525–1547`.

Named omits (map, not Must-fix):

1. stamina drop (Open then D-1293)
2. steed potionhit `rn2(6)`; boomhit; `sho_obj_return_to_u`
3. throw_gold swallow; thitmonst vanish; objsplit unsplit

Do not Must-fix “`Tobjnam`/`throwing_weapon` clones.” Do not Must-fix “`throw_impaired` extra `game.Confusion`.” Do not pull stamina this SHA.

## Callers / RNG ledger

C: `throw_obj` after `freeinv`. JS same. New: `rn2(7)` then maybe `rn2(3)`×2. Public fortress is not evidence a cursed dart slipped.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: cursed/greased horizontal throws now consume `!rn2(7)` and can reroll dx/dy like C; stamina stayed named for D-1293.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1292 `2e893032`.
