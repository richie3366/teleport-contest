# Review 427 — 3605a281 — zap.c zap_updown SPE_STONE_TO_FLESH (D-1466)

## Metadata
- Full / short hash: `3605a281025362704f71e595c646ae3a496b2027` / `3605a281`
- Parent: `a52401a6` (D-1465). This file audits **this SHA only** (ninth of nine `js/` commits since review **418**). Archive **Addressed:** D-1466 was missing `%h`; this audit fills `3605a281`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 11:38:41 +0200
- D-id: **D-1466**
- Stats: 9 files, +149 / −40 — `js/zap.js` +78 / −21.
- Claims to close: Open `zap.c` `zap_updown` WAN_STONE_TO_FLESH (named from D-1465). C has **no** WAN_STONE_TO_FLESH; the real otyp is SPE_STONE_TO_FLESH `:3355`. `reviews/loop-2026-08-15/` has no unpaid stone-updown Must-fix.
- JS / map: `zap.js` `zap_updown` STONE case then shared epilogue; `engrave.js` `engr_at` imported live; `body_part_zap` FACE/FOOT; `Levitation_updown`. `c-js-map/turns.md`. `zap_map` engraving named.
- Prior reviews this SHA claims to close: **426** named STONE after LOCKING updown; **421** named `zap_updown` STONE after the cast dispatch.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown SPE_STONE_TO_FLESH so an up/down stone-to-flesh spell prints Blood or nothing_happens and still runs bhitpile instead of skipping zap_updown.”

C `zap_updown` `:3355–3377` (spell-only). Air/water/`Underwater` (`youprop.h`: `u.uinwater`) or (`Is_qstart` and `dz<0`) → `pline1(nothing_happens)`. Else up: `Blood drips on your %s` `body_part(FACE)`. Else down and `!OBJ_AT`: `engr_at`; skip flavor if `engr_type==ENGRAVE` (`zap_map` owns engraved stone); else pool/ice `nothing_happens`; else `Blood boil|pool s beneath|at your %s` (`Levitation`, `makeplural(body_part(FOOT))`). Flavor does **not** set `disclose`. Then **break** into shared `:3382–3408`: down `bhitpile`+`zap_map`; up hideunder `bhito`. C `default` also `break`s into that epilogue; JS `default` still `return false` (other otyps). Caller `weffects` `:3445–3446`. Queue said WAN_STONE_TO_FLESH; C has no such wand — this SHA ports the spell case. Honest.

Old JS: STONE hit `default` `return false`, skipping Blood **and** the pile epilogue (so down never `stone_to_flesh_obj` via `bhitpile`).

