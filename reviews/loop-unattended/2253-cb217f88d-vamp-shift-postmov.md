# Review 2253 — cb217f88d — vamp_shift whole + postmov door dance

Metadata: SHA `cb217f88d1963e43d55de83e69111176b0ce8be6` (D-3292,
2026-10-02). `js/monmove.js` only (canon fn +
gate + seenflgs ×6 + 3 same-edge import
names). One function whole: `vamp_shift` (C
monmove.c:2374–2394, staticfn) + its single
caller's gate (C :1472–1506) + flag
threading (C :1756–1757).

Intent vs deliverable: subject promises the
whole port + the postmov wiring. The diff
ships the canon fn, the :1485 gate in C
position, `ptr` refresh, seenflgs at all 6
m_move sites, and retires the "vampshift
fog" omit line. Delivers what it promises.

Inventory:

- `async function vamp_shift` (:930): shape
  check → newcham + flush cite → int 1/0.
  Module-local ✓ (C staticfn).
- postmov gate (:1703–1729): vampshifter
  door dance before newsym/mintrap; `const
  ptr` → `let`; trailing `seenflgs = 0`.
- m_move: seenflgs expr + 6 threaded sites
  (:2158/:2170/:2202/:2261/:2371/:2444).
- Imports: same-edge names only (makemon,
  steed, const). No symbol deleted or
  re-pointed → ran `sym.mjs` anyway:
  newcham makemon.js:2066 (boolean|Promise),
  is_vampshifter monsters.js:826 sync,
  amorphous monsters.js:499 sync,
  NC_SHOW_MSG const.js:1967 — all LIVE ✓.

**C ↔ JS fidelity**: `vamp_shift` ≡ C
:2374–2394: `mon->data == ptr` → mndx
compare with -1/-2 defaults (missing-data
never equals — sound against the
factory-minted objects) ✓; `newcham(mon,
ptr, domsg ? NC_SHOW_MSG : NO_NC_FLAGS)` ✓
with `await` + `? 1 : 0` (newcham returns
boolean|Promise — the "may await" comment
is accurate, read :2040–2066) ✓;
display_nhwindow flush cite-only (tty-only,
named) ✓. Gate ≡ C :1485–1506 predicate,
comment, move-back/forth order, `((seenflgs
& 1) !== 0)` domsg, and `ptr = mtmp.data`
refresh (nhUse dropped = no-op macro) ✓.
seenflgs expr ≡ C :1757 verbatim, placed
pre-set_apparxy like C ✓. Callers: C's
single vamp_shift caller :1496 → the wired
gate ✓; C postmov has exactly 6 call sites
(:1773–2073, all m_move) ↔ 6 JS sites, and
grep confirms no other JS postmov caller
(the `= 0` default never fires) ✓. JS param
order (seenflgs trailing, ptr internal) is
idiomatic, consistently applied ✓. No RNG
in new code ✓. Pre-existing deferrals
untouched and disclosed: notice_mon,
mintrap :1517 ptr refresh.

Hallucinations / overclaim: none. Coverage
row disclosed; no corpus PASS claimed.

Density: one whole 21-line C staticfn + its
caller gate + flag threading, one file ✓.
`Ledger: vamp_shift` + one Verify ✓.

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 + green/strict/cohort/full.
Re-measured (`verify vamp_shift --base
cb217f88d~1 --reach-all`): `0 blocked` +
vacuous note + `smoke 24 PASS, 0 regressed
→ REACH-OK`. Exact match; zero REGRESSED.
Banned-pattern grep: clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
