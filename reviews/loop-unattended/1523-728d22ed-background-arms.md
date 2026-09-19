# Review 1523 — 728d22ed — insight.c background arms (D-2564)

## Metadata

- SHA: `728d22ed`
- D-id: D-2564. Next index: 1523.
- Files: `js/invent.js` (+86/−~15: bigroom
  clause, mission adverb + actually/started-out
  on both builders, Upolyd form line +
  `actually` role + `normally` handedness on
  `doattributes`), `js/insight.js` (1-char:
  default-arm spacing).
- C locus: `nethack-c/upstream/src/insight.c:467–722`
  (`background_enlightenment`, 256 L; `csym.mjs`
  range — JS splits it across the final
  `enlightenment()` builder + BASIC
  `doattributes`, pre-existing architecture)
  plus `show_achievements` `:2242–2403`
  (default arm `:2393–2396`).

## Intent vs deliverable

Subject promises: missing Background arms in C
order on both builders + the achievements
default-arm spacing (same-file rows). Diff
delivers exactly that. Promise matches
deliverable. No RNG in C; none added (bait
grep 0 hits incl. `rn2`).

## Inventory

- New arms in `enlightenment()` final builder:
  mission adverb, actually/started-out block.
- New arms in `doattributes()`: ` Background:`
  header (was pushed with the block — now
  first), Upolyd form line, `actually` role,
  mission adverb (final=0 legs), actually/
  started-out, `normally` handedness.
- One-char fix: `show_achievements_lines`
  default → one leading space.
- Callees, all LIVE or pre-existing scope:
  `Is_bigroom` (`const.js:3259`, verified
  Lcheck-equivalent), `Blind()`
  (`invent.js:342`), `align_str`,
  `u_gname`, `genders`, `just_an`,
  `pmname`, `vampshifted`,
  `body_part_latebound`, `background_*_clause`
  helpers. All scope vars (`female`,
  `innategend`/`initgend`, `atype`, `hand`,
  `opposed`, `turns`) verified defined in both
  builders.
- No deleted symbols → no clone→import audit
  (`Is_bigroom` joins an existing edge).

## C ↔ JS fidelity

Against C `:467–722`:

- Dungeon clause: `else if (Is_bigroom &&
  !Blind)` in C position after rogue ✓; the
  doc comment un-names the omission in-commit ✓.
- Mission adverb (`:532–554`): nested ternary
  verified arm-for-arm — helm
  currently/temporarily, conversion
  now/belatedly, atheist nominally
  (`!gnostic && moves > 1000`), else empty;
  final builder keeps both past-tense legs,
  `doattributes` keeps the final=0 legs ✓.
  `, ${adverb}on a mission` ≡ C `%s` slot ✓.
- Actually/started-out (`:574–587`):
  `difalgn` 1+2 build, `& 1` → report
  permanent + mask, `difgend || difalgn` →
  `" You started out %s%s%s."` with the
  `" and "` join — exact on both builders,
  after pantheon, before handedness (C order) ✓.
- Upolyd form (`:490–506`, doattributes):
  `currently ` (final=0), current
  `flags.female` (`female =
  game.flags?.female` — current, per the C
  comment), cham phrasing, `just_an` vs
  `"in "` fork ✓.
- Role `actually ` (`:517`, both builders;
  two stale `:529` cites corrected — verified
  the new cite points at the `Strcpy`) ✓.
- Handedness (`:593–594`, doattributes):
  same Upolyd-gated expression as the final
  builder — consistent in-JS (the gate itself
  predates this SHA) ✓.
- Achievements default: `" [Unexpected
  achievement #%d.]"` — one space, verified;
  the 2-space string was wrong ✓.
- Named: SCORE_ON_BOTL (`config.h`
  commented-out — dead) ✓; standalone-window
  branch (sole C caller `show_conduct` passes
  its window; JS has no window lifecycle) ✓;
  `eos()`/`enlght_out` folds (architectural) ✓.

Nit (not queueable): the doattributes Upolyd
block falls back to `mons(u.umonnum)` when
`youmonst.data` is missing — unreachable
(Upolyd implies data set), harmless.

## Hallucinations / overclaim

None. Every added arm cites its C range and
matches; the named list is dead-or-
architectural, accurately described.

## Density

Arms across two builders + 1-char fix, two
files, ~90 insertions. Right-sized per §2b
(same-file coverage rows batched, as required).

## Verification

- D-log: `verify.mjs --fn
  background_enlightenment` → PASS, honestly
  framed as disclosure path / 0-blocked.
- Re-run here: `hidden-proxy.mjs verify
  background_enlightenment --base 728d22ed~1
  --reach-all` → 0 blocked both trees +
  smoke 24 PASS → REACH-OK; same for
  `show_achievements` (24 PASS → REACH-OK).
  Both match the D-log's "fixed smoke spread"
  framing.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits.

## Actionable C-wrongs

None. Arm order, adverb legs, scope vars,
caller shape, and the named omissions all
check out against pinned C.

Verdict: **ACCEPT**
