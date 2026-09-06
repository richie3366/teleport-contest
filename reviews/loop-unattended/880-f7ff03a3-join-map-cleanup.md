# Review 880 — f7ff03a3 — mkmap.c join_map + join_map_cleanup flood-fill regions + dig_corridor joins (D-1910)

Metadata: SHA `f7ff03a3`, D-1910. Files: `js/mkmap.js` (+138/−17:
two canonical exports + driver cutover-to-self), `js/mklev.js` (+3
words: `export` on three callees), review-878 stamp
(`Addressed: D-1910`), queue row archived. Next index 880.

Intent vs deliverable: subject promises canonical `join_map` +
`join_map_cleanup` in C order. The diff delivers both exports, the
three callee `export` words, and the dead-code driver now awaiting
its own canonical join while still delegating finish. Promise ≡
diff. The D-log's "zero importers / still dead code" claim is true
*at this SHA*: `mklev.js` keeps its own local sync `mkmap`
(`:17901`) and the live MINES path calls it — the new async
`mkmap` has no inbound edge yet (the `mklev.js → mkmap.js` import
lands one commit later in D-1911), so the sync→async flip cannot
float a promise on any live path here.

Inventory: 2 new functions (`export async function join_map`,
`export function join_map_cleanup`), 0 deleted, 3 re-pointed
(local → already-exported-or-now-exported import:
`mkmap_flood_fill_rm`, `somexy`, `dig_corridor`; `add_room` was
already exported).

**C ↔ JS fidelity** (`csym` → `mkmap.c:257–328` join_map, 72
lines; `:245–255` cleanup, 11 lines — both read in full):
fill loop bounds (`x<=WIDTH`, `y<HEIGHT`), NO_ROOM gate,
bounds-object min/max + `n_filled`, `>3 → add_room(...,FALSE,OROOM,
TRUE)` + `irregular`, `>=MAXNROFROOMS*2 → break outer` (= `goto
joinm`), else tiny-hole erase against the un-incremented
`nroom+ROOMOFFSET` stamp — all exact. Join pass: `somexy`
short-circuit (`||`, second call only if first succeeds — RNG
order), `await impossible(...)` arm restored (the old
`join_map_dig_pass` clone dropped it — confirmed by reading the old
body at the parent SHA), centre fallback with `|0` trunc of C int
division (non-negative operands, so trunc ≡ C `/`), arg-exact
`dig_corridor(sm,em,null,false,fg,bg)`, advance gate with
load-bearing `||`/`&&` short-circuit on `rn2(3)`, terminal
`join_map_cleanup()`. Cleanup: strip loop `x=1..COLNO-1`,
`y=0..ROWNO-1` ✓, `nroom=nsubroom=0` ✓ (old clone skipped
nsubroom — confirmed), both `hx=-1` tombstones with the
`subrooms[0] ≡ rooms[MAXNROFROOMS+1]` layout cited
(`mklev.js:1358` + `add_subroom :19347–19353` agree). Fresh
`{hx:-1}` objects vs C field-assign: unobservable (slots dead while
`nroom=0`; next `add_room` re-inits) — checked, not a wrong.
No RNG calls in either function beyond the preserved ones.

Hallucinations / overclaim: none. The dropped-arm characterization
of the old clones verifies against the parent-SHA bodies.

Density: one C locus family + driver, ~140 insertions — right-sized.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7,
full 44/44 auto-run on the shared-file change). Re-measured
myself: `hidden-proxy.mjs verify join_map --base f7ff03a3~1` →
`0 session(s) blocked on it (0 at baseline, 0 in the working
scoreboard)` — vacuous exactly as stated; map-driven row, no
`--base`-at-queue re-run owed. Diff grep: no FORCE/DIAG/seed/
coordinate patterns. `imports.mjs --rulecheck` → Rule #2 clean (at
HEAD, covers this SHA). `sym.mjs` (at SHA, via `git show` where
HEAD drifted): re-pointed callees all live `mklev.js` exports;
`join_map_fixed` stayed live-local for the MINES path (its HEAD
absence is D-1911's later deletion, not this diff); new exports
`join_map` ASYNC / `join_map_cleanup` sync, no duplicate clones.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
