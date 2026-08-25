# Review 441 — a65834a1 — zap.c zap_steed SPE_CURE_SICKNESS via bhitm (D-1480)

## Metadata
- Full / short hash: `a65834a11cb5c3b106b8019c50a8ed7df813650d` / `a65834a1`
- Parent: `7c918806` (D-1479). This file audits **this SHA only** (fifth of nine `js/` commits since review **436**). Archive **Addressed:** D-1480 `a65834a1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 15:20:32 +0200
- D-id: **D-1480**
- Stats: 10 files, +115 / −38 — `js/zap.js` +32 / −9. Also refills Open in `LOOP-QUEUE.md`.
- Claims to close: Open `zap.c` `zap_steed` SPE_CURE_SICKNESS via bhitm (named from D-1479 / review **440**). Not SPEED. `reviews/loop-2026-08-15/` has no unpaid steed-cure Must-fix.
- JS / map: `zap.js` `zap_steed` case + existing `bhitm` **default**. Caller `weffects` `:3437–3439`. `spell.c` self `healup` is D-1398. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **440** named remaining CURE after SPEED.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed SPE_CURE_SICKNESS via bhitm so a downward cure-sickness spell while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3116` is the **first** name in the bhitm group (`:3115–3134`). Callee `bhitm` has **no** SPE_CURE_SICKNESS arm (`:548–550` `impossible("What an interesting effect")`). Caller `weffects` `:3437–3439` and the object table:

```3437:3439:nethack-c/upstream/src/zap.c
    if (u.usteed && (objects[otyp].oc_dir != NODIR) && !u.dx && !u.dy
        && (u.dz > 0) && zap_steed(obj)) {
        disclose = TRUE;
```

```1349:1351:nethack-c/upstream/include/objects.h
SPELL("cure sickness",   "indigo",
      P_HEALING_SPELL,     32,  3, 3, 1, NODIR, CLR_BLUE,
                                                        SPE_CURE_SICKNESS),
```

`objects.h` SPE_CURE_SICKNESS is **NODIR**. A real `#cast` never enters this prefix. `spell.c` `:1552–1567` self-`healup(0,0,TRUE,FALSE)` (D-1398) never wand-duplicates into `weffects`. Forced-IMMEDIATE is the only way `zap_steed` runs: `bhitm` default then weffects disclose (SPBOOK skip makeknown).

Old JS: CURE defaulted `zap_steed` false (riding-down took `zap_updown`).

The diff **does** add `case SPE_CURE_SICKNESS:` to the `bhitm(steed)` group. It **does not** invent a `bhitm` cure arm. Honest in comments/D-log. It **does not** change `weffects` `oc_dir !== NODIR`. A real riding-down cast still never reaches the new case.

Generated `objects_data.js` `oc_dir` for this spell is `NODIR=1`, matching `objclass.h`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` SPE_CURE_SICKNESS arm | C `:3116–3133`, **wired this SHA** | |
| `weffects` `oc_dir != NODIR` gate | C `:3437`, **pre-existing** | NODIR skips this arm |
| `bhitm` SPE_CURE_SICKNESS | C default `:548–550`, **stub** | JS `default: break` (no `impossible`) |
| `spell.c` SPE_CURE_SICKNESS | C `:1552–1567`, **imported live** (D-1398) | hero `healup`, not the steed |
| `SPE_CURE_SICKNESS` const | C `objects.h`, **wired this SHA** | `objectNames.indexOf` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none on the real NODIR path. Forced IMMEDIATE only burns `bhitm` default (no dice) then disclose. Public fortress does not cast cure-sickness while mounted at a steed.

## C ↔ JS fidelity

The **switch arm** matches C `:3116` next to MAKE_INVISIBLE/STRIKING/…. `steedhit=true` after `bhitm`. Match the dispatcher.

**Callee is a stub.** Hallucination check: subject “Match C via bhitm so … hits the steed” while **`bhitm` has no cure arm** is the dispatch-stub pattern. C would `impossible()`; JS silent `default: break` then still `wakeup` if `wake` (default leaves `wake` true from `bhitm` preamble — C default also falls through to `if (wake) wakeup`). Forced path: weffects disclose, steed **not** `healup`’d. D-log states that. Subject does not.

Real cast: `spelleffects` D-1398 `healup` on the **hero**. `weffects` `oc_dir===NODIR` → `zapnodir`, never `zap_steed`. JS `weffects` copies `:3437` `oc.oc_dir !== NODIR`. Generated `objects_data.js` `NODIR=1` matches `objclass.h`. **Gameplay matches C: the steed is not cured.** Stamping “hits the steed” is the overclaim.

Do **not** invent `bhitm` `healup`/`make_sick` on a monster — C has none. That would be a C-wrong.

## Hallucinations / overclaim

Subject says a downward cure-sickness spell while riding hits the steed instead of skipping `zap_steed`. **False for a real NODIR cast** (C and JS). **True only** as “the switch case exists” / forced-IMMEDIATE `bhitm` default + disclose. D-log is honest (`objects.h` NODIR; callee impossible; self-cast D-1398). Stamping **Addressed:** D-1480 for **the dead C case** is fair as map completeness. Do **not** stamp “Match C `bhitm` cure-sickness.” Do **not** treat fortress PASS as riding-down cure.

## Density

One `zap_steed` case that **cannot** run from `weffects` on production `oc_dir`. ~3 lines of real JS. Playbook §2b **too small** (dead arm after SPEED). Not a C-wrong; waste of a port iter. Did not invent a `bhitm` body. Acceptable as “match C’s unused case,” not as a cluster.

## Branch-by-branch confirm

1. Real `#cast` SPE_CURE_SICKNESS mounted: D-1398 hero `healup`; no `zap_steed`. Match `objects.h` NODIR / `weffects` `:3437`.
2. Forced IMMEDIATE + riding down: `zap_steed` → `bhitm` default → disclose. C `impossible`; JS silent. Named clone gap, pre-existing default.
3. SPEED/SLOW/STRIKING still `bhitm` live callees. Unchanged.
4. Do not add monster `healup` here. Match C absence.
5. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Forced-IMMEDIATE is a canary, not a production `oc_dir` rewrite.

## Verification

Journal: private canary **27**/27 (C/JS grep; Rule #2; NODIR riding-down skips `zap_steed`; forced IMMEDIATE disclose+bhitpos+stay tame; D-1479…D-1443 regressions; locking named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Forced IMMEDIATE does **not** prove a steed cure. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The unused C case is now present. Inventing a `bhitm` cure body would contradict C.

Named omits (map / Open, not Must-fix):

1. `bhitm` default `impossible` vs JS silent `break` (pre-existing)
2. `zap_updown` default — Must-fix from review **437**
3. `bhit` doorlock STRIKING — Open after this SHA (later D-1482)

Do not Must-fix “NODIR should reach `zap_steed`.” Do not Must-fix “`bhitm` should `healup` the steed.” Do not Must-fix “dispatch is a stub” as if the live spell path were `weffects` (it is `spell.c`).

## Callers / RNG ledger

C callers of this arm: none on a real NODIR cast. Wizard/forced-dir only. No new dice. Public fortress does not hit it.

Verdict: **ACCEPT-WITH-DEBT**
