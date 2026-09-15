# Review 1349 — c30e0585 — region_danger/region_safety REG_HERO_INSIDE bit + safety blind tail

- SHA: `c30e0585`, D-2383. JS files: `js/region.js` only (42-line hunk).
- Prior reviews closed: none (Open queue row; 0 blocks).

## Intent vs deliverable

Subject promises: both loops read the `REG_HERO_INSIDE` bit instead of
`inside_region` geometry; `region_safety` gains the
`BlindedTimeout==1 → make_blinded(0,TRUE)` tail and the breathing
dual-write. Diff delivers exactly that plus header/doc updates. No
scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `region_danger` (region.js) | changed, C `region.c:1340–1363` | LIVE |
| `region_safety` (region.js) | changed, C `:1366–1405` | LIVE |
| `hero_inside` (region.js:269) | C macro (`region.h:17`), file-local | LIVE, correct shape |
| `make_blinded` (do.js:2789) | C callee, dynamic import at tail | LIVE, awaited |
| `MAGICAL_BREATHING` (const.js:2601) | const, joins existing edge | LIVE |

Required `sym.mjs` output: `make_blinded → js/do.js:2789 ASYNC`;
`MAGICAL_BREATHING → js/const.js:2601 export const`;
`hero_inside → NOT EXPORTED, 1 local clone js/region.js:269`. The clone
warning is answered C-side: `hero_inside` is a one-line macro
(`(r)->player_flags & REG_HERO_INSIDE`), so a same-file local
implementing it is the correct port shape, not drift. No symbol deleted.
Dynamic `import('./do.js')` at call time = no static edge, no TDZ.

## C ↔ JS fidelity

C loci opened with bodies: `region_danger` `:1340–1363`,
`region_safety` `:1366–1405`, `hero_inside` `region.h:17`,
`youprop.h:93` (`BlindedTimeout`), `:270` (`HMagical_breathing`).

- Membership: JS `((reg.player_flags|0) & REG_HERO_INSIDE) !== 0` ≡ the
  macro exactly ✓, in both loops.
- `region_danger`: bit gate → `inside_f==GAS` → nonliving/Breathless skip
  → Poison_resistance skip → count ✓ arm-for-arm.
- `region_safety` loop: `!n++ && ttl>=0` pick ✓; `n>1 || (n==1 && !r)` →
  `safe_teleds` → `region_danger()` → `set_itimeout(HMagical_breathing,
  d(4,4)+4)` + `You_feel` ✓ with the `d(4,4)` RNG draw in identical
  position; single-expiring remove + `pline_The` dissipates arms
  untouched; else-arm `pline('The gas cloud has dissipated.')` ≡
  `pline_The("gas cloud has dissipated.")` text-identical ✓.
- Dual-write: `HMagical_breathing ≡ u.uprops[MAGICAL_BREATHING].intrinsic`
  (`youprop.h:270` — same storage in C), so the old flat-only write was
  a genuine latent wrong. JS writes the flat with `set_itimeout`
  masking then mirrors TIMEOUT bits into the slot — the established
  HBlinded-in-`do.js` pattern ✓.
- Blind tail: `(u.HBlinded & TIMEOUT) === 1 → await make_blinded(0,true)`
  ≡ C `:1403–1404` (`BlindedTimeout ≡ HBlinded & TIMEOUT` per `:93`) ✓.
- Callee closure: every reached name LIVE or pre-existing local; no STUB
  in a live arm. `pline_The` text-identical (no JS export — pre-existing
  shape, named). Named: none new — geometric residual, blind tail, and
  breathing dual-write all retired by this commit.

## Hallucinations / overclaim

None. All C citations (`region.h:17`, `youprop.h:93/:270`,
`:1403–1404`) verified against pinned source. The /tmp 5/5 probe claim
is supplement, not basis. No corpus PASS claimed.

## Density

One C function pair, one file, ~30 js lines. Right-sized §2b.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 0 hits.
- Re-measured: `verify region_safety --base c30e0585~1` and
  `verify region_danger --base c30e0585~1` → 0 blocked at baseline and
  working, both. Matches the D-log; no WORSE/relocation.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log accepted (narrow,
  RNG-order-preserving change; this review re-ran the corpus half).
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
