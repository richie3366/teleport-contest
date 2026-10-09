# Review 2604 — 45453fbed — level_tele-head writer resurrect appear duplicate (D-3735)

Metadata. SHA `45453fbed` (2026-10-09), D-3735, parent `a3dc7af46`.
js diff: `js/wizard.js` +11/−13 (delete ungated inline block, keep
gated call, envelope comment); new
`scripts/resurrect-blind-noappear.test.mjs`. Ledger: `resurrect`
ported (D-3735 appended). No prior review claimed closed.

## Intent vs deliverable

Promise (subject + D-log): level_tele-head probe Barbarian-95309
@128 (screen: C has resurrect's `wizard.c:775` voice, JS pages
before it). Owner `level_tele` already C-whole; temp-DIAG replay
(reverted) shows JS ran resurrect to completion (makemon ok,
voice+verbalize executed) but an extra ungated "It suddenly
appears..." line filled the message window one line early — blind
hero (raven-blinded step 58), C's gated appear stays silent. Fix:
delete the D-0559 ungated inline duplicate, keep the gated
`makemon_appear_msg` call. Claimed: head probe +111 steps (128 →
inside_gas_cloud@239); resurrect row 1 PASS + 1 moved; 7 other
level_tele sessions unchanged (different writers, itemized).

Diff actually adds: the deletion + replacement comment + envelope
update. Pure removal; `Monnam` import kept (still used :594/:746/
:771). Promise and diff match.

## Inventory

Changed JS functions (1):

- `resurrect` — `js/wizard.js:633–700` (deleted block at old
  :688–699). C: `nethack-c/upstream/src/wizard.c:714–780`
  (`csym.mjs` range), voice tail `:770–778`.
- Kept call: `makemon_appear_msg` — `js/wizard.js:651` (makemon
  path). C: `makemon.c:1476–1500` (gated appear).

Ledger line present: `resurrect` ported, `at` + D-3735.

## C ↔ JS fidelity

C `resurrect` tail (`:762–779`, verified by read): after the
makemon/migrating paths converge at `if (mtmp)`, C clears
WAITMASK, sets hostile/malign, and prints — inside `if (!Deaf)` —
only `pline("A voice booms out...")`, `SetVoice`, `verbalize(...)`.
C's own FIXME comment states the appear message comes from
`makemon()`, not resurrect. C `makemon.c:1476–1500` (verified):
the Norep appear is gated on `(canseemon && (NOTHING || MONSTER))
|| sensemon`, with a mimic-masquerade arm — silent for a blind hero
facing the Wizard.

The deleted JS block printed `${Monnam} suddenly appears${where}!`
unconditionally in resurrect's shared tail — wrong on BOTH paths:
on the makemon path it duplicated the gated `makemon_appear_msg`
(`wizard.js:651`, kept, LIVE export at `makemon.js:3841` with the
`in_mklev` + canseemon/sensemon gates); on the migrating path C
prints nothing before the voice at all. Deletion restores C exactly:
makemon path = one gated appear; migrating path = voice only.
Voice/verbalize lines below the deletion are byte-identical before/
after. No RNG in this tail on either side. The `!u.Deaf` gate around
the voice matches C's `if (!Deaf)` (Deaf-polish omit predates,
named).

Clone classification: the deleted block was a divergent inline
clone of makemon's appear — removing it in favor of the LIVE
`makemon_appear_msg` is the correct direction (converge on the
canonical, gated implementation). No STUB introduced; no symbol
deleted or re-pointed to an import (pure inline-code removal), so
`sym.mjs` has no re-point to verify — `Monnam` confirmed LIVE
(`js/do_name.js:1263`, sync) with remaining uses as stated. No
`--can` question (no import touched).

## Hallucinations / overclaim

None. The mechanism (extra line → early paging → voice hidden
behind --More--) is measured (temp-DIAG, reverted — verified: no
`DIAG`/`FORCE` in `js/wizard.js` today) and the blind-hero
precondition is dated (step 58). The 7 unchanged sessions are
itemized by writer class with session ids, not waved away. Grep
hits for DIAG/FORCE in `git show -- js/` are the commit message
itself ("Temp-DIAG replay (reverted)", "No DIAG/FORCE/seed gates"),
not code. Rule #2: clean (global re-check this audit).

## Density

Cliff-phase §2b: at the parent commit the generated cliffs head is
`level_tele` — 8/1113 sessions, RNG lost 201867, top row (verified
via `git show a3dc7af46:docs/LOOP-QUEUE.md`). This commit works its
HEAD's cliffs head through the writer the divergence names (the
missing voice text `booms out` exists only in `wizard.c:775`) —
legitimate §10.18/§10.19. One cliff, one deletion, code + ledger +
verify + focused test in one handoff. The resurrect-row movement
(1 PASS + 1 moved) rides the same writer — same-function family,
not a second cliff.

## Verification

D-log Verify (`verify.mjs --fn level_tele,resurrect`): focused
test 0/1 (via stash) → 1/1; `level_tele`: 0 + 1 moved + 7 unchanged
+ 0 worse → PROGRESS; `resurrect`: 1 PASS + 1 moved → PROGRESS;
REACH-OK both; syntax/rule2/green/strict/cohort PASS → VERIFY: PASS.

Re-measured by this audit
(`verify level_tele,resurrect --base 45453fbed~1 --reach-all`;
`js/wizard.js` + `js/makemon.js` untouched between this SHA and
HEAD):

```text
verify level_tele: 1 PASS, 1 moved past, 6 unchanged, 0 worse → PROGRESS
reach level_tele: 1 baseline-PASS session(s) reach it (1 run): 1 PASS, 0 regressed → REACH-OK
verify resurrect: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
smoke resurrect: ... 24 PASS, 0 regressed → REACH-OK
```

Ship-time movement confirmed exactly (95309 → inside_gas_cloud@239;
95245 PASS; 95204 → mbhitm@297). The extra PASS (Caveman-95341) is
the later D-3737 ship's work, and the 6 remaining unchanged match
the ship-time "different writers" itemization minus that session.
0 worse, 0 regressed. No vacuous check (both rows' blocks fully
accounted with per-session targets).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
