# Review 1344 — e3d36021 — artifact.c set_artifact_intrinsic resists + PROTECT + invoke reversal

- SHA: `e3d36021`, D-2378. JS files: `js/artifact.js` (map + PROTECT + new export),
  `js/do.js` + `js/zap.js` (async-half wires), `js/invent.js` (doc only).
- Prior reviews closed: none.

## Intent vs deliverable

Subject promises: defn/cary resist masks (`:731–768`), SPFX_PROTECT (`:873–878`),
W_ART-off invoke reversal (`:880–885`). Diff actually adds all three plus the two
vehicle wires. Matches the promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| dtyp seven-way map + other-carrier guard | C `:731–768` / `:750–762` | LIVE via existing dual-write `set_spfx_extrinsic` |
| SPFX_PROTECT arm | C `:873–878` | LIVE |
| `revoke_invoked_property` (artifact.js:993) | C `:880–885` async half | LIVE, exported async |
| `arti_invoke` (same-file callee) | hoisted declaration | LIVE |

`sym.mjs revoke_invoked_property` → `js/artifact.js:993 ASYNC`. Nothing deleted —
no re-point output owed. Combined-arm closure: every shipped arm's callees LIVE;
`finesse_ahriman` / steal-destroy-useup envelopes explicitly named own rows, not
stubbed into a live arm.

## C ↔ JS fidelity

C body (`csym` → `artifact.c:715–893`, 179 lines). dtyp seven-way map
AD_FIRE/COLD/ELEC/MAGM/DISN/DRST/DRLI → E-fire/cold/shock/antimagic/disint/poison/drain
✓ exact, with `(wp_mask!==W_ART)?defn:cary` selection verbatim. Other-carrier guard:
`mask && W_ART && !on`, invent walk, `obj!==otmp` + oartifact + non-list[0] +
`cary.adtyp===dtyp` conjuncts ✓ (unlink timing moot — guard examines only *other*
artifacts; probe confirms C-quirk stale-bit parity). `set_spfx_extrinsic`
(`artifact.js:806`) is exactly C `*mask |=/&= wp_mask` plus the flat dual-write C's
E* macros imply — and every written flat has live readers (fire ×12 files, cold ×9,
shock ×10, disint/poison/drain/protection likewise). PROTECT sits between REFLECT
and Sunsword with no mask gate, as C ✓. Reversal guard (`inv_prop`, `<=LAST_PROP`,
`uprops[inv].extrinsic&W_ARTI`) verbatim ✓; only INVIS/CONFLICT/LEVITATION can take
it either side. Vehicle order: sync bits run inside `freeinv_core` (C `:1383`
sits in C `freeinv_core`, `invent.c:1356`), async half awaited right after in
`dropx` (before `ship_object`/`doaltarobj`) and zap-poly (between `freeinv_core`
and `addinv_core1`, C `:1910–1914`) ✓ — C's internal bits-before-reversal order
preserved on both wired envelopes. No RNG added (reversal `rnz(100)` rides the live
`arti_invoke`). Residual coverage (sync-only steal/destroy/useup paths, no-floor
drops via `finesse_ahriman`) is D-log- and map-named with the vehicle reason
(Constitution §2.6); unwired envelopes behave exactly as before this commit — no
regression, no stub-in-live-arm.

## Hallucinations / overclaim

"All `--can`…" — edges: do.js/zap.js extend pre-existing artifact.js imports; no new
module claimed, none added. "No-floor arms deliberately unwired — C orders them
through finesse_ahriman" — consistent with the cited call sites. Verify bullet
claims full 44/44 (shared files changed — runbook-matrix-correct) + honest
non-PASS hidden note. No overclaim.

## Density

~90 js/ insertions across 4 files for three C arms + vehicle: one C locus family,
right-sized (§2b).

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review).
- Diff grep → 1 hit, commit-message prose ("FORCE" substring), no code.
- Re-measured: `hidden-proxy verify set_artifact_intrinsic --base e3d36021~1` →
  "0 at baseline, 0 working" — row cited 0 blocks, vacuous note correctly labeled.
  No seed/step/coordinate reads in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
