# Review 867 — 1eda4b05 — hack.c findtravelpath delay + NODIAG (D-1897)

Metadata: SHA `1eda4b05`, D-1897. Files: `js/cmd.js` (+68/−9: new
`travel_delay_current`, delay arms in both BFS loops, NODIAG dirs,
3 import names), `js/hack.js` + `js/monmove.js` (one `export`
keyword each). Next index 867.

Intent vs deliverable: subject promises the C door/boulder delay
re-queue (replacing the hard `continue`) plus grid-bug NODIAG. The
diff delivers both, nothing else. Promise ≡ diff.

Inventory: `travel_delay_current` (new, file-local). Callees:
`Passes_walls_prop` (hack.js:170 sync, newly exported),
`can_ooze` (monmove.js:662 sync, newly exported),
`could_move_onto_boulder` (hack.js:221 sync) — all LIVE.
`sym.mjs` pasted above; `--can` ALREADY for both module edges
(no new edge). `PM_GRID_BUG` joins from generated leaf-data
(const-only, no cycle surface). Nothing deleted or re-pointed
beyond local→export. `closed_door_at`/`boulder_at`/
`travel_avoids_cell`/`blocksMove` are pre-existing clones.

**C ↔ JS fidelity** (against `hack.c:1265–1523`, read in full):
delay predicate ≡ `:1403–1407` verbatim
(`!Passes_walls && !can_ooze && closed_door` ‖ `boulder &&
!could_move_onto_boulder`) ✓; re-queue shape ≡ `:1412–1420`
(per-cell `alreadyRepeated`, matrix untouched, `travel > radius-3`,
`continue` = next direction in both) ✓; start-cell seed removal ≡
`memset travel, 0` ✓; NODIAG ≡ `:1330` + `NODIAG` (`hack.h:1414`)
with `dirs_ord` verified cardinals-first in both (`decl.c:81`
"reordered directions, cardinals first" ≡ `cmd.js:1612`), and the
`umonnum === PM_GRID_BUG` comparison matches the `confdir`
idiom (`hack.js:1799`) instead of the local name index ✓.
The `run === 8` gate on the TEST_TRAP stand-in is C-faithful: the
seen-trap/known-liquid block it mirrors is itself gated on
`svc.context.run == 8` (`hack.c:1179`), and `travel_avoids_cell`
reproduces both checks plus the `!u_at` hero exclusion (the
Known_w/lwalking refinements are named-deferred in the D-log) ✓.
`losehp`-style async hazards: none (all three imports sync).
Two observations, neither queueable: (1) the delay arm tests the
trap stand-in on the TARGET `(nx,ny)` while C's TEST_TRAP arm
tests the CURRENT cell — but the pre-existing tail already
hard-skips trap targets, so reachability is unchanged on both
sides (C's trap delay also expires into a TEST_TRAV block); only
frontier order near traps could differ, unmeasured, no corpus
block. (2) `can_ooze` drops `stuff_prevents_passage`
(`monmove.c:2355–2361`) — pre-existing in-code deferral, only
reachable for amorphous heroes; not introduced here.

Hallucinations / overclaim: none. The "queue row called travel
adjacent/greedy" framing is checked against the carried BFS
(D-0412/D-0700), and the vacuous-hidden note is stated, not
hidden.

Density: 68 insertions, one algorithm in one file — right-sized.

Verification: D-log gates PASS incl. full 44/44 (auto: shared
files changed). Re-measured myself:
`hidden-proxy.mjs verify findtravelpath --base 1eda4b05~1` →
`0 blocked (0 at baseline, 0 working)` — vacuous as stated;
TOP30 row cited no blocks, public gates carry it. Diff grep: no
banned patterns (`DIAG` hits are the `NODIAG` substring only).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
