# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — D-1772 mon.c peacefuls_respond / MS_ARREST Halt

**Objective:** Open `mon.c` peacefuls_respond / MS_ARREST Halt. Not beg.
**C locus:** `mon.c` `peacefuls_respond` `:4162–4257`; `setmangry`
`:4317`; `mondata.c` `big_little_match` `:1329–1351`.
**JS locus:** `js/mon.js` `peacefuls_respond`+`setmangry`;
`js/mondata.js` `big_little_match`; growl `PLNMSG_GROWL`.
**Change:** Port Halt/`angry_guards`, humanoid gasp/flee/anger,
same-mlet growl+flee; async `setmangry` `!mon_moving` wire; await
callers. Named: `qst_guardians_respond`; Elbereth; victim growl.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `mon.c:peacefuls_respond`; Halt
canary watch `mpeaceful→0`; green+strict; cohort **7**/7 + strict.
**Next:** Open `detect.c` gold_detect. Not sense_trap.
**Blocked:** none.
## 2026-09-03 — D-1771 invent.c useupf + eat.c carried hybrid

**Objective:** Open `eat.c` useup+useupf hybrid. Not delete_contents.
**C locus:** `invent.c` `useupf` `:4762–4783`; `useup` `:1320–1333`;
eat.c `done_eating`/`use_up_tin`/`eatcorpse`/`eatspecial`.
**JS locus:** `js/invent.js` `useupf`; `js/eat.js` hybrid retired.
**Change:** Port `useupf` (split+`delobj`+`hideunder`); eat.c
`carried()?useup:useupf`; retarget apply/engrave/fountain/pray/zap.
Named: shop bill, zap.js useupf clone, detect/potion/read/spell
useup clones.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `invent.c:useupf`; load ok;
green+strict; cohort **7**/7 + strict (seed1800 eat-throw).
**Next:** Open `mon.c` peacefuls_respond / MS_ARREST Halt.
**Blocked:** none.
## 2026-09-03 — D-1770 shk.c delete_contents (zap clone retired)

**Objective:** Open `zap.c` delete_contents clone. Not delobj extract.
**C locus:** `shk.c` `delete_contents` `:1174–1183`; caller
`zap.c` `poly_obj` `:1827–1829`.
**JS locus:** `js/zap.js` import; `js/shk.js` export.
**Change:** Retire zap unlink clone; `poly_obj` uses extract+`obfree`.
Named: trap.js `delete_contents_chest`; mklev.js
`create_object_delete_contents`.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `zap.c:delete_contents`; node
canary nested+mkbox_cnts `OBJ_DELETED` + poly empty box; green+strict;
cohort **9**/9 + strict.
**Next:** Open `eat.c` useup+useupf hybrid.
**Blocked:** none.
## 2026-09-03 — D-1769 ball.c set_bc Punished blind snapshot

**Objective:** Open `ball.c` Punished set_bc. Not Unaware talk.
**C locus:** `ball.c` `set_bc` `:379–424`; callers `potion.c` `:309`,
`do_wear.c` `:1476`/`:1523`, `read.c` `:3059`.
**JS locus:** `js/ball.js` `set_bc`; `js/do.js` `make_blinded`;
`js/do_wear.js` `Blindf_on`/`Blindf_off`; `js/read.js` `punish`.
**Change:** Port `set_bc`; wire four Punished-blind sites. Named:
Blind `move_bc` glyph, `unplacebc` Blind restore.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `ball.c:set_bc`; node canary 6/6
+ sighted DIFFER peek; green+strict; cohort **7**/7 + strict.
**Next:** Open `zap.c` delete_contents clone.
**Blocked:** none.
## 2026-09-03 — D-1768 potion.c make_blinded Unaware talk=FALSE

