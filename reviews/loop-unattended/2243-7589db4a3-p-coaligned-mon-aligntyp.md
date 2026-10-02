# Review 2243 — 7589db4a3 — p_coaligned via mon_aligntyp

Metadata: SHA `7589db4a3adc251f361df4b378f97d3cde13e36b` (D-3282,
2026-10-02). `js/priest.js` (restart) + `js/mklev.js`
(clone deletion + import). One function: `p_coaligned`
(C priest.c:369–373, one expression).

Intent vs deliverable: subject promises p_coaligned
via mon_aligntyp + the mklev clone rewire. The diff
restarts the canonical as the C expression, deletes
the mklev clone, and adds the priest.js edge with the
priestini call unchanged. Delivers what it promises.

Inventory:

- `p_coaligned` (priest.js:282): raw-shralign
  compare → `(game.u?.ualign?.type|0) ===
  mon_aligntyp(priest)`; doc gains the C caller list.
- mklev.js: clone (:28518) deleted → pointer comment;
  `p_coaligned` import (:191); priestini robe-arm
  call (:28579) unchanged.
- Required `sym.mjs` paste (deleted clone →
  import): `p_coaligned js/priest.js:282 sync` —
  single export, zero clones ✓. `mon_aligntyp
  js/priest.js:155 sync` + 1 pre-existing teleport
  clone (2235 debt, D-1110 cycle rationale — kept,
  disclosed).
- Post-commit `--can` mklev→priest: ALREADY ✓.

**C ↔ JS fidelity — `p_coaligned`**: C priest.c:372
is `u.ualign.type == mon_aligntyp(priest)` — JS
verbatim (C order, one expression) ✓. Callee
`mon_aligntyp` verified LIVE and exact vs C
priest.c:279–289: ispriest→shralign : isminion→
min_align : maligntyp branch order ✓, A_NONE
passthrough ✓ (A_NONE = −128 both sides —
checked), sign normalization ✓; `?? 0` guards fire
only in C-unreachable missing-EPRI/EMIN states,
documented ✓. Old-JS→new-JS delta only where C's
normalization bites (isminion input, A_NONE,
non-canonical shralign) — the commit's claim holds;
canonical-shralign priests identical. No RNG.
Callers: doc lists all 11 C sites; cross-checked
against csym (mon.c:3697/3699/4298, pray.c:1684,
priest.c:270/474/477/560/790, sounds.c:557/561) —
complete ✓; D-log maps each to its JS line, and the
one this SHA touches (priest.c:270→mklev.js:28579)
verified wired to the import ✓.

Hallucinations / overclaim: none. "Whole C body
live" for a one-expression function is earned.

Density: single-function restart (~20 ins),
sub-80 exception documented (callee ported, no
same-file Open rows). `Ledger: p_coaligned ported`
+ Verify ✓.

Verification: D-log Verify shows VERIFY: PASS +
smoke REACH-OK + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify p_coaligned
--base 7589db4a3~1 --reach-all`): 0 blocked (row
cited none — honest) + smoke 24/24 → REACH-OK.
Zero regressed. Banned-pattern grep: clean. Rule #2
clean (2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
