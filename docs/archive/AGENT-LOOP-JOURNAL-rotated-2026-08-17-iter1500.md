# Rotated from AGENT-LOOP-JOURNAL.md after #1500 review D-1177–D-1180 + cadence

## 2026-08-17 17:35 — #1485 review D-1165–D-1168 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `dothrow.c` `hurtle_step` 784–790 / `region.c`
`in_out_region` 480–527; `do.c` `goto_level` 1974–1996;
`hack.c` `domove_core` 2873–2884 / `monmove.c` `m_postmove_effect`
672–683; `allmain.c` `moveloop_core` 370–377 / `mkmaze.c`
`fumaroles` 1484–1514.
**Change:** reviews **126** ACCEPT D-1165 (else-if after `isok`
before `*range==0`; real `in_out_region`; `mhurtle_step` named),
**127** ACCEPT D-1166 (`(void)` landing-cell await; `obj_delivery`
/ shop / fall named), **128** ACCEPT D-1167 (occupy then
youmonst helper at `u.ux0`; everyturn fog named), **129** ACCEPT
D-1168 (EOT water/air `movebubbles` else `fumaroles`; callee
D-1156; `intervene`/`amulet()` named). Must-fix empty. Filled
D-1168 archive hash `0ff54fb4`. Rotated #1470. Open 11 (no
refill). Rule #2: no fs.
**Score:** cadence **#1485** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `33+0.27/turn` (R² 0.86). Next
@**#1490**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `region.c` `run_regions` `hero_inside` bit (named).
Not walk caller.
**Blocked:** none.
