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

Score last measured: **2026-10-14** — full `sessions` on `2276f30eb`
(audit **2796–2802**, 2026-10-14T11:39Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`388+1.77/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-14 07:36Z)** | **32 / 44**, 9,920 / 11,265 pts, RNG **92.0 %**, rngSteps 95.8 %, screens **88.1 %** |
| **Fresh cohort (§10.20, scored on arrival)** | 50150000 ×159 @`3535ccd78`: **137/159 (86.2 %)**, RNG 97.1 %, screens 93.5 % — symset 0/12 worst |
| **Corpus board (worked, regression fortress)** | **2822 / 3233** @`2276f30eb` full, RNG 97.22 %, screens 95.68 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `388+1.77/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 5 (9,920; NoahBPeterson 11,264 at 43/44,
rohitgandikota 10,499 at 35/44, serteal 10,424 at 43/44, jon-bell 10,419
at 39/44). 32/44 at judge 07:36Z 2026-10-14: the D-3929..D-3935
window (quest-text D-3930, wield ECMD fix, 3 cliff writers) moved the
judge for the first time since 2026-10-11 — the §10.20 completeness
line scores where cliffs alone did not. **Three lines, read
together:** held-out (judge), fresh cohort (`fresh-cohort.mjs`, the local
generalization estimate), board (the fortress — it rises by
construction). Fresh history: 79–91.8 % across 5 cohorts (Grow #5–7: 140/158,
146/159, 137/159). Fresh−held-out gap now 13.5 pts (86.2 % vs
72.7 %), inside the §10.20 20-pt band — no calibration family this grow
(gap ≤ 20; Grow #6's `symset` wave-3 family now 16/172).
**Corpus (2026-10-14 11:37Z, `2276f30eb`, 3233/3233 entries, `full: true`):**
2822 PASS (+15 since the 2807 committed at HEAD — all scen-symset
cross-fn healing from the D-3950/3952/3953 window; 0 PASS→FAIL);
RNG 99307391/102151823 (97.22 %), screens 1824286/1906677
(95.68 %). Worst families `scen-symset` 46/172,
`scen-questtour` 51/62, `scen-sweep` 402/512, `scen-shop` 178/214,
`scen-worldtour` 328/401, `scen-zapfest` 67/73, `scen-options` 49/59;
rest ≥ 96 %.
`scen-sweep-Priest-582706` still FAIL@1166 (known recorder flake, D-3885 park
stands — unchanged since the Grow #6 re-record).
Reviews 1225–2802 (index; no row 1618): 1403 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2796–2802: 6A/1D/0Q, 0 Must-fix queued).
Live debts: `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; 52
unit tests in `scripts/*.test.mjs` fail on HEAD (stale after rewires —
same set before and after D-3930).
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈35 min for 2815), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

**PASS (44):** every session in `sessions/`.

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

## Primary objective — CALIBRATED PROXY, COMPLETE DATA (human, 2026-10-13, Constitution §10.20 on top of §10.18–19)

**Why:** held-out flat at 22/44 through ~45 cliff iterations while the
board rose 82 sessions; fresh cohorts pass 79–88 % on arrival against the
judge's 50 %; `quest.lua` role text was 176/368 complete (D-3930 closed it).

**Port slot:** Must-fix, else the **Open — cliffs** head — now ranked by
**screens lost summed over sessions** (the judge's unit; frequency ×
impact), unattributed sessions included one per row (deliverable: measure
at the printed step, name the writer, port it). Owner vs writer, whole C
function, every caller, `verify.mjs --fn` **movement + REACH-OK**: as
before. One cause healing several rows ships them together. A fix that
adds "the entry for role/variant X" ships the whole table instead.
**Grow slot:** every iteration with n % 10 == 5 (and any port slot with
< 6 rows): `fresh-cohort.mjs --seed <unused> --n 160 --fold` first (its
line goes in Score), then ≥ 240 more sessions weighted to the worst fresh
families, record, full rescore, commit. While fresh − held-out > 20 pts,
every second grow adds/reshapes a family (`HIDDEN-PROXY.md` §5c).
**Audit:** review + full rescore + held-out + fresh + board side by side.
**Completeness audit (§10.20; work these as cliffs surface them, whole):**
1. `dat/quest.lua` role tables — **done** (D-3930, generated).
2. `dat/symbols` — 14 symsets; JS hand-codes DECgraphics (+ partial
   IBM/curses). Extract or prove; a non-DEC `symset:` held-out rc breaks
   every map screen.
3. Level loaders — 126/126 scripts present; prove each whole (every
   `des.*`, every random branch) — a per-script `des.*` count diff tool
   is the cheap first step.
4. Message literals — `python3 scripts/c-literal-coverage.py`: 116 of
   4099 C message literals absent from `js/` (most env/error paths;
   gameplay: `dig.c` hole/bury ×10, `uhitm.c` ×6, `engrave.c`, `steal.c`).
5. Start regime — measured fine 2026-10-13 (68/68 probe: legacy on,
   tutorial prompt, default symset, interactive chargen; don't re-check).
**Falsifier:** ~30 iterations with fresh PASS rising and held-out flat →
revisit the generator families, not the port.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @2c11b48c7: 5329 pinned-C functions — ported 4553 · partial 112 · split 164 · by-design 388 · open 112 (597 declared by seed). Measured: ok 3919, partial 678, thin 240, missing 492. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head; a coverage row rides along only as a same-C-file companion;
growth is a supervisor slot (§10.19–20), never a ledger batch or a
self-filed row. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3954 (index).**
<!-- recent:begin -->
**D-3954** `muse.c` use_misc MUSE_BULLWHIP `:2549–2615` — add `freeinv` to the existing invent.js import (muse.js:44; `imports.mjs --can` ALREADY — no new edge), replace the call (muse.js:3271) with a C-cited comment, delete the freeinv_hero clone (sole caller was this arm; D-1
**D-3953** `cmd.c` rhack bad_command `:3833–3841` (Unknown pline, 2× cmdq_clear, sanity skip, move FA — `js/cmd.js` only — (1) the Unknown arm no longer clears forcefight (C verbatim); (2) the F-prefix gate reads call-local `prefix_seen?.txt === 'fight'` instead of the persistent forcefight (same-call F+k still errors via 
**D-3952** `options.c` doset_simple_menu `:8602–8620` (CompOpt/OthrOpt arm calls `(*allopt[k].optfn)( — both rows delegate to the live optfn via the sibling `doset_compopt_get_val` shape (C `:8612–8614` / `:9038–9040` call-for-call: `optfn(allopt_idx, get_val, FALSE, holder, EMPTY_OPTSTR)`).
**D-3951**  — 
**D-3950** `dat/symbols` RogueEpyx `S_coin: \x0f`; `options.c` optfn_symset `:4167–4201` loads it as  — `js/display.js`: new exported `live_showsyms(symidx)` — the C `assign_graphics` `:224–239` / `switch_symbols` `:257–260` expression (ov ? ov : carrier for the current set; carrier when loaded, else the showsyms copy = C-
**D-3949** `nethack-c/upstream/src/dothrow.c` hurtle_step `:834–839` (`dmg = rnd(2 + *range); losehp( — `js/dothrow.js` only — drain in C order inside the `if (why)` arm (dig.js falling-rock shape): after `losehp`, run the fatal done-gate first (`finish_losehp_done` via the existing lazy `./end.js` edge, return false only 
**D-3948** `do_wear.c` Helmet_on `:434–515` (helm switch + known tail — `js/do_wear.js` only — deleted both house `find_ac()` calls (normal-path tail + null arm, now a plain `return 0`); doc comment now cites `:434–515` + the D-0810 rule (uac refreshes at the allmain once-per-input find_ac; 
**D-3947** cmd.c commands_init `:2761–2772` (num_pad binds: h→help j→jump k→kick l→loot u→untrap N→na — js/cmd.js only — (1) classifiers num_pad-aware (NUMPAD_WALK digit→sdir map; M(digit)→run, M('5')→rush-prefix, '5'→run-prefix, '0'→Unknown); (2) F/g/G pre-checks restructured to C's tlist gate (bound-only via overlay-awar
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3954; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** randomize_gem_colors regen (Healer dobjsfree + Wiz hatch_egg throw-voids).
**This iter:** D-3954 (2 PASS + 2 moved, 44/44).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
