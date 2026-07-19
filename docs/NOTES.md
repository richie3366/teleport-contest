# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#816:** D-0732 `mon_allowflags` + `in_your_sanctuary`/temple SANCT.
  seed0399 still @10157 (maze; temple inert). Suite score last @#815.
- **D-0731 open:** black unicorn @58,12; JS **cnt=7**→`rn2(28)`; C
  `rn2(20)`⇒cnt=5. Maze `is_maze_lev` nrooms=0 has_temple=false.
  Cells: (57,11)(57,13)(58,11)(58,13 WEB+sack)(59,11)(59,12)(59,13
  track); spider@57,12. Near: jelly@55,12; elf nobles@57,10/@56,11.
  No worms. FORCE any 2 keep-track →10217 (wish).
- **Falsify:** C-state which 2 of 6 non-track; or D-0708 @49039.
  Don’t FORCE_EXCL / re-break D-0660…32.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don’t re-apply D-0480 space coerce (D-0483); D-0471…D-0730 done.
- Runner `Screen N/M` = total matches, not prefix length.
- `rng-diff.mjs` runs **seg0 only**; matches `rn2(N)=M` strings only.
- D-0602: playmode:debug → `flags.debug`; pick_room must test it (≡C wizard).
- D-0658: hx=39 alone or link_doors + rect roomno gate → @14403.
- D-0665…D-0668/D-0673: TREE cmap; altar `{`; Warning floats; lit clear.
- D-0674/D-0675: gas `does_block` needs `clear_regions` on mklev.
- D-0676…D-0707: blue DSM / … / lookaround / kick / corpse_chance always-TRUE.
- Pets lack `ALLOW_U` without Conflict; hero square skipped when !mconf.
- `assigninvlet` **preserves** free a-z/A-Z (steal→return); don’t “always
  next lastinvnr”.
- `Fumbling()` ≡ H||E||uprops[FUMBLING]; not a sticky boolean.
- Water vault is `des.map` (wid=6→`rn2(73)`), not rectangular create_room.
- Session: `steps[i].key = moves[i-1]`; screen key for index `i` is `moves[i]`.
- D-0710…32: `#rub`/…/`max_passive_dmg` AD_ACID / unicorn NOTONL /
  onscary/garlic/bars/gas / mon_allowflags+temple SANCT — hallu maze
  @10157 still open which 2 cells C drops (temple inert; no worms);
  `#therecmdmenu`/next2u/far deferred; full `untrap()` deferred;
  rest of PROPSET + float_vs_flight still omitted; loot-at-feet open deferred;
  C `wallcolors[]` all-GRAY vs recorder DEC SGR 34 still unexplained;
  `completelyburns`/`rots`/`rusts` in mpd; dog_move `touch_petrifies`;
  numeric `MS_*` vs string msound; full `passes_bars` deferred.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- seed0006/0007/0398/0373/**seed5006**/ **seed0116** / **seed0361** /
  **seed0367** / **seed0108** **PASS** (suite **36/44** @#815; Scr 7926
  RNG 527503).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest: seed0367 **PASS**. seed0014 @49039 mfndpos (D-0708 open).
- S_KOP / minetn-1/3–7 / **medusa-2/3/4** deferred;
  eel hideunder / I_SPECIAL deferred; SWAMP deferred;
  `temperature_shift` stub; worn/artifact STONE_RES deferred;
  youmonst pool·lava / passes_walls in goodpos deferred;
  exclusion_zones save/rest deferred; region binary save format deferred.
- Rolling boulder: `launch_obj` + `ohitmon` + `mons_see_trap` (D-0700/01).
- C: `#define wizard flags.debug`. SPECIAL_PM=330 needs MAIL_DAEMON.
  defsym `')'`=WEAPON `'('`=TOOL; Arc-goal **14** `des.object()`.
  Boots `oc_delay`=2; FUMBLE `Boots_on` → `incr_itimeout(HFumbling,rnd(20))`.
  `cantwield` ≡ nohands||verysmall; polymon always `drop_weapon(1)`.
  `#invoke` AC+EXT_CMDS; Blind ≡ props (D-0716); `set_mon_data` umov
  (D-0717); **newman individual.m** (D-0726); **`#tip`/`dotip`** (D-0719);
  throw `.` self (D-0720); cream Blind vision (D-0721);
  Upolyd botl/glyph/weight (D-0722); `#monster` (D-0723);
  **FROMFORM FLYING** (D-0724); **breath tip + dobreathe** (D-0725);
  **doloot nohands / `#untrap` could_untrap** (D-0726);
  **`o`/doopen + doforce `(q)` + xname named** (D-0727);
  **`#herecmdmenu` self** (D-0728; JS `'\0'` ≠ C TIME);
  **Sokoban wall blue iff DECgraphics** (D-0729);
  **max_passive_dmg AD_ACID** (D-0730);
  **unicorn NOTONL + fail-tele + rloc track clear** (D-0731);
  **mon_allowflags + temple SANCT** (D-0732).
