# Review 1910 — 49ff0d6f5 — hliquid (D-2951)

- SHA: `49ff0d6f5` (Must-fix from review 1902; `do_name.c` `hliquid`)
- Files: `js/do_name.js` aliases `display.js` `Hallucination` and calls it from `hliquid`. The same-file sticky export stays.
- Queue row: review 1902 item 1. The coverage row it closed cited 0 corpus blocks.
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The call was re-pointed from the local export to the import. `sym.mjs`:

```
Hallucination    js/display.js:1095   sync
                 js/do_name.js:265   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/artifact.js:1768  js/dig.js:1539  js/do.js:450  js/mcastu.js:102  js/mon.js:1373  js/music.js:117  …and 2 more
hliquid          js/do_name.js:391   sync
```

`imports.mjs --can js/do_name.js js/display.js Hallucination` → `ALREADY`.

## Intent vs deliverable

Subject promises one exported `hliquid` that keeps the D-2943 roll order and gates on `display.js` `Hallucination` (`youprop.h:116–120`), not the sticky same-file reader. The diff is that import alias and the one call. The roll, `IndexOk`, and `rn2_on_display_rng` are untouched.

## Inventory

| JS | Class | C |
|----|-------|---|
| `hliquid` | live sync `do_name.js:391` | `do_name.c:1492–1510` |
| `youprop_Hallucination` | live `display.js:1095` | `youprop.h:116–120` |
| `Hallucination` | same-file sticky `:265`, not called here | not the macro |
| `HLIQUIDS` / `rn2_on_display_rng` | unchanged from D-2943 | `do_name.c` table / `rnd.c` |

## C ↔ JS fidelity

`do_name.c:1496–1509`. `hallucinate` is `Hallucination && !program_state.gameover`. The roll runs when that is true or `liquidpref` is null or the first byte is 0. `count` starts at `SIZE(hliquids)` and increments only when the pointer is non-null and the first byte is non-zero. `indx = rn2_on_display_rng(count)`. `IndexOk` failure falls through to `return liquidpref`.

`youprop.h:115–120`: `HHallucination` is `u.uprops[HALLUC].intrinsic`; `Halluc_resistance` is `HHalluc_resistance || EHalluc_resistance` on `uprops[HALLUC_RES]`; `Hallucination` is `HHallucination && !Halluc_resistance`. `display.js:1095–1106` returns false when both the `HHallucination` flat and `uprops[HALLUC].intrinsic` are 0, then returns false when any of the three flats or either `uprops[HALLUC_RES]` word is set. Sticky `u.Hallucination` alone is false. That is the reader review 1902 required. The extra flats are the D-1493 mirrors, named in this commit, not a second roll.

JS `:392–407` is the C order. `liquidpref == null` is the null pointer; `=== ''` is the empty first byte; a non-empty pref does `count += 1`; `indx < HLIQUIDS.length` is `IndexOk`. One display-stream `rn2`. A missing `program_state` is not gameover (named). `hliquid` does not call `do_name.js:265`.

Callers were already on this export (D-2943). This SHA does not add a call C does not make.

## Hallucinations / overclaim

The subject says the gate calls `display.js` `Hallucination` and that no arm of `hliquid` is omitted. The roll arms are the ones review 1902 already matched, and the gate no longer returns true on sticky `u.Hallucination` before resistance. The subject also says the same-file reader, eight clones, and the D-1493 flat OR remain. Those sentences match `sym.mjs` and `display.js:1097–1105`. It does not claim the other files stopped using the sticky export.

## Density

Must-fix, one predicate. The 19-line body was already present. Not an arm peel and not a second function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify hliquid --base 49ff0d6f5~1 --reach-all`.

```
verify hliquid: baseline 49ff0d6f5~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify hliquid: no corpus session is blocked on it at 49ff0d6f5~1 — a vacuous verify is NOT a corpus PASS. …
smoke hliquid: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The closed row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because `do_name.js` is not on the shared-file list.

## Actionable C-wrongs

None. The flat OR inside `display.js` `Hallucination` is the reader this Must-fix was told to call, and the commit names it.

Verdict: **ACCEPT**
