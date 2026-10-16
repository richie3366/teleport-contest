# Review 2852 — d9747bd2c — feeltrap gains the map_trap vision override

## Metadata

- SHA: `d9747bd2c0c5dc4bca19a86d6c915c978b8233ed` (D-4008)
- Cliff writer: `digactualhole` head, 7 blocks (6 PASS +
  Barbarian 492→828)
- js/ diff: `js/trap.js` +8/-1 (map_trap call + import name +
  comment); new `scripts/feeltrap-unseen-paint.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: 7 sessions show identical "You dig an adjacent pit."
toplines with full RNG match, but C paints `^` where JS shows
stale memory (blank / object / floor) — `feeltrap` set tseen
and called newsym but omitted C's `map_trap(trap, 1)` vision
override, so a felt-but-unseen pit never painted. Call the
live `map_trap(trap, 1)` between tseen and newsym, in C order.

Diff actually: the call + import + comment. Promise == diff.

## Inventory

- `feeltrap` (`js/trap.js:2625-2630`, C `trap.c:3587-3594`
  via `csym.mjs`): map_trap call added.

## C ↔ JS fidelity

- C body (`:3587-3594` read): `trap->tseen = 1;
  map_trap(trap, 1); /* in case it's beneath something,
  redisplay the something */ newsym(trap->tx, trap->ty);`
  ✓ — JS is now statement-identical in the same order.
- The contrast that proves the call is the override ✓ — C
  `seetrap` (`:3577-3584` read) is tseen + newsym only; the
  D-log's "like seetrap() but overrides vision" gloss is
  exact, and the old JS comment ("redisplay via newsym →
  map_trap") described seetrap, not feeltrap — correctly
  rewritten.
- Callee LIVE ✓ — `sym.mjs map_trap`: `js/display.js:2380
  sync`; body read C-exact vs `display.c:295-305`
  (hero_memory write + `show_glyph` iff show). Added to
  trap.js's existing display.js import block — no new edge;
  `display.js` imports `trap.js` 0 times (grepped), so no
  cycle and no TDZ concern. `newsym` (`display.js:6462`)
  likewise live; its vision arms (cansee paints live,
  !cansee re-shows `remembered_glyph`) corroborate the
  mechanism: without the override newsym re-displays stale
  memory; with it, memory holds `^` first and newsym then
  re-covers any monster/object atop — C's "beneath
  something" order.
- Full RNG match on all 7 probes (Knight 16878/16878 quoted)
  is consistent with a paint-only fork: no draws in any of
  the three statements either side.

Diff grep clean; Rule #2 iteration-wide clean (review 2844).

## Hallucinations / overclaim

None. One display artifact chased down, not a throw: my
re-measure line reads "moved → js-throw at step 828", but
`hidden-proxy show` on the same row says kind=screen,
owner=null, error=null, jsPanic=null, and the frozen runner
agrees (FAIL 828/1568, error:null). Source found:
`hidden-proxy.mjs:947` prints `${r.owner || 'js-throw'}` —
a fallback label for owner-null rows, not a throw. No
Must-fix (tooling display string in an unscored script;
reviews don't edit loop scripts) — filed as a journal
tooling note instead.

## Density

Cliff writer on its HEAD's head: 7 blocks → 6 full PASS +
1 moved 336 steps (492→828). Ledger: `feeltrap ported`
+D-4008, single-function entry. Committed test re-run green
(1/1; asserts the recorded `^` at row18c8 + memory + tseen).

## Verification

D-log: `verify digactualhole: 6 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS`. Re-measure (`--base
d9747bd2c~1 --no-reach`, HEAD code, twice): **6 PASS, 1 moved
past, 0 unchanged, 0 worse** — the same six sessions PASS by
name; Barbarian `moved (was 492)` to step 828. Exact match,
and the `(was 492)` start closes review 2851's loop: D-4007's
351→492 endpoint is confirmed from D-4008's own baseline.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
