# Review 260 — 086eb03d — uhitm.c hmonas skipdrin / pit kick (D-1298)

## Metadata
- Full / short hash: `086eb03d5f7b25437e472960cf079ce1ea08f1b0` / `086eb03d`
- Parent: `6dfb7d2c` (D-1297). This file audits **this SHA only**. Archive row **Addressed:** D-1298 lacked the short hash; this review commit fills `086eb03d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 18:46:24 +0200
- D-id: **D-1298**
- Stats: 14 files, +198 / −44 — `js/uhitm.js` +52 / −4; `js/mon.js` +21; `js/mhitm.js` +16; `js/mhitu.js` +15.
- Claims to close: Open `uhitm.c` skipdrin / pit kick (named from D-1266 / review **228**). Not altwep. `reviews/loop-2026-08-15/` has no unpaid skipdrin Must-fix.
- JS / map: `uhitm.js` `hmonas` / `mhitm_ad_drin` / `damageum_adtyping`; `mon.js` `mtrapped_in_pit`; `mhitm.js` `mattackm`; `mhitu.js` `mattacku`; `c-js-map/data.md` + `debt.md` + `turns.md`. eat_brains / helmet / `m_slips_free` / lifsav / mhitu+mhitm AD_DRIN arms named.
- Prior reviews this SHA claims to close: **228** named omit skipdrin and pit kick after altwep; **223** named AT_TENT melee (still named).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c hmonas so a poly'd mind flayer skips leftover tentacle drains on a headless foe and a pit-trapped kicker cannot AT_KICK, instead of repeating wasted DRIN hits and kicking from a pit.”

C `hmonas` (`uhitm.c:5451`, `:5464–5465`, `:5558–5560`): `gs.skipdrin = FALSE` before the attack loop; `if (gs.skipdrin && aatyp==AT_TENT && adtyp==AD_DRIN) continue` **before** the `switch`; AT_KICK in the weaponless fallthrough `if (aatyp==AT_KICK && mtrapped_in_pit(&gy.youmonst)) continue` **before** `find_roll_to_hit` / `rnd(20)`. Setter: `mhitm_ad_drin` uhitm arm (`:3185–3202`) — `notonhead || !has_head` → pline, `skipdrin=TRUE`, `damage=0`, maybe green-slime `make_slimed(10)`. Helmet `rn2(8)` / `m_slips_free` / `eat_brains` / lifsav skipdrin **do not** all set skipdrin (helmet returns without it). Same skipdrin reset+continue + pit AT_KICK in `mattackm` (`mhitm.c:372/:387/:426`) and `mattacku` (`mhitu.c:765/:789–790/:801`). Helper `mtrapped_in_pit` (`mhitu.c:465–479`): youmonst → `utrap && TT_PIT` then `t_at(ux,uy)`; else `mtrapped` then `t_at(mx,my)`; `is_pit(ttyp)`.

Old JS: named omit after D-1266; no `game.skipdrin`; AT_KICK always rolled; AD_DRIN fell through `damageum` dice.

The diff **does** shared `mtrapped_in_pit`, three-loop reset+skipdrin continue+pit AT_KICK, and uhitm `mhitm_ad_drin` headless/notonhead setter + slime. It does **not** port eat_brains / helmet / `m_slips_free` / lifsav skipdrin / mhitu+mhitm AD_DRIN arms / mattacku AT_TENT melee. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hmonas` skipdrin reset/continue | C `:5451/:5464`, **new** | before `get_mattk` switch |
| `hmonas` pit AT_KICK | C `:5558–5560`, **new** | before `rnd(20)` |
| `mhitm_ad_drin` uhitm | C `:3185–3202`, **new** | `magr!==youmonst` returns |
| `damageum_adtyping` AD_DRIN | C `:4812`, **wired** | after AD_PHYS/POLY |
| `mtrapped_in_pit` | C `mhitu.c:465–479`, **new** | lives in `mon.js` (cycle) |
| `mattackm` continue/pit | C `:372/:387/:426`, **new** | setter mhitm arm **named** |
| `mattacku` continue/pit | C `:765/:789/:801`, **new** | setter mhitu arm **named**; AT_TENT not in melee `switch` |
| `has_head` | C `mondata.h`, **imported live** | |
| `make_slimed` | C `potion.c`, **imported live** | dynamic `potion.js` |
| `AD_DRIN` | C `monattk.h:74` = 32, **exported** | |
| eat_brains / helmet | C `:3204–3220`, **named omit** | headed dice remain |
| mhitu/mhitm `mhitm_ad_drin` | C `:3222–3301`, **named omit** | skipdrin continues in those loops are **dead** until the setters |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. The `WT_TOOMUCH_DIAGONAL` import hit is a const name, not DIAG. Rule #2 clean. **New gameplay RNG:** none on the skip/pit continues (they **avoid** `rnd(20)`). Headless first tentacle still consumes `damageum` `d(damn,damd)` then zeros it — C same. Slime `make_slimed` may consume timeout RNG.

## C ↔ JS fidelity

Pinned C (`uhitm.c:5451–5465` + `:5558–5560` + `:3189–3202`):

```
    gs.skipdrin = FALSE;
        if (gs.skipdrin && mattk->aatyp == AT_TENT && mattk->adtyp == AD_DRIN)
            continue;
            if (mattk->aatyp == AT_KICK && mtrapped_in_pit(&gy.youmonst))
                continue;
        if (gn.notonhead || !has_head(pd)) {
            pline("%s doesn't seem harmed.", Monnam(mdef));
            gs.skipdrin = TRUE;
            mhm->damage = 0;
            if (!Unchanging && pd == &mons[PM_GREEN_SLIME]) {
```

