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

Score last measured: **2026-10-11** — full `sessions` on `53add89a1`
(audit **2695–2702**, 2026-10-11T16:45:45Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`355+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-11 13:14Z)** | **21 / 44**, 8,956 / 11,265 pts, RNG **51.6 %**, rngSteps 93.5 %, screens **79.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `355+1.57/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,956 vs lockwo 8,533; their RNG 84.3 % vs our 51.6 %: our loss is early cliffs in long sessions). 21/44 held, pts **8,956** (±0), RNG **51.6 %** (±0pp), rngSteps 93.5 %, screens **79.5 %** at judge 2026-10-11 13:14Z — flat through D-3832..D-3839's window while the corpus gained +5 (1142→1147; marathons 203→208/244); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-11 ~16:55Z, `53add89a1`; 1197/1197 entries, 0 unrecorded):**
**1147 / 1197** PASS, RNG 24544940/24895890 (**98.59 %**), screens 415203/426873 (97.3 %); `full: true`. Marathons 208/244. Worst families: `scen-sweep` 64/81 (RNG 93.6 %), `scen-worldtour` 65/81 (97.5 %), `scen-chain` 48/51 (99.4 %), `scen-trek` 31/31 (100 %), `scen-tour` 28/29; rest 100 % RNG. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2702 (index; no row 1618): 1306 ACCEPT, 61 WITH-DEBT, 110 QUALITY-RISK (2695–2702: 6A/1D/1Q, 1 Must-fix queued).
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
Ledger @13d2e0f03: 5329 pinned-C functions — ported 4537 · partial 116 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3847 (index).**
<!-- recent:begin -->
**D-3847** zap.c dobuzz `:4829–5024` — js/zap.js only — bounce check + bchance re-read `game.level?.at?.(sx, sy)?.typ` (C-live semantics, cited); the dup absorb block deleted (zap_over_floor owns message + rangemod; its see_it/vibrations gate already matches 
**D-3846** mhitu.c `:1517–1531` gulpmu AD_FIRE arm (`Fire_resistance` → shieldeff + «mildly hot.» + s — js/mhitu.js only — the four locals now OR flats with their uprops slot (teleport.js Fire_resistance / trap.js lava_effects idiom); Slow_digestion likewise (RIN_SLOW_DIGESTION oc_oprop=54=SLOW_DIGESTION per generated tabl
**D-3845** monmove.c vamp_shift `:2377–2394` (sole caller postmov :1496); the `:2391` display_nhwindo — ported the NHW_MESSAGE arm whole as display_nhwindow_message (display.js): NEED_MORE (no STOP check — C's arm has none) → remember_topl (C keeps gt.toplines through more+clear, remembered by the next message; JS more/cle
**D-3844** display.c:81–85 (gbuf buffered paint), :634–663 (display_warning), :2208+ (flush_screen);  — none (park confirmation).
**D-3843** monmove.c:1472–1553 (postmov vampshift hack — none (parked).
**D-3842** `invent.c:4221–4238` (look_here dfeature article gate: article=0 only for "molten lava"/"i — js/invent.js only — gate restored C-verbatim (`'iron bars'` exact + first-space indexOf/slice toLowerCase `=== ' ice'`); an()/vtense() already live and C-exact for this string (an → "a set of iron bars"; vtense "are" → "
**D-3841** zap.c dobuzz hero-hit gate `:4962–4982` (zap_hit → Reflecting → reflect/zhitu); `include/y — js/zap.js only — Reflecting() is now the verbatim C macro (uprops[REFLECTING] intrinsic||extrinsic); deleted the 5 consts used only by the stand-ins (SHIELD/AMULET_OF_REFLECTION, SILVER_DRAGON_SCALES/SCALE_MAIL, PM_SILVE
**D-3840** `hack.c:1037–1048` (obstructed else-if chain: tunnels-match still_chewing FALSE falls out  — guard the arm with `!(chewDat && tunnels(chewDat) && !needspick(chewDat))` (chewDat = game.youmonst?.data; tunnels/needspick already imported; idiom matches travel_test_move js/cmd.js:3798/3841).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3847; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** cliffs-head `do.c` flooreffects Healer-578136 s632 → park CONFIRMED (2nd no-js): JS-633 prints the held flow (canseemon lead closed); sole delta one-step map-flush lag, architectural (D-3844).
**Next:** distfleeck-head Healer-578216 s668 → writer dobuzz (JS stale SDOOR typ bounces where C's live DOOR stops; dup door-absorb shim double-prints); this slot ports the live-typ bounce test + deletes the shim.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
