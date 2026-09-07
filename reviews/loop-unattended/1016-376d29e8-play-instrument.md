# Review 1016 — 376d29e8 — do_play_instrument ynq + gates + sounds (D-2046)

Metadata: SHA `376d29e8`, D-2046, Open-row port (queue
owner `do_play_instrument`; screen-first yn-default
rows, 0 RNG blocked). js/ touches 1 file: `music.js`
(~30 insertions). No stamp owed.

## Intent vs deliverable

Subject promises: ynq default `'y'`→`'q'` ×2, wind
`can_blow` gate, ESC-only nevermind, Mastermind
Soundeffect order. Diff delivers all four plus C
citation comments. Promise ≡ diff.

## Inventory

- Changed JS: `do_play_instrument` (`js/music.js`),
  Mastermind tumbler/gear block.
- `sym.mjs`: `can_blow js/mondata.js:647 sync`
  (real body, not stub — silence via `mon_msound`
  inference, full `is_silent` table named in its doc
  comment); `Soundeffect js/sndprocs.js:36 sync`
  (unawaited calls correct);
  `thesimpleoname js/objnam.js:2540 sync` (imported,
  not a 2nd clone); `se_*` ids from generated data.
  `--can music.js mondata.js`: ALREADY statically
  imported — no new edge. No symbol deleted or
  re-pointed.

## C ↔ JS fidelity

C loci (read directly): `do_play_instrument`
`music.c:763-796`, Mastermind `:870-879`,
`hack.h:1330` (`#define ynq(query)
yn_function(query, ynqchars, 'q', TRUE)`).

Branch-by-branch confirm:

- Gate ≡ C `:763-773` as `if/else-if`: Underwater →
  `You_cant` (text-identical, kept as `pline`);
  six wind otyps + `!can_blow(youmonst)` →
  `You("are incapable of playing %s.",
  thesimpleoname(instr))` verbatim, `ECMD_OK`.
  Replaces a "deferred → allow" hole with the live
  callee (same call shape as the apply.js whistle
  arms, D-1007).
- Both `yn_function(…, 'q')` ≡ the `'q'` macro
  default. Display-only here (canned answers
  identical), but C-literal.
- Nevermind back to `charCodeAt(0) === 0x1b` only ≡
  C `:792` (`*buf == '\033'`; empty-tune plays).
- Sounds ≡ C `:870-879` order: click+gear before
  the joint `You_hear`, click-only in the else,
  gears-only silent. No-op without SND_LIB ⇒ zero
  screen/RNG risk on all corpus paths.

Callee closure: every touched arm's callees LIVE
(`can_blow`, `Soundeffect`, `thesimpleoname`,
`yn_function`, `You_hear`). The four
corpus-unreached arms (can_blow-blocked, empty-tune,
passtune-`'q'`, sound arms) are C-cited and
explicitly stated unverified — honest, shippable
(no STUB in any arm). `Hero_playnotes`/`obj_to_instr`
stay named; underwater/`extract` arms pre-existing
text-identical `pline`, untouched.

## Hallucinations / overclaim

None. The "display-only here" qualification on the
yn default and the four-way unverified-arm
disclosure are the opposite of overclaim.

## Density

One function, ~30 insertions, one symptom (yn
default line) + same-function gate/sound arms.
Right-sized §2b unit.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates
  (full `--rulecheck` once for the iteration — see
  review 1017).
- Re-measured `hidden-proxy verify do_play_instrument
  --base 376d29e8~1`: `3 PASS, 0 moved past,
  0 unchanged, 0 worse → PROGRESS` (all three
  sessions PASS) — non-vacuous (3 blocked at
  baseline), matches the D-log exactly.
- Green 2/2 + strict ×2, cohort 7/7 per pasted tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
