# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **Score:** **24/44** PASS (#400). RNG **254110**/792838 Scr **3640**/11405.
  seed0012 focused RNG **13754**/13878 cursors **279**/308 (D-0377).
- **Next:** seed0012 @13700 — C `move_special` `rn2(1)` vs JS `rn2(5)`.
  Cmd: `node scripts/rng-diff.mjs sessions/seed0012-monk-vault-escort.session.json`
  Falsify: priest cand path / room state at first mill after vault escort.
- **Don’t re-check:** @13576 as bare dog_move cand arity / IS_ROOM rn2(4)
  (D-0377 — root was gd_move dig while-loop missing wall→ortho redirect,
  so (70,13) stayed STONE and hero `h` desynced); @13517 bag put-in
  (D-0376); @13392 fleeck/gd_move alone (D-0375); @13287 wipe before
  invault (D-0374); @12489 fleeck/mon mvault (D-0373); @12439 gethungry
  (D-0372); @8802 dog_goal IS_ROOM (D-0371); @8384 fountain (D-0370).
- **Landmark:** vault door (71,13); guard dest ~(64,5); dig while-loop
  redirects TLCORNER north → west STONE (70,13)→CORR; um_dist `!rn2(10)`.
- **Parked:** D-0006; seed2200 @158 RC.

## Don’t re-check (≤15)

- No raw RNG-index / coordinate gates in production.
- Role `mnum` = PM_* IDs; Ctrl-rush `run=3`, capital `run=1`; `\r`→`\n`.
- **Don’t:** early-return `dochug` on `msleeping` (D-0278);
  `can_make_bones` without `no_bones_level` (D-0279);
  `dodrink` CANCEL as time (D-0280); `#quit` AC-only (D-0281);
  `read_engr` maxelen from 80 (D-0282); botl `Dlvl` from `uz.dlevel` (D-0283);
  omit `m_throw` flash / potion `nn` (D-0284/85); skip AT_WEAP `mswings` /
  clamp fatal `uhp=0` / skip bot when `uhp==-1` / live-paint botl on more
  (D-0286/87/310/314/320); invent yn when `disclose:-i` (D-0288);
  omit RIP blank / topten (D-0290/91); true amulet/TOOL/WAND/SCROLL/SPBOOK/
  ARMOR name when `!nn` (D-0292/305/309/312/321/325); WAND `known` at create
  (D-0316); private `mon_nam` (D-0308); omit `paybill` (D-0311);
  bare isshk death (D-0313); omit Priest `bknown` (D-0315);
  vain-push behind boulder (D-0317); skip mon_wield pline (D-0318);
  fire-and-forget thitu pline (D-0319); bare hit period (D-0322);
  muse losehp without finish_done (D-0323); quit killer from prior death
  (D-0324); always paint Invisible `@` (D-0326); hard-code xkilled kill
  (D-0327); persist bones glyph memory (D-0328); bare MGIVENNAME ghost
  (D-0329); `;` unbound / forced more (D-0330); getlin no CO wrap (D-0331);
  drop letters without compactify (D-0332); friday13 one-space indent
  (D-0333); hand-roll checkfile yn (D-0334); treat `S` as unknown /
  skip VFS save (D-0335); always align on welcome-back (D-0336);
  advance attr pages on any key (D-0337); leave `$` unbound (D-0338);
  leave `)` unbound (D-0339); leave `[`/`=`/`"`/`(` unbound (D-0340);
  leave DEL unbound when `doterrain` exists (D-0341);
  skip `reveal_terrain` getglyph/show (D-0342); tip `docrt` under
  terrainmode / ignore getpos space quitchar (D-0343);
  put `#twoweapon` in EXT_CMD_AC (D-0344); omit `hitum` twoweap second
  hit (D-0345); blanket `observe_object` / `xname(CORPSE)` mon (D-0346);
  skip twoweap skill enl (D-0347); `clearScreen` chargen confirm (D-0348);
  bare Entering without schedule_goto (D-0349); tut-1 map/find_ac
  (D-0350); omit tut-1 door/portal (D-0351/52/53); silent `blocksMove`
  (D-0354); POOL glyphs / DEC `` ` `` (D-0355); broken-door look_here
  (D-0356); ParanoidSwim (D-0357); RIP before disclose (D-0358);
  continue_run smudge (D-0359); rocktrap youmonst (D-0360); ICE_BOX
  boxiprobs (D-0361); #loot / dog appr @3152 (D-0362); under-dmg @3204
  (D-0363); oc_delay meating (D-0364); `,` leak move (D-0365); `<`/
  getlev (D-0366); rest_track (D-0367); O/@ gold (D-0368); allmain wipe
  @7312 (D-0369); mtrack k−j @8384 (D-0370 — fountain detect);
  dog_goal rn2(4)@8802 as IS_ROOM (D-0371 — foul vomit);
  gethungry rn2(20)@12439 as Unaware (D-0372 — attack before test_move);
  somex@12489 as fleeck/mon mvault (D-0373 — hero once vault TELEP);
  wipe_engr@13287 as fleeck (D-0374 — invault guard spawn);
  fleeck@13392 as gd_move-only (D-0375 — apply `?` bag take-out first);
  @13517 as move_special/onlineu alone (D-0376 — bag put-in / leaked LF);
  @13576 as dog_move rn2(4)/IS_ROOM alone (D-0377 — gd_move dig redirect).
- Runner `Screen N/M` = total matches, not prefix length.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF.
- Vault door (71,13); dig while-loop wall→ortho→STONE CORR (D-0377).
- Vault `invault` timer 30 → `makemon(PM_GUARD)` + getlin (D-0374).
- Apply bag take-out `a?jo$\r`; put-in `aji$\r$\r` (D-0375/76).
- Shop home (11,11): mill → (11,12); return needs `onlineu` (D-0376).
- D-0274…D-0377: see index.
