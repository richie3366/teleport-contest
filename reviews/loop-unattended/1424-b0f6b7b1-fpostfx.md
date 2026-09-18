# Review 1424 — b0f6b7b1 — fpostfx whole-body port (D-2465)

Metadata: SHA `b0f6b7b1`, `js/eat.js` only (new module-local `fpostfx` +
`done_eating` dispatch fix). Coverage gap (0 blocked), not a corpus
fix. D-log: D-2465.

## Intent vs deliverable

Promise: all 7 food post-effects in C order + the `done_eating`
dispatch fix (old code ran the post-effect inline for only 3 otyps and
skipped carrot/egg/eucalyptus/apple entirely). Diff ships all of it.
No second subsystem.

## Inventory

- Added: module-local `async function fpostfx` (correct — C staticfn);
  `done_eating` re-pointed to `await fpostfx(piece)` for every
  non-corpse meal (= C `eat.c:562–565`, verified).
- New edges, all import-the-export: `verbalize` (display.js, ported the
  previous commit), `You_hear`/`fall_asleep` (hack.js; async/sync per
  `sym.mjs`, used correctly), `livelog_printf` (pline.js),
  `Soundeffect` (sndprocs.js), `se_sinister_laughter` (generated
  const). New consts (`SICK_ALL`, `LL_CONDUCT`, `PM_DWARF`, `CARROT`,
  `EUCALYPTUS_LEAF`) and `AT_ENGL`/`AD_BLND` locals (= `monattk.h:21`/
  `:53`, both 11 — verified).
- No deleted/re-pointed clones for `sym.mjs` (`You_hear` joins the
  existing hack.js edge; the 12 `You_hear` clones elsewhere are
  pre-existing and untouched).

## C ↔ JS fidelity

C `eat.c:2509–2600` vs JS, arm by arm:

- Wolfsbane (`:2513–2516`): moved verbatim + await — exact.
- Carrot (`:2517–2521`): `!uswallow || !attacktype_fordmg(ustuck, ENGL,
  BLND)` → `make_blinded(ucreamed, TRUE)` — exact. The in-file
  `attacktype_fordmg` clone is pre-existing (`:364`) with a documented
  cycle reason; no new clone added.
- Cookie (`:2522–2528`): rumor + `!Blind` first-read `livelog_printf`
  conduct + unconditional `literate++` — exact.
- Jelly (`:2529–2559`): verbatim move (`piece`→`otmp` rename only);
  queen-morph break, gainstr, `±rnd(20)` HP with `rn2(17)` max-gain and
  cursed-death / rehumanize, `heal_legs(0)` unless cursed — intact.
- Egg (`:2560–2575`): `ismnum && flesh_petrifies` + `!Stone_resistance`
  (H||E||flat, codebase idiom) + `poly_when_stoned && polymon(GOLEM)`
  short-circuit + `!Stoned` + `"%s egg"` killer + `make_stoned(5, …,
  KILLED_BY_AN)` — exact (null-guards on `mons()`/`pmnames` are
  defensive, unobservable on valid indices).
- Eucalyptus (`:2576–2581`): `Sick`→`make_sick(SICK_ALL)` /
  `Vomiting`→`make_vomiting`, both uncursed-gated — exact, awaits
  correct (both async per `sym.mjs`).
- Apple (`:2582–2599`): cursed + `!Sleep_resistance` (H||E||flat) gate;
  dwarf+Hallu verbalize (string byte-exact); `Deaf || !acoustics` →
  `You("fall asleep.")` = `pline('You fall asleep.')` — exact, with
  `Deaf` = the verified `youprop.h:125` triple and `acoustics ===
  false` matching C's default-on; else `Soundeffect(…, 100)` (sync) +
  `You_hear` (awaited); `fall_asleep(-rn1(11,20), TRUE)` (sync,
  un-awaited) — exact. RNG in C order.

## Hallucinations / overclaim

None. The turns.md `fpostfx CARROT/EGG` omit retirement is real (both
arms live above); "Named: none new" accurate.

## Density

One 92-line C function + dispatch fix, one module: right-sized.

## Verification

- `hidden-proxy verify fpostfx --base b0f6b7b1~1 --reach-all` (re-run):
  0 blocked both sides (vacuous, as stated); smoke 24/24 PASS,
  0 regressed → REACH-OK. Matches. (The D-log's manual full-44 for the
  central-file change is superseded by this iteration's cadence run.)
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
