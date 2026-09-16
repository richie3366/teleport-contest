# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
## 2026-09-16 — Audit 1368–1373 (5 ACCEPT, 1 QUALITY-RISK) + cadence 44/44

Six `js/` SHAs since eb9ad04a, oldest first, one file per SHA: ccbd68f2 D-2402 polymon find_ac ACCEPT; 285aea6b D-2403 docrt early-botlx ACCEPT (closes 1366 Must-fix); 63941e67 D-2404 freehand ACCEPT (closes 1365 Must-fix; spell.js:1101 keeps the old divergent shape live at :1120 — pre-existing, needs a brief before any row); a01e8b84 D-2405 gate+run=0 ACCEPT (re-measured 0/2/2/0 PROGRESS verbatim); 3e4e31f8 D-2406 **QUALITY-RISK** (steed+trap verb hardcodes are/were, C :1094–1096 is/was when not anchored — 1 Must-fix prepended, Next cluster set); 0a008ef1 D-2407 relobj flooreffects ACCEPT (Samurai js-throw label rebutted: scoreboard kind=screen error=null). Every corpus claim re-measured `--base HASH~1` on this tree — all reproduce, 0 worse. Cadence: full `sessions` 44/44, Scr 11405/11405, RNG 792838/792838, `48+0.30/turn`; corpus re-scored 485/540 (89.8 %). Open band 9 rows — no refill. No `js/` edits; one grouped commit + push.
## 2026-09-16 — [measure] rloc migrant creation delivered (no js/)

Queue-head `[measure]` (Healer-92042 s73 + Ranger-92033 s70, both `rloc`-owned arrivals): C temp-fprintf dump on the recorder (losedogs lists, mon_arrive, mon_arrive→rloc, put_lregion-oneshot, rloc entry + RNG call-count; reverted, Healer re-record byte-identical) + JS prefix-state probes (`/tmp/probe-healer-js.mjs`, kept). Healer s73 = `mon_arrive` After_you orc-captain (mnum 77, ORC_LEADER migflags=8192, from 2:3 → dest 2:8); JS queued all 6 gang migrants at s53 (other 5 match 2:4/2:5) but holds the captain at mux=3,muy=0 → writer row `migrate_orc` leader-dest (`js/mklev.js:993`). Ranger s70 = wizard minetn arrival (uz=2:4, moves=24), migrating EMPTY — two `shkinit:660` insurance rlocs (nymph mnum 69 @(31,12), lynx mnum 35 @(45,15), 2 tries each; entry counts 15606/16183 match draw indices exactly; `rloc_to_core→set_apparxy` punt explains the 401 following draws) while JS `js/shknam.js:642–646` zeroes the blocker → writer row `shkinit` insurance. Falsified, do not re-check: `rloc` body (D-0686), put_lregion-oneshot, baalz_fixup, Healer creation path (stolen_booty live), Ranger mon_arrive. -[x] archived; two Open writer rows added; D-2407 archive hash backfilled (`0a008ef1`); commit+push, no finish-iteration. Recorder tree restored pristine (sources + rebuilt x86_64 binary, zero PROBE strings).
## 2026-09-16 — [measure] obj_resists S2/S3 writers delivered (no js/)

Queue-head `[measure]` (Samurai-92032 s59 + Wizard-92219 s115): C per-turn dump (fmon/movement/traps, objresist args/where, or00 site markers, lavafall square; reverted, VALUES-IDENTICAL) names one writer — `steal.c` relobj death-drop `flooreffects` (nymph @61,9-lava, orc @63,3-lava; C burned potion via lava_damage, JS `relobj_on_death` places directly). Terrain 0 diffs, traps 16/16. Writer Open row added; -[x] archived; commit+push, no finish-iteration.
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
## 2026-09-16 — D-2408 `insight.c` utrap-steed verb: C `:1094–1096` anchored ternary (`is/was` vs `are/were`)

