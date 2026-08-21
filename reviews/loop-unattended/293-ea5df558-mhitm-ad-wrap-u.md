# Review 293 — ea5df558 — uhitm.c mhitm_ad_wrap mhitu (monster→you) (D-1331)

## Metadata
- Full / short hash: `ea5df5580a1bcbdd04a90e7f28903e379179a081` / `ea5df558`
- Parent: `cfc95500` (D-1330). This file audits **this SHA only**. Archive **Addressed:** D-1331 `ea5df558` already has the short hash (filled by D-1332).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 03:09:37 +0200
- D-id: **D-1331**
- Stats: 10 files, +216 / −50 — `js/mhitu.js` +125.
- Claims to close: Open `mhitu.c` `u_slip_free` AD_WRAP (named from D-1307 / reviews **289** / **291**). Not mhitm AD_DRIN. Not uhitm wrap. `reviews/loop-2026-08-15/` has no unpaid wrap Must-fix.
- JS / map: `mhitu.js` `mhitm_ad_wrap_u` + `mhitm_adtyping_u` `AD_WRAP`; `c-js-map/turns.md` + `debt.md`. uhitm/mhitm wrap arms / gazemm still named.
- Prior reviews this SHA claims to close: **289** named AD_WRAP after AT_HUGS filled `u_slip_free`; **291** named it again after mhitu AD_DRIN.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_wrap so an eel/python wrap actually slips, grabs, or drowns, instead of zeroing AD_WRAP in mhitm_adtyping_u.”

C `mhitm_ad_wrap` mhitu (`uhitm.c:3376–3417`) after the uhitm (hero→mon) arm:

```
    } else if (mdef == &gy.youmonst) {
        if ((!magr->mcan || u.ustuck == magr) && !sticks(pd)) {
            if (!u.ustuck && !rn2(10)) {
                if (u_slip_free(magr, mattk)) mhm->damage = 0;
                else {
                    set_ustuck(magr);
                    urgent_pline("%s %s itself around you!",
                                 Some_Monnam(magr), coil ? "coils" : "swings");
                }
            } else if (u.ustuck == magr) {
                if (is_pool(mx,my) && !Swimming && !Amphibious && !Breathless) {
                    … moat vs pool … urgent_pline("%s drowns you...");
                    killer.format = KILLED_BY_AN; done(DROWNING);
                } else if (mattk->aatyp == AT_HUGS)
                    You("are being crushed.");
            } else {
                mhm->damage = 0;
                if (flags.verbose) pline_mon(… coil brush / body_part(LEG) …);
            }
        } else
            mhm->damage = 0;
    }
```

`coil = slithy(pa) && (S_SNAKE || S_NAGA)`. Caller `hitmu` → `mhitm_adtyping` `case AD_WRAP`. `u_slip_free` is D-1327. `mattacku` AT_TUCH already `failed_grab`s unsolid (D-1309).

Old JS: `mhitm_adtyping_u` `default: mhm.damage = 0` for AD_WRAP.

