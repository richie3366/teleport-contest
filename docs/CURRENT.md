# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS; the **Held-out** row from `node scripts/leaderboard.mjs`;
the corpus fortress from `hidden-proxy.mjs score` (PASS→FAIL = Must-fix
row naming the SHA). Do not invent suite totals from one focused session.

Score last measured: **2026-10-13** — full `sessions` on `6311ff904`
(audit **2765–2772**, 2026-10-13T09:20:39Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`350+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-13 07:43Z)** | **22 / 44**, 9,011 / 11,265 pts, RNG **51.7 %**, rngSteps 93.6 %, screens **80.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `349+1.58/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,011 vs lockwo 8,715; their RNG 88.2 % vs our 51.7 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,011** (±0), RNG **51.7 %** (±0), rngSteps 93.6 %, screens **80.0 %** (±0) at judge 2026-10-13 07:43Z — fresh judge signal, unchanged; through D-3912..D-3919's window the corpus went 1397/1449 → 1401/1449, RNG 98.40 % → 99.16 % (marathons 418/456 → 422/456); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-13 09:34Z, `6311ff904`; 1449/1449 entries, 0 unrecorded):**
**1401 / 1449** PASS, RNG 36110202/36417761 (**99.16 %**), screens 620586/630726 (98.4 %); `full: true`. Marathons 422/456. Worst families: `scen-sweep` 158/174 (RNG 97.2 %), `scen-worldtour` 118/134 (98.8 %), `scen-trek` 62/64 (99.5 %); rest 100 %. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2772 (index; no row 1618): 1375 ACCEPT, 61 WITH-DEBT, 111 QUALITY-RISK (2765–2772: 8A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows.
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈140 s for 1113), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

**PASS (44):** seed0002-healer-reflection-drummer, seed0004-feeding-pony,
seed0006-wizard-water-demon, seed0007-rogue-snake-swamp, seed0009-swimmer-mforce,
seed0012-monk-vault-escort, seed0013-friday13-save-then-fullmoon-restore,
seed0013-rogue-friday13-combat, seed0014-dequa-fountain-explore,
seed0015-valk-level2-pit-dog-wait, seed0016-healer-newmoon-eat-zap,
seed0017-samurai-altar-pray, seed0030-ten-diverse-deaths,
seed0060-orc-rogue-kick-search, seed0077-rogue-chargen,
seed0101-ranger-quiver-throw-travel-engrave, seed0102-ranger-name-cancel,
seed0103-knight-ride-pony, seed0104-knight-ride-combat,
seed0105-valk-chat-lamp-ration, seed0106-priest-extcmd-sweep,
seed0107-samurai-twoweapon-enhance, seed0108-wizard-extcmd-wishlist,
seed0116-wizard-wear-shop, seed0200-monk-north-search,
seed0360-wizard-world-tour, seed0361-archeologist-tour,
seed0367-priest-quest-tour, seed0373-barbarian-quest-tour,
seed0383-wizard-hallucinate, seed0398-wizard-wandpoly-pile,
seed0399-wizard-hallu-actions, seed0501-priest-cast-read-turn,
seed0700-samurai-explore-descend, seed0900-tourist-explore-actions,
seed1150-caveman-explore-move, seed1500-rogue-explore-move,
seed1800-tourist-eat-throw, seed2200-wizard-quaff-zap-read,
seed2600-wizard-custom-binds, seed4500-knight-coverage,
seed5002-wizard-coverage-pair, seed5006-tourist-stress-disaster,
seed8000-tourist-starter.

**Notable non-PASS:** none — 44/44.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective — CLIFF PHASE WITH MARATHONS (architect, 2026-10-09, Constitution §10.18 + §10.19)

**Why:** board 899 → 939/953 at 100 % RNG while held-out sat at 18/44,
RNG 41.7 % (rngSteps 92.4 %) ~80 iterations: held-out loses RNG to early
cliffs in long sessions; no `scen-*` session ran past 344 steps (§10.19).

**Move the corpus cliffs, one per iteration, ranked by RNG lost** — the
generated **Open — cliffs** block (committed board → `hidden-proxy.mjs
queue --write`), now led by marathons. Per cliff: `hidden-proxy show
<probe>` → owner vs **writer** → `brief.mjs` → the C function whole, every
caller wired → `verify.mjs --fn` with **movement** **and** REACH-OK. NO
MOVEMENT twice → measure C at the divergent step (`geom-probe <id> --step
N`, temp C dump). Must-fix is strict; ledger text is never a row.
**Growth:** no Must-fix and < 6 cliff rows → the slot runs as a supervisor
**grow** iteration (≥ 80 sessions, half marathon). Both blocks empty in a
port slot → journal and stop. Audits: review + full rescore +
`leaderboard.mjs` + `hidden-proxy families`.
**Falsifier:** ~20 cliff iterations with the long families' RNG % rising
and held-out RNG % flat → revisit the generator, not the port.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @aebed1065: 5329 pinned-C functions — ported 4540 · partial 113 · split 165 · by-design 396 · open 115 (605 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head; a coverage row rides along only as a same-C-file companion, and a
short cliffs block means growth (§10.19), never a ledger batch or a
self-filed row. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3919 (index).**
<!-- recent:begin -->
**D-3919** `can_reach_floor` nethack-c/upstream/src/engrave.c:187–213, ustuck-hugs term `:192–197` (` — wired the C term in C order (uswallow → ustuck-hugs → Levitation), mirroring the canonical's exact expression: `sticks` via the monmove.js re-export (house pattern; the binding is engrave's), `attacktype` live from monda
**D-3918** dothrow.c `hurtle` `:1078–1126` (`:1090–1093` `Punished && !carried(uball)` → tug + `nomul — js/dothrow.js only — guard is now `u.uball && u.uball.where !== OBJ_INVENT` (C `:1090` shape + macro cites in comment); doc reworded (omit shipped).
**D-3917** `quest.c artitouch` `:125–136` (qt_pager("gotit") `:133`) ← `invent.c` addinv_core1 questa — js/questpgr.js only (data): Arc gotit body verbatim from quest.lua (node byte-compare TEXT EQUAL + SYN EQUAL true incl. double space after «body!»; %o/%l conversions previously shipped) + QUEST_MSG_META `{output:'text', 
**D-3916** zap.c poly_obj `:1702–1989` (`:1903` replace_object unconditional for all locations; `:196 — js/mkobj.js only (callee): replace_object OBJ_MINVENT + OBJ_CONTAINED predecessor-splice arms in C shape (INVENT-arm house idiom), FREE no-op + exotic fallback documented. js/zap.js only (writer): poly_obj boulder sokoba
**D-3915** pray.c fix_worst_trouble TROUBLE_STRANGLED `:387–396` (`:393` message, `:394 Strangled = 0 — js/pray.js only — `if (u.uprops?.[STRANGLED]) u.uprops[STRANGLED].intrinsic = 0;` after the flat clears (C :394 cite + youprop.h:110 + sibling pattern), STRANGLED added to the existing const.js import (`imports.mjs --can
**D-3914** `quest.c artitouch` `:125–136` (qt_pager("gotit") `:133`) ← `invent.c` addinv questart arm — js/questpgr.js only (data): Rog gotit body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. double spaces after «out.»/«hands.»; %o/%n/%ls conversions previously shipped) + QUEST_MSG_META `{output:'text',
**D-3913** `quest.c on_locate` `:40–59` (first locate visit from above `qt_pager("locate_first")` `:5 — js/questpgr.js only (data): Cav locate_first body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. double space after «ground.» and empty blank line; `%x` conversion previously shipped) + QUEST_MSG_META `
**D-3912** zap.c backfire `:2604–2614` (`:2613` useupall unconditional after losehp); end.c done `:11 — js/zap.js only — after `finish_losehp_done()`, return only while `gameover` is still true; otherwise `useupall(otmp)` (live invent.js:5066 export, no new edge) with no wail drain (C else-arm never fires here); doc commen
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3919; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** next slot pops the regen'd cliffs head.
**This iter:** hug-held feel gate (587104 370-464).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
