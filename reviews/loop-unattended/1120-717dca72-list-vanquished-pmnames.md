# Review 1120 — 717dca72 — list_vanquished pmnames[NEUTRAL] display names (D-2154)

Metadata: SHA `717dca72`, js/ +8/−4 in `insight.js` only (one function
body + one import line). D-log D-2154. Subject promises:
`pmnames[NEUTRAL]` display names; 2 sessions PASS
(scen-genesis-Archeologist-92157, scen-genesis-Barbarian-92111).

Intent vs deliverable: promise matches diff. Actually adds: (1)
`pmname_neutral` returns `pmnames[mndx]?.[NEUTRAL] ?? 'monster'`
instead of lowercased/de-underscored `PM_*` enum labels; (2) `pmnames,
NEUTRAL` join the existing `monsters.js` edge (ALREADY — re-exported
generated data + `MALE/FEMALE/NEUTRAL` consts at `monsters.js:71`).

Inventory: one expression swap + import widening. No new functions,
no new edges, no branches touched (display `an`/`makeplural`/sort
untouched).

**C ↔ JS fidelity**: confirmed. C per-type line is
`an(mons[i].pmnames[NEUTRAL])` (`insight.c:2904`; same expression at
`:2891, :2907, :2962, :3163`). JS now reads the identical C data
source (`pmnames` generated table, `[NEUTRAL]` index 2) instead of a
lossy enum-label transform that destroyed case ("Uruk-hai") and
hyphens/spacing ("Keystone Kop"). The old code was a genuine C-wrong
(data fabrication, not a named omit); the fix deletes it. `?? 'monster'`
fallback only fires for out-of-range mndx, which C never produces —
defensive, no C path affected. The same table feeds the rest of the
function: `vanqsort_cmp` compares `mons[indx].pmnames[NEUTRAL]`
(`:2654–2655`) and the `N_times`/unique arms print it (`:2891, :2907,
:2962, :3163`), so every vanquished line — sorted and printed — now
comes from one C source instead of the enum-label shadow. Both blocked
sessions show the identical failure shape (row 2 «an Uruk-hai» vs «an
uruk hai», row 3 «a Keystone Kop» vs «a keystone kop» with matching
toplines), and the untouched display path (`an()` yielding «an
Uruk-hai», `makeplural` on the C-cased input) needed no change — the
corpus screens passing byte-exact proves the table values flow through
unchanged. Named omits (set_vanq_order sort menu,
disclose ask path, VANQ_MCLS headers, dumplog, Hallucination footer)
unchanged from D-0126 and still named in the file header + map.

Hallucinations / overclaim: none. The D-log's abandoned-standalone-probe
note (objnam.js module-order TDZ outside bootstrap) is honest about
method; the corpus screens are the probe, and they PASS byte-exact.

Density: 8 insertions — below the ~40 soft floor, but the C locus is
literally one expression, and it closes 2 corpus sessions. The
playbook's own exception ("unless C is that small") applies.

Verification: D-log bullet shows `verify.mjs` → hidden 2 PASS +
green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify list_vanquished --base 717dca72~1` →
"2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS" (both sessions
PASS). True claim. Banned-pattern grep: zero hits. Rule #2 covered by
D-log verify PASS (no new imports beyond existing edge).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
