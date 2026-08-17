# Rotated from AGENT-LOOP-JOURNAL.md after #1499 D-1180 rloc_to_core telemsg

## 2026-08-17 17:12 — #1484 D-1168 moveloop EOT fumaroles

**Objective:** Open — `allmain.c` `moveloop` `fumaroles` (named).
Not mklev.
**C locus:** `allmain.c` `moveloop_core` 370–377 after wipe /
udemigod (named) before `multi<0`; callee `mkmaze.c` `fumaroles`
1484–1514 (D-1156). Twin `do.c` `goto_level` 1831–1834.
**Change:** EOT `Is_waterlevel||Is_airlevel` `movebubbles` else
`flags.fumaroles` `await fumaroles()`. Water/air short-circuit.
Did not pull udemigod `intervene`, `glibr`, `do_storms`,
`amulet()`, `mkot_trap_warn`, or `m_everyturn` youmonst. Filled
D-1167 archive hash `d6ba6ede`. Rotated #1469. Open 11 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **27**/27 (C/JS if/else; wipe then
fumaroles then multi; import; water/air arm no fumaroles;
goto_level twin; C body ungated; ordinary none / flag fumaroles /
water+flag bubbles / air+flag bubbles; !flag no RNG; flag-on
`rn2(3)`; callee still `clear_heros_fault`; thenable; ordinary
movebubbles no-op; no fs/FORCE); green+strict seed8000/0900;
cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015.
Path public-unhit on EOT lava whoosh.
**Next:** Open `region.c` `run_regions` `hero_inside` bit (named).
Not walk caller.
**Blocked:** none.
