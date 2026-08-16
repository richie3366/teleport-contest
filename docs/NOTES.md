# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.88) after cadence **#1330**;
  next @**#1335**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5, deferred while Must-fix is open).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: D-1057 furniture sit_message (sink/altar/grave/stairs/ladder).
  Must-fix empty.
- **Next cluster:** Open — `dosit` lava / ice / drawbridge sit
  (terrain, not trap-lava D-1039).
- **Hypothesis:** lava sit is WWalking-only (C `sit.c:539–549`):
  sit_message + `burn_away_slime` + likes_lava warm vs `d(2|10,10)`
  burn. Do not pull ice Cold_resistance or DRAWBRIDGE_DOWN into
  that cluster. Falsifier: sit LAVAPOOL + likes_lava → warm pline,
  no `losehp`; no throne `rnd(6)`.

## Don't re-check (≤15)

- Do not predict / amend / extra-commit **Addressed** HASH (chicken-egg).
  Stamp `D-NNNN` in the fix commit; the next real commit fills
  `git log --format=%h` of that fix. No stamp-only SHAs. Live
  `LOOP-QUEUE.md` is unchecked-only — run
  `node scripts/archive-loop-queue-done.mjs` in the same commit.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483); D-0930 is
  space+attr0+CLR_GRAY only.
- Don't skip painting `disp_ch===' '` in flush — breaks S_air (D-0931).
- Don't emit mid-row space runs >4 as literal spaces when contest CUFs
  (D-0931); keep inv/uline spaces (D-0129); leading bold pads (D-0932).
- Do not FORCE shk satdoor/`onlineu` without hero-path proof (D-0376).
- Do not FORCE linedup/FlipX/stair-screen / SpLev_Map flip (#1092).
- Do not blanket-restore overlay `_pending_message` for all corner menus
  — only look_here `keep_message_leftover` (D-0929); keep teleds placebc.
- Do not HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194).
- Judge does **not** elide RC path (D-0933); §1.2 allows recorder
  `get_configfile` only (D-0934) — do not extend carve-out.
- Do not re-stub TIN … furniture/HOLE (D-0954) … through
  hatch_egg (D-1036/D-1037) or drop `objects_at` (D-0980).
- Do not chase public LB / `mazesofmenace` CDN session drift in-loop.
- Do not push shared `maketrap` PIT IS_ROOM→ROOM morph without full
  suite — keep morph in music `do_pit` (D-0972).
- `shopdig(1)` skip snatch iff `um_dist || helpless || !bill`.
  `cancel_monst` youdefend walks `game.invent[]`. cmdq pickaxe is
  `doapply` fn + invlet KEY. Tutorial stash needs `setnotworn`.
  Do not default `sell_response` to `'a'`; do not “fix” `robbed -= offer`.
- Do not memcpy gi worn/ball pointers with struct you (D-1035 — C `u`
  has no `uwep`). Do not drive `setnotworn` from `owornmask`/
  `setworn(null)` (D-1020). Do not `delobj` tutorial loot on leave.
  Do not fire object timers for floor/buried/contained objs after
  leaving their level (D-1037 — peel via `save_timers`). Do not omit
  `msounds[]` / restore always-chitter `cry_sound` (D-1053). Do not
  restore `getdir_whip` or `hurtle_apply` `teleds` (D-1038). Do not put
  `confdir` inside shared `getdir`. Do not skip `dosit`
  `else if (trap)` before `IS_THRONE` (D-1039). Do not restore live
  `m_at`/`sobj_at` as `glyph_is_poleable` (D-1040). Do not restore
  `thitmonst` always-`tmiss` for WEAPON/weptool/GEM (D-1041). Do not
  restore `find_mac` base-`data.ac` stub (D-1042). Do not restore
  hero blessed mulch `rn2(4)` (D-1043 — C `rnl(4)`). Do not restore
  `special_obj_hits_leader` `game.u.questarti` (D-1044 — C
  `urole.questarti`). Do not restore apply `yname`/`Amonnam`/
  `mbodypart` clones (D-1045 — C `yname`/`highc(a_monnam)` /
  `mbodypart(mtmp)`). Do not restore `light_cocktail(obj0)` by-value
  (D-1046 — C `struct obj **`). Do not restore `consume_obj_charge`
  as `spe--` only (D-1047 — C `check_unpaid` first). Do not restore
  Vlad case 10 extra flat `u.Confusion` (D-1048 — C `HConfusion`
  only). Do not restore `take_gold` invent-splice without
  `remove_worn_item` (D-1049). Do not `void telekinesis` (D-1050).
  Do not restore apply `u_wipe_engr_apply` / empty `display_*_positions`
  (D-1051). Do not restore `use_lamp` `(u.Glib|0)&TIMEOUT` (D-1052 —
  C `Glib` ≡ `uprops[GLIB].intrinsic`). Do not stamp parent-chain
  `where` onto save/bones `cobj` (D-1054). Do not skip `dosit`
  pool/gremlin `in_water` or rewrite second `water_damage` to `uarmf`
  (D-1055). Do not restore sit `u.Underwater` (D-1056 — C
  `youprop.h` `Underwater` ≡ `u.uinwater`). Do not skip furniture
  sit_message / `altar_wrath` on `IS_ALTAR` (D-1057). Do not pull
  lava HP into an ice/drawbridge peel.

## Landmarks (≤15)

- Suite after cadence **#1330**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.88). Next @**#1335**.
- **D-1057:** `dosit` sink/altar/`altar_wrath`/grave/stairs/ladder
  sit_message (C `"stairs"`/`"ladder"`, not defsyms up/down).
- **D-1056:** `dosit` `Underwater()` reads `u.uinwater`.
- **D-1055:** `dosit` `in_water` + early pool/gremlin goto + C
  `uarm` twice.
- **D-1054:** restore `cobj` `OBJ_CONTAINED`; buried `OBJ_BURIED`.
- **D-1053:** `msounds[]` / `cry_sound` no longer always-chitter.
- **D-1052:** lamp `make_glib` ticking `Glib & TIMEOUT`.
