# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
