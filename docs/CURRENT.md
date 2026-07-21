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

Score last measured: **2026-07-21** — full `sessions` @**#1220** (**44**/44,
Scr **11405**/11405, RNG **100%**). Cadence reconfirm (no port this
iter). Speed `30+0.27/turn` (@#1220). Next cadence @**#1225**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `30+0.27/turn` (R² 0.872) |
| Role-init throws | **0 / 44** |

**PASS (44 @#1220):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107, seed0009,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0398, seed0373,
seed5006, seed0116, seed0361, seed0367, seed0108, seed5002, seed0360,
seed0383, seed0399, seed0014, seed2600, seed4500, seed2200.

**Notable non-PASS:** none (local suite clean).

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

**Hold local suite (44/44 @#1220) as a regression fortress.** Green
gate + cohort + cadence full `sessions` must stay PASS. Do **not**
chase public leaderboard / cron / `data.json` / hub CDN session drift
— out of agent scope (human/maintainer). Do **not** invent FAIL peels,
ALIGN/FORCE, or seed gates when the suite is already clean.

**Work picker (map-driven, not FAIL-driven):** retire named omissions /
constitutional debt from one `docs/c-js-map/*.md` section (prefer
`debt.md` scenario-shaped code, then `absent.md` thin systems), or
parked D-0006 only with reproducible C state. Optional: private C
recorder canaries on thin spots (held-out hardening) — never memorize
public traces.

**Next cluster:** Ring_gone / float_up / rescham / choke(strangle);
dig destroy_drawbridge / desecrate_altar / shopdig / impact_drop /
mkcavearea / grave; revive container/buried polish; ice melt /
`burn_floor_objects` / fireball.

**Iteration density:** one **semantic cluster** per iteration (one C
function or tight caller/callee family; related map deferrals OK),
not one map bullet and not an unrelated multi-subsystem rewrite.
Target ~50–300 lines of C-faithful JS or one small-file restart when
that amortizes fixed agent overhead. One falsifier / verification
story. Prefer delete-wrong-JS + re-port over stacking shims.
See `GROK-PLAYBOOK.md` §2a–2b, `PORTING-RUNBOOK.md` §3.

**Parked:** D-0006 only.

**Do not re-break D-0660…D-0955. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194; D-0929; **D-0930**;
**D-0931**; **D-0932**; **D-0933**; **D-0934**; **D-0935**; **D-0936**;
**D-0937**; **D-0938**; **D-0939**; **D-0940**; **D-0941**; **D-0942**;
**D-0943**; **D-0944**; **D-0945**; **D-0946**; **D-0947**;
**D-0948** (`zap_over_floor` door/bars shopdamage + `dobuzz`
`pay_for_damage` — do not re-stub);
**D-0949** (`explode` shop pay + `do_break_wand` explode-types — do not
re-stub);
**D-0950** (`dig_check`/`digactualhole` + break-wand dig/create pay —
do not re-stub);
**D-0951** (`use_pick_axe`/`dig` occupation/`is_digging`/`dig_typ`/
`holetime` — do not re-stub);
**D-0952** (break-wand strike/cancel/poly/tele/undead `bhitm` +
`WAN_LIGHT` litroom — do not re-stub);
**D-0953** (floorfood pool/lava reach + `vault_gd_watching` — do not
re-stub);
**D-0954** (`furniture_handled` fountain/sink + HOLE `goto_level` —
do not re-stub);
**D-0955** (`unturn_dead`/`revive` + `hero_breaks` + worn ABON cancel —
do not re-stub).
**Do not / recent rejects:** invent appear/nearness/FORCE/RNG gates;
HEAVY_IRON_BALL `owt!=0` weight short-circuit (#1194); @1808 page-count
shim (#1194); @1799 heat/smoke-only (#1193); @1770 Norep/parse-clear
alone (#1192); older in D-0928/NOTES; skip painting map spaces in
flush (breaks S_air); strip leading bold pads in serialize;
assume judge elides RC path (falsified D-0933); extend §1.2 carve-out
beyond the recorder configfile string; peel “for leaderboard” without
a local FAIL.

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
