# Review 2183 — 8f3d63508 — set_artifact_intrinsic HALRES sync half

SHA `8f3d63508`, D-3223; 2026-10-01; artifact.js (+47/−8, one arm) +
5 ledger rows (4 artifact.c + poly_steed). Single-arm cluster + stales.
Closes no prior review.

## Metadata

- Subject: "`artifact.c` set_artifact_intrinsic HALRES changed-arm sync
  half + 4 same-file stales (D-3223)".
- Promises: HALRES arm in C order (flip + re-mirror + refresh);
  changed captured before the flip; potion.js formulas; only the talk
  pline named (async, all 6 C sites sync); eatmupdate edge SAFE.

## Intent vs deliverable

Kept. The arm is C's make_hallucinated mask-context inlined with the
established sync/async split; the one named omit carries a verified
justification (below).

## Inventory — set_artifact_intrinsic (HALRES arm)

Rewritten arm (artifact.js:1083): changed-capture → extrinsic flip →
Hallucination re-mirror → changed-arm refresh. Imports: see_objects/
see_traps/swallowed join the display.js edge; eatmupdate from eat.js
(`--can` reports ALREADY — artifact already imports eat.js — safer
than the message's "new edge SAFE"). Deleted/re-pointed: none.

## C ↔ JS fidelity — set_artifact_intrinsic

C `artifact.c:715–893` (csym range) HALRES `:788–796` calls
`make_hallucinated(!on, !restoring, wp_mask)`; C `potion.c:369–438`
mask arm (`:385–392`) + changed arm (`:414–436`):

- changed: C reads raw HHallucination before the flip; JS captures
  `HHallucination || uprops[HALLUC].intrinsic` before the flip —
  the same OR as the file-local `Hallucination()` (artifact.js:1933,
  read) ✓. Order C-exact (capture precedes the flip in both) ✓.
- Flip: `set_spfx_extrinsic(HALLUC_RES, 'EHalluc_resistance', wp_mask,
  on)` writes BOTH uprops extrinsic and the flat (read in full) ≡ C
  `!xtime → |= mask / xtime → &= ~mask` with xtime=!on ✓.
- Re-mirror: `!!(HHallucination & TIMEOUT) && !(...)` — character-
  identical to potion.js:1121/1127 including the inlined
  `hallucResisted` (compared field-by-field with potion.js:1075)
  ✓. The `& TIMEOUT` matches the repo's timeout representation
  (`itimeout()` sets the bit, potion.js:1126) ✓. Runs after the
  flip, like C's macro read ✓.
- Changed arm order: `!Hallucination() → eatmupdate` (`:417–418`,
  post-flip read ✓) → uswallow ? swallowed(0) (`:421`) : see_monsters/
  see_objects/see_traps (`:424–427`, before the pline ✓) →
  update_inventory (`:432`) → disp.botl (`:434`) + flags.botl (JS
  status mirror, established) ✓. Talk pline (`:434–436`) named.
- Talk-pline justification verified: C has exactly 6 call sites
  (do_name/invent×2/worn×3 ✓); 5 of the 6 mirroring JS sites sit in
  SYNC functions (setnotworn/oname/setworn/freeinv_core — each read);
  the 6th (u_init addinv_core1, async) runs before any timeout can
  exist, so changed=false there regardless. The callee must stay sync
  → the async pline is unportable into it ✓. No RNG in the arm; none
  added ✓.
- All 7 callees sym-verified sync, called unawaited in the sync body
  ✓. `Hallucination()` resolves to the file-local clone (artifact.js:
  1931) — the 8-clone family is pre-existing map debt; the local's
  formula matches the re-mirror's gate inputs ✓.

Stales (5, not 4 — subject counts same-file only): save_artifacts →
split to dosave0 (save.js:572/887 artidisco round-trip verified) ✓;
restore_artifacts (artifact.js:471) ✓; doinvoke (:2485) ✓;
invoke_taming (:2082) ✓; poly_steed (steed.js:1086) ✓ — all loci
substantive with bodies.

Diff grep: 0 hits. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None material. Two message imprecisions, both safer-than-claimed:
`--can` ALREADY (not "new edge SAFE"); 5 stales (not 4 — poly_steed
is cross-file).

## Density

One arm (~47 js lines) + 5 stales. Below the ~80 floor — noted for
the supervisor; fidelity exact. One C file for the code change.

- Ledger: set_artifact_intrinsic partial — ACCEPT (talk pline named).

## Verification

Re-measured (current tree incl. this SHA; 5 fns, two calls):

```text
smoke set_artifact_intrinsic: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
smoke save_artifacts: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
smoke restore_artifacts: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
smoke doinvoke: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
smoke invoke_taming: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
```

(all vacuous-with-cause at baseline.) Matches the D-log (vacuous +
REACH-OK, green/strict/cohort). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
