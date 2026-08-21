# Review 337 — e785f5bb — artifact.c invoke_blinding_ray (D-1377)

## Metadata
- Full / short hash: `e785f5bb415fdae78f97471c2f86e0a1a813ea2e` / `e785f5bb`
- Parent: `61c15769` (D-1376). This file audits **this SHA only** (third of four `js/` commits since review **334**). Archive **Addressed:** D-1377 `e785f5bb` already has the short hash (filled by D-1378).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 16:38:18 +0200
- D-id: **D-1377**
- Stats: 15 files, +305 / −146 — `js/artifact.js` +135 / −12; `js/generated/artifacts_data.js` inv_prop on every row; `js/read.js` Sunsword radius-0; `js/apply.js` export `do_blinding_ray`; `scripts/extract-artifacts.py` INV_PROP table.
- Claims to close: Open `artifact.c` `invoke_blinding_ray` (named from D-1366 / D-1376 / review **326**). Not camera. `reviews/loop-2026-08-15/` has no unpaid Sunsword-invoke Must-fix.
- JS / map: `artifact.js` `arti_invoke` / `invoke_blinding_ray` / cost; `c-js-map/data.md` + `turns.md`. Other `inv_prop` specials and property toggle still named.
- Prior reviews this SHA claims to close: **326** named this after `lightdamage`. D-1376 follow-up named it as next Open.

## Intent vs deliverable

Git subject promises: “Match C artifact.c invoke_blinding_ray so #invoke Sunsword actually fires a flash, lights the hero cell, or blinds the wielder, instead of printing nothing_happens.”

C `arti_invoke` `:2149–2172`: if `inv_prop > LAST_PROP`, `arti_invoke_cost` then switch; `BLINDING_RAY` → `invoke_blinding_ray`. Cost `:2106–2127`: if `age > moves`, pay `SPELL_LEV_PW(5)` (=25) or “ignoring you” + `d(3,10)` and fail; else `age = moves + rnz(100)`. Body `:2054–2086`: `getdir` → dx\|dy `do_blinding_ray`; dz `litroom(TRUE,obj)` then lit-vs-`nothing_seems_to_happen`; else gremlin `lightdamage(obj,TRUE,2*damg)` + `flashburn(damg+rnd(damg), FALSE)`; cancel `Never_mind`, `age=moves`, `ECMD_CANCEL`. `damg` = blessed 15 / uncursed 10 / cursed 5. `LAST_PROP=68`; `BLINDING_RAY=LAST_PROP+14=82`. Sunsword artilist inv is `BLINDING_RAY` (`artilist.h:210`). Fire Brand inv is **FIRESTORM** (`:154`) — extract 80 is C, not a swapped field.

Old JS: `inv_prop` missing from `artifacts_data`; `arti_invoke` printed `nothing_happens` for every special.

The diff **does** extract `inv_prop`, dispatch BLINDING_RAY through cost then the three getdir arms plus cancel refund, export live `do_blinding_ray`, and add C `read.c:2596–2599` Sunsword `set_lit(ux,uy,&is_lit)` **after** the Rogue whole-room arm. It does **not** port TAMING/HEALING/portal/storm/FLING_POISON or INVIS/LEVITATION/CONFLICT toggle. Named. Those still `nothing_happens` **without** charging cost (C would charge then invoke). That is the named special cluster, not a Sunsword C-wrong.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `inv_prop` extract | C `artilist.h` A() inv, **wired** | Sunsword 82; Fire Brand FIRESTORM 80 |
| `BLINDING_RAY` | C `artifact.h:77`, **wired** | `LAST_PROP+14` |
| `arti_invoke_cost` / `_pw` | C `:2088–2128`, **wired** | only BLINDING_RAY (and unused FLING_POISON) pay 25 |
| `invoke_blinding_ray` | C `:2054–2086`, **wired** | |
| `getdir` | C `cmd.c`, **imported live** | `lock.js` |
| `do_blinding_ray` | C `apply.c:61–76`, **exported live** | FLASHED_LIGHT bhit + `flash_hits_mon` |
| `litroom` Sunsword | C `read.c:2596–2599`, **wired** | radius 0; Rogue still first |
| `lightdamage` / `flashburn` | C zap.c, **imported live** | D-1366 / D-1355 |
| `Blind()` | youprop.h **clone** | H\|\|E && !B + roleplay |
| `otense` | objnam.c **clone** | quan≠1 vs `vtense`; Sunsword quan=1 |
| `SPELL_LEV_PW` | `spell.h:36` **clone** | `lvl*5` |
| other `inv_prop > LAST_PROP` | C switch, **named omit** | still nothing_happens, no cost |
| property toggle | C `:2178+`, **named omit** | |
| `transient_light_cleanup` | C `apply.c:75`, **named omit** | already named on apply camera |
| `resists_blnd_by_arti` sparkle | C flashburn, **named omit** | D-1355 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean (extractor is `scripts/`, not scored `js/`). **New gameplay RNG:** `rnz(100)` on a fresh cooldown; tired fail `d(3,10)`; self `rnd(damg)` inside `flashburn`; gremlin `lightdamage` dice. Ray path RNG is inside live `bhit_flashed_light` / `flash_hits_mon`.

## C ↔ JS fidelity

`arti_invoke`: crystal-ball / `!inv_prop` unchanged. `inv_prop > LAST_PROP && === BLINDING_RAY`: cost then body. Match `:2149–2172` for this arm. Cost tired: `uen < 25` or non-pay prop → You_feel ignoring + `age += d(3,10)` → `ECMD_TIME`. Else drain 25 + botl. Fresh: `age = moves + rnz(100)`. Match `:2108–2126`. Cancel after a paid/fresh cost: `age = moves` refunds the cooldown (C `:2082`); Pw already spent stays spent. Match.

