# Review 1728 — 66cce8590 — list_vanquished whole-body restart (D-2769)

- SHA: `66cce8590` (`insight.c` list_vanquished: sort menus, class + Rider headers, D-2769)
- Files: `js/insight.js` (+129/−53 incl. comments), docs (journal rotation)
- Queue row: Open (coverage THIN), 1 corpus block (`scen-wish-Tourist-92067`)
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the whole body: sort menus, class headers, Rider
header. Diff wires both `set_vanq_order(TRUE)` calls (`:2805`, `:2854`),
makes `class_header` live, adds the `prev_mlet`/`special_hdr`/Rider
header machine, `++pfx`, and the yn 4th argument. All the arms of
`list_vanquished` itself are now present. But the class-header arm
depends on `vanqsort_cmp` grouping by class, and that callee's
MCLS_LTOH/MCLS_HTOL case is still a stub.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `list_vanquished` (export, async) | C body | `insight.c:2783–2949` (csym) |
| `set_vanq_order` | LIVE (async) | `insight.c` |
| `is_rider` (new import) | LIVE | `monsters.js` |
| `MLET_EXPLAIN` / `upstart` | LIVE table / callee | `def_monsyms[].explain`, hacklib |
| `vanqsort_cmp` (file-local) | **STUB in MCLS arms** | `insight.c:2620–2714`, MCLS arm `:2658–2699` |
| `show_nhw_menu_text` | LIVE (create/display/destroy) | — |

Callers: `insight.c:2771` dovanquished (live), `end.c:660` disclose
(live), `end.c:607` dump_everything (DUMPLOG, retired D-1776). Nothing
deleted or re-pointed.

## C ↔ JS fidelity

`list_vanquished` walked against `:2796–2948`: force_sort → `(void)
set_vanq_order(TRUE)` ✓; dumping/force_sort → `'y'`, ask FALSE ✓;
totals loop LOW_PM..NUMMONS ✓; ask yn with `ynaq` / `ynq` and the
`'a'`→`'y'` default demotion ✓ (the `"\033a"` pad is named); `'q'` →
done_stopprint++ ✓; `'a' && ntypes > 1` → cancel return ✓; uniq/class
header predicates ✓; header machine `mlet != prev_mlet || (special_hdr
&& !Rider)` with Rider/explain split and `prev_mlet = mlet` ✓ (numeric 0
vs string mlet never compares equal, as S_ANT=1 never equals 0 in C);
uniq/non-uniq bufs ✓; pfx chain — the local `strncmpi` returns true on
match, so `? 0 :` keeps C's `!strncmpi ? 0 :` sense ✓; `++pfx` under
class_header ✓; tally ✓; `!gameover` pline ✓. No RNG.

**C-wrong (callee stub under a live arm).** C `vanqsort_cmp` MCLS
case (`:2658–2699`): signed numeric `mlet` compare, with the six
punctuation classes remapped to `S_LIZARD, S_EEL, S_GOLEM, S_GHOST,
S_DEMON, S_HUMAN` order past `S_ZOMBIE`; on a class tie Riders sort
before demons (`is_rider(2) - is_rider(1)`), then `mlevel` low→high,
negated for HTOL; mndx tiebreak. JS `js/insight.js:843–849` sets
`res = 0` ("deferred; fall back to mndx"). Before this commit that was
harmless because `class_header` was hard-wired false. Now the header
machine runs over mndx order, so in the two class modes:
- within-class order is mndx, not mlevel (LTOH) or reversed (HTOL);
- punctuation classes print in internal order, not the C remap;
- Riders are not moved ahead of the major demons, so a `&` run that
  goes demon → Rider → demon prints the demon header twice; C's sort
  makes that impossible.
The D-log names this as a "pre-existing stub", but the playbook rule
is that one STUB in a live arm means that arm was not ready to ship.

## Hallucinations / overclaim

The subject says "whole-body port (sort menus, class + Rider
headers)". The class and Rider headers only match C if the class-mode
sort matches; they don't. Everything else in the body is accurate.

## Density

~75 net behavior lines on a 167-line C body whose other arms were
already live: fine for a restart. The missing piece is ~40 lines of C
in the same file and should have shipped with it.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify list_vanquished --base
66cce8590~1 --reach-all`:
- `1 session(s) blocked on it (1 at baseline, 1 in the working scoreboard)`; `scen-wish-Tourist-92067: still list_vanquished at step 224` (identical C/J toplines) → `0 PASS, 0 moved past, 1 unchanged, 0 worse → NO MOVEMENT`
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log (NO MOVEMENT, REACH-OK). The session's owner is
assigned from the topline; its first diff is a map cell, which this
function does not draw, so it is not evidence against the port. It is
a phase-2 matter and is not queued here.

## Actionable C-wrongs

1. `js/insight.js` `vanqsort_cmp` VANQ_MCLS_LTOH/HTOL: port
   `insight.c:2658–2699` — numeric signed mlet (defsym index of the JS
   `S_*` string), the `punctclasses` remap past `S_ZOMBIE`, the
   Riders-before-demons tie rule, `mlevel` low→high negated for HTOL,
   then the mndx tiebreak — so the D-2769 class/Rider headers group
   the way C does.

Verdict: **QUALITY-RISK**
