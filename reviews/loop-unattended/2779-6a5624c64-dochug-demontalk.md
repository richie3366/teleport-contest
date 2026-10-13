# Review 2779 — 6a5624c64 — dochug mux-match demon_talk wiring

- **SHA:** `6a5624c64` (Tue 2026-10-13) — cliffs-head `minion.c` demon_talk writer (D-3926).
- **D-entry:** D-3926. **Ledger:** `dochug` ported (Demonic Blackmail whole).
- **Diff size:** `js/monmove.js` +9/−4 (one else arm + comment refresh); new test `scripts/dochug-demon-talk.test.mjs`.
- **Method:** cliff commit, 1 arm — whole Method on the Blackmail block + callee closure.

## Intent vs deliverable (promise vs diff)

The subject promises: dochug's Demonic Blackmail carried the mux-match
half as a named omit, so C entered `demon_talk` (drawing `rnd(80)` for
the blackmail demand) while JS fell through to want_move
(Knight-587109 s700); the fix wires the live `demon_talk` via dynamic
import with `if (await demon_talk(mtmp)) return 1;` in C order; probe
goes 700→PASS.

The diff actually adds: the `else` arm (dynamic import + paid-off return),
a C-cite comment, and a doc comment refresh dropping the named omit. No
static edge, no other edits. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | Blackmail else arm (monmove.js:2808-2814) | monmove.c:823 | wired (was named omit) |
| 2 | test `dochug-demon-talk.test.mjs` | Knight-587109 s700 envelope | new, in scripts/ |

No symbol deleted or re-pointed (a named omit → import is not a clone
removal — no local clone existed); no `sym.mjs` re-point output is
required. The required `--can` output (kept dynamic import, cycle
question) is pasted below.

## C ↔ JS fidelity

C locus: `monmove.c:689-989` (`csym.mjs dochug` range); Blackmail block at
:802-825, walked branch-for-branch:

- **Gate** (`:803-805`): `nearby && MS_BRIBE && mpeaceful && !mtame &&
  !u.uswallow` → JS (monmove.js:2791-2793) identical.
- **Mux-mismatch arm** (`:806-822`, pre-existing JS, verified): whisper
  message with the `cansee ? Monnam : 'It'` subject, `is_demon →
  tele_restrict/rloc`, else `minvis = perminvis = 0`, `canseemon →
  set_msg_xy`, "gets angry!", `mpeaceful = 0`, `set_malign` — all in C
  order. (`display_canseemon` is the live canseemon equivalent.)
- **Mux-match arm** (`:823-824`, new): C `else if (demon_talk(mtmp))
  return 1; /* you paid it off */` → JS `else { const { demon_talk } =
  await import('./minion.js'); if (await demon_talk(mtmp)) return 1; /*
  you paid it off */ }` — C order, C semantics, comment preserved.

Callee closure:

- `demon_talk` — LIVE: `sym.mjs` → js/minion.js:585 async export,
  awaited. Body whole per D-3250 (pre-existing, untouched); the probe
  session PASSES *through* the demand path (C's `rnd(80)=58` now drawn
  in JS), proving liveness end-to-end.
- No STUB, no CLONE, no OMIT left in the block. "Demonic Blackmail now
  whole vs C `:802–825` (both arms live)" — true.

Required `--can` output (dynamic import kept; is the cycle claim real?):

```
VERDICT: SAFE — every name requested is a hoisted function declaration.
Same shape as the 1866 edges already in js/. Cite this instead of a clone.
```

A static edge would also be safe (same SCC, hoisted fn), so the dynamic
import is conservative rather than forced — but it matches the proven
sounds.js MS_BRIBE-site pattern verbatim (sounds.js:1716-1718: `const {
demon_talk } = await import('./minion.js');`), which I confirmed in the
file. No new static edge either way. Not a blocker, not a wrong.

## Hallucinations / overclaim

- The D-log labels the extra `verify dochug` "0 blocked (vacuous,
  expected — dochug was never the owner)" and hangs movement on `verify
  demon_talk` — honest framing; my re-measure confirms the demon_talk
  PASS it claims (full 934-step marathon PASS).
- "demon_talk body untouched (whole per D-3250)" — the diff touches only
  monmove.js; true. No overclaim found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `minion.c`
demon_talk blocking scen-sweep-Knight-587109 at step 700 (verified in
`6a5624c64~1:docs/LOOP-QUEUE.md`, top row, RNG lost 15701). Owner stands
whole per D-3250 (read once per tag — the divergence is the unwired
*caller* in dochug, correctly identified); this commit wires exactly the
named caller arm with its own Ledger row. The D-log ran full 44/44 (auto:
shared file monmove.js) — correct gate. One cliff, code + ledger + verify
in one handoff. Rule #2: `imports.mjs --rulecheck` → clean (run this
iteration, cited for all 9 SHAs).

## Verification

Re-measured myself:

```
verify demon_talk: baseline 6a5624c64~1 — 1 session(s) blocked on it
  scen-sweep-Knight-587109: PASS
verify demon_talk: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke demon_talk: no RNG-tagged reach; fixed smoke spread: 24 PASS, 0 regressed → REACH-OK
```

D-log's "1 PASS" reproduced exactly; smoke 24/24 (no RNG-tagged reach set
exists for demon_talk, so the fixed smoke spread is the correct REACH
instrument — no vacuous check). No REGRESSED session. Movement + REACH-OK:
satisfied. New test failed `0 !== 1` pre-fix / 1/1 post-fix per the D-log
(authentic red).

## Actionable C-wrongs

None. The arm matches C branch-for-branch with a fully live callee, and
the corpus claim re-measures clean.

Verdict: **ACCEPT**
