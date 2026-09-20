# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-20 — D-2705 `dungeon.c` query_annotation whole-body restart on live callees + `trimspaces` port

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2704 `weapon.c` add_skills_to_menu whole-body restart + show_skills

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2703 `invent.c` reroll_menu whole C body + allmain reroll loop

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2702 `cmd.c` key2extcmddesc whole C body + live movecmd

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2701 `sp_lev.c` set_wallprop_in_selection whole C body

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2700 `mondata.c` mstrength whole C body

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2699 `u_init.c` pauper_reinit whole C body

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2698 `cmd.c` domouseaction + dotoggleoption whole C bodies (wearsot Stale-parked)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2697 `sp_lev.c` sel_set_door `:4659` orientation in all remaining coord-form des.door sites

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — Audit reviews 1647–1655 (D-2688…D-2696) + cadence 44/44

Reviews: 6 ACCEPT (1647 nhmd4, 1648 immune_to_trap, 1650 explosionmask,
1651 adj_erinys, 1652 percent_success, 1653 ini_inv), 2 WITH-DEBT (1649
eatcorpse Sick/make_sick debt; 1655 rndcoord-removeit debt), 1
QUALITY-RISK (1654: D-2695 wired set_door_orientation into 15 of 41
coord-form des.door closures, claimed "each" — castle/quest/gehennom/
minetn no-epilogue loaders leave `horizontal` unset; Must-fix queued,
pops first; CURRENT Next cluster set). Every per-SHA
`hidden-proxy verify --reach-all` re-run: 0 blocked (vacuous, honestly
stated) + REACH-OK, no REGRESSED. Cadence: public 44/44 (Scr
11,405/11,405, RNG 792,838/792,838, `55+0.36/turn`); held-out 12/44
(+0); corpus 497/540 (92.0 %, +0/−0). Refill: `--rows 400`
cross-checked, pool exhausted (options-class only), nothing appended.
Rule #2 clean. Next: pop the sel_set_door Must-fix first.
## 2026-09-20 — D-2696 `selvar.c` selection_recalc_bounds whole-body restart (dirty protocol + getbounds wiring)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
