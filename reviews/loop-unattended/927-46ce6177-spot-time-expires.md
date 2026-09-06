# Review 927 — 46ce6177 — timeout.c spot_time_expires spot-timeout predicate singleton (D-1957)

Metadata: SHA `46ce6177`, D-1957, `js/mkobj.js` (one new function +
`spot_time_left` rewire to C's delegate shape). Reviewer re-ran both
C bodies, callers, sym, `coordxy` type, banned grep, and
`hidden-proxy verify --base`.

Intent vs deliverable: subject promises the absolute-timeout spot
query plus delegating `spot_time_left` per C. Diff actually adds
exported `spot_time_expires(x, y, action)` before `spot_time_left`
and rewires the latter to `expires > 0 ? (expires - moves)|0 : 0`.
Same-module change, no new imports. Promise kept.

Inventory: one new JS function (`spot_time_expires`,
`js/mkobj.js:1073`, sync) + one changed (`spot_time_left`,
`js/mkobj.js:1090`, sync, per `sym.mjs`). No helpers, clones, or
deleted symbols.

C ↔ JS fidelity — against `timeout.c:2444–2456` and `:2458–2463`
(via `csym.mjs`), confirm:

- `where = ((long) x << 16) | (long) y` → `(((x|0)&0xffff)<<16) |
  ((y|0)&0xffff)`. `coordxy` is `int16_t` (`global.h:71`); for all
  valid (non-negative) level coords the mask is identity, and the
  pack is byte-identical to the pre-existing `spot_stop_timers`
  sibling in the same file — consistent in-JS matching. Same.
- Triple match `kind == TIMER_LEVEL && func_index == … &&
  a_long == where`, first match wins (queue timeout-ordered) →
  identical with `| 0` int idioms. `return curr->timeout` →
  `curr.timeout | 0`, else 0. Same. No RNG either side.
- `spot_time_left` rewire vs `:2458–2463`: C `expires > 0 ?
  expires - moves : 0` → JS `expires > 0 ? ((expires -
  moves)|0) : 0`. Matches C exactly, including the edge shape
  (overdue timer yields ≤ 0, absent timer yields 0) — the old
  inline version agreed on all reachable states too, so the rewire
  is behavior-identical for live entries and C-shaped going
  forward.
- Live C callers (`nhlua.c:1548,1578` Lua bindings; `timeout.c:2461`
  the delegate) correctly named as unwired/pre-existing omits, not
  smuggled in.

Hallucinations / overclaim: none. The D-log additionally discloses
a measured adjacent defect it did NOT fix (`js/const.js`
`MELT_ICE_AWAY` string-vs-numeric-enum → `start_timer` stores
`action: 0`, ice-melt timers never fire) with blast-radius
reasoning — exemplary scoping, and out of this SHA's fidelity
surface (pre-existing, untouched by this diff). It has no queue row
yet (checked live + done); suggested as a future Open row, not a
Must-fix from this review since this commit neither introduced nor
kept it — it merely observed it.

Density: §2b right size — one predicate + its C-mandated delegate
rewire, one module. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
spot_time_expires` → PASS syntax/rule2/green/strict/cohort,
explicitly vacuous hidden note with no corpus-PASS claim, plus a
5-case timer/set/query/advance/stop probe (PROBE PASS). Reviewer
re-measured: `hidden-proxy verify spot_time_expires --base
46ce6177~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean; Rule #2 clean
(no imports touched).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
