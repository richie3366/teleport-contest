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
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-09-07** — full `sessions` at **D-2011**
(audit **973–981**, `eeef4216`). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`73+0.49/turn` (R² 0.75).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `57+0.37/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 973–981: 9 ACCEPT, 0 Must-fix (971's Must-fix shipped as D-2003, stamped).
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none — fortress 44/44.
Fortress report `docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (4 `ReferenceError` imports kill 8
sessions) then Open in order; every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `objnam.c` wishymatch — blocks 5/553 corpus sessions (first at step 65): C «@a human or elf or you (dwarven archeologist called wizard)» vs JS «@a human or elf (dwarven archeologist called wizard)». Probe: `node scripts/hidden-proxy.mjs verify wishymatch` (scen-genesis-Archeologist-92175, scen-genesis-Archeologist-92205, scen-tour-Archeologist-92023).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2013 (index).**
<!-- recent:begin -->
**D-2013** `pager.c` `do_screen_description` check_monsters '@' special case `:1346–1353` (`looked ?  — `js/pager.js` — `describe_looked` self branch appends `' or you'` iff `urace.mnum !== PM_HUMAN && !== PM_ELF && !Upolyd(u)` (C `:1352` gate verbatim; `u_at` is the branch condition, the '@' sym its existing hardcoded pre
**D-2012** `allmain.c:975–983` `interrupt_multi(const char *msg)` (`if (gm.multi > 0 && !travel && !r — `js/allmain.js` — `interrupt_multi(msg)` is now `async`: live `nomul(0)` (`./hack.js`, pre-existing import edge extended — hoisted function declaration, no new module, no TDZ) then `if (msg && game.flags?.verbose !== fal
**D-2011** `do.c:2318–2322` `danger_uprops` (`Stoned || Slimed || Strangled || Sick`, i.e. `u.uprops[ — `js/do.js` — `danger_uprops` checks flat `|0` OR `u.uprops[PROP].intrinsic` for STONED/SLIMED/STRANGLED/SICK (C `:2318–2322` cite; no H/E extrinsic — C checks intrinsic only); `STONED, SLIMED, STRANGLED, SICK` added to t
**D-2010** `artifact.c:907–974` `touch_artifact` (touch_blasted reset, NONART gate, yours/self_willed — `js/artifact.js` — full hero `touch_artifact` in exact C order (now `async`; `Role_if`/`Race_if` badclass; bane via same-file `spec_applies`; single-`if` blast gate preserving `||`/`&&` short-circuit so `rn2(4)` draws on
**D-2009** `lock.c` `doclose` (`/* when choosing a direction is impaired, use a turn regardless of wh — `js/lock.js` `doclose` — caller-local `confdir(false)` after successful `getdir` when `!u.dz` (covers self `.` too, as C does; `</>` skip via `dz`), then `if (HConfusion/Confusion/HStun/Stunned) res = true` in exact C po
**D-2008** `dungeon.c:1750–1788` (`surface` — `js/sit.js` — full `surface()` in exact C branch order: `SURFACE_AT` look-through on DRAWBRIDGE_UP via live `db_under_typ`, air-bubble waterlevel arm, pool bottom/`hliquid`, ice via the existing local `is_ice`, lava, `DR
**D-2007** `polyself.c:1030–1070` (`flags.verbose` block: `use_thec`/`monsterc` statics, `might_hide` — `js/polyself.js` — full tip block in exact C branch order (incl. hide+web combined arm, `u.umonnum == PM_GREMLIN`, `msound == MS_SHRIEK`, `is_vampshifter(game.youmonst)` on the monst struct per `apply.js` precedent, eel 
**D-2006** `dat/themerms.lua` themeroom_fills `Massacre` `:173–190`, `Statuary` `:192–200`, `Buried t — `js/mklev.js` — `themeroom_fill_massacre` (27-name pool in C order, initial `lua_random2(1,27)`, count as five `lua_random2(1,5)` per nhlib `d` not rnd.c `d()`, per-corpse `percent(10)` re-pick, corpses via live `l_creat
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2013; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
