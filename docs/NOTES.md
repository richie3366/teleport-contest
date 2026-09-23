# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (one line each, class +
falsifier; proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Do not list them
here again. Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  `port-coverage.mjs` MISSING/THIN count falls ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5 Wizard `doopen_indir` + W6 Caveman overload-gate remain as corpus-residual Open rows (detail in D-2420); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 Healer-92107 `mhitm_ad_cold_u` extra destroy return; W2 Satiated pair = eat-progress `uhs`/botl timing — both are corpus-residual Open rows (detail in D-2425). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-2774 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-2774.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-2774.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2774: whole C bodies in C order with `:line` cites: `objsymvals` table; `set_menuobjsyms_flags(n, iflagsBag)` (bit 1 → menu_head_objsym, bits 2|4 → use_menu Named: `config_error_add("Illegal %s parameter")` sink (file precedent); `nul_glyphinfo`/NO_COLOR
- D-2773: new async `doset_optfn_do_handler(name)` = the three do_handler arms in C order (versinfo: snapshot `vi`, await `handler_versinfo`, `'%s' %s %u.` chan Named: `optfn_paranoid_confirmation` do_set token parser `:2837–3020` (allopt row keeps optfn nul
- D-2772: C-order port: numeric mlet = index in live `DEF_MONSYM_MLET` (`js/mondata.js`, defsym.h enum order, `S_ANT == 1`, so the signed compare is exact); `pu Named: none — whole C body live.
- D-2771: `js/glyphs.js` — module-local `sym_customizations[3][5]` grid (BSS-zeroed shape) + `PRIMARYSET`/`ROGUESET`/`NUM_GRAPHICS`/`UNICODESET` + `CUSTOM_*` co Named: `wizcustom_callback` (`wizcmds.c:1987–2028`, own coverage row — reads the deferred glyphma
- D-2770: `js/end.js` — live `await You(...)` at `:1286` (output-identical: `You`=vpline('You '+fmt), `pline`=vpline); named-ghost "the "+KILLED_BY at `:1314` v Named: none on this body — whole C body live; every callee live or exact-omit (monhealthdescr C-`
- D-2769: restarted the whole body in C order with per-arm `:line` cites: `(void) await set_vanq_order(true)` at `:2805`, cancel-return `if ((await set_vanq_ord Named: single-type yn `"ynq\033a"` ESC-pad simplified to 'ynq' (list_genocided precedent); headin
- D-2768: ported the whole body in C order into `js/pickup.js` (1:1 C home, module-local like C staticfn and the `doloot_core` precedent): `!rn2(3)` + inv_cnt(t Named: none on this body — whole C body live; every callee live (brief 18/18 + `dist2`/`SetVoice`
- D-2767: `js/uhitm.js` only for behavior — new `const AD_LEGS = 17` (monattk.h:59) + new `damageum_adtyping` AD_LEGS arm calling live same-file `damageum_ad_ph Named: poly `body_part` (pre-existing D-0928 #1131 name, map keeps it); `damageum_ad_phys` shade 
- D-2766: ported the whole body in C order into `js/wizcmds.js` (1:1 C home): hero-start cursor (`:893–894`); olfaction gate with ECMD_OK (`:895–898`); once-onl Named: none on this body — whole C body live; every callee live (brief 8/8 + `u_at`/`m_at`/`body_
- D-2765: ported all bodies in C order into `js/options.js` (1:1 C home): `optfn_msg_window` empty-optstr negated→'s'/else-'f' (`:2477–2478`), negated-with-valu Named: `config_error_add` sink (file precedent: 8 sites); symset file subsystem (`read_sym_file` 
- D-2764: ported all three bodies in C order into `js/cfgfiles.js`: `is_config_section` trim/bracket/comment arms, `!== null` pointer test so empty `"[]"` takes the section arm, current freed before CHOOSE check, strcmp filter. Named: `parse_conf_buf` caller (no JS dispatch); C input mutation owed; debugpline D_DEBUG-only.
- D-2763: ported the whole body in C order into `js/options.js` (home of the coloratt family): BUFSZ−1 copy (`:623-624`), first-'=' split with Malformed→FALSE ( Named: `config_error_add("Malformed MENUCOLOR")` sink (msgtype_add precedent); `cnf_line_MENUCOLO
- D-2762: ported all six bodies in C order: `handler_rebind_keys` redo PICK_ONE menu via live `select_menu_pick_one` (auto-letters ≡ tty_end_menu; `end_menu` pr Named: `bind->param` store (overlay is name-only; CMD_PARAM display already named in `dokeylist.j
- D-2761: restarted the body in C order with per-arm `:line` cites: `:565` hallucinate before the `:567-568` drink guard; `:569` `ltyp` via SURFACE_AT (D-1103); Named: none new on this body — whole C body live; every callee live (isok/SURFACE_AT/Hallucinatio
- D-2760: restarted the body in C order with per-arm `:line` cites: opoisoned + `resists_poison` head; quest-arti/obj_resists short-circuit; fx/fptr via LOW_PM/ Named: none new — whole C body live; every callee live (brief 4/4: obj_resists/find_pmmonst/peek_
<!-- landmarks:end -->
