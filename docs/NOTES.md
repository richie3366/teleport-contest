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

- D-1790…D-2045 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2045.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2045.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2045: `js/pager.js` — monster arm now: prefix `mon_glyph(mtmp).ch` (shown char, C encglyph; same source `look_all` uses); body `an(mlet_class_explain(mlet)) Named: mimic-disguised-as-furniture/object dispatch (C prints the furniture/object line with no m
- D-2044: `js/objnam.js` — `simpleonames` pluralizes via `makeplural(base)` when `((obj.quan ?? 1) | 0) !== 1` (missing quan reads as 1 — C always sets quan; sa Named: `addinv_core0` quiver-prefer merge (merge into uquiver before general merge), `addinv_befo
- D-2043: `js/mhitu.js` — `mhitm_ad_slow_u` in exact C mhitu-branch order (gate first, then hitmsg, then HFast+`rn2(4)` → awaited `u_slow_down`; leftover `d()`  Named: `mhitm_ad_slow` mhitm + uhitm branches (their own future rows; `mhitm_ad_were`-style mon→m
- D-2042: `js/dokick.js` — `await check_caitiff(mon);` with a C citation comment (`dokick.c:68`, sync in C / async in JS for the awaited pline, must await to ke Named: none new — every `kickdmg` callee is live; all ten `check_caitiff` sites now awaited.
- D-2041: `js/uhitm.js` — `mon_hates_silver` extends the pre-existing `./monsters.js` import (no new module edge per `imports.mjs --can`: already statically imp Named: none new — the silver-sear *message* (`msg_silver` plumbing, absent on every hmon weapon p
- D-2040: `js/uhitm.js` ranged branch — C-order boomerang tail after silver: `!thrown && obj===game.u?.uwep && obj.otyp===BOOMERANG && rnl(4)===3` (short-circui Named: none new — every arm callee is live (`rnl`, `uwepgone`, `useup`, `mon_nam`, local `yname`)
- D-2039: `js/do.js` `prev_level` — C-order branch arm: Dlvl1 (`!(uz.dnum) && uz.dlevel===1`) without the Amulet → dynamic `import('./end.js')` + `await done(ES Named: `invent.c` `addinv_core1 :960–1007` uhave/achievement family (`u.uhave.amulet/menorah/bell
- D-2038: `js/vision.js` — center constant `0`→SVALL + comment citing `display.c:3358–3362`. Named: none new — `gather_locs`, `auto_describe`/`self_lookat`, `known_branch_stairs`/`stairway_a
- D-2037: `js/detect.js` — `find_trap` now in C order: `feel_newsym`; `Hallucination() || glyph_at(tx,ty) !== trap_to_glyph(trap)` (tty-cell→id normalization pe Named: none new — every `find_trap` callee is live (`cls`, `map_trap`, `display_self`, `docrt`, `
- D-2036: `js/uhitm.js` — new `hmon_hitmon_weapon` dispatch verbatim (melee/thrown callers keep exact behavior except the four ranged arms, which now draw `rnd( Named: ranged-arm silver-sear *message* (`hmon_hitmon_msg_silver` — `hmon` has no `msg_silver` pl
- D-2035: `js/timeout.js` — new `!(next & TIMEOUT) && p === STRANGLED` arm after SLIMED in C order (killer init mirrors the STONED arm; `done_timeout(DIED, STRA Named: none new — `done`/`Die?`/`savelife` (end.js), `useup` (invent.js), `choke_dialogue` all li
- D-2034: `js/end.js` — new `give_to_nearby_mon` verbatim from C (loop/guard order, `!rn2(nmon)` reservoir, `can_carry`→`add_to_minv` else `place_object`; the e Named: `drop_upon_death` mtmp/cont arms (`add_to_minv(mtmp)` / `add_to_container`) + `artifact_li
- D-2033: `js/mhitu.js` — new `mhitm_ad_famn_u` (pline_mon reach-out, exercise(A_CON), morehungry(rn1(40,40)) unless fainted, leftover d() kept); `js/mhitm.js` — non-eater zero + mdamagem dispatch. Named: none — dead uhitm arm documented, all callees live.
- D-2032: `js/read.js` — new `seffect_fire` in C order (already_known before useup; dam `Math.trunc((2*(rn1(3,3)+2*cval)+1)/3)`; useup + `learnscrolltyp(SCR_FIR Named: none — every arm's callee is live (`explode`, `burn_away_slime`, `shieldeff`, `getpos` fam
- D-2031: `js/potion.js` — Strangled gate first (uprops intrinsic per the C macro, plus flat `u.Strangled` for the same C value per the `do.js` danger_uprops du Named: none new — every arm's callee is live (`djinni_from_bottle` D-1144, `drinkfountain` D-0237
<!-- landmarks:end -->
