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

Score last measured: **2026-09-30** — full `sessions` on the working tree
(audit **2114–2122**, `7fce929bc`, 2026-09-30T10:58Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`270+1.63/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-30)** | **13 / 44**, 6,882 / 11,265 pts, RNG **33.6 %**, rngSteps 87.4 %, screens **61.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `270+1.63/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best fork 35/44. Held-out 13/44, flat.
**Corpus fortress (11:04Z, 953/953, 0 unrec):**
**648 / 953** PASS (68.0 %), RNG 96.75 %, screens 90.7 %; 0 flips, +0; `full: true`.
Reviews 1225–2122 (index; no row 1618): 799 ACCEPT, 30 WITH-DEBT, 68 QUALITY-RISK (2114–2122: 9A).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued).
Audit iters (mandatory, 2026-09-28): full scoreboard update —
`hidden-proxy.mjs record --jobs 8` then unfiltered `hidden-proxy.mjs score
--jobs 8` (≈270 s), committed with `full: true` — + `leaderboard.mjs`.
`record` needs the C recorder (`bash nethack-c/build-recorder.sh`; Linux:
clang, bison, flex, ncompress); `.cache` recordings take ≈45 s to rebuild.

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

## Primary objective — BREADTH PHASE (opened 2026-09-18, Constitution §10.17)

**Port the game as completely as possible, one cluster per iteration** —
up to 10 whole C functions of one C file or caller/callee closure
(2026-09-28).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @e3edb2ef9: 5329 pinned-C functions — ported 1115 · partial 256 · split 68 · by-design 343 · open 3547 (903 declared by seed). Measured: ok 3592, partial 679, thin 251, missing 807. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
The work picker is **measured coverage + the ledger**, not the corpus: pop
`LOOP-QUEUE.md` Must-fix, then the first row of the generated **Open —
coverage** block (`docs/LEDGER.md`; the pop-time `brief.mjs` re-check
decides stale in ≤ 3 calls → `ledger.mjs set <fn> ported --note "stale: …"`).
Deliverable = for each function of the cluster, the **entire C body** in
C order — every arm, every callee live or named in the map, every C caller
wired (brief callers table) — **200–800 lines** of C-faithful JS for the
cluster (supervisor caps 1500 ins / 15 files). Grow the cluster from the
head row: its Open callees, then Open rows of the **same C file**. A
Must-fix ships alone. Subsystem restart (delete the thin JS function,
re-port from C) beats patching arms. Gates unchanged: syntax · Rule #2 ·
green + strict · cohort · full 44 when shared · **REACH-OK** per function
(corpus sessions that executed it still PASS — `verify.mjs --fn a,b,c`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier:** held-out (`leaderboard.mjs`) flat after ~30 breadth
iterations → human revisits the picker.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3165 (index).**
<!-- recent:begin -->
**D-3165** cmd.c:4342–4375 — ported the whole body in C order as exported async js/cmd.js dotherecmdmenu (getdir/here_cmd_menu/there_cmd_menu are async in JS): BSS-{0,0} clicklook_cc read via `| 0` (isok-false like C), unconditional getdir_click set
**D-3164** music.c:478–492 — added the sanctum arm in C order between the endgame and sokoban arms over the live `Is_sanctum` export (js/const.js:3294, `Lcheck(&sanctum_level)`); extended the existing `./const.js` import (no new module edge).
**D-3163** - `wornmask_to_armcat`: worn.c:218–246 — ported both whole in C order into js/worn.js next to their C neighbors (allunworn before wearmask_to_obj, wornmask_to_armcat before its inverse armcat_to_wornmask); added W_ARMOR to the existing const.js import (no new m
**D-3162** - `optfn_DECgraphics`: options.c:1393–1439 (BACKWARD_COMPAT on, optlist.h:15: do_set `:140 — ported all seven whole in C order over live string_for_opt/opt_atoi/allopt_name/set_optbuf CURRENTLY_SET (same module), clear_status_hilites/parse_status_hl1/count_status_hilites/config_error_add (botl.js edge, extended)
**D-3161** - `optfn_statushilites`: options.c:4012–4064 (STATUS_HILITES on, config.h:616: do_set `:40 — ported both whole in C order over live string_for_opt/bad_negation/wc2_supported/opt_atoi/config_error_add (same module) + imported reset_status_hilites (botl.js; pre-existing edge, imports.mjs ALREADY).
**D-3160** - `could_pole_mon`: apply.c:3391–3412 (hitm entry snapshot `:3395`, uwep/pole gate `:3397– — restarted `could_pole_mon` in C order (entry hitm, live `mdistu`, per-line C pins, C-shaped else); impaired now calls the gated display.js `Hallucination` youprop (D-1493; aliased — do_name.js squats the bare name and do
**D-3159** - `handler_pickup_burden`: options.c:6085–6111 (letters `:6091`, items `:6097–6101`, end_m — burden/runmode prompt rows now `{attr: ATR_INVERSE}` + `{text: ''}` (pickup.js query_objlist precedent, tty_end_menu `:2685–2689`); simple-menu cond arm sets [PFX_COND_IDX] on TRUE and returns OPTN_OK unconditionally (fu
**D-3158** - `lspo_mazewalk`: sp_lev.c:5769–5869 (mwdirs tables `:5771–5776`; triple `:5786–5789` vs  — ported both whole in C order, unpacked-args idiom (lspo_drawbridge/gold/region precedent). mazewalk: arguments.length dispatch (triple checkintegers + checkoption dir default random; table form get_table_xy_or_coord + ma
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3165; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** `cmd.c` dotherecmdmenu (head MISSING C23, EXT_CMDS entry added; getdir on pre-existing lock.js edge) + stale: u_init.c ini_inv_obj_substitution (u_init.js:813), bind_key_fn (:2071), all_options_autocomplete (options.js:11557).

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
