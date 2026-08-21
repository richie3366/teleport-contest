# Review 318 — 6fd45ec4 — eat.c lesshungry/bite choke+fullwarn (D-1356)

## Metadata
- Full / short hash: `6fd45ec49378bf982bc3fa4ea19dec6fe0acc221` / `6fd45ec4`
- Parent: `0be6d98e` (D-1355). This file audits **this SHA only**. Archive **Addressed:** D-1356 `6fd45ec4` already has the short hash (filled by D-1357).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 11:23:59 +0200
- D-id: **D-1356**
- Stats: 11 files, +188 / −51 — `js/eat.js` +135 / −40; `js/fountain.js` +1 / −1 (`await lesshungry`).
- Claims to close: Open `eat.c` lesshungry/bite choke callers (named from D-1344 / reviews **306** / **316** follow-up chain). Not zap. `reviews/loop-2026-08-15/` has no unpaid choke Must-fix.
- JS / map: `eat.js` `lesshungry` / `bite` / `doeat` canchoke / thin `do_reset_eat`; `fountain.js` drink; `c-js-map/turns.md` + `debt.md`. `adj_victual_nutrition` / `do_reset_eat` `touchfood` / `newuhs` occupation messages still named.
- Prior reviews this SHA claims to close: **306** named bite/lesshungry never calling live `choke`; D-1344 **Not this iter**.

## Intent vs deliverable

Git subject promises: “Match C eat.c lesshungry/bite so stuffing past 2000 nutrition actually chokes (and 1500 warns), instead of silently overeating.”

C `lesshungry` (`eat.c:3289–3333`); `iseating = (occupation==eatfood) \|\| force_save_hs`; `uhunger += num`; ≥2000 choke piece vs tin/`NULL`; else ≥1500 `!Hunger` fullwarn + paranoid Continue. C `bite` (`:3138–3158`): canchoke≥2000 choke return 1; else `force_save_hs` around `lesshungry`. C `doeat` `:3077` `canchoke = (u.uhs == SATIATED)`.

C `drinkfountain` fate<10 (`fountain.c:279–282`) does **not** call `lesshungry`:

```
        pline_The("cool draught refreshes you.");
        u.uhunger += rnd(10); /* don't choke on water */
        newuhs(FALSE);
```

Old JS: `lesshungry` field-add + `newuhs`; `bite` no canchoke gate; `doeat` `canchoke=0`; fountain already called `lesshungry(rnd(10))` (harmless while choke was stub).

The diff **does** port the eat.c choke/fullwarn envelope, SATIATED snapshot, `force_save_hs` first bite, and await every previous `lesshungry` site in `eat.js`. It **also** awaits fountain `lesshungry`. That keeps a caller C **deliberately** does not use, now that `lesshungry` can choke, fullwarn, and set `multi=-2`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `lesshungry` choke/fullwarn | C `:3289–3333`, **wired** | eatfood / `force_save_hs` / tin / snack |
| `bite` canchoke gate | C `:3138–3140`, **wired** | return 1; no nutrition that bite |
| `force_save_hs` | C `gf.force_save_hs`, **wired** | first `start_eating` bite before occupation |
| `doeat` canchoke | C `:3077`, **wired** | SATIATED snapshot, not live |
| `reset_eat` | C `:308–318`, **wired** | flag only |
| `do_reset_eat` | C `:422–447`, **thin clone** | stop+newuhs; **no** `touchfood`/`o_id` |
| `choke` | C, **imported live** | D-1344 |
| `paranoid_query` | C `cmd.c`, **imported live** | `PARANOID_EATING=0x0200` matches `flag.h:92` |
| `Hunger()` | C `youprop.h:147`, **clone** | H\|\|E / uprops; not `uhs==HUNGRY` |
| `stop_occupation` | C `allmain.c`, **imported live** | |
| `adj_victual_nutrition` | C `:338–356`, **named omit** | JS `-(nmod)` |
| fountain fate<10 | C `:279–282`, **C-wrong** | JS still `lesshungry`; C raw add |
| `newuhs` messages | C, **named omit** | field thresholds only (D-0438) |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none inside `lesshungry`/`bite` (paranoid yn is input). Fountain still burns `rnd(10)` then (wrongly) the choke/fullwarn side effects.

## C ↔ JS fidelity

Eat.c body matches `:3292–3332` branch order. `occupation === eatfood` uses the same function `set_occupation` stores (`engrave.js:608`). Tin: `occupation === opentin` then `context.tin.tin`, else `choke(null)` snack. `!iseating \|\| canchoke` lets a SATIATED meal choke and skips choke when `canchoke` is 0 even at 2010. Fullwarn: `!Hunger` and `(!eating \|\| (eating && !fullwarn))`; non-eating `multi=-2`; eating sets `fullwarn` and maybe Continue. One-bite-left `(reqtime-usedtime)>1` skips the prompt. Match `:3320–3327`.

