# Review 324 — 17a0937c — zap.c zapyourself WAN/SPE_MAGIC_MISSILE (D-1364)

## Metadata
- Full / short hash: `17a0937cce20b18e04bbae71f0252e36f5e95f36` / `17a0937c`
- Parent: `c10f4246` (D-1363). This file audits **this SHA only** (second of four `js/` commits since review **322**). Archive **Addressed:** D-1364 `17a0937c` already has the short hash (filled by D-1365).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 13:23:38 +0200
- D-id: **D-1364**
- Stats: 10 files, +98 / −26 — `js/zap.js` +17 (`WAN`/`SPE_MAGIC_MISSILE` arm).
- Claims to close: Open `zap.c` `zapyourself` WAN_MAGIC_MISSILE (named from D-1355 / review **317**). Not WAN_LIGHTNING. `reviews/loop-2026-08-15/` has no unpaid missile Must-fix.
- JS / map: `zap.js` `zapyourself`; caller `dozap` `:2658–2663` `losehp` via `killer_xname` (D-1345); `c-js-map/turns.md` + `debt.md`. SPE_FIREBALL / `lightdamage` / WAN_MAKE_INVISIBLE / AD_ELEC body still named at this SHA.
- Prior reviews this SHA claims to close: **317** named MAGIC_MISSILE / FIREBALL as the next default-0 arms after lightning. **317** also named `ugolemeffects` / `shieldeff` / `monstseesu` on the lightning resist side — this SHA names the same callees on the missile bounce side.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself so a self-aimed wand of magic missile actually bounces (Antimagic) or deals d(4,6), instead of doing nothing.”

C `zapyourself` (`zap.c:2790–2802`):

```
    case WAN_MAGIC_MISSILE:
    case SPE_MAGIC_MISSILE:
        learn_it = TRUE;
        if (Antimagic) {
            shieldeff(u.ux, u.uy);
            pline_The("missiles bounce!");
            monstseesu(M_SEEN_MAGR);
        } else {
            damage = d(4, 6);
            pline("Idiot!  You've shot yourself!");
            monstunseesu(M_SEEN_MAGR);
        }
        break;
```

C `Antimagic` is `youprop.h` `uprops[ANTIMAGIC]` intrinsic||extrinsic (H||E). `confer_oc_oprop` (`do_wear.js:262–289`) writes cloak-of-MR / gray DSM **only** to `uprops[p].extrinsic` — it never mirrors `EAntimagic` (D-1089).

Old JS: MAGIC_MISSILE fell through `default` → `damage=0`, no `d(4,6)`, no bounce pline.

The diff **does** add the case (`learn_it`; bounce pline with no `d()`; else `d(4,6)` + two spaces after `Idiot!`). It does **not** port `shieldeff` / `monstseesu`. Named. It **does** call local `Antimagic()`, which is **not** C’s macro.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN/SPE_MAGIC_MISSILE arm | C `:2790–2802`, **wired** | learn + bounce vs `d(4,6)` |
| `learnwand` | C, **imported live** | after switch; SPBOOK skip pre-existing |
| `d(4,6)` | C, **imported live** | only `!Antimagic` |
| `pline('The missiles bounce!')` | C `pline_The`, **wired string** | not zhitu `"bounce off"` |
| `Antimagic()` | C `youprop.h`, **clone that diverges** | sticky `u.Antimagic\|\|H\|\|E` only |
| `shieldeff` / `monstseesu` | C `:2794–2796`, **named omit** | bounce side |
| SPE_FIREBALL | C next-but-one case, **named omit** | still default at this SHA |
| `spell.c` `spelleffects` SPE_MAGIC_MISSILE | C dispatcher, **named omit** | still `"Nothing happens."` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `d(4,6)` only on the `!Antimagic()` path. Bounce must **not** burn those six rolls.

## C ↔ JS fidelity

Arm order matches `:2792–2802` **except the Antimagic predicate**. `learn_it = true` always, including bounce — match. Bounce string is `"The missiles bounce!"` (`pline.c:414–420` `pline_The` ≡ `"The "` + rest), not zhitu `"The missiles bounce off!"` (`zap.js:1404–1406`). Two spaces in `"Idiot!  You've shot yourself!"` match C’s `pline` literal. `dozap` then `losehp` only if `damage` (`:2658–2663` / JS after the switch). SPE and WAN share the case. Match those.

`Antimagic()` in this file:

```
function Antimagic() {
    const u = game.u || {};
    return !!(u.Antimagic || u.HAntimagic || u.EAntimagic);
}
```

sit.js / invent.js `hero_Antimagic` / teleport.js (D-1089) also OR `uprops[ANTIMAGIC].intrinsic||extrinsic`. This clone does not. A seeing hero wearing a cloak of magic resistance (Wizard kit; `confer_oc_oprop` mask on `uprops` only) is Antimagic in C and **not** in this helper. JS then burns `d(4,6)` and prints Idiot; C prints bounce and burns **zero** dice. That is a **C-wrong** on the keep-path this SHA promised, not a named omit of sparkle.

The same sticky helper already gates WAN_STRIKING `"Boing!"` (`:3257`). This SHA newly keys MAGIC_MISSILE on it. WAN_STRIKING is pre-existing; the Must-fix family is the helper, scoped from this arm.

`shieldeff` / `monstseesu` named — visual / seen-resistance, not the dice split. Honest.

