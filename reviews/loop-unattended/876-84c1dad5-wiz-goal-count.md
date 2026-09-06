# Review 876 — 84c1dad5 — mkmaze.c makemaz Wiz-goal random-object count (D-1906)

Metadata: SHA `84c1dad5`, D-1906. Files: `js/mklev.js` (loop bound
15→14 + comment), `docs/c-js-map/data.md` (map row). Next index 876.

Intent vs deliverable: subject promises the empty-object count fix
plus the Bar-goal comment correction. The diff delivers both,
nothing else. Promise ≡ diff.

Inventory: 0 new functions; 1 changed constant, 2 comment lines.
Nothing deleted or re-pointed; no imports touched.

**C ↔ JS fidelity** (counted, not trusted): `dat/wiz-goal.lua`
holds 15 `des.object` lines total — verified by direct read:
1 named Eye (`des.object({ id = "amulet of ESP", …,
name="The Eye of the Aethiopica" })`, the `:73` line, created
separately at `mklev.js:5136–5142` via the named branch above
the loop) + 14 bare `des.object()` (`:74–87`, fourteen
consecutive lines, then `-- Random traps`). Old loop minted 15
empties (16 objects total with the Eye); new loop mints 14 (15
total) ✓. `dat/Bar-goal.lua` shows the same 1 named Heart
(`luckstone`/`Heart of Ahriman`) + 14 empty shape, so the
corrected comment (no longer "not Wiz-goal's 15") is accurate —
both quests share the 1+14 shape ✓. Each removed iteration is
one `splev_create_object(null)` → `mkobj_at(RANDOM_CLASS)` with
its full RNG draws plus one floor object, so the latent-RNG and
latent-object claims are both concrete. No symbol deleted or
re-pointed; no imports touched.

Hallucinations / overclaim: none. "No suite descends" is stated
plainly as latency, not coverage. The D-log's "unchanged from
D-1818" named list (humidity `get_location`, `m_dowear`,
`fill_special_room` TEMPLE, `G_UNIQ`, fakewiz, `create_maze`
fallback, `dmonsfree`) correctly re-states the remaining
Wiz-goal envelope rather than re-closing it, and the queue row
for this content landed in archive with `D-1906 84c1dad5`
stamped — no dangling row left behind.

Density: two lines — the smallest correct fix for the falsifier.

Verification: D-log gates PASS — syntax on `mklev.js`, rule2,
green 2/2 + strict seed8000/seed0900, cohort 7/7, and full
44/44 (shared file changed, so the auto-full ran — fortress
held through a level-gen edit). Lua-count audits pin the rest
of the level: 20×76 map byte-identical, 16/16 doors, 1 temple +
1 lit + 14 unlit + 1 lit regions, 6/6 traps, 28 + 8 captive
monsters. Re-measured myself: `verify makemaz --base
84c1dad5~1` → `0 blocked (0 at baseline, 0 working)`,
vacuous exactly as stated; HELDOUT content row cited no
blocks, so no queue-base re-run is owed. Diff grep: no
FORCE/DIAG/seed/coordinate patterns. Rule #2 clean at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
