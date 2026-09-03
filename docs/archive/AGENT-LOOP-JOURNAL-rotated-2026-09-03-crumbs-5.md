# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
