# Review 2629 — 1311dbb62 — Displaced clones read stored bits (D-3763)

Metadata. SHA `1311dbb62` (2026-10-10), D-3763, parent
`4b1f3e45b`. js diff: `js/monmove.js` +7/−6,
`js/mhitu.js` +5/−5, `js/shk.js` +6/−5 (live-cloak arm
deleted in all 3 Displaced clones; 2 consts + 1 import
removed) + `scripts/displaced-stored-bits.test.mjs`
(new, 5 its). No ledger jsonl touched (youprop macro,
no fn row). Works its HEAD's cliffs head (`monmove.c`
distfleeck, 1 blocked: 95303 — verified head of the
parent queue @e7ef706f9; tag SYMPTOM, writer
deliverable).

## Intent vs deliverable

Promise (subject + D-log): 95303@237 kind=rng — C
`rn2(5)=4 @ distfleeck` (first of 25, zero set_apparxy
draws all step) vs JS `rn2(4)=0 @ set_apparxy`
(gotu). Fresh level after the lua levelchange; 237 =
first monster turn. Temp-C measured the desync:
nhl_gamestate save clears worn extrinsics before
snapshotting u, restore re-wears before memcpy'ing
the snapshot back — so the worn cloak (uarmc=149)
carries EDisplaced 2→0, never re-conferred. C's
Displaced reads stored bits only (false here); JS's
clones added an invented live worn-cloak fallback
(true here) → forked set_apparxy into gotu. Delete
the invented arm in all 3 clones.

Diff actually adds exactly that. Promise and diff
match. No new imports/edges.

## Inventory

Changed JS (3 clones):

- Displaced — `js/monmove.js:753` (export),
  `js/mhitu.js:238`, `js/shk.js:4686`.
  C: `youprop.h:202–204` (`HDisplaced`/`EDisplaced`
  defines + `Displaced (HDisplaced || EDisplaced)` —
  body read; stored `u.uprops[DISPLACED]` bits only).

## C ↔ JS fidelity

**Predicate now exact.** All 3 clones are `H ||
uprops.intrinsic → true; else !!uprops.extrinsic` —
C's `HDisplaced || EDisplaced` over stored bits. The
deleted arm (`uarmc.otyp === CLOAK_OF_DISPLACEMENT`)
has no C counterpart: C never reads the worn cloak
live for this predicate (conferral writes EDisplaced
at wear time; the desync case leaves it 0 — the
temp-C measurement). The removed arm was a diverging
CLONE invention in all 3 files; the kept checks are
the C predicate.

**Completeness verified (this audit).** sym.mjs lists
a fourth Displaced at `js/teleport.js:338` — body
read: it uses `_uprop_he` (stored H/E flats + uprops
I/E, body read), with no live-cloak arm, so it
already matched C and needed no touch. Repo-wide grep
for remaining displacement cloak reads finds only
legitimate sites (do_wear conferral arms, mplayer kit
roll, objects export, wish parser, u_init kit) — no
other live-cloak predicate. All 4 Displaced sites are
now stored-bits-only; the fix is complete, not 3/4.

**Mechanism end-to-end.** `set_apparxy`
(`js/monmove.js:1028–1030`, body read): `notthere =
Displaced() && mndx !== PM_DISPLACER_BEAST` → with
the desync state Displaced() is now false → displ=0 →
no gotu `rn2(4)` → C's distfleeck `rn2(5)` aligns.
The old `true` forked exactly the measured extra
draw.

**Dead-code removal safe.** No remaining
CLOAK_OF_DISPLACEMENT uses in the 3 files
(grep-verified — no ReferenceError); the dropped
monmove.js import name is gone from its import list
only. No symbol deleted or re-pointed (clone arms,
not symbols), so no sym.mjs paste is owed beyond the
clone census above:

```text
Displaced        js/monmove.js:753   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files
               js/mhitu.js:238  js/shk.js:4686  js/teleport.js:338
```

**Test.** 5 its: post-gamestate cloak→false,
conferred bit→true, H-intrinsic→true, neither→false,
set_apparxy zero-draw snap. Re-ran: 5/5 (this audit);
D-log's 3/5 pre-fix (exactly the 2 desync cases fail)
is the authentic shape.

## Hallucinations / overclaim

None. Diff grep: `getRngLog` only in the test
(zero-draw assertion, not production control flow);
"DIAG/FORCE/seed" only in the commit message's own
denial — zero production hits. The temp-C revert
paragraph (pristine md5, byte-identical re-record) is
a hygiene claim this audit cannot re-run cheaply, but
it makes no code claim — and the corpus movement
below independently confirms the mechanism. The
save.c-restore-extrinsic unaudited note is disclosed
with its no-session-reaches reason.

## Density

Cliff-phase §2b: parent head distfleeck (1 blocked,
RNG lost 33995); this commit ships the writer (the
Displaced predicate desync — owner SYMPTOM untouched)
with 1 moved (+720). One cliff, one C locus
(`youprop.h:202–204`), no bundling (the 3 clones are
the same predicate, all required). Correct gates incl.
full 44/44 on shared files (claimed in D-log).

## Verification

D-log Verify (`verify.mjs --fn distfleeck`): 95303
237→yn_function@957; reach-all 976/976 → REACH-OK;
gates + full PASS.

Re-measured by this audit (`verify distfleeck --base
1311dbb62~1 --reach-all`; HEAD code includes 1 later
SHA):

```text
verify distfleeck: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Ranger-95303: moved → yn_function at step 957 (was 237)
reach distfleeck: 976 baseline-PASS session(s) reach it (976 run, 504.1s): 976 PASS, 0 regressed → REACH-OK
```

Movement matches the D-log exactly (237→957,
yn_function); full reach-all on the owner, all 976,
0 regressed. No vacuous check (row cited 1; that
session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
