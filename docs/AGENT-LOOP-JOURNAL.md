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
## 2026-09-21 — D-2716 `mklev.c` traptype_rnd whole C body (LEVEL_TELEP Knox gate + live Inhell)

**C locus:** `nethack-c/upstream/src/mklev.c:1938–1998` (body in C order: `lvl = level_difficulty()`, `kind = rnd(TRAPNUM-1)`, 12 switch arms); sole C caller `:2075` (`mktrap` `do/while NO_TRAP` retry loop); declaration `:32`. Callees read in C: `level_difficulty` (`hacklib`), `rnd`/`rn2` (`rng`), `single_level_branch` (`dungeon.c` — Is_knox only), `Inhell` (`dungeon.h:140` ≡ `In_hell(&u.uz)` ≡ dungeon hellish flag, `dungeon.c:1942–1946`).
**JS:** `js/mklev.js:120` (import), `:30553–30591` (`traptype_rnd`; LEVEL_TELEP `:30565–30568`, FIRE_TRAP `:30579–30584`).
**Change:** `js/mklev.js` only — LEVEL_TELEP arm → `lvl < 5 || noteleport || single_level_branch(game.u?.uz)` in C short-circuit order (C `:1961–1965`); FIRE_TRAP arm → live `Inhell()` (C `:1974–1977`); both names join the existing `./teleport.js` static import (`imports.mjs --can` ALREADY, no new edge — same pattern as the sibling `random_teleport_level` consumer). No DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn traptype_rnd --reach-all` → PASS syntax (1 changed: js/mklev.js) · PASS rule2 · note hidden (no corpus session blocked) · PASS reach (377 baseline-PASS sessions reach it, 377 run, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) → VERIFY: PASS.
**Named:** none — whole body ported; every callee live (`level_difficulty` `js/hacklib.js:96`, `rnd`/`rn2` `js/rng.js:97/:89`, `single_level_branch`/`Inhell` `js/teleport.js:2231/:2241`).
**Next:** queue head moves past traptype_rnd; refill `@D-2716` found the `--rows 600` pool exhausted (524 known dupes vs live queue + DONE + PARKED; 76 machine-fresh all class-deferred on eyeball: optfn_/handler_/parse_conf/rcfile options-config, sfo_/sfi_ save-infra, coloratt/sound/glyphs/status_hilite customization, wizcmds-debug, fopen_config_file file-infra) — nothing appended, queue holds 0 coverage + 3 residuals.
## 2026-09-21 — D-2715 `lock.c` autokey whole C body (quest-artifact ranking + magic-key displacement)

**C locus:** `lock.c:289–344` (body in C order); callers `:881` (doopen_indir autounlock APPLY_KEY) + `pickup.c:2122` (box autounlock); declaration `extern.h:1442`. Callees: `any_quest_artifact` (`obj.h:271` macro `oartifact >= ART_ORB_OF_DETECTION`), `is_quest_artifact` (`questpgr.c:67`), `is_magic_key` (`artifact.c:2774–2786`).
**JS:** `js/lock.js:64–66` (imports), `:392–448` (`autokey`).
**Change:** restarted `autokey` from C — akey/apick/acard split for other-role quest artifacts, `is_magic_key(game.youmonst, o)` displacement, `!opening` drops card+acard, C-order fallbacks (`!key&&!pick&&!card→key=akey`, `!pick&&!card→pick=apick`, `!card→card=acard`), key›pick›card return. Imports the live exports (`artifact.js:2426`, `quest.js:277`, `generated/artifacts_data.js`) — `imports.mjs --can` hoisted/cycle-safe — and deletes the clone, so the `pick_lock` sites get the real bless/curse body too (ordinary tools still read false, fortress-neutral).
**Verify:** `node scripts/verify.mjs --fn autokey` → PASS syntax (1 file) · PASS rule2 · note hidden (no corpus session blocked) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 → VERIFY: PASS.
**Named:** none — whole body ported; `any_quest_artifact` inlined as the macro comparison (no JS export exists; sym-confirmed).
**Next:** `mklev.c` traptype_rnd head; refill `--rows 600` + `hidden-proxy queue` both exhausted (75 tool-fresh all class-deferred: optfn/handler/config-cfgfiles, sfi_/sfo_ save-infra, coloratt/sound/glyphs/utf8map/status_hilite customization, wizcmds-debug, 0-caller leaves; queue 22 owners all tagged) — nothing appended.
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
