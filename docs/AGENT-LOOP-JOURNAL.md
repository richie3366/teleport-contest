# Agent loop journal
## 2026-09-23 — Audit d44374fc8..1b2e6cd12 (reviews 1700-1708: 3 ACCEPT + 2 WITH-DEBT + 4 QUALITY-RISK, 5 Must-fix) + cadence 44/44.

Reviews audit D-2741..D-2749 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). 1700 doread cookie
useup_live closes review 1688. 1702/1703 WITH-DEBT: safe_qbuf unwired
inlines already named; pick_lock !IS_DOOR stays the existing Open row.
QUALITY-RISK Must-fix: 1701 monstone `glyph_is_invisible(loc)` plus
unwired `mdamagem` touch-petrify head; 1706 attack_checks `!u.Underwater`
(field never written; C is `u.uinwater`); 1707 steal `Blind_steal`
(`u.Blind || u.ublind`) instead of live `Blind()`; 1708 mhurtle_step
smoke reach was 0 REGRESSED, but the cadence re-score moved
scen-genesis-Archeologist-91135 PASS (scoreboard `49fb30909`) to FAIL
screen step 178, owner mhitm_knockback uhitm.c:5357 — the only later
js/ commit. Next cluster is that regression. Cadence: public 44/44
(Scr 11405/11405, RNG 792838/792838, speed 69+0.43 R² 0.79); held-out
12/44 (+0, judge stamp 2026-09-23T07:13Z); corpus 500/540 (−1 that
session). `--rows 20` is the stale head; nothing appended. Rule #2 clean.
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
## 2026-09-23 — D-2754 `mhitm.c` mdamagem touch-petrify head calls monstone

