# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **seed0399 @10729:** after D-0867 tmiss, C `exercise` `rn2(19)` vs JS
  `distfleeck` `rn2(5)`. Screen: "You die... Your medallion begins to
  glow!". Faithful peel — not FORCE.
- Falsifier: C `attrib.c` `exercise` ~509 after knockback match @10728.
- Alt: D-0708 seed0014 @50259.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0867 done.
- **#977/@172:** dochug NOTHING/DONE Hallu newsym Scr−2 — superseded by
  D-0853 at @198 window (no Scr regression after #996).
- **#979–#984:** +N / underfoot / dim-hack / kelp / flush-as-glyph —
  falsified; cause was SCR_MAIL (D-0848).
- Extra post-`docrt` `vision_recalc(0)` not @195 cause (0 burns).
- Skip menu-dismiss `docrt` not @195 cause (Scr−2) — that was *skipping*
  redraw; corner must still gbuf-flush (D-0857).
- **#991–#994:** gulpmu warn/vision_off alone falsified; #996 pair OK.
- **#998:** fleeck→monflee Monnam at LCP 555 falsified (D-0854).
- HI_METAL≡CLR_CYAN (6); Warning Hallu burn correct; EOT fmon ok.
- seed5002/0360 **PASS**; D-0743…D-0867 peels done.
- Runner `Screen N/M` = total matches, not prefix length.
- Do not re-FORCE WEB-unique omit / mfndpos omit for D-0731 (closed D-0861).
- Do not expect mon_track_clear alone to fix @10157 (#1006: !mflee).
- Do not chase namedesc via FORCE (#1007); D-0862 closed @10217.
- Do not drop makesingular `as_is` (boots/gloves/gauntlets) — #1011
  regression seed0360/5006.
- Do not drop hold_another_object encumber_msg — #1012 @10269 was
  key desync (`t` throw), not gethungry arity.
- Do not “always rn2” in `obj_resists` for Bell/Book/Amulet/Candelabrum.
- Do not read only `wall_info` for W_NONDIGGABLE — OR `flags` (D-0865).
- Do not stub WEB in trapeffect_selector default — mon must set
  `mtrapped` (D-0866).
- Do not skip `tmiss` on thitmonst else — armor throw needs `rn2(3)`
  (D-0867); weapon hit-vs-miss still deferred.

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **39/44** @#1015 Scr **9337**/11405 RNG **667341**/792838
  (84.17%); speed `32+0.23/turn`; next full score @#1020.
- Capital `H` = multi-step run; clear travel in `set_move_cmd`.
- D-0486: `rogue_vision` on `Is_rogue_level` only.
- Worn rings: `setworn` → `uprops[oc_oprop].extrinsic` (D-0574).
- Bones `utrack` via `save_track`/`rest_track` (D-0578).
- Quest seed0367 **PASS**; seed0014 @50259 mfndpos (D-0708 open).
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); unstuck→`docrt` (D-0838).
- **D-0848:** objects extract `-DMAIL_STRUCTURES` → NUM_OBJECTS=481 /
  Hallu random_object dim 463; SCR_MAIL=364.
- **D-0852 #996:** gulpmu flush_topl_more + Hallu vision_off together.
- **D-0857 #1002:** corner dismiss≠docrt; Scr 217.
- **D-0858 #1003:** doattributes Hallu+Antimagic; seed0383 PASS.
- **D-0861…D-0866:** seed0399 peels to @10697 Scr 429 (web mtrapped).
- **D-0867 #1016:** `tmiss` else + food-fail; seed0399 **10697→10729**
  Scr **429→442**; gray dragon scale mail miss.