dx\|dy: `do_blinding_ray` — C `bhit(..., FLASHED_LIGHT)` then `flash_hits_mon`; camera-only `see_monster_closeup`. JS already had that function; this SHA only **exports** it. Sunsword otyp is LONG_SWORD so closeup stays skipped. Match `:61–72`. `transient_light_cleanup` still named (pre-existing apply omit).

dz: `litroom(true, obj)` then `!Blind && loc.lit && !loc.waslit` ? “It is lit here now.” : `nothing_seems_to_happen`. Match `:2059–2067`. JS `litroom` now: Rogue whole-room **first** (`:2580–2595`), else Sunsword `set_lit(ux,uy,1)` always `&is_lit` (not the `on` flag), else `do_clear_area`. Match `:2596–2602`. Rogue+Sunsword lights the room, not a single cell — C comment on `:2060–2062`. `is_art` vs `oartifact===ART_SUNSWORD` is the same id.

Self: `vulnerable = umonnum==PM_GREMLIN` (C uses umonnum, **not** `hates_light`). `damg` 15/10/5. Gremlin `lightdamage(..., 2*damg)` then always `flashburn(damg+rnd(damg), false)`; if flashburn false **and** !vulnerable, `nothing_seems_to_happen`. Match `:2068–2077`.

Hallucination check: “Match C `invoke_blinding_ray`” while **getdir / do_blinding_ray / litroom / lightdamage / flashburn are live** is not a dispatch-stub lie. Do **not** stamp “Match C `invoke_healing` / FIRESTORM.” Fire Brand 80 is FIRESTORM in C — invoking it still `nothing_happens` because that case is named, not because extract hallucinated FIRE_RES.

## Hallucinations / overclaim

Subject says #invoke Sunsword actually fires a flash, lights the hero cell, or blinds the wielder instead of `nothing_happens`. **True on the keep-path** after a successful cost for the three getdir outcomes. **False for other artifacts with `inv_prop > LAST_PROP`** until those cases exist (still `nothing_happens`). Stamping **Addressed:** D-1377 for `:2054–2086` + extract is fair. Do **not** treat fortress PASS as a Sunsword #invoke.

## Density

One C special plus its cost helper, plus the already-live ray/light/damage callees, plus the data field the dispatcher needed. ~135 lines of JS + generated rows. Playbook §2b caller/callee cluster — right size. Did not glue skilled fireball (next Open). Did not re-open D-1376.

## Branch-by-branch confirm

1. Mjollnir / `inv_prop==0`: nothing_happens + TIME. Match `:2141–2146`.
2. Crystal ball: `use_crystal_ball`. Pre-existing. Match.
3. Tired, uen<25: ignore + `d(3,10)`; no ray. Match.
4. Tired, uen>=25: drain 25 then getdir. Match.
5. Fresh: `rnz(100)` age then getdir. Match.
6. getdir cancel: Never_mind; age=moves; ECMD_CANCEL. Match.
7. Cardinal ray: `do_blinding_ray`. Match. Cleanup named.
8. Up/down, not Rogue: hero-cell `set_lit` 1. Match radius 0.
9. Up/down, Rogue: whole room. Match Rogue-first.
10. Self, not gremlin: `flashburn` only; maybe nothing_seems. Match.
11. Self, gremlin: `lightdamage(2*damg)` then flashburn; skip nothing_seems. Match.
12. HEALING / FIRESTORM / INVIS: still nothing_happens. Named.
13. **Public-unhit** unless a session `#invoke`s Sunsword.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import()` of apply/read/zap/lock is in-process ESM, not Node `fs`. Generated `inv_prop` numbers are artilist tokens, not recorded traces. Plain ESM.

## Verification

Journal: private canary **20**/20 (C/JS grep; inv_prop extract; Mjollnir/HEALING/LEVITATION still named; cancel refund; dz radius-0 vs scroll clear_area; tired `d(3,10)` / Pw drain 25; self flashburn; gremlin `lightdamage`; dx ray; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on Sunsword #invoke. This audit cadence: full `sessions` at HEAD `12953730` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.84). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The three getdir arms and cost RNG match C; callees are real. Other invoke specials are named omits of **other** `inv_prop` values.

Named omits (map / already-Open, not Must-fix):

1. TAMING / HEALING / ENERGY_BOOST / UNTRAP / CHARGE_OBJ / LEV_TELE / CREATE_PORTAL / ENLIGHTENING / CREATE_AMMO / BANISH / FLING_POISON / FIRESTORM / SNOWSTORM
2. INVIS / LEVITATION / CONFLICT property toggle
3. `transient_light_cleanup` after FLASHED_LIGHT
4. `resists_blnd_by_arti` shieldeff on `flashburn`

Do not Must-fix “charge cost for named-stub specials” (do not implement those invokes here). Do not Must-fix “Sunsword on Rogue is radius 0” (C lights the room). Do not Must-fix “`hates_light` instead of `umonnum==GREMLIN`” (C uses umonnum). Do not Must-fix “Fire Brand inv_prop 80 is wrong” (C FIRESTORM).

## Callers / RNG ledger

C: `rnz(100)` xor `d(3,10)`; self `rnd(damg)`; gremlin lightdamage dice. JS same on the Sunsword path. Public fortress does not #invoke Sunsword.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: #invoke Sunsword now pays cost and getdir-dispatches to live ray / radius-0 litroom / self flash; other inv specials stay named.
- Must-fix stays empty for this SHA.
