# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
## 2026-09-16 — Process take (human-directed architect pass): stop stale-row parks, requeue park writers

**Measured:** last 400 commits — 126 of 362 non-audit iterations were
`Park …` commits (69 on 2026-09-15 alone); 109 of the 161 Parked rows
were **stale** (function live + C-cited before the row existed; rows
copied from `data.md`/`debt.md`/`absent.md`/TOP30 by the mandatory
refill). Parked rows averaged ~2 kB each; `LOOP-QUEUE.md` was 332 kB.
The 61 remaining corpus failures all sit under parked symptom owners
whose parks already name writers that were never re-queued
(`ready_weapon` shine arm, `m_throw`/`u_catch_thrown_obj`, `set_uasmon`
infravision, `can_carry` + worker spin, botl paint parity).
**Changed (docs):** `LOOP-QUEUE.md` header = row eligibility (evidence
in the row), stale check as a ≤3-call detour, park-and-requeue,
`[campaign k/n]` and `[measure]` rows, Parked as a ≤300-char index with
proofs moved to `docs/archive/LOOP-QUEUE-PARKED.md` (332 kB → 30 kB);
Open seeded with 3 writer rows, the botl-parity campaign (3 steps) and 2
`[measure]` rows ahead of the 8 unverified 2026-09-15 refill rows.
Playbook §1/§2/§2a/§2b/§5/§6/§8/§9/§10, Constitution §10.14–16, runbook
"Parked deep work" + corpus item, `CURRENT.md` objective, `NOTES.md`
Active (park lists → pointer), `HIDDEN-PROXY.md` §3, `AGENT-PORT-LOOP.md`
failure modes, Cursor rule "When public suite is PASS", the three loop
prompts. **Changed (scripts):** `agent-port-loop.sh` refill overlay now
asks for evidence rows (was: "prefer `data.md`/`debt.md`"), a popped
`[measure]` row is not an empty port (`port-did-park.mjs --measure`, +3
tests); `hidden-proxy.mjs queue` tags owners already open/parked/archived
and prints the differing screen row when toplines are identical;
`check-hot-docs.mjs` FAILs live rows without evidence and Parked lines >
400 chars; caps playbook 16→18 kB, prompt 8→9 kB, hot sum 40→44 kB.
**Falsifier:** park share over the next 30 port iterations ≤ 3, all
diagnostic with a writer/`[measure]` row in the same commit; corpus
PASS moves off 479/540 via the writer rows.
## 2026-09-15 — Audit b7216a99..a00fc90c (reviews 1359–1362) + cadence 44/44

1359 D-2393 obj_no_longer_held → **QUALITY-RISK** (canonical body exact vs
:891–920; whip/bones gates exact; clone fully retired; but the dothrow
call is miswired into `throw_gold`, which C never calls it from — C
:1808 is `throwit` landing, still unwired → Must-fix). 1360 D-2394
outentry → **ACCEPT** (death arms + astral switch arm-for-arm vs
:945–1107; committed outentry.test.mjs 4/4 re-run here). 1361 D-2395
dragon armor/wielding_corpse → **QUALITY-RISK** (body + RED/GOLD/YELLOW
+ Armor_on/off exact; all callees LIVE; but `Gloves_off` :687/696 pair
unwired and unnamed in map → Must-fix; flats-only Stone gate audited vs
writers, no split state). 1362 D-2396 sick/slimed/stoned mirror →
**ACCEPT** (dual-storage clobber mechanism verified in generic `--`
loop; re-ran `verify slimed_to_death --base` → Valkyrie-92229 PASS,
PROGRESS, 0 worse). Per-SHA `--base` re-verify throughout (3× 0/0
vacuous-confirmed, 1× PROGRESS), rulecheck/banned-grep clean. Cadence
44/44 (Scr 11,405, RNG 792,838, `48+0.30/turn`). Refill: +1 lawful Open
(`end.c` disclose, per really_done park terms); other 29 queue owners
all parked/archived — map-omit refill refused (corpus 88.7% < 90%,
§10.13 wins over the iter refill note). Open 1→2, Must-fix 0→2.
## 2026-09-15 — Audit 585f3720..48716eb3 (reviews 1354–1358) + cadence 44/44

