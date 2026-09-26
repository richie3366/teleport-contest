# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-25 — D-2812 `remove_worn_item` unwields through the C off-functions

**C locus:** `nethack-c/upstream/src/steal.c:213–290` `remove_worn_item`. `donning` then `cancel_don` (`:218`). Return when `owornmask` is clear (`:219`). Save `in_use`, set it, and restore it (`:242–243`, `:289`) so `emergency_disrobe` and `lava_effects` leave the object alone. Armor dispatches `skinback(TRUE)` then `*_off` or `setworn` (`:246–261`). Amulet, ring, tool, and weapons call `Amulet_off`, `Ring_gone`, `Blindf_off`, and `*gone` (`:263–275`). Ball and chain call `unpunish` only when `unchain_ball` (`:277–279`); any other leftover mask calls `setnotworn` (`:280–282`). `debugpline1` on `OBJ_DELETED` is the non-DEBUG empty macro (`include/lint.h`).
**JS:** `js/steal.js` `remove_worn_item` `:271`. `donning` `js/do_wear.js:3759`. `cancel_don` `js/do_wear.js:3711`.
**Change:** One `remove_worn_item` in that C order. `donning` and `cancel_don` are exported from `do_wear.js` and called before the mask test. `in_use` is 1 across the body and then restored.
**Verify:** `node scripts/verify.mjs --fn remove_worn_item` → PASS syntax (6 changed js file(s): js/do.js js/do_wear.js js/muse.js js/steal.js js/steed.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `shk.c:173` `money2mon` stays synchronous at `js/shk.js:4533`, so quivered gold still skips `remove_worn_item`. `steal.c:784` `maybe_absorb_item` has no JS function (already named from `lock.js`).
**Next:** `steed.c` `mount_steed` (next Open — coverage row).

## 2026-09-25 — D-2811 `coord_desc` compass text and autodescribe suffix

**C locus:** `nethack-c/upstream/src/getpos.c:595–635` `coord_desc`. `dxdy_to_dist_descr` is `getpos.c:557–589`. MAP is `<%d,%d>` (`:612–615`). SCREEN is `[%02d,%02d]` of `y+2,x` when `ROWNO`/`COLNO` stay under 100 (`:625–631`). COMPASS and COMFULL are `(dxdy_to_dist_descr)` with full words only for COMFULL (`:604–610`). Unknown `cmode` leaves the buffer empty (`:600–603`). The look_all kitten is `pager.c:2052–2053`, after `coord_desc`, and only there.
**JS:** `js/display.js` `coord_desc` `:7530`. `js/pager.js` `look_coord_prefix` `:345`. `js/getpos.js` autodescribe `:1339`.
**Change:** Delete the pager clone and call the `display.js` export. `look_coord_prefix` kittens only when `look_all` asks. `look_traps` and `look_engrs` pass the bare `coord_desc` string into the same `%s` / `%8s` / `%12s` widths.
**Verify:** `node scripts/verify.mjs --fn coord_desc` → PASS syntax (2 changed js file(s): js/getpos.js js/pager.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `auto_describe_text` still returns firstmatch only (`show_glyph` / lookaround). `doname_with_price`, `doname_vague_quan`, and buried/embedded suffixes stay off autodescribe.
**Next:** `steal.c` `remove_worn_item` (next Open — coverage row).

## 2026-09-25 — D-2810 `petattr_to_tty` paints italic as underline and blink as bold

**C locus:** `nethack-c/upstream/win/tty/termcap.c:1339–1376` `s_atr2str`, called from `term_start_attr` `:1434`. ANSI default (`termcap.c:157–160`) sets `nh_HI`, `nh_US`, and `MR`. `ZH`, `MB`, `MD`, and `MH` stay null (`:46–47`). Italic falls through the empty `ZH` test into underline (`:1343–1356`). Blink finds `MB` null and falls through to bold (`:1349–1364`). Dim stays `nulstr` (`:1370–1374`). The pet site is `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)`.
**JS:** `js/display.js` `petattr_to_tty` `:308`. `mon_map_attr` `:332`. `glyph_tty_attr` `:345`.
**Change:** Same switch order as `s_atr2str` for those capabilities. Italic and underline return terminal `ATR_UNDERLINE` (4). Blink falls through and returns terminal `ATR_BOLD` (2).
**Verify:** `node scripts/verify.mjs --fn optfn_petattr` → PASS syntax (1 changed js file: js/display.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `s_atr2str` is not a general export. Other `term_start_attr` sites in review 1758 (`wintty.c:1186`, `:1318`, `:1807`, `:2338`, `:2350`, `:3935`, `:4959–4969`, `:5170`) are menu, status, or inverse, not `wc2_petattr`.
**Next:** `getpos.c` `coord_desc` (next Open — coverage row).

## 2026-09-25 — D-2809 `Boots_on` fumble timeout saturates at TIMEOUT

**C locus:** `nethack-c/upstream/src/do_wear.c:231–234` `Boots_on` `FUMBLE_BOOTS` `incr_itimeout(&HFumbling, rnd(20))`. `do_wear.c:584–586` `Gloves_on` is the same call. `potion.c:55–85` `itimeout` saturates at `TIMEOUT` and floors below 1; `incr_itimeout` stores that through `set_itimeout`.
**JS:** `js/do_wear.js` `Boots_on` `:1513`. `Gloves_on` `:1423`. `incr_itimeout` is `js/potion.js:540` (`imports.mjs --can`: already imported).
**Change:** Seed the slot from the merged flat (C `HFumbling` is one long), call `incr_itimeout(prop, rnd(20))`, then set `u.HFumbling` from `prop.intrinsic`. A timeout already at `TIMEOUT` plus 20 stays `TIMEOUT`. The old mask turned that sum into 19.
**Verify:** `node scripts/verify.mjs --fn Boots_on` → PASS syntax (1 changed js file: js/do_wear.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: do_wear.js is outside the auto shared set) · VERIFY: PASS. Probe: slot at `TIMEOUT` plus 20 stays 16777215 (old mask was 19); `TIMEOUT-5` plus 20 stays `TIMEOUT` (old mask 14); 3 plus 7 stays 10.
**Named:** A null `uarmf` still returns before the switch (C would dereference).
**Next:** `js/display.js` `petattr_to_tty` italic and blink (next Must-fix, review 1758).

## 2026-09-25 — D-2808 `unstuck` places the ball and chain on a swallowed exit

**C locus:** `nethack-c/upstream/src/mon.c:3438–3467` `unstuck`. Swallowed exit `:3448–3456`: clear `mswallower`, set `u.ux`/`u.uy` from the engulfer, `placebc` when `Punished && uchain->where != OBJ_FLOOR` (`:3451–3452`), then `vision_full_recalc` and `docrt`. Re-engulf `mspec_used = rnd(2)` `:3458–3465`.
**JS:** `js/mhitu.js` `unstuck` `:1637`. `OBJ_FLOOR` joins the existing `const.js` import. `placebc` (`ball.js:380`) and `Punished` (`pray.js:245`) were already live.
**Change:** After `ux`/`uy` and before `vision_full_recalc`, call `placebc` when `Punished()` and `uchain.where` is not `OBJ_FLOOR`. That is the call `thitmonst`'s iron-ball `return 1` (`dothrow.c:2240–2241`) assumes has already put `uball` down.
**Verify:** `node scripts/verify.mjs --fn unstuck --reach-all` → PASS syntax (2 changed js files: js/dothrow.js js/mhitu.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `mhitm.c:1255` `slept_monst` is still three local clones that clear `ustuck` (`js/mhitm.js:1381` `slept_slee_mm`, `js/music.js:328`, `js/potion.js:3730`). The C gate is `!u.uswallow`, so this swallow `placebc` would not run there; `mspec_used = rnd(2)` is skipped.
**Next:** `js/do_wear.js` `Boots_on` `FUMBLE_BOOTS` timeout saturate (next Must-fix, review 1762).

## 2026-09-26 — Audit e1ef155a9 (reviews 1758–1766) + cadence 44/44.

Reviews audit D-2799..D-2807 against pinned C (csym bodies + callers,
sym.mjs, per-SHA `hidden-proxy verify --reach-all`). 1759/1760/1761/1764/1765/1766
ACCEPT. 1758 QUALITY-RISK: `petattr_to_tty` returns 0 for italic and blink;
`s_atr2str` paints those as underline and bold. 1762 QUALITY-RISK:
`Boots_on` fumble adds `rnd(20)` with `& TIMEOUT` and wraps. 1763
QUALITY-RISK: a swallowed iron ball returns 1 from `thitmonst` while
`unstuck` still skips `placebc`. Every re-measure was 0 blocked on the
12-row board, smoke REACH-OK, 0 REGRESSED. Cadence at `e1ef155a9`:
public 44/44, Scr 11,405, RNG 792,838, speed `252+1.58/turn` (R² 0.767);
held-out 12/44 (+0, last scored 2026-09-25T19:01Z). `hidden-proxy score`
12/12 PASS; `.cache/hidden/sessions` is empty (941 recipes), so the
614/940 fortress was not re-run and no PASS→FAIL row was opened. Rule #2
clean. Next: Must-fix `unstuck` `placebc`.