Hallucination check: “Match C `zapyourself`” while **`Antimagic()` misses conferral** is an overclaim on **cloak-of-MR bounce**. The **case is not a stub** that still returns 0 for a non-resistant hero — `d(4,6)` + Idiot is live. Do **not** stamp “Match C `youprop.h` Antimagic.” Do **not** stamp “Match C `shieldeff`.” Do **not** stamp “Match C `spelleffects` SPE_MAGIC_MISSILE” (`spell.js:1246–1248` still `"Nothing happens."` after energy).

## Hallucinations / overclaim

Subject says a self-aimed wand of magic missile bounces (Antimagic) or deals `d(4,6)` instead of doing nothing. **True for a hero whose sticky `u.Antimagic`/`H`/`E` bits are set, and for a hero with none of those bits.** **False for conferral-only Antimagic** (cloak of MR, gray DSM) until the D-1089 uprops read. D-log “Antimagic short-circuits `d(4,6)`” does not name that gap. Stamping **Addressed:** D-1364 for the arm existing is fair for the default-0 lie. It is **not** fair for “Match C bounce.” Do **not** treat fortress PASS as `"The missiles bounce!"` or `"Idiot!"`.

`spell.c` still does not dispatch SPE_MAGIC_MISSILE into `zapyourself`. Wand self-zap via `dozap` + getdir `.` **is** live. Do not stamp the spell.

## Density

One `switch` arm. ~17 lines of JS. Playbook §2b “one deferred `if` alone” is **thin**, but this was the queued Open row after lightning (**317**), not an invented polish peel. Did not glue FIREBALL (already the next Open). Acceptable as a fortress map pop **if** the Antimagic split had matched C. It does not — the thin peel shipped a diverging clone on the one predicate the arm exists to evaluate. Do not stack another sibling arm until that predicate matches D-1089.

## Branch-by-branch confirm

1. Seeing, sticky Antimagic: bounce pline; no `d(4,6)`; `learn_it`. Match `:2793–2796` minus shield/seen.
2. Seeing, no Antimagic bits: `d(4,6)` returned; Idiot two spaces; `dozap` `losehp`. Match `:2798–2800`.
3. Cloak of MR / gray DSM via `confer_oc_oprop` only: C bounce, no dice. JS Idiot + `d(4,6)`. **C-wrong.**
4. SPE_MAGIC_MISSILE same case if `zapyourself` is called. Match the `case`. `spelleffects` still drops it. Named.
5. `learnwand` after switch; SPBOOK `learnwand` skip pre-existing. Match other arms.
6. Bounce is not zhitu `"bounce off"`. Match this arm’s `pline_The`.
7. FIREBALL / MAKE_INVISIBLE: still default 0 at this SHA. Named.
8. Lightning regression: WAN_LIGHTNING still `d(12,6)` + `flashburn(true)`. Not this diff.
9. **Public-unhit** unless a session self-zaps magic missile.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `WAN_MAGIC_MISSILE` is an object token, not a recorded coordinate. Plain ESM. The Antimagic miss is a **clone**, not a trace index.

## Verification

Journal: private canary **22**/22 (C/JS case grep; seeing `d(4,6)` + Idiot; sticky-Antimagic 0 dmg no `d(4,6)` bounce; SPE envelope + SPBOOK skip; FIREBALL/MAKE_INVISIBLE still default; lightning regression; Rule #2). The canary that used “Antimagic” almost certainly set a sticky bit — it would **not** have caught cloak-of-MR conferral. green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on this arm. This audit cadence: full `sessions` at HEAD `9a144895` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a missile self-zap.

## Actionable C-wrongs

1. `zap.js` `zapyourself` WAN/SPE_MAGIC_MISSILE `Antimagic()` must read `youprop.h` `uprops[ANTIMAGIC]` intrinsic||extrinsic (D-1089 `hero_Antimagic` / sit.js), not sticky `u.Antimagic||H||E` only. Cloak of magic resistance / gray DSM currently still take `d(4,6)` and `"Idiot!"` instead of bounce with no dice. Same helper already gates WAN_STRIKING `"Boing!"` — fix the helper once. Do **not** rewrite `confer_oc_oprop`. Source: this review. **Addressed:** D-1367

Named omits (map / already-Open, not Must-fix):

1. `shieldeff` / `monstseesu` / `monstunseesu` on this arm
2. SPE_FIREBALL (shipped next SHA as D-1365)
3. `lightdamage` / WAN_MAKE_INVISIBLE / `maybe_destroy_item` AD_ELEC
4. `spell.c` `spelleffects` SPE_MAGIC_MISSILE dispatcher

Do not Must-fix “skip `learn_it` on bounce” (C always learns). Do not Must-fix “use zhitu `bounce off`” (C `pline_The` is different). Do not Must-fix “one space after `Idiot!`” (C has two).

## Callers / RNG ledger

C: RNG only `d(4,6)` on `!Antimagic`. JS: same **iff** the predicate matches. Cloak-of-MR burns six extra rolls in JS. Public fortress is not a self-aimed missile.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: the missile arm is live, but bounce vs `d(4,6)` uses a sticky Antimagic clone that misses conferral `uprops[ANTIMAGIC]`.
- Must-fix prepends that Antimagic predicate; next port ships it before Open AD_ELEC.
