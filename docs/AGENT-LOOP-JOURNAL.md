# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-19 13:20 — #871 @98492 linedup boulder (D-0773 diag)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS linedup rn2(3).
- C locus: `mthrowu.c` `linedup`; `sp_lev.c` `fill_empty_maze`/`flip_level`.
- Change or falsified theory: no port patch. DIAG: PM_MUMAK (55,9)→hero
  (59,9); path lava(56,9)+boulder(57,9); strip boulder → couldsee true
  (lava does not block). FORCE skip rn2 → prefix 98492→98502 then C
  getbones+nhlib shuffle (wizard3). Boulder from fill_empty_maze (57,13)
  + Y-flip (extends ymin=2,ymax=20). C lacks that LOS boulder.
- Verification: green+strict PASS; seed0360 still @98492 (no code change).
- Next: why C lacks boulder @(57,9) (placement/flip/destruction); then
  wizard3/hellfill after getbones shuffle.

## 2026-07-19 13:05 — #870 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629134**/792838 (79.35%), speed `35+0.21/turn`. Δ vs #865:
  Scr +2, RNG +12414 (D-0771/72 reflected), PASS 0. seed0360 still @98492.
- Next: @98492 why C skips linedup boulder rn2 (couldsee / m_move).

## 2026-07-19 13:01 — #869 hell_tweaks `.w.` + @98492 linedup diag (D-0772)
- Objective: seed0360 @98492 C distfleeck rn2(5) vs JS rn2(3).
- C locus: `nhlib.lua` hell_tweaks `[[.w.]]`; `mthrowu.c` linedup;
  `mkmaze.c` get_level_extends.
- Change: hell_tweaks match `'.w.'` (not `'[.w.]'`); extends xmin/xmax
  clamps. DIAG: JS linedup boulder rn2 for mumak LOS; C still fleeck.
- Verification: green+strict PASS; cohort **11/11**; prefix still **98492**.
- Next: @98492 why C skips linedup boulder rn2 (couldsee / m_move).

## 2026-07-19 12:45 — #868 wizard2 load_special (D-0771)
- Objective: seed0360 @86170 C nhlib shuffle vs JS rn2(79) after getbones.
- C locus: `dat/wizard2.lua` / `sp_lev.c` `load_special` / mazewalk.
- Change: `load_wizard2` + dispatch (mazegrid + zoo + mazewalk + ladders
  + hell_tweaks). Fingerprint ruled out hellfill (no hellno before walkfrom).
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86170→98492**; RNG **86170→98507**; Scr **273→275**/833.
- Next: @98492 C distfleeck rn2(5) vs JS rn2(3) (wizard3/hellfill if shuffle).

## 2026-07-19 12:37 — #867 flyer trap + poisoncloud (D-0770)
- Objective: seed0360 @86100 track rn2(8) vs JS sleep-gas rnd(25).
- C locus: `trap.c` `m_harmless_trap`/`check_in_air`/`mintrap`;
  `mon.c` `mfndpos` gas_glyph; `region.c` `make_gas_cloud`.
- Change: flyer floor_trigger harmless + mintrap in-air skip; mfndpos
  avoids only `S_poisoncloud` (not fog/steam). Bat regained track cell.
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **86100→86170**; RNG **86137→86170**; Scr **273**/833.
- Next: @86170 C nhlib `shuffle` vs JS `rn2(79)` after getbones
  (wizard2/hellfill).

## 2026-07-19 12:24 — #866 maybe_unhide_at (D-0769)
- Objective: seed0360 @86029 distfleeck rn2(5) vs JS rn2(20).
- C locus: `mon.c` `maybe_unhide_at`; `monmove.c` `m_move` ≈2060.
- Change: port `maybe_unhide_at` after place so postmov hide `rn2(5)`
  runs when dest has no cover (snake left hiding). Omit youmonst path.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **86029→86100**; RNG **86118→86137**; Scr **273**/833.
- Next: @86100 C track `rn2(8)` vs JS `rnd(25)` sleep-gas.

