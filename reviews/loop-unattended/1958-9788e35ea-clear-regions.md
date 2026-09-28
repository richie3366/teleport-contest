# Review 1958 — 9788e35ea — clear_regions + free_region (D-2998)

Metadata: SHA `9788e35ea`, D-2998, `region.c` clear_regions restart
+ free_region port + do.js stash snapshot. Stat: `js/region.js`
(+32/−6), `js/do.js` (+5/−2), `js/lev_json.js` (+1/−1),
`scripts/clear-regions.test.mjs` (new, 3 tests). No prior review
file for this SHA on disk.

## Intent vs deliverable

Subject promises: "`region.c` clear_regions + free_region
whole-body port (C-order free loop + stash snapshot for the
release_data arm) (D-2998)." The body adds the decisive C fact:
save_regions Sfo-COPIES every record before the release_data
clear, so the do.js stash alias had to become a snapshot before
any faithful field teardown.

Diff actually adds: exported `free_region` (`js/region.js:652`),
`clear_regions` restarted as the C loop + rebind, `remove_region`
tail call, `jsonClone` export + the `:1734` stash snapshot, doc
updates retiring the teardown omit, and 3 tests. Promise and diff
match; no other `js/` change.

## Inventory

- `free_region` (NEW, exported, sync, `js/region.js:652`): whole
  C body, null-release rendering.
- `clear_regions` (RESTART, `js/region.js:714`): bare rebind →
  C free-loop + rebind.
- `remove_region` (CHANGED tail): `free_region(reg)` after the
  redraw passes (C `:385`).
- `jsonClone` (CHANGED linkage only, `js/lev_json.js:212`):
  file-local → exported; body untouched.
- `goto_level` stash (CHANGED, `js/do.js:1734`): alias →
  `jsonClone` snapshot.

## C ↔ JS fidelity

`free_region`, `csym` range `region.c:262–276`: NULL guard `:265`
→ `if (!reg) return`; rects `:266–267`, monsters `:268–269`,
enter_msg `:270–271`, leave_msg `:272–273` → guarded null
releases in the same order; free(reg) `:274` → no-op by
construction. The "callers drop it" claim verifies: remove_region
splices at `:672` before the newsym passes and calls free at the
tail with nothing after; clear_regions rebinds after the loop.
Post-free-read audit confirms the D-log: the `:836` expire loop
and `:1078` dissipate arm never touch the region after removal.

`clear_regions`, `csym` range `region.c:393–405`: free loop
`:398–399` → `for...of` + `free_region`; `n_regions=0 :400`,
free-array `:401–402`, `max_regions=0 :403`, NULL `:404` →
rebind `[]` (counters ⇔ length per the D-2639 precedent).
RNG: zero draws on both sides for both functions.

Callee closure: `free_region` has zero C callees; `clear_regions`
has one (`free_region`) — LIVE. `jsonClone` is a JS-side
rendering of C's Sfo-copy half, not a C callee; snapshot-before-
clear ordering matches C `:792–794`. `sym.mjs` (jsonClone is the
one linkage re-point in this diff, local → export):

```text
free_region      js/region.js:652   sync
jsonClone        js/lev_json.js:212   sync
```

Both exported sync, matching C `void` sync. No clone, no stub.

Callers: `mklev.c:920`→`js/mklev.js:2756` ✓ (pre-existing);
`region.c:794`→`js/do.js:1833` level-leave release ✓, now
preceded by the `:1734` snapshot — the copy-then-free order C
requires; `region.c:808`→`js/region.js:768` security wipe ✓
(pre-existing; that line's `:806` comment cite predates this SHA
and is 2 lines stale — doc nit, not behavior). free_region
`:385`/`:399` → both newly wired. No foreign call sites.

Import safety: do.js→lev_json.js was a new edge at commit time
(do.js holds no other lev_json import). `jsonClone` is a hoisted
`export function` called only at runtime inside goto_level, so
no top-level TDZ read; `--can` on this tree reports ALREADY (the
edge now exists) and post-commit green + full 44/44 passed.

Diff grep (`FORCE|DIAG|getRngLog|fastforward|seed\d{4}|TODO`):
no hits. Rule #2 re-verified clean under 1956 on this tree.

## Hallucinations / overclaim

None. "Each live C free() renders as a null release" and the
no-post-free-reads sentence were all re-checked above against the
JS bodies. The stash-copy claim cites the exact C arm.

## Density

Two whole C functions, one file + its documented stash
prerequisite (the `:792–794` arm's copy half — a callee-closure
member, not padding). Both Ledger entries present
(`clear_regions ported; free_region ported`). One soft spot: the
D-log Verify bullet runs `verify.mjs --fn clear_regions` only —
no separate `--fn free_region` line — though the focused test
covers free_region directly (field release + null-safety) and my
re-measure below covers both. Not a miss, but the next two-port
should pass both names to `--fn`.

- `clear_regions`: whole body, all 3 callers wired → density OK.
- `free_region`: whole body, both callers wired → density OK.

## Verification

D-log: focused test FAILED pre-fix (link error), 3/3 post-fix;
`verify.mjs --fn clear_regions` → PASS (syntax 3 files; rule2;
hidden note no corpus session blocked; smoke 12/12 REACH-OK;
green 2/2; strict ×2; cohort 7/7; full 44/44). Re-measured here
in one call for both functions:

```text
verify clear_regions: baseline 9788e35ea~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke clear_regions: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
verify free_region: baseline 9788e35ea~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke free_region: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

Queue row was coverage THIN, so the vacuous note is honest. No
REGRESSED session. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
