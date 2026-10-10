# Review 2646 — f3651d1cd — losestr decline resume (D-3782)

Metadata. SHA `f3651d1cd` (2026-10-10), D-3782, parent
`96439ea60`. js diff: `js/attrib.js` +8/−1 (unconditional
return → conditional) +
`scripts/losestr-decline-maxhp.test.mjs` (new).
Ledger: `losestr` ported-note. Works the cliffs
head (do_statusline2 writer).

## Intent vs deliverable

Promise: 95309@839 (+95201, +95246) — after a
wizard `Die?` decline mid-losestr, C RESUMES with
the max-HP cut (max 118→44) while JS returned,
leaving max uncut (HP:104(118) vs 30(44)). Fix:
fall through to the C tail unless true death.

Diff delivers exactly that gate. Promise and diff
match. No import change.

## Inventory

Changed JS (1 writer, 1 gate; whole body walked):

- losestr — `js/attrib.js:371–419`. C:
  `attrib.c:221–270` (csym-equivalent range; read
  whole: impossible :226–229, rn1 loop :231–236,
  knam default :239–242, losehp :244, max arms
  :246–254, botl :255, `#if 0` :257–264 compiled
  out, adjattrib :267–269).

## C ↔ JS fidelity

**Gate C-exact.** C has no return after :244 —
done() returns only on lifesave/decline, and the
tail always runs on survival. JS now mirrors it
(survive → fall through; true death → return).
Tail verified arm-for-arm: waspolyd captured pre-
losehp; rn1(4,3) (recorder tags the rn2(4)
primitive — matches the "18×rn2(4)" forensics);
knam `!*knam` covered by JS falsy-`''`; Upolyd →
setuhpmax(mhmax−dmg,≥1), `!waspolyd` → uhpmax cut
≥uhpmin, rehumanize case correctly cuts neither;
botl; adjattrib `num>0 && (Upolyd||!waspolyd)`.
No symbol deleted or re-pointed, so no sym.mjs
paste is owed. Watch (no session, no row): entry
gate + post-drain check still read plain
`gameover`, not the D-3777 `_losehp_needs_done`
idiom — a stale-gameover window would still skip
this tail; needs its own proving session, like
mbhitm (review 2640).

## Hallucinations / overclaim

None. Diff grep: zero hits. The C-history
reconstruction (836 weaken draws → 837 die → 838
prompt → 839 decline → savelife → resume :246) is
recording-measured, and all three sessions share
the decline signature. The mcast_weaken_you
killer-clear note is correctly scoped as
pre-existing/harmless.

## Density

Cliff-phase §2b: one row, one writer, no bundling.
3 sessions → FULL PASS in one gate. Each unchanged
session gets its own writer attribution in the
D-log (not hand-waved).

## Verification

D-log Verify: do_statusline2 3 PASS + 6 unchanged;
smoke 24/24; losestr reach 1/1; gates + cohort.

Re-measured by this audit (`verify
do_statusline2,losestr --base f3651d1cd~1
--reach-all`):

```text
verify do_statusline2: 3 PASS, 0 moved past, 6 unchanged, 0 worse → PROGRESS
  scen-sweep-Barbarian-95309: PASS
  scen-worldtour-Ranger-95201: PASS
  scen-worldtour-Samurai-95246: PASS
smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK
verify losestr: […] vacuous […]
reach losestr: 1 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly, 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
