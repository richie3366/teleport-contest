# Review 2865 — e39440cb8 — placeNamedAtAbs extinct-unique gate

## Metadata

- SHA: `e39440cb8ff2efd196ab18b92d6593c6aeee8648` (D-4023)
- Cliff writer: row 4 `sp_lev.c` find_montype @79a1cf283
  (rows 1–3 D-4016-kin, re-verified; D-2997 read, body
  whole, writer still open)
- js/ diff: `js/mklev.js` +12/-1 (gate block);
  `scripts/juiblex-already-born.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: Juiblex's-lair mirror `placeNamedAtAbs` skipped
`create_monster`'s `:1947-1953` gate, birthing a second
Juiblex (extra creation RNG desyncing the later
des.monster("lemure") parse). Add the gate in C order after
the amask burn: extinct-unique → null; G_GONE → random.
Both probes FULL PASS.

Diff actually: the gate block. Promise == diff.

## Inventory

- `placeNamedAtAbs` (`js/mklev.js:26045`, mirror of C
  `create_monster` `sp_lev.c:1924-2187`): +10 gate lines.

## C ↔ JS fidelity

- C `:1943` amask, then `:1947-1953` (read via `csym.mjs`):
  `(pm->geno & G_UNIQ) && (g_mvflags & G_EXTINCT)` →
  return; `g_mvflags & G_GONE` → `pm = 0` ("make random
  monster"). JS: `induced_align(80)` then the identical two
  predicates — `return null` / `pm = null` into the existing
  `makemon(null)` class path. Same shape as the gated
  `splev_create_monster` (`:22278-22284`). Order (parse-RNG
  → amask → gate) matches C.
- G_EXTINCT-on-live-unique premise verified: C
  `propagate` (`makemon.c:966-968`) sets `G_EXTINCT` at
  every unique birth — a genesis-born Juiblex trips the
  gate exactly as claimed.
- Null-safe: both call sites (`:26081`, `:26085` via
  `placeNamedAt`) use void context; the Juiblex call
  becoming a no-op leaves the lemure placements (and their
  parse draws) intact.
- Named-but-unported arms (MINES gate, roamer/mplayer
  dispatch, croom return) are each dead for this mirror
  with the reason stated — named omits, not stubs.

`sym.mjs`: no symbols deleted or re-pointed (local arrow
+ existing `G_*` consts, no new imports).

## Hallucinations / overclaim

None. The second-Juiblex autopsy (m_id + m_initinv with no
newmonhp draws, mlevel-50 fixed HP, zero unique deaths in
both prefixes) is measured both sides and the gate it
implies is the C gate.

## Density

Writer port on live row-4; whole gate with dead-arm reasons.
`Ledger:` sp_lev row + D-4023 (diff shows the single-row
touch). Test 1/1 PASS (re-run; red pre-fix quoted in the
D-log with the exact draw mismatch).

## Verification

Re-measured `--base e39440cb8~1 --no-reach`: `verify
find_montype: 2 PASS, 0 moved past, 0 unchanged, 0 worse`
(Ranger-50456024, Archeologist-50056048) — claim exact.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
