# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **D-0731 @10157:** unicorn @58,12 cnt=7 j=0 mtrack=[59,13]; mux=u
  (47,9); flag=NOTONL|ALLOW_U; 7×ROOM; (57,12) spider mhp34; WEB+sack
  @58,13 (ALLOW_TRAPS); no engr/online. C rn2(20) ⇒ cnt−j=5.
- **#1007 falsified:** FORCE→namedesc@10217 is **not** a clean next
  peel — FORCE desyncs keys so JS may wish `identify` (rn2(181)=
  180+1) while C’s tag is rn2(31). Do not chase namedesc via FORCE.
- Falsifier: C recorder DIAG of unicorn `mfndpos` poss[] at (58,12)
  (ensure install `sysconf` present). Alt: D-0708 seed0014.
- Do not FORCE-omit without C-state pair ID.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0860 done.
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
- seed5002/0360 **PASS**; D-0743…D-0858 peels done.
- Runner `Screen N/M` = total matches, not prefix length.
- C `~drn2` site tags inherit last **core** caller (stale for display).
- Do not re-check invent omit-obj_glyph or always-docrt on corner menus.
- Do not expect missing hungry line @213 — hunger was present (D-0858).
- Do not re-FORCE WEB-unique omit for D-0731 (#1004: any keep-track pair OK).
- Do not expect mon_track_clear alone to fix @10157 (#1006: !mflee).
- Do not trust FORCE→namedesc@10217 as next faithful peel (#1007).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **39/44** @#1005 Scr **9021**/11405 RNG **666643**/792838
  (84.08%); speed `33+0.23/turn`; next full score @#1010.
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
- **D-0731 #1007:** JS state full; need C poss[] dump (recorder DIAG).
