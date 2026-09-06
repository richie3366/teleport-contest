# Review 911 — 78298ee6 — gloc_filter AREA family (D-1941)

Metadata: SHA `78298ee6`, D-1941. Files: `js/getpos.js`
only (+147/−8: classify/matcharea/same_area/floodfill/
init/done + AREA gate + gather_locs envelope). HELDOUT
map row with a live falsifier (LIMITVIEW `"` cycling).

Intent vs deliverable: subject promises the AREA
flood family so `gather_locs` stops treating
GFILTER_AREA like NONE. The diff delivers exactly
that, single-module. Promise ≡ diff.

Inventory: six file-local functions + two call
lines in `gather_locs` + one gate arm. No new export,
no new module edge, no stub, no new omit.

**C ↔ JS fidelity**: classify (`getpos.c:340–361`
via csym) — six-class ladder exact. matcharea
(`:363–379`) — unseen→false, seed-glyph identity,
then class-equality — exact. floodfill vs
`selection_floodfill` (`selvar.c:394–452` via csym):
seed joins unconditionally, `isok` gates the pop,
4-neighbours (`diagonals` FALSE), matcharea as the
check func — I walked push/pop accounting: C pushes
each cell at most once (!in-tmp && !in-stack) and
every pushed cell is isok in practice (CHKDIR gates
isok; seed gated by callers), so JS's push-time
`visited` + isok-gated `ov.add` yields the identical
set; LIFO-vs-stack order changes traversal only, not
membership. init (`:390–409`) — AREA gate, lazy map
alloc, doorway far-side flood with the TODO-nothing
else-arm kept as no-else — exact. done (`:411–419`)
— free+null — exact. Gate (`:446–449`, read
directly) — five-cell SAME_AREA conjunction verbatim.
gather envelope (`:513–553`, read directly) —
init→scan→sort→done placement exact (one-pass array
≡ two-pass alloc). Macros checked verbatim:
is_cmap_furniture/water/lava (`sym.h:104–106`),
IS_DOOR (`rm.h:121`). Callee closure: LIVE =
glyph_is_cmap/glyph_to_cmap/back_to_glyph
(display.js); file-local is_cmap_room/wall/corr
(pre-existing getpos.js clones, correctly reused);
new furniture/water/lava follow the module's local
pattern. No RNG on the path (stated; true — no
rn2/rnd/d in the hunks).

Hallucinations / overclaim: none. "Inert under
default filter" is gate reasoning, properly backed
by green+cohort rather than offered as proof.

Density: 147 lines for a six-function family — one
C locus, right-sized per §2b.

Verification: re-measured `hidden-proxy verify
gloc_filter_init --base 78298ee6~1` → `0 session(s)
blocked (0 at baseline, 0 working)` — vacuous as
stated (HELDOUT row, falsifier is the public
LIMITVIEW cycle, not corpus). D-log gates: green
2/2 + strict ×2, cohort 7/7 — legitimate. Rule #2
clean. Diff grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
