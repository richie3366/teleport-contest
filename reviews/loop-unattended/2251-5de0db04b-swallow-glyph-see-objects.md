# Review 2251 — 5de0db04b — swallow_to_glyph whole + see_objects arm

Metadata: SHA `5de0db04b6e46089d59b0409aa2fc394bbc13777` (D-3290,
2026-10-02). `js/display.js` only. Two-function
same-file cluster: `swallow_to_glyph` (C
display.c:2436–2446, whole) + `see_objects`
:1570 arm (C :1558–1571).

Intent vs deliverable: subject promises the
whole `swallow_to_glyph` port + the
`see_objects` tail arm. The diff ships the
canon function, the `swallow_cell` rewire,
`S_sw_br`, and the tail call. Delivers both.

Inventory — `swallow_to_glyph`:

- Module-local `swallow_to_glyph(mnum, loc)`
  (:5488–5497): what_mon<<3, bad-loc clamp,
  swallow-bank packing. C staticfn →
  module-local ✓.
- `S_sw_br = S_sw_tl + 7` (:683) +
  `SWALLOW_PART_LOCS` (:5499), defsym order.
- `swallow_cell` rewire (:5504–5513): all
  cells through the canon fn, monster bits
  unpacked `>> 3` for color. Old raw-field
  hallu inline deleted (inline code, no named
  symbol → no required `sym.mjs` paste; ran
  anyway: `what_mon display.js:1674 sync`,
  `random_monster display.js:1658 sync`,
  single LIVE exports ✓).

Inventory — `see_objects`:

- Tail (:5625): `update_inventory()` replaces
  the deferral comment. Import pre-exists
  (:154) — no new edge. `sym.mjs`:
  `update_inventory invent.js:4802 sync` ✓.

**C ↔ JS fidelity — `swallow_to_glyph`**:
body ≡ C :2436–2446: `what_mon(mnum,
rn2_on_display_rng) << 3` ✓, bad-loc `l =
S_sw_br` ✓ (report text a cite — named in
the D-log; arm unreachable, all 8 sites pass
constant S_sw_* locs; C's arm is equally
dead in practice), `(m_3 | (loc -
S_sw_tl)) + GLYPH_SWALLOW_OFF` ✓. what_mon
≡ the C macro (display.h:197): JS gates on
`Hallucination()` and calls
`random_monster(rng)` = `rng(NUMMONS)` ≡ C
(display.h:186) — read both bodies ✓. RNG
call-for-call: 1 display draw iff the
youprop, exactly C's expansion; the old
inline mis-predicated on the raw field and
is gone ✓. Unpack `(glyph - OFF) >> 3` is
exact (m<<3 has zero low bits, offset
0..7) ✓. S_sw 88–95 consecutive confirmed
(defsym.h:221–228); part map order matches
✓. Callers: 8 C swallowed() sites :1360–
1380 ↔ 8 swallow_cell calls, all routed
through the canon fn ✓. Verdict: ACCEPT.

**C ↔ JS fidelity — `see_objects`**: tail ≡
C :1570, and C's comment ("do this for all
interfaces") directly refutes the old
deferral rationale ✓. Callee LIVE sync,
called from sync ✓. Call sites pre-wired
(allmain/potion/artifact, disclosed) ✓.
No RNG. Verdict: ACCEPT.

Hallucinations / overclaim: none. "No corpus
divergence — C-fidelity residuals" disclosed
for both; no corpus PASS claimed.

Density: 2 whole same-file functions, one C
file, ≤10 fns, no Must-fix bundled ✓.
`Ledger: swallow_to_glyph ported;
see_objects ported` ✓, one Verify sub-bullet
each ✓.

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 for both + green/strict/cohort/
full. Re-measured (`verify
swallow_to_glyph,see_objects --base
5de0db04b~1 --reach-all`, one call): both `0
blocked` + vacuous note + `smoke 24 PASS, 0
regressed → REACH-OK`. Exact match; zero
REGRESSED. Banned-pattern grep: clean.
Rule #2 clean (iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
