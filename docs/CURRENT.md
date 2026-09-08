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
**Next cluster:** `monmove.c` dochug — blocks 2/553 corpus sessions (first at step 59): C draws `rn2(5)=1` in dochug, JS `rn2(40)=11` from dochug(monmove.js:2154). Probe: `node scripts/hidden-proxy.mjs verify dochug` (scen-tour-Priest-92235, scen-tour-Wizard-92103).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2088 (index).**
<!-- recent:begin -->
**D-2088** `monmove.c:327–360` `disturb` — `js/monmove.js` — `wake_msg` joins the pre-existing `./mon.js` import (imports.mjs ALREADY, no new edge; hoisted function decl, call-time use only, no TDZ); `disturb` is now async and awaits `wake_msg(mtmp, !mtmp.mpeacef
**D-2087** `monst.h:270` `mon_resistancebits(mon)` = `data->mresists | mextrinsics | mintrinsics` + ` — `js/trap.js` `resists_elem` now ORs `mtmp.data.mresists` for monsters only — `is_youmonst` gate preserves hero behavior (C ignores species bits for the hero; hero resists ride intrinsics/extrinsics).
**D-2086** `muse.c:2654–2686` `rnd_misc_item` — `js/makemon.js` — file-local `See_invisible_misc()` (`youprop.h:152` cite; H||E+sticky flat, the muse.js:2147/trap.js/mhitm.js file idiom; `game` already imported, no new module edge, no TDZ risk) and case 1 is now `if (
**D-2085** `mon.c:1847–1910` `mpickstuff` — `js/monmove.js` — ported the missing C guards verbatim in C order (isshk+inhishop, then !mtame → in_rooms(SHOPBASE) → rn2(25), so the draw stays shop-gated by short-circuit; empty-string in_rooms is falsy like C `*p == 0
**D-2084** `objnam.c:4371–4397` `readobjnam_postparse1` corpse-type block — `js/readobjnam.js` — ported the full conditional verbatim in C position (ahead of the no-`of` scan; glob intercept above it stays map-named): guards via live `strstri`, `tin of` → spinach exact / `tin_variety_txt` offset
**D-2083** `potion.c:964–1011` `peffect_sickness` — `js/potion.js` — both calls gated on the local `Fixed_abil()` (`potion.js:1786`, C `youprop.h:385` cite) in verbatim C order (poisontell, then adjattrib); `poisontell` joins the pre-existing `./attrib.js` import (`import
**D-2082** `pickup.c:2972–3226` `use_container` — `js/pickup.js` — restored the 5-line C arm verbatim (`if (!obj.lknown) { obj.lknown = 1; if (held) update_inventory(); }`) ahead of the olocked check and corrected the comment to cite `:2992–2999` (Hmmm stays floor-only)
**D-2081** `detect.c:842` `You("sense the presence of monsters.")`, then the one-shot else-arm `brows — `js/detect.js` — deleted the `flush_topl_more()` call and its import (no other user in this function); replaced the stale comment with the C cite (`detect.c:842` → `getpos.c:843–846`, two-space join at `js/display.js:738
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2088; wrap `wildmiss` /
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
