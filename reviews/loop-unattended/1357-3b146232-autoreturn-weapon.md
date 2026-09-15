# Review 1357 — 3b146232 — autoreturn_weapon canonical + always_toss (D-2391)

- SHA: `3b146232`, D-2391. JS files: `js/weapon.js` (+15),
  `js/mthrowu.js` (+39/−17), clone retirements in `js/dothrow.js` and
  `js/monmove.js` (import-line only); new
  `scripts/autoreturn-weapon.test.mjs` (41 lines, 4 tests).
- Prior reviews closed: none (Open queue row `autoreturn_weapon`;
  0 blocks).

## Intent vs deliverable

Subject promises canonical `autoreturn_weapon` plus the `thrwmu`
always_toss arm (`:1241–1247`, `:1255–1259`). Diff delivers both, plus
three clone deletions with call sites unchanged. Promise matches diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `autoreturn_weapon` (weapon.js:423) | new, exported sync, C `weapon.c:519–529` | LIVE |
| `thrwmu_body` always_toss block | new arm, C `mthrowu.c:1241–1247` + `:1255–1259` | LIVE |
| dothrow/monmove/mthrowu local clones | deleted (3) | retired |
| `mwelded` (wield.js:179) | C callee, existing edge | LIVE, canonical (monmove's local clone pre-exists, untouched) |
| `BOLT_LIM`/`AKLYS_LIM` | consts, existing edge | LIVE |

Required checks: `sym.mjs autoreturn_weapon → js/weapon.js:423 sync`
with zero locals — all three clones retired (monmove's lacked `|0`,
genuine drift removed); `sym.mjs mwelded → js/wield.js:179 sync`;
`--can js/mthrowu.js js/weapon.js autoreturn_weapon` → ALREADY;
`--can js/mthrowu.js js/wield.js mwelded` → ALREADY. Call sites
(`dothrow.js:265/2056`, `monmove.js:1643`, `mthrowu.js:989`) unchanged.

## C ↔ JS fidelity

C loci opened: `arwep[]` + `autoreturn_weapon` (`weapon.c:512–529`),
`thrwmu` (`mthrowu.c:1175–1267`), `is_pole` (`obj.h:228`).

- Table: C has one live row `{ AKLYS, AKLYS_LIM*AKLYS_LIM, 1 }` with the
  BOOMERANG row commented out. JS returns exactly that (fresh object vs
  C static pointer — callers only read `.range`/`.tethered`). ✓
- `:1241–1247` arm matches C short-circuit order (autoreturn before
  `!mwelded`, range before `couldsee`) ✓.
- `:1255–1259` renders as `!always_toss && rn2(BOLT_LIM - distmin(...))`
  with C-identical operands (`x,y` = mon pos, `mux/muy`) — the
  tethered-AKLYS retreat roll is never drawn. This is the claimed RNG
  fix, and it is real (pre-change JS drew the roll unconditionally).
- Structural delta: C chains `if (is_pole)…else if (autoreturn)`; JS
  runs the autoreturn check without the pole gate. Verified harmless:
  `is_pole` needs P_POLEARMS/P_LANCE skill or Snickersnee, none of which
  AKLYS satisfies, so the block is a proven no-op on every input where
  C takes the pole arm — the D-log's subset claim checks out against
  pinned source, not assertion.
- Polearm arm itself stays OMIT with C citation (`:1195–1240`) in doc +
  map; `select_rwep` throw-and-return walk likewise named. Own rows on
  falsifier.
- Callee closure: all LIVE or OMIT; no STUB in a live arm.

## Hallucinations / overclaim

None. D-log is explicit that the unit test covers the table only and
the live-fire gate rides on session verify.

## Density

One C locus family (table + its two consumer arms) across four files —
right-sized §2b. Full 44/44 ran (shared weapon.js changed).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed` → clean.
- Re-measured: `verify autoreturn_weapon --base 3b146232~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- Unit test 4/4 (null, DAGGER, BOOMERANG-null, AKLYS range+tethered).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
