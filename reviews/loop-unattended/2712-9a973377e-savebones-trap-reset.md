# Review 2712 — 9a973377e — savebones trap loop live list (D-3851)

Metadata: SHA `9a973377e`, D-3851, cliffs-head `detect.c`
dosearch0 writer (bones-loaded pit kept tseen, next life
skipped its rnl(8)). JS: `js/end.js` (+16/−4: the `:552–555`
loop walks both list shapes). Test:
`scripts/savebones-trap-reset.test.mjs` (new, 1 `it`, segs
0–7 replay asserting the bones trap reset).

## Intent vs deliverable

Promise: Archeologist-578126@824 — JS savebones walked
`game.ftrap` as a C node chain (null on fresh levels, so the
reset visited nothing) while the live list is level.traps;
bones JSON kept `"tseen":true` into seg8 and dosearch0 drew
nothing where C rolls rnl(8); walk level.traps plus the
non-array ftrap chain; session moves 824→1070. Diff actually
does that. Match.

## Inventory

- savebones `:552–555` loop (js/end.js:1904): `for (const t of
  bonesTraps)` over `game.level?.traps` when an array, plus
  the old chain walk guarded by `game.ftrap &&
  !Array.isArray(game.ftrap)`; both arms set `madeby_u = 0`
  and `t.tseen = unhideable_trap(t.ttyp)`. C: bones.c
  `:552–555` (`for (ttmp = gf.ftrap; …)` with the same two
  writes, read). `unhideable_trap` already imported
  (end.js:50) — no new edge. Sole C caller end.c:1365 →
  js/end.js:1341, signature unchanged.

## C ↔ JS fidelity

Shape-for-shape confirm. The dual-walk is the
`can_make_bones :660–676` sibling shape for the same C walk
(read js/end.js:666–676: array walk + non-array chain walk
with the identical guards) — house-idiom, not invention.
Writes are idempotent (constant 0 / pure function of ttyp),
so a trap reachable under both shapes resets twice
harmlessly. The mechanism is measured, not inferred:
maketrap-unseen → find_trap flip → bones JSON tseen:true →
seg8 tseen:true traced with a temp setter (reverted), and
the post-fix divergence (rnl(8) drawn, pit later found and
shown `^`) is C's exact behavior. No RNG/prints in the
change; the restored draw belongs to dosearch0's arm.

## Hallucinations / overclaim

None. "Whole C savebones re-read; every other arm already
live" is a read claim consistent with the partial ledger
row (VFS/file-handle omits stand, correctly scoped). The
Next-bullet flag of three more `game.ftrap`-as-chain walks
(do.js:2124/dungeon.js:2433/display.js:6386) is an honest
latent-shape note with "own pops if a session names them" —
not filed as rows.

## Density

Cliff-phase: parent HEAD was dosearch0 (1 block, first 824 —
verified in 8619ac360 queue); writer reached through a bones
chain across lives, not a dosearch0 re-port. Ledger:
savebones partial + D-3851. Reached: probe moved 824→1070.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify dosearch0 --base 9a973377e~1
--reach-all` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, Archeologist `moved → ghitm at
step 1070 (was 824)`, `0 PASS, 1 moved past, 0 unchanged,
0 worse → PROGRESS`; reach 160/160 REACH-OK (146s). Zero
regressed. The movement claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
