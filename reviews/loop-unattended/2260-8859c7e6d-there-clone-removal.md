# Review 2260 — 8859c7e6d — There clone removal + canonical rewire

Metadata: SHA
`8859c7e6dcb62fef66d1316e9d13fa273fd53366`
(D-3299, 2026-10-02). `js/do.js`
only (+2/−4: import name +
clone deletion). No new
function; one divergent clone
removed.

Intent vs deliverable: subject
promises the do.js There clone
removal with canonical import
rewire. The diff ships the
deletion, the C-cite comment,
and the import name. Delivers
what it promises.

Inventory:

- Deleted: module-local `async
  function There(line)` (do.js:
  505) — single-arg, routed via
  pline, dropped format args.
- Added: `There` to the
  existing ./display.js import
  (do.js:65). No new edge.
- Untouched: canonical `export
  async function There(fmt,
  ...args)` (display.js:7915).

**C ↔ JS fidelity**:

C There (pline.c:424–433 per
csym): `vpline(YouMessage(tmp,
"There ", line), the_args)` —
prefix the format, forward
varargs ✓. The canonical JS
export is `vpline(\`There
${fmt}\`, ...args)` with a
null/empty guard: You_buf
growth (:338–348) is malloc
mgmt with no JS counterpart,
correctly absent; the guard is
the file idiom shared by all
five siblings (You/Your/
You_cant/pline_The/There at
:7899–7917, all complete
variadic bodies — read) ✓.

Behavior-neutral at the sole
caller, verified three ways:
(1) only one `There(` call
exists in do.js (:750,
doaltarobj) and the clone was
module-local/unexported, so it
provably served just that
site; (2) the call passes a
single preformatted template
literal — zero format args to
drop; (3) old path
`pline(\`There ${line}\`)` ≡
new path `vpline(\`There
${fmt}\`)` because JS pline is
literally `vpline(fmt,
...args)` (display.js:8274),
so even a `%` in the composed
string formats identically.
Async shape preserved (both
async, site awaits) ✓.

`sym.mjs There`: single
`js/display.js:7915 ASYNC`
export, zero locals ✓
(required: deleted clone).
`imports.mjs --can do.js
display.js There`: ALREADY ✓.

Ledger retirements (7 rows):
You/You_cant/pline_The stale-
ported (bodies read at
:7899–7914, complete) ✓;
You_buf/free_youbuf by-design
(buffer mgmt) ✓; cmdq_clear/
cmdq_pop stale-ported (exports
read at cmd.js:310/391) ✓.

Hallucinations / overclaim:
none. The unaudited 54-site
C→JS mapping is named as an
audit omission, and the
zero-delta-outside-do.js claim
rests on scoping (provable),
not on the unaudited mapping.

Density: singleton rewire
cluster (2 insertions). Below
the bar, defended in the open:
the deliverable is a deletion,
and pline.c holds nothing more
shippable (by-design + retired
DUMPLOG). Own `Ledger:` +
Verify ✓.

Verification: D-log Verify
pastes the tail verbatim
(LOAD-OK + syntax/rule2 +
vacuous-hidden disclosed +
smoke + green/strict/cohort +
full 44/44). Re-measured
(`hidden-proxy verify There
--base 8859c7e6d~1
--reach-all`): `0 blocked` +
`smoke 24 PASS, 0 regressed →
REACH-OK`. Match; zero
REGRESSED. Banned grep: clean.
Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
