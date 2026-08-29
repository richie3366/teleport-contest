# C→JS map — Major absent or scaffolded systems

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Major absent or scaffolded systems

This is a planning list, not an exhaustive C file inventory:

- complete role/race/gender/alignment initialization and skills;
- hero-versus-monster and monster-versus-hero combat;
- traps, riding, travel partial (`_` cancel + adjacent/greedy; full
  TEST_TRAV/GUESS/travelmap deferred); prayer partial (`#pray` + angrygods 0–8 /
  default zap D-0969; pleased gifts still deferred; music earthquake
  `desecrate_altar` wired D-0972);
  chat partial (`#chat` wall/SDOOR/statue + MS_BARK; **`dosounds` feature gates + shop envelope** D-0204 + **vault `gd_sound`/`rn2(2)`** D-0208 + **fountain/sink You_hear** D-0303 + **shop You_hear** D-0306; swamp You1 / barracks/court You_hear / findgd migrating / temple_priest / oracle canseemon / other MS_* deferred); **`u_entered_shop` welcome** D-0307 + deserted/angry/Invis/doorway D-1080 (SetVoice/Soundeffect/Hallu shkname named);
- kicking beyond empty-space/`kick_dumb`/`kick_door` CLOSED bust
  (`kick_object`+`bhit` KICKED via D-0988; Is_box/`ghitm` via D-0989;
  `hits_bars`/`hit_bars` via D-0990; costly_gold/donate_gold via D-0991;
  fire_damage/altar/hot potion via D-0992; globby pudding_merge via
  D-0993; sellobj/check_shop_obj via D-0994; barefoot petrify +
  `bhit` DISP_FLASH via D-0995; **selftouch/mselftouch/minstapetrify +
  monstone** via D-0996; **STATUE_TRAP activate + Blind feel** via
  D-0997;
  throne/`fall_through`/tree via D-0986; SDOOR/altar/fountain/grave/sink
  via D-0985);
- apply beyond lock-pick no-door (containers, other tools;
  `use_crystal_ball` via D-1010; `use_towel` via D-1009; `use_saddle`
  via D-1008; whistle/leash via D-1007/D-1005; **BLINDFOLD/LENSES
  Blindf_on/off** via D-1013; **`use_stone` graystone/touchstone** via
  D-1014; containers already wired via `use_container`;
  **whip/grapple/`use_pole` D-1022** + **pole `glyph_at` D-1040** + **`thitmonst` hit-vs-miss D-1041** + **shared getdir/`hurtle` D-1038** + **whip `yname`/`Amonnam`/`mbodypart` D-1045** + **`u_wipe_engr` / S_goodpos `tmp_at` D-1051**;
  **oil lamp/cocktail/trap/BoT D-1023** + **`light_cocktail` `struct obj **` D-1046** + **`consume_obj_charge` unpaid/`check_unpaid` D-1047** (SetVoice / lamp-oil `check_unpaid` / perm_invent redraw still named);
  **`use_royal_jelly` D-1021**);
- potions, scrolls, wands, spells, equipment, artifacts;
- shops/priests/vault guards and billing (sellobj/check_shop_obj
  throw-land + drop via D-0994; **dopay robbed/angry/debit** via
  D-0998; remaining used-up/container bill + getpos pay-whom);
- level transitions, branches, quests, and special levels;
- pure-JS Lua 5.4 runtime plus `nh.*` bindings;
- save/restore JSON VFS subset (D-0335 — `dosave`/`dosave0`/`try_restore_save`;
  **current-level traps D-1694**; binary NHFILE / multi-level ledger deferred); record/topten through frozen
  storage; bones VFS JSON subset (D-0274 partial — missing entity deferred);
- properties, timeout/status effects, polymorph, death/lifesaving;
- hallucination and display RNG;
- animation-frame parity.

