# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Fountain customcolor park (D-3946):** the 5 Enhanced residuals (2 welcome@0 + 3 owner-null, NOT throws) diverge only on ⌠ cells (C payload fg8 vs JS base-12; shadow has no extracolor hook, frozen wire is 16-color). Do not re-check until an extracolor wire format exists.
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
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate.

## Don't re-check (≤15)

- D-1790…D-3959 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3959.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3959 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3959: js/getpos.js only — deleted the shortcut; stairs now match via the typ+seenv+ladder terrain gate (C :1095–1103 seenv back_to_glyph arm) plus the pre-e Named: none new (getpos stays ledger-partial on its D-3556 audited note).
- D-3958:  Named: 007 landing (prohibited dir — supervisor/patches-capable; DURABILITY CAVEAT unchanged: unt
- D-3957:  Named: the :2935 has_rogue_color first-arm (ROGUESET+IBM, never active on contest tty — same stan
- D-3956: `js/pager.js` — the looked path reads the live showsyms table throughout: sym via glyph_showsym_code→live_showsyms per bank (monsters via mlet+SYM_OFF Named: none new — closes the D-2447 `rogue_syms table` + `non-boulder go.ov_*_syms` omissions for
- D-3955: `js/options.js` parseNethackrc only — new top-level MENUCOLOR= arm in the sibling-regex idiom (`/^MENUCOLOR=(.+)/i`, placed before ROGUESYMBOLS mirror Named: (1) ':' separator + space-before-'=' variants (C find_optparam/length_without_val accept t
- D-3954: add `freeinv` to the existing invent.js import (muse.js:44; `imports.mjs --can` ALREADY — no new edge), replace the call (muse.js:3271) with a C-cited Named: none new.
- D-3953: `js/cmd.js` only — (1) the Unknown arm no longer clears forcefight (C verbatim); (2) the F-prefix gate reads call-local `prefix_seen?.txt === 'fight'` Named: (1) the Unknown arm keeps the D-3947 house run-stop (`end_running` when run/multi>0) and c
- D-3952: both rows delegate to the live optfn via the sibling `doset_compopt_get_val` shape (C `:8612–8614` / `:9038–9040` call-for-call: `optfn(allopt_idx, ge Named: none new.
- D-3951:  Named: 007 landing (prohibited dir — supervisor/patches-capable; DURABILITY CAVEAT unchanged: unt
- D-3950: `js/display.js`: new exported `live_showsyms(symidx)` — the C `assign_graphics` `:224–239` / `switch_symbols` `:257–260` expression (ov ? ov : carrier Named: - `do_statusline2`: vers/showvers arm, MAXCO-overflow panic arm, and in_dumplog gate unpor
- D-3949: `js/dothrow.js` only — drain in C order inside the `if (why)` arm (dig.js falling-rock shape): after `losehp`, run the fatal done-gate first (`finish_ Named: none new — maybe_wail body whole (throttle + Wizard/Elf/Valkyrie + You_hear arms live in `
- D-3948: `js/do_wear.js` only — deleted both house `find_ac()` calls (normal-path tail + null arm, now a plain `return 0`); doc comment now cites `:434–515` +  Named: none new — Helmet_on now whole vs C `:434–515`.
- D-3947: js/cmd.js only — (1) classifiers num_pad-aware (NUMPAD_WALK digit→sdir map; M(digit)→run, M('5')→rush-prefix, '5'→run-prefix, '0'→Unknown); (2) F/g/G  Named: (1) getdir/movecmd digit acceptance under num_pad (different C function — Healer-50059030 
- D-3946:  Named: 007 landing (prohibited dir — supervisor/patches-capable); extracolor shadow+wire+decoder 
- D-3945: js/display.js show_glyph_cell: HUPSKIP early return (`:3867`, morc display-local per botl.js:801) + the `:3946` predicate/wincap/handling/u-gate with  Named: tty_print_glyph remainder (color/attr/tiles/menu paths — tty-port by-design; MSDOS tiles `
<!-- landmarks:end -->
