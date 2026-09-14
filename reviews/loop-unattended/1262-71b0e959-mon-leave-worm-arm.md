# Review 1262 — 71b0e959 — dog.c mon_leave worm arm (D-2296)

Metadata: SHA `71b0e959`, D-2296, queue row `worm.c wormgone mondead/dog callers`. Method: `git show` stat + `js/` hunks; `csym.mjs mon_leave` body; C call sites read directly at `dog.c:860–866`/`903–916`; `sym.mjs` on `mon_leave`/`count_wsegs`/`wormgone`/`place_monster`; `imports.mjs --can`; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: new `mon_leave` (C worm arm) wired at `keepdogs` + `migrate_to_level` so a migrating long worm's segment count rides in `wormno` and `wormgone` fires on migration.
Diff actually adds (`git show 71b0e959 -- js/`, 3 files): `export function mon_leave` in `js/dog.js` (worm arm only, ~12 lines); one call + `wormno` store in `keepdogs`; one call + `wormno` store in `migrate_to_level` (`js/teleport.js`); import extensions; doc-note refreshes in `js/worm.js`. Promise kept, no scope creep.

## Inventory

- `mon_leave` (js/dog.js:399, sync) — new function, C callee port.
- `keepdogs` / `migrate_to_level` — one call + one store each.
- `worm.js` header/`wormgone` doc — comment-only.

## C ↔ JS fidelity

C locus `dog.c:727–763` (`csym.mjs`; staticfn, so callers read directly in pinned source). The worm arm, in C order:

```c
if (mtmp->wormno) {
    int cnt = count_wsegs(mtmp), mx = mtmp->mx, my = mtmp->my;
    num_segs = min(cnt, MAX_NUM_WORMS - 1);
    wormgone(mtmp);
    if (mx)
        place_monster(mtmp, mx, my);
}
```

JS matches verbatim: captures `cnt`/`mx`/`my` before `wormgone` (C order — captures precede the call both sides), `Math.min(cnt, MAX_NUM_WORMS - 1)`, `wormgone(mtmp)`, `if (mx) place_monster(mtmp, mx, my)` (C's comment confirms mx==0 means off-map after a failed migrate, so the guard is the point, ported). `return num_segs` → `return numSegs`.
Caller order verified against pinned C. keepdogs (`dog.c:860–866`):

```c
num_segs = mon_leave(mtmp);
relmon(mtmp, &gm.mydogs); /* mtmp->mx,my retain current value */
mtmp->mx = mtmp->my = 0; /* mx==0 implies migrating */
mtmp->wormno = num_segs;
mtmp->mlstmv = svm.moves;
```

JS does `mon_leave → splice → unshift → mx=0,my=0 → wormno → mlstmv` (splice-inline is pre-existing D-1789 debt, unchanged). migrate_to_level (`dog.c:903–916`): `mon_leave → relmon → … → wormno → mlstmv` — JS same, with the store before `mlstmv` per C.
The two unported `mon_leave` arms (minvent `no_charge`/`picked_container` loop, isshk `set_residency`) are named in the JS doc comment and the D-log Named line — proper named omits, not silent drops. The arm is RNG-free on the success path (no `rn2` in the worm arm), so no keystream risk.
Callee evidence (`sym.mjs`, all LIVE sync, sole copies):

```text
mon_leave        js/dog.js:399   sync
count_wsegs      js/worm.js:126   sync
wormgone         js/worm.js:173   sync
place_monster    js/steed.js:1083   sync
```

Cycle: `node scripts/imports.mjs --can teleport.js dog.js mon_leave` → "ALREADY: teleport.js already statically imports dog.js. No new edge needed" — stronger than the D-log's same-SCC claim; no new edge at all. No STUB in either live arm.

## Hallucinations / overclaim

None. D-log labels hidden verify vacuous (NOT a corpus PASS), discloses the `dog.js`-first-import TDZ as pre-existing (reproduced at clean HEAD in a scratch worktree — harness-order artifact, honestly presented), and names the untouched leash/light-source/`place_wsegs` arms. The `worm.js` header refresh ("Wormgone callers all live") is accurate: newcham (D-1573), m_detach (D-2231), mon_leave (here).

## Density

One C function + two call sites, ~30 JS lines with real state-correctness surface (stale segs, stale wormno). Right-sized per §2b; forced `--full` 44/44 is proportionate for a migration-path change.

## Verification

D-log: syntax/rule2 PASS, hidden vacuous (honest), green 2/2, strict ×2, cohort 7/7, full 44/44. Re-measured by this review:

```text
verify wormgone: baseline 71b0e959~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited no N blocks". Hand probe via the real `jsmain.js` entry covered non-worm passthrough (returns 0 unmutated), the worm arm (wormno 7→0), and end-to-end `migrate_to_level` (wormno set, mx/my zeroed, lands on migrating_mons, no throw). Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
