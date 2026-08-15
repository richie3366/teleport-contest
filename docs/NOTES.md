# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.876) cadence **#1290**. Next @**#1295**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1024** `flip_through_book` / `flip_coin` (doapply
  SPBOOK/COIN). Public traces unhit (green+apply cohort still PASS).
- **Next cluster:** apply.js `use_candle` / `use_candelabrum`.
  Grease still named in apply debt; remaining nhl_gamestate memcpy
  u/disco/mvitals/spl_book named in `startup.md`.
- **D-1024 falsifier (held):** underwater book → ECMD_OK; blank paper
  makeknown; BoT hear rustling; DEX≥10 coin → rn2(2) heads/tails;
  hallu coin → rn2(100); underwater stack → split 1 + dropx.

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
  flip_through_book/flip_coin (D-1024) or drop `objects_at` (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- `shopdig(1)` skip snatch iff `um_dist || helpless || !bill`.
  `cancel_monst` youdefend walks `game.invent[]`. cmdq pickaxe is
  `doapply` fn + invlet KEY. Tutorial stash needs `setnotworn`.
- Do not default `sell_response` to `'a'`; do not “fix” `robbed -= offer`.
- Do not drive `setnotworn` from `owornmask`/`setworn(null)` — C is
  pointer-equal on `worn[]` (D-1020). Do not `delobj` tutorial loot
  on leave or the jelly lump (`useupall`/`obfree`, no `obj_resists`
  rn2). Jelly: GETOBJ_PROMPT with no eggs; stack-cancel does not
  unsplit (C `unsplitobj` no-op on OBJ_FREE).

## Landmarks (≤15)

- Suite cadence **#1290**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` (R² 0.876).
- **D-1024:** flip_through_book / flip_coin doapply SPBOOK/COIN.
- **D-1023:** use_lamp/light_cocktail/use_trap/bagotricks.
- **D-1022:** use_whip/use_grapple/use_pole + Snickersnee is_pole.
- **D-1021:** use_royal_jelly + dorub/doapply + timeout kill_egg.
- **D-1020:** setnotworn worn[] pointer-walk + leave-tutorial restore.
- **D-1019:** sellobj BSS `'\0'` + robbed C precedence + nyaq not stored.
- **D-1018:** `use_pick_axe` cmdq `doapply`+invlet + getobj KEY.
- **D-1016:** `shopdig(1)` `um_dist` De Morgan + do.js `setnotworn`.
- **D-1015:** tutorial `setnotworn` clears oc_oprop / EStealth.
- **D-1014:** apply use_stone + dorub/doapply graystone.
- **D-1013:** apply BLINDFOLD/LENSES Blindf_on/off.
- **D-1012:** pray collapsing…cursed_blindfold + minors + helpers.
- **D-1011:** pray majors Stoned…Region + make_sick/region/rescue.
