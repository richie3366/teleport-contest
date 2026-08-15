# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.

## Must-fix (from reviews) — pop first

Written reviews are not theater. Each item is a Keep’d **C-wrong** (JS
contradicts C, not a named omit). After shipping: check it off **and**
edit the cited review (`**Addressed:** D-NNNN HASH`). Commit + push that
review update in the same iteration.

Catch-up from `reviews/loop-2026-08-15/` (2026-08-15). Already done
off-queue: D-1022 `getdir`/`hurtle` (D-1038); D-1033 trap-before-throne
(D-1039); D-1036 hatch dispatch (D-1037).

- [x] `find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding like C `worn.c` (thitmonst tmp). Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1042 `19e907f5`.
- [x] `should_mulch_missile` hero blessed save must be `rnl(4)` not `rn2(4)` like C `dothrow.c`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1043 `d3fac215`.
- [ ] `special_obj_hits_leader` must use C `is_quest_artifact` (`urole.questarti`), not `u.questarti`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`.
- [x] Pole targeting: `glyph_is_poleable_at` / `find_poleable_mon` must follow C `apply.c` `use_pole` (live `m_at` / map, not a glyph-only stand-in). Source: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` risk 3. **Addressed:** D-1040 `12458fe9`.
- [x] Pole `thitmonst` hit-vs-miss envelope for `use_pole` (combat RNG). Source: D-1022 risk 4. **Addressed:** D-1041 `eb3469ae`.
- [ ] Whip/pole/grapple names: real `yname` / `Amonnam` / `mbodypart` (not local apply clones). Source: D-1022 risk 5.
- [ ] `light_cocktail` must take/update `struct obj **` like C `apply.c` `light_cocktail`. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` risk 4.
- [ ] `consume_obj_charge` unpaid/shop path (not `spe--` only). Source: D-1023 risk 3.
- [ ] Vlad special case 10: C sets `HConfusion` only; JS must not also force flat `u.Confusion`. Source: `reviews/loop-2026-08-15/D-1033-a59caac8-vlad-throne.md` risk 2.
- [ ] `take_gold` must `remove_worn_item` like C `sit.c`. Source: `reviews/loop-2026-08-15/D-1034-63e86f5a-ordinary-throne.md` risk 3.
- [ ] `pickup_object` honors `telekinesis` like C (whip/grapple pull-in). Source: D-1022 risk 6.
- [ ] `u_wipe_engr` / `tmp_at` no-ops in apply: wire or stop calling them as if they were C. Source: D-1022 risk 7.
- [ ] Cursed-lamp `make_glib`: JS `(u.Glib|0)&TIMEOUT` must match C `HGlib|EGlib` timeout. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` `use_lamp` gap.
- [ ] `cry_sound`: monster `msound` must be C `monflag.h` numbers, not empty → always-chitter. Source: `reviews/loop-2026-08-15/D-1036-2ae43a8b-hatch-egg.md` risk 3.
- [ ] `get_obj_location` flags: JS `0` must not accept CONTAINED when C hatch passes `0`. Source: D-1036 risk 4.

Review iterations **prepend** new Keep’d C-wrongs here (not under Open).

## Open (map-driven, after Must-fix is empty)

- [ ] `sit.c` `dosit` water / pool / gremlin sit (after trap, before sink). Not the furniture list.
- [ ] `sit.c` `dosit` sink / altar / grave / stairs / ladder sit messages only.
- [ ] `sit.c` `dosit` lava / ice / drawbridge sit (terrain, not trap-lava already in D-1039).
- [ ] tut-1 `des` kelp only. Not stairs / box / key / `place_lregion`.
- [ ] tut-1 stairs only.
- [ ] tut-1 large-box contents only.
- [ ] tut-1 food objects only.
- [ ] tut-1 `place_lregion` only.
- [ ] tut-1 `tut_key` / eckey only.
- [ ] tut-1 nhcore callback disable on enter/leave.
- [ ] `dosit` steed message: C `mon_nam(usteed)`, not `"your steed"`. Source: D-1033 risk 4 (named, not a Must-fix).

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