The diff **does** `case AD_WRAP` → `mhitm_ad_wrap_u` with that order, plus local `Some_Monnam` / `Swimming` / `Amphibious` / `Breathless`. It does **not** port the uhitm (`m_slips_free`) or mhitm brush arms. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_wrap_u` | C `:3376–3417`, **new** | mhitu only |
| `mhitm_adtyping_u` `AD_WRAP` | C, **wired** | was default-zero |
| `u_slip_free` | C `:1045–1085`, **imported live** | D-1327; AD_WRAP walks cloak/suit/shirt |
| `set_ustuck` | C `mon.c`, **imported live** | before grab pline |
| `sticks` | C `mondata.c:654–658`, **clone** | `dmgtype(STCK)` / WRAP&&!AT_ENGL / AT_HUGS; do not import `monmove.js` |
| `slithy` / `is_swimmer` / `amphibious` / `breathless` | C `mondata`, **imported live** | |
| `Some_Monnam` | C `do_name.c:1092–1097`, **clone** | `canspotmon`→`Monnam` else Someone/Something; AUGMENT_IT named |
| `Swimming` / `Amphibious` / `Breathless` | C `youprop.h:266–277`, **clone** | flat H/E **or** `uprops[idx]` (confer) |
| `is_pool` | C `dbridge.c`, **imported live** | `hack.js` |
| `IS_WATERWALL(typ)` | C `is_waterwall` `:38–42`, **clone** | `isok` already implied by `is_pool` |
| `Is_medusa_level` / `Is_waterlevel` | C dungeon, **imported live** | `const.js` functions |
| `urgent_pline` / `done(DROWNING)` | C, **imported live** | |
| `an(pmname(..., female?FEMALE:MALE))` | C `an(pmname(..., Mgender))`, **stand-in** | same Mgender stand-in as D-1306 |
| `body_part(LEG)` | C, **clone** | pre-existing mhitu LEG |
| uhitm / mhitm wrap | C `:3344–3375` / `:3418–3426`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on mhitu AD_WRAP:** `!ustuck && !rn2(10)` only inside `(!mcan \|\| ustuck==magr) && !sticks`; `u_slip_free` may `rn2(3)` cursed grease then `rn2(2)` wear-off (live helper). Cancelled and not already stuck: **no** `rn2(10)` (outer if false). Drown / crush / brush burn no new wrap RNG. `mlet === 'S_SNAKE'` is the port’s S_* string, not C char `'S'` compared to the token `S_SNAKE`.

## C ↔ JS fidelity

Order is outer `(!mcan \|\| already held) && !sticks(you)` → 1/10 grab (`u_slip_free` zeros leftover else `set_ustuck` then coil/swing) → already-held pool drown (Swimming/Amphibious/Breathless skip) or AT_HUGS crush → else verbose brush zeros leftover → cancelled/sticks zeros leftover. That is C `:3378–3417` call-for-call. Successful grab **keeps** leftover dice (C does not zero). Drown calls `done(DROWNING)`; wizard-survive still has leftover. Crush pline does not zero. Match.

`sticks` clone matches `mondata.c:654–658` (`attacktype` ≡ walk `mattk[].aatyp`). Do not treat it as a `monmove.js` import (sit rule).

`Swimming()` is `H\|\|E\|\|steed is_swimmer`. `Amphibious`/`Breathless` share magical-breathing. Dual-read flat + `uprops[SWIMMING|MAGICAL_BREATHING]` is the confer stand-in already used by Flying/Antimagic clones (D-1085 / D-1089), not a silent drop of the amulet. `is_waterwall(mx,my)` ≡ `isok && IS_WATERWALL(typ)`; JS uses loc typ after `is_pool` succeeded.

`Some_Monnam`: C is `highc(some_mon_nam)` = `x_monnam(..., AUGMENT_IT)`. JS `canspotmon`→`Monnam` else `is_animal` Something / else Someone. Invisible non-animal non-humanoid (rust monster) would be C Something vs JS Someone. **Named** AUGMENT_IT, same steal.js / dothrow.js stand-in. Not a silent drop of the grab. Do not Must-fix it as “Match C `x_monnam` AUGMENT_IT.”

`flags.verbose !== false`: `jsmain.js` defaults `verbose: true`; options parse booleans. Match C `flags.verbose` on this port.

`mattacku` AT_TUCH already `failed_grab`s unsolid before `hitmu` (`:807–809`). Wrap on a whirly hero never reaches this arm. Not this SHA.

Hallucination check: “Match C dispatch, callee is a stub” is **false** for `u_slip_free` / `set_ustuck` / `is_pool` / `done`. `Some_Monnam` is a documented clone, not a no-op wrap.

## Hallucinations / overclaim

Subject + D-1331 say an eel/python wrap actually slips, grabs, or drowns instead of zeroing AD_WRAP. **The case plus that arm plus live `u_slip_free` are the hunk.** Stamping **Addressed:** D-1331 is fair. Do **not** stamp “Match C uhitm wrap (`m_slips_free`).” Do **not** stamp “Match C mhitm wrap brush.” Do **not** stamp “Match C `some_mon_nam` AUGMENT_IT.” Do **not** treat fortress PASS as `"The eel coils itself around you!"`.

## Density

One C arm plus the macros/callees that arm actually uses. One JS module. ~110 executable JS lines. mhitm AD_DRIN correctly already shipped (D-1330); wrap arms in uhitm/mhitm not glued. Right size (§2b).

## Branch-by-branch confirm

1. Cancelled and `ustuck!==magr`: leftover 0, no `rn2(10)`. Match `:3378` / `:3416–3417`.
2. `sticks(you)` (hug form / AD_STCK / WRAP-not-engulf): leftover 0. Match.
3. `!ustuck && !rn2(10)` + grease: `u_slip_free` true, leftover 0, not stuck. Match `:3380–3381`.
4. Same 1/10, no slip: `set_ustuck` then coils (snake/naga+slithy) or swings. Match `:3383–3386`.
5. Already held + pool + not swim/amphib/breath: drown, `KILLED_BY_AN` `"moat|pool of water by a …"`. Match `:3389–3401`.
6. Already held + AT_HUGS, not drowning: “You are being crushed.” leftover kept. Match `:3402–3404`.
7. Failed 1/10 (or already stuck to someone else): leftover 0; verbose coil vs `body_part(LEG)`. Match `:3405–3414`.
8. uhitm / mhitm wrap. Still omitted. Named.
9. **Public-unhit** unless a session is wrapped.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `S_SNAKE` / `S_NAGA` strings are the port’s `mlet` encoding. Plain ESM.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on wrap. Cadence this audit: full `sessions` at HEAD `b82375a7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence `rn2(10)` grab or drown fired.

## Actionable C-wrongs

None for Must-fix. `(!mcan\|\|held) && !sticks` → 1/10 slip-or-grab → drown/crush → brush matches C `:3376–3417`. Callees are live.

Named omits (map, not Must-fix):

1. uhitm `mhitm_ad_wrap` (`:3344–3375`) / mhitm brush (`:3418–3426`)
2. `Some_Monnam` AUGMENT_IT (`do_name.c:1065–1097`)
3. gazemm / explmm / mhitm AT_HUGS / `shade_miss`

Do not Must-fix dual-read `uprops` Swimming (confer). Do not Must-fix local `sticks` (C `mondata.c`, sit ban on `monmove.js`).

## Callers / RNG ledger

C: `mattacku` AT_TUCH/AT_HUGS+AD_WRAP → `hitmu` → `mhitm_ad_wrap` youmonst. JS: `mhitm_adtyping_u` now takes that case. Public fortress is not evidence wrap `rn2(10)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: an eel/python wrap now slips, grabs (coil/swing), drowns, or crushes; uhitm/mhitm wrap arms stay named.
- Must-fix stays empty for this SHA.
