# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
## 2026-09-16 — [measure] mon_adjust_speed glyph writer delivered (no js/)

Queue-head `[measure]` (Barbarian-92079 s62, recorded owner `mon_adjust_speed`, identical toplines, row-5 glyph diff): measured from the committed recorder RNG-tag log (no temp instrumentation needed — the log IS the per-turn dump) + JS prefix probes (`/tmp/probe-barb-id.mjs`, `/tmp/probe-barb-tail.mjs`, kept). C-62 ends mid-`nasty` at 161 draws (`rn2(100)=91 @ makemon:1447`); C-63 opens with `rnd(4)=1 @ nasty:695` (`mspec_used`) + `rn2(44)=35 @ pick_nasty` (same call's outer continuation, nasties[35]=orange-dragon); C-63 topline «You stop searching. Monsters appear from nowhere!»; JS-62 draws 395 = C-62 head verbatim + C-63 summon head, fmon 33→38 (ettin pick-1 malign-0 @(8,5) + dragon + storm-giant + owlbear + iron-golem). Writer: `makemon.c:1502–1504` `if (go.occupation) (void) dochugw(mtmp, FALSE)` — stops the searching hero mid-turn (MORE split) — vs JS `js/makemon.js:3490–3492` newsym-only (named omit :3503 + map data.md:485). Falsified, do not re-check: glyph-visibility theory (both sides `newsym` immediately; ettin H paints both sides), `nasty` break (C breaks inner on malign-0 correctly), `mon_adjust_speed` re-port (D-0871). -[x] archived; `makemon` dochugw writer Open row added; commit+push, no finish-iteration. Recorder tree untouched (zero PROBE strings; no rebuild needed).
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
