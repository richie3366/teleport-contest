# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail + falsifier in LOOP-QUEUE Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in LOOP-QUEUE Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss /
  gameover heading / keep_status, stock_room engraving, inside_shop clone,
  level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu,
  lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`,
  pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu,
  medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1931 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1931 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774;
  findone tail D-1775. Do not revert D-0078 H2344 / offx 72
  (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap`
  dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX
  (D-1189). Never FORCE the falsified
  mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858; 0/5 rows are stale refill dupes (closed D-1885) — check `load_val_*`/`load_sam_*` before re-refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1931.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1931.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1931: exported `mshot_xname(obj)` from `js/objnam.js` in C order (xname, then `m_shot.n > 1 && m_shot.o === otyp` guard with `| 0` int semantics, `` `the ${ Named: `mthrowu.c:801–813` sink/miss end-of-path (`The(mshot_xname(singleobj))` arms — flight-end
- D-1930: `js/weapon.js` — C-order ports in C branch order: artifact loop `oclass && oartifact && touch_artifact(otmp, mtmp) && ((strong && !shield) || !oc_big) Named: `can_touch_safely` inside `oselect` (`mon.c:1957–1974` — corpse petrify/rider + silver + `
- D-1929: `js/weapon.js` — C-order ports of all four arms in C branch order (blessed `Is_weapon && blessed && mon_hates_blessings` +2; spear `is_spear && kebaba Named: `dothrow.js:354` / `u_init.js:1037` file-local `is_spear` clones kept (not this cluster); 
- D-1928: `js/zap.js` — file-local `bhit_skiprange` (C staticfn shape, `Math.trunc` int division, `rnd` 1..n, `skipend >= tmp` clamp); rock setup (`THROWN_WEAPO Named: THROWN_WEAPON fly callers (throwit inlines those); `is_pick`/`shkcatch` pick (`:3887–3892`
- D-1927: `js/do_wear.js` — added `takeoff_ok(obj) { return equip_ok(obj, true, false); }`; deleted `takeoff_lets` + `getobj_takeoff` (57 lines); `dotakeoff` ca Named: uskin merged-with-skin (`do_wear.c` `:1840–1845`, needs GRAY_DRAGON_SCALES constants); `di
- D-1926: `js/pickup.js` — exported `check_autopickup_exceptions` (C-order walk over `game.apelist`, `makesingular(doname(obj))` + `regex_match`, null on empty) Named: AUTOPICKUP_EXCEPTION option parsing — no `game.apelist` producer (options.c), so the excep
- D-1925: `js/explode.js` — C-order ports of every arm above: mdef + expltype negation right after the olet preamble; grabbed/grabbing/grabxy from `ustuck`/`usw Named: You_hear Underwater/Unaware prefixes (no live Unaware export — D-1919 map note); ugolemeff
- D-1924: `js/trap.js` — C-order full body, no new imports (all names live on existing edges: `FAILEDUNTRAP`/`TOOKPLUNGE`/`FORCETRAP` from `js/const.js`, `Fumbl Named: poly-form `locomotion()` verbs beyond Lev/Fly (file-local `u_locomotion_pit` keeps the hel
- D-1923: `js/objnam.js` — C-order full body on a head/excess split (no recursion): strip, `'s` arm, `singplur_lookup_plural` (file-local, full `as_is[]` 8+25 + Named: impossible("plural of null?") `:2841` log on null/empty (async pline chain through `urgent
- D-1922: `js/trap.js` — C-order full body: `!rn2(40) || (is_pit && m_easy_escape_pit(mtmp))` (short-circuit kept; the file-local `m_easy_escape_pit` and `sobj_ Named: `trapeffect_selector` arm coverage still partial (arrow/anti-magic/… named at the selector
- D-1921: `js/mhitu.js` — C-order midnight arm (`is_undead(mdat) || is_vampshifter(mtmp)` from live `js/monsters.js`, `midnight()` from live `js/calendar.js`);  Named: full `mhitm_adtyping` arms beyond `mhitm_adtyping_u` (AD_FIRE hero, ACID/WERE/HEAL/SGLD/TL
- D-1920: `js/mhitm.js` — full C-order port: `newtype = little_to_big(oldtype)` (canonical `js/mondata.js` export, same-SCC import already present); victim arm  Named: none new — `monsndx` has no JS export (existing `data?.mndx ?? mnum ??
- D-1919: `js/mhitm.js` — local `mswingsm` (C `:1282–1297` order; `game.flags?.verbose !== false` repo idiom + local `Blind_slee()` + `mon_visible`; `is_pole`/` Named: `thrwmm` ranged AT_WEAP arm (mthrowu `monshoot` is a local clone, not an export — distant 
- D-1918: `liveWwalking()` closure (same slot+flats+`Is_waterlevel` idiom as the snapshot) read at the three post-boots points (`if (Wwalking)` burns-you gate,  Named: none new.
- D-1917: C-order wiring in `js/were.js`: `const mba = mon_break_armor(mon, false)` (canonical `js/worn.js` export, D-1914) then `possibly_unwield`, chained syn Named: `monflee` onscary (`svc.context.mon_moving` + mux/muy scary-near arm); file-level howl `Yo
<!-- landmarks:end -->
