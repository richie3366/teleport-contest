# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 ^V24 medusa-3 land. **X-only:**
  C map `@`(42,6) / `>`(31,16) / `<`(44,4) vs JS `(43,6)` / `(32,16)` /
  `(45,4)`. Prior “Y+1” was tty cursor `[42,7]` vs map `u_on_newpos`
  mixup (#1087). JS flip: first=3 last=78 col2 STONE sum81 flp=2.
  FORCE minx=1 → stair `(31,16)` but place RNG desync @82419.
  Need C-cited sum80 (or `dndest.lx=39`) that keeps place validity.
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place first (D-0928).
- Do not treat place/`collect_coords` RNG mismatch as cause — they
  match; look at `dndest` bounds / post-place geometry (D-0928 #1080).
- Do not treat C land as (39,5) — arrival cursor **[42,7]** = map
  **(42,6)** (D-0928 #1081/#1087).
- Do not treat whole-map Y+1 as real — tty row = map y+1 (#1087).
- Do not FORCE FlipX minx=1 alone — place desync @82419 (#1083/#1087).
- Do not FORCE ystart=2 alone — clamp→0 / prefix→78606 (#1084).
- Do not FORCE ystart=2 + ysize=19 — C rn2(20) @ get_location
  (#1086); gen-time ystart is 1.
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

## Landmarks (≤15)

- suite **42/44** @#1085 Scr **10398**/11405 RNG **773047**/792838
  (97.50%); next cadence @**#1090**.
- **D-0928 #1087:** Y+1 falsified (tty/map); land X-only; stairs
  ungated + extends scan bounds; FORCE minx1 place-desync; @88377.
- **D-0928 #1086:** C ysize=20 (rn2(20)); ystart=2+shrink falsified;
  JS preflip mx=3,my=1,sum81,stair(49,16)→(32,16).
- **D-0928 #1084:** C screen `>` y=17 vs JS map 16 — was tty offset.
- **D-0928 #1083:** FORCE minx=1 place desync; need sum80 ∧ place-safe.
- **D-0928 #1082:** ^V6→24; JS flip `flp=2` extends 2..79×0..20,
  ystart=1; medusa-3 link/boundary/map_cleanup epilogue.
- **D-0928 #1081:** C cursor **[42,7]** (=map 42,6); JS `(43,6)`.
- **D-0928 #1080:** place RNG OK; prefix **88377**.
- **D-0927 #1078:** rhack F-prefix reject; **87803→88377**.
- **D-0926 #1077:** mhitm_ad_blnd; **87218→87803**.
- **D-0925 #1076:** breamm/AT_BREA; **86672→87218**.
- **D-0924 #1075:** undo splitobj invent[] splice.
- **D-0923 #1074:** touchfood freeinv+addinv_nomerge.
- **D-0922 #1073:** wakeup wake_nearto.
- **D-0921 #1072:** minetn-4 College Town.
