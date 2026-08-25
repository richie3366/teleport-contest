# Review 398 — abdbcad6 — potion.c peffect_gain_ability (D-1438)

## Metadata
- Full / short hash: `abdbcad60b54865ebb2a5b765463a5ee4f65f293` / `abdbcad6`
- Parent: `af184f1e` (D-1437). This file audits **this SHA only** (seventh of nine `js/` commits since review **391**). Archive **Addressed:** D-1438 `abdbcad6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 03:14:58 +0200
- D-id: **D-1438**
- Stats: 10 files, +140 / −26 — `js/potion.js` +52 / −2.
- Claims to close: Open `potion.c` `peffect_gain_ability` (named from D-1437). Not hallucination. `reviews/loop-2026-08-15/` has no unpaid gain-ability Must-fix.
- JS / map: `potion.js` `peffect_gain_ability` / `Fixed_abil`; callee `attrib.js` `adjattrib`. `c-js-map/turns.md` + `debt.md`. Hallucination / potionhit still named at this SHA.
- Prior reviews this SHA claims to close: **397** follow-up named gain ability.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_gain_ability so quaffing a potion of gain ability raises attributes (or tastes foul if cursed / does nothing if abilities are fixed) instead of doing nothing.”

C `potion.c` `peffect_gain_ability` `:1030–1048`:

```
    if (otmp->cursed) {
        pline("Ulch!  That potion tasted foul!");
        gp.potion_unkn++;
    } else if (Fixed_abil) {
        gp.potion_nothing++;
    } else {
        int itmp, ii, i = -1;
        for (ii = A_MAX; ii > 0; ii--) {
            i = (otmp->blessed ? i + 1 : rn2(A_MAX));
            itmp = (otmp->blessed || ii == 1) ? 0 : -1;
            if (adjattrib(i, 1, itmp) && !otmp->blessed)
                break;
        }
    }
```

`Fixed_abil` is `youprop.h:385` **extrinsic only**. `A_MAX` is 6 (`A_STR`..`A_CHA`). Callee `attrib.c` `adjattrib` `:117–199`: return TRUE iff `ACURR` changed; `msgflg` 0 always-message, −1 message-if-changed, >0 silent. `peffects` `:1382–1384` → `-1`.

Old JS: default “not implemented”.

The diff **does** add `Fixed_abil()`, the helper, and the `POT_GAIN_ABILITY` arm. It **does not** port hallucination. Named. It **does not** retouch `adjattrib` verbose already-max `flags.verbose` plines (already named on `attrib.js`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_gain_ability` | C `:1030–1048`, **wired** | |
| `Fixed_abil()` | C `youprop.h:385`, **clone matching E** | uprops + `EFixed_abil` / flat |
| `adjattrib` | C `:117–199`, **imported live** | already-max verbose named |
| `A_MAX` / `rn2` | C, **imported live** | 6 attrs |
| `peffects` POT_GAIN_ABILITY | C `:1382–1384` + `-1`, **wired** | |
| `peffect_hallucination` | C sibling, **named omit at this SHA** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** uncursed only, up to six `rn2(A_MAX)` (break on first success). Blessed/cursed/Fixed_abil burn **no** `rn2`.

## C ↔ JS fidelity

JS loop is a line-for-line port of `:1038–1047`: `i` starts −1; blessed `i+1` (so 0..5); uncursed `rn2(A_MAX)`; `itmp` 0 when blessed or last try else −1; `adjattrib(i,1,itmp)` and break if success && !blessed.

Cursed: Ulch + `potion_unkn++`; no `adjattrib`; `dopotion` `trycall` if dknown. Match. Not peculiar (`potion_nothing` stays 0).

`Fixed_abil`: `potion_nothing++` → peculiar + useup. JS checks `uprops[FIXED_ABIL].extrinsic` first (C’s macro), then E/flat mirrors. Match keep-path ring of sustain ability.

Blessed: six `adjattrib(..., 0)` in order STR..CHA; each success `You_feel("%s!", plusattr)` (`msgflg<=0`). No `rn2`. Match.

Uncursed: retries until first TRUE `adjattrib` or six tries. Intermediate `msgflg -1` still `You_feel` on success (C `:194` `msgflg<=0`). Last try `msgflg 0`. Break after one gain. Match.

Callee `adjattrib` is **not** a stub: Dunce cap, ABASE/AMAX clamp, `You_feel`, STR/CON `encumber_msg`, return TRUE/FALSE. When `ACURR` unchanged it returns FALSE **without** C `:176–186` verbose “already as high as you can get” (`attrib.js` names that). Uncursed all-max last try is silent in JS; C would print if `flags.verbose`. Named omit on the callee, not a loop-order C-wrong.

Hallucination check: “Match C `peffect_gain_ability`” while **`adjattrib` is live** is not a dispatch-stub lie. “Match C already-max verbose pline” **would** be. “Match C `peffect_hallucination`” **would** be.

## Hallucinations / overclaim

Subject says quaffing raises attributes, or Ulch if cursed, or nothing if fixed, instead of doing nothing. **True:** uncursed one +1 + one You_feel + `rn2(A_MAX)` until hit; blessed all six +1 no `rn2`; cursed Ulch no attr; EFixed_abil / uprops extrinsic peculiar+useup; dknown makeknown+useup. **False until named** for hallucination, potionhit/breathe/mix, and already-max verbose. Stamping **Addressed:** D-1438 for `:1030–1048` is fair. Do **not** treat fortress PASS as a gain-ability quaff.

## Density

One peffect plus a one-line Fixed_abil clone. ~50 lines of JS. Playbook §2b right size. Did not glue hallucination. Acceptable.

## Branch-by-branch confirm

1. Uncursed, room to grow: one `rn2` per try; first success You_feel + break. Match.
2. Blessed: i=0..5; six +1; no `rn2`. Match.
3. Cursed: Ulch; `potion_unkn`; no loop. Match.
4. Fixed_abil: peculiar; useup; no loop. Match.
5. Uncursed already-max: up to 6 `rn2`; last `msgflg 0`; C verbose named omit. Timeout/useup still. Match loop.
6. `peffects` `-1`. Match.
7. Hallucination still default at this SHA. Named.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; uncursed one +1 + one You_feel + one `rn2(A_MAX)`; blessed all six +1 no `rn2`; cursed Ulch no attr; EFixed_abil / uprops extrinsic peculiar+useup; already-max 6 `rn2` silent; dknown makeknown+useup; hallucination still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a gain-ability quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Cursed/Fixed_abil/blessed-all/uncursed-until-success match `:1030–1048`. `adjattrib` is live.

Named omits (map / Open, not Must-fix):

1. `peffect_hallucination` (next SHA)
2. potionhit / potionbreathe / mix / dipsink POT_GAIN_ABILITY
3. `adjattrib` verbose already-max `flags.verbose` plines

Do not Must-fix “cursed should adjattrib” (C Ulch+return). Do not Must-fix “uncursed should raise all” (C breaks). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG: uncursed `rn2(6)` per try. Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
