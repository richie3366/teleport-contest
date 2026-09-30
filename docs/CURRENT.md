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
(audit **2087–2095**, `4399b92c1`, 2026-09-30T00:15Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`263+1.64/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-29)** | **13 / 44**, 6,882 / 11,265 pts, RNG **33.6 %**, rngSteps 87.4 %, screens **61.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `263+1.64/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best fork 35/44. Held-out 13/44, flat.
**Corpus fortress (00:21Z, 953/953, 0 unrec):**
**648 / 953** PASS (68.0 %), RNG 96.75 %, screens 90.7 %; 0 flips, +0; `full: true`.
Reviews 1225–2095 (index; no row 1618): 774 ACCEPT, 29 WITH-DEBT, 67 QUALITY-RISK (2087–95: 8A/1D/0Q).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable).
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
Ledger @1edc89993: 5329 pinned-C functions — ported 981 · partial 251 · split 39 · by-design 333 · open 3725 (905 declared by seed). Measured: ok 3536, partial 666, thin 239, missing 888. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3138 (index).**
<!-- recent:begin -->
**D-3138** - `glyphrep`: nethack-c/upstream/src/glyphs.c:470–481 (no-cache debugger arm :474–475, nhU — ported both functions whole in C order into js/glyphs.js (C-order slot right after `glyphid_cache_status`, mirroring C :454/:458/:470); wired the options.js G_ arm through the existing glyphs.js import (same edge, one ad
**D-3137** - `clear_status_hilites`: botl.c:3351–3366 (free loop :3359–3362, zero pair :3363–3365). — `js/botl.js` — 6 new exports in C order with per-arm cites (stat pair after `exp_percent_changing` :2090; clear after `conditionbitmask2str` :3141; count after `linestr_countfield` :3462): `stat_cap_indx`/`stat_hunger_in
**D-3136** - `done2`: end.c:90–148 (abandon gate :94–96, cancel arm :98–117, wizard arm :120–144, don — `js/end.js` only — restarted `done2` in C order (In_tutorial + y_n abandon gate with || short-circuit; cancel arm with curs_on_u + two-if multi/nomul + invuln/sleep + schedule_goto abandon goto; wizard arm over the ynq()
**D-3135** - `mon_beside`: pickup.c:2072–2085 (3x3 i/j :2078–2084, nx/ny :2080–2081, isok+MON_AT :208 — `js/pickup.js` only — restarted `mon_beside` in C order (nx/ny + `isok && m_at`; MON_AT ≡ m_at per rm.h :515–516 live `#else`); `dotip`: verbose noun (:3592–3593), full spill chain + pool/lava tail + grease `consume_obj_
**D-3134** - `vconfig_error_add`: cfgfiles.c:1875–1890 (vlen :1877, buf[BIGBUFSZ] :1878, vsnprintf :1 — `js/cfgfiles.js` — new module-local `vconfig_error_add(fmt, args)` in C order after `config_error_done` (same relative order as C :1621/:1875); format via newly-exported `vpline_expand` (vraw_printf :8173 precedent, same
**D-3133** - `get_unpacked_coord`: sp_lev.c:1316–1334 (RANDOM arm :1321–1326 — `js/mklev.js` — new module-local `get_unpacked_coord(loc, defhumidity)` + `SP_COORD_IS_RANDOM` const in C order immediately before `get_location_coord` (same relative order as C :1316/:1336); C `c.x = c.y = -1` chain kep
**D-3132** - `should_query_disclose_option`: end.c:475–515 (`*defquery='n'` :482, strchr :483, idx :4 — `js/end.js` — restarted should_query_disclose_option in C order (async; two awaited impossible arms with C texts, `%s` for the category since JS impossible has no `%c`; bad-category returns ask with `'n'`); `await` at al
**D-3131** - `wiz_flip_level`: wizcmds.c:412–442 (prompts :414–415, caveat comment :417–424, `if (wiz — `js/wizcmds.js` — new `wiz_flip_level` in C order (`wizard` ≡ flags.debug per flag.h:30, `|| wizard` mirrors the WIZMODECMD dispatcher gate per wiz_level_tele; yn over "0123", 0 → rnd(3, true) else flip(n, true), docrt; 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3138; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** next coverage head (D-3138 shipped glyphrep+match_glyph).

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` (frozen history).

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
