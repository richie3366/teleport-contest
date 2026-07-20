# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- **#966:** D-0837 closed @11400. seed0383 prefix **11524**; Scr still 144;
  RNG matched **11527**.
- **Next @11524:** C `getbones` `rn2(3)`; JS `rn2(20)` — likely C death/
  bones after cold damage vs JS still in moveloop.
- **Hypothesis:** hero HP / destroy_items potion shatter / AC-reduced
  damage diverged enough that C dies and enters bones while JS lives.
- **Falsify:** dump `u.uhp` / invent potion count / gameover after the
  ice-vortex cold hit (log≈11520); compare C death vs JS continue.
- **Don't:** FORCE death/bones; leave DIAG; re-break D-0822…D-0837.
- **Open (not this peel):** `potionbreathe` POT_CONFUSION/BOOZE stubs;
  `nh_timeout` HALLUC expiry; dokick `abuse_dog` still stub; AD_FIRE
  hero `mhitm_ad_fire`; other getmattk subst arms.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / ux0 / forced-gettrack in production.
- Rule #2: no `fs`/`path`/`url` in scored `js/` (D-0477).
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0837 done.
- Runner `Screen N/M` = total matches, not prefix length.
- seed5002 **PASS**; seed0360 **PASS**; D-0743…D-0837 peels done.
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
- **#964:** mtame intimacy @11372 — falsified; was missing `hmon_hitmon_pet`
  → `abuse_dog` / `yelp` (then xkilled luck `rn2(2)`).
- **#965:** `mattacku:709` rnd(2) is `AC_VALUE` negative-AC macro — not a
  separate mystery call.
- **#966:** @11400 fleeck was ice vortex `mspec_used` without getmattk
  subst (kept AT_ENGL) — not missing AT_TENT/find_offensive.
- D-0770 flyers / poisoncloud; WAITMASK mid-pass (#952); Wizard ldrnum.
- FlipY mx/my only; FORCE Neferet CLOSE coincidence (D-0794).

## Landmarks (≤15)

- STAIRS yellow via `known_branch_stairs`; map col=x−1 row=y+1 DEC.
- Session: `more()` space/CR/ESC; jsmain `\r`→LF; cursor=(ux−1, uy+1).
- suite **38/44** @#965 Scr **8946**/11405 RNG **661122**/792838;
  seed0383 prefix **11524** Scr **144**/219 (D-0837).
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
- `hmon_hitmon_pet` → `abuse_dog`/`yelp`/`growl`; xkilled tame luck (D-0836).
- `getmattk` mspec_used → AT_TUCH/CLAW; `mhitm_ad_cold` + destroy_items
  (D-0837).
