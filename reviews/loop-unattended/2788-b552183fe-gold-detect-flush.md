# Review 2788 — b552183fe — gold_detect spurious flush removal

- **SHA:** `b552183fe` (Tue 2026-10-13) — getpos cliff writer (D-3935).
- **D-entry:** D-3935. **Ledger:** `gold_detect` ported (D-3935 prepended; stamp predates via D-1773).
- **Diff size:** `js/detect.js` +3/−1 (comment + 1 deleted call) + new test (1 it). Board: 4 rows.
- **Method:** cliff commit — whole Method on the changed function (full C walk, since the arm check is load-bearing).

## Intent vs deliverable (promise vs diff)

The subject promises: `gold_detect` ran a spurious `flush_topl_more`
between the sense pline and `browse_map`, splitting C's single topline
with `--More--`; deleting it (the D-2081/D-2242/D-3769 class) gives 3
PASS + 1 moved 309→972, with the getpos owner proven whole and not
re-ported.

The diff actually deletes exactly that one call, replacing it with a
3-line C cite. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | flush deletion (detect.js:2049) | detect.c:471 (in `gold_detect` :334–475, csym-exact) | the fix |
| 2 | `gold_detect` body (unchanged otherwise) | detect.c:334–475 | walked arm-for-arm below |
| 3 | test (gold-detect-topline-join, 1 it) | Valkyrie-610121 s309 | new, 1/1 green at HEAD |

No import, signature, or caller change (`flush_topl_more` still used
at :400; display_trap_map's :1449 is its own dynamic import —
unchanged). No symbol deleted or re-pointed; no `sym.mjs` re-point
output required.

## C ↔ JS fidelity

C tail (read in file): `You_feel("very greedy, and sense gold!")`
→ `exercise(A_WIS, TRUE)` → `browse_map(ter_typ, "gold")` — no
flush/`more()` between ✓; then `map_redisplay(); return 0` (JS has
both, plus pre-existing `reconstrain_map` display hygiene). C
getpos.c:843–846 verbose arm is a second `pline("(For instructions
type a '%s')")` joining the same topline — the flush demonstrably broke
the join C relies on. ✓ Sole C caller read.c:2041
`(confused||scursed) ? trap_detect : gold_detect` ≡ JS
read.js:1341–1343. ✓

Full-body walk (C :334–475 vs JS :1894–2060): `gk.known=stale` init
(C re-initializes per call, so JS's local is equivalent) →
fmon search (steed/under-me gates, findgold/gold-golem, blessed
o_material / o_in COIN) → floor search (same, with at-me gate) →
no-gold arms (gold-golem buf / `money_cnt||hidden_gold` worried buf —
JS `have_coins` truthiness-equivalent as claimed / steedgold
interested buf with identical x_monnam args / materially poor) →
strange_feeling + return 1 → stale→docrt + under-me pline →
outgoldmap cls/unconstrain → fobj/fmon map loops (fake-gold `rnd(10)`
both sides, temp-ox/oy + ugold) → !ugold newsym+TER_MON → sense
sequence. Every arm present in C order; the deleted flush was the only
extra statement. RNG: identical draws both sides (rnd(10) fake-gold
quan); the flush drew nothing, so the change is screens-only by
construction, matching the 4 screen-kind sessions with 0 blocked RNG. ✓

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- "Focused test red pre-fix … → 1/1 green": 1/1 green at HEAD
  (re-ran); the red state quotes the exact board symptom. ✓
- D-2242/D-3769 "left this flush for future rows" + getpos already
  whole: the refusal to re-port the owner is disciplined and the
  movement proves the writer diagnosis. Board diff: exactly the 4
  claimed rows (838/505/405→PASS, 309→cprefx@972). ✓ None found.

## Density

Cliff phase (§10.18): parent head was getpos 4/2296 (verified in
`b552183fe~1:docs/LOOP-QUEUE.md`, first at step 838 as cited);
Must-fix empty. Owner-vs-writer correctly resolved (owner whole per
D-2242/D-3556/D-3769, read once per the history tag; the shipped
writer is the named sibling those entries left open). One cliff, ledger
touch, movement + REACH-OK in one handoff (full-44 skipped per runner:
unshared file — the D-log says so explicitly). ✓

## Verification

Re-measured myself (`--base b552183fe~1 --reach-all`, current code):

```
verify getpos: baseline b552183fe~1 — 4 session(s) blocked on it (4 at baseline, 0 in the working scoreboard)
  scen-sweep-Ranger-49956049: PASS
  scen-sweep-Valkyrie-610121: moved → cprefx at step 972 (was 309)
  scen-sweep-Wizard-49950069: PASS
  scen-worldtour-Wizard-587313: PASS
verify getpos: 3 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
smoke getpos: no RNG-tagged reach; fixed smoke spread (24 run, 21.2s): 24 PASS, 0 regressed → REACH-OK
```

The D-log's "3 PASS, 1 moved past" reproduces session-for-session,
including the 309→972 cprefx destination (610121 still cprefx-blocked
in the current queue — no later SHA disturbed it). No REGRESSED
session.

## Actionable C-wrongs

None. One-call deletion at the exact C-cited point, full body walked
clean, movement reproduces exactly.

Verdict: **ACCEPT**