**C locus:** `insight.c:1094–1096` — `enl_msg(buf, (anchored ? "are " : "is "), (anchored ? "were " : "was "), predicament, "")` where `anchored = (u.utraptype == TT_BURIEDBALL)` (`:1088`); the steed branch tests `u.usteed`, not `Riding` (`:1092`).
**JS:** 1 js file (`js/invent.js` +13/−3: helper +9, call site +1, comment +3/−3) + extended maintained test `scripts/trap-predicament.test.mjs` (+16: new `utrap_steed_verb` describe, anchored are/were + unanchored is/was), under the 600/10 caps. Density note: Must-fix single item, alone — C is three lines, so the small diff is the whole locus.
**Change:** `js/invent.js` only — new exported `utrap_steed_verb(final, anchored)` (`:4975`-area, C `:1094–1096` verbatim: `final ? (anchored ? 'were ' : 'was ') : (anchored ? 'are ' : 'is ')`); the steed arm calls it; the comment now quotes C's full ternary. No new imports (same-file helper); no RNG re-decisions (verb selection is RNG-neutral); no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn status_enlightenment` → PASS syntax (1 changed js file: js/invent.js) · PASS rule2 · note hidden (vacuous — 0 blocked at HEAD; the row cites no corpus session so no `--base` owed; ships on the C citation + public gates per review 1372) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS. `node --test scripts/trap-predicament.test.mjs` → 8/8 pass (6 pre-existing + 2 new verb cases; new cases fail on pre-fix code — hardcoded plural — by construction). Preflight `--no-cohort` green on the clean tree before edits.
**Named:** none new (`self_lookat` steed `y_monnam` arm stays per D-2406; null-steedname → `you_are` fallback stays per D-2406).
**Next:** pop the next Open row (`mon.c` `mm_aggression`/`mm_displacement` writer, 3 sessions) in order.
## 2026-09-16 — D-2407 `steal.c` relobj death-drop `flooreffects` arm (`relobj_on_death`)

