# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#963:** D-0835 closed @10843 (`#wizintrinsic` + `make_hallucinated`).
  seed0383 prefix **11372**; RNG matched **11423**/16915 Scr **144**/219.
- **Next @11372:** C `abuse_dog` `rn2(9)` vs JS `rn2(6)` (after matched
  hitum/exercise/dmgval). Hypothesis: pet abuse path / yelp threshold or
  dog intimacy state differs post-hallu combat.
- **Falsify:** dump mtmp->mtame / abuse_dog args at 11372; compare C dog.c
  rn2(mtame) vs JS; expect missing abuse_dog call or wrong mtame.
- **Don't:** FORCE skip; leave DIAG; re-break D-0822…D-0835.
- **Open (not this peel):** `potionbreathe` POT_CONFUSION/BOOZE still stubs
  `u.Confusion += rnd(5)` without `make_confused`/`HConfusion` timeout;
  `nh_timeout` HALLUC expiry still deferred.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0835 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0835 peels done.
- EOT fmon `156,165,108` mcalcmove signature matches (#951).
- **#953:** spawn order / unshift timestamps 165 vs 108 — not @10374.
- **#954:** post-swallow mcalcmove +12 / MSLOW / minliquid ROOM — not cause.
- **#956:** JS mcanmove/sleep/WAITMASK/I_SPECIAL clear at EE act — not cause;
  closed by D-0832 (missing equip path).
- **#961:** Confusion `u_maybe_impaired` @10608 — falsified; was swallow.
- **#962:** want_move/minvis `rn2(3)` @10646 — falsified; was fog
  `create_gas_cloud` after vapor TTL expired (no `inside_gas_cloud` refresh).
- **#963:** mon site-shift @10843 — falsified; was missing `#wizintrinsic`
  Hallucination → exerper WIS `rn2(2)`.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).
- HASTE_SELF (D-0796); ok_to_quest (D-0798); can_fog (D-0799).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#960 Scr **8937**/11405 RNG **660490**/792838;
  seed0383 prefix **11372** Scr **144**/219 (D-0835).
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
- Fog vapor: `reg.monsters` + `inside_gas_cloud` ttl+5 (D-0834).
- `#wizintrinsic` → `make_hallucinated` (D-0835); hallu exerper WIS.
