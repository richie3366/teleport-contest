# Review 2972 — 318b3a5e7 — study_book asks through y_n (ynchars → query_menu)

- SHA: `318b3a5e7` (near-pass cliff; owner = writer `study_book`, 1 row)
- D-entry: D-4132; Ledger: study_book ported
- `js/` diff: `js/spell.js` +3/−3

## Intent vs deliverable

Promise: spell.c study_book asks its two questions with `y_n()` =
`yn_function(query, ynchars, 'n', TRUE)` (:571, :593). With
`query_menu` on, cmd.c's yn menu path recognises the `ynchars` pointer
and shows a menu. JS passed the literal `'yn'`, which
`yn_menuable_resp` compares by identity (as C compares pointers), so it
printed the tty «… [yn] (n)» prompt instead. Diff: both sites call
getline.js `y_n`. Promise = diff.

## Inventory

- `study_book` — spell.js:1186, :1206; C spell.c:569–572, :591–594.
- Callee `y_n` — getline.js:2067 → `yn_function(query, ynchars, 'n', true)`
  (C hack.h `#define y_n(query) yn_function(query, ynchars, 'n', TRUE)`).

## C ↔ JS fidelity

```c
if (y_n("Refresh your memory anyway?") == 'n') return 0;        /* :571 */
if (y_n(qbuf) != 'y') { spellbook->in_use = FALSE; ... }        /* :593 */
```

The JS sites keep the same comparison (`=== 'n'`, `!== 'y'`), the same
`in_use = false` / `return 1` on decline, and the same qbuf text
(«This spellbook is %sdifficult to comprehend.  Continue?»). The only
change is the response-set **identity** plus the `addtohistory` TRUE
argument that `y_n` adds. The old `'yn'` call left that argument at its
default. No RNG.

## Hallucinations / overclaim

None. The D-log names the 23 other `'yn'` literal sites (`grep -rn "'yn'"
js/`). Each is a C `y_n` / ynchars site in some other file that skips
the menu under query_menu. The memory file describes the same family.

## Density

Two call sites in one function, the fix the measured row needed.

## Verification

```text
verify study_book (--base 318b3a5e7~1): 1 blocked
  scen-options-Priest-50355006: PASS → PROGRESS
```

Exact match with the D-log.

## Actionable C-wrongs

None in spell.c. The 23 `'yn'` literal sites are cross-file debt. Each
needs a corpus row before it becomes queue work (§10.19).

Verdict: **ACCEPT**
