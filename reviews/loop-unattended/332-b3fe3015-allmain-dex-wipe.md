# Review 332 — b3fe3015 — allmain.c moveloop DEX timeout u_wipe_engr(rnd(3)) (D-1372)

## Metadata
- Full / short hash: `b3fe301536c3600b548d53df052f8e62504f3cad` / `b3fe3015`
- Parent: `211485a0` (D-1371). This file audits **this SHA only** (second of four `js/` commits since review **330**). Archive **Addressed:** D-1372 `b3fe3015` already has the short hash (filled by D-1373).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 15:24:29 +0200
- D-id: **D-1372**
- Stats: 11 files, +91 / −61 — `js/allmain.js` +7 / −3 (import + replace `rnd(3)` stub); `js/engrave.js` comment only.
- Claims to close: Open `allmain.c` `u_wipe_engr` DEX timeout caller (named from D-1360). Not dokick. `reviews/loop-2026-08-15/` has no unpaid wipe Must-fix.
- JS / map: `allmain.js` moveloop EOT; callee `engrave.js` `u_wipe_engr` (D-1051). `c-js-map/turns.md`. uhitm/dothrow/dig still named at this SHA.
- Prior reviews this SHA claims to close: **330** named allmain wipe as the next Open after hurtle. **328**’s Shock Must-fix shipped on the parent SHA.

## Intent vs deliverable

Git subject promises: “Match C allmain.c moveloop so a DEX timeout actually wipes the hero-cell engraving via u_wipe_engr(rnd(3)), instead of burning rnd(3) and leaving the dust.”

C `allmain.c` `moveloop` `:356–361`:

```
                invault();
                if (u.uhave.amulet)
                    amulet();
                if (!rn2(40 + (int) (ACURR(A_DEX) * 3)))
                    u_wipe_engr(rnd(3));
```

Callee `engrave.c` `u_wipe_engr` `:264–268`: `can_reach_floor(TRUE)` then `wipe_engr_at(u.ux,u.uy,cnt,FALSE)`. `rnd(3)` is the argument — clang evaluates it **before** the body, so the die always burns on fire even if Levitation skips the wipe. No extra RNG with no engraving / HEADSTONE / BURN-on-stone. ENGRAVE uses `rn2(1+50/(cnt+1))`.

Old JS: `if (!rn2(40 + acurr(A_DEX)*3)) { rnd(3); }` after invault. Same dice, no callee.

The diff **does** import live `u_wipe_engr` and pass `rnd(3)` on the then-arm. It does **not** port `amulet()` between invault and the timeout (`u.uhave.amulet` still named). It does **not** port uhitm/dothrow/dig callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| moveloop DEX timeout | C `:360–361`, **wired** | `!rn2(40+ACURR(DEX)*3)` then callee |
| `u_wipe_engr` | C `:264–268`, **imported live** | D-1051; not a stub |
| `wipe_engr_at` | C `:270–289`, **imported live** | DUST keeps cnt; ENGRAVE `rn2` |
| `can_reach_floor(true)` | C, **imported live** | D-1070 Levitation skip |
| `rn2` / `rnd(3)` / `acurr` | C, **imported live** | stub already used this formula |
| `amulet()` | C `:358–359`, **named omit** | skipped; wipe still after invault |
| udemigod `intervene` | C `:362–368`, **named omit** | after wipe |
| uhitm/dothrow/dig callers | C other files, **named omit** | later SHAs / still Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none vs the stub. The timeout already burned `rn2` + `rnd(3)`; the callee may add ENGRAVE `rn2(1+50/(cnt+1))` when a non-DUST engraving exists.

## C ↔ JS fidelity

JS after this SHA:

```
if (!rn2(40 + (acurr(A_DEX) * 3))) {
    u_wipe_engr(rnd(3));
}
```

`acurr` is C `ACURR` (`attrib.js`; DEX clamp 3..25). Bound matches C `40+(int)(ACURR*3)` (DEX 3 → 49; 18 → 94; 25 → 115). `rnd(3)` is `1..3` (`rng.js:69–73` ≡ C `RND(x)+1`). Argument eval before `u_wipe_engr` matches clang: Levitation / swallow still burn `rnd(3)` then `can_reach_floor` returns false with **zero** `wipe_engr_at` RNG. No engraving / HEADSTONE / `nowipeout`: callee returns with no extra die. DUST: erode `cnt` chars, no `rn2`. ENGRAVE: `rn2(1+Math.trunc(50/(cnt+1)))` → 0 or 1 char. BURN-on-stone: skip (`magical===false`). Match `:264–289`.

