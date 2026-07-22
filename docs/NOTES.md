# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **43**/44 @**#1275** (Scr **11404**/11405 RNG **100%**
  speed `31+0.27/turn`). Next cadence @**#1280**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1005** apply leash — `use_leash`/`next_to_u`/
  `check_leash` + `m_unleash`/`whimper` + domove/stairs/tele wires.
- **Next cluster:** absent.md thin (scroll/vault / potions); or
  mon_poly monster-defender; or saddle/whistle apply.
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
- Do not re-stub TIN … furniture/HOLE (D-0954) … through
  leash use_leash/next_to_u (D-1005) or drop `objects_at` from timeout
  mkobj (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- Wooden flute/harp: always burn `rn2(DEX)` even when stun/conf
  cleared `do_spec` (C `&=`, not JS `&&`).
- Do not chase seed0009 Scr 72/73 without C-cited shared cause.

## Landmarks (≤15)

- Suite @**#1275**: **43**/44 Scr **11404**/11405 RNG **100%**
  speed `31+0.27/turn` (seed0009 Scr FAIL on HEAD).
- **D-1005:** leash use_leash/next_to_u/check_leash + whimper.
- **D-1004:** pray lycan + peffect_water/vapor + mon_poly youmonst.
- **D-1003:** warnreveal + overexert_hp + Upolyd eel regen_hp.
- **D-1002:** allmain Teleport/Poly/ulycn once-per-turn + mvl_change.
- **D-1001:** ParanoidWerechange/Hit + you_were/unwere + mtimedone
  + wolfsbane + confirm default.
- **D-1000:** ParanoidPray Confirm + see_nearby_monsters allmain.
- **D-0999:** ParanoidBreakwand getlin + see_monster_closeup
  camera/makedog.
- **D-0998:** dopay robbed/angry appease + debit/loan/credit.
- **D-0997:** animate_statue/activate_statue_trap + Blind kick feel +
  break_statue/dosearch/dotrap wire.
- **D-0996:** selftouch/mselftouch/minstapetrify + monstone/xkilled.
- **D-0995:** instapetrify + barefoot kick petrify + bhit DISP_FLASH.
- **D-0994:** sellobj/check_shop_obj + saleable/set_cost/contained_cost
  + dropz/dodrop/throwit/breakobj.
- **D-0993:** globby pudding_merge/obj_meld + flooreffects/make_corpse.
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
