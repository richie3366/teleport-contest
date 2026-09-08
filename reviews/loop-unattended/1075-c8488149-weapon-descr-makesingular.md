# Review 1075 — c8488149 — weapon_descr full switch + canonical is_graystone

Metadata: SHA `c8488149`, D-2109, `js/invent.js` (82 lines)
+ `js/objects.js` (17 lines). No prior review claims this SHA.

Intent vs deliverable: the subject promises the full `weapon_descr`
switch with the `makesingular` return, so a wielded dwarvish mattock
prints "mattock" not skill-name "pick-axe".
The diff delivers exactly that: it replaces the P_NONE-only `OC_NAME`
table + bare `skill_name` return with the six-arm C switch and the
`makesingular` wrap, plus a canonical `is_graystone` export.

Inventory: one rewritten function (`weapon_descr`), one new exported
helper (`is_graystone`), three extended import edges (`makesingular`,
`is_graystone`, `is_ammo`), file-local otyp consts.

**C ↔ JS fidelity**: C `weapon_descr`
(`nethack-c/upstream/src/weapon.c:87–142`, 56 lines), arm by arm:

- P_NONE otyp specials (CORPSE / TIN / EGG / STATUE / BOULDER / TOWEL /
  TIN_OPENER → OBJ_NAME; globby → "glob"; else
  `def_oc_syms[oclass].name`) ✓
- P_SLING ammo → stone / gem / class-name ✓
- P_BOW → arrow, P_CROSSBOW → bolt ✓
- P_FLAIL hook, P_PICK_AXE mattock (with the undiscovered-note) ✓
- default break, `makesingular` return ✓

JS matches in exact C order.
`skill_name` ≡ P_NAME is the pre-existing same-file function
(invent.js:4325, C-ref'd to `weapon.c skill_name`).
`objectNameStrs[otyp] || descr` ≡ OBJ_NAME (generated table; the
fallback is unreachable in practice).
`is_graystone` ≡ `obj.h:413` four-type disjunction
(LUCKSTONE / LOADSTONE / FLINT / TOUCHSTONE), verbatim.
Two deviations, both benign:

1. JS `if (!obj) break` in P_NONE where C dereferences
   unconditionally — C prototype is NONNULLARG1 and the D-log asserts
   all JS callers pass non-null, so the guard is dead defense.
2. `apply.js` / `iactions.js` keep file-local `is_graystone` clones —
   named as debt in the header rather than refactored.
   Note: `sym.mjs` shows a third clone (`u_init.js:1123`) the D-log
   does not name — map-debt bookkeeping for a future iter, not a
   C-wrong (see note under Verdict).

Required `sym.mjs` / `imports.mjs` output:

```text
is_graystone     js/objects.js:189   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/apply.js:281  js/iactions.js:453  js/u_init.js:1123
is_ammo          js/wield.js:127   sync
makesingular     js/objnam.js:1698   sync
ALREADY: invent.js already statically imports wield.js. No new edge needed.
```

Callee closure: `is_ammo` live; `--can` reports no new edge;
`makesingular` live; the remaining `u_init.js:1148 is_ammo` clone is
untouched and outside this envelope.

Hallucinations / overclaim: none.
"Full C switch in exact C order" checks out; the `chwepon` second hit
is correctly dismissed (enchant-weapon prints no wielding line);
`weapon_insight` arms are correctly assigned to a different C function.

Density: ~99 js/ insertions across two files, one C function family —
within §2b.

Verification: D-log cites hidden 1 PASS (Priest-92180) + green +
cohort + a manual full 44/44.
Re-measured (`--base c8488149~1`):

```text
scen-wish-Priest-92180: PASS
verify one_characteristic: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine PASS, not vacuous. Draw-free claim holds (string arms only).
No seed / step / coordinate read.

**Actionable C-wrongs**: none.
Note (not queueable): D-log names two `is_graystone` clone debts but
`sym.mjs` shows three (`u_init.js:1123` unmentioned).

Verdict: **ACCEPT**
