# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1542 themerms Light source oil lamp fill

**Objective:** Open `themerms.lua` Light source fill oil lamp
(named). Not create_object `o->lit`.
**C locus:** `themerms.lua` `:204–209`; `sp_lev.c`
`l_push_mkroom_table` `:3066`; callee `create_object` `:2425–2426`
(D-1533).
**JS locus:** `js/mklev.js` `themeroom_fill_light_source` /
`THEMEROOM_FILL_BODIES`.
**Change:** unlit themed fill places `l_create_object`
`OIL_LAMP` `lit=true` (begin_burn). Not `mksobj_at`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `makemon.c` `set_mimic_sym` furnsyms. Not
door `S_hcdoor`.
**Blocked:** none.
## 2026-08-26 — D-1541 restore.c ghostfruit spe remap

**Objective:** Open `restore.c` `ghostfruit` (named). Not goodfruit.
**C locus:** `restore.c` `ghostfruit` `:500–511`; `restobjchn`
`:260–261`; `options.c` fruitadd else `:8257–8286`.
**JS locus:** `js/bones.js` `ghostfruit` / `fruitadd_bones` /
`remapObjChainIds`.
**Change:** oldfruit fid→fname then fruitadd else into live
ffruit; restobjchn after next_ident; no candify / no
`current_fruit`. Clone (bones→options cycle). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `themerms.lua` Light source fill. Not `o->lit`.
**Blocked:** none.
## 2026-08-26 — D-1540 make_happy_shk adjalign/home/migrate

**Objective:** Must-fix review **493** — `shk.c` `make_happy_shk`
not pacify+“calms down” only.
**C locus:** `shk.c` `make_happy_shk` `:1395–1435`;
`make_happy_shoppers` `:1438–1445`; `kops_gone`; `pacify_guards`.
**JS locus:** `js/shk.js` `make_happy_shk`; export `mdrop_special_objs`.
**Change:** Non-Rogue `adjalign(sgn)`; `!inhishop` `home_shk` or
migrate+`dismiss_kops`; then shoppers (`kops_gone`/`pacify_guards`).
`pacify_guards` clone (mon→trap/monmove→shk). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1930).
**Verified:** canary **14**/14; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004).
**Next:** Open `restore.c` `ghostfruit`. Not goodfruit.
**Blocked:** none.
## 2026-08-26 — review D-1531–D-1539 (audit #1930)

**Objective:** audit — C-fidelity reviews **492–500** of JS SHAs
`3c112783` / `81e04089` / `9d2ba80e` / `289573bc` /
`455020ed` / `2778c077` / `4508a3cb` / `e7574dc9` /
`719506a4` plus full `sessions` score.
**C locus:** Pri-loca `mk_roamer`; `tamedog` covetous; `o->lit`;
EYE; FOOT; door `S_hcdoor`; `#altdip`; wander/`somexy`; cspfx W_ART.
**Change:** no `js/` edits. One **QUALITY-RISK** (493 D-1532
`make_happy_shk` stub in live isshk arm). Eight
**ACCEPT-WITH-DEBT**. Must-fix prepended. Filled archive
D-1539 `719506a4`. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405**/11,405 RNG
**792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.848).
seed0367 FULL. Fortress held.
**Verified:** full `sessions` at HEAD `719506a4`.
**Next:** Must-fix `make_happy_shk` (review **493**). Not Open
`ghostfruit`.
**Blocked:** none.
## 2026-08-26 — D-1539 artifact.c cspfx W_ART

**Objective:** Open `artifact.c` cspfx W_ART (named). Not SPFX_WARN.
**C locus:** `artifact.c` `set_artifact_intrinsic` `:770–858`;
`artilist.h` A() s2; `invent.c` `addinv_core1`/`freeinv_core`.
**JS locus:** `js/artifact.js`; `js/u_init.js` `addinv`;
`js/invent.js` `freeinv_core`; extractor + `artifacts_data.js`.
**Change:** Extract cspfx. W_ART uses it (MKoT/Orb of Fate
WARN|…). Drop strips bits other carried arts still confer.
ESP/STLTH/TCTRL/EREGEN/HSPDAM/HPHDAM. Invent on/off. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `restore.c` `ghostfruit`. Not goodfruit.
**Blocked:** none.
## 2026-08-26 — D-1538 dog.c mon_arrive wander/somexy

