# Review 334 — 08007958 — dothrow.c throw_obj u_wipe_engr(2) (D-1374)

## Metadata
- Full / short hash: `080079583f1963b766c10fd42ed4185e515a6219` / `08007958`
- Parent: `d5614c8a` (D-1373). This file audits **this SHA only** (last of four `js/` commits since review **330**). Archive **Addressed:** D-1374 lacked the short hash; this review commit fills `08007958`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 15:45:52 +0200
- D-id: **D-1374**
- Stats: 12 files, +108 / −31 — `js/dothrow.js` +13 / −1 (import + wipe after self refuse); `js/allmain.js` / `js/uhitm.js` / `js/engrave.js` comments only.
- Claims to close: Open `dothrow.c` `u_wipe_engr` caller (named from D-1360). Not uhitm. Not dig. `reviews/loop-2026-08-15/` has no unpaid throw-wipe Must-fix.
- JS / map: `dothrow.js` `throw_obj`; callee `engrave.js` `u_wipe_engr` (D-1051). `c-js-map/turns.md`. canletgo / Mjollnir / too-heavy / welded / wet-towel / petrify `:139–148` / dig still named.
- Prior reviews this SHA claims to close: D-1373 follow-up named this Open. Review **330** named the D-1360 wipe family.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throw_obj so a throw actually wipes the hero-cell engraving via u_wipe_engr(2), instead of leaving dust intact through throwit.”

C `dothrow.c` `throw_obj` `:98–156` order after getdir: gold (`!= uquiver` → `throw_gold` return), `canletgo`, unwielded Mjollnir, too-heavy, self (`!dx && !dy && !dz` → unsplit, **no wipe**), **then** `u_wipe_engr(2)` at `:138`, **then** petrify / welded / wet-towel / multishot.

Callee `engrave.c` `:264–268`. Constant 2: **no wrapper RNG**. ENGRAVE uses `rn2(1+50/(2+1))` i.e. `rn2(17)`.

Old JS: gold early-return; self refuse (D-0720); then named petrify omit / multishot. No wipe. `getdir` lives in `dothrow`/`dofire` callers — cancel never enters `throw_obj` (C cancel is inside `throw_obj` before gold; same one prompt).

The diff **does** call live `u_wipe_engr(2)` after self refuse, before the petrify comment / multishot. It does **not** port `canletgo` / Mjollnir wielded / too-heavy (C returns **before** wipe) or welded / wet-towel (C **after** wipe). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throw_obj` wipe | C `:138`, **wired** | after self refuse, before petrify |
| `u_wipe_engr` | C `:264–268`, **imported live** | D-1051; cnt=2 |
| self refuse | C `:133–137`, **pre-existing live** | D-0720; no wipe; match |
| non-quiver gold | C `:112–116`, **pre-existing live** | `throw_gold` return before wipe |
| quivered gold | C continues to wipe, **named omit** | JS `return 0` before wipe (throwit) |
| `canletgo` | C `:118–121`, **named omit** | C returns before wipe |
| Mjollnir unwielded / too-heavy | C `:122–132`, **named omit** | C returns before wipe |
| welded / wet-towel | C `:150–156`, **named omit** | **after** wipe; skip does not skip wipe |
| petrify `:139–148` | C, **named omit** | after wipe |
| `dig.c` axe-scratch | C `dig.c:1335`, **named omit** | still Open |
| apply pole/grapple wipe | C `apply.c:3561`, **pre-existing live** | D-1051; not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` in this file is a pre-existing C trap flag, not this hunk. Rule #2 clean. **New gameplay RNG:** none on the wrapper. Callee may add ENGRAVE `rn2(17)`. DUST / empty / HEADSTONE / Levitation: zero extra dice.

## C ↔ JS fidelity

JS after this SHA: gold (`throw_gold` or quivered `return 0`), self refuse, `u_wipe_engr(2)`, named petrify skip, multishot. Keep-path after a real direction matches `:133–138`. cnt=2 vs melee 3 / DEX `rnd(3)` is the C distinction. Callee matches the D-1372 walk (DUST keeps 2; ENGRAVE `rn2(17)`; Levitation skip after no wrapper die).

`getdir` cancel: caller returns 0; wipe never runs. Match C `ECMD_CANCEL` before `:138`.

Non-quiver gold: `throw_gold` returns before wipe. Match `:112–116`. Quivered gold: C would wipe then throwit; JS still `return 0` (pre-existing throwit omit). Do not Must-fix “wipe then still return 0” — the missing body is quivered throwit, not the wipe placement. Do not move wipe before the gold test (non-quiver gold must not wipe).

