# Review 272 — 734449dc — dokick.c kick_monster poly AT_KICK (D-1310)

## Metadata
- Full / short hash: `734449dc55cd7dc46878aeb71ac36c49848cb096` / `734449dc`
- Parent: `07ac10e0` (D-1309). This file audits **this SHA only**. Archive **Addressed:** D-1310 lacked the short hash; this review commit fills `734449dc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 21:36:27 +0200
- D-id: **D-1310**
- Stats: 11 files, +270 / −155 — `js/dokick.js` +48 / −~8; `js/uhitm.js` +24 / −~8; journal rotate.
- Claims to close: Open `dokick.c` poly AT_KICK loop (named from D-1309). Not hmonas pit kick (D-1298). `reviews/loop-2026-08-15/` has no unpaid poly-kick Must-fix.
- JS / map: `dokick.js` `kick_monster`; `uhitm.js` `find_roll_to_hit` AT_KICK martial + exports; `c-js-map/turns.md`. kickdmg `special_dmgval` / `maybe_mnexto` evade named. `find_roll_to_hit` maybe_polyd(mlevel) / encumbrance / utrap named.
- Prior reviews this SHA claims to close: **260** distinguished hmonas pit AT_KICK from this `kick_monster` loop; D-1309 follow-up Open named the poly arm.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kick_monster so a poly'd form with a kick attack rolls each AT_KICK slot, instead of falling through to a human kickdmg.”

C `kick_monster` (`dokick.c:183–223`) after hidden-target reveal: `Upolyd && attacktype(youmonst.data, AT_KICK)` then `find_roll_to_hit(mon, AT_KICK, NULL, &attknum, &armorpenalty)` **once**; `mon_maybe_unparalyze`; NATTK walk, `multi<0` break, continue unless `aatyp==AT_KICK`; `kickdieroll = rnd(20)`; `special_dmgval(&youmonst, mon, W_ARMF, NULL)`; shade + !specialdmg → `Your("%s %s.", kick_passes_thru, mon_nam)` **break** (no passive); hit `You kick` + `damageum` + `passive(sum!=MISS, !(sum&DEF_DIED))` then DEF_DIED break; miss `missum(tmp+armorpenalty > kickdieroll)` + `passive(FALSE,1)`; **return** (no human `kickdmg`). Callee `find_roll_to_hit` (`uhitm.c:418–424`) AT_WEAP/AT_CLAW hitval/weapon_hit_bonus else `AT_KICK && martial_bonus()` → `weapon_hit_bonus(NULL)`. Level term is `maybe_polyd(youmonst.data->mlevel, u.ulevel)` (`:379`).

Old JS: comment `Upolyd AT_KICK attacktype loop deferred`; always fell through to encumbrance/`kickdmg`. `find_roll_to_hit` omitted the AT_KICK martial arm.

The diff **does** port the loop and return, export the three callees, and add the martial AT_KICK arm. It does **not** finish `find_roll_to_hit` maybe_polyd(mlevel) / monk / encumbrance / utrap, nor kickdmg `special_dmgval`, nor `maybe_mnexto` evade. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kick_monster` poly loop | C `:183–223`, **wired** | then `return` |
| `attacktype_fordmg(..., AT_KICK, -1)` | C `attacktype`, **imported live** | dtyp −1 ≡ any |
| `find_roll_to_hit` | C `:365–427`, **exported; partial** | AT_KICK martial **new**; mlevel/enc/utrap named |
| `mon_maybe_unparalyze` | C `:351–359`, **exported live** | `rn2(10)` thaw |
| `special_dmgval` | C `weapon.c`, **imported live** | D-1254; W_ARMF |
| `damageum` | C `:4835`, **imported live** | 3rd arg specialdmg |
| `missum` | C `:5198–5214`, **exported live** | |
| `passive` | C, **imported live** | boots `uarmf` |
| `kick_passes_thru` | C string, **pre-existing const** | `"kick passes harmlessly through"` |
| maybe_polyd(mlevel) | C `:379`, **named omit** | JS still `u.ulevel` |
| `maybe_mnexto` evade | C later in `kick_monster`, **named omit** | |
| kickdmg `special_dmgval` | C `kickdmg`, **named omit** | human arm still 0 |

No `FORCE` / `DIAG` / `getRngLog(` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** one `rnd(20)` per AT_KICK slot; `special_dmgval` may `rnd(4)`/`rnd(20)` for blessed/silver boots; `damageum` `d(damn,damd)` on hit; unparalyze `rn2(10)` once before the walk; demonpet `!rn2(13)` inside `damageum` if poly demon unarmed. Shade break skips later slots’ `rnd(20)`.

## C ↔ JS fidelity

Pinned C (`dokick.c:183–222`):

```
    if (Upolyd && attacktype(gy.youmonst.data, AT_KICK)) {
        … tmp = find_roll_to_hit(mon, AT_KICK, (struct obj *) 0, &attknum,
                                   &armorpenalty);
        mon_maybe_unparalyze(mon);
        for (i = 0; i < NATTK; i++) {
            if (gm.multi < 0) break;
            uattk = &gy.youmonst.data->mattk[i];
            if (uattk->aatyp != AT_KICK) continue;
            kickdieroll = rnd(20);
            specialdmg = special_dmgval(&gy.youmonst, mon, W_ARMF, (long *) 0);
            if (mon->data == &mons[PM_SHADE] && !specialdmg) {
                Your("%s %s.", kick_passes_thru, mon_nam(mon));
                break;
            } else if (tmp > kickdieroll) {
                You("kick %s.", mon_nam(mon));
                sum = damageum(mon, uattk, specialdmg);
                (void) passive(…);
                if ((sum & M_ATTK_DEF_DIED)) break;
            } else {
                missum(mon, uattk, (tmp + armorpenalty > kickdieroll));
                (void) passive(mon, uarmf, FALSE, 1, AT_KICK, FALSE);
            }
        }
        return;
    }
```

