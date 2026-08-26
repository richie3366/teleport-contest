# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
