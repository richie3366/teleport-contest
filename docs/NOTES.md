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

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms. Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Pw pair + Empty-hnd fixed D-3629 (drain_en flags.botl mirror, DOSET weaponstatus home); all 3 probe sessions moved.
- **Shipped writers — do not re-pop/re-check:** mfndpos W2 (D-3560→D-3561, m_search_items MZ_HUMAN); disclose tour-Priest (D-3626→D-3627, erase_menu_or_text corner; wish pair = separate Hallu display-RNG class); toss_up→chwepon (D-3640, HCOLORS 74/74); read_engr_at Knight-94259 (D-3671, tut-1.lua:83-85 gate at mklev.js:20276, paint path audited whole, D-3670 witness retired); magic_map_background DARKROOMSYM-rogue (D-3682, stone-glyph/floor-paint split).
## Don't re-check (≤15)

- D-1790…D-3848 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus: 1113 entries; full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…D-3848) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3848.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3848 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1), same step/path as the JS throw; prefix RNG 12535/12535, 16513/16513) — do not re-port mlevel_tele_trap/migrate/ledger for them; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3848: `js/cmd.js` only — TIME-gated `game.kickedloc = { x: 0, y: 0 }` in the `#` (after the reset block, below the prefix-continue — C skips the tail on pre Named: none in this arm (bound, per-key, canned, and extcmd dispatch shapes now all match `:3819–
- D-3847: js/zap.js only — bounce check + bchance re-read `game.level?.at?.(sx, sy)?.typ` (C-live semantics, cited); the dup absorb block deleted (zap_over_floo Named: none new — bounce/door arms now C-verbatim; dobuzz's pre-existing envelope (doc :2374) sta
- D-3846: js/mhitu.js only — the four locals now OR flats with their uprops slot (teleport.js Fire_resistance / trap.js lava_effects idiom); Slow_digestion like Named: none new in gulpmu — halfPhys stays flat-only (sole extrinsic writer set_artifact_intrinsi
- D-3845: ported the NHW_MESSAGE arm whole as display_nhwindow_message (display.js): NEED_MORE (no STOP check — C's arm has none) → remember_topl (C keeps gt.to Named: display_nhwindow MAP/STATUS/MENU/TEXT arms (other callers, other iterations); HUPSKIP/WIN_
- D-3844: none (park confirmation). Named: none (no port; docs-only entry).
- D-3843: none (parked). Named: none (no port; no scored-code change — parked with measurement, docs-only entry).
- D-3842: js/invent.js only — gate restored C-verbatim (`'iron bars'` exact + first-space indexOf/slice toLowerCase `=== ' ice'`); an()/vtense() already live an Named: none new in the gated arm — the gate is now the verbatim C condition; look_here's pre-exis
- D-3841: js/zap.js only — Reflecting() is now the verbatim C macro (uprops[REFLECTING] intrinsic||extrinsic); deleted the 5 consts used only by the stand-ins ( Named: none in this unit — Reflecting is now the verbatim C macro.
- D-3840: guard the arm with `!(chewDat && tunnels(chewDat) && !needspick(chewDat))` (chewDat = game.youmonst?.data; tunnels/needspick already imported; idiom m Named: none new — D-3839 list stands (Passes_walls+may_passwall :1014, Underwater message :1017, 
- D-3839: new arm in domove after the tunnels chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && autodig  Named: none new — Passes_walls+may_passwall (:1014), Underwater message (:1017), door (:1090)/bou
- D-3838: deleted `|| game.u?.ublindf` (2-line C cite). Named: none in this unit — Blindfolded is now the verbatim C macro; EBlinded wear-sync and the ca
- D-3837: js/pray.js only — port C `:2419–2424` verbatim: `if (known_spell(SPE_TURN_UNDEAD)) return spelleffects(SPE_TURN_UNDEAD, false, false);` (plain truthin Named: none new in the ported arm.
- D-3836: union the live extrinsic into the passive read (invent.js:7441 enlightenment precedent): `|| (u.uprops?.[FREE_ACTION]?.extrinsic | 0)` with the C cite Named: none in the ported arm.
- D-3835: add `AIR` to the existing const.js import (trap.js:77; `imports.mjs --can` ALREADY — no new edge). Named: none new.
- D-3834: `js/questpgr.js` only — three bodies verbatim from quest.lua (`cat -A`-verified: double space after «here.»/«wrong.»/«%i.»/«tunnels.»/«arrows.»/«cave. Named: remaining role bodies no corpus session reaches (firsttime Cav; goal_first Hea/Mon/Rog/Val
<!-- landmarks:end -->
