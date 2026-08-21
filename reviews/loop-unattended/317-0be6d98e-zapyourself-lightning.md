# Review 317 — 0be6d98e — zap.c zapyourself WAN_LIGHTNING (D-1355)

## Metadata
- Full / short hash: `0be6d98e9f25b533b091ab34b76bd978dd49ef02` / `0be6d98e`
- Parent: `262f16f5` (reviews **313–316** + cadence **#1720**). This file audits **this SHA only** (first of four `js/` commits since review **316**).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 11:05:02 +0200
- D-id: **D-1355**
- Stats: 10 files, +159 / −24 — `js/zap.js` +80 / −2 (`flashburn` + WAN_LIGHTNING arm). Archive **Addressed:** D-1355 `0be6d98e` already has the short hash (filled by D-1356).
- Claims to close: Open `zap.c` `zapyourself` WAN_LIGHTNING (named from D-1345 / reviews **307** / **316**). Not killer_xname. `reviews/loop-2026-08-15/` has no unpaid lightning Must-fix.
- JS / map: `zap.js` `zapyourself` + new `flashburn`; callees `destroy_items`, `learnwand`, `make_blinded`, `d`/`rnd`; `c-js-map/turns.md` + `debt.md`. ugolemeffects / shieldeff / `maybe_destroy_item` AD_ELEC body / WAN_MAGIC_MISSILE / SPE_FIREBALL / `lightdamage` still named.
- Prior reviews this SHA claims to close: **307** named lightning self-zap as default-0; **316** queued this Open row.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself so a self-aimed wand of lightning actually shocks (or resists) and flash-blinds, instead of doing nothing.”

C `zapyourself` (`zap.c:2730–2746`):

```
    case WAN_LIGHTNING:
        learn_it = TRUE;
        orig_dmg = d(12, 6);
        if (!Shock_resistance) {
            You("shock yourself!");
            damage = orig_dmg;
            exercise(A_CON, FALSE);
            monstunseesu(M_SEEN_ELEC);
        } else {
            shieldeff(u.ux, u.uy);
            You("zap yourself, but seem unharmed.");
            monstseesu(M_SEEN_ELEC);
            ugolemeffects(AD_ELEC, orig_dmg);
        }
        (void) destroy_items(&gy.youmonst, AD_ELEC, orig_dmg);
        (void) flashburn((long) rnd(100), TRUE);
        break;
```

C `flashburn` (`zap.c:3059–3079`): `!resists_blnd(&youmonst)` → You flash + `make_blinded(duration, FALSE)` + maybe vision-clears; `via_lightning` skips arti `shieldeff`.

Old JS: WAN_LIGHTNING fell through `default` → `damage=0`, no `d(12,6)`, no flash.

The diff **does** add the case (always `learn_it`; `d(12,6)`; shock/exercise vs unharmed; `destroy_items` AD_ELEC; `flashburn(rnd(100), true)`) and a `flashburn` export. It does **not** port `ugolemeffects` / `shieldeff` / `monstseesu`. Named. It does **not** port `maybe_destroy_item` AD_ELEC (`zap.js:1120–1122` still `return 0`). Named; already Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_LIGHTNING arm | C `:2730–2746`, **wired** | learn + dice + Shock split + destroy + flash |
| `flashburn` | C `:3059–3079`, **wired export** | C callee, not a zhitm clone |
| `d(12,6)` / `rnd(100)` | C, **imported live** | order: dice → destroy_items RNG → flash duration |
| `Shock_resistance()` | C `youprop.h:44` `H\|\|E`, **clone** | sticky `u.Shock_resistance` like FIRE/COLD in this file |
| `destroy_items` | C `:5974+`, **imported live dispatch** | outer limit/`rn2` runs; AD_ELEC **body** stub |
| `maybe_destroy_item` AD_ELEC | C `:5858–5879`, **named omit** | JS `else return 0` before `rn2(3)` |
| `learnwand` | C, **imported live** | after the switch, same as other arms |
| `make_blinded` | C `do.c`, **dynamic import live** | talk=FALSE |
| `exercise(A_CON,false)` | C, **imported live** | only `!Shock` |
| `ugolemeffects` / `shieldeff` | C `:2739–2742`, **named omit** | resist arm |
| `resists_blnd` expl/gaze / arti | C `mondata.c:260–265`, **named omit** | JS Blind/Unaware only |
| `Unaware` / `Blind_props` | C macros, **clones** | zap-local; not eat.js `unconscious()` |
| WAN_MAGIC_MISSILE / SPE_FIREBALL | C next cases, **named omit** | still `default` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `d(12,6)` then `destroy_items` limit/`rn2` then `rnd(100)`. C same order. AD_ELEC body would still burn per-item `rn2(3)` / wand `rnd(10)` — named.

## C ↔ JS fidelity

Arm order matches `:2731–2746`. `orig_dmg` is always rolled, even when Shock zeros hero `damage`. `dozap` then `losehp` only if `damage` (`zap.c:2658–2663` / JS `:3895–3900`). Resist: JS prints the unharmed You and skips golem heal. Named. Shock: You + `damage=orig_dmg` + `exercise(A_CON,false)`. Match.

`flashburn(true)`: seeing hero gets the flash You, `make_blinded(duration,false)`, then `!Blind` vision-clears. `via_lightning` true → the `!via_lightning && resists_blnd_by_arti` sparkle is skipped in both. Match `:3062–3078` for Blind/Unaware and for lightning-skip-sparkle.

`resists_blnd_you` is **not** C `resists_blnd`. C also returns true for expl/gaze AD_BLND (yellow light / Archon) and `resists_blnd_by_arti` (Sunsword). Named. Zap `Unaware` is `multi<0 && (usleep \|\| u.Unaware)`, not C `unconscious() \|\| is_fainted()`. A fainted self-zap would flash in JS and resist in C. Edge; named clone, not a stub `flashburn`.

`destroy_items(..., AD_ELEC, orig_dmg)` is a **live call** of a function whose AD_ELEC **guts** no-op. Outer `rn2(DMG_DESTROY_SCALE)` still burns. `destroyable` treats RIN_SHOCK / WAN_LIGHTNING as eligible (C immune `:5642–5644`) so reservoir `rn2` can differ, then `maybe_destroy_item` returns 0 without `rn2(3)`. That is the already-Open AD_ELEC body, not a WAN_LIGHTNING arm that skips the call.

Hallucination check: “Match C `zapyourself`” while **`maybe_destroy_item` AD_ELEC is a stub** is an overclaim on **ring/wand explode**. The **`:2730–2746` shock/resist/flash** path is live (`flashburn` is a real function, `make_blinded` is live). Dispatch is not a stub that still `damage=0`. Do **not** stamp “Match C `ugolemeffects`.” Do **not** stamp “Match C AD_ELEC destroy.” Do **not** stamp “Match C WAN_MAGIC_MISSILE.”

## Hallucinations / overclaim

Subject says a self-aimed wand of lightning shocks (or resists) and flash-blinds instead of doing nothing. **True for hero HP and the flash pline when not Blind/Unaware.** **False for item destruction** until AD_ELEC `maybe_destroy_item`. **False for golem heal / shield sparkle** until those callees. D-1355 **Not this iter** names those. Stamping **Addressed:** D-1355 for the arm + `flashburn` is fair. Do **not** treat fortress PASS as `"You shock yourself!"`.

## Density

One `switch` arm plus its one callee (`flashburn`). ~80 lines. Playbook §2b: this was the named default-0 lie inside live `zapyourself` (**307**), not a one-line comment peel. Did not glue MAGIC_MISSILE / FIREBALL (sibling arms, already Open). Acceptable.

## Branch-by-branch confirm

1. Seeing, `!Shock`: `d(12,6)` returned; shock You; `exercise`; `rnd(100)` flash. Match `:2732–2736` / `:2745`.
2. Seeing, Shock: damage 0; unharmed You; still `destroy_items` + flash. Match `:2738–2745` minus golem/shield.
3. Already Blind: skip flash You; still `rnd(100)` (caller burns before the `if`). Match — C `flashburn` does not roll; the caller does.
4. `via_lightning` true: no arti sparkle even if Sunsword. Match `:3075`.
5. `learn_it` then `learnwand` after switch. Match other arms / C after the switch.
6. MAGIC_MISSILE / FIREBALL: still default 0. Named.
7. WAN_LIGHT `flashburn(FALSE)`: still named (broken-wand comment only).
8. AD_ELEC destroy: call runs, body 0. Named.
9. `dozap` `losehp` uses D-1345 killer string when damage>0. Match `:2658–2663`.
10. **Public-unhit** unless a session self-zaps lightning.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `WAN_LIGHTNING` is an object token, not a recorded coordinate. Plain ESM. Dynamic `import('./do.js')` is in-process, not filesystem.

## Verification

Journal: private canary **25**/25; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on lightning self-zap. This audit cadence: full `sessions` at HEAD `fbfc72d9` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a shock/flash.

## Actionable C-wrongs

None for Must-fix. The WAN_LIGHTNING arm matches C `:2730–2746` call-for-call except the **named** resist-side callees. `flashburn` matches `:3059–3079` for the lightning caller. `destroy_items` is a live dispatch whose AD_ELEC body was already a named omit (Open `maybe_destroy_item` AD_ELEC) — not a clone that rolls `rn2(3)` then discards it.

Named omits (map / already-Open, not Must-fix):

1. `maybe_destroy_item` AD_ELEC body (`:5858–5879`) + RIN_SHOCK / WAN_LIGHTNING immune
2. `ugolemeffects` / `shieldeff` / `monstseesu` on the Shock arm
3. `resists_blnd` expl/gaze / `resists_blnd_by_arti`
4. WAN_MAGIC_MISSILE / SPE_FIREBALL / `lightdamage` / WAN_LIGHT `flashburn(FALSE)`

Do not Must-fix “skip `d(12,6)` when Shock” (C always rolls `orig_dmg`). Do not Must-fix “skip `rnd(100)` when Blind” (C caller always burns). Do not Must-fix “use eat.js `Unaware`” as this SHA’s Keep (named clone; fainted self-zap is not the queued arm).

## Callers / RNG ledger

C: `d(12,6)` → `destroy_items` (limit `rn2` + reservoir + per-item AD_ELEC) → `rnd(100)` → `flashburn` no RNG. JS: `d(12,6)` → `destroy_items` (limit + reservoir; **no** per-item AD_ELEC) → `rnd(100)`. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: lightning self-zap now rolls `d(12,6)`, shocks or resists, and `flashburn`s; AD_ELEC destroy and golem heal stay named.
- Must-fix stays empty for this SHA.
