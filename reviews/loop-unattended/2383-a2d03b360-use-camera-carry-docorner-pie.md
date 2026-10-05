# Review 2383 — a2d03b360 — use_camera wording + carry_count arm + docorner paging + use_cream_pie can_blnd (D-3441)

- SHA: `a2d03b360` — "Open head: use_camera swallowed wording + carry_count empty-invent arm + docorner paging gates + use_cream_pie live can_blnd (D-3441)."
- js/: `js/apply.js` (+10/−18), `js/display.js` (+10/−6), `js/pickup.js` (+1/−1). Ledger: all four ported, Left open none.
- Method: full C↔JS on all four (≤10-function SHA); caller scan for the docorner paging path; re-measure verify on all four.

## Intent vs deliverable

Subject promises four arm completions: (a) use_camera's hardcoded "'s stomach" → s_suffix+mbodypart, (b) carry_count's `[]`-truthy NULL-arm bug, (c) docorner's missing ystart_between_menu_pages refresh-only gates, (d) use_cream_pie's ublindf-gated subset → live can_blnd. The diff delivers all four plus two import-block name additions; one 8-line subset deleted. Nothing else.

## Inventory

| JS function | File:line | C locus | Change |
|---|---|---|---|
| `use_camera` | js/apply.js:1036–1037 | apply.c:96–98 (swallowed arm) | hardcoded `'s stomach` → live s_suffix+mbodypart |
| `carry_count` | js/pickup.js:1476 | pickup.c:1687–1694 (NULL arm) | `game.invent \|\| umoney` → `(game.invent?.length \|\| umoney)` |
| `docorner` | js/display.js:7610–7643 | wintty.c:3650–3720 (gates :3686/:3716) | `paging` const gates blank loop + botlx/bot tail |
| `use_cream_pie` | js/apply.js:1108–1109 | apply.c:3584 + mondata.c:343–354 | live can_blnd; 8-line subset deleted |
| imports | js/apply.js:148 | — | AT_WEAP added to existing mhitm block (can_blnd already imported :110) |

Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords/seeds. Ledger: all four rows ported; docorner's old omit ("ystart arm still blanks rows") retired and replaced with the standing audit note — correct, the shipped code is exactly that arm. The D-log Named bullet carries all four lines (no finish paste — verified each row's omit/note).

## C ↔ JS fidelity

**use_camera — C `apply.c:96–98`.** C: `You("take a picture of %s %s.", s_suffix(mon_nam(u.ustuck)), mbodypart(u.ustuck, STOMACH));` JS is the identical construction; all four names verified imported (do_name.js:81 s_suffix+mon_nam, polyself.js:142 mbodypart, const block STOMACH). The old hardcoded `'s stomach` was wrong for s/z-final names and non-STOMACH-centered monsters alike. (CURRENT debt 2366.1, a s_suffix-helper corner, lives in the shared helper, not this arm.) Confirm.

**carry_count — C `pickup.c:1687–1694`.** C: `if (gi.invent || umoney)` selects the "you cannot … any more" arm, else the "too heavy" arm. JS `game.invent` is `[]` when empty (truthy) — the old code took the arm unconditionally whenever the array existed. The fix `game.invent?.length || umoney` restores NULL⇔empty exactly:

- empty pack + no gold: `0 || 0` → falsy → "too heavy" arm ✓ (C: NULL + 0 → else)
- empty pack + gold: `0 || n` → truthy ✓ (C: NULL + n → if)
- non-empty pack: `len || …` → truthy ✓
- null invent: `undefined || umoney` → falls through ✓

`umoney = money_cnt(game.invent)` is a number (js/pickup.js:1383), so no truthiness trap remains. Callers (pickup.c:1736/:1839 → js/pickup.js:1529/:1616) pre-wired, arm internal. Exact — debt-1576 class closed per the CURRENT prescription.

**docorner — C `win/tty/wintty.c:3650–3720` (full body read).** Line-by-line gate check:

