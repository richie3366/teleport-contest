# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#954:** seed0383 @10374 — after EE(156) fleeck×2, C vortex(108)
  fleeck×1 + `mattacku`(`AC_VALUE`/`rnd(2)`); JS gnome(165)@46,2 fleeck×2.
  Matched `rn2(5)=4` at 10373 is **coincidental** (diff monsters).
- **Falsified (#954):** post-swallow `mcalcmove` allotment desync /
  MSLOW / minliquid / typ. Same 35×`rn2(12)`; gnome slot gets
  `rn2(12)=5` → +12 (mmove6, spd=0); typ=ROOM(25); can=1 strat=0 sleep=0.
  JS stacks: 10371–72=EE, 10373–74=gnome; C 10373=vortex fleeck then
  mattacku.
- **Hypothesis next:** C pre-fleeck gate after movement spend —
  `!mcanmove` / `msleeping`+undisturbed / WAITMASK / DEAD mid-pass —
  that JS lacks (silent spend, no fleeck). Needs C-state of gnome
  flags at that pass, or find missing freeze/sleep setter.
- **Falsify:** C dump `mcanmove`/`msleeping`/`mhp` for 165@46,2 when
  EE returns; or port missing `mfrozen`/`msleeping` source.
- **Don't:** FORCE skip gnome; leave DIAG; assume mcalcmove order flip
  (rolls match); re-break D-0822…D-0829.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0829 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0829 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953:** spawn order / unshift timestamps 165 vs 108 — not @10374.
- **#954:** post-swallow mcalcmove +12 / MSLOW / minliquid ROOM — not cause.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).
- Wiz-loca…Valley/smoke; lit grow; squeeze; flip objects (D-0800…04).
- Rogue graphics; mazewalk ROOM; lava lit; Wiz firsttime (D-0805…08).
- travel path; setworn AC; CLOUD; darkroom; TRAVP stone (D-0809…13).
- wiz_map traps + show_map_spot map_trap (D-0814); door/visctrl (D-0815).

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
