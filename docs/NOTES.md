# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker (2026-09-06, human):** `scen-*` 7/275 is the held-out shape; mutants 255/278 saturated. Queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.

- **Parks (Parked rows; do not pop):** show_conduct stale-859→824, C-comment owner, DontAsk REGRESSES; ready_weapon Knight-92204 spin; mdrop_obj/dopush capture-point, ports no-op; dosearch grid-bug (2026-09-07, no D-log): PM_GRID_BUG search-pos split; falsifier = C per-turn mon pos (full probe in LOOP-QUEUE Parked); save_dungeon parked: true owners done_in_by/print_mapseen + dunlev_ureached; do_statusline2 lembas pair (2026-09-07, reverted, tree green): gate+meal-gate fix steps byte-exact but regress 7 fortress; falsifier = botl-parity iteration (full probe in LOOP-QUEUE Parked).
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.

## Don't re-check (≤15)

- D-1790…D-2054 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2054.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2054.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2054: `js/hack.js` — file-local `monstinroom(mndx,roomno)` (fmon scan, DEADMONSTER skip, `mnum ?? data.mndx` + local `in_rooms`, mirroring C pointer-equalit Named: BARRACKS `monstinroom` occupied-vs-abandoned + `wake_msg` canseemon text (same switch, unt
- D-2053: `js/spell.js` — port the dull arm in exact C order (before the interrupted-continue arm, after context creation): `!confused && !sleepRes && objdescr_ Named: `confused_book` body (still deferred in study_book + module header — neither blocked sessi
- D-2052: `js/uhitm.js` — `find_roll_to_hit` adds `Upolyd(u) ? youmonst.data.mlevel : u.ulevel`; `abon` early-returns `adj_lev(youmonst.data)-3` when poly'd (`a Named: `find_roll_to_hit` monk-armor/encumbrance/`utrap`/orc-vs-elf (RNG-free, no corpus demand);
- D-2051: `js/artifact.js` — after the blast-arm losehp, `await finish_maybe_wail()` (no-op unless the low-HP flag was set; C runs maybe_wail inside losehp befo Named: `showdamage` / `rehumanize` in losehp (pre-existing deferred, untouched — no blocked sessi
- D-2050: `js/polyself.js` — capture `wasBlind` at polymon entry with the C `Blind` predicate (same inline shape as `polyman`, incl. Named: `gulp_blnd_check` gate in `Blindf_off` (pre-existing map omit, untouched — neither blocked
- D-2049: `js/mhitu.js` — new `mhitm_ad_were_u(mtmp,mattk,mhm)` in the D-2043 `mhitm_ad_slow_u` shape: unconditional `await hitmsg(mtmp,mattk)` first (RNG-free  Named: `retouch_equipment(2)` after `set_ulycn` (same as eat.js cpostfx D-0945 — untouchable/reto
- D-2048: `js/u_init.js` — deleted the merge-survivor fill hunk; left a two-line C comment (`merge paths goto added, bypassing :1128–1140 — no setuqwep here`). Named: quiver-prefer merge, `addinv_before` reinsert, oname absorb, worn-slot merge, `how_lost` c
- D-2047: `js/monmove.js` — `const shopSkip = in_rooms(omx, omy, SHOPBASE) && (rn2(25) || mtmp.isshk)` with C short-circuit order (rn2 draws only in shop) gatin Named: `mon_would_consume_item` body (still stub false — own future row); `can_touch_safely` silv
- D-2046: `js/music.js` — both `yn_function` defaults `'y'`→`'q'` with hack.h:1330 citation; `if/else-if` gate mirroring C `:763–773` (`can_blow(game.youmonst)` Named: `Hero_playnotes` audio + `obj_to_instr` mapping (unobservable while the stub takes `_instr
- D-2045: `js/pager.js` — monster arm now: prefix `mon_glyph(mtmp).ch` (shown char, C encglyph; same source `look_all` uses); body `an(mlet_class_explain(mlet)) Named: mimic-disguised-as-furniture/object dispatch (C prints the furniture/object line with no m
- D-2044: `js/objnam.js` — `simpleonames` pluralizes via `makeplural(base)` when `((obj.quan ?? 1) | 0) !== 1` (missing quan reads as 1 — C always sets quan; sa Named: `addinv_core0` quiver-prefer merge (merge into uquiver before general merge), `addinv_befo
- D-2043: `js/mhitu.js` — `mhitm_ad_slow_u` in exact C mhitu-branch order (gate first, then hitmsg, then HFast+`rn2(4)` → awaited `u_slow_down`; leftover `d()`  Named: `mhitm_ad_slow` mhitm + uhitm branches (their own future rows; `mhitm_ad_were`-style mon→m
- D-2042: `js/dokick.js` — `await check_caitiff(mon);` with a C citation comment (`dokick.c:68`, sync in C / async in JS for the awaited pline, must await to ke Named: none new — every `kickdmg` callee is live; all ten `check_caitiff` sites now awaited.
- D-2041: `js/uhitm.js` — `mon_hates_silver` extends the pre-existing `./monsters.js` import (no new module edge per `imports.mjs --can`: already statically imp Named: none new — the silver-sear *message* (`msg_silver` plumbing, absent on every hmon weapon p
- D-2040: `js/uhitm.js` ranged branch — C-order boomerang tail after silver: `!thrown && obj===game.u?.uwep && obj.otyp===BOOMERANG && rnl(4)===3` (short-circui Named: none new — every arm callee is live (`rnl`, `uwepgone`, `useup`, `mon_nam`, local `yname`)
<!-- landmarks:end -->
