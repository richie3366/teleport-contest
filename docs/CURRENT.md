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

Score last measured: **2026-10-09** — full `sessions` on `42475f4c8`
(audit **2591–2599**, 2026-10-09T06:24:55.998Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`353+1.57/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-09 02:13Z, ours 01:46Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `353+1.57/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-09 02:13Z (ours scored 01:46Z: post-D-3711).
**Corpus — picker and proxy (2026-10-09 ~08:00Z, `2abecd585`; 1113/1113 entries, 0 unrecorded):**
**989 / 1113** PASS (976/1100 excluding 13 env:config-path), RNG 18159238/20447784 (**88.81 %**), screens 310892/347120 (89.6 %); `full: true`. +160 marathon sessions (§10.19): 50 PASS, cohort RNG 74.7 %. Worst families (`hidden-proxy families`): `scen-worldtour` 6/50 (RNG 64.1 %), `scen-sweep` 12/50 (71.9 %), `scen-chain` 16/40 (79.3 %), `scen-trek` 16/20 (93.9 %); every older family 100 % RNG. 0 PASS→FAIL on the 953 older rows. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2599 (index; no row 1618): 1208 ACCEPT, 57 WITH-DEBT, 109 QUALITY-RISK (2591–2599: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @326c32ee2: 5329 pinned-C functions — ported 4541 · partial 114 · split 163 · by-design 396 · open 115 (612 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3731 (index).**
<!-- recent:begin -->
**D-3731** `win/tty/topl.c` tty_yn_function `:420,425` (both resp/non-resp arms: `custompline(OVERRID — js/display.js: new exported `vpline_flush_vision()` (exact vpline `:266–271` statements + in_pline guard); pline_after_consume's inline block replaced by the call (pure extraction, hot path unchanged); js/getline.js: imp
**D-3730** display.h covers_objects `:218–220` (`(is_pool(xx, yy) && !Underwater) || LAVAPOOL || LAVA — js/apply.js only — the gate reads the live bit via the file's own `Underwater_hero()` (:1803 — `!!(game.u?.uinwater | 0)`, D-3400 idiom) with C cites (`:218–220` + youprop.h:279); no new edge, no import (in-file helper; 
**D-3729** dothrow.c throwit `:1510–1849`, gate `:1793` (`if (!Deaf && !Underwater)`); Underwater ≡ y — js/dothrow.js only — the gate reads `!(u.uinwater | 0)` with C cites (`:1793` + youprop.h:279); D-3400 idiom, no new edge, no import (u = game.u already :2305).
**D-3728** music.c do_play_instrument `:759–899`, gate `:765` (`if (Underwater)`); Underwater ≡ youpr — js/music.js only — the gate reads `(u?.uinwater | 0)` with C cites (`:765` + youprop.h:279); D-3400 idiom, no new edge, no import (u = game.u already :901).
**D-3727** do.c flooreffects `:162–359`, is_pool arm `:271–287`, gate `:277` (`if (!Underwater)`); Un — js/do.js only — the gate reads `!(game.u?.uinwater | 0)` with C cites (`:277` + youprop.h:279); D-3400 idiom, no new edge, no import (game already imported :12).
**D-3726** display.h covers_objects `:218–220` (`(is_pool(xx, yy) && !Underwater) || LAVAPOOL || LAVA — js/display.js only — the pool arm calls the live `is_pool(x, y)` (already imported from hack.js :16; no new edge) and reads `(game.u?.uinwater | 0)` with C cites (`:218–220` + youprop.h:279 + dbridge.c:46); D-3400 idiom,
**D-3725** invent.c display_binventory `:5488–5546`, gate `:5501` (`is_pool_or_lava(x, y) && !Underwa — js/invent.js only — the gate reads `(game.u?.uinwater | 0)` with C cites (`:5501` + youprop.h:279); D-3400 idiom, no new edge, no import (game already imported :49).
**D-3724** steed.c dismount_steed `:575–822`, gate `:726` (`if (!Underwater)`); Underwater ≡ youprop. — js/steed.js only — the gate reads `(u.uinwater | 0)` with C cites (`:726` + youprop.h:279); D-3400 idiom, same expression as the use_saddle gate :281 and the can_ride disjunct :211, no new edge, no import.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3731; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs-head yn_function writer `topl.c` tty_yn_function (prompt custompline→vpline vision-flush missing; 8 scen-chain, probe Ranger-95437@41), then randomize_gem_colors (`scen-chain` next-game init), touch_artifact (`d(2,4)` vs `d(4,4)`), level_tele (quest «A voice booms out»). Pole lava arm (D-3730 Next): unreached, dropped.
**This iter:** architect take §10.19 — marathon families, 160-session cohort, rescore 989/1113 (`2abecd585`), supervisor grow mode, rules/prompts/docs.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
