# Review 311 — 533e732f — dokick.c kickdmg abuse_dog / monflee (D-1349)

## Metadata
- Full / short hash: `533e732fdd7901f80d0449f9d3fd92ea18eb5fd0` / `533e732f`
- Parent: `dde5f91b` (D-1348). This file audits **this SHA only**. Archive **Addressed:** D-1349 lacked the short hash; this review commit fills `533e732f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 08:09:28 +0200
- D-id: **D-1349**
- Stats: 9 files, +92 / −29 — `js/dokick.js` +14 / −5.
- Claims to close: Open `dokick.c` `abuse_dog` (named from D-1332 / review **294**). Not kickstr. `reviews/loop-2026-08-15/` has no unpaid abuse_dog Must-fix.
- JS / map: `dokick.js` `kickdmg`; callees `dog.js` `abuse_dog` (D-0836) + `monmove.js` `monflee`; `c-js-map/turns.md`. Martial knockback `goodpos`/`mintrap` still named.
- Prior reviews this SHA claims to close: **294** named `abuse_dog` / martial knockback after `special_dmgval`; **298** / D-1336 named it after evade.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kickdmg so kicking a pet actually drops tameness and flees (or clears flee when untamed), instead of skipping abuse_dog.”

C `kickdmg` (`dokick.c:34–123`); tame block `:70–76` after `check_caitiff`, **before** converting potential `dmg` with `rnd(dmg)`:

```
    if (mon->mtame) {
        abuse_dog(mon);
        if (mon->mtame)
            monflee(mon, (dmg ? rnd(dmg) : 1), FALSE, FALSE);
        else
            mon->mflee = 0;
    }
```

Shade `!specialdmg` still returns **before** caitiff (`:58–62`) — no abuse. Martial knockback `:96–113` (`martial() && !rn2(3)` + `goodpos`/`mintrap`) still named.

Old JS: empty `if (mon.mtame)` stub. Callees already live.

The diff **does** `await abuse_dog` then still-tame `monflee(dmg?rnd(dmg):1, false, false)` else `mflee=0`. It does **not** port knockback (so it still skips C’s `!rn2(3)`). Named. No other `js/` files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kickdmg` tame block | C `:70–76`, **wired** | after caitiff, before `rnd(dmg)` |
| `abuse_dog` | C `dog.c:1362–1393`, **imported live** | D-0836; not a stub. Worm redraw named inside callee |
| `monflee` | C `monmove.c:462–530`, **imported live** | D-0922. `release_hero` / `flees_light` / Vrock gas named inside callee |
| `check_caitiff` | C, **imported live** | pre-existing, still before tame |
| `special_dmgval` / shade return | C `:56–62`, **pre-existing live** | D-1332; still skips abuse |
| `rnd(dmg)` damage convert | C `:79–81`, **pre-existing live** | **after** fleetime `rnd` |
| martial knockback | C `:96–113`, **named omit** | includes `!rn2(3)` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `abuse_dog` `rn2(mtame)` yelp vs growl; `monflee` fleetime `rnd(dmg)` or 1. Damage `rnd(dmg)` / martial DEX `rn2` unchanged and still **after** fleetime.

## C ↔ JS fidelity

Order matches `:65–81`: mimic → caitiff → tame abuse → still-tame `monflee` else `mflee=0` → `if (dmg>0) dmg=rnd(dmg)`. Shade return still before caitiff. Potential `dmg` (0 for thick-hide / shade-that-did-not-return) feeds fleetime **before** the damage `rnd`. Match. `monflee(..., FALSE, FALSE)`: `first` false so the `!first \|\| !mflee` body always runs; `fleemsg` false so no “turns to flee” pline. Match. Fleetime 1 is bumped to 2 inside `monflee` (`:482–483`). Match D-log thick-hide 1→2. Last-tame: `abuse_dog` zeros `mtame` then `mflee=0` (does not clear `mfleetim`). Match `:75–76`.