## 2026-07-19 12:12 — #865 wizard1 + public score (D-0768)
- Objective: mandatory full `sessions` score; seed0360 @82982 wizard1.
- C locus: `dat/wizard1.lua` / `sp_lev.c` `load_special` / `create_door`.
- Change: `load_wizard1` + dispatch (mazegrid + center map + east
  mazewalk + morgue secret door + ladder + hell_tweaks). Omit
  hellfill/wizard2–3/fakewiz.
- Verification: green+strict PASS; cohort **35/35**; seed0360 prefix
  **82982→86029**; RNG **82989→86118**; Scr **273**/833. Full suite
  **37/44**; Scr **8278**/11405; RNG **616720**/792838 (77.79%);
  speed `36+0.20/turn` (R² 0.822). Δ vs #860: Scr **+6**, RNG **+14,263**.
- Next: @86029 C `distfleeck`/`m_move` vs JS `rn2(20)` (post-wizard1
  gameplay); or wizard2 if next special.

## 2026-07-19 12:05 — #864 orcus + Orcus mongone (D-0767)
- Objective: seed0360 @76622 C nhlib shuffle / walkfrom vs JS rn2(79).
- C locus: `dat/orcus.lua`; `shknam.c` stock_room Orcus mongone;
  `steal.c` mdrop_special_objs obj_resists.
- Change: `load_orcus` + dispatch; `stock_room` Orcus invent obj_resists
  + detach. Omit hellfill/wizard*/fakewiz; full shkgone.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **76622→82982**; RNG **76625→82989**; Scr **273**/833.
- Next: @82982 C nhlib shuffle / wizard1.lua vs JS rn2(79).

## 2026-07-19 11:56 — #863 baalz / baalz_fixup (D-0766)
- Objective: seed0360 @74801 C nhlib shuffle / walkfrom vs JS rn2(79).
- C locus: `dat/baalz.lua`; `mkmaze.c` `baalz_fixup` / bughack wallify;
  `sp_lev.c` corrmaze; map without contents keeps xstart.
- Change: `load_baalz` + dispatch; `baalz_fixup` + `Is_baal_level`;
  bughack in `wall_cleanup`/`fix_wall_spines`. Omit orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 18/18; seed0360 prefix
  **74801→76622**; RNG **74803→76625**; Scr **273**/833.
- Next: @76622 C nhlib shuffle / walkfrom → **orcus** (`orcus.lua:107`).

## 2026-07-19 11:48 — #862 juiblex / lvlfill_swamp (D-0765)
- Objective: seed0360 @72078 C nhlib shuffle / lvlfill_swamp vs JS rn2(79).
- C locus: `dat/juiblex.lua`; `sp_lev.c` `lvlfill_swamp` / LVLINIT_SWAMP;
  `lspo_map` left/right/top/bottom.
- Change: `lvlfill_swamp` + SWAMP init; map align L/R/T/B; `load_juiblex`
  + dispatch; `Is_juiblex_level`. Omit baalz/orcus/hellfill/wizard*.
- Verification: green+strict PASS; cohort 15/15; seed0360 prefix
  **72078→74801**; RNG **72079→74607**; Scr **270→267**/833.
- Next: @74801 C nhlib shuffle / `walkfrom` (baalz/orcus/hellfill/wizard*).

## 2026-07-19 11:40 — #861 hell_tweaks (D-0764)
- Objective: seed0360 @71832 C hell_tweaks percent vs JS flip `rn2(2)`.
- C locus: `dat/nhlib.lua` hell_tweaks; `dat/asmodeus.lua` protected;
  `nhlsel.c` fillrect get_location_coord; selvar grow/or/not/set.
- Change: port `hell_tweaks` + selection helpers; fillrect adds xstart
  (bare abs bounds overran filter_percent by 3 cells).
- Verification: green+strict PASS; cohort **37/37**; seed0360 prefix
  **71832→72078**; RNG **71855→72079**; Scr **270**/833.
- Next: @72078 C nhlib shuffle / `lvlfill_swamp` (juiblex) vs JS `rn2(79)`.

