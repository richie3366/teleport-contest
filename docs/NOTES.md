# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred; themed step-0 → `geom-probe`.
- **More-transient parks — do not re-pop:** break_armor (Tourist-92171@88 capture-timing).
- **do_statusline2 park — do not re-pop:** row-23 value diffs are paint-timing, not renderer (formula/data C-faithful); falsifier in Parked entry.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED silent.
- **next_ident:** arise live (D-2202); residual needs C dump.
- **Symptom-owner parks — do not re-pop:** obj_resists · m_move · rloc · lightdamage · mattackm/can_carry · spoteffects · mon_adjust_speed · zapyourself · doname_base · hmonas · minliquid_core · distfleeck.
- **STALE parks — do not re-pop:** lesshungry · rndcurse · mhitm_ad_famn · regen_hp · barehands · do_mapping · adjattrib (look-path stale; live pick_lock@175) · from_what (identical-topline menu diff; PASS) · look_at_monster (class-explain via D-2045; PASS) · formatkiller (tombstone wrap; dirty capture; G_UNIQ D-0313) · do_screen_description (step-56 passes; moved trapeffect@72) · reveal_terrain (steps 0–23 exact; live div prinv@67).
- **slimed park:** comment-line owner; dual writer (landing + Sick store); falsifier in Parked.
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue (residual touch_artifact@92) · u_stuck_cannot_go (move-key misattr; resid do_statusline2@200) · name_to_monplus (elf-lord PASS D-2001; alt-table singletons) · mcast_death_touch (writer unknown; body no-movement) · save_dungeon (stale; no `S`/`^S`; killer.format probe) · dodown (muse.c:2017 hurls More-timing) · mv_bubble (clamps falsified; pre-pickup writer) · one_characteristic (tie-break; Unchanging / inv_weight-Δ37) · use_pole (comment owner; dirty rescore) · trapmove (stiffening/yawn PASS; Norep tie-break).

## Don't re-check (≤15)

- D-1790…D-2204 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2204.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2204.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2204: `js/uhitm.js` only — wasinside arm in C position (after treasure/corpse, before newsym): `mtmp = { ...mtmp }` (C struct copy; link-field zeroing N/A,  Named: unchanged minus the retired line (flooreffects non-floor arms, floor-boulder nocorpse, MAI
- D-2203: `js/timeout.js` only — generic-loop `p === STUNNED` expiry arm in C order: re-arm flat `u.HStun = (HStun & ~TIMEOUT) | 1` (+ `u.Stunned` mirror) becau Named: unchanged — remaining silent-clear generic expiries (GLIB, VOMITING-expiry dialogue is liv
- D-2202: `js/end.js` only — full arise arm in C order (`in_mklev` + `makemon(NO_MINVENT)` with prev-restore; `!mtmp` fallback drop + `ugrave_arise = NON_PM` +  Named: unchanged — `obj_no_longer_held`; lamp `artifact_light`/`end_burn`; ebones; file compress,
- D-2201: `js/display.js` `_statusLine2` emits `BL_HUNGER`, `BL_CAP`, then rank-sorted `BL_CONDITION`, every predicate verbatim (Sick split into separate FoodPo Named: `cond_shrinklvl` abbreviations (`text[1]`/`text[2]`) — no corpus session needs them (all f
- D-2200: `js/display.js` — `await flush_topl_more()` first inside `docrt()`'s guarded body (after the in_docrt latch, before uswallow/vision arms): a pending - Named: make_hallucinated body still names (js/potion.js doc): EHalluc_resistance mask polish beyo
- D-2199: `js/trap.js` — `float_vs_flight` added to the existing static `./polyself.js` import (same edge as `polymon`/`body_part`/`mbodypart`; `imports.mjs --c Named: none new. (`reset_utrap(msg)` Lev/Fly restore arms — `float_up()` + `You("can fly.")` — st
- D-2198: `js/eat.js` — full royal-jelly fpostfx arm in C order (killer-bee `hero_form_data()?.mndx` + `Unchanging` morph break via live `polymon`; `gainstr(pie Named: none new. (done_eating envelope still names carrot blindness + EGG/other fpostfx otyps; mo
- D-2197: steed gate in C position (after inpool/inlava/infountain, before gremlin) with the youprop shape (flat cache or `(H||E)&&!B`, as in do.js); engulfing  Named: none new. (`mdrop_obj` verbosely-TRUE pline arm implemented though unreached from specials
- D-2196: port all seven arms in C order with identical draw sequences (same rn2 calls, same gates). Named: Soundeffect on throne/beehive arms (no audio backend); `Is_sanctum` in the temple gate (pr
- D-2195: harmless arm in C order — `const harmless = !!(obj && stone_missile(obj) && passes_rocks(mon.data))` (same expression shape as live `js/dothrow.js hit Named: none new.
- D-2194: canonical `defended` + full `resists_magm` (+ file-local `monsndx` = `(mndx ?? mnum ?? Named: `m_harmless_trap` default keeps returning FALSE (C `impossible()` on unknown ttyp stays na
- D-2193: port the C tail in order — `um_dist(mtmp.mx, mtmp.my, 1)` → `pline('Brrooaa... Named: none new.
- D-2192: full Helmet_on switch in C order: plain-helm breaks; CAUTION → live `see_monsters`; BRILLIANCE → inline `adj_abon` helm half (`:3331–3339`: makeknown  Named: HELM_OF_OPPOSITE_ALIGNMENT arm (`uchangealign` + FALLTHROUGH glow/curse unported; wears ta
- D-2191: `js/end.js` `savelife` only — `await curs_on_u()` (live `js/display.js`, same-file edge already imported), then the `uswallow → expels(ustuck, ustuck. Named: `savelife` make_sick TIMEOUT==1 cure, `!mon_moving endmultishot(FALSE)` (not live), livelo
- D-2190: pass the `'gloves'` literal with a C citation comment. Named: none new.
<!-- landmarks:end -->
