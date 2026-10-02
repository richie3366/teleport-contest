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

Score last measured: **2026-10-02** — full `sessions` on `7bdcd631d`
(audit **2238–2246**, 2026-10-02T13:58:18.335Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`325+1.63/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-02 13:16Z; fetched 2026-10-02)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `325+1.63/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit.
**Corpus fortress (2026-10-02 14:04Z; scored 953/953 entries, 0 unrecorded):**
**704 / 953** PASS (73.9 %), RNG 97.98 %, screens 93.4 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-02T14:04:19.809Z`.
Reviews 1225–2246 (index; no row 1618): 892 ACCEPT, 45 WITH-DEBT, 84 QUALITY-RISK (2238–2246: 9 accept/0 debt/0Q; 0 Must-fix families).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued).
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
Ledger @be60a5eca: 5329 pinned-C functions — ported 1399 · partial 232 · split 113 · by-design 362 · open 3223 (844 declared by seed). Measured: ok 3714, partial 650, thin 234, missing 731. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3290 (index).**
<!-- recent:begin -->
**D-3290** - `swallow_to_glyph`: nethack-c/upstream/src/display.c:2437–2446 whole body — ported `swallow_to_glyph` whole in C order (module-local, C staticfn; `what_mon` same-file canonical; bad-loc arm keeps `l = S_sw_br` with the report as a `// C: impossible(...)` cite — impossible() is async in JS, t_war
**D-3289** - `u_on_rndspot`: nethack-c/upstream/src/dungeon.c:1605–1638 whole body, esp :1614 `if (wa — gate the tower branch on the canonical `On_W_tower_level(game.u?.uz)` (C :1614, short-circuit order kept); `| 0` the four tower-branch rect args like the sibling arms (C shorts; `place_lregion` `!lx` → whole level covers
**D-3288** - `discard_minvent`: mkobj.c:2524–2536 whole body, esp :2532–2533 artifact arm + :2534 obf — canonical restarted in C order: extract → `if (uncreate_artifacts && otmp.oartifact) artifact_exists(otmp, safe_oname(otmp), false, ONAME_NO_FLAGS)` → `obfree(otmp, null)` (uhitm.js:727 / shk.js delete_contents idioms); 
**D-3287** - `goto_level`: do.c:1695–1697 (discarded-level arm) + do.c:1731–1740 (portal-missing dist — VISITED arm in C position before mklev: `((info?.flags|0) & VISITED)` → `await impossible('goto_level: returning to discarded level?')` + clear (missing entry reads 0, like C's zeroed array slot).
**D-3286** - `m_carrying`: mthrowu.c:1405–1414, esp :1409 `(mtmp == &gy.youmonst) ? gi.invent : mtmp- — restarted the body with the hero arm first: `mon === game.youmonst || mon._youmonst` (uhitm.js:303 idiom) iterates the `game.invent` array (JS hero-invent representation, cf. hack.js carrying); monsters keep the `nobj` w
**D-3285** `makemon.c:1204–1212` ptr arm (`monsndx` + `mvflags & G_GENOD → return 0` + wizard G_EXTIN — restructured to C's `if (ptr)/else` with the veto `((game.mvitals?.[mndx0]?.mvflags ?? 0) & G_GENOD) !== 0 → return null` (clone_mon :4048 idiom; absent entry reads zero flags like C's array); debug_mongen disjunct via `
**D-3284** - `goto_level`: do.c:1501–1502 (dlevel clamp) + do.c:1504–1509 (endgame-entry arm) + do.c: — clamp after the entry captures (C order — up/dist/newdungeon read the unclamped level like C's declaration inits) via live `dunlev`/`dunlevs_in_dungeon`.
**D-3283** - `encumber_msg`: nethack-c/upstream/src/pickup.c:1977–2020 whole body (this iter wires :1 — canonical `stagger` (js/mhitm.js:1131) imported at all 4 sites — no new module edges (`imports.mjs --can`: ALREADY ×3; mhitm.js same-file), no third clone of potion.js stagger_poly. invent.js: both HVY arms → `stagger(ga
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3290; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** swallow_to_glyph + see_objects (display.c; queue was empty — hand-verified missing-arm refill this iter, head + same-file companion ship together).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
