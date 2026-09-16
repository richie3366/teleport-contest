# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-15 — Audit 828e88b4..5c766aef (reviews 1348–1353) + cadence 44/44

1348 D-2382 findtravelpath → **ACCEPT** (visited set + VALID mark-only +
Underwater gate; UNSURE deferral is a forced async-You adaptation,
message-before-step preserved). 1349 D-2383 region_danger/safety →
**ACCEPT** (REG_HERO_INSIDE bit; blind tail + breathing dual-write vs
youprop.h). 1350 D-2384 back_on_ground → **ACCEPT** (matrix arm-for-arm;
hliquid('lava') fires the lava arm on both sides). 1351 D-2385 use_skill
→ **ACCEPT** (5 C callers = 5 awaited JS sites; spell clone retired to
the canonical export). 1352 D-2386 TIP_GETPOS → **ACCEPT** (+ committed
handle-tip.test.mjs 3/3; D-log `:1583–1587` cite is the JS lines, C arm
is `:1871–1873` — doc nit only). 1353 D-2387 gulpmu BLND → **ACCEPT**
(check_visor tail; HBlinded≡uprops mirror). Per-SHA `--base` re-verify
0/0 throughout, rulecheck/banned-grep clean. Cadence 44/44 (Scr 11,405,
RNG 792,838, `48+0.30/turn`). No Must-fix; 11 Open in band, no refill.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).

## 2026-09-16 — D-2418 `shknam.c` `shkinit` MON_AT insurance rloc (Ranger minetn arrival)

**C locus:** `shknam.c:658–660` (`if (MON_AT(sx, sy)) (void) rloc(m_at(sx, sy), RLOC_NOMSG); /* insurance */`); sole C caller `stock_room` (`shknam.c:733`).
**JS:** `js/shknam.js:46` (import), `:635–639` (doc), `:639` (`async shkinit`), `:643–647` (insurance arm), `:688`/`:692` (`stock_room`); `js/mklev.js:23901`, `:23964`, `:24055`, `:24448`, `:24451`, `:24460`.
**Change:** `js/shknam.js` — `shkinit` async with the insurance arm `if (blocker) await rloc(blocker, RLOC_NOMSG)` in C order (result ignored like C's `(void)`); `RLOC_NOMSG` added to the `./const.js` import; static `import { rloc } from './teleport.js'` (`imports.mjs --can` → same 90-module SCC, hoisted fn, cycle-safe). `stock_room` async + `await shkinit`. `js/mklev.js` — `fill_special_room` async (subroom recursion + shop `stock_room` arm awaited); all 3 call sites already sit in async fns (`await` added: makemaz tail `:23901`, vault `fill_vault` `:23964`, ordinary tail `:24055`).
**Verify:** `node scripts/verify.mjs --fn shkinit` → PASS syntax (2 files) · rule2 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 (auto: shared file changed); hidden vacuous for `shkinit` (owner is `rloc`). `hidden-proxy verify rloc`: Ranger-92033 moved rloc@70 → mktrap@98 (later owner, step strictly later); Healer-92042 unchanged rloc@73 (own writer row `migrate_orc` stays open); 0 worse → PROGRESS.
**Named:** `assign_level` clones, `good_shopdoor`/`nameshk` locals (pre-existing, untouched); `rloc` body not re-ported.
**Next:** Healer-92042 via the queued `migrate_orc` row; Ranger mktrap@98 residuals surface via queue/refill (not opened here). Bundled in this commit: queue head `dothrow.c` whip row parked STALE (D-2415 → stale; Arch-92238 PASS at HEAD, true writer D-2417).

## 2026-09-16 — D-2417 `mon.c` `wakeup` unconditional `finish_meating` (Knight pony mid-meal miss)

**C locus:** `mon.c:4349` (`wakeup` calls `finish_meating(mtmp)` unconditionally); `uhitm.c:5215–5216` (`missum`: `if (!helpless(mdef)) wakeup(mdef, TRUE)`). The step-94 fight misses the pony → meal ends → step-95 `dog_invent` rates the apple.
**JS:** `js/mon.js:83` (import), `:1295–1331` (`wakeup`); `scripts/wakeup-finish-meating.test.mjs` (new).
**Change:** `js/mon.js` only — `finish_meating` added to the existing static `./dogmove.js` import (`imports.mjs --can` → ALREADY, no new edge); unconditional `finish_meating(mtmp)` in C order (after the mimic/forcefight block, before `if (via_attack)`); doc comment updated (`finish_meating` struck from omissions). New `scripts/wakeup-finish-meating.test.mjs` (3 its: tame attack-wakeup clears, non-attack wakeup clears, non-eater untouched; 2 fail pre-fix, proven via stash).
**Verify:** `node --test scripts/wakeup-finish-meating.test.mjs` → 3/3 (2 fail pre-fix). `node scripts/verify.mjs --fn obj_resists` → PASS syntax (1 file) · PASS rule2 · hidden `2 PASS, 0 moved past, 0 unchanged, 0 worse` (Knight-92182 PASS; Arch-92238 also PASS — bonus, see Next) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared `mon.js` changed). `VERIFY: PASS`.
**Named:** `finish_meating` mimic-AP reset (pre-existing, kept); `ghod_hitsu` (pre-existing).
**Next:** queue in order (`dothrow` Arch whip — its session PASSED here, flag for stale-check; `shkinit`, `migrate_orc`, `[measure]` distfleeck residuals).

