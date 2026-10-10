# Review 2642 — 96615e374 — msummon appear-tail threat stop (D-3778)

Metadata. SHA `96615e374` (2026-10-10), D-3778, parent
`0c930ff23`. js diff: `js/minion.js` +18/−1 (4
deferred-tail calls + import extension) +
`scripts/msummon-appear-threat-stop.test.mjs` (new).
Ledger: `msummon`/`summon_minion` ported-notes.
Works the cliffs head (msummon, 95343).

## Intent vs deliverable

Promise: 95343@404 — C prints "You stop searching."
BEFORE "Juiblex appears" (makemon's in-body
`:1502–1504` dochugw tail) while JS printed it
third (hitmu tail). Fix: await the deferred
makemon_appear_msg after each minion.js makemon,
in C order.

Diff delivers exactly those 4 calls. Promise and
diff match. Import extension only (ALREADY edge).

## Inventory

Changed JS (1 writer family, 2 functions):

- summon_minion 3 makemon sites — `js/minion.js:210/
  224/235`. C: `makemon.c:1471–1505` (newsym :1471,
  MM_NOMSG-gated Norep :1472–1500, dochugw tail
  :1502–1504 — read) + `:1243–1244` (MM_EMIN→
  newemin inside makemon — read).
- msummon loop site — `js/minion.js:388`. Same C
  locus. Callee `makemon_appear_msg`
  (`js/makemon.js:3838`, LIVE export, read whole:
  group drain + Norep gate + `if occupation →
  dochugw(mtmp,false)` :3896–3898; dochugw live
  from monmove.js :193).

## C ↔ JS fidelity

**Tail C-exact.** C's Norep runs only under
`!MM_NOMSG` (:1472) while the dochugw tail
(:1502–1504) runs unconditionally inside
`!in_mklev` — JS mirrors both (appear_msg gates
the Norep on `!(MM_NOMSG)`, runs dochugw always;
`game.in_mklev` early-out :3839). Order exact:
call sits first inside `if (mon/mtmp)`, before
result++/emin setup/"appears" pline — C's in-body
tail likewise precedes msummon's pline and
minion.c's isminion assignment (C-side emin comes
from inside makemon :1243). Placement/flags exact:
final `mon.mx/my` + the call's own MM flags at all
4 sites (MM_NOMSG skips only the Norep, never the
threat check). No double-run: these sites never
called the drain before (new import). House shape:
10+ sibling call sites already do this. No symbol
deleted or re-pointed (import extension only), so
no sym.mjs paste is owed beyond the export check
above.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "same 5 messages,
different ORDER" diagnosis is measured (temp trace,
removed), and the focused test is stash-proven 0/2
→ 2/2.

## Density

Cliff-phase §2b: one row, writer shipped (4 sites,
one C tail), no bundling. 95343 404 → 599 (+195).

## Verification

D-log Verify: msummon 1 moved; reach 5/5 + 4/4;
gates + cohort PASS.

Re-measured by this audit (`verify
msummon,summon_minion --base 96615e374~1
--reach-all`, on HEAD so it includes D-3779):

```text
verify msummon: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95343: moved → flooreffects at step 602 (was 404)
reach msummon: 5 PASS, 0 regressed → REACH-OK
verify summon_minion: […] vacuous […]
reach summon_minion: 4 PASS, 0 regressed → REACH-OK
```

Movement confirmed (602 = 599 + D-3779's step,
re-checked under 2643). 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
