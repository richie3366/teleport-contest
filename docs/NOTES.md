# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **lookat park (2026-09-09, no js/):** MISATTRIBUTED + stale (pager.c:672 is the "gnomish wizard" comment, not a print; step-20 is hitum combat `Fh`, no look keys; clean-tree `verify lookat` 0/1 moved 20→77 next_ident). Falsifier + probe: LOOP-QUEUE Parked. Do not re-pop.
- **break_armor park (2026-09-09, no js/):** Tourist-92171 step-88 More-transient; capture-timing, not logic. Falsifier + probe: LOOP-QUEUE Parked. Do not re-pop.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **Symptom-owner parks — do not re-pop (falsifiers: LOOP-QUEUE Parked):** obj_resists · m_move · rloc · lightdamage · mattackm/can_carry · spoteffects · mon_adjust_speed · zapyourself · doname_base · hmonas · minliquid_core · distfleeck.
- **Healer-92107 residual (D-2137 Next):** destroy double-count (`mhitu.js:901` `+=` vs C `(void)`); audit fire/elec arms.
- **STALE parks — do not re-pop (full falsifiers: LOOP-QUEUE Parked):** lesshungry · rndcurse · mhitm_ad_famn · regen_hp · barehands · do_mapping · adjattrib (look-path stale; live owner pick_lock feel/see@175).
- **slimed park:** comment-line owner; dual writer (landing gate + Sick store). Falsifier + probe: LOOP-QUEUE Parked.
- **vomiting_dialogue park (2026-09-09, no js/):** MISATTRIBUTED + stale (residual: touch_artifact@92). Falsifier + probe (`verify vomiting_dialogue --base 109f4444`): LOOP-QUEUE Parked. Do not re-pop.
- **doturn park (2026-09-09, no js/):** STALE OWNER (HEAD find_trap@75). Genuine gnostic fix + proof: LOOP-QUEUE Parked. Do not re-pop.
- **u_stuck_cannot_go park (2026-09-09, no js/):** MISATTRIBUTED + stale (step-172 key `n` = move path, true writer escape_from_sticky_mon D-2158; live residual do_statusline2@200). Falsifier + probe (`verify u_stuck_cannot_go` 0 PASS/1 moved): LOOP-QUEUE Parked. Do not re-pop.
- **name_to_monplus park (2026-09-09, no js/):** STALE OWNER (elf-lord box fully PASS at HEAD via D-2001 d9e7079e MM_MALE; owner line 1001 is the alt_spl literal tie-break, both sides resolve "elf-lord" identically via the pmnames exact arm). Remaining alt-table/singularization/title_to_mon arms are singletons no corpus session reaches. Falsifier + probe: LOOP-QUEUE Parked. Do not re-pop.
- **mcast_death_touch park (2026-09-09, no js/):** SYMPTOM OWNER, writer unidentified (C female=1 yet prints "he"; step-71 dice only rn2(27)+d(8,6); all 17006 RNG matched; newmonhp+gender sequences identical both sides). A body port is PROVEN no-movement (baseline verify 0/0/1). Falsifier + probe (`verify mcast_death_touch`): LOOP-QUEUE Parked. Do not re-pop.
- **save_dungeon park (2026-09-09, no js/):** live Open row removed as stale dup of standing park. Current 6 blocked recipes all lack `S`/`^S`; C body has zero display/RNG. done_in_by G_UNIQ (`:195–205`) + mgivenname (`:270–282` `has_ebones?of:called`) verified LIVE in js/end.js:1190–1217 — residual is killer.format state or render path. Next: prefix-state probe (killer.format/geno/imitator at 92080 death step); heading (91118) + escape-HP trio need C-side measurement. Do not re-pop save_dungeon or queue a done_in_by body row.

## Don't re-check (≤15)

- D-1790…D-2181 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2181.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2181.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2181: `^W` arm captures `wishRes` and mirrors the C tail verbatim (CANCEL|FAIL → `reset_cmd_vars(true)`; else not-TIME → `reset_cmd_vars(multi < 0)`; TIME → Named: none new.
- D-2180: `js/options.js init_fruit_chain` now sets the SLIME_MOLD name entry to `"fruit"` (idempotent, before the existing early-return — mirrors C init order  Named: none new.
- D-2179: `js/detect.js find_trap` now reads the memory glyph — `(game.level.at(tx,ty).remembered_glyph.glyph|0)` defaulting to `NO_GLYPH` when absent (matches  Named: none new.
- D-2178: 
- D-2177: 
- D-2176: 
- D-2175: 
- D-2174: 
- D-2173: 
- D-2172: 
- D-2171: 
- D-2170: 
- D-2169: 
- D-2168: 
- D-2167: 
<!-- landmarks:end -->
