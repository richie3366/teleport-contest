# Review 2177 — cdbc41097 — s_suffix 8-home second wave (completion true)

SHA `cdbc41097`, D-3217; 2026-10-01; 6 js files (+~60/−~60, body-only)
+ `scripts/s_suffix_clones.test.mjs` (CLONES 5→19 + census test).
Must-fix closing review 2170's queued item (8 divergent homes).

**Addressed:** — (Must-fix fix; no new item)

## Metadata

- Subject: "s_suffix 8-home second wave (review 2170: objnam/apply/
  fig/hatch disjunct + towel/leash/poison/inv restarts) (D-3217)".
- Promises: 4 disjunct drops, 4 restarts to the C-exact 4-arm body,
  hitmsg doc de-staled, zero new edges, CLONES extended + census test,
  "all 20 homes now C-exact".

## Intent vs deliverable

Kept fully — including the completion claim, which is true this time
(verified by independent census below, not by trusting the D-log).

## Inventory — s_suffix (8 touched homes)

In-place body edits, zero new edges, every caller keeps its callee:
`s_suffix_objnam` (objnam.js:2802), `s_suffix_apply` (apply.js:3223),
`s_suffix_fig` (apply.js:4348), `s_suffix_hatch` (timeout.js:2271)
— disjunct drops; `s_suffix_leash` (apply.js:1445),
`s_suffix_poison` (mhitu.js:1085), `s_suffix_inv` (invent.js:4355),
`s_suffix_towel` (weapon.js:1823) — full restarts. Plus hitmsg doc
de-stale (mhitu.js:391, comment-only). Deleted/re-pointed: none.

## C ↔ JS fidelity — s_suffix

C `hacklib.c:344–359` (csym range): Strcpy; case-insensitive
it→+s / you→+r (strcmpi); lowercase-'s'-only →+' (`*(eos(buf)-1)
== 's'`); else →+'s. All 8 touched bodies now match the canonical
export arm-for-arm (read each in the diff): toLowerCase strcmpi ✓,
case preserved in output ✓, lowercase-only `endsWith('s')` ✓,
`String(s ?? '')` (empty/null/undefined → `'s`) ✓, no z/x/ch/sh arm
✓. No RNG in C; none added.

Independent completion audit (current tree):

- `grep -rn "function s_suffix" js/` → exactly 20 defs, the same 20
  review 2170 enumerated (canonical + 5 name-exact + 5 D-3210 + hitmsg
  + these 8); `s_suffix_ucatch` remains an import alias, not a def ✓.
- `endsWith('S')` in js/ → 0 hits; z/x/ch/sh/charAt arms near any
  s_suffix def → 0; falsy passthroughs (`if (!s)`, `String(s ||`) → 0.
- The 12 untouched homes re-read: canonical (do_name.js:411), all 5
  name-exact (explode/minion/mthrowu/questpgr/shk — minion uses `str`
  for `buf`, semantically identical), hitmsg (mhitu.js:396,
  inline toLowerCase, exact), and the 5 D-3210 homes live in files
  this SHA does not touch. All C-exact.
- Census test is real: reads every `js/*.js` via readdirSync and
  fails on any unpinned `function s_suffix*` def; 21/21 pass (ran).

Verdict on the function: ACCEPT. Both review-2170 observable gaps
("XERXES's", "you"→"your" through leash, falsy→"'s") are closed by
construction of the shared body shape.

Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits. Rule #2 clean
(iteration-wide rulecheck).

## Hallucinations / overclaim

None. "All 20 homes now C-exact" holds under the independent census
— the failure mode of the last two iterations (name-exact sweep) is
closed by the pinned census test.

## Density

Must-fix ships alone per §2b. One C function family, whole.

- Ledger: s_suffix split — ACCEPT.

## Verification

Re-measured (current tree incl. this SHA):

```text
verify s_suffix: baseline cdbc41097~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke s_suffix: no RNG-tagged reach; fixed smoke spread (24 run, 11.2s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note stated + REACH-OK, VERIFY: PASS).
No REGRESSED session. Message-text family, corpus-invisible — the
census + 21/21 test above is the evidence.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
