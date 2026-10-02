# Review 2225 — c94c66b65 — unmul lifesave reminder + done livelog

Metadata: SHA `c94c66b65965e6f06c46beacb9ebcab49d82bd34` (D-3264,
2026-10-02). `js/hack.js` (+11/−1), `js/end.js` (+8/−4),
`scripts/unmul-survived-poly.test.mjs` (new, 87 lines, 3/3).
Cluster: 2 arms (unmul follow-up + done amulet livelog) closing a
falsified moveloop_core writer row — coherent. Method per function.

Intent vs deliverable: subject promises "unmul lifesave-while-poly'd
form reminder + done amulet-arm livelog (Tourist-92095 writer row
addressed; moveloop loop verified correct)". The diff delivers both
arms, the regression test, and the measured falsification in the
D-log. Delivers what it promises.

Inventory:

- `unmul` (`js/hack.js:1778`): after pline(nomovemsg), when
  Upolyd + 18-char case-insensitive "you survived that " prefix,
  `await You('are %s.', an(pmname(umonnum, Ugender())))` (C
  hack.c:4192–4194). Extends the pre-existing do_name edge.
- `done` (`js/end.js:2172`): Lifesaved else-arm now
  `formatkiller(how,false)` + `livelog_printf(LL_LIFESAVE,
  'averted death (%s)', killbuf)` (C end.c:1098–1100). New
  end.js→pline.js edge (D-log cites `imports.mjs` SAFE,
  call-time use — verified shape: sync hoisted export, called
  once in-arm) + LL_LIFESAVE on the const edge.
- `sym.mjs` spot-checks: pmname do_name.js:676 accepts mndx
  number or {mndx|mnum} (doc says so; the `umonnum|0` call is
  correct usage); formatkiller end.js:519 same-file
  (JS-adapted (how,incl_helpless)→string; call matches C's
  (…,how,FALSE)); livelog_printf pline.js:44 sync
  (un-awaited call correct); LL_LIFESAVE 0x0010 both
  (global.h:498, const.js:984). No symbols deleted or
  re-pointed. No clones added.

**C ↔ JS fidelity — `unmul`** (C hack.c:4176–4208)

- `Upolyd && !strncmpi(msg,"You survived that ",18)` vs JS
  `Upolyd(game.u) && len>=18 && slice(0,18).toLowerCase() ===
  'you survived that '` — equivalent: C strncmpi on a <18-char
  string hits NUL≠s2 and fails; JS fails on length; ASCII
  case-fold identical (the 18-char literal counted: 18 ✓).
- `You("are %s.", an(pmname(&mons[u.umonnum],Ugender)))` vs JS
  `You('are %s.', an(pmname(umonnum|0, Ugender())))` — same
  permonst (mndx-keyed table), Hallu ignored per C ✓.
- Placement after pline(nomovemsg), before nomovemsg=null —
  C order exact ✓. Gate is lifesave-path-only (poly'd +
  survived-prefix), so the 10 other unmul callers can't trigger
  it — D-log's caller table confirms all wired, signature
  unchanged; vault.c:497's missing unmul(0) named as pre-existing
  enclosing-path gap (out of cluster, correctly unrowed).

**C ↔ JS fidelity — `done` amulet arm** (C end.c:1095–1101)

- GENOCIDED-still-genocided vs else(formatkiller + livelog +
  survive) — matches C exactly, in order, after savelife ✓.
  Livelog is gamelog-array + mask-gated (no screen/RNG) ✓.

Hallucinations / overclaim: none — this is the opposite: a
falsified hypothesis plainly labeled ("turn-accounting hypothesis
is FALSIFIED… moveloop_core untouched"), with the session move
(49→66, rngM unchanged) given as direct rescore evidence and the
vacuous hidden-verify honestly noted (owner-attributed to
savelife/exercise). The queue's exercise row citing step 66 was
added by this same commit (verified via `git log -S`) — the
`@d947745c9` tag is the evidence-base SHA, not a predating row.

Density: 2 arms + test, +19/−5 JS — small but this is a
Must-fix-grade writer resolution (session moved, hypothesis
falsified, test added), not a coverage cluster; density floor
doesn't apply the same way. Verdicts: unmul ACCEPT, done ACCEPT.
`Ledger: unmul ported; done partial` + per-function Verify lines
present. SHA verdict = ACCEPT.

Verification: D-log Verify shows green/strict/cohort/full 44/44 +
vacuous-with-evidence + test 3/3. Re-measured (`hidden-proxy.mjs
verify unmul,done --base c94c66b65~1 --reach-all`): both vacuous
at baseline + `smoke … 24/24 → REACH-OK` each — exactly as the
D-log says. Zero regressed. Re-ran the new test myself: 3/3 pass.
Banned-pattern grep on js/ hunks: clean (test's initRng(92095) is
test setup, not production control flow). Rule #2 clean (2221).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