**Objective:** Open `potion.c` make_blinded Unaware talk=FALSE.
Not Sting(-1).
**C locus:** `potion.c` `make_blinded` `:275–276`; `youprop.h`
Unaware `:399`; `eat.c` `is_fainted` `:3346–3350`; `trap.c`
`unconscious` `:6775–6786`.
**JS locus:** `js/do.js` `make_blinded`; `js/eat.js`
`is_fainted`/`Unaware` (import, no clone #9).
**Change:** Port `is_fainted`; Unaware ORs faint after unconscious;
`make_blinded` clears talk. Punished `set_bc` still named.
**Score:** unchanged fortress **43**/44 (no full `sessions` this
port iter).
**Verified:** probe skip untagged `potion.c:make_blinded`; node
canary 16/16; green+strict; cohort **9**/9 + strict.
**Next:** Open `ball.c` Punished set_bc.
**Blocked:** none.
## 2026-09-03 — D-1767 display.c show_glyph gbuf stamp

**Objective:** Must-fix `display.c` `show_glyph` always overwrite
`gbuf.glyph` (stale `disp_glyph` / `see_traps`). Not usteed.
Source: reviews/loop-unattended/726-3b34b789-glyph-offsets.md
**C locus:** `display.c` `show_glyph` `:2039`; `see_traps`
`:1610–1621`; `back_to_glyph` `:2286–2427`; `do_vicinity_map`
`:1528`.
**JS locus:** `js/display.js` `show_glyph_cell`/`see_traps`/
`back_to_glyph`; `js/detect.js` import `map_background`.
**Change:** Always stamp `loc.disp_glyph`; pass cmap ids from
map_* / memory / zap / explode; `see_traps` `glyph_is_trap` only;
vicinity drops kind hybrid. Not usteed / swallow / `map_glyphinfo`.
**Score:** **43**/44, Scr **11,320**/11,405, RNG **777,491**/792,838
(98.1%). Speed `41+0.31/turn` (R² 0.863). Recovered seed0006/0030/4500;
seed0014 still FAIL.
**Verified:** probe skip untagged `display.c:show_glyph`; node canary;
green+strict; cohort **7**/7 + strict; full `sessions` 43/44.
**Next:** Open `potion.c` make_blinded Unaware talk=FALSE.
**Blocked:** none.
## 2026-09-03 — audit #2180 reviews 719–727 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **718**
(`0b5f451a`…`bb71f9ff`, D-1758…D-1766) plus full `sessions`.
**C locus:** youprop.h `Deaf`; trap.c `trapname`; explode.c
`map_invisible`; sounds.c `sound_speak`/`maybe_gasp`/`beg`;
teleport.c `level_tele`; display.h `GLYPH_*_OFF` / detect.c
`map_monst`; do_wear.c `cancel_doff`.
**Change:** reviews **719–727**. **726 QUALITY-RISK** (stale
`loc.disp_glyph` / `see_traps`) prepended Must-fix. Rest
ACCEPT-WITH-DEBT. No `js/` edits. Filled archive D-1766 `%h`.
**Score:** **40**/44, Scr **10,422**/11,405, RNG **702,843**/792,838
(88.6%). Speed `41+0.32/turn` (R² 0.857) at `bb71f9ff`. Break at
D-1765 (seed0006/0014/0030/4500).
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `display.c` `show_glyph` always overwrite gbuf.
**Blocked:** none.
## 2026-09-03 — D-1766 do_wear.c cancel_doff

**Objective:** Open `do_wear.c` cancel_doff (named). Not setworn oc_oprop.
**C locus:** `do_wear.c` `cancel_doff` `:1643–1659`; `doffing` `:1600–1640`;
callers `worn.c` `setworn` `:110` / `setnotworn` `:164`.
**JS locus:** `js/do_wear.js` `cancel_doff`/`setworn`/`doffing`;
`js/do.js` `setnotworn`.
**Change:** C `cancel_doff` (I_SPECIAL skip `cancel_don`, always clear
slotmask); `setworn`/`setnotworn` callers; `doffing` accessory/wep
`takeoff.what`. Did not add setnotworn `monstunseesu_prop` /
`update_inventory`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `do_wear.c:cancel_doff`; node canary
(I_SPECIAL / donning / idle / amulet / callers); green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `potion.c` make_blinded Unaware talk=FALSE.
**Blocked:** none.
## 2026-09-03 — D-1765 display.h GLYPH_*_OFF / map_monst

**Objective:** Open `display.h` integer GLYPH_*_OFF / map_monst. Not
pet_to_glyph.
**C locus:** `display.h` `:497–546`; `detect.c` `map_monst` `:121–134`.
**JS locus:** `js/display.js`; `js/detect.js` `map_monst`.
**Change:** C glyph offset enum + integer `*_to_glyph` / `glyph_is_*`;
`map_monst` monsym/`mtame` ternary; `loc.disp_glyph`. Did not wire
`ridden_mon_to_glyph` usteed or `map_glyphinfo`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `detect.c:map_monst`; node canary
(offsets; ghost detect vs pet/wild); green+strict seed8000/0900;
CURRENT cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `do_wear.c` cancel_doff.
**Blocked:** none.
## 2026-09-03 — D-1764 teleport.c heaven u_left_shop / escape

**Objective:** Open `teleport.c` heaven u_left_shop caller. Not SetVoice.
**C locus:** `teleport.c` `level_tele` `:1321–1385`; `do.c`
`goto_level` `:1517–1519`; callee `u_left_shop`.
**JS locus:** `js/teleport.js` `level_tele`; `js/do.js` `goto_level`.
**Change:** C heaven envelope (`u_left_shop`+in_mklev, Cloud 9,
fly/lev/plummet, `done(DIED)`, dlevel 0); buried ball before
`next_to_u`; `ledger_no<=0` `done(ESCAPED)`. Did not port
`lev_by_name` / Nowhere yn / branch clamp.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `teleport.c:level_tele`; node canary
(ushops0 Cloud 9 Levitation; Flying `-3`; wizard `-10` survive;
`goto_level` dlevel 0 → ESCAPED); green+strict seed8000/0900;
CURRENT cohort **7**/7 + seed0373 + strict. Rule #2 clean.
**Next:** Open `display.h` integer GLYPH_*_OFF / map_monst.
**Blocked:** none.
## 2026-09-03 — D-1763 sounds.c beg

**Objective:** Open `sounds.c` beg. Not maybe_gasp.
**C locus:** `sounds.c` `beg` `:518–542`; caller `dog_hunger` `:383`
(not wired).
**JS locus:** `js/sounds.js` `beg`.
**Change:** C body; diet/helpless gate; animal `domonnoise`;
humanoid I-glyph+SetVoice+verbalize; middle famished. Did not port
`dog_hunger`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:beg`; node canary
(helpless/diet/unseen middle/Deaf animal/humanoid); green+strict
seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `teleport.c` heaven u_left_shop.
**Blocked:** none.
## 2026-09-03 — D-1762 sounds.c maybe_gasp

**Objective:** Open `sounds.c` maybe_gasp. Not sound_speak.
**C locus:** `sounds.c` `maybe_gasp` `:545–610`; caller
`peacefuls_respond` `:4188` (not wired).
**JS locus:** `js/sounds.js` `maybe_gasp`.
**Change:** C body + remaining `MS_*` for the switch; mndx vs
`urole.guardnum`; live `p_coaligned`. Did not port `beg` or
`peacefuls_respond`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `sounds.c:maybe_gasp`; node canary
(`rn2(5)` / null arms); green+strict seed8000/0900; CURRENT cohort
**7**/7 + strict. Rule #2 clean.
**Next:** Open `sounds.c` beg.
**Blocked:** none.
