# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **break_armor park (2026-09-09, no js/):** Tourist-92171 step-88 More-transient; capture-timing, not logic. Falsifier + probe: LOOP-QUEUE Parked. Do not re-pop.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **Symptom-owner parks — do not re-pop (falsifiers: LOOP-QUEUE Parked):** obj_resists · m_move · rloc · lightdamage · mattackm/can_carry · spoteffects · mon_adjust_speed · zapyourself · doname_base · hmonas · minliquid_core.
- **Healer-92107 residual (D-2137 Next):** destroy double-count (`mhitu.js:901` `+=` vs C `(void)`); audit fire/elec arms.
- **STALE parks — do not re-pop (full falsifiers: LOOP-QUEUE Parked):** lesshungry · rndcurse · mhitm_ad_famn · regen_hp · barehands · do_mapping · adjattrib (look-path stale; live owner pick_lock feel/see@175).
- **slimed park:** comment-line owner; dual writer (landing gate + Sick store). Falsifier + probe: LOOP-QUEUE Parked.
- **vomiting_dialogue park (2026-09-09, no js/):** MISATTRIBUTED + stale (residual: touch_artifact@92). Falsifier + probe (`verify vomiting_dialogue --base 109f4444`): LOOP-QUEUE Parked. Do not re-pop.
- **doturn park (2026-09-09, no js/):** STALE OWNER (HEAD find_trap@75). Genuine gnostic fix + proof: LOOP-QUEUE Parked. Do not re-pop.
- **u_stuck_cannot_go park (2026-09-09, no js/):** MISATTRIBUTED + stale (step-172 key `n` = move path, true writer escape_from_sticky_mon D-2158; live residual do_statusline2@200). Falsifier + probe (`verify u_stuck_cannot_go` 0 PASS/1 moved): LOOP-QUEUE Parked. Do not re-pop.

## Don't re-check (≤15)

- D-1790…D-2168 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2168.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2168.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2168: 
- D-2167: 
- D-2166: 
- D-2165: port the C arm in exact order — `monstunseesu(M_SEEN_MAGR)` (live import), killer format/name, `ugrave_arise = NON_PM`, `await done(DIED)`, `return` ( Named: ZT_DEATH disintegration-breath arm (C zap.c:4465–4490: Disint_resistance, inventory_resist
- D-2164: one line per clone — `otmp/obj.in_use = false; /* C invent.c:1326 — no longer in use */` as the first statement of the quan>1 branch. Named: none new — the clones stay clones (still missing `update_inventory`/`setnotworn`/`freeinv`
- D-2163: `link_doors_rooms(); remove_boundary_syms();` before `map_cleanup()` in `load_wizard3`, C order + house comment (remove_boundary is a no-op here — no  Named: other des loaders still lack the epilogue `link_doors_rooms()` (tower1/2/3, wiz_fila/filb,
- D-2162: `if (u_wield_art(ART_OGRESMASHER)) result = 25;` in acurr; `if (u_wield_art(ART_OGRESMASHER)) lolimit = hilimit;` in extremeattr, in exact C branch po Named: none in these arms — both C branches are live. (Sibling acurr arms STR-GoP / CHA-nymph / I
- D-2161: new exported async `drain_en(n, max_already_drained)` in `js/trap.js` (C-faithful home; `rnd`/`You_feel`/`game.disp.botl` already live there) in exact Named: none in this arm — every C branch of AD_DREN + drain_en is live. (Pre-existing gulpmu omis
- D-2160: new `p === SICK` arm in exact C order and short-circuit: `find_delayed_killer(SICK)`; food poisoning (`!(usick_type&SICK_NONVOMITABLE)`, short-circuit Named: none in this arm — every C branch is live. (Pre-existing `make_sick` cure-condition shape 
- D-2159: full C port in exact branch order and short-circuit (JS `feedback` flag for C `goto give_feedback`; garlic FALLTHROUGH preserved). Named: none in this function — every C branch is live (`fpostfx` feedback deferral needs no call;
- D-2158: new exported async `escape_from_sticky_mon(x, y)` in `js/hack.js` (C-faithful home) in exact C order and short-circuit; `m_next2u` inlined as `dx*dx+d Named: `air_turbulence`, `slippery_ice_fumbling` stay named in `domove` (untouched, irrelevant to
- D-2157: exact C ring — `limits = circle_ptr(range)`, `offset = limits[|y − ls.y|]`; `circle_ptr` exported from `js/vision.js` (was module-private; the table i Named: LSF_NEEDS_FIXUP; hero at_hero_range duplicate-source trim (OR-idempotent, perf only); per-
- D-2156: port the C block in exact branch order and short-circuit: fatal-corpse `wishedfor=1` via live `u_safe_from_fatal_corpse`/`st_all` (dynamic `pickup.js` Named: pre-existing makewish defers unchanged (`wish_history_add/menu`, `wishcmdassist`, MAXWISHT
- D-2155: new `damageum_ad_cold(mdef, mhm)` in `js/uhitm.js` in exact C order and short-circuit (negate-TRUE first; Blind-gated frost pline via house `Blind_tha Named: `defended(mdef, AD_COLD)` worn walk (no JS export; same omit on every defended site, comme
- D-2154: `pmname_neutral` now returns `pmnames[mndx]?.[NEUTRAL] ?? 'monster'` with the C cite (`mons[i].pmnames[NEUTRAL]`); `pmnames, NEUTRAL` join the existin Named: unchanged from D-0126 and still named in `js/insight.js` header + map: `set_vanq_order` fo
<!-- landmarks:end -->
