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

Score last measured: **2026-07-21** — full `sessions` @**#1130** (42/44,
Scr **10531**/11405, RNG **99.90%**). Next cadence @**#1135**.
vs @#1125: Scr **10529→10531**, RNG **791421→792061** (#1129–#1130;
seed4500 **107335→107498** Scr **941**).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **10,531 / 11,405** |
| Positional RNG calls matched | **792,061 / 792,838** (99.90%) |
| Speed label | `30+0.25/turn` (R² 0.867) |
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
| seed4500 | 107498/108275 | 941/1814 | knight; @**107470** `mhitm_ad_legs` C `rn2(2)` vs JS `rn2(3)` |

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

**Gameplay next:** **seed4500** @**107470** (D-0928). Symptom
C `mhitm_ad_legs` `rn2(2)` vs JS `rn2(3)` after matched fleeck/
`mattacku`/`hitmu`. #1130 fixed vamp fog→fog `dochng` (mons()
fresh-object `!==`); prefix **107304→107470**.
Focused:
`node scripts/rng-diff.mjs sessions/seed4500-knight-coverage.session.json`

**Parked gameplay:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0928. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927 (Hallu dochug … F-prefix reject);
D-0928 #1119 S_BAT Inhell MFAST; #1120 tactics + fire destroy_items;
#1121 set_uasmon MR_* + getmattk lich cold; #1122 AT_MAGC castmu;
#1123 castmu PSI_BOLT mdamageu/rehumanize; #1124 dowear
verysmall/nohands; #1127 pickup multi/!pickup/notake gate;
#1128 STRAT_APPEARMSG + mnexto rloc_to_flag / RLOC bits;
#1129 nasty + SUMMON_MONS; #1130 vamp dochng/newcham mndx.
**Do not:** FORCE mfndpos/WEB-unique omit; mon_track_clear alone;
stub poisoned rn2(30)-only; raw +N burns; hliquid; post-docrt
vision_recalc; omit LANDMINE…touchfood addinv_nomerge (D-0874…
D-0923); re-add invent[] splice (D-0924); omit breamm/AT_BREA /
fire-pool (D-0925); omit mhitm_ad_blnd (D-0926); silent F-prefix
(D-0927); FORCE linedup/flip coords (D-0928 #1092); omit I-glyph
rush / xkilled dobuzz / “fix” gethungry pray / Count:N `.` /
annotation·hitmu·wiz Blind / peffect_extra_healing / FORCE abuse /
omit caitiff·water_damage·goodpos u_at·polyself·nolimbs·passiveum·
u_rooted·eel hide·mfndpos nexttry·Blind FROMFORM·minliquid monflee·
cham while over-retry·ok_to_throw·mtimedone (#1093–#1112); ship
inediate `is_edible` FOOD reject or chase getlev/`^V` / invent-food
provenance as @103155 root (#1113–#1114 — More desync); omit
`mfind0` / leave `#wizwhere` unwired (#1115); omit break_armor
nohands shed (#1116); treat @104241 as umov Fast surplus root —
was missing `carrying_too_much` (#1117); FORCE bat@46 +12 movement
or treat @104705 as distfleeck/want_move rn2(4) (#1118 — early EOT
shapeshift). Rejected:
@95154 wish; @100699 namedesc; @101378 ston; @101391/@101608/@101616
fleeck≠wish/eel; @101641≠`#version`; @101710≠m_search;
@103071≠2nd cham; @103155 throw≠fleeck; @103155 getlev≠root;
@103155 invent/floor apples≠C-missing (both have them);
@104217≠exercise modulus (was missing mfind0 / wizwhere pager);
@104241≠Very_fast / FORCE VF/umov0 / shed≠capacity root /
u_calc umov delta (C dump after=12 too);
@104705≠distfleeck/want_move rn2(4) (early decide_to_shapeshift);
@104705≠fmon-order alone — was missing S_BAT Inhell MFAST (#1119);
@106304≠fleeck/lined_up root — was missing covetous `tactics` +
fire-trap `destroy_items` (#1120);
@106531≠wrong hitmu dice table — was missing poly `COLD_RES`
FROMFORM + `getmattk` lich cold→PHYS (#1121);
@106536≠choose_monster_spell bound — was missing `mattacku`
AT_MAGC→`castmu` (#1122);
@106540≠courage/distfleeck alone — PSI_BOLT must `mdamageu`/
`rehumanize`; JS Unchanging wear was missing `dowear`
verysmall/nohands (#1123–#1124);
@106838≠literal `rn2(32)` / mfndpos-only — keystream/`k` vs `l`;
C also double-pickup; root was STRAT_APPEARMSG + mnexto msgs (#1127–#1128);
@106852≠omit `nasty` — missing SUMMON_MONS→`nasty` (#1129);
@107304≠mcalcmove — fog→fog `dochng` via `mons()` `!==` (#1130).

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
