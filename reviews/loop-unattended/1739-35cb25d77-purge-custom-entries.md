# Review 1739 — 35cb25d77 — purge custom entries (D-2780)

- SHA: `35cb25d77` (`glyphs.c` purge_all_custom_entries + purge_custom_entries, D-2780)
- Files: `js/glyphs.js` (+55/−0), docs (incl. a queue-head stale-row deletion + refill)
- Queue row: Open coverage (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises both teardown bodies. Diff delivers: exported
`purge_all_custom_entries`, module-local `purge_custom_entries`, zero
new edges. Complete; no gap found.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `purge_all_custom_entries` (new, export) | C body | `glyphs.c:750–758` |
| `purge_custom_entries` (new, local) | C body | `glyphs.c:760–794` |

Nothing deleted or re-pointed. No callees beyond the grid itself.
Constants re-verified: `custom_none..custom_count` = 0..4 and
PRIMARYSET/ROGUESET/NUM_GRAPHICS/UNICODESET = 0/1/2/2 match
`sym.h:125–139` exactly; grid is `[NUM_GRAPHICS+1][CUSTOM_COUNT]` =
[3][4] per `decl.h:857–860` ✓.

## C ↔ JS fidelity

Walked both bodies line by line: inclusive `i < NUM_GRAPHICS + 1`
loop ✓, `| 0` set index ✓, `CUSTOM_NONE..CUSTOM_COUNT` loop ✓,
`next`-saved chain walk ✓, three `custtype` arms in C order (urep
conditional-free + unconditional null; sym `symparse=null, val=0`;
ccolor `nhcolor=0, glyphidx=0`) ✓ with shape guards that pass for
every shape the live writers produce (only ccolor chains exist;
the guards are documented totality for the unlanded writers, and
the writes are unobservable past the unlink anyway) ✓,
`details/details_end = null` ✓, name null under `!== null`
(correctly mirroring C's pointer test — `""` still nulls) ✓,
`count = 0` ✓, `free` ≡ unlink (GC, file precedent) ✓.
Callers: `freedynamicdata` (save.c:1077, call at :1090 — NOTES
guard, never ported) and `clear_symsetentry` (symbols.c:319, call
at :347 — own row when emitted), both cited correctly and named.
No RNG.

The queue-head deletion (five headerless newcham/getobj/yn_function/
getdir/mon_arrive rows as Stale-park dupes) matches the documented
never-re-pop set; the refill rows are verbatim tool output.

## Hallucinations / overclaim

None.

## Density

~45 behavior lines for 44 lines of C: C is that small, so the size
is correct, not a failed handoff.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify purge_all_custom_entries
--base 35cb25d77~1 --reach-all`: 0 blocked + vacuous note (expected)
+ smoke 24/24 REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
