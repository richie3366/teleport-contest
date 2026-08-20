# Review 271 — 07ac10e0 — mhitu.c mattacku AT_TENT melee (D-1309)

## Metadata
- Full / short hash: `07ac10e0f190ddd3d0577d4059c6cc9dbea468d8` / `07ac10e0`
- Parent: `2b9c2c6a` (D-1308). This file audits **this SHA only**. Archive row **Addressed:** D-1309 `07ac10e0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 21:26:32 +0200
- D-id: **D-1309**
- Stats: 10 files, +132 / −52 — `js/mhitu.js` +59 / −~18; `js/uhitm.js` comment.
- Claims to close: Open `mhitu.c` AT_TENT melee (named from D-1261 / reviews **223** / **260** / **267**). Not mswings. `reviews/loop-2026-08-15/` has no unpaid AT_TENT Must-fix.
- JS / map: `mhitu.js` `mattacku` HTH switch; `c-js-map/turns.md`. explmu / AT_HUGS / AT_ENGL gulps / mhitu AD_DRIN / mattackm AT_TENT named.
- Prior reviews this SHA claims to close: **223** named `mattacku` `case AT_TENT` after `hitmsg` tentacle wording; **260** skipdrin continue live but AT_TENT still absent from the melee switch; **267** named AT_TENT again after `mswings` `pline_mon`.

## Intent vs deliverable

Git subject promises: “Match C mhitu.c mattacku so a mind flayer's tentacles roll melee hit/miss against the hero, instead of skipping AT_TENT in the HTH switch.”

C `mattacku` (`mhitu.c:793–821`): `case AT_TENT:` falls in with claw/kick/bite/sting/touch/butt. Pit-kick `continue` (`:801–802`). Melee iff `!range2 && (!MON_WEP || mconf || Conflict || !touch_petrifies(youmonst.data))` (`:803–804`). Hit: `tmp > (j = rnd(20+i))` then `unsolid && failed_grab` `continue` then thick-skinned **kick** skips `hitmu`; else `missmu(tmp==j)`. Displaced: `wildmiss` + `skipnonmagc`. skipdrin `AT_TENT+AD_DRIN` continue already at `:787–790`. Callee `hitmu` (`:1144`) → `mhitm_adtyping` including mhitu `mhitm_ad_drin` (`uhitm.c:3222–3271`).

Old JS: HTH cases without `AT_TENT`; `if (!range2)` only (no weapon/petrify / `failed_grab` / thick-kick skip).

The diff **does** add `AT_TENT` and the shared-arm gates (weapon/Conflict/petrify, `failed_grab`, thick kick). It does **not** port `explmu`, AT_HUGS, AT_ENGL gulps/lunges `pline_mon`, mhitu `mhitm_ad_drin`, or mattackm AT_TENT. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mattacku` `case AT_TENT` | C `:800`, **wired** | same HTH arm |
| pit AT_KICK continue | C `:801`, **pre-existing** | D-1298 |
| skipdrin continue | C `:787–790`, **pre-existing** | D-1298 |
| weapon/mconf/Conflict/petrify gate | C `:803–804`, **new on this arm** | was `!range2` only |
| `rnd(20+i)` / `hitmu` / `missmu` | C `:806–814`, **wired for TENT** | `hitmu` live (D-style) |
| `failed_grab` | C `mhitm.c:597–639`, **clone** | 2-arg youmonst; pline named omit |
| `Conflict()` | C `youprop.h:218` H\|\|E, **clone** | setworn RIN_CONFLICT EConflict named |
| `touch_petrifies` / `unsolid` / `thick_skinned` | C `mondata.h`, **imported live** | |
| `hitmu` | C `:1144`, **imported live** | not a stub |
| mhitu `mhitm_ad_drin` | C `:3222–3271`, **named omit** | `mhitm_adtyping_u` `default` zeros dmg |
| `explmu` / AT_HUGS | C `:823–841`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on the TENT path:** `rnd(20+i)` per tentacle when the melee gate holds. `failed_grab` has **no** RNG. Conflict clone has **no** RNG. Hit then `hitmu` still `d(damn,damd)` then AD_DRIN **zeros** that damage (named callee) then knockback (pre-existing `hitmu`).

## C ↔ JS fidelity

Pinned C (`mhitu.c:800–820`):

```
        case AT_TENT:
            if (mattk->aatyp == AT_KICK && mtrapped_in_pit(mtmp))
                continue;
            if (!range2 && (!MON_WEP(mtmp) || mtmp->mconf || Conflict
                            || !touch_petrifies(gy.youmonst.data))) {
                if (foundyou) {
                    if (tmp > (j = rnd(20 + i))) {
                        if (unsolid(gy.youmonst.data)
                            && failed_grab(mtmp, &gy.youmonst, mattk))
                            continue;
                        if (mattk->aatyp != AT_KICK
                            || !thick_skinned(gy.youmonst.data))
                            sum[i] = hitmu(mtmp, mattk);
                    } else
                        missmu(mtmp, (tmp == j), mattk);
```

