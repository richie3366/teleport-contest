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

Score last measured: **2026-07-22** — full `sessions` @**#1250** (**43**/44,
Scr **11404**/11405, RNG **100%**). Cadence reconfirm + D-0980
`timeout.js` restore `objects_at` import (D-0978 drop; seed0014 throw).
Speed `32+0.27/turn` (@#1250). Next cadence @**#1255**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** |
| Screens matched | **11,404 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `32+0.27/turn` (R² 0.856) |
| Role-init throws | **0 / 44** |

**PASS (43 @#1250):** seed8000, seed0900, seed1500, seed1800, seed0060,
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

**Next cluster:** montraits/omonst/ghost recorporealize, shop
`stolen_value`, or other absent.md thin systems under fortress.

**Iteration density:** one **semantic cluster** per iteration (one C
function or tight caller/callee family; related map deferrals OK),
not one map bullet and not an unrelated multi-subsystem rewrite.
Target ~50–300 lines of C-faithful JS or one small-file restart when
that amortizes fixed agent overhead. One falsifier / verification
story. Prefer delete-wrong-JS + re-port over stacking shims.
See `GROK-PLAYBOOK.md` §2a–2b, `PORTING-RUNBOOK.md` §3.

**Parked:** D-0006 only.

**Do not re-break D-0660…D-0981. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194; D-0929…D-0947;
**D-0948**…**D-0954** (zap/dig/eat shop+furniture — do not re-stub);
**D-0955**…**D-0981** (revive/Ring_gone/grave/shopdig/bridge/
mkcavearea/impact_drop/conjoined/`desecrate_altar`/revive container/
ice melt/`burn_floor_objects`/fireball / Ring_on/`float_down` /
bury/unearth/`obj_ice_effects` / explode AD_FIRE combat /
angrygods 4–8/`rndcurse` / `toggle_stealth` / explode AD_COLD/ELEC /
music `do_earthquake`/`do_pit` / explode AD_MAGM/DISN/DRST/ACID /
flute·harp·horn/`awaken_soldiers`/FIRE·FROST horn /
lavawall spines + burn feedback / `dosinkfall` /
passtune + open/close_drawbridge /
`ignite_items`/`catch_lit`/`begin_burn`/`burn_away_slime` /
`release_hold`/`flash_hits_mon` /
`timeout.js` `objects_at` import for `slip_or_trip` /
openholding/openfalling + Punished/`boxlock_invent` + SPE_KNOCK
`mhurtle`/saddle — do not re-stub).
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
(D-0980).

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
