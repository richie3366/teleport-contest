# NetHack 5.0 C → JavaScript port — progress report

**Generated:** 2026-05-16  
**Repository:** Teleport contest fork (`teleport-contest`)  
**C reference:** `nethack-c/upstream/src` (NetHack 5.0.0 release tree; **~130 `.c` files** in `src/` at time of analysis)  
**Contestant code:** `js/` (plain ES modules; frozen harness files per contest rules)

### Rolling changelog (high level)

| When | What changed |
|------|----------------|
| **2026-05-16 (`exerchk` / `exerper`)** | **`js/attrib.js`:** **`exerper()`** from **`attrib.c`** — **`moves % 10`** hunger band on **`u.uhunger`** (skip hunger block if unset), encumbrance **`nearCapacity()`** vs **`ENC`**, **`moves % 5`** status hooks (**`HClairvoyant`**, **`HRegeneration`**, **`usick`/`Vomiting`**, **`Confusion`/`Hallucination`**, legs/**`Fumbling`/`HStun`**). **`collectExerchkPlines()`** — **`exerper`**, then when **`moves >= context.next_attrib_check`** and **`!multi`**: **`AEXE`** loop (**`sgn`**, **`ATTRMIN`/`ATTRMAX`**, poly gate, **`rn2(AVAL)`** vs Wis/others), **`adjattrib`**, **`You must have been / haven't been …`** from **`exertext`**, **`next_attrib_check += rn1(200,800)`**. **`js/allmain.js`:** **`u.uhunger = 900`** ( **`eat.c` `init_uhunger`** ), **`context.next_attrib_check`** default **600**; after each time-consuming **`moves++`**, **`await pline`** each collected line. **`js/jsmain.js`:** **`g.context.next_attrib_check`** in initial **`context`**. **`js/moveloop_aux.js`:** harness comment — **`pre`/`post_moveloop82_exercise`** still session-shaped vs C order. **Caveat:** new **`exerper`** / **`exerchk`** draws plus **`uhunger`** init may **RNG-drift** public sessions until **`end_of_turn`** / fastforward align. **Likely next step:** reconcile **`moveloop_aux`** harness **`rn2(19)`/`rn2(31)`** with **`exerchk`** placement / C **`allmain.c`** tail order; wire **`useSkill`** / **`drainWeaponSkill`** from combat. |
| **2026-05-16 (`exercise` / `AEXE`)** | **`js/attrib.js`:** real **`exercise(i, incOrDec)`** from **`attrib.c`** — skip **Int/Cha**, **`Upolyd`** gate (**Wis** only), **`abs(AEXE) < 50`**, **`rn2(19) > ACURR`** gain vs **`-rn2(2)`** abuse (**`AVAL`** = **50**). **`adjattrib`** clears **`u.aexe[attr]`** on successful ACURR change (C **`AEXE(ndx)=0`**). **`encumber_msg`** after Str/Con exercise not called (**async** **`pickup.encumberMsg`**). **`js/u_init_attr.js`:** **`init_attr`** zeroes **`u.aexe.a[]`**. **`js/moveloop_aux.js`:** comment — harness **`rn2(19)`/`rn2(31)`** remain until **`exerchk`/`exerper`**. **Caveat:** paths that already called **`exercise`** now draw **`rn2`** (was no-op). **Likely next step (superseded in part):** **`exerchk`** / **`exerper`** landed (see row above); align **`moveloop_aux`** harness with C tail; wire **`useSkill`** from combat. |
| **2026-05-16 (wizard speedy `#enhance`)** | **`js/u_init_skills.js`:** **`canAdvance(u, skill, speedy, g)`** — C **`wizard && speedy`** skips **`P_ADVANCE`** / **`weapon_slots`** checks; **`enhancePickFirstAdvanceable(u, speedy, g)`**; **`skillAdvance(u, skill, g, { speedy })`**; **`enhanceWeaponSkillOneStep(g, { speedy })`** loops until no **`can_advance(..., TRUE)`**, returns **`{ ok, plines: string[] }`** (non-wizard path unchanged semantics, new shape). **`js/extcmd.js`:** **`OPTIONS=wizard`** → **`#e`** asks *Advance skills without practice? [yn]* then **`nhgetch`**; **`y`/`Y`** runs speedy loop (multiple **`skill_advance`** per **`#e`**). **Likely next step:** wire **`useSkill`** / **`drainWeaponSkill`** from combat / amnesia; full **`#enhance`** TTY menu / typed **`#enhance`**; **`P_NAME`** from **`objects`**. |
| **2026-05-16 (`use_skill` + `drain_weapon_skill`)** | **`js/u_init_skills.js`:** **`useSkill(u, skill, degree)`** (**`weapon.c`** **`use_skill`** — **`P_ADVANCE`** += **`degree`**, **`give_may_advance_msg(skill)`** when crossing into **`can_advance`**); **`drainWeaponSkill(u, n)`** (**`drain_weapon_skill`** — **`rn2`** random **`skill_record`** slot, **`P_SKILL--`**, **`weapon_slots`** refund **`slots_required`**, **`P_ADVANCE`** trim **`prevadv + rn2(curradv - prevadv)`** when **`advance ≥ curradv`**). **`takePendingDrainForgetPlines`**: **You forget … your training in …** queued on **`g._drainForgetPlines`**. **`js/moveloop_preamble.js`:** flushes drain forget lines after **`give_may_advance`**. **Not wired:** combat / cast / energy-drain call sites still TODO. **Likely next step:** *Superseded in part by wizard **speedy** row above;* call **`useSkill`** / **`drainWeaponSkill`** from combat / amnesia; real **`g.invent`**. |
| **2026-05-16 (`#enhance` / `skill_advance`)** | **`js/u_init_skills.js`:** **`skillAdvance`**, **`enhancePickFirstAdvanceable`**, **`enhanceWeaponSkillOneStep`**, **`giveMayAdvancePlineText`**, **`takePendingGiveMayAdvancePline`** (**`weapon.c`** **`skill_advance`**, **`enhance_weapon_skill`** iteration order, **`give_may_advance_msg`**). **`addWeaponSkill`** sets **`game._giveMayAdvancePline`** when new **XL** slots unlock an advance. **`js/extcmd.js`:** **`#e`/`#E`** — one auto-**`#enhance`** per key (**TTY menu** not ported; first advanceable skill in **fighting → weapons → spells** order). **`js/moveloop_preamble.js`:** **`takePendingGiveMayAdvancePline`**. **`js/skill_display_name.js`:** **`pSkillDisplayName`** (**`P_NAME`** subset for **You are now … skilled in …**). *(Wizard **speedy** **`#e`** loop + **`canAdvance(..., speedy)`** in row above; **`enhanceWeaponSkillOneStep`** return value is now **`{ ok, plines }`**.)* **Likely next step:** full **`extcmdlist`** / spell-out **`#enhance`**, wire **`useSkill`** / **`drainWeaponSkill`** from gameplay, **object-accurate** skill display names. |
| **2026-05-16 (`lose_weapon_skill` + XL drain)** | **`js/u_init_skills.js`:** **`loseWeaponSkill(u, n)`** from **`weapon.c`** **`lose_weapon_skill`** ( **`weapon_slots`** first, else pop **`skill_record`** / decrement **`P_SKILL`**, **`P_ADVANCE`** / **`weapon_slots`** refund). **`js/u_init_adjabil.js`:** **`applyAdjabil`** when **`oldlevel > 0`** and **`newlevel < oldlevel`**, **`loseWeaponSkill(oldlevel - newlevel)`** ( **`attrib.c`** **`adjabil`** ). **Likely next step:** real **`g.invent`**; wizard **speedy** / full **`#enhance`** (see row above). |
| **2026-05-16 (`doname` + `objectDiscovery` spellbooks)** | **`js/spellbook_discovery_lines.js`:** **`SPELLBOOK_OTYP_TO_SN`**, **`isSpellbookOtyp`**, **`spellbookAppearanceNounPhrase`**. **`js/objnam.js`:** **`doname(otmp, g)`** — NH5 **`NH5_SPBOOK_CLASS`** or known spellbook **`otyp`**; if **`g.objectDiscovery`** has **`otyp`**, **`a spellbook of …`** / plural **`spellbooks of …`**; else generic **`a spellbook`**. **`pickup.js`** unchanged (uses default **`game`**). **Likely next step:** real **`g.invent`** / **`ini_inv`/`mkobj`**; full **`doname`** / **`dknown`**; wire **`useSkill`** from combat. |
| **2026-05-16 (`#discoveries` + `objectDiscovery`)** | **`js/spellbook_discovery_lines.js`:** **`spellbookDiscoveryLinesFromObjectDiscovery`**, **`mergeSpellbookObjectDiscoveryIntoGroups`** — NH5 **`otyp`** → **`SPE_*`** → **`spellbook of …`** lines; dedupe against existing **Spellbooks** rows. **`overlay_screens.js`:** **`paintDiscoveriesIntoDisplay`** merges before paint. **`skill_based_spellbook.js`:** import **`P_UNSKILLED`** (was referenced in **`switch`**). *(**`doname`** wiring in row above.)* |
| **2026-05-16 (`skill_based_spellbook_id`)** | **`js/spellbook_skill_level_data.js`:** generated **`SPELLBOOK_SKILL_LEVEL_ROWS`** (`otyp`, spell **school**, **`oc_level`**) from upstream **`objects.h`** `SPELL()` (skips **`#if 0`** deferred books). **`js/skill_based_spellbook.js`:** **`applySkillBasedSpellbookId(g)`** from **`spell.c`** — **Wizard** only; **`P_SKILL`** → **`known_up_to_level`** thresholds; **`oc_level ≤`** threshold ⇒ **`g.objectDiscovery`** **`Set`**. **`u_init_skills.js`:** called at end of **`applySkillInit`** after **`unrestrict_weapon_skill`**, matching C **`skill_init`** (pauper gate not modeled). *(**`#discoveries`** merge in row above.)* |
| **2026-05-16 (`skill_init` invent `weapon_type`)** | **`js/weapon_kind.js`:** **`weaponType`**, **`isAmmo`** from **`weapon.c`** / **`obj.h`**. **`js/obj_oc_skill_data.js`:** **`otyp` → `oc_skill` / NH5 `oclass`** map (generated from upstream **`objects.h`** + **`objclass.h`** `objects_nums`; **`mklev.js`** still uses legacy class indices — use **`nh5_objclass.js`** for invent). **`js/nh5_objclass.js`:** **`NH5_*_CLASS`** enum mirrors. **`u_init_skills.js`:** **`applySkillInit`** walks **`g.invent`** after reset, **before** spell-school **`Basic`**, skipping **`isAmmo`**, setting **`P_BASIC`** per **`weapon_type`** (C **`skill_init`** order). **`allmain.js`** comment updated. Removed stray **`tmp_*.c`**. **Likely next step:** real **`g.invent`** / **`ini_inv`** with NH5 **`oclass`/`otyp`**; **`#enhance`** menu / **`extcmdlist`**. |
| **2026-05-16 (`skill_init` + `add_weapon_skill`)** | **`js/u_init_skill_defs.js`:** all **13** role **`def_skill`** tables from **`u_init.c`** `Skill_*` + **`ROLE_SPESPEC_SCHOOL`** ( **`role.c`** spelspec → spell school per **`objects.h`** `SPELL`). **`js/u_init_skills.js`:** **`practiceNeededToAdvance`**, **`slotsRequired`**, **`canAdvance`**, **`unrestrictWeaponSkill`**, **`addWeaponSkill`** (**`weapon.c`**), **`applySkillInit()`** (**`skill_init`**) — Hea/Mon/Pri/Wiz starting spell schools, Knight **riding** ( **`abbr === 'Kni'`** pony stub), high **bare-handed** max → **Basic**. **`allmain.js`:** **`applySkillInit`** after **`applyHiddenGoldToUmoney0`**, before **`findAc`**. **`u_init_adjabil.js`:** **`addWeaponSkill`** on **XL gain** when **`oldlevel > 0`**. **`engrave.js`:** **`P_RIDING`** reads **`u.weapon_skills`**. *(Invent **`weapon_type`** + **`skill_based_spellbook_id`** in rows above.)* |
| **2026-05-16 (`hidden_gold` / `contained_gold`)** | **`js/u_init_hidden_gold.js`:** **`hiddenGold(g, evenIfUnknown)`** from **`vault.c`**; **`containedGold(obj, evenIfUnknown)`** from **`shk.c`** (walk **`cobj`** / **`nobj`**, **`GOLD_PIECE` / `oclass === '$'`**, nested sacks, **`cknown`** vs **`even_if_unknown`**). **`applyHiddenGoldToUmoney0()`** mirrors **`u_init.c`** `u.umoney0 += hidden_gold(TRUE)` — called in **`allmain.js`** immediately after **`initIniInvStub`**. **`game.invent`** is still usually **null** until real **`ini_inv`/`invent.c`**; then hidden sack gold will bump **`u.umoney0`** / **`_goldCount`** with **no extra RNG**. **Likely next step:** **`skill_init`** invent **`weapon_type`** loop, **`game.invent`** from **`ini_inv`**, **`skill_based_spellbook_id`**, or **`#enhance`**. |
| **2026-05-16 (`adjabil(0,1)` + `find_ac`)** | **`js/u_init_adjabil.js`:** **`applyAdjabil(0, 1)`** — XL **1** role/race intrinsics from **`attrib.c`** `role_abil` / **`orc_abil`** (Arc **Searching**; Bar/Hea **Poison_resistance**; Mon **Fast** / **Sleep_resistance** / **See_invisible**; Ran **Searching**; Rog **Stealth**; Sam **Fast**; Val **Cold_resistance**; orc race **Poison_resistance**; elf/dwarf/gnome infravision not modeled). **`js/u_init_find_ac.js`:** **`findAc()`** from **`do_wear.c`** — naked **`u.uac`** from **`permonst.ac`** ( **`mondata.js`** adds **`ac: 10`** on **`permonstHuman`** ); worn armor / rings / spellprot not ported. **`allmain.js`:** zero stub props, **`applyAdjabil`** before **`u.ulevel`**, **`findAc()`** after **`initIniInvStub`**. **Likely next step (superseded in part):** **`hidden_gold`** landed in **`u_init_hidden_gold.js`**; **`skill_init` / `add_weapon_skill`** in **`u_init_skills.js`**; still **`find_ac`** armor when **`uarm`** exists, **`skill_init`** invent **`weapon_type`** pass, **`#enhance`**. |
| **2026-05-16 (`u.umoney0` / `_goldCount`)** | **`js/u_init_money.js`:** **`applyRoleStartingUmoney0()`** from **`u_init.c`** `u_init_role` — **Healer** **`rn1(1000, 1001)`**, **Rogue** **0**, **Tourist** **`rnd(1000)`**, other roles **0**; sets **`u.umoney0`** and **`g._goldCount`**. **`allmain.js`:** runs it **after** **`fastforward_post_mklev()`**, **before** **`applyInitAttrPipeline`** (C order: money before **`init_attr`** inside **`u_init_inventory_attrs`**). **`fastforward.js`:** removed the leading replay **`rnd(1000)`** (now real code for Tou/Hea). **Caveat:** post-mklev replay is still **session-shaped**; non-tourist roles that did not start with that draw may **RNG-drift** until **`fastforward_post_mklev`** is split or replaced by full **`u_init_role`**. **Superseded next step:** **`adjabil` / `find_ac`** landed in the row below; **`hidden_gold`** in **`u_init_hidden_gold.js`**; remaining: **`add_weapon_skill`**, **`ini_inv`/`mkobj`**, real **`game.invent`**. |
| **2026-05-16 (role `initrecord` / `u.ualign.record`)** | **`roles.js`:** per-role **`initrecord`** from **`role.c`** / **`you.h`** `struct Role` (NH 5.0). **`chargen.js`:** copies onto **`g.urole`** and sets **`u.ualign.record`** at identity apply. **`u_init_hp_energy.js`:** **`applyBirthHpEnergy()`** mirrors **`attrib.c`** `newhp`: when **`moves === 0`** and **`ulevel === 0`**, **`u.ualign.record = gu.urole.initrecord`**. Default **Tourist** stays **0** (same as prior stub). **`allmain.js`:** dropped redundant **`ualign.record`** default after birth init. |
| **2026-05-16 (birth HP / energy)** | **`js/u_init_hp_energy.js`:** `newhpInitial()` / `newpwInitial()` from **`attrib.c`** `newhp` and **`exper.c`** `newpw` ( **`u.ulevel == 0`** branch: role **`hpadv` / `enadv`** + race, **`rnd`** on **`inrnd`** only). **`applyBirthHpEnergy()`** sets **`u.uhp` / `u.uhpmax` / `u.uhppeak`** and **`u.uen` / `u.uenmax` / `u.uenpeak`** like **`u_init.c`** `u_init_misc`. **`roles.js`:** per-role and per-race **`hpadv` / `enadv`** tables from **`role.c`**. **`chargen.js`:** copies them onto **`g.urole`** / **`g.urace`**. **`allmain.js`:** calls **`applyBirthHpEnergy()`** after **`applyInitAttrPipeline(75)`**; removes hardcoded HP/energy literals (Tourist human still **10** / **2** with zero **`inrnd`** rolls). **Likely next step:** port **`umoney0`** / starting gold, **`adjabil`** / **`u.ualign.record`**, or begin real **`ini_inv`** / **`mkobj`** and trim **`fastforward_post_mklev`** where C order allows. |
| **2026-05-16 (ini_inv stub: all roles)** | **`ini_inv_stub.js`:** static packs for **Healer**, **Knight**, **Monk**, **Priest** / **Priestess**, **Ranger**, **Rogue**, **Samurai**, **Caveman** / **Cavewoman** from **`u_init.c`** `trobj[]`, plus existing roles. **`initIniInvStub`** uses **`INI_INV_BY_ROLE_NAME`** and picks **`urole.name.f`** when **`flags.female`** so **Priestess** / **Cavewoman** match C titles. **Likely next step:** port **`ini_inv()`** / **`mkobj`** so items, **UNDEF_TYP** scrolls/books, **Barbarian** random pack, and bless/curse match PRNG; then shrink **`fastforward_post_mklev`**. |
| **2026-05-16 (ini_inv stub: Val / Bar / Arc)** | **`ini_inv_stub.js`:** static **`#inventory` / #discoveries** rows from **`u_init.c`** for **Valkyrie** (`Valkyrie[]`), **Barbarian** (`Barbarian_0[]` only — C picks 0 vs 1 at random), and **Archeologist** (`Archeologist[]`, with discovery lines for whip, armor, tools, touchstone). **`initIniInvStub`** selects by `g.urole.name`. **Likely next step:** extend the same pattern to remaining **`trobj[]`** roles (Healer, Knight, …) or begin **`ini_inv()`** / **`mkobj`** so inventory matches PRNG and bless/curse rolls. |
| **2026-05-16 (`init_attr` / `vary_init_attr`)** | **`js/u_init_attr.js`:** `initAttr(np)`, `varyInitAttr()` from **`attrib.c`** (`rnd_attr` / `init_attr_role_redist` / `init_attr` / `vary_init_attr`). **`roles.js`:** per-role **`attrbase`** / **`attrdist`** from **`role.c`**. **`chargen.js`:** copies those arrays onto **`g.urole`**. **`allmain.js`:** after **`fastforward_post_mklev()`**, **`applyInitAttrPipeline(75)`**; removed hardcoded **`u.acurr` / `u.amax`**. **`fastforward_post_mklev`:** dropped the old fixed **`rn2(100)`…`rn2(20)`** replay tail (the **35-call** block was session-shaped; real C uses a **variable** draw count per seed). Kept the three draws before that block (**`rn2(20); rn2(1); rnd(2);`**) still in fastforward so pre-attr RNG matches the prior harness. **`attrib.js`:** exports **`getRaceAttrMin` / `getRaceAttrMax`** for **`ATTRMIN` / `ATTRMAX`**. **Likely next step:** port more of **`u_init_inventory_attrs`** / **`ini_inv`** (real **`mkobj`** / invent) and shrink **`fastforward_post_mklev`** further; align **`moveloop_preamble`** / **`monmove`** harnesses once startup stream is fully C-driven. |
| **2026-05-16 (attrib + u fields + wizard invent stub)** | **`attrib.c` `adjattrib`:** positive/negative deltas, race **ATTRMIN/ATTRMAX** from `role.c` (`roles.js` `races[].attrmin` / `attrmax`, `STR18` caps). **`chargen.js`:** `u.ualignbase[A_CURRENT]` / `[A_ORIGINAL]` like `u_init.c`. **`allmain.js`:** `u.ulevel` / `u.ulevelmax` = 1. **`ini_inv_stub.js`:** second role pack for **Wizard** (#inventory / discoveries overlay). **Likely next step:** port **`init_attr(75)`** + **`vary_init_attr()`** from `attrib.c` in correct order after **`ini_inv`** (inside `u_init_inventory_attrs` sequence), then delete the matching slice from **`fastforward_post_mklev`** session replay. |
| **2026-05-16 (chargen constraints)** | **`role.c` selfmasks in JS:** each role in `roles.js` carries `allows` (legal alignments as `u.ualign.type`, race names, gender). `coerceChargenIdentity()` clamps invalid `OPTIONS` (e.g. Valkyrie + male → female, wrong race → first legal race, wrong align → first legal). Wired from `chargen.js` after parsing rc. **Likely next step:** port **`u_init_inventory_attrs`** / `init_attr` / `ini_inv` RNG and state so `fastforward_post_mklev` can shrink without drift; extend **`ini_inv_stub`** per role for UI until real invent exists. |
| **2026-05-16 (follow-up)** | **Chargen from `nethackrc`:** new `js/chargen.js` (`applyIdentityFromNethackrc`) wires `OPTIONS=role`, `race`, `gender`, `align` into `g.urole`, `g.urace`, `g.u.ualign`, `g.flags.female`, and `youmonst.data` (still `permonstHuman` for all races until PM tables port). `js/roles.js` now carries **role abbreviations** and **XL1 rank titles** from upstream `role.c`. `allmain.js` no longer overwrites identity; welcome `pline` uses align + `urace.adj` + female role name. **Defaults** (no OPTIONS) stay aligned with the former stub: Tourist / human / female / neutral. **Likely next step:** derive **numeric hero stats**, gold, and `ini_inv` from real `u_init.c` + PRNG (shrink `fastforward_post_mklev` and the hardcoded block in `newgame`), or extend **`ini_inv_stub`** / role packs when sessions hit non-Tourist roles. |

---

## 1. Executive summary

The fork has evolved from a **minimal harness** (RNG replay, skeletal `newgame` / `mklev`, movement-only `cmd`) into a **substantial partial port** of early-game subsystems: **dungeon layout**, **vision / glyph display**, **search / trap discovery**, **engravings and rumors**, **hero trap effects** (`dotrap` / `trapeffect` subsets), **pickup / look-here messaging**, **moveloop preamble** pieces aligned with `allmain.c`, **starting HP and spell energy** from `role.c` `hpadv`/`enadv` (`u_init_hp_energy.js`), **alignment record** from `role.c` **`initrecord`**, **starting gold** for Healer / Rogue / Tourist from **`u_init.c`** (`u_init_money.js`), **gold inside carried containers** counted like **`vault.c`** / **`shk.c`** when **`game.invent`** exists (`u_init_hidden_gold.js`), **weapon/spell skill caps and practice counters** from **`u_init.c`** / **`weapon.c`** (`u_init_skill_defs.js`, `u_init_skills.js`, **`weapon_kind.js`**, **`obj_oc_skill_data.js`** for NH5 **`otyp`** / **`oclass`**), **`skill_init`** invent **`weapon_type`** pass when **`g.invent`** is linked, **`skill_advance`** / **`#enhance`** via **`#e`** in **`extcmd.js`** (wizard **`[yn]`** speedy loop or one auto-pick; **`{ ok, plines }`**); **`give_may_advance_msg`** queued from **`addWeaponSkill`** / **`useSkill`** and flushed in **`moveloop_preamble.js`**; **`use_skill`** / **`drain_weapon_skill`** as **`useSkill`** / **`drainWeaponSkill`** ( **`P_ADVANCE`** practice and energy-drain **`skill_record`** pops; **You forget …** plines queued then flushed in **`moveloop_preamble`** — **call sites** still TODO), **`attrib.c` `exercise()`** (**`u.aexe`**, **`rn2`**), **`attrib.c` `exerper` / `exerchk`** as **`exerper()`** + **`collectExerchkPlines()`** (**`next_attrib_check`**, **`rn1(200,800)`**, **`u.uhunger`** **900** for periodic **`exercise`** — **`moveloop_aux`** harness **`rn2(19)`/`rn2(31)`** still replay; **C tail order** not fully matched), **Wizard** spellbook **`discover_object`** parity via **`spell.c`** **`skill_based_spellbook_id`** (`skill_based_spellbook.js` + **`g.objectDiscovery`**, **`#discoveries`** + **`doname`** / **`look_here`** via **`spellbook_discovery_lines.js`** / **`overlay_screens.js`** / **`objnam.js`**), **XL1 intrinsics** from **`attrib.c`** `adjabil(0,1)` (`u_init_adjabil.js`) plus **`add_weapon_skill`** on later **XL** gains and **`lose_weapon_skill`** on **XL** loss when **`oldlevel > 0`**, **naked AC** from **`find_ac`** (`u_init_find_ac.js`), and **UI overlays** (#attributes, discoveries, **`ini_inv_stub.js`** covering **all thirteen roles** from `u_init.c` `trobj[]` for `#inventory` / #discoveries until real `ini_inv` / `mkobj`).

The implementation is still **nowhere near full-game parity**. Two large **technical debts** dominate the path to judge parity:

1. **`js/fastforward.js`** — replays hundreds of leaf PRNG draws from a reference extraction so the ISAAC stream stays aligned while `o_init`, dungeon graph setup, post-`mklev` init, and related paths are incomplete. **`fastforward_post_mklev`** is smaller now that **`init_attr` / `vary_init_attr`** run as real code (`u_init_attr.js`), but most of the block is still replay.
2. **Per-turn harnesses** — `js/monmove.js` replays fixed `rn2` sequences for steps 1–12; `js/moveloop_aux.js` replays end-of-turn draws (`maybe_generate_rnd_mon`, `dosounds`, `gethungry`, `rn2(82)`, conditional exercise hooks) instead of real `allmain.c` / `monmove.c` / `eat.c` / `sounds.c` logic.

**`otyp` / `oclass` caveat:** `mklev.js` uses legacy numeric **`WEAPON_CLASS`** / floor **`otyp`** values that do **not** match NetHack 5.0 **`enum objects_nums` / `objclass_classes`** (see **`js/nh5_objclass.js`** + **`obj_oc_skill_data.js`**). New **`weaponType` / `isAmmo`** follow C for NH5 indices; **`g.invent`** must use the same scheme when it is wired from **`ini_inv` / `mkobj`**.

**Git:** `main` is **ahead of `origin/main`** (count with `git rev-list --count origin/main..HEAD` at read time; not pushed at report edit time). Earlier history is overwhelmingly `feat(js):` / `fix(js):` / `refactor(js):` / `docs(plans):` work: moveloop wiring, search/detect, trap progression, engraving stack, inventory overlays, and satellite planning under `.cursor/plans/nethack-port/`. Nothing in this report substitutes reading the diff.

---

## 2. Scale: C surface vs JS modules

| Layer | C (upstream `src/`) | JS (`js/`) |
|--------|---------------------|------------|
| **Volume** | ~130 compilation units, many **10k–200k** LOC (e.g. `cmd.c`, `do.c`, `artifact.c`, `display.c`) | **~15.5k lines** across contestant modules (excluding generated-size `rumor_data.js` / `epitaph_lines.js` data blobs) |
| **Contest frozen** | N/A | `isaac64.js`, `terminal.js`, `storage.js` — **do not modify** |
| **Global state** | `decl.c`, `you.h`, `rm.h`, … | `gstate.js` exports a mutable `game` bag; `game.js` defines `GameMap` / `makeLocation` |

**Conclusion:** Less than **~5%** of upstream C by line count is mirrored in JS, and even that percentage overstates **behavioral** coverage because large JS files are **constants** (`const.js` ~2.9k lines) and **mklev** (partial algorithm, not full branch/special-level stack).

---

## 3. What is ported (concrete, with C anchors)

The following areas have **real logic** traced to specific C files (comments in code cross-reference upstream). Quality ranges from “faithful subset” to “shape only.”

### 3.1 Harness and contest API

| Concern | C / docs | JS |
|---------|----------|-----|
| Segment runner, RNG logging, screen capture | `unixmain.c` / harness contract | `jsmain.js` — `runSegment`, `NethackGame`, `captureJudgeSnapshot`, `animationFrame` |
| ISAAC64, terminal serialize | Recorder | `isaac64.js`, `terminal.js` (frozen) |
| RNG wrappers, clang-order sensitivity | `rnd.c` / README | `rng.js` |

### 3.2 Options and fixed clock

| Concern | C | JS |
|---------|---|-----|
| `nethackrc` parsing subset | `cfgfiles.c`, `options` | `options.js` (partial); `iflags` / `perm_invent` mapping noted in recent commits |
| Role / race / gender / align from OPTIONS | `u_init.c`, `role.c` | `chargen.js` + `roles.js` (abbrev, XL1 ranks, **`allows`** + `coerceChargenIdentity`, race **attrmin/max**, **`hpadv` / `enadv`**, **`initrecord`** → **`u.ualign.record`**, **`u.ualignbase`**); called from `jsmain.js` `start()` |
| Fixed datetime, moon, Friday 13th | `calendar.c`, flags | `moonphase.js`, `moveloop_preamble.js`, `attrib.js` (`changeLuck`) |

### 3.3 Startup and main loop shell

| Concern | C | JS |
|---------|---|-----|
| `newgame`, `moveloop_core`, `moveloop` | `allmain.c` | `allmain.js` — calls real `mklev`, then **fastforward** fills, **`applyRoleStartingUmoney0()`**, **`applyInitAttrPipeline(75)`**, **`applyBirthHpEnergy()`**; stub **`u`** fields (**`u.uhunger`** **900**); **`applyAdjabil(0,1)`** then **`u.ulevel`**; **`initIniInvStub`**, **`applyHiddenGoldToUmoney0()`**, **`applySkillInit()`** ( **`skill_init`** ), **`findAc()`**, **`g.context.next_attrib_check`** default **600**, vision init, welcome `pline`; **`moveloop_core`** after time-consuming **`moves++`**, **`collectExerchkPlines()`** → **`pline`** |
| `moveloop_preamble` | `allmain.c` | `moveloop_preamble.js` — moon/friday messages, `rndencode`, `seer_turn`, `initrack`, `set_wear` / `reset_justpicked`, `pickup(1)`, encumber message hook, queued **`weapon.c`** plines (**`give_may_advance_msg`**, **`drain_weapon_skill`** forget), `see_monsters` deferral, `update_inventory`, `read_engr_at` on resume, `fix_shop_damage` noop |

### 3.4 Dungeon generation (structural)

| Concern | C | JS |
|---------|---|-----|
| Rooms, corridors, doors, stairs, niches, fill, many terrains | `mklev.c`, parts of `sp_lev.c`, `mkmap.c` | `mklev.js` (~1.9k lines) — **largest ported subsystem**; uses game PRNG; places traps, engravings, graves, floor objects in places |
| Rect helpers | Various | `rect.js`, `hacklib.js` (`distmin`, depth) |

**Caveats in `mklev.js`:** comments mark **oinit**, **level_difficulty**, **maketrap** (in some paths), **dealloc_obj**, **containers**, **corpsenm**, **in_rooms** as stubs or simplified.

### 3.5 Map, vision, display

| Concern | C | JS |
|---------|---|-----|
| `struct rm`, level container | `rm.h`, `decl.h` | `game.js` — `GameMap`, `floorObjHeads`, `engravings`, `traps` |
| Vision / newsym / glyphs | `vision.c`, `display.c` | `vision.js`, `display.js` — partial; trap glyphs on map; `feel_location` minimal path |
| Status / bot | `botl.c` | `display.js` / `game_display.js` — **partial**; TODO for full status line |
| Overlays (#attributes, discoveries, per-role invent stub) | `cmd.c`, invent windows | `overlay_screens.js` (**`#discoveries`** merges **`g.objectDiscovery`** spellbooks via **`spellbook_discovery_lines.js`**), `invent.js`, enlightenment modules; `ini_inv_stub.js` — **all 13 roles** static rows from `u_init.c` `trobj[]` (Barbarian **Barbarian_0** only; Monk/Priest **UNDEF** items labeled as random stubs) |

### 3.6 Commands (narrow)

| Concern | C | JS |
|---------|---|-----|
| `rhack`, movement, `domove` | `cmd.c`, `hack.c` | `cmd.js` — **hjklyubn**, `s` search, `:` pickup/look, ESC overlay dismiss, Ctrl-X #attributes flow |
| `#` extended commands | `cmd.c` `doextcmd` | `extcmd.js` — **#v** version; **#e**/**#E** **`#enhance`** (**`enhanceWeaponSkillOneStep`** — wizard **`OPTIONS=wizard`** → speedy **`[yn]`** multi-step or one normal step; menu / spell-out not ported); other **`#`** keys unknown |
| Hash-prefixed extcmds from replay | `extcmdlist` | `extcmd.js` + `cmd.js` wiring |

### 3.7 Search and traps (hero-centric)

| Concern | C | JS |
|---------|---|-----|
| `dosearch` / `dosearch0`, `rnl`, `mfind0` subset | `detect.c` | `search.js` — growing; luck/fund bonuses stubbed; telepathy / warning stubbed |
| Trap placement constants | `trap.h` | `const.js` — aligned with upstream trap types (recent fix commits) |
| `dotrap`, `trapeffect_*`, `domagictrap` subset, `thitu` for missiles | `trap.c`, `mthrowu.c` | `trap.js`, `mthrowu.js` — **large** but many branches still TODO (steed, ball&chain, full `tele`, polyself, statue animate, destroy_items, etc.) |
| `seetrap`, `feeltrap`, `nomul` on trap | `trap.c`, `hack.c` | Wired through movement path (recent commits) |

### 3.8 Engravings, rumors, floor objects

| Concern | C | JS |
|---------|---|-----|
| `engr_at`, `make_engr_at`, `read_engr_at`, wipe/smudge, headstones, graffiti | `engrave.c`, `rumors.c` | `engrave.js`, `engrave_lines.js`, `epitaph_lines.js`, `rumor_data.js`, `pickup.js` / `moveloop_preamble.js` hooks |
| `getrumor`, `random_engraving` | `rumors.c` | Ported paths per commit messages |
| Floor stacks `level.objects` | `mkobj.c` | `floorobj.js`, `mklev.js` / `game.js` — **mkgold**-style placement; not full `mkobj` |

### 3.9 Monsters, combat, items (minimal)

| Concern | C | JS |
|---------|---|-----|
| Permonst bits for locomotion / stagger | `mondata.h`, `mondata.c` | `mondata.js` — **subset**; `youmonst.data` / `urace.permonst` still **human-shaped stub** for every race until PM indices port |
| `makemon` for domagictrap etc. | `makemon.c` | `makemon.js` — **explicit stub** (weighted `rndmonst` not ported) |
| Stagger / encumbrance messaging | `mondata.c`, `hack.c` | `mondata.js`, `encumbr.js` — `near_capacity` reads stub `u` fields |
| `doname` subset (gold; NH5 spellbook + **`g.objectDiscovery`** for **`look_here`**) | `objnam.c` | `objnam.js` + **`spellbook_discovery_lines.js`**, **`nh5_objclass.js`** |

### 3.10 Auxiliary

| Concern | C | JS |
|---------|---|-----|
| `nomul`, travel stop on engraving | `hack.c`, `engrave.c` | `timeout.js` (subset) + travel/read integration per commits |
| Track | `track.c` | `track.js` |
| Shop damage | `shk.c` | `shop.js` — empty `fix_shop_damage` |
| `adjattrib` / **`exercise`** / **`exerper`** / **`exerchk`** (`AEXE` / **AVAL** 50; no Int/Cha; poly gate; **`encumber_msg`** on Str/Con not wired; **`next_attrib_check`** / **`rn1(200,800)`**; **`u.uhunger`** for **`exerper`**; **`collectExerchkPlines`** after **`moves++`** in **`allmain.js`** — **`moveloop_aux`** harness **`rn2(19)`/`rn2(31)`** still replay) | `attrib.c` | `attrib.js` — **`adjattrib`** clears **`u.aexe[attr]`** on change; **`exercise`**, **`exerper`**, **`collectExerchkPlines`**; `u_init_attr.js` inits **`u.aexe[]`**; **`engrave.js`**, **`search.js`**, **`trap.js`** call **`exercise`**; **`allmain.js`**, **`jsmain.js`** **`context.next_attrib_check`** |
| `adjabil` (birth `0→1`, role/race XL1 intrinsics subset; **`add_weapon_skill`** / **`lose_weapon_skill`** when **`oldlevel>0`** and level up / down) | `attrib.c` | `u_init_adjabil.js` |
| `skill_init` / `add_weapon_skill` / **`lose_weapon_skill`** / **`use_skill`** / **`drain_weapon_skill`** / **`skill_advance`** / **`#enhance`** ( **`#e`** auto-pick + wizard **`canAdvance(..., TRUE)`** speedy **`[yn]`**; **`give_may_advance_msg`**); **`skill_init`** walks **`g.invent`** with **`weapon_type`** / **`isAmmo`** when a linked list exists; **`skill_based_spellbook_id`** (Wiz → **`g.objectDiscovery`**; **`#discoveries`** + **`doname`** via **`spellbook_discovery_lines.js`**) | `weapon.c`, `spell.c`, `u_init.c` | `u_init_skills.js`, **`skill_display_name.js`**, `u_init_skill_defs.js`, **`weapon_kind.js`**, **`obj_oc_skill_data.js`**, **`nh5_objclass.js`**, **`skill_based_spellbook.js`**, **`spellbook_skill_level_data.js`**, **`spellbook_discovery_lines.js`**, **`overlay_screens.js`**, **`objnam.js`**, **`extcmd.js`**, **`moveloop_preamble.js`**, **`rng.js`** (`rn2` in drain) — **`u.weapon_skills[]`**, **`weapon_slots`**, **`skill_record`** |
| `find_ac` (naked hero; worn gear stub) | `do_wear.c` | `u_init_find_ac.js` — **`findAc()`**; **`mondata.js`** **`permonstHuman.ac`** |
| `hidden_gold` / `contained_gold` | `vault.c`, `shk.c` | `u_init_hidden_gold.js` — **`hiddenGold`**, **`containedGold`**, **`applyHiddenGoldToUmoney0`** ( **`game.invent`** / **`cobj`** chain; no RNG) |
| Version string | — | `nethack_version.js`, `version.js` |

---

## 4. What is deliberately *not* ported yet (major C areas)

These upstream files (representative) have **no dedicated JS module** or only **distant stubs**:

- **Combat pipeline:** `uhitm.c`, `mhitu.c`, `mhitm.c`, `weapon.c` ( full **TTY `#enhance`** menu / **`extcmdlist`** spell-out; **`use_skill`** / **`drain_weapon_skill`** in **`u_init_skills.js`** — **wizard speedy** **`#e`** wired; **call sites** for practice / amnesia still TODO ); **`lose_weapon_skill`** on XL loss is mirrored via **`adjabil`** in **`u_init_adjabil.js`** / **`u_init_skills.js`**; `u_init.c` (real **inventory** — partial **gold** + **`hidden_gold`** when **`invent`** exists, **`skill_init`** + invent **`weapon_type`** + **`skill_based_spellbook_id`** when wired, **`adjabil`** XL1 + **`add_weapon_skill`** on level-up, **`find_ac`** naked only), `dokick.c`, `throw.c`, `zap.c`, …
- **Full object model:** `mkobj.c`, `obj.c`, `invent.c` (beyond look/pickup stubs), `dothrow.c`, `pickup.c` (full), `shk.c` shops, `lock.c`, …
- **Monsters:** `mon.c`, `monmove.c` (real), `muse.c`, `mfndpos.c`, corpse handling, …
- **Full command set:** bulk of `cmd.c`, `do.c`, `apply.c`, `pray.c`, …
- **Special levels / Lua:** `sp_lev.c`, Lua level scripts, branch graph beyond a **Mines stub** branch entry in `allmain.js`
- **Save / bones / record:** `save.c`, `bones.c`, `topten.c` — `storage.js` exists but game serialization is not described as complete in code
- **Endgame / quest / Vlad / …** — not started in any meaningful way

---

## 5. Technical debt and refinement priorities

### 5.1 `fastforward.js` (highest risk for false progress)

- **Purpose:** keep PRNG index aligned for a **specific** early initialization trace while `o_init`, full dungeon initialization, mineralize/fill RNG, and post-`mklev` player init are incomplete.
- **Contest integrity:** contest rules forbid tuning to **memorize** the 44 public sessions; using a **static** extracted trace for *startup* is an acknowledged bridge, but it **must shrink** as real `o_init.c`, `dungeon.c`, `u_init.c`, `mklev.c` post-structural phases land.
- **Refinement:** each deleted block should be replaced by **the same call graph and order** as C, verified with `score.sh` / session runners — expect **temporary** RNG drift until the next gap is closed.
- **Note:** the first post-mklev **`rnd(1000)`** replay for tourist starting gold was removed in favor of **`u_init_money.js`**; the rest of the block is still a **single-trace** bridge.

### 5.2 `monmove.js` + `moveloop_aux.js`

- **Current:** `MOVE_MON_HARNESS_MAX_STEP = 12` with fixed lambdas; `end_of_turn_rng` uses **session-shaped** step conditionals (`stepNum === 9`, etc.) for exercise extras.
- **Refinement:** replace with `movemon` from `monmove.c` + ordered tail from `allmain.c`; remove harness rows **incrementally** with regression checks (see `.cursor/plans/nethack-port/10-moveloop-detect-c-map.md`).

### 5.3 `allmain.js` hardcoded hero (partially relieved)

- **Done:** `OPTIONS=role,race,gender,align` → `g.urole` / `g.urace` (incl. **ATTRMIN/ATTRMAX** tables, **`hpadv` / `enadv`**, **`initrecord`**) / `g.flags.female` / `g.u.ualign` / **`g.u.ualignbase`** via `chargen.js`; `roles.js` carries upstream **abbrev** + **XL1 rank** strings + **`attrbase` / `attrdist`**. **`allmain.js`** runs **`applyInitAttrPipeline(75)`** (`attrib.c` **`init_attr`** + **`vary_init_attr`**) so **`u.acurr` / `u.amax`** are no longer hardcoded literals; **`applyRoleStartingUmoney0()`** (`u_init_money.js`) sets **`u.umoney0`** / **`_goldCount`**; **`applyBirthHpEnergy()`** (`u_init_hp_energy.js`) sets HP/Pw and **`u.ualign.record`** from **`initrecord`** when **`moves === 0`**; **`applyAdjabil(0, 1)`** (`u_init_adjabil.js`) grants **XL1** role/race intrinsics per **`attrib.c`**; **`applyAdjabil`** also calls **`addWeaponSkill`** when **`oldlevel > 0`** and **`newlevel > oldlevel`**, and **`loseWeaponSkill`** when **`newlevel < oldlevel`**; **`applyHiddenGoldToUmoney0()`** (`u_init_hidden_gold.js`) adds **`vault.c`**/**`shk.c`** container gold to **`u.umoney0`** when **`game.invent`** has **`cobj`** chains; **`applySkillInit()`** (`u_init_skills.js` + `u_init_skill_defs.js` + **`weapon_kind.js`** + **`skill_based_spellbook.js`**) mirrors **`weapon.c`** / **`spell.c`** **`skill_init`** (invent **`weapon_type`** pass when **`g.invent`** exists; Wizard **`skill_based_spellbook_id`** → **`g.objectDiscovery`**, shown under **`#discoveries`** and **`doname`** / **`look_here`** via **`spellbook_discovery_lines.js`** / **`overlay_screens.js`** / **`objnam.js`**; **`def_skill`** tables; **`obj_oc_skill_data.js`** + **`nh5_objclass.js`** for NH5 **`otyp`/`oclass`**); **`findAc()`** (`u_init_find_ac.js`) sets **`u.uac`** from **`permonst.ac`** after **`initIniInvStub`**.
- **Still hardcoded:** `left_handed`, **`find_ac`** bonuses from worn armor / rings / spellprot, **`drain_weapon_skill`** / **`use_skill`** **call sites** (handlers exist in **`u_init_skills.js`**), full **`#enhance`** TTY menu ( **`#e`** is auto-pick; wizard **speedy** multi-step without C **`y_n`** exact UI), **`handle_tip(TIP_ENHANCE)`**, and other **gameplay** numbers; **`fastforward_post_mklev`** may **drift** …
- **Non-Tourist roles:** `ini_inv_stub.js` lists **all** `u_init.c` **`trobj[]`** role packs for overlays; gameplay still has no real **`invent`** / **`mkobj`** (so **`hidden_gold`** is usually **0** at birth until **`game.invent`** is wired).

### 5.4 `ini_inv_stub.js` + `o_init.js`

- Starting inventory and discoveries are **stubbed** for **all thirteen roles** (`trobj[]` shapes from `u_init.c`); **not** real `ini_inv()` / `invent.c` / PRNG. Female heroes use **`name.f`** as the lookup key (**Priestess**, **Cavewoman**, …).

### 5.5 Traps and search “partial” correctness

- Many **stubs** inside `trap.js`: `steedintrap`, resist properties, full `tele()`, level teleport, polyself, magic portal domination, statue animation (`search.js` / `trap.js` cross-stubs), destroy_items on fire trap, etc.
- **Refinement:** each TODO is a future **RNG + screen** divergence once sessions exercise that branch.

### 5.6 Display and pline ordering

- Satellite plan `10-moveloop-detect-c-map.md` documents a **subtle** issue: clearing `_pending_message` at end of `moveloop_core` vs last captured frame — “naive” fixes can regress `seed8000`. Refinements must preserve **input-boundary** screen contract from `docs/API.md`.

### 5.7 `const.js` / `game_display.js`

- Large macro port in `const.js`; some helpers return `false` with TODO (e.g. `Is_juiblex_level`).
- Full **botl** / cursor / SGR parity is still open (`07-display-terminal.md` checklist).

---

## 6. Unpushed commit trajectory (summary)

**100 commits** on `main` not on `origin/main`, roughly from **docs/rules/plan scaffolding** through:

- Harness fixes (terminal, replay, datetime sync)
- **#search** aligned with `detect.c`; `rnl`; `mfind0` / `feel_location` minimal
- **movemon** harness extension; split **moveloop_aux**; **blocked moves** no longer consume turns
- **Post-replay judge snapshot** for screen parity
- **Inventory / overlay** screens (tourist stub, discoveries, #attributes)
- **Enlightenment** data (patrons, wield, encumbrance, hunger, XP, playtime)
- **#version** extended command
- **moveloop_preamble** expansion (moon, luck, `rndencode`, `seer_turn`, `initrack`, wear/pickup hooks, `update_inventory`, `near_capacity` / `urace` wiring)
- **Engraving** pipeline end-to-end for many paths (smudge on walk, wipe, rumors, headstones, Elbereth rules, `nomul` / read at travel)
- **Pickup** moveloop early exits, `can_reach_floor`, `look_here`, `dfeature_at` / `describe_decor`
- **Floor objects** (`mkgold`-style), **track.c** port
- **Traps:** `dotrap` after moves; arrow/dart via `thitu`; rock; fire/bear; pit/mine/hole/boulder/level-tele; tele trap; web/poly/anti-magic/statue/portal/vibrating; `domagictrap` + **makemon stub**; trap type constant alignment

**Interpretation:** the branch is **actively converging** on an early fixed-seed tourist path (documented as `seed8000` in plans) while **widening** surface area (traps, engravings). It is **not** a sign that the whole game is near completion — it is **depth-first on early moveloop + D:1 features**.

---

## 7. Recommended “rest to do” (ordered for contest parity)

Aligned with `.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md` and satellites under `.cursor/plans/nethack-port/`:

1. **Kill `fastforward.js`** — port `o_init`, dungeon init graph, post-`mklev` mineralize/fill, `u_init`, `ini_inv` in **C order**; delete matching replay lines.
2. **~~Real chargen~~ → extend chargen / `u_init`** — identity from `nethackrc` is wired; **starting HP/energy**, **attributes**, **alignment record**, **role starting gold**, **`adjabil(0,1)`** (XL1 subset) + **`add_weapon_skill`** on **XL** gain / **`lose_weapon_skill`** on **XL** loss when **`oldlevel > 0`** ( **`attrib.c`** / **`weapon.c`** ), **`hidden_gold`/`contained_gold`**, **`skill_init`** (**`def_skill`** tables + **`g.invent`** **`weapon_type`** loop when invent is linked; **`skill_based_spellbook_id`** for Wizards → **`g.objectDiscovery`**, merged into **`#discoveries`** via **`spellbook_discovery_lines.js`**; **`weapon_kind.js`** / **`obj_oc_skill_data.js`** use NH5 **`otyp`/`oclass`** — differs from **`mklev.js`** legacy constants), and naked **`find_ac`** follow C in spirit; **C order gap:** real **`ini_inv`** should run **before** **`init_attr`** like upstream; **`allmain.js`** still runs attr before the invent stub. **Next:** **`game.invent`** + **`ini_inv`/`mkobj`** (NH5 **`oclass`/`otyp`** so **`skill_init`** and **`hidden_gold`** match C); full **`doname`** / **`dknown`** beyond spellbooks; **`#enhance`** / **`skill_record`**; **`drain_weapon_skill`**; full **`find_ac`** with worn objects, trimming **`fastforward_post_mklev`** per role where needed.
3. **Real `movemon` + end-of-turn tail** — delete `monmove.js` / `moveloop_aux.js` harnesses.
4. **Full `cmd.c` surface** — every key in session corpus; menus, `--More--`, `do` functions.
5. **Objects and inventory** — `mkobj`, invent stack, pickup/drop, containers, shops (`shk.c`).
6. **Combat and monsters** — `mhitu`, death, corpses, pets (`dog.c`), full trap interactions with monsters.
7. **Branches and special levels** — Lua RNG channel, `sp_lev`, mines/soko/quest/…
8. **Save / bones / multi-segment** — honor `input.storage` per `docs/API.md`.
9. **Display parity** — `botl`, pline vs map message line, symset, full cursor policy.
10. **Continuous QA** — run full public session set; track first divergence per session (`09-qa-sessions.md`).

---

## 8. Appendix: `js/` module sizes (lines)

Approximate **physical LOC** (2026-05-16 `wc -l`):

| Lines | File |
|------:|------|
| 2926 | `const.js` |
| 1859 | `mklev.js` |
| 1129 | `trap.js` |
| 800 | `rumor_data.js` |
| 713 | `terminal.js` (frozen) |
| 558 | `vision.js` |
| 545 | `engrave.js` |
| 420 | `display.js` |
| 402 | `epitaph_lines.js` |
| 332 | `search.js` |
| 582 | `ini_inv_stub.js` |
| 319 | `fastforward.js` |
| 251 | `pickup.js` |
| 245 | `jsmain.js` |
| 190 | `allmain.js` |
| 202 | `roles.js` |
| 202 | `u_init_skill_defs.js` |
| 163 | `u_init_skills.js` |
| 101 | `u_init_attr.js` |
| 58 | `u_init_hp_energy.js` |
| 24 | `u_init_money.js` |
| 65 | `u_init_hidden_gold.js` |
| 56 | `u_init_adjabil.js` |
| 17 | `u_init_find_ac.js` |
| 95 | `attrib.js` |
| 79 | `chargen.js` |
| 199 | `isaac64.js` (frozen) |
| 165 | `rect.js` |
| 164 | `mondata.js` |
| 161 | `cmd.js` |
| ≤160 | remaining modules (see `wc -l js/*.js`) |

**Total listed in `wc`:** ~15.5k lines under `js/*.js` (run `wc -l js/*.js` for current).

---

## 9. References inside this repo

- Contract: `docs/API.md`
- Phases / diff penalty: `docs/PHASES.md`
- Roadmap index: `.cursor/plans/nethack_js_port_roadmap_19a4defd.plan.md`
- Workstream checklists: `.cursor/plans/nethack-port/*.md` (especially `01`–`09` and `10-moveloop-detect-c-map.md`)
- Port conventions: `.cursor/rules/teleport-js-port.mdc`
- Upstream C submodule: `nethack-c/upstream/` (initialize with `git submodule update --init nethack-c/upstream` if missing)

---

*This document is an engineering snapshot for planning and onboarding; it is not a score prediction.*
