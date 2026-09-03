# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-09-03** — full `sessions` at **D-1767**
(display gbuf stamp). **43**/44,
Scr **11,320**/11,405, RNG **777,491**/792,838 = **98.1%**.
Speed `41+0.31/turn` (R² 0.863). seed0367 FULL still PASS.
Recovered D-1765 FAILs seed0006/0030/4500; seed0014 still FAIL
(same prefix as D-1765). Prior audit **#2180** was 40/44 at
`bb71f9ff`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** |
| Screens matched | **11,320 / 11,405** |
| Positional RNG calls matched | **777,491 / 792,838** (98.1%) |
| Speed label | `41+0.31/turn` (R² 0.863) |
| Role-init throws | **0 / 44** |

**PASS (43):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383, seed0030, seed4500.

**Notable non-PASS:** seed0014-dequa-fountain-explore RNG 43831/59178
Screen 629/714 (same prefix as D-1765 after gbuf stamp).

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective

**Suite 43/44** after D-1767 `show_glyph` gbuf stamp (recovered
seed0006/0030/4500). seed0014 still FAIL — do not invent a peel;
map still picks work. Save-oracle required for tagged
restore/other-floor Open (`save-oracle.mjs probe --omit`).
**Next cluster:** Open `potion.c` make_blinded Unaware talk=FALSE (named). Not Sting(-1).
**Do not skip D-1531…D-1767 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1767.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1767 (index). Recent: **D-1767**
`display.c` `show_glyph` always overwrite `gbuf.glyph`;
`back_to_glyph` integer; `see_traps` `glyph_is_trap` only
(`display.c` `:2039` / `:1610–1621` / `:2286–2427`; live
`js/display.js`+`js/detect.js`; named: usteed / swallow /
`map_glyphinfo`; seed0014). **D-1766**
`do_wear.c` `cancel_doff` I_SPECIAL skip + takeoff.mask slot clear;
`setworn`/`setnotworn` callers; `doffing` accessory/wep `takeoff.what`
(`do_wear.c` `:1643–1659` / `:1600–1640`; `worn.c` `:110`/`:164`; live
`js/do_wear.js`+`js/do.js`; named: setnotworn `monstunseesu_prop` /
`update_inventory`). **D-1765**
`display.h` integer `GLYPH_*_OFF` + `detect.c` `map_monst` monsym/`mtame`
ternary (`display.h` `:497–546`; `detect.c` `:124–128`; live
`js/display.js`+`js/detect.js`; named: `ridden_mon_to_glyph` usteed,
swallow cmap, `map_glyphinfo`). **D-1764**
`level_tele` heaven `u_left_shop(ushops0,TRUE)` + Cloud 9 / fly-or-plummet
/`done(DIED)` / escape dlevel 0 + `goto_level` `done(ESCAPED)`
(`teleport.c` `:1321–1385`; `do.c` `:1517–1519`; live `js/teleport.js`+
`js/do.js`; named: `lev_by_name`, Nowhere yn, Quest·mines·sanctum clamp,
invoked gate). **D-1763**
`beg` helpless/diet then animal `domonnoise` / humanoid
`map_invisible`+SetVoice+`verbalize("I'm hungry.")` / middle famished
(`sounds.c` `:518–542`; live `js/sounds.js`; named: `dog_hunger`
wire, `peacefuls_respond`/MS_ARREST Halt). **D-1762**
`maybe_gasp` Exclam `ROLL_FROM`/`NULL` after guardian/priest/angel
rewrite + msound switch (`sounds.c` `:545–610`; live `js/sounds.js`;
named: `peacefuls_respond`/MS_ARREST Halt). **D-1761**
`sound_speak` !SND_SPEECH no-op + Death `sound_speak(tmpbuf)` after
SetVoice/`pline1(ucase)`; `SoundSpeak` empty without SND_LIB
(`putmesg`; live `js/sounds.js`+`sndprocs.js`+`display.js`; named:
SND_SPEECH body). **D-1760**
`explode` 3x3 `map_invisible` when `cansee && !canspotmon`; `You_hear`
vs Boom! / generic `"explosion"`; `engulfer_explosion_msg` (`explode.c`
`:378–452` / `:117–179`; live `js/explode.js`; named: hallu
`rndmonnam`, You_hear Underwater/Unaware, TRAP_EXPLODE killer).
**D-1759**
`trapname` Hallu `trap.c:7098` display rng + 62 names; C `trap_to_glyph`
has no Hallu (no `random_trap_to_glyph`); `see_traps` `glyph_is_trap`
(live `js/trap.js`+`display.js`; named: pager `trap_description`).
**D-1758**
`hero_Deaf` `youprop.h:125` `EDeaf`/`uroleplay.deaf` so doseduce/mayberem
skip Cha `rn2`/`y_n` (hitmsg/You_hear/sedu/ston same local; named:
`noit_mhim` Hallu). **D-1757**
`setworn` worn[] `oc_oprop` + `w_blocks` blocked + SWAPWEP/QUIVER skip
+ W_WEP weapon-class gate + `monstunseesu_prop`; `setuwep` calls
`setworn` (`worn.c` `:72–145`; `wield.c` `:99–135`; live `js/do_wear.js`
+ `js/worn.js` `w_blocks`; named: `cancel_doff`). **D-1756**
`delobj`/`delobj_core` extract then `obfree` (`invent.c`
`:1429–1462`; `mkobj.c` `extract_nobj` `:2595–2614` /
`container_weight` `:2731–2738`; `zap.c` revive floor
`delobj_core(,TRUE)`; live `obj_resists`; named: zap
`delete_contents` clone, invent Array vs nobj, youmonst
`maybe_unhide_at`, `shrinking_glob_gone`). **D-1755**
`toggle_blindness` `Sting_effects(-1)` (`potion.c` `:334–364`
Stinging see_monsters then `-1`; `make_blinded` `:260–331` Hallu
talk + Eyes vismsg/itch; Blindf_on/off; clones retired; named:
Unaware talk=FALSE, Punished `set_bc`). **D-1754**
`really_done` companion pet HP (`end.c` `:1293–1295` `keepdogs(TRUE)`;
`:1453–1476` mydogs `mtame` `mhp` + live-cat `d(adj_lev,8)`; two-line
putstr; `dog.c` `:799–809` pets_only wakeup; live `js/end.js` +
`js/dog.js` + exported `adj_lev`; named: DUMPLOG, keepdogs
migrate/leash/`mon_has_amulet`). **D-1753**
`sense_trap` Hallu/cursed GOLD/`random_object` quan (`detect.c` `:864–897`;
`display_trap_map`/`detect_obj_traps`/`trap_detect`/`findone`; live
`js/detect.js` + `random_object`; named: findone flash/foundone/mimic,
gold_detect).
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1767 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1767 (index). No generic `dknown` on
`otyp < FIRST_OBJECT`. No dump_fmtstr / paniclog filesystem.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
