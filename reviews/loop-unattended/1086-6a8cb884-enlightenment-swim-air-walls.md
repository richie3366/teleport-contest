# Review 1086 — 6a8cb884 — enlightenment Swimming/Breathless/Passes_walls arms

Metadata: SHA `6a8cb884`, D-2120, `js/dbridge.js` (4 export flips) +
`js/invent.js` (same block in two builders, ~68 js/ insertions). No
prior review claims this SHA.

Intent vs deliverable: the subject promises the `insight.c:1758–1765`
transportation arms in both builders — Swimming, Breathless/Amphibious,
Passes_walls — reusing the D-1967 predicates via import-the-export,
with Wwalking deferred for lack of a `walking_on_water` export. The
diff delivers exactly that: 4 `function` → `export function` flips
(comment-only besides) plus the identical C-ordered block twice.

Inventory: zero new functions (4 export flips); two extended builders
(`enlightenment`, `doattributes`). Required `sym.mjs` output ( flips,
nothing deleted):

```text
hero_Swimming    js/dbridge.js:341   sync
```

(the other three flip identically; all sync hoisted declarations).

**C ↔ JS fidelity**: C block (`insight.c:1755–1765`, read in full):

- `if (Wwalking && !walking_on_water())` — deferred, NAMED in both the
  message and the code comment ✓ (no live export exists; inventing one
  would be a clone).
- `if (Swimming && (Underwater || !u.uinwater))` → JS bare
  `if (hero_Swimming())`. The parenthetical is a genuine tautology:
  `Underwater` is `(u.uinwater)` (`youprop.h:279`), so
  `(U || !U) ≡ TRUE` and the guard collapses to `Swimming` ✓ — the
  code comment proves the reduction instead of silently dropping it.
- `if (Breathless) … else if (Amphibious)` with
  `from_what(MAGICAL_BREATHING)` on both ✓ — JS keeps the
  if/else-if and the shared source ✓.
- `if (Passes_walls)` with `from_what(PASSES_WALLS)` ✓.
- Order Teleport_control (`:1688`) < swim block < Regeneration
  (`:1768`) ✓ in both builders.
- Tense: `you_can` = `enl_msg(You_, can, could, …)` (`:109`); JS
  `final ? 'could ' : 'can '` in `enlightenment`, fixed `'can '` under
  the `o()` overlay in `doattributes` (final=0 ^X path, matching the
  neighboring teleport-control arm) ✓.

Callee closure: the four predicates are CLONEs verified against C here
— D-1967 locals whose bodies encode the youprop disjunctions
(H||E||steed/data); this commit only widens visibility, changing no
body. Import form is `await import('./dbridge.js')` inside the async
builders; `--can invent.js dbridge.js hero_Swimming` → SAFE (hoisted
function declarations, same SCC shape as 1866 existing edges), so the
dynamic form is conservative but not hiding a cycle problem. No stubs,
no RNG (display-only; none in C arms either).

Hallucinations / overclaim: none. The "both builders" claim is real
(two hunks, tense handled per builder). Deferred list (Wwalking,
blocked-Lev/Fly, clinger) is named, not silent.

Density: ~68 insertions across two builders for a 4-arm C envelope —
one locus family, right-sized.

Verification: D-log claims `verify attributes_enlightenment` → 2 moved
past (Wizard-92120 → really_done@55; Barbarian-92079 →
mon_adjust_speed@62), green + strict + cohort. Re-measured:
`hidden-proxy.mjs verify attributes_enlightenment --base 6a8cb884~1`
→ `0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(Wizard-92120 → next_ident@57; Barbarian-92079 → mon_adjust_speed@62).
Wizard sits two steps further along than at commit time because the
later D-2121/D-2122 ports moved it past really_done since — forward
motion from subsequent fixes, not a regression of this SHA's claim.
Non-vacuous either way. No FORCE/DIAG/seed/coordinate reads in diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
