# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Calibration (human, 2026-10-13 — §10.20):** held-out (22/44, RNG
  51.8 %) loses on shapes the generator under-produces; fresh cohorts pass
  79–88 % on arrival. Falsify: a new family whose fresh cohort passes
  ≤ 60 % on arrival names a held-out shape; ≥ 85 % means it is not one.
  Falsified 2026-10-13 (don't re-check): start regime (legacy, tutorial
  prompt, default symset, interactive chargen — 68/68 C-recorded probe;
  the only misses were the recorder's build-date banner on the version
  screen, an env artifact).
- **Recorder flake:** Priest-582706 re-recorded 2026-10-13 aborts at s1166 and reads PASS even on pre-D-3930 JS — not a port fix.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms. Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **Shipped writers — do not re-pop/re-check:** toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua gate, paint audited); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split); gulpmu engulf vision_off ungate (D-3863, stale-'I' unmap); mbodypart/m_move/mfndpos/searches (D-3906, soko-prize linkage live).
- **nhl_gamestate (D-3885 UNPORTABLE):** Priest-582706 s1166 steed-impossible needs C malloc reuse; recorder flaky there (ASLR). Never a port row (D-3895/D-3905).

## Don't re-check (≤15)

- D-1790…D-3932 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3932.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3932 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3932: js/mhitu.js only — `if (game.program_state?.gameover) return;` after mdamageu (C-cited comment; lifesave returns with gameover false and falls through Named: none new in the gated arm.
- D-3931: js/mklev.js only — the arm now calls `lspo_terrain(selection_match_mapfrag('w'), 'W')` (same-module live export + hoisted sibling, no new edge) with a Named: load_hellfill rnd_hell_prefab arms (hells[2]/[4]/[6] percent gates) + hells[4] horizontal 
- D-3930: new extractor `scripts/extract-quest-text.py` (shares the parser of extract-quest-nemesis.py) → `js/generated/quest_text.js` `QUEST_ROLE_MSGS[msgid][R Named: none in the role tables; `common` section stays hand-kept in QUEST_COMMON / QUEST_CUSS_ARR
- D-3929: js/mklev.js only (+8: comment + `remove_boundary_syms()` call before wallification, C order). remove_boundary_syms itself unchanged (already faithful, Named: link_doors_rooms (C:6464; doors-only orientation+registration — C doorct=1 vs JS 0 measure
- D-3928: js/questpgr.js only (data): Cav firsttime body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. blank line after «quest.» and double s Named: none — QUEST_FIRSTTIME now covers all 13 role filecodes (Arc/Bar/Pri/Wiz + Hea/Kni/Ran/Rog
- D-3927: `js/hack.js` only — gate replaced with the C call `goodpos(x, y, game.youmonst, 0)` (no new import; hack↔teleport static pair is long-standing and run Named: none new — crawl_destination now whole vs C `:4079–4101` (gate + all five arms live). good
- D-3926: `js/monmove.js` only — else arm resolves the live `demon_talk` (dynamic `import('./minion.js')`, the sounds.js:1717 MS_BRIBE-site pattern; `imports.mj Named: none new — Demonic Blackmail now whole vs C `:802–825` (both arms live). demon_talk body u
- D-3925: `js/mhitu.js` only — `acid_damage` added to the existing `./trap.js` import (line 111 edge, no new edge; mhitm edge ALREADY per `imports.mjs --can`);  Named: none new in the ported arm (AD_ACID now whole vs C `:2464–2481`).
- D-3924: `js/uhitm.js` only — the passive `Antimagic` const now OR-reads `uprops[ANTIMAGIC]` intrinsic/extrinsic alongside the flats (Free_action `:3271` shape Named: sibling flat-only reads keep the per-site OR-read migration for their own cliffs (same C-w
- D-3923: `js/mhitm.js` only — `Cold_resistance()` now OR-reads `uprops[COLD_RES]` intrinsic/extrinsic alongside the flats (sit.js `:580` shape, precedented for Named: sibling flat-only `Cold_resistance` clones keep the per-site OR-read migration for their o
- D-3922: Bar + Pri gotit bodies verbatim (EQUAL ×6) + meta ×2. Named: remaining gotit roles no session reaches (Cav/Hea/Kni/Mon/Ran/Sam/Tou/Val/Wiz).
- D-3921: js/sit.js only — `has_intr` OR-read + `clear_intr` dual-write helpers, all 11 arms in C order with unchanged messages/ret/extra blocks (telepat see_mo Named: none new — attrcurse now whole vs C `:644–762` (all 11 arms incl. telepat/see_invis extras
- D-3920: js/questpgr.js only (data): Val goal_next body verbatim from quest.lua (TEXT EQUAL; `%ns` shipped) + doc role list. Named: remaining goal_next bodies no session reaches (7 roles: Cav/Hea/Mon/Rog/Sam/Tou/Wiz).
- D-3919: wired the C term in C order (uswallow → ustuck-hugs → Levitation), mirroring the canonical's exact expression: `sticks` via the monmove.js re-export ( Named: usteed P_RIDING < P_BASIC (C :201), uundetected ceiling-hider (C :203) — pre-existing, unt
- D-3918: hurtle guard reads live uball (youprop.h:77), never dead u.Punished; probe PASS. Named: none new.
<!-- landmarks:end -->
