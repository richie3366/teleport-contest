# Agent loop journal
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
## 2026-09-21 — D-2714 `invent.c` look_here Blind→ECMD_TIME return + `:` wiring; doopen_indir feel arm (Wizard-92127 PASS)

**C locus:** `invent.c:4248` (no-object `!!Blind ? ECMD_TIME : ECMD_OK`), `:4216` (can't-reach `ECMD_OK` even when Blind), `:4314` (shared tail return for skip/single/multi), `:4319–4327` (`dolook` propagates `look_here`); `cmd.c:1758` (`:` → `dolook`); `lock.c:904` (`rnl(20)` gate), `:908–914` (trapped arm order + `feel_newsym`). C `look_here` callers: `invent.c:4327` (`dolook`), `pickup.c:452`/`:1114` (both `(void)` discards).
**JS:** `js/invent.js:103` (import), `:8076–8080` (can't-reach), `:8104–8108` (no-object), `:8142–8144` (skip), `:8159–8163` (single), `:8194–8201` (multi falloff), `:8004–8019` (doc); `js/cmd.js:3909–3912` (`:` arm); `js/lock.js:7` (import), `:901–913` (success arm), `:789–791` (doc).
**Change:** `js/invent.js` only — `ECMD_TIME` joins the existing `./const.js` import (`imports.mjs --can` ALREADY, no new edge); can't-reach arm → `return ECMD_OK` (C `:4216`); no-object/skip/single/multi-falloff arms → `return blind ? ECMD_TIME : ECMD_OK` (C `:4248`/`:4314`); doc records the contract + remaining omissions. `js/cmd.js` only — `:` arm → `game.context.move = ((await dolook()) & ECMD_TIME) ? 1 : 0` (sibling pattern `:3619`/`:3680`; `dolook` itself already propagated `res`).
**Verify:** `node scripts/verify.mjs --fn distfleeck --full` → `PASS syntax (3 changed: js/cmd.js js/invent.js js/lock.js)` · `PASS rule2` · `PASS hidden: 1 PASS, 0 moved past, 3 unchanged, 0 worse → PROGRESS` (scen-normal-Wizard-92127: PASS; Caveman-92202 still distfleeck@116 under its own overload-gate row; Healer-92055@104 + Samurai-92161@37 unchanged under their writer rows) · `PASS reach: 80 run, 80 PASS, 0 regressed → REACH-OK` · `PASS green 2/2` · `PASS strict ×2` · `PASS cohort 7/7` · `PASS full 44/44` · `VERIFY: PASS`. Pre-fix probes (`/tmp/wiz101-probe.mjs`, scratch): JS `:` drew 0 (C 18-draw Blind-look turn at step 101); post-`look_here` fix flat#3271 `rn2(5)=3`@distfleeck exact; post-`feel_newsym` screens 114/114. Note: one `show` immediately post-edit still painted the pre-fix glyph (same-second mtime reads); all four later runs (verify + 3× show) agree PASS — stale read, flagged if it recurs.
**Named:** `look_here` `u.uswallow` arm incl. its `:4160` Blind-gated return (pre-existing «engulfer stomach minvent feel», kept); altar/ice Blind variants beyond floor (kept); pit «can't reach» arg (`trap && is_pit` → `false`, kept); `doopen_indir` pit dirprompt + pit-reach gate, This-door `set_msg_xy`, AUTOUNLOCK_KICK canned dokick (all pre-existing), trapped-shop-door `SHOP_DOOR_COST` `add_damage` (`lock.c:911`, newly named); `doopen_indir` verysmall/not-closed `return res` vs JS `false` (latent turn-cost, unmeasured — future missing-arm row, not touched here).
**Next:** W6 Caveman overload-gate row stays open (still distfleeck@116, own row); Healer-92055 W2 + Samurai-92161 W3 stay under their writer rows. Falsified — do not re-check: D-2420 W5 «JS-extra-single-draw» (C log proves C draws the 18-turn Blind look at step 101 AND `rnl(20)=5`@doopen_indir `lock.c:904` at step 103 — JS had skipped the look turn, shifting its `rnl` into the distfleeck slot), `distfleeck` scared/`onscary`/`monflee` re-port, MAIL arm, seed/step/coordinate logic.
## 2026-09-21 — D-2713 `sp_lev.c` lspo_wall_property + lspo_level_flags + lspo_engraving whole-body ports (des entries, unpacked-opts idiom)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2712 `sp_lev.c` lspo_feature whole-body port (4-arity dispatch + sel_set_feature + feature-flag callees)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2711 `shk.c` unpaid_cost whole-body restart (impossible arm + quan) + dog_eat caller wired

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2710 `sp_lev.c` lspo_drawbridge/lspo_gold/lspo_room/lspo_finalize_level entries live (unpacked-opts) + build_room/spo_endroom/count_level_features

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2709 `selvar.c` selection_do_grow whole-body restart (getbounds recalc + free) + selection_do_ellipse live

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2708 `dbridge.c` create_drawbridge whole-body restart in C order (impossible arm + wall_info assign)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-21 — D-2707 `u_init.c` skills_for_role whole-body restart in C order + panic-as-throw default

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
