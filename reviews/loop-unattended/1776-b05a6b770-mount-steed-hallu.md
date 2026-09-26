# Review 1776 — b05a6b770 — mount_steed Hallucination (D-2817)

- SHA: `b05a6b770` (Must-fix from review 1772; re-point the ride gate)
- Files: `js/steed.js` import only; call sites `mount_steed` `:652`, `dismount_steed` `:957`
- Queue row: review 1772 item 1, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can steed.js display.js Hallucination`: `ALREADY` (call-time only).

## Intent vs deliverable

Subject promises `Hallucination` imported from `display.js` at both steed sites, and `do_name.js` left alone. The diff drops `Hallucination` from the `do_name.js` import and adds it to the existing `display.js` import. `mount_steed` still returns false on `Hallucination() && !force`. `dismount_steed` still prints the rain line under the nameless `DISMOUNT_BYCHOICE` arm. No other function body moved.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Hallucination` | imported `display.js:1091` (was `do_name.js:255`) | `youprop.h:120` |
| `mount_steed` | existing body; gate only | `steed.c:212–215` |
| `dismount_steed` | existing body; rain line only | `steed.c:647` |

`csym --callers mount_steed`: `steed.c:187` `doride`, plus `extern.h:3146`. `dismount_steed` has 29 C references; this SHA does not add a call.

`sym.mjs` (the re-pointed name):

```
Hallucination    js/display.js:1091   sync
                 js/do_name.js:255   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/artifact.js:1768  js/dig.js:1539  js/do.js:436  js/mcastu.js:99  js/mon.js:1349  js/music.js:117  …and 2 more
```

`steed.js` now imports the `display.js` export. The `do_name.js` export and the eight clones stay where they were.

## C ↔ JS fidelity

`youprop.h:116–120`:

- `HHallucination` is `u.uprops[HALLUC].intrinsic`
- `HHalluc_resistance` is `u.uprops[HALLUC_RES].intrinsic`
- `EHalluc_resistance` is `u.uprops[HALLUC_RES].extrinsic`
- `Halluc_resistance` is `HHalluc_resistance || EHalluc_resistance`
- `Hallucination` is `HHallucination && !Halluc_resistance`

`display.js:1091` takes `(u.HHallucination | 0) || uprops[HALLUC].intrinsic`, returns false when that is 0, then returns false when any of `u.Halluc_resistance`, `u.HHalluc_resistance`, `u.EHalluc_resistance`, or `uprops[HALLUC_RES]` intrinsic/extrinsic is set. It does not return on sticky `u.Hallucination`. The flats are the port's mirrors of those two uprops slots; a timeout that lives only on `uprops[HALLUC].intrinsic` now blocks the mount, and resistance on either `HALLUC_RES` slot clears it. That is the macro review 1772 asked for.

`mount_steed` (`steed.c:212–215`): `Hallucination && !force` → the driver pline and `FALSE`. JS `:652–655` is that order, after the already-riding return (`steed.c:206–208`) and before the wounded-leg block. `force` still skips the pline. No RNG on this arm.

`dismount_steed` (`steed.c:647`, inside the nameless half of `DISMOUNT_BYCHOICE`): after the "no name" pline, `if (Hallucination) pline("It felt good to get out of the rain.")`. JS `:952–959` is that `if`, still under `!has_mgivenname`, still not on the named `You dismount` else. No RNG.

## Hallucinations / overclaim

The subject says both steed sites call the `display.js` export. They do. It does not say the `do_name.js` export or the eight clones were rewritten. The D-log's named leftovers (null `t_at` text, `which_armor_saddle`, `landing_spot`'s `game.ftrap` walk, flat `BStealth`) are the D-2813 notes, not claims this SHA closed them.

## Density

One re-point of a callee the previous review named. The rest of `mount_steed` / `dismount_steed` is unchanged from `686ccd9e7`.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify mount_steed --base b05a6b770~1 --reach-all`.

```
verify mount_steed: baseline b05a6b770~1 (scoreboard at 5dd7c4a90) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mount_steed: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2817's green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None. The review 1772 gate is the `display.js` export.

Verdict: **ACCEPT**
