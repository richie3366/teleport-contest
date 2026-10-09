# Review 2610 — 6dba482a5 — freeinv_core amulet arm clears uhave_amulet (D-3742)

Metadata. SHA `6dba482a5` (2026-10-09), D-3742, parent `29f19e6a4`.
js diff: `js/invent.js` +6/−0 in `freeinv_core` (one mirror clear
+ cite comment). Ledger: `freeinv_core` ported (D-3742
appended). Works its HEAD's cliffs head (`makemon.c` makemon, 3
blocked: 95249, 95203, 95212 — verified in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): all 3 probes skip C's `rn2(5)` at
makemon.c:1389 (in_mklev ndemon sleep) at Plane of Earth
creation because the JS-only `u.uhave_amulet` flat stuck at 1
after the Wizard's stealamulet theft — the struct bit cleared,
the flat (write-once, never cleared) kept every OR-read at 1.
One mirror clear beside `uhave.amulet = 0`. Claimed: 0 PASS + 3
moved (95249 → set_apparxy s461, 95203 → getlev s388, 95212 →
do_statusline2 s296), REACH-OK, 44/44.

Diff actually adds exactly that clear. Promise and diff match.
No signature change, no import.

## Inventory

Changed JS function (1):

- `freeinv_core` — `js/invent.js:9635–~9700` (amulet arm
  :9641–9650). C: `invent.c` freeinv_core `:1355–1399`
  (`csym` range), amulet arm `:1361–1364` (`u.uhave.amulet =
  0`); setter `addinv_core1 :965–967` (`u.uhave.amulet = 1`);
  readers `makemon.c:1389` and `:1332` (`!u.uhave.amulet`
  gates).

## C ↔ JS fidelity

**Placement.** The clear sits inside the `AMULET_OF_YENDOR`
arm, directly after `uhave.amulet = 0` — C's `:1364`, the
single clearer in C (verified: the only `u.uhave.amulet = 0`
in the pinned tree is invent.c:1364; the only setter is
addinv_core1 :967). C has no flat — possession is the single
bit — so the mirror clear is a C-adaptation, correct by
construction.

**Completeness** (re-checked, not trusted): JS writers of the
flat are exactly two — teleport.js:2329 (`= 1`, the C :1234
endgame-prerequisite grant, which sets struct and flat
together) and this hunk (`= 0`). JS writers of the struct bit
are three — the same grant (`= 1`), u_init.js:997 (`= 1`,
init), and this arm (`= 0`, the only clear). So: every gain
sets struct=1 (OR-reads correct — the D-log's "addinv_core1
needs no mirror set" holds, since struct=1 dominates the OR),
and every loss funnels through freeinv_core (theft/drop/poly
all extract via freeinv in C), which now clears both. The
stuck-flat class is closed, not just the theft instance. No
sibling flats exist (no uhave_bell/menorah/book/questart —
verified by the writer grep).

**Readers.** makemon.js:3605 (`:1332` gate) and :3686
(`:1389` gate) both OR `uhave.amulet || uhave_amulet` —
post-fix both read 0 after the theft, so `:1389` fires as in
C. The ~20 OR-readers in 12 files inherit the fix from the
single clear. Readers with struct=1 (amulet held) are
unaffected.

**Measurement.** JS replay DIAG (stated removed) captured the
first earth demon birth with in_mklev=true, is_ndemon=true,
uhave.amulet=false, flat=true — the exact stuck state; the C
trace (grant s226 → theft s357 → earth s405 with bit 0)
explains why only post-theft sessions diverged. makemon
itself not re-ported — correct under the history tag (body
whole incl. `:1386–1390`).

**Named omissions:** none new. freeinv_core re-verified whole
arm-by-arm this iteration (coin/amulet/menorah/bell/book/
quest-artifact/intrinsic/LOADSTONE/luck/figurine/tin — the C
body `:1355–1399` printed above confirms the arm list).

## Hallucinations / overclaim

None. "No clearer existed" verified by the writer grep; "sole
writer" verified. Diff grep: `DIAG` appears only in the
commit-message sentence ("JS replay DIAG, since removed") —
no code use. No symbol deleted or re-pointed, so no `sym.mjs`
paste required. Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is makemon (3 blocked, RNG lost
75548); this commit ships the measured writer (one line in one
function — the function is otherwise whole, re-verified
here), names nothing new, and moves all 3 probes. One cliff,
one C locus, no bundling. Correct gates (green/strict/cohort
+ full 44/44 fortress).

## Verification

D-log Verify (`verify.mjs --fn makemon,freeinv_core`): makemon
0 PASS + 3 moved + 0 + 0 → PROGRESS; freeinv_core note
(writer, none blocked — honest); reach 80/80 + smoke 24/24 →
REACH-OK; green/strict/cohort PASS; full 44/44.

Re-measured by this audit (`verify makemon --base 6dba482a5~1
--reach-all`):

```text
verify makemon: 0 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS
reach makemon: 997 baseline-PASS session(s) reach it (997 run, 432.5s): 997 PASS, 0 regressed → REACH-OK
```

All 3 probes land exactly as claimed (set_apparxy@461,
getlev@388, do_statusline2@296); the full 997-session reach is
clean. No vacuous check (row cited 3; all 3 moved past).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