**C locus:** `nethack-c/upstream/src/mhitm.c:1032–1055` — `touch_petrifies(pd)` or (`AD_DGST` and Medusa), `!resists_ston(magr)`, then `attk_protection` (`mhitm.c:1473–1512`) against `misc_worn_check` with `mwep` OR'd as `W_ARMG`; unprotected `poly_when_stoned` → `mon_to_stone` else vis `pline_mon` + `monstone(magr)`.
**JS:** `js/mhitm.js` `attk_protection` (`:4203`) and `mdamagem` (`:4240–4275`, `monstone` at `:4265`).
**Change:** The head runs after the opening `d()` and before the adtyp dispatch. It calls exported `attk_protection`, then `mon_to_stone` or `monstone(magr)`. Unseen tame death uses `You(brief_feeling, "peculiarly sad")`.
**Verify:** `node scripts/verify.mjs --fn mdamagem --reach-all` → PASS syntax (1 file `js/mhitm.js`) · PASS rule2 · note hidden 0 blocked on `mdamagem` (row cited 0 blocks) · PASS reach (124/124, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (`mhitm.js` not shared) · VERIFY: PASS.
**Named:** `attk_protection` callers `mhitu.c:2484` (`passiveum` AD_STON, `js/mhitu.js:3305`) and `uhitm.c:5936` (`passivemm` AD_STON, `js/uhitm.js:2789`) stay the pre-existing worn-check deferrals. `resists_ston` worn/artifact `STONE_RES` stays the callee's named omit.
**Next:** `lock.c` pick_lock `!IS_DOOR` DID_NOTHING half (`lock.c:578–593`).
## 2026-09-23 — D-2753 `mon.c` monstone unmap tests the memory glyph

**C locus:** `nethack-c/upstream/src/mon.c:3358` `glyph_is_invisible(levl[x][y].glyph)` — `display.h:773` `#define glyph_is_invisible(glyph) ((glyph) == GLYPH_INVISIBLE)`.
**JS:** `js/mhitm.js` `monstone` (`:3306`).
**Change:** the arm calls `memory_glyph_is_invisible(loc)`, the same predicate `mondead` uses for `levl.glyph`. Dropped the now-unused `glyph_is_invisible` import. The `x > 0` guard stays absent.
**Verify:** `node scripts/verify.mjs --fn monstone --reach-all` → PASS syntax (1 file `js/mhitm.js`) · PASS rule2 · note hidden 0 blocked on `monstone` (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (`mhitm.js` not shared) · VERIFY: PASS.
**Named:** none new on this predicate. `mhitm.c:1050` stays the next Must-fix.
**Next:** `mhitm.c` mdamagem touch-petrify head — wire `monstone(magr)` (review 1701 Must-fix).
## 2026-09-23 — D-2752 `uhitm.c` attack_checks pool reveal uses `u.uinwater`

**C locus:** `nethack-c/upstream/src/uhitm.c:289` `Blind || (is_pool(mtmp->mx, mtmp->my) && !Underwater)` — `youprop.h:279` `#define Underwater (u.uinwater)` (`you.h:431` one-bit field).
**JS:** `js/uhitm.js` `attack_checks` (`:4249`).
**Change:** the arm tests `!(u.uinwater | 0)`. Same short-circuit as C: `is_pool` runs only when the hero is not blind. No new import (two file-local `Underwater()` clones already exist; this site reads the field).
**Verify:** `node scripts/verify.mjs --fn attack_checks --reach-all` → PASS syntax (1 file `js/uhitm.js`) · PASS rule2 · note hidden 0 blocked on `attack_checks` (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (`uhitm.js` not shared) · VERIFY: PASS.
**Named:** none new on this arm. The rest of `attack_checks` stays the D-2747 body.
**Next:** `mon.c` monstone invisible-unmap — `memory_glyph_is_invisible` (review 1701 Must-fix). Then `mhitm.c` `mdamagem` touch-petrify head.
## 2026-09-23 — D-2751 `steal.c` nothing_to_steal Blind uses youprop.h Blind

**C locus:** `nethack-c/upstream/src/steal.c:384` `else if (Blind)` — `youprop.h:103` `#define Blind ((HBlinded || EBlinded) && !BBlinded)`.
**JS:** `js/steal.js` `steal` nothing_to_steal (`:382`).
**Change:** the arm calls exported `Blind()` from `js/invent.js` (the macro, plus `uroleplay.blind`). Deleted `Blind_steal`. Same invent.js import; `imports.mjs --can` ALREADY.
**Verify:** `node scripts/verify.mjs --fn steal --reach-all` → PASS syntax (1 file `js/steal.js`) · PASS rule2 · note hidden 0 blocked on `steal` (row cited 0 blocks) · PASS reach (24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (steal.js not shared) · VERIFY: PASS.
**Named:** none new on this arm. `invent.js` `Blind()` also returns true for `u.uroleplay.blind` before the macro (live helper width, same as other callers).
**Next:** `uhitm.c` attack_checks pool reveal — `u.uinwater` (review 1706 Must-fix).
## 2026-09-23 — D-2750 `dothrow.c` mhurtle_step vacated cell kept the chickatrice glyph

**C locus:** `nethack-c/upstream/src/dothrow.c:1004–1007` (`remove_monster` then `newsym` of the old cell, then `place_monster` then `newsym` of the new cell). `remove_monster` (`rm.h:526`) clears `level.monsters[x][y]` and does not change `mx`/`my`. `newsym` (`display.c:969`) reads `m_at`, which is that grid. After the clear the old cell is floor.
**JS:** `js/display.js` `mon_at_display` (`:426–445`); `MON_OFFMAP` added to the existing `const.js` import. `hidden-corpus/scoreboard.json` row for this session flipped to PASS (186/186, 6017/6017).
**Change:** `mon_at_display` skips `MON_OFFMAP`, the same predicate `m_at` uses. The vacated `newsym` then takes the empty-cell `map_location` arm. `place_monster` sets `MON_FLOOR` and the grid, so the destination `newsym` still draws the monster.
**Verify:** `node scripts/verify.mjs --fn mhurtle_step` → PASS syntax (1 file `js/display.js`) · PASS rule2 · note hidden 0 blocked on `mhurtle_step` (the row named a screen owner `mhitm_knockback`, not N blocks on this function; the cited session was re-run directly: 186/186 screens, 6017/6017 RNG) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: `display.js` shared) · VERIFY: PASS.
**Named:** none new. `u_on_newpos` still writes `ux`/`uy` only; the steed-share tail stays the existing Open row (review 1708: not this failure).
**Next:** `steal.c` `steal` `Blind` predicate (review 1707 Must-fix).
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