JS copies that control flow: `Upolyd(u)` (`mtimedone!=0`, `you.h`), `attacktype_fordmg` truthy, `find_roll_to_hit` once, unparalyze, `NATTK==6`, continue-only-KICK, shade `Your ${kick_passes_thru} ${mon_nam}.` ≡ `Your("%s %s.", …)`, `damageum`/`missum`/`passive`, DEF_DIED / `multi<0` break, **return**. Plains-centaur AT_WEAP slots are skipped (continue), so one kick not a weapon hit. Mountain two AT_KICK slots → two `rnd(20)`. Non-poly and poly-without-KICK (jackal) still fall through to `kickdmg`.

`find_roll_to_hit` AT_KICK martial_bonus → `weapon_hit_bonus(null)` now matches C `:422–424`. Monk armor in C is `Role_if(PM_MONK) && !Upolyd` — **cannot fire** on this arm. maybe_polyd(**mlevel**) **always** fires here (the gate is Upolyd). JS still adds `u.ulevel`. That changes hit vs miss (and thus whether `d()` burns) for a high-mlevel form vs a low-level hero. D-log names it. Do **not** stamp “Match C poly to-hit number.” Enc/utrap also named (they fire regardless of poly; they change tmp, not the `rnd(20)` count).

`special_dmgval` is the real `weapon.js` callee (not a 0-stub). kickdmg still stubs it 0 — different arm, named. `damageum_ad_phys` zeros shade dice then adds `specialdmg` (`uhitm.c:3990–3995`); poly loop’s shade **break** happens first when `!specialdmg`, so the `impossible("bad shade attack")` path stays off. This is **not** “Match C poly-kick dispatch, `damageum` is a stub.”

## Hallucinations / overclaim

Subject + D-1310 say a poly form with AT_KICK rolls each kick slot instead of one human `kickdmg`. **The loop plus return plus martial AT_KICK arm are the hunk.** Stamping **Addressed:** D-1310 is fair. Do **not** stamp “Match C `maybe_polyd(mlevel)` tmp.” Do **not** stamp “Match C encumbrance/utrap to-hit.” Do **not** stamp “Match C kickdmg silver boots.” Do **not** stamp “Match C `maybe_mnexto` evade.” Do **not** stamp “Match C `You()` as a distinct more-owner.”

## Density

One C function arm (`Upolyd && attacktype(AT_KICK)`) plus the `find_roll_to_hit` martial line that C uses for that caller. ~45 executable JS lines. Human `kickdmg` correctly not rewritten. Right size (§2b).

## Branch-by-branch confirm

1. Poly pony (one AT_KICK): one `rnd(20)` then `damageum` or `missum`; no `kickdmg` encumbrance `rn2`. Match `:183–222`.
2. Poly plains centaur: AT_WEAP skipped; one kick. Match continue.
3. Poly mountain centaur: two KICK slots, two `rnd(20)`. Match NATTK walk.
4. Shade, no silver/blessed boots: one `rnd(20)` + special_dmgval then break; no second kick, no passive. Match `:205–209`.
5. Miss + monk-armor wouldhavehit: `armorpenalty` still 0 (monk `!Upolyd`). Match this arm.
6. `multi<0` after first kick (floating-eye freeze): break. Match `:194–195`.
7. DEF_DIED: break, no extra `rnd(20)`. Match `:215–216`.
8. Non-poly / poly jackal: fall through to `kickdmg`. Match `:183` false.
9. tmp uses `u.ulevel` not mlevel. Named omit of `:379`.
10. **Public-unhit** unless a session `#kick`s while `Upolyd` with an AT_KICK form.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Exporting `kick_monster` is not a stub. Plain ESM.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a poly kick lands. Cadence this audit: full `sessions` at this HEAD `734449dc` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Loop order, `rnd(20)` per KICK slot, shade break, `damageum`/`missum`/`passive`, martial `weapon_hit_bonus(NULL)`, and the post-loop `return` match C `:183–223` / `:422–424`.

Named omits (map, not Must-fix):

1. `find_roll_to_hit` `maybe_polyd(youmonst.data.mlevel)` (poly tmp)
2. `find_roll_to_hit` `near_capacity` / `utrap`
3. kickdmg `special_dmgval` / martial knockback / `abuse_dog`
4. `maybe_mnexto` evade / `wake_nearby` / `u_wipe_engr` / shop watchman / `kickstr`

Do not Must-fix “export `find_roll_to_hit`.” Do not Must-fix monk armor (C skips it when Upolyd). Do not Must-fix `You()` vs `pline('You kick')`. Next Open is `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK. Not leader catch.

## Callers / RNG ledger

C: `#kick` → `maybe_kick_monster` → `kick_monster`. JS: same. Public fortress is not evidence a poly centaur rolled two `rnd(20)` kicks.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly forms with AT_KICK now walk C’s NATTK kick loop and return instead of human `kickdmg`; to-hit still uses `u.ulevel` and evade/kickdmg silver stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1310 `734449dc`.
