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

Score last measured: **2026-10-20** — full `sessions` on `2cf72c412`
(audit **2973–2982**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-20 07:05Z)** | **35 / 44**, 10,849 / 11,265 pts, RNG **99.5 %**, rngSteps 99.0 %, screens **96.3 %** (+0 vs 2026-10-19 19:15Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-20 (audit 2973–2982 @`2cf72c412`): **668/789** before (655 at the last audit + 13 window flips claimed by D-4133..D-4142) → rescore **669/789** (active 668/742 scored, 668/739 excl. 3 env-only; RNG 99.51 %, screens 98.8 %), **0 PASS→FAIL** vs the committed board, 1 unclaimed FAIL→PASS (scen-shop-Samurai-49959626, was xkilled s748) → archive 11 PASS → **658/778** (`entries` 778, `unrecorded` 0); `tier` → 719 active + 45 reserve (0 out, 2 back); worst symset 34/68, questtour 8/11, zapfest 8/11, intrinsic 7/8, shop 20/22, chain 23/27, worldtour 87/99, options 34/47, sweep 179/207 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `87+0.36/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,547; leader 11,264 at 43/44).
32/44 at judge 01:35Z 2026-10-17 (+93 pts, screens 92.8→93.6 %,
RNG 93.5→96.9 %): the D-4042..D-4047 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–93.7 %
across 17 cohorts (Grow #5–19; previous 149/159 @51250000).
Fresh−held-out gap now 20.4 pts (93.1 % vs 72.7 %), outside the §10.20 band —
but Grow #18 already calibrated, so no step-5 family this grow.
**Corpus (Grow #19 `score --new` + `tier`, 2026-10-17, 916 rows):**
648 PASS (70.7 %); RNG 98.31 %, screens 97.4 %; 904 active + 239 reserve + 5247 archive.
Worst families `scen-hallu` 0/4, `scen-symset` 72/190, `scen-extcmd` 9/40,
`scen-questtour` 11/15, `scen-sweep` 148/267, `scen-worldtour` 71/156,
`scen-zapfest` 8/20, `scen-shop` 22/66, rest ≥ 96.9 % RNG.
Reviews 1225–2982 (index; no row 1618): 1564 ACCEPT, 80 WITH-DEBT, 113 QUALITY-RISK (2973–2982: 7A/3D/0Q, 0 Must-fix; debts unreached → ledger partial: docallcmd select_menu clone (Enter/Space no-pick, lootabc letters), flooreffects/dobuzz/use_pole replace the `game.bhitpos` object instead of writing fields, process_menu_window objsym slot fed only by display_pickinv).
Live debts: review index WITH-DEBT rows; 52
`scripts/*.test.mjs` fail on HEAD (stale after rewires; same set since D-3930).
Full rescore (audit only, §10.21): `record` + unfiltered `score` (active tier) + `archive` (+ quota), committed `full: true`; needs the C recorder.

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
< 6 rows): `fresh-cohort.mjs --seed <unused> --n 160 --fold` only (line in
Score; folds failing, scores new rows, tiers). No full rescore (§10.21).
While fresh − held-out > 20 pts,
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
Ledger @41c8375a3: 5329 pinned-C functions — ported 4554 · partial 117 · split 167 · by-design 387 · open 104 (577 declared by seed). Measured: ok 3923, partial 675, thin 248, missing 483. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4142 (index).**
<!-- recent:begin -->
**D-4142** zap.c bhitm `:160–…` notonhead `:185`; probe_monster `:625–640` (notonhead return `:628–62 — every `game._bhitpos` is now `game.bhitpos` (one slot, as in C).
**D-4141** cmd.c reset_commands `:3342–3476`: swap_yz from `num_pad_mode & 1` with `!num_pad` `:3383` — new `dirchar_sdir(ch)`: the key's index in `Cmd.dirchars` gives its sdir letter (move_funcs order; numpad_walk_dir under num_pad). isMovementKey, isRunKey (highc of a dirchar) and rushDirFromCtrl (C of a dirchar) use it,
**D-4140** cmd.c handler_rebind_keys_add `:2291–2405`: `char cmdstr[BUFSZ];` `:2356` (no initializer) — `REBIND_UNINIT_PREFIX` (`'\x7f'`, a byte no command name contains) stands for the leftover stack bytes, and both Strcat sites prepend it.
**D-4139** topten.c topten `:628–926`: `if (iflags.toptenwin) gt.toptenwin = create_nhwindow(NHW_TEXT — topten is async.
**D-4138** do_name.c docallcmd `:499–601`, select_menu `:551` + destroy_nhwindow `:556`, then the swi — dropped the `flush_screen(1)`; the comment now says why.
**D-4137** cmd.c parse `:5096–5151` sets `input_state = commandInp` `:5108` (and again `:5116` after  — get_count saves `input_state` and reads each key with `readchar()` after restoring it, tests `cmd_spkey(NHKF_ESC)`, and parse drops the compensating `otherInp` store (readchar_done does it, as in C).
**D-4136** read.c litroom `:2491–2650`: off arm `if (!Blind)` `:2529`; on arm blessed artifact lights — every site reads the live `Blind()`; the three locals and `Blind_read` are deleted.
**D-4135** wintty.c process_menu_window `:1329–1768`: `only_if_no_headers = (iflags.menuobjsyms & 4)  — new `pickinv_obj_glyphinfo(otmp)` (obj_glyph → map_glyphinfo(0, 0, …, 0), keeps ttychar + color).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4142; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix empty. The cliffs block is still all recorder/tooling parks (D-4016/D-4028/D-4104), so port slots take a near-pass row from the board (the D-4126 scan: RNG fully matched, 1 screen lost; read `cMsgOwners` and the step command for the writer). Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
