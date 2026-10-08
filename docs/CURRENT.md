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

Score last measured: **2026-10-08** — full `sessions` on `fdb14c660`
(audit **2539–2545**, 2026-10-08T08:23:57.483Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`343+1.55/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-08 07:09Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `343+1.55/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,776; their RNG 61.0 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts 8,497→**8,498** (+1), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-08 07:09Z (through ~D-3665) — seventh cliff-phase movement (D-3662…D-3677).
**Corpus — picker and proxy (2026-10-08 08:29Z; 953/953 entries, 0 unrecorded):**
**911 / 953** PASS (95.6 %), RNG 99.99 %, screens 99.3 %; `full: true`. Worst families: `scen-options` 14/20, `scen-tutorial` 16/20, `scen-tour` 25/29, `scen-descend` 18/20, `scen-dig` 18/20, `scen-impaired` 18/20, `scen-kit` 17/18, `scen-engrave` 19/20. Audits record this line next to held-out: the board must rise **with** it. +7 since the last audit (904→911, all per-iteration — Wizard-94001 via D-3662→D-3663, Samurai-94239 via D-3664, Priest-92179 via D-3665, Rogue-92037 via D-3667, Barbarian-94356 + Tourist-94042 + Rogue-94216 via D-3668 — + 0 on the full rescore, which reproduced the working board exactly on the first run); 0 PASS→FAIL, 0 hangs.
Reviews 1225–2545 (index; no row 1618): 1156 ACCEPT, 57 WITH-DEBT, 107 QUALITY-RISK (2539–2545: 7A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only (none a C-wrong) — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; the 2026-10-06 list is archived in `docs/archive/PROGRESS-HISTORY.md`.
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

## Primary objective — CLIFF PHASE (human, 2026-10-06, Constitution §10.18; supersedes the §10.17 picker)

**Why:** `ledger.mjs batch` → 1 function, ledger counts frozen since
2026-10-04, held-out flat ~50 iterations spent on ledger-text "repairs",
re-audits and unreached campaign steps — while the corpus failed 212/953
in the held-out genre, every top owner tagged "do not re-enqueue"
(§10.18 has the numbers).

**Move the corpus cliffs, one per iteration, ranked by RNG lost** — the
generated **Open — cliffs** block in `LOOP-QUEUE.md` (committed board →
`hidden-proxy.mjs queue --write`). Per cliff: `hidden-proxy show <probe>`
→ owner vs **writer** → `brief.mjs` → the C function whole, every caller
wired → `verify.mjs --fn` with **movement** on the probe sessions (PASS or
strictly later step) **and** REACH-OK. NO MOVEMENT twice → measure C
(`geom-probe`, temp C dump) this iteration; it names the writer or parks
the owner (`[measure]` rows are live). Must-fix is strict (throw / hang /
PASS→FAIL / review C-wrong); ledger text is never a row. Audits: full
rescore, `leaderboard.mjs`, **corpus growth** (`scenario-gen.mjs`) when
the worst family is ≥ 85 % or the block holds < 6 owners.
**Falsifier (human):** ~20 cliff iterations with the board rising and
held-out flat → the corpus stopped predicting the judge again.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @3cb2f5ae2: 5329 pinned-C functions — ported 4538 · partial 117 · split 163 · by-design 396 · open 115 (615 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head, else (block empty) the coverage head / `ledger.mjs batch` when it
still names ≥ 5 functions. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3677 (index).**
<!-- recent:begin -->
**D-3677** nhlua.c nhl_text `:846–848` (end_menu + select_menu PICK_NONE + destroy_nhwindow) → tty_de — js/getpos.js — the tip teardown now branches on the recorded paint geom: missing geom or offx==0 → null the geom + `await docrt()` before the kept flush (same fullscreen cadence as select_menu_pick_none, D-1879: no clear
**D-3676** wintty.c `:13` (#define H2344_BROKEN — all five sites → game.iflags.menu_overlay with wintty.c:1924–1925/optlist.h:456 cites (D-3675/D-3669 data-home class, reverse direction: the writer was right, the readers were wrong).
**D-3675** include/optlist.h `:365–366` (NHOPTB hilite_pet → `&iflags.wc_hilite_pet`) + include/flag. — js/options.js only, 3 lines (D-3669 data-home class) — the DOSET row → `key: 'wc_hilite_pet'` + optlist.h:366/flag.h:508 cite; both after-change reads → `game.iflags.wc_hilite_pet`.
**D-3674** display.c reset_glyphmap `:2941–2946` (S_engrcorr + sym==corr/litcorr-sym → MG_BW_ENGR — js/display.js only — new engrcorr_map_attr(gid) beside the attr family (`:495`: banked-id check vs cmap_to_glyph(S_ENGRCORR), live game.gs.showsyms collision check per `:2942–2944`, use_inverse gate), OR-ed in show_glyph
**D-3673** display.c map_glyphinfo `:2594–2656` whole (re-read via `brief`: is_you ladder, hero `:263 — js/display.js only — (1) `:2653` arm in C order: seed symidx from the integer glyph id via the live glyphmap_symidx (valid banked ids only; NO_GLYPH/JS-only paints take no arm, as C never sees NO_GLYPH); hero arm keeps i
**D-3672** restore.c restgamestate — `js/save.js` only — deleted the force/save/restore triplet (3 lines) and rewrote the comment with the `:571`/`:596` order cite; role_init now runs with restored flags intact, matching C.
**D-3671** `dat/tut-1.lua:83–85` (`if (u.role == "Knight")` → knight-only `des.engraving` coord (12,1 — `js/mklev.js` only — role-gated placement in C .lua order (between the (5,2) and (2,4) sites, so prepend order matches C): `if (game.urole?.mnum === PM_KNIGHT) tut1_engr(12, 1, "Knights can jump with '" + tut_key('jump')
**D-3670** `display.c` newsym `:972–973` (`if ((ep = engr_at(x, y)) != 0) ep->erevealed = 1; /* even  — none — measurement names the writer.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3677; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** 94231 paniclog@151 fruit-row writer; 94151 PASS via regen (D-3676 latent).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
