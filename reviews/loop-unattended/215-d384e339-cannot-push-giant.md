# Review 215 — d384e339 — hack.c cannot_push giant pickup/maneuver (D-1253)

## Metadata
- Full / short hash: `d384e33911c16464a8fe44fbe016c719718e0367` / `d384e339`
- Parent: `f7714f94` (D-1252). This file audits **this SHA only**. Archive row **Addressed:** D-1253 lacked the short hash; this review commit fills `d384e339`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 04:06:43 +0200
- D-id: **D-1253**
- Stats: 11 files, +181 / −205 — `js/hack.js` +67 / −8; comment `js/cmd.js`; fills review **201** named-omit note that giant shipped.
- Claims to close: Open `hack.c` giant pickup/maneuver (named from D-1239 / review **201**). Not cannot_push squeeze. `reviews/loop-2026-08-15/` has no unpaid giant Must-fix.
- JS / map: `hack.js` `cannot_push` throws_rocks arm; `c-js-map/turns.md`. nopick `m<dir>` over/against still named.
- Prior reviews this SHA claims to close: **201** Actionable named omit `throws_rocks` pickup / maneuver-over + `return 0`.

## Intent vs deliverable

Git subject promises: “Match C hack.c cannot_push giant pickup/maneuver so a throws_rocks hero who cannot shove a boulder occupies the cell (easily pick / maneuver), instead of always aborting.”

C `cannot_push` (`hack.c:264–301`): if `throws_rocks`, `canpickup = !Sokoban && (inv_cnt(FALSE)<invlet_basic || !carrying(BOULDER))`; `willpickup = canpickup && flags.pickup && !nopick && autopick_testobj(otmp, TRUE)`; unskilled riding You skip `sokoban_guilt`; else However-pline + `sokoban_guilt`; **always `return 0`**. Squeeze D-1239 follows. Callers in `moverock_core` (`:430,447,482,487,634`) treat `0` as occupy, `-1` as abort. nopick `m<dir>` (`:386–413`) is a **different** site (over/against plines) — named.

Old JS: throws_rocks comment “deferred”; `return -1`. Squeeze already live after this arm.

The diff **does** the giant arm + `return 0`. It does **not** pull nopick `m<dir>` in `moverock_core` or costly autopick. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cannot_push` throws_rocks | C `:264–301`, **new** | was `return -1` |
| `inv_cnt` | C `hack.c:4496–4507`, **clone** | skip `COIN_CLASS` vs C `invlet!=GOLD_SYM` |
| `carrying` | C `invent.c`, **already local** | first matching `otyp` |
| `autopick_testobj` | C `pickup.c:930–965`, **clone** | pickup_types only; costly/thrown/stolen named (same as `pickup.js`) |
| `Sokoban_here` | C `Sokoban` macro, **already local** | `game.Sokoban \|\| sokoban_rules` |
| `sokoban_guilt` | C `trap.c`, **imported live** | D-1239 |
| `the` / `xname` / `y_monnam` | C, **imported live** | riding You |
| `P_RIDING` / `P_BASIC` | C `skills.h`, **imported** | raw `.skill ?? 0` ≡ `P_ISRESTRICTED` |
| squeeze arm | C `:304–308`, **already live** | D-1239 |
| nopick `m<dir>` | C `:386–413`, **named omit** | |
| costly `autopick_testobj` | C `:937–944`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `sokoban_guilt` may `change_luck(-1)` when `Sokoban` (pre-existing).

## C ↔ JS fidelity

Pinned C (`hack.c:264–301`):

```
    if (throws_rocks(gy.youmonst.data)) {
        boolean canpickup = (!Sokoban
                        && (inv_cnt(FALSE) < invlet_basic
                               || !carrying(BOULDER))),
            willpickup = (canpickup
                          && (flags.pickup && !svc.context.nopick)
                          && autopick_testobj(otmp, TRUE));
        if (u.usteed && P_SKILL(P_RIDING) < P_BASIC) {
            You("aren't skilled enough to %s %s from %s.",
                willpickup ? "pick up" : "push aside",
                the(xname(otmp)), y_monnam(u.usteed));
        } else {
            pline("However, you %s%s.",
                  willpickup ? "easily pick it up" : "maneuver over it",
                  (canpickup && !willpickup) ? " and could pick it up" : "");
            sokoban_guilt();
        }
        return 0;
    }
