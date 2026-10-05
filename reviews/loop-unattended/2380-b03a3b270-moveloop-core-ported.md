# Review 2380 — b03a3b270 — moveloop_core MAP-redisplay + ported (D-3435)

- SHA: `b03a3b270` — "breadth batch @c62203c66: moveloop_core run/tport MAP-redisplay arm (D-3435)."
- D-entry: D-3435. Diff: js/allmain.js (+19/−0), ledger row, docs + scoreboard. No new tests.
- 1-function SHA: the whole Method runs on `moveloop_core`,
  including a full-body read for the `ported` flip. Left open: none.

## Intent vs deliverable

Promise: the exact `ledger.mjs batch` manifest at c62203c66 (1 fn);
C-exact MAP-redisplay condition + botl sub-arm; the WIN_MAP repaint
call retired as subsumed by the every-tick flush; `ported`
("none — whole"); sweep + full 44/44.

Manifest reproduced in a worktree at c62203c66 (pinned-C symlink,
Node 22): `batch @c62203c66: 1 function(s) in allmain.c — open 0 ·
partial 1 · recheck 0 · ~88 C lines` — matches verbatim. Row now
`ported`, no omit. No overage, Left open none, no Must-fix bundled.

Diff actually delivers: the condition + botl arm with RUN_* imports.
No drive-bys. No deleted symbols. New edge: allmain→const RUN_*
(house const, no cycle).

## Inventory

```text
moveloop_core | ported | js/allmain.js:1160 | allmain.c:177-564
```

## C ↔ JS fidelity

Full-body read of js/allmain.js:1160-1599 against C :177-564
(csym range; branch order + RNG call-for-call):

- The new arm is exact: `(!run || runmode==RUN_TPORT) && multi &&
  (!travel ? !(multi%7) : !(moves%7))` ≡ :548-552 (C99 and JS `%`
  both truncate toward zero — negative-multi semantics identical);
  RUN_TPORT/LEAP/STEP/CRAWL = 0/1/2/3 ≡ flag.h:548; LEAP default ≡
  initoptions_init :7176 (matches the local runmodeNow logic; the
  inline avoids an allmain→options edge); `flags.botl = true` ≡
  `disp.botl = TRUE` (botl.js:599: same store bot() reads).
- The retired repaint call: SOUND. C's every-7th WIN_MAP repaint is
  subsumed by JS's every-tick flush_screen(1) (:1482), which paints
  identical map content each turn — C's incremental newsym path
  converges to the same cells, so the schedule is unobservable in
  screens; map repaints draw no gameplay RNG (display uses the
  separate rn2_on_display_rng stream). "Retired as no-op with proof"
  matches the get_nhuuid/SetVoice precedent class.
- Whole-body: every C arm present in order — SAFERHANGUP, POSITIONBAR
  (false ≡ pcconf-only), customizations, dobjsfree/bypasses/sanity/
  resume_wish, the move block (mon loop, mcalcdistress, moves++,
  capitulate, hero_seq, time_botl, NHCORE, Glib/timeout/regions,
  regen_hp eel arm, overexert, regen_pw, tele_poly_were, dosearch0,
  Warning, were/dosounds/storms/gethungry/age/exerchk/invault,
  amulet, wipe_engr rn2(40+DEX*3)/rnd(3), udemigod rn1(200,50),
  bubbles/fumaroles, multi<0 occupation), hero_seq++, encumber,
  hilite, seer_turn rn1(31,15), lava/pooleffects, underwater,
  see_nearby, splitobjs/amulet-wish/find_ac, the !mv||Blind see_*
  gate (now meaningful with D-3434's mv maintenance — the D-3433
  disclosure is fully resolved, not just the replay path), bot/
  timebot/flush, m_everyturn_effect, occupation arm, umoved=false,
  the run/multi>0(!mv+mv)/multi==0(MAIL — defined, unixconf.h:146)
  dispatch, deferred_goto, vision_recalc, cliparound, the new
  condition+botl, NHCB_END_TURN. RNG: exactly C's 3 draws
  (wipe_engr, udemigod, seer_turn), in position.
- Disclosed scope: the run_active→continue_run composition (house
  run model) predates D-3435 with its own review coverage; not
  re-walked (2372 makemon-middle precedent).

## Hallucinations / overclaim

None. The "identical map content / schedule unobservable" claim is
argued with mechanism (subsumption + separate display-RNG stream),
not asserted; 724 green sessions corroborate.

## Density

Batch = picker manifest (1/1); Left open none; no Must-fix bundled.

```text
moveloop_core ACCEPT (ported; full-body verified)
```

## Verification

- Re-measured (`--base b03a3b270~1 --reach-all`): 0 blocked
  (vacuous, as D-logged — rows cited no blocks) + reach 724/724,
  0 regressed → REACH-OK. Matches the D-log sweep.
- `imports.mjs --rulecheck`: Rule #2 clean. Diff grep: no
  FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
