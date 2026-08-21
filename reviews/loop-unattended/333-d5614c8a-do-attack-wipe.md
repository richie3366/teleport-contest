# Review 333 — d5614c8a — uhitm.c do_attack u_wipe_engr(3) (D-1373)

## Metadata
- Full / short hash: `d5614c8a292eb572d56981fe4d60c681a97c3bdd` / `d5614c8a`
- Parent: `b3fe3015` (D-1372). This file audits **this SHA only** (third of four `js/` commits since review **330**). Archive **Addressed:** D-1373 `d5614c8a` already has the short hash (filled by D-1374).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 15:36:51 +0200
- D-id: **D-1373**
- Stats: 10 files, +102 / −29 — `js/uhitm.js` +11 / −2 (import + replace stub comment); `js/engrave.js` comment only.
- Claims to close: Open `uhitm.c` `u_wipe_engr` attacker caller (named from D-1360). Not allmain. Not dothrow. `reviews/loop-2026-08-15/` has no unpaid melee-wipe Must-fix.
- JS / map: `uhitm.js` `do_attack`; callee `engrave.js` `u_wipe_engr` (D-1051). `c-js-map/turns.md`. dothrow/dig / leprechaun evade still named.
- Prior reviews this SHA claims to close: D-1372 follow-up named this Open. Review **330** named the wipe family from D-1360, not this locus specifically.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c do_attack so a melee attack actually wipes the hero-cell engraving via u_wipe_engr(3), instead of leaving dust intact through hitum.”

C `uhitm.c` `do_attack` `:551–553`:

```
    exercise(A_STR, TRUE); /* you're exercising muscles */
    /* andrew@orca: prevent unlimited pick-axe attacks */
    u_wipe_engr(3);
```

Then leprechaun evade (`:555–562` `!rn2(7)` + `m_move`) or `hmonas`/`hitum`. Callee `engrave.c` `:264–268`. Constant 3: **no wrapper RNG**. ENGRAVE uses `rn2(1+50/(3+1))` i.e. `rn2(13)`.

C gates **before** exercise/wipe: safemon return, `attack_checks`, `Upolyd && noattacks` → `atk_done`, `check_capacity || overexertion` → `atk_done`, twoweapon `untwoweapon`. JS already has safemon / `attack_checks` / `overexertion` / unweapon pline. It still skips `noattacks`, `check_capacity`, `untwoweapon` (D-log names the last two; `noattacks` is live in `hack.js` but unused here).

Old JS: `exercise(A_STR, true); // u_wipe_engr(3) — no RNG when no engraving`.

The diff **does** call live `u_wipe_engr(3)` on that site. It does **not** port leprechaun evade. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `do_attack` wipe | C `:551–553`, **wired** | after STR exercise, before leprechaun/`hitum` |
| `u_wipe_engr` | C `:264–268`, **imported live** | D-1051; cnt=3 |
| `exercise(A_STR,true)` | C `:551`, **pre-existing live** | unchanged |
| `overexertion` | C `:533`, **pre-existing live** | before wipe; match |
| `attack_checks` | C `:521`, **pre-existing live** | before wipe; match |
| leprechaun evade | C `:555–562`, **named omit** | after wipe; `!rn2(7)` still skipped |
| `check_capacity` | C `:531`, **named omit** | before wipe; D-log names it |
| `Upolyd && noattacks` | C `:524–529`, **named omit** | before wipe; D-log missed this one |
| `untwoweapon` | C `:536–537`, **named omit** | before wipe |
| dothrow/dig callers | C other files, **named omit** | D-1374 / still Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none on the wrapper. Callee may add ENGRAVE `rn2(13)` when a non-DUST engraving exists. DUST / empty / HEADSTONE / Levitation: zero extra dice (constant cnt).

## C ↔ JS fidelity

JS after this SHA: `exercise(A_STR, true)` then `u_wipe_engr(3)` then the named leprechaun skip then `hmonas`/`hitum`. That is C’s keep-path after the gates JS already shares (`attack_checks`, `overexertion`). cnt=3 vs dokick/apply/throw cnt=2 is the C distinction (andrew@orca pick-axe). Callee matches D-1372’s walk of `can_reach_floor` / DUST / ENGRAVE `rn2(13)` / HEADSTONE / BURN / Levitation.

`check_capacity` still absent: an EXT_ENCUMBER hero continues to exercise+wipe+hit in JS; C `goto atk_done` **before** wipe. Pre-existing missing gate; D-log names it. Do not Must-fix as “move the wipe” — the fix is the capacity pline cluster, not this call.

