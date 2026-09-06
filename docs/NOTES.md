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

- D-1796…D-1959 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1959 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-1959.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-1959.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1959: `js/dogmove.js` — exported `mnum_leashable(mnum)` in C order (`| 0` int idiom; `NUMMONS - 1` for HIGH_PM; `&&`/`||` short-circuit so `mons()` never re Named: caller wiring (function live, unwired): `quickmimic` body (`dogmove.c:1472+`, incl. the `:
- D-1958: new `js/mail.js` — exported `async readmail(otmp)` in C order (`void otmp` ARGSUSED; `game.iflags?.debug_fuzzer` early return; `await flush_topl_more( Named: MAILREADER `nh_getenv`/`child(1)`/`execl` spawn + `stat`-based `getmailstatus` (Rule #2: n
- D-1957: `js/mkobj.js` — exported `spot_time_expires(x, y, action)` in C order (same `(((x|0)&0xffff)<<16)|((y|0)&0xffff)` pack + `(kind|0)===TIMER_LEVEL && ac Named: caller wiring (function live, unwired): `nhlua.c` `has_timer_at`/`peek_timer_at`/`stop_tim
- D-1956: `js/light.js` — exported `async obj_adjust_light_radius(obj, new_radius)` in C order (`nr = new_radius | 0`; `ls.type === LS_OBJECT && ls.id === obj`  Named: caller wiring (function live, unwired): `mkobj.c:1704` `maybe_adjust_light` + bless/curse 
- D-1955: `js/vision.js` — exported `new_angle(lev, sv, row, col)` (`sv | 0` int idiom; unused params kept for C shape per the C comment), placed after `seenv_m Named: `#ifdef EXTEND_SPINE` staticfn body (`:413–451`) — compiled out in C, display-cosmetic T-w
- D-1954: `js/cmd.js` — exported `pmatch(patrn, strng)` in C order (thin wrapper, `ci=false`), placed before `pmatchi` in C declaration order with both wrappers Named: `sk` skip-set arm (`:119–127` fuzzy variant) — no C caller passes non-null sk (`pmatchz` d
- D-1953: `js/eat.js` — exported `tin_variety_txt(s, out)` in C order (`s != null && out` guard, no write on null; `-1` default; `TTSZ - 1` sentinel skip; `str_ Named: caller wiring (function live, unwired): `objnam.c:4386` readobjnam "tin of " arm (spinach 
- D-1952: `js/mklev.js` — exported `is_solid(x, y)` in C order (`!isok(x | 0, y | 0) || IS_STWALL(...)`, `||` short-circuit so `at()` never reads out of bounds; Named: caller wiring (functions live, unwired): `populate_maze` / `makemaz` stair arms / `create_
- D-1951: `js/artifact.js` — exported `disp_artifact_discoveries(lines)` (null lines ≡ WIN_ERR count-only; A_NONE prints "non-aligned" since JS `align_str` has  Named: discosort `'s'` sortloot order (`sortloot_descr` needs `loot_classify`, `invent.c:149–305`
- D-1950: `js/mklev.js` — exported `On_ladder(x, y)` in C order (`stairway_at(x | 0, y | 0)` then `!!(stway && stway.isladder)` for C boolean; `| 0` int idiom p Named: caller wiring (function live, unwired): `dig.c:1812` `adj_pit_checks` ladder + `supporting
- D-1949: `js/steed.js` — exported `exercise_steed()` in C order (`!u.usteed` early return; `| 0` int idiom, which also covers fresh JS saves where `urideturns` Named: none new — the domove steed envelope around the call site stays as named in `c-js-map/turn
- D-1948: `js/monsters.js` — exported `mon_hates_light(mon)` (`return hates_light(mon?.data)`), placed directly after `hates_light` beside the sibling `mon_hate Named: caller wiring (function live, unwired): `uhitm.c:1039` hitmsg `lightobj` arm has no JS sym
- D-1947: `js/mthrowu.js` — exported `async ucatchgem(gem, mon)` in C order (`| 0` int idiom; `game.youmonst?.data` per the allmain/apply idiom; `gem_xname` the Named: `m_throw` envelope still named per review 296 (pre-existing, not this arm): `thrwmu` alway
- D-1946: `js/vault.js` — exported `move_gold(gold, vroom)` in C order (ox/oy saved before extract since C reads them post-extract; `obj_extract_self` → `newsym Named: caller wiring (function live, unwired): `wallify_vault` body (still stub — wall repair / w
- D-1945: `js/steal.js` — exported async `stealamulet(mtmp)` in C order (`!--n` pre-decrement pick; `++n` + trailing-target sweep shape, last match wins before  Named: caller wiring (function live, unwired): `mhitm_ad_samu` `!rn2(20)` arm (`uhitm.c:4584` — n
<!-- landmarks:end -->
