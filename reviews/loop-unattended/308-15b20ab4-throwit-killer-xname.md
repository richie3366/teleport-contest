# Review 308 — 15b20ab4 — dothrow.c throwit returning-missile killer_xname (D-1346)

## Metadata
- Full / short hash: `15b20ab440847d2d8865b07589ec6773c1461fec` / `15b20ab4`
- Parent: `a684ed50` (reviews **304–307** + cadence **#1705**). This file audits **this SHA only**. Archive **Addressed:** D-1346 `15b20ab4` already has the short hash (filled by D-1347).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 07:27:27 +0200
- D-id: **D-1346**
- Stats: 9 files, +88 / −32 — `js/dothrow.js` +10 / −4. Comment-only besides the `losehp` line.
- Claims to close: Open `dothrow.c` throwit `losehp` `killer_xname` (C `:1747`). Not zap. `reviews/loop-2026-08-15/` has no unpaid throwit-killer Must-fix.
- JS / map: `js/dothrow.js` `throwit_returning_missile`; live `killer_xname` from D-1335; `c-js-map/turns.md`. throw_obj `:139–148` petrify / pickup / wield remaining.
- Prior reviews this SHA claims to close: **307** named throwit `:1747` after dozap; **297** named remaining `killer_xname` callers after kickobjnam.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a returning missile that kills the hero is named with killer_xname on the tombstone, instead of storing a bare xname.”

C `throwit` returning-missile fail-catch (`dothrow.c:1710–1757`); arm-hit `:1738–1748`:

```
                    } else {
                        dmg += rnd(3);
                        …
                        if (obj->oartifact)
                            (void) artifact_hit((struct monst *) 0,
                                                &gy.youmonst, obj, &dmg, 0);
                        losehp(Maybe_Half_Phys(dmg), killer_xname(obj),
                               KILLED_BY);
                    }
```

Feet-land (`!dmg` after `rn2(2)`) never calls `losehp`. `throw_obj` petrify `:146–148` is a different Sprintf (`"throwing %s bare-handed"`) — still named.

Old JS: `losehp(maybe_half_phys(dmg), xname(obj), KILLED_BY)` inside the existing `throwit_returning_missile` clone.

The diff **does** import `killer_xname` and pass it to that `losehp`. It does **not** port `throw_obj` `:139–148`. Named. No other `js/` files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit_returning_missile` arm-hit `losehp` | C `:1747–1748`, **wired** | helper is a **clone** of the C fail-catch arm (pre-existing D-1282) |
| `killer_xname` | C `objnam.c:1942–2005`, **imported live** | D-1335; not a local clone |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | `hack.js` |
| `KILLED_BY` | C, **imported live** | `const.js` `= 1` |
| `artifact_hit` | C, **imported live** | optional, before `losehp` |
| `losehp` / `finish_losehp_done` | C `hack.c` / JS await, **imported live** | pre-existing at this site |
| `throw_obj` petrify | C `:146–148`, **named omit** | still not this `losehp` |
| pickup / wield `killer_xname` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` in this file is a C trap flag, not an ALIGN/FORCE gate. Rule #2 clean. **New gameplay RNG:** none (`killer_xname` has none). Existing `rn2(100)` catch / `rn2(2)` / `rnd(3)` / `artifact_hit` unchanged.

## C ↔ JS fidelity

Fail-catch structure was already the C arm: `rn2(2)` then feet-land vs `dmg += rnd(3)` arm-hit; Blind pline; optional `artifact_hit` into a dmg box; then `losehp`. This SHA only swaps the killer string.

`killer_xname` fully IDs, strips BUC/called-name/poison, adds `an`/`the`, restores, uses `bare_artifactname` for artifacts. Live callee (review **297**), not a stub. An unknown aklys is not `"thonged club"` under `KILLED_BY`. C uses `KILLED_BY` (not `KILLED_BY_AN`) because the article is already in the name. JS keeps `KILLED_BY`. Match `:1747–1748`.

`maybe_half_phys` is the C macro (`(dmg+1)/2` when Half_physical_damage). Match. Feet-land still skips `losehp`. Match `:1732`. Swallow then `ship_object`/`dropy` unchanged.

Hallucination check: “Match C `throwit`” while **`throw_obj` petrify still uses a different omit** is an overclaim on bare-hand cockatrice deaths. The **arm-hit `losehp`** matches `:1747–1748`. Callee `killer_xname` is live. Do **not** stamp “Match C `throw_obj` `:147`.” Do **not** stamp “Match C pickup/wield killer.”

## Hallucinations / overclaim

Subject says a returning-missile death is named with `killer_xname` instead of bare `xname`. **True for the arm-hit `losehp` in `throwit_returning_missile`.** False for throw_obj petrify until that Sprintf exists. D-1346 **Not this iter** names it. Stamping **Addressed:** D-1346 for `:1747–1748` is fair. Do **not** treat fortress PASS as an aklys tombstone.

## Density

One C `losehp` argument plus a live callee already in-tree. ~10 lines of JS. Playbook §2b thin, but it is the queued Open row (the remaining throwit `killer_xname` site named from **307**), not an invented peel. Did not glue petrify / pickup. Acceptable.

## Branch-by-branch confirm

1. Arm-hit, unknown weapon: `"a "+appearance` via `killer_xname` + `KILLED_BY`. Match `:1747–1748`.
2. Called-name / BUC / poison: stripped then restored. Match D-1335 body.
3. Artifact (Mjollnir): `bare_artifactname`, not `xname`. Match.
4. `!dmg` after `rn2(2)`: feet-land, no `losehp`. Match `:1732`.
5. `oartifact`: `artifact_hit` still runs before `losehp`. Match `:1744–1746`.
6. `throw_obj` petrify: still omit. Named.
7. **Public-unhit** unless a session dies of a returning-missile arm hit.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No new `fastforward`. Plain ESM.

## Verification

Journal: private canary **28**/28; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on returning-missile death. This audit cadence: full `sessions` at HEAD `533e732f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a tombstone with `"killed by a thonged club"` vs `"Mjollnir"`.

## Actionable C-wrongs

None for Must-fix. The arm-hit `losehp` matches C `:1747–1748` call-for-call. Unwired `throw_obj` petrify is a named omit of a **different** C site, not a stub killer at this `losehp`.

Named omits (map, not Must-fix):

1. `dothrow.c` `throw_obj` `:139–148` petrify `"throwing "+killer_xname+" bare-handed"`
2. pickup / wield / invent / mthrowu / `do_wear` remaining `killer_xname`
3. `the()` CapitalMon (inside `killer_xname` article gate)

Do not Must-fix “arm-hit should be `KILLED_BY_AN`” (double article; C is `KILLED_BY`). Do not Must-fix “feet-land should `losehp`” (C does not).

## Callers / RNG ledger

C: fail-catch `rn2(2)` / `rnd(3)` → optional `artifact_hit` → `killer_xname` (no RNG) → `losehp`. JS: same order. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: returning-missile arm-hit `losehp` now uses `killer_xname` + `KILLED_BY`; throw_obj petrify stays named.
- Must-fix stays empty for this SHA.
