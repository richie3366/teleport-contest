# Review 2607 — f74fa11d9 — splev_create_object stacking (D-3739)

Metadata. SHA `f74fa11d9` (2026-10-09), D-3739, parent `ed16286e1`.
js diff: `js/mklev.js` +8/−4 in `splev_create_object` (capture
`mkobj_at`'s return, `stackobj` it). Ledger: `create_object`
ported → split (`create_object` + `splev_create_object`, D-3739
appended). Works its HEAD's cliffs head (`monmove.c` m_move, 1
block: 95224 — verified in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): 95224 diverges at monmove.c:1963
(`rn2(20)=9` vs `rn2(24)=1`) because two random-food placements
collided at Sokoban-4 (45,8) and C merges them into one stack
while the class-only helper never stacked — so E2's
m_search_items goal differs downstream. Temp-C + temp-JS
measurement localizes the writer to `create_object :2422–2423`.
Claimed: 95224 FULL PASS, REACH-OK, 44/44.

Diff actually adds exactly the `stackobj(otmp)` call plus a
C-cited comment. Promise and diff match. No new imports/edges.

## Inventory

Changed JS function (1):

- `splev_create_object` — `js/mklev.js:22022–22030` (class-only
  helper, 137 call sites). C: `sp_lev.c` create_object
  `:2192–2440` (`csym` range), stacking gate at the tail
  (`if (!(o->containment & SP_OBJ_CONTENT)) stackobj(otmp)`,
  D-log's `:2422–2423` — verified in the printed tail).

## C ↔ JS fidelity

**Gate.** C stacks every top-level .lev OBJECT unless it is
container content (`o->containment & SP_OBJ_CONTENT`). The JS
helper takes only `oclass` and serves top-level class-only lines
exclusively, so containment ≡ 0 structurally and the gate always
passes — the comment's claim is exact, not assumed. (`named` is
likewise constant-true here: class-only lines carry no name, so
C's `!named` at `:2227` is TRUE, matching the passed `true`.)

**Callees.** `stackobj` LIVE (`sym.mjs`: `js/mkobj.js:3311`
sync), already imported (`mklev.js:114`) — no new edge.
`mkobj_at` LIVE (`js/mkobj.js:2925` sync) and returns `otmp`
(verified at the definition). The added `if (otmp)` guard has no
C counterpart but is strictly defensive (C never nulls here;
skipping a null stack is a no-op either way) — not a divergence.
The full `create_object` port (`mklev.js:22817`) already stacks
with the same cite — consistent precedent; singles are
stackobj no-ops, so the other 136 call sites are unaffected
except where C also merges.

**Caller wiring.** All 137 `splev_create_object` sites get the
arm at once, matching C where every top-level OBJECT stacks.
The full-create_object callers are untouched (already stacked).

**Measurement.** The writer proof is a genuine C-side
measurement (temp log-only monmove dump, behavior-unchanged:
same RNG total/topline/`^F`; recorder md5-reverted, binary
rebuilt, sysconf restored) showing E2's goal flip (C found
(45,8) empty, JS found the leftover single) and E3's cnt 5 vs 6
— the recorded `rn2(20)`/`rn2(24)` pair. Falsified list is
explicit (mflee, mtrack, mfndpos, bubbles…). m_move itself not
re-ported — correct under the SYMPTOM tag.

**Named omissions** (in-map): the helper's other create_object
arms (lit/burn, buried, prize/nomerge, named/artif) — absent
before and after; class-only random placements never carry
them. Ledger ported→split with both JS halves named is the
honest status (D-2726/D-1533 covered only the full port).

## Hallucinations / overclaim

None. "C merges them into one stack" is measurement-backed, and
the FULL PASS jointly proves the set. Diff grep: no `FORCE`,
`DIAG`, `getRngLog`, `fastforward`, seed/coordinate gates. No
symbol deleted or re-pointed (existing import reused), so no
further `sym.mjs` paste required. Rule #2: global re-check this
audit → clean.

## Density

Cliff-phase §2b: parent head is m_move (1 block, RNG lost
119427); this commit ports the measured writer whole for the
reached path (the one missing arm of the helper), names the
rest, and FULL PASSes the probe. One cliff, one C locus, no
bundling. Correct gates (green/strict/cohort + auto full 44/44
on the shared file).

## Verification

D-log Verify (`verify.mjs --fn m_move,create_object`): m_move 1
PASS + 0 + 0 + 0 → PROGRESS (95224 PASS); create_object note
(gen-time writer, none blocked — honest); REACH-OK (m_move
80/80 spread, create_object smoke 24/24); green/strict/cohort
PASS; full 44/44. Preflight green.

Re-measured by this audit (`verify m_move --base f74fa11d9~1
--reach-all`):

```text
verify m_move: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach m_move: 884 baseline-PASS session(s) reach it (884 run, 404.6s): 884 PASS, 0 regressed → REACH-OK
```

95224 PASS confirmed on HEAD code; the full 884-session reach
(rather than the 80-spread) is clean — 0 regressed. No vacuous
check (row cited 1; that 1 PASSes).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
