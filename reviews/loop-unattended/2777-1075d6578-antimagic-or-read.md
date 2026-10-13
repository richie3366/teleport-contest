# Review 2777 — 1075d6578 — passive AD_MAGM Antimagic OR-read

- **SHA:** `1075d6578` (Tue 2026-10-13) — cliffs-head `sounds.c` dosounds writer (D-3924).
- **D-entry:** D-3924. **Ledger:** `passive` ported (uhitm split home).
- **Diff size:** `js/uhitm.js` +7/−1 (one const + import name); new test `scripts/passive-oracle-antimagic-uprops.test.mjs`.
- **Method:** cliff commit, 1 read — whole Method on the `Antimagic` const + its consuming AD_MAGM arm.

## Intent vs deliverable (promise vs diff)

The subject promises: C's Oracle-wrath AD_MAGM took the Antimagic miss
branch while JS took the hit branch (`mdamageu`), because the passive
`Antimagic` const read only the flats while the cloak's MR lives only in
`uprops[ANTIMAGIC]` — the damage then pulled `regen_hp`'s `rn2(100)` ahead
of dosounds' `rn2(400)`; the fix OR-reads the slot; Wizard-587319 moves
296→367.

The diff actually adds: two slot disjuncts in the const, a 4-line C-cite
comment, and `ANTIMAGIC` in the existing const.js import. No new edge, no
caller edits. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `Antimagic` const (uhitm.js:3288-3292) | youprop.h:55-57 | OR-read fix |
| 2 | test `passive-oracle-antimagic-uprops.test.mjs` | Wizard-587319 s296 | new, in scripts/ |

No symbol deleted or re-pointed; no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

C loci (pinned, read directly):

- `youprop.h:55-57`: `#define HAntimagic u.uprops[ANTIMAGIC].intrinsic`,
  `#define EAntimagic u.uprops[ANTIMAGIC].extrinsic`, `#define Antimagic
  (HAntimagic || EAntimagic)`. The JS comment's `:55-57` cite is exact.
- `uhitm.c:5980-5991` AD_MAGM arm (read via `sed`; `csym.mjs passive`
  finds no definition — the C function is file-static, so no csym range
  exists to cite; the D-log's `:5985/5987` message lines are exact):
  `if (Antimagic) { shieldeff; monstseesu(M_SEEN_MAGR); pline("A hail of
  magic missiles narrowly misses you!"); } else { You("are hit by magic
  missiles appearing from thin air!"); mdamageu(mon, tmp);
  monstunseesu(M_SEEN_MAGR); }`.

JS check:

- New const: `!!(u.Antimagic || u.HAntimagic || u.EAntimagic ||
  (slot?.intrinsic|0) || (slot?.extrinsic|0))`. C's value is
  `slot.intrinsic || slot.extrinsic`; the JS form is a superset read in
  the correct direction, and textually the same shape as `Free_action`
  two lines above (uhitm.js:3271-3272, which OR-reads
  `uprops[FREE_ACTION].extrinsic) — the D-log's "Free_action `:3271`
  shape" claim verified in the file. `ANTIMAGIC` joins the existing
  const.js import — no new edge, as claimed.
- Consuming arm (uhitm.js:3412-3423, pre-existing, verified live): both
  branches match C in message bytes and call order
  (`shieldeff/monstseesu/pline` vs `pline/mdamageu/dead-check/monstunseesu`);
  the `if (dead()) return` after `mdamageu` is the standard JS
  noreturn propagation (C `done_in_by` never returns), not a semantic change.
- No RNG in the changed lines; the RNG effect (regen_hp draw ordering) is
  downstream of the branch flip, confirmed by the corpus re-measure.

## Hallucinations / overclaim

- The D-log openly labels `verify passive` "vacuous, 0 blocked at
  baseline" and hangs movement on `verify dosounds` instead — honest
  framing, and my re-measure below confirms the dosounds movement it
  claims. No vacuous check presented as progress.
- Named-omission enumeration spot-checked: `js/spell.js:706` and
  `js/pray.js:240` are flat-only `Antimagic` reads at exactly those
  lines; `sym.mjs Antimagic` shows the export + 8 clones, consistent
  with "mhitm/potion/trap/teleport/zap/mcastu/sit/muse/invent already
  OR-read". No overclaim found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `sounds.c`
dosounds blocking scen-worldtour-Wizard-587319 at step 296 (verified in
`1075d6578~1:docs/LOOP-QUEUE.md`, top row, RNG lost 16973). Owner stands
whole per D-2217 (read once per tag — the divergence is the branch owner
`passive` AD_MAGM, correctly identified via cMsgOwners); this commit
ports exactly the named writer read with its own Ledger row. D-log ran
`--full` (44/44) on a one-file change — above the gate. One cliff, code +
ledger + verify in one handoff. Rule #2: `imports.mjs --rulecheck` →
clean (run this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself (`--reach-all`, stronger than the D-log's 80-session
spreads):

```
verify dosounds: baseline 1075d6578~1 — 1 session(s) blocked on it
  scen-worldtour-Wizard-587319: moved → peace_minded at step 367 (was 296)
verify dosounds: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach dosounds: 1141 baseline-PASS session(s) reach it (1141 run, 757.5s): 1141 PASS, 0 regressed → REACH-OK
```

D-log's "moved → peace_minded at step 367" reproduced exactly; reach
1141/1141 with zero regressions. No REGRESSED session. Movement +
REACH-OK: satisfied. Focused test failed pre-fix (hit message) / passes
post-fix per the D-log (authentic red).

## Actionable C-wrongs

None. The const now implements C's `H || E` over the true storage, the
consuming arm is branch-exact, and the corpus claim re-measures clean
(including a full 1141-session reach).

Verdict: **ACCEPT**
