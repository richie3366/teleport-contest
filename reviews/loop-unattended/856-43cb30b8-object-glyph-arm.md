# Review 856 — 43cb30b8 — pager.c do_screen_description object-glyph arm (D-1886)

Metadata: SHA `43cb30b8`, D-1886. Files: `js/pager.js` (+43/−10).
Next index 856.

Intent vs deliverable: subject promises the object-glyph arm in
`describe_looked` for corpus session random-seed0367 step 345
(`%a piece of food (a food ration)--More--` vs the ROOM or-list
fallthrough), diagnosing the queued `readobjnam_postparse1` owner as a
literal-match misattribution (proxy matched the wish-parse guard;
`readobjnam` callers are wish-only — `zap.c`/`files.c`/`nhlobj.c` —
with no wish on this path and RNG fully matched; same shape as D-1875
`glibr`). The diff delivers the arm plus the `look_at_object` suffix
chain. No scope creep.

Inventory: replaced dead pile arm (`loc.objects` — never populated;
floor piles live in `objects_at`) with a glyph-driven arm; added
buried/stone/wall/door/pool/lava suffixes. All added import names are
LIVE exports, verified with `sym.mjs`: `glyph_is_statue`
(display.js:825), `def_oc_syms` (objects.js:84), `closed_door`
(hack.js:112), `is_lava` (hack.js:1336), plus `SDOOR`/`OBJ_BURIED`
consts. Notably imports the canonical `closed_door` instead of adding
clone #11. Nothing deleted or re-pointed beyond the dead arm.

**C ↔ JS fidelity** (confirm with two notes):

- Suffix chain ≡ C `pager.c:379–419` in exact order and strings:
  buried ` (buried)` → TREE (named omit, see below) → STONE/SCORR
  ` embedded in stone` → wall/SDOOR ` embedded in a wall` →
  `closed_door` ` embedded in a door` → pool ` in water` → lava
  ` in molten lava`. Fake gating `otmp && !fakeobj` ≡ C's
  dealloc-to-NULL (`:393–396` — fakes take no suffix). Tree arm
  named-omitted in place (needs `is_treefruit` for dangling-vs-stuck;
  C checks TREE between buried and stone `:390–394`, so a tree-cell
  object takes a later suffix in JS — named with reason and C cite).
- Object arm ≡ C `:1355–1400`: oclass from `glyph_to_obj` +
  `oc_class`, range 1–17 = `for (i = 1; i < MAXOCLASSES; i++)` ✓;
  VENOM skipped ✓ (C sets `need_to_look` then `skipped_venom++` and
  continues to the cmap `.` arm — same destination as the named omit,
  which notes C lists the shared `.`-sym cmap row, not "a splash of
  venom"); statues excluded ✓ (their C line needs the monster-class
  prefix from the unexported mlet explain table plus the
  monster-letter prefix char); ROCK → "boulder" with one unhandled
  sub-case (C compares `sym == bouldersym` with the rogue/primary
  override and `continue`s on mismatch when looked — JS assumes
  boulder for any non-statue ROCK glyph; unmeasured custom-symbols
  edge, no corpus block).
- `first = look_buf` + ` (look)` parens + found 1 ≡ the didlook block
  `:1607–1640` (`*firstmatch = look_buf`, paren append, `found = 1`;
  ice/staircase rewrites and engr/monbuf extras are pre-existing
  scope). End-to-end proof: the motivating cell now prints the exact
  C line, and the session fully PASSes (RNG 50086/50086, 352/352).

Observation (not a C-wrong): neither the new arm nor
`describe_looked` as a whole gates on `terrainmode`/TER_OBJ (C `:1357`
does) — but the function follows its pre-existing ungated convention
(monster/trap/stair arms likewise), and its sole caller is the `;`
farlook path. Any gap there is function-level and pre-dates this SHA.

Hallucinations / overclaim: none. The misattribution analysis is
evidenced (`:` pick char, map cell (46,18), `%` food glyph, FOOD_RATION
live in `objects_at`, wish-only callers); `readobjnam_postparse1`
stays honestly named-omitted (wish-only, no live block).

Density: one arm + its suffix chain, +43/−10 — right-sized per §2b.

Verification: D-log `verify.mjs --fn readobjnam_postparse1` → PASS
(hidden 1 PASS PROGRESS on random-seed0367; green 2/2; strict; cohort
7/7) plus a manually run full 44/44 (shared pager.js, speed
`49+0.37/turn`). Re-measured myself:
`hidden-proxy.mjs verify readobjnam_postparse1 --base 43cb30b8~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(random-seed0367-priest-quest-tour-01388a3a: PASS). Rule2 clean per
the verify line; no FORCE/DIAG/seed/coordinate in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
