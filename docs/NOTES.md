# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (2026-09-05, HEAD c209ccc7):** queue premise stale (859/show_conduct @baf24c95; at HEAD 824 x_monnam). C screen = data.base `* wizard` entry (Ebenezum), never conduct; owner insight.c:2122 is a C comment. True chain: getpos ':' = LOOK_VERBOSE → do_look `:1942-1952` checkfile(…, chkfilDontAsk, …), pass 1 alt="wizard" shows entry, pass 0 same-offset skip; pending message-more serviced blocking before menu paints. Falsified this iter: DontAsk-flags alone REGRESSES 859→824 (JS reaches checkfile at turn 824; traced `_toplin=NON_EMPTY` at look pline vs C NEED_MORE). Reverted. Probe: data.base has exactly ONE entry matching "human wizard" (`* wizard`, key line 5979 → Ebenezum body 5981), so post-timing-fix the flags arm displays the identical entry. Next: display-timing iteration (pending-more flush before window display? yn cmdq REPEAT interplay?) must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail + falsifier in LOOP-QUEUE Parked.
- **Park `dopush` (mimic-viz, not the push):** explore-seed0116-wizard-wear-shop-cfabc006 step 127/175, single cell r13c32 = map (33,12): C `` ` `` vs JS `·`. RNG 12853/12853; only 127 differs. Push faithful (hero (32,10)→(33,10), boulder #223→(34,10)). Mimic id229 (M_AP_OBJECT BOULDER 475); JS blind 126/127, sees 128. 114→127: boulder-memory on entry; 116 search→floor; 117 restrap re-disguise; 118–126 OOS floor. At 127 C paints boulder: C sees IN_SIGHT, JS paints memory floor (no C memory writer runs at 127). Falsified/exonerated detail + falsifier in LOOP-QUEUE Parked. Re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849).
- **Refill rows must not cite the current D-ID:** finish-iteration archives EVERY open row mentioning it (cf. D-1876/erode_armor false archive).
- **Fortress guards.** Do not reopen display_inventory dismiss /
  gameover heading / keep_status, stock_room engraving, inside_shop clone,
  level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu,
  lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`,
  pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu,
  medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1879 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1879 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774;
  findone tail D-1775. Do not revert D-0078 H2344 / offx 72
  (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap`
  dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX
  (D-1189). Never FORCE the falsified
  mineralize TRC (76,14)/(77,14) (D-1849).
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip
  painting spaces or emit mid-row space runs >4 (D-0931). Do not
  FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
  Do not blanket-restore overlay `_pending_message` (D-0929).
  Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) /
  skip `tutorial()` (D-1066). Do not skip D-1067…D-1879.
- Do not import `monmove.js` `sticks` for sit / rewrite
  `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) /
  bones→options fruitadd (D-1541). No `reset_glyphmap` /
  `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`.
  No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No
  static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`.
  Do not re-port D-1682…D-1879.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1879: the three dismiss sites now `await dismiss_nhw_menu({ keep_status: true })` — corner takes the `docorner` path (status kept, C-cited comment), fullscr Named: identical hand-rolled `docrt()` corner dismisses in `js/pickup.js` loot/pickup loops (same
- D-1878: ported the three C livelog arms in C order with C comments: `pluslvl` snapshots `count_achievements()`, records the rank achievement, logs `%sgained e Named: `SoundAchievement` `sa2_xplevelup`/`sa2_xpleveldown` (no SND_LIB); `losexp` level-1 `done(
- D-1877: split the arm — ESC still dismisses (returns `'q'` → `ECMD_OK`, same outcome as C cancel); `q` now `tty_nhbell()` + `continue`, with C citation. Named: space/CR on the single-page whatis menu (C finishes with n=0 → dismiss + `ECMD_OK`; JS sti
- D-1876: `m_easy_escape_pit` as a file-local staticfn port (`data === mons[PM_PIT_FIEND] || msize >= MZ_HUGE`); hero `Passes_walls()` (`u.Passes_walls || H ||  Named: poly-form `locomotion()` verbs (Lev/Fly only, same deferral as the three existing `u_locom
- D-1875: `dog_eat` gate C order — `sawpet` is `cansee+mon_visible`, second arm `canspotmon` (queue owner `glibr` was a `corpse`-substring misattribution; `glibr()` untouched). Named: none new (bee-jelly/unpaid-shop/rust-spit still deferred).
- D-1874: return `` `^        a trap (${nm})` `` with `first: nm` (C `firstmatch`, feeds `checkfile`) and `found: 1` (C resets `found = 1` after the supplement) Named: vibrating-square first-match arm (`add_cmap_descr` writes `an(x_str)`, not `a trap`, for `
- D-1873: async `artifact_hit` in C order — `isHero` (game.youmonst + sentinel + `_youmonst`), hero-pos `cansee` via `u.ux/uy`, `engulfing_u` + local `Blind()`, Named: `destroy_items`/`ignite_items` bodies on FIRE/COLD/ELEC (gates still burned; C may add `it
- D-1872: ported the four page-key arms into all three loops ahead of gacc/letter match (C switch order; `>` never finishes on the last page); PICK_NONE `:`/oth Named: `minimal_xname` itself still unported (`simpleonames` stand-in, D-0881; names already matc
- D-1871: async `zoo_mon_sound` in C order (gate; `hallu = Hallucination() ? 1 : 0` via the faithful youprop helper; `zoo_msg[rn2(2)+hallu]`; `await You_hear`,  Named: throne/beehive/morgue/barracks/court You_hear plines still deferred (RNG-only stubs unchan
- D-1870: new `mhitm_ad_drli_u` in `js/mhitu.js` in C order (hitmsg; short-circuit `!rn2(3) && !Drain_resistance() && !mgc_negated(TRUE)` → `losexp('life draina Named: uhitm + mhitm arms of `mhitm_ad_drli` (Stormbringer `d(2,6)`, mhpmax/level-drain body, Dea
- D-1869: port `mkswamp` into `js/mklev.js` in C order (short-circuit, RNG, mutation). Named: none new (map `mkshop` wizard/SHOPTYPE arm and shk bodies unchanged).
- D-1868: door block restructured to C order with the `amorphous(mdat) && !engulfing_u(mon)` exemption (`can_fog` stays a commented named-omit); ALLOW_DIG curse Named: `can_fog` (vampshifter) still deferred in the door arm (comment + map); corrupt-ttyp `impo
- D-1867: `js/dungeon.js` `save_dungeon_topology()` / `restore_dungeon_topology()` over `LEVEL_MAP` + quest/sokoban/mines/tower/tutorial dnums (mirrors `struct  Named: `game.dungeon_topology` vestigial round-trip kept as-is (only `Is_airlevel` read in `hack.
- D-1866: default `menuinvertmode: 1` in `g.iflags` init (rc `...opts.iflags` spread still overrides) + parse `OPTIONS=menuinvertmode:N` colon-compound per `opt Named: `doset` Comp `menuinvertmode` row still shows hardcoded `val: '1'` (now true by default; n
- D-1865: `dmgval(otmp, game.youmonst)` + C-citation comment (`dmgval(otmp, mdef)`, `weapon.c:215`). Named: file-local `do_stone_u` clone killer attribution (`make_stoned(5,0,kformat,kname)`, `uhitm
<!-- landmarks:end -->
