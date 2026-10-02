# Review 2237 — 715abdc4c — container_contents de-drift

Metadata: SHA `715abdc4c65d13113baece3c8c0fd26ac70e0375` (D-3276,
2026-10-02). `js/end.js` + `js/pickup.js` (+107/−109, mostly
the deleted clone). Single function `container_contents` (C
end.c:1593–1670).

Intent vs deliverable: subject promises "container_contents:
pickup clone de-drift onto canonical export". The diff
exports the end.js canonical, deletes the pickup.js clone +
both doc blocks, and rewires the ':' site to
`container_contents(obj, false, false, true)`. Delivers what
it promises.

Inventory:

- `container_contents` (`js/end.js:767`): local → `export
  async function` (body untouched, D-3260's); doc Callers
  line updated to the canonical import.
- Deleted: pickup.js:2515–2562 clone (single-box shape) +
  both doc blocks.
- `use_container` ':' site (:4051): `await
  container_contents(obj, false, false, true)` per C
  pickup.c:3122 (matches `current_container, FALSE, FALSE,
  TRUE`; JS `obj` ≡ current container throughout — the
  pre-existing `!obj.cknown` ECMD_TIME line uses the same
  model) — awaited ✓ (canonical is async).
- New pickup→end import edge (:152): end.js has ZERO
  imports from pickup.js (acyclic direct); call-time use
  of a hoisted async export — safe (post-commit `--can`
  reads ALREADY).
- `sym.mjs container_contents` (required): single ASYNC
  export, zero clones. Output pasted as required.
- "No import cleanup" claim verified: sortloot (15 uses),
  SORTLOOT_LOOT (5), SORTLOOT_PACK (4), doname_with_price
  (4), SchroedingersBox (6), show_nhw_menu_text (4) all
  still used in pickup.js ✓.

**C ↔ JS fidelity — `container_contents`** (':' call shape
through the canonical, vs C end.c:1593–1670): single-obj
list walk + `!all_containers` break ✓; container/statue
gate (JS early-break shape ≡ C's wrap) ✓; cknown gate +
`update_inventory()` EXACT — the drift fix (clone set
unconditionally, never updated) ✓; BoT skip (clone lacked
it; unreachable per apply routing — more correct) ✓; menu
header + blank line ✓; SchroedingersBox ✓; sortloot flags
identical to the clone ✓; identified arm correctly skipped
✓; doname_with_price + unsortloot (clone lacked the
free-only call; harmless) ✓; empty-box pline identical —
`thesimpleoname_objnam` is a same-function alias import
(pickup.js:42), still used at :2678 ✓; theArt ≡ C `the`
✓. Inherited omits unchanged from D-3260 (in_dumplog arms,
WIN_MESSAGE live-display) — named, not new. Behavioral
delta by design: gated cknown + update_inventory on look
(C :1605–1609) — the C-mandated fix, message/display
only, no RNG.

Hallucinations / overclaim: none. The stale-doc claim
("deferral matched end.js — stale since D-3260") is
accurate: the canonical has carried update_inventory since
review 2221.

Density: single-function de-drift; missing-arm row with
the below-80 exception implicit (clone deletion nets
negative). `Ledger` + Verify line present (D-3260 omits
inherited, cited).

Verification: D-log Verify shows PASS + vacuous note +
smoke REACH-OK + green/strict/cohort (full skipped — no
shared file). Re-measured (`hidden-proxy.mjs verify
container_contents --base 715abdc4c~1 --reach-all`):
vacuous (0 blocked — row cited none, honest) + smoke 24/24
PASS → REACH-OK. Zero regressed. Banned-pattern grep:
clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
