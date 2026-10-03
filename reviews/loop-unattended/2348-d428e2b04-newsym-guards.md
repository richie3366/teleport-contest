# Review 2348 — d428e2b04 — fn_cmap_to_glyph + newsym flux/Underwater guards

**SHA:** `d428e2b04` — "display.c fn_cmap_to_glyph + newsym flux/Underwater guards (D-3393)."
**Scope:** js/display.js +24/−0 (1 export, 2 guards in hot `newsym`). Two functions, one C file.
**Prior reviews closed:** none (touches 2339 only to fill the D-3392 hash ✓).

**Addressed:** D-3400 `1ae9cc180`

## Intent vs deliverable

Promise: (a) new `fn_cmap_to_glyph` export, whole body; (b) `newsym` gains the flux gate first, then the Underwater gate after uswallow in C order. Delivered exactly; no other `newsym` lines touched despite ~480 call sites inheriting the guards. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | `fn_cmap_to_glyph` js/display.js:685 (sync export) | whole body, 1 live callee | display.c:3796–3800 |
| 2 | flux gate js/display.js:5360 (`if (suppress_map_output()) return;`) | missing head guard | display.c:928–929 |
| 3 | Underwater gate :5371–5379 | missing head guard | display.c:943–948 |

No deletion/re-point; no re-point sym owed. Callee sym: `cmap_to_glyph` live (in-file) ✓; `suppress_map_output :5109 sync` LIVE ✓; `Is_waterlevel const.js:3243 sync` (pre-existing import) ✓; `dist2` pre-existing hacklib import ✓; `is_pool_or_lava_disp :1295` + `is_ice_disp :1305` in-file documented CLONEs (levl-typ readers; DRAWBRIDGE_UP under-typ named in their docs — pre-existing). No new cross-module edge, no new clone.

## C ↔ JS fidelity

**fn_cmap_to_glyph — Confirm.** C: `return cmap_to_glyph(cmap);` ≡ JS verbatim ✓. 0 C refs (csym) — no wiring owed ✓.

**Flux gate — Confirm.** C `:928–929` first-statement return ≡ JS first-statement return ✓. `suppress_map_output` matches C `_suppress_map_output` except `done_hup` — honestly pre-existing-named (HANGUPHANDLING *is* defined, global.h:278, so the doc's "hangup done_hup still named" is a true named omit, not vacuous). Same gate as `feel_location` ✓.

**Underwater gate — Confirm, with the right field.** C order flux→isok→uswallow→Underwater: JS places the gate after uswallow ✓ (isok effect via pre-existing loc-null; the `:930–939` panic/impossible diagnostic is correctly by-design — verified: no `panic` export port-wide, `impossible` is async :8718, silent-guard is file convention). Predicate: C `Underwater && !Is_waterlevel && (!(pool||lava||ice) || !next2u)` ≡ JS `(u.uinwater|0) && !Is_waterlevel(u.uz) && (!(A||B) || !(dist2<=2))` — same short-circuit order ✓; `Underwater ≡ u.uinwater` (youprop.h:279 ✓); `next2u ≡ distu<=2` (you.h:558 ✓, dist2 symmetric so arg order free); `_disp` helpers read `loc.typ` like C's levl checks (POOL/MOAT/WATER + LAVAPOOL/LAVAWALL + ICE ✓). **Notably correct:** the porter used live `u.uinwater` (`set_uinwater` writes it, hack.js:3453) instead of copying sibling `feel_location :5138`'s `(u.Underwater|0)` — I verified zero writes to `u.Underwater` port-wide (no assigns, no bracket writes, none in save/restore/u_init; trap.js:3801 already documents it). Copying the sibling would have shipped a dead gate. No RNG.

**Pre-existing find (not this diff):** `feel_location :5138` gates C's `:769–772` return on the never-written `u.Underwater`, so its Underwater gate never fires where C returns (Blind + underwater + off-waterlevel + non-pool square). Verified C text + JS body + port-wide write grep. One-line fix, queued below as Must-fix (scoped to that line, not the ~20-site alias family).

## Hallucinations / overclaim

None. "452 C call sites, wired long ago" is architectural context, accurate in kind; "no 6th next2u clone since C is a macro" is correct (you.h:558 is a `#define`).

## Density

Two functions, one C file, +24 lines — small but the ledger head-shape (absent fn + partial omit in hot shared code) justifies it; full 44/44 re-run included. One `Ledger:` entry per function. No Must-fix bundled. Per-function verdicts: fn_cmap_to_glyph ACCEPT · newsym ACCEPT.

## Verification

Re-measured (`verify fn_cmap_to_glyph,newsym --base d428e2b04~1 --reach-all`): both 0 blocked + vacuous note + REACH-OK — matches the D-log verbatim:

```text
smoke fn_cmap_to_glyph: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
smoke newsym: no RNG-tagged reach; fixed smoke spread (24 run, 11.5s): 24 PASS, 0 regressed → REACH-OK
```

Dead-field proof: port-wide grep finds zero writes to `u.Underwater` (no assigns, no bracket writes, none in save/restore/u_init) while `set_uinwater` (hack.js:3453) writes `u.uinwater` — so the new gate's field choice is right and the sibling's is dead. D-log shows green/strict/cohort/full gates (full auto on shared file). Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed/coordinate hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

1. **(Pre-existing, out of this diff) feel_location Underwater gate reads never-written `u.Underwater`.** C display.c:769–772 returns when `Underwater && !Is_waterlevel && !pool/lava && !ice`; JS js/display.js:5138–5141 tests `(u.Underwater|0)`, which no code port-wide ever writes (live field is `u.uinwater`, youprop.h:279; writer `set_uinwater` hack.js:3453) — the gate never fires. Fix in one iter: flip `:5138` to `(u.uinwater|0)` (this SHA's `:5375` idiom) + `verify.mjs --fn feel_location` incl. full (shared file). Do NOT expand to the ~20-site `u.Underwater` alias family in the same iter — that needs its own brief. Source: reviews/loop-unattended/2348-d428e2b04-… (Must-fix — prepended).

Verdict: **ACCEPT**