## 2026-09-16 — D-2416 `read.c` `seffect_destroy_armor` cursed→`disintegrate_arm` arm (Healer writer, shipped)

**C locus:** `read.c:1372–1383` (`seffect_destroy_armor` scursed arm); the shipped arm is `:1380–1383` (`else if (disintegrate_arm(otmp)) { gk.known = TRUE; return; }` — scroll survives either way). C's only caller is `read.c:2212` (`seffect_destroy_armor(&sobj)`).
**JS:** `js/read.js:116` (import), `:1178` (export), `:1180–1217` (arm); new `scripts/seffect-destroy-armor.test.mjs` (2 its: uncursed-gloves destroyed + scroll survives; cursed-gloves vibrate branch keeps target with `spe -1`). Fixture note: worn gloves carry `owornmask: W_ARMG` — the C worn.c invariant, else `setworn`'s Setworn-impossible fires (caught live via an `impossible→more→nhgetch` float in the probe).
**Change:** `js/read.js` only — `else if (await disintegrate_arm(otmp)) { known = true; }` in C order with the `return sobj` fallthrough (C `return`, not useup); `disintegrate_arm` added to the existing static `./do_wear.js` import (`imports.mjs --can` → ALREADY, no new edge); `seffect_destroy_armor` exported (C `staticfn`, test pin per D-2412); doc envelope updated, `disintegrate_arm` struck from named omissions.
**Verify:** focused `node --test scripts/seffect-destroy-armor.test.mjs` 2/2 (destroy arm failed-before on gloves-stay; vibrate sibling passed throughout). `node scripts/verify.mjs --fn obj_resists` → `PASS hidden verify obj_resists: 1 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS` (scen-wish-Healer-92173: PASS; Knight-92182 s95 + Arch-92238 s166 unchanged under still-open D-2414/D-2415); `PASS green 2/2`, `PASS strict` ×2, `PASS cohort 7/7`; `VERIFY: PASS`.
**Named:** vibrate `adj_abon` + `make_stunned` body (pre-existing, doc-kept); blessed getobj choice + `disintegrate_cursed_armor`; confused `p_glow2`/COST_DEGRD (pre-existing). `obj_resists`/`disintegrate_arm` bodies untouched (live).
**Next:** writer rows D-2414 (`dog_invent` Knight) + D-2415 (thrown-whip Arch) stay open; then `shkinit`, `migrate_orc`, `[measure]` distfleeck residuals.

## 2026-09-16 — D-2412 `insight.c` `list_genocided` ngone>0 menu arm + `set_vanq_order` + pick-one preselect finish

