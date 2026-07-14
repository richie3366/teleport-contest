# C→JS map — Major absent or scaffolded systems

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Major absent or scaffolded systems

This is a planning list, not an exhaustive C file inventory:

- complete role/race/gender/alignment initialization and skills;
- hero-versus-monster and monster-versus-hero combat;
- traps, riding, travel partial (`_` cancel + adjacent/greedy; full
  TEST_TRAV/GUESS/travelmap deferred); prayer partial (`#pray` p_type 0 + angrygods 0–3);
  chat partial (`#chat` wall/SDOOR/statue + MS_BARK; **`dosounds` feature gates + shop envelope** D-0204 + **vault `gd_sound`/`rn2(2)`** D-0208; You_hear plines / gold_in_vault / urooms / findgd migrating / temple_priest / oracle canseemon / other MS_* deferred);
- kicking beyond empty-space/`kick_dumb`/`kick_door` CLOSED bust
  (monsters, objects, SDOOR/SCORR, furniture, martial/shop-town);
- apply beyond lock-pick no-door (containers, other tools);
- potions, scrolls, wands, spells, equipment, artifacts;
- shops/priests/vault guards and billing;
- level transitions, branches, quests, and special levels;
- pure-JS Lua 5.4 runtime plus `nh.*` bindings;
- save/restore, record/topten through frozen storage; bones VFS JSON
  subset (D-0274 partial — missing entity / binary savelev deferred);
- properties, timeout/status effects, polymorph, death/lifesaving;
- hallucination and display RNG;
- animation-frame parity.

