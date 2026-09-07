# Review 986 — 72fbe787 — doup ledger-1 escape yn (D-2016)

Metadata: SHA `72fbe787`, D-2016, Open-row port (queue row
`do.c` doup, 4 sessions). js/ touches 1 file (`js/do.js`,
+5/−4: ledger arm + one import name). No stamp owed by this
SHA; sibling `348aed9e` (same subject, docs-only queue
archive, no js/) is covered here, not in its own file — but
its archive row reads `**Addressed:** D-2016` with no short
hash, filled in this iteration's grouped commit.

## Intent vs deliverable

Subject promises: ledger-1 escape asks `Beware, there will be
no return!` instead of refusing the stairs. Diff actually
adds: `debug_fuzzer` early `ECMD_OK`, else `await y_n(…)` with
`!== 'y'` → `ECMD_OK` and fall-through on `'y'`. Promise ==
diff.

## Inventory

- Changed JS function: `doup()` ledger arm only
  (`js/do.js:~2711`).
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required. No STUB/clone/no-op.
- Callee closure: `y_n` (`getline.js:1531`, returns the
  `yn_function` promise — the `await` is required and present)
  LIVE ✓; `ledger_no` pre-existing; `'y'` fall-through
  reaches `next_to_u`/`prev_level` → `goto_level` ledger<=0 →
  `done(ESCAPED)` (live per D-1764/D-1005, untouched).
  `y_n` extends the pre-existing static `./getline.js` edge
  (hoisted function, no new module, no TDZ).
- Named omits kept: rooted, stucksteed, u_stuck_cannot_go,
  encumbrance load gate (pre-existing; doc comment updated
  from "ledger 1 escape yn" omitted to live).

## C ↔ JS fidelity

C locus: `do.c:1330–1335` (`if (ledger_no(&u.uz) == 1) { if
(iflags.debug_fuzzer) return ECMD_OK; if (y_n("Beware, there
will be no return!  Still climb?") != 'y') return ECMD_OK;
}`). Verbatim confirm: `=== 1` ✓, fuzzer early-out in C
position (before the prompt, so fuzzers never block) ✓,
prompt string exact (`[yn] (n)` is appended by `y_n` itself:
`ynchars`/`'n'`/`TRUE` at `getline.js:1531`) ✓, `!== 'y'`
≡ C `!= 'y'` (covers 'n'/Escape the same way) ✓, both
returns `ECMD_OK` with fall-through preserved ✓. The removed
`pline("You can't go up here.")` correctly stays one arm
above (no-stairs `:1312–1315`, intact) — the old code had
pasted it into the wrong arm. No RNG in this arm.

## Hallucinations / overclaim

None. "C-verbatim" is earned line-for-line; downstream
`done(ESCAPED)` liveness is cited to an existing D-row, not
assumed.

## Density

13 js/ lines for a 6-line C arm plus import. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify doup --base
72fbe787~1` → `0 PASS, 4 moved past, 0 unchanged, 0 worse →
PROGRESS` (Barbarian-92208 → disclose@10; Healer-92227 →
disclose@13; Rogue-92160 → use_container@88; Valkyrie-92237
→ dofire@88) — identical to the D-log. (The first two
movers are the extra sessions my D-2015 re-run picked up
downstream — consistent chain, not drift.) Plus cited green
2/2 + strict ×2, cohort 7/7, full 44/44 (shared file
changed). js/ hunk grep: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward` (sole hit is the message
quoting Rule #2). Rule #2 clean.

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
