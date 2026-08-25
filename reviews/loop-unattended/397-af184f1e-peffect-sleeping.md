# Review 397 — af184f1e — potion.c peffect_sleeping (D-1437)

## Metadata
- Full / short hash: `af184f1ec64d6efd47d40336aea686a9f8ad4e3b` / `af184f1e`
- Parent: `e413754d` (D-1436). This file audits **this SHA only** (sixth of nine `js/` commits since review **391**). Archive **Addressed:** D-1437 `af184f1e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 03:05:44 +0200
- D-id: **D-1437**
- Stats: 10 files, +135 / −24 — `js/potion.js` +48 / −1.
- Claims to close: Open `potion.c` `peffect_sleeping` (named from D-1436). Not remaining peffects. `reviews/loop-2026-08-15/` has no unpaid sleeping Must-fix.
- JS / map: `potion.js` `peffect_sleeping`; callees `hack.js` `fall_asleep`; `mondata.js` `monstseesu` / `monstunseesu`. `c-js-map/turns.md` + `debt.md`. Gain ability / potionhit still named at this SHA.
- Prior reviews this SHA claims to close: **392** named remaining peffects after blindness; **396** queued sleeping.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_sleeping so quaffing a potion of sleeping knocks the hero out (or yawns if sleep-resistant) instead of doing nothing.”

C `potion.c` `peffect_sleeping` `:901–911`:

```
    if (Sleep_resistance || Free_action) {
        monstseesu(M_SEEN_SLEEP);
        You("yawn.");
    } else {
        You("suddenly fall asleep!");
        monstunseesu(M_SEEN_SLEEP);
        fall_asleep(-rn1(10, 25 - 12 * bcsign(otmp)), TRUE);
    }
```

`Sleep_resistance` is `youprop.h:34–36` `H||E` ≡ `uprops[SLEEP_RES]`. `Free_action` is `:383` **extrinsic only** `uprops[FREE_ACTION]`. `peffects` `:1363–1365` then `:1424` `-1`. Callee `timeout.c` `fall_asleep` `:951–974`: `stop_occupation`; `nomul(how_long)`; `multi_reason` sleeping; `u.usleep = moves`; `nomovemsg` `"You wake up."` (`#if 0` Deaf/`Hear_again` dead). `dopotion` peculiar only if `potion_nothing` (this helper never increments it).

Old JS: default “not implemented”, return 0, no useup.

The diff **does** add `Sleep_resistance` / `Free_action` helpers, `peffect_sleeping`, and the `POT_SLEEPING` `-1` arm. It **does not** port gain ability / hallucination. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_sleeping` | C `:901–911`, **wired** | |
| `Sleep_resistance()` | C `youprop.h:36`, **clone matching H\|\|E** | also flat `u.Sleep_resistance` |
| `Free_action()` | C `youprop.h:383`, **clone matching E** | also `u.Free_action` / `HFree_action` mirrors (`do_wear` syncs E) |
| `fall_asleep` | C `timeout.c:951–974`, **imported live** (`hack.js`) | `#if 0` Deaf named |
| `monstseesu` / `monstunseesu` | C `mondata.c`, **imported live** | swallow skip |
| `rn1` / `bcsign` | C, **imported live** | |
| `peffects` POT_SLEEPING | C `:1363–1365` + `-1`, **wired** | |
| gain ability / hallu | C siblings, **named omit at this SHA** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** sleep arm only, `rn1(10, 25-12*bcsign)` = `rn2(10)` then add. Yawn arm burns **no** dice.

## C ↔ JS fidelity

JS:

```
    if (Sleep_resistance() || Free_action()) {
        monstseesu(M_SEEN_SLEEP);
        await pline('You yawn.');
    } else {
        await pline('You suddenly fall asleep!');
        monstunseesu(M_SEEN_SLEEP);
        fall_asleep(-rn1(10, 25 - 12 * bcsign(otmp)), true);
    }
```

