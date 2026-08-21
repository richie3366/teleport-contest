# Review 301 — fdb30435 — mhitm.c explmm (D-1339)

## Metadata
- Full / short hash: `fdb30435d27fe7ef5d844b4af162828937acc7f9` / `fdb30435`
- Parent: `2368dc58` (D-1338). This file audits **this SHA only**. Archive **Addressed:** D-1339 `fdb30435` already has the short hash (filled by D-1340).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 05:50:54 +0200
- D-id: **D-1339**
- Stats: 10 files, +198 / −33 — `js/mhitm.js` +123.
- Claims to close: Open `mhitm.c` explmm (named from D-1326 / review **300** at this SHA’s parent). Not AT_HUGS. `reviews/loop-2026-08-15/` has no unpaid explmm Must-fix.
- JS / map: `mhitm.js` `explmm` / `mattackm` `AT_EXPL` / `mhitm_ad_halu`; `c-js-map/turns.md`. AT_HUGS / `shade_miss` / ston leftover still named at this SHA.
- Prior reviews this SHA claims to close: **288** named explmm after explmu; **300** / D-1338 named it as next Open.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c explmm so an AT_EXPL monster actually explodes at another monster (cansee/noises, elemental mon_explodes, BLND/HALU then mondead), instead of falling out of mattackm.”

C `mattackm` (`mhitm.c:497–508`):

```
        case AT_EXPL:
            if (distmin(...) > 1)
                continue;
            res[i] = explmm(magr, mdef, mattk);
            if (res[i] == M_ATTK_MISS) { /* cancelled--no attack */
                strike = 0;
                attk = 0;
            } else
                strike = 1;
            break;
```

C `explmm` (`:970–1010`): `mcan` → `M_ATTK_MISS` **before** any `d()`; `cansee(mx,my)` `"explodes!"` else `noises`; FIRE/COLD/ELEC `mon_explodes` then `AGR_DIED | (DEADMONSTER(mdef)?DEF_DIED:0)` unconditionally; else `mdamagem`; if `!(result & AGR_DIED)` `mondead` + lifesave return + slack if was_leashed; tame `You(brief_feeling, "melancholy")` even if seen.

Old JS: no `AT_EXPL` arm.

