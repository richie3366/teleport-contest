# Review 1463 — 52eaabd8 — `teleport.c` rloc_to_core composer + mtele_trap RLOC_MSG (D-2504)

Metadata: SHA `52eaabd8`, `js/teleport.js` +38/−12. C `teleport.c:1644–1768` (`rloc_to_core`, 125 lines, staticfn) + caller `mtele_trap :1961–2002`. D-log: D-2504.

## Intent vs deliverable

Promise: export the core as a C-order composer over the already-live split helpers (D-0885…D-1196), thin `rloc_to_flag` wrapper per C `:1776–1782`, and fix `mtele_trap`'s dropped `RLOC_MSG` flag (C `:1988`) plus a missing `await`. Diff delivers exactly that. Promise = deliverable.

## Inventory

- New export `rloc_to_core(mtmp, x, y, rlocflags)` (teleport.js) composing `rloc_pre_move_msg` → `rloc_to` (deferred tail) → `rloc_post_move_msg` → `rloc_maybe_angry_shk/minvent_shop_bill/occupation/mintrap`.
- `rloc_to_flag` re-pointed to a thin `await rloc_to_core(...)` wrapper; silent `rloc_to` (NOMSG) byte-untouched.
- `mtele_trap`: teledest `rloc_to(...)` → `rloc_to_core(..., RLOC_MSG)`; fallback `rloc(mtmp, 0)` now awaited.
- `sym.mjs` (required): nothing deleted; re-point is import-internal (wrapper delegates, return ignored by all callers — see below).

## C ↔ JS fidelity

Composer order ≡ C `:1658–1767`: same-cell return first ✓, pre-move vanish `:1661–1677` ✓, move `:1679–1702` ✓, dest-msg `:1703–1737` (incl. shk-angry deferral past the appear pline, matching C `:1703`-then-`:1739` order) ✓, tail `:1739–1767` ✓. Helper bodies are their own reviewed D-rows; order is this SHA's claim and it holds.

Caller fix verified against C: `mtele_trap` body (`teleport.c:1961–2002`) calls `rloc_to_core(mtmp, teledest.x, teledest.y, RLOC_MSG)` at `:1988` and `(void) rloc(mtmp, RLOC_NONE)` in the else — JS now matches both (`RLOC_NONE = 0x00`, js/const.js:2409, so `rloc(mtmp, 0)` is exact; the added `await` only fixes scheduling, C is synchronous). Return-value change (`null`/`snap`) is inert: all four external `rloc_to_flag` consumers (shk.js ×2, dog.js, mon.js ×2) `await` and ignore the result, as does `mtele_trap`. Named omits (`u_on_newpos`, `place_monster`, `remove_monster`, `m_next2u` inlines; dog.js un-awaited calls) are map-cited and outside this row's 4 callers.

## Hallucinations / overclaim

None. "No new module edges" holds (single-file diff); "behavior-identical wrapper" verified via the caller audit above.

## Density

Small diff (38 lines) for a row whose C body was already live-split — the gap was the missing same-named export plus a real caller flag drop. Right-sized, not padded.

## Verification

Re-ran `hidden-proxy.mjs verify rloc_to_core --base 52eaabd8~1 --reach-all`: 0 blocked at baseline and working tree (row cited 0 blocks — vacuous note correctly handled); smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log. No banned patterns in the hunk (fully read). Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

C `mtele_trap` (`teleport.c:1984–1991`): free teledest → `rloc_to_core(mtmp,
trap->teledest.x, trap->teledest.y, RLOC_MSG)`; else `(void) rloc(mtmp,
RLOC_NONE)`. JS now matches both arms; `RLOC_NONE = 0x00` (js/const.js:2409)
so `rloc(mtmp, 0)` is exact, and the added `await` only fixes scheduling
(C is synchronous — no semantic delta).

Wrapper safety: all four external `rloc_to_flag` consumers `await` and
ignore the result — shk.js:1748, shk.js:1752, dog.js:873, mon.js:2039,
mon.js:2177 — so the `null`/`snap` returns introduced on the core are
inert, and the wrapper's `undefined` matches the old behavior and C `void`.
Silent `rloc_to` (NOMSG, many external callers) confirmed byte-untouched
in the hunk.

Composer order re-checked against C `:1658–1767`: same-cell early return
(`m_at(x,y)===mtmp` conjunct pre-existed) → pre-move vanish block →
`rloc_to` move with shk-angry deferral → post-move dest-msg block →
angry/bill/occupation/mintrap tail. The deferral comment cites the exact
C ordering constraint (`:1703` appear before `:1739` angry).

Re-run output: `verify rloc_to_core: baseline 52eaabd8~1 — 0 blocked (0 at
baseline, 0 working)` + `smoke rloc_to_core: no RNG-tagged reach; fixed
smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`. The D-log's
`--reach-all` repeat claim is consistent (no RNG-tagged reach exists, so
both modes run the same smoke spread).

Verdict: **ACCEPT**
