# Review 2854 — e3b40271d — throwit catch arm uses merging addinv_before

## Metadata

- SHA: `e3b40271d815d6768a34fe494c3a58e8756ed0f8` (D-4010)
- Cliff writer: `do_attack` head @2d758af63 (3 blocks), writer
  throwit `:1719` catch arm
- js/ diff: `js/dothrow.js` +12/-1 (call-site swap + doc +
  test export); new `scripts/throwit-returning-merge.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: C `:1719` runs plain merging `addinv_before`, so a
caught boomerang rejoins its quiver stack; JS wrongly routed it
through the nomerge throw helper (correct only for
`return_throw_to_inv`). Wizard FULL PASS.

Diff actually: the one call-site swap + cites + the
`throwit_returning_missile` test export. Promise == diff.

## Inventory

- `throwit_returning_missile` (`js/dothrow.js:1945`, C
  `nethack-c/upstream/src/dothrow.c:1509-1849` via `csym.mjs`,
  arm `:1710-1728`): `:1719` site swapped to merging form.
- `addinv_before_throw` (`js/dothrow.js:1820`): doc narrowed to
  return_throw_to_inv-only; sole caller now `:1866`.

## C ↔ JS fidelity

- C `:1718-1719`: `pline(...); obj = addinv_before(obj,
  oldslot);` — no nomerge. The nomerge form exists only in
  `return_throw_to_inv` (`:1885-1887`: `nomerge = 1;
  addinv_before; nomerge = 0`). JS now mirrors both sites.
- Merge mechanics (`invent.c:1087-1114` read): `other_obj`
  non-NULL tries positional reinsert; NULL (split path) falls to
  quiver-preferred `merged()` then general merge — the
  subject's reading is exact. JS `addinv_before`
  (`js/u_init.js:1174`) is plain `addinv_core0(obj, other_obj,
  true)` with no nomerge set; the helper sets `nomerge = 1`.
  Dynamic `./u_init.js` import is the module's existing edge
  (`:680` pre-exists) — no new import.
- Supporting cites hold: `AutoReturn` `:30-34` is TRUE for every
  `BOOMERANG`; the `:1569` uswallow arm proceeds down the
  bhit/return path, so the catch arm fires for a swallowed
  hero. Surrounding order (pline → addinv → encumber_msg →
  QUIVER unquiver → setuwep) matches C `:1718-1725`.

`sym.mjs throwit_returning_missile` → single def
`js/dothrow.js:1945 ASYNC`; no clone. C callers
(artifact.c:2029, dothrow.c:270, polyself.c:1475) match the D-log.

## Hallucinations / overclaim

None. The 2 unchanged sessions are named as a different writer
(Punished gate), not claimed.

## Density

Cliff commit: owner was the generated head (verified
`2d758af63:LOOP-QUEUE.md` row 1 = do_attack, Wizard first); one
`Ledger:` entry (throwit stays ported, D-4010 appended). No
FORCE/DIAG/seed reads in the diff; Rule #2 clean (see 2853).

## Verification

Re-measured on HEAD code, `--base e3b40271d~1 --no-reach`:

- `verify do_attack: 1 PASS, 0 moved past, 2 unchanged, 0 worse`
  — Wizard PASS, Monk/Ranger unchanged as named. Claim holds.
- `verify throwit`: vacuous (no session blocked on throwit; the
  owner is do_attack) — expected, and the D-log's movement leg
  is do_attack, not throwit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
