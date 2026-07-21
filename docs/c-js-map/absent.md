# C→JS map — Major absent or scaffolded systems

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Major absent or scaffolded systems

This is a planning list, not an exhaustive C file inventory:

- complete role/race/gender/alignment initialization and skills;
- hero-versus-monster and monster-versus-hero combat;
- traps, riding, travel partial (`_` cancel + adjacent/greedy; full
  TEST_TRAV/GUESS/travelmap deferred); prayer partial (`#pray` + angrygods 0–8 /
  default zap D-0969; music earthquake altar desecrate / pleased gifts still
  deferred);
  chat partial (`#chat` wall/SDOOR/statue + MS_BARK; **`dosounds` feature gates + shop envelope** D-0204 + **vault `gd_sound`/`rn2(2)`** D-0208 + **fountain/sink You_hear** D-0303 + **shop You_hear** D-0306; swamp You1 / barracks/court You_hear / findgd migrating / temple_priest / oracle canseemon / other MS_* deferred); **`u_entered_shop` welcome** D-0307 (deserted/angry/Invis/doorway block deferred);
- kicking beyond empty-space/`kick_dumb`/`kick_door` CLOSED bust
  (monsters, objects, SDOOR/SCORR, furniture, martial/shop-town);
- apply beyond lock-pick no-door (containers, other tools);
- potions, scrolls, wands, spells, equipment, artifacts;
- shops/priests/vault guards and billing;
- level transitions, branches, quests, and special levels;
- pure-JS Lua 5.4 runtime plus `nh.*` bindings;
- save/restore JSON VFS subset (D-0335 — `dosave`/`dosave0`/`try_restore_save`;
  binary NHFILE / multi-level ledger deferred); record/topten through frozen
  storage; bones VFS JSON subset (D-0274 partial — missing entity deferred);
- properties, timeout/status effects, polymorph, death/lifesaving;
- hallucination and display RNG;
- animation-frame parity.

