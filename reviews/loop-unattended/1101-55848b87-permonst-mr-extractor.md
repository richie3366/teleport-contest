# Review 1101 — 55848b87 — extractor drops LVL group 4, permonst.mr always 0 (D-2135)

Metadata: SHA `55848b87`, `js/generated/monsters_data.js` +1 line,
`js/monsters.js` +4/−0, `scripts/extract-monsters.py` +5/−0.
Queue row `trap.c` burnarmor, scen-wish-Ranger-92212 step 73/152,
RNG-first at `trap.c:113`: C `rn2(5)=3 @ burnarmor` vs JS `rn2(6)=5
@ xkilled`; C «The werejackal resists the tower of flame! ...» vs
JS «You kill the werejackal! ...». No prior review claimed closed.

## Intent vs deliverable

Subject promises: the extractor silently dropped the LVL mr field so
every `data.mr` read 0 and `resist()` never fired; fix captures it
and wires it through. Diff actually adds: `lm.group(4)` → `"mr"` in
the extractor (+ fallback 0), emitted `export const mrs = [...]`,
and `mr: mrs[mndx]` in `mons()`. Promise matches diff — a data
plumbing fix, no game-logic code touched.

## Inventory

Changed JS: generated data (+1 export line, no churn — regenerated
via the checked-in extractor) and `mons()`. Callee closure: no
functions added; the six `data.mr` readers (artifact.js:1919,
explode.js:236, mhitm.js:500, music.js:189, potion.js:3575,
pray.js:2209) are pre-existing live call sites, fixed by the data
with zero code change — verified present via grep. `mrs` import
joins the existing generated-data edge (leaf module, no TDZ risk;
`--can` semantics trivially safe). No DIAG/FORCE/seed gates; rulecheck
clean at HEAD.

## C ↔ JS fidelity

C fact, measured two ways. First, the extractor regex
(extract-monsters.py:415) captures five LVL groups and already mapped
1/2/3/5 to mlevel/mmove/ac/maligntyp — group 4 is positionally
forced to be mr, matching the `permonst` struct order
(mlevel, mmove, ac, mr, maligntyp). Second, spot-checked end to end:
C `monsters.h:2618` werejackal is `LVL(2, 12, 10, 10, -7)`, and the
regenerated arrays give `PM_WEREJACKAL` index 15 → `mrs[15] = 10`
(lengths 383 = 383, 225 nonzero — a sane distribution, not a column
shift). The D-log's mechanism (prevEntry `rn2(106) @ resist` matched,
then C resists via `rn2(100+alev-dlev) < mr` while JS with mr=0
proceeds to full-damage xkilled) follows from `zap.c:6141` resist
semantics and the now-10 mr. `commit_pm_fixup`/ERINYS untouched —
correct, since C permonst is const and adj_erinys never mutates mr.

## Hallucinations / overclaim

None. "225/383 nonzero" consistent with the emitted array. The entry
does not claim any reader-code fix, correctly — none was needed.

## Density

Data fix + extractor + wiring in one handoff; the generated diff is
one line. Right-sized per §2b. The D-log additionally reports a
hand-run full `sessions` 44/44 after the data change — warranted
here since a shared generated file changed, and the audit-closing
full run below re-confirms it on HEAD.

## Verification

D-log Verify bullet shows `verify.mjs --fn burnarmor` → hidden 0
PASS, 1 moved past (Ranger-92212 burnarmor@73 → do_statusline2@77)
+ green + strict + cohort. Re-measured: `hidden-proxy.mjs verify
burnarmor --base 55848b87~1` → `0 PASS, 1 moved past, 0 unchanged,
0 worse → PROGRESS` (Ranger-92212: moved → do_statusline2 at step
77, was 73). Claim true; later step + later owner is PROGRESS.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