```

JS: `throws_rocks` first (before squeeze). `INVLET_BASIC=52` matches `hack.h` `invlet_basic`. `inv_cnt(false)` skips `COIN_CLASS`; C skips `invlet != GOLD_SYM` — gold is the `$` coin stack in both encodings. `!carrying(BOULDER)` is the live invent walk. `willpickup` ANDs `flags.pickup`, `!context.nopick`, `autopick_testobj`. Unskilled-on-steed (`skill < P_BASIC`, missing slot `?? 0` = `P_ISRESTRICTED`) prints You and **skips** guilt; else However + `sokoban_guilt`. Always `return 0`. Squeeze unchanged. Match the claimed arm.

Three However strings: easily-pick; maneuver + “and could pick it up”; maneuver only. Match C’s comment (`:283–288`). Riding uses live `the(xname)` + `y_monnam(usteed)`, not a steed clone.

`autopick_testobj` is the same pickup_types/`oclass_to_sym` clone as `pickup.js` (JS `pickup_types` is symbols, not C `strchr(oclass char)`). Empty types ⇒ all. Costly shop reject / thrown/stolen/dropped / exceptions named — C `TRUE` would compute `costly_spot` once. A shop boulder can print “easily pick” in JS when C would not. Named with the pickup.js envelope, not a clone that returns false always. `calc_costly` ignored.

`Sokoban_here` gates `canpickup` like C `!Sokoban`. Guilt still runs on the non-riding arm even in Sokoban (that is how you break the rules). Match.

nopick `m<dir>` in `moverock_core` still not this function. C does not call `cannot_push` there; it has its own over/against plines. Leaving it named is correct, not a miss of this SHA’s locus.

`moverock_core` already `return cannot_push(...)`. Occupying the cell is the live return contract from D-1239 squeeze, now also for giants.

## Hallucinations / overclaim

Subject + D-1253 say a `throws_rocks` vain-push occupies with easily-pick / maneuver instead of abort `-1`. **The arm + live `sokoban_guilt` + `return 0` are the hunk.** Stamping **Addressed:** D-1253 is fair. This is **not** “Match C dispatch, callee is a stub”: `sokoban_guilt` is D-1239 `change_luck`; `carrying`/`the`/`y_monnam` are live. Do **not** stamp “Match C nopick `m<dir>` over/against” or “Match C `autopick_testobj` costly_spot.” Review **201** said giant abort was a named skip, not a clone that printed maneuver then returned `-1` — this SHA actually occupies.

## Density

One `if (throws_rocks)` arm plus the two tiny helpers C uses (`inv_cnt`, pickup_types filter). ~50 JS lines. Right size. Did not glue glob/doname.

## Branch-by-branch confirm

1. Giant, autopick on, free slot, not Sokoban: “easily pick it up”, guilt, `return 0`. Match.
2. Giant, can pickup, pickup off or types exclude boulder: “maneuver over it and could pick it up”, guilt, 0. Match.
3. Full a–Z and already carrying a boulder: “maneuver over it”, guilt, 0. Match.
4. Overflow `#` allowed when not carrying a boulder (`inv_cnt>=52 && !carrying`). Match.
5. Sokoban: `canpickup` false → maneuver, still guilt, 0. Match.
6. Unskilled riding: You aren’t skilled enough to pick up/push aside, **no** guilt, still 0. Match.
7. Basic+ riding: However + guilt. Match.
8. Human (not `throws_rocks`): squeeze D-1239 unchanged. Match.
9. `context.nopick` from a prefix other than the named m-dir site: `willpickup` false. Match this predicate; m-dir over/against named.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **29**/29 (C order; easily-pick; can-but-won’t; pickup_types; nopick predicate; overflow `#`; full+carrying boulder; Sokoban guilt; unskilled riding skip guilt; basic riding guilt; human squeeze; moverock occupy); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a `throws_rocks` hero vain-pushes a boulder. Cadence this audit: full `sessions` at HEAD `d384e339` **44**/44 Scr **11405**/11405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Arm through live `sokoban_guilt` / `carrying` / `the`/`y_monnam`. `autopick_testobj` costly is named clone debt (same as pickup.js), not a wrapper that still returns `-1`.

Named omits (map, not Must-fix):

1. nopick `m<dir>` over/against in `moverock_core` (`hack.c:386–413`)
2. `autopick_testobj` costly_spot / thrown / stolen / dropped / exceptions
3. Blind `feel_location` lives on `cannot_push_msg`, not this arm

Do not Must-fix “JS skips coins by `COIN_CLASS` not `GOLD_SYM`.” Do not Must-fix “unskilled riding skips guilt.”

## Callers / RNG ledger

C: `moverock_core` vain-push / monster-behind / closed-door. JS those `return cannot_push`. No RNG in the giant arm. Public fortress is not evidence a giant occupied a boulder cell.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a `throws_rocks` vain-push now occupies with C’s easily-pick / maneuver / riding-skip-guilt; nopick `m<dir>` stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1253 `d384e339`.
