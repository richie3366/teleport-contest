# Review 2819 — 846861e41 — portal scan reads the live trap store

- **SHA:** `846861e41` (Thu 2026-10-15) — cliffs-head writer (D-3973).
- **D-entry:** D-3973. **Ledger:** `dog.c` (`mon_arrive`, split, re-stamped).
- **Diff size:** `js/dog.js` −2/+16 (one helper + export); +1 test.
- **Method:** cliff (one writer arm) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `somex` cliff row (2 blocks — C `rn2`
at `mkroom.c:668` vs JS `rnd(79)` at `rloc`, same shape on
Wizard-50250001 s308 and Monk-50055045 s1479, toplines identical)
is a portal-arrival miss: JS still held 3 `MIGR_PORTAL` migrants
after getlev catchup while `level.traps` held the quest portal,
because `arrive_find_magic_portal` scanned only the stale
`game.ftrap` — so C jittered via `somexy` while JS fell through
to `impossible` + `MIGR_RANDOM` + `rloc`. The fix scans live
`game.level.traps` first (C newest-first order), keeping the
`game.ftrap` shapes as fallback. 2 somex + 1 mon_arrive PASS
(Tourist-49956005 spillover, whose final topline was the
`mon_arrive: no corresponding portal?` impossible).

The diff is exactly that scan plus the additive export for the
test. Promise and diff agree.

## Inventory

- `js/dog.js` `arrive_find_magic_portal` (:831): new live-array
  scan first (`t.ttyp === MAGIC_PORTAL`, first hit wins), then
  the unchanged `game.ftrap` fallback (array loop, else `ntrap`
  chain walk). Local → exported (additive, no signature change).
- `scripts/mon-arrive-portal-find.test.mjs` (new): 3/6 pre-fix
  (all 3 live-store cases null — the bug) → 6/6 post-fix.

No function added/deleted/renamed/re-pointed; no clone created
or removed. The step-3 sym-run requirement is vacuous (the one
touched symbol only gained an `export` keyword). No new import
(`game`, `MAGIC_PORTAL` already in scope). Diff grep: the single
`DIAG` hit is the commit message noting the reverted probe —
the code hunk itself is clean.

## C ↔ JS fidelity

C `mon_arrive` (`nethack-c/upstream/src/dog.c:419-623` per
`csym.mjs fn mon_arrive`), MIGR_PORTAL arm (`:553–557`):

```c
for (t = gf.ftrap; t; t = t->ntrap)   /* :553 */
    if (t->ttyp == MAGIC_PORTAL)      /* :554–555 */
        break;
if (t) { xlocale = t->tx, ylocale = t->ty; break; }
```

Cite exact. Order check: C `maketrap` head-inserts
(`trap.c:578-579`: `ttmp->ntrap = gf.ftrap; gf.ftrap = ttmp`),
so C's first-hit-wins scan is newest-first. JS `maketrap`
unshifts the live array (`js/trap.js:1138`) and never sets
`game.ftrap` — so the live array is the order-faithful image of
C's chain, and scanning it first with first-hit-wins reproduces
C's pick. The D-log's `unshift ⟺ head-insert` claim is verified
at both ends, not trusted.

Fallback soundness: C has one chain; JS has two stores because
of the split port. Keeping `game.ftrap` (array or `ntrap` chain)
as fallback preserves the old behavior exactly where the live
store lacks the portal (legacy/restore shapes), and the live
store wins everywhere else — matching the sibling scans the
D-log cites (`goto_level` hero placement `do.js:2145`,
`quest.js:294`, `end.js:659`, `dog_goal` D-3411 union). No
double-placement risk: the helper returns the first hit and the
caller consumes one portal.

The predicate `(t.ttyp | 0) === MAGIC_PORTAL` matches C's
`== MAGIC_PORTAL` under the repo's int-coercion idiom. No RNG in
the helper; the healed draws (`somex` vs `rloc`) are downstream
of the found/not-found branch, consistent with the story.

Named omissions (pre-existing, untouched, correctly out of
scope): (1) `mnearto` yank via `mnearto_no_yank` (D-1538 shape);
(2) `place_branch` debug_fuzzer `ucamefrom` arm
(`js/mklev.js:34060`). Both are data/path deferrals elsewhere,
not arms of this scan.

## Hallucinations / overclaim

None. The owner-vs-writer call is exemplary: `somex` is
explicitly proven already-whole (1-line `rn1`, JS-identical at
`js/mklev.js:33668`, ledger ported) and NOT re-ported; the
divergence (`somex` vs `rloc` with `mon_catchup_elapsed_time`
as prevEntry both sides) names the arrival scan as the writer.
The in-process prefix probe (3 held migrants, portal at
`(52,5)`, null scan) is stated /tmp + reverted, and the tree
shows no residue. No "Match C" is claimed for any dispatch.

## Density

Cliff phase: the owner is the `somex` cliff head at the parent
SHA and the port is its writer — one cause healing two rows
(`somex` ×2 plus the `mon_arrive` Tourist spillover shipped
together per §10.20). One cliff, one helper, code + ledger +
verify in one handoff. The ledger `split` row for `mon_arrive`
is re-stamped, not newly claimed whole. No bundled file, no
sweep, no self-filed row.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify somex,mon_arrive
--base 846861e41~1 --reach-all`):

- `verify somex: 2 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` — Monk-50055045 and Wizard-50250001 PASS full
  sessions exactly as claimed.
- `reach somex: 3569 baseline-PASS session(s) reach it (3569
  run): 3569 PASS, 0 regressed → REACH-OK`.
- `verify mon_arrive: 1 PASS, 0 moved past, 0 unchanged, 0
  worse → PROGRESS` — Tourist-49956005 PASS exactly as
  claimed (spillover).
- `reach mon_arrive: 1579 baseline-PASS session(s) reach it
  (1579 run): 1579 PASS, 0 regressed → REACH-OK`.
- D-log gates: syntax, rule2, green 2/2, strict ×2, cohort
  7/7. The audit's end-of-iteration rescore re-covers the
  fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping. The
focused test pins the behavioral property (live-store portal
found) pre/post fix.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
