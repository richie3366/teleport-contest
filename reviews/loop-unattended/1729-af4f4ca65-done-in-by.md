# Review 1729 — af4f4ca65 — done_in_by whole body + uhitm STONING caller (D-2770)

- SHA: `af4f4ca65` (`end.c` done_in_by ghost arms + live You; `uhitm.c` passive AD_STON, D-2770)
- Files: `js/end.js` (+27/−9), `js/uhitm.js` (+30/−6), docs
- Queue row: Open (coverage THIN), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the ghost arms, a live `You(...)`, and the
`uhitm.c:5952` STONING caller. Diff: `You('die...')` /
`You('turn to stone...')`, the named-ghost `"the "` arm, the
`else if (PM_GHOST)` "ghost [of <name>]" arm, and a full AD_STON case
in `passive()` replacing a 4-line "deferred" stub. Promise kept.

## Inventory

| JS symbol | Class | C / sym.mjs |
|-----------|-------|-------------|
| `done_in_by` (export, async) | C body | `end.c:184–344` (csym) |
| `passive` AD_STON case | C caller arm | `uhitm.c:5935–5956` (caller `:5952`) |
| `attk_protection` (new import) | LIVE | `js/mhitm.js:4204 sync` |
| `poly_when_stoned` (new import) | LIVE | `js/monsters.js:676 sync` (mvitals G_GENOD test) |
| `polymon` (dynamic import) | LIVE | `js/polyself.js:1421 ASYNC` |
| `Stone_resistance` | pre-existing local boolean in `passive` (`:2751`) | `youprop.h:65` `HStone_resistance \|\| EStone_resistance` ✓; `sym.mjs` also lists a local function clone in `mhitu.js:3630`, not touched here |
| `You`, `has_mgivenname`, `MGIVENNAME` | LIVE | display.js / do_name |

Nothing deleted or re-pointed.

## C ↔ JS fidelity

`done_in_by` (`:195–263`):
- `:195` `You(...)`: JS `You` is `vpline('You ' + fmt)`, so the text is
  identical to the old pline; now the same call as C ✓. `:196`
  `mark_synch` is a tty flush with no JS equivalent (named) ✓.
- `:212–216` named-ghost arm runs after the unique arm and before
  monhealthdescr, on `mptr == PM_GHOST && has_mgivenname` ✓ (the
  `#if 0` hardfought arm is dead). `mptrNdx` is `mptr.mndx`, and the
  imitator arm has not run yet ✓.
- `:217` monhealthdescr: body is `#if 0`'d to an empty string in
  `pager.c`, so omitting the call is exact ✓.
- `:260–263` `else if (mptr == PM_GHOST)`: placed after the imitator
  arm and before `isshk`, matching the C else-if order. C resets `mptr`
  at the end of the imitator arm, but this arm is only reached when not
  an imitator, so `mptr == mtmp->data` in both ✓.

`passive` AD_STON (`:5935–5956`):
- `attk_protection((int) aatyp)`, AT_MAGC → W_ARMG override ✓.
- Five-clause unprotected test, same clauses and order: `0`; gloves
  with `!uarmg && !uwep && !wep_was_destroyed`; boots; helmet;
  cloak|gloves needing both ✓.
- `!Stone_resistance && !(poly_when_stoned(youmonst.data) &&
  polymon(PM_STONE_GOLEM))` — short-circuit keeps polymon from running
  when resistant ✓; `poly_when_stoned` gets `game.mvitals` for the
  G_GENOD test ✓.
- `done_in_by(mon, STONING)` then `M_ATTK_DEF_DIED` ✓. On gameover the
  JS returns early (file idiom for C's longjmp); a life-saved hero
  falls through to `M_ATTK_DEF_DIED` as in C ✓.
- No RNG in the arm (the case consumes no dice beyond the shared
  passive head), so the RNG stream is unchanged.

Other C caller `mhitu.c:1925` is already wired (`js/mhitu.js:626`).
Cosmetic only: one `buf += alt ? …` line gained two stray leading
spaces.

## Hallucinations / overclaim

None. "Named: none" holds: every omitted piece is C-dead (`#if 0`) or a
platform flush.

## Density

~50 JS lines closing the rest of a 161-line body plus its missing
caller: acceptable for a finishing restart.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify done_in_by --base
af4f4ca65~1 --reach-all`:
- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log. The death path is also covered by this audit's full
`sessions` run (see the journal crumb).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
