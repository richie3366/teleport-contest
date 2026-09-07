# Review 1010 — e2c5bc79 — hmon_hitmon_weapon_ranged boomerang tail (D-2040)

Metadata: SHA `e2c5bc79`, D-2040, Must-fix from review 1006
(C-wrong 1). js/ touches 1 file: `uhitm.js` (+30/−? small).
No stamp owed (Must-fix row archived in-commit).

## Intent vs deliverable

Subject promises: port the `uhitm.c:901–917` boomerang tail
dropped by D-2036 (review 1006 C-wrong 1). Diff actually adds:
the tail arm inside `hmon`'s ranged branch, three import
extensions (`rnl`, `uwepgone`, `useup`), one `BOOMERANG` const.
Promise ≡ diff. The message honestly keeps the two sibling
Must-fix rows queued (silver disjunct, caitiff await).

## Inventory

- Changed JS: `hmon` ranged branch in `js/uhitm.js` (+1 arm).
- New imports: `rnl` (rng.js), `uwepgone` (wield.js), `useup`
  (invent.js) — all extensions of edges, no new-clone adds.
- `sym.mjs`: `useup js/invent.js:4093 sync` live export
  (imported, not a 5th local clone); `rnl js/rng.js:105
  sync`; `uwepgone js/wield.js:317 ASYNC` (awaited ✓);
  `yname` export live + 4 pre-existing clones incl.
  `js/uhitm.js:3022` (touched by nothing here). No symbol
  deleted or re-pointed, so the delete/re-point sym rule is
  vacuous.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/uhitm.c:884-917` (34 lines,
via `csym.mjs`; caller at `:1086`). Branch-by-branch confirm:

- Shade/`rnd(2)` (`:888–892`): pre-existing from D-2036,
  untouched. Silver (`:893–897`) still narrow at this SHA
  (`hates_silver(mon.data)`); honestly queued as C-wrong 2,
  fixed by the next commit — not a new gap.
- Tail conjuncts (`:901–902`): `!hmd->thrown && obj ==
  uwep && obj->otyp == BOOMERANG && rnl(4) == 4-1` →
  JS `!thrown && obj === game.u?.uwep && obj.otyp ===
  BOOMERANG && rnl(4) === 3`. Exact: C `thrown` is
  `int HMON_xxx (0 => hand-to-hand)` (`:821`), and
  `HMON_MELEE = 0` (`js/const.js:1683`), so `!thrown`
  ⟺ melee on both sides (same idiom already at
  `uhitm.js:874`). Single `rnl(4)` draw, short-circuit
  order preserved.
- Body (`:903–916`): `more_than_1 = quan > 1L` →
  `(obj.quan | 0) > 1`; pline format string verbatim
  (`mon_nam`, `"one of "` conditional, `yname`);
  `if (!more_than_1) uwepgone()` awaited;
  unconditional `useup(obj)`; `hittxt = true`;
  shade-gated `dmg++`. The deliberately missing
  `obj = null` is correct — C nulls only the
  helper-local parameter copy; the caller keeps `obj`.
- `yname` is the pre-existing local clone
  (`carried ? 'your' : 'the'` + `cxname`); wielded ⇒
  carried ⇒ `"your X"`, identical to C on this arm.
  No new clone added. (Nit, not a wrong: clone reads
  `cxname` where C reads `xname`; agrees absent a
  user-called name on the boomerang.)

Callee closure: every arm callee LIVE (`rnl`, `uwepgone`,
`useup`, `mon_nam`, pre-existing `yname`). No STUB, no
OMIT needed — no new Named rows, correctly.

## Hallucinations / overclaim

None. "Review-measured C-wrong, not a corpus first-diff"
is accurate; the D-log states the sibling rows stay queued
(they do — archived only by f536bbde/d01aa3bb).

## Density

One arm, one C locus family, ~30 insertions. Below the
80-line §2b band but this is Must-fix (one item, alone —
explicitly allowed), and the arm is indivisible from its
RNG/state surface.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates,
  fastforward, or hardcoded coordinates (rule2 PASS in
  the verify tail; full `--rulecheck` run once for this
  iteration — see review 1017).
- Re-measured `hidden-proxy verify do_attack --base
  e2c5bc79~1`: `0 session(s) blocked on it (0 at
  baseline, 0 in the working scoreboard)` — confirms the
  D-log's "vacuous verify is NOT a corpus PASS" line is
  honest; no false PROGRESS claim.
- Green 2/2 + strict ×2, cohort 7/7 per the pasted
  verify tail (Must-fix with zero corpus blocks, so
  public gates carry the ship — stated explicitly).

## Actionable C-wrongs

None. (Silver predicate + caitiff await were already
queued Must-fix rows at this SHA, shipped by the next
two commits.)

Verdict: **ACCEPT**
