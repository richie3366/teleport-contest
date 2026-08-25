# Review 396 — e413754d — zap.c bhitm SPE_DRAIN_LIFE (D-1436)

## Metadata
- Full / short hash: `e413754d47d714904a5fc124ea1e6aa1a3bb2c3d` / `e413754d`
- Parent: `ebe912e0` (D-1435). This file audits **this SHA only** (fifth of nine `js/` commits since review **391**). Archive **Addressed:** D-1436 `e413754d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 02:55:36 +0200
- D-id: **D-1436**
- Stats: 10 files, +219 / −112 — `js/zap.js` +108 / −35; `js/spell.js` +15 / −5. NOTES prune is docs, not a second gameplay hypothesis.
- Claims to close: Open `zap.c` `bhitm` SPE_DRAIN_LIFE (named from D-1435). Not zapyourself slow. `reviews/loop-2026-08-15/` has no unpaid drain-monster Must-fix.
- JS / map: `zap.js` `bhitm` / `resists_drli` / `shieldeff_mon`; `spell.js` `wand_duplicate_weffects`. Callees `makemon.js` `monhp_per_lvl`; `zap.js` `resist` / `spell_damage_bonus`; `weffects` IMMEDIATE `bhit`. `c-js-map/turns.md`. Self-zap / `bhito` `drain_item` / `defended(AD_DRLI)` still named.
- Prior reviews this SHA claims to close: **395** queued bhitm drain after probe-self.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm SPE_DRAIN_LIFE so drain-life on a monster strips HP/level (or shields undead) instead of doing nothing.”

C `zap.c` `bhitm` `:521–544`:

```
    case SPE_DRAIN_LIFE:
        if (disguised_mimic) seemimic(mtmp);
        dmg = monhp_per_lvl(mtmp);
        if (dbldam) dmg *= 2;
        if (otyp == SPE_DRAIN_LIFE) dmg = spell_damage_bonus(dmg);
        if (resists_drli(mtmp)) {
            shieldeff_mon(mtmp);
        } else if (!resist(mtmp, otmp->oclass, dmg, NOTELL)
                   && !DEADMONSTER(mtmp)) {
            mtmp->mhp -= dmg;
            mtmp->mhpmax -= dmg;
            if (DEADMONSTER(mtmp) || mtmp->mhpmax <= 0 || mtmp->m_lev < 1)
                killed(mtmp);
            else { mtmp->m_lev--; if (canseemon(mtmp)) pline("%s suddenly seems weaker!", Monnam(mtmp)); }
        }
        break;
```

`dbldam` is `:165` `Role_if(PM_KNIGHT) && u.uhave.questart`. Spell has no wand twin. Caller `spell.c` `:1477–1514` wand-duplicate `weffects` (`objects.h:1328–1330` `oc_dir` IMMEDIATE). Self-dir `:1500–1508` `zapyourself` (`:2817–2823` `losexp` if `!Drain_resistance`). `weffects` `:3440–3450` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. `bhito` `:2318–2320` `drain_item` named. `zap_steed` `:3129` also routes here (named).

Old JS: `bhitm` default (wake only); `spelleffects` other-otyp “Nothing happens.”

The diff **does** add the `bhitm` case, local `resists_drli` / `shieldeff_mon`, and SPE_DRAIN_LIFE → `wand_duplicate_weffects(..., false)`. It **does not** port zapyourself drain / `bhito` `drain_item` / `defended(AD_DRLI)` / SLEEP. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` SPE_DRAIN_LIFE | C `:521–544`, **wired** | |
| `spelleffects` SPE_DRAIN_LIFE | C `:1477–1514`, **wired** | IMMEDIATE `weffects` |
| `weffects` IMMEDIATE `bhit` | C `:3440–3450`, **already live** | |
| `monhp_per_lvl` | C `makemon.c`, **imported live** | golem/dragon named there |
| `spell_damage_bonus` | C `:3479–3502`, **imported live** | |
| `resist` NOTELL | C `:6100–6157`, **imported live** | applies dmg then extra strip |
| `resists_drli` | C `mondata.c:201–211`, **clone, species match** | `defended(AD_DRLI)` named |
| `shieldeff_mon` | C `mon.c:6058–6063`, **clone matching C** | `shieldeff` display live |
| `killed` | C, **imported live** | |
| zapyourself SPE_DRAIN | C `:2817–2823`, **named omit** | still default |
| `bhito` `drain_item` | C `:2318–2320`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `monhp_per_lvl` `rnd(8)` (ordinary); `resist` `rn2(100+alev-dlev)`; `weffects` already `rn1(8,6)` for IMMEDIATE range. `resists_drli` path burns **no** `resist` dice.

## C ↔ JS fidelity

JS `bhitm` arm: `seemimic` if disguised; `dmg = monhp_per_lvl`; Knight `questart` ×2; `spell_damage_bonus`; `resists_drli` → `shieldeff_mon`; else `!resist(..., NOTELL) && mhp>=1` then extra `mhp`/`mhpmax` strip, then kill or `m_lev--` + weaker pline. Does **not** set `learn_it`. Match `:521–544` (C never `learn_it = TRUE` here).

