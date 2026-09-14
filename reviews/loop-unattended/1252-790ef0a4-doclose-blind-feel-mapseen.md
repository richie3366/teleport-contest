# Review 1252 — 790ef0a4 — lock.c doclose Blind feel_location/mapseen + feel/see nodoor

Metadata: SHA `790ef0a4`, D-2286, queue row `lock.c pick_lock feel/see
arms`. js/: 1 file, +18/−6 (`doclose` only).

Intent vs deliverable: subject promises the Blind mapseen/feel block plus
feel/see at both nodoor sites. Diff delivers exactly that — isok-nodoor
ternary, new Blind block, second nodoor ternary; nothing else in js/.

Inventory: changed `doclose` (`js/lock.js`, Blind block ~`:855`). No new
functions, no deleted symbols (no `sym.mjs` delete audit owed), no new
module edge (all three helpers already imported — verified below).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/lock.c:956–1051` (`csym doclose`, 96 lines).
The shipped arms against C:

- `!isok → goto nodoor` (`:985`) runs while `res` is still ECMD_OK, before
  the Confusion/Stunned cost (`:993`). JS keeps that relative order
  (bounds check → Confusion/Stun assignment) with `res=false` ≡ ECMD_OK
  (house boolean idiom: false=OK/true=TIME, consistent with the function's
  pre-existing returns). ✓
- Blind block (`:997–1005`): `oldglyph` → `update_mapseen_for` →
  `feel_location` → promote on change. JS ports the lastseentyp half
  verbatim in C position (after loc fetch, before the IS_DOOR/nodoor
  check). The glyph half (`door->glyph != oldglyph`) is dropped with an
  in-code reason (JS cells don't model per-cell glyph) — the same idiom
  already ACCEPTed for `doopen_indir` (D-2167, `js/lock.js:666–671`).
  Documented structural limitation, not a silent omit. ✓
- Both nodoor sites (`:985` goto and `:1013` else-arm) now render
  `Blind() ? 'feel' : 'see'` matching C `You("%s no door there.")`;
  non-Blind string byte-identical. ✓
- Helpers: `feel_location` is a live import (display.js, `js/lock.js:7`),
  `update_mapseen_for` a live import (dungeon.js, `:41`); `Blind()` is the
  file-local macro idiom (`:757–761`, same as apply.js) — not a clone. No
  CLONE, no STUB, no new OMIT. Draw-free arms (no RNG).
- Deferred scope (stumble mimic, portcullis/drawbridge, steed close path)
  stays named in the doclose doc comment per the D-log; not this row.

Hallucinations / overclaim: none. "C order in C position" holds for the
live arms.

Density: 18 insertions, one tight arm cluster — §2b right-sized (C locus is
small; below-40 allowance applies).

Verification: D-log Verify bullet honest (vacuous note, explicitly NOT a
corpus PASS, with the reason that the cited session already passes at
HEAD; green + strict + cohort). Re-measured:
`hidden-proxy verify doclose --base 790ef0a4~1` → "0 session(s) blocked on
it (0 at baseline, 0 in the working scoreboard)". No banned patterns in the
js/ hunks (bounds compares only, no seed/coordinate/RNG reads).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
