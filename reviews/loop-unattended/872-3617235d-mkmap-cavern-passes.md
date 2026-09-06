# Review 872 — 3617235d — mkmap.c cavern generator passes + room removal (D-1902)

Metadata: SHA `3617235d`, D-1902. Files: new `js/mkmap.js` (+180, 6
exports + 2 local helpers), `docs/c-js-map/data.md` (+6 map rows).
Next index 872.

Intent vs deliverable: subject promises the six cavern helpers with
C names/signatures, nothing else. The diff delivers exactly the six
plus the shared neighbour-count helper and module header. Promise ≡
diff.

Inventory: 6 new exports (`get_map`, `pass_one`, `pass_two`,
`pass_three`, `remove_rooms`, `remove_room`); 2 local helpers
(`count_neighbours` — the thrice-identical C inline loop;
`new_loc_index` — the C `new_loc` macro). Callee closure: only
`game.level.at`, async `impossible` (`sym`: `display.js:6443` ASYNC,
awaited ✓), and `COLNO/ROOMNO/ROOMOFFSET` consts — all leaf edges,
call-time use, no top-level TDZ read. Nothing imports `mkmap.js`
yet: dead code with no live path, so no cycle surface. Nothing
deleted or re-pointed (new file).

**C ↔ JS fidelity** (each vs its `csym` range): `get_map` ≡
`:54–60` (bounds predicate copied verbatim, OOB→bg) ✓; `pass_one`
≡ `:67–96` (in-place writes hitting levl mid-sweep, switch
0/1/2-death / 5–8-breed / default-keep, loop bounds `x 2..WIDTH`,
`y 1..<HEIGHT`) ✓; `pass_two` ≡ `:100–121` (==5→bg else keep
current type, two-loop double buffer) ✓; `pass_three` ≡ `:123–144`
(<3→bg else keep, same shape) ✓; `remove_rooms` ≡ `:378–401`
(no-overlap continue → partial+TODO+`impossible` iff regular →
else `remove_room(i)`, reverse index walk) ✓; `remove_room` ≡
`:411–436` (nroom pre-decrement, spread-copy instead of struct
assign so the `hx=-1` tombstone cannot alias the moved room,
`oroomno=nroom+ROOMOFFSET` cell rewrite over the moved bbox) ✓.
Macros verified at the C head: `HEIGHT (ROWNO-1)`, `WIDTH
(COLNO-2)` (`:8–9`), `dirs[16]` values byte-identical to `DIRS`.
Per-call scratch at the `new_loc` layout (`j*(WIDTH+1)+i`, sized
`(WIDTH+1)*HEIGHT`) is observationally identical — each pass fully
rewrites its region before the copy-back reads it. None of the six
draw RNG in C; the port draws none. Two nits, neither a C-wrong:
the `remove_room` header cites `:403–436` while `csym` prints
`:411–436` (`:403–410` is the function's own doc comment — range
includes it, body exact); the `roomnoidx` restamp is a documented
JS-only cache, and its readers exist (`dog.js:805,823`,
`hack.js:2241`, `mklev.js:16552,16580`).

Hallucinations / overclaim: none. The per-call-scratch equivalence
argument is stated with its reason (full rewrite before copy-back);
the D-log's falsified-expectation note (birth mispredicted under
simultaneous-update assumption) is evidence the in-place order was
actually checked.

Density: ~170 insertions, one C family, map rows updated in-commit —
right size.

Verification: D-log gates PASS (green + strict ×2, cohort 7/7,
`skip full` — new file, nothing imports it). Re-measured myself:
`hidden-proxy.mjs verify pass_one --base 3617235d~1` →
`0 session(s) blocked (0 at baseline, 0 working)` — vacuous exactly
as stated; HELDOUT Tier C row cited no blocks. Diff grep: no
FORCE/DIAG/seed/coordinate/fastforward patterns. Rule #2 clean at
HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
