# Review 433 — 71a0a3d5 — potion.c potionhit remaining otyp switch (D-1472)

## Metadata
- Full / short hash: `71a0a3d582c0c2ca6c8edf66ee7be5f636995c9b` / `71a0a3d5`
- Parent: `36a4e811` (D-1471). This file audits **this SHA only** (sixth of nine `js/` commits since review **427**). Archive **Addressed:** D-1472 `71a0a3d5` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 13:12:58 +0200
- D-id: **D-1472**
- Stats: 11 files, +518 / −158 — `js/potion.js` +306 / −21. Journal rotate accounts for most docs churn.
- Claims to close: Open `potion.c` `potionhit` (named from D-1457 / D-1471). Not mixtype. `reviews/loop-2026-08-15/` has no unpaid potionhit Must-fix.
- JS / map: `potion.js` `potionhit` / `explode_oil` / `potionhit_mon_water`; callees `zap.js` `bhitm` POT_POLY, `worn.js` `mon_set_minvis`, `muse.js` `mcureblindness` / `mon_adjust_speed`, `shk.js` unpaid, `explode.js` `explode`. `c-js-map/turns.md` + `debt.md`. potionbreathe remaining otyps named.
- Prior reviews this SHA claims to close: **417** named remaining `potionhit` after mixtype; **432** Next Open was this row.

## Intent vs deliverable

Git subject promises: “Match C potion.c potionhit remaining otyp switch so a thrown potion hitting a monster heals/sickens/confuses instead of only applying POT_WATER.”

C `potionhit` `:1623–1928`. After crash/saddle/evaporate: hero `:1683–1705` OIL explode / POLY `You_feel` + `!Unchanging && !Antimagic` `polyself(POLY_NOFLAGS)` / ACID burn. Monster `:1730–1896` FULL/EXTRA/HEAL FALLTHROUGH + Pestilence `goto do_illness`; RESTORE/GAIN `do_healing`; SICKNESS Pestilence `goto do_healing` else disease/poison unharmed else illness; CONF/BOOZE `resist` NOTELL `mconf`; INVIS `mon_set_minvis`; SLEEP `sleep_monst(rnd(12))`; PARA `paralyze_monst(rnd(25))`; SPEED `mon_adjust_speed(1)`; BLIND `64+rn2(32)+rn2(32)*!resist`; WATER live; OIL explode; ACID; POLY `bhitm`. C-commented GAIN_LEVEL/LEVITATION/FRUIT/DETECT. Unpaid `:1913–1926`.

Old JS: D-1297 crash/saddle/POT_WATER; hero acid only; monster other otyps no-op; unpaid skipped.

The diff **does** port the hero switch, the monster switch + FALLTHROUGH/gotos, `explode_oil`, unpaid, and local clones of `resist`/`sleep_monst`/`paralyze_monst`. It **does not** port C-commented otyps. Named. It **does not** finish remaining `potionbreathe` otyps. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potionhit` hero OIL/POLY/ACID | C `:1683–1705`, **wired this SHA** | |
| `potionhit` mon switch | C `:1730–1896`, **wired this SHA** | |
| `healmon` / `mcureblindness` | C `mon.c` / `muse.c`, **imported live** | |
| `explode_oil` | C `explode.c` `:974–983`, **wired this SHA** | then live `explode` |
| `bhitm` POT_POLY | C `zap.c` `:263–334`, **imported live** | |
| `mon_set_minvis` / `map_invisible` | C `worn.c` / display, **imported live** | |
| `mon_adjust_speed` | C `muse.c`, **imported live** | |
| `stolen_value` / `subfrombill` | C `shk.c`, **imported live** | |
| `Antimagic()` | C `youprop.h:55–57`, **clone matching D-1367** | H\|\|E + uprops; no confer rewrite |
| `resist_potion` | C `zap.c` `resist` POTION alev=6, **clone** | is_mplayer named |
| `sleep_monst_pot` / `slept_monst_pot` | C `mhitm.c` `:1223–1257`, **clones** | defended/shieldeff/sticks/`unstuck` named |
| `paralyze_monst_pot` | C `mhitm.c` paralyze, **clone matching clamp 127** | |
| `resists_elem_pot` | C `resists_poison`/`acid`/`sleep`, **clone** | worn/artifact named |
| C-commented GAIN_LEVEL… | C `:1888–1895`, **named omit** | C has them commented too |
| `potionbreathe` remaining otyps | C `:1931+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** thrown non-water potions now reach `d`/`rnd`/`rn2`/`resist`/`bhitm` poly. Public fortress does not throw those at a monster.

## C ↔ JS fidelity

Hero `:1683–1705`: OIL `lamplit` `explode_oil`; POLY `You_feel` little normal/strange then `!Unchanging && !Antimagic` `polyself(POLY_NOFLAGS)` — **not** `peffect_polymorph` blessed-control. `Antimagic()` is the D-1367 uprops clone (do not rewrite `confer_oc_oprop`). ACID `Acid_resistance()` then `d(cursed?2:1, blessed?4:8)` `maybe_half_phys`. Match. **`explode` / `polyself` / `healmon` are not stubs.**

Monster FALLTHROUGH `:1731–1758` vs JS switch-without-break: FULL sets `cureblind`; EXTRA `!cursed` sets; HEALING `blessed` sets; Pestilence **breaks** to illness (`goto do_illness`); else RESTORE/GAIN `angermon=false`, `healmon(mhpmax,0)`, optional `mcureblindness`. SICKNESS Pestilence inlines `do_healing` with `cureblind` still false. Disease/`resists_poison` unharmed. Match gotos.

