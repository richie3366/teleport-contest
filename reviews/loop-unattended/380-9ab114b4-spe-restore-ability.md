# Review 380 — 9ab114b4 — spell.c spelleffects SPE_RESTORE_ABILITY peffects (D-1420)

## Metadata
- Full / short hash: `9ab114b491891c52bf960dab949449f948e070f6` / `9ab114b4`
- Parent: `89f05e45` (D-1419). This file audits **this SHA only** (seventh of nine `js/` commits since review **373**). Archive **Addressed:** D-1420 `9ab114b4` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-24 22:49:04 +0200
- D-id: **D-1420**
- Stats: 12 files, +215 / −36 — `js/potion.js` +59; `js/apply.js` +45; `js/spell.js` +16.
- Claims to close: Open `spell.c` `spelleffects` SPE_RESTORE_ABILITY peffects (named from D-1419). Not INVISIBILITY. `reviews/loop-2026-08-15/` has no unpaid restore-ability Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffect_restore_ability`; `apply.js` `unfixable_trouble_count`. `c-js-map/turns.md`. SPE_INVISIBILITY still named.
- Prior reviews this SHA claims to close: **379** named RESTORE_ABILITY after levitation.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_RESTORE_ABILITY so casting that spell restores drained attributes via peffect_restore_ability (ABASE=AMAX, potion pluslvl), instead of printing Nothing happens.”

C `spell.c` `:1534–1546` same skilled-bless + peffects arm (RESTORE **is** in that group). Callee `potion.c` `peffect_restore_ability` `:646–693`:

```
    gp.potion_unkn++;
    if (otmp->cursed) {
        pline("Ulch!  This makes you feel mediocre!");
        return;
    }
    ...
    i = rn2(A_MAX);
    for (ii = 0; ii < A_MAX; ii++) {
        if (ABASE(i) < AMAX(i)) {
            ABASE(i) = AMAX(i);
            AEXE(i) = max(AEXE(i), 0);
            if (!otmp->blessed) break;
        }
        if (++i >= A_MAX) i = 0;
    }
    if (otmp->otyp == POT_RESTORE_ABILITY && u.ulevel < u.ulevelmax)
        do pluslvl(FALSE);
        while (u.ulevel < u.ulevelmax && otmp->blessed);
```

Wow good / better (`unfixable_trouble_count(FALSE)`) / great sits between Ulch and the loop (`:658–661`). Spell otyp skips `pluslvl`. `apply.c` `unfixable_trouble_count` `:4431–4469` counts Stoned/Slimed/Strangled, ATEMP DEX+Wounded_legs, ATEMP STR+WEAK, then Sick/Stun/Confusion/Hallucination/Vomiting/Deaf (horn TIMEOUT carve-out unused here: `is_horn==FALSE`). `exper.c` `pluslvl` `:307` is live in `exper.js:155`.

Old JS: SPE_RESTORE_ABILITY still other-otyp `Nothing happens.`

The diff **does** add the otyp to the skilled-bless arm, port `peffect_restore_ability` (Ulch / Wow / `rn2` restore / potion `pluslvl`), and export `unfixable_trouble_count`. It **does not** port INVISIBILITY. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_RESTORE_ABILITY | C `:1534–1546`, **wired** | skilled bless then peffects |
| `peffect_restore_ability` | C `:646–693`, **wired** | |
| `rn2(A_MAX)` wrap | C `:662–679`, **imported live** | first vs all if blessed |
| `ABASE=AMAX` / `AEXE=max(0)` | C, **wired** | JS `u.acurr` is the port’s ABASE (`attrib.js`) |
| `pluslvl(FALSE)` | C `exper.c:307`, **imported live** | potion otyp only |
| `unfixable_trouble_count` | C `:4431–4469`, **wired** | `is_horn` FALSE for this caller |
| SPE_INVISIBILITY | C after FALLTHROUGH, **named omit** | **no** skilled bless |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn2(A_MAX)` start index (which drained attr an uncursed restore hits first). `pluslvl` may burn further dice. Public fortress never casts this.

## C ↔ JS fidelity

Spell arm matches `:1534–1546` for this otyp (unskilled uncursed → one attr; skilled blessed → all drained). Cursed Ulch return matches `:649–651` (no restore, no pluslvl). Uncursed Wow “good”; blessed Wow “better” vs “great” via `unfixable_trouble_count(false)`. Match `:658–661`.