`abuse_dog` is the real function (`mtame--` or Aggravate/Conflict `/=2`, `edog.abuse++` if still tame and `!isminion`, unleash, on-map `rn2(mtame)?yelp:growl`). Not a no-op. Worm `redraw_worm` still named **inside the callee**. `monflee` is the real function (`mflee=1`, fleetime cap 127, `mon_track_clear`). Not a stub. Named omits **inside** `monflee` (C always `release_hero` if `ustuck`; Vrock `rn2(25)` gas) mean kicking an ustuck or tame Vrock still diverges — those are callee debts, not a fake dispatch.

Hallucination check: “Match C `kickdmg`” while **martial knockback is omitted** is an overclaim on the **next** `if` in the same function (`:96–113`, including `!rn2(3)`). The **tame block** matches `:70–76`. Callees `abuse_dog` / `monflee` are live, not stubs. Do **not** stamp “Match C martial knockback.” Do **not** stamp “Match C `wake_nearby`.”

## Hallucinations / overclaim

Subject says kicking a pet drops tameness and flees (or clears flee when untamed) instead of skipping `abuse_dog`. **True for the `:70–76` block.** False for knockback until that `if` exists. D-1349 **Not this iter** names it. Stamping **Addressed:** D-1349 for the tame block is fair. Do **not** treat fortress PASS as a kicked-pet yelp.

## Density

One C `if (mtame)` plus already-live callees. ~15 lines of JS. Playbook §2b thin (the next `if` in `kickdmg` is knockback, now the Open head). Same split as **294** (`special_dmgval` then this then knockback). Queued Open row, not an invented peel. Acceptable; next port **must** take knockback, not another one-line kickdmg polish.

## Branch-by-branch confirm

1. Hostile: no `abuse_dog` / no extra fleetime `rnd`. Match.
2. Tame, `mtame>1`: `mtame--` (or half), `edog.abuse++` unless minion, `rn2(mtame)` yelp else growl, `monflee(rnd(dmg) or 1)`. Match.
3. Last tame: growl, `mflee=0`. Match.
4. Thick-hide `dmg==0`: fleetime 1→2 inside `monflee`. Match.
5. Shade `!specialdmg`: return before caitiff; no abuse. Match `:58–62`.
6. Then `dmg>0`: `rnd(dmg)` damage convert still after fleetime. Match `:79–81`.
7. Martial knockback `!rn2(3)`: still skipped. Named.
8. **Public-unhit** unless a session kicks a pet.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No new `fastforward`. Plain ESM.

## Verification

Journal: private canary **15**/15; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on pet kick. This audit cadence: full `sessions` at HEAD `533e732f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not an `abuse_dog` yelp.

## Actionable C-wrongs

None for Must-fix. The tame block matches C `:70–76` call-for-call (`abuse_dog` then still-tame `monflee` else `mflee=0`, fleetime from **potential** `dmg`). Knockback is a named omit of the **next** C `if`, not a clone that rolls `rn2(3)` and then no-ops `goodpos`. Callee named omits (`release_hero`, Vrock gas, worm redraw) stay on those functions’ map rows.

Named omits (map, not Must-fix):

1. `dokick.c` martial knockback `:96–113` (`goodpos`/`mintrap` / `!rn2(3)`) — **next Open**
2. `wake_nearby` / `u_wipe_engr` / shop-town watchman
3. `monflee` `release_hero` / `flees_light` / Vrock gas
4. `abuse_dog` worm redraw; trap/hack other `abuse_dog` callers

Do not Must-fix “`mflee=0` should clear `mfleetim`” (C does not). Do not Must-fix “fleemsg should print” (C passes `FALSE`). Do not Must-fix “fleetime `rnd` after damage `rnd`” (C is potential-dmg first).

## Callers / RNG ledger

C: `abuse_dog` `rn2(mtame)` → `monflee` `rnd(dmg)` → later `rnd(dmg)` damage → martial `rn2(DEX)` → (named) knockback `rn2(3)`. JS: same through DEX `rn2`; skips knockback `rn2(3)`. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: pet kick now `abuse_dog` then `monflee`/`mflee=0` in C order; martial knockback stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1349 `533e732f`.
