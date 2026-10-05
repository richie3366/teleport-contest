# Review 2407 — a99782e30 — oname untwoweapon gates

## Metadata

- SHA: `a99782e30` (2026-10-05) — D-3490.
- Subject: Batch oname: untwoweapon You() via async-caller gates
  (do_oname + dipfountain) + impossible Open-head audit.
- Diff: `js/do_name.js` (+17/−2: import name + do_oname gate + oname doc),
  `js/fountain.js` (+9/−0: import + dipfountain gate), `js/wield.js`
  (+5/−1: export string), new `scripts/oname-untwoweapon.test.mjs`
  (90 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  1 fn (oname). No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) oname stays
sync (18 C callers, async cascade rejected) while the :403–404
untwoweapon You() lands at the two uswapwep-capable async callers via
snapshot-then-triple-gate (house dowield-quiver idiom), at exactly C's
topline point (do_oname: C prints nothing before return :367–368;
dipfountain: before discover_artifact :431→:433); (c) 18-site caller
census proves only those two can pass uswapwep; (d) oname flips to
`ported`, no omits.

The diff actually adds: the wield export, the do_oname gate
(`was_twoweap` + identity + flipped), the dipfountain gate, and the doc
updates. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `oname` (do_name.js:1330, unchanged body) | whole C function | do_name.c:371–426 | whole |
| do_oname gate (:258–268) | caller-side async emission | do_name.c:367–368 + wield.c:905–914 | whole |
| dipfountain gate (:1178–1189) | caller-side async emission | fountain.c:431–433 + wield.c:905–914 | whole |
| `can_no_longer_twoweap` (wield.js:43) | C string export (name-add / new edge) | wield.c:905–914 `You` arg | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (do_name.c:371–426 via `csym.mjs oname`; untwoweapon wield.c:905–914):
lth+truncate :380–386, exist-guard :391–392, new_oname+copy :394–396,
artifact_exists :398–399, oartifact arms :400–419 (untwoweapon :403–404,
set_artifact_intrinsic :406–407, alter_cost :409–410, via_naming livelog
:411–418), carried+update :420–421. `untwoweapon`: `if (u.twoweap)` →
`You("%s.", …)` + set_twoweap(FALSE) + update_inventory().

Branch-by-branch confirm:

- Truncation — C lth=PL_PSIZ + first PL_PSIZ−1 chars; JS `n.slice(0,
  PL_PSIZ-1)`, lth=n.length+1=PL_PSIZ. Equivalent. OK.
- Exist-guard / copy / artifact_exists — same predicates, same order. OK.
- untwoweapon state — JS inline `if (obj === u.uswapwep && u.twoweap) {
  set_twoweap(false); update_inventory(); }` replays C's guard+effects
  for ALL callers; only the async-incompatible `You()` moves out. OK.
- Gate exactness — triple condition (was-twoweap + still-uswapwep +
  now-flipped) replays C's `u.twoweap` guard: twoweap flips only in that
  inline, oname always returns the same ref, and identity `===` is C's
  `==`. C's `You` precedes only livelog lines (log, not topline), so the
  topline position is exact. String `You ${…}.` ≡ `You("%s.", …). OK.
- do_oname position — C :367–368 is `oname(); nhUse(); }`: nothing prints
  after. Gate emits then returns. OK.
- dipfountain position — gate sits between `oname()` and
  `discover_artifact` (silent), matching C :431→:433. `u` in scope
  (:1138, function head :1137). OK.
- Census (re-checked, all 24 `csym --callers` refs): pray :907 obj ∈
  {uwep, 0, fresh book} (`obj = ok_wep(uwep) ? uwep : 0` :833; :894
  re-sets uwep only), :929/:955 fresh mksobj; artifact.c:281 via fresh
  mkobj ×3 (:891/:1100/:1255), mon-owned mplayer.c:266, NULL pray.c:1798;
  invent.c:844 merge target can only fire the arm via a non-artifact
  artifact-named stack — impossible (naming creates at once, else the
  exist-guard early-returns); wish/pickup/mail/sp_lev/topten/mkobj/
  makemon/mon all fresh/mon/level-def. Only do_oname + dipfountain can
  pass uswapwep with a created artifact. TRUE.
- `ported` flip — TRUE: body whole, RNG-free, every caller wired (Callers
  table), no remainder.

Required `sym.mjs` output (diff exports the string, re-points nothing):

```text
can_no_longer_twoweap js/wield.js:43   sync   export const
```

Edge check: parent-tree fountain.js has zero `wield.js` imports, so
fountain→wield is a NEW static edge (do_name→wield is a name-add). New
edge lands in the existing SCC; the binding is read only at call time
inside dipfountain — no top-level TDZ read. Rule #2 clean.

## Hallucinations / overclaim

Two prose nits, both non-behavioral: (1) subject/D-entry call the
fountain edge "lazy-read inside dipfountain" — the diff adds a top-level
static import (only the *read* is call-time, which is the property that
matters); (2) the pray citation "obj=uwep (:894)" points at the SPBOOK
re-assignment, while the operative fact is the :833 init + fresh mksobj
at :929/:955. The census conclusion survives both.

## Density

Breadth-phase small SHA: 1-fn manifest (oname) fully covered —
`Ledger: oname ported; impossible audited`, `Left open: none`, one Verify
line each. Per-function verdicts:

- `oname` `ported` — body whole, caller census true, gates C-exact. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(`imports.mjs --rulecheck` across scored `js/`).

## Verification

- D-log: `verify.mjs --fn oname,impossible` → syntax/rule2 PASS, 2×
  hidden note (none blocked), 2× REACH-OK (smoke 24/24), green 2/2,
  strict ×2, cohort 7/7, manual full 44/44; node:test 5/5.
- Audit re-measure (`hidden-proxy.mjs verify oname,impossible --base
  a99782e30~1 --reach-all`): 0 blocked both functions (vacuous,
  correctly labeled — the manifest row cited no blocks); smoke 24 PASS /
  0 regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/oname-untwoweapon.test.mjs`: 5/5 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
