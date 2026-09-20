# Review 1649 — fd3686f4 — `eat.c` edibility_prompts remainder arms (D-2690)

Metadata: commit `fd3686f4`, D-2690, `js/eat.js` only (20 changed
lines: 2 imports, 1 const, 1 clone deletion, 1 arm widening). No
prior review claimed closed. Pops the brief-verified PARTIAL
`edibility_prompts` row (removed from the queue in this commit).

## Intent vs deliverable

Subject promises: iced-corpse age + defended-AD_DISE remainder
arms. Diff actually delivers exactly those two: the file-local
`peek_at_iced_corpse_age` clone deleted in favor of the live
`mkobj.js` import, and the `Sick_resistance` arm gains
`defended(game.youmonst, AD_DISE)`. Matches the promise.

## Inventory

Changed JS: `edibility_prompts` (js/eat.js:4054) — Sick arm only.
Deleted: local `peek_at_iced_corpse_age` clone (was js/eat.js:1003).
Re-pointed (sym.mjs outputs pasted in-session):
`peek_at_iced_corpse_age` → `js/mkobj.js:3058` sync export;
`defended` → `js/mondata.js:155` sync export. Both call sites of
the deleted clone (`eatcorpse` :2390 with `rn2(20)`,
`edibility_prompts` :4069 worst-case `/10`) re-point automatically
via the same name joining the pre-existing `./mkobj.js` edge —
no new module edge, no top-level TDZ (runtime-only reads).

## C ↔ JS fidelity

C locus: `edibility_prompts` `eat.c:2626–2731` (csym, 106 L —
body read through the tainted arms; the other ten prompt arms
were D-2361's, unchanged here), `Sick_resistance`
`youprop.h:69–70` (read: `HSick || ESick ||
defended(&gy.youmonst, AD_DISE)`), `AD_DISE 33` (`monattk.h:75`,
verified this session). Caller: sole C site `eat.c:2835` →
`js/eat.js:4148` (unchanged, still wired per D-log).

- Iced-corpse age: the deleted clone returned `otmp?.age ?? 0`
  ("on_ice deferred"); the live export (read in-session)
  applies the `on_ice` `ROT_ICE_ADJUSTMENT` correction. Both
  users now get the ice-adjusted age — the exact C-wrong the
  row named (over-counted `rotted` → spurious tainted/rotten
  prompts for iced corpses). Confirm.
- Sick arm: C `:2672`/`2680` gate on full `Sick_resistance`;
  JS now ORs `defended(game.youmonst, AD_DISE)` with a
  degenerate-state guard. `defended` (read in-session) ports
  the wielded-artifact + dragon-scales shape. Note C passes
  `&gy.youmonst` while JS passes `game.youmonst` — `defended`
  resolves hero-ness via `mon === game.youmonst`, so the call
  takes the hero path either way. Confirm.
- No RNG touched by this diff (the `rn2(20)`→`/10` worst-case
  substitution is pre-existing D-2361, C-cited at `:2659`).

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

None. "Named omissions: none in this function" is accurate for
`edibility_prompts` — all eleven arms plus both remainder arms
are now live. The D-log honestly scopes what it did NOT do
(eatcorpse, invent.js) instead of claiming them.

## Density

20 changed lines is below the §2b floor for a fresh port — but
this is a remainder close-out, not a fresh port: the row's whole
remaining gap was these two arms (the other eleven shipped in
D-2361), plus a clone deletion. The function is now complete;
there was nothing more in the row to ship. Acceptable, not
padding.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify edibility_prompts --base fd3686f4~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

1. (Debt, unqueued — same-file sibling, bigger branch) `eat.c`
   `eatcorpse` tainted/mild-illness arms still gate on the H/E
   flat triple: js/eat.js:2398 ("Sick_resistance / make_sick
   deferred") skips C `:1904–1917` (`if (Sick_resistance)` →
   "doesn't seem at all sickening" else `rn1(10,10)` +
   `make_sick` + pline), and js/eat.js:2438 gates C `:1939` on
   `!(HSick || ESick)` where C tests full `Sick_resistance`
   (macro incl. `defended(AD_DISE)`, verified above). A
   defended-but-not-H/E hero therefore takes the wrong branch
   in both arms. Disclosed in D-2690 with a falsifier; the fix
   needs `make_sick` liveness checked first, so it is its own
   one-iter row, not a silent stub in this commit. Next port
   iter should name it in the `turns.md` eat map line when
   popping it.

Verdict: **ACCEPT-WITH-DEBT**
