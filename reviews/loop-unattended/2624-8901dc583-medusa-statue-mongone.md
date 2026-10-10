# Review 2624 — 8901dc583 — Medusa statue arm calls live mongone (D-3758)

Metadata. SHA `8901dc583` (2026-10-10), D-3758, parent
`4ddfa4bb2`. js diff: `js/mklev.js` +46/−46 (two
reached copies splice→`await mongone(was)`;
load_medusa_1/2/3/4 async; 5 call sites awaited; generic
copy keeps splice with unreached-proof comment) +
`scripts/medusa-statue-mongone.test.mjs` (new, 3 its).
Ledger: mon.c.jsonl (mongone D-3758 appended).
Works its HEAD's cliffs head (`zap.c` obj_resists, 1
blocked: 95333 — verified head of the parent queue
@9fec5d504; tag SYMPTOM, so the writer — not the
symptom owner — is the deliverable).

## Intent vs deliverable

Promise (subject + D-log): 95333@345 C 2× `rn2(100) @
obj_resists` (64, 73) vs JS `rn2(5)=4 @ rndmonst_adj`
(same stream word, 64%5=4 — JS skipped exactly the 2
calls). Measured via temp DIAG (reverted): JS sat at
makemon's saddle gate ← medusa_empty_statue_at ←
load_medusa_2; the missing dice are
mongone→mdrop_special_objs per-item obj_resists(0,0)
for the rejected mon's 2-item invent. Both reached
copies call the live mongone at both disposals in C
order; generic copy keeps the splice as a named,
unreached-proof omit.

Diff actually adds exactly that. Promise and diff
match. rng.js untouched by the commit (DIAG claim of
"reverted" holds — only mklev.js in the js diff).

## Inventory

Changed JS (2 copies + async propagation):

- medusa_empty_statue_at reject/accept —
  `js/mklev.js` (~:5043 reject `:2374`, ~:5056 accept
  `:2387`).
  C: `sp_lev.c` create_object Medusa arm `:2356–2389`
  (reject `:2374` `mongone(was); was = NULL`; accept
  `:2387` `mongone(was)` after invent transfer).
- load_medusa_1 inline copy — same two disposals.
- load_medusa_1/2/3/4 → async; 5 helper call sites
  awaited (m3: 2, m2: 1, m4: 2); `mongone` added to the
  existing `./mon.js` import (no new edge).
- Generic `create_object` copy (`:22718`) — splice kept,
  unreached-proof comment added (comment-only).

## C ↔ JS fidelity

**Disposals exact.** C `:2374` reject
(`mongone(was); was = NULL`) and `:2387` accept-tail
(`mongone(was)` after the `while (was->minvent)`
transfer + `weight`) are JS line-for-line in both
reached copies. The reject loop2000 (`for i < 1000,
wastyp = rndmonnum`, makemon at 0,0
MM_NOCOUNTBIRTH|MM_NOMSG, `!resists_ston &&
!poly_when_stoned` break + propagate) is untouched and
matches `:2364–2376`.

**Callee LIVE.** `mongone` (`js/mon.js:3650`, ASYNC,
single export, zero clones — sym.mjs below) runs
mhp=0, isgd/grddead, ustuck-conditional unstuck,
`mdrop_special_objs`, `discard_minvent`, `m_detach` —
C `mon.c:3267–3283` per its (pre-existing) doc. The
mechanism re-verifies: `mdrop_special_objs`
(`js/mon.js:1867`, body read) calls `obj_resists_00`
per invent item → the 2 missing `rn2(100)` dice on the
reject path (invent intact), zero on the accept path
(invent already transferred) — exactly C's shape. The
old inline splice (fmon unlink + mx/my=0 +
minvent=null) is subsumed by discard_minvent +
m_detach; it was a diverging CLONE (no dice, no
detach), now a LIVE import.

**Async propagation complete.** All 4 loaders' sole
dispatch (`load_special_proto_body`, `js/mklev.js:3383–
3407`, body read) wraps each in `isThenable(p) await
p`. All 5 in-loader helper calls awaited. No sync
caller left (the 5 sites counted in the diff).

**Generic-copy omit verified (this audit).** The arm
fires only for `STATUE + NON_PM + medusa level`:
medusa-level l_create_object calls are exactly
{boulder, wand, crystal ball, egg} (grep over the
loader range) plus the one `id: 'statue'` Perseus call
(`:5068`) whose `montype: 'knight'` ⇒ corpsenm ≠
NON_PM ⇒ arm false (matches C, whose `:2356` gate also
requires `corpsenm == NON_PM`); direct create_object
callers are {amulet, luckstone, boulder} (all read);
`splev_create_object(null)` routes via mkobj (never
statues); medusa-1..4 des.object statue lines are
hand-ported to the helper/inline copies. The comment
carries a trigger ("If a STATUE+NON_PM path ever
routes here…"), so this is a named omit with a
falsifier, not a silent stub.

**Test.** 2 source wiring pins (fail pre-change —
authentic) + mdrop 2×rn2(100) contract. Re-ran: 3/3
(this audit).

sym.mjs on the wired callee (required paste):

```text
mongone          js/mon.js:3650   ASYNC — await required
```

## Hallucinations / overclaim

None. Diff grep: `getRngLog` appears only in the test
file (RNG-contract assertion, not production control
flow); "DIAG" only in the commit message (revert
verified — rng.js untouched). Zero production hits.
The cross-file caller note (nhlua/trap/potion JS sites)
is disclosed as pre-existing and out of scope, with
mongone's body unchanged — honest scoping, not a new
gap.

## Density

Cliff-phase §2b: parent head obj_resists (1 blocked,
RNG lost 41490); this commit ships the writer (the
mongone dice — SYMPTOM tag honored, symptom owner not
re-ported) with 1 moved (+1188, RNG complete). One
cliff, one C locus (`sp_lev.c:2356–2389`), no bundling;
the two "full mongone invent teardown" omit-line
retirements are the same locus. Correct gates incl.
full 44/44 on the shared file (claimed in D-log).

## Verification

D-log Verify (`verify.mjs --fn obj_resists,mongone`):
95333 345→1533 (RNG 66074/66074 complete,
screen-first getobj); reach obj_resists 80/80 spread +
mongone 24-smoke → REACH-OK; green/strict/cohort/full
PASS.

Re-measured by this audit (`verify obj_resists,mongone
--base 8901dc583~1 --reach-all`; HEAD code includes 6
later SHAs):

```text
verify obj_resists: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Ranger-95333: moved → getobj at step 1533 (was 345)
reach obj_resists: 776 baseline-PASS session(s) reach it (776 run, 403.3s): 776 PASS, 0 regressed → REACH-OK
verify mongone: no corpus session is blocked on it at 8901dc583~1 — a vacuous verify is NOT a corpus PASS. […]
smoke mongone: no RNG-tagged reach; fixed smoke spread (24 run, 13.3s): 24 PASS, 0 regressed → REACH-OK
```

Movement matches the D-log exactly (345→1533,
getobj); full reach on obj_resists (all 776, not the
80-spread) with 0 regressed. No vacuous check (row
cited 1; that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
