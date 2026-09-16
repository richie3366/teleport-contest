# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
## 2026-09-16 — Self-heal pass (human-directed): the loop must not stop at night

**What happened 00:31–01:54 (iters 3113–3120):** 3 ports shipped (D-2399
catch arm, D-2400 botl set sites, D-2401 droppables), all 8 "unverified"
refill rows were confirmed **stale** and parked in one iteration (8/8, as
predicted), two `[measure]` rows were delivered (can_carry: no spin at
HEAD; hitmu: Priest-91110 now PASS), and a writer row (`polymon` find_ac
order) came out of the do_statusline2 AC diff and shipped as D-2402
(corpus 479→483/540, do_statusline2 ×10→×4). Two seeded writer rows
(`ready_weapon` shine, `set_uasmon` infravision) were themselves stale —
the parks' writer claims predated D-2182/D-2276. **Then the loop
halted:** #3119's 7 stale parks went undetected by `port-did-park.mjs`
(the rows had a backticked function token), so an "empty port — ship
js/" overlay was armed and consumed by the **audit** #3120, which ported
js/ → "audit touched js/ AND pushed — human must revert origin" → STOP.
**Changed (supervisor):** overlays carry `<!-- overlay-for: port|any -->`
and port-only ones are deferred past review/audit iterations; audit js/
is kept + warned (gates decide); density → iteration undone (reset, or
forward `git revert` + push) + "split" overlay; protected authority edits
→ files restored from before_head + overlay, halt only at 3 in a row;
plan quota / `ActionRequiredError` / 3 short runs → **wait** (15-min
polls of `/usage`, max 10 h) instead of exiting; `git push` retries 5×
then warns; missing-usage streak and housekeeping-commit failures warn
instead of halt+revert; stale-only park iterations get a "ship the head"
overlay (`port-did-park.mjs --stale-only`); `openRowKey` strips
backticks (+4 tests). **Docs:** LOOP-QUEUE header (writer rows need a
brief at enqueue; `[measure]` leaves ≤ 3 NOTES lines), prompt, playbook
§10, AGENT-PORT-LOOP failure modes + knobs; `check-hot-docs` exempts
grouped stale lines, NOTES cap 7 kB, REFILL hint = evidence rows. Queue
seeded with `status_enlightenment` held-by/utrap arms (3 sessions,
verified absent at `js/invent.js:5077`) + 3 `[measure]` rows
(obj_resists S2/S3, rloc migrant creation, m_move Caveman `cnt-j`).
**Falsifier:** zero supervisor HALTs over the next 24 h unattended;
every `warning:` line names the self-heal taken.
## 2026-09-16 — Audit 1363–1367 + D-2402 polymon port (operator: ship Open head after #3119 no-js)

Reviews: 5 SHAs oldest-first, files written per-SHA — 1363 ACCEPT (Gloves_off pair), 1364 ACCEPT (throwit miswire), 1365 QUALITY-RISK (u_catch guard runs divergent `freehand` clone; C has one `freehand`, engrave.c:472–477; `--can` SAFE → Must-fix), 1366 QUALITY-RISK (docrt early arms skip `botlx` but C `goto post_map` sets it; "skip it as in C" is C-false → Must-fix), 1367 ACCEPT (droppables branch-exact). 2 Must-fix prepended; Next cluster = freehand.
Port: Open head polymon find_ac C-order restore (D-0722 deferral retired — it was for `setworn` poisoning, not polymon's own call): Tourist-92095 step 46 AC:10→AC:6, `verify do_statusline2` 4 PASS + 2 moved past + 0 worse, full 44/44 (seed0108 303/303), corpus rescore 479→483/540 (89.4 %, do_statusline2 ×10→×4).
Refill: 0 as-is owners (all 23 tagged); parks name measurements not writers (`dohide` 0 blocked — skipped); singletons gated < 90 %; Open 0→3 (campaign 2/3, distfleeck `[measure]`, eat `losehp` arm). No D-0006/dog_invent.
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
## 2026-09-15 — D-2401 `dogmove.c` `droppables` tool-keeping arms (`:27–136`)

**C locus:** `nethack-c/upstream/src/dogmove.c` `droppables` `:27–136` (dummy sentinel GOLD_PIECE/oartifact=1 never returned; animal/mindless → dummy; non-tunnel/no-needpick → pickaxe=dummy; nohands/verysmall → key=dummy; wep `is_pick`/`UNICORN_HORN` capture; `DWARVISH_MATTOCK` shield-gated FALLTHROUGH to `PICK_AXE` artifact-preference keep/return; `UNICORN_HORN` cursed-reject + artifact keep; `SKELETON_KEY`→`LOCK_PICK`→`CREDIT_CARD` FALLTHROUGH chain with artifact preference; default falls to `!owornmask && !=wep` first-free return; `0` when nothing droppable).
**JS:** 1 js file (`js/dogmove.js` +102/−8: imports +4, otyp consts +7, body +91/−8), under 600/10 caps. Density note: one C locus family (110-line C → ~90-line JS), the whole missing envelope.
**Change:** `js/dogmove.js` only — full C-order port with C FALLTHROUGH structure, `|0` oartifact integer idiom, `MON_WEP(mon)` canonical wep, `which_armor(mon, W_ARMS)` mattock gate, `is_pick`/`tunnels`/`needspick`/`nohands`/`verysmall`/`is_animal`/`mindless` canonical imports (`imports.mjs --can` SAFE — hoisted functions, same 90-module SCC), numeric `objectNames.indexOf` otyp consts, fresh per-call dummy sentinel never returned. No RNG, no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn droppables` → PASS syntax (1 changed js file) · PASS rule2 · note hidden (0 blocked at HEAD — vacuous, row cited no N so no `--base` owed) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS. Preflight `--no-cohort` green on clean tree. Probe `/tmp/probe-droppables2.mjs` (otyp consts resolve, `dogmove.js` loads, `MON_WEP`/`which_armor` functions) — repo-untouched, kept in `/tmp` per policy.
**Named:** `mdrop_obj` flooreffects + vault-guard gold + worn/shop extrinsics stay named (pre-existing `js/dogmove.js:559` subset comment; data.md:286 narrowed to those, tool-keeping retired); `dog_has_minvent` standalone export still absent (inlined in `dog_invent` apport gate).
**Next:** pop next Open row in order (head `eat.c` 3/3 stays MASKED until step-2 paint ships; `[measure]` Knight spin + rat-bite rows are no-`js/` parks).
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
