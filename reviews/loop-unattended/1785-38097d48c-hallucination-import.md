# Review 1785 — 38097d48c — Hallucination import (D-2826)

- SHA: `38097d48c` (Must-fix from review 1784; `hack.c` `domove_fight_empty` / `domove_bump_mon`)
- Files: `js/cmd.js` import and two call comments. No new function.
- Queue row: Must-fix review 1784, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the `js/cmd.js` `Hallucination` import moves from `js/do_name.js` to `js/display.js`, so the statue test and the peaceful bump use `youprop.h:120`. The diff does that and nothing else in scored code. `m_monnam` / `mon_nam` stay on `do_name.js`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Hallucination` (import) | LIVE `display.js:1091` | `youprop.h:116–120` |
| statue test | `cmd.js:2399–2401` | `hack.c:2263–2264` |
| peaceful bump | `cmd.js:4460` | `hack.c:1940` |
| `Hallucination` left behind | clone `do_name.js:255` | same macro; not this import |

`sym.mjs` (symbol the diff re-points):

```
Hallucination    js/display.js:1091   sync
                 js/do_name.js:255   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/artifact.js:1768  js/dig.js:1539  js/do.js:436  js/mcastu.js:107  js/mon.js:1371  js/music.js:117  …and 2 more
```

`imports.mjs --can cmd.js display.js Hallucination`: `ALREADY`. The call is inside `domove_fight_empty` / `domove_bump_mon`, not a top-level read.

## C ↔ JS fidelity

`youprop.h:116–120`: `HHallucination` is `u.uprops[HALLUC].intrinsic`; `Halluc_resistance` is `uprops[HALLUC_RES]` intrinsic or extrinsic; `Hallucination` is `HHallucination && !Halluc_resistance`. `display.js:1091–1102` reads `u.HHallucination` or `uprops[HALLUC].intrinsic`, returns false when that is zero, then returns false when any of `u.Halluc_resistance`, the H/E mirrors, or `uprops[HALLUC_RES]` intrinsic/extrinsic is set. It does not return on sticky `u.Hallucination`. The extra mirror fields are the existing export this Must-fix named; this SHA does not rewrite the body.

`hack.c:2263–2264` (`csym` `domove_fight_empty` `hack.c:2228–2338`): after `sobj_at(BOULDER)`, `glyph_is_statue(glyph) || (Hallucination && glyph_is_monster(glyph))` replaces the object with `sobj_at(STATUE)`. `cmd.js:2396–2401` is that order, and `Hallucination()` is now the display export. Short-circuit still skips the call when the glyph is already a statue.

`hack.c:1924–1947` `domove_bump_mon`: when `nopick && !travel` and the monster is spotted or the glyph is invisible or a warning, a mimic stumbles; else `mpeaceful && !Hallucination` says "Pardon me" via `m_monnam`; else `You("move right into %s.", mon_nam)`. `cmd.js:4451–4465` is that order. The same import now feeds `!Hallucination()` at `:4460`. C `You` vs JS `pline("You move right into …")` is the pre-existing text, unchanged by this hunk.

`do_name.js:255–263` still returns true on sticky `u.Hallucination` before resistance and never reads `uprops[HALLUC]`. `cmd.js` no longer imports it. `csym --callers`: declaration `hack.c:34`, `move_out_of_bounds` `hack.c:2590`, `domove` `hack.c:2810`. This SHA does not move those calls.

## Hallucinations / overclaim

The subject and D-2826 say the statue arm and the bump arm now use the `youprop.h` export. Both call sites in `cmd.js` do. The named leftover (`do_name.js:255`, plus `hack.js` / `zap.js` importers and local clones) is accurate as "unchanged"; `sym.mjs` lists eight clone files, and the D-log names only `do.js` and `mon.js` among them. That under-count is a map gap, not a claim that those clones were fixed.

## Density

Must-fix, one re-point. Below the 200-line band because the C function was already the previous iteration; this SHA only changes which export the two predicates call. No stub in the live arms.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify domove_fight_empty --base 38097d48c~1 --reach-all`.

```
verify domove_fight_empty: baseline 38097d48c~1 (scoreboard at b60cf8e62) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke domove_fight_empty: no RNG-tagged reach; fixed smoke spread (12 run, 4.1s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2826's green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None in the re-pointed call sites. The `do_name.js:255` export and the eight local clones remain the named omit.

Verdict: **ACCEPT**
