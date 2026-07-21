# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 @**#1230** (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn`). Cadence reconfirm + D-0960 under fortress.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep suite PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest port: **D-0960** `mkcavearea`/`mkcavepos`/`rm_waslit`.
- **Next cluster:** desecrate_altar / impact_drop / conjoined_pits;
  revive container/buried polish; ice melt / burn_floor_objects /
  fireball; Ring_off float_down/learnring/adjust_attrib polish;
  autodig quiet / boulder-fill.
- Cadence full `sessions` next @**#1235**.

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
- Do not re-stub TIN … furniture/HOLE (D-0954), unturn/hero_breaks/ABON
  (D-0955), Ring_gone/float_up/rescham/choke/set_mimic_blocking
  (D-0956), dig_up_grave (D-0957), shopdig (D-0958), destroy_drawbridge
  (D-0959), or mkcavearea (D-0960).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.

## Landmarks (≤15)

- Suite @**#1230**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn`.
- **D-0960:** mkcavearea / mkcavepos / rm_waslit earth dig.
- **D-0959:** destroy_drawbridge + dig furniture/dighole wires.
- **D-0958:** shopdig warn/snatch.
- **D-0957:** dig_up_grave + dighole IS_GRAVE.
- **D-0956:** Ring_gone/float_up/rescham/choke/set_mimic_blocking.
- **D-0955:** unturn_dead/revive + hero_breaks + worn ABON cancel.
- **D-0954:** furniture_handled fountain/sink + HOLE goto_level.
- **D-0953:** floorfood pool/lava reach + `vault_gd_watching`.
- **D-0952:** break-wand bhitm/cancel/zapyourself + WAN_LIGHT litroom.
- **D-0951:** pickaxe dig occupation / use_pick_axe / is_digging.
- **D-0950:** dig_check/digactualhole + break-wand dig/create pay.
- **D-0949:** `explode` shop pay + `do_break_wand` explode-types.
- **D-0948:** `zap_over_floor` shop door/bars + `dobuzz` pay.
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
