# Agent loop journal
## 2026-09-21 — Audit 2a3c61e5..f6f4a0b2 (reviews 1674-1682: 8 ACCEPT + 1 WITH-DEBT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2715..D-2723 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: 4× 0-blocked
vacuous + REACH-OK; 5 genuine PROGRESS — 1676 distfleeck Caveman-92202
PASS at HEAD (later owner fixed by D-2719), 1677/1679 do_statusline2
Healer-92107→retouch_object@298 / Healer-92092 PASS, 1678 monhp_per_lvl
Caveman PASS, 1680 destroy_arm Caveman PASS; 0 REGRESSED anywhere).
Notable: 1674 null-mon `is_magic_key` + zero-questarti nuances
pre-existing, unreachable from autokey; 1676 `mstrategy != null` guard
null-safe rendering; 1679 `cmdq_clear` pre-existing house rendering;
1682 WITH-DEBT solely for the `!oldmem` map line (display-only corner,
commit-disclosed) + "`digests` new edge" message imprecise (`--can`
ALREADY, no new module edge). No Must-fix prepend; CURRENT Next cluster
unchanged (shipped dokick; next port pops queue head
done_object_cleanup). Cadence: public 44/44 (Scr 11405/11405, RNG
792838/792838, speed 60+0.33 R² 0.78); held-out 12/44 (+0);
corpus 500/540 (+2 Caveman-92202 via D-2721, Healer-92092 via D-2720).
Queue 2 Open, pool exhausted (`--rows 600`: 74 machine-fresh all
class-deferred; hidden-proxy queue 0 untagged-eligible) — no refill.
Rule #2 clean.
## 2026-09-21 — Audit 29baae20..70a4bf39 (reviews 1665-1673: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2706..D-2714 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: 8× 0-blocked
vacuous + REACH-OK; 1673 distfleeck genuine PROGRESS — Wizard-92127
PASS, 3 unchanged at own writer rows, 475-session reach 475 PASS, 0
REGRESSED). Notable: 1667 impossible() fire-and-forget in sync loaders
(pre-existing precedent, disclosed); 1669 TOP/BOTTOM==SPLEV_TOP/BOTTOM
verified at sp_lev.c:172-173; 1671 raw-index "true"→0 clears-flag quirk
preserved exactly; 1672 MARK=4 alias via const import; 1673 no RNG
call touched — the missing Blind-look turn re-aligns rnl(20). Cadence:
public 44/44 (Scr 11405/11405, RNG 792838/792838); held-out 12/44
(+0); corpus 498/540 (+1 Wizard-92127 via D-2714). Queue 5 unchecked,
pool exhausted (78 machine-fresh all class-deferred; queue owners all
tagged) — no refill. Rule #2 clean.
## 2026-09-21 — Audit 3de22e5b..51e65db7 (reviews 1656-1664: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2697..D-2705 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: all 0-blocked
vacuous + REACH-OK, no REGRESSED). 1656 closes the 1654 Must-fix
(43 remaining coord-form sites wired, 15+43+3=61 arithmetic shuts).
Notable: 1661 movecmd txt-vs-funct equivalence + stale lock.js:128
comment; 1664 trimspaces leading-strip justified via describe_level
formats. Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838);
held-out 12/44 (+0); corpus 497/540 (+0/-0). Queue 8 unchecked, no
refill (at band). Rule #2 clean.

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-23 — D-2749 `dothrow.c` mhurtle_step whole-body port (move/petrify/hero-touch arms) + `apply.c` use_whip STALE park

