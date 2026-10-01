# Review 2151 — 4a2447e27 — prinv verbose gate + invent hardening

SHA `4a2447e27`, D-3191; 2026-10-01; +7/−3 JS across 2 files.
Closes review 2150 items 1, 3–4 (2150 item 2 closed separately by D-3192).

## Metadata

- Subject: "restore prinv verbose default-ON gate plus inventory hardening (D-3191)"
- Files: `js/invent.js` (prinv gate, doprtool guard), `js/iactions.js` (post-menu scan guard)
- Must-fix ships alone: density exception, no coverage row bundled.

## Intent vs deliverable

Promise: restore the C default-ON verbose gate in `prinv` and harden two
unreachable invent arms. Diff delivers exactly that: one ternary flip plus a
C-citing comment, one `otmp &&` guard, one `indexOf` −1 guard. No new
functions, no imports, no caller touched. Promise kept, nothing extra.

## Inventory

- `prinv` (js/invent.js:7682, async export): gate-only change.
- `doprtool` (js/invent.js:7846, async export): successor-walk guard only.
- `dispinv_with_action` (js/iactions.js:921, async export): post-menu scan guard only.
- Helpers added: none. C callee / clone / no-op classification: N/A — no
  helper introduced, deleted, or re-pointed (sym output below confirms three
  single async exports, no local clones).

```text
prinv            js/invent.js:7682   ASYNC — await required
doprtool         js/invent.js:7846   ASYNC — await required
dispinv_with_action js/iactions.js:921   ASYNC — await required
```

## C ↔ JS fidelity

**prinv — confirmed branch-exact.** C `invent.c:2874–2890` (csym range)
builds `totalbuf` under `total_of`, then `:2889`
`flags.verbose ? totalbuf : ""`. `flags.verbose` is decl-initialized TRUE,
so C prints the suffix unless verbose was explicitly cleared. JS now reads
`game.flags?.verbose !== false ? totalbuf : ''`: uninitialized bag → ON,
matching the port's own convention at js/invent.js:7641,9188,9205 and
js/options.js:2331,2797,3021. The D-3186 truthy gate suppressed a suffix C
prints; this restores it. No RNG in the body; call order untouched.

**doprtool −1 guard — sound hardening.** C `invent.c:4714–4735` walks
`otmp = otmp->nobj`; removal mid-walk is inexpressible in C (chain
pointers), so there is no C arm to mirror. JS walks an array by identity;
`nextIdx < 0 ? undefined : inv[nextIdx + 1]` ends the loop instead of
restarting at the head (infinite loop). `reassign` only reorders, so the arm
is unreachable today — exactly what the D-log claims.

**dispinv_with_action null guard — sound hardening.** C iterates a linked
list where null holes cannot occur; `otmp &&` only skips a JS-impossible
hole instead of throwing TypeError. No C semantic touched.

Diff grep: no FORCE, DIAG, getRngLog, seed names, fastforward, or hardcoded
coordinates. Rule #2: `imports.mjs --rulecheck` clean across scored `js/`.

## Hallucinations / overclaim

None. The D-log says "gate corrected and two unreachable-arm hardenings
added", names both hardenings unreachable with reasons, and pastes the real
verify tail. No "Match C" claim over a stubbed callee; no callee involved.

## Density

Must-fix single item, alone — per §2b Must-fix ships alone. Ledger lines
per function (prinv / doprtool / dispinv_with_action ported); per-function
Verify lines present. Verdicts: prinv ACCEPT; doprtool ACCEPT;
dispinv_with_action ACCEPT. SHA verdict is the worst: ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify prinv: 0 blocked at 4a2447e27~1 (vacuous — review row, not corpus row)
smoke prinv: no RNG-tagged reach; 24 run: 24 PASS, 0 regressed → REACH-OK
verify doprtool: 0 blocked at 4a2447e27~1 (vacuous — review row, not corpus row)
smoke doprtool: no RNG-tagged reach; 24 run: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log tail exactly (smoke 24/24 both, green 2/2, strict ×2,
cohort 7/7, VERIFY: PASS). No REGRESSED session; no vacuous-PASS
overclaim — the D-log states "no corpus session blocked" plainly.

## Actionable C-wrongs

None. Review 2150 items 1, 3–4 are closed by this SHA (item 2 by D-3192).

Verdict: **ACCEPT**