| C | JS | Match |
|---|---|---|
| `if (ystart_between_menu_pages) ystart = …` | `y0 = max(0, ystart\|0)` | exact |
| `if (!ystart_between_menu_pages) cl_end()` (:3686) | `if (!paging)` blank loop | exact |
| CLIPPING row_refresh (offy/clipy) | same skip + row_refresh | exact (pre-existing) |
| `if (ymax >= offy && !ystart_…) { botlx; bot(); }` (:3716) | `if (y1 >= 22 && !paging)` | exact (status offy 22) |

Caller scan (whole js/): the sole live caller is invent.js:3110 with ystart 0 — the gate is behavior-preserving today, and the D-log Callers bullet says so explicitly, assigning C :1523's paging caller to unported process_menu_window (C 288 lines, MISSING). Body whole; missing caller named in D-log + code doc. Confirm — not a silent stub: inert-by-caller, disclosed, with the wiring owner identified. Full 44/44 on shared display.js corroborates no behavior change.

**use_cream_pie — C `apply.c:3584` + `mondata.c:343–354`.** C passes `(NULL, &youmonst, AT_WEAP, obj)`; JS passes `(null, game.youmonst, AT_WEAP, pie)` where pie is obj or its same-otyp split child (js/apply.js:1085–1095 splice; can_blnd reads only otyp — no divergence). Live AT_WEAP arm verified against C :343–357:

| C arm | JS | Match |
|---|---|---|
| pie + `Blindfolded` → FALSE (:344–346) | `is_you && EBlinded` → false (Blindfolded≡EBlinded, youprop.h:96) | exact |
| venom + `ublindf \|\| ucreamed` → FALSE + visor (:347–351) | same + `check_visor = true` | exact |
| POT_BLINDNESS → TRUE (:352–353) | `return true` | exact |
| else → FALSE (:354) | `return false` | exact |
| magr==youmonst + uswallow → FALSE (:356–357) | `magr === game.youmonst && u.uswallow` | exact |

So the deleted subset's `ublindf` gate on the pie path was non-C (ublindf protects vs venom/Claw, never vs pie) — correct deletion, and the D-log's claim is verified, not trusted. Required symbol output: `sym.mjs can_blnd` → `js/uhitm.js:359 sync`; apply→uhitm edge pre-exists (name in block :110), apply→mhitm edge pre-exists (AT_WEAP added :148). Zero `can_blnd_cream_self` references remain. The `rnd(25)` → ucreamed → make_blinded tail is untouched and matches C :3585–3588.

## Hallucinations / overclaim

None. The D-log admits D-3421 "whole" was overclaimed for use_camera and corrects it here — the opposite of overclaim. Nits (not C-wrongs): use_cream_pie's doc "Named omissions: invent-array wiring when splitobj child is not pushed" reads stale next to the live splice/push code (js/apply.js:1085–1095); docorner's measured PARTIAL (C 34/JS 16) vs declared ported rests on the pre-existing "RESIZABLE/PERMINV N/A" note for build-excluded #ifdef arms.

## Density

≤10-function SHA, whole Method per function. Verdict per function:

| Function | Verdict |
|---|---|
| use_camera | whole ✓ (swallowed wording now C-constructed) |
| carry_count | whole ✓ (NULL arm truth table verified above) |
| docorner | body whole, paging caller named ✓ (MISSING process_menu_window) |
| use_cream_pie | whole ✓ (live gate; subset provably non-C) |

No audited declarations, no Left-open items. Not a batch commit (Open-head iteration), §10.17 batch rules N/A. Each function has its Ledger entry and its Verify line. Callee closure: s_suffix/mon_nam/mbodypart/STOMACH all pre-imported (verified lines 34/81/142); can_blnd + AT_WEAP on pre-existing edges — no new import edge anywhere in the SHA.

## Verification

Re-measured (`hidden-proxy.mjs verify use_camera,carry_count,docorner,use_cream_pie --base a2d03b360~1 --reach-all`, one call):

| Function | Blocked at parent | Reach line |
|---|---|---|
| use_camera / carry_count / docorner / use_cream_pie | 0 (vacuous, disclosed) | smoke 24/24 REACH-OK each |

0 regressed. Matches the D-log exactly, including full 44/44 on shared display.js (auto-triggered by the display.js hunk — correct gate for a shared-file change). No queue row cited blocks for any of the four, so the vacuous verifies are correctly presented as coverage-row notes.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
