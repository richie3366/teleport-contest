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

Score last measured: **2026-09-10** — full `sessions` on the working tree
(audit **1216–1224**, HEAD `a74f318a`).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`48+0.30/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.30/turn` (R² 0.79) |
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
Reviews 990–1215: ACCEPT/DEBT record in INDEX; Must-fix from those bands shipped.
Reviews 1216–1224: 8 ACCEPT, 1 QUALITY-RISK (1217 mhitu `mons[PM_*]` identity — Must-fix D-2259).
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

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `uhitm.c` mhitm_ad_curs/dcay/deth mhitm (mon→mon) arms — `mdamagem` has no AD_CURS/AD_DCAY/AD_DETH case. Probe: `node scripts/brief.mjs mhitm_ad_curs`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2259 (index).**
<!-- recent:begin -->
**D-2259** `uhitm.c:3038–3041` (`mhitm_ad_curs` mhitu: `!night() && pa == &mons[PM_GREMLIN]`); `uhitm — those five gates now use `(data?.mndx | 0) === PM_*` like `hates_light` / `is_wooden`.
**D-2258** `trap.c:2292–2320` (`trapeffect_magic_trap`); `trap.c:3101–3168` (`steedintrap`); `trap.c: — `trapeffect_magic_trap` now follows the C body: explosion returns before steed; else `domagictrap` then `steedintrap(trap, null)`.
**D-2257** `mthrowu.c:1375–1393` (`m_lined_up`); `mthrowu.c:1396–1401` (`lined_up`); `mthrowu.c:260–3 — `m_lined_up` now uses mux/muy `| 0` with no hero-ux fallback, and the C `utarget && Upolyd && rn2(25) && (uundetected || unusual AP)` chain (`M_AP_TYPE(you)` is `U_AP_TYPE`).
**D-2256** `sp_lev.c:2981–3018` (`splev_initlev`); `sp_lev.c:3834–3875` (`lspo_level_init`); `sp_lev. — new `lspo_level_init(tbl)`, which sets `splev_init_present = true`.
**D-2255** `bones.c:629–756` (`getbones`); `bones.c:50–193` (`resetobjs` restore arm); `bones.c` `san — `export async function getbones()` in bones.js in C order.
**D-2254** `mon.c:4871–4938` (`decide_to_shapeshift`); `mon.c:4940–4979` (`pickvampshape`); `mon.c:11 — `pickvampshape` now is the C `switch (mndx)` with FALLTHROUGH: `PM_VLAD` → `if (mon_has_special(mon)) break;` → `wolfchance = 3` → `PM_VAMPIRE_LEADER` wolf arm (`!rn2(wolfchance) && !uppercase_only && !is_pool_or_lava` →
**D-2253** `mcastu.c:88–123` (`choose_monster_spell`); `mcastu.c:909–985` (`spell_would_be_useless`,  — new `export function has_aggravatables(mon)` in wizard.js in C order: caster-vs-hero `In_W_tower` mismatch → false; fmon scan skipping dead and other-side monsters; `STRAT_WAITFORU || helpless` (you.h macro inlined as `m
**D-2252** `mcastu.c:988–1012` (`buzzmu`); `mthrowu.c:1396–1401` (`lined_up` → `m_lined_up`, sets `gt — `buzzmu` now follows the C body in order: `BZ_VALID_ADTYP` (const.js) silent miss → `mcan || m_seenres` → `cursetxt` + miss → `lined_up(mtmp) && rn2(3)` (short-circuit: no rn2(3) unless lined up) → `nomul(0)` → `canseemo
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2259; wrap `wildmiss` /
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
