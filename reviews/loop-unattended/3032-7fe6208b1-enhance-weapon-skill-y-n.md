# Review 3032 — 7fe6208b1 — enhance_weapon_skill asks through the live y_n()

- SHA: `7fe6208b1` (cliff; board row enhance_weapon_skill,
  scen-options-Knight-50557414 s87, C Yes/No menu vs JS «[yn] (n)»)
- D-entry: D-4192; Ledger: enhance_weapon_skill ported
- `js/` diff: weapon.js +5 −3

## Intent vs deliverable

Promise: weapon.c enhance_weapon_skill asks `y_n("Advance skills without
practice?")` (`:1340`), which passes the shared `ynchars` table. cmd.c
yn_menuable_resp offers the Yes/No menu only for those tables (pointer
compare, `:5393–5399`). JS passed the string literal `'yn'`.

Diff: the import `yn_function` becomes `y_n`, and the call becomes
`await y_n(...)`. The promise matches the diff.

## Inventory

- enhance_weapon_skill — weapon.js:1120+ (C weapon.c:1320+, query `:1340`).
- y_n — getline.js:2067, new import; its body is
  `return yn_function(query, ynchars, 'n', true)`.
- yn_function — import dropped.

`sym.mjs` on the re-pointed and dropped symbols:

```text
y_n              js/getline.js:2067   sync
yn_function      js/getline.js:2108   ASYNC — await required
```

y_n is a sync wrapper that returns yn_function's Promise, and the call
site awaits it. `grep -anw yn_function js/weapon.js` finds only the
comment at :1134, so dropping the import is safe (memory: a missed use
once crashed 145 sessions; checked).

## C ↔ JS fidelity

C `:1339–1341`:

```c
if (wizard && y_n("Advance skills without practice?") == 'y')
    speedy = TRUE;
```

hack.h `y_n(query)` is `yn_function(query, ynchars, 'n', TRUE)`. The JS
wrapper passes the same table object, default and addcmdq. The table is
what yn_menuable_resp keys on, so a query_menu player now gets the menu
(cmd.c yn_function_menu `:5416–5463`), as the C recording shows. The
`wizardMode()` guard and the `=== 'y'` test are unchanged.

## Hallucinations / overclaim

None. The D-log names the 26 remaining `'yn'` literal sites across other
C files as a mirror family, to be fixed with their own C file. CURRENT
**Next** already carries that rule.

## Density

One call site and one import on the cliffs-head owner, which is also
the writer. Right-sized.

## Verification

```text
verify enhance_weapon_skill --base 7fe6208b1~1 --no-reach
  enhance_weapon_skill: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                        (scen-options-Knight-50557414: PASS)
```

This reproduces the D-log.

## Actionable C-wrongs

None in this diff. The `'yn'` literal family stays a named mirror
family. It has no Must-fix row because no corpus row is blocked on it.

Verdict: **ACCEPT**
