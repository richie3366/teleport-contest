# Review 363 — d9134735 — uhitm.c mhitm_ad_phys AT_KICK thick_skinned (D-1403)

## Metadata
- Full / short hash: `d9134735edc6aa13471855637edbf11feefa967f` / `d9134735`
- Parent: `2a3da9b9` (D-1402). This file audits **this SHA only** (eighth of nine `js/` commits since review **355**). Archive **Addressed:** D-1403 `d9134735` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 01:45:37 +0200
- D-id: **D-1403**
- Stats: 9 files, +101 / −34 — `js/mhitm.js` +17 / −5 (kick-thick `else if` between shade and mwep).
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` AT_KICK thick_skinned (named from D-1402 / review **362**). Not mwep. `reviews/loop-2026-08-15/` has no unpaid kick-hide Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_phys`. Callee `monsters.js` `thick_skinned` (`mondata.h`). `c-js-map/turns.md`. artifact_hit / rustm / poison still named.
- Prior reviews this SHA claims to close: **354** / **362** named kick thick after shade/mwep.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys AT_KICK thick_skinned so monster kicks deal 0 leftover vs thick hide, instead of leftover dice.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4138–4141` after shade, **before** mwep:

```
        } else if (mattk->aatyp == AT_KICK && thick_skinned(pd)) {
            /* no kicking-boots check; monsters that kick can't wear boots */
            mhm->damage = 0;
        } else if (mwep) {
```

`pd` is `mdef->data` (`:4128` area). `thick_skinned` is `mflags1 & M1_THICK_HIDE` (`mondata.h:69`, `monflag.h` `0x00200000`). AT_KICK already nulled `mwep` (`:4133–4134`), so this arm never adds dmgval. Youmonst `damageum_ad_phys` `:4002–4008` zeros kick vs hide but **halves** claw/touch/hugs — a different arm, already live, not this SHA.

Old JS: shade then `else if (mwep)`; kick vs hide kept leftover `d()`.

The diff **does** insert the kick-thick zero between shade and mwep and import live `thick_skinned`. It does **not** port artifact_hit. Named. It does **not** zero AT_CLAW vs hide (C mhitm keeps leftover unless mwep). Match.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| AT_KICK thick arm | C `:4138–4141`, **wired** | |
| `thick_skinned` | C `mondata.h:69`, **imported live** | M1_THICK_HIDE |
| `AT_KICK` | C 3, **wired** | mhitm.js |
| `pd = mdef.data` | C, **wired** | |
| mwep dmgval | C `:4142–4157`, **already live** | D-1402 unchanged |
| shade_miss | C `:4136–4137`, **already live** | D-1394 |
| youmonst kick/claw hide | C `:4002–4008`, **named omit of this SHA** | already live elsewhere |
| artifact_hit / rustm / poison | C `:4158–4190`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Zeroing leftover does not skip a later die; mwep `dmgval` is not this arm.

## C ↔ JS fidelity

Order is now shade → kick thick → mwep. Match `:4136–4142`. Kick vs iron golem (hide): leftover 0, skip dmgval. Match. Kick vs gnome (no hide): leftover kept; mwep still null so no dmgval. Match. Club in kicker’s hand: still nulled before this test. Match `:4133–4134`.

AT_CLAW vs hide: not this `else if`; leftover kept; if claw mwep, D-1402 dmgval still runs. C mhitm same (only AT_KICK zeros). Youmonst would half claw — **not** this arm. Named.

Shade still first: hide shade kick is shade_miss, not this test. Match.

Hallucination check: “Match C `thick_skinned`” while **the monsters.js predicate is the live `M1_THICK_HIDE` bit** is not a dispatch-stub lie. Do **not** stamp “Match C youmonst claw half vs hide.” Do **not** stamp “Match C artifact_hit.” Do **not** stamp “Match C kicking-boots” (C has none here).

## Hallucinations / overclaim

Subject says monster kicks deal 0 leftover vs thick hide instead of leftover dice. **True on the keep-path** after shade for AT_KICK + `thick_skinned`. **True that a held club does not change that.** **False until named for you-as-agr claw half / artifact.** D-log “gnome leftover kept; iron-golem kick zeros; club on kicker still nulled; AT_CLAW vs hide keeps leftover; D-1402 club dmgval; D-1394 shade” are the right falsifiers. Stamping **Addressed:** D-1403 for `:4138–4141` is fair. Do **not** treat fortress PASS as a centaur kick vs golem.

## Density

One `else if` in the existing phys arm. ~17 lines of JS. Playbook §2b right size (sibling of D-1402, not glued into the same iter). Did not glue WAN_STASIS (next SHA).

## Branch-by-branch confirm

1. AT_KICK vs hide: leftover 0. Match.
2. AT_KICK vs no hide: leftover kept. Match.
3. AT_KICK + held club: mwep null; still the kick test, not dmgval. Match.
4. AT_CLAW vs hide: leftover kept (mwep may add). Match mhitm, not youmonst.
5. Shade + kick: shade wins. Match.
6. AT_WEAP dmgval unchanged. Match D-1402.
7. **Public-unhit** unless a session has mon-vs-mon AT_KICK AD_PHYS vs hide.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `M1_THICK_HIDE` is C’s bit. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS grep; gnome leftover kept; iron-golem kick zeros; club on kicker still nulled; AT_CLAW vs hide keeps leftover; D-1402 club dmgval; D-1394 shade explmm + silver AT_WEAP; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not a kick vs hide.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The kick arm matches `:4138–4141` and sits in C’s order before mwep.

Named omits (map / already-Open, not Must-fix):

1. `artifact_hit` / `rustm` / `mhitm_really_poison`
2. purple worm vs shrieker cap
3. mhitu `mhitm_ad_phys_u` (youmonst kick already live)

Do not Must-fix “half claw vs hide like youmonst” (C mhitm does not). Do not Must-fix “kicking boots pierce hide” (C comment: monsters that kick can’t wear boots). Do not Must-fix “zero leftover on AT_BITE vs hide” (C only AT_KICK).

## Callers / RNG ledger

C this arm: no die. JS same. Public fortress never needs this zero. `mdamagem` leftover `d()` is already rolled before the arm.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: AT_KICK vs thick hide now zeros leftover `d()` in C’s shade-then-kick-then-mwep order; artifact_hit stays named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1403 `d9134735` already stamped.
