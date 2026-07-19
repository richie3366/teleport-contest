# Reflection — 2026-07-19 after loop #893

Human paused the loop and asked for a strategy check. This file is
durable memory for later agents; the live objective stays in
`CURRENT.md`.

## Snapshot

| Metric | Value |
|--------|------:|
| Global iteration | **893** |
| Local PASS | **37 / 44** (stuck since ~#851 seed5002) |
| Screens | **8297 / 11405** (flat across #885→#890) |
| RNG matched | **632144 / 792838** (~79.7%; wobbles ±few k) |
| Judge (last noted) | **22 / 44** — D-0480 serialize coerce; D-0483 revert pending cron |
| Primary | **seed0360 @101022** (D-0779) |
| seed0360 peel | **101022 / 120639** RNG (~84%); Scr **294 / 833** (~35%) |

## What today’s peel actually was

`seed0360-wizard-world-tour` is a long wizard `#levelchange` tour through
Gehennom specials + quest entry. Most of #743–#878 was **missing
`load_special` / hell helpers** — each port unlocked thousands of RNG
calls (oracle→castle→valley→sanctum→towers→asmodeus→…→wizard2→Wiz-strt).
That phase was healthy onion-peeling: symptom → missing C loader → big
prefix jump → next missing loader.

After Wiz-strt landed (#881), peels shrank to **gameplay call-order
bugs inside already-loaded levels**:

| Iters | Peel | Real cause (eventually) | Waste pattern |
|------:|------|-------------------------|---------------|
| ~871–879 | @98492 | missing `minliquid` (D-0775) | 7+ iters chasing boulder/`couldsee`/DEC lava |
| 881–883 | @98505→100738 | Wiz-strt + maketrap AIR + Tengu | healthy short peels |
| 884–892 | @100738→101022 | `getpos` `seenv` (D-0779) | 5+ iters on HWALL / FlipY / bat Y |
| 893 | @101022 | quasit **site-shift** (open) | diagnosed; no C-faithful fix yet |

So “struggling” ≠ “no progress.” It means **diagnose burn** rose while
**PASS / suite Scr stayed flat** because seed0360 still FAIL and no
other FAIL was promoted.

## Recurring diagnostic traps (keep naming them)

1. **`rng-diff` site-shift.** Same leaf string (`rn2(5)`, `rn2(3)`) at
   different call sites. Matched prefixes hide an *earlier* missing or
   extra call. Seen D-0778 (Tengu), D-0779 (#893 quasit 2nd fleeck).
   FORCE that skips the extra JS call and realigns the *next* C site is
   evidence of shift, not a production patch.

2. **Terrain theories without C typ dump.** #884–#888 assumed C admits
   HWALL; C dump showed ROOM and bat one cell north. Prefer recorder /
   C-state before inventing walkability rules.

3. **Screen glyph ≠ typ.** DEC `~` was read as lava; it is ROOM/ice
   glyph. Always cross-check `levl[].typ`.

4. **Known stubs that can bite siege peels.**
   `js/monmove.js` `distfleeck` hardcodes `scared = 0` (no
   `onscary`/`flees_light`). Named in NOTES/D-0779. If C’s quasit is
   df-only because scared/nearby gates differ, porting scared is the
   prerequisite — do not FORCE `want_move`.

5. **PASS count is a lagging indicator.** Deep peels on one FAIL session
   move RNG% and that session’s Scr without changing 37/44 until the
   session fully PASSes (or a different FAIL is finished).

## Strategy verdict

**Keep** the locked agentic peel strategy (cite C, small semantic unit,
no index/coord gates, no alignment queues). It produced D-0743…D-0780
coverage that did not exist this morning.

**Adjust tactics** (propose — do not edit playbook without human OK):

1. **After two falsifications on the same peel index**, stop inventing
   map theories. Required next step is either (a) C-state / recorder
   dump of the exact mon + `levl` + `dochug` branch, or (b) park the
   peel and promote a different FAIL with a clearer C locus
   (seed0014 D-0708 / seed0399 D-0731 only if C-state exists; else
   seed0383 hallu / seed4500 knight — coverage FAILs).

2. **Site-shift checklist before coding:** dump JS call site + mon id
   for the first mismatched index *and* the previous 5 matched
   `rn2(N)` with mon identity. If mon ids diverge while strings match,
   treat as site-shift.

3. **Leaderboard gap ≠ seed0360.** Local 37 vs judge 22 is primarily
   D-0480/D-0483 + held-out. Finishing seed0360 is still high suite
   Scr upside (539 remaining screens) but will not by itself explain
   the 15-session judge gap. Re-check cron after D-0483.

4. **Do not abandon seed0360 mid-siege without parking evidence.**
   Current #893 hypothesis is specific and falsifiable: C quasit turn
   is distfleeck-only (no 2nd fleeck) — suspect `MMOVE_DIED` /
   `mon_offmap` / early `dochug` return after move→CLOUD, or
   `scared`/`nearby` so `want_move` is false. One focused C read of
   `dochug` post-`m_move` + CLOUD `postmov` is the right next peel.

## Next peel packet (for #894+)

```text
Objective:        seed0360 @101022 — why C quasit skips 2nd distfleeck
C locus:          monmove.c dochug after m_move; postmov; mon_offmap
JS locus:         js/monmove.js dochug want_move / 2nd distfleeck
Symptom:          C rn2(3) bat gate vs JS rn2(5) quasit 2nd fleeck
Hypothesis:       C quasit m_move returns DIED/offmap OR never want_move
Falsifier:        C-state or JS DIAG: status after quasit m_move;
                  if JS status==MOVED and C has no 2nd fleeck → postmov
                  / region / trap path incomplete on CLOUD
Do not:           FORCE skip want_move in production; re-check bat rn2(3)
```

## Process smell for humans

Loop spent ~15–20 iterations today where the *right* method (DIAG +
FORCE + falsify) was used, but context-amnesiac agents rediscovered the
same wrong map theories. Stronger “don’t re-check” lines in NOTES and
earlier C-state dumps would cut diagnose burn without changing the
porting philosophy.
