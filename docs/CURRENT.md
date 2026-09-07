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

Score last measured: **2026-09-07** — full `sessions` at **D-2047**
(audit **1010–1017**, `d0c254aa`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`89+0.60/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `89+0.60/turn` (R² 0.78) |
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
Reviews 990–997: 7 ACCEPT, 1 ACCEPT-WITH-DEBT (991 readobjnam grey-spell/armour fixups → map-name debt, no Must-fix).
Reviews 998–1003: 5 ACCEPT, 1 ACCEPT-WITH-DEBT (998 use_container lknown pre-branch `:2985–2989` state debt, no Must-fix; 1000 notes D-2030 "nothing imports wizard.js" slip, harmless).
Reviews 1004–1009: 5 ACCEPT, 1 QUALITY-RISK (1006 → 3 Must-fix).
Reviews 1010–1017: 7 ACCEPT, 1 QUALITY-RISK (1014 → 1 Must-fix).
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
Pop `LOOP-QUEUE.md` Must-fix (3 rows — review 1006) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `uhitm.c` passive — blocks 3/553 corpus sessions (first at step 121): C draws `rn2(3)=1` in passive, JS `d(1,6)=5` from damageum(uhitm.js:1285). Probe: `node scripts/hidden-proxy.mjs verify passive` (scen-poly-Healer-92107, scen-poly-Rogue-92026, scen-wish-Wizard-92153).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2052 (index).**
<!-- recent:begin -->
**D-2052** (a) `uhitm.c find_roll_to_hit :375–380` (`+ maybe_polyd(youmonst.data->mlevel, u.ulevel)`) — `js/uhitm.js` — `find_roll_to_hit` adds `Upolyd(u) ? youmonst.data.mlevel : u.ulevel`; `abon` early-returns `adj_lev(youmonst.data)-3` when poly'd (`adj_lev` joins the existing `makemon.js` import — no new edge); all fiv
**D-2051** `hack.c losehp :4256–4292` (fatal arm: killer-name copy, `urgent_pline("You die...")`, `do — `js/artifact.js` — after the blast-arm losehp, `await finish_maybe_wail()` (no-op unless the low-HP flag was set; C runs maybe_wail inside losehp before returning) then `if (game._losehp_needs_done) { await finish_losehp
**D-2050** `polyself.c polymon :735–902` (entry `was_blind = !!Blind` :739, before `u.umonnum=mntmp;  — `js/polyself.js` — capture `wasBlind` at polymon entry with the C `Blind` predicate (same inline shape as `polyman`, incl.
**D-2049** `uhitm.c mhitm_ad_were :4264–4293` (full body read from the brief): three arms — `js/mhitu.js` — new `mhitm_ad_were_u(mtmp,mattk,mhm)` in the D-2043 `mhitm_ad_slow_u` shape: unconditional `await hitmsg(mtmp,mattk)` first (RNG-free both sides), then the exact C short-circuit (`!rn2(4) && ulycn==NON_PM
**D-2048** `invent.c addinv_core0 :1055–1148` (full body read from the brief): the `other_obj` reinse — `js/u_init.js` — deleted the merge-survivor fill hunk; left a two-line C comment (`merge paths goto added, bypassing :1128–1140 — no setuqwep here`).
**D-2047** `monmove.c m_search_items :1329–1450` (full body read from the brief) + caller `monmove.c: — `js/monmove.js` — `const shopSkip = in_rooms(omx, omy, SHOPBASE) && (rn2(25) || mtmp.isshk)` with C short-circuit order (rn2 draws only in shop) gating the whole scan as C's `goto finish_search` (falls through to the tai
**D-2046** `music.c do_play_instrument :759–899` (read whole body + apply.c:4383 caller) + `include/h — `js/music.js` — both `yn_function` defaults `'y'`→`'q'` with hack.h:1330 citation; `if/else-if` gate mirroring C `:763–773` (`can_blow(game.youmonst)` — same call shape as the sibling apply.js whistle arms D-1007; `thesi
**D-2045** `pager.c do_screen_description` check_monsters (looked: `sym == gs.showsyms[i + SYM_OFF_M] — `js/pager.js` — monster arm now: prefix `mon_glyph(mtmp).ch` (shown char, C encglyph; same source `look_all` uses); body `an(mlet_class_explain(mlet))` + ` (look)` with `first = look` unstripped (C didlook; empty-look gu
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2052; wrap `wildmiss` /
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
