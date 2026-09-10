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
(audit **1214–1215**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `47+0.29/turn` (R² 0.79) |
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
Reviews 990–1082: 82 ACCEPT, 7 DEBT (map-named/pointed), 4 QUALITY-RISK all shipped/prepended (record: reviews/ + DIVERGENCE-INDEX).
Reviews 1089–1175: 84 ACCEPT, 0 Must-fix except 2 DEBT (1136 Hallucination import, 1137 save.js restore_waterlevel await) + 1 QUALITY-RISK prepended (1152 gloves literal).
Reviews 1176–1191: 16 ACCEPT, 0 Must-fix.
Reviews 1192–1197: 4 ACCEPT, 2 DEBT (1193 worn vision_recalc, 1197 disintegested lifecycle + genocide fire-and-forget), 0 Must-fix.
Reviews 1198–1205: 7 ACCEPT, 1 DEBT (1202 u_collide_m limbo target — C reassigns mtmp to the remaining occupant, JS limbos the original; near-dead path, one-line fix), 0 Must-fix.
Reviews 1206–1213: 8 ACCEPT, 0 Must-fix.
Reviews 1214–1215: 2 ACCEPT, 0 Must-fix.
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
**Next cluster:** `mcastu.c` choose_monster_spell — popped 2026-09-10 (`LOOP-QUEUE.md` Open head: spell-list picker thin vs C (`mcastu.c:88–123`); 4 sessions reach it in diverged-step traces (scoreboard f7aec9b3). Probe: `node scripts/brief.mjs choose_monster_spell`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2253 (index).**
<!-- recent:begin -->
**D-2253** `mcastu.c:88–123` (`choose_monster_spell`); `mcastu.c:909–985` (`spell_would_be_useless`,  — new `export function has_aggravatables(mon)` in wizard.js in C order: caster-vs-hero `In_W_tower` mismatch → false; fmon scan skipping dead and other-side monsters; `STRAT_WAITFORU || helpless` (you.h macro inlined as `m
**D-2252** `mcastu.c:988–1012` (`buzzmu`); `mthrowu.c:1396–1401` (`lined_up` → `m_lined_up`, sets `gt — `buzzmu` now follows the C body in order: `BZ_VALID_ADTYP` (const.js) silent miss → `mcan || m_seenres` → `cursetxt` + miss → `lined_up(mtmp) && rn2(3)` (short-circuit: no rn2(3) unless lined up) → `nomul(0)` → `canseemo
**D-2251** `uhitm.c:4782–4831` (`mhitm_adtyping` dispatch, reached from `mhitu.c:1191`); mhitu arms o — `js/mhitu.js` — `mhitm_ad_sgld_u` / `_curs_u` / `_dcay_u` / `_slim_u` / `_deth_u` in C branch/short-circuit order (DETH as the C switch with the 17–19 Antimagic fallthrough; SLIM negated-before-hitmsg like `dren_u`; DCAY
**D-2250** `potion.c:1563–1583` (`H2Opotion_dip` tail `(*func)(targobj)` after the glow pline + `last — `js/potion.js` — `await func(targobj)` with the C cite; new `export async function impact_arti_light(obj, worsen, seeit)` in C order (short-circuit gate so `obj_resists`' `rn2(100)` is drawn only when the BUC state can m
**D-2249** `sp_lev.c:2002–2123` (`create_monster` appear_as fixup: `:2002–2006` gate — `js/mklev.js` — new module-local `splev_create_monster_appear_fixup(mtmp, appear, appear_as)` (C staticfn shape: same-file caller only) in C branch/short-circuit order, called first inside `if (mtmp)` before the D-0873 f
**D-2248** `polyself.c:535–542` (`class = 0`, `name_to_mon`, `by_class: class = name_to_monclass(buf, — `js/polyself.js` — module-local `armor_to_dragon(atyp)` (C staticfn: same-file callers only, cf.
**D-2247** `uhitm.c:2742–2786` (`mhitm_ad_acid`: mhitu arm = `hitmsg`, then `!mcan && !rn2(3)` → `Aci — `js/mhitu.js` — new `mhitm_ad_acid_u` / `mhitm_ad_dren_u` / `mhitm_ad_conf_u` in C branch/short-circuit order (acid `| 0` int idiom on the resistance/mspec fields; dren negated-before-hitmsg like the sibling `_u` arms; c
**D-2246** `allmain.c:194–201` (`if (svc.context.bypasses) clear_bypasses();` then sanity `:197–198`, — `js/worn.js` — module-local `clear_bypass` (C staticfn: same-file caller only; Array-or-nobj walk + `Has_contents`/`cobj` recursion) + new `export function clear_bypasses()` in C order (fobj/invent/migrating_objs/`level.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2253; wrap `wildmiss` /
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
