# Review 2397 — fbfdad852 — traptype rewire + 5 audits (D-3469)

Metadata: SHA `fbfdad852`, D-3469, Open head. 6 functions (≤10 →
whole Method each). Files: `js/mklev.js` (+10/−9: adapter restart
+ caller) + `scripts/lspo-traptype-opt.test.mjs` (new, 5 tests).
Also fills review 2390's `**Addressed:**` hash (allowed backfill).

## Intent vs deliverable

Promise: re-audit impossible + 4 (raw_printf, config_error_add,
purge_all_custom_entries, opt_usage) unchanged; restart
lspo_traptype_opt in C's (o, name, defval) shape through the shared
helper; caller passes 'type' (C :4430). Diff delivers exactly that.
Matches the promise; no scope drift.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| get_table_str_opt@traptype | partial (wire) | js/mklev.js:1518–1527, :1606 | sp_lev.c:4352 via nhlua.c:1053–1076 |
| impossible | audited | js/display.js:8970 (unchanged) | pline.c:583–634 |
| raw_printf | audited | js/display.js:8648 + :8660 | pline.c:548–558 |
| config_error_add | audited | js/cfgfiles.js:425–427 | cfgfiles.c:1864–1872 |
| purge_all_custom_entries | audited | js/glyphs.js:1100 + :1117 | glyphs.c:750–758 + :761–794 |
| opt_usage | audited | js/earlyarg.js:446 | earlyarg.c:375–387 |

## C ↔ JS fidelity

**Rewire — confirm.** C :4352 read (emptystr), :4355
`trapstr && *trapstr` gate, :4356–4360 strcmpi loop, :4362 Free,
:4363 return — all citations grep-exact. JS: helper call with `''`
defval, `trapstr && length` gate, lowercased loop over the
pre-existing table, defval fallthrough, GC-folded Free. Caller C
:4430 `("type", -1)` exact (stale `:4432` comment corrected). `o`
is a non-null object at the call (gate :1601–1602; `?? {}` is
unreachable-but-harmless). lua_field/lua_type equivalences as in
2396; delta is exactly C's conversion (fn pcalled, direct
non-strings throw). `sym.mjs` single sync def, no clones; edge
pre-exists (:150), no import change.

**Audits — all confirm.** impossible: cite 2396 (byte-identical,
display.js untouched here). raw_printf: dispatch :554 + count
:556–557 live; omits pre-existing named. config_error_add:
1-line wrapper onto vconfig (ported audited-whole D-3405) —
D-entry "none — whole" is TRUE. purge: loop `0..NUM_GRAPHICS+1`
character-exact; staticfn ported; omits verified (save.c:1090
caller; symbols.c:347 staticfn caller inside by-design
clear_symsetentry). opt_usage: terminate live, 3 omits named, 3/3
C call sites (:196/:265/:316) wired (:241/:317/:382).

**Ledger defect (the debt):** fbfdad852's finish overwrote
get_table_str_opt's narrowed 17-caller omit (D-3467, verified)
with impossible's omit text — the first-line paste again (proven
via `git show fbfdad852 -- docs/ledger/nhlua.c.jsonl`; other five
rows verified clean: re-cert notes only, omits preserved).
Repair already queued as live Must-fix row 7 (get_table_str_opt
1-row repair, exact evidence) — **covered, not re-queued** (2384
precedent → WITH-DEBT). Repair-GO note: the queued row names
D-3469's 16-caller restore text, but D-3471 wired :3295 after it
was filed — the repair iter must restore D-3471's 15-caller line
(re-verify at repair per D-3427 protocol).

## Hallucinations / overclaim

None in code or audits. The D-entry's own Named line for
get_table_str_opt is correct (16 callers); only the finish-stamped
ledger omit is wrong — a stamping defect, not a fidelity overclaim.

## Density

Breadth-phase bar: rewire whole (no adapter remainder), 5 audits
re-verified whole in fresh context above. Ledger entries + Verify
lines present; Left open: none. 6/6 code exact; the SHA verdict is
WITH-DEBT solely on the covered paste.

## Verification

D-log: 6× hidden note + 6× REACH-OK, green, strict, cohort, full
44/44. Re-ran all six `--base fbfdad852~1 --reach-all`: 0 blocked
at baseline and working scoreboard on every fn; 6× REACH-OK
(24/24 each, 0 regressed). Claim true. `node --test`
lspo-traptype-opt: 5/5. Rule #2 clean (iteration-wide). Diff grep:
no FORCE/DIAG/seeds/coords/fastforward.

## Actionable C-wrongs

None requiring a new Must-fix line (the one defect is covered):

1. `get_table_str_opt` ledger row (D-3469 paste of impossible's
   omit over the narrowed 17-caller text) — repair queued
   (Must-fix row 7; restore D-3471's 15-caller line at repair).
   Not re-queued to avoid a double repair line.

Verdict: **ACCEPT-WITH-DEBT**
