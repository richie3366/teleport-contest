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

Score last measured: **2026-09-08** — full `sessions` on the working tree
(audit **1067–1073** over 3516098b…67985652, D-2098…D-2115 ports).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`60+0.48/turn` (R² 0.87).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `83+0.49/turn` (R² 0.79) |
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
Reviews 990–1026: 32 ACCEPT, 3 ACCEPT-WITH-DEBT (debts map-named), 2 QUALITY-RISK Must-fix all shipped (full record: reviews/ + DIVERGENCE-INDEX).
Reviews 1027–1033: 7 ACCEPT, 0 Must-fix.
Reviews 1034–1040: 7 ACCEPT, 0 Must-fix.
Reviews 1041–1049: 9 ACCEPT, 0 Must-fix.
Reviews 1050–1058: 8 ACCEPT, 1 QUALITY-RISK (1054 gold-block fall-through → Must-fix prepended, Next cluster set).
Reviews 1059–1066: 6 ACCEPT, 1 ACCEPT-WITH-DEBT (1066 demonpet appear-msg debt pointer), 1 QUALITY-RISK (1065 ensure_way_out rescan → Must-fix prepended, Next cluster set).
Reviews 1067–1073: 6 ACCEPT, 1 ACCEPT-WITH-DEBT (1070 XP-delta `(final||wizard)` gate debt pointer), 0 Must-fix.
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
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `dig.c` zap_dig — blocks 1/553 corpus sessions (first at step 20): C «The beam bounces off the stairs and hits the ceiling.--More-» vs JS «». Probe: `node scripts/hidden-proxy.mjs verify zap_dig` (scen-death-Wizard-92187).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2115 (index).**
<!-- recent:begin -->
**D-2115** `dig.c:1583–1612` — `js/dig.js` only, exact C order and guards (`On_stairs` called twice as in C): `Is_airlevel`/`Is_waterlevel` (pre-existing `const.js` edge) + `!(u.uinwater | 0)` (C `Underwater`; matches the `zap.c:3311` striking twin's 
**D-2114** `quest.c:451–470` prisoner_speaks + `quest_talk :495–511` MS_DJINNI arm — `js/quest.js` only — `prisoner_speaks` in exact C order: `mndx` compare for the `data` identity (JS `mtmp.data` is a value, not a pointer — `sounds.js:1132` pattern), `canseemon` (extends the existing `display.js` edge),
**D-2113** `were.c:18–38` — `js/were.js` only — `were_change` is now `async` and awaits `new_were` (C is fully sequential; the armor tail must settle before the `canseemon` read), then runs the howl block in exact C order: local `Deaf()` (youprop.h
**D-2112** `insight.c:1070–1071` — `js/invent.js` only — `const noeyes = !haseyes(game.youmonst?.data)` in exact C position.
**D-2111** `dothrow.c:68–71` `multishot_class_bonus` PM_NINJA arm — `js/weapon.js` only — `const PM_NINJA = monsterNames.indexOf('PM_NINJA')` beside the existing PM_PONY/SHADE/BALROG locals (pre-existing `monsters_data.js` edge, no new module, no TDZ) + the NINJA case in exact C position
**D-2110** `mhitu.c` `gulpmu` AD_BLND `:1471–1484` (`can_blnd(mtmp, &youmonst, mattk->aatyp, NULL)` → — `js/mhitu.js` only, no new imports (all helpers pre-existing or same-module locals — no new edge, no TDZ).
**D-2109** `weapon.c` `weapon_descr` `:90–142` (`skill = weapon_type(obj)`; `descr = P_NAME(skill)`;  — `js/invent.js` — full C switch in exact C order with the `makesingular` return; P_NONE specials via `objectNameStrs` (verified «corpse|tin|egg|statue|boulder|towel|tin opener» ≡ OBJ_NAME) / `obj.globby` / live `def_oc_sy
**D-2108** `pager.c` `look_at_monster` `:422–444` (`"tame "` + `distant_monnam(mtmp, ARTICLE_NONE, mo — `js/do_name.js` only — `distant_monnam_none` keeps the null→`it` guard and the astral conceal first (C order), then delegates to the live `x_monnam(mtmp, ARTICLE_NONE, null, 0, true)` (same module, no new edge, no TDZ).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2115; wrap `wildmiss` /
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
