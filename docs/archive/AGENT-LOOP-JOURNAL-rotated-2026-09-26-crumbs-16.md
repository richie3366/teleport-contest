# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — audit 1839–1847 (D-2880–D-2888)

Reviewed the nine `js/` commits since `539f2fe06`. Nine ACCEPT. No Must-fix. Public `sessions` on `941017b03`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `256+1.55/turn` (R² 0.762). Held-out still 12/44 (6,273/11,265 pts, RNG 29.7 %, screens 55.7 %). `.cache/hidden/sessions` absent, so 614/940 was not re-measured. No `js/` edits.

## 2026-09-26 — D-2888 `do_positionbar` writes stair and hero pairs into the static bar

**C locus:** `nethack-c/upstream/src/allmain.c:933–972` `do_positionbar`. Callees: `glyph_to_cmap` (`glyphs.c:199`, live `js/display.js`), `is_cmap_stairs` (`sym.h:107`), `update_positionbar` (`winprocs.h:145` → `tty_update_positionbar` `wintty.c:4159–4167`). `getpos()` appears only in the TODO comment and is not called. No RNG. The whole function and the call at `allmain.c:187` are `#ifdef POSITIONBAR`, defined only in `pcconf.h:284`.
**JS:** `js/allmain.js` `is_cmap_stairs` `:1018`, `update_positionbar` `:1029`, `positionbar_char` `:1039`, `do_positionbar` `:1054`, stairs `:1063`, hero `:1078`, fence `:1084`, call `:1104`.
**Change:** One `do_positionbar` in that C order. A module-level `COLNO` buffer is reused. Each stair with a remembered `levl` glyph in `S_upstair..S_brdnladder` appends `'<'` or `'>'` and `(char) x` (signed 8-bit).
**Verify:** `node scripts/verify.mjs --fn do_positionbar` → PASS syntax (1 changed js file: js/allmain.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `video_update_positionbar` (`sys/msdos/video.c:703`) and `vga_update_positionbar` / `vesa_update_positionbar` are MS-DOS and are not this window port. The `getpos()` TODO is not implemented in C.
**Next:** `eat.c` `intrinsic_possible` (next Open — coverage row). Refill below the band of 8: five tool rows, twelve Open — coverage rows after archive.

## 2026-09-26 — D-2887 `obj_pmname` uses the corpse gender and avoids "aligned cleric"

**C locus:** `nethack-c/upstream/src/do_name.c:1321–1359` `obj_pmname`. Callees: `ismnum` (`monst.h:285`), `pmname` (`do_name.c:1302`), `impossible` (`pline.c`). The `#if 0` `has_omonst` / `OMONST` / `Mgender` arm (`:1323–1334`) is compiled out. No RNG.
**JS:** `js/do_name.js` `obj_pmname` `:658`, gender `:666`, cleric `:673`, `impossible` `:678`, `set_obj_pmname` `:682`. `js/objnam.js` setter `:1203`, forwarder `:1208`, statue `:679`, figurine `:903`, `corpse_xname` `:1249`. `js/apply.js` `:443`. `js/do.js` `:2537`. `js/do_wear.js` `:2003`. `js/trap.js` `selftouch` `:3529` and `:3537`.
**Change:** One `obj_pmname` in that C order. `CORPSE` / `STATUE` / `FIGURINE` and `LOW_PM <= corpsenm < NUMMONS`. `spe & CORPSTAT_GENDER` selects `MALE`, `FEMALE`, or `NEUTRAL`.
**Verify:** `node scripts/verify.mjs --fn obj_pmname` → PASS syntax (6 changed js files: js/apply.js js/do.js js/do_name.js js/do_wear.js js/objnam.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** The `#if 0` saved-montraits arm stays compiled out. `impossible` is not awaited, and the format verb is `%d`.
**Next:** `allmain.c` `do_positionbar` (next Open — coverage row). Eight Open — coverage rows remain after archive, at the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2886 `let_to_name` keeps the class heading in `gi.invbuf`

**C locus:** `nethack-c/upstream/src/invent.c:4799–4839` `let_to_name`. Callees: `strchr` on `oth_symbols`, `Strlen` / `Strcpy` / `Strcat` / `Sprintf`, `eos`, `alloc` / `free` for `gi.invbuf`. `def_oc_syms[oclass].sym` is the showsym glyph. `free_invbuf` is `invent.c:4844–4850`. No RNG.
**JS:** `js/invent.js` `let_to_name` `:2612`, class `:2618`, `oth_symbols` `:2621`, length `:2637`, resize `:2640`, unpaid `:2645`, showsym `:2650`, return `:2663`. `free_invbuf` `:2667`. `display_pickinv_reply` `withsym` `:3941`, heading `:3969`. `js/pickup.js` `query_objlist_pickup` `:1687`.
**Change:** One `let_to_name` in that C order. Signed `char` selects `names[]` when it is in `1..MAXOCLASSES-1`; otherwise unsigned `strchr` on `oth_symbols` (`CONTAINED_SYM` → "Bagged/Boxed items"), else "Illegal objects". The length uses `sizeof "unpaid_"` / `sizeof ""` plus `Strlen` of `"  ('%c')"` and the pad of 8 whenever `oclass` is set.
**Verify:** `node scripts/verify.mjs --fn let_to_name` → PASS syntax (2 changed js files: js/invent.js js/pickup.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `save.c` `freedynamicdata` (`:1085`) does not call `free_invbuf` (save-freeing teardown is unported). A NUL `let` matches `strchr`'s terminator, one past `oth_names`; that slot is not read.
**Next:** `do_name.c` `obj_pmname` (next Open — coverage row). Nine Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2885 `curse` skips coins, resets a welded removal, and slams a studied book

**C locus:** `nethack-c/upstream/src/mkobj.c:1783–1819` `curse`. Callees: `arti_light_radius` (`timeout.js`), `bimanual` (`obj.h:257`, `js/wield.js`), `reset_remarm` (`do_wear.c:3013`), `drop_uswapwep` (`wield.c`), `carried` / `mcarried` (`obj.h:332–333`), `confers_luck`, `set_moreluck`, `weight`, `dead_species`, `attach_fig_transform_timeout`, `book_cursed` (`spell.c:342–351`), `maybe_adjust_light`. `book_cursed` callees: `pline`, `Tobjnam`, `set_bknown`, `stop_occupation`. No RNG in `curse`. `attach_fig_transform_timeout` still rolls `rnd(9000)+200`.
**JS:** `js/mkobj.js` `curse` `:598`, coin `:601`, flags `:606–609`, `reset_remarm` `:612`, `drop_uswapwep` `:614`, bag `:618`, figurine `:620–624`, book `:626–631`, light `:634`. `js/spell.js` `book_cursed` `:910`, slam `:919`, `set_bknown` `:920`, `stop_occupation` `:921`.
**Change:** One `curse` in that C order. Coins return before any write. `old_light` is taken only when `lamplit`.
**Verify:** `node scripts/verify.mjs --fn curse` → PASS syntax (2 changed js files: js/mkobj.js js/spell.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `bless` and `unbless` still omit the `COIN_CLASS` return and the bag-of-holding `weight` write (`js/mkobj.js` `bless` `:641`, `unbless` `:662`). A null `otmp` returns; C is `NONNULLARG1`.
**Next:** `invent.c` `let_to_name` (next Open — coverage row). Nine Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2884 `surface` names a swallowed animal's maw or husk

**C locus:** `nethack-c/upstream/src/dungeon.c:1750–1788` `surface`. Callees: `u_at` (`you.h:562`), `is_animal` / `digests` / `enfolds` (`mondata.h:67–74`), `SURFACE_AT` (`rm.h:146`), `IS_AIR`, `Is_waterlevel`, `is_pool`, `Underwater` (`youprop.h:279`), `hliquid`, `is_ice`, `is_lava`, `On_stairs`, `IS_WALL`, `IS_DOOR`, `IS_ROOM`, `Is_earthlevel`. No RNG.
**JS:** `js/sit.js` `surface` `:475`, swallow `:482–488`, air `:489`. `js/dokick.js` slide `:1479`. `js/engrave.js` `cant_reach_floor` `:427`, `read_engr_at` `:500`, `eloc` `:1388`. `js/dothrow.js` gold `:985`, `hitfloor` `:1595`, `hurtle` `:3130`. `js/trap.js` `float_up` `:3133`.
**Change:** One `surface` in that C order. The swallow test is first: same cell as the hero, `uswallow`, and `is_animal(ustuck.data)`, then `digests` / `enfolds`. `digests` and `enfolds` are the `mhitu.js` exports (`imports.mjs --can sit.js mhitu.js` — hoisted, cycle-safe).
**Verify:** `node scripts/verify.mjs --fn surface` → PASS syntax (5 changed js files: js/dokick.js js/dothrow.js js/engrave.js js/sit.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `trapeffect_fire_trap` still assigns `'floor'` (`js/trap.js:4683`; `trap.c` fire wording). `look_here`'s blind feel-floor string stays `'floor'` (`js/invent.js:8217`).
**Next:** `mkobj.c` `curse` (next Open — coverage row). Four Stale parks. Refill below the band of 8: eight tool rows, eleven Open — coverage rows after archive.
