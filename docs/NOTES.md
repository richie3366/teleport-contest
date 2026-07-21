# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 @**#1220** (Scr **11405**/11405 RNG **100%**
  speed `30+0.27/turn`). Fortress held; #1224 map port D-0955.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep suite PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest port: **D-0955** `unturn_dead`/`revive` + `hero_breaks` +
  worn ABON `cancel_item`.
- **Next cluster:** Ring_gone / float_up / rescham / choke(strangle);
  dig destroy_drawbridge / desecrate_altar / shopdig / impact_drop /
  mkcavearea / grave; revive container/buried polish; ice melt /
  burn_floor_objects / fireball.
- Cadence full `sessions` next @**#1225**.

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
- Do not re-stub TIN / multi-turn rations (D-0935) … furniture/HOLE dig
  (D-0954) or unturn/hero_breaks/ABON (D-0955).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.

## Landmarks (≤15)

- Suite @**#1220**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `30+0.27/turn`.
- **D-0955:** unturn_dead/revive + hero_breaks + worn ABON cancel.
- **D-0954:** furniture_handled fountain/sink + HOLE goto_level.
- **D-0953:** floorfood pool/lava reach + `vault_gd_watching`.
- **D-0952:** break-wand bhitm/cancel/zapyourself + WAN_LIGHT litroom.
- **D-0951:** pickaxe dig occupation / use_pick_axe / is_digging.
- **D-0950:** dig_check/digactualhole + break-wand dig/create pay.
- **D-0949:** `explode` shop pay + `do_break_wand` explode-types.
- **D-0948:** `zap_over_floor` shop door/bars + `dobuzz` pay.
- **D-0947:** `kick_door` shop damage + town watch arrest/warn.
- **D-0946:** `eatspecial` PAPER/potion/`eataccessory`/leash/flint.
- **D-0945:** were* `set_ulycn` + mimic `eatmdone` + `attrcurse`.
- **D-0944:** `mconveys` extract + `corpse_intrinsic`/`givit`.
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
