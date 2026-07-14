# Rotated from AGENT-LOOP-JOURNAL.md (#360)

## 2026-07-14 22:36 — #349 D-0322 hmon hit exclam

- Objective: seed0030 @1429 `You hit Swidnica!` vs `.` (CURRENT).
- C locus: `uhitm.c` `hmon_hitmon_msg_hit` + `zap.c` `exclam`.
- Change: port `canseemon?exclam(dmg)` + bash/lash/smite/hit verb (D-0322).
- Verification: @1429 match; Scr **1445→1446**; first miss **@1433**
  (seg7 −13 death screens); RNG full; green+strict; 17 PASS cohort.
- Next: @1433 fatal wand-hit `--More--` / death screen capture.

## 2026-07-14 22:30 — #348 D-0321 SPBOOK xname descr

- Objective: seed0030 @1342 shining spellbook vs spellbook of jumping (CURRENT).
- C locus: `objnam.c` `xname_flags` SPBOOK_CLASS — dknown+!nn → `"%s spellbook"`.
- Change: port SPBOOK dknown/nn/un/dn arms; `nn` = `oc_name_known` only
  (D-0321).
- Verification: @1342/@1343 match; Scr **1438→1445**; first miss **@1429**
  hit `!` vs `.`; RNG full; green+strict; 19 PASS cohort.
- Next: @1429 `uhitm` `exclam(dmg)` after `You hit`.

## 2026-07-14 22:22 — #347 D-0320 losehp leave neg uhp

- Objective: seed0030 @1262 hit `--More--` HP:0 vs C HP:4 (CURRENT).
- C locus: `hack.c` `losehp` — no fatal uhp clamp; `bot` skip when `uhp==-1`.
- Change: remove `uhp=0` on fatal in `losehp`; `done` still zeros after bot
  (D-0320).
- Verification: @1262 HP:4; Scr **1432→1438**; first miss **@1342** shining
  spellbook; RNG full; green+strict; 17 PASS cohort + strict sample.
- Next: @1342 SPBOOK `"%s spellbook"` descr (`shining`) vs known leak.

## 2026-07-14 22:15 — #346 D-0319 thitu await pline

- Objective: seed0030 @1195 arrow glyph on shoot `--More--` (CURRENT).
- C locus: `mthrowu.c` `thitu` You-hit then losehp; `monshoot` pline before
  `m_throw` (flash kept through hit `--More--`).
- Change: await `thitu` hit/miss + `monshoot` plines before `losehp`/flight
  (D-0319).
- Verification: @1195 `)`+HP:9; Scr **1428→1432**; first miss **@1262**
  botl HP:4 vs 0; RNG full; green+strict; 19 PASS cohort + strict.
- Next: @1262 `losehp` leave negative `uhp` (`bot` skip `-1`).

## 2026-07-14 22:05 — #345 D-0318 mon_wield canseemon pline + score

- Objective: seed0030 @1174 thin-air + gnome wield (CURRENT); mandatory
  full `sessions` score (iter % 5 == 0).
- C locus: `weapon.c` `mon_wield_item` canseemon wield pline.
- Change: async wield message `Monnam wields doname!|.`; await callers
  (D-0318).
- Verification: @1174 match; Scr **1427→1428**; first miss **@1195** map
  `)` vs `·`; RNG full; green+strict; 19 PASS cohort; full **19/44**
  Scr **2865**/11405 RNG **240657**/792838 speed `17+0.12/turn`.
- Next: @1195 thrown-arrow map glyph during shoot `--More--`.

