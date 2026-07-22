# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **43**/44 @**#1250** (Scr **11404**/11405 RNG **100%**
  speed `32+0.27/turn`). Next cadence @**#1255**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-0983** `stolen_value` + revive/kick/dig/lock/
  costly_alteration callers (after D-0982 montraits).
- **Next cluster:** `ship_object` shop-floor fall; or absent.md thin.
- seed0009 Scr 72/73 FAIL reproduces on clean HEAD — do not chase
  as recent-port regression.

## Don't re-check (≤15)

- No raw RNG-index / coordinate / FORCE in production; Rule #2 no `fs`.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129); leading bold pads (D-0932).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Do not treat @1808 as page-count shim (#1194).
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Do not re-stub TIN … furniture/HOLE (D-0954) … through stolen_value
  callers (D-0983) or drop `objects_at` from timeout mkobj (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- Wooden flute/harp: always burn `rn2(DEX)` even when stun/conf
  cleared `do_spec` (C `&=`, not JS `&&`).
- Do not chase seed0009 Scr 72/73 without C-cited shared cause.

## Landmarks (≤15)

- Suite @**#1250**: **43**/44 Scr **11404**/11405 RNG **100%**
  speed `32+0.27/turn` (seed0009 Scr FAIL on HEAD).
- **D-0983:** stolen_value + revive/kick/dig/lock/costly_alteration.
- **D-0982:** save_mtraits/montraits/ghost + KEEPTRAITS/wary_dog.
- **D-0981:** openholding/openfalling + boxlock_invent + SPE_KNOCK
  mhurtle/saddle.
- **D-0980:** restore `timeout.js` `objects_at` (D-0978 import drop).
- **D-0979:** release_hold + flash_hits_mon / light_hits_gremlin.
- **D-0978:** ignite_items / catch_lit / begin_burn / burn_away_slime.
- **D-0977:** passtune + open/close_drawbridge + Mastermind hints.
- **D-0976:** `dosinkfall` + sink `spoteffects` + `ELevitation` mirror.
- **D-0975:** lavawall spines + burn_floor feedback + fire-trap wire.
- **D-0974:** flute/harp/horn + BUGLE soldiers + FIRE/FROST ubuzz.
- **D-0973:** explode AD_MAGM/DISN/DRST/ACID + masks + mon_explodes.
- **D-0972:** music `do_earthquake`/`do_pit` + drum of earthquake.
- **D-0971:** `explode` AD_COLD/ELEC + Cold/Shock mask + mon_explodes.
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