The diff **does** add the SPE_STONE_TO_FLESH case, `engr_at`, FACE/FOOT in `body_part_zap`, `Levitation_updown`, then `break` into the existing epilogue. It **does not** port `zap_map` engraving/cancel. Named. It **does not** add full `body_part` poly tables. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_updown` SPE_STONE_TO_FLESH | C `:3355–3377`, **wired this SHA** | |
| epilogue `bhitpile`+`zap_map` | C `:3382–3408`, **pre-existing** | now reached |
| `engr_at` | C `engrave.c`, **imported live** | |
| `nothing_happens` | C `pline.h`, **imported live** | |
| `body_part_zap` FACE/FOOT | C `body_part`, **clone** | humanoid strings; poly tables named |
| `Levitation_updown` | C `youprop.h` `:240`, **clone** | H\|\|E && !B; no sticky `u.Levitation` (D-1070) |
| `objects_at` vs `OBJ_AT` | C `rm.h` `:500`, **imported live** | pile head ≠ 0 |
| `zap_map` ENGRAVE rewrite | C `:3652–3657`, **named omit** | flavor skipped so zap_map can own it |
| WAN_STONE_TO_FLESH | **does not exist in C** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the flavor arm; down `bhitpile` → `stone_to_flesh_obj` `obj_resists(2,98)` (D-1461). Public fortress does not cast stone-to-flesh up/down.

## C ↔ JS fidelity

`weffects` IMMEDIATE `u.dz` → `zap_updown`. Unchanged. Hallucination check: “Match C Blood / nothing_happens and still `bhitpile`” while the case **breaks** into the live epilogue (not `return false`) is **not** a dispatch-stub lie. `engr_at` / `is_pool` / `is_ice` / `is_lava` / `objects_at` / `bhitpile` / `bhito` `stone_to_flesh_obj` are live.

`:3356–3358`: JS `Is_airlevel \|\| Is_waterlevel \|\| uinwater \|\| (Is_qstart_updown && dz<0)`. `Underwater` ≡ `uinwater`. Match.

`:3359–3360`: up Blood FACE. `body_part_zap(FACE)` → `"face"` (const FACE=2). Humanoid match; other forms named.

`:3361–3375`: down and `!objects_at(x,y)` (x,y were set to ux,uy). `engr_at`; skip if ENGRAVE. Pool/ice nothing. Else boil/pool + Levitation beneath/at + `makeplural(foot)`. `Levitation_updown` matches `youprop.h:240`. Match strings (`boil`/`pool` + `s`). Disclose stays false.

Epilogue: down `bhitpile(bhito)` then `zap_map`. Up hideunder. STONE `break` reaches this. Match. `zap_map` ENGRAVE still named; C skipped Blood so that path can rewrite the engraving without a double message.

C `default: break` still runs epilogue for unknown otyps; JS `default: return false` does not. Pre-existing; STONE is no longer in that default.

## Hallucinations / overclaim

Subject says up/down stone-to-flesh prints Blood or nothing_happens and still runs `bhitpile`. **True.** Queue WAN_ name was wrong; D-log and subject use SPE_. **False until named** for `zap_map` engraving, full `body_part` tables, `bhito` boxlock. Stamping **Addressed:** D-1466 for the **flavor case + epilogue reach** is fair. Do **not** stamp “Match C zap_map SPE_STONE_TO_FLESH engraving.” Do **not** invent WAN_STONE_TO_FLESH. Do **not** treat fortress PASS as an up/down stone-to-flesh cast.

## Density

One `zap_updown` otyp flavor arm plus tiny helpers (`Levitation_updown`, FACE/FOOT). ~40 lines of real JS. Playbook §2b. Did not glue `zap_map`. Acceptable.

## Branch-by-branch confirm

1. Air/water/`uinwater`: `nothing_happens`, disclose false, epilogue still runs. Match `:3356–3358`.
2. Qstart **up**: nothing. Match `Is_qstart && dz<0`.
3. Up (not qstart/air): Blood on face. Match `:3359–3360`.
4. Down + pile (`OBJ_AT`): no Blood flavor; `bhitpile` still runs. Match `:3361` gate.
5. Down empty + ENGRAVE: skip Blood. Match `:3367`.
6. Down empty + DUST: Blood still. Match (only ENGRAVE skipped).
7. Down empty + pool/ice: nothing. Match `:3368–3369`.
8. Down empty + lava: Blood boils at/beneath feet. Match `:3371–3374`.
9. Levitation: “beneath”. Match `youprop.h:240`.
10. Disclose stays false; wand-duplicate is SPBOOK so `learnwand` no-ops anyway. Match.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `Levitation_updown` is H/E/B uprops, not a recorded levitation flag. No hardcoded drip coordinates.

## Verification

Journal: private canary **20**/20 (C/JS grep; Rule #2; C has no WAN_STONE_TO_FLESH; down empty Blood pools at feet; Levitation beneath; lava boils; pool/ice nothing; OBJ_AT skip Blood; ENGRAVE skip Blood; DUST still Blood; up face drip; air/Underwater/qstart-up nothing; LOCKING/STRIKING/PROBING siblings); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session casts stone-to-flesh up or down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `3605a281`.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Flavor predicates match `:3356–3375`. Epilogue reach matches C `break`. `engr_at` is a C callee. `body_part_zap` is a named clone for humanoid FACE/FOOT, not a silent “Match C `body_part`” lie.

Named omits (map / Open, not Must-fix):

1. `zap_map` engraving/cancel trap — Open already after this SHA (`bhito` boxlock is first)
2. full `body_part` poly tables
3. `bhit` doorlock LOCKING; remaining `zap_steed` bhitm-routed

Do not Must-fix “WAN_STONE_TO_FLESH missing” (C has none). Do not Must-fix “dispatch is a stub.” Do not Must-fix “disclose should be true” — C leaves it false.

## Callers / RNG ledger

C callers: `weffects` IMMEDIATE `u.dz`. Flavor arm: no dice. Down `bhitpile` → `bhito` → `stone_to_flesh_obj` `obj_resists(2,98)`. Public fortress does not hit the new arm.

`zap_steed` has no STONE case (C `:3116–3134` omits it), so riding-down STONE still reaches `zap_updown`. Match.

This SHA is HEAD. Archive D-1466 `%h` filled in this review commit.

Verdict: **ACCEPT-WITH-DEBT**
