# Review 1630 — 5dcb0beb — sp_lev.c flip_encoded_dir_bits whole-body port (D-2671)

**Metadata:** SHA `5dcb0beb`, `sp_lev.c`
`flip_encoded_dir_bits` + callee `swapbits`,
D-2671. JS: `js/hacklib.js` (+7) +
`js/mklev.js` (+30/−1). No Must-fix.

## Intent vs deliverable

Subject promises: the missing
`flip_encoded_dir_bits` + its callee
`swapbits` + wiring both conjoined-pit flip
arms. Diff delivers exactly that: live
`swapbits` export, module-local
`flip_encoded_dir_bits`, two caller arms.
Nothing else in `js/`. Promise matches
deliverable.

## Inventory

- `swapbits` (hacklib.js:28, sync, new
  export) — C home, exact body + `|0`.
- `flip_encoded_dir_bits` (mklev.js:17051,
  sync, file-local) — C `staticfn` stays
  module-local, correct. Required `sym.mjs`:

```text
swapbits         js/hacklib.js:28   sync
flip_encoded_dir_bits NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:17051
```

Single export, one local only — no clone of
an export, no deleted or re-pointed symbols
(both functions were absent before).

## C ↔ JS fidelity

C loci read: `sp_lev.c:498–514` (17 L) +
`hacklib.c:831–837` (7 L) via `csym.mjs`,
plus caller arms `sp_lev.c:595–616` read
directly. No RNG. Confirm:

- `swapbits`: xor-of-bit-pair into `tmp`, xor
  back into both positions — JS identical
  plus `|0` int coercions (correct
  adaptation; `>>` is arithmetic both
  sides).
- `flip_encoded_dir_bits`: `flp&1` swaps
  1↔7, 2↔6, 3↔5 and `flp&2` swaps 1↔3, 0↔4,
  7↔5 — pairs and order exact, with the
  xdir/ydir-order dependence cited.
- Callers verified against C `:595–616`:
  each arm sits in its own `if (flp&N)`
  block as `else if (is_pit && conjoined)`
  passing the full `flp` mask — JS replicates
  both, including C's double application
  when `flp&3==3`, without "fixing" it.
- Forward declaration `:27` correctly not
  treated as a call site. No C caller left
  unwired.

## Hallucinations / overclaim

None. D-log's bit-logic probe claim
(involution over 256 values) is plausible
support, not a substitute for the arm-by-arm
match, which holds.

## Density

Whole 15-line C function plus 7-line callee
plus 2 caller arms, two files. Right-sized.

## Verification

D-log Verify claims PASS with 0 blocked +
smoke REACH-OK + full 44/44 for the
shared-file change — honest vacuous note.
Re-ran `hidden-proxy.mjs verify
flip_encoded_dir_bits --base 5dcb0beb~1
--reach-all`:

```text
verify flip_encoded_dir_bits: baseline 5dcb0beb~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke flip_encoded_dir_bits: no RNG-tagged reach; fixed smoke spread (24 run, 6.5s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
