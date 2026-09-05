# Review 830 — bea18bd9 — mkroom.c fill_zoo COCKNEST statue + ANTHOLE (D-1860)

Metadata: SHA `bea18bd9`, D-1860, `js/mklev.js` only (~+60). No Must-fix open.

## Intent vs deliverable

Subject promises `antholemon()` + ANTHOLE pm arm + COCKNEST statue arm + ANTHOLE
food arm in C RNG order, reusing same-file `mk_tt_object`, plus
has_barracks/has_swamp flags. Diff delivers exactly that plus 3 PM_* consts.
Matches; no creep.

## Inventory

New: `antholemon()` (file-local — correct, C caller is one file), 3 consts,
3 `else if` arms, 2 flag arms. No deleted/re-pointed symbols.

## C ↔ JS fidelity

C loci read via `csym antholemon` (`mkroom.c:501–527`) and `mkroom.c:350–446`.
Confirm arm-by-arm:

- `antholemon()`: `ubirthday%3 + level_difficulty()`, `(indx+trycnt)%3` trio
  switch, `G_GONE` retry loop, null-if-all-gone — ported exactly, no RNG.
  `Math.trunc(Number(game.ubirthday)||0)%3` matches C's `time_t` cast for
  non-negative birthdays. Extra `mtyp<0` guard only fires if a const resolved
  to −1 (missing name); harmless.
- pm ternary (C `:355–360`): COCKNEST → cockatrice (pre-existing), ANTHOLE →
  `antholemon()` (added). Match.
- Per-square switch (C `:402–416`): COCKNEST `!rn2(3)` → `mk_tt_object(STATUE)`
  → `rn2(5)` container loot → reweigh; ANTHOLE `!rn2(3)` → FOOD_CLASS. JS
  identical, including single-evaluation `for (let i = rn2(5); i; i--)`.
  `mk_tt_object` is the same-file LIVE function with the C `rnd(10)` footprint;
  `add_to_container` LIVE from mkobj.js. No clone #3, no new edge — as claimed.
- Post-switch flags (C `:436–446`): has_barracks/has_swamp arms match.
- Named omits (SWAMP `mkswamp`, `tt_oname` RECORD stub shared with MORGUE,
  `do_mkroom` gate) are in the map section. No STUB in a live arm. No
  FORCE/DIAG/seed/RNG-log hits (`rulecheck` clean).

Evidence grade is *measured*: geom-probe cited in the subject (terrain
identical 436/436, only `@` placement differs) — correct use of §7 before
porting the RNG arms, not a FORCE.

## Hallucinations / overclaim

None. "C `rn2(3)=1 @ fill_zoo(mkroom.c:403)` vs JS `rnd(2)`" first-diff is a
real C-vs-JS RNG fact at the statue arm.

## Density

One C function family, one module, ~60 lines. Right-sized.

## Verification

D-log: syntax, rule2, hidden 1 PASS, green, strict ×2, cohort 7/7, full 44/44.
Re-ran `hidden-proxy.mjs verify fill_zoo --base bea18bd9~1` myself:
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(tour-Ranger-70021-d5-8-15-17-22: PASS). Claim true.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
