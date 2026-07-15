# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **24/44** PASS (#385 full suite). Scr 3640/11405; RNG 243833/792838.
- **Next (post D-0364):** seed0012 @3483 — C `dog_goal` `obj_resists` vs JS
  `dog_move` `rn2(3)`. After tripe meating fix, matched two resists then JS
  exits scan early (fewer in-bbox `fobj` or reach/gtyp short-circuit).
  Cmd: `node scripts/rng-diff.mjs sessions/seed0012-monk-vault-escort.session.json`
- **Don’t re-check:** blame @3248 on fleeck arity / extra fobj while C meating
  (D-0364 — was instance `oc_delay`); under-dmg @3204 (D-0363); #l→loot
  (D-0362); ICE_BOX mkbox (D-0361).
- **Landmark:** screen `i` key = `moves[i]` (= `steps[i+1].key`).
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** early-return `dochug` on `msleeping` (D-0278);
  `can_make_bones` without `no_bones_level` (D-0279);
  `dodrink` CANCEL as time (D-0280); `#quit` AC-only (D-0281);
  `read_engr` maxelen from 80 (D-0282); botl `Dlvl` from `uz.dlevel` (D-0283);
  omit `m_throw` flash / potion `nn` (D-0284/85); skip AT_WEAP `mswings` /
  clamp fatal `uhp=0` / skip bot when `uhp==-1` / live-paint botl on more
  (D-0286/87/310/314/320); invent yn when `disclose:-i` (D-0288);
  omit RIP blank / topten (D-0290/91); true amulet/TOOL/WAND/SCROLL/SPBOOK/
  ARMOR name when `!nn` (D-0292/305/309/312/321/325); WAND `known` at create
  (D-0316); private `mon_nam` (D-0308); omit `paybill` (D-0311);
  bare isshk death (D-0313); omit Priest `bknown` (D-0315);
  vain-push behind boulder (D-0317); skip mon_wield pline (D-0318);
  fire-and-forget thitu pline (D-0319); bare hit period (D-0322);
  muse losehp without finish_done (D-0323); quit killer from prior death
  (D-0324); always paint Invisible `@` (D-0326); hard-code xkilled kill
  (D-0327); persist bones glyph memory (D-0328); bare MGIVENNAME ghost
  (D-0329); `;` unbound / forced more (D-0330); getlin no CO wrap (D-0331);
  drop letters without compactify (D-0332); friday13 one-space indent
  (D-0333); hand-roll checkfile yn (D-0334); treat `S` as unknown /
  skip VFS save (D-0335); always align on welcome-back (D-0336);
  advance attr pages on any key (D-0337); leave `$` unbound (D-0338);
  leave `)` unbound (D-0339); leave `[`/`=`/`"`/`(` unbound (D-0340);
  leave DEL unbound when `doterrain` exists (D-0341);
  skip `reveal_terrain` getglyph/show (D-0342); tip `docrt` under
  terrainmode / ignore getpos space quitchar (D-0343);
  put `#twoweapon` in EXT_CMD_AC (C flags 0 — expands `#tw` wrongly)
  (D-0344); omit `hitum` second `known_hitum(uswapwep)` when `u.twoweap`
  (D-0345); blanket `observe_object` in `xname` without `distantname`;
  `xname(CORPSE)` with mon name (D-0346 — bare `"corpse"`); skip twoweap
  skill-limit enl lines (D-0347); `clearScreen` on chargen corner confirm
  (D-0348 — keep splash; erase prior geom only); bare Entering pline
  without `schedule_goto`/`deferred_goto` (D-0349); tut-1 map at (1,0)
  / early `find_ac` on tutorial invent stash (D-0350); omit tut-1
  door-area engravings/`D_CLOSED`/`MAGIC_PORTAL` seen (D-0351);
  omit tut-1 portal `mktrap` victim `rnd(4)` / stop before kick→sling
  (D-0352); omit tut-1 loot→end / mineralize special skip / stub
  `align_shift` / `dochug` without WAITMASK (D-0353); silent
  `blocksMove` without mention_walls pline (D-0354); blame @33 on
  glance/`;`; omit POOL/lava/ice glyphs or paint DEC `` ` `` as Unicode ◆
  (D-0355 — keep raw `` ` `` like altar `{`); expect broken-door from
  `look_here` when `ct==0` (D-0356 — `describe_decor`); walk into seen
  pool without ParanoidSwim avoid/tip/`m` nopick (D-0357);
  paint RIP before disclose attrs/conduct/overview (D-0358);
  skip `init_mapseen` in `mklev` (DoD missing from death overview);
  smudge engravings on every continue_run step (D-0359);
  hero rocktrap via youmonst→`thitm` (D-0360 — place at `u.ux,u.uy`);
  ICE_BOX `mkbox_cnts` via boxiprobs (D-0361 — `mksobj(CORPSE)`);
  treat `#loot` unknown / blame @3152 on dog_move appr (D-0362);
  blame @3204 on xkilled path when JS still flees — under-dmg (D-0363);
  blame @3248 on fleeck/fobj while C meating — instance oc_delay (D-0364).
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC (D-0162/253).
- `goto_level` descend: `stairway_find_from(&u.uz0)` (D-0224); ends with
  `pickup(1)` (D-0349); UTOTYPE_NONE → `u_on_rndspot` (D-0350).
- tut-1 string `des.map` → SPLEV_CENTER xstart/ystart odd (D-0350).
- Session: screen `i` reads `moves[i]`; `more()` space/CR/ESC.
- Save: VFS `save/<plname>` JSON; restore skips `rndencode`;
  `l_nhcore_init` still 2×rn2; farewell clears map no flush (D-0335).
- Scoring grid: DEC chars in DEC_MAP → Unicode; `{`/` `` ` `` stay raw.
- D-0274…D-0364: bones/disclose/RIP/topten/descr/botl/paybill/ghost/`;`/
  getlin/compactify/enl/checkfile/save/welcome/attr/`$`/`)`/show-*/DEL/
  reveal_terrain/getpos Done/`#twoweapon`/`hitum` twohits/`dosit` OBJ_AT/
  weapon_insight twoweap limits / chargen corner / tutorial yes-path /
  tut-1 CENTER + invent stash + door-area + mktrap gate through sling +
  loot→end + align_shift + WAITMASK + mention_walls bump + pool/lava/ice
  DEC diamond + describe_decor + swim avoid/drown/lava burn + death
  disclose attrs/conduct/overview + init_mapseen + continue_run no smudge +
  hero rocktrap place ROCK + ICE_BOX mkbox corpses + `#loot` use_container +
  hmon dmg_recalc dbon/weapon_dam_bonus + dog_nutrition objects[] oc_delay.