JS copies that predicate and the `j = rnd(20+i)` / `tmp==j` near-miss. For a mind flayer (no weapon, AD_DRIN tentacles) vs a non-cockatrice hero, `!touch_petrifies` is true so the gate is `!range2` — same as old JS for other HTH, newly applied to TENT. Armed monster vs cockatrice-form hero: C **skips** the whole case (no `rnd`); old JS would have rolled; new JS skips. That is a C-faithful tightening of the shared arm, not a seed gate. Public non-poly heroes keep `!touch_petrifies` true so fortress RNG order is unchanged unless a session already had weaponed HTH vs a poly’d cockatrice (it does not).

`failed_grab` C (`:602–608`) is true only for unsolid/notonhead **and** (AT_HUGS / AD_WRAP / AD_STCK / AD_DGST). AT_TENT+AD_DRIN is **false** — the continue is a no-op on the promised flayer path. The clone omits the pass-through pline (named on the helper since before this SHA). Do **not** treat that as “Match C eel-grab message.”

`Conflict()` is HConflict\|\|EConflict plus an uprops fallback. Worn `RIN_CONFLICT` via `setworn` `oc_oprop` is named. Extra uprops does not invent a third C macro; it does not scan `uleft`/`uright` (unlike `mondata.js` `hero_conflict`). Named.

**Hallucination check (dispatch vs callee):** the subject promises tentacles **roll hit/miss**. `hitmu` / `missmu` are live. mhitu `mhitm_ad_drin` is **not** this hunk: `mhitm_adtyping_u` `default` sets `mhm.damage = 0`, so a **hit** tentacle burns `d()` then drops the dice and never `hitmsg` / `uarmh rn2(8)` / `eat_brains` / `adjattrib(-rnd(2))`. Say so: this is **not** “Match C mind-flayer INT drain vs the hero.” It **is** Match C `case AT_TENT` in the HTH switch.

## Hallucinations / overclaim

Subject + D-1309 say tentacles roll melee hit/miss instead of falling out of the switch. **The case label plus shared-arm gates are the hunk.** Stamping **Addressed:** D-1309 is fair. Do **not** stamp “Match C `eat_brains` vs hero.” Do **not** stamp “Match C `u_slip_free` / dunce-cap skip.” Do **not** stamp “Match C `explmu` / AT_HUGS.” Do **not** stamp “Match C `failed_grab` pline.” Do **not** stamp “Match C `setworn` Conflict ring.”

## Density

One `switch` arm plus the guarding `if`s that already sit on claw/kick/bite in C. ~25 executable JS lines + `Conflict()` helper. AT_HUGS / explmu are different cases, correctly not glued. Right size (§2b). The extra HTH gates are the same C envelope, not a second hypothesis.

## Branch-by-branch confirm

1. Adjacent flayer, foundyou, miss: 3× `rnd(20+i)` + `missmu`. Match `:806/:814`.
2. Hit: `rnd` then `hitmu` (`d` + AD_DRIN zero + knockback). Dispatch match; AD_DRIN body named.
3. skipdrin after first wasted DRIN: later TENT+DRIN `continue` (D-1298). Match `:787–790`.
4. range2: silent. Match `!range2`.
5. Armed + cockatrice hero + !mconf + !Conflict: skip HTH (no `rnd`). Match `:803–804`.
6. Armed + mconf or Conflict(): still melee. Match.
7. Unsolid + AD_WRAP HTH: `failed_grab` continue, no pline. Named clone omit.
8. Thick-skinned kick: skip `hitmu` after a hit roll. Match `:810–812`. TENT is not AT_KICK so still `hitmu`.
9. Pit kick: `continue` before `rnd`. Pre-existing D-1298.
10. **Public-unhit** unless a mind flayer (or other AT_TENT) melees the hero.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not wrap `wildmiss` as `pline_mon`. Plain ESM.

## Verification

Journal: private canary **22**/22; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless an AT_TENT monster melees the hero. Cadence this audit: full `sessions` at HEAD `734449dc` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. `case AT_TENT`, pit/skipdrin continues, melee gate, `rnd(20+i)` / `hitmu` / `missmu` / `wildmiss` match C `:787–821`. `hitmu` is not a stub.

Named omits (map, not Must-fix):

1. mhitu `mhitm_ad_drin` (`u_slip_free` / `uarmh` / `eat_brains` / `adjattrib` / `losespells`)
2. `explmu` / AT_HUGS / AT_ENGL gulps/lunges `pline_mon`
3. mattackm AT_TENT
4. `failed_grab` pass-through pline; `setworn` RIN_CONFLICT → EConflict

Do not Must-fix “local `Conflict()` uprops fallback.” Do not Must-fix 2-arg `failed_grab` on a path that returns false for AD_DRIN. Do not wrap `wildmiss`. Next Open after this SHA was `dokick.c` poly AT_KICK (now D-1310).

## Callers / RNG ledger

C: `mattacku` per adjacent monster. JS: same. Public fortress is not evidence a flayer tentacle `rnd(20+i)` fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mind-flayer tentacles now take C’s HTH hit/miss roll; INT drain vs the hero and explmu/hugs stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1309 `07ac10e0` already filled by the next port commit.