Loop: `rn2(A_MAX)` then `ii < A_MAX` wrap. Match. Direct ABASE write (not `adjattrib`) so Fixed_abil cannot block. Match the comment at `:655–657`. Uncursed `break` after first drained attr; blessed continues. Match `:674–676`. ATEMP hunger STR / wounded-legs DEX are not this loop. Match.

Potion `otyp === POT_RESTORE_ABILITY && u.ulevel < u.ulevelmax` then `do pluslvl(false) while u.ulevel < u.ulevelmax && blessed`. Spell book otyp skips. Match `:687–690`. `pluslvl` (`exper.js:155`) is live (more-experienced pline + level welcome), not a stub.

`unfixable_trouble_count`: Stoned/Slimed/Strangled; ATEMP DEX + Wounded_legs; ATEMP STR + `u.uhs >= WEAK`; then Sick/Stun/Confusion/Hallucination/Vomiting/Deaf with horn TIMEOUT carve-out. C `Stunned` is `HStun` (`youprop.h:80–81`); JS `HStun` matches. C `Confusion` is `HConfusion`; JS matches. C `Deaf` is `H\|\|E\|\|uroleplay.deaf`; JS `Deaf_hero()` matches. C `Strangled` is intrinsic; JS ORs sticky/`H`/`uprops` (same increment if any). C `Hallucination` macro vs JS `Hallucination()` from `do_name.js` — conferral-only hallu could mis-count better/great; named, not a restore-loop lie. This SHA’s restore uses `is_horn==FALSE` (timed troubles always count). Match `:4456–4467` for the potion/spell caller.

Hallucination check: “Match C ABASE=AMAX / pluslvl” while **`pluslvl` is live** is not a dispatch-stub lie. “Match C SPE_INVISIBILITY” **would** be. Do **not** stamp “Match C spell restores lost levels” (C potion-only).

## Hallucinations / overclaim

Subject says casting restore ability restores drained attrs via ABASE=AMAX (and potion pluslvl) instead of `Nothing happens.` **True for unskilled (one attr, Wow good) and skilled (all drained, Wow better/great).** **True that cursed is Ulch and returns.** **True that the spell does not `pluslvl`.** **False until a later SHA for INVISIBILITY.** Stamping **Addressed:** D-1420 for `:646–693` + `:1534–1546` + `unfixable_trouble_count` is fair. Do **not** treat fortress PASS as a restore-ability cast.

## Density

One C peffect plus the `unfixable_trouble_count` the blessed feel-string needs. ~100 lines of JS. Playbook §2b. Did not glue INVISIBILITY (and the spell.js comment correctly notes it is **not** skilled-blessed). Right size.

## Branch-by-branch confirm

1. Unskilled, one drained attr: `rn2` start; first ABASE<AMAX restored; break; Wow good; no pluslvl. Match.
2. Skilled, several drained: all restored; Wow better/great. Match.
3. Cursed: Ulch; no restore. Match.
4. Potion uncursed, u.ulevel < u.ulevelmax: one `pluslvl(false)`. Match.
5. Potion blessed: loop `pluslvl` until u.ulevelmax. Match.
6. Spell never `pluslvl`. Match.
7. Fixed_abil cannot block (direct ABASE). Match.
8. ATEMP hunger STR / wounded DEX not restored. Match.
9. INVISIBILITY still other-otyp. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. The only new dice is C `rn2(A_MAX)`, not a recorded index. Plain ESM.

## Verification

Journal: private canary **22**/22 (C/JS grep; cursed Ulch; uncursed one attr Wow good; blessed all + better/great; potion pluslvl vs spell skip; Fixed_abil override; ATEMP STR kept; SPE_INVISIBILITY still omit; HASTE/LEV arm; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not restore ability.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Restore loop and potion-only `pluslvl` match `:646–693`. `unfixable_trouble_count` matches `:4431–4469` for `is_horn==FALSE`.

Named omits (map / Open, not Must-fix):

1. SPE_INVISIBILITY peffects (already Open; **must not** skilled-bless)
2. conferral-only Hallucination in `unfixable_trouble_count` better/great
3. remaining peffects (polymorph / gain energy / …)
4. potionhit / mix restore

Do not Must-fix “spell should restore levels” (C potion-only). Do not Must-fix “unskilled should restore all attrs” (C first only). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `spelleffects` SPE_RESTORE_ABILITY; `dopotion` POT_RESTORE_ABILITY. New RNG: `rn2(A_MAX)` plus whatever `pluslvl` burns on the potion path. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
