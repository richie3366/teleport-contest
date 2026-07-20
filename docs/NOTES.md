# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#953:** seed0383 @10374 — hero swallowed by ice-vortex (108);
  uac=−2. After EE(156) fleeck×2, C does vortex fleeck×1 + `mattacku`
  (`AC_VALUE`/`rnd(2)`); JS gnome(165)@46,2 fleeck×2 then vortex.
- **Falsified (#953):** makemon creation/reorder desync for 165 vs 108.
  Same spawn RNG (vortex@6186, gnome2@6404, EE@6635); head-insert
  order EE→gnome@47,2→vortex in both. EOT `mcalcmove` same slot: gnome
  `+12` (base mmove 6). Gnome hp=3/3 never damaged (not a near-kill).
- **Confirmed:** live fmon still EE→gnome@46,2→vortex when EE acts;
  gnome can=1 strat=0 sleep=0 typ=ROOM; `uswallow` early `m_move`
  return already ported. C must skip gnome’s `dochug` with **no RNG**
  between EE’s 2nd fleeck and vortex’s 1st.
- **Hypothesis next:** pre-`dochug` skip gate C hits, JS misses —
  `minliquid` / `helpless` / `mcanmove` / hider / `fightm` / covetous
  early-out — or C-state shows gnome absent/dead despite matched
  `mcalcmove` count (membership≠order).
- **Falsify:** DIAG `movemon_singlemon` return path for mndx 165 at
  rng≈10373; or C nmon dump at that pass.
- **Don't:** FORCE CLOSE/mov; leave DIAG; re-break D-0822…D-0828;
  assume fmon creation-order flip.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0828 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0828 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953:** spawn order / unshift timestamps 165 vs 108 — not @10374.
- D-0770 flyers / poisoncloud; WAITMASK; Wizard ldrnum; makemon mux=0.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).
- Wiz-loca…Valley/smoke; lit grow; squeeze; flip objects (D-0800…04).
- Rogue graphics; mazewalk ROOM; lava lit; Wiz firsttime (D-0805…08).
- travel path; setworn AC; CLOUD; darkroom; TRAVP stone (D-0809…13).
- wiz_map traps + show_map_spot map_trap (D-0814); door/visctrl (D-0815).
- tele_restrict pline + wildmiss displaced (D-0816).
- blank S_stone non-travel + TER_DETECT guard (D-0817).
- feature matching `_`/furniture/traps; `#` not feature (D-0818).
- getpos_help NHW_MENU + show_goal_msg (D-0819).
- Wiz locate_first/next qt_pager (D-0820).
- Displaced enl + known speed-boots from_what (D-0821).
- bigrm-12 hexagon load_special (D-0822).
- dog_goal + monmove could_reach_item; mfndpos may_passwall (D-0823/24).
- AT_ENGL/gulpmu + dochug engulfing_u→mattacku (D-0825).
- postmov engulfer `u_on_newpos` (D-0826); mattacku uswallow gate (D-0827).
- dmonsfree / no immediate mondead splice (D-0828) — not @10374 cause.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#950 Scr **8938**/11405 RNG **660393**/792838;
  seed0383 Scr **142**/219 RNG 10762 (still @10374).
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- S_KOP / medusa-2/4 / eel / Wiz-goal / hellfill deferred.
- Mumak **lacks** M2_ROCKTHROW; linedup handling=2.
- Traps live on `level.traps[]` (maketrap); `ftrap` often empty.
- `^F` wiz_map + do_mapping; show_map_spot must `map_trap` not newsym.
- ok_to_quest (D-0798); blocked staircase lookat rewrite (D-0814).
- TRAVP_VALID BFS hero→dest (D-0813); getpos DOOR + visctrl (D-0815).
- tele_restrict More mid-movemon; wildmiss triggers prior More (D-0816).