Call order matches `:903–910` (seesu **before** yawn; stunseesu **between** pline and `fall_asleep`). Duration: `-(rn2(10)+(25-12*bcsign))` → uncursed −25..−34, blessed −13..−22, cursed −37..−46. Match.

`fall_asleep` is **not** a stub: clears occupation, `nomul`, `multi_reason='sleeping'`, `u.usleep=moves`, `nomovemsg` `"You wake up."` Match `:953–973`. `#if 0` Deaf timeout is correctly omitted (C compiled out).

`monstseesu`/`monstunseesu`: skip `M_SEEN_NOTHING` and `uswallow`; LOS `m_canseeu` set/clear. Match C; swallow still sleeps. Live.

`Sleep_resistance()` reads H/E flats (conferral/worn/polyself write those). Does not also OR `uprops[SLEEP_RES]` the way some dual-store helpers do. Canary used H/E. C is the uprops macros; JS flats are the established mirror. Not a keep-path species contradiction.

`Free_action()` is extrinsic-shaped (`EFree_action` / `u.Free_action`). Orange DSM `do_wear` sets both `FREE_ACTION` bit and flat. C has no `HFree_action`; extra H-or is a mirror of `peffect_paralysis`, not a new drain of intrinsic sleep-res. Keep-path ring/DSM uses E.

`peffects` `-1` → useup. No `potion_nothing` (yawn is not peculiar). Match. dknown `makeknown` when not unkn.

Hallucination check: “Match C `peffect_sleeping`” while **`fall_asleep` / `monstseesu` are live C ports** is not a dispatch-stub lie. “Match C potionhit POT_SLEEPING” **would** be.

## Hallucinations / overclaim

Subject says quaffing knocks the hero out, or yawns if sleep-resistant, instead of doing nothing. **True:** uncursed/blessed/cursed `nomul` bands; H/E sleep-res yawn + seesu no nomul; Free_action yawn; fall stunseesu; swallow skip seenres still sleeps; dknown makeknown+useup. **False until named** for gain ability / hallucination (later SHAs), potionhit / potionbreathe / mix / dipsink. Stamping **Addressed:** D-1437 for `:901–911` is fair. Do **not** treat fortress PASS as a sleeping quaff.

## Density

One peffect plus two one-line prop clones. ~45 lines of JS. Playbook §2b right size. Did not glue gain ability. Acceptable.

## Branch-by-branch confirm

1. Uncursed, no res: `"You suddenly fall asleep!"`; `rn2(10)+25` negated; usleep. Match.
2. Blessed: −13..−22. Match.
3. Cursed: −37..−46. Match.
4. H or E Sleep_resistance: seesu; yawn; no `rn1`. Match.
5. Free_action: same yawn arm. Match.
6. Swallow: still `fall_asleep`; skip seenres. Match.
7. `peffects` `-1` useup; no peculiar. Match.
8. Gain ability still default at this SHA. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **38**/38 (C/JS grep; uncursed sleep multi −25..−34 + `rn2(10)` + usleep; blessed −13..−22; cursed −37..−46; H/E Sleep_resistance yawn + monstseesu no nomul; Free_action yawn; fall monstunseesu; uswallow still sleeps skip seenres; dknown makeknown+useup; gain ability / hallucination still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a sleeping quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Yawn vs fall order, `rn1`/`bcsign` duration, live `fall_asleep`, and `-1` useup match `:901–911`.

Named omits (map / Open, not Must-fix):

1. `peffect_gain_ability` / `peffect_hallucination` (later SHAs)
2. potionhit / potionbreathe / mix / dipsink POT_SLEEPING
3. `fall_asleep` `#if 0` Deaf / `Hear_again`

Do not Must-fix “yawn should `potion_nothing`” (C does not). Do not Must-fix “swallow should skip sleep” (C sleeps). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG only on the fall arm: `rn2(10)`. Public fortress does not quaff sleeping.

Verdict: **ACCEPT-WITH-DEBT**
