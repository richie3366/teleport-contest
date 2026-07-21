# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Leaderboard 22-vs-38 gap — await cron; D-0483 serialize revert.
- **Gameplay next (D-0928):** seed4500 ^V24 medusa-3 land. Whole
  post-flip map is JS+(−1,+1): C `>`**(31,17)** / `<`(44,5) /
  `@`(42,7) vs JS `(32,16)` / `(45,4)` / `(43,6)`.
  JS DIAG: mx=3,my=1, flp=2, extends minx=2..79 **sum81**,
  pre-flip dnstair `(49,16)` → `(32,16)`, tele `[36..41]×[3..8]`.
  **#1086:** C `get_location` uses **rn2(20)** ⇒ ysize stays 20.
  Literal ystart=2 + shrink ysize→19 desyncs @18198. Clamp also
  turns bare FORCE ystart=2 into 0 (2+20>ROWNO). So gen-time
  ystart is 1 (same as JS); Y+1 needs a non-ystart cause.
  FlipX sum80 (minx=1) still explains X only.
  `node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 space coerce (D-0483); D-0471…D-0927 done.
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/mux/@88377 coords — place first (D-0928).
- Do not treat place/`collect_coords` RNG mismatch as cause — they
  match; look at `dndest` bounds / post-place geometry (D-0928 #1080).
- Do not treat C land as (39,5) — arrival `@`/`cursor` is **(42,7)**
  (D-0928 #1081).
- Do not expect minx=1 alone → C land (42,7); y=6 and terrain desync
  (D-0928 #1082/#1083). Need FlipX sum80 ∧ ly+1 together.
- Do not expect JS ystart *formula text* alone to differ for hei=20
  (both compute 1) — C *effective* origin is still +1 (`>` y=17).
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
- **D-0928 #1086:** C ysize=20 (rn2(20)); ystart=2+shrink falsified;
  JS preflip mx=3,my=1,sum81,stair(49,16)→(32,16).
- **D-0928 #1084:** C `>`**(31,17)** vs JS `(32,16)` — proves
  whole-map (−1,+1), not lregion-only. FORCE ystart=2 alone fails.
- **D-0928 #1083:** C `<`(44,5) + `@`(42,7); JS default stair
  `(45,4)` land `(43,6)` — same (−1,+1). FORCE minx=1 → stair
  `(44,4)` + place RNG desync. col2 STONE.
- **D-0928 #1082:** ^V6→24; JS flip `flp=2` extends 2..79×0..20,
  ystart=1; medusa-3 link/boundary/map_cleanup epilogue.
- **D-0928 #1081:** C `@` **(42,7)** (not 39,5); JS `(43,6)`.
- **D-0928 #1080:** place RNG OK; prefix **88377**.
- **D-0927 #1078:** rhack F-prefix reject; **87803→88377**.
- **D-0926 #1077:** mhitm_ad_blnd; **87218→87803**.
- **D-0925 #1076:** breamm/AT_BREA; **86672→87218**.
- **D-0924 #1075:** undo splitobj invent[] splice.
- **D-0923 #1074:** touchfood freeinv+addinv_nomerge.
- **D-0922 #1073:** wakeup wake_nearto.
- **D-0921 #1072:** minetn-4 College Town.
- **D-0920 #1071:** TROUBLE_HIT fix_worst_trouble.