CONF/BOOZE: `!resist` → `mconf`. INVIS: `angermon = minvis && cursed`; `mon_set_minvis`; vanish/`map_invisible` / brief transparent / appears. SLEEP: `sleep_monst(rnd(12), POTION_CLASS)` then pline + `slept_monst`. PARA: `mcanmove` then `rnd(25)` clamp 127. SPEED: `angermon=false` `mon_adjust_speed(1,obj)`. BLIND: `haseyes && !mon_perma_blind`; `64+rn2(32)+rn2(32)*!resist` (both `rn2` before `resist`; clang LTR). WATER still `potionhit_mon_water`. OIL explode at `tx,ty`. ACID `!resists_acid && !resist` then writhe/shriek, `d(...)` HP, `killed`/`monkilled(AD_ACID)`. POLY `bhitm`. Match order and dice.

`explode_oil`: `end_burn` + `LOST_EXPLODING` + `d(diluted?3:4, 4)` + `explode(..., ZT_SPELL_O_FIRE=11, BURNING_OIL, EXPL_FIERY)`. Match `:974–983` / `:962–969`. Caller already gated `lamplit` (C `impossible` if unlit).

Unpaid `:1913–1926`: `ushops[0] && unpaid`; no `shkp` clears unpaid; `mon_moving` `subfrombill` else `stolen_value(..., peaceful, FALSE)`. Match.

Clones that are **not** silent “Match C `sleep_monst` / `resist`” stamps: `resist_potion` is POTION alev=6 `rn2(100+alev-dlev)<mr` (damage 0 so no HP half); `is_mplayer` dlev bump named. `sleep_monst_pot` drops `defended(AD_SLEE)` / `shieldeff` / `finish_meating`. `slept_monst_pot` drops `!sticks(youmonst)` and uses `ustuck=null` instead of live `unstuck`. Typical heal/sick/conf never take those. Named.

Hallucination check: “Match C remaining otyp” while **healmon / bhitm POLY / explode / unpaid are live** is **not** a dispatch-stub lie. “Match C `sleep_monst` including `defended`” **would** be.

## Hallucinations / overclaim

Subject says thrown potion hitting a monster heals/sickens/confuses instead of only POT_WATER. **True** for the listed otyps + hero oil/poly + unpaid. **False until named** for C-commented GAIN_LEVEL…, remaining `potionbreathe` otyps, `sleep_monst` defended/unstuck, worn `resists_*`. Stamping **Addressed:** D-1472 for **the remaining switch + unpaid** is fair. Do **not** stamp “Match C peffect_polymorph on thrown POT_POLY.” Do **not** treat fortress PASS as a thrown healing potion.

## Density

One C function’s remaining switch plus the callees it actually runs. ~300 lines of `potion.js` sits at the playbook §2b cap (50–300). Related envelope, not a second subsystem. Did not glue potionbreathe leftovers. Acceptable but tight — sleep/resist clones are the quality tax.

## Branch-by-branch confirm

1. Hero lit OIL: `explode_oil` `d(4,4)` or diluted `d(3,4)`. Match `:1685–1687`.
2. Hero POLY: feel strange; Unchanging/Antimagic skip `polyself`. Match `:1689–1692`.
3. Monster FULL/EXTRA/HEAL: Pestilence illness; else full `healmon` + extra/blessed `mcureblindness`. Match `:1731–1758`.
4. SICKNESS Pestilence: heal, no anger. Match `:1760–1761`.
5. SICKNESS poison-resist: unharmed. Match `:1762–1769`.
6. Else sickness: `mhp/=2` if `>2`. Match `:1771–1776`.
7. CONF: `resist` then `mconf`. Match `:1778–1781`.
8. BLIND: two `rn2(32)` then `resist`; cap 127. Match `:1822–1828`.
9. POLY: `bhitm`. Match `:1885–1887`.
10. Unpaid hero throw: `stolen_value`. Match `:1923–1925`.
11. GAIN_LEVEL still no-op (C-commented). Named.
12. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rnd(12)` / `d(6,…)` are C dice, not recorded indices. `Antimagic()` is uprops, not a confer rewrite.

## Verification

Journal: private canary **20**/20 (C/JS grep; Rule #2; heal restore; Pestilence illness vs sickness-heal; poison resist; sickness half; blind/para/invis/conf; hero poly Unchanging/Antimagic skip; unpaid no-shkp; extra-heal mcureblindness); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws a non-water potion at a monster (or hero). I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. FALLTHROUGH/gotos, hero POLY gate, unpaid, and live callees match. Sleep/resist clones keep the dice; omitted `defended`/`unstuck`/`is_mplayer` are **named**.

Named omits (map / Open, not Must-fix):

1. `potionbreathe` remaining otyps — Open already
2. C-commented GAIN_LEVEL / LEVITATION / FRUIT / DETECT (C has no body)
3. `sleep_monst` `defended`/`shieldeff`/`finish_meating`; `slept_monst` `unstuck`/`sticks`
4. `resist` `is_mplayer` dlev; worn/artifact `resists_*`

Do not Must-fix “dispatch is a stub.” Do not Must-fix “thrown POLY should be `peffect_polymorph`.” Do not Must-fix “GAIN_LEVEL missing” (C comments it out). Do not Must-fix “rewrite `confer_oc_oprop`.”

## Callers / RNG ledger

C callers: `throwit` / scatter. Dice: saddle `rn2` already D-1297; new `d`/`rnd`/`rn2`/`resist`/`bhitm` poly. Public fortress does not hit the new switch.

Verdict: **ACCEPT-WITH-DEBT**
