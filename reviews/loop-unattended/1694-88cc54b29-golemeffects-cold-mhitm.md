# Review 1694 — 88cc54b29 — golemeffects whole body + cold mhitm arm (D-2735)

Metadata: commit `88cc54b29`, D-2735, `js/mhitm.js` + `js/uhitm.js` + `js/mhitu.js`. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: golemeffects slow via `mon_adjust_speed` + cold mhitm arm, with `golemeffects_you` deleted and gulpum/passiveum/damageum rerouted. The diff delivers all of it. Promise matches deliverable.

## Inventory

Changed JS: `golemeffects_mm` (completed + `export async`); new `mhitm_ad_cold` (export) + `mhitm_adtyping` AD_COLD row; `damageum_ad_cold` + `gulpum` rerouted to the export; `passiveum` COLD/FIRE/ELEC gain `shieldeff` + export call; `golemeffects_mm` joins the uhitm/mhitu import lists. Deleted: `golemeffects_you` (heal-only clone). No new clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (deleted symbol + slow callee):

```text
golemeffects_you NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
mon_adjust_speed js/muse.js:2836   ASYNC — await required
```

Deletion is clean (zero remaining references — the playbook debt rule satisfied in the correct direction: clone deleted, callers import the export). `mon_adjust_speed` live async, awaited on the pre-existing muse.js static edge (the `damageum_ad_slow` precedent calls it the same way). All other names join existing edges. No STUB in any arm.

## C ↔ JS fidelity

C loci read: `golemeffects — mon.c:5680-5707` (read verbatim earlier), cold arms `uhitm.c:2636–2682`, passiveum `mhitu.c:2561–2602`, gulpum `uhitm.c:5140–5175` (all read verbatim this review).

- golemeffects: heal/slow init, flesh ELEC-heal / FIRE+COLD-slow, iron ELEC-slow / FIRE-heal, non-golem return, slow-before-heal order, `mspeed!=MSLOW` → `mon_adjust_speed(-1)`, heal via `healmon` + cansee pline — all ✓ verbatim. **This closes the review-1689 conditional debt** (flesh-golem FIRE slow missing at D-2730): the slow is now live on every already-wired fire/cold/elec call path. No Must-fix reopen.
- mhitm_ad_cold vs `:2664–2680`: negate → vis frost pline → resists/defended → "doesn't **seem to** chill" (mhitm wording, distinct from uhitm's "doesn't chill" ✓) → shieldeff → golemeffects → zero → destroy(orig) ✓ exact order (C mhitm arm is pline-before-shield,unlike the uhitm arm — JS matches its own arm, not its sibling's).
- damageum_ad_cold: export call added at the `:2644` position (post-pline, pre-zero) ✓; doc corrected from "slow named" to live.
- passiveum COLD/FIRE/ELEC vs `:2561–2602`: `shieldeff → pline_mon → golemeffects → tmp=0` ✓ verbatim in all three (including the `pline_mon` reach-out form and the distinct chilly/warm/tingled texts). `mtmp` is the attacking monster — the correct `golemeffects` (not hero-side `ugolemeffects`) target; the hero-side slow stays named as next row ✓.
- gulpum ELEC/COLD/FIRE vs `:5148/:5159/:5170`: export call with the (possibly resist-zeroed) `dam` in C position ✓.
- Named: `explode.c:525` (map no-port), hero-side `ugolemeffects`, `defended` AD_COLD worn-walk (pre-existing defended gap, same on every call site) — all map-named, none new.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic.

## Density

Completion + new arm + four reroutes + one deletion across three modules — a tight caller/callee cluster (playbook §2b explicitly blesses this shape). Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 88cc54b29~1 --reach-all`) — both lines, matching the D-log:

```text
verify golemeffects: baseline 88cc54b29~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify golemeffects: no corpus session is blocked on it at 88cc54b29~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke golemeffects: no RNG-tagged reach; fixed smoke spread (24 run, 4.4s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