`canletgo` / unwielded Mjollnir / too-heavy: C never reaches `:138`. JS `throw_ok` DOWNPLAY still lets `*` pick worn/welded junk; those throws now **wipe then proceed**. Pre-existing missing gates; D-log names them. The keep-path dart/weapon throw C also wipes. Do not Must-fix as “delete the wipe” — the cluster is those early returns.

Welded / wet-towel sit **after** `:138`. Skipping them does not create an extra wipe vs C; C already wiped. Named.

Hallucination check: “Match C `throw_obj` wipe” while **`u_wipe_engr` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `canletgo`.” Do **not** stamp “Match C quivered gold throwit.” Do **not** stamp “Match C `dig.c` wipe.” Do **not** stamp “Match C petrify `:139–148`.”

## Hallucinations / overclaim

Subject says a throw wipes the hero-cell engraving instead of leaving dust through `throwit`. **True on the keep-path** after a non-self direction for a non-gold object. **False for `canletgo`/Mjollnir/too-heavy** until those returns exist (JS may wipe when C would not). **False for quivered gold** (C would wipe; JS returns 0). D-log names canletgo/Mjollnir/too-heavy and throw_gold; it does not spell quivered gold vs wipe — map that, do not Must-fix the live wipe. Stamping **Addressed:** D-1374 for `:138` is fair. Do **not** treat fortress PASS — including seed1800 throw — as an Elbereth smudge unless that session threw from a wipeable cell.

## Density

One call after a refuse this module already owned, plus an already-live callee. ~13 lines. Playbook §2b thin — third sibling wipe Open in a row (D-1372/D-1373/D-1374). Each was the queued first Open; they did not glue dig. Process waste vs packing the three C callers in one cluster, but not a C-wrong of this SHA. Did not glue petrify `:139–148`.

## Branch-by-branch confirm

1. getdir cancel in caller: no `throw_obj`; no wipe. Match C cancel.
2. Self `.`/`s`: refuse pline; return 0; **no wipe**. Match `:133–137`.
3. Non-quiver gold: `throw_gold`; no wipe. Match `:112–116`.
4. Keep-path weapon/dart: cnt=2 wipe then multishot. Match `:138` then `:158`.
5. DUST reachable: erode 2 chars. Match.
6. ENGRAVE: `rn2(17)` only. Match `50/(2+1)`.
7. Levitation / no engraving / HEADSTONE: no extra RNG. Match.
8. Welded (if reached): C would already have wiped. JS wipes then still throws. Named after-wipe omit.
9. `canletgo` fail paths: C no wipe; JS may wipe. Named before-wipe omit.
10. apply(2) / dokick(2) / allmain `rnd(3)` / uhitm(3) unchanged. Match.
11. `dig.c` still no caller. Named. Open remains.
12. **Public-unhit** unless a session throws while standing on a wipeable engraving.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Literal `2` is C’s constant. Comment-only edits in allmain/uhitm/engrave are not control flow. Plain ESM. Sync callee is C `void`.

## Verification

Journal: private canary **19**/19 (C/JS grep; live DUST smudge via callee and `throw_obj`; self-refuse does not wipe; no-engraving / HEADSTONE / BURN / Levitation only exercise RNG; ENGRAVE `rn2(17)`; cnt=2 vs melee cnt=3; apply/dokick/allmain/uhitm kept; dig still named; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on throw wipe. This audit cadence: full `sessions` at HEAD `08007958` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `40+0.33/turn` (R² 0.86). I did not re-run the private canary. Fortress PASS including seed1800 throw is not a dust wipe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The keep-path call matches `:138`; the callee is live. Missing **earlier** returns (`canletgo` / Mjollnir / too-heavy / quivered gold throwit) and **later** petrify/welded/wet-towel / `dig.c` are named omits of other clusters.

Named omits (map / already-Open, not Must-fix):

1. `canletgo` / unwielded Mjollnir / too-heavy (`:118–132`) — C skips wipe
2. quivered gold throwit (C wipes; JS `return 0`)
3. petrify `:139–148` `killer_xname`
4. welded / wet-towel (`:150–156`) — after wipe
5. `dig.c` `u_wipe_engr(3)` axe-scratch (`:1335`) — **next Open**

Do not Must-fix “wipe before self refuse” (C does not). Do not Must-fix “cnt=3 like melee” (C throw is 2). Do not Must-fix “wipe gold” (C `throw_gold` returns first).

## Callers / RNG ledger

C: no wrapper RNG; ENGRAVE `rn2(17)` only. JS same on the keep-path. Public fortress never throws from a wipeable cell.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a directed throw now calls live `u_wipe_engr(2)` after self refuse; canletgo/Mjollnir/too-heavy, quivered gold, and dig stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1374 `08007958`.