`resist` is live: SPBOOK `alev = u.ulevel`; `rn2(100+alev-dlev) < mr`; resisted → `(dmg+1)/2`; then `mhp -= dmg`; fatal → `killed`. C `:6141–6155` same. Then the extra strip is a **second** `dmg` to HP and max — C does that. Failed resist on a living target is two hits of `dmg` plus a level. Match. `DEADMONSTER` ≡ `mhp < 1` ≡ JS `mhp >= 1` guard.

`resists_drli` clone: undead / demon / were / (`youmonst` && `ismnum(ulycn)`) / Death `mndx` / vampshifter. Match `:205–209`. Then C `:210` `return defended(mon, AD_DRLI)`. JS `return false`. Worn drain-resistance is a **named** omit, not a species-list contradiction. Keep-path ordinary living/undead does not need `defended`.

`shieldeff_mon`: `shieldeff(mx,my)` then `cansee` → `pline_mon` `"%s resists!"`. Match `:6060–6063`. Weaker-line uses `pline`+`Monnam` like C `:541`, not `pline_mon`.

Dispatch: `objects.h` IMMEDIATE. `wand_duplicate_weffects` getdir; self-dir `zapyourself` (still default — named); else `weffects` IMMEDIATE `bhit` → this `bhitm`. **Not** a stub weffects. `physical_damage` false (FORCE_BOLT-only). Match `:1479–1513`.

C `weffects` `:3437–3438` `zap_steed` when mounted + dz>0 + no dx/dy. JS still skips that (named). Monster-aimed dx/dy keep-path does not need it. `u.dz` `zap_updown` still empty in JS (named).

Hallucination check: “Match C `bhitm` SPE_DRAIN_LIFE” while **`resist` / `monhp_per_lvl` / IMMEDIATE `bhit` are live** is not a dispatch-stub lie. “Match C `zapyourself` `losexp`” **would** be. “Match C `defended(AD_DRLI)`” **would** be. “Match C `bhito` `drain_item`” **would** be.

## Hallucinations / overclaim

Subject says drain-life on a monster strips HP/level or shields undead instead of doing nothing. **True** on the keep-path: living mr=0 level-strip + weaker; mr high HP-only (resist true skips extra); undead shield pline no HP; Knight questart dbldam; probing still D-1426; self-zap still 0. **False until named** for self `losexp`, floor `drain_item`, `defended` worn items, `zap_steed`/`zap_updown`, SLEEP. Stamping **Addressed:** D-1436 for `:521–544` + `:1477` dispatch is fair. Do **not** stamp “Match C self-drain.” Do **not** treat fortress PASS as a drain-life cast.

## Density

One `bhitm` arm plus the spell dispatch that is the only public caller, plus two tiny C callees zap already needed. ~120 lines of JS in two modules that already call each other. Playbook §2b cluster. Did not glue sleeping. Acceptable.

## Branch-by-branch confirm

1. Living, fail resist, survive extra: `m_lev--`; weaker if `canseemon`. Match.
2. Living, fail resist, extra kills or `mhpmax<=0` or `m_lev<1`: `killed`. Match.
3. Living, resist true: half-dmg from `resist` only; no extra; no weaker. Match.
4. `resists_drli` undead: `shieldeff_mon`; **no** `rn2` resist. Match.
5. Knight + questart: `dmg*=2` before bonus. Match `:165`/`:525`.
6. `spell_damage_bonus` Int/level. Match `:3479–3500`.
7. Mimic: `seemimic` first. Match.
8. No `learnwand`. Match.
9. Self-dir still zapyourself default. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; living mr=0 level-strip + weaker; mr=1000 HP-only; undead resists pline no HP; Knight questart dbldam >; probing D-1426; zapyourself still 0); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a drain-life cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Call order, resist-then-extra-strip, undead shield, Knight double, and live IMMEDIATE `bhit` match `:521–544` + `:1477–1514`. Species `resists_drli` matches C; `defended` is named.

Named omits (map / Open, not Must-fix):

1. `zapyourself` SPE_DRAIN_LIFE `losexp`
2. `bhito` `drain_item`
3. `defended(mon, AD_DRLI)` worn items
4. `zap_steed` / `zap_updown` drain
5. remaining wand-duplicate SLEEP / DIG (later SHA is sleeping potion)

Do not Must-fix “resist should skip all HP” (C applies then maybe extra). Do not Must-fix “should learnwand” (C does not). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `spelleffects` → `weffects` → `bhit` → `bhitm`; also `zap_steed` (named). New RNG: `rnd(8)` ordinary `monhp_per_lvl`; `rn2` in `resist` when not `resists_drli`. Public fortress does not cast drain at a monster.

Verdict: **ACCEPT-WITH-DEBT**
