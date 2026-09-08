# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe` (scores live in CURRENT.md).
- **distfleeck park (2026-09-08):** body port proven no-movement; writers Healer-92218 `domove_bump_mon` / Tourist-92061 interleave / Rogue-92030 m_move (see Parked).
- **mcalcmove park (2026-09-08):** Archeologist shipped D-2066; Rogue-92137/Knight-92188 = slime-lifesave writer (see Parked).

- **Parks (Parked rows; do not pop):** show_conduct, ready_weapon Knight-92204, mdrop_obj/dopush, dosearch grid-bug, save_dungeon, do_statusline2 lembas pair (falsifiers in Parked rows).
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park (2026-09-08):** 3-writer symptom (detail: Parked). S1 shipped D-2068; S2 fire-trap skip; S3 cube paradox.
- **m_move symptom-owner park (2026-09-08):** loop body faithful; Wizard-92076 shipped D-2069; Caveman-92202 cnt-j off-by-one (D-1868 arms live) — needs C per-turn cnt/mtrack dump (detail: Parked; do not re-pop).

## Don't re-check (≤15)

- D-1790…D-2104 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2104.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2104.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2104: `js/invent.js` only, same-module import extensions only (`const.js` INVIS/G_GENOD/TELEPORT/HANDED, `roles.js` genders, `objnam.js` just_an, `monsters. Named: Adornment/Aggravate/Conflict/lev-fly-blocked/Wwalking/Swimming/Breathless/Passes_walls/Slo
- D-2103: none — the tree is already past the recorded divergence with zero edits this iteration (`git status --short` clean before and after diagnosis). Named: `wishymatch` special-case arms (dwarvish/dwarven, elven/elvish/elfin, helmet→helm, gloves→
- D-2102: `js/monmove.js` dochugw only — both visibility reads now use the pre-existing `./display.js` `canspotmon` import (`display_canspotmon`; call-time use, Named: none new.
- D-2101: `js/mklev.js` only — outer x-loop labeled (`outer:`) with `break outer` in the match arm (exact C both-loops exit + rescan-from-x=1 via the existing d Named: none new.
- D-2100: find_trap row stale (no js/; inferred D-2092 look envelope); session re-queued as Open invent.c dolook@108 (see D-log).
- D-2099: dowield row stale (no js/; code credit D-2044 simpleonames plural); Tourist-91126 fully PASS (see D-log).
- D-2098: js/objnam.js xname FIGURINE of-suffix (objnam.c:709-714 via obj_pmname_corpse+just_an, STATUE-guard shape); retires D-0418 figurine half.
- D-2097: none — no js/ changes (tree clean apart from docs). Named: SLEEPY-expiry `fall_asleep`+incr (`timeout.c` case SLEEPY — JS generic arm silently clears
- D-2096: `js/teleport.js` `enexto_core` only — `candy.length = 0` before the second collect (exact C buffer-reuse semantics: same indices, shuffle slices and d Named: `collect_coords` callers at teleport.js:1304/1666 pass fresh arrays (unaffected; no helper
- D-2095: `js/mklev.js` + one-word `export` on `js/trap.js` `undestroyable_trap` — new `floodfillchk_match_accessible` (`ACCESSIBLE||SDOOR||SCORR`, sp_lev.c:460 Named: `map_cleanup` + `count_level_features` + `link_doors_rooms` extras stay named on `load_min
- D-2094: `js/trap.js` `float_down` only — the come-down arm now `await import('./sit.js')` for `surface` (the dynamic-import idiom this file already uses for ` Named: file-local `surface_fd` stays for the `fall_through` `The … opens up` pline (`js/trap.js:3
- D-2093: `js/uhitm.js` `xkilled` only — after the lifesaved early-return (matching C `mondead` lifesave-before-`m_detach`), `mtmp.mtrapped = 0` + `await (await Named: `mhitm.js`/`trap.js` `mondead` still skip `mon_leaving_level` unstuck (same one-line gap o
- D-2092: `js/pager.js` only — (1) u_at arm returns `found: 1` with didlook cite; (2) `checkfile(first, ans === LOOK_VERBOSE ? Named: pm-derived dbase (`:862–864`); makesingular/fruit alt (`:990–996`); supplemental_name (`:9
- D-2091: `js/uhitm.js` — new `damageum_ad_drli` (C order verbatim: `!rn2(3)`, `resists_drli`, mgc_negated(TRUE); drain math with `|0` ints; `Monnam` «becomes w Named: `defended(mdef, AD_DRLI)` worn-item walk (named on every defended site; zap.js `resists_dr
- D-2090: `js/monmove.js` — `cuss` joins the pre-existing `./wizard.js` import (imports.mjs ALREADY, no new edge; call-time use only, no TDZ); local `MS_CUSS =  Named: none new — retires `cuss !rn2(5)` on dochug (map turns.md:2623) and the mcastu-reader half
<!-- landmarks:end -->
