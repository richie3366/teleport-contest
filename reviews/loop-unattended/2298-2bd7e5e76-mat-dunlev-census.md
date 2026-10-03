# Review 2298 — 2bd7e5e76 — m_at teleport rewire + dunlev/dunlevs census

Metadata: SHA `2bd7e5e76`, D-3342, 3 functions: C `rm.h:510–511`
(m_at), C `dungeon.c:1324–1328` (dunlev), C `dungeon.c:1331–1335`
(dunlevs_in_dungeon). Live: `js/mon.js:1731`, `js/dungeon.js:1090`,
`js/dungeon.js:1095` (all bodies untouched; one canonical comment
updated). Stat: 16 files, `teleport.js +22/-34` (m_at + dunlevs),
`dokick/fountain/trap.js` small, 2 test files.

Intent vs deliverable: subject promises "m_at teleport.js rewire +
dunlev/dunlevs_in_dungeon clone census (last 7 clones → live
exports)". Diff actually: teleport m_at clone deleted, 7 sites → the
already-imported `m_at as mon_m_at` alias (no import change);
dunlev/dunlevs 6 clones deleted across dokick/fountain/teleport/trap
(dungeon edges extended + 1 new fountain→dungeon edge); ~12 C-cite
site comments; canonical comment updates. 7 clones total (1 m_at + 6
dunlev-family). Matches promise. This is a cluster commit, so the
Method runs per function below.

Inventory (m_at): deleted teleport.js fmon-scan clone; 7 sites
rewired to `mon_m_at`: goodpos×2, collect_coords skip_mons, rloc_to,
rloc_post_move_msg, mtele_trap teledest, tele_trap teledest.
Import-block comment rewritten (clone-keeping rationale retired),
rloc_to zeroing comment reworded to the canonical reader.

Inventory (dunlev): 2 clones deleted (fountain, trap) → live
`js/dungeon.js:1090`. Site expressions unchanged.

Inventory (dunlevs_in_dungeon): 4 clones deleted (dokick, fountain,
teleport, trap) → live `js/dungeon.js:1095`. Site expressions
unchanged.

C ↔ JS fidelity (m_at): C is the `rm.h:510–511` macro — a pure
`level.monsters[x][y]` grid read, no branches, no RNG. The behavior
delta is live's steed-skip arm (`m === game.u?.usteed → continue`),
which the deleted clone lacked. Verified C-true at the source, not
just asserted: `steed.c:371` sets `u.usteed = mtmp` and `steed.c:379`
immediately calls `remove_monster(mtmp->mx, mtmp->my)` — the mounted
steed is off the grid, so C `m_at` can never return it. Live's
identity-skip reproduces exactly that. All 7 sites are grid-occupancy
reads (goodpos MONPOS, collect_coords skip_mons, rloc identity
checks, teledest occupancy) where the steed-off-grid semantic is what
C computes. Branch-by-branch confirm.

C ↔ JS fidelity (dunlev): C single-expression `return lev->dlevel`;
live `lev?.dlevel ?? 1` — exact plus null-guard. Both clones were the
identical expression. Behavior-identical.

C ↔ JS fidelity (dunlevs_in_dungeon): C single-expression `return
dungeons[lev->dnum].num_dunlevs`; live
`game.dungeons?.[lev?.dnum]?.num_dunlevs ?? 1` — exact plus guards.
All 4 clones identical. Behavior-identical.

Hallucinations / overclaim: none. The D-log's steed-arm claim names
the mechanism (rm.h grid + steed removal); I verified the steed.c
lines myself. "44/44 unchanged" is the port-iter's gate claim,
re-checked at this audit's cadence score.

Density: 3-function same-closure rewire (all grid/level readers),
each whole, each with Ledger coverage in D-3342. Per-function
verdicts: m_at ACCEPT; dunlev ACCEPT; dunlevs_in_dungeon ACCEPT. SHA
verdict = worst = ACCEPT. Maintained tests: mat-rewire extended +
new dunlev-rewire (16/16 pass, re-run this review).

Verification: per-function `verify --base 2bd7e5e76~1 --reach-all`:
m_at 0 blocked + smoke 24/24 REACH-OK; dunlev 0 blocked + 24/24
REACH-OK; dunlevs_in_dungeon 0 blocked + 24/24 REACH-OK. No REGRESSED
session anywhere. `--can fountain→dungeon` now ALREADY (edge added by
this commit; was SAFE at commit time). Diff grep: no banned patterns.
`sym.mjs` output (required paste, all three re-pointed symbols):

```text
m_at             js/mon.js:1731   sync
dunlev           js/dungeon.js:1090   sync
dunlevs_in_dungeon js/dungeon.js:1095   sync
```

Single live definers for all three names, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
