# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-08-15

- [x] `consume_obj_charge` unpaid/shop path (not `spe--` only). Source: D-1023 risk 3. **Addressed:** D-1047 `2ca2ccd7`


- [x] `light_cocktail` must take/update `struct obj **` like C `apply.c` `light_cocktail`. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` risk 4. **Addressed:** D-1046 `3371ddf0`


- [x] Whip/pole/grapple names: real `yname` / `Amonnam` / `mbodypart` (not local apply clones). Source: D-1022 risk 5. **Addressed:** D-1045 `e8884a53`.


- [x] `special_obj_hits_leader` must use C `is_quest_artifact` (`urole.questarti`), not `u.questarti`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1044 `d9febc3c`.

- [x] `find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding like C `worn.c` (thitmonst tmp). Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1042 `19e907f5`.
- [x] `should_mulch_missile` hero blessed save must be `rnl(4)` not `rn2(4)` like C `dothrow.c`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1043 `d3fac215`.
- [x] Pole targeting: `glyph_is_poleable_at` / `find_poleable_mon` must follow C `apply.c` `use_pole` (live `m_at` / map, not a glyph-only stand-in). Source: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` risk 3. **Addressed:** D-1040 `12458fe9`.
- [x] Pole `thitmonst` hit-vs-miss envelope for `use_pole` (combat RNG). Source: D-1022 risk 4. **Addressed:** D-1041 `eb3469ae`.
