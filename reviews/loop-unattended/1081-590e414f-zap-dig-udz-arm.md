# Review 1081 — 590e414f — zap_dig u.dz stair-bounce + ceiling rock

Metadata: SHA `590e414f`, D-2115, `js/dig.js` only (54 lines).
No prior review claims this SHA.

Intent vs deliverable: the subject promises the u.dz arm — zap up, or
down while On_stairs, bounces and drops a ceiling rock; down elsewhere
digs a hole.
The diff replaces the `// ceiling rock / dighole deferred` stub with
the full arm.

Inventory: one extended function (`zap_dig`), four extended import
edges (`On_stairs`, `ceiling`, `KILLED_BY_AN` / `HEAD`), three call-time
dynamic imports (`body_part`, `hard_helmet`, `finish_losehp_done`).

**C ↔ JS fidelity**: C `dig.c:1583–1612`, line by line:

- air / waterlevel + `Underwater` guard → JS `!(u.uinwater|0)` ≡
  `u.uinwater` per youprop.h, byte-identical to the zap.c:3311 twin at
  zap.js:6060 ✓
- `u.dz < 0 || On_stairs(...)`, with `On_stairs` called twice as in C ✓
- bounce pline with `stway->isladder ? ladder : stairs` + `ceiling()`
  (JS `stway && …` guard is dead defense; stairs imply the record) ✓
- "loosen a rock" → "falls on your HEAD" via `body_part(HEAD)` ✓
- `rnd(hard_helmet ? 2 : 6)` — helmet check precedes the draw on both
  sides ✓
- `losehp(maybe_half_phys, 'falling rock', KILLED_BY_AN)` ✓
- `mksobj_at(ROCK)` + `xname` + `stackobj` (guarded) + unconditional
  `newsym` ✓
- else `watch_dig(NULL, …, TRUE)` + `dighole(FALSE, TRUE, NULL)` ✓
- `return` ✓

Death path: C `done(DIED)` inside losehp is noreturn, so rock-creation
never runs when dead.
JS `_losehp_needs_done || gameover → finish_losehp_done() + return`
replicates exactly that, reusing the striking twin's convention
verbatim (zap.js:6081–6084, same killer, same dice).
Callee closure: `ceiling` / `On_stairs` extend pre-existing trap / hack
edges; the three dynamic imports are call-time uses inside the
90-module SCC (`imports.mjs --can` on all three: same-SCC, "a cycle by
itself is NOT a defect … no top-level TDZ read"), following this file's
`shk.js` convention.
RNG order preserved call-for-call (no draw precedes `rnd` either side).
No `sym.mjs` re-point applies (nothing deleted or re-pointed).

Hallucinations / overclaim: none.
"Exact C order and guards" checks out; the swallowed-pierce and pitdig
deferrals stay named in the header.

Density: 54 insertions, one C arm — within §2b.

Verification: D-log cites hidden 0 / 1-moved / PROGRESS
(Wizard-92187 → next_ident@48).
Re-measured (`--base 590e414f~1`):

```text
scen-death-Wizard-92187: moved → next_ident at step 48 (was 20)
verify zap_dig: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match. No seed / step / coordinate read.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
