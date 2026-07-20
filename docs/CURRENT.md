# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (when `iteration-count % 5 == 0`), run and
document a full public score before or as the handoff:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update **this Score section** with: pass count, screen/RNG aggregates, speed
label, PASS list, and notable non-PASS. Do not invent suite totals from a single
focused session.

Score last measured: **2026-07-20** — full `sessions` @**#1065** (42/44,
Scr **10198**/11405, RNG **93.02%**). Next cadence @**#1070**. #1066
D-0915: seed4500 **52643→52803** (Punished `goto_level` placebc).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,198 / 11,405** |
| Positional RNG calls matched | **737,530 / 792,838** (93.02%) |
| Speed label | `33+0.25/turn` (R² 0.82) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, **seed2600**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed4500 | 52967/108275 | 608/1814 | knight; @52643 shk/`onlineu` |

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact scored-output lengths.

## Primary objective

**Leaderboard 22-vs-38 gap** — local PASS includes seed0108 + seed0116 +
seed5006 + seed0398 + seed0373 + seed0361 + seed0367 + seed5002 +
seed0360 + seed0399 + seed0014 + **seed2600**; judge at 08:55Z dropped to
**22** after D-0480. **D-0483** reverts serialize coerce. Next cron;
if seed0013 restored but near-misses remain → upstream #5.

**Gameplay next:** **seed4500** @52803 — C `themerms.lua`/`nhlib`
  `rn2(5)` vs JS `rn2(1000)` (create_room / theme path after D-0915
  Punished `goto_level` `unplacebc`/`placebc`). Focused:
`node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

**Parked gameplay:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0915. Do not FORCE CLOSE/movement/umov.**
**Do not FORCE peace_minded / ualign / pet malign.**
**Do not FORCE shk satdoor/`onlineu` (hero-path first; D-0376).**
**Keep:** D-0915 goto_level unplacebc/placebc;
  D-0845/0853 dochug Hallu; D-0846 rloc_to newsym;
D-0848 `-DMAIL_STRUCTURES`; D-0852 gulpmu flush+vision_off;
D-0857 corner dismiss; D-0858 doattributes Hallu/Antimagic;
D-0861…D-0915 (searches_for_item … goto_level Punished placebc).
**Do not:** FORCE mfndpos omit (#1008); WEB-unique omit (#1004);
mon_track_clear alone (D-0860); stub poisoned rn2(30)-only (D-0869);
raw +N obj burns (D-0847); hliquid identity (D-0849); post-docrt
vision_recalc in goto_level (D-0851); omit LANDMINE selector (D-0874);
omit minetn-3 load_special (D-0875); omit watch_on_duty/has_town (D-0876);
omit dipfountain case 28 bath/somegold (D-0877);
omit chest_shatter Blind/`singular`/PAPER=5 (D-0878);
omit addinv known/bknown/rknown compare pline (D-0879);
omit yn_function `topl_wrap_echo` hard-wrap (D-0880);
omit `short_oname` on `#dip` fountain yn (D-0881);
reorder merged ID reconcile before coin `bknown=0` (D-0882);
call `find_ac` from delay-0 `armoroff` (D-0883);
leave steal ring `(on … hand)` / skip nymph `She stole` (D-0884);
pass `rloc(..., 0)` from seduce steal flee (D-0885);
pass `rloc(..., 0)` / skip await on dochug flee-teleport (D-0886);
omit rloc post-place appear/close-by (D-0886);
omit `could_seduce` in hitmm/missmm/hitmsg/missmu (D-0887);
capitalize-only cream pie splash (need `The(xname)` D-0888);
omit peaceful adj / frighten verb on safemon swap (D-0889);
omit launch_obj `tmp_at(DISP_FLASH)` / pline dirty `vision_recalc` (D-0890);
force `maketrap` HOLE `tseen=false` (need `unhideable_trap` D-0891);
omit `do_attack` `gu.unweapon` begin-bashing (D-0892);
force `setgemprobs` lev=0 when dlev set (D-0893);
skip town warn / dry fountain on first town `dryup` (D-0894);
skip Temple of the gods fill / discard themes `splev_align` (D-0895);
omit `bigrm-9` load_special (D-0896);
omit `BIND=` parsebindings / skip `setworn` in `ini_inv_use_obj` armor
(D-0897/D-0898); omit `#jump`/`dojump` / getpos_getvalid (D-0899);
omit `spitmm`…`hellfill`/`LVLINIT_MAZE` (D-0900…D-0906);
omit `set_occupation(learn)` / learn `makeknown` credit_hero (D-0907);
omit `SCR_PUNISHMENT` / `punish` / `placebc` (D-0908);
omit Punished `drag_ball`/`move_bc`/`cause_delay` (D-0909);
omit once-per-turn `regen_pw` / `rn1` Pw recover (D-0910);
re-zero `ox`/`oy` in `obj_extract_self` / stub ordinary rotten /
omit `HDeaf` TIMEOUT in `nh_timeout` (D-0911);
omit `#turn`/`doturn` chant+`exercise(A_WIS)`/`maybe_turn_mon_iter`
(D-0912);
leave `x` unbound / skip `setworn`-style twoweap clear on setuwep/swap
(D-0913);
stub `mk_knox_portal` place under wizard/debug after deferral `rn2(3)`
(D-0914);
omit `goto_level` Punished `unplacebc`/`placebc` (D-0915).

**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture, not `rng-diff` alone |
| seed2200 @158 | RC/`$HOME` harness path, not a port bug |

## Pointers (open only if needed)

| Need | File |
|------|------|
| Live hypothesis / don’t-recheck | `NOTES.md` |
| Divergence by ID | `DIVERGENCE-INDEX.md` → one `## D-NNNN` in `DIVERGENCE-LOG.md` |
| Subsystem omissions | `C-JS-MAP.md` index → one `c-js-map/*.md` |
| Latest loop crumbs | `AGENT-LOOP-JOURNAL.md` (tail only) |
| Score/objective history | `archive/PROGRESS-HISTORY.md` |

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
