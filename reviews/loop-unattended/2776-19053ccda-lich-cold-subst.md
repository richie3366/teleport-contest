# Review 2776 — 19053ccda — getmattk lich-arm Cold_resistance OR-read

- **SHA:** `19053ccda` (Tue 2026-10-13) — cliffs-head `mhitu.c` hitmu writer (D-3923).
- **D-entry:** D-3923. **Ledger:** `getmattk` ported (js=mhitm.js:get_mattk).
- **Diff size:** `js/mhitm.js` +9/−2 (one reader function); new test `scripts/getmattk-lich-cold-subst.test.mjs`.
- **Method:** cliff commit, 1 function — whole Method on `Cold_resistance` + its consuming lich arm.

## Intent vs deliverable (promise vs diff)

The subject promises: the lich cold→PHYS substitution arm in getmattk
never fired because its `Cold_resistance()` read only the flats while the
Ranger's worn ring lives only in `uprops[COLD_RES].extrinsic` — so JS
rolled the touch raw `d(1,10)=2` where C drew substituted `d(1,6)=6`
(Ranger-587207 s822); the fix OR-reads the slot; probe goes 822→PASS.

The diff actually adds: two slot disjuncts in the local `Cold_resistance()`
plus a doc comment. No new imports, no caller edits. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `Cold_resistance()` (mhitm.js:417-423) | youprop.h:30-32 | OR-read fix |
| 2 | test `getmattk-lich-cold-subst.test.mjs` | Ranger-587207 steps 822-823 | new, in scripts/ |

No symbol deleted or re-pointed; no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

C loci (pinned, read directly):

- `youprop.h:30-32`: `#define HCold_resistance
  u.uprops[COLD_RES].intrinsic`, `#define ECold_resistance
  u.uprops[COLD_RES].extrinsic`, `#define Cold_resistance
  (HCold_resistance || ECold_resistance)`. The D-log's `:30–32` cite is exact.
- `mhitu.c` getmattk lich arm (`csym.mjs getmattk`, body :309-444; arm at
  :414-435 as cited): `indx == 0 && AT_TUCH && AD_COLD && (udefend ?
  Cold_resistance : resists_cold(mdef)) && mdef != shade` → AD_PHYS,
  `damn = (damn+1)/2`, `damd 10→6`, with the comment table's lich row
  exactly 1d10→1d6.

JS check:

- New reader: `!!((u.HCold_resistance|0) || (u.ECold_resistance|0) ||
  u.Cold_resistance || (e?.intrinsic|0) || (e?.extrinsic|0))` where `e =
  u.uprops?.[COLD_RES]`. C's value is `slot.intrinsic || slot.extrinsic`;
  the JS form ORs flats + combined + both slot mirrors — a superset read
  in the correct direction, matching the `Antimagic` shape directly below
  it (mhitm.js:593-600) and the sit.js precedent. `COLD_RES` was already
  imported (mhitm.js:85) — no new edge, as claimed.
- Consuming arm (mhitm.js:567-579, pre-existing, verified live): gate
  `i===0 && AT_TUCH && AD_COLD`, `udefend ? Cold_resistance() :
  resists_cold(mdef)`, `mndx !== PM_SHADE`, AD_PHYS, `damn =
  (damn+1)>>1` (== C integer `(damn+1)/2` for non-negative damn), `damd
  10→6`. Branch-for-branch C-exact.
- Sole-caller claim: `grep Cold_resistance() js/mhitm.js` shows only the
  definition (:417) and the lich-arm use (:571). True.
- Callees of the changed function: none (pure read). No STUB/CLONE risk.

## Hallucinations / overclaim

- "Post-fix JS step 822 byte-matches C's 8 draws" — the committed test
  pins exactly that (`slices[822]` deep-equal incl. `d(1,6)=6`, plus
  `slices[823] = d(7,6)=28` cascade). The oracle is the machine-recorded C
  log — a legitimate pin, not trace-shaped production code (no seed/step
  reads in `js/`; the anti-pattern grep on the `js/` hunks is empty apart
  from the message's own "no DIAG/FORCE/seed gates" sentence).
- Sibling-clone enumeration (zap export + explode/mcastu/mhitu/uhitm
  sites, sit.js + invent.js already OR-reading) matches `sym.mjs
  Cold_resistance` output (export js/zap.js:593 + 4 clones
  explode/mcastu/mhitm/sit). The "same C-wrong class, no session blocked"
  framing correctly keeps them as future per-site rows, not this commit's
  debt. No overclaim found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `mhitu.c`
hitmu blocking scen-sweep-Ranger-587207 at step 822 (verified in
`19053ccda~1:docs/LOOP-QUEUE.md`, top row, RNG lost 22409). Owner stands
whole per D-2247 (read once per tag — the divergence is the mattk dice,
not adtyping); this commit ports exactly the named writer read, with its
own Ledger row (`getmattk` ported). The D-log ran `--full` (44/44) even
though only one non-shared file changed — above the gate, not below it.
One cliff, code + ledger + verify in one handoff. Rule #2: `imports.mjs
--rulecheck` → clean (run this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself (`--reach-all`, stronger than the D-log's 80-session
spread):

```
verify hitmu: baseline 19053ccda~1 — 1 session(s) blocked on it
  scen-sweep-Ranger-587207: PASS
verify hitmu: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach hitmu: 897 baseline-PASS session(s) reach it (897 run, 702.5s): 897 PASS, 0 regressed → REACH-OK
```

D-log's "1 PASS" reproduced exactly; reach 897/897 with zero regressions.
No REGRESSED session. Movement + REACH-OK: satisfied.

## Actionable C-wrongs

None. The reader now implements C's `H || E` over the true storage, the
consuming arm is branch-exact, and the corpus claim re-measures clean
(including a full 897-session reach).

Verdict: **ACCEPT**
