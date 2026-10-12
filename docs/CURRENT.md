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

Score last measured: **2026-10-12** — full `sessions` on `c7e7d049e`
(audit **2710–2718**, 2026-10-12T00:45:13Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`353+1.61/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-11 19:39Z)** | **22 / 44**, 9,000 / 11,265 pts, RNG **51.6 %**, rngSteps 93.6 %, screens **79.9 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `353+1.61/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,000 vs lockwo 8,533; their RNG 84.3 % vs our 51.6 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,000** (±0), RNG **51.6 %** (±0pp), rngSteps 93.6 %, screens **79.9 %** at judge 2026-10-11 19:39Z — judge timestamp unchanged since the last audit (no new held-out signal); through D-3849..D-3857's window the corpus gained +9 (1149→1158; marathons 210→219/244); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-12 ~01:00Z, `c7e7d049e`; 1197/1197 entries, 0 unrecorded):**
**1158 / 1197** PASS, RNG 24808495/24895890 (**99.65 %**), screens 422159/426873 (98.9 %); `full: true`. Marathons 219/244. Worst families: `scen-sweep` 70/81 (RNG 97.3 %), `scen-worldtour` 69/81 (100.0 %), `scen-chain` 49/51 (100.0 %), `scen-tour` 28/29, `scen-trek` 31/31; rest 100 % RNG. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2718 (index; no row 1618): 1322 ACCEPT, 61 WITH-DEBT, 110 QUALITY-RISK (2710–2718: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @efa0e1eb6: 5329 pinned-C functions — ported 4537 · partial 116 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3859 (index).**
<!-- recent:begin -->
**D-3859** `potion.c:2214–2227` dip_ok (`:2223–2224` inaccessible_equipment → GETOBJ_EXCLUDE_INACCESS — js/potion.js only — `dippable_lets_raw(inacc)`/`dippable_lets(inacc)` skip `inacc(o, false)` (C `:2223–2224`); `dip_hands_ok(obj, inacc)` threads it (C `:2236`); `getobj_dip` dynamic-imports the live `equipment_is_inacce
**D-3858** potion.c make_stunned `:107–131` (`:111–112` guard), make_confused `:89–104` (`:93–94`), m — js/potion.js only — 3× `if (Unaware()) talk = false;` with C-line cites, using the live eat.js export already imported at :187 (no new edge; make_deaf/make_hallucinated/make_blinded already use it) + make_sick doc correc
**D-3857** attrib.c poisoned `:362–383` — js/attrib.js only — after losehp in the i==0 arm, `await finish_maybe_wail()` (C-order drain; dynamic `./hack.js` import already used twice in this function, no new edge) + `if (game.program_state?.gameover) return` (C n
**D-3856** hack.c findtravelpath `:1266–1523` — js/cmd.js only — deleted the JS-only zeroing block in dotravel_target (the `found:` exits stay in the callees) + corrected the three comments (continue_run, dotravel_target ×2); corrected the same wrong claim in scripts/
**D-3855** quest.c chat_with_leader Rule 5 `:318–353` ← leader_speaks `:390` ← quest_talk `:498` ← mo — `js/questpgr.js` only (data): two bodies verbatim from quest.lua (`cat -A`-verified; %p/%pC/%a/%n conversions previously shipped, exercised in these same tables by Arc/Pri) + META output/synopsis (lua HAS both keys here,
**D-3854** `sp_lev.c` create_monster `:1925+` — js/mklev.js only (3 hunks): unconditional `makemon(pm, …)` with the null pm, C-cited; the existing `mtmp.female = 0` clobber already matches C :2125/:3230.
**D-3853** `quest.c on_start` home-revisit `qt_pager("nexttime")` ← `onquest` ← `goto_level` do.c:189 — `js/questpgr.js` only (data): two bodies verbatim from quest.lua (`cat -A`-verified; %H/%l conversions previously shipped, exercised in this same table by Arc/Bar) + table doc role lists; `js/quest.js` header role list.
**D-3852** `fountain.c` drinkfountain case 21 (Poisonous) `:299–309` — js/fountain.js only.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3859; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** audit 2710–2718 (D-3849..D-3857 window): 9 ACCEPT, 0 Must-fix; full rescore 1158/1197 (+9, 0 regressions); held-out 22/44 (judge stale, no new signal).
**Next:** cliffs-head getobj (3 dip prompts) → writer potion.c dip_ok :2223 inacc arm: C EXCLUDE_INACCESS drops the glove-covered ring (k/r/w), JS dippable_lets lists all non-coin.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