1354 D-2388 query_classes → **ACCEPT** (canonical tally_BUCX, priest
bknown force incl. coin-clear; m_seen once; simple_look impossible).
1355 D-2389 stoning-corpse guard → **ACCEPT** (extern carrying_ fn;
select_off uarmg call site after Glib matches C :2742). 1356 D-2390
wallify_vault → **ACCEPT** (arm-for-arm vs :645–731; gd_move :913/:920
stay OMIT; sym "LOCAL CLONE" is C-staticfn linkage, not drift). 1357
D-2391 autoreturn_weapon → **ACCEPT** (arwep single live row; always_toss
skips the retreat rn2; AKLYS∉is_pole verified via obj.h:228; 3 clones
retired). 1358 D-2392 mhitm_ad_slow → **ACCEPT** (both arms + shared
`rn2(10)` gate; WAITFORU only in mhitm arm per damageum :4859; defended
OMIT). Per-SHA `--base` re-verify 0/0 throughout, rulecheck/banned-grep
clean. Cadence 44/44 (Scr 11,405, RNG 792,838, `49+0.30/turn`). No
Must-fix; 8 Open in band, no refill; D-2392 archive hash filled.
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
## 2026-09-15 — Audit 3f602af2..a1b96e3f (reviews 1346–1347) + cadence 44/44

1346 D-2380 → **ACCEPT** (1339 Must-fix retired as ordered; `were.js:57`
verified vs `youprop.h:355–360`). 1347 D-2381 float_up → **ACCEPT**
(buried_ball/Lev_at_will/surface/WEB/Flying arm-exact; fixes latent
`TT_WEB`-vs-`WEB` + `Flying_fu`-sans-steed-flyer C-wrongs). Per-SHA verify
0/0, rulecheck/banned-grep clean. Cadence 44/44 (Scr 11,405, RNG 792,838,
`65+0.43/turn`). No Must-fix; 9 Open in band, no refill.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-15 — D-2400 `allmain.c` moveloop_core [campaign botl-parity 1/3]: missing disp.botl/botlx set sites

**C locus:** `display.c` docrt post_map `:1766–1769` (`!maponly`: `update_inventory(); disp.botlx = TRUE;` + «caller needs to call bot() to actually redraw status») and `hack.c` losehp `:4268` (`disp.botl = TRUE; /* u.uhp or u.mh is changing */`, first line, unconditional).
**JS:** 3 js files (`js/display.js` +5/−1, `js/eat.js` +6, `js/invent.js` +4), under the 600/10 caps. Density note: one C locus family (botl set sites), three minimal flag writes; the travel-T remainder is a separate writer hunt for step 2, not bundled.
**Change:** `js/display.js` only — docrt sets `game.flags.botlx = true` after `see_monsters()` (post vision path, mirroring post_map; early uswallow/water/buried returns skip it as in C); omission narrowed to params + `update_inventory()`. `js/invent.js` only — dismiss re-arms `game.flags.botlx = true` after the JS-only wipe on the `!keep_status` fullscreen path (C's docrt-state must survive the shim; the immediate `flush_screen` still paints blank first, matching C blank-until-bot). `js/eat.js` only — both inline sites set `game.flags.botl = true` (C `:4268`), keeping the cycle-avoiding inline shape.
**Verify:** local-only gate probe, full `sessions`: 38/44 → 43/44 (seed0002/0006/0012/0014/4500 fixed; seed0007 remains). Shipped tree (gate reverted): `node scripts/verify.mjs --fn do_statusline2` → PASS syntax (3 changed js files) · PASS rule2 · hidden `verify do_statusline2: 0 PASS, 0 moved past, 10 unchanged → NO MOVEMENT` (expected for step 1: flags are no-ops under the unconditional `bot()`; movement ships in step 2 with the gate) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared files changed). Preflight `--no-cohort` green on the clean tree before edits.
**Named:** docrt_flags maponly/redrawonly/nocls params + `update_inventory()` (map turns.md display section updated: post_map botlx retired as live); eat inline sites still bypass `losehp()` body (death path); no headless `node:test` added — the flag is consumed by the immediate `flush_screen`→`bot()`, so post-call flag state is unobservable headless (probed: dismiss returns `botlx=false` after consuming it) and no display stub exists in `scripts/*.test.mjs`; the session suite (gate probe + 44/44) is the honest check.
**Next:** pop step 2/3 (apply the gate per `allmain.c:473–479`, delete the dead shims, `verify --fn do_statusline2` expecting the lembas pair Healer-92092/Tourist-91125 → step 60+). Remainder for step 2: seed0007 travel-T (run=8): JS paints `T:` only at `moves%7` (leap RDO) while C repaints nearly every capture; `runmode_delay_output`/`end_running`/`classify_terrain`/`lookaround` all verified ported and RDO provably fires with runmode=LEAP+time (temp trace) yet `time_botl` never reaches the gate — needs a C-side per-turn flag trace (temp-instrumented recorder) or display-stream dump to name the writer. Same iteration also parked two stale rows (no D owed): `wield.c` ready_weapon shine arm (D-2182 shipped, review 1148 ACCEPT; Rogue-92037 → drinkfountain@227) and `polyself.c` set_uasmon INFRAVISION (D-2276/1237c4d4 shipped; Caveman-92138 → PASS 83/83).
## 2026-09-15 — D-2399 `mthrowu.c` u_catch_thrown_obj catch arm (spoteffects park writer)

