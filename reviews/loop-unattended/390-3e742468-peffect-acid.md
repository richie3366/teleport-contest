# Review 390 — 3e742468 — potion.c peffect_acid (D-1430)

## Metadata
- Full / short hash: `3e742468b9243596d10ea19a15e33a6992a5ad48` / `3e742468`
- Parent: `4a16af4e` (D-1429). This file audits **this SHA only** (eighth of nine `js/` commits since review **382**). Archive **Addressed:** D-1430 `3e742468` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 01:29:50 +0200
- D-id: **D-1430**
- Stats: 11 files, +162 / −27 — `js/potion.js` +65 / −2; `js/eat.js` +5 / −2 (export `fix_petrification`).
- Claims to close: Open `potion.c` `peffect_acid` (named from D-1429). Not gain level. `reviews/loop-2026-08-15/` has no unpaid acid Must-fix.
- JS / map: `potion.js` `peffect_acid`; callee `eat.js` `fix_petrification`. `c-js-map/turns.md` + `debt.md`. potionhit already had a POT_ACID arm; vapors/mix/gain-level still named.
- Prior reviews this SHA claims to close: **389** follow-up named acid.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_acid so quaffing a potion of acid burns (or tastes sour when resistant) instead of doing nothing.”

C `potion.c` `peffect_acid` `:1297–1314`:

```
    if (Acid_resistance) {
        pline("This tastes %s.", Hallucination ? "tangy" : "sour");
    } else {
        pline("This burns%s!",
              otmp->blessed ? " a little" : otmp->cursed ? " a lot"
                                                         : " like acid");
        dmg = d(otmp->cursed ? 2 : 1, otmp->blessed ? 4 : 8);
        losehp(Maybe_Half_Phys(dmg), "potion of acid", KILLED_BY_AN);
        exercise(A_CON, FALSE);
    }
    if (Stoned)
        fix_petrification();
    gp.potion_unkn++;
```

`Acid_resistance` is `youprop.h:59–61` `H||E` ≡ `uprops[ACID_RES]`. Callee `eat.c` `fix_petrification` `:867–877`: hallu CHA>15 fine-art else `"You feel limber!"` then `make_stoned(0,...)`. `peffects` `:1414–1415` → `return -1`.

Old JS: default “not implemented”. `fix_petrification` existed but was file-private.

The diff **does** add the helper (Acid_resistance via uprops, Stoned via flat+uprops), wire POT_ACID, export the eat.c callee. It **does not** port gain level. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_acid` | C `:1297–1314`, **wired** | |
| `Acid_resistance` | C `youprop.h:61`, **clone via uprops** | conferral writes extrinsic only |
| `Hallucination()` | C, **imported live** | tangy vs sour |
| `d` / `maybe_half_phys` / `losehp` | C, **imported live** | |
| `exercise(A_CON, FALSE)` | C, **imported live** | non-resist only |
| `Stoned` | C `youprop.h`, **clone** | flat + `uprops[STONED].intrinsic` |
| `fix_petrification` | C `eat.c:867–877`, **C callee now exported** | already lived in eat.js |
| `potion_unkn++` | C `gp.potion_unkn`, **wired** | dopotion trycall |
| potionhit POT_ACID | C, **pre-existing / named polish** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `d(1|2, 4|8)` on the burn arm; `exercise` may `rn2(19)`; resist arm burns **no** `d()`. Public fortress never quaffs acid.

## C ↔ JS fidelity

Resist: `"This tastes tangy/sour."` no dice, no CON. Else burns `" a little"` / `" a lot"` / `" like acid"` then `d(cursed?2:1, blessed?4:8)` → `losehp(Maybe_Half_Phys, "potion of acid", KILLED_BY_AN)` → `exercise(A_CON, false)`. Then **always** Stoned → `fix_petrification`; **always** `potion_unkn++`. Match `:1299–1314` including resist+Stoned (sour **and** limber).

`Acid_resistance` ORs sticky/`H`/`E` **and** `uprops[ACID_RES]` — conferral ring/amulet of acid resistance still takes the sour arm (D-1423 shape). Match `youprop.h:61`. Damage dice: uncursed `d(1,8)`, blessed `d(1,4)`, cursed `d(2,8)`. Match. `maybe_half_phys` is the live `hack.js` Half_physical gate, not a stub.

`fix_petrification` is the same eat.js body C uses from `cprefx`: hallu CHA>15 `"fine art"` else `"You feel limber!"` then `make_stoned(0)`. Export-only change. Not a new clone.

Hallucination check: “Match C `fix_petrification`” while **the eat.c function is the live export** is not a dispatch-stub lie. “Match C mix/dipsink acid” **would** be. Do **not** stamp “Match C `peffect_gain_level`.”

## Hallucinations / overclaim

Subject says quaffing burns, or tastes sour when resistant, instead of doing nothing. **True:** burn dice + Half_phys + CON abuse; conferral/H Acid_resistance sour no dice; hallu tangy; Stoned limber even when resistant; `potion_unkn` / useup. **False until named for remaining peffects / mix.** Stamping **Addressed:** D-1430 for `:1297–1314` is fair. Do **not** treat fortress PASS as an acid quaff.

## Density

One peffect plus exporting the eat.c callee it already needed. ~50 lines. Playbook §2b caller/callee. Did not glue gain level. Right size.

## Branch-by-branch confirm

1. Uncursed, no resist: `"This burns like acid!"` `d(1,8)` + CON. Match.
2. Blessed: `" a little"` `d(1,4)`. Match.
3. Cursed: `" a lot"` `d(2,8)`. Match.
4. `HAcid_resistance` / conferral uprops: sour, no `d()`. Match.
5. Hallu + resist: tangy. Match.
6. Stoned: limber / fine-art; `make_stoned(0)`. Match.
7. Resist + Stoned: sour then limber. Match.
8. Gain level still default at this SHA. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dice are C `d()`, not a recorded HP. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; uncursed burns like acid d(1,8); blessed a little d(1,4); cursed a lot d(2,8); HAcid_resistance sour no dice; conferral uprops extrinsic sour; hallu tangy; Stoned limber; resist+Stoned sour+limber; Upolyd mh CON skip; gain level still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD. Fortress PASS is not an acid quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Resist vs burn / dice / `fix_petrification` / `potion_unkn` match `:1297–1314`. Callee is live eat.c, not a no-op.

Named omits (map / Open, not Must-fix):

1. remaining peffects (gain level / blindness / sleeping / gain ability / hallucination)
2. potionbreathe / mix / dipsink POT_ACID polish
3. Half_physical vs Upolyd mh (canary named CON skip; keep as named if `maybe_half_phys` still omits a C arm)

Do not Must-fix “resist should still `d()`” (C skips). Do not Must-fix “Stoned should skip when resistant” (C always checks). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG only on the burn arm (`d` + possible CON `exercise`). Public fortress does not quaff acid.

Verdict: **ACCEPT-WITH-DEBT**
