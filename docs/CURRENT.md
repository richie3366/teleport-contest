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

Score last measured: **2026-09-08** — full `sessions` at **D-2079**
(audit **1041–1049**, `2d94d42e`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`65+0.38/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `63+0.43/turn` (R² 0.79) |
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
**Next cluster:** `detect.c` monster_detect — blocks 2/553 corpus sessions (first at step 51): C «You sense the presence of monsters. (For instructions type a» vs JS «You sense the presence of monsters.--More--». Probe: `node scripts/hidden-proxy.mjs verify monster_detect` (scen-normal-Priest-91108, scen-normal-Priest-92020).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2081 (index).**
<!-- recent:begin -->
**D-2081** `detect.c:842` `You("sense the presence of monsters.")`, then the one-shot else-arm `brows — `js/detect.js` — deleted the `flush_topl_more()` call and its import (no other user in this function); replaced the stale comment with the C cite (`detect.c:842` → `getpos.c:843–846`, two-space join at `js/display.js:738
**D-2080** `read.c:329–647` `doread` — `js/read.js` — `scroll.pickup_prev = 0` (eat.js/apply.js idiom, C `:359`); Blind gate ports C branch order verbatim (`Zblind` uses the same `u.Blind || u.ublind` idiom as the disappear block below; Dead exempt; novel/wor
**D-2079** `you.h:554` `#define Upolyd (u.umonnum != u.umonster)`; `polyself.c:200–268` `polyman` `:2 — `js/const.js` — `Upolyd(player)` is now `((player.umonnum | 0) !== (player.umonster | 0))` with the `you.h:554` cite (plus why-mtimedone-fails note).
**D-2078** `spell.c:1219–1380` `spelleffects_check` — `js/spell.js` — amulet arm ports C branch order verbatim (`(game.u?.uhave?.amulet || game.u?.uhave_amulet) && uen >= energy` — the eat.js/teleport.js dual-field idiom — → `You_feel` (already imported) + `rnd(2 * energy)`
**D-2077** `do_wear.c:1920–2008` `armoroff` — `js/do_wear.js` — `armor_doff_simple_name` now dispatches exactly the C arms: suit→`suit_simple_name`, shield→`shield_simple_name` (local, silver/smooth), helm→`hard_helmet(otmp) ? 'helm' : 'hat'` (same idiom as `armor_s
**D-2076** `wield.c:760–804` `can_twoweapon` — `js/wield.js` — both arms now print `${Yname2(otmp)}` (`Yname2` joins the existing `./objnam.js` import — same module edge as `xname`, no new cycle, no TDZ); suitability arm uses `is_plural(otmp)` for aren't/isn't-a whil
**D-2075** `uhitm.c:4388–4422` `mhitm_ad_stun` — `js/mhitu.js` — new `mhitm_ad_stun_u` (`hitmsg` always; `!(mtmp.mcan|0) && !rn2(4)` → `make_stunned(((game.u?.HStun|0) & TIMEOUT) + (mhm.damage|0), true)` (the :3264 gaze-arm idiom) + `mhm.damage = Math.trunc((mhm.damage
**D-2074** `uhitm.c:4570–4589` `mhitm_ad_samu` — `js/mhitm.js` — file-local `const AD_SAMU = 252` (monattk.h cite, file idiom) + export-list row; sync `mhitm_ad_samu` (mhitm arm: zero damage, no message); `mdamagem` `AD_SAMU` case (ad func → `mhitm_knockback` → `return
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2081; wrap `wildmiss` /
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