**C locus:** `nethack-c/upstream/src/mthrowu.c` `u_catch_thrown_obj :532–550` (gate `:536–543`: `!Blind && !Confusion && !Stunned && !Fumbling`, non-VENOM, `!nohands(gy.youmonst.data)`, `freehand()`, `calc_capacity <= SLT_ENCUMBER`, `!rn2(catch_chance)` with `100 - ACURR(A_DEX)` minus 20 for Monk/Rogue; success `:544–548`: `Snprintf "You catch the %s!"` + `hold_another_object(otmp, "You catch, but drop, the %s.", …)` → TRUE) + the `:695` caller (`!tethered_weapon && u_catch_thrown_obj(singleobj)` → `break` out of the flight loop). Only C caller: m_throw :695 (staticfn). `hold_another_object` (`invent.c:1208–1306`) holds via prinv or drops at the feet (`drop_it` → `dropx`) when slots/encumbrance refuse.
**JS:** 1 js file (`js/mthrowu.js`, +17/−9: import +1/−1, catch body +12/−5, caller +4/−3), under the 600/10 caps. Density note: C locus is 17 lines + the 1-line caller — the whole unit; the flight-stop half already shipped (D-2358).
**Change:** `js/mthrowu.js` only — `u_catch_thrown_obj` now `async`, tests `!nohands(game.youmonst?.data)` (null-safe; identical for unpoly'd heroes), and on success computes `simpleonames(otmp)` once (pre-addinv, as C's `buf`/`drop_arg` precede `addinv`) then `await hold_another_object(otmp, 'You catch, but drop, the %s.', onames, `You catch the ${onames}!`)` (already-imported canonical, both arms live per D-0863/D-1272); the caller `await`s and `break`s (C control flow — the tail paints bhitpos + DISP_END, resets mesg_given, runs the blindinc tail, clears thrownobj). `simpleonames` joins the live objnam static edge (`imports.mjs --can` → ALREADY, no new edge); no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn spoteffects` → PASS syntax (1 changed js file: js/mthrowu.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden `verify spoteffects: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-tour-Samurai-92161: moved → distfleeck at step 37, was spoteffects at 35; scrM 37→39, rngM 4321→4375) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS. Preflight `--no-cohort` green on the clean tree before edits. No hand probes (a corpus session reaches the arm: stepFns carried u_catch_thrown_obj at the step).
**Named:** `mthrowu.js:292` file-local `freehand` clone kept (engrave.js:610 canonical is C-home and differs on welded/bimanual; swapping the pre-`rn2` guard would churn gate outcomes — own row if a session blocks with a freehand-gated catch divergence; none does); `drop_throw` `passive_obj(mtmp, obj, 0)` arm stays map-named (pre-existing).
**Next:** Samurai-92161 now rests on parked symptom owner `monmove.c distfleeck` (step 37, pet-movement `rn2(5) @ distfleeck` vs `rnd(5) @ score_targ`) — no new row (park covers it). Pop the next Open row (`wield.c` ready_weapon shine arm, scen-wish-Rogue-92037).
## 2026-09-15 — D-2398 `dothrow.c` throwit landing `obj_no_longer_held` miswire (review 1359 Must-fix)