JS `hmonas` copies that loop order: reset; skipdrin continue **before** the aatyp chain; pit kick **before** `find_roll_to_hit`/`rnd(20)`. `mtrapped_in_pit(game.youmonst)` uses pointer equality like C `&gy.youmonst`. Helper: `utrap && utraptype==TT_PIT` then `t_at`; monster `mtrapped` then `t_at`; `is_pit` (PIT|SPIKED_PIT). Web / no-trap / `TT_BEARTRAP` are false. `t_at` is live `trap.js`.

`mhitm_ad_drin`: only the uhitm arm. Headless/notonhead pline, skipdrin, damage 0, slime if `!he_prop(Unchanging)` and `mndx==PM_GREEN_SLIME` and `!Slimed`. `You("suck in…")` is expanded `pline("You suck in…")` like the macro. Headed: fall through without eat_brains — dice from `damageum` still apply (D-log: “Headed DRIN still dice”). Helmet in C **returns without skipdrin**, so remaining tentacles still roll; omitting helmet does **not** desync skipdrin for the headless path.

`mattackm`/`mattacku`: same reset+continue+pit statements as C. Their skipdrin **setters** are the mhitu/mhitm arms of the same C function, which this SHA names and does not port. `mhitm.js` still has **no** AD_DRIN damage dispatch, so m-vs-m skipdrin continue never fires. `mattacku` melee `switch` still omits `AT_TENT` (review **253**), so a monster flayer vs hero never `hitmu`s a tentacle; the continue is structurally C but idle. **Say so:** this is not “Match C mattackm skipdrin setter.” It **is** “Match C hmonas skipdrin setter + the three continues C duplicates.” Named omits, not silent stubs of the **promised** hmonas path.

This is **not** “Match C hmonas dispatch, callee is a stub.” `mtrapped_in_pit` and uhitm `mhitm_ad_drin` headless run. eat_brains is named.

## Hallucinations / overclaim

Subject + D-1298 say a poly mind flayer skips leftover tentacle drains on a headless foe and a pit-trapped kicker cannot AT_KICK. **hmonas reset/continue/pit + uhitm setter + shared helper are the hunk.** Stamping **Addressed:** D-1298 is fair. Do **not** stamp “Match C eat_brains.” Do **not** stamp “Match C helmet `rn2(8)` skipdrin.” Do **not** stamp “Match C mhitu/mhitm `mhitm_ad_drin`.” Do **not** stamp “Match C mattacku AT_TENT melee.” Sibling continues without those setters are **dead structure**, named in the D-log — not a fake “Match C monster-flayer skipdrin.”

## Density

Tight caller/callee cluster: hmonas skip+pit, the setter that arm needs, the shared pit predicate, and the two sibling continues C comments (`[see mattackm]`). ~90 JS lines. Did not glue eat_brains. Right size.

## Branch-by-branch confirm

1. Poly flayer vs headless: first tentacle pline + skipdrin + damage 0; later AT_TENT+AD_DRIN `continue` (no `rnd(20)`). Match `:5464` + `:3189–3195`.
2. Worm tail `notonhead`: same skip. Match `gn.notonhead`.
3. Headed: no skipdrin; dice still apply; remaining tentacles roll. Match omit of eat_brains (C helmet also leaves skipdrin false).
4. Green slime + !Unchanging + !Slimed: `make_slimed(10)`. Match `:3196–3200`.
5. Pit-trapped poly kicker: AT_KICK `continue` before `rnd(20)`. Match `:5558–5560`.
6. Floor kick / web trap: `mtrapped_in_pit` false; kick rolls. Match `is_pit`.
7. `mattackm` pit-trapped magr: AT_KICK continue. Match `:426`. skipdrin continue idle without mhitm setter. Named.
8. `mattacku` pit-trapped mtmp: AT_KICK continue. Match `:801`. AT_TENT melee still omitted. Named.
9. eat_brains / helmet / seemimic still skipped. Named. Public-unhit unless Upolyd pit-kick or mind-flayer vs headless.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **27**/27; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless Upolyd pit-kick or mind-flayer vs headless. Cadence this audit: full `sessions` at HEAD `086eb03d` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. hmonas skipdrin/pit, uhitm headless setter, slime, and `mtrapped_in_pit` match C `:5451–5560` / `:3189–3202` / `:465–479`.

Named omits (map, not Must-fix):

1. `eat_brains`
   **Addressed:** D-1306 `49dab44b`
   helmet `rn2(8)`; `m_slips_free`; lifsav skipdrin
2. mhitu / mhitm `mhitm_ad_drin` arms (so those loops’ skipdrin continues stay idle)
3. `mattacku` AT_TENT melee (still omitted from the `switch`)
4. remaining `mhitm_ad_*`; seemimic

Do not Must-fix “`mtrapped_in_pit` lives in `mon.js`.” Do not Must-fix “`he_prop(Unchanging)` without uprops index” (pre-existing gulpum pattern). Do not wrap `wildmiss` as `pline_mon`. Next Open is `hack.c` swap-with-pet `seemimic`, not eat_brains.

## Callers / RNG ledger

C: `hmonas` ← poly melee; `mattackm` / `mattacku`. JS same. Skip/pit **remove** `rnd(20)` calls C would also skip. Public fortress is not evidence a poly flayer stopped after one wasted tentacle.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly flayer skipdrin and pit AT_KICK now match C hmonas; eat_brains / mhitu+mhitm setters stay named so sibling continues remain idle.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1298 `086eb03d`.
