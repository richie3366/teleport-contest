# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0552 done:** `splev_create_monster` uses `pm_to_humidity` +
  humidity-aware `is_ok_location` (HOT accepts lava; LAVAPOOL not
  SPACE_POS). seed0373 **30263→30308**; runner RNG **30336**/35386.
- **seed0373 next:** @30308 C `m_initinv` S_GIANT gem loop
  `rn2(m_lev/2)` vs JS trailing `rn2(50)` (fire giant invent gap).
- **seed0116 residual:** screen/cursor miss (110/127) after full RNG.
- **D-0515 residual:** seed5006 still @8468 `dosounds` (RNG 8508).
- **#610 formal score:** **30/44**, Scr **5901**/11405, RNG
  **348403**/792838 (43.94%), `31+0.14/turn` (R² 0.77).
- **Leaderboard gap:** local **30/44** vs judge **22** after D-0480;
  D-0483 reverted serialize. Watch cron for seed0013 restore.
- **Gameplay next:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0373-barbarian-quest-tour.session.json
  node scripts/rng-diff.mjs sessions/seed5006-tourist-stress-disaster.session.json
  node frozen/ps_test_runner.mjs sessions/seed0116-wizard-wear-shop.session.json
  ```
- **Don’t:** re-apply D-0480 serialize coerce; invent frame-align;
  raw RNG-index / coord / ux0 hacks; leave `context.travel` set across
  walk/run after `_` travel; batch doset toggle plines (D-0499);
  steal hero cursor for leftover getobj text in `flush_screen`;
  reopen D-0474…D-0552; stub-cancel `^V?` as if menu (breaks 0373);
  template `\.` in map strings (use `\\` for throne); burn maze
  `rn2(2)` in `set_mimic_sym` on Sokoban; fill inside `load_special`
  loaders (makelevel owns fill); accept TELE on occupied mon cell;
  skip `were_change` in `m_calcdistress`; stub `m_avoid_soko_push_loc`;
  skip Bar-strt after randline; skip onquest firsttime/on_locate nhl
  shuffle; treat noteleport as blocking covetous (Vlad); compare `mons()`
  objects by reference in pickvampshape (use mndx); use `dlevel` in
  `traptype_rnd` (must be `level_difficulty`); stub S_TROLL m_initweap;
  skip In_quest `*-fila`/`*-filb`; leave stale `splev_*` after map load;
  skip quest `rndmonst_adj`→`qt_montype`; skip EGG `attach_egg_hatch_timeout`;
  skip WEB `makemon(PM_GIANT_SPIDER)` when `!MKTRAP_NOSPIDERONWEB`;
  always return SCR_EARTH on `rnd_offensive_item` case 0;
  skip `MON_AT`→`enexto` in `splev_create_monster`; skip mineralize
  In_quest gold/gem divide; skip STATUE_TRAP `mk_trap_statue`;
  skip `bigrm-8` when `rnd(13)=8`; hardcode PARTISAN for soldier
  polearm (must `rn1` + skill filter); skip S_HUMAN `is_elf` kit
  (must `M2_ELF` + full coat/weapon arms); skip S_QUANTMECH
  `m_initinv` `rn2(20)` SchroedingersBox; skip `soko1-2` when
  `makemaz` `rnd(2)=2`; skip LONG_WORM `initworm`/`place_worm_tail`;
  treat fill_zoo `rn2(100)` @25654 as missing gold roll — was makemon
  succeeding on worm-seg cells (D-0545); skip S_MUMMY `rn2(7)` wrapping;
  skip `soko2-1` / `soko3-*` / `soko4-2`; accept DRY `get_location`
  on boulder cells; skip soko4 hardfloor / SCR_EARTH / branch levregion;
  skip endgame Amulet grant on `^V?` force_dest (D-0549);
  omit endgame `level_difficulty` / fire.lua (D-0550);
  burn `d(m_lev,8)` for adult dragons in endgame (D-0551);
  always DRY-place fire-plane flyers/lava-likers (D-0552).

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Altar raw `{` (D-0293); don’t π-convert in scoring grid.
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0552
  done paths — see DIVERGENCE-INDEX.
- Runner `Screen N/M` = total matches, not prefix length.
- Hub `/sessions/` ≠ template bytes; still visual-PASS.
- Water-demon floor-vs-`&` was missing `makemon` `newsym` (D-0481).
- Charged-ring `oc_uses_known` must zero `known` in `mksobj` (D-0482).
- Empty-quiver `f` must not More-eat invent letter (D-0484).
- seed0007 peels D-0485…D-0506 done → **PASS**.
- D-0512: !verbose drop leaves getobj topline until parse clear.
- D-0513: `zapwrapup` must `You_feel` shudder (not defer).
- D-0514: wizard `#quit` → `Dump core?` before disclose; stopprint
  skips Goodbye; wizard topten early-exit msg + trailing blanks.
- getbones `rn2(3)` gap with JS dog_move arity was unbound level change
  (`>` / `^V` / missing `print_dungeon` `?`) — fixed D-0515/18
  (D-0068/D-0149).
- D-0519…D-0552 makemaz / tower / Bar / soko / endgame fire — see index.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig + restfakecorr (D-0377/78).
- seed0006 **PASS** after D-0482; seed0007 **PASS** after D-0506;
  seed0398 **PASS** after D-0514.
- LB gap: 14 cells / 4 sessions; report upstream if next cron unchanged.
- Gameover `add_menu_heading` ATR_NONE; `iflags.at_night` from `really_done`.
- #610 score: **30/44**, Scr 5901, RNG 348403 (43.94%), `31+0.14/turn`.
- Capital `H` = multi-step run; `set_move_cmd` must clear travel.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- D-0487: default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- D-0502: `find_ac` ARM_BONUS; Scr 126→291.
- Water moccasin is `hides_under` (M1_CONCEAL) — postmov hide roll.
- Rogue start leather is `+1` → AC 7 unless eroded (ARM_BONUS).
- wizgenesis flags=5 (no AUTOCOMPLETE) — do not add to EXT_CMD_AC.
- seed0373 tour: fire plane @30308 S_GIANT invent after humidity (D-0552).
