# Review 1366 — d1747cfa — moveloop botl/botlx set sites (D-2400)

- SHA: `d1747cfa`, D-2400 ([campaign botl-parity 1/3]). JS files:
  `js/display.js` (+4/−1), `js/eat.js` (+6), `js/invent.js` (+4).
  Scoreboard touched (verify resale, not `js/`).
- Prior reviews closed: none (campaign step, owner parked ×10).

## Intent vs deliverable

Subject promises the C set-sites for step 1 (flags now, gate in
step 2), with measurement (local-gate probe 38/44 → 43/44,
first-diff taxonomy) de-risking the gate. Diff delivers three sites
plus honest NO-MOVEMENT verify. Promise mostly kept — one site is
under-set behind a false C claim (C-wrong 1).

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| docrt post-vision `botlx=true` (display.js:5412) | new set | LIVE on the main path; MISSING on 3 early paths |
| dismiss re-arm `botlx=true` (invent.js:2568) | new set | sound shim plumbing (below) |
| eatcorpse `botl=true` ×2 (eat.js) | new sets | LIVE, match C `losehp` calls |
| TEMP gate/RDO trace | reverted | added-line grep clean, no remnants |

No symbols deleted or re-pointed; no new imports/edges (direct
`game.flags` writes). No `sym.mjs` owed.

## C ↔ JS fidelity

C loci opened: `docrt_flags` head (`display.c:1709–1736`) +
`post_map` (`:1766–1769`), `losehp` head (`hack.c:4266–4268`), C
`eat.c` losehp sites (`:1926`, `:1942`).

- post_map citation exact: `if (!maponly) { update_inventory();
  disp.botlx = TRUE; }` with C's own "caller needs to call bot()"
  note, which the JS comment quotes faithfully. ✓
- C-wrong 1: the D-log's "(early uswallow/water/buried returns skip
  it as in C)" misreads C. There are no early returns on those
  paths: `redrawonly`, `u.uswallow`, Underwater, and `u.uburied`
  ALL `goto post_map` (`:1724/:1728/:1732/:1736`), which sets
  `botlx` whenever `!maponly`. JS `docrt()` instead `return`s from
  all three early arms (`display.js:5373/5379/5385`) with no flag
  set — C sets it on every `docrt()` call (plain `docrt()` passes
  `docrtRecalc`, never maponly). Once step 2's gate ships, engulfed/
  submerged/buried turns go stale-status — the campaign's own
  failure mode (cf. the seed0002 stale-HP probe in this same
  message). Fix (one iter): set `botlx` on the three early arms
  (the wholly-unported `redrawonly` arm stays a named omit, but the
  map must note its botlx goes with it).
- eat sites exact: C `eat.c:1926` `losehp(rnd(15),…)` + `:1942`
  `losehp(rnd(8),…)` ≡ the two JS `rnd(15)`/`rnd(8)` inline-damage
  sites, and `loseph`'s first line (`:4268`) sets `botl`
  unconditionally — so the flag writes match every C passage. The
  death-path bypass is pre-existing + disclosed. (Side note: the
  "cycle-avoiding inline shape" rationale collapses —
  `imports.mjs --can eat.js hack.js losehp` → ALREADY; the shape is
  inherited, not forced. Comment nit, not a C-wrong.)
- dismiss re-arm verified sound: `clear_committed_status()`
  (`display.js:5786–5792`) clears `botlx=false`, so without the
  re-arm the shim wipe would eat docrt's set — the D-log's premise
  checks out line-for-line. Whether every `!keep_status` dismiss
  SHOULD force the next `bot()` is step-2's to exercise; while the
  moveloop gate is absent the only consumer is `flush_screen`'s
  pre-existing `bot()|timebot()` gate (`:6831`), under which 44/44
  + 0-worse corroborate safety. (That same gate makes "no-ops
  under the unconditional `bot()`" imprecise — the sets are live
  inputs to `flush_screen` today — but honest where it counts:
  NO MOVEMENT stated, not a PASS.)
- No RNG touched. ✓

## Hallucinations / overclaim

One: "skip it as in C" (above) — a false C claim in the commit's
core sentence, not a hedge. It will mislead step 2 into omitting
the early-path sets. Everything else (probe numbers, vacuous
verify, named omits) checks out.

## Density

Below the ~40-line guideline, but each cited C locus is 1–4 lines
and the message carries the gate-probe measurement step 2 needs.
Campaign-step sized; acceptable.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|TEMP|RDO|fastforward` → 0.
- Re-measured: `hidden-proxy verify do_statusline2 --base
  d1747cfa~1` → `0 PASS, 0 moved past, 10 unchanged, 0 worse → NO
  MOVEMENT`. Matches the D-log exactly (10 parked-symptom sessions,
  identical-topline signature).
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 accepted.

## Actionable C-wrongs

1. `docrt()` early arms (uswallow/underwater/buried) return without
   `botlx`, contradicting C `goto post_map` (`:1724–1736` →
   `:1766–1769`). Fix (one iter): set `game.flags.botlx = true`
   on the three early arms before `return` (mirroring the join),
   note the `redrawonly`-arm botlx in the map omit line, keep
   44/44 + cohort. Corrects the false "skip it as in C" for step 2.

Verdict: **QUALITY-RISK**

**Addressed:** D-2403