`bite`: canchoke gate before `doreset`; `force_save_hs` around nutrition so `start_eating`’s first bite is `iseating` before `set_occupation`. Match `:3138–3156`. `adj_victual_nutrition` (lembas/cram race) named. `recalc_wt` after the bite matches `:3157`.

`doeat` overwrites the earlier `canchoke:0` init with SATIATED. Match `:3077`. `doeat_nonfood` already snapshotted SATIATED (C `:2746`).

Fountain is the contradiction. C comment is the spec: water must not choke. JS `lesshungry` at ≥2000 (not eating) calls `choke(null)` (`"quick snack"`). At ≥1500 it prints the hard-time pline, sets `nomovemsg`, and `multi=-2` — **a stolen turn C never takes**. D-log “Fountain awaits lesshungry” treats that as fidelity. It is not. The SHA **touched** `fountain.js` and left the wrong callee live.

Hallucination check: “Match C `lesshungry`/`bite`” while **fountain fate<10 now chokes/fullwarns** is an overclaim on **water**. The **eat.c functions** match. `choke` is live, not a stub. Do **not** stamp “Match C `drinkfountain`.” Do **not** stamp “Match C `adj_victual_nutrition`.” Do **not** stamp “Match C `do_reset_eat` `touchfood`.”

## Hallucinations / overclaim

Subject says stuffing past 2000 chokes and 1500 warns instead of silently overeating. **True for occupation eating and for tin/snack `lesshungry` callers in `eat.js`.** **False for fountain water**, which C never routes through `lesshungry`. Stamping **Addressed:** D-1356 for the eat.c callers is fair for food. It is **not** fair for `drinkfountain`. Do **not** treat fortress PASS (seed0014 drinks fountains below 1500) as a ration choke.

## Density

One C function plus its `bite`/`doeat` snapshot plus the fountain await. ~135 lines in `eat.js`. Playbook §2b right size for the eat envelope. Gluing fountain await without matching C `:281` is the quality miss, not the eat.c cluster width.

## Branch-by-branch confirm

1. Meal, canchoke, first bite ≥2000: `force_save_hs` → `lesshungry` chokes piece + `reset_eat`. Match `:3297–3300` / `:3146`.
2. Meal, `!canchoke`, 2010: no choke. Match `:3297`.
3. Tin finish, occupation `opentin`: `choke(tin)`. Match `:3302`.
4. Not eating (eatspecial after occupation clear, or other): `choke(null)` snack. Match `:3302`.
5. 1500, `!Hunger`, not eating: hard-time pline, `multi=-2`. Match `:3316–3317` — **wrong for fountain**.
6. 1500, eating, canchoke, >1 bite left, Continue `n`: `reset_eat`, clear nomovemsg. Match `:3324–3326`.
7. Hunger property: skip fullwarn. Match `:3310`.
8. `adj_victual_nutrition` lembas: JS still `-nmod`. Named.
9. `do_reset_eat`: no `touchfood`. Named.
10. Fountain fate<10, uhunger 1495+`rnd(10)`: JS may fullwarn/`multi=-2`; C only `newuhs`. **C-wrong.**
11. **Public-unhit** on choke; seed0014 fountain explore did not hit 1500.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `SATIATED=0` is `you.h`, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **21**/21 (eat.c grep + synthetic hunger; **did not** assert fountain skips `lesshungry`); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on choke. This audit cadence: full `sessions` at HEAD `fbfc72d9` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a food or water choke.

## Actionable C-wrongs

1. `fountain.c` `drinkfountain` fate<10 must `uhunger += rnd(10)` then `newuhs(FALSE)` (`:279–282`, comment “don't choke on water”). JS `await lesshungry(rnd(10))` now chokes at 2000 and fullwarns/`multi=-2` at 1500. One port iter. Source: this review.

Named omits (map / Open, not Must-fix):

1. `adj_victual_nutrition` lembas/cram race (`:338–356`)
2. `do_reset_eat` `touchfood` + `o_id` leftover weight (`:425–434`)
3. `newuhs` occupation hunger messages / faint

Do not Must-fix “skip choke when `!canchoke` at 2000” (C `:3297` does that). Do not Must-fix “choke fountain water” (C forbids it). Do not Must-fix “use live SATIATED during the meal” (C snapshots at start).

## Callers / RNG ledger

C eat: no RNG in `lesshungry`/`bite` (paranoid yn is input). C fountain: `rnd(10)` then add, **no** choke. JS fountain: `rnd(10)` then `lesshungry` side effects. Public fortress is not 1500+ water.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: eat.c choke/fullwarn matches C; `drinkfountain` fate<10 still calls `lesshungry` so water can now choke or steal a turn.
- Must-fix: prepend fountain fate<10 raw `uhunger +=` (this review).

**Addressed:** D-1359
