# Review 2085 — be48bbe4a — reorder_invent gold-arm fix

- SHA: `be48bbe4a` (D-3125)
- Subject: "`invent.c` reorder_invent inv_rank gold-arm fix + 2 stale (coverage)"
- js/ insertions: ~6 (js/u_init.js + js/invent.js; arms deleted)
- Prior index: 2084; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: remove the invented gold→−1 arm from both inv_rank
copies (C's macro is pure `invlet ^ 040`) + 2 stale declares.

Diff actually adds: 2 cite comments and 2 arm deletions.
Matches the promise; the bubble is untouched as claimed.

## Inventory

Per function (1 code + 2 stale):

- `reorder_invent` (js/u_init.js:920 local + js/invent.js:9312
  `reorder_invent_adjust` clone) — C invent.c:738–767 (csym
  range) + inv_rank macro :735, `#undef` :769. Live: whole
  body now; both rank copies fixed.
- `clearrolefilter` (js/player_selection.js:80, export) —
  stale; body verified ≡ C role.c:1357–1381 (RS_filter
  fallthrough, 4 mask arms, `roles.length` 13 ≡
  SIZE(roles)−1 — sentinel-free table documented :1073).
- `this_type_only` (js/invent.js:1650, local) — stale; body
  verified arm-for-arm vs C :3792–3823 (P/coin-BUCX/B/U/C/X +
  default-keeps-res).

Helpers: none added. `inv_rank` is the in-file C macro
(:735–769), not an export clone. Nothing deleted (dead arm
only) or re-pointed. Nit: `GOLD_SYM_ADJ` (js/invent.js:8425)
is now unused — its sole consumer was the deleted arm.
Harmless; a future iter can drop the line.

## C ↔ JS fidelity

The removed arm was a genuine invented C-wrong: C `:735` is
`#define inv_rank(o) ((o)->invlet ^ 040)` with no gold
exception, so gold '$' ranks 4 — after no-free-letter '#'
(=3), not first. The /tmp probe (old [$ # …] vs C [# $ …])
corroborates; the divergence needs a 52-letter-full pack,
which is why no session caught it.

Bubble equivalence verified, not trusted: C's linked-list
pass compares the demoted element against its new next after
a swap (otmp stays, `prev = next`); the JS index pass does
the same (i advances past the promoted element, next compare
is demoted-vs-new-next). Same comparator + same fixpoint
loop ⇒ identical order. The `length<2` early return ≡ C's
single no-swap pass. No RNG either side.

Callers: all 3 C sites wired — :1121 (invlet_constant-gated,
gate verified in C :1117–1121) → :1137; :5266/:5275 (ungated)
→ :9722/:9729 via the fixed clone. Stale callers per D-log
table with JS sites.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "One real C-wrong arm" is accurate; "0 blocked" is a
note.

## Density

~6 insertions for a 1-arm fix + 2 stales — fix-class, not a
cluster; the <80 exception is reasonable (invent.c exhausted
per D-log; head file was role.c → invent.c chaining). The
DIVERGENCE-INDEX.md +6255 in this SHA is a docs rebuild, not
scope. Per-function verdicts: all three ACCEPT. SHA: ACCEPT.

## Verification

Re-measured (`--base be48bbe4a~1 --reach-all`, all 3 in one
call — the D-log ran only the head): 0 blocked at baseline
and working tree each, vacuous notes, smoke 24/24 → REACH-OK
×3. No REGRESSED session. Shared gates per D-log: syntax
2 files, rule2, green 2/2, strict ×2, cohort 7/7 + full
44/44.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