**Objective:** Open `dog.c` wander/`somexy` (named). Not is_covetous.
**C locus:** `dog.c` `mon_arrive` `:491–500`/`:506`/`:582–605`;
`mkroom.c` `somexy`; `hack.c` `in_rooms`.
**JS locus:** `js/dog.js` `mon_arrive_after_you` / `arrive_wander_xy`.
**Change:** Catchup `wander=min(nmv,8)`; EXACT_XY zeros; then
`in_rooms`+`somexy` or corridor `rn1`. Local mkroom clone
(mklev→trap→dog). Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `artifact.c` cspfx W_ART. Not SPFX_WARN.
**Blocked:** none.
## 2026-08-26 — D-1537 cmd.c INTERNALCMD #altdip

**Objective:** Open `cmd.c` INTERNALCMD `#altdip` (named). Not dip_into.
**C locus:** `cmd.c` `:2063` `"altdip"` `INTERNALCMD` → `dip_into`;
`cmdq_add_ec`/`ext_func_tab_from_func`; `extcmds_match` skip;
`can_do_extcmd` buried.
**JS locus:** `js/generated/extcmdlist_data.js`; `js/cmd.js`
`can_do_extcmd`/`CMDQ_EXTCMD`; `js/getline.js` `extcmds_match`;
`js/iactions.js` IA_DIP_OBJ.
**Change:** Table row live. Typed `#altdip` unknown. Canned
`CMDQ_EXTCMD` + buried refuse. `cmd_from_ecname` `#altdip`.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` wander/`somexy`. Not is_covetous.
**Blocked:** none.
## 2026-08-26 — D-1536 set_mimic_sym door S_hcdoor

**Objective:** Open `makemon.c` `set_mimic_sym` door `S_hcdoor`
(named). Not furnsyms.
**C locus:** `makemon.c` `set_mimic_sym` `:2420–2438`.
**JS locus:** `js/makemon.js` `set_mimic_sym`.
**Change:** Door/wall/SDOOR/SCORR left-connect HWALL…TUWALL →
`S_hcdoor` (rogue `S_hwall`); else `S_vcdoor` (`S_vwall`).
`mx!=0` short-circuit. No RNG. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **22**/22; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `cmd.c` INTERNALCMD `#altdip`. Not dip_into.
**Blocked:** none.
## 2026-08-26 — D-1535 observe_quantum_cat FOOT

**Objective:** Open `pickup.c` `observe_quantum_cat` FOOT (named).
Not HEAD.
**C locus:** `pickup.c` `observe_quantum_cat` `:2826–2896`;
callers use_container/tip TRUE,TRUE; end.c disclose FALSE,FALSE.
**JS locus:** `js/pickup.js` `observe_quantum_cat`; `js/end.js`
identify + contents; `js/objnam.js` latebound FOOT.
**Change:** Collapse SchroedingersBox. Unseen live uses
`body_part_latebound(FOOT)`. Disclose live leaves spe. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **16**/16; green+strict seed8000/0900;
focused seed4500 FULL; cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym` door `S_hcdoor`. Not furnsyms.
**Blocked:** none.
## 2026-08-26 — D-1534 mcast_blind_you EYE

**Objective:** Open `mcastu.c` `mcast_blind_you` EYE (named).
Not PSI_BOLT HEAD.
**C locus:** `mcastu.c` `mcast_blind_you` `:729–743`; caller
`mcast_spell` `:875–877`; `spell_would_be_useless` `:977–979`.
**JS locus:** `js/mcastu.js` `mcast_blind_you` / `castmu`;
`js/monsters.js` `eyecount`.
**Change:** Scales `body_part(EYE)`; `make_blinded(200/100,false)`;
Eyes vision_clears. Blinded gate is `H&&!B`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **21**/21; green+strict seed8000/0900;
focused seed4500 FULL; cohort **7**/7 + strict.
**Next:** Open `pickup.c` `observe_quantum_cat` FOOT. Not HEAD.
**Blocked:** none.
## 2026-08-26 — D-1533 create_object o->lit begin_burn

**Objective:** Open `sp_lev.c` `create_object` `o->lit` (named).
Not mktrap_victim.
**C locus:** `sp_lev.c` `create_object` `:2425–2426` after
`stackobj`; producer `lspo_object` `:3640` lit default 0.
**JS locus:** `js/mklev.js` `create_object` / `l_create_object`.
**Change:** `if (o.lit) begin_burn(otmp, false)` after stackobj
(not tile.lit). Table `lit` defaults 0. Light source fill named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mcastu.c` `mcast_blind_you` EYE. Not PSI_BOLT HEAD.
**Blocked:** none.
## 2026-08-26 — D-1532 tamedog is_covetous

