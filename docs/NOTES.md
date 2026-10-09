# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Marathons (architect, 2026-10-09 — §10.19):** held-out (18/44, RNG
  41.7 %, rngSteps 92.4 %) loses RNG to early cliffs in *long* sessions the
  344-step corpus never recorded; the marathon cohort finds them (50/160,
  RNG 74.7 %). Falsifier: `hidden-proxy families` long-family RNG % rising
  ~20 iters while `leaderboard.mjs` RNG % stays ~41.7 % ⇒ fix the generator
  (diff against `seed0360`/`seed4500`/`seed0030` key streams). Falsified:
  2026-10-06 "corpus already records the cliffs" (board +40, held-out flat).
  The bullets below are live writer leads for parked cliff owners.

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution:** port the value's writer, not the painter (region-heuristic owners).
- **disclose→enlightenment (measured):** Priest-92179 s100 display-stream-only (RNG 3081/3081); SYMPTOM-parked, proof in park archive.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
## Don't re-check (≤15)

- D-1790…D-3732 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3732) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3732.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3732 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3732: js/allmain.js: `if (g.program_state?.gameover) return;` after `nh_timeout()` and after `run_regions()` (C-cited comments; lifesave-safe: gameover stay Named: none new in the gated arms (lifesave/wizard-decline fall-through preserved per C).
- D-3731: js/display.js: new exported `vpline_flush_vision()` (exact vpline `:266–271` statements + in_pline guard); pline_after_consume's inline block replaced Named: none new in this arm — the prompt now performs vpline's full pre-paint sequence (recalc → 
- D-3730: js/apply.js only — the gate reads the live bit via the file's own `Underwater_hero()` (:1803 — `!!(game.u?.uinwater | 0)`, D-3400 idiom) with C cites  Named: bridge-over-lava lava arm (queued refill successor, same macro — see Next).
- D-3729: js/dothrow.js only — the gate reads `!(u.uinwater | 0)` with C cites (`:1793` + youprop.h:279); D-3400 idiom, no new edge, no import (u = game.u alrea Named: none new. throwit whole (ledger ported D-3383/D-3382/D-1346 stands).
- D-3728: js/music.js only — the gate reads `(u?.uinwater | 0)` with C cites (`:765` + youprop.h:279); D-3400 idiom, no new edge, no import (u = game.u already  Named: none new. do_play_instrument whole (ledger ported D-2046 stands).
- D-3727: js/do.js only — the gate reads `!(game.u?.uinwater | 0)` with C cites (`:277` + youprop.h:279); D-3400 idiom, no new edge, no import (game already imp Named: none new. flooreffects whole (ledger ported D-3240 stands; doc "Named omissions: none" sta
- D-3726: js/display.js only — the pool arm calls the live `is_pool(x, y)` (already imported from hack.js :16; no new edge) and reads `(game.u?.uinwater | 0)` w Named: none new. covers_objects whole (3-line C macro + :222 alias, all arms live).
- D-3725: js/invent.js only — the gate reads `(game.u?.uinwater | 0)` with C cites (`:5501` + youprop.h:279); D-3400 idiom, no new edge, no import (game already Named: none new. display_binventory whole (ledger ported stands; doc Named omit query_objlist PIC
- D-3724: js/steed.js only — the gate reads `(u.uinwater | 0)` with C cites (`:726` + youprop.h:279); D-3400 idiom, same expression as the use_saddle gate :281  Named: none new. dismount_steed whole (ledger ported D-1915/D-1627 stands); KNOCKED-caller omit d
- D-3723: js/steed.js only — the gate reads `(u.uinwater | 0)` with C cites (`:46` + youprop.h:279); D-3400 idiom, same expression as the can_ride disjunct :211 Named: none new. use_saddle whole (ledger ported D-2999/D-2328 stands).
- D-3722: js/steed.js only — the disjunct reads `(u.uinwater | 0)` with C cites (`:169–174` + youprop.h:279); D-3400 idiom, same expression as the mount_steed g Named: none new. can_ride whole (5-line C body, all arms live).
- D-3721: js/zap.js only — the pool arm reads `((game.u?.uinwater | 0) && !Is_waterlevel(uz))` with C cites (`:1765–1767` + youprop.h:279); D-3400 idiom, same e Named: none new.
- D-3720: js/zap.js only — the gate reads `(game.u?.uinwater | 0)` with C cites (`:5059–5060` + youprop.h:279); D-3400 idiom, same expression as js/zap.js:6951, Named: none new.
- D-3719: js/mthrowu.js only — the tail calls the live `obj_sheds_light` export (js/light.js:239 → obj_is_burning :208, C-exact) via the dothrow.js:2667–2668 dy Named: none new.
- D-3718: js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); all three gates call it, and the Splash gate reads the live ` Named: none new.
<!-- landmarks:end -->