`noattacks` is the same shape: pacifist poly forms print `"You have no way to attack monsters physically."` and skip wipe in C (`hack.js` already exports `noattacks`; `do_attack` never calls it). Pre-existing attack omit; this SHA newly also wipes on that path. Still a named omit of **that** early return, not a clone of `u_wipe_engr`. Map it; do not queue a one-line wipe skip as Must-fix.

Leprechaun evade is **after** wipe in C. Skipping it means JS always continues to `hitum` after wiping — C sometimes returns FALSE after wiping. Wipe itself still happened. Named.

Hallucination check: “Match C `do_attack` wipe” while **`u_wipe_engr` is live** is not a dispatch-stub lie. Do **not** stamp “Match C leprechaun evade.” Do **not** stamp “Match C `check_capacity` / `noattacks`.” Do **not** stamp “Match C dothrow wipe” (next SHA).

## Hallucinations / overclaim

Subject says a melee attack wipes the hero-cell engraving instead of leaving dust through `hitum`. **True on the keep-path** after `attack_checks` / `overexertion` when the floor is reachable. **False until named for leprechaun evade** (wipe still runs; hit does not). False for `noattacks` / `check_capacity` (C never reaches wipe). D-log “Not this iter” is honest for leprechaun / capacity / twoweapon; it **omits** `noattacks` — add it to the map, do not Must-fix. Stamping **Addressed:** D-1373 for `:551–553` is fair. Do **not** treat fortress PASS as a melee Elbereth smudge.

## Density

One call in a function this module already owns, plus an already-live callee. ~11 lines. Playbook §2b thin — same Open-row pop as D-1372. Did not glue dothrow (next Open) or leprechaun. Acceptable fortress map pop. Did not re-open D-1371.

## Branch-by-branch confirm

1. Safemon `foo` return: no exercise; no wipe. Match C early return.
2. `attack_checks` true: no wipe. Match `:521`.
3. `overexertion` faint: no wipe. Match `:533`.
4. Keep-path: STR exercise then cnt=3 wipe then `hitum`. Match `:551–568` minus leprechaun.
5. DUST reachable: erode 3 chars. Match.
6. ENGRAVE: `rn2(13)` only. Match `50/(3+1)`.
7. Levitation / no engraving / HEADSTONE: no extra RNG. Match.
8. Leprechaun `!rn2(7)`: not called. Named. Wipe already done (C same).
9. `check_capacity` / `noattacks`: still fall through to wipe. Named gates.
10. dokick(2) / allmain `rnd(3)` unchanged. Match.
11. **Public-unhit** unless a session melees on a wipeable engraving.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Literal `3` is C’s constant, not a recorded coordinate. Plain ESM. Sync callee is C `void`.

## Verification

Journal: private canary **28**/28 (C/JS grep; live DUST smudge via callee and `do_attack`; no-engraving / HEADSTONE / BURN / Levitation only exercise RNG; ENGRAVE `rn2(13)`; cnt=3 vs dokick cnt=2; apply/dokick/allmain kept; dothrow/dig still named; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on melee wipe. This audit cadence: full `sessions` at HEAD `08007958` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `40+0.33/turn` (R² 0.86). I did not re-run the private canary. Fortress PASS is not a melee dust wipe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The keep-path call matches `:551–553`; the callee is live. Missing **earlier** gates (`noattacks`, `check_capacity`) and the **later** leprechaun arm are named omits of other clusters.

Named omits (map / already-Open, not Must-fix):

1. leprechaun evade `!rn2(7)` + `m_move` (`:555–562`)
2. `check_capacity` before wipe (`:531`)
3. `Upolyd && noattacks` before wipe (`:524–529`) — D-log missed; map it
4. `untwoweapon` (`:536–537`)
5. dothrow wipe (shipped next SHA as D-1374); dig still Open

Do not Must-fix “wipe only after `hitum` hits” (C wipes before the hit). Do not Must-fix “cnt=2 like kick” (C melee is 3). Do not Must-fix “skip wipe when leprechaun will evade” (C wipes first).

## Callers / RNG ledger

C: no wrapper RNG; ENGRAVE `rn2(13)` only. JS same on the keep-path. Public fortress never melees on a wipeable cell.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: melee now calls live `u_wipe_engr(3)` after STR exercise; leprechaun evade and the pre-wipe `noattacks`/`check_capacity` gates stay named.
- Must-fix stays empty for this SHA.