**C locus:** `nethack-c/upstream/src/dothrow.c` `throwit :1806–1809` (`flooreffects(obj, bhitpos, "fall")` → `obj_no_longer_held(obj)` `:1808` → shk pick-snatch `is_pick`/`mpickobj` → `snuff_candle` → `ship_object`). C `throw_gold` (`:2656+`) never calls it — gold is never CRYSKNIFE, so a call there is dead code.
**JS:** 1 js file (`js/dothrow.js`, +7/−6), under the 600/10 caps. Density note: Must-fix single item shipped alone per rule.
**Change:** `js/dothrow.js` only — deleted the dead `throw_gold` block; added the same dynamic-import + `await` in `throwit` between the `flooreffects` block and the snuff arm (exact C `:1808` position; pick-snatch stays named omit). No new static edges (dynamic import on the live `do.js` edge, same shape as the removed block — no TDZ risk); Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `/tmp/probe_throwit_land.mjs` → normal-crysknife-revert PASS (mon_moving gate skips billing, revert still applies; deleted after run). `node scripts/verify.mjs --fn throwit` → PASS syntax (1 changed js file: js/dothrow.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · note hidden `verify throwit: no corpus session is blocked on it at HEAD` (vacuous, NOT a corpus PASS; row cited 0 blocks so no --base owed) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · VERIFY: PASS. Preflight `--no-cohort` green on the clean tree before edits.
**Named:** `throwit` shk pick-snatch (`is_pick`/`mpickobj`, pre-existing named per review 295/D-2393) stays named; `mkobj.c` `place_object`/`add_to_container` + `worn.c` `extract_from_minvent` sync-core callers stay map-named (D-2393).
**Next:** pop the next Open row (`vision.c` vision_recalc). Queue 11→10 unchecked on archive, in the 8–12 band — no refill.
## 2026-09-15 — D-2397 `do_wear.c` Gloves_off `:687/696` wielding_corpse pair (review 1361 Must-fix)

**C locus:** `nethack-c/upstream/src/do_wear.c` Gloves_off `:646–702` (`gloves = uarmg` capture `:647`, `on_purpose = !mon_moving && !in_use` `:650`, `takeoff.mask &= ~W_ARMG` `:651`, CORPSE-gated `wielding_corpse(uwep, gloves, on_purpose)` `:687–690` + `twoweap && uswapwep` `:696–697` with the KMH comment). C callers: do_wear.c `:1986` (armoroff no-delay) / `:2862` (do_takeoff) / `:3164` (wornarm_destroyed) + polyself.c `:1255` (break_armor) + steal.c `:254` (remove_worn_item).
**JS:** 3 js files (`js/do_wear.js` +41/−4, `js/polyself.js` +1/−1, `js/steal.js` +1/−1), under the 600/10 caps + new maintained test `scripts/gloves-off-wielding-corpse.test.mjs` (5 tests). Density note: Must-fix single item shipped alone per rule.
**Change:** `js/do_wear.js` — `Gloves_off` now async in C order: capture `gloves` + `on_purpose` pre-clear, `takeoff.mask &= ~W_ARMG`, `clear_worn(W_ARMG)`, then the CORPSE-gated pair on the captured gloves (KMH comment preserved); null-gloves early arm mirrors the Boots_off/Cloak_off house shape (C never null there). Caller cascade (every C call site): armoroff immediate `await` (`:1391`), do_takeoff `await` (`:1868`), wornarm_destroyed `await` (`:3330`), polyself break_armor `await` (`polyself.js:1102`), steal remove_worn_item `await` (`steal.js:260`); afternmv assignment (`:1373`) unchanged — `unmul` already awaits (`hack.js:1167`). No new imports or edges (same-file `wielding_corpse`, `CORPSE` const already in module); Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node --test scripts/gloves-off-wielding-corpse.test.mjs` → 5/5 pass (async-shape test pins the caller cascade — the old sync return fails `instanceof Promise`; CORPSE-gated pair reached headless for non-stoning + Stone-resisted corpses and `in_use` on_purpose arm; the live petrify path via `instapetrify`/`done` needs game-over state so it stays covered by session verify, said here not claimed). `node scripts/verify.mjs --fn Gloves_off` → PASS syntax (3 changed js files) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · note hidden `verify Gloves_off: no corpus session is blocked on it at HEAD` (vacuous, NOT a corpus PASS; row cited 0 blocks so no --base owed) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · VERIFY: PASS. Preflight `--no-cohort` green on the clean tree before edits.
**Named:** Gloves_off Fumbling/Power/Dexterity switch arms + Glib cure + encumber_msg (pre-existing thin-stub gaps, review-scoped out); yellow-DSM + timeout wielding_corpse pairs already live (D-2395).
**Next:** pop the next Must-fix row (`dothrow.c` throwit `obj_no_longer_held`, review 1359). Queue refill +8 data.md map-omit Open rows (mkbox_cnts BoH weight, droppables, skinback, rnd_misc_item, map_location, load_special soko remainder, save_regions, single_level_branch) → 11 unchecked, in the 8–12 band.
## 2026-09-15 — D-2396 `potion.c` make_sick/make_slimed/make_stoned uprops mirror (slimed_to_death screen owner)

**C locus:** `nethack-c/upstream/src/potion.c` make_sick `:140–188` (onset message gate `:158`, `set_itimeout(&Sick, xtime)` `:160`, partial `Sick * 2` `:169`, full `Sick = 0L` `:173`) + make_slimed `:195–215` + make_stoned `:218–236` (both `set_itimeout`); `set_itimeout :75–79` (TIMEOUT bits only); `youprop.h:108` Sick ≡ uprops[SICK].intrinsic single storage. Diseasemu (`mhitu.c:1032–1043`) re-sickens mid-turn with `Sick ? Sick/3+1` (no RNG), so repeated Demogorgon hits shrink Sick (`S/3+1 < S` for `S > 1`): early hits print "much", late hits "even" (threshold `S >= 6`).
**JS:** 1 js file (`js/potion.js`, +26/−0), under the 600/10 caps. Density note: 26 insertions on an Open row (C loci total ~85 lines across the three bodies) — a root-cause fix in the D-2151 22-line class; no larger C-faithful unit exists (slimed_to_death itself is already arm-for-arm per review 993 ACCEPT).
**Change:** `js/potion.js` only — the make_sick onset, partial-cure and full-cure arms plus make_slimed/make_stoned now mirror TIMEOUT bits to `u.uprops[…].intrinsic` (slot created when missing; full cure clears intrinsic per C `Sick = 0L`), preserving non-TIMEOUT flags per set_itimeout. No new imports (SICK/SLIMED/STONED/TIMEOUT already in file); no new edges; Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node scripts/verify.mjs --fn slimed_to_death` → PASS syntax (1 changed js file: js/potion.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · PASS hidden `verify slimed_to_death: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (scen-death-Valkyrie-92229: PASS) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS. Preflight `--no-cohort` green on the clean tree before edits. No hand probes kept (mechanism proven by code-read interleave + corpus PASS; /tmp simulation deleted).
**Named:** make_vomiting/make_stunned/make_confused flat writers share the dual-storage shape (own rows when a corpus session blocks on them — none does at HEAD); the `xtime <= (old & TIMEOUT)/2` vs C `Sick/2` full-intrinsic comparison stays masked (flags would inflate C's divisor; SICK carries none on this path — draw-free either way); sync_timeout_flats conditional-copy left as backstop (harmless now that writers mirror).
**Next:** pop the next Open row (vision_recalc). Queue 2→1 Open on archive: live `hidden-proxy queue --limit 100` tops (22 rows) are all parked symptom/misattributed owners, archived/shipped, or the fixed slimed row; every unqueued TOP30 row is likewise parked/shipped or map-singleton material gated at corpus < 90 % (Constitution §10.13, LOOP-QUEUE Deferred) — no filler invented, refill on rescore.
## 2026-09-15 — D-2395 `do_wear.c` dragon_armor_handling color/arti_light arms (D-0636 deferred)

**C locus:** `nethack-c/upstream/src/do_wear.c` `wielding_corpse :606–643` (null/non-CORPSE/gloved return; wielded-or-twoweap-alt gate; `touch_petrifies(&mons[corpsenm]) && !Stone_resistance` You/instapetrify/remove_worn_item with `removing`/`losing` + gloves/simpleonames hbuf and `while wielding killer_xname` kbuf) + `dragon_armor_handling :797–884` (RED `:837–845` EInfravision + `see_monsters()` both directions; GOLD `:846–852` `(void) make_hallucinated((long) !puton, restoring ? FALSE : TRUE, W_ARM)`; YELLOW `:861–873` EStone_resistance + doff-only `wielding_corpse(uwep/uswapwep, otmp, on_purpose)`) + `Armor_on :886–900` (known + `update_inventory`, dragon TRUE/TRUE, gold-DSM `artifact_light && !lamplit` → `begin_burn(FALSE)` + `Yname2 otense begin to shine arti_light_description`) + `Armor_off :909–930` (was_arti_light snapshot, mask clear, `setworn(NULL,W_ARM)`, cancelled_don reset, `was && !artifact_light` → `end_burn(FALSE)` + `Tobjnam stop shining`, dragon FALSE/TRUE). `Armor_gone :939–960` already live (D-1942) — untouched, order mirrored.
**JS:** 1 js file (`js/do_wear.js`, +~90/−15: wielding_corpse +33, dragon arms +12, Armor_on +10, Armor_off +16, imports +6, docs) + one map line, under the 600/10 caps. C locus is ~115 lines across the four bodies so density is in band.
**Change:** `js/do_wear.js` only — new exported `wielding_corpse(obj, how, voluntary)` in exact C order (CORPSE/uarmg/wield gates; `touch_petrifies(mons(corpsenm))` + flat/H/E Stone check; `pline You … in your bare …` blue-arm idiom over `corpse_xname(obj,null,CXN_ARTICLE)` + `makeplural(body_part_latebound(HAND))`; hbuf/kbuf + `await instapetrify(kbuf)` + re-checked remove via the file-local weapon-thin helper — obj is always W_WEP so the steal.js canonical armor/amulet/ring arms are unreachable, review 47); RED adds sync `see_monsters()` (already imported); GOLD adds `await make_hallucinated(puton ? 0 : 1, !(game.program_state?.restoring), W_ARM)`; YELLOW adds doff-only `await wielding_corpse(uwep/uswapwep, otmp, on_purpose)`; `Armor_on` adds `update_inventory()` in the known gate + the gold-DSM begin_burn/pline block in C order; `Armor_off` adds mask/cancelled/arti_light end_burn block mirroring `Armor_gone`. Imports: `Yname2/corpse_xname/killer_xname/arti_light_description` onto the live objnam edge, `CXN_ARTICLE` onto const, `instapetrify`/`begin_burn` onto live trap/timeout edges, `strsubst` (hacklib, SAFE no-cycle) + `make_hallucinated` (potion, hoisted SAFE per imports.mjs) as the only new file edges — all call-time use, no top-level TDZ read. Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node scripts/verify.mjs --fn dragon_armor_handling` → PASS syntax (1 changed js file: js/do_wear.js) · PASS rule2 (no fs/path/url/node:, no DIAG/FORCE/seed gates) · note hidden `verify dragon_armor_handling: no corpus session is blocked on it at HEAD — a vacuous verify is NOT a corpus PASS` (row cited 0 blocks — brief lists none for dragon and wielding — so no --base owed; ship is on the C citation + public gates, stated honestly here, not as a corpus PASS) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS. Preflight `--no-cohort` green before edits; final verify after the last js/ edit (map + CURRENT + D-log entries are docs-only, no D-1831 gap). No hand probes (every arm is reachable via dragon-scale wish/poly paths but no corpus session blocks on them; behavior is C-order exact).
**Named:** none new. The turns.md:1067-1069 four-way deferral is fully retired (this entry).
**Next:** pop the next Open row. Queue 7→6 Open on archive: live `hidden-proxy queue --limit 30` tops are all parked symptom/misattributed owners (do_statusline2×10, obj_resists×6, distfleeck×5, m_move×3, one_characteristic×3, rloc×2, then 1-block singles) or the live slimed_to_death row; every unqueued TOP30 row is likewise parked/shipped; debt pool 220/220 exhausted and map singletons stay gated at corpus 88.5% < 90% (Constitution §10.13, LOOP-QUEUE Deferred) — no filler invented, refill on rescore.
## 2026-09-15 — D-2394 `topten.c` outentry astral/choked/poisoned/crushed/petrified arms (D-2122-named residual)

**C locus:** `nethack-c/upstream/src/topten.c` `outentry :946–1107` — first-line chain (quit/4 + `died of st`/10 `:989` set second_line FALSE; `choked`/6 `:992–993` → `choked on h%s food` with her/is on `plgend[0]=='F'`; `poisoned`/8 `:995–996` → `was poisoned`; `crushed`/7 `:997–998` → `was crushed to death`; `petrified by `/13 `:999` → `turned to stone`; else `died`), all but quit/starved keeping second_line TRUE into the shared location append; astral arm `:1004–1010` (`deathdnum == astral_level.dnum` → fmt switch on `deathlev`: -5 `on the %s Plane`/Astral, -4 Water, -3 Fire, -2 Air, -1 Earth, default Void via `on the Plane of %s`) vs the dungeon `in <dname>` + knox-guarded `on level` + `[max]` else-branch; quit-boat kludge `:1037` (already live, untouched).
**JS:** 1 js file (`js/topten.js`, +53/−15 across the two arms) + new maintained test `scripts/outentry.test.mjs` (node:test convention, 4 its), under the 600/10 caps. C residual is ~30 lines so the small diff is the whole locus (D-2121 precedent).
**Change:** `js/topten.js` only — the four arms in exact C order with `slice(0,6/8/7/13)` prefix checks (≡ the `strncmp` lens) and `t1.plgend?.[0]==='F'`, then the astral switch in C order with C's two fmt strings (`replace('%s',arg)`); dungeon branch byte-untouched; doc header now `Named omissions: none`. No new imports or edges (game-only reads, same-file locals); Rule #2 clean; no DIAG/FORCE/seed gates.
**Verify:** `node --test scripts/outentry.test.mjs` → 4/4 pass, end-to-end through the exported `topten()` (outentry is C-static so it stays local): VFS record seeds all 12 arms with distinct uids (PERS_IS_UID), display mock captures the panel, 15-space wraps re-joined — choked his/her + location + second lines; poisoned/crushed/petrified first + second lines; all six astral planes with no dungeon/level suffix; ordinary dungeon line unchanged. `node scripts/verify.mjs --fn outentry` → PASS syntax (1 changed js file) · PASS rule2 · note hidden (0 blocked at HEAD — vacuous, NOT a corpus PASS; row cited 0 blocks so no --base owed) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · VERIFY: PASS. Preflight `--no-cohort` green before edits; final verify after the last js/ edit (comment-only test edits re-probed 4/4 after).
**Named:** none new; both `outentry` map omissions retired (turns.md line updated to live, this entry).
**Next:** pop the next Open row. Queue sits at 7 Open on archive: all 23 live `hidden-proxy queue` owners classified this iter — 22 parked symptom/misattributed classes (do_statusline2, obj_resists, distfleeck, m_move, one_characteristic, rloc, spoteffects, mon_adjust_speed, collect_coords, zapyourself, dodown, doturn, dopush, mdrop_obj, that_is_a_mimic, were_change, break_armor, mcast_death_touch, disclose, drinkfountain, list_vanquished, dog_invent) + the live slimed_to_death row; TOP30 remainder parked/shipped/singleton-gated below 90% corpus PASS — no filler invented, refill on rescore. Also filled `b7216a99` on the previous D-2393 DONE row in this commit.
## 2026-09-15 — D-2393 do.c obj_no_longer_held: canonical crysknife-revert export + whip/throw/bones wiring (D-2060-named residual)

**C locus:** `nethack-c/upstream/src/do.c` `obj_no_longer_held :893–920` — null return; `Has_contents` (`obj.h:334`, cobj non-null) recursion over the `cobj`/`nobj` chain, then the CRYSKNIFE switch arm (the recursion is `else if` but the switch still runs). Callers: `apply.c:3237` (whip default arm, before `place_object`), `bones.c:279–280` (gated `!mtmp || is_undead(mtmp->data)` — slime keeps gear held), `dothrow.c:1808` (after `flooreffects`, before the shk pick-snatch), `mkobj.c:2330` (`place_object`, unconditional), `mkobj.c:2683` (`add_to_container`, gated `container->where != INVENT && != MINVENT`), `worn.c:1413` (`extract_from_minvent` tail, unconditional); `mkobj.c:768/:799` OBJ_FREE comment and `steal.c:834` done-by-place_object note read, no code.
**JS:** 4 js files (`do.js` +31, `apply.js` −16 net, `dothrow.js` +6, `end.js` +21/−6) + one map line, ~60 insertions total, under the 600/10 caps. No DIAG/FORCE/seed gates; Rule #2 clean. No committed probes (two `/tmp` probes kept out of tree: behavior + RNG short-circuit).
**Change:** `js/do.js` — canonical exported `async obj_no_longer_held` in exact C order (null return; `Has_contents` recursion; `(otyp|0)===CRYSKNIFE` + `!oerodeproof || !rn2(10)` short-circuit so normal draws zero RNG and fixed draws one `rn2(10)`; `!mon_moving && !gameover` → `await costly_alteration(obj, COST_DEGRD)`; otyp=WORM_TOOTH + oerodeproof=0). `CRYSKNIFE`/`WORM_TOOTH` join the file-local `objectNames.indexOf` consts; `COST_DEGRD` joins the `const.js` import and `costly_alteration` the live `shk.js` edge (`imports.mjs --can` → ALREADY, no new edge). `js/apply.js` — imports the canonical export on the live `do.js` edge, deletes the clone, swaps the whip call, drops the two now-dead otyp consts.
**Verify:** `node scripts/verify.mjs --fn obj_no_longer_held` → `PASS syntax 4 changed js file(s): js/apply.js js/do.js js/dothrow.js js/end.js` · `PASS rule2` · `note hidden verify obj_no_longer_held: no corpus session is blocked on it at HEAD — a vacuous verify is NOT a corpus PASS` (row cited 0 blocks — brief lists none — so no --base owed; ship is on the C citation + public gates, stated honestly here, not as a corpus PASS) · `PASS green 2/2` + strict ×2 · `PASS cohort 7/7` · `PASS full 44/44 (auto: shared file changed)` · `VERIFY: PASS`. Final verify ran after the last js/ edit and the map line; the one later edit (this D-log entry, docs-only) touches no behavior (no D-1831 gap). Probes: `/tmp/probe_obj_no_longer_held.mjs` 6/6 (null no-op, non-crysknife untouched, normal revert, container-chain recursion, mon_moving shape); `/tmp/probe_onlh_rng.mjs` seeded `initRng(1234)` — normal draws 0, fixed draws exactly 1× `rn2(10)=4` (C `||` short-circuit exact).
**Named:** sync cores `place_object` (`mkobj.c:2330`), `add_to_container` (`mkobj.c:2683`), `extract_from_minvent` (`worn.c:1413`) stay named (map: turns.md do.c section) — all three are sync functions with dozens of sync callers, and the canonical export's shop-billing arm is async; converting them is a sync-core follow-up, own rows on a falsifier (a crysknife-floor-place or container/mon-unwear trace showing the revert missing). `steal.c:834` is a non-arm (done by `place_object`, same follow-up).
**Next:** pop the next Open row (`topten.c` outentry astral/choked/poisoned/crushed/petrified arms; `brief outentry`).
