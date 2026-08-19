# Review 201 — 51a337e7 — hack.c `cannot_push` squeeze + `sokoban_guilt` (D-1239)

## Metadata
- Full / short hash: `51a337e7f4b656f04c6bf298b222efbd34fa5441` / `51a337e7`
- Parent: `6d2735b0` (D-1238). This file audits **this SHA only**. Archive row **Addressed:** D-1239 `51a337e7` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 23:53:05 +0200
- D-id: **D-1239**
- Stats: 12 files, +128 / −39 — `js/hack.js` +23 / −8; `js/trap.js` +18 / −1; comment `js/cmd.js`. Also fills review **188** named-omit note that squeeze shipped.
- Claims to close: Open `hack.c` cannot_push squeeze (named from D-1226 / review **188**). Not run>=2 boulder. `reviews/loop-2026-08-15/` has no unpaid squeeze Must-fix.
- JS / map: `hack.js` `cannot_push`; `trap.js` `sokoban_guilt`; `c-js-map/turns.md`. Giant pickup/maneuver / nopick `m<dir>` still named.
- Prior reviews this SHA claims to close: **188** Actionable named omit `cannot_push` squeeze + `sokoban_guilt` (`hack.c:304`).

## Intent vs deliverable

Git subject promises: “Match C hack.c cannot_push squeeze so a vain boulder push by a tiny, empty-pack, or phazing hero occupies the boulder cell (sokoban_guilt), instead of always aborting.”

C `cannot_push` (`hack.c:261–312`): `throws_rocks` giant pickup/maneuver + `sokoban_guilt` + `return 0`; else `could_move_onto_boulder` squeeze pline + `sokoban_guilt` + `return 0`; else `return -1`. `sokoban_guilt` (`trap.c:7039–7055`): if `Sokoban` then `sokocheat++` + `change_luck(-1)` (C TODO feedback unnamed). `moverock_core` returns that value; `domove` treats `<0` as abort and `0` as occupy.

Old JS: giant still `-1`; squeeze comment “deferred”; always `-1` after the giant arm. `could_move_onto_boulder` already live for `test_move` (D-1226).

The diff **does** the squeeze arm + live `sokoban_guilt` + `return 0`. It does **not** pull giant pickup/maneuver `return 0` or nopick `m<dir>` in `moverock_core`. Named. `cannot_push` is now exported (callers already in `moverock_core`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cannot_push` squeeze | C `:304–311`, **wired** | |
| `could_move_onto_boulder` | C `:145–163`, **already live** | D-1226; phaze / tiny / light pack / giant diagonal |
| `sokoban_guilt` | C `trap.c:7039–7055`, **new** | conduct + luck only |
| `change_luck` | C `attrib.c`, **imported live** | clamp ±10 |
| `Sokoban` | C `level.flags.sokoban_rules` | JS `game.Sokoban \|\| flags.sokoban_rules` (pre-existing Sokoban_here pattern) |
| giant pickup/maneuver | C `:264–301`, **named omit** | still `return -1` |
| nopick `m<dir>` squeeze | C `moverock_core:386–413`, **named omit** | |
| other `sokoban_guilt` callers | zap/read/steed/dig, **named omit** | |
| `cannot_push_msg` Blind `feel_location` | C, **named omit** | pre-existing |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** on this path (`sokoban_guilt` has none). `could_move_onto_boulder` may already have used `inv_weight`; not new here.

## C ↔ JS fidelity

Pinned C squeeze (`hack.c:304–311`):

```
    if (could_move_onto_boulder(sx, sy)) {
        pline(
           "However, you can squeeze yourself into a small opening.");
        sokoban_guilt();
        return 0;
    } else {
        return -1;
    }
```

JS after the giant abort: same pline, `sokoban_guilt()`, `return 0`. `cmd.js` `const mr = await moverock(); if (mr < 0) { ... return; }` then falls through and occupies `newx,newy`. C `return 0` from `moverock` means the hero steps onto the boulder cell (boulder still there). Match. The comment “occupy vacated cell” is leftover wording; squeeze does **not** vacate. Behavior still occupies.

`sokoban_guilt`: off Sokoban no-op; on Sokoban `uconduct.sokocheat++` then live `change_luck(-1)`. C TODO “Issue some feedback” still unnamed — C has no pline there either.

Giant: C can `return 0` after pickup/maneuver. JS still `-1`. A giant who cannot pick up still aborts instead of maneuvering over. **Named omit of that arm**, not a wrong squeeze. Order matches C: giant check first, so a giant never reaches squeeze (C same).

`could_move_onto_boulder`: Passes_walls; `!usteed`; giant cardinal vs diagonal-obstructed flanks; `verysmall`; `squeezeablylightinvent` (`inv_weight() <= -WT_SQUEEZABLE_INV` or empty). Already audited D-1226. This SHA only consumes it from `cannot_push`.

## Hallucinations / overclaim

Subject + D-1239 say a vain push by a tiny / empty-pack / phazing hero occupies + `sokoban_guilt`. **Squeeze + live `change_luck` + `moverock` return 0 are the hunk.** Stamping **Addressed:** D-1239 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C giant pickup/maneuver” or “Match C nopick `m<dir>`” or “Match C `maybe_finish_sokoban`.”

## Density

One C function arm plus the `sokoban_guilt` callee that arm actually calls. ~20 JS lines. Right size. Did not glue giant pickup.

## Branch-by-branch confirm

1. Phazing / tiny / empty-or-light pack, vain push: squeeze pline, `return 0`, occupy. Match.
2. Same on Sokoban: `sokocheat++` + luck −1 (clamped). Match.
3. Same off Sokoban: no luck. Match.
4. Cannot squeeze (laden, not tiny, not phazing, not giant): `-1`, abort. Match.
5. Giant: still `-1`. **Named** (C may occupy).
6. `run>=2` abort still happens **before** `moverock` (D-1226). Unchanged.
7. Passes_walls && !Sokoban skip the boulder arm entirely (walk on). Unchanged C.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `FORCETRAP` in trap.js is a pre-existing C flag name, not this SHA. Plain ESM.

## Verification

Journal: private canary **32**/32 (C order; JS squeeze; empty/load/Sokoban/steed/phaze/tiny/giant named abort; moverock vain-push then occupy; luck clamp; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a squeezable hero walks into an unpushable boulder. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. Squeeze through live `could_move_onto_boulder` + live `change_luck`. Giant abort is a named skip of that arm, not a clone that prints maneuver and then returns `-1`.

Named omits (map, not Must-fix):

1. `throws_rocks` pickup / maneuver-over + `return 0` — **Addressed:** D-1253 `d384e339`
2. nopick `m<dir>` over/against + `sokoban_guilt` in `moverock_core`
3. other `sokoban_guilt` callers (zap/read/steed/dig)
4. C TODO squeeze feedback pline (C also silent)

Do not Must-fix “call `sokoban_guilt` on a giant abort.” Do not skip `return 0` after squeeze.

## Callers / RNG ledger

C: `moverock_core` after vain-push / monster-behind / closed-door. JS same three `return cannot_push(...)`. No RNG in squeeze. Public fortress is not evidence a squeeze fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a vain boulder push by a squeezable hero now prints the C squeeze line, may debit Sokoban luck, and occupies the cell; giant pickup/maneuver still abort.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1239 `51a337e7`.
