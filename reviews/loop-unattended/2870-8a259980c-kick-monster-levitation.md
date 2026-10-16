# Review 2870 — 8a259980c — kick_monster wild-miss reads the Levitation macro

## Metadata

- SHA: `8a259980ca57b8cd71736f2caee4e66afb069aa9` (D-4029)
- Cliff: `dokick.c` kick_monster row, 3 probes
  (intrinsic-Rogue-50852003 s121, sweep-Samurai-50362022
  s1413, worldtour-Wizard-50358023 s532; parent-block row 6)
- js/ diff: `js/dokick.js` +3/-1 (guard + comment);
  `scripts/kick-monster-levitation.test.mjs` (new)
- Method: full per-function (cliff commit, 1 function)

## Intent vs deliverable

Promise: the wild-miss guard read the JS-only sticky
`u.Levitation` (D-1070, not a C field), false whenever
levitation rides the H/E flats — so JS skipped C's first
`rn2(3)` draw. Call the file-local `Levitation()` macro
helper instead. 3 probes FULL PASS.

Diff actually: the one predicate + a C-citing comment.
Promise == diff.

## Inventory

- `kick_monster` (`js/dokick.js:925-1050`, async; C
  `dokick.c:145-288` per `csym.mjs`): guard now
  `Levitation() && !rn2(3) && verysmall(mon.data) &&
  !is_flyer(mon.data)`.

## C ↔ JS fidelity

- C guard read at `dokick.c:153-159`: `if (Levitation
  && !rn2(3) && verysmall(mon->data) &&
  !is_flyer(mon->data))` → wild-miss pline, exercise,
  passive, return. JS is the same predicate and tail.
- Macro: C `youprop.h:240` is `(HLevitation ||
  ELevitation) && !BLevitation`; the file-local helper
  (`js/dokick.js:201-205`) is that expression exactly.
  Using the local is the *right* call here, not laziness:
  the canonical export `js/mhitu.js:700` reads the sticky
  first (`if (u.Levitation) return true`) — sticky drift
  the local does not have. `imports.mjs --can dokick.js
  mhitu.js Levitation` says ALREADY, so no cycle claim is
  involved; the SHA added no clone (the local predates it,
  used at :282/:370), so the re-point paste is N/A.
- Whole-body spot-check (D-log claims arm-for-arm vs C
  `:146-288`, ledger `ported`): JS outline reads
  setmangry → wild-miss → mundetected/reveal → Upolyd
  AT_KICK loop → encumbrance/clumsy (`goto_doit`) →
  Fumbling/bulky → kick pline → evade/mnexto → kickdmg;
  the evade tail (block arm, 5-way
  teleports/floats/swoops/slides/jumps, passive, kickdmg)
  matches C `:256-288` branch-for-branch; no
  TODO/deferred/stub in `:925-1130`. The `ported` stamp
  survives the sample.
- Caller: C `dokick.c:1410` (inside `dokick`) → JS
  `js/dokick.js:1745` (inside `dokick`, pre-existing).
- Grep of the `js/` hunk: clean. Rule #2 clean (HEAD).

## Hallucinations / overclaim

None. "Every kick_monster callee is live; no deferred
arm" is consistent with the sample above and the `ported`
ledger row (D-2042's kickdmg arm noted as shipped
separately).

## Density

Legitimate head work: parent block row 6 is kick_monster
with rows 1–5 + 7–9 unattributed (dupe-rc kin + the
D-4028 95340 park, both re-verified in-commit). One
cause, three probes, `Ledger:` updated (D-4029).

Observation (no Must-fix, no session evidence): the
canonical `Levitation` export's sticky-first line is the
next instance of the D-1070 class — worth a union pass
when a session implicates it, not a row today.

## Verification

Re-measured `--base 8a259980c~1 --no-reach`: `verify
kick_monster: 3 PASS, 0 moved past, 0 unchanged, 0 worse
→ PROGRESS` (all three probes PASS) — exact match to the
D-log. Focused test 1/1 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
