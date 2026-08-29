# Review 571 — 35d8e512 — dog.c initedog ogoal -1 / first-pet livelog (D-1610)

## Metadata
- Full / short hash: `35d8e51294e795a1ef7af3db31b4bf5acba9d7bf` / `35d8e512`
- Parent: `c3d43f93` (D-1609). This file audits **this SHA only** (eighth of nine `js/` commits since review **563**). Archive **Addressed:** D-1610 `35d8e512`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 01:42:27 +0200
- D-id: **D-1610**
- Stats: `js/dog.js` +20/−6, `js/do_name.js` +2/−1, `js/dogmove.js` +1. Band **150–350** (js/ insertions **23**).
- Claims to close: Open `initedog` ogoal `-1` after D-1595. Not has_edog. Not D-0006. Not `free_edog`. `reviews/loop-2026-08-15/` has no unpaid initedog Must-fix.
- JS / map: `dog.js` `initedog`; consumer `dogmove.js` `dog_goal`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **556** named ogoal / first-pet livelog after has_edog.

## Intent vs deliverable

Git subject promises: a new pet stores `ogoal` as C’s `-1` sentinel, and the first in-moveloop pet is livelogged.

Pinned C `dog.c` `initedog` `:44–88`. Everything-arm ogoal `:63–64`. Livelog `:79–86`. Consumer `dogmove.c` `dog_goal` `:621–626` (`ogoal.x` truthy). `--callers initedog`: makedog `:204`/`:282`; tamedog `:1256`/`:1258`; mhitu `:2631`; read.c `:1771`.

```63:86:nethack-c/upstream/src/dog.c
        edogp->ogoal.x = -1; /* force error if used before set */
        edogp->ogoal.y = -1;
        ...
    if (!u.uconduct.pets && program_state.in_moveloop) {
        livelog_printf(LL_CONDUCT, "obtained %s first pet (%s)",
                       uhis(), an(mon_pmname(mtmp)));
    }
    u.uconduct.pets++;
```

Old JS: `ogoal = {x:0,y:0}` so `if (edog.ogoal.x)` was falsy; livelog named omit; `pets++` already live (D-1595).

The diff **does** `{x:-1,y:-1}` on the everything arm, livelog when `!pets && in_moveloop`, then `pets++`, and one `mon_pmname` export. `dog_goal` still tests truthiness (comment only). It **does not** port `free_edog`, restore `newedog`, or read.c light-scroll `initedog`. Named. Not D-0006.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `initedog` ogoal | C `:63–64`, **LIVE this SHA** | everything arm only |
| first-pet livelog | C `:79–86`, **LIVE this SHA** | |
| `pets++` | C `:87`, **LIVE** | already D-1595 |
| `livelog_printf` | C pline.c, **LIVE** | gamelog array; file write named |
| `uhis` / `an` / `mon_pmname` | **LIVE** | `mon_pmname` export this SHA |
| `dog_goal` `ogoal.x` truthy | C `:622`, **LIVE** | `-1` now truthy |
| `has_edog` | C, **LIVE** | D-1595 |
| `free_edog` | C extern, **OMIT named** | no src callers |
| restore `newedog` | C restore, **OMIT named** | |
| read.c light-scroll `initedog` | C `:1771`, **OMIT named** | |

`node scripts/csym.mjs initedog` → `:44-88`. `dog_goal` reuse arm is `:621-626`. `--callers initedog` as above.

RNG: none in `initedog`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (`mon_pmname` local → export):

```
initedog         js/dog.js:84   sync
mon_pmname       js/do_name.js:432   sync
livelog_printf   js/pline.js:23   sync
uhis             js/roles.js:641   sync
an               js/objnam.js:1608   sync
             !! ALSO 1 LOCAL CLONE (lock.js:874) — Do NOT add #3
```

`--can dog.js do_name.js mon_pmname`: ALREADY. `--can dog.js pline.js livelog_printf`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `mon_pmname` #2 in `dog.js`. Do **not** add `an` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

ogoal sentinel. Everything arm `ogoal = {x:-1,y:-1}`. **Match `:63–64`.** Non-everything does not touch ogoal. **Match.** Starting `{0,0}` made `if (ogoal.x)` skip reuse; `-1` is truthy in JS as in C.

`dog_goal`. `edog && edog.ogoal?.x && (x !== omx || y !== omy)` then copy into `gg` and set `ogoal.x = 0`. **Match `:621–626`.** Optional chaining is extra; C `edog` always has the field. First reuse of unset `-1` copies those coords (C “force error if used before set”). **Match that C behavior**, not a JS invention.

Livelog. `!pets && in_moveloop` then `livelog_printf(LL_CONDUCT, 'obtained %s first pet (%s)', uhis(), an(mon_pmname(mtmp)))` then always `pets++`. **Match `:79–87`.** Starting pet is before `in_moveloop` (preamble sets the flag after `u_init`). **Match the comment.** `LL_CONDUCT = 0x0020`. File `livelog_add` still deferred in `pline.js`. Named.

`mon_pmname`. Gender-aware `pmnames[]`. **Match do_name.c.** One export; `mon_plain_name` calls it. Do not clone in `dog.js`.

Callee closure (everything arm + livelog). LIVE: `EDOG`, `acurr`, `livelog_printf`, `uhis`, `an`, `mon_pmname`. OMIT named: `free_edog` / restore / read.c. STUB: none. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `-1` sentinel + first in-moveloop pet livelog: **true.** D-log “`dog_goal` still tests truthiness”: **true.** Do **not** stamp “Match C `free_edog`.” Do **not** stamp “Match C restore `newedog`.” Do **not** stamp “Match C read.c light-scroll `initedog`.” Do **not** stamp “Match C livelog file write.” Do **not** stamp “fixed D-0006 pet movement.” Public starting pet does not hit the livelog (`in_moveloop` still 0).

## Density

One `initedog` envelope (sentinel + the livelog the same function runs). +23 JS. C is that small. Did not glue D-0006. §2b OK.

## Branch-by-branch confirm

1. `everything`: ogoal `-1,-1`. **Match.**
2. `!everything`: ogoal unchanged. **Match.**
3. `!pets && in_moveloop`: livelog then `pets++`. **Match.**
4. Starting pet `!in_moveloop`: no livelog, still `pets++`. **Match.**
5. `dog_goal` reuse when `ogoal.x` truthy. **Match.**
6. `free_edog` / restore / read.c. **Named.**

## Callers / RNG ledger

`initedog` already wired (makedog / tamedog / make_familiar). read.c named. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `mon_pmname` #2. Do not store `{0,0}` as unset. Do not implement D-0006. Do not wrap `wildmiss` as `pline_mon`. Do not poke `in_moveloop` to force the livelog.

## Verification

D-log private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for in-moveloop first-pet livelog (starter pet is preamble-before-flag). Fortress `dog_goal` may now reuse `-1` once if a pet is tamed before `ogoal` is written; that is C. read.c unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `free_edog`; restore `newedog`; read.c `:1771` `initedog`; livelog file write; lock.js `an` clone. Do not add `mon_pmname` #2. has_edog is D-1595. Not D-0006.

Verdict: **ACCEPT-WITH-DEBT**
