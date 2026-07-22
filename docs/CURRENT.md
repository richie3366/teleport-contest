# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (`iteration-count % 5 == 0`), run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-07-22** — full `sessions` @**#1275** (**43**/44,
Scr **11404**/11405, RNG **100%**). Speed `31+0.27/turn` (R² 0.873).
Next cadence @**#1280**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** |
| Screens matched | **11,404 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `31+0.27/turn` (R² 0.873) |
| Role-init throws | **0 / 44** |

**PASS (43 @#1275):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002, seed0360,
seed0383, seed0399, seed0014, seed2600, seed4500, seed2200.

**Notable non-PASS:** seed0009 Scr **72**/73 (RNG 3713/3713; reproduces
on clean HEAD — do not chase as recent-port regression).

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

**Hold local suite as a regression fortress** (green gate + cohort;
cadence full `sessions` every 5). Do **not** chase public leaderboard /
cron / `data.json` / hub CDN session drift — out of agent scope. Do
**not** invent FAIL peels, ALIGN/FORCE, or seed gates for already-
matching public paths. seed0009 Scr 72/73 is a known HEAD FAIL — not
a work picker unless a C-cited shared cause appears.

**Work picker (map-driven, not FAIL-driven):** retire named omissions /
constitutional debt from one `docs/c-js-map/*.md` section (prefer
`debt.md` scenario-shaped code, then `absent.md` thin systems), or
parked D-0006 only with reproducible C state. Optional: private C
recorder canaries on thin spots (held-out hardening) — never memorize
public traces.

**Next cluster:** next_to_u/check_leash body; or absent.md thin
(potion/scroll/vault polish beyond D-1004); or mon_poly monster-
defender / other in_trouble majors.

**Iteration density:** one **semantic cluster** per iteration (one C
function or tight caller/callee family; related map deferrals OK),
not one map bullet and not an unrelated multi-subsystem rewrite.
Target ~50–300 lines of C-faithful JS or one small-file restart when
that amortizes fixed agent overhead. One falsifier / verification
story. Prefer delete-wrong-JS + re-port over stacking shims.
See `GROK-PLAYBOOK.md` §2a–2b, `PORTING-RUNBOOK.md` §3.

**Parked:** D-0006 only.

**Do not re-break D-0660…D-1004. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194; D-0929…D-0947;
**D-0948**…**D-0954** (zap/dig/eat shop+furniture — do not re-stub);
**D-0955**…**D-1004** (… lycan you_were wires — do not re-stub).
**Do not / recent rejects:** invent appear/nearness/FORCE/RNG gates;
HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194); @1808 page-count
shim (#1194); @1799 heat/smoke-only (#1193); @1770 Norep/parse-clear
alone (#1192); older in D-0928/NOTES; skip painting map spaces in
flush (breaks S_air); strip leading bold pads in serialize;
assume judge elides RC path (falsified D-0933); extend §1.2 carve-out
beyond the recorder configfile string; peel “for leaderboard” without
a local FAIL; push shared `maketrap` PIT morph without full suite
(keep in music `do_pit`, D-0972); chase seed0009 Scr 72/73 without
C-cited shared cause; drop `objects_at` from `timeout.js` mkobj import
(D-0980); re-stub `stolen_value` revive/kick/dig/lock callers (D-0983);
re-stub `ship_object` drop/throw (D-0984); re-stub kick_nondoor
SDOOR/furniture (D-0985); re-stub throne/`fall_through`/tree (D-0986);
re-stub `flooreffects` drop/throw (D-0987); re-stub `kick_object` /
`bhit` KICKED_WEAPON (D-0988); re-stub Is_box/`chest_trap`/`ghitm`
(D-0989); re-stub `hits_bars`/`hit_bars` (D-0990); re-stub
`costly_gold`/`donate_gold` (D-0991); re-stub `fire_damage`/
`doaltarobj`/hot potion (D-0992); re-stub globby pudding_merge/
obj_meld (D-0993); re-stub sellobj/check_shop_obj (D-0994);
re-stub `instapetrify`/barefoot petrify/`bhit` flash (D-0995);
re-stub `selftouch`/`mselftouch`/`minstapetrify`/`monstone` (D-0996);
re-stub `animate_statue`/`activate_statue_trap`/Blind kick feel
(D-0997); re-stub dopay robbed/angry/debit appease (D-0998);
re-stub ParanoidBreakwand getlin / `see_monster_closeup` (D-0999);
re-stub ParanoidPray Confirm / `see_nearby_monsters` (D-1000);
re-stub ParanoidWerechange/Hit / `you_were`/`you_unwere` (D-1001);
re-stub allmain Teleport/Poly/ulycn once-per-turn (D-1002);
re-stub `warnreveal`/`overexert_hp`/Upolyd eel `regen_hp` (D-1003);
re-stub pray lycan / peffect_water / mon_poly youmonst (D-1004).
**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + seed2200 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers (open only if needed)

| Need | File |
|------|------|
| Live hypothesis / don’t-recheck | `NOTES.md` |
| Divergence by ID | `DIVERGENCE-INDEX.md` → one `## D-NNNN` |
| Subsystem omissions | `C-JS-MAP.md` → one `c-js-map/*.md` |
| Latest loop crumbs | `AGENT-LOOP-JOURNAL.md` (tail only) |
| Score/objective history | `archive/PROGRESS-HISTORY.md` |

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
