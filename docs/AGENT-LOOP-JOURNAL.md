# Agent loop journal
## 2026-09-23 — Audit 14f1ff816..a4348216d (reviews 1709–1713: 5 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2750..D-2754 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). All five close the prior
Must-fixes: 1709 mon_at_display skips MON_OFFMAP; 1710 steal calls
exported Blind(); 1711 attack_checks reads u.uinwater; 1712 monstone
uses memory_glyph_is_invisible; 1713 mdamagem touch-petrify head plus
attk_protection. Cite slip steal.c:391 vs the logged :384 is not a
C-wrong. Named deferrals stay named (resists_ston worn/artifact,
attk_protection callers mhitu.c:2484 and uhitm.c:5936). Each verify
0 REGRESSED. Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838,
speed 51+0.31 R² 0.78); held-out 12/44 (+0, judge stamp
2026-09-23T07:13Z); corpus 501/540 (0 PASS→FAIL vs HEAD). Next cluster
is the pick_lock !IS_DOOR measurement row. Queue holds 8 Open; no
refill. Rule #2 clean.
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
## 2026-09-23 — D-2758 `spell.c` getspell: cmdq replay + traditional yn prompt

**C locus:** `nethack-c/upstream/src/spell.c:714–783` (`getspell`); callee `spell_let_to_idx :114–126`; `quitchars` `decl.c:96`; sole caller `docast :824`.
**JS:** `js/spell.js` `spell_let_to_idx :1703`, `getspell :1720–1791`. Imports: `cmdq_pop` from `cmd.js` (hoisted, cycle-safe per `imports.mjs --can`), `QUITCHARS` from `lock.js` (one-word `export`, existing edge), `MENU_TRADITIONAL`/`MENU_FULL`/`CMDQ_KEY`/`Never_mind` from `const.js` (existing edge). `js/lock.js:69` QUITCHARS export.
**Change:** restarted the body in C order with per-arm `:line` cites: no-spells `You("don't know any spells right now.")` guard; rejectcasting guard — C prints inside `rejectcasting`, the JS clone is a sync predicate so the same three messages print here via `You`/`Your` with C's exact format strings (output-identical to the old `pline` strings); `cmdq_pop` replay arm accepting `CMDQ_KEY` plus the legacy `'key'` tag (still pushed by apply/dig/iactions), bounds-checked by the new `spell_let_to_idx`; MENU_TRADITIONAL arm with `lets`/`qbuf` construction, retry cap 10 (`"That's enough tries."`), `yn_function(qbuf, null, '\0', true)` (NULL resp = accept-any-key via the tty path), `*`/`?` break to menu, quitchars → `pline(Never_mind)` (`pline1` ≡ `pline`, no `%`), unknown letter → `You("don't know that spell.")` retry; CAST-menu fallback unchanged.
**Verify:** `node scripts/verify.mjs --fn getspell` → PASS syntax (2 files `js/lock.js` `js/spell.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS. Null-resp safety read in `yn_menuable_resp` (null → tty accept-any path, no throw).
**Named:** none new. Pre-existing, still map-named: `rejectcasting` messages print at the getspell call site instead of inside the clone (observable-identical; restructuring the clone is its own row); `docast` CQ_REPEAT `cmdq_add_key` line still deferred; `can_chant` poly silent/headless subset.
**Next:** `pline.c` execplinehandler (next Open row); queue stays in the 8–12 band, no refill.
## 2026-09-23 — D-2757 `botl.c` status hilite up/down chooser and the field menu

**C locus:** `nethack-c/upstream/src/botl.c:3811–3887` (`status_hilite_menu_choose_updownboth`), `:4305–4354` (`status_hilite_remove`), `:4356–4453` (`status_hilite_menu_fld`), `:4455–4474` (`status_hilites_viewall`), `:2320–2331` (`reset_status_hilites`), `:4498–4578` (`status_hilite_menu`). `SCORE_ON_BOTL` is commented out (`config.h:627`), so the `#ifndef` arms are live: a score field with no rules is omitted, and score never offers "Add new hilites". `a_int` is `10 + relationship` so cancel stays distinct from `EQ_VALUE` (0). `if (str)` is a pointer test.
**JS:** `js/botl.js` `status_hilite_menu_choose_updownboth` `:2647`, `status_hilite_remove` `:2714`, `reset_status_hilites` `:2774`, `status_hilite_menu_fld` `:2814`, `status_hilites_viewall` `:2889`, `status_hilite_menu` `:2916`. Caller `js/options.js:3261`.
**Change:** the menus are the C bodies in that order. `create`/`start`/`add`/`end`/`select`/`destroy` fold into `select_menu_pick_one` / `select_menu_pick_any` (the `cond_menu` shape: inverse prompt, blank, then rows). View-all is `show_text_pages` because tty `display_nhwindow` on `NHW_TEXT` always waits.
**Verify:** `node scripts/verify.mjs --fn status_hilite_menu_choose_updownboth` → PASS syntax (2 files `js/botl.js` `js/options.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared `options.js`) · VERIFY: PASS. A separate load of `parse_status_hl1('hitpoints/<10/red')` then `status_hilite_remove` cleared the threshold, `hilite_rule`, and both `time` fields; `condition/blind/red` cleared `cond_hilites[1]`.
**Named:** `status_hilite_menu_add` (`botl.c:3889–4302`) — both `choose_updownboth` call sites, the empty-field early call (`:4370`, this site takes the FALSE return), the `while (add)` arm (`:4446`), and `reset_status_hilites` at `:4300`. The "No current hilites for %s" row (`:4392–4394`) is only reached after that add returns TRUE.
**Next:** `spell.c` `getspell` (`spell.c:715–783`).
## 2026-09-23 — D-2756 `dungeon.c` u_on_newpos places, shares the steed, and senses

**C locus:** `nethack-c/upstream/src/dungeon.c:1568–1601`. `!isok` (`cmd.c:4326`: `x>=1`) panics when `x<0 || y<0 || x>COLNO-1 || y>ROWNO-1` (NORETURN) and `impossible`s on `x==0` then still places. Then `ux`/`uy`, `cliparound` (CLIPPING on, `config.h:538`), `uundetected=0`, steed `mx`/`my`, and `!on_level(&u.uz,&u.uz0)` sets `ux0`/`uy0`, `map_location(..., FALSE)`, `iflags.terrain_typ = MAX_TYPE`; else `!Blind && !Hallucination && !u.uswallow` calls `see_nearby_objects`. `earth_sense` last. `switch_terrain` in the comment is not a call. `allmain.c:97` copies `u.uz0.dlevel = u.uz.dlevel` after `encumber_msg` so later moves are same-level. Opening `u_on_upstairs` in `newgame` still runs before that copy.
**JS:** `js/mklev.js` `u_on_newpos` `:525–563`; `js/allmain.js` `moveloop_preamble` `:296–302`.
**Change:** the function is the C body in that order. Off-map throws and does not place; `x==0` calls `impossible` and places. Same-level sight uses `Blind()` / `Hallucination()`.
**Verify:** `node scripts/verify.mjs --fn u_on_newpos` → PASS syntax (9 files `js/allmain.js` `js/cmd.js` `js/display.js` `js/do.js` `js/dothrow.js` `js/mklev.js` `js/monmove.js` `js/teleport.js` `js/trap.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared files) · VERIFY: PASS. An earlier run failed cohort `seed0004-feeding-pony` (screens 405/409, the yellow `*`); the `uz0.dlevel` copy fixed it (409/409) and this re-run is the recorded gate.
**Named:** `panic()` NORETURN has no JS body (`paniclog` is Rule #2); the off-map arm throws and does not place. `switch_terrain` inside `u_on_newpos` is a comment.
**Next:** `botl.c` `status_hilite_menu_choose_updownboth` (`botl.c:3811–3887`).
## 2026-09-23 — D-2755 `lock.c` pick_lock !IS_DOOR keeps the turn when lev->glyph changes

**C locus:** `nethack-c/upstream/src/lock.c:578–593`. `res` starts `PICKLOCK_DID_NOTHING`. `oldglyph = door->glyph`, `oldlastseentyp = update_mapseen_for`, then `feel_location`. LEARNED iff `door->glyph != oldglyph` or `lastseentyp` changed. Measured on the recorder at `lock.c:583`/`584` (ASLR-off, seed 1500, the "see no door there" pick): cell (71,13), `typ` 25 (`ROOM`), flags `0xC0` (`lit|waslit`), `lastseentyp` 25→25, `lev->glyph` 3992→3993 (`S_room`→`S_darkroom`, consecutive cmap-A ids). The room was already lit; `flags.dark_room && iflags.use_color` still rewrites the id (`display.c:894–897`).
**JS:** `js/lock.js` `cellGlyph` + `pick_lock` `:1321–1338`; `js/display.js` `feel_location` `:4955–4973`.
**Change:** `feel_location` still paints when the tty matches. When only the integer matches `cmap(S_room)`, it stores `cmap(dark_room ? S_darkroom : S_stone)` on `remembered_glyph.glyph` (C `lev->glyph`) and does not mark the cell dirty.
**Verify:** `node scripts/verify.mjs --fn pick_lock` → PASS syntax (2 files `js/display.js` `js/lock.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared `display.js`) · VERIFY: PASS. `seed1500-rogue-explore-move` 2768/2768 RNG, 40/40 screens (the session the reverted half broke).
**Named:** `maybe_absorb_item` (`steal.c:772`) stays a named omission (no JS port). The id-only `feel_location` arm does not raise `show_glyph`'s gbuf dirty bit; `S_darkroom` shares the room-floor symbol and the captured tty already matched.
**Next:** `dungeon.c` `u_on_newpos` steed-share/visibility tail.
## 2026-09-23 — D-2754 `mhitm.c` mdamagem touch-petrify head calls monstone

**C locus:** `nethack-c/upstream/src/mhitm.c:1032–1055` — `touch_petrifies(pd)` or (`AD_DGST` and Medusa), `!resists_ston(magr)`, then `attk_protection` (`mhitm.c:1473–1512`) against `misc_worn_check` with `mwep` OR'd as `W_ARMG`; unprotected `poly_when_stoned` → `mon_to_stone` else vis `pline_mon` + `monstone(magr)`.
**JS:** `js/mhitm.js` `attk_protection` (`:4203`) and `mdamagem` (`:4240–4275`, `monstone` at `:4265`).
**Change:** The head runs after the opening `d()` and before the adtyp dispatch. It calls exported `attk_protection`, then `mon_to_stone` or `monstone(magr)`. Unseen tame death uses `You(brief_feeling, "peculiarly sad")`.
**Verify:** `node scripts/verify.mjs --fn mdamagem --reach-all` → PASS syntax (1 file `js/mhitm.js`) · PASS rule2 · note hidden 0 blocked on `mdamagem` (row cited 0 blocks) · PASS reach (124/124, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (`mhitm.js` not shared) · VERIFY: PASS.
**Named:** `attk_protection` callers `mhitu.c:2484` (`passiveum` AD_STON, `js/mhitu.js:3305`) and `uhitm.c:5936` (`passivemm` AD_STON, `js/uhitm.js:2789`) stay the pre-existing worn-check deferrals. `resists_ston` worn/artifact `STONE_RES` stays the callee's named omit.
**Next:** `lock.c` pick_lock `!IS_DOOR` DID_NOTHING half (`lock.c:578–593`).
