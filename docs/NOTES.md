# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **More-transient parks — do not re-pop (see Parked):** break_armor (Tourist-92171 step-88 capture-timing, not logic).
- **do_statusline2 park — do not re-pop (see Parked):** row-23 value diffs are paint-timing, not renderer content (renderer/formula/data verified C-faithful); falsifier + probe in the Parked entry.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **Symptom-owner parks — do not re-pop (see Parked):** obj_resists · m_move · rloc · lightdamage · mattackm/can_carry · spoteffects · mon_adjust_speed · zapyourself · doname_base · hmonas · minliquid_core · distfleeck.
- **STALE parks — do not re-pop (see Parked):** lesshungry · rndcurse · mhitm_ad_famn · regen_hp · barehands · do_mapping · adjattrib (look-path stale; live owner pick_lock feel/see@175) · from_what (identical-topline menu diff; PASS at HEAD) · look_at_monster (class-explain prefix via D-2045; PASS at HEAD) · formatkiller (tombstone wrap; dirty-tree capture; G_UNIQ live D-0313) · do_screen_description (step-56 passes at HEAD; moved trapeffect@72 zero-diff) · reveal_terrain (steps 0–23 exact; live div prinv@67).
- **slimed park:** comment-line owner; dual writer (landing gate + Sick store). Falsifier + probe: LOOP-QUEUE Parked.
- **MISATTRIBUTED/STALE parks — do not re-pop (see Parked):** vomiting_dialogue (residual touch_artifact@92) · u_stuck_cannot_go (step-172 key `n` = move path; residual do_statusline2@200) · name_to_monplus (elf-lord box PASS via D-2001; alt-table rest is singletons) · mcast_death_touch (writer unidentified; body port PROVEN no-movement) · save_dungeon (stale dup; recipes lack `S`/`^S`; residual killer.format probe) · dodown (muse.c:2017 hurls More-timing) · mv_bubble (clamp suspect falsified; writer pre-pickup placement, machine-owned by collect_coords) · one_characteristic (tie-break; residuals Unchanging-block / inv_weight-Δ37) · use_pole (comment-line owner; PASS at HEAD — dirty rescore) · trapmove (stiffening/yawn PASS at HEAD; Norep tie-break; writers stoned/sleep_dialogue live).

## Don't re-check (≤15)

- D-1790…D-2201 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2201.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2201.

## Landmarks (≤15)

<!-- landmarks:begin -->
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
- D-2189: port the three arms in C order. Named: none new.
- D-2188: port the arm in C order — `glyph_at` read, `mon.mundetected = 0`, `x_monnam(ARTICLE_A, null, SUPPRESS_SADDLE|AUGMENT_IT, false)`, find-by-bumping bran Named: none new.
- D-2187: `js/objnam.js aobjnam` prepends `` `${quan} ` `` when `((quan ?? 1)|0) !== 1` (missing quan reads as 1, same guard as `simpleonames`/`xname`; C always Named: none new.
<!-- landmarks:end -->
