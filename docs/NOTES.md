# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 Dlvl-24 hero land — C `@`
  **(39,5)** vs JS **(42,6)** after ~82426 `collect_coords` (post
  `place_lregion` / water_has_kelp). @88377 linedup was a miss:
  JS breath `(47,10)→(42,6)` not collinear; C already at `(39,4)`.
  Falsifier: dump JS `u` vs C screen `@` immediately after place;
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place first (D-0928).
- Do not silent-clear F-prefix then still run `#`/non-move (D-0927);
  nested g/G after F / full CMD_gGF table deferred.
- Do not treat @87803 `rn2(20)` as distfleeck — it was gethungry
  from mis-parsed `h` walk after F+# (D-0927).
- Do not omit `mhitm_ad_blnd` mhitu / raven AT_CLAW blind (D-0926);
  Eyes vision_clears / full can_blnd ublindf / uhitm arm deferred.
- Do not omit `breamm`/`breamu` / `mattacku` AT_BREA / fire-pool
  `zap_over_floor` steam (D-0925); mon-mon AT_BREA deferred.
- Do not re-add `splitobj` invent[] splice (D-0924); touchfood
  freeinv+`addinv_nomerge` is the invent-slot path.
- Do not omit `touchfood` freeinv+`addinv_nomerge` / invent `splitobj`
  nobj link (D-0923); sellobj_state invent-full dropy / COST_BITE deferred.
- Do not omit `wakeup` was_sleeping `wake_nearto(mlevel*18)` (D-0922);
  wake_msg / growl pline from wakeup still deferred.
- Do not omit `minetn-4` load_special / `book shop`→BOOKSHOP (D-0921);
  minetn-1/6/7 still deferred.
- Do not omit `pleased` TROUBLE_HIT `fix_worst_trouble` / `rnd(5)`
  (D-0920); other TROUBLE_* still deferred.
- Do not omit `nh_timeout` FAST TIMEOUT / leave Very_fast sticky (D-0919).
- Do not omit `goto_level` stair-fall `drag_down`/`ballrelease` (D-0918);
  gate with `uball` (≡C `Punished`), not sticky `u.Punished`.

## Landmarks (≤15)

- suite **42/44** @#1075 Scr **10349**/11405 RNG **771361**/792838
  (97.29%); next cadence @#1080.
- **D-0928 #1079:** @88377 linedup falsified; hero land C(39,5) vs
  JS(42,6) ~82426 `collect_coords`; still prefix **88377**.
- **D-0927 #1078:** rhack F-prefix reject; seed4500 **87803→88377**
  RNG **88484** Scr **808**; next was @88377 linedup.
- **D-0926 #1077:** mhitm_ad_blnd mhitu; seed4500 **87218→87803**
  RNG **88082** Scr **794**.
- **D-0925 #1076:** breamm/AT_BREA + dobuzz fire-pool; seed4500
  **86672→87218** RNG **87347** Scr **759**.
- **D-0924 #1075:** undo splitobj invent[] splice; seed0002 PASS
  restored; seed4500 was @86672 breamm.
- **D-0923 #1074:** touchfood freeinv+addinv_nomerge; seed4500
  **82793→86672** RNG **86798** Scr **759**.
- **D-0922 #1073:** wakeup wake_nearto; seed4500 **82788→82793**
  RNG **86800** Scr **755**.
- **D-0921 #1072:** minetn-4 College Town; seed4500
  **61698→82788** RNG **83013** Scr **747**.
- **D-0920 #1071:** TROUBLE_HIT fix_worst_trouble; seed4500
  **61689→61698** RNG **61837** Scr **654**.
- **D-0919 #1070:** FAST TIMEOUT; seed4500 **61462→61689** RNG
  **61766** Scr **643**.
- **D-0918 #1069:** drag_down/ballrelease via uball; seed4500
  **55990→61462** RNG **61496** Scr **622**.
- **D-0917 #1068:** fill_ordinary_room subroom recurse; seed4500
  **54329→55990** RNG **57748** Scr **613**.
- **D-0916 #1067:** Nesting nested + lspo_door rnddoor; seed4500
  **52803→54329** RNG **54647** Scr **613**.
- **D-0915 #1066:** goto_level unplacebc/placebc; seed4500
  **52643→52803** RNG **52925** Scr **611**.
