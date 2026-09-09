# Review 1156 — 74944545 — burnarmor case 3 gloves literal

Subject promises: `trap.c:143–146` case 3 passes literal `"gloves"`, not `gloves_simple_name` (D-2190, ships review-1152 Must-fix).
Diff actually adds: one-word change in `js/trap.js` `burnarmor` case 3 (`gloves_simple_name(item)` → `'gloves'`) + C-citation comment. No import change.

## Intent vs deliverable

Promise matches diff exactly. D-2186's stub deletion had regressed a previously-correct constant into `gloves_simple_name(item)`,
which returns "gauntlets" for identified gauntlets. The symptom was narrow and reproduced: worn identified leather gauntlets +
fire-trap burnarmor with `rn2(5)=3` printed "Your gauntlets smoulders!" where C prints "Your gloves smoulders!".

## Diff (whole `js/` hunk)

```diff
         case 3: {
+            // C trap.c:143-146 passes literal "gloves", never gloves_simple_name
             const item = hitting_u ? u.uarmg : which_armor(victim, W_ARMG);
             if ((await erode_obj(
-                item, gloves_simple_name(item), ERODE_BURN, EF_GREASE,
+                item, 'gloves', ERODE_BURN, EF_GREASE,
             )) === ER_NOTHING) continue;
             break;
         }
```

No other `js/` hunk in the SHA. `gloves_simple_name` stays imported (still C-correct at the four `water_damage` sites) — no deleted
symbol, no re-point, so no dangling-import risk.

## Inventory

- `burnarmor` case 3 (`js/trap.js`): literal swap only. All other cases untouched.

## C ↔ JS fidelity

C `trap.c:86–160` (`node scripts/csym.mjs burnarmor`). The five `rn2(5)` arms contrast exactly as the D-log claims:

| case | C descriptor | JS (post-fix) |
|------|--------------|---------------|
| 0 | `materialnm + helm_simple_name(item)`, else `"helmet"` | unchanged, matches |
| 1 | `cloak_simple_name(item)` / `xname(item)` / `"shirt"` | unchanged, matches |
| 2 | `"wooden shield"` literal | unchanged, matches |
| 3 | `"gloves"` literal (`burn_dmg(item, "gloves")`) | **fixed this SHA** |
| 4 | `"boots"` literal | unchanged, matches |

Only case 3 ever called a name function where C passes a literal, so the one-word fix completes the arm table — cases 0–1
genuinely compute names in C, cases 2–4 genuinely do not. Branch order, the `rn2(5)` dispatch, `erode_obj` inside `burn_dmg`,
and the `continue`/`break` structure are untouched by the diff. The D-log's secondary claim (old code evaluated the name fn
even when `item` is null, where C touches nothing) is accurate against the C line: C passes the literal unconditionally and
never dereferences the item for naming. No clone/stub/omit involved in this arm.

Symbol evidence (`node scripts/sym.mjs gloves_simple_name`):

```text
gloves_simple_name js/objnam.js:1246   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/fountain.js:973
```

The canonical export stands; this SHA neither adds a clone nor re-points the import — it removes the single wrong call site.

## Hallucinations / overclaim

None. "Match C" is earned: one literal, cited to `trap.c:143–146`, verified in the pinned body against all five sibling arms.

## Density

3-line Must-fix, shipped alone — correct per §2b (Must-fix stays one item, not glued). The small size is the queue row's size,
not a density failure.

## Verification

D-log states the corpus check is vacuous (review-sourced Must-fix, no corpus session blocked) and ships on public gates:
green 2/2, strict ×2, cohort 7/7. Re-measured this iteration:

```text
verify burnarmor: baseline 74944545~1 (scoreboard at 4740848f) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify burnarmor: no corpus session is blocked on it at 74944545~1 — a vacuous verify is NOT a corpus PASS.
```

The vacuous claim is true, explicitly labeled, and the D-log does not present it as a PASS. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate
gates (only hit is the commit-message prose). `node scripts/imports.mjs --rulecheck` → Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
