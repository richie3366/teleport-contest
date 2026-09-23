# Review 1710 — c5539a510 — nothing_to_steal calls live Blind (D-2751)

Metadata: commit `c5539a510`, D-2751, closes review 1707 Must-fix (Blind predicate). `js/steal.js` only. The row cited 0 corpus blocks. No prior review of this SHA.

## Intent vs deliverable

Subject promises `nothing_to_steal`'s `else if (Blind)` uses `youprop.h` `Blind`, and that `Blind_steal` is deleted. The diff does that: the import list gains `Blind` from `invent.js`, the arm calls `Blind()`, the file-local function is gone. No other arm changes.

## Inventory

Changed JS: the `Blind()` call inside `nothing_to_steal` (`js/steal.js:382`). Deleted `Blind_steal`. No new helper.

```text
Blind            js/invent.js:359   sync
             !! ALSO 31 LOCAL CLONE(S) in 31 files — IMPORT the export; do NOT add another
               js/apply.js:1033  js/artifact.js:1636  js/detect.js:126  js/dig.js:198  js/do.js:420  js/do_wear.js:1636  …and 25 more
Blind_steal      NOT FOUND in js/** (no export, no local function/const).
```

`node scripts/imports.mjs --can steal.js invent.js Blind` is **ALREADY** (the file already imported `invent.js`). `Blind` is sync. The arm calls it bare, which is correct. Classification: **C callee**, the exported function, not a clone and not a no-op.

## C ↔ JS fidelity

C `steal` is `steal.c:342–614` (`csym`). The empty-invent label is `nothing_to_steal` at `:376`. Arm order there:

- `:379` `Punished && !monkey_business && rn2(4)` → `worn_item_removal(mtmp, uchain)`. JS `:373` `u.uball && !monkey_business && rn2(4)` → `worn_item_removal`. `Punished` is `youprop.h:77` `uball`. Unchanged by this commit.
- `:383–390` buried ball `u.utrap && utraptype == TT_BURIEDBALL && !monkey_business && !rn2(4)` → pline + `openholdingtrap`. JS `:376–381` is that arm. C's `dummy` out-param stays discarded (D-2748).
- `:391` `else if (Blind)` → `pline("Somebody tries to rob you, but finds nothing to steal.")`. `Blind` is `youprop.h:103` `(HBlinded || EBlinded) && !BBlinded`, with `HBlinded` / `EBlinded` / `BBlinded` the intrinsic, extrinsic, and blocked slots of `u.uprops[BLINDED]` (`youprop.h:87–90`). JS `:382` calls `Blind()` (`invent.js:359–362`): `uroleplay.blind` short-circuit, else `((HBlinded || EBlinded) && !BBlinded)` on the `u.*` copies of those slots. The pline text matches.
- `:393` gold-only `inv_cnt(TRUE) > inv_cnt(FALSE)`, else the generic pline, then `return 1`. JS `:386–391` is that order. No RNG on the Blind arm. The two `rn2` calls above it are unchanged.

Both entries of the closure call it: empty invent `:397` and the retry `!tmp` at `:440`. C's `goto nothing_to_steal` is those two sites. The real caller is still `uhitm.c:4673` → `js/mhitu.js:2208`. `do_wear.c:1600` / `:1686` and `trap.c:6827` are comments. No new caller.

`uroleplay.blind` is wider than the macro. The D-log names it as the live helper's width, the same function every other caller of this export gets. Review 1707 asked for this call. Not a second clone.

## Hallucinations / overclaim

The subject, the D-log, CURRENT, and the JS comment all say the test is `steal.c:384`. Line 384 is the buried-ball continuation `&& !monkey_business && !rn2(4)`. `else if (Blind)` is `steal.c:391`. The arm wired is still that `else if`. Not a stub sold as the macro. No FORCE, DIAG, `getRngLog`, seed, coordinate, or `fastforward` in the hunk. Rule #2 clean (`imports.mjs --rulecheck` on scored `js/`).

## Density

One predicate inside the function review 1707 already walked. Right size for this Must-fix. The other 31 `Blind` clones are outside this diff.

## Verification

Re-measured (`--base c5539a510~1 --reach-all`). Parent scoreboard blob is stamped `fca6b4457`. Row cited 0 blocks.

```text
verify steal: baseline c5539a510~1 (scoreboard at fca6b4457, 2026-09-23T09:31:06.591Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify steal: no corpus session is blocked on it at c5539a510~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
reach steal: 24 baseline-PASS session(s) reach it (24 run, 9.1s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The reach line is the full tagged set (24, not a smoke sample). The 0-block note matches the row. It does not hit the Blind arm; the D-log says no fortress session does. Green/strict/cohort are the D-log's `verify.mjs` bullet.

## Actionable C-wrongs

None. The `:384` cite is a comment error; the predicate at `:391` is the live `Blind()`.

Verdict: **ACCEPT**
