# C→JS map — Known constitutional debt

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Known constitutional debt

These are not protected merely because the two green sessions exercise them:

| JS area | Debt to replace from C |
|---|---|
| `js/jsmain.js` capture hook | Detects Count/`--More--` text and repairs cursor at capture time; cursor semantics belong in input/display code |
| `js/display.js` message paths | Contains scenario-derived cursor/layout special cases rather than complete window/message policy |
| `js/eat.js` | Cookie + reqtime-1 `touchfood`/`fprefx` (D-0155); **CORPSE `eatcorpse`/`eatfood`** (D-0193); **`floorfood` feeding + poison_strdmg** (D-0221); **floor `useupf`/`delobj`** (D-0222); **`eye_of_newt_buzz` via `cpostfx`** (D-0492); **`start_tin`/`opentin`/`consume_tin` + multi-turn rations** (D-0935); **`is_edible` poly diets + `doeat_nonfood`/`eatspecial`/`foodword` + floor gold** (D-0936); **metallivore floorfood beartrap/IRONBARS + `doeat` `hands_obj` + `still_chewing`/`dissolve_bars`** (D-0937); **`b_trapped` + `make_stunned` (tin/door/chew/kick)** (D-0938); **`cprefx` + `maybe_cannibal`/`fix_petrification` + `flesh_petrifies`/`slimeproof`/`same_race`/`were_beastie` + `make_stoned`/`make_slimed`/`delayed_killer`** (D-0939); pool-lava reach; cpostfx specials; tin `costly_tin` shop / `use_tin_opener`; `still_chewing` shop/`watch_dig`; eatspecial PAPER/potion/ring/amulet; cprefx `revive_corpse` after rider lifesave still deferred |
| `js/invent.js` | Corner invent + disco `*`/encounter + `obj_typename` (D-0040); ^X autopickup/limits/`weapon_descr` (D-0041); **Samurai disco + invent `observe_object`** (D-0079); **^X gender omit + Attributes MC warded** (D-0097); **^X moon/friday13 + 23-row continuous page** (D-0158); fullscreen invent and full magic enlightenment deferred |
| `js/u_init.js` / `js/roles.js` | Rogue/Tourist/Wizard/Priest/Knight/Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/**Caveman** + human/orc(/elf/dwarf/gnome) race kits (D-0027/D-0042…/52); pantheon gods + C roles[] order; **race `hpadv`/`enadv` table** (D-0036); **roles `xlev` copied to `game.urole`** (D-0061); helm/gloves/boots/shield wear + Barbarian/Knight/Samurai/Valkyrie/Ranger/Monk `knows_class`/`HJumping`/`Japanese_item_name`/`is_ammo`/`is_launcher`/`is_spear`; Caveman FLINT/ROCK quiver; **`oc_skill`/`a_ac`/`oc_level` extracted**; dagger `knows_class` can migrate; **`skill_init` via `u_init_skills_discoveries`** (D-0122; Skill_T/R + all roles); **roles `spel*` + `initialspell`/`age_spells`/`dovspell` VIEW** (D-0129); **`skill_based_spellbook_id` + spelspec unrestrict** (D-0132); **`docast` SPE_HEALING** (D-0135); omit swap/sort/other cast otyps/`oc_charged` |
| `js/allmain.js` | Welcome/HP/align no longer Tourist-literal; **`regen_hp` once-per-turn** (D-0035); tutorial, hunger, sound, and attribute checks still have deferred branches |
| `js/mon.js` / `js/monmove.js` / `js/dogmove.js` | Monster flags, movement predicates, targeting, carrying, and combat have named stubs/defaults |
| `js/mklev.js` / `js/mkobj.js` / `js/makemon.js` | Many terrain/object/monster-type branches remain scenario-limited |

When editing one of these areas, replace the narrow behavior with its C
semantic unit and run a non-target cohort. Do not preserve a trace-derived path
solely to keep a Tourist seed green.

