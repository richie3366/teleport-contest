# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `33+0.27/turn`) last full measure **D-1015**. Next cadence
  @**#1290**. D-1017 held green+zap cohort 18/18 (self-cancel unhit).
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5 are expected).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: **D-1017** `cancel_monst` youdefend self-cancel walks
  `game.invent[]` (was `nobj` on the Array; ABON never ran).
- **Next cluster:** D-1018 `use_pick_axe` cmdq wield re-apply
  (`{typ:'ec'}` vs C `doapply`+invlet). Then sellobj `'a'`/`robbed`;
  setnotworn pointer. Not absent.md/whip until those Keeps are honest.
- **D-1017 falsifier (held):** `zapyourself` WAN/SPE_CANCELLATION with
  worn ABON ring → `cancel_item` on each invent obj. Public 18/18
  cohort PASS does **not** prove that path.

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
  cancel_monst invent walk (D-1017) or drop `objects_at` (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- `shopdig(1)` skip snatch iff `um_dist || helpless || !bill` (C close
  = `!um_dist`; do not restore `if (!um_dist) return`).
- Hero `cancel_monst` self-cancel must iterate `game.invent[]`, never
  `nobj` on the Array (D-1017). Tutorial stash needs `setnotworn`.

## Landmarks (≤15)

- Suite after **D-1015**: **44**/44 Scr **11405**/11405 RNG **100%**
  speed `33+0.27/turn`.
- **D-1017:** `cancel_monst` hero invent Array walk + clay hallu.
- **D-1016:** `shopdig(1)` `um_dist` De Morgan + do.js `setnotworn`.
- **D-1015:** tutorial `setnotworn` clears oc_oprop / EStealth.
- **D-1014:** apply use_stone + dorub/doapply graystone.
- **D-1013:** apply BLINDFOLD/LENSES Blindf_on/off.
- **D-1012:** pray collapsing…cursed_blindfold + minors + helpers.
- **D-1011:** pray majors Stoned…Region + make_sick/region/rescue.
- **D-1010:** apply use_crystal_ball + thin detect callees.
- **D-1009:** apply use_towel + wet/dry_a_towel + burnarmor dry.
- **D-1008:** apply use_saddle + can_saddle whirly/unsolid.
- **D-1007:** apply whistle tin/magic/eucalyptus + can_blow/vault.
- **D-1006:** mon_poly monster-defender + newcham null-mdat/mbirth.
- **D-0934:** CONSTITUTION §1.2 + `get_configfile` recorder path.
