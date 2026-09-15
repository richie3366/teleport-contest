# Review 1333 — 72c7ee76 — bestow_artifact body + offer_corpse wiring (D-2367)

Metadata: SHA `72c7ee76`, `js/pray.js` only (+77/−3). No new modules;
`y_n` joins the existing `getline.js` import, `nartifact_exist` /
`mk_artifact` / `artifact_origin` / `bare_artifactname` the existing
`artifact.js` edge. D-log: D-2367, map-named row, 0 blocked.

## Intent vs deliverable

Subject promises the latent C-wrong in otherwise-live `offer_corpse`:
the post-`consume_offering` else arm skipped C's `bestow_artifact(value)`
gift attempt (`pray.c:2091`). Diff adds file-local async
`bestow_artifact(max_giftvalue)` next to `offer_corpse` (C home) and
wires `if (await bestow_artifact(value)) return;` in C position before
the luck block. Matches the promise.

## Inventory

- `bestow_artifact` — new file-local async (C home is pray.c; correct
  locality). No other new helpers, no clones, no stubs.

## C ↔ JS fidelity

Vs C `pray.c:1781–1836` (body re-read above): `nartifact_exist()`,
gate `ulevel > 2 && uluck >= 0` on the raw field (not `Luck()`, per C)
✓; wizard `y_n('Gift an artifact?')=='y'` vs `!rn2(6 +
2*ugifts*nartifacts)` ✓; `mk_artifact(NULL, a_align(ux,uy), value,
TRUE)` NULL-able ✓; origin GIFT|KNOW_ARTI, spe<0 clamp, uncurse,
oerodeproof ✓; Hallu 'a doodad' / Blind 'an object' / else
ansimpleoname + ` named <bare>` when !Blind ✓; at_your_feet(upstart) +
dropy + godvoice ✓; ugifts++, `ublesscnt = rnz(300+50*nartifacts)`,
WIS exercise, livelog gift, unrestrict weapon skill, seen
observe+makeknown+discover ✓; TRUE/FALSE returns ✓. Caller wiring
matches `:2091` exactly. Branch-by-branch confirm.

Callee closure: `mk_artifact` (`artifact.js:995` sync),
`artifact_origin` (`:1158` sync) — LIVE; `godvoice`/`at_your_feet`
same-file; `upstart`/`weapon_type` pre-existing imports reused, no
clones. Wizard flag via the `dopray`-idiom `flags.debug||flags.wizard`
(disclosed). No stub in a live arm. `sym.mjs` outputs pasted per
Method. Confirm.

## Hallucinations / overclaim

None. `mk_artifact` fallback-pool semantics + async `y_n` idiom +
Soundeffect deferral stay named.

## Density

~77 lines, one C function + one call site — right-sized per §2b.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify bestow_artifact --base 72c7ee76~1` → `0 blocked
  (0 at baseline, 0 working)` — vacuous as disclosed; row cited 0
  blocks. Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn bestow_artifact` →
  VERIFY: PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
