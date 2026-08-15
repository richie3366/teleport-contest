# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `33+0.27/turn` R² 0.868) after D-1046 cadence **#1315**;
  next @**#1320**.
- Mode: **map-driven retirement** under fortress (not FAIL peels /
  LB). Pick a C cluster from `debt.md` / `absent.md`; keep green PASS.
- Density: one semantic cluster (~50–300 LOC or small-file restart),
  not one-bullet peels; empty “hold green only” iters → stop loop
  (cadence score refreshes every 5, deferred while Must-fix is open).
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest: D-1047 `consume_obj_charge` unpaid/`check_unpaid`
  (D-1023 risk 3). Remaining Must-fix: Vlad `HConfusion` only
  (D-1033 risk 2). Loop is **fail-closed** (review every 3, cadence
  every 5 score-only unless Must-fix is open). Agents **commit +
  `git push`**.
- **Next cluster:** Must-fix — Vlad special case 10: C sets
  `HConfusion` only; JS must not also force flat `u.Confusion`.
  Source: D-1033 risk 2. Do not dump tut-1 while Must-fix is open.
- **Hypothesis:** none live. Falsify Vlad HConfusion against C
  `sit.c` `special_throne_effect` + green.

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
- Do not FORCE linedup/FlipX/stair-screen coords — C place matched (#1092).
- Do not invent SpLev_Map flip in `flip_level` — C leaves it (#1092).
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
  leaving their level (D-1037 — peel via `save_timers`). `cry_sound`
  uses C `monflag.h` numbers, not growl locals. Do not restore
  `getdir_whip` or `hurtle_apply` `teleds` (D-1038). Do not put
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
  as `spe--` only (D-1047 — C `check_unpaid` first).

## Landmarks (≤15)

- Suite after D-1046 cadence **#1315**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `33+0.27/turn` (R² 0.868). Next @**#1320**.
- **D-1047:** `consume_obj_charge` unpaid/`check_unpaid` +
  `cost_per_charge` (not local `spe--`).
- **D-1046:** `light_cocktail` `{obj}` / `*optr` snuff-merge + split.
- **D-1045:** whip `yname`/`Amonnam`/`mbodypart` (not apply clones).
- **D-1044:** `special_obj_hits_leader` `urole.questarti`.
- **D-1043:** `should_mulch_missile` hero blessed `!rnl(4)`.
- **D-1042:** `find_mac` minvent worn `ARM_BONUS` / guarding −2.
- **D-1039:** `dosit` trap-before-throne + `dotrap` `VIASITTING`.
- **D-1041:** `thitmonst` WEAPON/weptool/GEM tmp+dieroll `hmon`/`tmiss`.
- **D-1040:** pole `glyph_at` targeting (not live `m_at` stand-in).
- **D-1038:** lock `getdir` C envelope + dothrow `hurtle`/`hurtle_step`.
- **D-1037:** save_timers RANGE_LEVEL + hatch_egg dispatch.
- **D-1036:** hatch_egg/learn_egg_type/cry_sound body.
- **D-1035:** nhl_gamestate memcpy u/disco/mvitals/spl_book + init_uhunger.
- **D-1034:** ordinary throne_sit_effect 1–13 + take_gold + do_genocide.
