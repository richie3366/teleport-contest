# Review 2215 — 35e5e8f94 — magic_map_background memory guard

Metadata: SHA `35e5e8f944b8e3acaf466fa29b02a7340717e568` (D-3254, 2026-10-02).
js/ delta +11/−2 in `js/display.js` only + new
`scripts/magic-mapping-invisible.test.mjs` (69 lines, 3/3). No new
imports, no symbols deleted or re-pointed (same-file helpers only).

Intent vs deliverable: subject promises "`magic_map_background`
:250-252 memory guard". The diff delivers exactly that: the
unconditional `remember_shown_glyph` write becomes gated. The seffect
row ships via closure fix with no head change — correctly, and the
D-log explicitly corrects D-3251's "diverges elsewhere" guess
("falsified: the I-vs-floor was fixable in the closure"). Good
self-correction hygiene.

Inventory:

- `magic_map_background` (`js/display.js:4885`): memory write gated on
  `memId === NO_GLYPH || glyph_is_unexplored(memId) ||
  glyph_is_cmap(memId)`, where unclassified memory maps to NO_GLYPH.
  Callees: same-file `glyph_is_unexplored` (:885), `glyph_is_cmap`
  (:891) — both LIVE pre-existing. No clones, no stubs.

**C ↔ JS fidelity**

- C `display.c:232–258`, gate at :250–252:
  `if (hero_memory && (glyph_is_unexplored(lev->glyph) ||
  glyph_is_cmap(lev->glyph))) lev->glyph = glyph;`
  JS ports the predicate exactly; the cause chain is C-cited at every
  link (`map_invisible` GLYPH_INVISIBLE store :378–385, `newsym`
  show_mem repaint :1095–1096).
- Predicate equivalence checked against `display.h`, not trusted:
  C `glyph_is_unexplored(g)` is `(g)==GLYPH_UNEXPLORED` (:978) —
  JS :885 identical plus a typeof guard (required: JS memory may be
  absent); C `glyph_is_cmap(g)` is the plain range
  `[GLYPH_CMAP_STONE_OFF, GLYPH_CMAP_C_OFF + …)` (:723–725) — JS :891
  identical modulo `glyph_id` normalization (identity on numerics).
- The extra `memId === NO_GLYPH` disjunct has no C counterpart — but
  C `lev->glyph` is always a valid glyph int, while JS memory may be
  absent/legacy; without the arm those cells would never gain mapping
  memory (a regression). Positively-identified non-cmap ids (I, object,
  trap) are preserved per C; legacy states keep old behavior. The right
  compat call, documented in the hunk comment and D-log.
- No RNG in the body on either side. Callers: all 5 C sites verified
  wired with matching show flags (detect.js ×5, one citing :1105).
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. "Whole C body live" for
`magic_map_background` holds (dark-room/show/update_lastseentyp were
pre-ported; the gate was the only gap). The seffect "head verified
whole" claim coexists honestly with the named Rogue-`unblock_point`
approximation (shipped later as D-3258). Test pins both halves (I
preserved — failed pre-fix 1532-vs-3993; cmap write-through kept).

Density (§2b): +11/−2 js (+69 test) — under the floor with the
structural-exhaustion escape (coverage 0, queue 85/85 tagged) and a
committed test. Corpus-row fix precedent. ACCEPT.

Verification: re-measured:
`verify seffect_magic_mapping,magic_map_background --base 35e5e8f94~1
--reach-all` → seffect: Tourist-92061 `moved → rndcurse at step 122
(was 18)` → PROGRESS (+104 steps); smoke 24/24 REACH-OK both; 0
regressed. Every D-log number reproduced.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
