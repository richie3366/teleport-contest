# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.867) cadence **#1300**. Next @**#1305**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1034** ordinary `throne_sit_effect` 1–13 + `take_gold`
  + `do_genocide(5)`. Public traces unhit (green+cohort PASS).
- **Next cluster:** nhl_gamestate memcpy u/disco/mvitals/spl_book +
  `init_uhunger` (`startup.md`). `hatch_egg` still deferred.
- **D-1034 falsifier (held):** non-Vlad throne case 5 strips gold;
  case 8 getlin `none` leaves mvitals; case 1 adjattrib+losehp;
  courtmon `makemon` at ux,uy.

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
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Do not re-stub TIN … furniture/HOLE (D-0954) … through
  ordinary throne_sit_effect (D-1034) or drop `objects_at` (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- `shopdig(1)` skip snatch iff `um_dist || helpless || !bill`.
  `cancel_monst` youdefend walks `game.invent[]`. cmdq pickaxe is
  `doapply` fn + invlet KEY. Tutorial stash needs `setnotworn`.
  Do not default `sell_response` to `'a'`; do not “fix” `robbed -= offer`.
- Do not drive `setnotworn` from `owornmask`/`setworn(null)` — C is
  pointer-equal on `worn[]` (D-1020). Do not `delobj` tutorial loot
  on leave or the jelly lump (`useupall`/`obfree`, no `obj_resists`
  rn2). Jelly: GETOBJ_PROMPT with no eggs; stack-cancel does not
  unsplit (C `unsplitobj` no-op on OBJ_FREE).

## Landmarks (≤15)

- Suite cadence **#1300**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` (R² 0.867).
- **D-1034:** ordinary throne_sit_effect 1–13 + take_gold + do_genocide.
- **D-1033:** special_throne_effect + dosit IS_THRONE + losexp.
- **D-1032:** fig_transform / attach_fig_transform_timeout.
- **D-1031:** hornoplenty doapply HORN_OF_PLENTY + floor tip.
- **D-1030:** use_unicorn_horn doapply UNICORN_HORN + TimedTrouble.
- **D-1029:** use_figurine doapply FIGURINE + make_familiar.
- **D-1028:** use_bell doapply BELL/BELL_OF_OPENING + openit/mkundead.
- **D-1027:** use_tinning_kit doapply TINNING_KIT + homemade spe=-2.
- **D-1026:** use_grease doapply CAN_OF_GREASE + inaccessible.
- **D-1025:** use_candle / use_candelabrum doapply + weight spe.
- **D-1024:** flip_through_book / flip_coin doapply SPBOOK/COIN.
- **D-1023:** use_lamp/light_cocktail/use_trap/bagotricks.
- **D-1022:** use_whip/use_grapple/use_pole + Snickersnee is_pole.
- **D-1021:** use_royal_jelly + dorub/doapply + timeout kill_egg.