**C locus:** `steal.c:874–898` `relobj` → per-head `mdrop_obj` `:813–846`, whose `:840–843` routes the freed obj through `flooreffects(obj, omx, omy, "fall")` before `place_object` + `stackobj` (death path passes verbosely=FALSE; the saddle-no_charge arm is tame-only and `update_mon_extrinsics` is `!DEADMONSTER`-gated, so neither fires on a death drop).
**JS:** 2 js files (`js/mkobj.js` +13/−6, `js/mhitm.js` +2/−2: two `await`s + stale line-number comment) + new maintained test `scripts/relobj-flooreffects.test.mjs` (2 tests), under the 600/10 caps. Density note: small diff because C is that small (20-line `relobj` + 4-line gate); the test + both callers + map/queue updates ride in the same commit.
**Change:** `js/mkobj.js` — `relobj_on_death` now `async`, dynamic-imports `flooreffects` from `./do.js` (no new static edge into the 90-module SCC; same shape as `mon.js` `mdrop_obj` / `dothrow.js` `throwit`; `imports.mjs --can mkobj.js do.js flooreffects` → SAFE, hoisted function) and places+stacks only when `flooreffects(otmp, omx, omy, 'fall')` returns false (C `:840–843` order verbatim). `js/mhitm.js` — both call sites `await` (`grddead :2996`, `m_detach :3140`; both fns already async). No RNG re-decisions (burn draws stay inside the established `lava_damage`/`delobj_core` ports); no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn obj_resists` → PASS syntax (2 changed js files) · PASS rule2 · hidden `verify obj_resists: 1 PASS, 1 moved past, 3 unchanged, 0 worse → PROGRESS` (Wizard-92219 → PASS; Samurai-92032 @59 → @96 with RNG 20913/20913 fully matched, first diff now an owner-null map-region cell `]7`-vs-blank at row 21 col 78 — paint writer, see Next; Knight-92182 @95, Arch-92238 @166, Healer-92173 @230 unchanged at the same steps — other writers as the row NOTE'd) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file per the runner) · VERIFY: PASS. `node --test scripts/relobj-flooreffects.test.mjs` → 2/2 pass (lava burns, floor places; fails on pre-fix code — potion placed on lava — proven via stash). Preflight `--no-cohort` green on the clean tree before edits.
**Named:** vault-guard gold arm inside `relobj_on_death` (`grddead` issues isgd inline; a guard dying off the grddead path stays named); pet-path `mdrop_obj` `flooreffects`/saddle/extrinsics in `js/dogmove.js` (pre-existing D-0029/D-2401 omit, map line kept); `lava_damage` carried-useupall/remove_worn_item (pre-existing `do.js` note).
**Next:** Samurai-92032 @96 owner-null map cell (row 21 col 78 `]7` vs blank, stepFns exercise) wants a writer row on a C-side map/paint measurement, not a re-port (no C literal owns it); then the queue in order ([measure] teleport rloc, m_move, distfleeck, worn, enlightenment writers, eat `losehp`, `list_genocided`).
## 2026-09-16 — D-2406 `insight.c` status_enlightenment utrap + held-by/holding arms + `trap_predicament`

**C locus:** `insight.c:1086–1098` (`u.utrap` → `trap_predicament(predicament, final, wizard)` + steed/anchored `enl_msg` vs `you_are`; steed branch tests `u.usteed`, not `Riding`; `steedname` null-guarded by `Riding` at `:946–956`) + `:1099–1131` (`heldmon` via `a_monnam` with the `it`→`an unseen creature` rule, `uswallow` arm, `else if (u.ustuck)`: `ustick = Upolyd && sticks(youmonst.data)`, `"%s %s (%s)"` holding/held-by + `heldmon` + `dxdy_to_dist_descr(dx, dy, TRUE)`) + `trap_predicament` `:232–261` (BURIEDBALL/LAVA/INFLOOR/default arms + wizard ` {<utrap>}` counter braces).
**JS:** 2 js files (`js/invent.js` ~+100, `js/pager.js` +7/−3) + new maintained test `scripts/trap-predicament.test.mjs` (6 tests), under the 600/10 caps. Density note: one C locus family (utrap/held Status lines + their shared predicament helper + its second caller).
**Change:** `js/invent.js` — new exported `trap_predicament(final, wizxtra)` (`:4975`, C `:232–261` verbatim incl. `should never be null` gate and brace ornamentation; `hliquid`/`the`/`surface`/`t_at`/`trapname` extend pre-existing edges, `sticks` (`engrave.js`, the C-locus `mondata.c` home per its D-1072 note) + `surface` (`sit.js`) new edges `imports.mjs --can` SAFE (hoisted functions), `dxdy_to_dist_descr`/`x_monnam`/`highc` join live edges, `TT_*`/`ARTICLE_*`/`SUPPRESS_*`/`ENL_GAMEOVERDEAD` join the live `const.js` edge; `game.killer.name` ≡ `svk.killer.name`); utrap block (`:5128`, C order before held, `*buf = highc(*buf)` via shared `highc`, overlay prefix like `you_are` lines, null-steedname falls back to `you_are` where C would print `(null)`); held block restructured to C shape (`heldmon` under `if (u.ustuck)`, `if (u.uswallow)` with C's assert cited, new `else if (u.ustuck)` `:5179`). `js/pager.js` — `self_lookat` utrap arm (`:404`, `trap_predicament(0, false)` = C `pager.c:131` args; joins the live `invent.js` edge, ALREADY per `imports.mjs --can`).
**Verify:** `node scripts/verify.mjs --fn one_characteristic` → PASS syntax (2 changed js files) · PASS rule2 · hidden `verify one_characteristic: 1 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS` (Knight-92002 → PASS; Caveman-92148 @245 and Monk-92013 @135 unchanged at the same step — no utrap/ustuck state on those turns so the new arms correctly no-op there; their first-differing rows name other writers, see Next) · PASS green 2/2 + strict ×2 · PASS cohort 7/7 · skip full (no shared file per the runner) · VERIFY: PASS. `node --test scripts/trap-predicament.test.mjs` → 6/6 pass (all four switch arms + bare-trapped + wizard braces, headless, /tmp probe kept out of the repo). Preflight `--no-cohort` green on the clean tree before edits.
**Named:** `self_lookat` steed arm (`y_monnam`, pre-existing deferral kept — own row on a falsifier); `status_core_lines` Riding/Levitation/Flying/Underwater/Glib/Fumbling blocks (pre-existing, not this row); `trap_predicament` itself has no remaining omission (both C callers wired).
**Next:** Caveman-92148 (encumbrance wizard weight `<-247>` vs `<-210>` → `inv_weight` writer) and Monk-92013 (amulet/fast → Fast-intrinsic writer) stay under `one_characteristic` for future writer rows via refill; then the queue in order (`[measure]` zap/teleport/m_move/distfleeck/worn rows, eat `losehp`, `list_genocided`).
