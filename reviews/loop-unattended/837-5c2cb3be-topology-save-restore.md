# Review 837 — 5c2cb3be — save_dungeon_topology persist/restore (D-1867)

Metadata: SHA `5c2cb3be`, D-1867, `js/dungeon.js` (+49, two new exported
sync fns + const), `js/save.js` (+14, import + write/restore arms), map +
queue/archive stamps. No `allmain.js` change.

## Intent vs deliverable

Subject promises the save/restore topology fix for the
`maybe_generate_rnd_mon` corpus owner (post-restore `rn2(50)` vs C
`rn2(70)`). Diff delivers exactly that: serialize/restore the special-level
`d_level`s + branch dnums, wired into `dosave0`/`try_restore_save`. Matches.

## Inventory

New: `TOPOLOGY_DNUM_FIELDS`, `save_dungeon_topology()`,
`restore_dungeon_topology()` (both sync, exported; `sym.mjs` confirms).
Changed: `dosave0` payload write, `try_restore_save` restore arm, one
extended dungeon.js import in save.js (pre-existing edge — no new module
coupling). No deleted symbols.

## C ↔ JS fidelity

C locus 1 — `maybe_generate_rnd_mon` (`allmain.c:161–168`, via csym):
`rn2(udemigod ? 25 : depth(&u.uz) > depth(&stronghold_level) ? 50 : 70)`.
JS rate ternary was already right (verified in a prior iter; untouched
here) — the divergence was the *input*: after S+restore,
`game.stronghold_level` was undefined, so `depth()` fell back shallow and
the comparison flipped 70 → 50. Cause correctly localized to state, not to
the ternary.

C locus 2 — `save_dungeon`/`restore_dungeon` (`dungeon.c:148–206` /
`:222`): `Sfo_dgn_topology` / `Sfi_dgn_topology` persist the whole
`struct dgn_topology` (`hack.h:358–385`). Field-by-field coverage check:
C holds 26 `d_level`s + 5 dnums (tower/sokoban/mines/quest/tutorial).
JS `LEVEL_MAP` covers all 26 levels (oracle/bigroom/rogue/medusa/
stronghold-as-castle/valley/wiz1-3/juiblex/orcus/baalz/asmodeus/portal-as-
fakewiz1/sanctum/earth/water/fire/air/astral/qstart-qlocate-nemesis-as-x-*,
knox/mineend-as-minend/sokoend-as-soko1) plus exactly the 5 C dnum fields. Full coverage,
no silent drop. Shape matches `assign_level` (`{dnum, dlevel}` plain), so
restored fields are indistinguishable from fixup-written ones. Old saves
(absent key) keep current values — backward-compatible, and C-faithful in
effect since C also restores branches/dungeons verbatim without re-running
init/fixup side effects (the commit's "NOT re-run" named note describes C
behavior, not a new omission).

No RNG in the changed code (pure serialization); branch order N/A.

## Hallucinations / overclaim

None. "No allmain.js change — the rate ternary was already right" is stated
up front rather than claiming a ternary port. The corpus recipe (two-segment
save/restore) is concrete.

## Density

One cause, two already-coupled modules (~63 JS lines). Right-sized. Full
`44/44 sessions` run voluntarily after the heuristic skipped it (save path
is shared) — good judgment, including the save/restore session.

## Verification

Re-ran `hidden-proxy.mjs verify maybe_generate_rnd_mon --base 5c2cb3be~1`
myself: `1 blocked → catchup-after-restore-seed0015-valk: PASS →
PROGRESS`. D-log claim true. Green + strict ×2 + cohort + full 44/44 per
D-log. Rule #2 clean (re-ran `imports.mjs --rulecheck` this iteration).
No FORCE/DIAG/seed/coordinate hits in the diff. Queue hygiene: popped the
owner row, refilled 5, zero `- [x]` leftovers.

## Actionable C-wrongs

None. Named items (`dungeon_topology` vestige, `depth()` fallback) are map
notes, not contradictions.

Verdict: **ACCEPT**