**C locus:** `insight.c:3007–3131` `list_genocided` (both=dumping||genoing→'y', genoing→both=FALSE; `num_genocides`/`num_extinct`/`num_gone` census; ngone>1→ynaq else `ynq\033a`; q→done_stopprint++; y/a→sort+menu); `:2969–2981` `num_extinct` (G_GONE==G_EXTINCT, skip uniques); `:2984–3002` `num_gone` (mask hit, skip uniques); `:2717–2765` `set_vanq_order` (vanqorders `:2601–2618`, ALPHA_MIX+MCLS_HTOL suppressed, COUNT_* suppressed + ALPHA_SEP relabelled for genocided, current mode MENU_ITEMFLAGS_SELECTED); `wintty.c:1467–1473` (preselect paints `*` over `-`) + `:1622–1638` (ESC cancels; `\n`/`\r`/last-page space finish with current selection).
**JS:** 2 js files (`js/insight.js` +~300, `js/options.js` +14/−6) + new `scripts/list-genocided.test.mjs` (6 tests: extinct-exact mask + uniq skip, gone-mask/order/uniq skip, empty, prompt×3, title×3, line + extinct-suffix rule — 6/6 pass). Under the 600/10 caps.
**Change:** `js/insight.js` — exported `num_extinct`/`num_gone` (C `staticfn`, exported for the test pin; out-param→returned array, LOW_PM order); `genocided_prompt`/`genocided_title`/`genocided_line` pure builders (`:3043–3048`/`:3072–3074`/`:3092–3103`, extinct suffix iff G_GONE==G_EXTINCT); full `list_genocided` in C order (both=gameover||wizardMode()||explore||discover; ask-gated ynaq/ynq — single-entry C `ynq\033a` ESC-pad simplified same as `list_vanquished`; `set_vanq_order(false)` on 'a'/ngone>1 with <0→return; COUNT→ALPHA_MIX fallback with save/restore around `vanqsort_cmp`; class headers via `MLET_EXPLAIN` (defsym.h descs) + `upstart` — new static `./hacklib.js` edge, `imports.mjs --can` SAFE no-cycle; G_GONE/G_EXTINCT join the live const edge; menu via `show_nhw_menu_text`); exported `set_vanq_order` (C table verbatim, dynamic `./options.js`+`./terminal.js` imports per the artifact.js pattern, `selected: i===cur`, cancel→-1). `js/options.js` — pick-one paints `*` for `selected` and finishes (pick) on enter/last-page space when a preselected entry exists (yn callers unaffected: preselected IS def). No DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** preflight `verify.mjs --no-cohort` green on the clean tree. Post-fix `node scripts/verify.mjs --fn list_genocided` → PASS syntax (2 files) · PASS rule2 · hidden `1 PASS, 0 moved past, 0 unchanged, 0 worse` (scen-wish-Samurai-92088: PASS — 272 prompt, 274 sort menu with `t *` preselect, space-finish with current mode, 279 «Genocided species:» menu, 288/288) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS. `node --test scripts/list-genocided.test.mjs` → 6/6.
**Named:** DUMPLOG-only `putstr(0,0,"No species were genocided or became extinct.")` (DUMPLOG retired); single-entry yn ESC-pad (`ynq`, cf. vanquished); sort-menu n>1 preselect-skip branch (primitive is pick-one); class-header ATR (text-menu primitive carries no per-line attr — plain lines); `vanqsort_cmp` MCLS arms still deferred (pre-existing); `list_vanquished` force_sort/'a' wiring untouched (its own row on a falsifier).
**Next:** queue in order (`[measure]` obj_resists burn writers, `shkinit`, `migrate_orc`, `[measure]` distfleeck residuals).

## 2026-09-16 — D-2411 `eat.c` `eatcorpse` acid/cadaver arms route through canonical `losehp`

**C locus:** `eat.c:1926` `losehp(rnd(15), !glob ? "acidic corpse" : "acidic glob", KILLED_BY_AN)` and `:1942` `losehp(rnd(8), !glob ? "cadaver" : "rotted glob", KILLED_BY_AN)`; semantics from `hack.c:4256` `losehp` (`disp.botl = TRUE`; `end_running(TRUE)`; Upolyd → `u.mh -= n` + `rehumanize`/`maybe_wail`, else `u.uhp -= n` + killer/`urgent_pline("You die...")`/`done(DIED)` noreturn, else `maybe_wail`).
**JS:** 1 js file (`js/eat.js` +24/−17) + new `scripts/eatcorpse-losehp.test.mjs` (2 tests: non-fatal acid envelope — `rnd(15)` range, `botl`, run/mv/travel + multi cleared, killer/gameover untouched; Upolyd → `mh` damaged, `uhp` intact). Pre-fix check: old body + export shim fails 0/2; fixed tree passes 2/2. Fatal arm needs full game-over state — covered by session verify per the gloves-test precedent. Under the 600/10 caps.
**Change:** `js/eat.js` only — both sites call canonical sync `losehp` with C arg order and killer strings (`rnd(15)`/`rnd(8)` kept per C, not `1+rn2`); `finish_maybe_wail` added to the existing static `./hack.js` import (`imports.mjs --can eat.js hack.js losehp` → ALREADY, hoisted fn, no new edge); fatal (`_losehp_needs_done`/`gameover`) → dynamic-import `finish_losehp_done` from `./end.js` (house pattern, no static end.js edge) + `return 1` (C noreturn → `dont_start`, no `start_eating` occupation or "begin eating" pline), else `await finish_maybe_wail()` (C blocks inside `losehp`). `eatcorpse` now `export`ed (C name, 1:1 convention) for the test. No DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** preflight `verify.mjs --no-cohort` green on the clean tree. Post-fix `node scripts/verify.mjs --fn eatcorpse` → PASS syntax (1 file) · PASS rule2 · hidden vacuous note (row cited 0 blocked at enqueue — expected, not a corpus PASS) · PASS green 2/2 + strict ×2 · PASS cohort 7/7. `node --test scripts/eatcorpse-losehp.test.mjs` → 2/2.
**Named:** tainted-arm `make_sick` stays deferred (pre-existing, map-kept); `showdamage`/`rehumanize` inside canonical `losehp` per its standing deferrals; poison-arm local `poison_strdmg` clone untouched (pre-existing drift, not this row).
**Next:** queue in order (`list_genocided`, `[measure]` obj_resists burn writers, `shkinit`, `migrate_orc`, `[measure]` distfleeck residuals).
