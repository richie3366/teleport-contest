# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence; full port = verify no-op. Detail in Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Refill (D-1979):** proxy parked-only; queue at 12 via data.md/turns.md omits.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1986 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1986 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-1986.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-1986.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1986: `js/display.js` — grid paint is span-gated per C (`gnew ||` live framecolor arm via `get_bkglyph_and_framecolor`; `gnew` cleared only when painted, `: Named: `map_glyphinfo` glyphmap[]-base re-derive at `:2250` (tty transform already applied at sto
- D-1985: `js/display.js` — `show_glyph_cell` resolves the glyph id first (two ids can share one ttychar, e.g. altar/fountain `{`) and gates `gnew = 1` + `mark_ Named: span-loop shape + `:2241–2257` `gnew || framecolor` gate + no blanket clear (next Open row
- D-1984: `js/display.js` — gbuf bbox tracked (`gbuf_start/stop` + `mark_gbuf_dirty` + `reset_glyph_bbox`; writers+clear span, post-rebuild reset); span paint deferred. Named: span paint + re-derive + frame store.
- D-1983: `js/display.js` — new exported `SYM_OFF_X = 190`/`SYM_MAX = 196` (`105 + 18 + 61 + 6 + 6`: MAXPCHARS 105 from `S_expl_br` 104, MAXOCLASSES 18 from `ob Named: `get_othersym` base + `assign_graphics` showsyms copy (ov tables live here; hero arm reads
- D-1982: `js/display.js` — module-local `clipping`/`clipx`/`clipxmax`/`clipy`/`clipymax` (C file-statics) + `clip_screen_size()` (`CO`/`LI` ≡ `game.nhDisplay.c Named: core `cliparound` call sites (`allmain.c:546` moveloop, `dungeon.c:1580` u_on_newpos, `get
- D-1981: `js/display.js` — new exported async `under_water(mode)` in exact C order with `:line` citations (guard via imported `Is_waterlevel` + `u.uswallow`; ` Named: non-docrt caller wiring — functions live, unwired (`allmain.c:432,434` moveloop limited up
- D-1980: `js/sounds.js` — mcan arm between `pline_msg` and `verbl_msg` in exact C order (`mtmp.mcan && verbl_msg_mcan` short-circuit; `SetVoice` + `await verba Named: `outoracle` open-failure `oracle_flg = -1` arm (`rumors.c:690–693` — embed cannot fail, fl
- D-1979: `js/sounds.js` — MS_NURSE + MS_GUARD arms in C switch order (before SOLDIER, as in C) with `:line` citations. uwep is `game.u.uwep` and uarm* are `gam Named: `verbl_msg_mcan` cancelled-speech epilogue (`:1224–1226` mtmp->mcan arm — next Open row) +
- D-1978: `js/minion.js` — new exported async `demon_talk(mtmp)` in exact C order with `:line` citations (local `u_wield_art`/`Amonnam`/`sgn`/`Inhell` reused, n Named: MS_NURSE / MS_GUARD (next Open row); `verbl_msg_mcan` cancelled-speech epilogue + save-res
- D-1977: `js/sounds.js` — four arms in C switch order (VAMPIRE after SELL, DJINNI after ORC, ARREST+SOLDIER after SEDUCE) with `:line` citations. Named: MS_BRIBE+MS_CUSS (`demon_talk`/`cuss` absent — separate Open row); MS_SPELL / MS_NURSE / M
- D-1976: `js/display.js` — new exported async `curs_on_u()` (`await flush_screen(1)`; async for bot/more nhgetch reach, same shape as `redraw_map` D-1974) + ne Named: caller wiring — C call sites stay on their current flush/paint path (`allmain`/`eat`/`end`
- D-1975: `js/display.js` — new exported sync `reglyph_darkroom()` in exact C order with `:line` citations (`dark_room`/`use_color` default-On via `!== false` p Named: `gs.showsyms[S_darkroom]` equate (`:1850–1853`, no showsyms[]/glyphmap[] machinery — D-197
- D-1974: `js/display.js` — new exported async `redraw_map(cursor_on_u)` in exact C order with `:line` citations (guard short-circuit; full-cell resend with no  Named: caller wiring — docrt_flags redrawonly stays named on `docrt`; tty cliparound resend has n
- D-1973: `js/display.js` — new exported `get_bkglyph_and_framecolor(x, y)` returning `{ bkglyph, framecolor }` in exact C arm order with `:line` citations (gbu Named: `gw.wsettings.map_frame_color` store + its getpos_sethilite HI_ZAP/NO_COLOR maintenance (`
- D-1972: `js/display.js` — new `MG_FLAG_NORMAL`/`MG_FLAG_NOOVERRIDE`/`MG_HERO` consts (`display.h :990–996`; MG_HERO is write-only in C — no reader in src/win/ Named: glyphmap[] base copy + sym.symidx/tileidx (no showsyms/tile machinery — `reset_glyphmap` s
<!-- landmarks:end -->
