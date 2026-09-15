# Review 1353 — 5c766aef — gulpmu BLND visored-helmet tail + flat/uprops mirror

- SHA: `5c766aef`, D-2387. JS files: `js/mhitu.js` only (+57/−8).
- Prior reviews closed: none (Open queue row `gulpmu`; 0 blocks).

## Intent vs deliverable

Subject promises the `check_visor` flag + `:388–396` visor tail and the
`uprops[BLINDED]` mirror. Diff delivers exactly that plus
`visored_helmet_worn()`. Promise matches diff; no scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `gulpmu_can_blnd` (mhitu.js:1742) | changed, C `mondata.c:304–398` | LIVE |
| `visored_helmet_worn()` | new, file-local, C `:389–394` scan | LIVE |
| `gulpmu` AD_BLND else-branch | changed, C `mhitu.c:~:1471–1490` | LIVE, dual-write |
| `objdescr_is` (apply.js:942) | C callee, newly imported | LIVE, canonical (3 clones elsewhere, none added) |
| `BlindedTimeout()` (mhitu.js:626) | C macro, file-local | LIVE, pre-existing file convention |
| `W_ARMH` / `BLINDED` | consts, existing edge | LIVE |

Required checks: `sym.mjs objdescr_is → js/apply.js:942 sync`;
`imports.mjs --can mhitu.js apply.js objdescr_is` → ALREADY (D-log's
"SAFE" understates it — edge pre-exists); `node -e "await
import('./js/mhitu.js')"` → MHITU_LOAD_OK (re-run). Nothing deleted.

## C ↔ JS fidelity

C loci opened with bodies: `can_blnd` `:304–398` (full 95 lines),
`gulpmu` `:1288–1587` body with the AD_BLND arm read in place,
`youprop.h:87` (`HBlinded`), `:93` (`BlindedTimeout`).

- Switch arm-for-arm: EXPL/BOOM/GAZE/MAGC/BREA mcan + `!resists_blnd`
  ✓; WEAP/SPIT/NONE → false ≡ C NULL-obj "other objects cannot cause
  blindness" ✓; ENGL Blindfolded/Unaware/ucreamed gate with
  `check_visor` staying FALSE ✓; CLAW `ublindf` gate + flag set (C's
  magr==you uswallow arm correctly N/A — the swallower is never you) ✓;
  TUCH/STNG mcan ✓.
- Tail: `if (check_visor && visored_helmet_worn()) return false; return
  true` ≡ C `:388–396` + `return TRUE` ✓. ENGL returns true before the
  tail with the flag FALSE, so the live engulf path is provably
  unaffected; both JS call sites pass ENGL attacks (`:1819` via
  `attacktype_fordmg(AT_ENGL)`, `:4225` swallow path), and C passes
  `(struct obj *) 0` always — so the absent VENOM-obj arm is C-identical
  as named.
- Visor scan: `owornmask & W_ARMH` + appearance `"visored helmet"` over
  hero invent ✓. The dual-shape walk (array + nobj chain) with `seen`
  dedup plus the `u.uarmh` fallback is a robustness superset with
  identical outcomes (C worn helmets live in `gi.invent`; the fallback
  only fires when JS tracks the helm separately, and the `W_ARMH` gate
  keeps it exact).
- Mirror: `HBlinded ≡ u.uprops[BLINDED].intrinsic` (`:87` — same storage
  in C), so the old flat-only write was a genuine latent wrong. JS
  `(flat & ~TIMEOUT) | ((BlindedTimeout()+1) & TIMEOUT)` ≡
  `incr_itimeout(&HBlinded, 1L)`, mirrored into the slot per the `do.js`
  `set_itimeout_HBlinded` convention ✓.
- Callee closure: all LIVE or pre-existing locals; no STUB in a live
  arm. Named: `can_blnd`/`can_blnd_u` visor defers (other functions'
  rows), VENOM arm (C-identical NULL), envelope residuals list.

## Hallucinations / overclaim

None. "Suite-unreached by construction" holds on both arms (ENGL/NULL
at both call sites; the mirror needs an already-Blind hero inside an
AD_BLND engulfer). No corpus PASS claimed.

## Density

One C function pair, one file, ~50 js lines. Right-sized §2b. No test
file — justified (both arms suite-unreached; sessions are the suite;
same rationale as neighboring micro-ports).

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed` → clean.
- Re-measured: `verify gulpmu --base 5c766aef~1` → 0 blocked at
  baseline and working. Matches; no WORSE/relocation.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log accepted (narrow change;
  corpus half re-run here).
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
