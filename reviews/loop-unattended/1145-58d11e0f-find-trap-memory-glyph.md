# Review 1145 — 58d11e0f — detect.c find_trap memory-glyph clutter check (D-2179)

Metadata: SHA `58d11e0f`, js/ +10/−3 in `detect.js` only (no
new imports). D-log D-2179. Subject promises: clutter check must
read memory `levl[][].glyph`, not gbuf `glyph_at` (Priest-92096
75→149).

Intent vs deliverable: promise matches diff. Actually adds: the
comparison operand swap (`glyph_at(tx,ty)` → memory
`remembered_glyph` with `NO_GLYPH` default) + C comment. One
predicate, one session.

Inventory: no new/deleted functions. No callee change
(`Hallucination`, `cls`, `map_trap`, `display_self` untouched).
`game` (gstate.js:52) and `NO_GLYPH` already imported — no new
edge. `glyph_at` stays imported and used (12 call sites) — no
dangling import, no dead code.

**C ↔ JS fidelity**: confirm, two loci read at HEAD.

- Predicate: C `detect.c:1946–1947` `if (Hallucination ||
  levl[tx][ty].glyph != trap_to_glyph(trap))` — JS now compares
  `memGlyph !== tgid` with identical `Hallucination ||` order.
  The old operand read gbuf (display cell); review 1007's
  blessing of it as the levl analogue was wrong for covered
  squares, and the D-log says so explicitly — good self-
  correction, not hidden.
- Memory store: C `display.c _map_location(x,y,show=FALSE)`
  under a monster still stores via `map_trap(trap,0)` while gbuf
  shows the monster. JS `map_location` (display.js:4797, C-cited)
  writes `loc.remembered_glyph` at 8 sites incl. the trap path
  (`:2002`); `feel_newsym` (`:4786`) routes through it. The
  measured probe (mem `^`/4046 == trap glyph while disp stays
  `f`/798 under the covering monster) proves the store the new
  read consults is populated on this exact step — the read is
  not aspirational.
- Default: absent memory → `NO_GLYPH` ≠ tgid → clear, matching
  C's mismatch for unseen/no-memory cells; `hero_memory`-off
  symmetry claimed in-comment (map_* skip the store both
  sides). Direction-correct.
- Rest of `find_trap` (`tseen`, `exercise`, `feel_newsym`,
  `set_msg_xy`, pline, cleared-gated WIN_MAP wait) untouched
  and already live (D-2037).

RNG: none in this arm either side.

Hallucinations / overclaim: none. The geom-probe `^F` gap is
explicitly classified as a `do_mapping` artifact (named map
debt), not levl — with the prefix-replay proof that levl/memory
are identical. The Next hands the doturn@149 residual to the
parked `pray.c doturn` row (which already holds the genuine
`gnostic` fix + falsifier) with an explicit do-not-re-pop —
correct queue discipline, not a silent drop. (Observation, not a
wrong: the parked gnostic fix is *not* re-applied here; per the
park's own falsifier it ships once the map precondition holds,
and gluing it to this row would break one-item-per-iter.)

Density: ~10 insertions; C body 27 lines, rest live — density
exception (C arm that small).

Verification: D-log cites `verify.mjs --fn find_trap` → 0 PASS
+ 1 moved past, green 2/2, strict ×2, cohort 7/7. Re-measured
independently: `hidden-proxy.mjs verify find_trap --base
58d11e0f~1` → baseline 1 blocked, `0 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (Priest-92096 75→149 doturn).
Exact match — movement with a named next writer, not a vacuous
claim. `rulecheck` clean. No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
