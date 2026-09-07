# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker (2026-09-06, human):** 275 `scen-*` sessions (`scripts/scenario-gen.mjs`) pass 7/275 — the held-out shape (leaderboard 7/44). Mutants 255/278 = saturated. Queue from `hidden-proxy queue`; map singletons Deferred. First: 4 `ReferenceError` imports (Must-fix), then `calendar.c getlt` EDT→EST shift (51 sessions dated `20000206`). Themed-room step-0 rows → `geom-probe`.

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 → 824 x_monnam); owner is a C comment; DontAsk-flags arm alone REGRESSES (reverted). Detail + falsifier in LOOP-QUEUE Parked; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence; full port = verify no-op. Detail in Parked.
- **Park `dopush` (mimic-viz, not the push):** single cell r13c32, RNG tied; needs C-side viz at step 127 or `view_from` audit. Detail in Parked.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1998 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1998 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-1998.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-1998.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1998: `js/wizcmds.js` — per-prop switch in exact C order with `:line` citations: SICK `!rn2(2) ? Named: count-prefix menu digits (always `DEFAULT_TIMEOUT_INCR`); non-wizard `unavailcmd`/`ecname`
- D-1997: `js/invent.js` resistance catalogue in C order (both builders) + AD_FIRE/COLD/DISN/ELEC/ACID item messages + `enl_temp_resist` Acid/Stone prefix + moreluck/luckstone/ugangr tail; `js/attrib.js` six H-field rows. Named: Sick `defended(AD_DISE)` form arm + vision/appearance/transport/physical/shape leftovers.
- D-1996: one-word addition to the existing same-edge `./const.js` import (after `BLINDED`, matching C `BLINDED=15, DEAF=16` order) with a C-citation comment. Named: none (import-only; D-1988 precedent — no `c-js-map` section names this binding as omitted,
- D-1995: `js/invent.js` status arms + `from_what` catalogue + corner `^X` menu; `js/attrib.js` dwa/gno infra + H-fields; `js/wizcmds.js` SLIMED arm. Named: non-swallow held/steed/cause_known + Cold/halfdmg + Warn/Clairvoyant + shape/Hate_silver/Free/Fixed_abil + blocked-Stealth + SICK/STONED wiz arms.
- D-1994: `js/allmain.js` — SATIATED/WEAK Monk WIS arms (`(game.urole?.mnum|0)===PM_MONK` idiom) + every-5 H-only Clairvoyant WIS arm (flat+intrinsic, blocked v Named: `exercise()` STR/CON `encumber_msg` tail (sync→async ripple; same standing omit as `adjatt
- D-1993: three one-line `exercise(A_STR, false)` insertions with C `:line` comments, each directly after its C pline. Named: none new — DGST `Slow_digestion` early-out (`:1422–1425`) and total-digest `Half_physical_
- D-1992: deleted the clone; message via live `is_sword` (`./objects.js`) + `weapon_descr` (`./invent.js`) + live `makeplural` (`./objnam.js`) with C `:line` co Named: `weapon_descr` P_NONE specials (corpse/tin/egg/statue/boulder/towel/opener/glob) + sling/b
- D-1991: exact-C arm order with `:line` citations — `end_burn` (new `./timeout.js` edge) + `await Armor_gone()` + `useup` (same-module `./invent.js`) for break Named: `donning`/`cancel_don` (`do_wear.c` locals, unwired — no corpus session polyselfs mid-don)
- D-1990: cond built in exact C order with `:line` citations — fatal four first (flat `u.Stoned/Slimed/Sick` from `make_*` OR `uprops[].intrinsic` from `#wizint Named: `flags.showvers`/`status_version` (`:208–211`, vers `""`); `MAXCO` panic (`:230–235`, unre
- D-1989: `getlt()` = `nyLocaltime(getnow())`; new module-local America/New_York engine, plain arithmetic per Rule #2 (no Intl / node TZ; only `Date.UTC`/getUTC Named: none — getlt/phase/friday/night/midnight/yyyymmdd/hhmmss/yyyymmddhhmmss/getyear all live.
- D-1988: three one-line import extensions, no new module edges (`imports.mjs --can` ALREADY on all three; same 82-module SCC, no TDZ): `muse.js` gains `is_pit` Named: none (import-only; no map section names these as omitted, so no `c-js-map` edit).
- D-1987: `js/getpos.js` — new `HiliteBackground = 2` + `defaultHiliteState` module state (C `:30–38`); `getpos_sethilite` in exact C order (old store read, def Named: `wdmode` field of `gw.wsettings` unset (tiled mode unsupported); C `bgcolors` On default (
- D-1986: `js/display.js` — grid paint is span-gated per C (`gnew ||` live framecolor arm via `get_bkglyph_and_framecolor`; `gnew` cleared only when painted, `: Named: `map_glyphinfo` glyphmap[]-base re-derive at `:2250` (tty transform already applied at sto
- D-1985: `js/display.js` — `show_glyph_cell` resolves the glyph id first (two ids can share one ttychar, e.g. altar/fountain `{`) and gates `gnew = 1` + `mark_ Named: span-loop shape + `:2241–2257` `gnew || framecolor` gate + no blanket clear (next Open row
- D-1984: `js/display.js` — gbuf bbox tracked (`gbuf_start/stop` + `mark_gbuf_dirty` + `reset_glyph_bbox`; writers+clear span, post-rebuild reset); span paint deferred. Named: span paint + re-derive + frame store.
<!-- landmarks:end -->