**C locus:** `nethack-c/upstream/src/dothrow.c:992–1068` (`:997–998` isok; `:1000` will_hurtle && m_in_out_region gate (D-1176); `:1003–1007` remove_monster/place_monster + newsyms; `:1009–1014` steed u_on_newpos + newsym(old) + vision_recalc; `:1015–1017` flush_screen/nh_delay_output/set_apparxy; `:1018–1019` is_waterwall stop; `:1020–1025` mintrap HURTLING + Trap_* stops; `:1027–1030` m_at bump + Monnam/a_monnam + wakeup(!mon_moving); `:1031–1042` touch_petrifies both directions + minstapetrify + newsym; `:1044–1047` u_at hero bump Some_Monnam + stop_occupation; `:1048–1054` Upolyd poly-hero credit minstapetrify(mon,TRUE); `:1055–1066` hero instapetrify with x_monnam ARTICLE_YOUR/A + "hurtling" + EXACT_NAME|SUPPRESS_NAME killer + newsym).
**JS:** `js/dothrow.js` only — new imports `remove_monster`/`place_monster` (steed.js), `u_on_newpos` (mklev.js), `set_apparxy` (monmove.js), `is_waterwall` (dbridge.js), `stop_occupation` (hack.js, already-imported module), `a_monnam` (do_name.js), `ARTICLE_YOUR`/`EXACT_NAME`/`SUPPRESS_NAME` (const.js); all other callees already imported (newsym, vision_recalc, flush_screen, nh_delay_output, mintrap, Monnam, Some_Monnam, x_monnam, wakeup, touch_petrifies, which_armor, minstapetrify, instapetrify, Upolyd, m_at, u_at, canseemon, isok, will_hurtle, m_in_out_region). Steed arm: live `u_on_newpos` sets ux/uy only, so the C-internal steed share (`u.usteed->mx/my = u.ux/uy`) is split caller-side per the established cmd.js pattern, cited inline.
**Change:** restarted the body in C order with per-arm `:line` cites; same-file caller `mhurtle` doc updated (petrify/steed-vision omit retired, NODIAG/minliquid omits stand).
**Verify:** `node scripts/verify.mjs --fn mhurtle_step` → PASS syntax (1 changed js file) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks, no --base owed) · PASS reach (no RNG-tagged reach; smoke spread 24 run: 24 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS.
**Named:** none new — whole C body live; every callee live (21/21 brief list: the 4 new cross-module edges are imports.mjs-checked, u_on_newpos const-bound read lazily in-body only). Pre-existing `mhurtle` omits stand (NODIAG grid-bug, post-path minliquid).
**Next:** `lock.c` pick_lock DID_NOTHING-half row (needs the C-side glyph measurement its text names before porting); coverage pool refill below.
## 2026-09-22 — D-2748 `steal.c` steal whole-body port (nothing_to_steal/cant_take/monkey-stickiness/leash/doffing/armor-charm/unpaid/petrify arms)

**C locus:** `nethack-c/upstream/src/steal.c:343–614` (`:348–355` entry snapshot + monnear gate; `:357–366` Monnambuf; `:367–371` maybe_finished_meal; `:375–399` nothing_to_steal — Punished uchain rn2(4), buried-ball unseen chain + openholdingtrap, Blind, gold-only, generic; `:401–409` Adornment ring priority; `:411–449` retry weighted pick + glove/cloak/shirt substitution; `:451–458` gotobj stealoid gate + BOULDER retry-once; `:459–505` monkey stickiness/can_carry + LEASH; `:507–513` doffing/stop_donning/stop_occupation; `:515–596` worn switch — TOOL/AMULET/RING/FOOD, ARMOR_CLASS delay clamp + monkey/unresponsive cant_take + charm/seduce nomul/stealarm + strange-worn impossible + blindfold refresh; `:597–613` weapon/ball&chain; `:615–653` yname objnambuf, mavenge, unpaid subfrombill, nymph "She" shorten, stole pline, petrify minstapetrify → -1).
**JS:** `js/steal.js` steal restart (+~140/−~70) + imports/consts/helper; `js/do_wear.js` one-word `export` on doffing.
**Change:** restarted the body in C order with per-arm `:line` cites: nothing_to_steal closure (C goto re-entry from inv gate + empty pick); cant_take closure (how[] + ROLL_FROM + armor_simple_name/yname + `!rn2(inv_cnt/5+2)` stay-or-flee); monkey ostuck (uball implicit / uquiver+uswapwep-untwo-handed exempt / cursed-worn + RING_ON_PRIMARY/SECONDARY via ULEFTY=uhandedness==LEFT_HANDED + welded + obj.h:257 bimanual macro expanded file-local, dig.js/muse.js precedent) + can_carry; leash; `doffing` (newly exported from do_wear.js, same live body — no clone) + stop_donning olddelay clamp; armor charm/seduce via live urgent_pline + Adjmonnam; unpaid subfrombill (stealarm idiom); yname objnambuf; petrify via live minstapetrify; Punished ≡ uball only (youprop.h:77). New live edges apply.js `o_unleash` + trap.js `openholdingtrap`/`minstapetrify` (imports.mjs SAFE, no back-edge from either module); same-edge additions only elsewhere (urgent_pline/Adjmonnam/yname/welded/can_carry/stop_donning/doffing/touch_petrifies/mons/TT_BURIEDBALL/LEFT_HANDED/W_ARMG/WEAPON_CLASS). BOULDER/LEASH/CORPSE as module `objectNames.indexOf` consts (all resolve: 475/236/265).
**Verify:** `node scripts/verify.mjs --fn steal` → VERIFY: PASS (syntax 2 changed files; Rule #2; hidden note 0 blocked — normal for a coverage row; reach 24/24 PASS 0 regressed → REACH-OK; green 2/2; strict 2/2; cohort 7/7; full skipped — neither file shared).
**Named:** C `assert(uball)` debug no-op; o_id-null guard on the stealoid compare (JS-artifact safety; real o_ids start at 1 via next_ident).
**Next:** pop next Open — coverage row (`apply.c` use_whip head).
## 2026-09-21 — D-2747 `uhitm.c` attack_checks whole-body port (warning-glyph/hides_under/mimic/mundetected/sensemon arms, set_ustuck clone retire)

**C locus:** `nethack-c/upstream/src/uhitm.c:189–327` (`:194` STRAT_WAITMASK clear; `:196–197` engulfing_u; `:199–214` forcefight FALSE (map_invisible inside is C-commented-out); `:220` glyph_at(bhitpos); `:229–234` Wait! + map_invisible unless warning/invisible glyph or un-Blind hides_under; `:238–243` invisible-mimic AD_STCK ustuck when m_next2u (you.h:560 distu ≤ 2); `:250–251` wakeup; `:254–265` disguised-mimic PfSC/sensemon/warning gates with seemimic lucky-strike; `:268–298` mundetected hide/eel reveal + newsym + seemimic + tp_sensemon/Detect_monsters message arms (hallu tame/wild, Blind/pool, object doname) + TRUE; `:304–307` sensemon wakeup; `:309–324` confirm/Stormbringer/ParanoidHit; `:327` FALSE).
**JS:** `js/uhitm.js` attack_checks restart + imports (+~90/−~30).
**Change:** restarted the body in C order with per-arm `:line` cites: glyph from live `glyph_at(game.bhitpos)` (all 4 JS call paths set bhitpos: do_attack/polearm/whip/kick); Wait! via `%s` + live `something` const with the warning-glyph + hides_under guards; mimic ustuck via live `Protection_from_shape_changers` (were.js, imports.mjs SAFE — hoisted fn, same 98-module SCC) + `dmgtype(AD_STCK)` (monsters.js existing edge, local AD_STCK const) + `dist2 ≤ 2`; full mimic/mundetected/sensemon arms via live `sensemon`/`tp_sensemon`/`canseemon`/`l_monnam`/`objects_at` (same-module edge additions only); Detect_monsters as the youprop three-field idiom (apply.js precedent); `an(lmonbuf)`/`doname(obj)` message forms. Deleted the byte-identical local `set_ustuck` clone — live mhitu.js export (imports.mjs SAFE), 2 existing call sites ride along unchanged. Confirm arm kept + `:line` cites (C ParanoidHit is already the masked bit).
**Verify:** `node scripts/verify.mjs --fn attack_checks` → VERIFY: PASS (syntax 1 changed file; Rule #2; hidden note 0 blocked — normal for a coverage row; reach: no RNG-tagged reach, fixed smoke 24/24 REACH-OK 0 regressed, incl. `--reach-all`; green 2/2; strict 2/2; cohort 7/7; full skipped — uhitm.js not shared).
**Named:** none new — whole C body live; every callee live (brief 13 + hides_under/dmgtype/l_monnam/objects_at/glyph_at/glyph_is_warning/tp_sensemon/Protection_from_shape_changers/set_ustuck, all live or same-edge imports).
**Next:** pop next Open — coverage row (`steal.c` steal head).
## 2026-09-21 — D-2746 `do_wear.c` Boots_off whole-body restart (SPEED/water/FUMBLE/LEVITATION arms)

**C locus:** `nethack-c/upstream/src/do_wear.c:261–323` (`:265` oldprop; `:267` takeoff.mask clear; `:271` setworn(NULL) before the levitation case; `:273–279` SPEED slow-down unless Very_fast; `:280–298` WATER_WALKING pool/lava + !Levitation/!Flying + !clinger-ceiling + !cancelled_don + !in_lava_effects → makeknown + spoteffects(TRUE); `:299–301` ELVEN toggle_stealth; `:302–305` FUMBLE clear when !oldprop and no non-timeout half; `:306–317` LEVITATION float_down unless a source remains, else float_vs_flight; `:318–322` plain-boot breaks; `:323` default impossible; `:324` cancelled_don reset).
**JS:** `js/do_wear.js` Boots_off restart + consts/imports (+~110/−~25).
**Change:** restarted the body in C order with per-arm `:line` cites: SPEED `makeknown` + `You_feel slow down{ a bit}` on `Fast()` (attrib.js live, dragon-armor slow-down precedent); WATER_WALKING pool/lava via live hack.js imports + file-local `Levitation_dw()`/`Flying_dw()` + new `is_clinger` (monsters.js existing edge) + new `has_ceiling` (dungeon.js, imports.mjs SAFE — hoisted fn, same 98-module SCC) + `spoteffects(true)` (pickup.js live); FUMBLE clear of flat `HFumbling`/`EFumbling` + uprops sync (Boots_on convention); LEVITATION `float_down(0,0)` (trap.js existing edge) + `makeknown`, else live `float_vs_flight()`; plain-boot breaks; default impossible literal (Helmet_off D-2554 convention — no unknown_type/c_boots consts in JS). Added 7 `objectNames.indexOf` boot consts (all resolve, verified). Null-uarmf graceful clear kept (C dereferences; Helmet_off precedent).
**Verify:** `node scripts/verify.mjs --fn Boots_off` → VERIFY: PASS (syntax 2 changed files; Rule #2; hidden note 0 blocked — normal for a coverage row; reach: no RNG-tagged reach, fixed smoke 24/24 REACH-OK 0 regressed; green 2/2; strict 2/2; cohort 7/7; full 44/44 PASS — auto, hack.js shared).
**Named:** none new — whole C body live; every callee live (11/11 brief list: setworn, You_feel, is_pool, is_lava, has_ceiling, spoteffects, toggle_stealth, float_down, float_vs_flight, makeknown, impossible).
**Next:** pop next Open — coverage row (`uhitm.c` attack_checks head).
## 2026-09-21 — D-2745 `objnam.c` distant_name gameover o_id wipe arm + `weapon.c` possibly_unwield STALE park

**C locus:** `nethack-c/upstream/src/objnam.c:345–409` (`:360–378` r/neardist from xray_range; `:373–384` o_id comment + `save_oid`/`o_id = 0` wipe; `:385–389` near gate; `:391–395` near format with observe side-effects; `:397–400` far `gd.distantname++/--`; `:406` restore).
**JS:** `js/objnam.js` distant_name (+14/−6).
**Change:** added the wipe in C order — `save_oid` captured, `obj.o_id = 0` under `game.program_state?.gameover` (the live gameover flag, cf. `js/hack.js:1773`), before location lookup; one outer try/finally restoring `o_id` (`:406`) around both near and far paths (C has no early return between; finally is strictly safer given the JS-local null guard). No new import (game-only), no caller rewiring.
**Verify:** `node scripts/verify.mjs --fn distant_name` → VERIFY: PASS (syntax 1 changed file; Rule #2; hidden note 0 blocked — normal for a coverage row; reach: no RNG-tagged reach, fixed smoke 24/24 REACH-OK 0 regressed; green 2/2; strict 2/2; cohort 7/7; full skipped — objnam.js not shared).
**Named:** get_obj_location buried/contained locflags arms (helper covers locflags=0 only); artifact-find side effects ride on observe/dknown (D-0469-carried).
**Next:** pop next Open — coverage row (`do_wear.c` Boots_off head).
## 2026-09-21 — D-2744 `lock.c` pick_lock whole-body port (dummy/resume/box/door arms, clone purge to live imports)

**C locus:** `nethack-c/upstream/src/lock.c:358–656` (`:373–377` null-pick dummy (STRANGE_OBJECT); `:380–401` resume (pick/key/card wording, uswallow/box-reach gates, `is_magic_key(&gy.youmonst)`); `:405–411` nohands/uswallow gates; `:414–417` impossible() tool check; `:422–426` autounlock coords vs get_adjacent_loc; `:429–545` underfoot box path (`:435` stale-dz, `:439–444` lava/pool, `:461–469` fix/lock/unlock/pick verb+it, `:470–481` AUTOUNLOCK_UNTRAP could_untrap+safe_qbuf trap prompt, `:482–503` APPLY_KEY vs interactive safe_qbuf menu with lknown, `:506–518` obroken/card/touch_artifact, `:520–534` box chance 1/4/75+DEX rogue bonuses + cursed halve, `:536–545` xlock + decided-against-boxes); `:547–646` door path (`:551–555` pit rim DID_NOTHING, `:559–576` visible-monster shk/Oracle credit arm + door-mimic stumble, `:578–593` !IS_DOOR feel/mapseen + Blind feel/see + drawbridge, `:594–603` NODOOR/ISOPEN/BROKEN, `:605–630` door UNTRAP + card-only-unlock + Lock/Unlock ynq + touch_artifact, `:632–646` door chance 2/3/70+DEX); `:649–655` move=0 + chance/picktyp/magic_key/usedtime + picklock occupation).
**JS:** `js/lock.js` pick_lock restart (+218/−~180 with js/lock.js; `hidden-corpus/scoreboard.json` rides along as the verify refresh, per-commit convention).
**Change:** restarted the body in C order (`js/lock.js:1134–1399`) with per-arm `:line` cites; all async message calls use the C wrapper (`You_cant`/`There`/`pline_The`/`You` with `%s` args — rendered text byte-identical to the old pre-formatted plines); ynq → static `yn_function(q,'ynq','q')`; box/door chance keeps `Math.trunc(ch/2)` for C integer halving; door-mimic keeps the ungated `stumble_onto_mimic` (C has no PfSC gate here, unlike the `stumble_on_door_mimic` helper) with the absorb tail named; `is_door_mappear` inlined from `monst.h:240`. Deleted all 4 local clones — `yname`/`the`/`an`/`simple_typename` now read the live objnam exports (doforce sites at `:1955`/`1957`/`1774` ride along, full-44 green); added live `ysimple_name`/`ansimpleoname`/`safe_qbuf` (box prompts), `You_cant`/`There`/`pline_The`, `is_lava`/`is_pool`, `hliquid`, `could_untrap`/`untrap`, `touch_artifact` — every one `imports.mjs --can` ALREADY (lock.js statically imports display/hack/objnam/do_name/trap/artifact), so no new module edge. New per-file `Levitation()`/`Underwater()` (youprop macro idiom, same as file-local `Blind()`).
**Verify:** `node scripts/verify.mjs --fn pick_lock` → VERIFY: PASS (syntax 1 changed file; Rule #2 — second run briefly FAILED on a seed name in the new omission comment, removed, re-ran; hidden note 0 blocked — normal for a coverage row; smoke 24/24 REACH-OK 0 regressed; green 2/2; strict 2/2; cohort 7/7). Full `sessions`: 44/44 PASS (covers the clone-deletion blast radius on doforce message paths).
**Named:** (1) `maybe_absorb_item` (`steal.c:772`, no JS port — D-2002-carried); (2) `!IS_DOOR` DID_NOTHING half (`:579–586`, own Open row this commit — historically always-LEARNED, fortress-green).
**Next:** pop next Open — coverage row (`weapon.c` possibly_unwield head).
## 2026-09-21 — D-2743 `objnam.c` safe_qbuf whole-body restart in C order (alias arm, pointer-checked suffix, per-arm cites)

**C locus:** `nethack-c/upstream/src/objnam.c:5624–5698` (`:5635–5638` unsigned lens; `:5640` lenlimit; `:5641` endp; `:5646–5653` prefix/suffix/filler impossible() diagnostics; `:5657–5659` qbuf==qprefix alias arm; `:5660–5663` strncpy prefix; `:5664–5666` empty start; `:5668` len; `:5670–5681` last-resort truncation with suffix tail; `:5682–5695` short_oname format with lastR fallback + releaseobuf + suffix; `:5697` return). C lastR is never NULL at any of the 25 call sites (all pass literals).
**JS:** `js/objnam.js:3003` safe_qbuf restart (+59/−19 with js/objnam.js; `hidden-corpus/scoreboard.json` rides along as the verify refresh, per-commit convention).
**Change:** restarted the body in C order with per-arm `:line` cites: lens block (`:5635–5640`, len_qpfx folds into buf.length per `:5668`); explicit `_qbuf === qprefix` alias arm (`:5657–5659`, converges with the copy arm for immutable strings — kept for C order); `qsuffix != null` pointer checks (`:5676`, `:5693`); live same-module `short_oname` (`:5686`); no new cross-module edge (QBUFSZ already imported; impossible stays named, not imported).
**Verify:** `node scripts/verify.mjs --fn safe_qbuf` → VERIFY: PASS (syntax 1 changed file, Rule #2, hidden note 0 blocked — normal for a coverage row, smoke 24/24 REACH-OK 0 regressed, green 2/2, strict 2/2, cohort 7/7; full skipped — objnam.js is not in the shared set).
**Named:** (1) impossible() prefix/suffix/filler diagnostics (`:5646–5653`) — async in JS, safe_qbuf sync at 25 sites, C continues (doname-sync precedent, this file); (2) releaseobuf(bufp) (`:5691`) — GC no-op, no obuf pool in js/; (3) the 9 caller-side inlines + pick_lock pair above, each owned by its function's port/row.
**Next:** pop next Open — coverage row (`lock.c` pick_lock head).
## 2026-09-21 — D-2742 `mon.c` monstone whole body (statue/rock arms, eject flooreffects, lamplit end_burn, engulf digests pline) + `uhitm.c` mhitm_ad_drin STALE park

**C locus:** `nethack-c/upstream/src/mon.c:3286–3373` (`:3290` x/y before vamp_stone; `:3295` vamp_stone gate; `:3302–3304` mhp=0 + lifesaved + DEADMONSTER return; `:3307` mtrapped=0; `:3309–3352` statue arm — size gate, `extract_from_minvent(:3316)` loop, BOULDER/`obj_resists(:3323)` eject via `flooreffects`-fall (`:3324`, `continue`) else `place_object(:3326)`, lamplit `end_burn(:3328–3329)`, oldminvent chain, FEMALE/MALE/HISTORIC flags, `mkcorpstat(:3344)` + mgivenname `oname(:3345–3346)`, `add_to_container` chain, `weight(:3352)` — else `mksobj_at(ROCK :3354)`; `:3356–3361` stackobj + `glyph_is_invisible` unmap + cansee newsym; `:3364–3370` engulfing wasinside before `mondead(:3366)`, digests jump-out pline after). The `:3319–3322` STATUE-carried arm is `#if 0` compiled out in C — correctly absent.
**JS:** `js/mhitm.js` monstone restart (+~30/−~50 incl. imports); `js/mon.js` one-word `export` on `unlink_minvent`.
**Change:** restarted monstone in C order with per-arm `:line` cites. New same-SCC static edges (all `imports.mjs` SAFE — hoisted functions; `hack.js`/`mhitu.js` already imported): `flooreffects` (`do.js`), `end_burn` (`timeout.js`), `obj_resists` (`dogmove.js`), `glyph_is_invisible` (`display.js`, replaces the narrower memory-only check + drops the `x > 0` guards), `u_locomotion` (`hack.js`), `digests` (`mhitu.js`, replaces a byte-identical local clone whose "would cycle" comment was stale — the edge already exists), `unlink_minvent` (`mon.js`, newly exported one-word change, stale where-tag fallback per the `mdrop_obj` precedent). Loop now calls live `extract_from_minvent(mdef, obj, true, true)`; dropped the manual unlink + unconditional `mdef.mw = null` (live extract handles W_WEP) and the `obj_resists_00` clone.
**Verify:** `node scripts/verify.mjs --fn monstone` → VERIFY: PASS (syntax 2 changed files, Rule #2, hidden note 0 blocked — normal for a coverage row, smoke 24/24 REACH-OK, green 2/2, strict 2/2, cohort 7/7; full skipped — neither changed file is in the shared set, and the `mon.js` change is a semantics-null `export` keyword).
**Named:** none new — whole C body live; every callee live (19/19 brief list: vamp_stone, lifesaved_monster, rn2, extract_from_minvent, obj_resists, flooreffects, place_object, end_burn, mkcorpstat, oname, add_to_container, weight, mksobj_at, stackobj, mondead, unmap_object, newsym, You, u_locomotion) or ported here (none — all live). `free_mgivenname` was named in the old doc comment but is mondead's call, not this function's — retired, not re-queued.
**Next:** pop next Open — coverage row (`mon.c` monstone done; same-C-file sweep: no other live `mon.c` Open row).