`amulet()` remains skipped. If the hero holds the Amulet, C may burn RNG inside `amulet()` **before** this `rn2`; JS fires the timeout immediately after invault. That is a named omit of **another** callee, pre-existing at the stub site — this SHA did not move the `rn2`. Do not treat it as a wipe C-wrong.

Hallucination check: “Match C `moveloop` wipe” while **`u_wipe_engr` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `amulet()`.” Do **not** stamp “Match C uhitm/dothrow/dig wipe.” Do **not** stamp “timeout always wipes under Levitation” (C `can_reach_floor` false).

## Hallucinations / overclaim

Subject says a DEX timeout wipes the hero-cell engraving instead of burning `rnd(3)` and leaving dust. **True when the timeout fires and the floor is reachable with a wipeable engraving.** **False until named for `amulet()` order** when `u.uhave.amulet`. False for uhitm/dothrow/dig until those callers. D-log “Not this iter” is honest. Stamping **Addressed:** D-1372 for `:360–361` is fair. Do **not** treat fortress PASS as a vanished Elbereth from EOT smudge.

## Density

One then-arm in a function this module already owns, plus an already-live callee. ~7 lines of JS. Playbook §2b “one deferred `if` alone” is **thin**. This was the queued Open row after Must-fix D-1371 (review **330** told the next iter to ship allmain wipe, not stack another dokick peel). Did not glue uhitm (next Open). Acceptable fortress map pop. Consecutive sibling wipe callers in D-1373/D-1374 are the same thin pattern — process waste, not a C-wrong here.

## Branch-by-branch confirm

1. Timeout `rn2` false: no `rnd(3)`; no wipe. Match `:360` short-circuit.
2. Timeout fire, no engraving: `rnd(3)` then callee no-ops. Match.
3. DUST, reachable: erode 1..3 chars. Match.
4. ENGRAVE: `rnd(3)` then `rn2(1+50/(cnt+1))`. cnt=1 → `rn2(26)`; cnt=3 → `rn2(13)`. Match.
5. HEADSTONE / `nowipeout`: no erode. Match `:276`.
6. BURN not ice: skip; no `rn2(2)` because `magical` is false. Match.
7. Levitation (H\|\|E)&&!B, not air/water: `rnd(3)` then `can_reach_floor` false. Match D-1070.
8. Swallow / AT_HUGS stuck: same skip. Match D-1071.
9. `amulet()` still not called. Named.
10. dokick(2) D-1360 unchanged. Match.
11. **Public-unhit** unless a session stands on a wipeable engraving when the DEX timeout fires.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rnd(3)` is the C die, not a seed-shaped constant. Plain ESM. Sync callee is C `void`.

## Verification

Journal: private canary **29**/29 (C/JS grep; DEX bound 9/18/3/25; live DUST smudge; no-engraving / HEADSTONE / BURN / Levitation only `rnd(3)`; ENGRAVE `rn2(1+50/(cnt+1))`; live 400-turn timeout arm; dokick(2) kept; uhitm/dothrow/dig still named; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on EOT wipe. This audit cadence: full `sessions` at HEAD `08007958` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `40+0.33/turn` (R² 0.86). I did not re-run the private canary. Fortress PASS is not a DEX-timeout Elbereth smudge.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The then-arm matches `:360–361` branch order and RNG; `u_wipe_engr` is the real function. `amulet()` / sibling callers are named omits of **other** sites.

Named omits (map / already-Open, not Must-fix):

1. `amulet()` when `u.uhave.amulet` (`:358–359`)
2. udemigod `intervene` (`:362–368`)
3. `mkot_trap_warn` / `do_storms` (pre-existing EOT gaps before invault)
4. uhitm `do_attack` wipe (shipped next SHA as D-1373)
5. dothrow / dig callers

Do not Must-fix “always `rnd(3)` when `rn2` is false” (C short-circuits). Do not Must-fix “skip `rnd(3)` under Levitation” (C evaluates the arg first). Do not Must-fix “await the wipe” (C is void; no pline).

## Callers / RNG ledger

C: `rn2(40+DEX*3)` every EOT after invault/amulet; on fire `rnd(3)` then maybe ENGRAVE `rn2`. JS: same `rn2`/`rnd` position as the stub, now with the live callee. Public fortress never hits a wipeable cell on fire.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: the DEX timeout now calls live `u_wipe_engr(rnd(3))` instead of discarding the die; amulet order and other callers stay named.
- Must-fix stays empty for this SHA.
