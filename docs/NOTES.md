# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail in Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1967 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1967 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-1967.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-1967.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1967: `js/dbridge.js` — exported `automiss` (`:486–490`), `e_survives_at` (`:380–399` noncorporeal→pool→lava→db_wall→TRUE with hero Wwalking/Amphibious/Brea Named: `revive_nasty` open/close/destroy arms (still deferred in all three callers); destroy `rn2
- D-1966: `js/mklev.js` — exported `selection_iterate_lua` with the full C-contract header (`:924–957` + `:1002` + sp_lev.c `:4793–4803` citations; relcoord rou Named: `l_selection_check` userdata/metatable validation (no Lua VM — JS callers pass Set-backed 
- D-1965: `js/allmain.js` — exported sync `init_sound_disp_gamewindows()` in C order (`| 0` int idiom; splash condition `iflags.wc_splash_screen && !flags.rando Named: `activate_chosen_soundlib` (`sounds.c:1779–1796`, no SND_LIB — cf.
- D-1964: `js/display.js` — exported `row_refresh(start, stop, y)` in C order (`| 0` int idiom; `force` false since JS nul (`clear_glyph_buffer` `' '`/`NO_COLOR Named: `map_glyphinfo` tile/rogue/hero/accessibility arms (force source); `get_bkglyph_and_framec
- D-1963: `js/weapon.js` — exported `async give_may_advance_msg(skill)` in C ternary order (`| 0` int idiom; `await You_feel(...)` + `await handle_tip(TIP_ENHAN Named: `use_skill` may-advance arm stays unwired (weapon.js export + spell.js local clone) — both
- D-1962: `js/region.js` — exported `inside_rect(r, x, y)` in C order (inclusive comparisons, `| 0` int idiom) with the `:53–57` citation; promoted `inside_regi Named: `create_region` stored `bounding_box`/`nrects` not yet ported (JS regs carry `rects` only;
- D-1961: `js/dungeon.js` — exported `has_ceiling(lev)` + `avoid_ceiling(lev)` in C order (if/return-TRUE/FALSE shape; `Is_earthlevel` added to the existing `./ Named: pre-existing exact `has_ceiling` clones in `js/dothrow.js`/`js/mon.js`/`js/potion.js` stay
- D-1960: `js/do.js` — exported `async better_not_try_to_drop_that(otmp)` in C order (`otmp?.otyp` guard, `!u_safe_from_fatal_corpse(otmp, st_all)` short-circui Named: none new — sink rings + Heart of Ahriman `finesse_ahriman`/`float_down` stay named on `dro
- D-1959: `js/dogmove.js` — exported `mnum_leashable(mnum)` in C order (`| 0` int idiom; `NUMMONS - 1` for HIGH_PM; `&&`/`||` short-circuit so `mons()` never re Named: caller wiring (function live, unwired): `quickmimic` body (`dogmove.c:1472+`, incl. the `:
- D-1958: new `js/mail.js` — exported `async readmail(otmp)` in C order (`void otmp` ARGSUSED; `game.iflags?.debug_fuzzer` early return; `await flush_topl_more( Named: MAILREADER `nh_getenv`/`child(1)`/`execl` spawn + `stat`-based `getmailstatus` (Rule #2: n
- D-1957: `js/mkobj.js` — exported `spot_time_expires(x, y, action)` in C order (same `(((x|0)&0xffff)<<16)|((y|0)&0xffff)` pack + `(kind|0)===TIMER_LEVEL && ac Named: caller wiring (function live, unwired): `nhlua.c` `has_timer_at`/`peek_timer_at`/`stop_tim
- D-1956: `js/light.js` — exported `async obj_adjust_light_radius(obj, new_radius)` in C order (`nr = new_radius | 0`; `ls.type === LS_OBJECT && ls.id === obj`  Named: caller wiring (function live, unwired): `mkobj.c:1704` `maybe_adjust_light` + bless/curse 
- D-1955: `js/vision.js` — exported `new_angle(lev, sv, row, col)` (`sv | 0` int idiom; unused params kept for C shape per the C comment), placed after `seenv_m Named: `#ifdef EXTEND_SPINE` staticfn body (`:413–451`) — compiled out in C, display-cosmetic T-w
- D-1954: `js/cmd.js` — exported `pmatch(patrn, strng)` in C order (thin wrapper, `ci=false`), placed before `pmatchi` in C declaration order with both wrappers Named: `sk` skip-set arm (`:119–127` fuzzy variant) — no C caller passes non-null sk (`pmatchz` d
- D-1953: `js/eat.js` — exported `tin_variety_txt(s, out)` in C order (`s != null && out` guard, no write on null; `-1` default; `TTSZ - 1` sentinel skip; `str_ Named: caller wiring (function live, unwired): `objnam.c:4386` readobjnam "tin of " arm (spinach 
<!-- landmarks:end -->
