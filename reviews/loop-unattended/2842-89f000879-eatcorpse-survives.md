# Review 2842 — 89f000879 — eatcorpse survives lifesave/decline

## Metadata

- SHA: `89f000879d8ef6a3f28d9d18b3d2c7ad5b21d64c` (D-3998)
- Cliff writer: cprefx head (slime-meal continuation), 3 blocks
- js/ diff: `js/eat.js` 36 lines (3 arms × same gate); no new test
  (probe recipes named as collateral)
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: the acid/poison/cadaver arms treated losehp→done as
noreturn (`finish_losehp_done(); return 1`), aborting the meal
even when the hero survived via lifesave or a wizard "Die?"
decline — C has no check after those calls and eats on. Gate
the `return 1` on real death (`gameover` still set); survived →
fall through with no wail. 2 PASS + 1 unchanged (own cause).

Diff actually: all three arms restructured identically —
`if (gameover) return 1`, survived falls through, and the
previously unconditional `finish_maybe_wail()` moves into the
non-fatal `else`. Promise == diff.

## Inventory

- `eatcorpse` (`js/eat.js:2585+`, C `eat.c:1854-2018` via
  `csym.mjs`): 3-arm gate fix, bodies otherwise untouched.

## C ↔ JS fidelity

- C arms (`eat.c:1923-1943` read): acid `:1926`, poison `:1932`
  (`poison_strdmg`), cadaver `:1942` — each calls its damage
  routine with **no** death check after, falling through to
  delay/nutrition ✓. The subject's line cites match the call
  lines exactly.
- C `losehp` (`hack.c:4283-4290` read): `if (uhp < 1) {
  …; done(DIED); } else if (n > 0 && …) maybe_wail();` —
  the wail lives strictly in the non-fatal else-if ✓, so the
  survived-fatal path must not wail. JS restructure preserves
  the old behavior on old paths (fatal→return, non-fatal→wail)
  and adds only the C-mandated third path (survived→fall
  through, no wail) ✓.
- C `done` (`end.c:1112-1117` read): "Die?" decline →
  `savelife` → `survive = TRUE` → return ✓ — done() returning
  is C-real, the old "noreturn" comment was the bug.
- Death gate: only `really_done` sets `game.program_state.gameover
  = true` (`end.js:1145` read); `finish_losehp_done` drops
  losehp's JS-only marker before running done() (`:2028-2029`
  read). Post-call `gameover` ⟺ real death — the gate is exact.
- Caller: C `eatcorpse` is static, single caller `doeat`
  (`eat.c:2985` read: tmp==2 clears victual, tmp!=0 dont_start);
  JS `doeat` (`eat.js:4547`) same wiring, no signature change —
  survived-fatal now returns 0 → `start_eating` → cprefx, as C.

No RNG touched; branch order now C-equal on all three paths.
Diff grep clean; Rule #2 iteration-wide clean (review 2838).
No symbol deleted/re-pointed — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. "Real-death behavior unchanged" holds (gameover→return 1,
same as before). "No maybe_wail — JS losehp sets no wail flag
in the fatal path so none dangles" is consistent with the
restructure (the wail call moved, no flag exists to dangle).
The full-body audit claim (`:1855-2018` all live) is a stated
audit, and the one pre-existing extra (victual.piece write
`:2650-2654`) is disclosed rather than hidden. No-test call is
explicit and reasoned (recipes are collateral; harness
stale-fails on HEAD per CURRENT) — acceptable, not hidden.

## Density

Cliff phase §10.18: one cliff writer, one function, three
identical arms, code + ledger + verify in one handoff. The two
non-moving sessions (cprefx Wizard s512, eatcorpse Ranger s648)
keep specific, falsifiable Next attributions (single-glyph map
probe; slime-absence upstream state) — not claimed, not parked
without a recipe. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify cprefx,eatcorpse --base 89f000879~1 --no-reach`
- `verify cprefx: 2 PASS, 0 moved past, 1 unchanged, 0 worse`
  (Healer-610101 + Valkyrie-610121 PASS; Wizard-50156033
  still cprefx at s512)
- `verify eatcorpse: 0 PASS, 0 moved past, 1 unchanged, 0 worse`
  (Ranger-50250033 still eatcorpse at s648 — pre-existing,
  documented upstream-state writer)

Exact match to ship-time on both functions. Ship-time reach
24/24 + 15/15, green, strict, cohort 7/7, full 44/44 corroborate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
