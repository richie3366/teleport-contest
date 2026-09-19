# Review 1542 — 5a8a1f73 — polyself.c made_change light bookkeeping (D-2583)

## Metadata

- SHA: `5a8a1f73`
- D-id: D-2583. Next index: 1542.
- Files: `js/polyself.js` (+26/−6). No script/test files.
- C locus:
  - `nethack-c/upstream/src/polyself.c:497` (old_light capture).
  - `nethack-c/upstream/src/polyself.c:581` (wizard-rehumanize zeroing).
  - `nethack-c/upstream/src/polyself.c:720–730` (made_change tail).
  - `nethack-c/upstream/src/polyself.c:1393–1394` (rehumanize del).
  - Bodies via `node scripts/csym.mjs polyself` (range `:468–731`)
    plus direct reads of `:560–600`, `:715–731`, and the grep of all
    `old_light`/`del_light_source` lines in the file.
- Closes Must-fix: review 1533 item 1 (D-2574 Rogue-92026 rehumanize
  not-found pline).

## Intent vs deliverable

Subject promises:

> `polyself.c` polyself made_change light bookkeeping (rehumanize
> del_light_source not-found regression) (D-2583).

Diff delivers exactly that: `new_light_source` import join, `old_light`
capture at entry, `old_light = 0` after the wizard-rehumanize arm, and
the `:720–730` tail (del stale entry, 1→2 bump, attach new). The old
"named omission" comment is retired. Promise matches deliverable; no
second subsystem, no scope creep.

## Inventory

- Changed: `polyself(psflags)` — `js/polyself.js:1783`, export retained.
- No new functions, no deleted symbols, no STUB in any arm.
- Import join: `new_light_source` into the existing light.js import.
  Required `--can` output:
  - `imports.mjs --can polyself.js light.js new_light_source` →
    `ALREADY: polyself.js already statically imports light.js.`
  - No new module edge.
- Required `sym.mjs` output (nothing deleted or re-pointed):
  - `new_light_source js/light.js:78 sync`
  - `emits_light js/light.js:39 sync`
  - `monst_to_any js/hack.js:185 sync`
  - `LS_MONSTER js/const.js:2236 sync export const`
  - All four LIVE single definitions; no clones.
- Callees: `emits_light`, `del_light_source`, `new_light_source`,
  `monst_to_any` — all LIVE.
- No RNG in the C arms and none added (emits_light is pure).

## C ↔ JS fidelity

Walked C `:720–730` against `js/polyself.js:2085–2095` line by line:

- `:721` `new_light = emits_light(gy.youmonst.data)` → `const
  new_light_raw = emits_light(game.youmonst?.data) | 0`. Match.
- `:722` `if (old_light != new_light)` → same guard. Match.
- `:723–724` gated del → `if (old_light)
  del_light_source(LS_MONSTER, monst_to_any(game.youmonst))`. Match,
  including C's use of the post-change youmonst handle.
- `:725–726` 1→2 bump (`otherwise undetectable`) → identical
  `if (new_light === 1) ++new_light` with the C comment. Match.
- `:727–729` gated attach at `(u.ux, u.uy)` → `new_light_source(u.ux |
  0, u.uy | 0, ...)`. Match (`| 0` is the file's int convention).
- `:497` capture after the Unchanging/system-shock gates → JS captures
  at `:1819`, after both early `return`s (`:1795`, `:1816`). Match —
  verified the returns precede the capture in both.
- `:581` `old_light = 0` after `rehumanize()` → JS `await
  rehumanize(); old_light = 0;`. Match, same order.
- `:1393–1394` rehumanize del — untouched at `js/polyself.js:1049–1050`,
  still `if (emits_light(...)) del_light_source(...)`. The fix gives
  that scan the entry it was missing.

Early-return audit (JS paths that skip the tail): the Unchanging,
system-shock, and forcecontrol-cancel returns all precede any form
change and match C `return`s. The one remaining mid-body `return`
(the controllable_poly `y_n` decline at `:2042`) fires with
youmonst.data unchanged since entry, so old==new and the tail would
be a no-op — benign either way.

## Hallucinations / overclaim

None. The D-log's "paint-inert but identity-present" claim for the new
entry is honest about the D-2157 `do_light_sources` youmonst gap, which
stays a named omit instead of being claimed live. The four remaining
nameds (D-2157 arm, FIXUP producers, replmon swap, `retouch_equipment(2)`)
are pre-existing with map pointers.

## Density

26 insertions for a Must-fix regression repair — small is correct here
(the §2b ~40 floor is for non-Must-fix ports). One function, one file.

## Verification

- D-log claims `verify.mjs --fn rehumanize` → VERIFY: PASS.
- Re-ran here (required):
  - `hidden-proxy verify rehumanize --base 5a8a1f73~1 --reach-all`
  - → `1 session(s) blocked on it (1 at baseline, 0 in the working
    scoreboard)` / `scen-poly-Rogue-92026: PASS` /
    `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  - → `smoke rehumanize: no RNG-tagged reach; fixed smoke spread
    (24 run): 24 PASS, 0 regressed → REACH-OK`.
- Claim confirmed and stronger than stated: the baseline-blocked
  session (the exact Must-fix regression) now passes; not a vacuous
  no-blocked note.
- `imports.mjs --rulecheck`: clean (run this iteration).
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