**Objective:** Open `dog.c` `tamedog` is_covetous (named). Not leftovers.
**C locus:** `dog.c` `tamedog` `:1240–1280` (`is_covetous`,
is_demon-vs-hero, `leader_m_id`, blessed-scroll, `make_happy_shk`,
givemsg, `mon_wield_item`).
**JS locus:** `js/dog.js` `tamedog`.
**Change:** Reject covetous / demon-vs-human-hero / quest leader
after peaceful. Blessed +2 clamp 10. Dynamic `make_happy_shk`.
`pline_mon` givemsg. Post-tame `mon_wield_item`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004 feeding-pony).
**Next:** Open `sp_lev.c` `create_object` `o->lit`. Not mktrap_victim.
**Blocked:** none.
## 2026-08-26 — D-1531 create_monster mk_roamer Pri-loca

**Objective:** Must-fix review **487** — `align!=RANDOM` aligned
cleric `mk_roamer` (`MM_EMIN`), not `makemon(..., 0)`.
**C locus:** `sp_lev.c` `create_monster` `:1983–1984` +
`priest.c` `mk_roamer` `:724–751`. Review named `load_pri_strt`;
locus is `load_pri_loca` (Pri-loca.lua noalign cleric).
**JS locus:** `js/mklev.js` `load_pri_loca` + `mk_roamer_splev`.
**Change:** `mk_roamer_splev(pm, Amask2align(AM_NONE), …)` so
D-1526 emin `rn2(3)` does not fire. Emin arm kept. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405** RNG **792,838**/792,838
(100%) speed `38+0.30/turn` (R² 0.841). seed0367 FULL.
**Verified:** C/JS grep; seed0367 FULL+strict; green+strict;
cohort **7**/7; priest 0501/0106; full `sessions` 44/44.
**Next:** Open `dog.c` `tamedog` is_covetous. Not leftovers.
**Blocked:** none.
## 2026-08-26 — review D-1522–D-1530 (audit #1920)

**Objective:** audit — C-fidelity reviews **483–491** of JS SHAs
`aac21a74` / `e13f38ae` / `2c688c98` / `e234a41b` /
`4e78ca90` / `d53c5cd1` / `aa4d11f5` / `72c1fcdd` /
`a5d779b7` plus full `sessions` score.
**C locus:** `reorder_fruit`; `goodfruit`; `object_from_map`;
TEMPLE `S_altar`; emin roaming; `#timeout` summary;
`show_region`; `see_wsegs`; getobj ALLOWCNT.
**Change:** no `js/` edits. One **QUALITY-RISK** (487 D-1526
Pri-strt `makemon(..., 0)` vs C `mk_roamer`). Eight
**ACCEPT-WITH-DEBT**. Must-fix prepended. Filled archive
D-1530 `a5d779b7`. Rule #2: no fs.
**Score:** **43**/44 Scr **11,405**/11,405 RNG
**747,952**/792,838 (94.3%) speed `37+0.30/turn` (R² 0.855).
seed0367 FAIL RNG **5239**/50125 from `4e78ca90`.
**Verified:** full `sessions` at HEAD `a5d779b7`.
**Next:** Must-fix `load_pri_strt` `mk_roamer` (review **487**).
Not Open `tamedog`. Do not delete emin.
**Blocked:** none.
## 2026-08-26 — D-1530 invent.c getobj ALLOWCNT

**Objective:** Open `invent.c` `getobj` GETOBJ_ALLOWCNT (named).
Not Palantir.
**C locus:** `invent.c` `getobj` `:1937–2088` + `splittable`
`:1664`; `cmd.c` `get_count` inkey/`LARGEST_INT`/`GC_SAVEHIST`.
**JS locus:** `js/invent.js` helpers; charge/drop/throw/wield/
ready/adjust clones.
**Change:** Digit prefix, throw-one, "don't have that many",
`split_otmp` (child after parent on invent[]). Palantir `#if 0`.
CMDQ_INT / pickinv count / finish_splitting named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
digit-at-getobj public-unhit.
**Verified:** canary **32**/32; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` `tamedog` is_covetous. Not leftovers.
**Blocked:** none.
