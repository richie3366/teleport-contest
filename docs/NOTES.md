# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker (2026-09-06, human):** `scen-*` 7/275 is the held-out shape; mutants 255/278 saturated. Queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.

- **Park `show_conduct` (c209ccc7):** stale (859→824 x_monnam); owner is a C comment; DontAsk arm REGRESSES (reverted). See Parked; re-baseline first.
- **Park `ready_weapon` (Knight-92204 spin):** moves 5/6; Knight spins 99% CPU past step-25 → downstream loop. See Parked; needs stack/profile.
- **Park `mdrop_obj`:** capture-point divergence; full port = verify no-op.
- **Park `dopush` (mimic-viz):** one cell r13c32, RNG tied; needs C viz at step 127 or `view_from` audit.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-2017 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-2017 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2017.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2017.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2017: `js/makemon.js` — `else if (is_rider(ptr))` inserted between golem and `mlevel>49` in exact C position (`basehp = 10; d(basehp, 8)`), and `if (is_home Named: none new — `newmonhp` is now complete vs C (all six arms + boost).
- D-2016: `js/do.js` — ledger arm now C-verbatim: `game.iflags?.debug_fuzzer` early `ECMD_OK`, else `await y_n('Beware, there will be no return! Named: rooted, `stucksteed`, `u_stuck_cannot_go`, encumbrance load gate (all pre-existing; `stuck
- D-2015: `js/end.js` — `count_achievements` added to the pre-existing `./insight.js` import (`imports.mjs --can`: already statically imported, no new edge, no  Named: `invent.c` `addinv_core1` uhave/ACH arms (`u.uhave.amulet/menorah/bell/book` + `record_ach
- D-2014: `js/engrave.js` — full `async engrave()` in exact C order (renamed from `engrave_occupation` so `sym.mjs` finds the C name; `game.occupation` is await Named: altar/jello/swallow/lava/pool floor gates; yn add-to (same-type defaults append); livelog 
- D-2013: `js/pager.js` — `describe_looked` self branch appends `' or you'` iff `urace.mnum !== PM_HUMAN && !== PM_ELF && !Upolyd(u)` (C `:1352` gate verbatim;  Named: `wishymatch` special-case arms (dwarvish/dwarven, elven/elvish/elfin, helmet→helm, gloves→
- D-2012: `js/allmain.js` — `interrupt_multi(msg)` is now `async`: live `nomul(0)` (`./hack.js`, pre-existing import edge extended — hoisted function declaratio Named: `rehumanize` on `mh < 1` (pre-existing defer in the `regen_hp` doc, untouched).
- D-2011: `js/do.js` — `danger_uprops` checks flat `|0` OR `u.uprops[PROP].intrinsic` for STONED/SLIMED/STRANGLED/SICK (C `:2318–2322` cite; no H/E extrinsic —  Named: visctrl/cmd_from_func beyond `'m'` (pre-existing D-0228 defer, untouched).
- D-2010: `js/artifact.js` — full hero `touch_artifact` in exact C order (now `async`; `Role_if`/`Race_if` badclass; bane via same-file `spec_applies`; single-` Named: monster covetous/mplayer role/align arms (`is_covetous`/`is_mplayer`/`mon_aligntyp` unwire
- D-2009: `js/lock.js` `doclose` — caller-local `confdir(false)` after successful `getdir` when `!u.dz` (covers self `.` too, as C does; `</>` skip via `dz`), t Named: `stumble_on_door_mimic` / Blind `feel_location`+mapseen / portcullis+drawbridge arms in `d
- D-2008: `js/sit.js` — full `surface()` in exact C branch order: `SURFACE_AT` look-through on DRAWBRIDGE_UP via live `db_under_typ`, air-bubble waterlevel arm, Named: swallow maw/husk arm (fires only while the hero is swallowed by an animal: `digests`/`enfo
- D-2007: `js/polyself.js` — full tip block in exact C branch order (incl. hide+web combined arm, `u.umonnum == PM_GREMLIN`, `msound == MS_SHRIEK`, `is_vampshif Named: none new — `polymon` verbose tips now complete vs C; map `turns.md` `#monster` row updated
- D-2006: `js/mklev.js` — `themeroom_fill_massacre` (27-name pool in C order, initial `lua_random2(1,27)`, count as five `lua_random2(1,5)` per nhlib `d` not rn Named: none new — every `THEMEROOM_FILLS` entry now dispatches to a body (map `data.md` runtime-l
- D-2005: `js/mhitu.js` — `mhitm_ad_fire_u` / `mhitm_ad_tlpt_u` / `mhitm_ad_stck_u` / `mhitm_ad_plys_u` in exact C branch order (incl. stck gate-first, plys rn2 Named: uhitm + mhitm arms of fire/tlpt/stck/plys stay deferred (D-1907 covers the mhitm SGLD/TLPT
- D-2004: `js/read.js` — `firstchoice = d.which`, `{ mtype }` box through live `cant_revive` (`./zap.js`, same edge as `resist`) with the C `firstchoice !== PM_ Named: rest of `create_particular_creation` stays deferred per D-2001 (quan-limit, randmonst/monc
- D-2003: `js/read.js` — drop the pad (`asciiLow` is now plain ASCII lower), search bare `'female '` / `'male '` female-first, and blank exactly the hit width i Named: none new — rest of `create_particular_parse`/`creation` stays deferred per D-2001 (quan, s
<!-- landmarks:end -->
