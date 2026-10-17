# Review 2917 — 6c90d1b8e — sanctum placeNamed gains the extinct/genocided gate

- SHA: `6c90d1b8e` (rndmonst_adj writer:
  extinct erinys re-spawned)
- D-entry: D-4079; Ledger: sp_lev.c
  (`create_monster split` + load_sanctum)
- `js/` diff: `js/mklev.js` +12/−1 (the
  `:1947–1953` gate in load_sanctum's
  placeNamed); new
  `scripts/sanctum-extinct-erinys.test.mjs`

## Intent vs deliverable

Promise: JS spawned explicit erinys #4 where
C nulled pm via the G_GONE arm (mvitals born=3
flags=257 pre-arrival); add the UNIQ-return +
GONE-null gate in C order after the amask
burn; Wizard-49950016 FULL PASS. The diff is
exactly that gate. Promise = diff.

## Inventory

- `load_sanctum` placeNamed
  (mklev.js:28034–28064): `let pm`, post-
  amask `if (pm)` gate — UNIQ+EXTINCT →
  return, G_GONE → `pm = null` (random via
  makemon(null) below). C: sp_lev.c
  :1946–1953.
- No import changes (G_UNIQ/G_EXTINCT/G_GONE
  already in file), no new helpers. No
  deleted symbols — step-3 paste not
  triggered.

## C ↔ JS fidelity

Confirmed against pinned C (csym
:1924–2187):

- :1947–1953 order exact: `pm =
  &mons[m->id]` ✓ (`mons(mndx)`), `g_mvflags
  = mvitals[monsndx(pm)]` ✓ (`mvitals[mndx]`
  — monsndx is the same index), UNIQ+EXTINCT
  → return ✓, G_GONE → pm=0 ✓ with the same
  "make random monster" comment.
- Flag values identical: G_UNIQ 0x1000,
  G_EXTINCT 0x01, G_GONE 0x03 both sides
  (monflag.h:194/:209–211 vs
  const.js:747–749 + monsters.js:75). The
  measured flags=257 (0x101) carries
  G_EXTINCT → null arm, as claimed.
- Amask-burn-first matches C: sp_amask
  resolve precedes the gate in C (:1942
  before :1947); `induced_align(80)` is the
  pre-existing line above the new gate.
- Null-pm downstream safe: enexto with null
  mdat defaults to player's type
  (teleport.js:588, C :231–235); makemon(null)
  is the random path both sides.
- The "not an unresolved id" proof cites
  get_table_montype :3175–3176 NON_PM abort
  + name_to_monplus("erinys")=292 both
  sides — consistent with the measured
  born=3→4 (a 4th explicit spawn, not a
  random fill).
- Deferral named, not smuggled: 22 sibling
  direct-makemon fills without the gate are
  listed with the falsifier (a future row
  naming one). Same shape as the D-4023
  juiblex precedent.

## Hallucinations / overclaim

None. The "49955042 RNG gap closed too"
class of surprise is absent here; the
single-session claim matches the single
blocked session.

## Density

Cliff writer, 1/1 → PASS. One `Ledger:`
entry. Whole ported arm in C order. Full
44/44 in-commit (mklev.js shared). No
unreached work.

## Verification

Re-measure (`--base 6c90d1b8e~1 --no-reach`):

```text
verify rndmonst_adj: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-49950016: PASS
```

Exact match. No FORCE/DIAG/seed/coords in
the `js/` hunk. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
