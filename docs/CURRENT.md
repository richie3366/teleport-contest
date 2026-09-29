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

Score last measured: **2026-09-29** — full `sessions` on the working tree
(audit **2042–2050**, `56c8b137b`, 2026-09-29T07:49Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`265+1.61/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-29)** | **13 / 44**, 6,882 / 11,265 pts, RNG **33.6 %**, rngSteps 87.4 %, screens **61.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `265+1.61/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 13/44, flat.
**Corpus fortress (07:56Z, 953/953, 0 unrec):**
**648 / 953** PASS (68.0 %), RNG 96.75 %, screens 90.7 %; 0 flips, +9; `full: true`.
Reviews 1225–2050 (index; no row 1618): 731 ACCEPT, 28 WITH-DEBT, 66 QUALITY-RISK (2042–50: 7A/0D/2Q).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2040 complex_dump trailing-space (sink voided).
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
Ledger @615518801: 5329 pinned-C functions — ported 787 · partial 238 · split 28 · by-design 316 · open 3960 (907 declared by seed). Measured: ok 3469, partial 658, thin 236, missing 966. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3091 (index).**
<!-- recent:begin -->
**D-3091** - `wiz_custom`: nethack-c/upstream/src/cmd.c:1951–1952 "wizcustom" IFBURIED|WIZMODECMD|NOF — - `wiz_custom`: new EXT_CMDS row — wiz:true, autocomplete:false, lazy `import('./wizcmds.js')` → wiz_custom() (D-2779 sibling pattern; dynamic import, no new static edge).
**D-3090** - `lose_weapon_skill`: nethack-c/upstream/src/weapon.c:1453–1473 (slots-first :1459–1461,  — - `lose_weapon_skill`: new sync export in C order — free-slots-first, record pop, P_SKILL-- via setter, slots_required-1 refund, panic ≡ loud throw (insert_branch precedent).
**D-3089** - `wiz_custom`: nethack-c/upstream/src/wizcmds.c:1934–1984 (wizard gate :1938, cache fill  — - `wiz_custom`: new async export in C order — sibling wizard gate, cache fill, raw-array win (create/start), verbatim heading, bufa (`#wizcustom: colorcount=N name|default`, `, active` with BSS-0 currentgraphics, `, hand
**D-3088** - `dump_enums`: nethack-c/upstream/src/earlyarg.c:706–801 (tables :624–703, loop :777–800) — - `dump_enums`: new file-local in C order — 11 `edmp` tables via exported `dump_enums_tables()` assembler (monsdump from live monsterNames slice(3) + 5 fenceposts with HIGH_PM≡NUMMONS-1 per permonst.h:22; objdump from li
**D-3087** - `doborn`: nethack-c/upstream/src/insight.c:3145–3176 (fmt :3147, header :3153, census lo — - `doborn`: new async export in C order — fmt closure (`%4i %4i %c %-30s` via padStart/padEnd), header, LOW_PM..NUMMONS census over game.mvitals (born/died/G_GONE skip, E/G/X/blank flag, pmname_neutral≡pmnames[NEUTRAL]),
**D-3086** - `cmdq_print`: nethack-c/upstream/src/cmd.c:220–249 (queue head :223, CQ header :225, KEY — - `cmdq_print`: new async export in C order — queue via cmdq_qname, CQ header, full 5-arm switch + default; KEY code from string-or-number node key into live key2txt (buf out-param≡GC); EXTCMD ec_entry ef_txt with wrappe
**D-3085** - `wiz_mon_diff`: nethack-c/upstream/src/wizcmds.c:1789–1828 (title :1792, mons walk :1804 — - `wiz_mon_diff`: new async export in C order — title const, NUMMONS-bounded walk with verbatim `!mlet` sentinel break (C's table carries the sentinel so the bound never fires first), live `mstrength` + `difficulty`, pos
**D-3084** - `mimic_hit_msg`: nethack-c/upstream/src/mon.c:5776–5793 (ap :5779, M_AP_TYPE switch :578 — - `mimic_hit_msg`: restarted whole in C order — `ap = mappearance` first (`:5779`), full 4-case M_AP_TYPE switch (`:5781–5792`, no-ops verbatim), otyp gate (`:5786`), `pline_mon(The(simple_typename(ap)), c_obj_colors[obj
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3091; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** Must-fix EXT_CMDS runners wiz_custom+wiz_kill (review 2049), then vision+wizmondiff (2045); then coverage.

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` (frozen history).

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
