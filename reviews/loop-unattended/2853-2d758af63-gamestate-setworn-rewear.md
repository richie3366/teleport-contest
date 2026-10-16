# Review 2853 — 2d758af63 — gamestate restore re-wears via setworn, dispatcher gains the impossible arm

## Metadata

- SHA: `2d758af632484b77d3d5d08cc01f876ecc87ad06` (D-4009)
- Cliff writer: `do_attack` head @d9747bd2c (5 blocks), writer
  `nhl_gamestate` restore
- js/ diff: `js/do.js` +19/-19 (helper delete, re-wear call,
  dispatcher); new `scripts/gamestate-rewear-unweapon.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: restore re-wears via the live `setworn` (C preserves
`gu.unweapon` across it, so a pole-wield TRUE still arms the next
melee's "begin bashing"); `setworn_restore` deleted; dispatcher is
C's if/else-if/else with the awaited impossible. 2 FULL PASS.

Diff actually: the delete, the re-wear call + cite, the dispatcher,
two dead-guard removals. Promise == diff.

## Inventory

- `tutorial_leave_gamestate` (`js/do.js:1155`, C
  `nethack-c/upstream/src/nhlua.c:1736-1771` via `csym.mjs`):
  re-wear via `setworn`, guard removed.
- `tutorial_enter_gamestate` (`js/do.js:1117`, C `:1772-1795`):
  guard removed only.
- `nhl_gamestate` (`js/do.js:1198`, C `:1721-1802`): dispatcher
  with the impossible arm.
- deleted: `setworn_restore` (local clone of worn.c setworn).

## C ↔ JS fidelity

- C restore `:1744-1753`: stash wornmask, `owornmask = 0`,
  `extract_nobj`, `addinv_nomerge`, `if (wornmask) setworn(otmp,
  wornmask)`. JS now does exactly this; the old path routed W_WEP
  through `setuwep`, which C `wield.c:128-134` shows recomputing
  `gu.unweapon` (FALSE for an ordinary weapon) plus Ogresmasher
  botl and Sunsword shine C never runs here. C `worn.c:72-145`
  never touches `gu.unweapon` and its slot loop covers W_WEP —
  the subject's core claim checks out line for line.
- JS `setworn` (`js/do_wear.js:668`) is the full worn.c port
  (slot walk, extrinsic confer, artifact arms); already imported
  in do.js (`:147`), as is `impossible` (`:69`) — no new edge.
- Dispatcher: C `if (reststate && stored)` / `else if (!reststate
  && !stored)` / `else impossible("...inconsistent state (%s vs
  %s)", restore/save, already/not stored)` — JS matches branch
  order and message text exactly. Both helpers are file-local
  with the dispatcher as sole caller, so the guard removal is
  safe. C's unconditional `update_inventory()` tail stays the
  standing D-3763 omit.

`sym.mjs` on the deleted symbol:

```text
setworn_restore  NOT FOUND in js/** (no export, no local function/const).
```

## Hallucinations / overclaim

None. The D-log reports the nhl_gamestate NO MOVEMENT leg
(leash arm, other cause) honestly instead of hiding it.

## Density

Cliff commit: owner was the generated head (verified
`b49276bf8:LOOP-QUEUE.md` cliffs row 1 = do_attack, 5 blocks);
writer ported whole with callers listed; one `Ledger:` entry.
`imports.mjs --rulecheck`: Rule #2 clean across scored `js/`.
Diff has no FORCE/DIAG/seed/coordinate reads.

## Verification

Re-measured on HEAD code, `--base 2d758af63~1 --no-reach`:

- `verify do_attack: 3 PASS, 0 moved past, 2 unchanged, 0 worse`
  — both D-4009 probes PASS (Wizard PASS is D-4010's); Monk +
  Ranger unchanged are the Punished writers named in Next.
- `verify nhl_gamestate: 0 PASS, 0 moved past, 1 unchanged, 0
  worse` — the named leash omit, still open, no regression.

Nit (no queue): the ledger `omit` now lists "(3) throwit merge +
safemon-foo writers" — other functions' rows, not this body's
omissions, and stale since D-4010. Ledger-text hygiene, not a
C-wrong; fix with one `ledger.mjs set` inside a real iteration.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