The diff **does** port `explmm`, the distmin skip, cancelled-not-a-strike (`attk=0` skips `passivemm`), `mhitm_ad_halu` mhitm arm, and leftover AD_HALU. It does **not** port AT_HUGS / `shade_miss` / `mhitm_ad_ston`. Named. `mondead` still does not call `m_unleash` (FIRE path relies on pre-existing `mon_explodes` `mhp=0`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `explmm` | C `:970–1010`, **wired** | new export |
| `mattackm` `AT_EXPL` | C `:497–508`, **wired** | distmin>1 `continue`; miss ⇒ `attk=0` |
| `mon_explodes` | C `explode.c:1019`, **imported live** | not a stub; C `mondead` vs JS `mhp=0` is pre-existing |
| `noises` | C `:27–37`, **pre-existing live** | AT_EXPL “an explosion” |
| `mdamagem` | C `:1016`, **imported live** | BLND (D-1338) + HALU this SHA |
| `mhitm_ad_halu` | C `uhitm.c:3911–3919` mhitm, **clone** | eyeless skip; zeros dice; uhitm/mhitu arms named |
| `mondead` | C `mon.c`, **imported live** | non-elemental agr death |
| slack invent walk | C `m_unleash` object, **clone** | only when explmm itself `mondead`s |
| `brief_feeling` melancholy | C `:9–10` / `:1006–1007`, **wired** | “You have a melancholy feeling…” |
| AT_HUGS / `shade_miss` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** cancelled returns before `d()`; `noises` has none; FIRE `mon_explodes` rolls `d()`; BLND leftover `d()` then zero; HALU no `d()` inside the ad arm (mdamagem still rolls then zeros).

## C ↔ JS fidelity

`mcan` miss before messages matches `:974–975`. `cansee` vs `noises` matches `:977–980` (not `gv.vis` — C uses map `cansee` of the exploder cell). FIRE/COLD/ELEC sets AGR_DIED **unconditionally** so the later `mondead` block is skipped — C comment “lifesaving is accounted below” is the `mon_explodes`/`mondead` inside the explosion, not a second `mondead` here. JS copies that.

Non-elemental: `mdamagem` then if agr still “alive” in the result bits, `mondead`. Lifesave (`!DEADMONSTER`) returns without melancholy? C: `if (!DEADMONSTER(magr)) return result;` **before** slack and **before** tame melancholy. JS same. Tame melancholy after death, even if seen — C `:1006–1007`. String is `You("have a %s feeling…", "melancholy")` ≡ JS pline.

Cancelled `M_ATTK_MISS` sets `strike=0; attk=0` so `passivemm` does not run. Match `:503–505`. distmin>1 `continue` (not break) so later slots still fire. Match `:499–500`.

`mhitm_ad_halu` mhitm: `!mcan && haseyes && mcansee` then vis `"looks more confused"` / `"looks confused"` + `mconf=1` + clear `STRAT_WAITFORU` + zero dice. Match `:3912–3919`. uhitm/mhitu arms that only zero dice stay named.

`mon_explodes` is the live explode.js export (D-0968/0971/0973). C kills via `mondead` before `explode`; JS zeros `mhp`. Pre-existing callee gap, named as `mondead`/`m_unleash` beyond slack. FIRE leashed pet therefore skips explmm’s slack clone. Named, not a new stub dispatch.

Hallucination check: subject claimed explmm body, not “Match C `m_unleash`.” Callee is the ported function. `mon_explodes` is not a no-op.

## Hallucinations / overclaim

Subject + D-1339 say an AT_EXPL monster actually explodes (cansee/noises, elemental `mon_explodes`, BLND/HALU then `mondead`). **Those arms plus the cancelled/distmin caller are the hunk.** Stamping **Addressed:** D-1339 is fair. Do **not** stamp “Match C AT_HUGS / `shade_miss`.” Do **not** stamp “Match C `mon_explodes` `mondead`/`m_unleash`.” Do **not** stamp “Match C uhitm/mhitu AD_HALU.” Do **not** treat fortress PASS as a yellow-light blind.

## Density

One C function plus its `mattackm` arm and the leftover `mhitm_ad_halu` black-light callee. ~120 lines. Playbook §2b. Did not glue AT_HUGS. Acceptable size.

## Branch-by-branch confirm

1. distmin>1: skip slot, later attacks still run. Match `:499–500`.
2. `mcan`: `M_ATTK_MISS`, `attk=0`, no `passivemm`. Match `:974–975` / `:503–505`.
3. `cansee`: `"explodes!"`; else `noises` “an explosion”. Match `:977–980`.
4. FIRE/COLD/ELEC: `mon_explodes`, AGR_DIED, no second `mondead`/slack. Match `:983–987`.
5. BLND (yellow light): leftover blinds, zeros HP, then `mondead`. Match else + D-1338.
6. HALU (black light): confuse if eyes; eyeless skip; leftover zeros. Match `:3912–3919`.
7. Tame melancholy after death even if seen. Match `:1006–1007`.
8. Leashed non-elemental: slack pline + leashmon clear. Match `:993–1004` (clone).
9. AT_HUGS / `shade_miss` / ston leftover. Still omitted. Named.
10. **Public-unhit** unless a session has mon-vs-mon AT_EXPL.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **33**/33; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on explmm. Cadence this audit: full `sessions` at HEAD `e3a30202` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence a gas spore exploded at a jackal.

## Actionable C-wrongs

None for Must-fix. `explmm` + `AT_EXPL` + leftover AD_HALU match C `:970–1010` / `:497–508` / `:3911–3919`. `mon_explodes` is live.

Named omits (map, not Must-fix):

1. `mondead` → `m_unleash` (FIRE path; JS `mon_explodes` still `mhp=0`)
2. uhitm/mhitu AD_HALU zero-dice arms
3. AT_HUGS / `shade_miss` / ston/conf/stun/fire leftover

Do not Must-fix “cancelled still strikes” (C sets `attk=0`). Do not Must-fix “explmm at range” (C `continue`s).

## Callers / RNG ledger

C: `mattackm` AT_EXPL → `explmm` → `mon_explodes` `d()` or leftover `d()`. JS: same. Public fortress is not those rolls.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: AT_EXPL now explodes (elemental `mon_explodes`, BLND/HALU then `mondead`); AT_HUGS / `shade_miss` stay named.
- Must-fix stays empty for this SHA.
